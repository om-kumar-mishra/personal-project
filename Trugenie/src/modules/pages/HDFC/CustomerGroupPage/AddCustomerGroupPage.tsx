import { Button, Flex, Modal, Space, Table, Text, TextInput, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import addLogo from "../../../../assets/logos/SVG/add_new.svg";
import { selectSwitchClient } from "../../../../lib/services/HDFC/Commons/selectors";
import { addCustomerGroupRequested, getCustomerGroupListRequested } from "../../../../lib/services/HDFC/CustomerGroupServices/actions";
import { selectCustomerGroupLoaders } from "../../../../lib/services/HDFC/CustomerGroupServices/selectors";
import { selectUserDetails } from "../../../../lib/services/hdfc_login/selectors";
import { successNotification } from "../../../../utils/notifications";
import { TableRow } from "../../../Components/TableRow";
import { GetClientData } from "../../../../lib/services/HDFC/Commons/dataTypes";
import { UserDetails } from "../../../../lib/services/hdfc_login/dataTypes";
import { selectDevLocationList } from "../../../../lib/services/HDFC/DeveloperLocation/selectors"
import { LocationListDataType } from "../../../../lib/services/HDFC/DeveloperLocation/dataTypes"

type FormData = {
  customer_group: string;
  location: string;
};

const AddCustomerGroupPageModal = ({ open, onClose }: { onClose: () => void; open: boolean }) => {
  const dispatch = useDispatch();
  const userDetails = useSelector(selectUserDetails) as UserDetails;
  const loaders = useSelector(selectCustomerGroupLoaders);
  const activeClient = useSelector(selectSwitchClient) as GetClientData;
  const developerList = useSelector(selectDevLocationList);

  const form = useForm<FormData>({
    initialValues: {
      customer_group: "",
      location: ""
    },
    validateInputOnChange: true,
    validate: {
      customer_group: value => {
        if (value.trim() === "") {
          return "Group cannot be empty.";
        } else if (!/[a-zA-Z0-9!@#$%^&*()_+=[\]{};':"|,.<>/? ]{1,100}$/.test(value)) {
          return "Group must start with alphanumeric characters and can contain special characters, with a maximum length of 100 characters.";
        } else {
          return null;
        }
      },
    },
  });

  const options = developerList && developerList?.map((item: LocationListDataType) => ({
    value: item.DeveloperLocationName,
    label: item.DeveloperLocationName,
  }))

  const actionCallback = (success: boolean, message?: string) => {
    if (success) {
      successNotification(message ?? "Group added successfully");
      dispatch(getCustomerGroupListRequested(activeClient?.ClientId));
      onClose();
      form.reset();
    }
  };

  const handleFormSubmit = (data: FormData) => {
    dispatch(addCustomerGroupRequested(userDetails?.EmailId, data.customer_group, activeClient.ClientId, data.location, actionCallback));
  };

  return (
    <Modal
      className='modalDropdownOverlay'
      size={"lg"}
      opened={open}
      onClose={() => {
        onClose();
        form.reset();
      }}
      title={
        <Flex gap={"xs"}>
          <img src={addLogo} className='icon-size' style={{ width: "20px", height: "20px", color: "#001d56" }} />
          <Text size={"md"} fw='bold' color={"#001d56"}>
            Add Group
          </Text>
        </Flex>
      }>
      <form onSubmit={form.onSubmit(handleFormSubmit)}>
        <Table style={{ overflow: "visible" }}>
          <tbody style={{ overflow: "visible" }}>
            <TableRow
              withAsterisk
              title={"Group"}
              value={
                <TextInput
                  maxLength={100}
                  placeholder='Enter Group Name'
                  {...form.getInputProps("customer_group")}
                />
              }
            />
            <TableRow
              withAsterisk
              title={"Group head office"}
              value={
                <Select
                  placeholder="Select head office"
                  data={options ?? []}
                  {...form.getInputProps("location")}
                />
              }
            />
          </tbody>
        </Table>
        <Space h={"sm"} />
        <Flex justify={"end"} gap={"xl"}>
          <Button onClick={form.reset} variant='outline' className='reset-btn-onhover'>
            Reset
          </Button>
          <Button color='truboard-primary.0'   type='submit' loading={loaders.addCustomerGroup}>
            Submit
          </Button>
        </Flex>
      </form>
    </Modal>
  );
};

export default AddCustomerGroupPageModal;
