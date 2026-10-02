import { Badge, Box, Button, Card, Flex, Table, Text, Textarea, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { openConfirmModal } from "@mantine/modals";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { CardFilters } from "..";
import decisionIcon from "../../../../../../assets/logos/SVG/decision.svg";
import { changeInternalUserStatusRequested, getInternalUserListRequested } from "../../../../../../lib/services/HDFC/InternalUser/actions";
import { GetInternalUserDataType } from "../../../../../../lib/services/HDFC/InternalUser/dataTypes";
import { selectInternalUserList, selectInternalUserLoaders } from "../../../../../../lib/services/HDFC/InternalUser/selectors";
import { selectUserDetails } from "../../../../../../lib/services/hdfc_login/selectors";
import { ROUTES } from "../../../../../../routeConstants";
import NewTableWithActions from "../../../../../../widgets/tables/MantineTable/NewTableWithActions";
import { TBBorderedButton } from "../../../../../Components/Buttons";
import { TableRow } from "../../../../../Components/TableRow";
import { getPresentableValue, successNotification } from "../../../../../Components/UtilityFunctions";
import { ActivityType } from "../View/ViewInternalUser";

type FormData = {
  approver_remarks: string;
};

type DynamicTableType = {
  particlars: string;
  oldValues: string;
  newValues: string;
};

const ApproveSpecificInternalUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { userData } = state as { userData: GetInternalUserDataType };
  const userDetails = useSelector(selectUserDetails);
  const internalUserList = useSelector(selectInternalUserList);
  const internalUserLoaders = useSelector(selectInternalUserLoaders);

  const [showLoaderIdentifier, setShowLoaderIdentifier] = useState<"Approve" | "Reject" | null>(null);

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
            return <Text color={row.newValues !== row.oldValues ? "truboard-orange.0" : "inherit"}>{getPresentableValue(value, false)}</Text>;
          } else {
            return getPresentableValue(value, false) as string;
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

  const actionCallback = (success: boolean, statusClick: "Approve" | "Reject") => {
    setShowLoaderIdentifier(null);
    if (success) {
      successNotification(`Internal User ${statusClick} successfully!`);
      dispatch(getInternalUserListRequested(userDetails?.EmailId ?? ""));
      navigate(ROUTES.APPROVE_USER);
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
        children: (
          <Text size='sm'>
            Are you sure you want to {status} internal user {`"${userData.EmpName}"`} ?
          </Text>
        ),
        labels: { confirm: "Confirm", cancel: "Cancel" },
        confirmProps: {
          style: { backgroundColor: "#001d56" },
        },
        onClose: () => {
          // no action specified;
        },
        onConfirm: () => {
          setShowLoaderIdentifier(status);
          handleChangeStatus(data, status);
        },
      });
    }
  };

  const handleChangeStatus = (data: FormData, statusClick: "Approve" | "Reject") => {
    const status = statusClick === "Approve" ? "Approve" : "Reject";
    const payload = {
      ReqId: userData.ReqId,
      Activity: userData.Activity,
      UserId: userData.UserId,
      UserSource: userData.UserSource,
      CheckerRoleName: userDetails?.TemplateRoleName ?? "",
      CheckerEmpCode: userDetails?.EmpCode ?? "",
      CheckerEmpName: userDetails?.EmpName ?? "",
      Remarks: data.approver_remarks,
    };
    dispatch(changeInternalUserStatusRequested(payload, status, (success: boolean) => actionCallback(success, statusClick)));
  };

  return (
    <Box m={"md"}>
      <Title order={2} color='#001d56'>
        <Flex align={"center"} gap={"sm"}>
          <img src={decisionIcon} style={{ width: "20px", height: "20px", color: "#001d56" }} />
          Approval
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
            <TableRow fullWidth title={"Initiated By"} value={userData.MakerEmpCode + " - " + userData.MakerEmpName + `(${userData.MakerRole})`} />

            <TableRow fullWidth title={"Initiated On"} value={getPresentableValue(userData.MakersRequestDate, true) as string} />

            <TableRow fullWidth title={"Initiator Remarks"} value={getPresentableValue(userData.MakersRemarks)} />
          </tbody>
        </Table>
      </Card>

      <form onSubmit={form.onSubmit((data: FormData) => openModal(data, "Approve"))}>
        <Table>
          <tbody>
            <TableRow
              fullWidth
              withAsterisk
              title={"Approver Remarks"}
              value={<Textarea placeholder='Enter your remarks here' maxLength={100} radius={"sm"} {...form.getInputProps("approver_remarks")} />}
            />
          </tbody>
        </Table>

        <Flex justify={"flex-end"} gap={"xl"} my='md'>
          <Box w={200}>
            <Button
              fullWidth
              variant='outline'
              color='truboard-primary.0'
              loading={internalUserLoaders.changeInternalUserStatus && showLoaderIdentifier === "Reject"}
              onClick={() => {
                form.validate();
                if (form.isValid()) openModal(form.values, "Reject");
              }}>
              Reject
            </Button>
          </Box>

          <Box w={200}>
            <Button
              fullWidth
              color='truboard-primary.0'
              type='submit'
              loading={internalUserLoaders.changeInternalUserStatus && showLoaderIdentifier === "Approve"}>
              Approve
            </Button>
          </Box>
        </Flex>
      </form>
    </Box>
  );
};

export default ApproveSpecificInternalUser;
