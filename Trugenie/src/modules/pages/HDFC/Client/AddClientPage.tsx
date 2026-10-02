import { Button, Flex, Modal, Space, Table, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import addLogo from "../../../../assets/logos/SVG/add_new.svg";
import { selectCustomerGroupLoaders } from "../../../../lib/services/HDFC/CustomerGroupServices/selectors";
import { selectUserDetails } from "../../../../lib/services/hdfc_login/selectors";
import { TableRow } from "../../../Components/TableRow";
import { addClientRequested } from "../../../../lib/services/HDFC/Client/actions";
import { successNotification } from "../../../Components/UtilityFunctions";

type FormData = {
  clientName: string;
  clientShortName: string;
  cin: string;
  website?: string;
};

const AddClientPageModal = ({ open, onClose }: { onClose: () => void; open: boolean }) => {
  const dispatch = useDispatch();
  const userDetails = useSelector(selectUserDetails);
  const loaders = useSelector(selectCustomerGroupLoaders);

  const form = useForm<FormData>({
    initialValues: {
      clientName: "",
      clientShortName: "",
      cin: "",
    },
    validateInputOnChange: true,
    validate: {
      clientName: value => {
        if (value.trim() === "") {
          return "Client cannot be empty.";
        } else if (!/[a-zA-Z0-9!@#$%^&*()_+=[\]{};':"|,.<>/? ]{1,100}$/.test(value)) {
          return "Client must start with alphanumeric characters and can contain special characters, with a maximum length of 100 characters.";
        } else {
          return null;
        }
      },
    },
  });

  const actionCallback = (success: boolean, message?: string) => {
    if (success) {
      successNotification(message ?? "Client added successfully");
      onClose();
      form.reset();
    }
  };

  const handleFormSubmit = (data: FormData) => {
    dispatch(
      addClientRequested(
        {
          ...data,
          createdby: userDetails?.EmailId ?? "",
        },
        actionCallback,
      ),
    );
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
            Add Client
          </Text>
        </Flex>
      }>
      <form onSubmit={form.onSubmit(handleFormSubmit)}>
        <Table style={{ overflow: "visible" }}>
          <tbody style={{ overflow: "visible" }}>
            <TableRow
              withAsterisk
              title={"Client Name"}
              value={<TextInput maxLength={100} placeholder='Enter Client Name' {...form.getInputProps("clientName")} />}
            />
            <TableRow
              withAsterisk
              title={"Short Name"}
              value={<TextInput maxLength={100} placeholder='Enter Short Name' {...form.getInputProps("clientShortName")} />}
            />
            <TableRow withAsterisk title={"CIN"} value={<TextInput maxLength={100} placeholder='Enter CIN' {...form.getInputProps("cin")} />} />
            <TableRow title={"Website"} value={<TextInput maxLength={100} placeholder='Enter Webiste' {...form.getInputProps("website")} />} />
          </tbody>
        </Table>
        <Space h={"sm"} />
        <Flex justify={"end"} gap={"xl"}>
          <Button onClick={form.reset} variant='outline' className='reset-btn-onhover'>
            Reset
          </Button>
          <Button color='truboard-primary.0' type='submit' loading={loaders.addCustomerGroup}>
            Submit
          </Button>
        </Flex>
      </form>
    </Modal>
  );
};

export default AddClientPageModal;
