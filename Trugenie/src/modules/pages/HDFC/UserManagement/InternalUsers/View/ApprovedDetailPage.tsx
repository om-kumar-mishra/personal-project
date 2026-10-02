import { Badge, Card, Flex, SimpleGrid, Table, Text, Title } from "@mantine/core";
import { useLocation } from "react-router";
import viewIcon from "../../../../../../assets/logos/SVG/view.svg";
import { GetInternalUserDataType } from "../../../../../../lib/services/HDFC/InternalUser/dataTypes";
import { TableRow } from "../../../../../Components/TableRow";
import { getPresentableValue } from "../../../../../Components/UtilityFunctions";

const ApprovedDetailPage = () => {
  const { pathname, state } = useLocation();

  const { userData, from } = state as { userData: GetInternalUserDataType; from: string };

  return (
    <>
      <Flex m={"md"} justify={"space-between"} align={"center"} mb={"md"}>
        <Title order={2} color='#001d56'>
          <Flex align={"center"} gap={"sm"}>
            <img src={viewIcon} style={{ width: "20px", height: "20px", color: "#001d56" }} />
            Approved User
          </Flex>
        </Title>
        <Flex gap={"md"} align={"center"}>
          <Text size={"md"} fw={700}>
            Status
          </Text>
          <Badge variant='gradient' gradient={{ from: "teal", to: "lime", deg: 105 }}>
            {userData.Activity}
          </Badge>
        </Flex>
      </Flex>
      <Card shadow='sm' p={"xs"} my={"md"} withBorder m={"md"}>
        <Title order={4} color='#001d56'>
          User Details
        </Title>
        <SimpleGrid cols={2} spacing={10}>
          <Table>
            <tbody>
              <TableRow title={"User ID"} fullWidth value={<Text>{userData?.HdfcUserId}</Text>} />

              <TableRow title={"Employee Code"} fullWidth value={<Text>{userData?.EmpCode}</Text>} />
            </tbody>
          </Table>
          <Table>
            <tbody>
              <TableRow title={"Employee Name"} fullWidth value={<Text>{userData?.EmpName}</Text>} />

              <TableRow title={"Email ID"} fullWidth value={<Text>{userData?.EmailId}</Text>} />
            </tbody>
          </Table>
        </SimpleGrid>
      </Card>
      <Card shadow='sm' p={"xs"} my={"md"} withBorder m={"md"}>
        <Title order={4} color='#001d56'>
          Branch Details
        </Title>
        <SimpleGrid cols={2} spacing={10}>
          <TableRow title={"Branch Code"} fullWidth value={<Text>{userData?.BranchCode}</Text>} />

          <TableRow title={"Branch Name"} fullWidth value={<Text>{userData?.BranchName}</Text>} />
        </SimpleGrid>
      </Card>

      <Card shadow='sm' p={"xs"} my={"md"} withBorder m={"md"}>
        <Title order={4} color='#001d56'>
          Supervisor Details
        </Title>
        <SimpleGrid cols={2} spacing={10}>
          <TableRow title={"Supervisor Code"} fullWidth value={<Text>{userData?.SupervisorCode}</Text>} />

          <TableRow title={"Supervisor Name"} fullWidth value={<Text>{userData?.SupervisorName}</Text>} />
        </SimpleGrid>
      </Card>

      <Card shadow='sm' p={"xs"} my={"md"} withBorder m={"md"}>
        <Title order={4} color='#001d56'>
          Department Details
        </Title>
        <SimpleGrid cols={2} spacing={10}>
          <TableRow title={"Department Code"} fullWidth value={<Text>{userData?.DepartmentCode}</Text>} />

          <TableRow title={"Department Name"} fullWidth value={<Text>{userData?.DepartmentName}</Text>} />
        </SimpleGrid>
      </Card>

      <Card shadow='sm' radius='md' padding='md' m={"md"} withBorder>
        <TableRow fullWidth title={"Company Type"} value={"HDFC Bank"} />
        <TableRow fullWidth title={"Role Template Name"} value={userData.TemplateRoleName} />
      </Card>

      <Card shadow='sm' radius='md' padding='md' m={"md"} withBorder>
        <Title order={4} color='#001d56' mb={"sm"}>
          Initiator Details
        </Title>
        <Table w={"50%"}>
          <tbody>
            <TableRow fullWidth title={"Initiated By"} value={userData?.MakerEmpCode + " - " + userData?.MakerEmpName + ` (${userData?.MakerRole})`} />
            <TableRow fullWidth title={"Initiated On"} value={getPresentableValue(userData.MakersRequestDate, true) as string} />
            <TableRow fullWidth title={"Initiator Remarks"} value={userData?.MakersRemarks} />
          </tbody>
        </Table>
      </Card>

      <Card shadow='sm' radius='md' padding='md' m={"md"} withBorder>
        <Title order={4} color='#001d56' mb={"sm"}>
          Approver Details
        </Title>
        <Table w={"50%"}>
          <tbody>
            <TableRow fullWidth title={"Approved By"} value={userData?.CheckerEmpCode + " - " + userData?.CheckerEmpName + ` (${userData?.CheckerRole})`} />
            <TableRow fullWidth title={"Approved On"} value={getPresentableValue(userData.CheckerApprovedDate, true) as string} />
            <TableRow fullWidth title={"Approver Remarks"} value={userData?.CheckerRemarks} />
          </tbody>
        </Table>
      </Card>
    </>
  );
};

export default ApprovedDetailPage;
