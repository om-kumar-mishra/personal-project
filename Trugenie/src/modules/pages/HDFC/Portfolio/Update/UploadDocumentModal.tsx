import { Box, Button, FileButton, Flex, Modal, Space, Table, Text, Textarea } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import onlyAddIcon from "../../../../../assets/logos/SVG/only_add.svg";
import calendarIcon from "../../../../../assets/logos/calendar.svg";
import uploadDocument from "../../../../../assets/logos/upload.svg";
import { successNotification } from "../../../../Components/UtilityFunctions";
import { mime_types } from "../../../../../utils/commonFunctions";
import { TableRow } from "../../../../Components/TableRow";
import { selectCheckFundsDetailExist } from "../../../../../lib/services/HDFC/Portfolio/selectors";
import { CheckFundsDetailsExistRequested } from "../../../../../lib/services/HDFC/Portfolio/actions";
import { insertFundsUpdateRequested } from "../../../../../lib/services/HDFC/Portfolio/actions";
import { selectSwitchClient } from "../../../../../lib/services/HDFC/Commons/selectors";
import { GetClientData } from "../../../../../lib/services/HDFC/Commons/dataTypes";
import { manadateFieldValidation, remarkValidation, uploadFileValidation } from "../../../../../utils/formValidations";
import openOverWriteModal from "../../../../Components/OverWriteConfirmModal";

type FormData = {
  misDate: Date | null;
  uploadedFile: File | null;
  remark: string | null;
};
const UploadDocumentModal = ({ open, onClose }: { open: boolean; onClose: () => void; showTypeField?: boolean }) => {
  const dispatch = useDispatch();
  //#region [selector]
  const checkFundsDetailExist = useSelector(selectCheckFundsDetailExist);
  const activeClient = useSelector(selectSwitchClient) as GetClientData;
  //#endregion

  //#region [state]
  const [canUpate, setCanUpdate] = useState<boolean>(true);
  const [uploadLoader, setUploadLoader] = useState<boolean>(false);
  //#endregion

  const form = useForm<FormData>({
    initialValues: {
      misDate: null,
      uploadedFile: null,
      remark: null,
    },
    validateInputOnBlur: true,
    validateInputOnChange: true,
    validate: {
      misDate: manadateFieldValidation,
      uploadedFile: uploadFileValidation,
      remark: remarkValidation,
    },
  });

  //#region [useEffect]

  useEffect(() => {
    if (checkFundsDetailExist) {
      setCanUpdate(checkFundsDetailExist?.canupdate !== 0);
      checkFundsDetailExist?.canupdate === 2 && form.values.misDate && openOverWriteModal(String(form.values.misDate), () => form.reset());
    }
  }, [checkFundsDetailExist]);

  useEffect(() => {
    if (form.values.misDate && activeClient.ClientId) {
      dispatch(CheckFundsDetailsExistRequested(activeClient.ClientId, dayjs(form.values.misDate).format("YYYY-MM-DD")));
    }
  }, [form.values.misDate?.toISOString(), activeClient.ClientId]);

  //#endregion

  const onCallback = (success: boolean, message?: string) => {
    setUploadLoader(false);
    if (success) {
      successNotification(message ?? "Summary uploaded successfully...");
      form.reset();
      onClose();
      // dispatch(GetSummaryPastHistoryListRequested(project?.REAssetId, "Update"));
    }
  };

  const handleUpload = (values: FormData) => {
    if (values?.misDate && values?.uploadedFile) {
      setUploadLoader(true);
      const payload = {
        clientId: activeClient.ClientId,
        clientName: activeClient.ClientName,
        entityName: "", // need to check
        misDate: dayjs(values.misDate).format("YYYY-MM-DD"),
        remark: values.remark ?? "",
        file: values.uploadedFile,
      };
      dispatch(
        insertFundsUpdateRequested(payload?.clientId, payload?.misDate, payload?.clientName, payload?.entityName, payload.remark, payload.file, onCallback),
      );
    }
  };

  const handelOnclose = () => {
    onClose();
    form.reset();
    setCanUpdate(false);
  };

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
                    {!canUpate && form.values.misDate ? (
                      <Text color='red' size={"xs"} lineClamp={2}>
                        File cannot be uploaded for the selected MIS date.{" "}
                      </Text>
                    ) : null}
                  </>
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
              <TableRow withAsterisk title={"Remarks"} value={<Textarea placeholder='Remarks' {...form.getInputProps("remark")} />} />
            </tbody>
          </Table>
          <Space h={"sm"} />
          <Flex justify={"flex-end"} gap={"xl"}>
            <Button color='truboard-primary.0' type='submit' disabled={!form.isValid() || !canUpate} loading={uploadLoader}>
              Upload
            </Button>
          </Flex>
        </form>
      </div>
    </Modal>
  );
};

export default UploadDocumentModal;
