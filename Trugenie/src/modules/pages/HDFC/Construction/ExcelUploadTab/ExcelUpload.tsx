import { Flex, Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "../../../../../assets/logos/SVG/Delete.svg";
import useSearchAndPagination from "../../../../../hooks/useSearchAndPagination";
import { default as NewTableWithActions, TableHeader } from "../../../../../widgets/tables/MantineTable/NewTableWithActions";
import RemoveIcon from "../../../../../assets/logos/SVG/Delete.svg";
import { default as WithdrawIcon, default as withDrawn } from "../../../../../assets/logos/SVG/withdraw.svg";
import { Project } from "../../../../../lib/services/HDFC/Project/dataTypes";
import { selectSetProject } from "../../../../../lib/services/HDFC/Project/selectors";
import { downloadRowDataRequest } from "../../../../../lib/services/HDFC/common/action";
import { selectDocumentDownloadLoaders } from "../../../../../lib/services/HDFC/common/selectors";
import { ActionType } from "../../../../../lib/services/HDFC/services/dataTypes";
import { UserDetails } from "../../../../../lib/services/hdfc_login/dataTypes";
import { selectUserDetails } from "../../../../../lib/services/hdfc_login/selectors";
import { errorNotification, successNotification } from "../../../../../utils/notifications";
import { getPresentableValue } from "../../../../Components/UtilityFunctions";
import TemplateDownloadUpload from "./TemplateDownloadUpload";
import {
  DeleteConstructionUploadRequested,
  GetExcelUploadPastHistoryListRequested,
  IsConstructionSetupRequested,
  UpdateConstructionStatusRequested,
} from "../../../../../lib/services/HDFC/Construction/ExcelUpload/actions";
import {
  selectConstructionExcelUploadPastHistoryList,
  selectContructionExcelLoaders,
} from "../../../../../lib/services/HDFC/Construction/ExcelUpload/selector";
import { ExcelUploadPastHistoryData } from "../../../../../lib/services/HDFC/Construction/ExcelUpload/dataTypes";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ExcelUpload = ({ handleOnClick }: { handleOnClick?: (data: any) => void }) => {
  const dispatch = useDispatch();

  //#region [state]
  const [showLoadingForRow, setShowLoadingForRow] = useState<string | number | null>(null);
  //#endregion
  const documentDownloadLoaders = useSelector(selectDocumentDownloadLoaders);
  //#endregion

  //#region [selector]
  const userDetails = useSelector(selectUserDetails) as UserDetails;
  const project = useSelector(selectSetProject) as Project;
  const constructionHistoryList = useSelector(selectConstructionExcelUploadPastHistoryList);
  const loaders = useSelector(selectContructionExcelLoaders);
  //#endregion

  //#region [useEffect]

  useEffect(() => {
    if (project?.REAssetId) {
      dispatch(IsConstructionSetupRequested(project.REAssetId));
      dispatch(GetExcelUploadPastHistoryListRequested(Number(project.REAssetId), userDetails?.EmailId, "Update"));
    }
  }, [project?.REAssetId]);
  //#endregion

  // delete-callback
  const onCallback = (success: boolean, message?: string) => {
    setShowLoadingForRow(null);
    if (success) {
      successNotification(message ?? "");
      dispatch(GetExcelUploadPastHistoryListRequested(Number(project?.REAssetId), userDetails?.EmailId, "Update"));
    } else {
      errorNotification(message ?? "");
    }
  };

  // delete-confirm-modal
  const openModal = (data: ExcelUploadPastHistoryData) => {
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
          DeleteConstructionUploadRequested(
            {
              constructionMISHistoryId: data.ConstructionMISHistoryId,
              createdBy: userDetails.EmailId,
            },
            onCallback,
          ),
        ),
    });
  };

  const { finalData, SearchComponent, PaginationComponent } = useSearchAndPagination({
    data: constructionHistoryList,
    columnsToSearch: [
      { accessorKey: "CreatedBy", type: "text" },
      { accessorKey: "CreatedAt", type: "date" },
      { accessorKey: "EntityName", type: "text" },
      { accessorKey: "Role", type: "text" },
      { accessorKey: "Status", type: "text" },
    ],
    itemsPerPageData: [10, 20, 30, 40, 50],
    showItemsPerPageDropdown: true,
    showPaginationWithSearch: false,
  });

  const handelWithDrawRowData = (data: ExcelUploadPastHistoryData) => {
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
        loading: loaders.excelUploadHistoryList,
      },
      onClose: () => {
        // no action specified;
      },
      onConfirm: () =>
        dispatch(
          UpdateConstructionStatusRequested(
            {
              status: ActionType.WITHDRAW,
              constructionMISHistoryId: data.ConstructionMISHistoryId,
              createdby: userDetails?.EmailId,
            },
            (success: boolean) => {
              setShowLoadingForRow(null);
              dispatch(GetExcelUploadPastHistoryListRequested(Number(project?.REAssetId), userDetails?.EmailId, "Update"));
              // dispatch(GetConstructionPendignMISListRequested(Number(project?.REAssetId), userDetails?.EmailId,  "Update"));
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
        loader={loaders?.excelUploadHistoryList}
        cardHeader={<TableHeader title='Past Updates' SearchComponent={SearchComponent} PaginationComponent={PaginationComponent} />}
        columns={[
          {
            title: "Upload Date",
            accessorKey: "CreatedAt",
            transform: (value: string) => <Text title={getPresentableValue(value, true) as string}>{getPresentableValue(value, true) as string}</Text>,
          },
          {
            title: "MIS Date",
            accessorKey: "MISDate",
            transform: (value: string) => getPresentableValue(value, true, false, false) as string,
          },
          { title: "Entity", accessorKey: "EntityName" },
          { title: "Role", accessorKey: "Role" },
          // { title: "Username", accessorKey: "UserName" },
          { title: "Status", accessorKey: "Status" },
          {
            title: "Actions",
            accessorKey: "actions",
            actionTypes: [
              {
                type: "download",
                onClick: data => {
                  setShowLoadingForRow(data?.ConstructionMISHistoryId);
                  dispatch(
                    downloadRowDataRequest(data?.FileContainer, data?.FilePath, data?.FileName, () => {
                      setShowLoadingForRow(null);
                    }),
                  );
                },
                loading(row) {
                  return showLoadingForRow === row?.ConstructionMISHistoryId && documentDownloadLoaders.downloadRowData;
                },
              },
              {
                type: "delete",
                onClick: data => {
                  setShowLoadingForRow(data?.ConstructionMISHistoryId);
                  openModal(data);
                },
                override: rowdata => {
                  return {
                    icon: rowdata.Status === "Approved" ? RemoveIcon : null,
                    tooltip: rowdata.Status === "Approved" ? "Delete" : "",
                  };
                },
                loading(row) {
                  return showLoadingForRow === row?.ConstructionMISHistoryId && loaders.DeleteConstructionUpload;
                },
              },
              {
                type: "withDraw",
                onClick: row => {
                  handelWithDrawRowData(row);
                  setShowLoadingForRow(row?.ConstructionMISHistoryId);
                },
                override: rowData => {
                  return {
                    icon: rowData.Status === "Pending" ? withDrawn : null,
                    tooltip: rowData.Status === "Pending" ? "Withdraw" : "",
                  };
                },
                loading(row) {
                  return showLoadingForRow === row?.ConstructionMISHistoryId && loaders.UpdateConstructionUpdateStatus;
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

export default ExcelUpload;
