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
import { downloadRowDataRequest } from "../../../../../lib/services/HDFC/common/action";
import { ActionType } from "../../../../../lib/services/HDFC/services/dataTypes";
import { UserDetails } from "../../../../../lib/services/hdfc_login/dataTypes";
import { selectUserDetails } from "../../../../../lib/services/hdfc_login/selectors";
import { errorNotification, successNotification } from "../../../../../utils/notifications";
import NewTableWithActions, { TableHeader } from "../../../../../widgets/tables/MantineTable/NewTableWithActions";
import { getPresentableValue } from "../../../../Components/UtilityFunctions";
import {
  selectInvestmentLoaders,
  selectInvestmentPastHistoryList,
  selectInvestmentPendingList,
  selectSelectedInvestment,
} from "../../../../../lib/services/HDFC/Investment/selector";
import { InvestmentListData, InvestmentPastHistoryData, InvestmentPendingData } from "../../../../../lib/services/HDFC/Investment/dataTypes";
import {
  DownloadInvestmentTemplateRequested,
  GetInvestmentPastHistoryListRequested,
  GetInvestmentPendingUpdateListRequested,
  UpdateInvestmentStatusRequested,
} from "../../../../../lib/services/HDFC/Investment/actions";

const InvestmentApproveSetup = () => {
  const dispatch = useDispatch();

  //#region [selector]
  const userDetails = useSelector(selectUserDetails) as UserDetails;
  const investment = useSelector(selectSelectedInvestment) as InvestmentListData;
  const pendingInvestmentList = useSelector(selectInvestmentPendingList) as InvestmentPendingData[];
  const investmentPastHistoryList = useSelector(selectInvestmentPastHistoryList) as InvestmentPastHistoryData[];

  const loaders = useSelector(selectInvestmentLoaders);
  //#endregion
  const [showLoadingForRow, setShowLoadingForRow] = useState<{
    id: string | number;
    for: "downloadBottom" | "downloadTop" | "approve" | "reject";
  } | null>(null);

  //#region [useEffect]

  useEffect(() => {
    if (investment?.InvestmentId) {
      dispatch(GetInvestmentPendingUpdateListRequested(investment.InvestmentId, "Setup"));
      dispatch(GetInvestmentPastHistoryListRequested(investment.InvestmentId, "Setup"));
    }
  }, [investment?.InvestmentId]);
  //#endregion

  const onCallback = (success: boolean, message?: string) => {
    if (success) {
      successNotification(message ?? "Failed...");
    } else {
      errorNotification(message ?? "Failed...");
    }
  };

  //   confirm-action-modal
  const openActionModal = (data: InvestmentPendingData, actionType: ActionType) => {
    const actionIcon = actionType === ActionType.APPROVE ? checkIcon : RejectIcon;
    if (userDetails.EmailId === data?.UpdatedBy) {
      errorNotification("Uploader and Approver cannot be same");
      return;
    }
    if (data && actionType) {
      openConfirmModal({
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
          loading: loaders.updateInvestmentStatus,
        },
        onClose: () => {
          // no action specified;
        },
        onConfirm: () =>
          dispatch(
            UpdateInvestmentStatusRequested(
              { status: actionType.toString(), investmentHistoryId: data.InvestmentHistoryId, createdBy: userDetails?.EmailId },
              (success: boolean) => {
                setShowLoadingForRow(null);
                dispatch(GetInvestmentPendingUpdateListRequested(investment?.InvestmentId, "Setup"));
                dispatch(GetInvestmentPastHistoryListRequested(investment?.InvestmentId, "Setup"));
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
    data: pendingInvestmentList,
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
    data: investmentPastHistoryList,
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
              Download the investment setup template
            </Text>
            <Button
              name='file-upload'
              loading={loaders.downloadInvestmentTemplate}
              variant='outline'
              rightIcon={<img src={downloadTemplate} style={{ width: "15px", height: "15px" }} className='svgColorGray' />}
              leftIcon={<img src={filexlsxIcon} style={{ width: "15px", height: "15px" }} className='svgColorGray' />}
              color='gray'
              w={300}
              onClick={() => dispatch(DownloadInvestmentTemplateRequested(investment?.InvestmentId, "Setup"))}>
              Investment Setup Template.xlsx
            </Button>
          </Flex>
        </Flex>
      </Flex>

      <NewTableWithActions
        loader={loaders.investmentPendingList}
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
          { title: "Updated By", accessorKey: "UpdatedBy" },
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
                    id: data?.InvestmentHistoryId,
                    for: "approve",
                  });
                },
                loading(row) {
                  return showLoadingForRow?.id === row?.InvestmentHistoryId && showLoadingForRow?.for === "approve" && loaders.updateInvestmentStatus;
                },
              },
              {
                type: "reject",
                onClick: data => {
                  openActionModal(data, ActionType.REJECT);
                  setShowLoadingForRow({
                    id: data?.InvestmentHistoryId,
                    for: "reject",
                  });
                },
                loading(row) {
                  return showLoadingForRow?.id === row?.InvestmentHistoryId && showLoadingForRow?.for === "reject" && loaders.updateInvestmentStatus;
                },
              },
              {
                type: "download",
                onClick: data => {
                  setShowLoadingForRow({
                    id: data?.InvestmentHistoryId,
                    for: "downloadTop",
                  });
                  dispatch(
                    downloadRowDataRequest(data?.FileContainer, data?.FilePath, data?.FileName, () => {
                      setShowLoadingForRow(null);
                    }),
                  );
                },
                loading(row) {
                  return showLoadingForRow?.id === row?.InvestmentHistoryId && showLoadingForRow?.for === "downloadTop";
                },
              },
            ],
          },
        ]}
        data={finalData}
      />

      <NewTableWithActions
        loader={loaders.investmentHistoryList}
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
          { title: "Updated By", accessorKey: "UpdatedBy" },
          { title: "Status", accessorKey: "Status" },
          {
            title: "Actions",
            accessorKey: "actions",
            actionTypes: [
              {
                type: "download",
                onClick: data => {
                  setShowLoadingForRow({
                    id: data?.InvestmentHistoryId,
                    for: "downloadBottom",
                  });
                  dispatch(
                    downloadRowDataRequest(data?.FileContainer, data?.FilePath, data?.FileName, () => {
                      setShowLoadingForRow(null);
                    }),
                  );
                },
                loading(row) {
                  return showLoadingForRow?.id === row?.InvestmentHistoryId && showLoadingForRow?.for === "downloadBottom";
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

export default InvestmentApproveSetup;
