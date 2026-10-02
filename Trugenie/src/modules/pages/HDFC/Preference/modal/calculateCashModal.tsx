import { Button, Flex, Modal, NumberInput, Space, Table, Text, TextInput, Textarea, useMantineTheme } from "@mantine/core";
import { DatePickerInput, DatesProvider } from "@mantine/dates";
import { useForm } from "@mantine/form";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Project } from "../../../../../lib/services/HDFC/Project/dataTypes";
import { selectSetProject } from "../../../../../lib/services/HDFC/Project/selectors";
import { UserDetails } from "../../../../../lib/services/hdfc_login/dataTypes";
import { selectUserDetails } from "../../../../../lib/services/hdfc_login/selectors";
import { cashCoverCalculateRequested, cashCoverUpdateRequested } from "../../../../../lib/services/prefrences/actions";
import { CashCoverDetailType, UpdateNOCProjectCashCoverDetailsType } from "../../../../../lib/services/prefrences/dataTypes";
import { selectCalculateCashCover, selectPrefrenceLoader } from "../../../../../lib/services/prefrences/selectors";
import { DATE_TIME_FORMAT_WITH_SECONDS } from "../../../../../utils/constants";
import { fixedDecimalTwo } from "../../../../../widgets/charts/Recharts/utils";
import { TableRow } from "../../../../Components/TableRow";
import { DEFAULT_DATE_FORMAT, errorNotification, numberToCurrencyWordsFormatted, successNotification } from "../../../../Components/UtilityFunctions";

// type FormData = {
//   StipulatedCashCover: string;
// };

