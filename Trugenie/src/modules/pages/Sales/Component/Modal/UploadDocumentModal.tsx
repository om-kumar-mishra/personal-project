import { Box, Button, FileButton, Flex, Modal, Select, Space, Table, Text, Textarea } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import onlyAddIcon from "../../../../../assets/logos/SVG/only_add.svg";
import calendarIcon from "../../../../../assets/logos/calendar.svg";
import uploadDocument from "../../../../../assets/logos/upload.svg";
import { mime_types } from "../../../../../utils/commonFunctions";
import { successNotification } from "../../../../Components/UtilityFunctions";
import { TableRow } from "../../../../Components/TableRow";
import { DATE_FORMAT } from "../../../../../utils/constants";
import { selectSalesPastHistoryList } from "../../../../../lib/services/HDFC/Sales/selectors";
import { SalesPastHistory } from "../../../../../lib/services/HDFC/Sales/dataTypes";
import { canUploadSalesTemplateRequested, getSalesSummaryRequested } from "../../../../../lib/services/HDFC/Sales/actions";
import { manadateFieldValidation, uploadFileValidation } from "../../../../../utils/formValidations";

type FormData = {
  misDate: Date | null;
  uploadedFile: File | null;
};
const UploadDocumentModal = ({
  open,
  projectId,
  onClose,
  setUploadedFile,
  showTypeField,
}: {
  open: boolean;
  projectId: number;
  onClose: () => void;
  setUploadedFile: React.Dispatch<React.SetStateAction<File | null>>;
  showTypeField?: boolean;
}) => {
  const dispatch = useDispatch();

  //#region [selector]
  const salesPastHistoryList = useSelector(selectSalesPastHistoryList) as SalesPastHistory[];
  //#endregion

  //#region [state]
  const [canUpate, setCanUpdate] = useState<boolean>(false);
  const [uploadLoader, setUploadLoader] = useState<boolean>(false);
  const [remarks, setRemarks] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  //#endregion

  const form = useForm<FormData>({
    initialValues: {
      misDate: null,
      uploadedFile: null,
    },
    validateInputOnBlur: true,
    validateInputOnChange: true,
    validate: {
      misDate: manadateFieldValidation,
      uploadedFile: uploadFileValidation,
    },
  });

  //#region [useEffect]
  useEffect(() => {
    if (form.values.misDate && projectId) {
      dispatch(canUploadSalesTemplateRequested(projectId, dayjs(form.values.misDate).format("YYYY-MM-DD"), "Update", actionCallback));
    }
  }, [form.values.misDate, projectId]);
  //#endregion

  const actionCallback = (canUpate: boolean) => {
    setCanUpdate(canUpate);
  };

  const onCallback = (success: boolean, message?: string) => {
    setUploadLoader(false);
    setRemarks("");
    if (success) {
      successNotification(message ?? "Summary details fetch successfully...");
      form.reset();
      onClose();
    }
  };

  const handleUpload = (values: FormData) => {
    if (values?.misDate && values?.uploadedFile) {
      setUploadedFile(values?.uploadedFile);
      setUploadLoader(true);
      dispatch(getSalesSummaryRequested(projectId, dayjs(values?.misDate).format("YYYY-MM-DD"), remarks, values?.uploadedFile, onCallback));
    }
  };

  const handleOnChange = (e: { currentTarget: { value: string } }) => {
    if (e.currentTarget.value.trim().length > 500) {
      setErrorMsg("Invalid Input! Input can not be more than 500 characters.");
      // setRemarks(e.currentTarget.value);
    } else {
      setRemarks(e.currentTarget.value);
      setErrorMsg("");
    }
  };

  const handelOnclose = () => {
    onClose();
    form.reset();
    setRemarks("");
    setCanUpdate(false);
    setSelectedType("");
  };

  const checkDocumentExistForDay =
    salesPastHistoryList && salesPastHistoryList.length && form.values.misDate
      ? salesPastHistoryList.some(
          item => item.Status === "Approved" && dayjs(item.MISDate).format("YYYY-MM-DD") === dayjs(form.values.misDate).format("YYYY-MM-DD"),
        )
      : false;

  return (
    <Modal
      size='lg'
      opened={open}
      onClose={handelOnclose}
      style={{ overflow: "visible" }}
      title={
        <Flex gap={"xs"}>
          <img src={uploadDocument} style={{ width: "20px", height: "20px" }} />
          <Text size={"md"} fw='bold' color={"#001d56"}>
            Upload Template
          </Text>
        </Flex>
      }>
      <div>
        <form onSubmit={form.onSubmit(handleUpload)}>
          <Table>
            <tbody>
              <TableRow
                title={"MIS Date"}
                fullWidth
                withAsterisk
                centerHeader={false}
                value={
                  <>
                    <DateInput
                      icon={<img src={calendarIcon} style={{ width: "20px", height: "20px", fill: "white" }} color='white' />}
                      labelProps={{
                        style: { color: "#001d56", fontWeight: "bold" },
                      }}
                      // valueFormat='DD-MMM-YYYY'
                      {...form.getInputProps("misDate")}
                      maxDate={new Date()}
                    />
                    {checkDocumentExistForDay ? (
                      !canUpate ? (
                        <Text color='red' size={"xs"} lineClamp={2}>
                          File cannot be uploaded for the selected MIS date.{" "}
                        </Text>
                      ) : (
                        <Text color='red' size={"xs"} lineClamp={2}>
                          {dayjs(form.values.misDate).format(DATE_FORMAT)} date selected for MIS has already been approved. It will be overwritten.
                        </Text>
                      )
                    ) : null}
                  </>
                }
              />
              {/* Conditional "Type" field */}
              {showTypeField && (
                <TableRow
                  title={"Type"}
                  value={<Select data={["Actual", "Projected"]} placeholder='-Select-' value={selectedType} onChange={value => setSelectedType(value ?? "")} />}
                />
              )}
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
                              <Text fw={700}>File Uploaded :</Text>
                              {form.values.uploadedFile?.name}
                            </>
                          )}
                          <Button {...props} h={"150px"} w={"100%"} variant='outline' className='fileUpload-onhover'>
                            <Flex direction={"column"}>
                              <Box mb={"xl"} ml={50}>
                                {/* <IconFileTypeXls size={50} color="gray" /> */}
                              </Box>
                              <Flex justify={"center"} align={"center"}>
                                <img src={onlyAddIcon} style={{ width: "10px", height: "10px", marginRight: "10px" }} className='svgColorGray' />
                                <Text color='gray'>Select file to upload...</Text>
                              </Flex>
                            </Flex>
                          </Button>
                          {form.errors.uploadedFile ? (
                            <Text color='red' size={12}>
                              {form.errors.uploadedFile}
                            </Text>
                          ) : null}
                        </>
                      );
                    }}
                  </FileButton>
                }
              />
              <TableRow
                withAsterisk
                title={"Remarks"}
                value={<Textarea placeholder='Remarks' value={remarks} onChange={e => handleOnChange(e)} error={errorMsg} />}
              />
            </tbody>
          </Table>
          <Space h={"sm"} />
          <Flex justify={"flex-end"} gap={"xl"}>
            <Button color='truboard-primary.0' type='submit' disabled={!form.isValid || !canUpate} loading={uploadLoader}>
              Upload
            </Button>
          </Flex>
        </form>
      </div>
    </Modal>
  );
};

export default UploadDocumentModal;
