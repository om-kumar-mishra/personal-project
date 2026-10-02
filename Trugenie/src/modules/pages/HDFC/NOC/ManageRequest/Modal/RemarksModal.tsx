import { Button, FileButton, Flex, Modal, Table, Text, Textarea, Title, createStyles } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSearchAndPagination from "../../../../../../hooks/useSearchAndPagination";
import FilePreviewModal from "../../../../../../layout/filePreview/FilePreviewModal";
import { getHoldNOCRequested, getNOCRemarksRequested, submitNOCRemarksRequested } from "../../../../../../lib/services/HDFC/NOCManageRequest/actions";
import { NOCRemarksPayload, NOCRemarksReturnType } from "../../../../../../lib/services/HDFC/NOCManageRequest/dataTypes";
import { selectManageRequestLoaders, selectedNocRemarksData } from "../../../../../../lib/services/HDFC/NOCManageRequest/selectors";
import { downloadRowDataRequest } from "../../../../../../lib/services/HDFC/common/action";
import { selectUserDetails } from "../../../../../../lib/services/hdfc_login/selectors";
import NewTableWithActions, { TableHeader } from "../../../../../../widgets/tables/MantineTable/NewTableWithActions";
import { TableRow } from "../../../../../Components/TableRow";
import { getPresentableValue, successNotification } from "../../../../../Components/UtilityFunctions";
// import { viewFileDocuementAPI } from "../../../../../../lib/services/HDFC/common/api";
import { useDisclosure } from "@mantine/hooks";
import downloadIcon from "../../../../../../assets/logos/SVG/download.svg";
import uploadDocumentIcon from "../../../../../../assets/logos/SVG/upload.svg";
import { selectSetProject } from "../../../../../../lib/services/HDFC/Project/selectors";
import { mime_types } from "../../../../../../utils/commonFunctions";

const useStyles = createStyles(() => ({
  modal: {
    paddingLeft: "0px",
    paddingRight: "0px",
  },
}));

interface RemarksModalProps {
  open: boolean;
  onClose: () => void;
  modalData: any;
}

