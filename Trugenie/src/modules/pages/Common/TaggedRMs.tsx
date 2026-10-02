import { Box, Flex, Modal, Text } from "@mantine/core";
import Viewicon from "../../../assets/logos/SVG/view.svg";
import useSearchAndPagination from "../../../hooks/useSearchAndPagination";
import NewTableWithActions from "../../../../src/widgets/tables/MantineTable/NewTableWithActions";

const tableData = [
  {
    EmployeeID: "12",
    EmployeeName: "John Doe",
    EmailID: "name@gmail.com",
  },
  {
    EmployeeID: "13",
    EmployeeName: "Jane Doe",
    EmailID: "name2#gmail.com",
  },
];

const TaggedRMsModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const { finalData, SearchComponent } = useSearchAndPagination({
    data: tableData,
    columnsToSearch: [
      { accessorKey: "EmployeeID", type: "date" },
      { accessorKey: "EmployeeName", type: "date" },
      { accessorKey: "EmailID", type: "text" },
    ],
    itemsPerPageData: [10, 20, 30, 40, 50],
    showItemsPerPageDropdown: true,
    useSearchOnly: true,
  });

  return (
    <Modal
      size={"lg"}
      opened={open}
      onClose={onClose}
      title={
        <Flex gap={"xs"}>
          <img src={Viewicon} style={{ width: "20px", height: "20px", color: "#001d56" }} />
          <Text size={"md"} fw='bold' color={"#001d56"}>
            List of RM`s
          </Text>
        </Flex>
      }>
      <Box my='sm'>{SearchComponent}</Box>
      <NewTableWithActions
        columns={[
          { accessorKey: "EmployeeID", title: "Employee ID" },
          { accessorKey: "EmployeeName", title: "Employee Name" },
          { accessorKey: "EmailID", title: "Email ID" },
        ]}
        data={finalData}
      />
    </Modal>
  );
};

export default TaggedRMsModal;
