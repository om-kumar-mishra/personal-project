import { Button, Card, Center, Flex, Loader, Table, Text, createStyles } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { openConfirmModal } from "@mantine/modals";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "../../../../assets/logos/SVG/Delete.svg";
import InfoIcons from "../../../../assets/logos/SVG/infocircle.svg";
import plusIcon from "../../../../assets/logos/SVG/only_add.svg";
import viewIcon from "../../../../assets/logos/SVG/view.svg";
import filexlsxIcon from "../../../../assets/logos/filexlsx.svg";
import useSearchAndPagination from "../../../../hooks/useSearchAndPagination";
import { default as NewTableWithActions, TableHeader } from "../../../../widgets/tables/MantineTable/NewTableWithActions";
// import { selectUserDetails } from "../../../../lib/services/hdfc_login/selectors";
import dayjs from "dayjs";
import RemoveIcon from "../../../../assets/logos/SVG/Delete.svg";
import { default as WithdrawIcon, default as withDrawn } from "../../../../assets/logos/SVG/withdraw.svg";
import downloadTemplate from "../../../../assets/logos/download.svg";
import uploadDocument from "../../../../assets/logos/upload.svg";
import { Project } from "../../../../lib/services/HDFC/Project/dataTypes";
import { selectSetProject } from "../../../../lib/services/HDFC/Project/selectors";
import {
  deleteSalesHistoryRequested,
  downloadSalesTemplateRequested,
  getSalesPastHistoryListRequested,
  getSalesSummaryDetailRequested,
  isSalesSetupPendingRequested,
  salesSummaryDetailReset,
  salesSummaryReset,
  updateSalesPastHistoryListRequested,
  uploadSalesTemplateRequested,
} from "../../../../lib/services/HDFC/Sales/actions";
import { PendingSalesForApproval, SalesPastHistory, SalesSummaryData, SummaryDetailsData } from "../../../../lib/services/HDFC/Sales/dataTypes";
import {
  selectPendingForApprovalData,
  selectSalesLoaders,
  selectSalesPastHistoryList,
  selectSalesSummaryData,
  selectSalesSummaryDetails,
} from "../../../../lib/services/HDFC/Sales/selectors";
import { downloadRowDataRequest } from "../../../../lib/services/HDFC/common/action";
import { selectDocumentDownloadLoaders } from "../../../../lib/services/HDFC/common/selectors";
import { ActionType } from "../../../../lib/services/HDFC/services/dataTypes";
import { UserDetails } from "../../../../lib/services/hdfc_login/dataTypes";
import { selectUserDetails } from "../../../../lib/services/hdfc_login/selectors";
import { errorNotification, successNotification } from "../../../../utils/notifications";
import { getPresentableValue } from "../../../Components/UtilityFunctions";
import TaggedRMsModal from "../../Common/TaggedRMs";
import UploadDocumentModal from "../Component/Modal/UploadDocumentModal";
import SalesSummaryDetail from "../Component/Modal/SalesSummaryDetail";

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

