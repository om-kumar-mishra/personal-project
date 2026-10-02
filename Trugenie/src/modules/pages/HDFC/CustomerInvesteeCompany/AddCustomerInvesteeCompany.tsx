import { Button, Flex, Loader, Modal, Select, Table, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import addLogo from "../../../../assets/logos/SVG/add_new.svg";
import { ResetRMUsersList } from "../../../../lib/services/HDFC/Commons/actions";
import { selectSwitchClient } from "../../../../lib/services/HDFC/Commons/selectors";
import { selectCustomerGroupList, selectCustomerGroupLoaders } from "../../../../lib/services/HDFC/CustomerGroupServices/selectors";
import { addCustomerInvesteeRequested, getCustomerInvesteeListRequested } from "../../../../lib/services/HDFC/CustomerInvesteeCompany/actions";
import { selectCustomerInvesteeLoaders } from "../../../../lib/services/HDFC/CustomerInvesteeCompany/selectors";
import { selectUserDetails } from "../../../../lib/services/hdfc_login/selectors";
import { TableRow } from "../../../Components/TableRow";
import { getMantineDropdownData, successNotification } from "../../../Components/UtilityFunctions";
import { GetClientData } from "../../../../lib/services/HDFC/Commons/dataTypes";
import { getCustomerGroupListRequested } from "../../../../lib/services/HDFC/CustomerGroupServices/actions";

type FormData = {
  customer_group: string;
  CreatedBy: string;
  investee_company: string;
  identity_number: string;
  pan: string;
  gst: string;
  address: string;
};

const AddCustomerInvesteeCompanyModal = ({ open, onClose }: { onClose: () => void; open: boolean }) => {
  const dispatch = useDispatch();
  const userDetails = useSelector(selectUserDetails);
  const customerGroupList = useSelector(selectCustomerGroupList);
  const loaders = useSelector(selectCustomerInvesteeLoaders);
  const customerGroupLoaders = useSelector(selectCustomerGroupLoaders);
  const customerGroupData = getMantineDropdownData(customerGroupList ?? [], "DeveloperId", "DeveloperName");
  const activeClient = useSelector(selectSwitchClient) as GetClientData;

  const form = useForm<FormData>({
    initialValues: {
      customer_group: "",
      investee_company: "",
      identity_number: "",
      pan: "",
      gst: "",
      address: "",
      CreatedBy: "",
    },

    validate: {
      customer_group: value => (value !== "" ? null : "This field cannot be empty."),
      investee_company: value => {
        if (value.trim() === "") {
          return "This field cannot be empty.";
        } else if (!/^[\w\s\S]{1,100}$/.test(value)) {
          return "Borrower must start with alphanumeric characters, allow special characters, and not exceed 100 characters.";
        } else {
          return null;
        }
      },
      pan: value => {
        if (value.trim() === "") {
          return "This field cannot be empty.";
        } else if (!/^[A-Z]{5}\d{4}[A-Z]$/.test(value) || value.trim().length !== 10) {
          return "Invalid PAN format. It should be exactly ten characters long, with the first five characters being uppercase alphabets, followed by four numbers, and ending with an uppercase alphabet.";
        } else {
          return null;
        }
      },
      gst: value => {
        if (value.trim() === "") {
          return "This field cannot be empty.";
        } else if (!/^\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/.test(value.trim()) || value.trim().length !== 15) {
          return "Invalid GST format. It should be 15 characters long with specific character requirements.";
        }
        if (!form.values.gst.includes(form.values.pan)) {
          return "Please Enter valid GST No.";
        } else {
          return false;
        }
      },
      address: value => {
        if (value.trim() === "") {
          return "This field cannot be empty.";
        } else {
          return null;
        }
      },
    },
  });

  useEffect(() => {
    activeClient.ClientId && dispatch(getCustomerGroupListRequested(activeClient.ClientId));
  }, [activeClient.ClientId]);

  const actionCallback = (success: boolean) => {
    if (success) {
      form.reset();
      dispatch(ResetRMUsersList());
      dispatch(getCustomerInvesteeListRequested(activeClient.ClientId, userDetails?.EmailId ?? ""));
      successNotification("Borrower added successfully");
      onClose();
    }
  };

  const resetForm = () => {
    form.reset();
    dispatch(ResetRMUsersList());
  };

  const handleFormSubmit = (data: FormData) => {
    dispatch(
      addCustomerInvesteeRequested(
        userDetails?.EmailId as any,
        data.investee_company,
        data.identity_number,
        activeClient.ClientId,
        Number(data.customer_group),
        userDetails?.EmailId ?? "",
        data.gst,
        data.pan,
        data.address,
        actionCallback,
      ),
    );
  };

  return (
    <Modal
      size={"lg"}
      opened={open}
      onClose={() => {
        onClose();
        resetForm();
      }}
      title={
        <Flex gap={"xs"} align={"center"}>
          <img src={addLogo} className='icon-size' style={{ width: "20px", height: "20px", color: "#001d56" }} />
          <Text size={"md"} fw='bold' color={"#001d56"}>
            Add Borrower
          </Text>
        </Flex>
      }>
      <form onSubmit={form.onSubmit(handleFormSubmit)}>
        <Table>
          <tbody>
            <TableRow
              title={"Group"}
              withAsterisk
              value={
                <Select
                  placeholder='Select Group'
                  searchable
                  nothingFound={customerGroupLoaders.customerGroupList ? <Loader /> : "No data found"}
                  data={customerGroupData}
                  {...form.getInputProps("customer_group")}
                />
              }
            />
            <TableRow
              title={"Borrower"}
              withAsterisk
              value={<TextInput placeholder='Enter the Borrower' maxLength={100} {...form.getInputProps("investee_company")} />}
            />
            <TableRow
              title={"Identity Number (CIN/LLPIN etc)"}
              value={<TextInput maxLength={50} placeholder='Enter unique Identity Number' {...form.getInputProps("identity_number")} />}
            />
            <TableRow withAsterisk title={"PAN"} value={<TextInput placeholder='Enter PAN of the Company' {...form.getInputProps("pan")} />} />
            <TableRow withAsterisk title={"GST"} value={<TextInput placeholder='Enter GST of the Company' {...form.getInputProps("gst")} />} />
            <TableRow
              withAsterisk
              title={"Address"}
              value={<TextInput maxLength={500} placeholder='Enter Address of the Company' {...form.getInputProps("address")} />}
            />
          </tbody>
        </Table>
        <Flex justify={"end"} gap={"xl"}>
          <Button onClick={resetForm} variant='outline' className='reset-btn-onhover'>
            Reset
          </Button>
          <Button color='truboard-primary.0' type='submit' loading={loaders.addCustomerInvestee}>
            Submit
          </Button>
        </Flex>
      </form>
    </Modal>
  );
};

export default AddCustomerInvesteeCompanyModal;
