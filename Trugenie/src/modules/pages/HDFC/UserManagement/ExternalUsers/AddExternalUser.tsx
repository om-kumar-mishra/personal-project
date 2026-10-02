import { Button, Card, Flex, Loader, Select, Space, Text, TextInput, Textarea, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCustomerGroupListRequested } from "../../../../../lib/services/HDFC/CustomerGroupServices/actions";
import { selectCustomerGroupList, selectCustomerGroupLoaders } from "../../../../../lib/services/HDFC/CustomerGroupServices/selectors";
import { getFilteredInvesteeListRequested } from "../../../../../lib/services/HDFC/CustomerInvesteeCompany/actions";
import { selectCustomerInvesteeLoaders, selectFilteredCustomerInvesteeList } from "../../../../../lib/services/HDFC/CustomerInvesteeCompany/selectors";
import { addExternalUserRequested, getExternalUserListRequested } from "../../../../../lib/services/HDFC/ExternalUser/actions";
import { AddExternalUserPayloadType } from "../../../../../lib/services/HDFC/ExternalUser/dataTypes";
import { selectExternalUserLoaders } from "../../../../../lib/services/HDFC/ExternalUser/selectors";
import { selectUserDetails } from "../../../../../lib/services/hdfc_login/selectors";
import { ROUTES } from "../../../../../routeConstants";
import { successNotification } from "../../../../../utils/notifications";
import TBTextInput from "../../../../Components/TBTextInput";
import { TableRow } from "../../../../Components/TableRow";
import { createAllowedCharRegex, getMantineDropdownData } from "../../../../Components/UtilityFunctions";
import { selectSwitchClient } from "../../../../../lib/services/HDFC/Commons/selectors";
import { GetClientData } from "../../../../../lib/services/HDFC/Commons/dataTypes";
import { UserDetails } from "../../../../../lib/services/hdfc_login/dataTypes";

type FormData = {
  customer_group: null | number | string;
  customer_investee_company: null | number;
  employee_name: string;
  email_id: string;
  remark: string;
};

const AddExternalUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDetails = useSelector(selectUserDetails) as UserDetails;
  const externalListLoaders = useSelector(selectExternalUserLoaders);
  const customerGroupList = useSelector(selectCustomerGroupList);
  const customerGroupLoaders = useSelector(selectCustomerGroupLoaders);
  const customerInvesteeList = useSelector(selectFilteredCustomerInvesteeList);
  const customerInvesteeLoaders = useSelector(selectCustomerInvesteeLoaders);
  const activeClient = useSelector(selectSwitchClient) as GetClientData;
  const customerGroupListData = getMantineDropdownData(customerGroupList ?? [], "DeveloperId", "DeveloperName");
  const customerInvesteeListData = getMantineDropdownData(customerInvesteeList ?? [], "BorrowerDetailId", "BorrowerName");

  useEffect(() => {
    dispatch(getCustomerGroupListRequested(activeClient.ClientId));
  }, [activeClient.ClientId]);

  const form = useForm<FormData>({
    initialValues: {
      customer_group: null,
      customer_investee_company: null,
      employee_name: "",
      email_id: "",
      remark: "",
    },
    validateInputOnChange: true,
    validate: {
      customer_group: value => (value !== null ? null : "This field is required"),
      customer_investee_company: value => (value !== null ? null : "This field is required"),
      employee_name: value => {
        if (value !== null && value !== undefined && value.trim() !== "") {
          return !/^[a-zA-Z' ]{1,100}$/.test(value)
            ? "Employee Name must contain only Alphabetic Characters and have a maximum length of 100 characters."
            : null;
        } else {
          return "This field is required";
        }
      },
      email_id: value =>
        value !== ""
          ? value.length > 0 && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
            ? null
            : "Please enter valid email"
          : "This field cannot be empty.",
      remark: value => (value && value.length > 500 ? "Remarks cannot exceed 500 characters." : null),
    },
  });

  useEffect(() => {
    if (form.values.customer_group) dispatch(getFilteredInvesteeListRequested(Number(form.values.customer_group), userDetails?.EmailId ?? ""));
  }, [form.values.customer_group]);

  const actionCallback = (success: boolean) => {
    if (success) {
      successNotification("Added external user successfully");
      dispatch(getExternalUserListRequested(userDetails?.EmailId ?? "",activeClient.ClientId));
      navigate(ROUTES.UPDATE_EXTERNAL_USER, {
        state: {
          from: ROUTES.ADD_EXTERNAL_USER,
        },
      });
      form.reset();
    }
  };

  const handleFormSubmit = (data: FormData) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const payload: AddExternalUserPayloadType = {
      name: data.employee_name,
      email: data.email_id,
      createdBy: userDetails?.EmailId ?? "",
      createbyusername: `${userDetails?.EmpCode}-${userDetails?.EmpName} (${userDetails?.TemplateRoleName})`,
      developerID: Number(data.customer_group),
      developerName: customerGroupListData.find(item => item.value === data.customer_group)?.label ?? "",
      investeeId: Number(data.customer_investee_company),
      remark: data.remark,
      investeeName: customerInvesteeListData.find(item => item.value === data.customer_investee_company)?.label ?? "",
      clientId:activeClient.ClientId
    };
    dispatch(addExternalUserRequested(payload, actionCallback));
  };

  return (
    <form onSubmit={form.onSubmit(handleFormSubmit)}>
      <Card shadow='md' withBorder m={"md"}>
        <Title order={4} color='#001d56'>
          User Details
        </Title>
        <Space h={"sm"} />
        <TableRow
          title={"Group"}
          withAsterisk
          fullWidth
          value={
            <Select
              searchable
              placeholder='Group'
              required
              nothingFound={customerGroupLoaders.customerGroupList ? <Loader /> : "No data found"}
              data={customerGroupListData}
              {...form.getInputProps("customer_group")}
              onChange={value => {
                if (value)
                  form.setValues({
                    customer_group: value as string,
                    customer_investee_company: null,
                  });
              }}
            />
          }
        />
        <TableRow
          title={"Borrower"}
          withAsterisk
          fullWidth
          value={
            <Select
              searchable
              placeholder='Borrower'
              nothingFound={
                customerInvesteeLoaders.filteredCustomerInvesteeList ? (
                  <Loader />
                ) : form.values.customer_group === null ? (
                  "Please select Group"
                ) : (
                  "No data found for selected Group"
                )
              }
              required
              data={customerInvesteeListData}
              {...form.getInputProps("customer_investee_company")}
            />
          }
        />

        <TableRow
          title={"Employee Name"}
          withAsterisk
          fullWidth
          value={<TBTextInput regex={createAllowedCharRegex(["'"])} placeholder='Employee Name' required {...form.getInputProps("employee_name")} />}
        />

        <TableRow
          title={"Email ID"}
          withAsterisk
          fullWidth
          value={<TextInput maxLength={256} placeholder='Email ID' required {...form.getInputProps("email_id")} />}
        />

        <TableRow title={"Role/Template Name"} fullWidth value={<Text>Customer</Text>} />

        <TableRow title={"Remark"} fullWidth value={<Textarea maxLength={500} placeholder='Remark' {...form.getInputProps("remark")} />} />
      </Card>

      <Flex justify={"flex-end"} gap={"xl"} m='md'>
        <Button color='truboard-primary.0' type='submit' loading={externalListLoaders.addExternalUser}>
          Submit
        </Button>
      </Flex>
    </form>
  );
};

export default AddExternalUser;
