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
import { UserDetails } from "../../../../../lib/services/hdfc_login/dataTypes";
import { selectUserDetails } from "../../../../../lib/services/hdfc_login/selectors";
import NewTableWithActions, { TableHeader } from "../../../../../widgets/tables/MantineTable/NewTableWithActions";
import { getPresentableValue, successNotification } from "../../../../Components/UtilityFunctions";
import UploadDocumentModal from "./modals/UploadDocumentModal";
import CanUploadDocumentModal from "../../../Common/CanUploadDocumentModal";
import {
  CanSetupConstructionRequested,
  DownloadConstructionTemplateRequested,
  GetExcelUploadPastHistoryListRequested,
  UpdateConstructionSetupStatusRequested,
  downloadExcelUploadRowRequest
} from "../../../../../lib/services/HDFC/Construction/ExcelUpload/actions";
import {
  ExcelUploadPastHistoryData,
  UpdateConstructionSetupStatusPayload
} from "../../../../../lib/services/HDFC/Construction/ExcelUpload/dataTypes";
import {
  selectCanSetupConstruction,
  selectConstructionExcelUploadPastHistoryList,
  selectContructionExcelLoaders
} from "../../../../../lib/services/HDFC/Construction/ExcelUpload/selector";

const ExcelUpload = () => {
  const dispatch = useDispatch();
  const theme = useMantineTheme();
  const [dowloadRowLoader, setdowloadRowLoader] = useState<string | number | null>(null);

  const project = useSelector(selectSetProject) as Project;
  const projectSalesList = useSelector(selectConstructionExcelUploadPastHistoryList);
  const canUpdateValue = useSelector(selectCanSetupConstruction);
  const userDetails = useSelector(selectUserDetails) as UserDetails;
  const loaders = useSelector(selectContructionExcelLoaders);
  const canUpdate = canUpdateValue?.canupdate;

  const [uploadDocumentModal, { open: openUploadDocumentModal, close: closeUploadDocumentModal }] = useDisclosure(false);
  const [canUploadDocumentModal, { open: openCanUploadDocumentModal, close: closeCanUploadDocumentModal }] = useDisclosure(false);
  const { finalData, SearchComponent, PaginationComponent } = useSearchAndPagination({
    data: projectSalesList,
    columnsToSearch: [
      { accessorKey: "CreatedAt", type: "text" },
      { accessorKey: "EntityName", type: "date" },
      { accessorKey: "Role", type: "text" },
      { accessorKey: "CreatedBy", type: "text" },
      { accessorKey: "Status", type: "text" },
    ],
    itemsPerPageData: [10, 20, 30, 40, 50],
    showItemsPerPageDropdown: true,
    showPaginationWithSearch: false,
  });
  const handelDownloadProject = () => {
    dispatch(DownloadConstructionTemplateRequested(Number(project?.REAssetId)));
  };
  useEffect(() => {
    dispatch(GetExcelUploadPastHistoryListRequested(Number(project?.REAssetId), project?.CreatedBy, "setup"));
    dispatch(CanSetupConstructionRequested(project?.REAssetId));
  }, []);
  const callBack = () => {
    setdowloadRowLoader(null);
  };
  const handelDownloadRowData = (row: ExcelUploadPastHistoryData) => {
    setdowloadRowLoader(row?.FileName);
    dispatch(downloadExcelUploadRowRequest("renoc", row.FilePath, row.FileName, callBack));
    dispatch(DownloadConstructionTemplateRequested(Number(project?.REAssetId), callBack));
  };
  const successCallback = (success: boolean) => {
    setdowloadRowLoader(null);
    if (success) {
      successNotification("Withdraw successfully");
      dispatch(GetExcelUploadPastHistoryListRequested(Number(project?.REAssetId), project?.CreatedBy, "setup"));
      dispatch(CanSetupConstructionRequested(project?.REAssetId));
    }
  };
  const handelWithDrawRowData = (row: ExcelUploadPastHistoryData) => {
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
          <Text size='sm'>Are you sure you want to withdraw the setup uploaded on {getPresentableValue(row?.CreatedAt, true, false, false)} ?</Text>
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
        setdowloadRowLoader(row?.ConstructionMISHistoryId);
        const data: UpdateConstructionSetupStatusPayload = {
          status: "Withdraw",
          constructionMISHistoryId: row.ConstructionMISHistoryId,
          createdby: userDetails?.EmailId,
        };
        dispatch(dispatch(UpdateConstructionSetupStatusRequested(data, successCallback)));
      },
    });
  };
  const handelUploadModalCanUpdateModal = () => {
    canUpdate ? openUploadDocumentModal() : openCanUploadDocumentModal();
  };
  return (
    <>
      <Flex align={"flex-start"} justify={"space-between"} m={"md"}>
        <Flex direction={"column"} gap={"xl"}>
          <Flex direction={"column"} gap={"xs"}>
            <Text size={"sm"} weight={500}>
              Download the project contruction setup template
            </Text>
            <Button
              onClick={handelDownloadProject}
              name='file-upload'
              variant='outline'
              rightIcon={<img src={downloadTemplate} style={{ width: "20px", height: "20px" }} />}
              leftIcon={<img src={filexlsxIcon} style={{ width: "20px", height: "20px" }} />}
              color='gray'
              w={350}
              loading={loaders.downloadConstructionTemplate}>
              Project Construction Setup Template.xlsx
            </Button>
          </Flex>
          <Flex direction={"column"} gap={"xs"}>
            <Text size={"sm"} weight={500}>
              Upload Project Construction Setup Template
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
        loader={loaders?.excelUploadHistoryList}
        cardHeader={<TableHeader title={"Past Updates"} SearchComponent={SearchComponent} PaginationComponent={PaginationComponent} />}
        columns={[
          {
            title: "Created At",
            accessorKey: "CreatedAt",
            transform: (value: string) => <Text title={getPresentableValue(value, true) as string}>{getPresentableValue(value, true) as string}</Text>,
          },

          { title: "Entity", accessorKey: "EntityName" },
          { title: "Role", accessorKey: "Role" },
          { title: "Updated By", accessorKey: "CreatedBy" },
          { title: "Status", accessorKey: "Status" },
          {
            title: "Actions",
            accessorKey: "actions",
            actionTypes: [
              {
                type: "download",
                onClick: row => handelDownloadRowData(row),
                loading(row) {
                  return row?.FileName === dowloadRowLoader && loaders?.downloadExcelUploadRowLoader;
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
                  return row?.ConstructionMISHistoryId === dowloadRowLoader && loaders?.withdrawnConfirmLoader;
                },
              },
            ],
          },
        ]}
        data={finalData}
      />
      <UploadDocumentModal open={uploadDocumentModal} onClose={closeUploadDocumentModal} />
      <CanUploadDocumentModal open={canUploadDocumentModal} onClose={closeCanUploadDocumentModal} />
    </>
  );
};

export default ExcelUpload;
