import { Button, Flex, Loader, NumberInput, Select, Table, Text, TextInput } from "@mantine/core";
import { DateInput, DatePickerInput, DatesProvider } from "@mantine/dates";
import { UseFormReturnType } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { round } from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import addLogo from "../../../../assets/logos/SVG/add_new.svg";
import ExclamationIcon from "../../../../assets/logos/SVG/setup_pending.svg";
import calendarIcon from "../../../../assets/logos/calendar.svg";
import {
  getNOCAccountRequested,
  getNOCAccountReset,
  getNOCPriceHeaderRequested,
  getNOCPriceHeaderReset,
  getSalesUnitForNOCRequested,
} from "../../../../lib/services/HDFC/ExternalNOC/actions";
import { NOCFormData, NOCPriceHeader, SalesUnitForNOC } from "../../../../lib/services/HDFC/ExternalNOC/dataTypes";
import { selectExternalNOCLoaders, selectNOCPriceHeaderList, selectNOCSalesUnitList } from "../../../../lib/services/HDFC/ExternalNOC/selectors";
import { errorNotification } from "../../../../utils/notifications";
import { TableRow } from "../../../Components/TableRow";
import { Currency, DEFAULT_DATE_FORMAT, getPresentableValue, numberToCurrencyWordsFormatted } from "../../../Components/UtilityFunctions";
import AddTotalCost from "./AddTotalCost";

interface AddNOCProps {
  reAssetId: number;
  nocProjectId: number;
  userEmail: string;
  form: UseFormReturnType<NOCFormData, (values: NOCFormData) => NOCFormData>;
  selectedUnit: SalesUnitForNOC | null;
  inputTotalCost: number;
  inputTotalSaleCost: number;
  inputTotalCostAsPerMSP: number;
  priceHeaderData: { [key: string]: { Amount: number; NOCProjectPriceHeaderID: number; ValueType: string; IsMSP: number } } | undefined;
  setInputTotalCost: React.Dispatch<React.SetStateAction<number>>;
  setInputTotalSaleCost: React.Dispatch<React.SetStateAction<number>>;
  setInputTotalCostAsPerMSP: React.Dispatch<React.SetStateAction<number>>;
  setSelectedUnit: React.Dispatch<React.SetStateAction<SalesUnitForNOC | null>>;
  handleUpdatedPriceHeader: (key: string, amount: number, nocProjectId: number, valueType: string, isMSP: number) => void;
  formReset: () => void;
}

