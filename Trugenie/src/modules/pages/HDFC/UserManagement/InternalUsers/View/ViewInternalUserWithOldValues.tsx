import { Badge, Box, Card, Flex, Table, Text, Title } from "@mantine/core";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { CardFilters } from "..";
import viewIcon from "../../../../../../assets/logos/SVG/view.svg";
import { GetInternalUserDataType } from "../../../../../../lib/services/HDFC/InternalUser/dataTypes";
import { selectInternalUserList } from "../../../../../../lib/services/HDFC/InternalUser/selectors";
import NewTableWithActions from "../../../../../../widgets/tables/MantineTable/NewTableWithActions";
import { TBBorderedButton } from "../../../../../Components/Buttons";
import { TableRow } from "../../../../../Components/TableRow";
import { getPresentableValue } from "../../../../../Components/UtilityFunctions";
import { ActivityType } from "./ViewInternalUser";

type DynamicTableType = {
  particlars: string;
  oldValues: string;
  newValues: string;
};

const ViewPendingOrRejectedInternalUser = () => {
  const { state, pathname } = useLocation();
  const { userData } = state as { userData: GetInternalUserDataType; from: string };
  const title = state.selectedCard === CardFilters.PendingForApproval ? "Pending for Approval" : "Rejected Request";
  const internalUserList = useSelector(selectInternalUserList);

  const isRejectedPage = pathname.includes("rejected-user");

  const findOldValues = () => {
    const oldData = internalUserList?.filter(item => {
      return item.Title === CardFilters.TotalApprovedUsers && item.UserId === userData.UserId;
    });

    const showOldData = userData.Activity === ActivityType.Modify && oldData && oldData?.length > 0;
    const finalOldData = showOldData ? oldData[0] : null;

    const oldDataTableColumns = [
      { title: "Particulars", accessorKey: "particlars" },
      { title: "Old Values", accessorKey: "oldValues" },
      {
        title: showOldData ? "New Values" : "Values",
        accessorKey: "newValues",
        transform: (value: string, row: DynamicTableType) => {
          if (userData.Activity === ActivityType.Modify) {
            return <Text color={row.newValues !== row.oldValues ? "truboard-orange.0" : "inherit"}>{getPresentableValue(value)}</Text>;
          } else {
            return getPresentableValue(value);
          }
        },
      },
    ];

    const oldTableData = [
      { particlars: "User Id", oldValues: finalOldData?.HdfcUserId, newValues: userData?.HdfcUserId },
      { particlars: "Employee Code", oldValues: finalOldData?.EmpCode, newValues: userData?.EmpCode },
      { particlars: "Employee Name", oldValues: finalOldData?.EmpName, newValues: userData?.EmpName },
      { particlars: "Email Id", oldValues: finalOldData?.EmailId, newValues: userData?.EmailId },
      { particlars: "Branch Code", oldValues: finalOldData?.BranchCode, newValues: userData?.BranchCode },
      { particlars: "Branch Name", oldValues: finalOldData?.BranchName, newValues: userData?.BranchName },
      { particlars: "Department Code", oldValues: finalOldData?.DepartmentCode, newValues: userData?.DepartmentCode },
      { particlars: "Department Name", oldValues: finalOldData?.DepartmentName, newValues: userData?.DepartmentName },
      { particlars: "Supervisor Code", oldValues: finalOldData?.SupervisorCode, newValues: userData?.SupervisorCode },
      { particlars: "Supervisor Name", oldValues: finalOldData?.SupervisorName, newValues: userData?.SupervisorName },
      { particlars: "Company Type", oldValues: finalOldData?.CompanyType, newValues: userData?.CompanyType },
      { particlars: "Role", oldValues: finalOldData?.TemplateRoleName, newValues: userData?.TemplateRoleName },
    ];

    return {
      showOldData,
      tableColumns: showOldData ? oldDataTableColumns : oldDataTableColumns.slice(0, 1).concat(oldDataTableColumns.slice(2)),
      tableData: showOldData
        ? oldTableData
        : oldTableData.map(obj => {
          const { oldValues, ...rest } = obj;
          return rest;
        }),
    };
  };

  const tableColumns = findOldValues().tableColumns;

  const tableData = findOldValues().tableData;

  return (
    <Box m={"md"}>
      <Title order={2} color='#001d56'>
        <Flex align={"center"} gap={"sm"}>
          <img src={viewIcon} style={{ width: "20px", height: "20px", color: "#001d56" }} />
          {title}
        </Flex>
      </Title>

      <Flex justify={"space-between"} mt={"md"}>
        <Flex gap={"md"}>
          <Text size={"md"} color='gray' fw={700}>
            Type of Activity
          </Text>
          <TBBorderedButton title={userData.Activity} />
        </Flex>

        <Flex gap={"md"} align={"center"}>
          <Text size={"md"} fw={700}>
            Status
          </Text>
          <Badge variant='gradient' gradient={{ from: "teal", to: "lime", deg: 105 }}>
            {userData.Activity}
          </Badge>
        </Flex>
      </Flex>

      <Box w={"75%"}>
        <NewTableWithActions
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          columns={tableColumns}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          data={tableData}
        />
      </Box>

      <Card shadow='sm' radius='md' padding='md' m={"md"} withBorder>
        <Title order={4} color='#001d56' mb={"sm"}>
          Initiator Details
        </Title>
        <Table w={"50%"}>
          <tbody>
            <TableRow fullWidth title={"Initiated By"} value={userData?.MakerEmpCode + "- " + userData.MakerEmpName + ` (${userData.MakerRole})` ?? ""} />
            <TableRow fullWidth title={"Initiated On"} value={getPresentableValue(userData?.MakersRequestDate, true) as string} />

            <TableRow fullWidth title={"Initiator Remarks"} value={userData?.MakersRemarks ?? ""} />
          </tbody>
        </Table>
      </Card>

      {state.selectedCard === CardFilters.RejectedRequest ? (
        <Card shadow='sm' radius='md' padding='md' m={"md"} withBorder>
          <Title order={4} color='#001d56' mb={"sm"}>
            Approver Details
          </Title>
          <Table w={"50%"}>
            <tbody>
              <TableRow fullWidth title={`${isRejectedPage ? "Rejected" : "Approved"} by`} value={userData?.CheckerEmpCode + "-" + userData.CheckerEmpName + ` (${userData.CheckerRole})` ?? ""} />
              <TableRow fullWidth title={`${isRejectedPage ? "Rejected" : "Approved"} On`} value={getPresentableValue(userData.CheckerApprovedDate, true) as string} />
              <TableRow fullWidth title={"Approver Remarks"} value={userData?.CheckerRemarks ?? ""} />
            </tbody>
          </Table>
        </Card>
      ) : null}
    </Box>
  );
};

export default ViewPendingOrRejectedInternalUser;
