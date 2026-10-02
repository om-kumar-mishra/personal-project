import { Badge, Box, Card, Flex, Table, Text, Title } from "@mantine/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import ViewIcon from "../../../../../assets/logos/SVG/view.svg";
import { getPendingExternalUserDetailsRequested } from "../../../../../lib/services/HDFC/ExternalUser/actions";
import { GetExternalUserDataType } from "../../../../../lib/services/HDFC/ExternalUser/dataTypes";
import { selectExternalUserLoaders, selectPendingExternalUserDetails } from "../../../../../lib/services/HDFC/ExternalUser/selectors";
import NewTableWithActions from "../../../../../widgets/tables/MantineTable/NewTableWithActions";
import { TBBorderedButton } from "../../../../Components/Buttons";
import { TableRow } from "../../../../Components/TableRow";
import { getPresentableValue } from "../../../../Components/UtilityFunctions";
import { CardFilters } from "../InternalUsers";
import { ActivityType } from "../InternalUsers/View/ViewInternalUser";

type DynamicTableType = {
  particlars: string;
  oldValues: string;
  newValues: string;
};

const ViewExternalUser = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { userData, selectedCardFilter } = state as { userData: GetExternalUserDataType; from: string; selectedCardFilter: string };
  const pendingExternalUserDetail = useSelector(selectPendingExternalUserDetails);
  const pathDetailtoUse = pendingExternalUserDetail && pendingExternalUserDetail.length > 0 ? pendingExternalUserDetail[0] : null;
  const externalUserLoaders = useSelector(selectExternalUserLoaders);

  useEffect(() => {
    dispatch(
      getPendingExternalUserDetailsRequested({
        Activity: (userData as GetExternalUserDataType).Activity,
        status: (userData as GetExternalUserDataType).Status,
        uniqecode: (userData as GetExternalUserDataType).UniqueCode,
      }),
    );
  }, []);

  const tableData: DynamicTableType[] = [
    {
      particlars: "User Name",
      oldValues: pathDetailtoUse?.olderName ?? "",
      newValues: pathDetailtoUse?.newName ?? "",
    },
    {
      particlars: "Email ID",
      oldValues: pathDetailtoUse?.olderEmail ?? "",
      newValues: pathDetailtoUse?.newEmail ?? "",
    },
    {
      particlars: "Group",
      oldValues: pathDetailtoUse?.olderDeveloperName ?? "",
      newValues: pathDetailtoUse?.newDeveloperName ?? "",
    },
    {
      particlars: "Borrower",
      oldValues: pathDetailtoUse?.olderInvesteeName ?? "",
      newValues: pathDetailtoUse?.newInvesteeName ?? "",
    },
    {
      particlars: "Status",
      oldValues: pathDetailtoUse?.olderStatus ?? "",
      newValues: pathDetailtoUse?.newStatus ?? "",
    },
  ];

  const modifyTableColumns: {
    title: string;
    accessorKey: keyof DynamicTableType;
    transform?: (value: string, row: DynamicTableType) => JSX.Element | string;
  }[] = [
      { title: "Particulars", accessorKey: "particlars" },
      { title: "Old Values", accessorKey: "oldValues" },
      {
        title: userData.Activity === ActivityType.Modify ? "New Values" : "Values",
        accessorKey: "newValues",
        transform: (value: string, row: DynamicTableType) => {
          if (userData.Activity === ActivityType.Modify) {
            return <Text color={row.newValues !== row.oldValues ? "truboard-orange.0" : "inherit"}>{value}</Text>;
          } else {
            return value;
          }
        },
      },
    ];

  return (
    <Box m={"md"}>
      <Title order={2} color='#001d56'>
        <Flex align={"center"} gap={"sm"}>
          <img src={ViewIcon} style={{ width: "20px", height: "20px", color: "#001d56" }} />
          {selectedCardFilter}
          {selectedCardFilter === CardFilters.PendingForApproval ? " for Approval" : " User"}
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
            {userData.Activity === "Create"
              ? userData.Status
              : selectedCardFilter === CardFilters.PendingForApproval
                ? pathDetailtoUse?.olderStatus
                : pathDetailtoUse?.newStatus ?? userData.Status}
          </Badge>
        </Flex>
      </Flex>

      <Box w={"75%"}>
        <NewTableWithActions
          loader={externalUserLoaders.getPendingExternalUserDetails}
          //If type is modify then show the old values and new values, else only show new values
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          columns={userData.Activity === ActivityType.Modify ? modifyTableColumns : modifyTableColumns.slice(0, 1).concat(modifyTableColumns.slice(2))}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          data={
            userData.Activity === ActivityType.Modify
              ? tableData
              : tableData.map(obj => {
                const { oldValues, ...rest } = obj;
                return rest;
              })
          }
        />
      </Box>

      <Card shadow='sm' radius='md' padding='md' m={"md"} withBorder>
        <Title order={4} color='#001d56' mb={"sm"}>
          Initiator Details
        </Title>
        <Table w={"50%"}>
          <tbody>
            <TableRow fullWidth title={"Initiated By"} value={pathDetailtoUse?.initiatedby ?? ""} />
            <TableRow fullWidth title={"Initiated On"} value={getPresentableValue(pathDetailtoUse?.initiatedon, true) ?? ""} />
            <TableRow fullWidth title={"Initiator Remarks"} value={pathDetailtoUse?.initiatedremark ?? ""} />
          </tbody>
        </Table>
      </Card>

      {selectedCardFilter === CardFilters.RejectedRequest ? (
        <Card shadow='sm' radius='md' padding='md' m={"md"} withBorder>
          <Title order={4} color='#001d56' mb={"sm"}>
            Approver Details
          </Title>
          <Table w={"50%"}>
            <tbody>
              <TableRow fullWidth title={"Rejected By"} value={pathDetailtoUse?.rejectedby ?? ""} />
              <TableRow fullWidth title={"Rejected On"} value={getPresentableValue(pathDetailtoUse?.rejectedon, true)} />
              <TableRow fullWidth title={"Approver Remarks"} value={pathDetailtoUse?.approverremark ?? ""} />
            </tbody>
          </Table>
        </Card>
      ) : null}
    </Box>
  );
};

export const ViewExternalUserTotalView = () => {
  const { state } = useLocation();
  const { userData } = state as { userData: GetExternalUserDataType; from: string };
  return (
    <Card shadow='sm' radius='md' padding='md' m={"md"} withBorder>
      <Flex justify={"flex-start"} align={"center"} gap={"sm"} mb={"sm"}>
        <img src={ViewIcon} style={{ width: "20px", height: "20px", color: "#001d56" }} />
        <Title order={4} color='#001d56'>
          View External User
        </Title>
      </Flex>
      <TableRow fullWidth title={"Group"} value={userData.DeveloperName ?? ""} />
      <TableRow fullWidth title={"Borrower"} value={userData.InvesteeName ?? ""} />
      <TableRow fullWidth title={"Employee Name"} value={userData.Name ?? ""} />
      <TableRow fullWidth title={"Email ID"} value={userData.Email ?? ""} />
      <TableRow fullWidth title={"Role / Template Name"} value={userData.RoleName ?? ""} />
      <TableRow fullWidth title={"Status"} value={userData.Status ?? ""} />
    </Card>
  );
};

export default ViewExternalUser;
