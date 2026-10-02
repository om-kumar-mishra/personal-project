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
  DeleteCashflowDetailsRequested,
  GetCashflowPastHistoryListRequested,
  IsCashflowSetupRequested,
  UpdateCashflowStatusRequested,
} from "../../../../lib/services/HDFC/Cashflow/action";
import { selectCashflowLoaders, selectCashflowPastHistoryList } from "../../../../lib/services/HDFC/Cashflow/selector";
import { CashflowPastHistoryData } from "../../../../lib/services/HDFC/Cashflow/dataTypes";
import TemplateDownloadUpload from "./TemplateDownloadUpload";

const CashflowUpdate = () => {
  const dispatch = useDispatch();
  //#region [state]
  const [showLoadingForRow, setShowLoadingForRow] = useState<string | number | null>(null);
  //#endregion

  //#region [selector]
  const documentDownloadLoaders = useSelector(selectDocumentDownloadLoaders);
  const userDetails = useSelector(selectUserDetails) as UserDetails;
  const project = useSelector(selectSetProject) as Project;
  const cashflowPastHistoryList = useSelector(selectCashflowPastHistoryList);
  const loaders = useSelector(selectCashflowLoaders);
  //#endregion

  //#region [useeffect]
  useEffect(() => {
    if (project) {
      dispatch(GetCashflowPastHistoryListRequested(project?.REAssetId));
      dispatch(IsCashflowSetupRequested(project?.REAssetId));
    }
  }, [project]);
  //#endregion

  // delete-callback
  const onCallback = (success: boolean, message?: string) => {
    setShowLoadingForRow(null);
    if (success) {
      successNotification(message ?? "");
      dispatch(GetCashflowPastHistoryListRequested(project?.REAssetId));
    } else {
      errorNotification(message ?? "");
    }
  };

  // delete-confirm-modal
  const openModal = (data: CashflowPastHistoryData) => {
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
          DeleteCashflowDetailsRequested(
            {
              cashflowHistoryId: data.MisHistoryId,
              type: data.ProjectionType,
              createdBy: userDetails.EmailId,
            },
            onCallback,
          ),
        ),
    });
  };

  const { finalData, SearchComponent, PaginationComponent } = useSearchAndPagination({
    data: cashflowPastHistoryList ?? [],
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

  const handelWithDrawRowData = (data: CashflowPastHistoryData) => {
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
        loading: loaders.updateCashflowStatus,
      },
      onClose: () => {
        // no action specified;
      },
      onConfirm: () =>
        dispatch(
          UpdateCashflowStatusRequested(
            {
              status: "Withdraw",
              type: data.ProjectionType,
              cashflowHistoryId: data.MisHistoryId,
            },
            (success: boolean) => {
              setShowLoadingForRow(null);
              dispatch(GetCashflowPastHistoryListRequested(project?.REAssetId));
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
        loader={loaders?.cashflowHistoryList}
        cardHeader={
          <TableHeader
            title='Past Updates'
            SearchComponent={SearchComponent}
            PaginationComponent={PaginationComponent} />}
        columns={[
          {
            title: "Upload Date",
            accessorKey: "UploadDate",
            transform: (value: string) =>
              <Text
                title={getPresentableValue(value, true) as string}>
                {getPresentableValue(value, true) as string}
              </Text>,
          },
          {
            title: "MIS Date",
            accessorKey: "MISDate",
            transform: (value: string) => getPresentableValue(value, true, false, false) as string,
          },
          { title: "Entity", accessorKey: "Entity" },
          { title: "Role", accessorKey: "Role" },
          { title: "Updated By", accessorKey: "UpdatedBy" },
          { title: "Projection Type", accessorKey: "ProjectionType" },
          { title: "Status", accessorKey: "Status" },
          {
            title: "Actions",
            accessorKey: "actions",
            actionTypes: [
              {
                type: "download",
                onClick: data => {
                  setShowLoadingForRow(data?.MisHistoryId);
                  dispatch(
                    downloadRowDataRequest(data?.FileContainer, data?.FilePath, data?.FileName, () => {
                      setShowLoadingForRow(null);
                    }),
                  );
                },
                loading(row) {
                  return showLoadingForRow === row?.MisHistoryId && documentDownloadLoaders.downloadRowData;
                },
              },
              {
                type: "delete",
                onClick: data => {
                  setShowLoadingForRow(data?.MisHistoryId);
                  openModal(data);
                },
                override: rowdata => {
                  return {
                    icon: rowdata.Status === "Approved" ? RemoveIcon : null,
                    tooltip: rowdata.Status === "Approved" ? "Delete" : "",
                  };
                },
                loading(row) {
                  return showLoadingForRow === row?.MisHistoryId && loaders.deleteCashflowDetails;
                },
              },
              {
                type: "withDraw",
                onClick: row => {
                  handelWithDrawRowData(row);
                  setShowLoadingForRow(row?.MisHistoryId);
                },
                override: rowData => {
                  return {
                    icon: rowData.Status === "Pending" ? withDrawn : null,
                    tooltip: rowData.Status === "Pending" ? "Withdraw" : "",
                  };
                },
                loading(row) {
                  return showLoadingForRow === row?.MisHistoryId && loaders.updateCashflowStatus;
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

export default CashflowUpdate;
