import { Box, Button, Card, Flex, Loader, Select, SimpleGrid, Space, Table, Text, TextInput, Textarea, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addInternalUserRequested, getInternalUserListRequested } from "../../../../../lib/services/HDFC/InternalUser/actions";
import { AddInternalUserPayloadType } from "../../../../../lib/services/HDFC/InternalUser/dataTypes";
import { selectInternalUserLoaders } from "../../../../../lib/services/HDFC/InternalUser/selectors";
import { selectUserDetails } from "../../../../../lib/services/hdfc_login/selectors";
import { ROUTES } from "../../../../../routeConstants";
import TBTextInput from "../../../../Components/TBTextInput";
import { TableRow } from "../../../../Components/TableRow";
import { createAllowedCharRegex, emailValidationRegex, successNotification } from "../../../../Components/UtilityFunctions";
import { UserRoles } from "../../../../../lib/services/hdfc_login/dataTypes";

// enum RoleTemplateFormData {
//   RM = "RM",
//   Credit = "Credit",
//   "CAD Maker" = "CAD Maker",
//   "CAD Checker" = "CAD Checker",
//   "Admin Maker" = "Admin Maker",
//   "Admin Checker" = "Admin Checker",
//   "UAM Maker" = "UAM Maker",
//   "UAM Checker" = "UAM Checker",
//   "UAM Reviewer" = "UAM Reviewer",
//   Audit = "Audit",
//   Regulatory = "Regulatory",
//   Vendor = "Vendor",
// }

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
  role_template_name: UserRoles | "";
  remarks: string;
  company_type: string;
};

const AddInternalUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDetails = useSelector(selectUserDetails);
  const internaluserLoader = useSelector(selectInternalUserLoaders);
  const form = useForm<FormData>({
    initialValues: {
      type_of_activity: "Create",
      user_id: "",
      employee_code: "",
      employee_name: "",
      email_id: "",
      branch_code: "",
      branch_name: "",
      supervisor_code: "",
      supervisor_name: "",
      department_code: "",
      department_name: "",
      role_template_name: "",
      remarks: "",
      company_type: "",
    },
    validateInputOnBlur: true,
    validateInputOnChange: true,
    validate: {
      employee_code: value => {
        if (value.trim() === "") {
          return "This field cannot be empty.";
        } else {
          const upperCaseValue = value.toUpperCase();
          if (/^[A-Z0-9]{1,20}$/.test(upperCaseValue)) {
            return null;
          } else {
            return "Employee code must be alphanumeric and have a maximum length of 20 characters.";
          }
        }
      },
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
        if (values.role_template_name === UserRoles.VENDOR) {
          if (values.company_type.trim() === "") {
            return "This field cannot be empty.";
          } else {
            return null;
          }
        } else {
          return null;
        }
      },
      user_id: value => (value && value.includes(" ") ? "Space not allowed." : null),
    },
  });

  const actionCallback = (success: boolean) => {
    if (success) {
      dispatch(getInternalUserListRequested(userDetails?.EmailId ?? ""));
      successNotification("User added successfully");
      navigate(ROUTES.UPDATE_USER, {
        state: {
          from: ROUTES.ADD_USER,
        },
      });
      form.reset();
    }
  };

  const handleFormSubmit = (data: FormData) => {
    const payload: AddInternalUserPayloadType = {
      Activity: data.type_of_activity,
      userId: -1,
      HdfcUserId: data.user_id,
      EmpCode: data.employee_code,
      EmpName: data.employee_name,
      EmailID: data.email_id,
      BranchCode: data.branch_code,
      BranchName: data.branch_name,
      SupervisorCode: data.supervisor_code,
      SupervisorName: data.supervisor_name,
      DepartmentCode: data.department_code,
      DepartmentName: data.department_name,
      TemplateRoleName: data.role_template_name,
      Remarks: data.remarks,
      UserSource: "UAM",
      MakerEmpCode: userDetails?.EmpCode ?? "",
      makerEmpName: userDetails?.EmpName ?? "",
      CompanyType: data.role_template_name === UserRoles.VENDOR ? data.company_type : "HDFC Bank",
    };
    dispatch(addInternalUserRequested(payload, actionCallback));
  };

  return (
    <form onSubmit={form.onSubmit(handleFormSubmit)}>
      <Box m={"md"}>
        <TableRow
          title={"Type of Activity"}
          withAsterisk
          fullWidth
          value={
            <TextInput
              required
              value={"Create"}
              disabled
              placeholder='Type of Activity'
              // {...form.getInputProps("type_of_activity")}
            />
          }
        />
      </Box>
      <Card shadow='sm' p={"xs"} my={"md"} withBorder m={"md"}>
        <Title order={4} color='#001d56'>
          User Details
        </Title>
        <Space h={"sm"} />
        <SimpleGrid cols={2} spacing={10}>
          <Table>
            <tbody>
              <TableRow
                title={"User ID"}
                withAsterisk
                fullWidth
                value={
                  <TBTextInput
                    regex={createAllowedCharRegex(["-"])}
                    onInput={e => {
                      e.currentTarget.value = e.currentTarget.value.toUpperCase();
                    }}
                    maxLength={20}
                    required
                    placeholder='Enter User ID'
                    {...form.getInputProps("user_id")}
                  />
                }
              />
              <TableRow
                title={"Employee Code"}
                withAsterisk
                fullWidth
                value={
                  <TBTextInput
                    regex={createAllowedCharRegex([])}
                    onInput={e => {
                      e.currentTarget.value = e.currentTarget.value.toUpperCase();
                    }}
                    maxLength={20}
                    required
                    placeholder='Employee Code'
                    {...form.getInputProps("employee_code")}
                  />
                }
              />
            </tbody>
          </Table>
          <Table>
            <tbody>
              <TableRow
                title={"Employee Name"}
                withAsterisk
                fullWidth
                value={<TextInput required placeholder='Employee Name' {...form.getInputProps("employee_name")} />}
              />
              <TableRow
                title={"Email ID"}
                withAsterisk
                fullWidth
                centerHeader={false}
                value={<TextInput maxLength={256} required placeholder='Email ID' {...form.getInputProps("email_id")} />}
              />
            </tbody>
          </Table>
        </SimpleGrid>
      </Card>
      <Card shadow='sm' p={"xs"} my={"md"} withBorder m={"md"}>
        <Title order={4} color='#001d56'>
          Branch Details
        </Title>
        <Space h={"sm"} />
        <SimpleGrid cols={2} spacing={10}>
          <TableRow
            title={"Branch Code"}
            withAsterisk
            fullWidth
            value={<TextInput required maxLength={10} placeholder='Branch Code' {...form.getInputProps("branch_code")} />}
          />

          <TableRow
            title={"Branch Name"}
            withAsterisk
            fullWidth
            value={<TextInput maxLength={256} required placeholder='Branch Name' {...form.getInputProps("branch_name")} />}
          />
        </SimpleGrid>
      </Card>

      <Card shadow='sm' p={"xs"} my={"md"} withBorder m={"md"}>
        <Title order={4} color='#001d56'>
          Supervisor Details
        </Title>
        <Space h={"sm"} />
        <SimpleGrid cols={2} spacing={10}>
          <TableRow
            title={"Supervisor Code"}
            fullWidth
            value={<TBTextInput regex={createAllowedCharRegex([])} maxLength={20} placeholder='Supervisor Code' {...form.getInputProps("supervisor_code")} />}
          />

          <TableRow
            title={"Supervisor Name"}
            fullWidth
            value={
              <TBTextInput maxLength={100} regex={createAllowedCharRegex(["'"])} placeholder='Supervisor Name' {...form.getInputProps("supervisor_name")} />
            }
          />
        </SimpleGrid>
      </Card>

      <Card shadow='sm' p={"xs"} my={"md"} withBorder m={"md"}>
        <Title order={4} color='#001d56'>
          Department Details
        </Title>
        <Space h={"sm"} />
        <SimpleGrid cols={2} spacing={10}>
          <TableRow
            title={"Department Code"}
            withAsterisk
            fullWidth
            value={<TextInput maxLength={10} required placeholder='Department Code' {...form.getInputProps("department_code")} />}
          />

          <TableRow
            title={"Department Name"}
            withAsterisk
            fullWidth
            value={<TextInput required placeholder='Department Name' {...form.getInputProps("department_name")} />}
          />
        </SimpleGrid>
      </Card>

      <Card
        shadow='sm'
        p={"xs"}
        my={"md"}
        withBorder
        m={"md"}
        sx={{
          overflow: "visible",
        }}>
        <TableRow
          title={"Role Template Name"}
          withAsterisk
          fullWidth
          value={<Select searchable required data={Object.values(UserRoles)} placeholder='Add Role Template' {...form.getInputProps("role_template_name")} />}
        />
        {form.values.role_template_name.toLowerCase() !== UserRoles.VENDOR.toLowerCase() ? (
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

      <Flex justify={"flex-end"} gap={"xl"} m='md'>
        <Button color='truboard-primary.0' type='submit'>
          {internaluserLoader.addInternalUser ? <Loader /> : "Submit"}
        </Button>
      </Flex>
    </form>
  );
};

export default AddInternalUser;
