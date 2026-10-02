import { Button, Flex, Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import checkIcon from "../../../../../assets/logos/SVG/Check.svg";
import deletionIcon from "../../../../../assets/logos/SVG/Delete.svg";
import additionIcon from "../../../../../assets/logos/SVG/add_new.svg";
import RejectIcon from "../../../../../assets/logos/SVG/cross.svg";
import downloadTemplate from "../../../../../assets/logos/download.svg";
import filexlsxIcon from "../../../../../assets/logos/filexlsx.svg";
import useSearchAndPagination from "../../../../../hooks/useSearchAndPagination";
import { Project } from "../../../../../lib/services/HDFC/Project/dataTypes";
import { selectSetProject } from "../../../../../lib/services/HDFC/Project/selectors";
import { downloadRowDataRequest } from "../../../../../lib/services/HDFC/common/action";
import { ActionType } from "../../../../../lib/services/HDFC/services/dataTypes";
import { UserDetails } from "../../../../../lib/services/hdfc_login/dataTypes";
import { selectUserDetails } from "../../../../../lib/services/hdfc_login/selectors";
import { errorNotification, successNotification } from "../../../../../utils/notifications";
import NewTableWithActions, { TableHeader } from "../../../../../widgets/tables/MantineTable/NewTableWithActions";
import { getPresentableValue } from "../../../../Components/UtilityFunctions";
import { selectSummaryLoaders, selectSummaryPastHistoryList, selectSummaryPendingList } from "../../../../../lib/services/HDFC/Summary/selector";
import { SummaryPastHistoryData, SummaryPendingData } from "../../../../../lib/services/HDFC/Summary/dataTypes";
import {
  DownloadProjectSummaryTemplateRequested,
  GetSummaryPastHistoryListRequested,
  GetSummaryPendingUpdateListRequested,
  IsSummarySetupRequested,
  UpdateProjectSummaryStatusRequested,
} from "../../../../../lib/services/HDFC/Summary/actions";

const SummaryApproveSetup = () => {
  const dispatch = useDispatch();

  //#region [selector]
  const userDetails = useSelector(selectUserDetails) as UserDetails;
  const project = useSelector(selectSetProject) as Project;
  const pendingSummaryList = useSelector(selectSummaryPendingList) as SummaryPendingData[];
  const summaryPastHistoryList = useSelector(selectSummaryPastHistoryList) as SummaryPastHistoryData[];

  // const salesLoaders = useSelector(selectSalesLoaders);
  const loaders = useSelector(selectSummaryLoaders);
  //#endregion
  const [showLoadingForRow, setShowLoadingForRow] = useState<{
    id: string | number;
    for: "downloadBottom" | "downloadTop" | "approve" | "reject";
  } | null>(null);

  //#region [useEffect]

  useEffect(() => {
    dispatch(IsSummarySetupRequested(project?.REAssetId));
  }, []);

  useEffect(() => {
    if (project) {
      dispatch(GetSummaryPendingUpdateListRequested(project?.REAssetId, "Setup"));
      dispatch(GetSummaryPastHistoryListRequested(project?.REAssetId, "Setup"));
    }
  }, [project]);
  //#endregion

  const onCallback = (success: boolean, message?: string) => {
    if (success) {
      successNotification(message ?? "Failed...");
    } else {
      errorNotification(message ?? "Failed...");
    }
  };

  //   confirm-action-modal
  const openActionModal = (data: SummaryPendingData, actionType: ActionType) => {
    const actionIcon = actionType === ActionType.APPROVE ? checkIcon : RejectIcon;
    if (userDetails.EmailId === data?.UpdatedBy) {
      errorNotification("Uploader and Approver cannot be same");
      return;
    }
    if (data && actionType) {
      openConfirmModal({
        // title: `Confirm ${actionType === ActionType.APPROVE ? "Approve" : "Reject"}`,
        title: (
          <Flex align='center'>
            <img src={actionIcon} style={{ width: "1rem", height: "1rem", marginRight: "8px" }} />
            <Text size='md'>Confirm {actionType === ActionType.APPROVE ? "Approve" : "Reject"}</Text>
          </Flex>
        ),
        centered: true,
        children: (
          <Text size='sm'>
            Are you sure you want to {actionType === ActionType.APPROVE ? "approve" : "reject"} MIS
            {getPresentableValue(data.MISDate, true, false, false)}?
          </Text>
        ),
        labels: { confirm: "Confirm", cancel: "Cancel" },
        confirmProps: {
          style: { backgroundColor: "#001d56" },
          disabled: undefined,
          // loading: salesLoaders.updateSalesPastHistory,
          loading: loaders.updateProjectSummaryStatus,
        },
        onClose: () => {
          // no action specified;
        },
        onConfirm: () =>
          dispatch(
            UpdateProjectSummaryStatusRequested(
              { status: actionType.toString(), ProjectSummaryHistoryId: data.SetupSummaryHistoryId, CreatedBy: userDetails?.EmailId },
              (success: boolean) => {
                setShowLoadingForRow(null);
                dispatch(GetSummaryPendingUpdateListRequested(project?.REAssetId, "Setup"));
                dispatch(GetSummaryPastHistoryListRequested(project?.REAssetId, "Setup"));
                onCallback(
                  success,
                  actionType === ActionType.APPROVE ? `Request Approved successfully.` : "Request rejected. Please review and resubmit if necessary.",
                );
              },
            ),
          ),
      });
    }
  };

  // table-data
  const { finalData, SearchComponent, PaginationComponent } = useSearchAndPagination({
    data: pendingSummaryList,
    columnsToSearch: [
      { accessorKey: "Entity", type: "text" },
      { accessorKey: "UpdatedBy", type: "text" },
      { accessorKey: "Status", type: "text" },
    ],
    itemsPerPageData: [10, 20, 30, 40, 50],
    showItemsPerPageDropdown: true,
    showPaginationWithSearch: false,
  });

  const {
    finalData: pastUpdatesFinalData,
    SearchComponent: PastUpdatesSearchComponent,
    PaginationComponent: PastUpdatesPaginationComponent,
  } = useSearchAndPagination({
    data: summaryPastHistoryList,
    columnsToSearch: [
      { accessorKey: "Entity", type: "text" },
      { accessorKey: "UpdatedBy", type: "text" },
      { accessorKey: "Status", type: "text" },
    ],
    itemsPerPageData: [10, 20, 30, 40, 50],
    showItemsPerPageDropdown: true,
    showPaginationWithSearch: false,
  });

  return (
    <>
      <Flex align={"flex-start"} justify={"space-between"} m={"xl"}>
        <Flex direction={"column"} gap={"xl"}>
          <Flex direction={"column"} gap={"xs"}>
            <Text size={"sm"} weight={500}>
              Download the project summary setup template
            </Text>
            <Button
              name='file-upload'
              loading={loaders.downloadSummaryTemplate}
              variant='outline'
              rightIcon={<img src={downloadTemplate} style={{ width: "15px", height: "15px" }} className='svgColorGray' />}
              leftIcon={<img src={filexlsxIcon} style={{ width: "15px", height: "15px" }} className='svgColorGray' />}
              color='gray'
              w={350}
              onClick={() => dispatch(DownloadProjectSummaryTemplateRequested(project?.REAssetId, "Setup"))}>
              Project Summary Setup Template.xlsx
            </Button>
          </Flex>
        </Flex>
      </Flex>

      <NewTableWithActions
        loader={loaders.summaryPendingList}
        cardHeader={<TableHeader title='MIS Approvals' SearchComponent={SearchComponent} PaginationComponent={PaginationComponent} />}
        columns={[
          {
            title: "Classification",
            accessorKey: "actions",
            actionTypes: [
              {
                type: "delete",
                override: rowData => {
                  return {
                    icon: rowData.ActionType === "Deletion" ? deletionIcon : null,
                    tooltip: rowData.ActionType === "Deletion" ? "" : null,
                  };
                },
              },
              {
                type: "trashFilled",
                override: rowData => {
                  return {
                    icon: rowData.ActionType === "Addition" ? additionIcon : null,
                    tooltip: rowData.ActionType === "Addition" ? "Addition" : null,
                  };
                },
              },
            ],
          },
          {
            title: "MIS Date",
            accessorKey: "MISDate",
            transform: (value: string) => getPresentableValue(value, true, false, false) as string,
          },
          { title: "Entity", accessorKey: "Entity" },
          { title: "Role", accessorKey: "Role" },
          { title: "Username", accessorKey: "UpdatedBy" },
          { title: "Status", accessorKey: "Status", transform: (value: string, row: any) => value + " for " + row?.ActionType },
          {
            title: "Actions",
            accessorKey: "actions",
            actionTypes: [
              // { type: "view", onClick: () => console.log("View Handler") },
              {
                type: "approve",
                onClick: data => {
                  openActionModal(data, ActionType.APPROVE);
                  setShowLoadingForRow({
                    id: data?.SetupSummaryHistoryId,
                    for: "approve",
                  });
                },
                loading(row) {
                  return showLoadingForRow?.id === row?.SetupSummaryHistoryId && showLoadingForRow?.for === "approve" && loaders.updateProjectSummaryStatus;
                },
              },
              {
                type: "reject",
                onClick: data => {
                  openActionModal(data, ActionType.REJECT);
                  setShowLoadingForRow({
                    id: data?.SetupSummaryHistoryId,
                    for: "reject",
                  });
                },
                loading(row) {
                  return showLoadingForRow?.id === row?.SetupSummaryHistoryId && showLoadingForRow?.for === "reject" && loaders.updateProjectSummaryStatus;
                },
              },
              {
                type: "download",
                onClick: data => {
                  setShowLoadingForRow({
                    id: data?.SetupSummaryHistoryId,
                    for: "downloadTop",
                  });
                  dispatch(
                    downloadRowDataRequest(data?.FileContainer, data?.FilePath, data?.FileName, () => {
                      setShowLoadingForRow(null);
                    }),
                  );
                },
                loading(row) {
                  return showLoadingForRow?.id === row?.SetupSummaryHistoryId && showLoadingForRow?.for === "downloadTop";
                },
              },
            ],
          },
        ]}
        data={finalData}
      />

      <NewTableWithActions
        loader={loaders.summaryHistoryList}
        cardHeader={<TableHeader title='Past Updates' SearchComponent={PastUpdatesSearchComponent} PaginationComponent={PastUpdatesPaginationComponent} />}
        columns={[
          {
            title: "Upload Date",
            accessorKey: "UploadDate",
            transform: (value: string) => <Text title={getPresentableValue(value, true) as string}>{getPresentableValue(value, true) as string}</Text>,
          },
          // {
          //   title: "MIS Date",
          //   accessorKey: "MISDate",
          //   transform: (value: string) => getPresentableValue(value, true, false, false) as string,
          // },
          { title: "Entity", accessorKey: "Entity" },
          { title: "Role", accessorKey: "Role" },
          { title: "Username", accessorKey: "UpdatedBy" },
          { title: "Status", accessorKey: "Status" },
          {
            title: "Actions",
            accessorKey: "actions",
            actionTypes: [
              {
                type: "download",
                onClick: data => {
                  setShowLoadingForRow({
                    id: data?.SetupSummaryHistoryId,
                    for: "downloadBottom",
                  });
                  dispatch(
                    downloadRowDataRequest(data?.FileContainer, data?.FilePath, data?.FileName, () => {
                      setShowLoadingForRow(null);
                    }),
                  );
                },
                loading(row) {
                  return showLoadingForRow?.id === row?.SetupSummaryHistoryId && showLoadingForRow?.for === "downloadBottom";
                },
              },
            ],
          },
        ]}
        data={pastUpdatesFinalData}
      />
    </>
  );
};

export default SummaryApproveSetup;
