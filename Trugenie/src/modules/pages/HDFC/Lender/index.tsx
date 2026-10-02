import { Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect,useState } from "react";
import { useDispatch, useSelector, } from "react-redux";
import addLogo from "../../../../assets/logos/SVG/add_new.svg";
import useSearchAndPagination from "../../../../hooks/useSearchAndPagination";
import { selectUserDetails } from "../../../../lib/services/hdfc_login/selectors";
import NewTableWithActions, { TableHeader } from "../../../../widgets/tables/MantineTable/NewTableWithActions";
import CommonAddButton from "../../../Components/Buttons";
import AddLenderPageModal from "./AddLenderPage";
import { selectLenderList, selectLenderLoaders } from "../../../../lib/services/HDFC/Lender/selector";
import { GetLenderListRequested, GetClientUserListRequested } from "../../../../lib/services/HDFC/Lender/actions";
import {GetEntityUserRequestAction } from "../../../../lib/services/nocSetup/action"
import { LenderListData } from "../../../../lib/services/HDFC/Lender/dataTypes";
import AddUserPageModal from './AddUserPage'
import ViewLenderUserPageModal from "./ViewLenderUserModal";
import { GetClientData } from "../../../../lib/services/HDFC/Commons/dataTypes";
import { selectSwitchClient } from "../../../../lib/services/HDFC/Commons/selectors";

function LenderPage() {
  const dispatch = useDispatch();
  const lenderList = useSelector(selectLenderList);
  const userDetails = useSelector(selectUserDetails);
  const loaders = useSelector(selectLenderLoaders);
  //TO DO: Replace with createdby from loggedin user after login api implementation
  useEffect(() => {
    dispatch(GetLenderListRequested(userDetails?.ClientId ?? 1,userDetails?.EmailId ?? ""));
    dispatch(GetClientUserListRequested(userDetails?.ClientId ?? 1))
    // dispatch(getRMUserListRequested(userDetails?.EmailId ?? ""));
  }, []);
  const activeClient = useSelector(selectSwitchClient) as GetClientData;

  useEffect(() => {
    activeClient.ClientId && userDetails?.EmailId && dispatch(GetLenderListRequested(activeClient.ClientId, userDetails?.EmailId ?? ""));
  }, [activeClient.ClientId, userDetails?.EmailId]);

  const [AddModalState, { open: openAddModal, close: closeAddModal }] = useDisclosure(false);

  const [AddUserModalState, { open: openAddUserModal, close: closeAddUserModal }] = useDisclosure(false);

  const [ViewModalState, { open: openViewModal, close: closeViewModal }] = useDisclosure(false);
  

  const [selectedRow, setSelectRow] = useState<LenderListData | null>(null);

  const [data, setData] = useState<LenderListData | null>(null);
  const { finalData, SearchComponent, PaginationComponent } = useSearchAndPagination({
    data: lenderList ?? [],
    columnsToSearch: [
      { accessorKey: "LenderName", type: "text" },
      { accessorKey: "ClientName", type: "text" },
      { accessorKey: "CIN", type: "text" },
      { accessorKey: "CreatedBy", type: "text" },
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
          title='Add Lender'
        />
      </Flex>
      <NewTableWithActions
        loader={loaders?.lenderList}
        cardHeader={<TableHeader title='Lender' SearchComponent={SearchComponent} PaginationComponent={PaginationComponent} />}
        columns={[
          {
            title: "Lender Name",
            accessorKey: "LenderName",
          },
          { title: "Client Name", accessorKey: "ClientName" },
          { title: "CIN", accessorKey: "CIN" },
          // { title: "Created By", accessorKey: "CreatedBy" },
          // {
          //   title: "Created At",
          //   accessorKey: "CreatedAt",
          // },
          {
            title: "Actions",
            accessorKey: "actions",
            actionTypes: [
              {
                type: "Add",
                onClick: (rowData) => {
                  // if (project?.REAssetId) {
                    setSelectRow(rowData)
                    openViewModal();
                    // Uncomment and modify this line as necessary
                    dispatch(GetEntityUserRequestAction(rowData.LenderDetailId, 3));
                  // }
                },
              },
            ],
          },
        ]}
        data={finalData}
      />
      <ViewLenderUserPageModal selectedRow={selectedRow}  open={ViewModalState} onClose={closeViewModal}/>
      {/* <AddUserPageModal setSelectRow={setSelectRow} open={AddUserModalState} onClose={closeAddUserModal} /> */}
      <AddLenderPageModal open={AddModalState} onClose={closeAddModal} />
    </>
  );
}

export default LenderPage;
