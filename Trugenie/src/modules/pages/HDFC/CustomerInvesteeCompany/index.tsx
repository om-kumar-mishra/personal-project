import { Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import addLogo from "../../../../assets/logos/SVG/add_new.svg";
import useSearchAndPagination from "../../../../hooks/useSearchAndPagination";
import { getCustomerInvesteeListRequested } from "../../../../lib/services/HDFC/CustomerInvesteeCompany/actions";
import { CustomerInvesteeListDataType } from "../../../../lib/services/HDFC/CustomerInvesteeCompany/dataTypes";
import { selectCustomerInvesteeList, selectCustomerInvesteeLoaders } from "../../../../lib/services/HDFC/CustomerInvesteeCompany/selectors";
import { selectUserDetails } from "../../../../lib/services/hdfc_login/selectors";
import NewTableWithActions, { TableHeader } from "../../../../widgets/tables/MantineTable/NewTableWithActions";
import CommonAddButton from "../../../Components/Buttons";
import AddCustomerInvesteeCompanyModal from "./AddCustomerInvesteeCompany";
import EditCustomerInvesteeCompanyModal from "./EditCustomerInvesteeCompany";
import ViewCustomerInvesteeModal from "./ViewCustomerInvesteeCompany";
import { UserDetails } from "../../../../lib/services/hdfc_login/dataTypes";
import { selectSwitchClient } from "../../../../lib/services/HDFC/Commons/selectors";
import { GetClientData } from "../../../../lib/services/HDFC/Commons/dataTypes";
import ViewUserPageModal from "./ViewUserModal";
import {GetEntityUserRequestAction } from "../../../../lib/services/nocSetup/action"
import { GetLenderListRequested, GetClientUserListRequested } from "../../../../lib/services/HDFC/Lender/actions";
import { getExternalUserListRequested } from "../../../../lib/services/HDFC/ExternalUser/actions";


function CustomerInvesteeCompany() {
  const dispatch = useDispatch();
  const customerInvesteeList = useSelector(selectCustomerInvesteeList);
  const userDetails = useSelector(selectUserDetails) as UserDetails;
  const loaders = useSelector(selectCustomerInvesteeLoaders);
  const activeClient = useSelector(selectSwitchClient) as GetClientData;

  useEffect(() => {
    activeClient.ClientId && userDetails?.EmailId && dispatch(getCustomerInvesteeListRequested(activeClient.ClientId, userDetails.EmailId)) && dispatch(getExternalUserListRequested(userDetails?.EmailId, activeClient.ClientId));
  
  }, [userDetails?.EmailId, activeClient.ClientId]);

  const [ModalState, { open: openModal, close: closeModal }] = useDisclosure(false);
  const [AddModalState, { open: openAddModal, close: closeAddModal }] = useDisclosure(false);
  const [ViewModalState, { open: openViewModal, close: closeViewModal }] = useDisclosure(false);
  const [ViewUserModalState, { open: openUserViewModal, close: closeUserViewModal }] = useDisclosure(false); 

  const [data, setData] = useState<CustomerInvesteeListDataType | null>(null);
  const [selectedRow, setSelectRow] = useState<CustomerInvesteeListDataType | null>(null);

  const { finalData, SearchComponent, PaginationComponent } = useSearchAndPagination({
    data: customerInvesteeList ?? [],
    columnsToSearch: [
      { accessorKey: "customerinvesteecompany", type: "text" },
      { accessorKey: "customergroup", type: "text" },
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
          title='Add'
        />
      </Flex>
      <NewTableWithActions
        loader={loaders?.customerInvesteeList}
        cardHeader={<TableHeader title=' Borrower' SearchComponent={SearchComponent} PaginationComponent={PaginationComponent} />}
        columns={[
          {
            title: "Borrower",
            accessorKey: "customerinvesteecompany",
          },
          { title: "Group", accessorKey: "customergroup" },
          {
            title: "Action",
            accessorKey: "actions",
            actionTypes: [
              {
                type: "view",
                onClick: rowData => {
                  setData(rowData);
                  openViewModal();
                },
              },
              {
                type: "edit",
                onClick: rowData => {
                  setData(rowData);
                  openModal();
                },
              },
              {
                type: "Add",
                onClick: (rowData) => {
                  // if (project?.REAssetId) {
                    setSelectRow(rowData)
                    openUserViewModal();
                    // Uncomment and modify this line as necessary
                    dispatch(GetEntityUserRequestAction(rowData.BorrowerDetailId, 2));
                  // }
                },
              },
            ],
          },
        ]}
        data={finalData}
      />
      <EditCustomerInvesteeCompanyModal
        open={ModalState}
        onClose={() => {
          closeModal();
          setData(null);
        }}
        customerInvesteeData={data}
      />
      <ViewUserPageModal selectedRow={selectedRow}  open={ViewUserModalState} onClose={closeUserViewModal}/>
      {AddModalState && <AddCustomerInvesteeCompanyModal open={AddModalState} onClose={closeAddModal} />}
      <ViewCustomerInvesteeModal
        open={ViewModalState}
        onClose={() => {
          closeViewModal();
          setData(null);
        }}
        customerInvesteeData={data}
      />
    </>
  );
}

export default CustomerInvesteeCompany;
