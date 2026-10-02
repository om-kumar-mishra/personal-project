import { Box, Button, FileButton, Flex, Modal, Select, Space, Table, Text, Textarea } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import onlyAddIcon from "../../../../../../assets/logos/SVG/only_add.svg";
import calendarIcon from "../../../../../../assets/logos/calendar.svg";
import uploadDocument from "../../../../../../assets/logos/upload.svg";
import { successNotification } from "../../../../../Components/UtilityFunctions";
import { mime_types } from "../../../../../../utils/commonFunctions";
import { TableRow } from "../../../../../Components/TableRow";
import { selectSetProject } from "../../../../../../lib/services/HDFC/Project/selectors";
import { Project } from "../../../../../../lib/services/HDFC/Project/dataTypes";
import { CanUpdateConstructionRequested } from "../../../../../../lib/services/HDFC/Construction/ExcelUpload/actions";
import { selectUserDetails } from "../../../../../../lib/services/hdfc_login/selectors";
import { UserDetails } from "../../../../../../lib/services/hdfc_login/dataTypes";
import {
  selectCanUpdateConstruction
} from "../../../../../../lib/services/HDFC/Construction/ExcelUpload/selector";
import {
  GetApprovalDropDownListRequested,
  GetApprovalPastHistoryListRequested,
  UploadConstructionApprovalDocumentsRequested
} from "../../../../../../lib/services/HDFC/Construction/Approvals/actions";
import { selectApprovalDropDownList } from "../../../../../../lib/services/HDFC/Construction/Approvals/selector";
import { useNavigate } from "react-router-dom";

type FormData = {
  approvalType: string | null;
  uploadedFile: File | null;
  dateOfUpload: Date | null;
  status: string | null;
  remark: string | null;
};

