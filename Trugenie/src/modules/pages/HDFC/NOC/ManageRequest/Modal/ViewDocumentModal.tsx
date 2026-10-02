import { Modal, Text, createStyles } from "@mantine/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import downloadIcon from "../../../../../../assets/logos/SVG/download.svg";
import useSearchAndPagination from "../../../../../../hooks/useSearchAndPagination";
import { getNOCDocumentsRequested } from "../../../../../../lib/services/HDFC/NOCManageRequest/actions";
import {
  ApprovedDataType,
  HoldDataType,
  NOCDocumentReturnType,
  PendingNOCDataType,
  RejectedDataType,
} from "../../../../../../lib/services/HDFC/NOCManageRequest/dataTypes";
import { selectManageRequestLoaders, selectedNocDocumentsData } from "../../../../../../lib/services/HDFC/NOCManageRequest/selectors";
import { downloadRowDataRequest } from "../../../../../../lib/services/HDFC/common/action";
import NewTableWithActions, { TableHeader } from "../../../../../../widgets/tables/MantineTable/NewTableWithActions";
import { getPresentableValue } from "../../../../../Components/UtilityFunctions";
// import { viewFileDocuementAPI } from "../../../../../../lib/services/HDFC/common/api";
// import FilePreviewModal from "../../../../../../layout/filePreview/FilePreviewModal";

const useStyles = createStyles(() => ({
  modal: {
    paddingLeft: "0px",
    paddingRight: "0px",
  },
}));

export type UploadedDocTableDataType = {
  documentName: string;
  entityName: string;
  user: string;
  uploadedOn: string | Date;
};

export type SystemLetterTableDataType = {
  documentName: string;
  generatedOn: string | Date;
};
interface ViewDocumentModalProps {
  open: boolean;
  onClose: () => void;
  modalData: PendingNOCDataType | HoldDataType | ApprovedDataType | RejectedDataType | null;
}

const ViewDocumentModal: React.FC<ViewDocumentModalProps> = ({ open, onClose, modalData }: ViewDocumentModalProps) => {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const documentsData = useSelector(selectedNocDocumentsData);
  const [showLoaderForAction, setShowLoaderForAction] = useState<number | null>(null);
  const loader = useSelector(selectManageRequestLoaders);
  // const [viewFileModal, { open: openViewFileModal, close: closeViewFileModal }] = useDisclosure(false);

  //#region [state]
  // const [blobData, setBlobData] = useState<Blob | null>(null);
  // const [fileExtension, setFileExtension] = useState<string | null>(null);
  //#endregion

  useEffect(() => {
    if (modalData?.NocRequestId) dispatch(getNOCDocumentsRequested(Number(modalData?.NocRequestId)));
  }, [modalData?.NocRequestId]);

  const systemGeneratedDocuments = documentsData?.filter(item => item.UploadType === "System Generated");
  const uploadedDocuments = documentsData?.filter(item => item.UploadType !== "System Generated");

  const { finalData: systemLetterTableData, SearchComponent: SystemTableSearch } = useSearchAndPagination({
    data: systemGeneratedDocuments ?? [],
    columnsToSearch: [
      { accessorKey: "FileName", type: "text" },
      { accessorKey: "CreatedAt", type: "text" },
    ],
    useSearchOnly: true,
  });

  const { finalData: uploadedDocumentTableData, SearchComponent: UploadDocTableSearch } = useSearchAndPagination({
    data: uploadedDocuments ?? [],
    columnsToSearch: [
      { accessorKey: "FileName", type: "text" },
      { accessorKey: "EntityName", type: "text" },
      { accessorKey: "CreatedBy", type: "text" },
      { accessorKey: "CreatedAt", type: "date" },
    ],
    useSearchOnly: true,
  });

  const handleDownloadDocument = (rowData: NOCDocumentReturnType) => {
    setShowLoaderForAction(rowData.NocDocumentId);
    dispatch(
      downloadRowDataRequest(rowData.BucketName, rowData?.Folder, rowData.FileName, (success: boolean) => {
        setShowLoaderForAction(null);
      }),
    );
  };

  // please do not remove this comment
  // const handleViewDocument = async (rowData: NOCDocumentReturnType) => {
  //   const data = await viewFileDocuementAPI(token ?? "", rowData.BucketName, rowData?.Folder, rowData.FileName);
  //   data && setBlobData(data);
  //   setFileExtension(getFileExtension(rowData.FileName));
  // };

  // useEffect(() => {
  //   if (fileExtension && blobData) {
  //     openViewFileModal();
  //   }
  // }, [fileExtension, blobData]);

  return (
    <Modal size={"80%"} opened={open} onClose={onClose} classNames={{ body: classes.modal }}>
      {/* system gen. letters */}
      <NewTableWithActions
        loader={loader?.getNocDocuments}
        cardHeader={<TableHeader title='System Generated Letter(s)' SearchComponent={SystemTableSearch} />}
        columns={[
          {
            title: "Document Name",
            accessorKey: "FileName",
          },
          {
            title: "Generated On",
            accessorKey: "CreatedAt",
            transform: value => <Text title={getPresentableValue(value, true) as string}> {getPresentableValue(value, true) as string}</Text>,
          },
          {
            title: "Action",
            accessorKey: "actions",
            actionTypes: [
              // {
              //   type: "view",
              //   onClick: rowData => handleViewDocument(rowData),
              //   disabled: rowData => !supportFileExtension.includes(getFileExtension(rowData?.FileName ?? "")),
              // },
              {
                type: "download",
                onClick: rowData => handleDownloadDocument(rowData),
                loading(row) {
                  return showLoaderForAction === row.NocDocumentId;
                },
                override: rowData => (rowData?.FileName != null ? { icon: downloadIcon, tooltip: "Download" } : { icon: null, tooltip: null }),
                // disabled: rowData => !supportFileExtension.includes(getFileExtension(rowData?.FileName ?? "")),
              },
            ],
          },
        ]}
        data={systemLetterTableData}
      />

      {/* uploaded-docs */}
      <NewTableWithActions
        loader={loader?.getNocDocuments}
        cardHeader={<TableHeader title='Uploaded Documents' SearchComponent={UploadDocTableSearch} />}
        columns={[
          {
            title: "Document Name",
            accessorKey: "FileName",
          },
          { title: "Entity Name", accessorKey: "EntityName" },
          { title: "User", accessorKey: "UserName" },
          {
            title: "Uploaded On",
            accessorKey: "CreatedAt",
            transform: value => <Text title={getPresentableValue(value, true) as string}>{getPresentableValue(value, true) as string}</Text>,
          },
          {
            title: "Action",
            accessorKey: "actions",
            actionTypes: [
              // {
              //   type: "view",
              //   onClick: rowData => handleViewDocument(rowData),
              // },
              {
                type: "download",
                onClick: rowData => handleDownloadDocument(rowData),
                loading(row) {
                  return showLoaderForAction === row.NocDocumentId;
                },
                override: rowData => (rowData?.FileName != null ? { icon: downloadIcon, tooltip: "Download" } : { icon: null, tooltip: null }),
              },
            ],
          },
        ]}
        data={uploadedDocumentTableData}
      />
      {/* {viewFileModal && (
        <FilePreviewModal
          fileData={blobData}
          fileExtension={fileExtension}
          open={viewFileModal}
          onClose={() => {
            setBlobData(null);
            closeViewFileModal();
          }}
        />
      )} */}
    </Modal>
  );
};

export default ViewDocumentModal;
