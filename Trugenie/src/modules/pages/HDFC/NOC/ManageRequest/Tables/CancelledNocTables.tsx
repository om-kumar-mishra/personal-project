import { Box, Loader, Text } from "@mantine/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import downloadIcon from "../../../../../../assets/logos/download.svg";
import useSearchAndPagination from "../../../../../../hooks/useSearchAndPagination";
import { downloadCancelledNOCRequested, getCancelledNOCListRequested } from "../../../../../../lib/services/HDFC/NOCManageRequest/actions";
import { selectManageRequestLoaders, selectedCancelledNOCList } from "../../../../../../lib/services/HDFC/NOCManageRequest/selectors";
import { selectSetProject } from "../../../../../../lib/services/HDFC/Project/selectors";
import { selectUserDetails } from "../../../../../../lib/services/hdfc_login/selectors";
import NewTableWithActions, { TableHeader } from "../../../../../../widgets/tables/MantineTable/NewTableWithActions";
import { getPresentableValue, successNotification } from "../../../../../Components/UtilityFunctions";
const CancelledNocTable = ({ handleOnClick }: { handleOnClick: (data: any) => void }) => {
  const dispatch = useDispatch();
  const selectedProject = useSelector(selectSetProject);
  const userDetails = useSelector(selectUserDetails);
  const loaders = useSelector(selectManageRequestLoaders);

  const cancelledNOCList = useSelector(selectedCancelledNOCList);

  useEffect(() => {
    selectedProject?.NocProjectId && dispatch(getCancelledNOCListRequested(selectedProject?.NocProjectId || 0, userDetails?.EmailId ?? ""));
  }, [selectedProject?.NocProjectId]);

  const downloadCancelledNocList = () => {
    dispatch(
      downloadCancelledNOCRequested(selectedProject?.NocProjectId || 0, userDetails?.EmailId ?? "", (success: boolean) => {
        if (success) {
          successNotification("Downloaded Successfully!");
        }
      }),
    );
  };

  const { finalData, SearchComponent, PaginationComponent } = useSearchAndPagination({
    data: cancelledNOCList ?? [],
    columnsToSearch: [
      { accessorKey: "unitrequestid", type: "text" },
      { accessorKey: "uniqueref", type: "text" },
      { accessorKey: "PurchaserName", type: "text" },
      { accessorKey: "NOCCancelled", type: "date" },
      { accessorKey: "nocreturnedon", type: "date" },
    ],
    itemsPerPageData: [10, 20, 30, 40, 50],
    showItemsPerPageDropdown: true,
    showPaginationWithSearch: false,
  });

  return (
    <Box>
      <NewTableWithActions
        loader={loaders.getCancelledNOCList}
        cardHeader={
          <TableHeader
            title='Cancelled NOCs'
            SearchComponent={
              <>
                {loaders.downloadCancelledNOC ? (
                  <Loader size={"xs"} />
                ) : (
                  <img src={downloadIcon} style={{ height: "15px", width: "15px", cursor: "pointer" }} onClick={downloadCancelledNocList} />
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
          { title: "NOC Cancelled On", accessorKey: "NOCCancelled", transform: value => <Text title={getPresentableValue(value, true, false, false) as string}>{getPresentableValue(value, true, false, false) as string}</Text> },
          {
            title: "Original Noc Returned On",
            accessorKey: "nocreturnedon",
            transform: (value: string) => (
              <Text title={getPresentableValue(value, true, false, false) as string} color={value === "Not Updated" ? "red" : "green"}>{getPresentableValue(value, true, false, false) as string}</Text>
            ),
          },
        ]}
        data={finalData}
      />
    </Box>
  );
};

export default CancelledNocTable;
