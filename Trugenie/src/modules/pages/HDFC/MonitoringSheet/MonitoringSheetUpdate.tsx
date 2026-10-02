import { Button, Flex, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { openConfirmModal } from "@mantine/modals";
import infoCircleIcon from "../../../../assets/logos/SVG/infocircle.svg";
// import { IconFileTypeXls } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { default as DeleteIcon, default as RemoveIcon } from "../../../../assets/logos/SVG/Delete.svg";
import addLogo from "../../../../assets/logos/SVG/only_add.svg";
import downloadLogo from "../../../../assets/logos/download.svg";
import filexlsxIcon from "../../../../assets/logos/filexlsx.svg";
import uploadDocument from "../../../../assets/logos/upload.svg";
import useSearchAndPagination from "../../../../hooks/useSearchAndPagination";
import { AppState } from "../../../../lib/common/appState";
import {
  deleteSalesMonitoringHistoryRequested,
  downloadSalesMonitoringTemplateRequested,
  getSalesMISRequested,
  getSalesMonitoringPastHistoryListRequested,
} from "../../../../lib/services/HDFC/MonitoringSheet/action";
import { SalesMonitoringPastHistory } from "../../../../lib/services/HDFC/MonitoringSheet/dataTypes";
import { selectMontinoringSheetLoader, selectSalesMonitoringPastHistoryList } from "../../../../lib/services/HDFC/MonitoringSheet/selectors";
import { Project } from "../../../../lib/services/HDFC/Project/dataTypes";
import { selectSetProject } from "../../../../lib/services/HDFC/Project/selectors";
import { downloadRowDataRequest } from "../../../../lib/services/HDFC/common/action";
import { UserDetails } from "../../../../lib/services/hdfc_login/dataTypes";
import { selectUserDetails } from "../../../../lib/services/hdfc_login/selectors";
import { errorNotification, successNotification } from "../../../../utils/notifications";
import { default as NewTableWithActions, TableHeader } from "../../../../widgets/tables/MantineTable/NewTableWithActions";
import { getPresentableValue } from "../../../Components/UtilityFunctions";
import UploadDocumentModal from "./UploadDocumentModal";

const MonitoringSheetUpdate = () => {
  const dispatch = useDispatch();

  //#region [selector]
  const userDetails = useSelector(selectUserDetails) as UserDetails;
  const project = useSelector(selectSetProject) as Project;
  const downloaderLoader = useSelector((state: AppState) => state.hdfc?.commonMonitoringReducer?.loader);
  const [downalodRowLoader, setDownloadRowLoader] = useState<string | null>(null);
  const salesMonitoringPastHistoryList = useSelector(selectSalesMonitoringPastHistoryList) as SalesMonitoringPastHistory[];
  const loader = useSelector(selectMontinoringSheetLoader);
  //#endregion

  //#region [useEffect]
  useEffect(() => {
    if (project) {
      dispatch(getSalesMonitoringPastHistoryListRequested(project.REAssetId, userDetails.EmailId));
    }
  }, [project]);
  //#endregion

  function OpenModalForUpload() {
    dispatch(getSalesMISRequested(project.REAssetId));
    openUploadDocumentModal();
  }

  const [uploadDocumentModal, { open: openUploadDocumentModal, close: closeUploadDocumentModal }] = useDisclosure(false);

  const onCallback = (success: boolean, message?: string) => {
    if (success) {
      successNotification(message ?? "")
      dispatch(getSalesMonitoringPastHistoryListRequested(project.REAssetId, userDetails.EmailId));
    } else {
      errorNotification(message ?? "Failed...")
    }
  };

  //   confirm-modal
  const openModal = (data: SalesMonitoringPastHistory) => {
    if (data) {
      openConfirmModal({
        title: (
          <Flex align='center'>
            <img src={DeleteIcon} style={{ width: "1rem", height: "1rem", marginRight: "8px" }} />
            <Text size='md'>Confirm Delete</Text>
          </Flex>
        ),
        centered: true,
        children: <Text size='sm'>Are you sure you want to delete MIS dated {getPresentableValue(data.MISDate, true, false, false)}?</Text>,
        labels: { confirm: "Confirm", cancel: "Cancel" },
        confirmProps: {
          style: { backgroundColor: "#001d56" },
          disabled: undefined,
          loading: loader?.deleteRowData,
        },
        onClose: () => {
          // no action specified;
        },
        onConfirm: () => dispatch(deleteSalesMonitoringHistoryRequested(data?.MonitoringHistoryId, project?.REAssetId, userDetails.EmailId, onCallback)),
      });
    }
  };

  const { finalData, SearchComponent, PaginationComponent } = useSearchAndPagination({
    data: salesMonitoringPastHistoryList,
    columnsToSearch: [
      { accessorKey: "CreatedAt", type: "text" },
      { accessorKey: "MISDate", type: "text" },
      { accessorKey: "SaleMISDate", type: "text" },
    ],
    itemsPerPageData: [10, 20, 30, 40, 50],
    showItemsPerPageDropdown: true,
    showPaginationWithSearch: false,
  });

  const handelDownloadTemplate = () => {
    dispatch(downloadSalesMonitoringTemplateRequested(project?.REAssetId, userDetails.EmailId));
  };
  const callBack = () => {
    setDownloadRowLoader(null);
  };
  const handeDownloadRowData = data => {
    setDownloadRowLoader(data?.FileName);
    dispatch(downloadRowDataRequest(data?.FileContainer, data?.FilePath, data?.FileName, callBack));
  };
  return (
    <>
      <Flex align={"flex-start"} justify={"space-between"} m={"xl"}>
        <Flex direction={"column"} gap={"xl"}>
          <Flex direction={"column"} gap={"xs"}>
            <Text size={"sm"} weight={500}>
              Download the Monitoring Sheet Template
            </Text>

            <Button
              rightIcon={<img src={downloadLogo} style={{ width: "20px", height: "20px" }} />}
              leftIcon={<img src={filexlsxIcon} style={{ width: "20px", height: "20px" }} />}
              color='gray'
              variant='outline'
              w={300}
              onClick={handelDownloadTemplate}
              loading={loader?.downloadMonitoringSheetTempalte}>
              RE Monitoring Template.xlsx
            </Button>
          </Flex>
          <Flex direction={"column"} gap={"xs"}>
            <Text size={"sm"} weight={500}>
              Upload Monitoring Sheet Template
            </Text>
            <Button
              rightIcon={<img src={uploadDocument} style={{ width: "20px", height: "20px", filter: "invert(1)" }} />}
              leftIcon={<img src={addLogo} style={{ width: "20px", height: "20px", filter: "invert(1)" }} />}
              onClick={OpenModalForUpload}
              color='truboard-primary.0'>
              {" "}
              Select file to upload
            </Button>

            <Text color='gray' size={"xs"} weight={500} w={300}>
              <img src={infoCircleIcon} style={{ width: "15px", height: "15px", color: "#001d56" }} /> Single Upload file should not be more than 10MB, only
              .xls and .xlsx files are allowed
            </Text>
          </Flex>
        </Flex>
      </Flex>

      {/* Past-Update-Table */}
      <NewTableWithActions
        loader={loader?.salesMonitoringHistoryList}
        cardHeader={<TableHeader title='Past Updates' SearchComponent={SearchComponent} PaginationComponent={PaginationComponent} />}
        columns={[
          {
            title: "Upload Date",
            accessorKey: "CreatedAt",
            transform: (value: string) => <Text title={getPresentableValue(value, true) as string}>{getPresentableValue(value, true) as string}</Text>,
          },
          {
            title: "Cost MIS Date",
            accessorKey: "MISDate",
            transform: (value: string) => getPresentableValue(value, true, false, false) as string,
          },
          {
            title: "Sales MIS Date",
            accessorKey: "SaleMISDate",
            transform: (value: string) => getPresentableValue(value, true, false, false) as string,
          },
          { title: "Entity", accessorKey: "Entity" },
          { title: "Role", accessorKey: "Role" },
          { title: "Username", accessorKey: "UserName" },
          {
            title: "Actions",
            accessorKey: "actions",
            actionTypes: [
              {
                type: "download",
                onClick: data => handeDownloadRowData(data),
                loading(row) {
                  return row?.FileName === downalodRowLoader && downloaderLoader?.downloadRowData;
                },
              },

              {
                type: "delete",
                onClick: data => openModal(data),
                override: rowdata => {
                  return {
                    icon: rowdata.Status === "Approved" ? RemoveIcon : undefined,
                    tooltip: rowdata.Status === "Approved" ? "Delete" : "",
                  };
                },
              },
            ],
          },
        ]}
        data={finalData}
      />
      <UploadDocumentModal open={uploadDocumentModal} onClose={closeUploadDocumentModal} projectId={project?.REAssetId} />
    </>
  );
};

export default MonitoringSheetUpdate;
