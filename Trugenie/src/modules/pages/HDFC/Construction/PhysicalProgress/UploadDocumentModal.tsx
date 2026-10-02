import { Box, Button, FileButton, Flex, Modal, Select, Space, Table, Text, Textarea } from "@mantine/core";
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
import { CanUpdateConstructionRequested } from "../../../../../lib/services/HDFC/Construction/ExcelUpload/actions";
import { selectUserDetails } from "../../../../../lib/services/hdfc_login/selectors";
import { UserDetails } from "../../../../../lib/services/hdfc_login/dataTypes";
import {
  selectIsConstructionSetupPending,
  selectCanUpdateConstruction
} from "../../../../../lib/services/HDFC/Construction/ExcelUpload/selector";
import {
  GetPhysicalProgressPastHistoryListRequested,
  UploadPhysicalProgressTemplateSetupRequested
} from "../../../../../lib/services/HDFC/Construction/PhysicalProgress/actions";

type FormData = {
  misDate: Date | null;
  uploadedFile: File | null;
  remark: string | null;
};

const UploadDocumentModal = ({ open, onClose, showTypeField }: { open: boolean; onClose: () => void; showTypeField?: boolean }) => {
  const dispatch = useDispatch();
  //#region [selector]
  const project = useSelector(selectSetProject) as Project;
  const canUpdateConstruction = useSelector(selectCanUpdateConstruction);
  const userDetails = useSelector(selectUserDetails) as UserDetails;
  //#endregion

  //#region [state]
  const [canUpate, setCanUpdate] = useState<boolean>(false);
  const [uploadLoader, setUploadLoader] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<string>("");
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
      misDate: val => (!val ? "This field cannot be empty." : null),
      uploadedFile: value => {
        if (value) {
          const isAllowedType = [mime_types.xls, mime_types.xlsx].join(", ").includes(value?.type);
          const isAllowedSize = Number(value.size / 1000000) < 5 ? true : false;
          if (!isAllowedType) {
            return "Please upload .xls or .xlsx file";
          } else if (!isAllowedSize) {
            return "Invalid file size. File cannot be more than 5mb";
          } else {
            return null;
          }
        } else {
          return "Please upload a File ";
        }
      },
      remark: val => (!val || val.length < 500 ? null : "Invalid Input! Input can not be more than 500 characters."),
    },
  });

  //#region [useEffect]

  useEffect(() => {
    if (canUpdateConstruction) {
      setCanUpdate(canUpdateConstruction?.canupdate === 1);
    }
  }, [canUpdateConstruction]);

  useEffect(() => {
    if (form.values.misDate && project.REAssetId) {
      dispatch(CanUpdateConstructionRequested(dayjs(form.values.misDate).format("YYYY-MM-DD"), project.REAssetId));
    }
  }, [form.values.misDate?.toISOString(), project.REAssetId]);

  useEffect(() => {
    if (form.values.uploadedFile) {
      const isAllowedType = [mime_types.xls, mime_types.xlsx].join(", ").includes(form.values.uploadedFile?.type);
      const file_size_mb = form.values.uploadedFile.size / 1000000; // file.size in bytes
      const isAllowedSize = file_size_mb < 5 ? true : false;
      form.setErrors({ uploadedFile: isAllowedType ? null : "Invalid file type. Please upload .xls or .xlsx file." });
      form.setErrors({ uploadedFile: isAllowedSize ? null : "File Size Should not be more than 5Mb " });
    }
  }, [form.values.uploadedFile]);
  //#endregion

  const onCallback = (success: boolean, message?: string) => {
    setUploadLoader(false);
    if (success) {
      successNotification(message ?? "Construction uploaded successfully...");
      form.reset();
      onClose();
      dispatch(GetPhysicalProgressPastHistoryListRequested(Number(project?.REAssetId), userDetails?.EmailId, "Update"));
    }
  };

  const handleUpload = (values: FormData) => {
    if (values?.misDate && values?.uploadedFile) {
      setUploadLoader(true);
      const payload = {
        reassetId: project.REAssetId,
        entityName: userDetails?.entity,
        role: userDetails?.TemplateRoleName,
        fileContainer: "renoc",
        filePath: `constuction/${project.AssetName}`,
        projectType: "noc",
        developmentType: "UAT",
        phase: "Phase A",
        file: values.uploadedFile,
      };
      console.log("upload page", payload)
      dispatch(UploadPhysicalProgressTemplateSetupRequested(payload, onCallback));
    }
  };

  const handelOnclose = () => {
    onClose();
    form.reset();
    setCanUpdate(false);
    setSelectedType("");
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
              <TableRow title={"Remarks"} value={<Textarea placeholder='Remarks' {...form.getInputProps("remark")} />} />
            </tbody>
          </Table>
          <Space h={"sm"} />
          {canUpate && (
            <Flex justify={"flex-end"} gap={"xl"}>
              <Button color='truboard-primary.0' type='submit' loading={uploadLoader}>
                Upload
              </Button>
            </Flex>
          )}
        </form>
      </div>
    </Modal>
  );
};

export default UploadDocumentModal;
