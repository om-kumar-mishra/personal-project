import { Flex, Modal, Text } from "@mantine/core";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectLoaders, selectProjectAccessUserDetails } from "../../../../../lib/services/HDFC/Project/selectors";
import TableWithAction from "../../../../../widgets/tables/MantineTable/NewTableWithActions";

const ViewAccessUserModal = ({ open, onClose }: { onClose: () => void; open: boolean }) => {
  const projectLoaders = useSelector(selectLoaders);

  const projectAccessUserDetails = useSelector(selectProjectAccessUserDetails);
  const data = useMemo(() => {
    if (projectAccessUserDetails) {
      const obj = projectAccessUserDetails;
      return [
        { particulars: "User ID", values: obj.HdfcUserId },
        { particulars: "Employee Code", values: obj.EmpCode },
        { particulars: "Employee Name", values: obj.Name },
        { particulars: "Employee ID", values: obj.HdfcUserId },
        { particulars: "Branch Code", values: obj.BranchCode },
        { particulars: "Branch Name", values: obj.BranchName },
        { particulars: "Department Code", values: obj.DepartmentCode },
        { particulars: "Department Name", values: obj.DepartmentName },
        { particulars: "Supervisor Code", values: obj.SupervisorCode },
        { particulars: "Supervisor Name", values: obj.SupervisorName },
        { particulars: "Company Type", values: obj.CompanyType },
        { particulars: "Role", values: obj.RoleName },
        { particulars: "Status", values: obj.UserStatus },
      ];
    } else {
      return [];
    }
  }, [projectAccessUserDetails]);

  return (
    <Modal
      size={"lg"}
      opened={open}
      onClose={() => {
        onClose();
      }}
      title={
        <Flex gap={"xs"}>
          <Text size={"md"} fw='bold' color={"#001d56"}>
            View User
          </Text>
        </Flex>
      }>
      <TableWithAction
        loader={projectLoaders.projectAccessUserDetails}
        data={data}
        columns={[
          {
            title: "Particulars",
            accessorKey: "particulars",
          },
          {
            title: "Values",
            accessorKey: "values",
          },
        ]}
      />
    </Modal>
  );
};

export default ViewAccessUserModal;