const UploadDocumentModal = ({ open, onClose }: { open: boolean; onClose: () => void; }) => {
  const dispatch = useDispatch();
  //#region [selector]
  const project = useSelector(selectSetProject) as Project;
  const canUpdateConstruction = useSelector(selectCanUpdateConstruction);
  const userDetails = useSelector(selectUserDetails) as UserDetails;
  const dropDown = useSelector(selectApprovalDropDownList);
  const navigate = useNavigate();
  //#endregion

  //#region [state]
  const [canUpate, setCanUpdate] = useState<boolean>(false);
  const [uploadLoader, setUploadLoader] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedApprovalId, setSelectedApprovalId] = useState<string | null>(null);
  //#endregion

  const form = useForm<FormData>({
    initialValues: {
      approvalType: "",
      uploadedFile: null,
      dateOfUpload: null,
      status: "",
      remark: "",
    },
    validateInputOnBlur: true,
    validateInputOnChange: true,
    validate: {
    },
  });

  //#region [useEffect]

  useEffect(() => {
    if (project.REAssetId && userDetails.EmailId) {
      dispatch(GetApprovalDropDownListRequested(project.REAssetId, userDetails.EmailId));
    }
  }, [project.REAssetId, userDetails.EmailId, dispatch]);

  useEffect(() => {
    if (canUpdateConstruction) {
      setCanUpdate(canUpdateConstruction?.canupdate === 1);
    }
  }, [canUpdateConstruction]);

  useEffect(() => {
    if (form.values.dateOfUpload && project.REAssetId) {
      dispatch(CanUpdateConstructionRequested(dayjs(form.values.dateOfUpload).format("YYYY-MM-DD"), project.REAssetId));
    }
  }, [form.values.dateOfUpload?.toISOString(), project.REAssetId]);

  useEffect(() => {
    if (form.values.uploadedFile) {
      const isAllowedType = [mime_types.xls, mime_types.xlsx].join(", ").includes(form.values.uploadedFile?.type);
      const file_size_mb = form.values.uploadedFile.size / 1000000;
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
      dispatch(GetApprovalPastHistoryListRequested(Number(project?.REAssetId), userDetails?.EmailId));
      const dataToPass = {
        ApprovalAuthority: selectedApproval?.ApprovalAuthority || "",
        Remark: form.values.remark || "",
        PlannedApplicationDate: selectedApproval?.PlannedApplicationDate || "",
        Stage: selectedApproval?.Stage || "",
      };
      navigate("/construction/update", { state: { formData: form.values, additionalData: dataToPass } });
    }
  };

  const handleUpload = (values: FormData) => {
    if (values?.uploadedFile && values?.dateOfUpload && values?.status) {
      setUploadLoader(true);

      const payload = {
        reassetId: project.REAssetId,
        role: userDetails?.TemplateRoleName,
        entityName: userDetails?.entity,
        CreatedBy: userDetails?.EmailId,
        MISDate: dayjs(values.dateOfUpload).format("YYYY-MM-DD"),
        files: values.uploadedFile,
        data: [
          {
            Configuration: selectedApproval?.ApprovalsType,
            ApprovalAuthority: selectedApproval?.ApprovalAuthority || "NA",
            Remark: values.remark ?? "",
            approvalStatus: values.status ?? "",
            PlannedApplicationDate: selectedApproval?.PlannedApplicationDate || null,
            Stage: selectedApproval?.Stage || "NA",
            ApprovalId: selectedApproval?.ApprovalId || null,
            uploadDate: dayjs(values.dateOfUpload).format("YYYY-MM-DD"),
            FileContainer: "reconstruction",
            FilePath: "FixMeGanttData/approvals",
            FileName: values.uploadedFile.name,
            actualfile: values.uploadedFile,
          },
        ],
      };

      dispatch(UploadConstructionApprovalDocumentsRequested(payload, onCallback));
    }
  };

  const handelOnclose = () => {
    onClose();
    form.reset();
    setCanUpdate(false);
    setSelectedType("");
    setSelectedApprovalId(null);
  };

  const approvalOptions = dropDown.map(item => ({
    value: item.ApprovalId.toString(),
    label: item.ApprovalsType,
  }));

  const selectedApproval = dropDown.find(item => item.ApprovalId === Number(form.values.approvalType));

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
            Upload Construction Approvals
          </Text>
        </Flex>
      }>
      <div>
        <form onSubmit={form.onSubmit(handleUpload)}>
          <Table>
            <tbody>
              <TableRow
                title={"Approval Type"}
                withAsterisk
                value={
                  <Select
                    data={approvalOptions}
                    placeholder='-Select-'
                    {...form.getInputProps("approvalType")}
                  />
                }
              />
              <TableRow title={"Stage"} value={<Text>{selectedApproval?.Stage || "NA"}</Text>} />
              <TableRow title={"Project Name"} value={<Text>{selectedApproval?.ProjectName || "NA"}</Text>} />
              <TableRow title={"Phase"} value={<Text>{selectedApproval?.ProjectPhase || "NA"}</Text>} />
              <TableRow title={"Development Type"} value={<Text>{selectedApproval?.DevelopmentType || "NA"}</Text>} />
              <TableRow title={"Product Type"} value={<Text>{selectedApproval?.ProductType || "NA"}</Text>} />
              <TableRow title={"Product Sub-Type"} value={<Text>{selectedApproval?.ProductSubType || "NA"}</Text>} />
              <TableRow title={"Wing"} value={<Text>{selectedApproval?.Wing || "NA"}</Text>} />
              <TableRow title={"Approval Authority"} value={<Text>{selectedApproval?.ApprovalAuthority || "NA"}</Text>} />
              <TableRow title={"Planned Application Date"} value={<Text>{selectedApproval?.PlannedApplicationDate || "NA"}</Text>} />
              <TableRow title={"Expiry Date"} value={<Text>{selectedApproval?.ExpiryDate || "NA"}</Text>} />
              <TableRow
                title={"Upload Document"}
                withAsterisk
                value={
                  <FileButton accept={[mime_types.xls, mime_types.xlsx].join(",")} {...form.getInputProps("uploadedFile")}>
                    {props => (
                      <>
                        {form.values.uploadedFile && (
                          <>
                            <Text fw={700}>File Uploaded :</Text>
                            {form.values.uploadedFile?.name}
                          </>
                        )}
                        <Button {...props} h={"150px"} w={"100%"} variant='outline' className='fileUpload-onhover'>
                          <Flex direction={"column"}>
                            <Box mb={"xl"} ml={50}></Box>
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
                    )}
                  </FileButton>
                }
              />
              <TableRow
                title={"Date of Upload"}
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
                      {...form.getInputProps("dateOfUpload")}
                      maxDate={new Date()}
                    />
                    {!canUpate && form.values.dateOfUpload ? (
                      <Text color='red' size={"xs"} lineClamp={2}>
                        Image cannot be uploaded for the selected Date of Upload.{" "}
                      </Text>
                    ) : null}
                  </>
                }
              />
              <TableRow
                title={"Status"}
                withAsterisk
                value={
                  <Select
                    data={["Received", "Submitted"].map(status => ({ value: status, label: status }))}
                    placeholder='-Select-'
                    {...form.getInputProps("status")}
                  />
                }
              />
              <TableRow title={"Remarks"} value={<Textarea placeholder='Remarks' {...form.getInputProps("remark")} />} />
            </tbody>
          </Table>
          <Space h={"sm"} />
          {canUpate && (
            <Flex justify={"flex-end"} gap={"xl"}>
              <Button color='truboard-primary.0' type='submit'
              // loading={uploadLoader}
              >
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