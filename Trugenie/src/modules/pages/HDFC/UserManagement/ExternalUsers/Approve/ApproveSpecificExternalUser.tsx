import { Badge, Box, Button, Card, Flex, Table, Text, Textarea, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { openConfirmModal } from "@mantine/modals";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import decisionIcon from "../../../../../../assets/logos/SVG/decision.svg";
import {
  changeExternalUserStatusRequested,
  getExternalUserListRequested,
  getPendingExternalUserDetailsRequested,
} from "../../../../../../lib/services/HDFC/ExternalUser/actions";
import { GetExternalUserDataType } from "../../../../../../lib/services/HDFC/ExternalUser/dataTypes";
import { selectExternalUserLoaders, selectPendingExternalUserDetails } from "../../../../../../lib/services/HDFC/ExternalUser/selectors";
import { selectUserDetails } from "../../../../../../lib/services/hdfc_login/selectors";
import { ROUTES } from "../../../../../../routeConstants";
import NewTableWithActions from "../../../../../../widgets/tables/MantineTable/NewTableWithActions";
import { TBBorderedButton } from "../../../../../Components/Buttons";
import { TableRow } from "../../../../../Components/TableRow";
import { getPresentableValue, successNotification } from "../../../../../Components/UtilityFunctions";
import { ActivityType } from "../../InternalUsers/View/ViewInternalUser";
import { selectSwitchClient } from "../../../../../../lib/services/HDFC/Commons/selectors";
import { GetClientData } from "../../../../../../lib/services/HDFC/Commons/dataTypes";

type FormData = {
  approver_remarks: string;
};

type DynamicTableType = {
  particlars: string;
  oldValues: string;
  newValues: string;
};

const ApproveSpecificExternalUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { userData } = state as { userData: GetExternalUserDataType };
  const pendingExternalUserDetail = useSelector(selectPendingExternalUserDetails);
  const userDetails = useSelector(selectUserDetails);
  const externalUserLoaders = useSelector(selectExternalUserLoaders);
  const activeClient = useSelector(selectSwitchClient) as GetClientData;
  const [showLoaderIdentifier, setShowLoaderIdentifier] = useState<"Approve" | "Reject" | null>(null);

  const pathDetailtoUse = pendingExternalUserDetail && pendingExternalUserDetail.length > 0 ? pendingExternalUserDetail[0] : null;

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

  const form = useForm<FormData>({
    initialValues: {
      approver_remarks: "",
    },

    validate: {
      approver_remarks: value => {
        if (value.trim().length === 0) {
          return "Remarks cannot be empty";
        }
      },
    },
  });

  const actionCallback = (success: boolean, statusClicked: string) => {
    if (success) {
      successNotification(`External User ${statusClicked} successfully`);
      dispatch(getExternalUserListRequested(userDetails?.EmailId ?? "",activeClient.ClientId));
      navigate(ROUTES.APPROVE_EXTERNAL_USER);
    }
  };

  const openModal = (data: FormData, status: "Approve" | "Reject") => {
    if (status === "Reject" && Object.values(form.errors).length > 0) {
      return;
    }
    if (data) {
      openConfirmModal({
        title: `Confirm Action`,
        centered: true,
        children: <Text size='sm'>{`Are you sure you want to ${status} external user "${userData.Name}"?`}</Text>,
        labels: { confirm: "Confirm", cancel: "Cancel" },
        confirmProps: {
          style: { backgroundColor: "#001d56" },
        },
        onClose: () => {
          // no action specified;
        },
        onConfirm: () => {
          setShowLoaderIdentifier(status);
          handleApproveExternalUser(data, status)
        },
      });
    }
  };

  const handleApproveExternalUser = (data: FormData, statusClicked: "Approve" | "Reject") => {
    const status = statusClicked === "Approve" ? "Approve" : "Reject";
    const payload = {
      EUserId: userData.EUserId,
      status: status,
      createdby: userDetails?.EmailId ?? "",
      createbyusername: `${userDetails?.EmpCode}-${userDetails?.EmpName} (${userDetails?.TemplateRoleName})`,
      remark: data.approver_remarks,
      Activity: userData.Activity,
      username: userData?.Name,
      userEmail: userData?.Email,
    };

    dispatch(
      changeExternalUserStatusRequested(payload, (success: boolean) => {
        setShowLoaderIdentifier(null);
        actionCallback(success, statusClicked);
      }),
    );
  };

  return (
    <Box m={"md"}>
      <Title order={2} color='#001d56'>
        <Flex align={"center"} gap={"sm"}>
          <img src={decisionIcon} style={{ width: "20px", height: "20px", color: "#001d56" }} />
          Pending for Approval
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
            {userData.Activity === "Create" ? userData.Status : pathDetailtoUse?.olderStatus ?? pathDetailtoUse?.newStatus ?? userData.Status}
          </Badge>
        </Flex>
      </Flex>

      <Box w={"50%"}>
        <NewTableWithActions
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

            <TableRow fullWidth title={"Initiator Remarks"} value={getPresentableValue(pathDetailtoUse?.initiatedremark)} />
          </tbody>
        </Table>
      </Card>

      <form onSubmit={form.onSubmit((data: FormData) => openModal(data, "Approve"))}>
        <Table w={"100%"}>
          <tbody>
            <TableRow
              fullWidth
              withAsterisk
              title={"Approver Remarks"}
              value={
                <Textarea
                  sx={{ width: "100%" }}
                  maxLength={100}
                  placeholder='Enter your remarks here'
                  radius={"sm"}
                  {...form.getInputProps("approver_remarks")}
                />
              }
            />
          </tbody>
        </Table>

        <Flex justify={"flex-end"} gap={"xl"}>
          <Box w={200}>
            <Button
              fullWidth
              variant='outline'
              color='truboard-primary.0'
              loading={externalUserLoaders.changeExternalUserStatus && showLoaderIdentifier === "Reject"}
              onClick={() => {
                form.validate();
                if (form.isValid()) {
                  openModal(form.values, "Reject");
                }
              }}>
              Reject
            </Button>
          </Box>

          <Box w={200}>
            <Button fullWidth color='truboard-primary.0' type='submit'
              loading={externalUserLoaders.changeExternalUserStatus && showLoaderIdentifier === "Approve"}
            >
              Approve
            </Button>
          </Box>
        </Flex>
      </form>
    </Box>
  );
};

export default ApproveSpecificExternalUser;
