import { Box, Checkbox, Loader, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import downloadIcon from "../../../../../../assets/logos/download.svg";
import useSearchAndPagination from "../../../../../../hooks/useSearchAndPagination";
import {
  downloadHoldNOCRequested,
  downloadPendingNOCRequested,
  getHoldNOCRequested,
  getNOCRequestTimelineFailed,
  getPendingNOCListRequested,
} from "../../../../../../lib/services/HDFC/NOCManageRequest/actions";
import { HoldDataType, PendingNOCDataType } from "../../../../../../lib/services/HDFC/NOCManageRequest/dataTypes";
import { selectManageRequestLoaders, selectedHoldNOCList, selectedPendingNOCList } from "../../../../../../lib/services/HDFC/NOCManageRequest/selectors";
import { selectSetProject } from "../../../../../../lib/services/HDFC/Project/selectors";
import { selectUserDetails } from "../../../../../../lib/services/hdfc_login/selectors";
import { ROUTES } from "../../../../../../routeConstants";
import { successNotification } from "../../../../../../utils/notifications";
import NewTableWithActions, { TableHeader } from "../../../../../../widgets/tables/MantineTable/NewTableWithActions";
import { getPresentableValue } from "../../../../../Components/UtilityFunctions";
import NOCTimelineModal from "../Modal/NOC-TimelineModal";
import RemarksModal from "../Modal/RemarksModal";
import ViewDocumentModal from "../Modal/ViewDocumentModal";
const PendingNocTables = ({ handleOnClick }: { handleOnClick: (data: any) => void }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMineOnly, setShowMineOnly] = useState<boolean>(true);
  const [showMineOnlySentBack, setShowMineOnlySentBack] = useState<boolean>(true);
  const [modalData, setModalData] = useState<PendingNOCDataType | HoldDataType | null>(null);

  const loaders = useSelector(selectManageRequestLoaders);
  const selectedProject = useSelector(selectSetProject);
  const pendingNOCList = useSelector(selectedPendingNOCList);
  const holdNocList = useSelector(selectedHoldNOCList);
  const userDetails = useSelector(selectUserDetails);

  useEffect(() => {
    selectedProject && dispatch(getPendingNOCListRequested(selectedProject?.NocProjectId || 0, Number(showMineOnly), userDetails?.EmailId ?? ""));
  }, [showMineOnly]);

  useEffect(() => {
    selectedProject && dispatch(getHoldNOCRequested(selectedProject?.NocProjectId || 0, Number(showMineOnlySentBack), userDetails?.EmailId ?? ""));
  }, [showMineOnlySentBack]);

  const downloadPendingNocList = () => {
    selectedProject &&
      dispatch(
        downloadPendingNOCRequested(selectedProject?.NocProjectId || 0, Number(showMineOnly), userDetails?.EmailId ?? "", (success: boolean) => {
          if (success) {
            successNotification("Downloaded Successfully!");
          }
        }),
      );
  };

  const downloadHoldNocList = () => {
    selectedProject &&
      dispatch(
        downloadHoldNOCRequested(selectedProject?.NocProjectId || 0, Number(showMineOnlySentBack), userDetails?.EmailId ?? "", (success: boolean) => {
          if (success) {
            successNotification("Downloaded Successfully!");
          }
        }),
      );
  };

  const { finalData, SearchComponent, PaginationComponent } = useSearchAndPagination({
    data: pendingNOCList || [],
    columnsToSearch: [
      { accessorKey: "unitrequestid", type: "text" },
      { accessorKey: "uniqueref", type: "text" },
      { accessorKey: "PurchaserName", type: "text" },
      { accessorKey: "RequestDate", type: "text" },
      { accessorKey: "TypeOfNoc", type: "text" },
      { accessorKey: "status", type: "text" },
      { accessorKey: "LastActionBy", type: "text" },
      { accessorKey: "LastActionOn", type: "date" },
    ],
    itemsPerPageData: [10, 20, 30, 40, 50],
    showItemsPerPageDropdown: true,
    showPaginationWithSearch: false,
  });

  const {
    finalData: SendBackFinalData,
    SearchComponent: SendBackSearchComponent,
    PaginationComponent: SendBackPaginationComponent,
  } = useSearchAndPagination({
    data: holdNocList || [],
    columnsToSearch: [
      { accessorKey: "unitrequestid", type: "text" },
      { accessorKey: "uniqueref", type: "text" },
      { accessorKey: "PurchaserName", type: "text" },
      { accessorKey: "RequestDate", type: "date" },
      { accessorKey: "TypeOfNoc", type: "text" },
      { accessorKey: "status", type: "text" },
      { accessorKey: "holdbyname", type: "text" },
    ],
    itemsPerPageData: [10, 20, 30, 40, 50],
    showItemsPerPageDropdown: true,
    showPaginationWithSearch: false,
  });

  const [isViewDocumentModalOpened, { open: openViewDocumentModal, close: closeViewDocumentModal }] = useDisclosure(false);

  const [isNOCTimelineModalOpened, { open: openNOCTimelineModal, close: closeNOCTimelineModal }] = useDisclosure(false);

  const [isRemarksModalOpened, { open: openRemarksModal, close: closeRemarksModal }] = useDisclosure(false);

  return (
    <>
      <Box>
        <NewTableWithActions
          loader={loaders.getPendingNOCList}
          cardHeader={
            <TableHeader
              title='NOCs In Workflow'
              SearchComponent={
                <>
                  {loaders.downloadPendingNOC ? (
                    <Loader size={"xs"} />
                  ) : (
                    <img src={downloadIcon} style={{ height: "15px", width: "15px", cursor: "pointer" }} onClick={downloadPendingNocList} />
                  )}
                  {SearchComponent}
                  <Checkbox
                    color='truboard-primary.0'
                    checked={showMineOnly}
                    onChange={() => {
                      setShowMineOnly(!showMineOnly);
                    }}
                    label='Show only my deliverables'
                  />
                </>
              }
              PaginationComponent={<>{PaginationComponent}</>}
            />
          }
          columns={[
            { title: "Unit Request Id", accessorKey: "unitrequestid", onClick: rowData => handleOnClick(rowData) },
            { title: "Unit", accessorKey: "uniqueref" },
            { title: "Purchaser", accessorKey: "PurchaserName" },
            {
              title: "Request Raised Date",
              accessorKey: "RequestDate",
              transform: value => (
                <Text title={getPresentableValue(value, true, false, false) as string}>{getPresentableValue(value, true, false, false) as string}</Text>
              ),
            },
            { title: "Type of Noc", accessorKey: "TypeOfNoc" },
            { title: "Current Status", accessorKey: "status" },
            { title: "Last Action By", accessorKey: "LastActionBy" },
            {
              title: "Last Action On",
              accessorKey: "LastActionOn",
              transform: value => (
                <Text title={getPresentableValue(value, true, false, false) as string}>{getPresentableValue(value, true, false, false) as string}</Text>
              ),
            },
            {
              title: "Actions",
              accessorKey: "actions",
              actionTypes: [
                {
                  type: "document",
                  onClick: rowData => {
                    setModalData(rowData);
                    openViewDocumentModal();
                  },
                  override: () => ({ tooltip: "View Document" }),
                },
                {
                  type: "decision",
                  onClick: rowData =>
                    navigate(
                      rowData.Requesttype === "New Request" || rowData.Requesttype === "Final NOC"
                        ? rowData.WorkFlowPriority === 6
                          ? ROUTES.AUTHORIZATION_ISSUE_REQUEST_PAGE
                          : ROUTES.AUTHORIZATION_REQUEST_PAGE
                        : ROUTES.AUTHORIZATION_CANCEL_REQUEST_PAGE,
                      {
                        state: {
                          requestData: rowData,
                          decision: true,
                          cancelNoc: rowData.Requesttype !== "New Request" && rowData.Requesttype !== "Final NOC",
                        },
                      },
                    ),
                  override: rowData =>
                    rowData.Requesttype === "New Request" || rowData.Requesttype === "Final NOC"
                      ? rowData.WorkFlowPriority === 6
                        ? { tooltip: "Issue", color: "filter-green" }
                        : { tooltip: "Decision", color: "filter-blue" }
                      : { tooltip: "Cancel NOC", color: "filter-red" },
                  disabled: row => row.isactive === 0,
                },
                {
                  type: "timeline",
                  onClick: rowData => {
                    setModalData(rowData);
                    openNOCTimelineModal();
                  },
                  override: () => ({ tooltip: "View Timeline" }),
                },
              ],
            },
          ]}
          data={finalData}
          rowDisable={row => row.isactive === 0}
        />

        <NewTableWithActions
          loader={loaders.getHoldNOCList}
          cardHeader={
            <TableHeader
              title='NOCs Sent Back'
              SearchComponent={
                <>
                  {loaders.downloadHoldNOC ? (
                    <Loader size={"xs"} />
                  ) : (
                    <img src={downloadIcon} style={{ height: "15px", width: "15px", cursor: "pointer" }} onClick={downloadHoldNocList} />
                  )}
                  {SendBackSearchComponent}
                  <Checkbox
                    color='truboard-primary.0'
                    checked={showMineOnlySentBack}
                    onChange={() => {
                      setShowMineOnlySentBack(!showMineOnlySentBack);
                    }}
                    label='Show only my deliverables'
                  />
                </>
              }
              PaginationComponent={<>{SendBackPaginationComponent}</>}
            />
          }
          columns={[
            { title: "Unit Request Id", accessorKey: "unitrequestid", onClick: rowData => handleOnClick(rowData) },
            { title: "Unit", accessorKey: "uniqueref" },
            { title: "Purchaser", accessorKey: "PurchaserName" },
            {
              title: "Request Raised Date",
              accessorKey: "RequestDate",
              transform: value => (
                <Text title={getPresentableValue(value, true, false, false) as string}>{getPresentableValue(value, true, false, false) as string}</Text>
              ),
            },
            { title: "Type Of Noc", accessorKey: "TypeOfNoc" },
            { title: "Current Status", accessorKey: "status" },
            { title: "Send Back By", accessorKey: "holdbyname" },
            {
              title: "Actions",
              accessorKey: "actions",
              actionTypes: [
                {
                  type: "decision",
                  onClick: rowData =>
                    navigate(
                      rowData.Requesttype === "New Request" || rowData.Requesttype === "Final NOC"
                        ? rowData.WorkFlowPriority === 6
                          ? ROUTES.AUTHORIZATION_ISSUE_REQUEST_PAGE
                          : ROUTES.AUTHORIZATION_REQUEST_PAGE
                        : ROUTES.AUTHORIZATION_CANCEL_REQUEST_PAGE,
                      {
                        state: {
                          requestData: rowData,
                          decision: true,
                          cancelNoc: rowData.Requesttype !== "New Request" && rowData.Requesttype !== "Final NOC",
                        },
                      },
                    ),
                  override: rowData =>
                    rowData.Requesttype === "New Request" || rowData.Requesttype === "Final NOC"
                      ? rowData.WorkFlowPriority === 6
                        ? { tooltip: "Issue", color: "filter-green" }
                        : { tooltip: "Decision", color: "filter-blue" }
                      : { tooltip: "Cancel NOC", color: "filter-red" },
                  disabled: row => row.cancontinuehold === 0 || row.isactive === 0,
                },
                {
                  type: "document",
                  onClick: rowData => {
                    setModalData(rowData);
                    openViewDocumentModal();
                  },
                  override: () => ({ tooltip: "View Document" }),
                },
                {
                  type: "remarks",
                  onClick: rowData => {
                    setModalData(rowData);
                    openRemarksModal();
                  },
                  disabled: row => row.isactive === 0,
                  // override: rowData => {
                  //   console.log({ rowData });
                  //   return {
                  //     icon: Number(rowData.cancontinuehold === 1) ? remarksIcon : null,
                  //     tooltip: Number(rowData.cancontinuehold === 1) ? "Remarks" : null,
                  //   };
                  // },
                },
              ],
            },
          ]}
          data={SendBackFinalData}
          rowDisable={row => row.isactive === 0}
        />
      </Box>

      {/* modals */}
      <ViewDocumentModal
        open={isViewDocumentModalOpened}
        onClose={() => {
          setModalData(null);
          closeViewDocumentModal();
        }}
        modalData={modalData}
      />

      {isNOCTimelineModalOpened && (
        <NOCTimelineModal
          open={isNOCTimelineModalOpened}
          onClose={() => {
            setModalData(null);
            dispatch(getNOCRequestTimelineFailed());
            closeNOCTimelineModal();
          }}
          modalData={modalData}
        />
      )}

      <RemarksModal
        open={isRemarksModalOpened}
        onClose={() => {
          setModalData(null);
          closeRemarksModal();
        }}
        modalData={modalData}
      />
    </>
  );
};

export default PendingNocTables;
