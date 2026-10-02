import { Button, Flex, Loader, Modal, Select, Space, Table, Text, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "../../../../../assets/logos/SVG/Edit.svg";
import { getFilteredInvesteeListRequested } from "../../../../../lib/services/HDFC/CustomerInvesteeCompany/actions";
import { selectCustomerInvesteeLoaders, selectFilteredCustomerInvesteeList } from "../../../../../lib/services/HDFC/CustomerInvesteeCompany/selectors";
import { editExternalUserRequested, getExternalUserListRequested } from "../../../../../lib/services/HDFC/ExternalUser/actions";
import { GetExternalUserDataType } from "../../../../../lib/services/HDFC/ExternalUser/dataTypes";
import { selectExternalUserLoaders } from "../../../../../lib/services/HDFC/ExternalUser/selectors";
import { selectUserDetails } from "../../../../../lib/services/hdfc_login/selectors";
import { TableRow } from "../../../../Components/TableRow";
import { successNotification } from "../../../../Components/UtilityFunctions";
import { GetClientData } from "../../../../../lib/services/HDFC/Commons/dataTypes";
import { selectSwitchClient } from "../../../../../lib/services/HDFC/Commons/selectors";

type FormData = {
  customer_investee_company?: number;
  employee_name: string;
  remarks: string;
};

const EditExtenalUser = ({
  open,
  onClose,
  onSubmit,
  externalUserDetails,
}: {
  onClose: () => void;
  open: boolean;
  onSubmit: () => void;
  externalUserDetails: GetExternalUserDataType | null;
}) => {
  const customerInvesteeList = useSelector(selectFilteredCustomerInvesteeList);
  const customerInvesttLoader = useSelector(selectCustomerInvesteeLoaders);
  const userDetails = useSelector(selectUserDetails);
  const externalUserloaders = useSelector(selectExternalUserLoaders);
  const activeClient = useSelector(selectSwitchClient) as GetClientData;
  const customerInvesteeData =
    customerInvesteeList && customerInvesteeList.length > 0
      ? customerInvesteeList.map(item => {
        return {
          value: item.BorrowerDetailId,
          label: item.BorrowerName,
        };
      })
      : [];

  const dispatch = useDispatch();
  const form = useForm<FormData>({
    initialValues: {
      customer_investee_company: externalUserDetails?.InvesteeId,
      employee_name: externalUserDetails?.Name ?? "",
      remarks: "",
    },
    validateInputOnChange: true,
    validateInputOnBlur: true,
    validate: {
      customer_investee_company: value => {
        if (value) {
          return null;
        } else {
          return "Borrower name is required";
        }
      },
      employee_name: value => {
        if (value !== null && value !== undefined && value.trim() !== "") {
          return !/^[a-zA-Z' ]{1,100}$/.test(value) ? "Employee Name must contain only Alphabetic Characters and have a maximum length of 100 characters." : null;
        } else {
          return "This field is required";
        }
      },
      remarks: value => {
        if (value && value.length > 500) {
          return "Remark cannot exceed 500 characters";
        } else {
          return null;
        }
      },
    },
  });

  const actionCallback = (success: boolean) => {
    if (success) {
      successNotification("User edit request sent for approval!");
      dispatch(getExternalUserListRequested(userDetails?.EmailId ?? "",activeClient.ClientId));
      form.reset();
      onSubmit();
      onClose();
    }
  };
  useEffect(() => {
    if (externalUserDetails?.DeveloperID) dispatch(getFilteredInvesteeListRequested(externalUserDetails?.DeveloperID, userDetails?.EmailId ?? ""));
  }, [externalUserDetails?.DeveloperID]);

  useEffect(() => {
    form.setValues({
      customer_investee_company: externalUserDetails?.InvesteeId,
      employee_name: externalUserDetails?.Name ?? "",
      remarks: "",
    });
  }, [externalUserDetails]);

  const handleFormSubmit = (data: FormData) => {
    const payload = {
      EuserID: externalUserDetails?.EUserId ?? 0,
      Name: form.values.employee_name ?? "",
      Email: externalUserDetails?.Email ?? "",
      createdBy: userDetails?.EmailId ?? "",
      createbyusername: `${userDetails?.EmpCode}-${userDetails?.EmpName} (${userDetails?.TemplateRoleName})`,
      DeveloperID: externalUserDetails?.DeveloperID ?? 0,
      DeveloperName: externalUserDetails?.DeveloperName ?? "",
      InvesteeId: data.customer_investee_company,
      InvesteeName: customerInvesteeList ? customerInvesteeList.find(item => item.BorrowerDetailId === data.customer_investee_company)?.BorrowerName ?? "" : "",
      remark: data.remarks,
      UniqueCode: externalUserDetails?.UniqueCode ?? "",
    };
    dispatch(editExternalUserRequested(payload, actionCallback));
  };

  const isFormModified = externalUserDetails?.InvesteeId !== form.values.customer_investee_company || externalUserDetails?.Name !== form.values.employee_name;

  return (
    <Modal
      size={"lg"}
      opened={open}
      onClose={() => {
        onClose();
        form.reset();
      }}
      title={
        <Flex gap={"xs"}>
          <img src={EditIcon} className='icon-size' style={{ width: "20px", height: "20px", color: "#001d56" }} />
          <Text size={"md"} fw='bold' color={"#001d56"}>
            Edit External User
          </Text>
        </Flex>
      }>
      <form onSubmit={form.onSubmit(handleFormSubmit)}>
        <Table>
          <tbody>
            <TableRow withAsterisk title={"Group"} value={<Text>{externalUserDetails?.DeveloperName}</Text>} />
            <TableRow
              title={"Borrower"}
              withAsterisk
              value={
                <Select
                  required
                  searchable
                  nothingFound={customerInvesttLoader.filteredCustomerInvesteeList ? <Loader /> : "No data found"}
                  data={customerInvesteeData as any}
                  placeholder='Borrower name'
                  {...form.getInputProps("customer_investee_company")}
                />
              }
            />
            <TableRow
              title={"Employee name"}
              withAsterisk
              fullWidth
              value={<TextInput maxLength={100} placeholder='Employee name' {...form.getInputProps("employee_name")} />}
            />
            <TableRow title={"Email ID"} value={<Text>{externalUserDetails?.Email}</Text>} />
            <TableRow title={"Role/Template Name"} value={<Text>{externalUserDetails?.RoleName}</Text>} />
            <TableRow title={"Status"} value={<Text>{externalUserDetails?.Status}</Text>} />
            <TableRow title={"Remarks"} value={<Textarea maxLength={500} placeholder='Remarks' {...form.getInputProps("remarks")} />} />
          </tbody>
        </Table>
        <Space h={"sm"} />
        <Flex justify={"end"} gap={"xl"}>
          <Button
            variant='outline'
            className='reset-btn-onhover'
            onClick={() =>
              form.setValues({
                customer_investee_company: externalUserDetails?.InvesteeId,
                employee_name: externalUserDetails?.Name ?? "",
                remarks: "",
              })
            }>
            Reset
          </Button>
          <Button color='truboard-primary.0' type='submit' disabled={!isFormModified} loading={externalUserloaders.editExternalUser}>
            Submit
          </Button>
        </Flex>
      </form>
    </Modal>
  );
};

export default EditExtenalUser;
