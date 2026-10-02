import { Button, FileButton, Flex, Loader, Modal, Select, Table, Text, Textarea } from "@mantine/core";
import { DatePickerInput, DatesProvider } from "@mantine/dates";
import { useForm } from "@mantine/form";
import dayjs from "dayjs";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import calendarIcon from "../../../../assets/logos/SVG/calendar.svg";
import onlyAddIcon from "../../../../assets/logos/SVG/only_add.svg";
import uploadDocument from "../../../../assets/logos/upload.svg";
import { uploadSalesMonitoringTemplateRequested } from "../../../../lib/services/HDFC/MonitoringSheet/action";
import { selectMisDate, selectMontinoringSheetLoader, selectSalesMonitoringPastHistoryList } from "../../../../lib/services/HDFC/MonitoringSheet/selectors";
import { Project } from "../../../../lib/services/HDFC/Project/dataTypes";
import { selectSetProject } from "../../../../lib/services/HDFC/Project/selectors";
import { UserDetails } from "../../../../lib/services/hdfc_login/dataTypes";
import { selectUserDetails } from "../../../../lib/services/hdfc_login/selectors";
import { mime_types } from "../../../../utils/commonFunctions";
import { successNotification } from "../../../../utils/notifications";
import { TableRow } from "../../../Components/TableRow";
import { DEFAULT_DATE_FORMAT, getPresentableValue } from "../../../Components/UtilityFunctions";
import { selectRMUserLoaders, selectValidateExcelFile } from "../../../../lib/services/HDFC/Commons/selectors";
import { DownloadExcelErrorFileRequested, ValidateExcelFailed, ValidateExcelRequested } from "../../../../lib/services/HDFC/Commons/actions";
type FormData = {
  costmisDate?: Date;
  salesmisDate?: Date;
  remarks?: string;
  uploadedFile?: File;
};

