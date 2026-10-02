import { Button, Flex, Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { useEffect, useMemo, useState } from "react";
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
import { selectCashflowLoaders, selectCashflowSetupPastUpdate, selectCashflowSetupPendingList } from "../../../../../lib/services/HDFC/Cashflow/selector";
import {
  DownloadCashflowTemplateRequested,
  GetCashflowSetupPastUpdatesRequested,
  UpdateCashflowStatusRequested,
  getCashflowSetupPendingListRequested,
} from "../../../../../lib/services/HDFC/Cashflow/action";
import { CashflowSetupPastUpdatesData, CashflowSetupPendingData } from "../../../../../lib/services/HDFC/Cashflow/dataTypes";
import { useDisclosure } from "@mantine/hooks";
import TypeSelectModal from "../../../Common/TypeSelectModal";

const CashflowApproveSetup = () => {
  const dispatch = useDispatch();

  //#region [selector]
  const userDetails = useSelector(selectUserDetails) as UserDetails;
  const project = useSelector(selectSetProject) as Project;
  const pendingCashflowList = useSelector(selectCashflowSetupPendingList) as CashflowSetupPendingData[];
  const cashflowPastHistoryList = useSelector(selectCashflowSetupPastUpdate) as CashflowSetupPastUpdatesData[];
  const loaders = useSelector(selectCashflowLoaders);

  const [downloadDocumentModal, { open: openDownloadDocumentModal, close: closeDownloadDocumentModal }] = useDisclosure(false);
  //#endregion
  const [showLoadingForRow, setShowLoadingForRow] = useState<{
    id: string | number;
    for: "downloadBottom" | "downloadTop" | "approve" | "reject";
  } | null>(null);

  const downloadTemplateType = useMemo(() => {
    return [
      { label: "Latest Business Plan", value: "LatestBusinessPlan" },
      { label: "Underwritten", value: "Underwritten" },
    ];
  }, []);

  useEffect(() => {
    if (project) {
      dispatch(getCashflowSetupPendingListRequested(project?.REAssetId));
      dispatch(GetCashflowSetupPastUpdatesRequested(project?.REAssetId));
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
  const openActionModal = (data: CashflowSetupPendingData, actionType: ActionType) => {
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
            Are you sure you want to {actionType === ActionType.APPROVE ? "approve" : "reject"} MIS dated{" "}
            {getPresentableValue(data.MISDate, true, false, false)}?
          </Text>
        ),
        labels: { confirm: "Confirm", cancel: "Cancel" },
        confirmProps: {
          style: { backgroundColor: "#001d56" },
          disabled: undefined,
          // loading: salesLoaders.updateSalesPastHistory,
          loading: loaders.updateCashflowStatus,
        },
        onClose: () => {
          // no action specified;
        },
        onConfirm: () =>
          dispatch(
            UpdateCashflowStatusRequested(
              {
                status: actionType.toString(),
                type: data.ProjectionType,
                cashflowHistoryId: data.MisHistoryId
              },
              (success: boolean) => {
                setShowLoadingForRow(null);
                dispatch(getCashflowSetupPendingListRequested(project?.REAssetId));
                dispatch(GetCashflowSetupPastUpdatesRequested(project?.REAssetId));
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
    data: pendingCashflowList,
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
    data: cashflowPastHistoryList,
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
              Download the project cashflow setup template
            </Text>
            <Button
              name='file-upload'
              loading={loaders.downloadCashflowTemplate}
              variant='outline'
              rightIcon={<img src={downloadTemplate} style={{ width: "15px", height: "15px" }} className='svgColorGray' />}
              leftIcon={<img src={filexlsxIcon} style={{ width: "15px", height: "15px" }} className='svgColorGray' />}
              color='gray'
              w={350}
              onClick={openDownloadDocumentModal}>
              Project Cashflow Setup Template.xlsx
            </Button>
          </Flex>
        </Flex>
      </Flex>

      <NewTableWithActions
        loader={loaders.cashflowPendingList}
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
                    id: data?.MisHistoryId,
                    for: "approve",
                  });
                },
                loading(row) {
                  return showLoadingForRow?.id === row?.MisHistoryId && showLoadingForRow?.for === "approve" && loaders.updateCashflowStatus;
                },
              },
              {
                type: "reject",
                onClick: data => {
                  openActionModal(data, ActionType.REJECT);
                  setShowLoadingForRow({
                    id: data?.MisHistoryId,
                    for: "reject",
                  });
                },
                loading(row) {
                  return showLoadingForRow?.id === row?.MisHistoryId && showLoadingForRow?.for === "reject" && loaders.updateCashflowStatus;
                },
              },
              {
                type: "download",
                onClick: data => {
                  setShowLoadingForRow({
                    id: data?.MisHistoryId,
                    for: "downloadTop",
                  });
                  dispatch(
                    downloadRowDataRequest(data?.FileContainer, data?.FilePath, data?.FileName, () => {
                      setShowLoadingForRow(null);
                    }),
                  );
                },
                loading(row) {
                  return showLoadingForRow?.id === row?.MisHistoryId && showLoadingForRow?.for === "downloadTop";
                },
              },
            ],
          },
        ]}
        data={finalData}
      />

      <NewTableWithActions
        loader={loaders.cashflowHistoryList}
        cardHeader={<TableHeader title='Past Updates' SearchComponent={PastUpdatesSearchComponent} PaginationComponent={PastUpdatesPaginationComponent} />}
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
                    id: data?.MisHistoryId,
                    for: "downloadBottom",
                  });
                  dispatch(
                    downloadRowDataRequest(data?.FileContainer, data?.FilePath, data?.FileName, () => {
                      setShowLoadingForRow(null);
                    }),
                  );
                },
                loading(row) {
                  return showLoadingForRow?.id === row?.MisHistoryId && showLoadingForRow?.for === "downloadBottom";
                },
              },
            ],
          },
        ]}
        data={pastUpdatesFinalData}
      />
      {downloadDocumentModal && (
        <TypeSelectModal
          typesList={downloadTemplateType}
          open={downloadDocumentModal}
          onClose={(type?: string) => {
            type ? dispatch(DownloadCashflowTemplateRequested(project?.REAssetId, type, () => closeDownloadDocumentModal())) : closeDownloadDocumentModal();
          }}
        />
      )}
    </>
  );
};

export default CashflowApproveSetup;
