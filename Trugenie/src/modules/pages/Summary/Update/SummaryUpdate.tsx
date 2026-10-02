import { Flex, Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "../../../../assets/logos/SVG/Delete.svg";
import useSearchAndPagination from "../../../../hooks/useSearchAndPagination";
import { default as NewTableWithActions, TableHeader } from "../../../../widgets/tables/MantineTable/NewTableWithActions";
import RemoveIcon from "../../../../assets/logos/SVG/Delete.svg";
import { default as WithdrawIcon, default as withDrawn } from "../../../../assets/logos/SVG/withdraw.svg";
import { Project } from "../../../../lib/services/HDFC/Project/dataTypes";
import { selectSetProject } from "../../../../lib/services/HDFC/Project/selectors";
import { downloadRowDataRequest } from "../../../../lib/services/HDFC/common/action";
import { selectDocumentDownloadLoaders } from "../../../../lib/services/HDFC/common/selectors";
import { UserDetails } from "../../../../lib/services/hdfc_login/dataTypes";
import { selectUserDetails } from "../../../../lib/services/hdfc_login/selectors";
import { errorNotification, successNotification } from "../../../../utils/notifications";
import { getPresentableValue } from "../../../Components/UtilityFunctions";
import {
  DeleteProjectSummaryDetailsRequested,
  GetSummaryPastHistoryListRequested,
  IsSummarySetupRequested,
  UpdateProjectSummaryStatusRequested,
} from "../../../../lib/services/HDFC/Summary/actions";
import { selectSummaryLoaders, selectSummaryPastHistoryList } from "../../../../lib/services/HDFC/Summary/selector";
import { SummaryPastHistoryData } from "../../../../lib/services/HDFC/Summary/dataTypes";
import TemplateDownloadUpload from "./TemplateDownloadUpload";
import { selectSwitchClient } from "../../../../lib/services/HDFC/Commons/selectors";
import { GetClientData } from "../../../../lib/services/HDFC/Commons/dataTypes";

const SummaryUpdate = () => {
  const dispatch = useDispatch();
  const activeClient = useSelector(selectSwitchClient) as GetClientData;
  //#region [state]
  const [showLoadingForRow, setShowLoadingForRow] = useState<string | number | null>(null);
  //#endregion
  const documentDownloadLoaders = useSelector(selectDocumentDownloadLoaders);
  // const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  // const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  //#endregion

  //#region [selector]
  const userDetails = useSelector(selectUserDetails) as UserDetails;
  const project = useSelector(selectSetProject) as Project;
  const summaryPastHistoryList = useSelector(selectSummaryPastHistoryList);
  const loaders = useSelector(selectSummaryLoaders);
  //#endregion

  useEffect(() => {
    if (project) {
      dispatch(GetSummaryPastHistoryListRequested(project?.REAssetId, "Update"));
      dispatch(IsSummarySetupRequested(project?.REAssetId,project?.AssetName));
    }
  }, [project]);
  //#endregion

  //#endregion

  // const fileUploadCallback = (success: boolean, message?: string) => {
  //   if (success) {
  //     successNotification(message ?? "");
  //   } else {
  //     errorNotification(message ?? "Failed...");
  //   }
  //   // setUploadedFile(null);
  //   // setSelectedStatus(null);
  // };

  // delete-callback
  const onCallback = (success: boolean, message?: string) => {
    setShowLoadingForRow(null);
    if (success) {
      successNotification(message ?? "");
      dispatch(GetSummaryPastHistoryListRequested(project?.REAssetId, "Update"));
    } else {
      errorNotification(message ?? "");
    }
  };

  // delete-confirm-modal
  const openModal = (data: SummaryPastHistoryData) => {
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
        loading: undefined,
      },
      onClose: () => {
        // no action specified;
      },
      onConfirm: () =>
        dispatch(
          DeleteProjectSummaryDetailsRequested(
            {
              ClientId: activeClient.ClientId,
              ProjectSummaryHistoryId: data.SetupSummaryHistoryId,
            },
            onCallback,
          ),
        ),
    });
  };

  const { finalData, SearchComponent, PaginationComponent } = useSearchAndPagination({
    data: summaryPastHistoryList ?? [],
    columnsToSearch: [
      { accessorKey: "Entity", type: "text" },
      { accessorKey: "Role", type: "text" },
      { accessorKey: "UpdatedBy", type: "text" },
      { accessorKey: "Status", type: "text" },
    ],
    itemsPerPageData: [10, 20, 30, 40, 50],
    showItemsPerPageDropdown: true,
    showPaginationWithSearch: false,
  });

  const handelWithDrawRowData = (data: SummaryPastHistoryData) => {
    openConfirmModal({
      title: (
        <Flex align='center'>
          <img src={WithdrawIcon} style={{ width: "1rem", height: "1rem", marginRight: "8px" }} />
          <Text size='md'>Confirm Withdraw ?</Text>
        </Flex>
      ),
      centered: true,
      children: <Text size='sm'>Are you sure you want to Withdraw MIS dated {getPresentableValue(data.MISDate, true, false, false)}?</Text>,
      labels: { confirm: "Confirm", cancel: "Cancel" },
      confirmProps: {
        style: { backgroundColor: "#001d56" },
        disabled: undefined,
        loading: loaders.updateProjectSummaryStatus,
      },
      onClose: () => {
        // no action specified;
      },
      onConfirm: () =>
        dispatch(
          UpdateProjectSummaryStatusRequested(
            { status: "Withdraw", ProjectSummaryHistoryId: data.SetupSummaryHistoryId, CreatedBy: userDetails?.EmailId },
            (success: boolean) => {
              setShowLoadingForRow(null);
              dispatch(GetSummaryPastHistoryListRequested(project?.REAssetId, "Update"));
              onCallback(success, "Request Withdrawn!");
            },
          ),
        ),
    });
  };

  return (
    <>
      <TemplateDownloadUpload />
      {/* table */}
      <NewTableWithActions
        loader={loaders?.summaryHistoryList}
        cardHeader={<TableHeader title='Past Updates' SearchComponent={SearchComponent} PaginationComponent={PaginationComponent} />}
        columns={[
          {
            title: "Upload Date",
            accessorKey: "UploadDate",
            transform: (value: string) => <Text title={getPresentableValue(value, true) as string}>{getPresentableValue(value, true) as string}</Text>,
          },
          {
            title: "MIS Date",
            accessorKey: "MISDate",
            transform: (value: string) => getPresentableValue(value, true, false, false) as string,
          },
          { title: "Entity", accessorKey: "Entity" },
          { title: "Role", accessorKey: "Role" },
          { title: "Updated By", accessorKey: "UpdatedBy" },
          { title: "Status", accessorKey: "Status" },
          {
            title: "Actions",
            accessorKey: "actions",
            actionTypes: [
              {
                type: "download",
                onClick: data => {
                  setShowLoadingForRow(data?.SetupSummaryHistoryId);
                  dispatch(
                    downloadRowDataRequest(data?.FileContainer, data?.FilePath, data?.FileName, () => {
                      setShowLoadingForRow(null);
                    }),
                  );
                },
                loading(row) {
                  return showLoadingForRow === row?.SetupSummaryHistoryId && documentDownloadLoaders.downloadRowData;
                },
              },
              {
                type: "delete",
                onClick: data => {
                  setShowLoadingForRow(data?.SetupSummaryHistoryId);
                  openModal(data);
                },
                override: rowdata => {
                  return {
                    icon: rowdata.Status === "Approved" ? RemoveIcon : null,
                    tooltip: rowdata.Status === "Approved" ? "Delete" : "",
                  };
                },
                loading(row) {
                  return showLoadingForRow === row?.SetupSummaryHistoryId && loaders.deleteProjectSummaryDetails;
                },
              },
              {
                type: "withDraw",
                onClick: row => {
                  handelWithDrawRowData(row);
                  setShowLoadingForRow(row?.SetupSummaryHistoryId);
                },
                override: rowData => {
                  return {
                    icon: rowData.Status === "Pending" ? withDrawn : null,
                    tooltip: rowData.Status === "Pending" ? "Withdraw" : "",
                  };
                },
                loading(row) {
                  return showLoadingForRow === row?.SetupSummaryHistoryId && loaders.updateProjectSummaryStatus;
                },
              },
            ],
          },
        ]}
        data={finalData}
      />
    </>
  );
};

export default SummaryUpdate;