const UploadDocumentModal = ({ open, onClose, projectId }: { open: boolean; onClose: () => void; projectId: number }) => {
  const dispatch = useDispatch();
  const salesMonitoringPastHistoryList = useSelector(selectSalesMonitoringPastHistoryList);
  const userDetails = useSelector(selectUserDetails) as UserDetails;
  const project = useSelector(selectSetProject) as Project;
  const misDateList = useSelector(selectMisDate);
  const validateExcelFile = useSelector(selectValidateExcelFile);
  const hdfcCommonLoader = useSelector(selectRMUserLoaders);
  const loader = useSelector(selectMontinoringSheetLoader);
  const form = useForm<FormData>({
    initialValues: {
      costmisDate: undefined,
      salesmisDate: undefined,
      remarks: undefined,
      uploadedFile: undefined,
    },
    validateInputOnBlur: true,
    validateInputOnChange: true,
    validate: {
      costmisDate: val => (val == undefined ? "This field cannot be empty." : null),
      salesmisDate: val => (val == undefined ? "This field cannot be empty." : null),
      uploadedFile: value => {
        if (value) {
          const isAllowedType = [mime_types.xls, mime_types.xlsx].join(", ").includes(value?.type);
          const isAllowedSize = Number(value.size / 1000000) < 9 ? true : false; // file.size in bytes
          if (!isAllowedType || !isAllowedSize) {
            return "Please upload .xls or .xlsx file";
          } else {
            return null;
          }
        } else {
          return "Please upload a File ";
        }
      },
      remarks: val => (val && val.trim().length > 500 ? "The Input cannot be greater than 500 characters." : null),
    },
  });

  const showOverWriteLogic = salesMonitoringPastHistoryList?.some(
    item => dayjs(item.MISDate).isSame(form.values.costmisDate) && dayjs(item.SaleMISDate).isSame(form.values.salesmisDate),
  );

  useEffect(() => {
    dispatch(ValidateExcelFailed());
    return () => {
      form.reset();
    };
  }, []);

  const validateExcelPayload = useMemo(() => {
    return {
      module: "SalesMonitoring",
      file: form.values.uploadedFile,
      type: "setup",
      clientId: 0,
      investmentId: 0,
      reassetId: projectId,
    };
  }, [form.values.uploadedFile, projectId]);

  const downloadErrorFile = () => {
    dispatch(DownloadExcelErrorFileRequested(validateExcelPayload));
  };

  useEffect(() => {
    if (validateExcelPayload.file && validateExcelPayload.reassetId) {
      const isAllowedType = [mime_types.xls, mime_types.xlsx].join(", ").includes(validateExcelPayload.file?.type);
      const isAllowedSize = Number(validateExcelPayload.file.size / 1000000) < 5 ? true : false;
      isAllowedType && isAllowedSize && dispatch(ValidateExcelRequested(validateExcelPayload));
    }
  }, [validateExcelPayload]);

  const onCallback = (success: boolean, message?: string) => {
    if (success) {
      successNotification(message ?? "", "File Uploaded Successfully");
    }
    form.reset();
    onClose();
  };

  const handleUpload = (values: FormData) => {
    if (values?.costmisDate && values?.uploadedFile && misDateList) {
      const selectedSalesMISDate = misDateList.find(
        item => dayjs(item?.MISDate).format(DEFAULT_DATE_FORMAT) === dayjs(values?.salesmisDate).format(DEFAULT_DATE_FORMAT),
      );
      // const formattedSalesMISDate = selectedSalesMISDate ? dayjs(selectedSalesMISDate.MISDate).format("YYYY-MM-DD") : "";
      dispatch(
        uploadSalesMonitoringTemplateRequested(
          projectId.toString(),
          // formattedSalesMISDate,
          dayjs(selectedSalesMISDate?.MISDate).format("YYYY-MM-DD"),
          dayjs(values?.costmisDate).format("YYYY-MM-DD"),
          userDetails?.EmailId,
          userDetails?.entity,
          userDetails?.TemplateRoleName,
          userDetails?.userName,
          "renoc",
          `${project?.AssetName}/salesupdate`,
          values?.uploadedFile?.name,
          values?.remarks ?? "",
          values?.uploadedFile,
          onCallback,
        ),
      );
    }
  };
  useEffect(() => {
    if (form.values.uploadedFile) {
      const isAllowedType = [mime_types.xls, mime_types.xlsx].join(", ").includes(form.values.uploadedFile?.type);
      const file_size_mb = form.values.uploadedFile.size / 1000000; // file.size in bytes
      const isAllowedSize = file_size_mb < 9 ? true : false;
      form.setErrors({ uploadedFile: isAllowedType ? null : "Invalid file type. Please upload .xls or .xlsx file." });
      form.setErrors({ uploadedFile: isAllowedSize ? null : "File Size Should not be more than 10Mb " });
    }
  }, [form.values.uploadedFile]);

  const errorDownloadButn = useMemo(() => {
    return (
      <Button size={"xs"} color='truboard-primary.0' type='button' onClick={downloadErrorFile} loading={hdfcCommonLoader.downloadErrorFile}>
        Download
      </Button>
    );
  }, [downloadErrorFile, hdfcCommonLoader.downloadErrorFile]);

  return (
    <Modal
      size={"lg"}
      opened={open}
      onClose={() => {
        onClose();
        form.reset();
      }}
      style={{ overflow: "visible" }}
      title={
        <Flex gap={"xs"}>
          <img src={uploadDocument} style={{ width: "20px", height: "20px" }} />
          <Text size={"md"} fw='bold' color={"#001d56"}>
            Upload Document
          </Text>
        </Flex>
      }>
      <form onSubmit={form.onSubmit(handleUpload)}>
        <Table>
          <tbody>
            <TableRow
              title={"Cost MIS Date"}
              withAsterisk
              value={
                <DatesProvider settings={{ firstDayOfWeek: 0, weekendDays: [0] }}>
                  <DatePickerInput
                    icon={<img src={calendarIcon} style={{ width: "20px", height: "20px", fill: "white" }} color='white' />}
                    labelProps={{
                      style: { color: "#001d56", fontWeight: "bold" },
                    }}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    placeholder='Select Cost Mis Date'
                    valueFormat={DEFAULT_DATE_FORMAT}
                    {...form.getInputProps("costmisDate")}
                    maxDate={new Date()}
                  />
                </DatesProvider>
              }
            />
            <TableRow
              title={"Sales MIS Date"}
              withAsterisk
              value={
                misDateList ? (
                  <Select
                    nothingFound={loader.misDate ? <Loader size={"xs"} /> : "No data found"}
                    searchable
                    placeholder='Select Sales MIS Date'
                    labelProps={{
                      style: { color: "#001d56", fontWeight: "bold" },
                    }}
                    data={misDateList.map((item: { MISDate: any }) => ({
                      label: getPresentableValue(item.MISDate, true, false, false) as string,
                      value: item.MISDate,
                    }))}
                    {...form.getInputProps("salesmisDate")}
                  />
                ) : (
                  ""
                )
              }
            />

            <TableRow
              title={""}
              fullWidth
              value={
                showOverWriteLogic ? (
                  <Text color='red' size={"xs"}>
                    Monitoring Sheet with same “Cost MIS Date” and “Sales MIS Date” is updated, do you want to overwrite?{" "}
                  </Text>
                ) : (
                  ""
                )
              }
            />
            <TableRow
              title={"Upload Document"}
              withAsterisk
              value={
                <FileButton accept={[mime_types.xls, mime_types.xlsx].join(",")} {...form.getInputProps("uploadedFile")}>
                  {props => {
                    return (
                      <>
                        {form.values.uploadedFile && (
                          <>
                            <Text fw={700}>Files Uploaded :</Text>
                            {form.values.uploadedFile?.name}
                          </>
                        )}
                        <Button {...props} h={"150px"} w={"100%"} variant='outline' className='fileUpload-onhover' loading={hdfcCommonLoader.validateExcel}>
                          <Flex direction={"column"}>
                            <Flex justify={"center"} align={"center"}>
                              <img src={onlyAddIcon} style={{ width: "10px", height: "10px", color: "lightgrey", marginRight: "10px" }} />
                              <Text color='gray'> Select file to upload...</Text>
                            </Flex>
                          </Flex>
                        </Button>
                        {form.errors.uploadedFile ? (
                          <Text color='red' size={12}>
                            {form.errors.uploadedFile}
                          </Text>
                        ) : null}
                        {!form.errors.uploadedFile && form.values.uploadedFile && validateExcelFile?.data !== null ? (
                          <Text color='red' mt={4} size={12}>
                            {Number(validateExcelFile?.data["No. of Errors"]) > 0 ? (
                              <span>Uploaded file contains errors. Please {errorDownloadButn} error file for more details.</span>
                            ) : Number(validateExcelFile?.data["No. of warnings"]) > 0 ? (
                              <span>Uploaded file contains certain warnings. Please {errorDownloadButn} file for more details or click upload to proceed.</span>
                            ) : null}
                          </Text>
                        ) : null}
                      </>
                    );
                  }}
                </FileButton>
              }
            />
            <TableRow title={"Remarks"} value={<Textarea placeholder='Remarks' {...form.getInputProps("remarks")} />} />
          </tbody>
        </Table>
        {form.isValid() &&
        ((validateExcelFile?.info?.code === 100 && validateExcelFile?.data === null) || Number(validateExcelFile?.data["No. of Errors"]) <= 0) ? (
          <Flex justify={"flex-end"} gap={"xl"} my='md'>
            <Button color='truboard-primary.0' type='submit' loading={loader.uploadMonitoringTemplate}>
              Upload
            </Button>
          </Flex>
        ) : null}
      </form>
    </Modal>
  );
};

export default UploadDocumentModal;
