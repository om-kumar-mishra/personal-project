import { Button, Flex, Modal, Space, Table, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import addLogo from "../../../../assets/logos/SVG/add_new.svg";
// import { selectRMUserList, selectRMUserLoaders } from "../../../../lib/services/HDFC/Commons/selectors";
import { selectUserDetails } from "../../../../lib/services/hdfc_login/selectors";
import { successNotification } from "../../../../utils/notifications";
import { TableRow } from "../../../Components/TableRow";
import { AddDebentureListRequested, GetDebentureListRequested } from "../../../../lib/services/HDFC/Debenture Trustee/actions";
import { selectDebentureLoaders } from "../../../../lib/services/HDFC/Debenture Trustee/selector";
import { GetClientData } from "../../../../lib/services/HDFC/Commons/dataTypes";
import { selectSwitchClient } from "../../../../lib/services/HDFC/Commons/selectors";

type FormData = {
  client: string;
  debenture_name: string;
  debenture_cin: string;
};

const AddDebentureTrusteePageModal = ({ open, onClose }: { onClose: () => void; open: boolean }) => {
  const dispatch = useDispatch();
  const userDetails = useSelector(selectUserDetails);
  const activeClient = useSelector(selectSwitchClient) as GetClientData;
  const loaders = useSelector(selectDebentureLoaders);

  const form = useForm<FormData>({
    initialValues: {
      client: "",
      debenture_name: "",
      debenture_cin: "",
    },
    validateInputOnChange: true,
    validate: {
      // customer_group: value => {
      //   if (value.trim() === "") {
      //     return "Group cannot be empty.";
      //   } else if (!/[a-zA-Z0-9!@#$%^&*()_+=[\]{};':"|,.<>/? ]{1,100}$/.test(value)) {
      //     return "Group must start with alphanumeric characters and can contain special characters, with a maximum length of 100 characters.";
      //   } else {
      //     return null;
      //   }
      // },
      // lead_rm: value => (value == "" || value == null ? "This field cannot be empty." : null),
      // rm_2: value => (value == "" || value == null ? "This field cannot be empty." : null),
    },
  });

  const actionCallback = (success: boolean) => {
    if (success) {
      successNotification("Group added successfully");
      dispatch(GetDebentureListRequested(activeClient.ClientId, userDetails?.EmailId ?? ""));
      onClose();
      form.reset();
    }
  };

  const handleFormSubmit = (data: FormData) => {
    dispatch(
      AddDebentureListRequested(
        {
          debenturename: data.debenture_name,
          cin: data.debenture_cin,
          clientId: activeClient.ClientId,
          clientName: userDetails?.EmailId ?? "",
        },
        actionCallback
      )
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
            Add Debenture
          </Text>
        </Flex>
      }>
      <form onSubmit={form.onSubmit(handleFormSubmit)}>
        <Table style={{ overflow: "visible" }}>
          <tbody style={{ overflow: "visible" }}>
            {/* <TableRow
              // withAsterisk
              title={"Client"}
              value={
                <Select searchable
                  required
                  clearable
                  placeholder='Select client'
                  dropdownPosition='bottom'
                  nothingFound={rmUsersLoaders.getRMUserList ? <Loader /> : "No data found"}
                  data={rmUsersListData}
                  // data={rmUsersListData.filter(item => item.value !== form.values.rm_2 && item.value !== form.values.rm_3)}
                  {...form.getInputProps("client")}
                />
              }
            /> */}
            <TableRow
              // withAsterisk
              title={"Debenture Name"}
              value={<TextInput maxLength={100} placeholder='Enter Debenture Name' {...form.getInputProps("debenture_name")} />}
            />
            <TableRow
              // withAsterisk
              title={"Debenture CIN"}
              value={<TextInput maxLength={100} placeholder='Enter Debenture CIN' {...form.getInputProps("debenture_cin")} />}
            />
          </tbody>
        </Table>
        <Space h={"sm"} />
        <Flex justify={"end"} gap={"xl"}>
          <Button onClick={form.reset} variant='outline' className='reset-btn-onhover'>
            Reset
          </Button>
          <Button color='truboard-primary.0' type='submit' loading={loaders.debentureList}>
            Submit
          </Button>
        </Flex>
      </form>
    </Modal>
  );
};

export default AddDebentureTrusteePageModal;
