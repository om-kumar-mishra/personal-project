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
import {
  canSetupUpdateRequested,
  getGetProjectSalesListRequested,
  uploadProjectSetupRequest,
} from "../../../../../../lib/services/HDFC/ProjectSetupUpdate/action";
import { UploadProjectSetupType } from "../../../../../../lib/services/HDFC/ProjectSetupUpdate/dataTypes";
import { selectProjectLoaders, selectcanUpdateSetup } from "../../../../../../lib/services/HDFC/ProjectSetupUpdate/selectors";
import { UserDetails } from "../../../../../../lib/services/hdfc_login/dataTypes";
import { selectUserDetails } from "../../../../../../lib/services/hdfc_login/selectors";
import { mime_types } from "../../../../../../utils/commonFunctions";
import { DATE_TIME_FORMAT_WITH_SECONDS } from "../../../../../../utils/constants";
import { TableRow } from "../../../../../Components/TableRow";
import { errorNotification, successNotification } from "../../../../../Components/UtilityFunctions";
import { remarkValidation, uploadFileValidation } from "../../../../../../utils/formValidations";

type FormData = {
  misDate?: Date | null;
  remarks?: string;
  uploadedFile?: File | null;
};

const UploadDocumentModal = ({ open, onClose, projectId }: { open: boolean; onClose: () => void; projectId: number }) => {
  const dispatch = useDispatch();

  //#region [selector]
  const userDetails = useSelector(selectUserDetails) as UserDetails;
  const project = useSelector(selectSetProject) as Project;
  const canUpdateValue = useSelector(selectcanUpdateSetup);
  const loaders = useSelector(selectProjectLoaders);
  const canUpdate = canUpdateValue?.canupdate;
  const currentDate = new Date();
  const form = useForm<FormData>({
    initialValues: {
      misDate: null,
      remarks: "",
      uploadedFile: null,
    },
    validateInputOnBlur: true,
    validateInputOnChange: true,
    validate: {
      remarks: remarkValidation,
      uploadedFile: uploadFileValidation
    },
  });

  //#region [useEffect]
  useEffect(() => {
    return () => {
      form.reset();
      onClose();
    };
  }, []);

  useEffect(() => {
    dispatch(canSetupUpdateRequested(projectId));
  }, []);

  const handelOnclose = () => {
    onClose();
    form.reset();
  };
  const callback = (success: boolean) => {
    if (success) {
      successNotification("Uploaded Successfully");
      dispatch(getGetProjectSalesListRequested(Number(project?.REAssetId), "setup"));
      dispatch(canSetupUpdateRequested(projectId));
      handelOnclose();
    } else {
      errorNotification("something went wrong");
    }
  };
  const handleUpload = (values: FormData) => {
    const data: UploadProjectSetupType = {
      reAssetId: project?.REAssetId.toString(),
      misDate: dayjs(currentDate).format(DATE_TIME_FORMAT_WITH_SECONDS),
      file: values?.uploadedFile,
      entity: userDetails?.entity,
      entityRole: userDetails?.TemplateRoleName,
      userName: userDetails?.userName,
      fileContainer: "renoc",
      filePath: `${project?.AssetName}/projectSetup`,
      fileName: values?.uploadedFile?.name as any,
      userEmail: userDetails?.EmailId,
      remarks: values?.remarks as any,
    };
    dispatch(uploadProjectSetupRequest(data, callback));
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
                              <Box mb={"xl"} ml={50}>
                                {/* <IconFileTypeXls size={50} color="gray" /> */}
                              </Box>
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
          <Button color='truboard-primary.0' type='submit' disabled={!form.isValid() || !canUpdate} loading={loaders.uploadDcoumentLoader}>
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