const AddNOC: React.FC<AddNOCProps> = ({
  reAssetId,
  nocProjectId,
  userEmail,
  form,
  selectedUnit,
  priceHeaderData,
  inputTotalCost,
  inputTotalSaleCost,
  inputTotalCostAsPerMSP,
  setInputTotalCost,
  setInputTotalSaleCost,
  setInputTotalCostAsPerMSP,
  setSelectedUnit,
  handleUpdatedPriceHeader,
}: AddNOCProps) => {
  const dispatch = useDispatch();
  // disclosure
  const [modalState, { open: openModal, close: closeModal }] = useDisclosure(false);

  const warningModal = (message: string) => {
    modals.open({
      title: (
        <Text fw='bold' color='red'>
          Warning
        </Text>
      ),
      withCloseButton: false,
      closeOnClickOutside: false,
      closeOnEscape: false,
      children: (
        <>
          <Text>{message}</Text>
          <Button
            mt='md'
            color='truboard-primary.0'
            onClick={() => {
              modals.closeAll();
              form.reset();
              setInputTotalCost(0);
              setInputTotalSaleCost(0);
              setInputTotalCostAsPerMSP(0);
              dispatch(getNOCAccountReset());
              dispatch(getNOCPriceHeaderReset());
            }}>
            Close
          </Button>
        </>
      ),
    });
  };

  //#region [selector]
  // const nocTypes = useSelector(selectNOCTypeList) as string[];
  const unitList = useSelector(selectNOCSalesUnitList) as SalesUnitForNOC[];
  const priceHeaderList = useSelector(selectNOCPriceHeaderList) as NOCPriceHeader[];
  const loaders = useSelector(selectExternalNOCLoaders);
  //#endregion

  //#region [state]
  const [unitSearchValue, onUnitSearchChange] = useState<string>("");
  //#endregion [state]

  //#region [useEffect]
  useEffect(() => {
    if (form.values.type_of_noc && reAssetId) {
      const nocType = form.values.type_of_noc;
      dispatch(getSalesUnitForNOCRequested(reAssetId, nocType));
    }
  }, []);

  useEffect(() => {
    if (form.values.unit_no && unitList?.length) {
      const unitRefNo = form.values.unit_no;
      const unitDetail = unitList?.find(unit => unit?.UnitLocationNumber === unitRefNo);
      if (unitDetail && unitDetail?.MortgageStatus === "Not Mortgaged") {
        warningModal("Cannot raise a new request for this unit, as Unit is not mortgaged.");
      } else if (unitDetail && unitDetail?.nocstatusflag === 1) {
        warningModal("Cannot raise a new request for this unit, NOC request is already raised and is in pending status.");
      } else if (unitDetail && unitDetail?.nocstatusflag == 2) {
        warningModal("Cannot raise a new request for this unit, NOC already issued for that unit.");
      } else {
        if (unitDetail) {
          setSelectedUnit(unitDetail);
          if (unitDetail.isIssued === 1) {
            modals.open({
              title: `NOC is already issued for the unit ${unitDetail.uniqueref} on ${getPresentableValue(
                unitDetail.issuedate,
                true,
                false,
                false,
              )} with Request ID ${unitDetail.NocRequestId}`,
              withCloseButton: true,
              centered: true,
            });
          }
        }
        if (nocProjectId && unitDetail?.RESalesID) {
          dispatch(getNOCPriceHeaderRequested(nocProjectId, unitDetail?.RESalesID, -1));
        }

        // set-form-values
        form.setValues({
          date_of_booking: unitDetail?.BookingDate ? new Date(unitDetail?.BookingDate) : new Date(),
          product_sub_type: unitDetail?.UnitLocationSubTypeName ?? "",
          floor: unitDetail?.UnitLocationFloor?.toString() ?? "",
          wing: unitDetail?.UnitLocationWing ?? "",
          area: Number(unitDetail?.AreaConsidered) ?? 0,
          approval_status: unitDetail?.ApprovalStatus ?? "",
          security_status: unitDetail?.MortgageStatus ?? "",
          purchaser_name: unitDetail?.CustomerName ?? "",
          purchaser_profile: unitDetail?.CustomerProfile ?? "",
          financer: unitDetail?.BuyerLendingBank ?? "",
          contractual_msp: unitDetail?.contractualmsp ?? 0,
        });
      }
    }
  }, [form.values.unit_no]);

  useEffect(() => {
    if (form.values.product_sub_type && nocProjectId) {
      dispatch(getNOCAccountRequested(nocProjectId, userEmail, form.values.product_sub_type));
    }
  }, [form.values.product_sub_type]);

  useEffect(() => {
    console.log({ inputTotalSaleCost, inputTotalCostAsPerMSP });
    if (form.values.area && (inputTotalSaleCost > 0 || inputTotalCostAsPerMSP > 0)) {
      const area = Number(form.values.area) ?? 0;
      const price_per_mis = inputTotalSaleCost > 0 ? (inputTotalSaleCost / area).toFixed(2) : 0;
      const price_per_parameter = inputTotalCostAsPerMSP > 0 ? (inputTotalCostAsPerMSP / area).toFixed(2) : 0;
      console.log({ price_per_mis, price_per_parameter });
      form.setValues({ price_achieved_as_per_sales_MIS: Number(price_per_mis) });
      form.setValues({ price_achieved_as_per_parameter: Number(price_per_parameter) });
    } else {
      console.log("else");
    }
  }, [form.values.area, inputTotalSaleCost]);

  useEffect(() => {
    const paymentSum = round(Number(form.values.payment_received_against_sale_value) + Number(form.values.payment_received_against_PTC), 2);
    if (paymentSum > inputTotalCost) {
      showNotification({
        id: "wrong-input-data",
        title: "Warning",
        message: "Sum of payment received should not be greater than Total Cost. Please enter correct value.",
        icon: <img src={ExclamationIcon} style={{ width: "20px", height: "20px" }} />,
        color: "red",
        autoClose: 4000,
      });
      form.setValues({
        payment_received_against_sale_value: "",
        payment_received_against_PTC: "",
      });
    }
  }, [form.values.payment_received_against_sale_value, form.values.payment_received_against_PTC]);
  //#endregion

  // unit dropdown
  const unitDropDown = unitList?.length ? unitList?.map(item => ({ value: item?.UnitLocationNumber, label: item?.uniqueref })) : [];

  const handleOpenCostModal = () => {
    if (nocProjectId && selectedUnit?.RESalesID) {
      // dispatch(getNOCPriceHeaderRequested(nocProjectId, selectedUnit?.RESalesID));
      openModal();
    } else {
      errorNotification("Project ID or Sales ID is not defined...");
    }
  };

  // handle-save-total-cost and calculate per-sales-MIS
  const handleTotalCostSubmit = (totalValue: number, saleValue: number, mspVal: number) => {
    setInputTotalCost(totalValue);
    setInputTotalSaleCost(saleValue);
    setInputTotalCostAsPerMSP(mspVal);
    // const area = Number(form.values.area) ?? 0;
    // const price_per_mis = (saleValue / area).toFixed(2);
    // form.setValues({ price_achieved_as_per_sales_MIS: Number(price_per_mis) });
  };

  return (
    <>
      <div style={{ marginLeft: "20px" }}>
        <Table>
          <tbody>
            <TableRow
              title={"Date of Request"}
              fullWidth
              value={
                <DatesProvider settings={{ firstDayOfWeek: 0, weekendDays: [0] }}>
                  <DatePickerInput
                    readOnly
                    labelProps={{
                      style: { color: "#001d56", fontWeight: "bold" },
                    }}
                    valueFormat={DEFAULT_DATE_FORMAT}
                    {...form.getInputProps("date_of_request")}
                  />
                </DatesProvider>
              }
            />
            <TableRow title={"Type of NOC"} value={<TextInput readOnly {...form.getInputProps("type_of_noc")} />} />
            {/* <TableRow
              title={"Type of NOC"}
              withAsterisk
              value={
                <Select
                  placeholder='Select type of NOC'
                  data={nocTypes ? nocTypes : []}
                  nothingFound={loaders.nocTypeList ? "Loading NOC types..." : "No NOC found..."}
                  {...form.getInputProps("type_of_noc")}
                />
              }
            /> */}

            <TableRow
              title={"Unit No."}
              withAsterisk
              value={
                <Select
                  placeholder='Select Unit No.'
                  searchable
                  onSearchChange={onUnitSearchChange}
                  searchValue={unitSearchValue}
                  data={unitDropDown}
                  nothingFound={loaders.salesUnitForNOCList ? <Loader /> : "No Units found..."}
                  {...form.getInputProps("unit_no")}
                />
              }
            />

            <TableRow
              title={"Date of Booking"}
              value={
                <DateInput
                  placeholder='Date of Booking'
                  icon={<img src={calendarIcon} style={{ width: "20px", height: "20px", fill: "white" }} color='white' />}
                  valueFormat={DEFAULT_DATE_FORMAT}
                  maxDate={new Date()}
                  {...form.getInputProps("date_of_booking")}
                />
              }
            />
            <TableRow
              withAsterisk
              title={"NOC Issue Date"}
              value={
                <DateInput
                  placeholder={"NOC Issue Date"}
                  valueFormat={DEFAULT_DATE_FORMAT}
                  icon={<img src={calendarIcon} style={{ width: "20px", height: "20px", fill: "white" }} color='white' />}
                  minDate={form?.values?.date_of_booking ? new Date(form.values.date_of_booking) : new Date()}
                  maxDate={new Date()}
                  {...form.getInputProps("noc_issue_date")}
                />
              }
            />
            <TableRow title={"Product Sub-Type"} value={<TextInput readOnly placeholder='Product Sub-Type' {...form.getInputProps("product_sub_type")} />} />
            <TableRow title={"Floor"} value={<TextInput readOnly placeholder='Floor' {...form.getInputProps("floor")} />} />
            <TableRow title={"Wing"} value={<TextInput placeholder='Wing' {...form.getInputProps("wing")} />} />
            <TableRow
              withAsterisk
              title={`Sale Area ${selectedUnit ? `(${selectedUnit?.AreaConsideredMeasurement})` : ""}`}
              value={
                <NumberInput
                  min={0}
                  hideControls
                  precision={2}
                  parser={value => value.replace(/^-?\$\s?|,/g, "")}
                  placeholder='Sale Area'
                  {...form.getInputProps("area")}
                />
              }
            />
            <TableRow title={"Approval Status"} value={<TextInput readOnly placeholder='Approval Status' {...form.getInputProps("approval_status")} />} />
            <TableRow title={"Security Status"} value={<TextInput readOnly placeholder='Security Status' {...form.getInputProps("security_status")} />} />
            <TableRow withAsterisk title={"Purchaser Name"} value={<TextInput placeholder='Purchaser Name' {...form.getInputProps("purchaser_name")} />} />
            <TableRow title={"Purchaser Profile"} value={<TextInput placeholder='Purchaser Profile' {...form.getInputProps("purchaser_profile")} />} />
            <TableRow
              title={"Total Cost"}
              value={
                <Flex direction='column' color='truboard-primary.0'>
                  <Text size='md' mr='md' fw='bold' display='flex'>
                  <Currency value={inputTotalCost ?? 0} currencyCode='INR' />
                    <img src={addLogo} style={{ width: "20px", height: "20px", color: "#001d56", marginLeft: "10px" }} onClick={handleOpenCostModal} />
                  </Text>
                  <Text size='md' mr='md' fw='bold' tt='capitalize' color='truboard-primary.0'>
                    {inputTotalCost > 0 && numberToCurrencyWordsFormatted({ number: inputTotalCost ?? 0, indianWordsFormat: true, useComma: true })}
                  </Text>
                </Flex>
              }
            />
            <TableRow
              title={"Payment Received against Sale Value"}
              value={
                <>
                  <NumberInput
                    min={0}
                    hideControls
                    precision={2}
                    parser={value => value.replace(/\$\s?|(,*)/g, "")}
                    placeholder='Payment received against Sale value'
                    {...form.getInputProps("payment_received_against_sale_value")}
                  />
                  <Text size='sm' fw='bold' tt='capitalize' color='truboard-primary.0'>
                    {Number(form.values.payment_received_against_sale_value) > 0 &&
                      numberToCurrencyWordsFormatted({
                        number: Number(form.values.payment_received_against_sale_value),
                        indianWordsFormat: true,
                        useComma: true,
                      })}
                  </Text>
                </>
              }
            />
            <TableRow
              title={"Payment Received against PTC"}
              value={
                <>
                  <NumberInput
                    min={0}
                    hideControls
                    precision={2}
                    parser={value => value.replace(/\$\s?|(,*)/g, "")}
                    placeholder='Payment Received against PTC'
                    {...form.getInputProps("payment_received_against_PTC")}
                  />
                  <Text size='sm' fw='bold' tt='capitalize' color='truboard-primary.0'>
                    {Number(form.values.payment_received_against_PTC) > 0 &&
                      numberToCurrencyWordsFormatted({ number: Number(form.values.payment_received_against_PTC), indianWordsFormat: true, useComma: true })}
                  </Text>
                </>
              }
            />
            <TableRow
              title={"Price Achieved as per Sales MIS"}
              value={
                <>
                  <NumberInput
                    min={0}
                    readOnly
                    hideControls
                    precision={2}
                    placeholder='Price Achieved as per Sales MIS'
                    {...form.getInputProps("price_achieved_as_per_sales_MIS")}
                  />
                  <Text size='sm' fw='bold' tt='capitalize' color='truboard-primary.0'>
                    {Number(form.values.price_achieved_as_per_sales_MIS) > 0 &&
                      numberToCurrencyWordsFormatted({ number: Number(form.values.price_achieved_as_per_sales_MIS), indianWordsFormat: true, useComma: true })}
                  </Text>
                </>
              }
            />
            <TableRow
              title={"Price Achieved as per MSP Parameters"}
              value={
                <>
                  <NumberInput
                    min={0}
                    readOnly
                    hideControls
                    precision={2}
                    parser={value => value.replace(/\$\s?|(,*)/g, "")}
                    placeholder='Price Achieved as per MSP Parameters'
                    {...form.getInputProps("price_achieved_as_per_parameter")}
                  />
                  <Text size='sm' fw='bold' tt='capitalize' color='truboard-primary.0'>
                    {Number(form.values.price_achieved_as_per_parameter) > 0 &&
                      numberToCurrencyWordsFormatted({ number: Number(form.values.price_achieved_as_per_parameter), indianWordsFormat: true, useComma: true })}
                  </Text>
                </>
              }
            />
            <TableRow
              title={"Contractual MSP"}
              value={
                <>
                  <NumberInput
                    min={0}
                    readOnly
                    hideControls
                    precision={2}
                    parser={value => value.replace(/\$\s?|(,*)/g, "")}
                    placeholder='Contractual MSP'
                    // value={selectedUnit?.contractualmsp ?? 0}
                    {...form.getInputProps("contractual_msp")}
                  />
                  <Text size='sm' fw='bold' tt='capitalize' color='truboard-primary.0'>
                    {Number(form?.values?.contractual_msp) > 0 &&
                      numberToCurrencyWordsFormatted({ number: Number(selectedUnit?.contractualmsp), indianWordsFormat: true, useComma: true })}
                  </Text>
                </>
              }
            />
            <TableRow title={"Financer"} value={<TextInput placeholder='Add Financer' {...form.getInputProps("financer")} />} />
            <TableRow withAsterisk title={"Remarks"} value={<TextInput placeholder='Enter Remarks' {...form.getInputProps("remarks")} />} />
          </tbody>
        </Table>
        <AddTotalCost
          open={modalState}
          nocPriceHeader={priceHeaderList}
          priceHeaderData={priceHeaderData}
          onClose={closeModal}
          handleUpdatedPriceHeader={handleUpdatedPriceHeader}
          handleTotalCostSubmit={handleTotalCostSubmit}
        />
      </div>
    </>
  );
};

export default AddNOC;
