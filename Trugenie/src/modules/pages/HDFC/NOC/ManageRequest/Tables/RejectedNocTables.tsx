import { Box, Loader, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import downloadIcon from "../../../../../../assets/logos/download.svg";
import useSearchAndPagination from "../../../../../../hooks/useSearchAndPagination";
import { downloadRejectedNOCRequested, requestRejectedNOCList } from "../../../../../../lib/services/HDFC/NOCManageRequest/actions";
import { RejectedDataType } from "../../../../../../lib/services/HDFC/NOCManageRequest/dataTypes";
import { selectManageRequestLoaders, selectedRejectedNOCList } from "../../../../../../lib/services/HDFC/NOCManageRequest/selectors";
import { selectSetProject } from "../../../../../../lib/services/HDFC/Project/selectors";
import { selectUserDetails } from "../../../../../../lib/services/hdfc_login/selectors";
import NewTableWithActions, { TableHeader } from "../../../../../../widgets/tables/MantineTable/NewTableWithActions";
import { getPresentableValue, successNotification } from "../../../../../Components/UtilityFunctions";
import ViewDocumentModal from "../Modal/ViewDocumentModal";
const RejectedNocTables = ({ handleOnClick }: { handleOnClick: (data: any) => void }) => {
  const dispatch = useDispatch();
  const selectedProject = useSelector(selectSetProject);
  const userDetails = useSelector(selectUserDetails);
  const loaders = useSelector(selectManageRequestLoaders);

  const rejectedNocList = useSelector(selectedRejectedNOCList);

  const [modalData, setModalData] = useState<RejectedDataType | null>(null);
  const [isViewDocumentModalOpened, { open: openViewDocumentModal, close: closeViewDocumentModal }] = useDisclosure(false);

  useEffect(() => {
    selectedProject?.NocProjectId && dispatch(requestRejectedNOCList(selectedProject?.NocProjectId || 0, userDetails?.EmailId ?? ""));
  }, [selectedProject?.NocProjectId]);

  const downloadRejectedNocList = () => {
    dispatch(
      downloadRejectedNOCRequested(selectedProject?.NocProjectId || 0, userDetails?.EmailId ?? "", (success: boolean) => {
        if (success) {
          successNotification("Downloaded Successfully!");
        }
      }),
    );
  };

  const { finalData, SearchComponent, PaginationComponent } = useSearchAndPagination({
    data: rejectedNocList ?? [],
    columnsToSearch: [
      { accessorKey: "unitrequestid", type: "text" },
      { accessorKey: "uniqueref", type: "text" },
      { accessorKey: "PurchaserName", type: "text" },
      { accessorKey: "NOCRejected", type: "date" },
      { accessorKey: "nocrejectedby", type: "text" },
      { accessorKey: "Requesttype", type: "text" },
      { accessorKey: "TypeOfNoc", type: "text" },
    ],
    itemsPerPageData: [10, 20, 30, 40, 50],
    showItemsPerPageDropdown: true,
    showPaginationWithSearch: false,
  });

  return (
    <Box>
      <NewTableWithActions
        loader={loaders.getRejectedNOCList}
        cardHeader={
          <TableHeader
            title='Rejected NOCs'
            SearchComponent={
              <>
                {loaders.getRejectedNOCList ? (
                  <Loader size={"xs"} />
                ) : (
                  <img src={downloadIcon} style={{ height: "15px", width: "15px", cursor: "pointer" }} onClick={downloadRejectedNocList} />
                )}
                {SearchComponent}
              </>
            }
            PaginationComponent={PaginationComponent}
          />
        }
        columns={[
          { title: "Unit Request Id", accessorKey: "unitrequestid", onClick: rowData => handleOnClick(rowData) },
          { title: "Unit", accessorKey: "uniqueref" },
          { title: "Purchaser", accessorKey: "PurchaserName" },
          {
            title: "Request Raised On",
            accessorKey: "RequestDate",
            transform: value => (
              <Text title={getPresentableValue(value, true, false, false) as string}>{getPresentableValue(value, true, false, false) as string}</Text>
            ),
          },
          {
            title: "NOC Rejected On",
            accessorKey: "NOCRejected",
            transform: value => (
              <Text title={getPresentableValue(value, true, false, false) as string}>{getPresentableValue(value, true, false, false) as string}</Text>
            ),
          },
          { title: "NOC Rejected By", accessorKey: "nocrejectedby" },
          { title: "Type Of Request", accessorKey: "Requesttype" },
          { title: "NOC Type", accessorKey: "TypeOfNoc" },
          {
            title: "Action",
            accessorKey: "actions",
            actionTypes: [
              {
                type: "document",
                onClick: rowData => {
                  setModalData(rowData);
                  openViewDocumentModal();
                },
              },
            ],
          },
        ]}
        data={finalData}
      />
      <ViewDocumentModal
        open={isViewDocumentModalOpened}
        onClose={() => {
          setModalData(null);
          closeViewDocumentModal();
        }}
        modalData={modalData}
      />
    </Box>
  );
};

export default RejectedNocTables;
