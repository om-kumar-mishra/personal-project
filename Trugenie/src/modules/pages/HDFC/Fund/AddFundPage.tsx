import { Button, Flex, Modal, Space, Table, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import addLogo from "../../../../assets/logos/SVG/add_new.svg";
import { selectUserDetails } from "../../../../lib/services/hdfc_login/selectors";
import { successNotification } from "../../../../utils/notifications";
import { TableRow } from "../../../Components/TableRow";
import { AddFundsListRequested, GetFundsListRequested } from "../../../../lib/services/HDFC/Funds/action";
import { selectFundsLoaders } from "../../../../lib/services/HDFC/Funds/selector";
import { GetClientData } from "../../../../lib/services/HDFC/Commons/dataTypes";
import { selectSwitchClient } from "../../../../lib/services/HDFC/Commons/selectors";

type FormData = {
  fund_name: string;
};

const AddFundPageModal = ({ open, onClose }: { onClose: () => void; open: boolean }) => {
  const dispatch = useDispatch();
  const userDetails = useSelector(selectUserDetails);
  const loaders = useSelector(selectFundsLoaders);
  const activeClient = useSelector(selectSwitchClient) as GetClientData;

  const form = useForm<FormData>({
    initialValues: {
      fund_name: "",
    },
    validateInputOnChange: true,
    validate: {
      //If Needed
    },
  });

  const actionCallback = (success: boolean) => {
    if (success) {
      successNotification("Fund added successfully");
      dispatch(GetFundsListRequested(activeClient.ClientId, userDetails?.EmailId ?? ""));
      onClose();
      form.reset();
    } else {
      console.error("Failed to add fund");
    }
  };

  const handleFormSubmit = (data: FormData) => {
    const payload = {
      clientid: activeClient.ClientId,
      clientName: userDetails?.userName ?? "",
      fundName: data.fund_name,
      createdBy: userDetails?.EmailId ?? "",
    };
    dispatch(AddFundsListRequested(payload, actionCallback));
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
            Add Fund
          </Text>
        </Flex>
      }>
      <form onSubmit={form.onSubmit(handleFormSubmit)}>
        <Table style={{ overflow: "visible" }}>
          <tbody style={{ overflow: "visible" }}>
            <TableRow
              withAsterisk
              title={"Fund Name"}
              value={<TextInput maxLength={100} placeholder='Enter Fund Name' {...form.getInputProps("fund_name")} />}
            />
          </tbody>
        </Table>
        <Space h={"sm"} />
        <Flex justify={"end"} gap={"xl"}>
          <Button onClick={form.reset} variant='outline' className='reset-btn-onhover'>
            Reset
          </Button>
          <Button color='truboard-primary.0' type='submit' loading={loaders?.addFundsListDetails}>
            Submit
          </Button>
        </Flex>
      </form>
    </Modal>
  );
};

export default AddFundPageModal;
