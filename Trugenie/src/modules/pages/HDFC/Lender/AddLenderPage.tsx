import { Button, Flex, Modal, Space, Table, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import addLogo from "../../../../assets/logos/SVG/add_new.svg";
import { selectSwitchClient } from "../../../../lib/services/HDFC/Commons/selectors";
import { selectUserDetails } from "../../../../lib/services/hdfc_login/selectors";
import { successNotification } from "../../../../utils/notifications";
import { TableRow } from "../../../Components/TableRow";
import { AddLenderListRequested, GetLenderListRequested } from "../../../../lib/services/HDFC/Lender/actions";
import { selectLenderLoaders } from "../../../../lib/services/HDFC/Lender/selector";
import { GetClientData } from "../../../../lib/services/HDFC/Commons/dataTypes";
import { stringify } from "querystring";

type FormData = {
  client: string;
  lender_name: string;
  lender_cin: string;
};

const AddLenderPageModal = ({ open, onClose }: { onClose: () => void; open: boolean }) => {
  const dispatch = useDispatch();
  const userDetails = useSelector(selectUserDetails);
  const loaders = useSelector(selectLenderLoaders);
  const activeClient = useSelector(selectSwitchClient) as GetClientData;

  const form = useForm<FormData>({
    initialValues: {
      client: "",
      lender_name: "",
      lender_cin: "",
    },
    validateInputOnChange: true,
    validate: {
      //If needed
    },
  });

  const actionCallback = (success: boolean) => {
    if (success) {
      successNotification("Group added successfully");
      dispatch(GetLenderListRequested(activeClient.ClientId, userDetails?.EmailId ?? ""));
      onClose();
      form.reset();
    }
  };

  const handleFormSubmit = (data: FormData) => {
    dispatch(
      AddLenderListRequested(
        {
          lendername: data.lender_name,
          cin: parseInt(data.lender_cin),
          clientid: activeClient.ClientId,
          createdby: userDetails?.EmailId ?? "",
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
            Add Lender
          </Text>
        </Flex>
      }>
      <form onSubmit={form.onSubmit(handleFormSubmit)}>
        <Table style={{ overflow: "visible" }}>
          <tbody style={{ overflow: "visible" }}>
            <TableRow
              withAsterisk
              title={"Lender Name"}
              value={<TextInput maxLength={100} placeholder='Enter Lender Name' {...form.getInputProps("lender_name")} />}
            />
            <TableRow
              withAsterisk
              title={"Lender CIN"}
              value={<TextInput maxLength={100} placeholder='Enter Lender CIN' {...form.getInputProps("lender_cin")} />}
            />
          </tbody>
        </Table>
        <Space h={"sm"} />
        <Flex justify={"end"} gap={"xl"}>
          <Button onClick={form.reset} variant='outline' className='reset-btn-onhover'>
            Reset
          </Button>
          <Button color='truboard-primary.0' type='submit' loading={loaders.lenderList}>
            Submit
          </Button>
        </Flex>
      </form>
    </Modal>
  );
};

export default AddLenderPageModal;

