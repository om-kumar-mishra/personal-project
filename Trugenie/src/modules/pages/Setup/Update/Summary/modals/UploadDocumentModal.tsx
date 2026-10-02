import { Box, Button, FileButton, Flex, Modal, Table, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
// import { IconFileTypeXls } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import onlyPlusIcon from "../../../../../../assets/logos/SVG/only_add.svg";
import uploadDocument from "../../../../../../assets/logos/upload.svg";
import { Project } from "../../../../../../lib/services/HDFC/Project/dataTypes";
import { selectSetProject } from "../../../../../../lib/services/HDFC/Project/selectors";
import { UserDetails } from "../../../../../../lib/services/hdfc_login/dataTypes";
import { selectUserDetails } from "../../../../../../lib/services/hdfc_login/selectors";
import { mime_types } from "../../../../../../utils/commonFunctions";
import { DATE_TIME_FORMAT_WITH_SECONDS } from "../../../../../../utils/constants";
import { TableRow } from "../../../../../Components/TableRow";
import { errorNotification, successNotification } from "../../../../../Components/UtilityFunctions";
import {
  CanSetupProjectSummaryRequested,
  GetSummaryPastHistoryListRequested,
  UploadProjectSummaryTemplateSetupRequested,
} from "../../../../../../lib/services/HDFC/Summary/actions";
import { selectCanSetupSummary, selectSummaryLoaders } from "../../../../../../lib/services/HDFC/Summary/selector";
import { UploadProjectSummaryTemplateSetupPayload } from "../../../../../../lib/services/HDFC/Summary/dataTypes";
import { remarkValidation, uploadFileValidation } from "../../../../../../utils/formValidations";

type FormData = {
  misDate?: Date | null;
  remarks?: string;
  uploadedFile?: File;
};

const UploadDocumentModal = ({ open, onClose, projectId }: { open: boolean; onClose: () => void; projectId: number }) => {
  const dispatch = useDispatch();

  //#region [selector]
  const userDetails = useSelector(selectUserDetails) as UserDetails;
  const project = useSelector(selectSetProject) as Project;
  const loaders = useSelector(selectSummaryLoaders);
  const canUpdateValue = useSelector(selectCanSetupSummary);
  const canUpdate = canUpdateValue?.canupdate;
  const currentDate = new Date();
  const form = useForm<FormData>({
    initialValues: {
      misDate: null,
      remarks: "",
      uploadedFile: undefined,
    },
    validateInputOnBlur: true,
    validateInputOnChange: true,
    validate: {
      remarks: remarkValidation,
      uploadedFile: uploadFileValidation,
    },
  });

  //#region [useEffect]
  useEffect(() => {
    return () => {
      form.reset();
      onClose();
    };
  }, []);

  const handelOnclose = () => {
    onClose();
    form.reset();
  };
  const callback = (success: boolean) => {
    if (success) {
      successNotification("Uploaded Successfully");
      dispatch(GetSummaryPastHistoryListRequested(Number(project?.REAssetId), "setup"));
      setTimeout(() => {
        dispatch(CanSetupProjectSummaryRequested(projectId));
      }, 1000);
      handelOnclose();
    }
  };
  const handleUpload = (values: FormData) => {
    if (values?.uploadedFile && values?.remarks) {
      const data: UploadProjectSummaryTemplateSetupPayload = {
        reAssetId: project?.REAssetId,
        misDate: dayjs(currentDate).format(DATE_TIME_FORMAT_WITH_SECONDS),
        projectName: project.AssetName,
        file: values?.uploadedFile,
        entityName: userDetails?.entity,
        clientName: "test",
        remark: values?.remarks,
      };
      dispatch(UploadProjectSummaryTemplateSetupRequested(data, callback));
    }
  };

  return (
    <Modal
      size={"lg"}
      opened={open}
      onClose={handelOnclose}
      title={
        <Flex gap={"xs"}>
          <img src={uploadDocument} style={{ width: "20px", height: "20px" }} />
          <Text size={"md"} fw='bold' color={"#001d56"}>
            Upload Template
          </Text>
        </Flex>
      }>
      <form onReset={form.onReset} onSubmit={form.onSubmit(handleUpload)}>
        <Table>
          <tbody>
            <TableRow
              title={"Upload Document"}
              withAsterisk
              value={
                <>
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
                          <Button {...props} h={"150px"} w={"100%"} variant='outline'>
                            <Flex direction={"column"}>
                              <Flex justify={"center"} align={"center"}>
                                <img src={onlyPlusIcon} className='svgColorGray' style={{ width: "15px", height: "15px", marginRight: "1rem" }} />
                                <Text color='gray'>Select file to upload</Text>
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
                </>
              }
            />

            <TableRow title={"Remarks"} withAsterisk value={<TextInput placeholder='Remarks' {...form.getInputProps("remarks")} />} />
          </tbody>
        </Table>
        <Flex justify={"flex-end"} gap={"xl"}>
          <Button color='truboard-primary.0' type='submit' disabled={!form.isValid() || !canUpdate} loading={loaders.uploadProjectSummarySetup}>
            Upload
          </Button>
        </Flex>
        {!canUpdate ? (
          <Text color='red' size={15}>
            Cannot proceed. Setup is still pending.
          </Text>
        ) : null}
      </form>
    </Modal>
  );
};
export default UploadDocumentModal;
