import { Flex, Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "../../../../assets/logos/SVG/Delete.svg";
import useSearchAndPagination from "../../../../hooks/useSearchAndPagination";
import { default as NewTableWithActions, TableHeader } from "../../../../widgets/tables/MantineTable/NewTableWithActions";
import RemoveIcon from "../../../../assets/logos/SVG/Delete.svg";
import { default as WithdrawIcon, default as withDrawn } from "../../../../assets/logos/SVG/withdraw.svg";
import { downloadRowDataRequest } from "../../../../lib/services/HDFC/common/action";
import { selectDocumentDownloadLoaders } from "../../../../lib/services/HDFC/common/selectors";
import { UserDetails } from "../../../../lib/services/hdfc_login/dataTypes";
import { selectUserDetails } from "../../../../lib/services/hdfc_login/selectors";
import { errorNotification, successNotification } from "../../../../utils/notifications";
import { getPresentableValue } from "../../../Components/UtilityFunctions";
import TemplateDownloadUpload from "./TemplateDownloadUpload";
import {
  DeleteInvestmentDetailsRequested,
  GetInvestmentPastHistoryListRequested, IsInvestmentSetupRequested, UpdateInvestmentStatusRequested
} from "../../../../lib/services/HDFC/Investment/actions";
import { selectInvestmentLoaders, selectInvestmentPastHistoryList, selectSelectedInvestment } from "../../../../lib/services/HDFC/Investment/selector";
import { InvestmentListData, InvestmentPastHistoryData } from "../../../../lib/services/HDFC/Investment/dataTypes";
import { selectSwitchClient } from "../../../../lib/services/HDFC/Commons/selectors";
import { GetClientData } from "../../../../lib/services/HDFC/Commons/dataTypes";

const InvestmentUpdate = () => {
  const dispatch = useDispatch();
  //#region [state]
  const [showLoadingForRow, setShowLoadingForRow] = useState<string | number | null>(null);
  //#endregion
  const documentDownloadLoaders = useSelector(selectDocumentDownloadLoaders);
  const activeClient = useSelector(selectSwitchClient) as GetClientData;
  //#region [selector]
  const userDetails = useSelector(selectUserDetails) as UserDetails;
  const investment = useSelector(selectSelectedInvestment) as InvestmentListData;
  const investmentPastHistoryList = useSelector(selectInvestmentPastHistoryList);
  const loaders = useSelector(selectInvestmentLoaders);
  //#endregion

  useEffect(() => {
    if (investment?.InvestmentId) {
      dispatch(GetInvestmentPastHistoryListRequested(investment.InvestmentId, "Update"));
      dispatch(IsInvestmentSetupRequested(investment?.InvestmentId));
    }
  }, [investment]);
  //#endregion

  //#endregion

  // delete-callback
  const onCallback = (success: boolean, message?: string) => {
    setShowLoadingForRow(null);
    if (success) {
      successNotification(message ?? "");
      dispatch(GetInvestmentPastHistoryListRequested(investment?.InvestmentId, "Update"));
    } else {
      errorNotification(message ?? "");
    }
  };

  // delete-confirm-modal
  const openModal = (data: InvestmentPastHistoryData) => {
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
          DeleteInvestmentDetailsRequested(
            {
              clientId: activeClient.ClientId,
              investmentHistoryId: data.InvestmentHistoryId,
            },
            onCallback,
          ),
        ),
    });
  };

  const { finalData, SearchComponent, PaginationComponent } = useSearchAndPagination({
    data: investmentPastHistoryList ?? [],
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

  const handelWithDrawRowData = (data: InvestmentPastHistoryData) => {
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
        loading: loaders.updateInvestmentStatus,
      },
      onClose: () => {
        // no action specified;
      },
      onConfirm: () =>
        dispatch(
          UpdateInvestmentStatusRequested(
            { status: "Withdraw", investmentHistoryId: data.InvestmentHistoryId, createdBy: userDetails?.EmailId },
            (success: boolean) => {
              setShowLoadingForRow(null);
              dispatch(GetInvestmentPastHistoryListRequested(investment?.InvestmentId, "Update"));
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
        loader={loaders?.investmentHistoryList}
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
                  setShowLoadingForRow(data?.InvestmentHistoryId);
                  dispatch(
                    downloadRowDataRequest(data?.FileContainer, data?.FilePath, data?.FileName, () => {
                      setShowLoadingForRow(null);
                    }),
                  );
                },
                loading(row) {
                  return showLoadingForRow === row?.InvestmentHistoryId && documentDownloadLoaders.downloadRowData;
                },
              },
              {
                type: "delete",
                onClick: data => {
                  setShowLoadingForRow(data?.InvestmentHistoryId);
                  openModal(data);
                },
                override: rowdata => {
                  return {
                    icon: rowdata.Status === "Approved" ? RemoveIcon : null,
                    tooltip: rowdata.Status === "Approved" ? "Delete" : "",
                  };
                },
                loading(row) {
                  return showLoadingForRow === row?.InvestmentHistoryId && loaders.deleteInvestmentDetails;
                },
              },
              {
                type: "withDraw",
                onClick: row => {
                  handelWithDrawRowData(row);
                  setShowLoadingForRow(row?.InvestmentHistoryId);
                },
                override: rowData => {
                  return {
                    icon: rowData.Status === "Pending" ? withDrawn : null,
                    tooltip: rowData.Status === "Pending" ? "Withdraw" : "",
                  };
                },
                loading(row) {
                  return showLoadingForRow === row?.InvestmentHistoryId && loaders.updateInvestmentStatus;
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

export default InvestmentUpdate;
