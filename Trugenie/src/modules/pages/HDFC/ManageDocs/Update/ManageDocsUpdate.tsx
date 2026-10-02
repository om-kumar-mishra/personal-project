import { Button, Card, Flex, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { openConfirmModal } from "@mantine/modals";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import InfoIcons from "../../../../../assets/logos/SVG/infocircle.svg";
import plusIcon from "../../../../../assets/logos/SVG/only_add.svg";
import timelineIcon from "../../../../../assets/logos/SVG/timeline.svg";
import filexlsxIcon from "../../../../../assets/logos/filexlsx.svg";
import uploadDocument from "../../../../../assets/logos/upload.svg";
import useSearchAndPagination from "../../../../../hooks/useSearchAndPagination";
import { selectSetProject } from "../../../../../lib/services/HDFC/Project/selectors";
import { downloadRowDataRequest } from "../../../../../lib/services/HDFC/common/action";
import { selectDocumentDownloadLoaders } from "../../../../../lib/services/HDFC/common/selectors";
import { deleteProjectDocumentFailed, deleteProjectDocumentRequested, getProjectDocumentRequested } from "../../../../../lib/services/HDFC/manageDocs/actions";
import { ProjectDocument } from "../../../../../lib/services/HDFC/manageDocs/dataType";
import { selectDeleteProjectDocument, selectGetProjectDocument, selectManageDocsUpdateLoaders } from "../../../../../lib/services/HDFC/manageDocs/selector";
import { selectUserDetails } from "../../../../../lib/services/hdfc_login/selectors";
import { ROUTES } from "../../../../../routeConstants";
import NewTableWithActions, { TableHeader } from "../../../../../widgets/tables/MantineTable/NewTableWithActions";
import UploadDocumentModal from "./UploadDocumentModal";

const ManageDocsUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const project = useSelector(selectSetProject);
  const projectDocument = useSelector(selectGetProjectDocument);
  const loader = useSelector(selectManageDocsUpdateLoaders);
  const userDetails = useSelector(selectUserDetails);
  const deleteProjectDocument = useSelector(selectDeleteProjectDocument);
  const documentDownloadLoader = useSelector(selectDocumentDownloadLoaders);
  const [uploadDocumentModal, { open: openUploadDocumentModal, close: closeUploadDocumentModal }] = useDisclosure(false);
  const { finalData, SearchComponent, PaginationComponent } = useSearchAndPagination({
    data: projectDocument ?? [],
    columnsToSearch: [{ accessorKey: "DocumentName", type: "text" }],
    itemsPerPageData: [10, 20, 30, 40, 50],
    showItemsPerPageDropdown: true,
    showPaginationWithSearch: false,
  });
  const [showLoaderId, setShowLoaderId] = useState<{ id: number; for: string } | null>(null);

  useEffect(() => {
    project?.REAssetId && dispatch(getProjectDocumentRequested(project?.REAssetId));
    if (deleteProjectDocument) dispatch(deleteProjectDocumentFailed());
  }, [project?.REAssetId, deleteProjectDocument]);

  const openModal = (data: ProjectDocument) => {
    openConfirmModal({
      title: "Delete MIS",
      children: <Text size='sm'>Are you sure you want to delete Document?</Text>,
      centered: true,
      color: "blue",
      labels: { cancel: "No", confirm: "Yes" },
      onConfirm: () => {
        userDetails &&
          dispatch(
            deleteProjectDocumentRequested({
              DocId: data.DocId,
              EmpCode: userDetails.EmpCode,
              UserName: userDetails.userName,
              UserEmail: userDetails.EmailId,
              UserRole: userDetails.TemplateRoleName,
              CreatedBy: userDetails.EmailId,
            }),
          );
      },
      confirmProps: {
        color: "truboard-primary.0",
      },
    });
  };

  return (
    <>
      <Card>
        <Flex direction='row' justify='space-between'>
          <Flex direction='column' gap='xs'>
            <Text c='gray' size='sm' weight={500}>
              Upload Document
            </Text>
            <Button
              bg='#001d56'
              w={300}
              rightIcon={<img src={uploadDocument} style={{ width: "15px", height: "15px" }} className='svgColorGray' />}
              leftIcon={<img src={plusIcon} style={{ width: "12px", height: "12px" }} className='svgColorGray' />}
              onClick={openUploadDocumentModal}
              color='truboard-primary.0'>
              Select file to upload
            </Button>
            <Text color='gray' size='xs' weight={500} w={300}>
              <img src={InfoIcons} style={{ width: "15px", height: "15px", color: "#001d56" }} /> Single Upload file should not be more than 25MB, only the
              .xls, .xlsx, .jpg, .jpeg, .png, .pdf, .docx and .zip file type allowed
            </Text>
          </Flex>
        </Flex>
      </Card>
      <Flex direction='row' justify='flex-end' mr={20}>
        <Button color='truboard-primary.0' w={120} onClick={() => navigate(ROUTES.MANAGE_DOCS_TIMELINE)}>
          <img src={timelineIcon} className='filter-white' style={{ width: "20px", height: "20px", marginRight: ".5em" }} />
          Timeline
        </Button>
      </Flex>
      <NewTableWithActions
        loader={loader.getProjectDocument}
        cardHeader={<TableHeader title='Past Updates' SearchComponent={SearchComponent} PaginationComponent={PaginationComponent} />}
        columns={[
          {
            title: "Document Name",
            accessorKey: "DocumentName",
            transform: (value: string) => (
              <Flex gap={2}>
                <img src={filexlsxIcon} className='filter-blue' style={{ width: "16px", height: "16px", marginRight: "0.2em" }} />
                <Text>{value}</Text>
              </Flex>
            ),
          },
          {
            title: "Upload Date",
            accessorKey: "CreatedAt",
            // transform: (value: string) => (
            //   <Text title={getPresentableValue(value, true, false, true) as string}>{getPresentableValue(value, true, false, true) as string}</Text>
            // ),
          },
          {
            title: "Entity",
            accessorKey: "EntityName",
          },
          {
            title: "Role",
            accessorKey: "UserRole",
          },
          {
            title: "User Name",
            accessorKey: "UserName",
          },
          {
            title: "Remarks",
            accessorKey: "Remarks",
          },
          {
            title: "Actions",
            accessorKey: "actions",
            actionTypes: [
              {
                type: "download",
                onClick: row => {
                  setShowLoaderId({ id: row.DocId, for: "download" });
                  dispatch(
                    downloadRowDataRequest(row.FileContainer, row.FilePath, row.FileName, (success: boolean) => {
                      setShowLoaderId(null);
                    }),
                  );
                },
                loading: row => {
                  return documentDownloadLoader.downloadRowData && row.DocId === showLoaderId?.id && showLoaderId?.for === "download";
                },
              },
              {
                type: "delete",
                onClick: row => {
                  setShowLoaderId({ id: row.DocId, for: "delete" });
                  openModal(row);
                },
                loading: row => loader.deleteProjectDocument && row.DocId === showLoaderId?.id && showLoaderId?.for === "delete",
              },
            ],
          },
        ]}
        data={finalData}
      />
      {uploadDocumentModal && <UploadDocumentModal open={uploadDocumentModal} onClose={closeUploadDocumentModal} />}
    </>
  );
};

export default ManageDocsUpdate;
