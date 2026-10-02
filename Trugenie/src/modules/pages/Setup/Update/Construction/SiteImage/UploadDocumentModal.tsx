import { Box, Button, FileButton, Flex, Modal, Space, Table, Text, Textarea } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
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
import { selectUserDetails } from "../../../../../../lib/services/hdfc_login/selectors";
import { UserDetails } from "../../../../../../lib/services/hdfc_login/dataTypes";
import { selectCanUpdateConstruction } from "../../../../../../lib/services/HDFC/Construction/ExcelUpload/selector";
import { CanAddSiteVisitImagesRequested, GetConstructionPastSiteVisitImagesRequested, UploadSiteImageUpdateRequested } from "../../../../../../lib/services/HDFC/Construction/SiteImage/actions";
import SubmitModal from "./SubmitModal";

type FormData = {
  misDate: Date | null;
  schemamisDate: Date |null;
  uploadedFile: File | null;
  schemaUploadedFile: File | null;
  remark: string | null;
  schemaRemark: string | null;
};
const UploadDocumentModal = ({ open, onClose }: { open: boolean; onClose: () => void; }) => {
  const dispatch = useDispatch();
  //#region [selector]
  const project = useSelector(selectSetProject) as Project;
  // const summaryPastHistoryList = useSelector(selectSummaryPastHistoryList);
  const canUpdateConstruction = useSelector(selectCanUpdateConstruction);
  const userDetails = useSelector(selectUserDetails) as UserDetails;
  //#endregion

  //#region [state]
  const [canUpate, setCanUpdate] = useState<boolean>(false);
  const [uploadLoader, setUploadLoader] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<string>("");
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  //#endregion

  const form = useForm<FormData>({
    initialValues: {
      misDate: null,
      schemamisDate: null,
      uploadedFile: null,
      schemaUploadedFile: null,
      remark: null,
      schemaRemark: null,
    },
    validateInputOnBlur: true,
    validateInputOnChange: true,
  });


  useEffect(() => {
    if (canUpdateConstruction) {
      setCanUpdate(canUpdateConstruction?.canupdate === 1);
    }
  }, [canUpdateConstruction]);

  useEffect(() => {
    if (form.values.misDate && project.REAssetId && form.values.schemamisDate) {
      dispatch(CanAddSiteVisitImagesRequested(
        project.REAssetId,
        userDetails.EmailId));
    }
  }, [form.values.misDate?.toISOString(), project.REAssetId, form.values.schemamisDate?.toISOString(),]);

  useEffect(() => {
    if (form.values.uploadedFile) {
      const isAllowedType = [mime_types.jpg, mime_types.jpeg, mime_types.png].join(", ").includes(form.values.uploadedFile?.type);
      const file_size_mb = form.values.uploadedFile.size / 1000000; 
      const isAllowedSize = file_size_mb < 5 ? true : false;
      form.setErrors({ uploadedFile: isAllowedType ? null : "Invalid file type. Please upload .jpg, .jpeg or .png file." });
      form.setErrors({ uploadedFile: isAllowedSize ? null : "Image Size Should not be more than 5Mb " });
    }
  }, [form.values.uploadedFile]);
  //#endregion

  useEffect(() => {
    if (form.values.schemaUploadedFile) {
      const isAllowedType = [mime_types.jpg, mime_types.jpeg, mime_types.png].join(", ").includes(form.values.schemaUploadedFile?.type);
      const file_size_mb = form.values.schemaUploadedFile.size / 1000000; 
      const isAllowedSize = file_size_mb < 5 ? true : false;
      form.setErrors({ schemaUploadedFile: isAllowedType ? null : "Invalid file type. Please upload .jpg, .jpeg or .png file." });
      form.setErrors({ schemaUploadedFile: isAllowedSize ? null : "Image Size Should not be more than 5Mb " });
    }
  }, [form.values.schemaUploadedFile]);
  //#endregion

  const onCallback = (success: boolean, message?: string) => {
    setUploadLoader(false);
    if (success) {
      successNotification(message ?? "Construction uploaded successfully...");
      form.reset();
      onClose();
      dispatch(GetConstructionPastSiteVisitImagesRequested(Number(project?.REAssetId), userDetails?.EmailId));
    }
  };

  const handleUpload = (values: FormData) => {
    if (values?.misDate && values?.uploadedFile && values?.schemamisDate && values?.schemaUploadedFile) {
      setUploadLoader(true);
      const payload = {
        reassetId: project.REAssetId,
        role: userDetails?.TemplateRoleName,
        entityName: userDetails?.entity,
        CreatedBy: userDetails?.EmailId,
        data: [{
          type: "Upload",
          fileConatiner:"renoc",
          filePath:`constuction/${project.AssetName}`,
          fileName: values.schemaUploadedFile?.name,
          remarks: values.schemaRemark ?? "",
        },
        {
          type: "Upload",
          fileConatiner:"renoc",
          filePath:`constuction/${project.AssetName}`,
          fileName: values.uploadedFile?.name,
          remarks: values.remark ?? "",
        }
      ],
        files: values.uploadedFile, 
      };
  
      dispatch(UploadSiteImageUpdateRequested(payload, onCallback));
    }
  };
  

  const handelOnclose = () => {
    onClose();
    form.reset();
    setCanUpdate(false);
    setSelectedType("");
  };

  const closeSubmitModal = () => {
    setSubmitModalOpen(false);
  };

  return (
    <>
      <Modal
        size='lg'
        opened={open}
        onClose={handelOnclose}
        style={{ overflow: "visible" }}
        title={
          <Flex gap={"xs"}>
            <img src={uploadDocument} style={{ width: "20px", height: "20px" }} />
            <Text size={"md"} fw='bold' color={"#001d56"}>
              Upload Construction Sales Template
            </Text>
          </Flex>
        }>
        <div>
          <form
            onSubmit={form.onSubmit(handleUpload)}
            // onSubmit={form.onSubmit(openSubmitModal)}
          >
            <h5 style={{ marginLeft: "260px" }}>Schema</h5>

            {/* Schema */}
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
                        {...form.getInputProps("schemamisDate")}
                        maxDate={new Date()}
                      />
                      {!canUpate && form.values.schemamisDate ? (
                        <Text color='red' size={"xs"} lineClamp={2}>
                          Image cannot be uploaded for the selected MIS date.{" "}
                        </Text>
                      ) : null}
                    </>
                  }
                />
                <TableRow
                  title={"Upload Document"}
                  withAsterisk
                  value={
                    <FileButton accept={[mime_types.jpeg, mime_types.jpg].join(",")} {...form.getInputProps("schemaUploadedFile")}>
                      {props => {
                        return (
                          <>
                            {form.values.schemaUploadedFile && (
                              <>
                                <Text fw={700}>Image Uploaded :</Text>
                                {form.values.schemaUploadedFile?.name}
                              </>
                            )}
                            <Button {...props} h={"150px"} w={"100%"} variant='outline' className='fileUpload-onhover'>
                              <Flex direction={"column"}>
                                <Box mb={"xl"} ml={50}>
                                  {/* <IconFileTypeXls size={50} color="gray" /> */}
                                </Box>
                                <Flex justify={"center"} align={"center"}>
                                  <img src={onlyAddIcon} style={{ width: "10px", height: "10px", marginRight: "10px" }} className='svgColorGray' />
                                  <Text color='gray'>Select image to upload...</Text>
                                </Flex>
                              </Flex>
                            </Button>
                            {form.errors.schemaUploadedFile ? (
                              <Text color='red' size={12}>
                                {form.errors.schemaUploadedFile}
                              </Text>
                            ) : null}
                          </>
                        );
                      }}
                    </FileButton>
                  }
                />
                <TableRow title={"Remarks"} value={<Textarea placeholder='Remarks' {...form.getInputProps("schemaRemark")} />} />
              </tbody>
            </Table>

            {/* At Investment */}
            <h5 style={{ marginLeft: "250px" }}>At Investment</h5>
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
                          Image cannot be uploaded for the selected MIS date.{" "}
                        </Text>
                      ) : null}
                    </>
                  }
                />


                <TableRow
                  title={"Upload Document"}
                  withAsterisk
                  value={
                    <FileButton accept={[mime_types.jpeg, mime_types.jpg].join(",")} {...form.getInputProps("uploadedFile")}>
                      {props => {
                        return (
                          <>
                            {form.values.uploadedFile && (
                              <>
                                <Text fw={700}>Image Uploaded :</Text>
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
                                  <Text color='gray'>Select image to upload...</Text>
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
      <SubmitModal open={submitModalOpen} onClose={closeSubmitModal} formValues={form.values} />
    </>
  );
};

export default UploadDocumentModal;
