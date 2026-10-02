import { Box, Button, FileButton, Flex, Modal, Select, Table, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
// import { IconFileTypeXls } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useEffect, useMemo } from "react";
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
import { successNotification } from "../../../../../Components/UtilityFunctions";
import {
  CanSetupCashflowRequested,
  UploadCashflowUnderwrittenTemplateSetupRequested,
  UploadCashflowBusinessPlanTemplateSetupRequested,
  GetCashflowSetupPastUpdatesRequested,
} from "../../../../../../lib/services/HDFC/Cashflow/action";
import { selectCanSetupCashflow, selectCashflowLoaders } from "../../../../../../lib/services/HDFC/Cashflow/selector";
import { UploadCashflowSetupTemplatePayload } from "../../../../../../lib/services/HDFC/Cashflow/dataTypes";
import { manadateFieldValidation, remarkValidation, uploadFileValidation } from "../../../../../../utils/formValidations";

type FormData = {
  misDate?: Date | null;
  remarks?: string;
  type?: "LatestBusinessPlan" | "Underwritten" | null;
  uploadedFile?: File;
};

const UploadDocumentModal = ({ open, onClose, showTypeField }: { open: boolean; onClose: () => void; projectId: number; showTypeField?: boolean }) => {
  const dispatch = useDispatch();

  //#region [selector]
  const userDetails = useSelector(selectUserDetails) as UserDetails;
  const project = useSelector(selectSetProject) as Project;
  const loaders = useSelector(selectCashflowLoaders);
  const canUpdateValue = useSelector(selectCanSetupCashflow);
  const canUpdate = canUpdateValue?.canupdate !== 0;
  const currentDate = new Date();

  const typesList = useMemo(() => {
    return [
      { value: "LatestBusinessPlan", label: "Latest Business Plan" },
      { value: "Underwritten", label: "Underwritten" },
    ];
  }, []);

  const form = useForm<FormData>({
    initialValues: {
      misDate: null,
      remarks: "",
      type: null,
      uploadedFile: undefined,
    },
    validateInputOnBlur: true,
    validateInputOnChange: true,
    validate: {
      remarks: remarkValidation,
      type: manadateFieldValidation,
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

  useEffect(() => {
    form.values.type && dispatch(CanSetupCashflowRequested(project?.REAssetId, form.values.type));
  }, [form.values.type]);

  const handelOnclose = () => {
    onClose();
    form.reset();
  };

  const callback = (success: boolean) => {
    if (success) {
      successNotification("Uploaded Successfully");
      dispatch(GetCashflowSetupPastUpdatesRequested(Number(project?.REAssetId)));
      handelOnclose();
    }
  };
  const handleUpload = (values: FormData) => {
    if (values?.uploadedFile && values?.remarks) {
      const data: UploadCashflowSetupTemplatePayload = {
        reAssetId: project?.REAssetId,
        misDate: dayjs(currentDate).format(DATE_TIME_FORMAT_WITH_SECONDS),
        projectName: project.AssetName,
        file: values?.uploadedFile,
        entityName: userDetails?.entity,
        clientName: "test",
        remark: values?.remarks,
      };
      //  if the selected type is "BusinessPlan"
      if (form.values.type === "LatestBusinessPlan") {
        dispatch(UploadCashflowBusinessPlanTemplateSetupRequested(data, callback));
      } else if (form.values.type === "Underwritten") {
        dispatch(UploadCashflowUnderwrittenTemplateSetupRequested(data, callback));
      }
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
      {form.values.type && !canUpdate ? (
        <Text color='red' size={15}>
          {`Cannot proceed. Setup is still pending for type ${form.values.type}.`}
        </Text>
      ) : null}
      <form onReset={form.onReset} onSubmit={form.onSubmit(handleUpload)}>
        <Table>
          <tbody>
            {/* Conditional "Type" field */}
            {showTypeField && (
              <TableRow
                withAsterisk
                title={"Type"}
                value={
                  <Select
                    data={typesList}
                    placeholder='-Select-'
                    // value={selectedType}
                    // onChange={value => setSelectedType(value ?? "")}
                    {...form.getInputProps("type")}
                  />
                }
              />
            )}
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
          <Button
            color='truboard-primary.0'
            type='submit'
            disabled={!form.isValid() || !canUpdate}
            loading={loaders.uploadCashflowBusinessPlanSetup || loaders.uploadCashflowUnderwrittenSetup}>
            Upload
          </Button>
        </Flex>
      </form>
    </Modal>
  );
};
export default UploadDocumentModal;
