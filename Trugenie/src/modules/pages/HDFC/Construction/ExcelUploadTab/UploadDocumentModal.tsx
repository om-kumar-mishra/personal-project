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
import { selectSetProject } from "../../../../../lib/services/HDFC/Project/selectors";
import { Project } from "../../../../../lib/services/HDFC/Project/dataTypes";
import {
  CanUpdateConstructionRequested,
  GetExcelUploadPastHistoryListRequested,
  UploadContruectionUpdateTemplateRequested,
} from "../../../../../lib/services/HDFC/Construction/ExcelUpload/actions";
import { selectUserDetails } from "../../../../../lib/services/hdfc_login/selectors";
import { UserDetails } from "../../../../../lib/services/hdfc_login/dataTypes";
import { selectCanUpdateConstruction, selectContructionExcelLoaders } from "../../../../../lib/services/HDFC/Construction/ExcelUpload/selector";
import { manadateFieldValidation, remarkValidation, uploadFileValidation } from "../../../../../utils/formValidations";
import openOverWriteModal from "../../../../Components/OverWriteConfirmModal";

type FormData = {
  misDate: Date | null;
  uploadedFile: File | null;
  remark: string | null;
};
const UploadDocumentModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const dispatch = useDispatch();
  //#region [selector]
  const project = useSelector(selectSetProject) as Project;
  // const summaryPastHistoryList = useSelector(selectSummaryPastHistoryList);
  const canUpdateConstruction = useSelector(selectCanUpdateConstruction);
  const loader = useSelector(selectContructionExcelLoaders);
  const userDetails = useSelector(selectUserDetails) as UserDetails;
  //#endregion

  //#region [state]
  const [canUpate, setCanUpdate] = useState<boolean>(false);
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
    if (canUpdateConstruction) {
      setCanUpdate(canUpdateConstruction?.canupdate !== 0);
      canUpdateConstruction?.canupdate === 2 && form.values.misDate && openOverWriteModal(String(form.values.misDate), () => form.reset());
    }
  }, [canUpdateConstruction]);

  useEffect(() => {
    if (form.values.misDate && project.REAssetId) {
      dispatch(CanUpdateConstructionRequested(dayjs(form.values.misDate).format("YYYY-MM-DD"), project.REAssetId));
    }
  }, [form.values.misDate?.toISOString(), project.REAssetId]);

  //#endregion

  const onCallback = (success: boolean, message?: string) => {
    if (success) {
      successNotification(message ?? "Construction uploaded successfully...");
      form.reset();
      onClose();
      // dispatch(GetSummaryPastHistoryListRequested(project?.REAssetId, "Update"));
      dispatch(GetExcelUploadPastHistoryListRequested(Number(project?.REAssetId), userDetails?.EmailId, "Update"));
    }
  };

  const handleUpload = (values: FormData) => {
    if (values?.misDate && values?.uploadedFile) {
      const payload = {
        reassetId: project.REAssetId,
        role: userDetails?.TemplateRoleName,
        // projectName: project.AssetName,
        entityName: userDetails?.entity,
        misDate: dayjs(values.misDate).format("YYYY-MM-DD"),
        // remark: values.remark ?? "",
        file: values.uploadedFile,
        status: "Pending",
        fileContainer: "renoc",
        filePath: `constuction/${project.AssetName}`,
      };
      dispatch(UploadContruectionUpdateTemplateRequested(payload, onCallback));
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
            <Button color='truboard-primary.0' type='submit' disabled={!form.isValid() || !canUpate} loading={loader.uploadConstructionTemplate}>
              Upload
            </Button>
          </Flex>
        </form>
      </div>
    </Modal>
  );
};

export default UploadDocumentModal;
