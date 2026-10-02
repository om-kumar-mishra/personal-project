import { Flex, Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "../../../../../assets/logos/SVG/Delete.svg";
import useSearchAndPagination from "../../../../../hooks/useSearchAndPagination";
import { default as NewTableWithActions, TableHeader } from "../../../../../widgets/tables/MantineTable/NewTableWithActions";
import RemoveIcon from "../../../../../assets/logos/SVG/Delete.svg";
import { default as WithdrawIcon, default as withDrawn } from "../../../../../assets/logos/SVG/withdraw.svg";
import { downloadRowDataRequest } from "../../../../../lib/services/HDFC/common/action";
import { selectDocumentDownloadLoaders } from "../../../../../lib/services/HDFC/common/selectors";
import { errorNotification, successNotification } from "../../../../../utils/notifications";
import { getPresentableValue } from "../../../../Components/UtilityFunctions";
import {
  deleteFundsPastHistoryRequested,
  getFundsPastUpdateListRequested,
  UpdateFundsStatusRequested,
} from "../../../../../lib/services/HDFC/Portfolio/actions";
import { fundsPastUpdateList, selectFundsLoaders } from "../../../../../lib/services/HDFC/Portfolio/selectors";
import { FundsPastUpdate } from "../../../../../lib/services/HDFC/Portfolio/dataTypes";
import TemplateDownloadUpload from "./TemplateDownloadUpload";
import { selectSwitchClient } from "../../../../../lib/services/HDFC/Commons/selectors";
import { GetClientData } from "../../../../../lib/services/HDFC/Commons/dataTypes";

const PortfolioUpdate = () => {
  const dispatch = useDispatch();
  //#region [state]
  const [showLoadingForRow, setShowLoadingForRow] = useState<string | number | null>(null);
  //#endregion
  const documentDownloadLoaders = useSelector(selectDocumentDownloadLoaders);
  //#endregion

  //#region [selector]
  const activeClient = useSelector(selectSwitchClient) as GetClientData;
  const fundsPastUpdatelist = useSelector(fundsPastUpdateList) as FundsPastUpdate[];
  const loaders = useSelector(selectFundsLoaders);
  //#endregion

  useEffect(() => {
    if (activeClient.ClientId) {
      dispatch(getFundsPastUpdateListRequested(activeClient.ClientId, "Update"));
    }
  }, [activeClient.ClientId]);
  //#endregion

  // delete-callback
  const onCallback = (success: boolean, message?: string) => {
    setShowLoadingForRow(null);
    if (success) {
      successNotification(message ?? "");
      dispatch(getFundsPastUpdateListRequested(activeClient.ClientId, "Update"));
    } else {
      errorNotification(message ?? "");
    }
  };

  // delete-confirm-modal
  const openModal = (data: FundsPastUpdate) => {
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
      onConfirm: () => dispatch(deleteFundsPastHistoryRequested(data?.ClientId, data?.FundMISHistoryId, onCallback)),
    });
  };

  const { finalData, SearchComponent, PaginationComponent } = useSearchAndPagination({
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

  const handelWithDrawRowData = (data: FundsPastUpdate) => {
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
        // loading: loaders.updateSalesPastHistory,
      },
      onClose: () => {
        // no action specified;
      },
      onConfirm: () => {
        dispatch(
          UpdateFundsStatusRequested({ clientId: activeClient.ClientId, fundMISHistoryId: data.FundMISHistoryId, status: "Withdraw" }, (success: boolean) => {
            setShowLoadingForRow(null);
            // dispatch(GetFundsPastHistoryListRequested(project?.REAssetId, "Update"));
            dispatch(getFundsPastUpdateListRequested(activeClient.ClientId, "Update"));
            onCallback(success, "Request Withdrawn!");
          }),
        );
      },
    });
  };

  return (
    <>
      <TemplateDownloadUpload />
      {/* table */}
      <NewTableWithActions
        loader={loaders?.fundsPastUpdateList}
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
                  setShowLoadingForRow(data?.FundMISHistoryId);
                  dispatch(
                    downloadRowDataRequest(data?.FileContainer, data?.FilePath, data?.FileName, () => {
                      setShowLoadingForRow(null);
                    }),
                  );
                },
                loading(row) {
                  return showLoadingForRow === row?.FundMISHistoryId && documentDownloadLoaders.downloadRowData;
                },
              },
              {
                type: "delete",
                onClick: data => {
                  setShowLoadingForRow(data?.FundMISHistoryId);
                  openModal(data);
                },
                override: rowdata => {
                  return {
                    icon: rowdata.Status === "Approved" ? RemoveIcon : null,
                    tooltip: rowdata.Status === "Approved" ? "Delete" : "",
                  };
                },
                loading(row) {
                  return showLoadingForRow === row?.FundMISHistoryId; //&& loaders.deleteSalesHistory;
                },
              },
              {
                type: "withDraw",
                onClick: row => {
                  handelWithDrawRowData(row);
                  setShowLoadingForRow(row?.FundMISHistoryId);
                },
                override: rowData => {
                  return {
                    icon: rowData.Status === "Pending" ? withDrawn : null,
                    tooltip: rowData.Status === "Pending" ? "Withdraw" : "",
                  };
                },
                loading(row) {
                  return showLoadingForRow === row?.FundMISHistoryId && loaders.fundsPastUpdateList;
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

export default PortfolioUpdate;
