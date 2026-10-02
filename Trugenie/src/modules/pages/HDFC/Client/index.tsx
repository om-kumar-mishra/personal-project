import { Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import addLogo from "../../../../assets/logos/SVG/add_new.svg";
import useSearchAndPagination from "../../../../hooks/useSearchAndPagination";
import { selectCustomerGroupLoaders } from "../../../../lib/services/HDFC/CustomerGroupServices/selectors";
import NewTableWithActions, { TableHeader } from "../../../../widgets/tables/MantineTable/NewTableWithActions";
import CommonAddButton from "../../../Components/Buttons";
import AddClientPageModal from "./AddClientPage";
import { getClientListRequested } from "../../../../lib/services/HDFC/Client/actions";
import { selectClientList } from "../../../../lib/services/HDFC/Client/selectors";

function ClientPage() {
  const dispatch = useDispatch();
  const clientList = useSelector(selectClientList);
  const loaders = useSelector(selectCustomerGroupLoaders);

  // const [ModalState, { open: openModal, close: closeModal }] = useDisclosure(false);
  const [AddModalState, { open: openAddModal, close: closeAddModal }] = useDisclosure(false);

  // const [data, setData] = useState<ClientListDataType | null>(null);

  useEffect(() => {
    dispatch(getClientListRequested());
  }, []);

  const { finalData, SearchComponent, PaginationComponent } = useSearchAndPagination({
    data: clientList ?? [],
    columnsToSearch: [
      { accessorKey: "ClientName", type: "text" },
      { accessorKey: "ShortName", type: "text" },
      { accessorKey: "Cin", type: "text" },
      { accessorKey: "website", type: "text" },
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
        loader={loaders?.customerGroupList}
        cardHeader={<TableHeader title='Client' SearchComponent={SearchComponent} PaginationComponent={PaginationComponent} />}
        columns={[
          {
            title: "Client Name",
            accessorKey: "ClientName",
          },
          {
            title: "Short Name",
            accessorKey: "ShortName",
          },
          {
            title: "CIN",
            accessorKey: "Cin",
          },
          {
            title: "Website",
            accessorKey: "website",
          },
          // {
          //   title: "Action",
          //   accessorKey: "actions",
          //   actionTypes: [
          //     {
          //       type: "edit",
          //       onClick: rowData => {
          //         setData(rowData);
          //         openModal();
          //       },
          //     },
          //   ],
          // },
        ]}
        data={finalData}
      />
      {/* <EditClientPageModal
        open={ModalState}
        onClose={() => {
          closeModal();
          setData(null);
        }}
        customerGroupData={data}
      /> */}
      <AddClientPageModal open={AddModalState} onClose={closeAddModal} />
    </>
  );
}

export default ClientPage;
