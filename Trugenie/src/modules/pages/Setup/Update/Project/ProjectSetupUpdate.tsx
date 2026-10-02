import { Button, Flex, Text, useMantineTheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { openConfirmModal } from "@mantine/modals";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InforCircleIcon from "../../../../../assets/logos/SVG/infocircle.svg";
import addIcon from "../../../../../assets/logos/SVG/only_add.svg";
import withDraw from "../../../../../assets/logos/SVG/withdraw.svg";
import downloadTemplate from "../../../../../assets/logos/download.svg";
import filexlsxIcon from "../../../../../assets/logos/filexlsx.svg";
import uploadDocument from "../../../../../assets/logos/upload.svg";
import useSearchAndPagination from "../../../../../hooks/useSearchAndPagination";
import { Project } from "../../../../../lib/services/HDFC/Project/dataTypes";
import { selectSetProject } from "../../../../../lib/services/HDFC/Project/selectors";
import {
  canSetupUpdateRequested,
  downloadProjectSetupRequest,
  downloadProjectSetupRowRequest,
  getGetProjectSalesListRequested,
  statusChangeProjectSalesListRequested,
} from "../../../../../lib/services/HDFC/ProjectSetupUpdate/action";
import { ProjectSalesListDataType, StatusChangeProjectDataType } from "../../../../../lib/services/HDFC/ProjectSetupUpdate/dataTypes";
import { selectProjectLoaders, selectProjectSalesList, selectcanUpdateSetup } from "../../../../../lib/services/HDFC/ProjectSetupUpdate/selectors";
import { UserDetails } from "../../../../../lib/services/hdfc_login/dataTypes";
import { selectUserDetails } from "../../../../../lib/services/hdfc_login/selectors";
import NewTableWithActions, { TableHeader } from "../../../../../widgets/tables/MantineTable/NewTableWithActions";
import { getPresentableValue, successNotification } from "../../../../Components/UtilityFunctions";
import UploadDocumentModal from "./modals/UploadDocumentModal";
import CanUploadDocumentModal from "../../../Common/CanUploadDocumentModal";

const ProjectSetupUpdate = () => {
  const dispatch = useDispatch();
  const theme = useMantineTheme();
  const [dowloadRowLoader, setdowloadRowLoader] = useState<string | number | null>(null);

  const project = useSelector(selectSetProject) as Project;
  const projectSalesList = useSelector(selectProjectSalesList);
  const canUpdateValue = useSelector(selectcanUpdateSetup);
  const userDetails = useSelector(selectUserDetails) as UserDetails;
  const loaders = useSelector(selectProjectLoaders);
  const canUpdate = canUpdateValue?.canupdate;
  const [uploadDocumentModal, { open: openUploadDocumentModal, close: closeUploadDocumentModal }] = useDisclosure(false);
  const [canUploadDocumentModal, { open: openCanUploadDocumentModal, close: closeCanUploadDocumentModal }] = useDisclosure(false);
  const { finalData, SearchComponent, PaginationComponent } = useSearchAndPagination({
    data: projectSalesList,
    columnsToSearch: [
      { accessorKey: "CreatedBy", type: "text" },
      { accessorKey: "CreateAt", type: "date" },
      { accessorKey: "Entity", type: "text" },
      { accessorKey: "EntityRole", type: "text" },
      // { accessorKey: "UserName", type: "text" },
      { accessorKey: "Status", type: "text" },
    ],
    itemsPerPageData: [10, 20, 30, 40, 50],
    showItemsPerPageDropdown: true,
    showPaginationWithSearch: false,
  });
  const handelDownloadProject = () => {
    dispatch(downloadProjectSetupRequest(Number(project?.REAssetId)));
  };
  useEffect(() => {
    dispatch(getGetProjectSalesListRequested(Number(project?.REAssetId), "setup"));
    dispatch(canSetupUpdateRequested(project?.REAssetId));
  }, []);
  const callBack = () => {
    setdowloadRowLoader(null);
  };
  const handelDownloadRowData = (row: ProjectSalesListDataType) => {
    setdowloadRowLoader(row?.FileName);
    dispatch(downloadProjectSetupRowRequest("renoc", row.FilePath, row.FileName, callBack));
  };
  const successCallback = (success: boolean) => {
    setdowloadRowLoader(null);
    if (success) {
      successNotification("Withdraw successfully");
      dispatch(getGetProjectSalesListRequested(Number(project?.REAssetId), "setup"));
      dispatch(canSetupUpdateRequested(project?.REAssetId));
    }
  };
  const handelWithDrawRowData = (row: ProjectSalesListDataType) => {
    openConfirmModal({
      title: (
        <Flex align='center'>
          <img src={withDraw} style={{ width: "1rem", height: "1rem", marginRight: "8px" }} />
          <Text size='md'>Withdraw Setup</Text>
        </Flex>
      ),
      centered: true,
      color: "blue",
      size: "lg",
      children: (
        <>
          <Text size='sm'>Are you sure you want to withdraw the setup uploaded on {getPresentableValue(row?.CreateAt, true, false, false)} ?</Text>
        </>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      confirmProps: {
        loading: loaders?.withdrawnConfirmLoader,
        style: { backgroundColor: theme.colors["truboard-primary"][0], color: theme.colors["white"][0] },
      },
      cancelProps: {
        style: { backgroundColor: theme.colors["truboard-primary"][0], color: theme.colors["white"][0] },
      },
      onConfirm: () => {
        setdowloadRowLoader(row?.SaleMISHistoryId);
        const data: StatusChangeProjectDataType = {
          reAssetId: Number(project?.REAssetId),
          salesMISHistoryId: row.SaleMISHistoryId,
          status: "Withdraw",
          userEmail: userDetails?.EmailId,
        };
        dispatch(dispatch(statusChangeProjectSalesListRequested(data, successCallback)));
      },
    });
  };
  const handelUploadModalCanUpdateModal = () => {
    {
      canUpdate ? openUploadDocumentModal() : openCanUploadDocumentModal();
    }
  };
  return (
    <>
      <Flex align={"flex-start"} justify={"space-between"} m={"md"}>
        <Flex direction={"column"} gap={"xl"}>
          <Flex direction={"column"} gap={"xs"}>
            <Text size={"sm"} weight={500}>
              Download the project setup Template
            </Text>
            <Button
              onClick={handelDownloadProject}
              name='file-upload'
              variant='outline'
              rightIcon={<img src={downloadTemplate} style={{ width: "20px", height: "20px" }} />}
              leftIcon={<img src={filexlsxIcon} style={{ width: "20px", height: "20px" }} />}
              color='gray'
              w={300}
              loading={loaders.downloadProjectTemplateLoader}>
              Project Setup Template.xlsx
            </Button>
          </Flex>
          <Flex direction={"column"} gap={"xs"}>
            <Text size={"sm"} weight={500}>
              Upload Project Setup Template
            </Text>
            <Button
              rightIcon={<img src={uploadDocument} style={{ width: "20px", height: "20px", filter: "invert(1)" }} />}
              leftIcon={<img src={addIcon} style={{ width: "15px", height: "15px", filter: "invert(1)" }} />}
              onClick={handelUploadModalCanUpdateModal}
              color='truboard-primary.0'>
              Select File to Upload
            </Button>
            <Text color='gray' size={"xs"} weight={500} w={300}>
              <img src={InforCircleIcon} style={{ width: "15px", height: "15px", color: "#001d56" }} /> Single Upload file should not be more than 5MB, only
              .xls and .xlsx file type allowed
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <NewTableWithActions
        loader={loaders?.projectSalesListLoader}
        cardHeader={<TableHeader title={"Past Updates"} SearchComponent={SearchComponent} PaginationComponent={PaginationComponent} />}
        columns={[
          {
            title: "Upload Date",
            accessorKey: "CreateAt",
            transform: (value: string) => <Text title={getPresentableValue(value, true) as string}>{getPresentableValue(value, true) as string}</Text>,
          },

          { title: "Entity", accessorKey: "Entity" },
          { title: "Role", accessorKey: "EntityRole" },
          { title: "Username", accessorKey: "UserName" },
          { title: "Status", accessorKey: "Status" },
          {
            title: "Actions",
            accessorKey: "actions",
            actionTypes: [
              {
                type: "download",
                onClick: row => handelDownloadRowData(row),
                loading(row) {
                  return row?.FileName === dowloadRowLoader && loaders?.downloadProjectRowLoader;
                },
              },

              {
                type: "withDraw",
                onClick: row => handelWithDrawRowData(row),
                override: rowData => {
                  return {
                    icon: rowData.Status === "Pending" ? withDraw : null,
                    tooltip: rowData.Status === "Pending" ? "Withdraw" : "",
                  };
                },
                loading(row) {
                  return row?.SaleMISHistoryId === dowloadRowLoader && loaders?.withdrawnConfirmLoader;
                },
              },
            ],
          },
        ]}
        data={finalData}
      />
      <UploadDocumentModal open={uploadDocumentModal} onClose={closeUploadDocumentModal} projectId={project?.REAssetId} />
      <CanUploadDocumentModal open={canUploadDocumentModal} onClose={closeCanUploadDocumentModal} />
    </>
  );
};

export default ProjectSetupUpdate;
