import { Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import addLogo from "../../../../assets/logos/SVG/add_new.svg";
import useSearchAndPagination from "../../../../hooks/useSearchAndPagination";
import { selectUserDetails } from "../../../../lib/services/hdfc_login/selectors";
import NewTableWithActions, { TableHeader } from "../../../../widgets/tables/MantineTable/NewTableWithActions";
import CommonAddButton from "../../../Components/Buttons";
import AddDebentureTrusteePage from "./AddDebentureTrusteePage";
import { selectDebentureList, selectDebentureLoaders } from "../../../../lib/services/HDFC/Debenture Trustee/selector";
import { GetDebentureListRequested } from "../../../../lib/services/HDFC/Debenture Trustee/actions";
import { GetClientData } from "../../../../lib/services/HDFC/Commons/dataTypes";
import { selectSwitchClient } from "../../../../lib/services/HDFC/Commons/selectors";
import ViewUserPageModal from "./ViewUserModal";
import {DebentureListData } from "../../../../lib/services/HDFC/Debenture Trustee/dataTypes"
import {GetEntityUserRequestAction } from "../../../../lib/services/nocSetup/action"
import { GetClientUserListRequested } from "../../../../lib/services/HDFC/Lender/actions";
import { getExternalUserListRequested } from "../../../../lib/services/HDFC/ExternalUser/actions";

function DebentureTrusteePage() {
  const dispatch = useDispatch();
  const debentureList = useSelector(selectDebentureList);
  const userDetails = useSelector(selectUserDetails);
  const loaders = useSelector(selectDebentureLoaders);
  const activeClient = useSelector(selectSwitchClient) as GetClientData;

  useEffect(() => {
    activeClient.ClientId && userDetails?.EmailId && dispatch(GetDebentureListRequested(activeClient.ClientId, userDetails?.EmailId ?? ""))&& dispatch(getExternalUserListRequested(userDetails?.EmailId, activeClient.ClientId));
  }, [activeClient.ClientId, userDetails?.EmailId]);

  const [AddModalState, { open: openAddModal, close: closeAddModal }] = useDisclosure(false);
  const [ViewUserModalState, { open: openUserViewModal, close: closeUserViewModal }] = useDisclosure(false);
  const [selectedRow, setSelectRow] = useState<DebentureListData | null>(null);

  const { finalData, SearchComponent, PaginationComponent } = useSearchAndPagination({
    data: debentureList ?? [],
    columnsToSearch: [
      { accessorKey: "ClientName", type: "text" },
      { accessorKey: "DebentureName", type: "text" },
      { accessorKey: "CIN", type: "text" },
      { accessorKey: "CreatedBy", type: "text" },
    ],
    itemsPerPageData: [10, 20, 30, 40, 50],
    showItemsPerPageDropdown: true,
    showPaginationWithSearch: false,
  });
  console.log("debentureList", debentureList);

  return (
    <>
      <Flex justify={"flex-end"} align={"center"} m={"md"}>
        <CommonAddButton
          handleClick={openAddModal}
          leftIcon={<img src={addLogo} style={{ width: "20px", height: "20px", filter: "invert(1)" }} />}
          title='Add Debenture'
        />
      </Flex>
      <NewTableWithActions
        loader={loaders?.debentureList}
        cardHeader={<TableHeader title='Debenture Trustee' SearchComponent={SearchComponent} PaginationComponent={PaginationComponent} />}
        columns={[
          {
            title: "Client Name",
            accessorKey: "ClientName",
          },
          { title: "Debenture Name", accessorKey: "DebentureName" },
          { title: "CIN", accessorKey: "CIN" },
          // { title: "Created By", accessorKey: "CreatedBy" },
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
                    dispatch(GetEntityUserRequestAction(rowData.DebentureId, 1));
                  // }
                },
              },
            ],
          },
        ]}
        data={finalData}
      />
      <ViewUserPageModal selectedRow={selectedRow}  open={ViewUserModalState} onClose={closeUserViewModal}/>
      <AddDebentureTrusteePage open={AddModalState} onClose={closeAddModal} />
    </>
  );
}

export default DebentureTrusteePage;
