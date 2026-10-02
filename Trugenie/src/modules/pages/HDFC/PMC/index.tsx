import { Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import addLogo from "../../../../assets/logos/SVG/add_new.svg";
import useSearchAndPagination from "../../../../hooks/useSearchAndPagination";
import { selectUserDetails } from "../../../../lib/services/hdfc_login/selectors";
import NewTableWithActions, { TableHeader } from "../../../../widgets/tables/MantineTable/NewTableWithActions";
import CommonAddButton from "../../../Components/Buttons";
import AddPMCPage from "./AddPMCPage";
import { selectPMCList, selectPMCLoaders } from "../../../../lib/services/HDFC/PMC/selector";
import { GetPMCListRequested } from "../../../../lib/services/HDFC/PMC/actions";
import { selectSwitchClient } from "../../../../lib/services/HDFC/Commons/selectors";
import { GetClientData } from "../../../../lib/services/HDFC/Commons/dataTypes";
import {PMCListData} from "../../../../lib/services/HDFC/PMC/dataTypes"
import ViewUserPageModal from "./ViewUserModal";
import {GetEntityUserRequestAction } from "../../../../lib/services/nocSetup/action"
import { GetClientUserListRequested } from "../../../../lib/services/HDFC/Lender/actions";

function PMCPage() {
  const dispatch = useDispatch();
  const pmcList = useSelector(selectPMCList);
  const userDetails = useSelector(selectUserDetails);
  const loaders = useSelector(selectPMCLoaders);
  const activeClient = useSelector(selectSwitchClient) as GetClientData;

  useEffect(() => {
    activeClient.ClientId && userDetails?.EmailId && dispatch(GetPMCListRequested(activeClient.ClientId, userDetails?.EmailId ?? ""))&& dispatch(GetClientUserListRequested(userDetails?.ClientId ?? 1));
  }, [activeClient.ClientId, userDetails?.EmailId]);

  const [AddModalState, { open: openAddModal, close: closeAddModal }] = useDisclosure(false);
  const [ViewUserModalState, { open: openUserViewModal, close: closeUserViewModal }] = useDisclosure(false);
  const [selectedRow, setSelectRow] = useState<PMCListData | null>(null);

  const { finalData, SearchComponent, PaginationComponent } = useSearchAndPagination({
    data: pmcList ?? [],
    columnsToSearch: [
      { accessorKey: "PMCName", type: "text" },
      { accessorKey: "CIN", type: "text" },
      { accessorKey: "ClientName", type: "text" },
      { accessorKey: "CreatedAt", type: "text" },
    ],
    itemsPerPageData: [10, 20, 30, 40, 50],
    showItemsPerPageDropdown: true,
    showPaginationWithSearch: false,
  });

  return (
    <>
      <Flex justify={"flex-end"} align={"center"} m={"md"}>
        <CommonAddButton
          handleClick={openAddModal}
          leftIcon={<img src={addLogo} style={{ width: "20px", height: "20px", filter: "invert(1)" }} />}
          title='Add PMC'
        />
      </Flex>
      <NewTableWithActions
        loader={loaders?.pmcList}
        cardHeader={<TableHeader title='PMC' SearchComponent={SearchComponent} PaginationComponent={PaginationComponent} />}
        columns={[
          {
            title: "Name",
            accessorKey: "PMCName",
          },
          { title: "CIN", accessorKey: "CIN" },
          { title: "Client", accessorKey: "ClientName" },
          // { title: "Created At", accessorKey: "CreatedAt" },
          {
            title: "Actions",
            accessorKey: "actions",
            actionTypes: [
              {
                type: "Add",
                onClick: (rowData) => {
                  // if (project?.REAssetId) {
                    setSelectRow(rowData)
                    openUserViewModal();
                    // Uncomment and modify this line as necessary
                    dispatch(GetEntityUserRequestAction(rowData.PMCDetailId, 5));
                  // }
                },
              },
            ],
          },
        ]}
        data={finalData}
      />
       <ViewUserPageModal selectedRow={selectedRow}  open={ViewUserModalState} onClose={closeUserViewModal}/>
      <AddPMCPage open={AddModalState} onClose={closeAddModal} />
    </>
  );
}

export default PMCPage;
