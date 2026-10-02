import { Box, Button, FileButton, Flex, Modal, Space, Table, Text } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import onlyAddIcon from "../../../../../../assets/logos/SVG/only_add.svg";
import calendarIcon from "../../../../../../assets/logos/calendar.svg";
import uploadDocument from "../../../../../../assets/logos/upload.svg";
import { mime_types } from "../../../../../../utils/commonFunctions";
import { TableRow } from "../../../../../Components/TableRow";
import { selectSetProject } from "../../../../../../lib/services/HDFC/Project/selectors";
import { Project } from "../../../../../../lib/services/HDFC/Project/dataTypes";
import { selectUserDetails } from "../../../../../../lib/services/hdfc_login/selectors";
import { UserDetails } from "../../../../../../lib/services/hdfc_login/dataTypes";
import { selectCanUpdateConstruction } from "../../../../../../lib/services/HDFC/Construction/ExcelUpload/selector";
import { CanAddSiteVisitImagesRequested } from "../../../../../../lib/services/HDFC/Construction/SiteImage/actions";
import SubmitModal from "./SubmitModal";

type FormData = {
  misDate: Date | null;
  uploadedFile: File | null;
  remark: string | null;
};
const UploadDocumentModal = ({ open, onClose, showTypeField }: { open: boolean; onClose: () => void; showTypeField?: boolean }) => {
  const dispatch = useDispatch();
  //#region [selector]
  const project = useSelector(selectSetProject) as Project;
  // const summaryPastHistoryList = useSelector(selectSummaryPastHistoryList);
  const canUpdateConstruction = useSelector(selectCanUpdateConstruction);
  const userDetails = useSelector(selectUserDetails) as UserDetails;
  //#endregion

  //#region [state]
  const [canUpate, setCanUpdate] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<string>("");
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
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
          const isAllowedType = [mime_types.jpg, mime_types.jpeg, mime_types.png].join(", ").includes(value?.type);
          const isAllowedSize = Number(value.size / 1000000) < 5 ? true : false;
          if (!isAllowedType) {
            return "Please upload .jpg or .jpeg file";
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

  useEffect(() => {
    if (canUpdateConstruction) {
      setCanUpdate(canUpdateConstruction?.canupdate === 1);
    }
  }, [canUpdateConstruction]);

  useEffect(() => {
    if (form.values.misDate && project.REAssetId) {
      dispatch(CanAddSiteVisitImagesRequested(
        project.REAssetId,
        userDetails.EmailId));
    }
  }, [form.values.misDate?.toISOString(), project.REAssetId]);

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

  const handelOnclose = () => {
    onClose();
    form.reset();
    setCanUpdate(false);
    setSelectedType("");
  };

  const openSubmitModal = () => {
    console.log("Ankita");
    setSubmitModalOpen(true);
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
              Upload Template
            </Text>
          </Flex>
        }>
        <div>
          <form
            // onSubmit={form.onSubmit(handleUpload)}
            onSubmit={form.onSubmit(openSubmitModal)}
          >
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
                {/* <TableRow title={"Remarks"} value={<Textarea placeholder='Remarks' {...form.getInputProps("remark")} />} /> */}
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
