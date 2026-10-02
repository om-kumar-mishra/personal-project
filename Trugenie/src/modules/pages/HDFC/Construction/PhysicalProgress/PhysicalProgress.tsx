import { Button, Card, Center, Flex, Loader, Table, Text, createStyles } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { openConfirmModal } from "@mantine/modals";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "../../../../../assets/logos/SVG/Delete.svg"
import useSearchAndPagination from "../../../../../hooks/useSearchAndPagination";
import { default as WithdrawIcon, default as withDrawn } from "../../../../../assets/logos/SVG/withdraw.svg";
import { Project } from "../../../../../lib/services/HDFC/Project/dataTypes";
import { selectSetProject } from "../../../../../lib/services/HDFC/Project/selectors";
import { selectDocumentDownloadLoaders } from "../../../../../lib/services/HDFC/common/selectors";
import { ActionType } from "../../../../../lib/services/HDFC/services/dataTypes";
import { UserDetails } from "../../../../../lib/services/hdfc_login/dataTypes";
import { selectUserDetails } from "../../../../../lib/services/hdfc_login/selectors";
import { errorNotification, successNotification } from "../../../../../utils/notifications";
import { getPresentableValue } from "../../../../Components/UtilityFunctions";
import TaggedRMsModal from "../../../Common/TaggedRMs";
import TemplateDownloadUpload from "./TemplateDownloadUpload";
import {
  DeleteConstructionUploadRequested,
  GetExcelUploadPastHistoryListRequested,
  IsConstructionSetupRequested,
  UpdateConstructionStatusRequested
} from "../../../../../lib/services/HDFC/Construction/ExcelUpload/actions";
import {
  selectConstructionExcelUploadPastHistoryList,
  selectContructionExcelLoaders
} from "../../../../../lib/services/HDFC/Construction/ExcelUpload/selector";
import { ExcelUploadPastHistoryData } from "../../../../../lib/services/HDFC/Construction/ExcelUpload/dataTypes";
import { GetPhysicalProgressPastHistoryListRequested } from "../../../../../lib/services/HDFC/Construction/PhysicalProgress/actions";

export const useStyles = createStyles(theme => {
  return {
    header: {
      ["th"]: {
        backgroundColor: "#dedede",
        color: "#001d56 !important",
        fontSize: "12px !important",
      },
      height: "2.5rem",
    },
    body: {
      fontSize: "0.8rem !important",
      color: "gray !important",
      fontWeight: 500,
      // lineBreak: "anywhere",
    },
    stickyHeader: {
      position: "sticky",
      top: 0,
      zIndex: 49,
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
      ["th"]: { backgroundColor: "#dedede", color: "#001d56 !important" },
      transition: "box-shadow 150ms ease",
    },
    selectedRow: {
      backgroundColor: "#001d56",
      ["td"]: { color: "#fff !important" },
    },
  };
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PhysicalProgress = ({ handleOnClick }: { handleOnClick?: (data: any) => void }) => {
  const dispatch = useDispatch();
  const { classes } = useStyles();

  //#region [state]
  const [showLoadingForRow, setShowLoadingForRow] = useState<string | number | null>(null);
  //#endregion
  const documentDownloadLoaders = useSelector(selectDocumentDownloadLoaders);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  //#endregion

  //#region [selector]
  const userDetails = useSelector(selectUserDetails) as UserDetails;
  const project = useSelector(selectSetProject) as Project;
  const constructionHistoryList = useSelector(selectConstructionExcelUploadPastHistoryList)
  const loaders = useSelector(selectContructionExcelLoaders);
  //#endregion

  //#region [useEffect]
  useEffect(() => {
    dispatch(IsConstructionSetupRequested(project?.REAssetId));
    return () => {
      setUploadedFile(null);
    };
  }, []);

  useEffect(() => {
    if (project) {
      dispatch(GetExcelUploadPastHistoryListRequested(Number(project?.REAssetId), userDetails?.EmailId, "Update"));
    }
  }, [project]);
  //#endregion

  //#region [disclosure]
  const [viewTaggedRMsModal, { open: openTaggedRMsModal, close: closeTaggedRMsModal }] = useDisclosure(false);
  //#endregion

  const fileUploadCallback = (success: boolean, message?: string) => {
    if (success) {
      successNotification(message ?? "");
    } else {
      errorNotification(message ?? "Failed...");
    }
    setUploadedFile(null);
  };

  // delete-callback
  const onCallback = (success: boolean, message?: string) => {
    setShowLoadingForRow(null);
    if (success) {
      successNotification(message ?? "");
      dispatch(GetPhysicalProgressPastHistoryListRequested(Number(project?.REAssetId), userDetails?.EmailId, "Update"));
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
      // { accessorKey: "UserName", type: "text" },
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
              createdby: userDetails?.EmailId
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
      {/* <NewTableWithActions
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
                    downloadRowDataRequest(data?.FileContainer, data?.FilePath, data?.FileName, (success: boolean) => {
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
      /> */}
    </>
  );
};

export default PhysicalProgress;