const SalesUpdate = () => {
  const dispatch = useDispatch();
  const { classes } = useStyles();

  //#region [state]
  const [showLoadingForRow, setShowLoadingForRow] = useState<string | number | null>(null);
  //#endregion
  const documentDownloadLoaders = useSelector(selectDocumentDownloadLoaders);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  //#endregion

  //#region [selector]
  const userDetails = useSelector(selectUserDetails) as UserDetails;
  const project = useSelector(selectSetProject) as Project;
  const salesPastHistoryList = useSelector(selectSalesPastHistoryList) as SalesPastHistory[];
  const salesSummaryData = useSelector(selectSalesSummaryData) as SalesSummaryData;
  const salesSummaryDetail = useSelector(selectSalesSummaryDetails) as SummaryDetailsData;
  const salesSetupPendingData = useSelector(selectPendingForApprovalData);
  const loaders = useSelector(selectSalesLoaders);
  //#endregion

  //#region [useEffect]
  useEffect(() => {
    dispatch(isSalesSetupPendingRequested(project?.REAssetId));
    return () => {
      setUploadedFile(null);
      setSelectedStatus(null);
      dispatch(salesSummaryReset());
      dispatch(salesSummaryDetailReset());
    };
  }, []);

  useEffect(() => {
    if (project) {
      dispatch(getSalesPastHistoryListRequested(project?.REAssetId, "Update"));
    }
  }, [project]);
  //#endregion

  //#region [disclosure]
  const [viewTaggedRMsModal, { open: openTaggedRMsModal, close: closeTaggedRMsModal }] = useDisclosure(false);
  const [uploadDocumentModal, { open: openUploadDocumentModal, close: closeUploadDocumentModal }] = useDisclosure(false);
  const [summaryDetailModal, { open: openSummaryDetailModal, close: closeSummaryDetailModal }] = useDisclosure(false);
  //#endregion

  const fileUploadCallback = (success: boolean, message?: string) => {
    if (success) {
      successNotification(message ?? "");
    } else {
      errorNotification(message ?? "Failed...");
    }
    setUploadedFile(null);
    setSelectedStatus(null);
    dispatch(salesSummaryReset());
    dispatch(salesSummaryDetailReset());
  };

  // delete-callback
  const onCallback = (success: boolean, message?: string) => {
    setShowLoadingForRow(null);
    if (success) {
      successNotification(message ?? "");
    } else {
      errorNotification(message ?? "");
    }
  };

  // delete-confirm-modal
  const openModal = (data: SalesPastHistory) => {
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
      onConfirm: () => dispatch(deleteSalesHistoryRequested(data?.REAssetId, data?.SaleMISHistoryId, userDetails.EmailId, onCallback)),
    });
  };

  const { finalData, SearchComponent, PaginationComponent } = useSearchAndPagination({
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

  const handelWithDrawRowData = (data: PendingSalesForApproval) => {
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
        loading: loaders.updateSalesPastHistory,
      },
      onClose: () => {
        // no action specified;
      },
      onConfirm: () =>
        dispatch(
          updateSalesPastHistoryListRequested(data?.REAssetId, data?.SaleMISHistoryId, ActionType.WITHDRAW, userDetails?.EmailId, (success: boolean) => {
            setShowLoadingForRow(null);
            onCallback(success, "Request Withdrawn!");
          }),
        ),
    });
  };

  // summary-details
  const handleOpenSummaryDetails = (status: string) => {
    if (project?.REAssetId && uploadedFile) {
      setSelectedStatus(status);
      dispatch(getSalesSummaryDetailRequested(project?.REAssetId, uploadedFile, status, salesSummaryData?.misDate ?? dayjs(new Date()).format("YYYY-MM-DD")));
      openSummaryDetailModal();
    }
  };

  const handleCloseSummaryDetails = () => {
    setSelectedStatus(null);
    closeSummaryDetailModal();
    dispatch(salesSummaryDetailReset());
  };

  // final-file-upload
  const handleFileUpload = () => {
    if (uploadedFile) {
      dispatch(
        uploadSalesTemplateRequested(
          project?.REAssetId,
          salesSummaryData?.misDate ?? dayjs(new Date()).format("YYYY-MM-DD"),
          userDetails?.entity,
          userDetails?.TemplateRoleName,
          "renoc",
          `${project?.AssetName}/salesupdate`,
          uploadedFile?.name,
          salesSummaryData?.remarks ?? "",
          uploadedFile,
          fileUploadCallback,
        ),
      );
    }
  };

  const isEnabledPage = salesSetupPendingData?.isSetup === 1 && project.status.toLowerCase() !== "draft";

  return (
    <>
      <Flex align={"flex-start"} justify={"space-between"} m={"xl"}>
        <Flex direction={"column"} gap={"xl"}>
          {!isEnabledPage && !loaders?.canUpdateSalesHistory ? <Text color='red'>Cannot update Sales MIS. Project setup status still pending</Text> : null}
          <Flex direction={"column"} gap={"xs"}>
            <Text size={"sm"} weight={500}>
              Download the project sales update template
            </Text>
            <Button
              variant='outline'
              loading={loaders?.downloadSalesTemplate}
              disabled={!isEnabledPage && !loaders?.canUpdateSalesHistory}
              rightIcon={<img src={downloadTemplate} style={{ width: "15px", height: "15px" }} className='svgColorGray' />}
              leftIcon={<img src={filexlsxIcon} style={{ width: "15px", height: "15px" }} className='svgColorGray' />}
              color='gray'
              w={300}
              onClick={() => dispatch(downloadSalesTemplateRequested(project?.REAssetId))}>
              Project Sales Update Template.xlsx
            </Button>
          </Flex>
          <Flex direction={"column"} gap={"xs"}>
            <Text size={"sm"} weight={500}>
              Upload Project Sales Update Template
            </Text>
            <Button
              disabled={!isEnabledPage && !loaders?.canUpdateSalesHistory}
              bg={"#001d56"}
              w={300}
              rightIcon={<img src={uploadDocument} style={{ width: "15px", height: "15px" }} className='svgColorWhite' />}
              leftIcon={<img src={plusIcon} style={{ width: "12px", height: "12px" }} className='svgColorWhite' />}
              onClick={openUploadDocumentModal}
              color='truboard-primary.0'>
              Select file to upload
            </Button>
            <Text color='gray' size={"xs"} weight={500} w={300}>
              <img src={InfoIcons} style={{ width: "15px", height: "15px", color: "#001d56" }} />
              Single Upload file should not be more than 5MB, only .xls and .xlsx files are allowed
            </Text>
          </Flex>
        </Flex>
      </Flex>

      {/* updated-sales-summary */}
      {salesSummaryData && salesSummaryData?.summary?.length > 0 && (
        <Card
          shadow='sm'
          radius='md'
          padding='md'
          m={"md"}
          withBorder
          style={{
            overflow: "revert",
            overflowX: "scroll",
          }}>
          <TableHeader title='Updated Sales Summary' />
          <Table fontSize={"xs"}>
            <thead className={classes.header}>
              <tr>
                <th className={classes.header} style={{ textAlign: "left" }}>
                  Sale Status
                </th>
                <th className={classes.header} style={{ textAlign: "left" }}>
                  Unit Counts
                </th>
                <th className={classes.header} style={{ textAlign: "center" }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody className={classes.body}>
              {salesSummaryData.summary.length > 0 && !loaders?.salesSummary ? (
                salesSummaryData.summary.map((item, index) => (
                  <tr key={index}>
                    <td>{item?.saleStatus}</td>
                    <td>{item?.unitcounts}</td>
                    <td align='center'>
                      <img src={viewIcon} height='15px' width='15px' alt='view' onClick={() => handleOpenSummaryDetails(item?.saleStatus)} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={salesSummaryDetail?.headers?.length}
                    style={{
                      backgroundColor: "white",
                    }}>
                    <Center mx='auto'>{loaders?.salesSummary ? <Loader size='md' /> : "No data Found!"}</Center>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
          <Flex justify='flex-end' gap='sm'>
            <Button
              variant='outline'
              onClick={() => {
                setUploadedFile(null);
                setSelectedStatus(null);
                dispatch(salesSummaryReset());
                dispatch(salesSummaryDetailReset());
              }}>
              Reset
            </Button>
            <Button color='truboard-primary.0' onClick={handleFileUpload} loading={loaders?.uploadDocument}>
              Submit
            </Button>
          </Flex>
        </Card>
      )}

      {/* table */}
      <NewTableWithActions
        loader={loaders?.salesHistoryList}
        cardHeader={<TableHeader title='Past Updates' SearchComponent={SearchComponent} PaginationComponent={PaginationComponent} />}
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
            actionTypes: [
              {
                type: "download",
                onClick: data => {
                  setShowLoadingForRow(data?.SaleMISHistoryId);
                  dispatch(
                    downloadRowDataRequest(data?.FileContainer, data?.FilePath, data?.FileName, (success: boolean) => {
                      setShowLoadingForRow(null);
                    }),
                  );
                },
                loading(row) {
                  return showLoadingForRow === row?.SaleMISHistoryId && documentDownloadLoaders.downloadRowData;
                },
              },
              {
                type: "delete",
                onClick: data => {
                  setShowLoadingForRow(data?.SaleMISHistoryId);
                  openModal(data);
                },
                override: rowdata => {
                  return {
                    icon: rowdata.Status === "Approved" ? RemoveIcon : null,
                    tooltip: rowdata.Status === "Approved" ? "Delete" : "",
                  };
                },
                loading(row) {
                  return showLoadingForRow === row?.SaleMISHistoryId && loaders.deleteSalesHistory;
                },
              },
              {
                type: "withDraw",
                onClick: row => {
                  handelWithDrawRowData(row);
                  setShowLoadingForRow(row?.SaleMISHistoryId);
                },
                override: rowData => {
                  return {
                    icon: rowData.Status === "Pending" ? withDrawn : null,
                    tooltip: rowData.Status === "Pending" ? "Withdraw" : "",
                  };
                },
                loading(row) {
                  return showLoadingForRow === row?.SaleMISHistoryId && loaders.updateSalesPastHistory;
                },
              },
            ],
          },
        ]}
        data={finalData}
      />

      {summaryDetailModal && (
        <SalesSummaryDetail
          open={summaryDetailModal}
          selectedStatus={selectedStatus}
          salesSummaryDetail={salesSummaryDetail}
          dataLoader={loaders?.salesSummaryDetail}
          onClose={handleCloseSummaryDetails}
        />
      )}
      {/* modals */}
      <TaggedRMsModal open={viewTaggedRMsModal} onClose={closeTaggedRMsModal} />
      {isEnabledPage ? (
        <UploadDocumentModal open={uploadDocumentModal} projectId={project?.REAssetId} onClose={closeUploadDocumentModal} setUploadedFile={setUploadedFile} />
      ) : null}
    </>
  );
};

export default SalesUpdate;
