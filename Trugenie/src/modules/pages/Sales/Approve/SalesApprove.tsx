import { Button, Flex, Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import checkIcon from "../../../../assets/logos/SVG/Check.svg";
import deletionIcon from "../../../../assets/logos/SVG/Delete.svg";
import additionIcon from "../../../../assets/logos/SVG/add_new.svg";
// import ApproveIcon from "../../../../assets/logos/SVG/ri.svg";
import RejectIcon from "../../../../assets/logos/SVG/cross.svg";
import downloadTemplate from "../../../../assets/logos/download.svg";
import filexlsxIcon from "../../../../assets/logos/filexlsx.svg";
import useSearchAndPagination from "../../../../hooks/useSearchAndPagination";
import { Project } from "../../../../lib/services/HDFC/Project/dataTypes";
import { selectSetProject } from "../../../../lib/services/HDFC/Project/selectors";
import {
  downloadSalesTemplateRequested,
  getPendingSalesForApprovalListRequested,
  getSalesPastHistoryListRequested,
  isSalesSetupPendingRequested,
  updateSalesPastHistoryListRequested
} from "../../../../lib/services/HDFC/Sales/actions";
import { PendingSalesForApproval, SalesPastHistory } from "../../../../lib/services/HDFC/Sales/dataTypes";
import {
  selectPendingForApprovalData,
  selectPendingForApprovalSales,
  selectSalesLoaders,
  selectSalesPastHistoryList,
} from "../../../../lib/services/HDFC/Sales/selectors";
import { downloadRowDataRequest } from "../../../../lib/services/HDFC/common/action";
import { ActionType } from "../../../../lib/services/HDFC/services/dataTypes";
import { UserDetails } from "../../../../lib/services/hdfc_login/dataTypes";
import { selectUserDetails } from "../../../../lib/services/hdfc_login/selectors";
import { errorNotification, successNotification } from "../../../../utils/notifications";
import NewTableWithActions, { TableHeader } from "../../../../widgets/tables/MantineTable/NewTableWithActions";
import { getPresentableValue } from "../../../Components/UtilityFunctions";
const SalesApprove = () => {
  const dispatch = useDispatch();

  //#region [selector]
  const userDetails = useSelector(selectUserDetails) as UserDetails;
  const project = useSelector(selectSetProject) as Project;
  const pendingForApprovalSalesList = useSelector(selectPendingForApprovalSales) as PendingSalesForApproval[];
  const salesPastHistoryList = useSelector(selectSalesPastHistoryList) as SalesPastHistory[];
  const salesSetupPendingData = useSelector(selectPendingForApprovalData);
  const salesLoaders = useSelector(selectSalesLoaders);
  //   const loaders = useSelector(selectSalesLoaders);
  //#endregion
  const [showLoadingForRow, setShowLoadingForRow] = useState<{
    id: string | number;
    for: "downloadBottom" | "downloadTop" | "approve" | "reject"
  } | null>(null);

  //#region [useEffect]
  useEffect(() => {
    if (project) {
      dispatch(getPendingSalesForApprovalListRequested(project?.REAssetId));
      dispatch(getSalesPastHistoryListRequested(project?.REAssetId, "Update"));
    }
  }, [project]);
  //#endregion

  useEffect(() => {
    if (project) {
      dispatch(getSalesPastHistoryListRequested(project?.REAssetId, "Update"));
    }
  }, [project]);

  useEffect(() => {
    dispatch(isSalesSetupPendingRequested(project?.REAssetId));
  }, []);


  const onCallback = (success: boolean, message?: string) => {
    if (success) {
      successNotification(message ?? "Failed...")
    } else {
      errorNotification(message ?? "Failed...")
    }
  };

  //   confirm-action-modal
  const openActionModal = (data: PendingSalesForApproval, actionType: ActionType) => {
    const actionIcon = actionType === ActionType.APPROVE ? checkIcon : RejectIcon;
    if (userDetails.EmailId === data?.CreatedBy) {
      errorNotification("Uploader and Approver cannot be same");
      return;
    }
    if (data && actionType) {
      openConfirmModal({
        // title: `Confirm ${actionType === ActionType.APPROVE ? "Approve" : "Reject"}`,
        title: (
          <Flex align="center">
            <img src={actionIcon} style={{ width: "1rem", height: "1rem", marginRight: "8px" }} />
            <Text size="md">Confirm {actionType === ActionType.APPROVE ? "Approve" : "Reject"}</Text>
          </Flex>
        ),
        centered: true,
        children: (
          <Text size='sm'>
            Are you sure you want to {actionType === ActionType.APPROVE ? "approve" : "reject"} MIS dated {getPresentableValue(data.MISDate, true, false, false)}?
          </Text>
        ),
        labels: { confirm: "Confirm", cancel: "Cancel" },
        confirmProps: {
          style: { backgroundColor: "#001d56" },
          disabled: undefined,
          loading: salesLoaders.updateSalesPastHistory,
        },
        onClose: () => {
          // no action specified;
        },
        onConfirm: () =>
          dispatch(
            updateSalesPastHistoryListRequested(data?.REAssetId, data?.SaleMISHistoryId, actionType.toString(), userDetails?.EmailId, (success: boolean) =>
              onCallback(success, actionType === ActionType.APPROVE ? `Request Approved successfully.` : "Request rejected. Please review and resubmit if necessary."),
            ),
          ),
      });
    }
  };

  // table-data
  const { finalData, SearchComponent, PaginationComponent } = useSearchAndPagination({
    data: pendingForApprovalSalesList,
    columnsToSearch: [
      { accessorKey: "Entity", type: "text" },
      { accessorKey: "UserName", type: "text" },
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
    data: salesPastHistoryList,
    columnsToSearch: [
      { accessorKey: "Entity", type: "text" },
      { accessorKey: "UserName", type: "text" },
      { accessorKey: "Status", type: "text" },
    ],
    itemsPerPageData: [10, 20, 30, 40, 50],
    showItemsPerPageDropdown: true,
    showPaginationWithSearch: false,
  });

  const isEnabledPage = salesSetupPendingData?.isSetup === 1 && project.status.toLowerCase() !== "draft";

  return (
    <>
      <Flex align={"flex-start"} justify={"space-between"} m={"xl"}>
        <Flex direction={"column"} gap={"xl"}>
          {!isEnabledPage ? <Text color='red'>Cannot update Sales MIS. Project setup status still pending</Text> : null}
          <Flex direction={"column"} gap={"xs"}>
            <Text size={"sm"} weight={500}>
              Download the project sales update template
            </Text>
            <Button
              name='file-upload'
              loading={salesLoaders.downloadSalesTemplate}
              variant='outline'
              rightIcon={<img src={downloadTemplate} style={{ width: "15px", height: "15px" }} className="svgColorGray" />}
              leftIcon={<img src={filexlsxIcon} style={{ width: "15px", height: "15px", }} className="svgColorGray" />}
              disabled={!isEnabledPage}
              color='gray'
              w={300}
              onClick={() => dispatch(downloadSalesTemplateRequested(project?.REAssetId))}>
              Project Sales Update Template.xlsx
            </Button>
          </Flex>
        </Flex>
      </Flex>

      <NewTableWithActions
        loader={salesLoaders.pendingForApprovalList}
        cardHeader={
          <TableHeader
            title='MIS Approvals'
            SearchComponent={
              SearchComponent
            }
            PaginationComponent={PaginationComponent}
          />
        }
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
          { title: "Role", accessorKey: "EntityRole" },
          { title: "Username", accessorKey: "UserName" },
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
                    id: data?.SaleMISHistoryId,
                    for: "approve",
                  });
                },
                loading(row) {
                  return showLoadingForRow?.id === row?.SaleMISHistoryId && showLoadingForRow?.for === "approve" && salesLoaders.updateSalesPastHistory
                },
              },
              {
                type: "reject",
                onClick: data => {
                  openActionModal(data, ActionType.REJECT);
                  setShowLoadingForRow({
                    id: data?.SaleMISHistoryId,
                    for: "reject",
                  });
                },
                loading(row) {
                  return showLoadingForRow?.id === row?.SaleMISHistoryId && showLoadingForRow?.for === "reject" && salesLoaders.updateSalesPastHistory
                },
              },
              {
                type: "download",
                onClick: data => {
                  setShowLoadingForRow({
                    id: data?.SaleMISHistoryId,
                    for: "downloadTop",
                  })
                  dispatch(downloadRowDataRequest(data?.FileContainer, data?.FilePath, data?.FileName, (success: boolean) => {
                    setShowLoadingForRow(null)
                  }))
                },
                loading(row) {
                  return showLoadingForRow?.id === row?.SaleMISHistoryId && showLoadingForRow?.for === "downloadTop"
                },
              },
            ],
          },
        ]}
        data={finalData}
      />

      <NewTableWithActions
        loader={salesLoaders.salesHistoryList}
        cardHeader={<TableHeader title='Past Updates' SearchComponent={PastUpdatesSearchComponent} PaginationComponent={PastUpdatesPaginationComponent} />}
        columns={[
          {
            title: "Upload Date",
            accessorKey: "CreateAt",
            transform: (value: string) => <Text title={getPresentableValue(value, true) as string}>{getPresentableValue(value, true) as string}</Text>,
          },
          {
            title: "MIS Date",
            accessorKey: "MISDate",
            transform: (value: string) => getPresentableValue(value, true, false, false) as string,
          },
          { title: "Entity", accessorKey: "Entity" },
          { title: "Role", accessorKey: "EntityRole" },
          { title: "Username", accessorKey: "UserName" },
          { title: "Status", accessorKey: "Status" },
          {
            title: "Actions",
            accessorKey: "actions",
            actionTypes: [{
              type: "download",
              onClick: data => {
                setShowLoadingForRow({
                  id: data?.SaleMISHistoryId,
                  for: "downloadBottom",
                })
                dispatch(downloadRowDataRequest(data?.FileContainer, data?.FilePath, data?.FileName, (success: boolean) => {
                  setShowLoadingForRow(null)
                }))
              },
              loading(row) {
                return showLoadingForRow?.id === row?.SaleMISHistoryId && showLoadingForRow?.for === "downloadBottom"
              },
            }],
          },
        ]}
        data={pastUpdatesFinalData}
      />
    </>
  );
};

export default SalesApprove;
