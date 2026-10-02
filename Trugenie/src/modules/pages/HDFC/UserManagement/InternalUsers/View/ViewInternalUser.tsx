import { ActionIcon, Badge, Box, Button, Card, Flex, Select, SimpleGrid, Table, Text, TextInput, Textarea, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { CardFilters } from "..";
import EditIcon from "../../../../../../assets/logos/SVG/Edit.svg";
import { addInternalUserRequested, getInternalUserListRequested } from "../../../../../../lib/services/HDFC/InternalUser/actions";
import { AddInternalUserPayloadType, GetInternalUserDataType } from "../../../../../../lib/services/HDFC/InternalUser/dataTypes";
import { selectInternalUserList, selectInternalUserLoaders } from "../../../../../../lib/services/HDFC/InternalUser/selectors";
import { selectUserDetails } from "../../../../../../lib/services/hdfc_login/selectors";
import { ROUTES } from "../../../../../../routeConstants";
import { getEnumKeyByEnumValue } from "../../../../../../utils/commonFunctions";
import TBTextInput from "../../../../../Components/TBTextInput";
import { TableRow } from "../../../../../Components/TableRow";
import { createAllowedCharRegex, emailValidationRegex, getPresentableValue, successNotification } from "../../../../../Components/UtilityFunctions";

enum RoleTemplateFormData {
  RM = "RM",
  Credit = "Credit",
  "CAD Maker" = "CAD Maker",
  "CAD Checker" = "CAD Checker",
  "Admin Maker" = "Admin Maker",
  "ADMIN Checker" = "Admin Checker",
  "UAM Maker" = "UAM Maker",
  "UAM Checker" = "UAM Checker",
  "UAM Reviewer" = "UAM Reviewer",
  Audit = "Audit",
  Regulatory = "Regulatory",
  Vendor = "Vendor",
  "Role 1" = "Role 1",
  "Admin" = "admin",
}

type FormData = {
  type_of_activity: string;
  user_id: string;
  employee_code: string;
  employee_name: string;
  email_id: string;
  branch_code: string;
  branch_name: string;
  supervisor_code: string;
  supervisor_name: string;
  department_code: string;
  department_name: string;
  role_template_name: RoleTemplateFormData | "";
  remarks: string;
  company_type: string;
};

export enum ActivityType {
  Enable = "Enabled",
  Modify = "Modify",
  Disable = "Disable",
  Delete = "Delete",
  Lock = "Locked",
  Unlock = "Unlock",
  Dormant = "Dormant",
  Revoke = "Revoke",
}

const ViewInternalUser = () => {
  const { pathname, state } = useLocation();

  const { userData, from } = state as { userData: GetInternalUserDataType; from: string };
  const userDetails = useSelector(selectUserDetails);
  const [isEdit, setIsEdit] = useState(false);
  const internalUserList = useSelector(selectInternalUserList);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const internalUserLoaders = useSelector(selectInternalUserLoaders);

  const checkifuseridisenabled =
    internalUserList?.filter(item => item.UserId === userData.UserId && item.Title === CardFilters.PendingForApproval)?.length ?? 0 > 0;

  let EditDropdownValues: { label: string; value: ActivityType }[] = [];
  switch (userData.Activity) {
    case ActivityType.Enable:
      EditDropdownValues = [
        { value: ActivityType.Modify, label: ActivityType.Modify },
        { value: ActivityType.Disable, label: ActivityType.Disable },
        { value: ActivityType.Delete, label: ActivityType.Delete },
        { value: ActivityType.Enable, label: "Enable" },
      ];
      break;
    case ActivityType.Disable:
      EditDropdownValues = [
        { value: ActivityType.Enable, label: ActivityType.Enable },
        { value: ActivityType.Delete, label: ActivityType.Delete },
        { value: ActivityType.Disable, label: ActivityType.Disable },
      ];
      break;
    case ActivityType.Lock:
      EditDropdownValues = [
        { value: ActivityType.Disable, label: ActivityType.Disable },
        { value: ActivityType.Unlock, label: ActivityType.Unlock },
        { value: ActivityType.Delete, label: ActivityType.Delete },
        { value: ActivityType.Lock, label: "Lock" },
      ];
      break;
    case ActivityType.Dormant:
      EditDropdownValues = [
        { value: ActivityType.Enable, label: "Enable" },
        { value: ActivityType.Disable, label: ActivityType.Disable },
        { value: ActivityType.Delete, label: ActivityType.Delete },
        { value: ActivityType.Dormant, label: ActivityType.Dormant },
      ];
      break;
    case ActivityType.Delete:
      EditDropdownValues = [
        { value: ActivityType.Revoke, label: ActivityType.Revoke },
        { value: ActivityType.Delete, label: ActivityType.Delete },
      ];
      break;
    default:
      EditDropdownValues = [];
      break;
  }

  const form = useForm<FormData>({
    initialValues: {
      type_of_activity: userData?.Activity,
      user_id: userData?.HdfcUserId?.toString() ?? "",
      employee_code: userData?.EmpCode ?? "",
      employee_name: userData?.EmpName ?? "",
      email_id: userData?.EmailId ?? "",
      branch_code: userData?.BranchCode ?? "",
      branch_name: userData?.BranchName ?? "",
      supervisor_code: userData?.SupervisorCode ?? "",
      supervisor_name: userData?.SupervisorName ?? "",
      department_code: userData?.DepartmentCode ?? "",
      department_name: userData?.DepartmentName ?? "",
      role_template_name: userData.TemplateRoleName.toLowerCase() as RoleTemplateFormData | "",
      remarks: "",
      company_type: userData.TemplateRoleName.toLowerCase() === RoleTemplateFormData.Vendor.toLowerCase() ? userData.CompanyType : "HDFC Bank",
    },
    validateInputOnBlur: true,
    validateInputOnChange: true,
    validate: {
      employee_name: value => {
        if (value.trim() === "") {
          return "This field cannot be empty.";
        } else {
          if (/^[a-zA-Z' ]{1,100}$/.test(value.trim())) {
            return null;
          } else {
            return "Employee name must contain only alphabetic characters and apostrophes, with a maximum length of 100 characters.";
          }
        }
      },
      email_id: value => {
        if (value.trim() === "") {
          return "This field cannot be empty.";
        } else {
          if (emailValidationRegex.test(value.trim()) && value.trim().length <= 256) {
            return null;
          } else {
            return "Invalid email format. Please enter a valid email address with domains @hdfcbank.com, @hdfcbank.co.in, @hbctxdom.com, or @in.hdfcbank.com, and with a maximum length of 256 characters.";
          }
        }
      },
      branch_code: value => {
        if (value.trim() === "") {
          return "This field cannot be empty.";
        } else if (!/^\d{1,10}$/.test(value.trim())) {
          return "Branch code must contain only numeric characters and have a maximum length of 10 characters.";
        } else {
          return null;
        }
      },
      branch_name: value => {
        if (value.trim() === "") {
          return "This field cannot be empty.";
        } else if (value.trim().length > 256) {
          return "Branch name cannot exceed 256 characters.";
        } else if (
          value
            .trim()
            .split("")
            .some(char => /\d/.test(char))
        ) {
          return "Branch name cannot contain numerals";
        } else {
          return null;
        }
      },
      supervisor_code: value => {
        const upperCaseValue = value.toUpperCase();
        if (value) {
          if (/^[A-Z0-9]{1,20}$/.test(upperCaseValue)) {
            return null;
          } else {
            return "Supervisor Code must be alphanumeric and have a maximum length of 20 characters.";
          }
        } else {
          return null;
        }
      },
      supervisor_name: value => {
        if (value) {
          if (/^[a-zA-Z' ]{1,20}$/.test(value.trim())) {
            return null;
          } else {
            return "Supervisor name must contain only alphabetic characters and apostrophes, with a maximum length of 100 characters.";
          }
        } else {
          return null;
        }
      },
      department_code: value => {
        if (value.trim() === "") {
          return "This field cannot be empty.";
        } else if (!/^\d{1,10}$/.test(value.trim())) {
          return "Department code must contain only numeric characters and have a maximum length of 10 characters.";
        } else {
          return null;
        }
      },
      department_name: value => {
        if (value.trim() === "") {
          return "This field cannot be empty.";
        } else if (value.trim().length > 100) {
          return "Department name cannot exceed 100 characters.";
        } else if (
          value
            .trim()
            .split("")
            .some(char => /\d/.test(char))
        ) {
          return "Department name cannot contain numerals";
        } else {
          return null;
        }
      },
      role_template_name: value => (value !== "" ? null : "This field cannot be empty."),
      remarks: value => {
        if (value.trim() === "") {
          return "This field cannot be empty.";
        } else if (value.trim().length > 500) {
          return "Remarks cannot exceed 500 characters.";
        } else {
          return null;
        }
      },
      company_type(value, values) {
        if (values.role_template_name === RoleTemplateFormData.Vendor.toLowerCase()) {
          if (values.company_type.trim() === "") {
            return "This field cannot be empty.";
          } else {
            return null;
          }
        } else {
          return null;
        }
      },
    },
  });

  const actionCallback = (success: boolean) => {
    if (success) {
      dispatch(getInternalUserListRequested(userDetails?.EmailId ?? ""));
      successNotification("User edit request sent for approval!");
      navigate(ROUTES.UPDATE_USER, {
        state: {
          from: ROUTES.ADD_USER,
        },
      });
      form.reset();
    }
  };
  useEffect(() => {
    form.setFieldValue("role_template_name", userData?.TemplateRoleName.toLowerCase() as any);
  }, [userData?.TemplateRoleName]);
  const handleFormSubmit = (data: FormData) => {
    const payload: AddInternalUserPayloadType = {
      Activity: data.type_of_activity,
      userId: userData.UserId,
      HdfcUserId: userData.HdfcUserId,
      UserSource: userData.UserSource,
      MakerEmpCode: userDetails?.EmpCode ?? "",
      makerEmpName: userDetails?.EmpName ?? "",
      EmpCode: data.employee_code,
      EmpName: data.employee_name,
      EmailID: data.email_id,
      BranchCode: data.branch_code,
      BranchName: data.branch_name,
      SupervisorCode: data.supervisor_code,
      SupervisorName: data.supervisor_name,
      DepartmentCode: data.department_code,
      DepartmentName: data.department_name,
      TemplateRoleName: Object.values(RoleTemplateFormData).find(item => item.toLowerCase() === form.values.role_template_name) ?? "",
      Remarks: data.remarks,
      CompanyType: data.role_template_name.toLowerCase() === RoleTemplateFormData.Vendor.toLowerCase() ? data.company_type : "HDFC Bank",
    };
    dispatch(addInternalUserRequested(payload, actionCallback));
  };

  const openModal = () => {
    modals.open({
      title: "You cannot edit since one of approvals in pending",
      withCloseButton: true,
      centered: true,
    });
  };

  const templateRoleNameDropdowns = Object.values(RoleTemplateFormData).map(item => ({
    label: getEnumKeyByEnumValue(RoleTemplateFormData, item),
    value: getEnumKeyByEnumValue(RoleTemplateFormData, item).toLowerCase(),
  }));

  const isFormModifed =
    userData.EmpName !== form.values.employee_name ||
    userData.EmailId !== form.values.email_id ||
    userData.BranchCode !== form.values.branch_code ||
    userData.BranchName !== form.values.branch_name ||
    userData.SupervisorCode !== form.values.supervisor_code ||
    userData.SupervisorName !== form.values.supervisor_name ||
    userData.DepartmentCode !== form.values.department_code ||
    userData.DepartmentName !== form.values.department_name ||
    userData.TemplateRoleName.toLowerCase() !== form.values.role_template_name.toLowerCase() ||
    userData.CompanyType !== form.values.company_type;

  return (
    <form onSubmit={form.onSubmit(handleFormSubmit)}>
      <Box m={"md"}>
        <TableRow
          title={"Type of Activity"}
          fullWidth
          value={
            <Flex align={"center"} gap={40}>
              <Flex w={"100%"} gap={4}>
                <Select
                  w={"100%"}
                  disabled={!isEdit}
                  searchable
                  data={EditDropdownValues}
                  placeholder='Type of Activity'
                  {...form.getInputProps("type_of_activity")}
                />
                <ActionIcon
                  onClick={() => {
                    if (checkifuseridisenabled) {
                      openModal();
                    } else {
                      setIsEdit(!isEdit);
                    }
                  }}
                  variant='default'
                  size={"lg"}>
                  <img src={EditIcon} style={{ width: "20px", height: "20px" }} />
                </ActionIcon>
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
          }
        />
      </Box>
      <Card shadow='sm' p={"xs"} my={"md"} withBorder m={"md"}>
        <Title order={4} color='#001d56'>
          User Details
        </Title>
        <SimpleGrid cols={2} spacing={10}>
          <Table>
            <tbody>
              <TableRow
                title={"User ID"}
                withAsterisk={form.values.type_of_activity === ActivityType.Modify}
                fullWidth
                value={<TextInput disabled placeholder='User ID' {...form.getInputProps("user_id")} />}
              />

              <TableRow
                title={"Employee Code"}
                withAsterisk={form.values.type_of_activity === ActivityType.Modify}
                fullWidth
                value={<TextInput disabled placeholder='Employee Code' {...form.getInputProps("employee_code")} />}
              />
            </tbody>
          </Table>
          <Table>
            <tbody>
              <TableRow
                title={"Employee Name"}
                fullWidth
                withAsterisk={form.values.type_of_activity === ActivityType.Modify}
                value={
                  <TextInput
                    disabled={form.values.type_of_activity !== ActivityType.Modify}
                    placeholder='Employee Name'
                    {...form.getInputProps("employee_name")}
                  />
                }
              />

              <TableRow
                title={"Email ID"}
                withAsterisk={form.values.type_of_activity === ActivityType.Modify}
                fullWidth
                value={<TextInput maxLength={256} disabled placeholder='Email ID' {...form.getInputProps("email_id")} />}
              />
            </tbody>
          </Table>
        </SimpleGrid>
      </Card>
      <Card shadow='sm' p={"xs"} my={"md"} withBorder m={"md"}>
        <Title order={4} color='#001d56'>
          Branch Details
        </Title>
        <SimpleGrid cols={2} spacing={10}>
          <TableRow
            title={"Branch Code"}
            withAsterisk={form.values.type_of_activity === ActivityType.Modify}
            fullWidth
            value={
              <TextInput
                maxLength={10}
                disabled={form.values.type_of_activity !== ActivityType.Modify}
                placeholder='Branch Code'
                {...form.getInputProps("branch_code")}
              />
            }
          />

          <TableRow
            title={"Branch Name"}
            withAsterisk={form.values.type_of_activity === ActivityType.Modify}
            fullWidth
            value={
              <TextInput
                maxLength={256}
                disabled={form.values.type_of_activity !== ActivityType.Modify}
                placeholder='Branch Name'
                {...form.getInputProps("branch_name")}
              />
            }
          />
        </SimpleGrid>
      </Card>

      <Card shadow='sm' p={"xs"} my={"md"} withBorder m={"md"}>
        <Title order={4} color='#001d56'>
          Supervisor Details
        </Title>
        <SimpleGrid cols={2} spacing={10}>
          <TableRow
            title={"Supervisor Code"}
            fullWidth
            value={
              <TBTextInput
                disabled={form.values.type_of_activity !== ActivityType.Modify}
                regex={createAllowedCharRegex([])}
                maxLength={20}
                placeholder='Supervisor Code'
                {...form.getInputProps("supervisor_code")}
              />
            }
          />

          <TableRow
            title={"Supervisor Name"}
            fullWidth
            value={
              <TBTextInput
                maxLength={100}
                disabled={form.values.type_of_activity !== ActivityType.Modify}
                regex={createAllowedCharRegex(["'"])}
                placeholder='Supervisor Name'
                {...form.getInputProps("supervisor_name")}
              />
            }
          />
        </SimpleGrid>
      </Card>

      <Card shadow='sm' p={"xs"} my={"md"} withBorder m={"md"}>
        <Title order={4} color='#001d56'>
          Department Details
        </Title>
        <SimpleGrid cols={2} spacing={10}>
          <TableRow
            title={"Department Code"}
            withAsterisk={form.values.type_of_activity === ActivityType.Modify}
            fullWidth
            value={
              <TextInput
                disabled={form.values.type_of_activity !== ActivityType.Modify}
                maxLength={10}
                placeholder='Department Code'
                {...form.getInputProps("department_code")}
              />
            }
          />

          <TableRow
            title={"Department Name"}
            withAsterisk={form.values.type_of_activity === ActivityType.Modify}
            fullWidth
            value={
              <TextInput
                disabled={form.values.type_of_activity !== ActivityType.Modify}
                placeholder='Department Name'
                {...form.getInputProps("department_name")}
              />
            }
          />
        </SimpleGrid>
      </Card>

      {form.isDirty() ? (
        <>
          <Card
            shadow='sm'
            p={"xs"}
            my={"md"}
            withBorder
            m={"md"}
            sx={{
              overflow: "visible",
            }}>
            {form.values.type_of_activity === ActivityType.Modify ? (
              <TableRow
                title={"Role Template Name"}
                withAsterisk
                fullWidth
                value={
                  <Select
                    searchable
                    readOnly={form.values.type_of_activity !== ActivityType.Modify}
                    required
                    data={templateRoleNameDropdowns}
                    placeholder='Role Template Name'
                    {...form.getInputProps("role_template_name")}
                  />
                }
              />
            ) : (
              <TableRow
                title={"Role Template Name"}
                withAsterisk={form.values.type_of_activity === ActivityType.Modify}
                value={<Text> {userData.TemplateRoleName} </Text>}
              />
            )}
            {form.values.role_template_name.toLowerCase() !== RoleTemplateFormData.Vendor.toLowerCase() ? (
              <TableRow title={"Company Type"} withAsterisk value={<Text> HDFC Bank </Text>} />
            ) : (
              <TableRow
                title={"Company Type"}
                withAsterisk
                value={<TextInput required placeholder='Enter Company Type' {...form.getInputProps("company_type")} />}
              />
            )}
            <TableRow
              title={"Remarks"}
              withAsterisk
              fullWidth
              value={<Textarea maxLength={500} required placeholder='Remarks' {...form.getInputProps("remarks")} />}
            />
          </Card>

          <Flex direction={"column"} ml={"80%"} align={"flex-end"} w={"20%"} justify={"flex-end"} m='sm'>
            {!isFormModifed && form.values.type_of_activity === ActivityType.Modify ? (
              <Text color='red' size={12} mr={"md"}>
                Please modify the fields to submit.
              </Text>
            ) : null}
            <Button
              type='submit'
              mx='md'
              color='truboard-primary.0'
              disabled={!isFormModifed && form.values.type_of_activity === ActivityType.Modify}
              loading={internalUserLoaders.addInternalUser}>
              Submit
            </Button>
          </Flex>
        </>
      ) : (
        <>
          <Card shadow='sm' radius='md' padding='md' m={"md"} withBorder>
            <Title order={4} color='#001d56' mb={"sm"}>
              Role Details
            </Title>
            <Table w={"50%"}>
              <tbody>
                <TableRow title={"Role Template Name"} value={<Text> {userData.TemplateRoleName} </Text>} />
                <TableRow
                  title={"Company Type"}
                  value={
                    <Text>{userData.TemplateRoleName.toLowerCase() === RoleTemplateFormData.Vendor.toLowerCase() ? userData.CompanyType : "HDFC Bank"}</Text>
                  }
                />
              </tbody>
            </Table>
          </Card>
          <Card shadow='sm' radius='md' padding='md' m={"md"} withBorder>
            <Title order={4} color='#001d56' mb={"sm"}>
              Initiator Details
            </Title>
            <Table w={"50%"}>
              <tbody>
                <TableRow fullWidth title={"Initiated By"} value={userData.MakerEmpCode + " - " + userData.MakerEmpName + ` (${userData.MakerRole})`} />

                <TableRow fullWidth title={"Initiated On"} value={getPresentableValue(userData.MakersRequestDate, true) as string} />

                <TableRow fullWidth title={"Initiator Remarks"} value={userData.MakersRemarks} />
              </tbody>
            </Table>
          </Card>
          <Card shadow='sm' radius='md' padding='md' m={"md"} withBorder>
            <Title order={4} color='#001d56' mb={"sm"}>
              Approver Details
            </Title>
            <Table w={"50%"}>
              <tbody>
                <TableRow fullWidth title={"Approved By"} value={userData.CheckerEmpCode + " - " + userData.CheckerEmpName + ` (${userData.CheckerRole})`} />

                <TableRow fullWidth title={"Approved On"} value={getPresentableValue(userData.CheckerApprovedDate, true) as string} />

                <TableRow fullWidth title={"Approver Remarks"} value={userData.CheckerRemarks} />
              </tbody>
            </Table>
          </Card>
        </>
      )}
    </form>
  );
};

export default ViewInternalUser;