const ClaculateCashModal = ({ open, onClose, data }: { onClose: () => void; open: boolean; data: CashCoverDetailType[] }) => {
  const dispatch = useDispatch();
  const theme = useMantineTheme();
  const project = useSelector(selectSetProject) as Project;
  const userDetails = useSelector(selectUserDetails) as UserDetails;
  const calulateCashCoverData = useSelector(selectCalculateCashCover);
  const currentDate = new Date();
  const [calculate, setCalculate] = useState(false);
  const loader = useSelector(selectPrefrenceLoader);
  const form = useForm<UpdateNOCProjectCashCoverDetailsType>({
    initialValues: {
      stipulatedCashCover: calulateCashCoverData?.data[0].StipulatedCashCover ?? 0,
      projectedBalancecost: calulateCashCoverData?.data[0].Balancecostproject ?? 0,
      totalExposureTill: calulateCashCoverData?.data[0]?.Totalexposure ?? 0,
      misDate: calulateCashCoverData?.data[0]?.MISDate ?? "",
      createdBy: userDetails.EmailId ?? "",
      asOnDate: new Date(),
    },

    validate: {
      // stipulatedCashCover: value => (value !== null ? null : "This field cannot be empty."),
      // projectedBalancecost: value => (value !== null ? null : "This field cannot be empty."),
      // totalExposureTill: value => (value !== null ? null : "This field cannot be empty."),
      // //   misDate: value => (value !== null ? null : "This field cannot be empty."),
      // asOnDate: value => (value !== null ? null : "This field cannot be empty."),
    },
  });
  const handleCalculateCash = () => {
    dispatch(
      cashCoverCalculateRequested(
        {
          reAssetId: Number(project?.REAssetId),
          stipulatedCashCover: form.values.stipulatedCashCover,
          balanceCostProject: form.values.projectedBalancecost,
          totalExposure: form.values.totalExposureTill,
          misDate: dayjs(currentDate).format(DATE_TIME_FORMAT_WITH_SECONDS) ?? "",
          update: 0,
          userEmail: userDetails?.EmailId,
        },
        callback,
      ),
    );
    setCalculate(true);
  };

  useEffect(() => {
    if (calculate === false) {
      form.setValues({
        ...form.values,
        stipulatedCashCover: calulateCashCoverData?.data[0].StipulatedCashCover ?? 0,
        projectedBalancecost: calulateCashCoverData?.data[0].Balancecostproject ?? 0,
        totalExposureTill: calulateCashCoverData?.data[0]?.Totalexposure ?? 0,
        misDate: calulateCashCoverData?.data[0]?.MISDate ?? "",
        createdBy: userDetails.EmailId ?? "",
      });
    }
  }, [calulateCashCoverData?.data[0]]);

  const callback = (success: boolean) => {
    if (success) {
      successNotification("Calculated Updated successfully");
    } else {
      errorNotification("Failed to Calculate ");
    }
  };
  const updateCallBack = (success: boolean) => {
    if (success) {
      successNotification(" Updated successfully");
    } else {
      errorNotification("Failed to Update ");
    }
  };

  const handleFormSubmit = (formData: UpdateNOCProjectCashCoverDetailsType) => {
    setCalculate(false);
    dispatch(
      cashCoverUpdateRequested(
        {
          reAssetId: project?.REAssetId,
          stipulatedCashCover: formData.stipulatedCashCover,
          projectedBalancecost: formData.projectedBalancecost,
          totalExposureTill: formData.totalExposureTill,
          misDate: dayjs(currentDate).format(DATE_TIME_FORMAT_WITH_SECONDS),
          createdBy: userDetails?.EmailId,
          asOnDate: dayjs(formData.asOnDate).format(DATE_TIME_FORMAT_WITH_SECONDS),
        },
        updateCallBack,
      ),
      onClose(),
    );
  };
  return (
    <Modal
      size={"lg"}
      opened={open}
      onClose={() => {
        onClose();
        form.reset();
      }}
      title={
        <Flex gap={"xs"}>
          <Text size={"md"} fw='bold' color={"#001d56"}>
            Calculate Cash Cover
          </Text>
        </Flex>
      }>
      {data?.map(calc => (
        <form onSubmit={form.onSubmit(handleFormSubmit)} key={"index"}>
          <Flex justify={"space-between"} gap={20}>
            <div>
              <Textarea
                label='Sales Value of Sold Inventory'
                labelProps={{ style: { fontSize: theme.fontSizes.xs, paddingBottom: "5px", color: theme.colors["truboard-grey"] } }}
                mb={8}
                disabled
                value={calc.SalesSoldInventory ? fixedDecimalTwo(calc.SalesSoldInventory) : "N/A"}
              />
              <Text size={8}> {numberToCurrencyWordsFormatted({ number: Number(calc.SalesSoldInventory) ?? 0, indianWordsFormat: true, useComma: true })}</Text>
              <Textarea
                label='Balance receivables from sold units'
                labelProps={{ style: { fontSize: theme.fontSizes.xs, paddingBottom: "5px", color: theme.colors["truboard-grey"] } }}
                mb={8}
                disabled
                value={calc.Balancereceivablessoldunits ? fixedDecimalTwo(calc.Balancereceivablessoldunits) : "N/A"}
              />
              <Text size={8}>
                {" "}
                {numberToCurrencyWordsFormatted({ number: Number(calc.Balancereceivablessoldunits) ?? 0, indianWordsFormat: true, useComma: true })}
              </Text>

              <Textarea
                label='Sold Area'
                labelProps={{ style: { fontSize: theme.fontSizes.xs, paddingBottom: "5px", color: theme.colors["truboard-grey"] } }}
                mb={8}
                disabled
                value={calc.SoldArea ? fixedDecimalTwo(calc.SoldArea) : "N/A"}
              />
              <Text size={8}> {numberToCurrencyWordsFormatted({ number: Number(calc.SoldArea) ?? 0, indianWordsFormat: true, useComma: true })}</Text>
              <Textarea
                label='MSP'
                labelProps={{ style: { fontSize: theme.fontSizes.xs, paddingBottom: "5px", color: theme.colors["truboard-grey"] } }}
                mb={8}
                disabled
                value={calc.Msp ? fixedDecimalTwo(calc.Msp) : "N/A"}
              />
              <Text size={8}> {numberToCurrencyWordsFormatted({ number: Number(calc.Msp) ?? 0, indianWordsFormat: true, useComma: true })}</Text>
              <Textarea
                label='Total Balance receivables from Project'
                labelProps={{ style: { fontSize: theme.fontSizes.xs, paddingBottom: "5px", color: theme.colors["truboard-grey"] } }}
                mb={8}
                disabled
                value={calc.Totalbalancereceivables ? fixedDecimalTwo(calc.Totalbalancereceivables) : "N/A"}
              />
              <Text size={8}>
                {" "}
                {numberToCurrencyWordsFormatted({ number: Number(calc.Totalbalancereceivables) ?? 0, indianWordsFormat: true, useComma: true })}
              </Text>
              <Textarea
                label='Gross Cash Cover'
                labelProps={{ style: { fontSize: theme.fontSizes.xs, paddingBottom: "5px", color: theme.colors["truboard-grey"] } }}
                mb={8}
                disabled
                value={calc.Grossreceivablescover ? fixedDecimalTwo(calc.Grossreceivablescover) : "N/A"}
              />
              <Text size={8}>
                {" "}
                {numberToCurrencyWordsFormatted({ number: Number(calc.Grossreceivablescover) ?? 0, indianWordsFormat: true, useComma: true })}
              </Text>
            </div>
            <div>
              <Textarea
                label='Amount received till Date'
                labelProps={{ style: { fontSize: theme.fontSizes.xs, paddingBottom: "5px", color: theme.colors["truboard-grey"] } }}
                mb={8}
                disabled
                value={calc.TotalReceivedtilldate ? fixedDecimalTwo(calc.TotalReceivedtilldate) : "N/A"}
              />
              <Text size={8}>
                {" "}
                {numberToCurrencyWordsFormatted({ number: Number(calc.TotalReceivedtilldate) ?? 0, indianWordsFormat: true, useComma: true })}
              </Text>
              <Textarea
                label='Total Area'
                labelProps={{ style: { fontSize: theme.fontSizes.xs, paddingBottom: "5px", color: theme.colors["truboard-grey"] } }}
                mb={8}
                disabled
                value={calc.TotalArea ? fixedDecimalTwo(calc.TotalArea) : "N/A"}
              />
              <Text size={8}> {numberToCurrencyWordsFormatted({ number: Number(calc.TotalArea) ?? 0, indianWordsFormat: true, useComma: true })}</Text>
              <Textarea
                label='Unsold Area'
                labelProps={{ style: { fontSize: theme.fontSizes.xs, paddingBottom: "5px", color: theme.colors["truboard-grey"] } }}
                mb={8}
                disabled
                value={calc.UnsoldArea ? fixedDecimalTwo(calc.UnsoldArea) : "N/A"}
              />
              <Text size={8}> {numberToCurrencyWordsFormatted({ number: Number(calc.UnsoldArea) ?? 0, indianWordsFormat: true, useComma: true })}</Text>
              <Textarea
                label='Unsold receivables on MSP'
                labelProps={{ style: { fontSize: theme.fontSizes.xs, paddingBottom: "5px", color: theme.colors["truboard-grey"] } }}
                mb={8}
                disabled
                value={calc.UnsoldreceivablesonMSP ? fixedDecimalTwo(calc.UnsoldreceivablesonMSP) : "N/A"}
              />
              <Text size={8}>
                {" "}
                {numberToCurrencyWordsFormatted({ number: Number(calc.UnsoldreceivablesonMSP) ?? 0, indianWordsFormat: true, useComma: true })}
              </Text>
              <Textarea
                label='Net receivables from Project'
                labelProps={{ style: { fontSize: theme.fontSizes.xs, paddingBottom: "5px", color: theme.colors["truboard-grey"] } }}
                mb={8}
                disabled
                value={calc.NetReceivablesproject ? fixedDecimalTwo(calc.NetReceivablesproject) : "N/A"}
              />
              <Text size={8}>
                {" "}
                {numberToCurrencyWordsFormatted({ number: Number(calc.NetReceivablesproject) ?? 0, indianWordsFormat: true, useComma: true })}
              </Text>
              <Textarea
                label='Net Cash Cover'
                labelProps={{ style: { fontSize: theme.fontSizes.xs, paddingBottom: "5px", color: theme.colors["truboard-grey"] } }}
                mb={8}
                disabled
                value={calc.NetReceivablescover ? fixedDecimalTwo(calc.NetReceivablescover) : "N/A"}
              />
              <Text size={8}>
                {" "}
                {numberToCurrencyWordsFormatted({ number: Number(calc.NetReceivablescover) ?? 0, indianWordsFormat: true, useComma: true })}
              </Text>
            </div>
          </Flex>
          <Space h={"sm"} />
          <Table>
            <tbody key={"index"}>
              <TableRow
                fullWidth
                title={"Stipulated Cash Cover"}
                value={<NumberInput placeholder='Enter Value' min={0} hideControls precision={2} {...form.getInputProps("stipulatedCashCover")} />}
              />
              <TableRow
                title={"Projected Balance cost of project"}
                value={
                  <>
                    <NumberInput placeholder='Enter Value' min={0} hideControls precision={2} {...form.getInputProps("projectedBalancecost")} />
                    <Text>
                      {" "}
                      {numberToCurrencyWordsFormatted({ number: Number(form.values.projectedBalancecost) ?? 0, indianWordsFormat: true, useComma: true })}
                    </Text>
                  </>
                }
              />
              <TableRow
                title={"Total exposure till Date"}
                value={
                  <>
                    <NumberInput min={0} hideControls precision={2} placeholder='Enter Value' {...form.getInputProps("totalExposureTill")} />
                    <Text>
                      {" "}
                      {numberToCurrencyWordsFormatted({ number: Number(form.values.totalExposureTill) ?? 0, indianWordsFormat: true, useComma: true })}
                    </Text>
                  </>
                }
              />
              <TableRow
                title={"As on date"}
                value={
                  <DatesProvider settings={{ firstDayOfWeek: 0, weekendDays: [0] }}>
                    <DatePickerInput label='' valueFormat={DEFAULT_DATE_FORMAT} maxDate={new Date()} {...form.getInputProps("asOnDate")} />
                  </DatesProvider>
                }
              />
              <TableRow
                title={""}
                value={
                  <Flex justify={"end"}>
                    <Button color='truboard-primary.0' onClick={handleCalculateCash} loading={loader?.calculateCashCover}>
                      Calculate
                    </Button>
                  </Flex>
                }
              />

              <TableRow title={"Is cash Cover met?"} value={<TextInput disabled placeholder='' value={calc.cashcovermet === 1 ? "Yes" : "NO"} />} />
              <TableRow title={"Cash Cover"} value={<Text>{calc?.cashcovervalue ? calc?.cashcovervalue : "-"}</Text>} />
            </tbody>
          </Table>

          <Flex justify={"end"}>
            <Button color='truboard-primary.0' type='submit' loading={loader?.updateCashCover}>
              Update Cash Cover
            </Button>
          </Flex>
        </form>
      ))}
    </Modal>
  );
};

export default ClaculateCashModal;
