import { Button, Card, FileButton, Flex, Select, SimpleGrid, Table, Text, Textarea, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import ViewIcon from "../../../../../assets/logos/SVG/view.svg";
import uploadDocument from "../../../../../assets/logos/upload.svg";
import {
  getNOCDecisionRequested,
  getNOCPaymentDetailsRequested,
  getNOCRequestRemarksRequested,
  getNocDeveloperDocRefRequested,
  getNocLetterRequested,
  getNocPriceHeadersRequested,
  getNocRequestChangeHistoryRequested,
  newsendNocAuthorizeRequested,
  sendNocAuthorizeFailed,
  sendNocAuthorizeRequested,
} from "../../../../../lib/services/HDFC/NOCManageRequest/actions";
import { NocSendBackUsers } from "../../../../../lib/services/HDFC/NOCManageRequest/dataTypes";
import {
  selectManageRequestLoaders,
  selectedAuthorizeNocData,
  selectedNocDecisionData,
  selectedNocDeveloperDocRefData,
  selectedNocPaymentDetails,
  selectedNocPriceHeadersData,
  selectedNocRequestRemarksData,
} from "../../../../../lib/services/HDFC/NOCManageRequest/selectors";
import { selectSetProject } from "../../../../../lib/services/HDFC/Project/selectors";
import { selectUserDetails } from "../../../../../lib/services/hdfc_login/selectors";
import { ROUTES } from "../../../../../routeConstants";
import { convertDateFormatMMM, mime_types } from "../../../../../utils/commonFunctions";
import { numberWithCommasAndFraction } from "../../../../../widgets/charts/Recharts/utils";
import TableWithAction from "../../../../../widgets/tables/MantineTable/NewTableWithActions";
import { TableRow } from "../../../../Components/TableRow";
import { Currency, getPresentableValue, numberToCurrencyWordsFormatted } from "../../../../Components/UtilityFunctions";
import ChangeHistoryModal from "./Modal/ChangeHistoryModal";
import NOCTimelineModal from "./Modal/NOC-TimelineModal";
import PaymentVerificationModal from "./Modal/PaymentVerificationModal";
import ViewDocumentModal from "./Modal/ViewDocumentModal";
import ViewSendBackToListModal from "./Modal/ViewSendBackToList";
import { selectNOCSalesUnitList } from "../../../../../lib/services/HDFC/ExternalNOC/selectors";
import { SalesUnitForNOC } from "../../../../../lib/services/HDFC/ExternalNOC/dataTypes";

type FinalDecisionForm = {
  remark?: string;
  finalDecision?: string;
  multipartFile?: File;
  sign?: File;
  sellPriceConsidrationNeeded?: string;
  sellPriceConsidrationNeededRemarks?: string;
  advPaymentConsidrationNeneded?: string;
  advPaymentConsidrationNenededRemarks?: string;
};

const selectdecisions = {
  Approve: "Approve",
  SendBack: "Send Back",
  Reject: "Reject",
};

const AuthorizationRequestPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isCancelNOC = location.state.cancelNoc;
  const loaders = useSelector(selectManageRequestLoaders);
  const userDetails = useSelector(selectUserDetails);
  const decisionData = useSelector(selectedNocDecisionData);
  const selectedProject = useSelector(selectSetProject);
  const priceHeaders = useSelector(selectedNocPriceHeadersData);
  const nocPaymentDetails = useSelector(selectedNocPaymentDetails);
  const authorizeNoc = useSelector(selectedAuthorizeNocData);
  const nocRequestRemarks = useSelector(selectedNocRequestRemarksData);
  const nocDeveloperDocRef = useSelector(selectedNocDeveloperDocRefData);
  const requestData = location?.state?.requestData;
  const [ViewChangeModalState, { open: openViewChangeModal, close: closeViewChangeModal }] = useDisclosure(false);
  const [ViewPaymentModalState, { open: openViewPaymentModal, close: closeViewPaymentModal }] = useDisclosure(false);
  const [ViewSendBackToListState, { open: openSendBackToListModal, close: closeSendBackToListModal }] = useDisclosure(false);
  const [isViewDocumentModalOpened, { open: openViewDocumentModal, close: closeViewDocumentModal }] = useDisclosure(false);
  const [isNOCTimelineModalOpened, { open: openNOCTimelineModal, close: closeNOCTimelineModal }] = useDisclosure(false);
  const [selectedRow, setSelectedRow] = useState<NocSendBackUsers | undefined>(undefined);
  const [selectedUnit, setSelectedUnit] = useState("");
  const unitList = useSelector(selectNOCSalesUnitList) as SalesUnitForNOC[];

  useEffect(() => {
    if (requestData && requestData.NocRequestId) {
      dispatch(getNOCDecisionRequested(requestData.NocRequestId, userDetails?.EmailId ?? ""));
      dispatch(getNocDeveloperDocRefRequested({ nocRequestId: requestData.NocRequestId }));
      !isCancelNOC && dispatch(getNOCPaymentDetailsRequested(requestData.NocRequestId));
      !isCancelNOC &&
        requestData.NocProjectId &&
        dispatch(getNOCRequestRemarksRequested({ projectId: requestData.NocProjectId, NocRequestId: requestData.NocRequestId }));
    }
  }, [requestData]);

  useEffect(() => {
    if (decisionData?.UnitNo) {
      const unitDetail = unitList?.find(unit => unit?.UnitLocationNumber === decisionData?.UnitNo);
      unitDetail && setSelectedUnit(unitDetail?.AreaConsideredMeasurement);
    }
    if (!isCancelNOC && decisionData && selectedProject?.NocProjectId)
      dispatch(getNocPriceHeadersRequested(selectedProject.NocProjectId, Number(decisionData.RESalesID), decisionData?.NocRequestId));
    !isCancelNOC &&
      decisionData?.NocRequestId &&
      userDetails?.EmailId &&
      dispatch(getNocRequestChangeHistoryRequested(decisionData.NocRequestId, userDetails.EmailId));
  }, [decisionData, requestData?.nocRequestId]);

  const ShowAmountComponent = ({
    title,
    amount,
    forceShowDecimals,
    color,
    equal,
  }: {
    title: string;
    amount: string | number;
    forceShowDecimals?: boolean;
    color?: string;
    equal?: boolean;
  }) => {
    return (
      <TableRow
        title={title}
        centerHeader={false}
        value={
          <>
            <Text color={color}>
              <Currency value={amount} currencyCode='INR' forceShowDecimals={forceShowDecimals ?? false} />
            </Text>
            <Text size={"xs"} color='#bbb'>
              {numberToCurrencyWordsFormatted({ number: Number(amount) ?? 0, indianWordsFormat: true, useComma: true })}
            </Text>
          </>
        }
        equal={equal}
      />
    );
  };

  const totalSaleValue = useMemo(() => {
    return priceHeaders
      ? priceHeaders?.reduce((total, item) => {
          if (item.ValueType === "Sale Value") {
            return total + item.amount;
          }
          return total;
        }, 0)
      : 0;
  }, [priceHeaders]);

  const totalPTCValue = useMemo(() => {
    return priceHeaders
      ? priceHeaders?.reduce((total, item) => {
          if (item.ValueType === "Pass Through Charges") {
            return total + item.amount;
          }
          return total;
        }, 0)
      : 0;
  }, [priceHeaders]);

  const amountVerified = useMemo(() => {
    return nocPaymentDetails
      ? nocPaymentDetails?.reduce((total, item) => {
          if (item.Status === "Verified") {
            return total + Number(item.amount);
          }
          return total;
        }, 0)
      : 0;
  }, [nocPaymentDetails]);

  const amountNotVerified = useMemo(() => {
    return nocPaymentDetails
      ? nocPaymentDetails?.reduce((total, item) => {
          if (item.Status === "Not Verified") {
            return total + Number(item.amount);
          }
          return total;
        }, 0)
      : 0;
  }, [nocPaymentDetails]);

  const balanceRecievable = useMemo(() => {
    return (
      (totalSaleValue ?? 0) +
      (totalPTCValue ?? 0) -
      ((decisionData?.PaymentReceivedAgainstSaleValue ?? 0) + (decisionData?.PaymentReceivedAgainstPTC ?? 0 ?? 0))
    );
  }, [totalSaleValue, totalPTCValue, amountVerified, amountNotVerified]);

  const formDataIntialValues = useMemo(() => {
    return {
      remark: "",
      finalDecision: "",
      multipartFile: undefined,
      sign: undefined,
      sellPriceConsidrationNeededRemarks: "",
      sellPriceConsidrationNeeded: "",
      advPaymentConsidrationNeneded: "",
      advPaymentConsidrationNenededRemarks: "",
    };
  }, []);

  const form = useForm<FinalDecisionForm>({
    initialValues: formDataIntialValues,
    validateInputOnChange: true,
    validate: {
      finalDecision: value => (value ? null : "This field cannot be empty."),
      remark: (value, values) => {
        if (value && value?.trim().length > 500) {
          return "The remarks cannot be more than 500 characters";
        }
        const remarksRequired =
          (values.finalDecision !== selectdecisions.Approve && !isCancelNOC) || (isCancelNOC && values.finalDecision === "Reject Request");
        const remarksException = (!isCancelNOC && values.finalDecision === selectdecisions.Approve) || (isCancelNOC && values.finalDecision === "Cancel NOC");

        const remarksValidation = value !== undefined && value.length > 0;

        return remarksException || (remarksRequired && remarksValidation) ? null : "This field cannot be empty.";

        // return values.finalDecision === "Cancel NOC" || (!isCancelNOC && form.values.finalDecision === selectdecisions.Approve)
        //   ? null
        //   : "This field cannot be empty.";
      },
      multipartFile: value => {
        if (value) {
          const isAllowedFile = mime_types.pdf === value.type;
          const isWithinSize = value.size / 1000000 < 5 ? true : false;
          if (!isWithinSize) {
            return " Authorization/Issuance Letter cannot be greater than 5mb.";
          }

          if (!isAllowedFile) {
            return "Authorization/Issuance Letter should be in pdf format only.";
          }
        }

        if (
          !isCancelNOC &&
          form.values?.finalDecision === selectdecisions.Approve &&
          (userDetails?.TemplateRoleName === "CAD MAKER" || (userDetails?.TemplateRoleName === "RM" && decisionData?.NextPriority === 6)) &&
          !value
        ) {
          return "Please upload a file";
        } else if (value && value.type !== "application/pdf") {
          return "Please upload PDF File";
        }
        return null;
      },
      sellPriceConsidrationNeededRemarks: value => (form.values.sellPriceConsidrationNeeded === "Yes" && !value ? "This field cannot be empty." : null),
      advPaymentConsidrationNenededRemarks: value => (form.values.advPaymentConsidrationNeneded === "Yes" && !value ? "This field cannot be empty." : null),
    },
  });

  const finalDecisionSelect = useMemo(() => {
    if (isCancelNOC) return ["Cancel NOC", "Reject Request"];
    else {
      if (decisionData?.CanReject && decisionData?.CanSendBack) return [selectdecisions.Approve, selectdecisions.Reject, selectdecisions.SendBack];
      else if (decisionData?.CanReject) return [selectdecisions.Approve, selectdecisions.Reject];
      else if (decisionData?.CanSendBack) return [selectdecisions.Approve, selectdecisions.SendBack];
      else return [selectdecisions.Approve];
    }
  }, [decisionData]);

  useEffect(() => {
    !isCancelNOC &&
      form.values?.sign &&
      decisionData?.NocProjectId &&
      userDetails?.EmailId &&
      dispatch(
        getNocLetterRequested(decisionData.NocProjectId, "issue", userDetails.EmailId, JSON.stringify({ noc: 1 }), decisionData.NocRequestId, form.values.sign),
      );
  }, [form.values?.sign]);

  useEffect(() => {
    if (authorizeNoc && authorizeNoc.info.code === 100) {
      form.reset();
      navigate(ROUTES.NOC_MANAGE_REQUEST, {});
      dispatch(sendNocAuthorizeFailed());
    }
  }, [authorizeNoc]);

  const callBack = (success: boolean) => {
    if (success) navigate(ROUTES.NOC_MANAGE_REQUEST);
  };

  return (
    <Flex direction={"column"} p='md'>
      <Flex justify={"space-between"} align={"center"} my={10}>
        <Title order={5} mb='md' color='#001d56'>
          Project Name : {selectedProject?.AssetName}
        </Title>
        <Title order={5} color='#001d56'>
          Group Name : {selectedProject?.DeveloperName}
        </Title>
        {!isCancelNOC && (
          <Button color='green' size='sm' onClick={openViewChangeModal}>
            View Changes
          </Button>
        )}
      </Flex>
      <form
        onSubmit={form.onSubmit(values => {
          if ((values.finalDecision !== selectdecisions.SendBack || selectedRow) && decisionData?.Requesttype === "New Request") {
            const obj = {
              projectid: decisionData?.NocProjectId ? String(decisionData.NocProjectId) : undefined,
              requestid: decisionData?.NocRequestId ? String(decisionData?.NocRequestId) : undefined,
              status: values.finalDecision === selectdecisions.SendBack ? "Hold" : values.finalDecision,
              filename: values.multipartFile?.name,
              bucketname: "renoc",
              foldername: `${decisionData?.ProjectName ?? ""}/${decisionData?.PurchaserName}`,
              unitno: decisionData?.UnitNo,
              towerName: decisionData?.TowerName,
              wing: decisionData?.Wing,
              isDeviation: decisionData?.isdeviation === "Yes" ? "1" : "0",
              remark: values?.remark,
              holdbackuser: selectedRow?.EntityRole ?? undefined,
              stepType: decisionData?.StepType,
              nocType: decisionData?.TypeOfNoc,
              createBy: userDetails?.EmailId,
              file: values.multipartFile ?? undefined,
              sellPriceConsidrationNeeded: values.sellPriceConsidrationNeeded,
              sellPriceConsidrationNeededRemarks: values.sellPriceConsidrationNeededRemarks,
              advPaymentConsidrationNeneded: values.advPaymentConsidrationNeneded,
              advPaymentConsidrationNenededRemarks: values.advPaymentConsidrationNenededRemarks,
            };
            dispatch(sendNocAuthorizeRequested(obj));
          }
          if (decisionData?.Requesttype !== "New Request") {
            dispatch(
              newsendNocAuthorizeRequested(
                decisionData?.NocProjectId ?? undefined,
                decisionData?.NocRequestId ?? undefined,
                values?.finalDecision ?? "",
                callBack,
              ),
            );
          }
        })}>
        <Card withBorder shadow='sm' radius='md'>
          <SimpleGrid cols={2}>
            <Table>
              <tbody>
                <TableRow title='Date of Request' value={<Text>{convertDateFormatMMM(decisionData?.RequestDate ?? "")}</Text>} equal />
                <TableRow title='Date of Booking' value={<Text>{convertDateFormatMMM(decisionData?.BookingDate ?? "")}</Text>} equal />
              </tbody>
            </Table>
            <Table>
              <tbody>
                <TableRow title='Type of NOC' value={<Text>{decisionData?.TypeOfNoc ?? ""}</Text>} equal />
                <TableRow title='Developer Letter Reference No.' value={<Text>{nocDeveloperDocRef?.[0]?.RefNo ?? ""}</Text>} equal />
              </tbody>
            </Table>
          </SimpleGrid>
        </Card>

        {/* unit-details-start */}
        <>
          <Flex justify='space-between' align='center' my='xs'>
            <Title order={4} color='#001d56'>
              Unit Details
            </Title>
            {!isCancelNOC && (
              <Button color='green' size='sm' onClick={openNOCTimelineModal}>
                NOC History
              </Button>
            )}
          </Flex>
          <Card withBorder shadow='sm' radius='md'>
            <SimpleGrid cols={2}>
              <Table>
                <tbody>
                  <TableRow title='Product Sub-Type' value={<Text>{decisionData?.ProductSubType}</Text>} equal />
                  <TableRow title='Floor' value={<Text>{decisionData?.UnitFloor == "-1000" ? "" : decisionData?.UnitFloor}</Text>} equal />
                  <TableRow title='Unit Configuration' value={<Text>{decisionData?.UnitConfiguration}</Text>} equal />
                  <TableRow title='Owned By' value={<Text>{decisionData?.UnitOwnedBy}</Text>} equal />
                  <TableRow title='Approval Status' value={<Text>{decisionData?.ApprovalStatus}</Text>} equal />
                </tbody>
              </Table>
              <Table>
                <tbody>
                  <TableRow title='Wing' value={<Text>{decisionData?.Wing}</Text>} equal />
                  <TableRow title='Unit Number' value={<Text>{decisionData?.UnitNo}</Text>} equal />
                  <TableRow title='Category' value={<Text>{decisionData?.Category}</Text>} equal />
                  <TableRow
                    title={`Area ${selectedUnit ? `(${selectedUnit})` : ""}`}
                    value={
                      <Text color={decisionData?.orgSaleableArea && decisionData?.UnitAreaSaleable !== decisionData?.orgSaleableArea ? "red" : ""}>
                        {decisionData?.UnitAreaSaleable}
                      </Text>
                    }
                    equal
                  />
                  <TableRow title='Security Status' value={<Text>{decisionData?.MortgageStatus}</Text>} equal />
                </tbody>
              </Table>
            </SimpleGrid>
          </Card>
        </>
        {/* unit-details-end */}

        {/* purchaser-details-start */}
        {!isCancelNOC && (
          <>
            <Title order={4} color='#001d56' my='xs'>
              Purchaser Detail
            </Title>
            <Card withBorder shadow='sm' radius='md'>
              <SimpleGrid cols={2}>
                <Table>
                  <tbody>
                    <TableRow
                      title='Purchaser Name'
                      value={
                        <Text color={decisionData?.orgCustomerName && decisionData?.PurchaserName !== decisionData?.orgCustomerName ? "red" : ""}>
                          {decisionData?.PurchaserName}
                        </Text>
                      }
                      equal
                    />
                    <TableRow
                      title='Purchaser Profile'
                      value={
                        <Text color={decisionData?.orgCustomerProfile && decisionData?.PurchaserProfile !== decisionData?.orgCustomerProfile ? "red" : ""}>
                          {decisionData?.PurchaserProfile}
                        </Text>
                      }
                      equal
                    />
                  </tbody>
                </Table>
                <Table style={{ height: "fit-content" }}>
                  <tbody>
                    <TableRow
                      title='Financer'
                      value={
                        <Text color={decisionData?.orgBuyerLendingBank && decisionData?.Financer !== decisionData?.orgBuyerLendingBank ? "red" : ""}>
                          {decisionData?.Financer}
                        </Text>
                      }
                      equal
                    />
                  </tbody>
                </Table>
              </SimpleGrid>
            </Card>
          </>
        )}
        {/* purchaser-details-end */}

        {/* preferences-details-start */}
        {!isCancelNOC && (
          <>
            <Title order={4} color='#001d56' my='xs'>
              Preferences
            </Title>

            <Card withBorder shadow='sm' radius='md'>
              <SimpleGrid cols={2}>
                <Table style={{ height: "fit-content" }}>
                  <tbody>
                    <TableRow
                      title='Is Account Delinquent?'
                      value={<Text color={decisionData?.isdeviation !== "No" ? "red" : ""}>{decisionData?.isdeviation ?? "-"}</Text>}
                      equal
                    />
                    <TableRow
                      title={`Cash cover (as on ${decisionData?.cashCovertAsOnDate ? dayjs(decisionData?.cashCovertAsOnDate).format("DD MMM YYYY") : ""})`}
                      value={
                        <Text color={Number(decisionData?.StipulatedCashCover) > Number(decisionData?.cashcover) ? "red" : ""}>
                          {decisionData?.cashcover ?? 0}
                        </Text>
                      }
                      equal
                    />
                    <TableRow
                      title={`Security cover (as on ${
                        decisionData?.securityCovertAsOnDate ? dayjs(decisionData?.securityCovertAsOnDate).format("DD MMM YYYY") : ""
                      })`}
                      value={
                        <Text color={Number(decisionData?.StipulatedSecurityCover) > Number(decisionData?.securitycover) ? "red" : ""}>
                          {decisionData?.securitycover ?? 0}
                        </Text>
                      }
                      equal
                    />
                  </tbody>
                </Table>
                <Table style={{ height: "fit-content" }}>
                  <tbody>
                    <TableRow title='Stipulated cash cover' value={<Text>{decisionData?.StipulatedCashCover ?? "-"}</Text>} equal />
                    <TableRow title='Stipulated Security Cover' value={<Text>{decisionData?.StipulatedSecurityCover ?? "-"}</Text>} equal />
                    <ShowAmountComponent title={`Contractual MSP to achieve  Stipulated cash cover`} amount={decisionData?.msprequiredforcashcover ?? 0} />
                  </tbody>
                </Table>
              </SimpleGrid>
            </Card>
          </>
        )}
        {/* preferences-details-end */}

        {/* payment-details-start */}
        {!isCancelNOC && (
          <>
            <Flex justify='space-between' align='center' my='xs'>
              <Title order={4} color='#001d56' my='xs'>
                Payment Details
              </Title>
              <Button color='green' size='sm' onClick={openViewPaymentModal}>
                View Payment
              </Button>
            </Flex>
            <Card withBorder shadow='sm' radius='md'>
              <SimpleGrid cols={2}>
                <Table style={{ height: "fit-content" }}>
                  <tbody>
                    <ShowAmountComponent
                      title='Total Sale Value'
                      amount={totalSaleValue.toString()}
                      color={
                        (decisionData?.orgTotalSaleValue && totalSaleValue !== decisionData?.orgTotalSaleValue) || decisionData?.SaleStage === "UnSold"
                          ? ""
                          : "red"
                      }
                      equal
                    />
                    <ShowAmountComponent
                      title='Total PTC charges'
                      amount={totalPTCValue.toString()}
                      color={decisionData?.orgTotalPtcValue && totalPTCValue !== decisionData?.orgTotalPtcValue ? "red" : ""}
                      equal
                    />
                  </tbody>
                </Table>
                <Table style={{ height: "fit-content" }}>
                  <tbody>
                    {priceHeaders
                      ?.filter(v => v.ValueType === "Sale Value")
                      ?.map((item, index) => {
                        return <ShowAmountComponent key={index} title={item.HeaderValue} amount={item.amount.toString()} equal />;
                      })}
                    {priceHeaders
                      ?.filter(v => v.ValueType === "Pass Through Charges")
                      ?.map((item, index) => {
                        return <ShowAmountComponent key={index} title={item.HeaderValue} amount={item.amount.toString()} equal />;
                      })}
                  </tbody>
                </Table>
              </SimpleGrid>
            </Card>
            <Card withBorder shadow='sm' radius='md' my='xs'>
              <SimpleGrid cols={2}>
                <Table style={{ height: "fit-content" }}>
                  <tbody>
                    <ShowAmountComponent title='Payment received against sale value' amount={decisionData?.PaymentReceivedAgainstSaleValue ?? 0} equal />
                    <ShowAmountComponent title='Amount Verified' amount={amountVerified} color='green' equal />
                    <ShowAmountComponent title='Balance Receivable' amount={balanceRecievable} equal />
                  </tbody>
                </Table>
                <Table style={{ height: "fit-content" }}>
                  <tbody>
                    <ShowAmountComponent title='Payment received against PTC' amount={decisionData?.PaymentReceivedAgainstPTC ?? 0} equal />
                    <ShowAmountComponent title='Amount Not Verified' amount={amountNotVerified} color='red' equal />
                  </tbody>
                </Table>
              </SimpleGrid>
            </Card>
          </>
        )}
        {/* payment-details-end */}

        {/* decision-details-start */}
        {location.state?.decision && !isCancelNOC && (
          <>
            <Title order={4} my='xs' color='#001d56'>
              Decision
            </Title>

            <Title order={5} my='xs' color='#001d56'>
              Selling Price Threshold
            </Title>
            <Card withBorder shadow='sm' radius='md'>
              <SimpleGrid cols={2}>
                <Table style={{ height: "fit-content" }}>
                  <tbody>
                    <TableRow
                      title='Contractual MSP'
                      value={
                        <Text>
                          <Currency value={decisionData?.MinSellPrice} currencyCode='INR' />
                        </Text>
                      }
                      equal
                    />
                    <TableRow
                      title='Price Achieved as per Sales MIS'
                      value={
                        <Text color={Number(decisionData?.SellingPrice) < Number(decisionData?.MinSellPrice) ? "red" : ""}>
                          <span>&#8377;</span> {numberWithCommasAndFraction(decisionData?.SellingPrice ?? 0, 0)}
                        </Text>
                      }
                      equal
                    />
                    <TableRow title='Variance(%)' value={<Text>{numberWithCommasAndFraction(decisionData?.spvariance ?? 0)}</Text>} equal />
                    <TableRow
                      title='Margin of Tolerance(%)'
                      value={<Text>{numberWithCommasAndFraction(decisionData?.MinSellPriceTolerance ?? 0)}</Text>}
                      equal
                    />
                  </tbody>
                </Table>

                <Table style={{ height: "fit-content" }}>
                  <tbody>
                    {/* <TableRow
                      title='Consideration Needed: (Yes/No)'
                      value={<Select w={250} placeholder='Select..' data={["Yes", "No"]} {...form.getInputProps("sellPriceConsidrationNeeded")} /> equal}
                    /> */}
                    {form.values?.sellPriceConsidrationNeeded === "Yes" && (
                      <TableRow
                        title='Remark'
                        value={<Textarea w={500} placeholder='Remark...' withAsterisk {...form.getInputProps("sellPriceConsidrationNeededRemarks")} />}
                        withAsterisk
                        equal
                      />
                    )}
                    <ShowAmountComponent title='Price Achieved as per MSP Parameters' amount={decisionData?.PriceAchievedAsPerMSPParameter ?? 0} equal />
                    <ShowAmountComponent
                      title='Average Price Achieved'
                      amount={decisionData?.AvaragePriceAchieved ?? 0}
                      color={Number(decisionData?.MinSellPrice) > Number(decisionData?.AvaragePriceAchieved) ? "red" : ""}
                    />
                  </tbody>
                </Table>
              </SimpleGrid>
            </Card>

            <Title order={5} my='xs' color='#001d56'>
              Advance Payment Threshold
            </Title>
            <Card withBorder shadow='sm' radius='md'>
              <SimpleGrid cols={2}>
                <Table style={{ height: "fit-content" }}>
                  <tbody>
                    <TableRow
                      title='Min Advanced Payment Required(%)'
                      value={<Text>{numberWithCommasAndFraction(decisionData?.MinAdvancePayment ?? 0)}</Text>}
                      equal
                    />
                    <TableRow
                      title='Advanced Payment Received (%)'
                      value={<Text>{numberWithCommasAndFraction(decisionData?.AdvancePaymentReceivedpercentage ?? 0)}</Text>}
                      equal
                    />
                    <TableRow
                      title='Variance(%)'
                      value={
                        <Text>
                          {numberWithCommasAndFraction(
                            decisionData?.MinAdvancePayment !== undefined && decisionData?.AdvancePaymentReceivedpercentage !== undefined
                              ? Number(decisionData.MinAdvancePayment) - decisionData.AdvancePaymentReceivedpercentage
                              : 0,
                          )}
                        </Text>
                      }
                      equal
                    />
                    <TableRow
                      title='Margin of Tolerance(%)'
                      value={<Text>{numberWithCommasAndFraction(decisionData?.MinAdvancePaymentTolerance ?? 0)}</Text>}
                      equal
                    />
                  </tbody>
                </Table>
                <Table style={{ height: "fit-content" }}>
                  <tbody>
                    {/* <TableRow
                      title='Consideration Needed: (Yes/No)'
                      value={<Select w={250} placeholder='Select..' data={["Yes", "No"]} {...form.getInputProps("advPaymentConsidrationNeneded")} equal/>}
                    /> */}
                    {form.values?.advPaymentConsidrationNeneded === "Yes" && (
                      <TableRow
                        title='Remark'
                        value={<Textarea w={500} placeholder='Remark...' withAsterisk {...form.getInputProps("advPaymentConsidrationNenededRemarks")} />}
                        withAsterisk
                        equal
                      />
                    )}
                  </tbody>
                </Table>
              </SimpleGrid>
            </Card>
          </>
        )}
        {/* decision-details-end */}

        {/* remark-history-start */}
        {!isCancelNOC && (
          <>
            <Flex justify='space-between' align='center'>
              <Title order={4} color='#001d56' my='xs'>
                Remarks History
              </Title>
            </Flex>
            <TableWithAction
              loader={loaders?.nocRequestRemarks}
              columns={[
                {
                  title: "Date",
                  accessorKey: "date",
                  transform: (value: string) => <Text title={getPresentableValue(value, true) as string}>{getPresentableValue(value, true) as string}</Text>,
                },
                { title: "Entity Role", accessorKey: "EntityRole" },
                { title: "Entity Name", accessorKey: "EntityName" },
                { title: "User", accessorKey: "user" },
                { title: "Decision", accessorKey: "desicion" },
                { title: "Remarks", accessorKey: "Remark" },
              ]}
              data={nocRequestRemarks ?? []}
              noMargin
            />
          </>
        )}
        {/* remark-history-end */}

        {/* final-decision-start */}
        {location.state?.decision && (
          <>
            <Title order={4} color='#001d56' my='sm'>
              Final Decision
            </Title>
            <Card withBorder shadow='sm' radius='md' style={{ overflow: "visible" }}>
              <TableRow
                withAsterisk
                title='Final Decision'
                value={
                  <Flex gap='md'>
                    <Select searchable placeholder='Select your decision' data={finalDecisionSelect} {...form.getInputProps("finalDecision")} />{" "}
                    {form.values.finalDecision === selectdecisions.SendBack && (
                      <Button
                        color='green'
                        // mt={5}
                        onClick={() => {
                          openSendBackToListModal();
                        }}>
                        {`${selectdecisions.SendBack} To`}
                      </Button>
                    )}
                  </Flex>
                }
              />
              {!isCancelNOC &&
                form.values?.finalDecision === selectdecisions.Approve &&
                (userDetails?.TemplateRoleName === "CAD MAKER" ||
                  userDetails?.TemplateRoleName === "CAD CHECKER" ||
                  (userDetails?.TemplateRoleName === "RM" && decisionData?.NextPriority === 6)) && (
                  <>
                    {userDetails?.TemplateRoleName !== "CAD MAKER" && (
                      <TableRow
                        title='View Document'
                        fullWidth
                        value={
                          <img src={ViewIcon} style={{ width: "20px", height: "20px", color: "#001d56", cursor: "pointer" }} onClick={openViewDocumentModal} />
                        }
                      />
                    )}
                    {!!decisionData?.showdownload && (
                      <TableRow
                        title='Download Authorization/Issuance Letter'
                        withAsterisk
                        fullWidth
                        value={
                          <Flex direction={"row"} gap={"xs"}>
                            <Button
                              onClick={() => {
                                decisionData?.NocProjectId &&
                                  userDetails?.EmailId &&
                                  dispatch(
                                    getNocLetterRequested(decisionData.NocProjectId, "issue", userDetails.EmailId, undefined, decisionData.NocRequestId),
                                  );
                              }}
                              variant='filled'
                              color='green'
                              w={200}>
                              Download
                            </Button>
                            {/* <Center>or</Center> */}
                            {/* <FileButton accept={[mime_types.jpeg, mime_types.png].join(",")} {...form.getInputProps("sign")}>
                              {props => {
                                return (
                                  <Button
                                    {...props}
                                    rightIcon={<img src={downloadDocument} style={{ width: "20px", height: "20px", filter: "invert(1)" }} />}
                                    style={{ marginLeft: ".2em" }}
                                    w={280}>
                                    <Flex direction={"column"}>
                                      <Flex justify={"center"} align={"center"}>
                                        Download Digitally Sign Letter
                                      </Flex>
                                    </Flex>
                                  </Button>
                                );
                              }}
                            </FileButton> */}
                          </Flex>
                        }
                      />
                    )}
                    {userDetails?.TemplateRoleName !== "CAD CHECKER" && (
                      <TableRow
                        title='Upload Authorization/Issuance Letter'
                        withAsterisk
                        value={
                          <FileButton bg={"#001d56"} color='truboard-primary.0' accept={[mime_types.pdf].join(",")} {...form.getInputProps("multipartFile")}>
                            {props => {
                              return (
                                <>
                                  {form.values.multipartFile && (
                                    <>
                                      <Text fw={700}>File Uploaded :</Text>
                                      {form.values.multipartFile?.name}
                                    </>
                                  )}
                                  <Button
                                    bg={"#001d56"}
                                    color='truboard-primary.0'
                                    {...props}
                                    rightIcon={<img src={uploadDocument} style={{ width: "20px", height: "20px", color: "white" }} className='svgColorGray' />}
                                    style={{ marginLeft: ".2em" }}
                                    w={200}>
                                    <Flex direction={"column"}>
                                      <Flex justify={"center"} align={"center"}>
                                        Upload
                                      </Flex>
                                    </Flex>
                                  </Button>
                                  {form.errors?.multipartFile && <Text color='red'>{form.errors?.multipartFile}</Text>}
                                </>
                              );
                            }}
                          </FileButton>
                        }
                      />
                    )}
                  </>
                )}
              <TableRow
                title='Remark'
                value={<Textarea placeholder='Remark...' {...form.getInputProps("remark")} />}
                withAsterisk={
                  form.values.finalDecision !== selectdecisions.Approve || isCancelNOC
                  // form.values.finalDecision === "Reject Request" || !isCancelNOC || (isCancelNOC && form.values.finalDecision === selectdecisions.Reject)
                }
              />
            </Card>
            <Flex justify={"end"}>
              <Button color='green' type='submit' mt={10} pl={30} pr={30} loading={loaders?.authorizeNoc}>
                Submit
              </Button>
            </Flex>
          </>
        )}
        {/* Final decision end */}
      </form>
      {ViewChangeModalState && <ChangeHistoryModal open={ViewChangeModalState} onClose={closeViewChangeModal} modalData={decisionData} />}
      {ViewPaymentModalState && (
        <PaymentVerificationModal open={ViewPaymentModalState} onClose={closeViewPaymentModal} modalData={requestData} decision={true} />
      )}
      {ViewSendBackToListState && (
        <ViewSendBackToListModal open={ViewSendBackToListState} onClose={closeSendBackToListModal} selectedRow={selectedRow} setSelectedRow={setSelectedRow} />
      )}
      {isViewDocumentModalOpened && (
        <ViewDocumentModal open={isViewDocumentModalOpened} onClose={closeViewDocumentModal} modalData={location.state.requestData} />
      )}
      {isNOCTimelineModalOpened && (
        <NOCTimelineModal
          open={isNOCTimelineModalOpened}
          onClose={() => {
            closeNOCTimelineModal();
          }}
          modalData={requestData}
        />
      )}
    </Flex>
  );
};

export default AuthorizationRequestPage;