const RemarksModal: React.FC<RemarksModalProps> = ({ open, onClose, modalData }: RemarksModalProps) => {
  const dispatch = useDispatch();
  const { classes } = useStyles();
  // disclosure
  const [viewFileModalState, { open: openViewFileModal, close: closeViewFileModal }] = useDisclosure(false);
  const manageRequestLoaders = useSelector(selectManageRequestLoaders);
  //#region [selector]
  const remarksData = useSelector(selectedNocRemarksData);
  const userDetails = useSelector(selectUserDetails);
  const selectedProject = useSelector(selectSetProject);
  //#endregion

  //#region [state]
  const [remarks, setRemarks] = useState<string>("");
  const [blobData, setBlobData] = useState<Blob | null>(null);
  const [fileExtension, setFileExtension] = useState<string | null>(null);
  const resetDocumentRef = useRef<() => void>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  //#endregion

  //#region [useEffect]
  useEffect(() => {
    if (modalData && modalData.NocRequestId) dispatch(getNOCRemarksRequested(modalData.NocRequestId));
  }, [modalData]);

  useEffect(() => {
    if (fileExtension && blobData) {
      openViewFileModal();
    }
  }, [fileExtension, blobData]);
  //#endregion

  const { finalData: remarksTableData, SearchComponent: RemarksTableSearch } = useSearchAndPagination({
    data: remarksData ?? [],
    columnsToSearch: [
      { accessorKey: "Unit", type: "text" },
      { accessorKey: "EntityName", type: "text" },
      { accessorKey: "Users", type: "text" },
      { accessorKey: "CreatedAt", type: "text" },
      { accessorKey: "Remark", type: "text" },
    ],
    useSearchOnly: true,
  });
  const clearDocumentFile = () => {
    setUploadedFile(null);
    resetDocumentRef.current?.();
  };

  const handleOnChange = (e: { currentTarget: { value: string } }) => {
    if (e.currentTarget.value.trim().length > 500) {
      setErrorMsg("Invalid Input! Input can not be more than 500 characters.");
      // setRemarks(e.currentTarget.value);
    } else {
      setRemarks(e.currentTarget.value);
      setErrorMsg("");
    }
  };

  const actionCallback = (success: boolean) => {
    if (success) {
      successNotification("Modified remarks sent back successfully");
      dispatch(getHoldNOCRequested(selectedProject?.NocProjectId || 0, 0, userDetails?.EmailId ?? ""));
      onClose();
      setRemarks("");
      setUploadedFile(null);
    }
  };

  const handleFormSubmit = () => {
    const payload: NOCRemarksPayload = {
      nocRequestId: modalData?.NocRequestId,
      users: userDetails?.EmailId ?? "",
      remark: remarks,
      documentContainer: "renoc",
      filepath: `HoldDocument/${modalData?.projectname}`,
      fileName: uploadedFile?.name ?? "",
      createdBy: userDetails?.EmailId ?? "",
      file: uploadedFile ? uploadedFile : null,
    };
    dispatch(submitNOCRemarksRequested(payload, actionCallback));
  };

  const handleDownloadDocument = (rowData: NOCRemarksReturnType) => {
    dispatch(downloadRowDataRequest(rowData.DocumentContainer, rowData?.Filepath, rowData.FileName));
  };

  // please do not remove this comment
  // const handleViewDocument = async (rowData: NOCRemarksReturnType) => {
  //   const data = await viewFileDocuementAPI(token ?? "", rowData.DocumentContainer, rowData?.Filepath, rowData.FileName);
  //   data && setBlobData(data);
  //   setFileExtension(getFileExtension(rowData.FileName));
  // };

  const handelClose = () => {
    onClose();
    setRemarks("");
    setUploadedFile(null);
  };

  return (
    <Modal size={"80%"} opened={open} onClose={handelClose} classNames={{ body: classes.modal }}>
      <Text mx='md'>
        <span style={{ color: "#001d56", fontWeight: "bold" }}>Unit No.:</span> {modalData?.UnitNo}
      </Text>
      <NewTableWithActions
        loader={manageRequestLoaders.getNocRemarks}
        cardHeader={<TableHeader title='Sent Back History' SearchComponent={RemarksTableSearch} />}
        columns={[
          {
            title: "Unit",
            accessorKey: "Unit",
          },
          { title: "Entity Name", accessorKey: "EntityName" },
          { title: "User", accessorKey: "Users" },
          { title: "Date", accessorKey: "CreatedAt", transform: value => <Text title={getPresentableValue(value, true) as string}>{getPresentableValue(value, true)}</Text> },
          { title: "Remarks", accessorKey: "Remark" },
          {
            title: "Action",
            accessorKey: "actions",
            actionTypes: [
              // {
              //   type: "view",
              //   onClick: rowData => handleViewDocument(rowData),
              //   // override: rowData => (!supportFileExtension.includes(getFileExtension(rowData?.FileName ?? "")) ? { tooltip: null } : { tooltip: null }),
              //   disabled: rowData => !supportFileExtension.includes(getFileExtension(rowData?.FileName ?? "")),
              // },
              {
                type: "download",
                onClick: rowData => handleDownloadDocument(rowData),
                override: rowData => (rowData?.FileName != null ? { icon: downloadIcon, tooltip: "Download" } : { icon: null, tooltip: null }),
                // disabled: rowData => rowData?.FileName == null,
              },
            ],
          },
        ]}
        data={remarksTableData}
      />
      {modalData?.cancontinuehold === 0 ? (
        <Flex mx={"md"}>
          <Table>
            <tbody>
              <TableRow
                title={"Upload Document:"}
                value={
                  <Flex gap={20}>
                    {!uploadedFile && (
                      <FileButton
                        resetRef={resetDocumentRef}
                        onChange={setUploadedFile}
                        accept={[mime_types.pdf, mime_types.doc, mime_types.docx, mime_types.xls, mime_types.xlsx, mime_types.jpeg, mime_types.png].join(",")}>
                        {props => (
                          <Button {...props} color='truboard-primary.0' mt={"-10px"}>
                            <img src={uploadDocumentIcon} style={{ height: "15px", width: "15px", filter: "invert(100%)" }} />
                            &nbsp;&nbsp;Upload
                          </Button>
                        )}
                      </FileButton>
                    )}
                    {/* <Flex justify={"flex-start"} gap={"xl"} my='md'> */}
                    {uploadedFile && (
                      <Title size='md' fw='bold' color={"#001d56"} align='center'>
                        {uploadedFile.name}
                      </Title>
                    )}
                    <Button disabled={!uploadedFile} color='red' variant='outline' mt={"-10px"} onClick={clearDocumentFile}>
                      Reset
                    </Button>
                    {/* </Flex>{" "} */}
                  </Flex>
                }
                centerHeader={false}
                fullWidth
              />
            </tbody>
          </Table>
        </Flex>
      ) : (
        ""
      )}
      <Flex mx={"md"}>
        <TableRow
          title={"Remarks: "}
          withAsterisk
          value={<Textarea placeholder='Remarks' value={remarks} onChange={e => handleOnChange(e)} error={errorMsg} style={{ width: "300px" }} />}
          centerHeader={false}
          fullWidth
        />
      </Flex>
      {modalData?.cancontinuehold === 0 ? (
        <Flex gap='sm' justify={"flex-end"} mx='md'>
          <Button onClick={handleFormSubmit} color='truboard-primary.0' loading={manageRequestLoaders.submitNocRemarks}>
            Submit
          </Button>
        </Flex>
      ) : (
        <Flex gap='sm' justify={"flex-end"} mx='md'>
          <Button onClick={handleFormSubmit} color='truboard-primary.0' loading={manageRequestLoaders.submitNocRemarks}>
            Send Back
          </Button>
        </Flex>
      )}
      {viewFileModalState && (
        <FilePreviewModal
          fileData={blobData}
          fileExtension={fileExtension}
          open={viewFileModalState}
          onClose={() => {
            setBlobData(null);
            closeViewFileModal();
          }}
        />
      )}
    </Modal>
  );
};

export default RemarksModal;
