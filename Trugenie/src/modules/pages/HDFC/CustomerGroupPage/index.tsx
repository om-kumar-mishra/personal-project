import { Flex, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import addLogo from "../../../../assets/logos/SVG/add_new.svg";
import useSearchAndPagination from "../../../../hooks/useSearchAndPagination";
import { getCustomerGroupListRequested } from "../../../../lib/services/HDFC/CustomerGroupServices/actions";
import { CustomerGroupListDataType } from "../../../../lib/services/HDFC/CustomerGroupServices/dataTypes";
import { selectCustomerGroupList, selectCustomerGroupLoaders } from "../../../../lib/services/HDFC/CustomerGroupServices/selectors";
import NewTableWithActions, { TableHeader } from "../../../../widgets/tables/MantineTable/NewTableWithActions";
import CommonAddButton from "../../../Components/Buttons";
import AddCustomerGroupPage from "./AddCustomerGroupPage";
import EditCustomerGroupPageModal from "./EditCustomerGroupPage";
import ViewCustomerGroupPageModal from "./ViewCustomerGroupPage";
import { selectSwitchClient } from "../../../../lib/services/HDFC/Commons/selectors";
import { GetClientData } from "../../../../lib/services/HDFC/Commons/dataTypes";
import { getPresentableValue } from "../../../Components/UtilityFunctions";

function CustomerGroupPage() {
  const dispatch = useDispatch();
  const customerGroupList = useSelector(selectCustomerGroupList);
  const loaders = useSelector(selectCustomerGroupLoaders);
  const activeClient = useSelector(selectSwitchClient) as GetClientData;

  const [ModalState, { open: openModal, close: closeModal }] = useDisclosure(false);
  const [AddModalState, { open: openAddModal, close: closeAddModal }] = useDisclosure(false);
  const [ViewModalState, { open: openViewModal, close: closeViewModal }] = useDisclosure(false);

  const [data, setData] = useState<CustomerGroupListDataType | null>(null);

  useEffect(() => {
    activeClient.ClientId && dispatch(getCustomerGroupListRequested(activeClient.ClientId));
  }, [activeClient.ClientId]);

  console.log("customerGroupList=========",customerGroupList);
  const { finalData, SearchComponent, PaginationComponent } = useSearchAndPagination({
    data: customerGroupList ?? [],
    columnsToSearch: [
      { accessorKey: "DeveloperName", type: "text" },
      { accessorKey: "createdBy", type: "text" },
      // { accessorKey: "CreatedAt", type: "date" },
    ],
    itemsPerPageData: [10, 20, 30, 40, 50],
    showItemsPerPageDropdown: true,
    showPaginationWithSearch: false,
  });
  console.log("finalData===",finalData,"SearchComponent=====",SearchComponent,"PaginationComponent==",PaginationComponent);

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
        loader={loaders?.customerGroupList}
        cardHeader={<TableHeader title='Group' SearchComponent={SearchComponent} PaginationComponent={PaginationComponent} />}
        columns={[
          {
            title: "Group Name",
            accessorKey: "DeveloperName",
          },
          // {
          //   title: "Created By",
          //   accessorKey: "createdBy",
          // },
          // {
          //   title: "Created At",
          //   accessorKey: "CreatedAt",
          //   transform: value => <Text title={getPresentableValue(value, true) as string}> {getPresentableValue(value, true) as string}</Text>,
          // },
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
                type: "delete",
                onClick: rowData => {
                  setData(rowData);
                  openModal();
                },
              },
  
            ],
          },
        ]}
      
       
        data={finalData}
      />
     
      <EditCustomerGroupPageModal
        open={ModalState}
        onClose={() => {
          closeModal();
          setData(null);
        }}
        customerGroupData={data}
      />
      <AddCustomerGroupPage open={AddModalState} onClose={closeAddModal} />
      <ViewCustomerGroupPageModal
        open={ViewModalState}
        onClose={() => {
          closeViewModal();
          setData(null);
        }}
        customerGroupData={data}
      />
    </>
  );
}

export default CustomerGroupPage;
