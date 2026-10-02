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
import { errorNotification, successNotification } from "../../../../../utils/notifications";
import NewTableWithActions, { TableHeader } from "../../../../../widgets/tables/MantineTable/NewTableWithActions";
import { getPresentableValue } from "../../../../Components/UtilityFunctions";

//Portfoli  regiomn
import {
  DownloadFundsTemplateRequested,
  getFundsPastUpdateListRequested,
  getFundsPendingListRequested,
  UpdateFundsStatusRequested,
} from "../../../../../lib/services/HDFC/Portfolio/actions";
import { fundsPastUpdateList, selectFundsLoaders, fundsPendingList } from "../../../../../lib/services/HDFC/Portfolio/selectors";
import { FundsPastUpdate, FundsPendingList } from "../../../../../lib/services/HDFC/Portfolio/dataTypes";
import { selectSwitchClient } from "../../../../../lib/services/HDFC/Commons/selectors";
import { GetClientData } from "../../../../../lib/services/HDFC/Commons/dataTypes";
import { selectUserDetails } from "../../../../../lib/services/hdfc_login/selectors";
import { UserDetails } from "../../../../../lib/services/hdfc_login/dataTypes";

const PortfolioApprove = () => {
  const dispatch = useDispatch();

  //#region [selector]
  const activeClient = useSelector(selectSwitchClient) as GetClientData;
  const userDetails = useSelector(selectUserDetails) as UserDetails;
  const fundsPastUpdatelist = useSelector(fundsPastUpdateList) as FundsPastUpdate[];
  const fundsloaders = useSelector(selectFundsLoaders);
  const pendingForFundsList = useSelector(fundsPendingList) as FundsPendingList[];

  const [showLoadingForRow, setShowLoadingForRow] = useState<{
    id: string | number;
    for: "downloadBottom" | "downloadTop" | "approve" | "reject";
  } | null>(null);

  useEffect(() => {
    if (activeClient.ClientId) {
      dispatch(getFundsPendingListRequested(activeClient.ClientId));
      dispatch(getFundsPastUpdateListRequested(activeClient.ClientId, "Update"));
    }
  }, [activeClient.ClientId]);

  const onCallback = (success: boolean, message?: string) => {
    if (success) {
      successNotification(message ?? "Failed...");
    } else {
      errorNotification(message ?? "Failed...");
    }
  };

  //   confirm-action-modal
  const openActionModal = (data: FundsPastUpdate, actionType: ActionType) => {
    const actionIcon = actionType === ActionType.APPROVE ? checkIcon : RejectIcon;
    // if (userDetails.EmailId === data?.UpdatedBy) {
    //   errorNotification("Uploader and Approver cannot be same");
    //   return;
    // }
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
          loading: fundsloaders.fundsPendingList,
        },
        onClose: () => {
          // no action specified;
        },
        onConfirm: () => {
          dispatch(
            UpdateFundsStatusRequested(
              { clientId: activeClient.ClientId, fundMISHistoryId: data.FundMISHistoryId, status: actionType.toString() },
              (success: boolean) => {
                setShowLoadingForRow(null);
                dispatch(getFundsPendingListRequested(data?.ClientId));
                dispatch(getFundsPastUpdateListRequested(data?.ClientId, "Update"));
                onCallback(
                  success,
                  actionType === ActionType.APPROVE ? `Request Approved successfully.` : "Request rejected. Please review and resubmit if necessary.",
                );
              },
            ),
          );
        },
      });
    }
  };

  // table-data
  const { finalData, SearchComponent, PaginationComponent } = useSearchAndPagination({
    data: pendingForFundsList,
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
    data: fundsPastUpdatelist,
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
              Download the portfolio template
            </Text>
            <Button
              name='file-upload'
              loading={fundsloaders.downloadFundTemplate}
              variant='outline'
              rightIcon={<img src={downloadTemplate} style={{ width: "15px", height: "15px" }} className='svgColorGray' />}
              leftIcon={<img src={filexlsxIcon} style={{ width: "15px", height: "15px" }} className='svgColorGray' />}
              color='gray'
              w={300}
              // onClick={() => dispatch(downloadSalesTemplateRequested(project?.REAssetId))}
              onClick={() => dispatch(DownloadFundsTemplateRequested(activeClient.ClientId))}>
              Portfolio Template.xlsx
            </Button>
          </Flex>
        </Flex>
      </Flex>

      <NewTableWithActions
        loader={fundsloaders.fundsPendingList}
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
                    id: data?.FundMISHistoryId,
                    for: "approve",
                  });
                },
                loading(row) {
                  return showLoadingForRow?.id === row?.FundMISHistoryId && showLoadingForRow?.for === "approve" && fundsloaders.fundsPastUpdateList;
                },
              },
              {
                type: "reject",
                onClick: data => {
                  openActionModal(data, ActionType.REJECT);
                  setShowLoadingForRow({
                    id: data?.FundMISHistoryId,
                    for: "reject",
                  });
                },
                loading(row) {
                  return showLoadingForRow?.id === row?.FundMISHistoryId && showLoadingForRow?.for === "reject" && fundsloaders.fundsPastUpdateList;
                },
              },
              {
                type: "download",
                onClick: data => {
                  setShowLoadingForRow({
                    id: data?.FundMISHistoryId,
                    for: "downloadTop",
                  });
                  dispatch(
                    downloadRowDataRequest(data?.FileContainer, data?.FilePath, data?.FileName, () => {
                      setShowLoadingForRow(null);
                    }),
                  );
                },
                loading(row) {
                  return showLoadingForRow?.id === row?.FundMISHistoryId && showLoadingForRow?.for === "downloadTop";
                },
              },
            ],
          },
        ]}
        data={finalData}
      />

      <NewTableWithActions
        loader={fundsloaders.fundsPastUpdateList}
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
                    id: data?.FundMISHistoryId,
                    for: "downloadBottom",
                  });
                  dispatch(
                    downloadRowDataRequest(data?.FileContainer, data?.FilePath, data?.FileName, () => {
                      setShowLoadingForRow(null);
                    }),
                  );
                },
                loading(row) {
                  return showLoadingForRow?.id === row?.FundMISHistoryId && showLoadingForRow?.for === "downloadBottom";
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

export default PortfolioApprove;
