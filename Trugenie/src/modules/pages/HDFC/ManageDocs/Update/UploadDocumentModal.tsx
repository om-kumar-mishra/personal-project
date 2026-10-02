import { Button, FileButton, Flex, Modal, Table, Text, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import onlyAddIcon from "../../../../../assets/logos/SVG/only_add.svg";
import uploadDocument from "../../../../../assets/logos/upload.svg";
import { selectSetProject } from "../../../../../lib/services/HDFC/Project/selectors";
import { getProjectDocumentRequested, insertProjectDocumentFailed, insertProjectDocumentRequested } from "../../../../../lib/services/HDFC/manageDocs/actions";
import { selectInsertProjectDocument, selectManageDocsUpdateLoaders } from "../../../../../lib/services/HDFC/manageDocs/selector";
import { selectUserDetails } from "../../../../../lib/services/hdfc_login/selectors";
import { mime_types } from "../../../../../utils/commonFunctions";
import { specialChars } from "../../../../../utils/constants";
import { TableRow } from "../../../../Components/TableRow";

type FormData = {
  remarks?: string;
  documentName: string;
  uploadedFile: File | null;
};

const UploadDocumentModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const dispatch = useDispatch();
  const project = useSelector(selectSetProject);
  const userDetails = useSelector(selectUserDetails);
  const loader = useSelector(selectManageDocsUpdateLoaders);
  const insertProjectDoc = useSelector(selectInsertProjectDocument);

  useEffect(() => {
    if (insertProjectDoc) {
      dispatch(insertProjectDocumentFailed());
      project?.REAssetId && dispatch(getProjectDocumentRequested(project?.REAssetId));
      form.reset();
      onClose();
    }
  }, [insertProjectDoc]);

  const form = useForm<FormData>({
    initialValues: { remarks: "", documentName: "", uploadedFile: null },
    validateInputOnBlur: true,
    validateInputOnChange: true,
    validate: {
      documentName: val => (!val ? "This field cannot be empty." : specialChars.includes(val.charAt(0)) ? "Cannot start with special character." : null),
      uploadedFile: value => {
        if (value) {
          const isAllowedType = [mime_types.xls, mime_types.xlsx, mime_types.doc, mime_types.docx, mime_types.jpeg, mime_types.png, mime_types.zip]
            .join(", ")
            .includes(value?.type);
          const isAllowedSize = Number(value.size / 1000000) < 25 ? true : false;
          if (!isAllowedType) {
            return "Please upload a valid file";
          } else if (!isAllowedSize) {
            return "Invalid file size. File cannot be more than 25mb";
          } else {
            return null;
          }
        } else {
          return "Please upload a File ";
        }
      },
      remarks: val => (val && val.trim().length > 500 ? "Invalid Input! Input can not be more than 500 characters." : null),
    },
  });

  return (
    <Modal
      size='lg'
      opened={open}
      onClose={onClose}
      title={
        <Flex gap='xs'>
          <img src={uploadDocument} style={{ width: "20px", height: "20px" }} />
          <Text size='md' fw='bold' color='#001d56'>
            Upload Template
          </Text>
        </Flex>
      }>
      <div>
        <form
          onSubmit={form.onSubmit(() => {
            if (project && userDetails) {
              dispatch(
                insertProjectDocumentRequested({
                  REAssetId: String(project.REAssetId),
                  EntityName: project.AssetName,
                  EmpCode: userDetails.EmpCode,
                  UserName: userDetails.userName,
                  UserEmail: userDetails.EmailId,
                  UserRole: userDetails.TemplateRoleName,
                  Remarks: form.values.remarks,
                  CreatedBy: userDetails.EmailId,
                  file: form.values.uploadedFile,
                  DocumentName: form.values.documentName,
                }),
              );
            }
          })}>
          <Table>
            <tbody>
              <TableRow
                title={"Document Name"}
                withAsterisk
                value={
                  <TextInput
                    pattern='^(?=[a-zA-Z0-9])(?![_\W]).*$'
                    maxLength={500}
                    placeholder='Enter Document Name'
                    withAsterisk
                    {...form.getInputProps("documentName")}
                  />
                }
              />
              <TableRow
                title='Upload Document'
                withAsterisk
                value={
                  <FileButton
                    accept={[mime_types.xls, mime_types.xlsx, mime_types.doc, mime_types.docx, mime_types.jpeg, mime_types.png, mime_types.zip].join(",")}
                    {...form.getInputProps("uploadedFile")}>
                    {props => {
                      return (
                        <>
                          {form.values.uploadedFile && (
                            <>
                              <Text fw={700}>File Uploaded :</Text>
                              {form.values.uploadedFile?.name}
                            </>
                          )}
                          <Button {...props} h='150px' w='100%' variant='outline' className='fileUpload-onhover'>
                            <Flex direction='column'>
                              <Flex justify='center' align='center'>
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
              <TableRow title={"Remarks"} value={<Textarea placeholder='Remarks' {...form.getInputProps("remarks")} />} />
            </tbody>
          </Table>
          <Flex justify='flex-end' gap='xl'>
            <Button color='truboard-primary.0' type='submit' loading={loader.insertProjectDocument}>
              Upload
            </Button>
          </Flex>
        </form>
      </div>
    </Modal>
  );
};

export default UploadDocumentModal;
