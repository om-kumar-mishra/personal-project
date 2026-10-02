import { Button, Card, FileButton, Flex, Group, Loader, Text, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { modals, openConfirmModal } from "@mantine/modals";
import dayjs from "dayjs";
import { round } from "lodash";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import addLogo from "../../../../assets/logos/SVG/add_new.svg";
import UploadDocument from "../../../../assets/logos/upload.svg";
import {
  createExternalNOCRequested,
  getNOCAccountReset,
  getNOCPriceHeaderReset,
  getNOCTypeListRequested,
  getNOCTypeListReset,
  getSalesUnitForNOCReset,
  paymentVerificationRequested,
  paymentVerificationReset,
} from "../../../../lib/services/HDFC/ExternalNOC/actions";
import { paymentVerificationAPI } from "../../../../lib/services/HDFC/ExternalNOC/api";
import {
  CreateDocumentDetails,
  CreateExternalNOCData,
  NOCFormData,
  NOCPriceHeader,
  PaymentVerificationResponse,
  SalesUnitForNOC,
} from "../../../../lib/services/HDFC/ExternalNOC/dataTypes";
import { selectExternalNOCLoaders, selectNOCPriceHeaderList } from "../../../../lib/services/HDFC/ExternalNOC/selectors";
import { Project } from "../../../../lib/services/HDFC/Project/dataTypes";
import { selectSetProject } from "../../../../lib/services/HDFC/Project/selectors";
import { UserDetails } from "../../../../lib/services/hdfc_login/dataTypes";
import { selectAccessToken, selectUserDetails } from "../../../../lib/services/hdfc_login/selectors";
import { ROUTES } from "../../../../routeConstants";
import { mime_types } from "../../../../utils/commonFunctions";
import { errorNotification, successNotification } from "../../../../utils/notifications";
import CommonAddButton from "../../../Components/Buttons";
import AddNOC from "./AddNOC";
import BankStatement from "./BankStatement";
import PaymentVerification from "./PaymentVerification";

function ExternalNOC() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //#region [selector]
  const accessToken = useSelector(selectAccessToken) as string;
  const userDetails = useSelector(selectUserDetails) as UserDetails;
  const project = useSelector(selectSetProject) as Project;
  const priceHeaderList = useSelector(selectNOCPriceHeaderList) as NOCPriceHeader[];
  // const paymentTransList = useSelector(selectPaymentTransactionList) as PaymentVerificationResponse;
  //#endregion

  const nocForm = useForm<NOCFormData>({
    initialValues: {
      date_of_request: new Date(),
      unit_no: "",
      type_of_noc: "Conditional NOC",
      date_of_booking: null,
      noc_issue_date: null,
      product_sub_type: "",
      floor: "",
      wing: "",
      area: "",
      approval_status: "",
      security_status: "",
      purchaser_name: "",
      purchaser_profile: "",
      payment_received_against_sale_value: "",
      payment_received_against_PTC: "",
      price_achieved_as_per_sales_MIS: 0,
      price_achieved_as_per_parameter: 0,
      contractual_msp: 0,
      financer: "",
      remarks: "",
    },
    validateInputOnChange: true,
    validate: {
      date_of_request: value => (value == null ? "This field cannot be empty." : null),
      unit_no: value => (value == "" || value == null ? "This field cannot be empty." : null),
      type_of_noc: value => (value == "" || value == null ? "This field cannot be empty." : null),
      // date_of_booking: value => (value == null ? "This field cannot be empty." : null),
      noc_issue_date: value => (value == null ? "This field cannot be empty." : null),
      // product_sub_type: value => (value == "" || value == null ? "This field cannot be empty." : null),
      // floor: value => (value == "" || value == null ? "This field cannot be empty." : null),
      // wing: value => (value == "" || value == null ? "This field cannot be empty." : null),
      area: value =>
        value == "" || value == null ? "This field cannot be empty, negative or zero." : Number(value) < 1 ? "This field cannot be negative or zero." : null,
      // approval_status: value => (value == "" || value == null ? "This field cannot be empty." : null),
      // security_status: value => (value == "" || value == null ? "This field cannot be empty." : null),
      purchaser_name: value => {
        if (value.trim() === "") {
          return "This field cannot be empty.";
        } else if (value.trim().length > 50) {
          return "Invalid Input! Input can not be more than 50 characters.";
        } else {
          if (/^[A-Za-z0-9].*/.test(value.trim())) {
            return null;
          } else {
            return "Invalid Input! Input should not start with a special character.";
          }
        }
      },
      purchaser_profile: value => {
        if (value.trim()?.length > 50) {
          return "Invalid Input! Input can not be more than 50 characters.";
        } else {
          return null;
        }
      },
      // payment_received_against_sale_value: value => (value == "" || value == null ? "This field cannot be empty." : null),
      // payment_received_against_PTC: value => (value == "" || value == null ? "This field cannot be empty." : null),
      // price_achieved_as_per_sales_MIS: value => (value == null ? "This field cannot be empty." : null),
      financer: value => {
        if (value.trim()?.length > 0 && /^[A-Za-z' ]+$/.test(value.trim()) === false) {
          return "Invalid Input! Input should contain alphabets only.";
        } else if (value.trim()?.length > 50) {
          return "Invalid Input! Input can not be more than 50 characters.";
        } else {
          return null;
        }
      },
      remarks: value =>
        value == "" || value == null ? "This field cannot be empty." : value.trim().length > 500 ? "Please add valid remark! (Less than 500 characters)" : null,
    },
  });

  //#region [state]
  // files
  const [nocFile, setNOCFile] = useState<File | null>(null);
  const [bankFile, setBankFile] = useState<{ [key: string]: { bankName: string; file: File } } | null>(null);
  const [ledgerFile, setLedgerFile] = useState<File | null>(null);
  const [additionalFile, setAdditionalFile] = useState<File | null>(null);
  // selected-unit-details
  const [selectedUnit, setSelectedUnit] = useState<SalesUnitForNOC | null>(null);
  // calculated total-cost and user-input price-header-details
  const [priceHeaderData, setPriceHeaderData] = useState<{
    [key: string]: { Amount: number; NOCProjectPriceHeaderID: number; ValueType: string; IsMSP: number };
  }>();
  const [inputTotalCost, setInputTotalCost] = useState<number>(0);
  const [inputTotalSaleCost, setInputTotalSaleCost] = useState<number>(0);
  const [inputTotalCostAsPerMSP, setInputTotalCostAsPerMSP] = useState<number>(0);
  const [fetchPaymentLoading, setFetchPaymentLoading] = useState<boolean>(false);
  const [paymentData, setPaymentData] = useState<PaymentVerificationResponse | null>(null);
  //#endregion
  // file-input-reference
  const resetNOCRef = useRef<() => void>(null);
  const resetLedgerRef = useRef<() => void>(null);
  const resetAdditionalRef = useRef<() => void>(null);
  const loader = useSelector(selectExternalNOCLoaders);

  const warningModal = () => {
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
          <Text>Project is disabled, please contact Relation Manager.</Text>
          <Button
            mt='md'
            color='truboard-primary.0'
            onClick={() => {
              modals.closeAll();
              navigate(ROUTES.NOC_MANAGE_REQUEST);
            }}>
            Close
          </Button>
        </>
      ),
    });
  };

  //#region [useEffect]
  // clean-up
  useEffect(() => {
    return () => {
      formReset();
    };
  }, []);

  useEffect(() => {
    if (project && Number(project?.isenabled) == 1) {
      dispatch(getNOCTypeListRequested());
    } else if (Number(project?.isenabled) == 0) {
      warningModal();
    }
  }, [project]);

  useEffect(() => {
    const result = {};
    let totalCost = 0;
    let totalSaleCost = 0;
    let totalCostAsPerMSP = 0;
    if (priceHeaderList?.length > 0) {
      priceHeaderList?.forEach(item => {
        result[item.HeaderValue] = {
          Amount: item.amount ?? 0,
          NOCProjectPriceHeaderID: item?.NOCProjectPriceHeaderID,
          ValueType: item?.ValueType,
          IsMSP: item?.ismsp,
        };
      });

      setPriceHeaderData(result);
      totalCost = priceHeaderList.reduce((total, item) => total + Number(item?.amount), 0);
      totalSaleCost = priceHeaderList.filter(header => header.ValueType === "Sale Value").reduce((total, item) => total + Number(item?.amount), 0);
      totalCostAsPerMSP = priceHeaderList.filter(header => header.ismsp === 1).reduce((total, item) => total + Number(item?.amount), 0);
    }

    setInputTotalCost(totalCost);
    setInputTotalSaleCost(totalSaleCost);
    setInputTotalCostAsPerMSP(totalCostAsPerMSP);
  }, [priceHeaderList]);

  // form-reset
  const formReset = (notSubmit?: boolean) => {
    nocForm.reset();
    setPaymentData(null);
    setInputTotalCost(0);
    setInputTotalSaleCost(0);
    setInputTotalCostAsPerMSP(0);
    dispatch(getNOCAccountReset());
    dispatch(getNOCTypeListReset());
    dispatch(getNOCPriceHeaderReset());
    !notSubmit && dispatch(getSalesUnitForNOCReset());
    dispatch(paymentVerificationReset());
  };

  // clear
  const clearFile = () => {
    setNOCFile(null);
    resetNOCRef.current?.();
  };
  const clearLedgerFile = () => {
    setLedgerFile(null);
    resetLedgerRef.current?.();
  };
  const clearAdditionalFile = () => {
    setAdditionalFile(null);
    resetAdditionalRef.current?.();
  };

  // handle-user-input-price-header-details
  const handleUpdatedPriceHeader = (key: string, amount: number, nocProjectId: number, valueType: string, isMSP: number) => {
    setPriceHeaderData(prev => {
      return {
        ...prev,
        [key]: { Amount: amount, NOCProjectPriceHeaderID: nocProjectId, ValueType: valueType, IsMSP: isMSP },
      };
    });
  };

  // callback
  const verificationCallback = (success: boolean, message?: string) => {
    if (success) {
      successNotification(message ?? "");
    } else {
      errorNotification("Payment Verification failed!");
    }
  };

  // hanlde-payment-verification API call
  const handleVerifyPayment = async () => {
    if (accessToken && ledgerFile && bankFile && selectedUnit) {
      const bankDetails = [
        {
          UnitId: selectedUnit?.REUnitDetailId,
          Bank: Object.entries(bankFile)?.map(([key, value]) => ({ BankName: value.bankName, Files: [value.file.name] })),
        },
      ];
      const lenderDetails = [{ UnitId: selectedUnit?.REUnitDetailId, Files: [ledgerFile.name] }];
      const bankFiles = Object.values(bankFile)?.map(item => item.file);
      dispatch(paymentVerificationRequested(bankDetails, lenderDetails, "FILES", ledgerFile, bankFiles, verificationCallback));

      try {
        const response: PaymentVerificationResponse | null = await paymentVerificationAPI(
          accessToken,
          bankDetails,
          lenderDetails,
          "FILES",
          ledgerFile,
          bankFiles,
        );
        if (response === null) {
          throw new Error("API Failed...");
        } else {
          setPaymentData(response);
          verificationCallback(true, "Payment Verification done successfully...");
        }
        setFetchPaymentLoading(false);
      } catch (err) {
        setFetchPaymentLoading(false);
        verificationCallback(false, "Payment Verification failed...");
      }
    } else {
      errorNotification(!ledgerFile ? "Ledger is not uploaded..." : "Bank Statement not uploaded...");
    }
  };

  // callback
  const submitCallback = (success: boolean, message?: string) => {
    if (success) {
      nocForm.reset();
      setPaymentData(null);
      setInputTotalCost(0);
      setInputTotalSaleCost(0);
      setNOCFile(null);
      setBankFile(null);
      setLedgerFile(null);
      setAdditionalFile(null);
      dispatch(getNOCAccountReset());
      dispatch(getNOCTypeListReset());
      dispatch(getNOCPriceHeaderReset());
      dispatch(getSalesUnitForNOCReset());
      dispatch(paymentVerificationReset());
      successNotification(message ?? "");
      navigate("/noc/manage-request");
    } else {
      errorNotification(message ?? "Create NOC Failed...");
    }
  };

  // confirm-modal
  // const openConfirmModal = (data: NOCFormData) => {
  //   if (data) {
  //     openConfirmModal({
  //       title: `Confirm Submit ${project?.AssetName}`,
  //       centered: true,
  //       children:
  //         selectedUnit?.ApprovalStatus === "Not Approved" || selectedUnit?.MortgageStatus === "Not Mortgaged" ? (
  //           <Text size='sm'>Are you sure you want to create External NOC for not approved?</Text>
  //         ) : (
  //           <Text size='sm'>Are you sure you want to create External NOC?</Text>
  //         ),
  //       labels: { confirm: "Confirm", cancel: "Cancel" },
  //       confirmProps: {
  //         style: { backgroundColor: "#001d56" },
  //         disabled: undefined,
  //         loading: undefined,
  //       },
  //       onClose: () => {
  //         // no action specified;
  //       },
  //       onCancel: () => {
  //         showNotification({
  //           id: "cancel-request",
  //           title: "Cancelled",
  //           message: `Create External NOC cancelled...`,
  //           icon: <IconExclamationMark />,
  //           color: "gray",
  //           autoClose: 3000,
  //         });
  //       },
  //       onConfirm: () => handleSubmitExternalNOC(data),
  //     });
  //   }
  // };

  // handle upload ledger
  const handleAddLedgerFile = (file: File) => {
    const isAllowedFile = mime_types.pdf === file.type || mime_types.xls === file.type || mime_types.xlsx === file.type;
    const isWithinSize = file.size / 1000000 < 10 ? true : false;

    if (!isWithinSize) {
      errorNotification("The size of Ledger should be less than 10 mb.");
      return;
    }

    if (!isAllowedFile) {
      errorNotification("The Ledger should be in '.pdf', '.xlsx', 'xlx' format.");
      return;
    }
    setLedgerFile(file);
  };

  const handleUploadAdditionalFile = (file: File) => {
    const isWithinSize = file.size / 1000000 < 10 ? true : false;

    if (!isWithinSize) {
      errorNotification("The size of Addition file should be less than 10 mb.");
      return;
    }
    setAdditionalFile(file);
  };

  const handleUploadNOCFile = (file: File) => {
    const isAllowedFile = mime_types.pdf === file.type || mime_types.xlsx === file.type || mime_types.xls === file.type || mime_types.docx === file.type;
    const isWithinSize = file.size / 1000000 <= 10 ? true : false;

    if (!isWithinSize) {
      errorNotification("The size of NOC should be less than 10 mb.");
      return;
    }

    if (!isAllowedFile) {
      errorNotification("The NOC should be in '.pdf', '.xlsx', '.xls', and '.docx' format.");
      return;
    }
    setNOCFile(file);
  };

  // handle-create-external-NOC-API-call
  const handleSubmitExternalNOC = (data: NOCFormData) => {
    if (data && project && nocFile) {
      const refNo = `REQNOC_${data?.product_sub_type}_${data?.wing}_${data?.unit_no}_${dayjs(new Date()).format("DDMMYYYY")}`;
      const paymentDetails = paymentData
        ? paymentData?.transaction?.map(trans => ({
            Bank: paymentData?.BankName,
            AccountNumber: paymentData?.accountNumber,
            Date: trans?.date,
            ReferenceNo: trans?.referenceNo,
            TransactionDescription: trans?.transactionDescription,
            Credit: trans?.credit,
            Debit: trans?.debit,
            Status: trans?.status,
            Reason: trans?.reason,
            Particulars: trans?.particulars,
            "Vch Type": trans?.vchType,
            "Vch No.": trans?.vchNo_,
            remark: trans?.remarks,
          }))
        : [];
      const documentDetails: CreateDocumentDetails[] = [];
      if (ledgerFile) {
        documentDetails.push({
          FileName: ledgerFile?.name,
          BucketName: "renoc",
          Folder: `${selectedUnit?.ProjectName}/${data.purchaser_name}`,
          DocumentType: "Ledger",
          UploadType: "Upload",
        });
      }
      if (nocFile) {
        documentDetails.push({
          FileName: nocFile?.name,
          BucketName: "renoc",
          Folder: `${selectedUnit?.ProjectName}/${data.purchaser_name}`,
          DocumentType: "NOC Request",
          UploadType: "System Generated",
        });
      }
      if (bankFile) {
        documentDetails.push({
          FileName: bankFile ? Object.values(bankFile)?.map(item => item?.file?.name)[0] : "",
          BucketName: "renoc",
          Folder: `${selectedUnit?.ProjectName}/${data.purchaser_name}`,
          DocumentType: "Bank Statement",
          UploadType: "Upload",
        });
      }
      if (additionalFile) {
        documentDetails.push({
          FileName: additionalFile?.name,
          BucketName: "renoc",
          Folder: `${selectedUnit?.ProjectName}/${data.purchaser_name}`,
          DocumentType: "Additional Document",
          UploadType: "Upload",
        });
      }
      const paylaod: CreateExternalNOCData = {
        typeOfNoc: data?.type_of_noc,
        unitNo: data?.unit_no,
        unitFloor: data?.floor ?? "",
        wing: data?.wing ?? "",
        saleableArea: data?.area.toString() ?? "",
        purchaserName: data?.purchaser_name,
        purchaserProfile: data?.purchaser_profile ?? "",
        purchaseConsideration: inputTotalCost.toString() ?? "",
        advancePaymentReceived: round(Number(data?.payment_received_against_sale_value) ?? 0 + Number(data?.payment_received_against_PTC) ?? 0, 2).toString(),
        financer: data?.financer ?? "",
        towerName: data?.product_sub_type ?? "",
        requestDate: dayjs(data?.date_of_request)?.format("YYYY-MM-DD"),
        bookingDate: dayjs(data?.date_of_booking)?.format("YYYY-MM-DD"),
        unitOwnedBy: selectedUnit?.UnitOwnedBy ?? "",
        category: selectedUnit?.Category ?? "",
        unitConfiguration: selectedUnit?.UnitConfiguration ?? "",
        unitArea: data?.area.toString(),
        sellingPrice: data?.price_achieved_as_per_sales_MIS.toString(),
        createdby: userDetails?.EmailId,
        reUnitDetailId: selectedUnit?.REUnitDetailId.toString() ?? "",
        refno: refNo,
        remark: data?.remarks ?? "",
        nocProjectId: project?.NocProjectId.toString(),
        paymentDetails: paymentDetails,
        documentDetails: documentDetails,
        priceHeaderDetails: priceHeaderData ? [...Object.values(priceHeaderData)] : [],
        nocFile: nocFile as File,
        emailAttachmentFile: additionalFile as File,
        statementFile: ledgerFile as File,
        ledgerFile: ledgerFile as File,
        bucketName: "renoc",
        folder: `${selectedUnit?.ProjectName}/${data.purchaser_name}`,
        issueDate: dayjs(data?.noc_issue_date).format("YYYY-MM-DD"),
        paymentReceivedAgainstSaleValue: data?.payment_received_against_sale_value ? data?.payment_received_against_sale_value.toString() : "0",
        paymentReceivedAgainstPTC: data?.payment_received_against_PTC ? data?.payment_received_against_PTC.toString() : "0",
      };

      dispatch(createExternalNOCRequested(paylaod, submitCallback));
    } else {
      errorNotification(!nocFile ? "Files are not uploaded..." : project ? "Project is not selected..." : "Form validation error...");
    }
  };

  const getSubmitAlertMsg = () => {
    const alerts: string[] = [];
    if (selectedUnit?.ApprovalStatus === "Not Approved") {
      alerts.push("You're trying to Upload NOC for a unit that is Not Approved");
    }
    if (selectedUnit?.MortgageStatus === "Not Mortgaged but Hypothecated") {
      alerts.push("You're trying to Upload NOC for a unit that is Not Mortgaged but Hypothecated");
    }
    const isupdated =
      selectedUnit?.BuyerLendingBank !== nocForm.values.financer ||
      Number(selectedUnit?.UnitAreaSaleable) !== Number(nocForm.values.area) ||
      selectedUnit?.CustomerName !== nocForm.values.purchaser_name ||
      Number(selectedUnit?.ReceivedTillDate) !==
        Number(nocForm.values.payment_received_against_sale_value ?? 0) + Number(nocForm.values.payment_received_against_PTC ?? 0) ||
      selectedUnit?.CustomerProfile !== nocForm.values.purchaser_profile;

    if (isupdated) {
      alerts.push("Fields in NoC request form do not match the Sales MIS data updated in system");
    }
    if (alerts.length > 1) {
      alerts.push("Do you still want to continue?");
    }
    return alerts.length > 0 ? (
      <ul style={{ listStyle: "none" }}>
        {alerts.map(v => (
          <li key={v}>{v}</li>
        ))}
      </ul>
    ) : undefined;
  };

  const openModal = (data: NOCFormData) => {
    openConfirmModal({
      title: getSubmitAlertMsg(),
      centered: true,
      color: "blue",
      labels: { confirm: "Yes", cancel: "No" },
      onConfirm: () => {
        handleSubmitExternalNOC(data);
      },
      confirmProps: {
        color: "truboard-primary.0",
      },
      onCancel: () => {
        formReset(true);
      },
    });
  };

  return (
    <>
      <Flex justify={"space-between"} align={"center"}>
        <Title order={3} my={"lg"} color='#001d56'>
          <span style={{ marginLeft: "20px" }}>{project?.AssetName}</span>
        </Title>
      </Flex>

      {/* sections */}
      <form onSubmit={nocForm.onSubmit(values => (getSubmitAlertMsg() ? openModal(values) : handleSubmitExternalNOC(values)))}>
        <AddNOC
          reAssetId={project?.REAssetId}
          nocProjectId={project?.NocProjectId}
          userEmail={userDetails?.EmailId}
          form={nocForm}
          selectedUnit={selectedUnit}
          priceHeaderData={priceHeaderData}
          inputTotalCost={inputTotalCost}
          inputTotalSaleCost={inputTotalSaleCost}
          inputTotalCostAsPerMSP={inputTotalCostAsPerMSP}
          setInputTotalCost={setInputTotalCost}
          setInputTotalSaleCost={setInputTotalSaleCost}
          setInputTotalCostAsPerMSP={setInputTotalCostAsPerMSP}
          setSelectedUnit={setSelectedUnit}
          handleUpdatedPriceHeader={handleUpdatedPriceHeader}
          formReset={() => formReset(true)}
        />
        <BankStatement bankFile={bankFile} setBankFile={setBankFile} />
        {/* <CreditDetails /> */}

        {/* upload-ledger */}
        <Card
          shadow='sm'
          radius='md'
          padding='md'
          m={"md"}
          withBorder
          style={{
            overflow: "revert",
          }}>
          <Text fw='bold' fz='lg' mb='sm' color='truboard-primary.0'>
            Upload Ledger
          </Text>
          <Flex justify={"flex-start"} gap={"xl"} my='md'>
            {ledgerFile && (
              <Title size='md' fw='bold' color={"#001d56"} align='center' my='sm'>
                Uploaded Ledger: {ledgerFile.name}
              </Title>
            )}

            <Group position='center' pl='0'>
              {!ledgerFile && (
                <FileButton resetRef={resetNOCRef} onChange={file => handleAddLedgerFile(file as File)} accept={[mime_types.xls, mime_types.xlsx].join(",")}>
                  {props => (
                    <Button {...props} color='truboard-primary.0'>
                      <img src={UploadDocument} style={{ width: "20px", height: "20px", filter: "invert(1)" }} />
                      &nbsp;Upload Ledger
                    </Button>
                  )}
                </FileButton>
              )}
              <Button disabled={!ledgerFile} color='red' variant='outline' onClick={clearLedgerFile}>
                Reset
              </Button>
            </Group>
          </Flex>
        </Card>

        {/* verfiy-payment */}
        <Flex justify={"flex-end"} align={"center"} m={"md"}>
          <CommonAddButton
            loading={loader.paymentVerfication}
            handleClick={handleVerifyPayment}
            leftIcon={<img src={addLogo} style={{ width: "20px", height: "20px", filter: "invert(1)" }} />}
            title='Verify Payment'
          />
        </Flex>
        {fetchPaymentLoading ? (
          <Flex align='center' justify='center'>
            <Loader size='md' />
          </Flex>
        ) : (
          <>{paymentData && <PaymentVerification paymentData={paymentData} setPaymentData={setPaymentData} />}</>
        )}

        {/* bottom-part */}
        <Flex justify={"space-between"} gap={"xl"} m='20px'>
          <Title size={"lg"} fw='bold' color={"green"}>
            Total Amount Verified:
            <span style={{ marginLeft: "10px" }}>
              Rs. {paymentData?.transaction?.filter(t => t.status === "Verified")?.reduce((total, t) => (total += t?.credit), 0) ?? 0}
            </span>
          </Title>

          <Title size={"lg"} fw='bold' color={"red"}>
            Total Amount Not-verified:
            <span style={{ marginLeft: "10px" }}>
              Rs. {paymentData?.transaction?.filter(t => t.status === "Not Verified")?.reduce((total, t) => (total += t?.credit), 0) ?? 0}
            </span>
          </Title>
        </Flex>

        {/* upload-noc */}
        <Flex justify={"flex-start"} gap={"xl"} m='20px'>
          {nocFile && (
            <Text size='sm' fw='bold' fz='lg' my='sm' color='truboard-primary.0'>
              Uploaded NOC: {nocFile.name}
            </Text>
          )}
          <Group position='center'>
            {!nocFile && (
              <FileButton resetRef={resetNOCRef} onChange={file => handleUploadNOCFile(file as File)} accept='application/pdf'>
                {props => (
                  <>
                    <Button {...props} color='truboard-primary.0'>
                      <img src={UploadDocument} className='icon-size' style={{ width: "20px", height: "20px", filter: "invert(1)" }} />
                      &nbsp;Upload NOC
                    </Button>
                    <Text color='red' style={{ marginLeft: "-10px", marginTop: "-20px" }}>
                      *
                    </Text>
                  </>
                )}
              </FileButton>
            )}
            <Button disabled={!nocFile} color='red' variant='outline' onClick={clearFile}>
              Reset
            </Button>
          </Group>
        </Flex>
        {/* upload-other-doc */}
        <Flex justify={"flex-start"} gap={"xl"} m='20px'>
          {additionalFile && (
            <Text size='sm' fw='bold' fz='lg' my='sm' color='truboard-primary.0'>
              Upload Additional Documents: {additionalFile.name}
            </Text>
          )}
          <Group position='center'>
            {!additionalFile && (
              <FileButton
                resetRef={resetNOCRef}
                onChange={file => handleUploadAdditionalFile(file as File)}
                accept={[mime_types.pdf, mime_types.doc, mime_types.docx, mime_types.xls, mime_types.xlsx, mime_types.jpeg, mime_types.png].join(",")}>
                {props => (
                  <Button {...props} color='truboard-primary.0'>
                    <img src={UploadDocument} className='icon-size' style={{ width: "20px", height: "20px", filter: "invert(1)" }} />
                    &nbsp;Additional File
                  </Button>
                )}
              </FileButton>
            )}
            <Button disabled={!additionalFile} color='red' variant='outline' onClick={clearAdditionalFile}>
              Reset
            </Button>
          </Group>
        </Flex>
        <Flex justify={"flex-end"} gap={"xl"} m='20px'>
          <Button color='red' onClick={() => formReset(true)}>
            Cancel
          </Button>
          <Button color='green' type='submit' loading={loader?.createNOC}>
            Submit
          </Button>
        </Flex>
      </form>
    </>
  );
}

export default ExternalNOC;
