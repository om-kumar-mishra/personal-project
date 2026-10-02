import { Button, Flex, Modal, Space, Table, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import addLogo from "../../../../assets/logos/SVG/add_new.svg";
import { addZoneRequested, getZonesListRequested } from "../../../../lib/services/HDFC/Zone/actions";
import { selectZoneLoaders } from "../../../../lib/services/HDFC/Zone/selectors";
import { selectUserDetails } from "../../../../lib/services/hdfc_login/selectors";
import { TableRow } from "../../../Components/TableRow";
import { successNotification } from "../../../Components/UtilityFunctions";
import { GetClientData } from "../../../../lib/services/HDFC/Commons/dataTypes";
import { selectSwitchClient } from "../../../../lib/services/HDFC/Commons/selectors";

type FormData = {
  zone: string;
};

const AddEntityZone = ({ open, onClose }: { onClose: () => void; open: boolean }) => {
  const userDetails = useSelector(selectUserDetails);
  const zoneLoaders = useSelector(selectZoneLoaders);
  const activeClient = useSelector(selectSwitchClient) as GetClientData;

  const dispatch = useDispatch();
  const form = useForm<FormData>({
    initialValues: {
      zone: "",
    },

    validate: {
      zone: value => {
        if (!value) {
          return "This field cannot be empty.";
        } else if (!/^[a-zA-Z0-9- ]+$/.test(value)) {
          return "Invalid input! Input can contains only alphanumerics, ('-') and spaces .";
        } else {
          return null;
        }
      },
    },
  });

  const actionCallback = (success: boolean) => {
    if (success) {
      successNotification("Zone added successfully");
      dispatch(getZonesListRequested(activeClient.ClientId, userDetails?.EmailId ?? ""));
      form.reset();
      onClose();
    }
  };

  const handleFormSubmit = (data: FormData) => {
    dispatch(addZoneRequested(activeClient.ClientId, data.zone, userDetails?.EmailId ?? "", actionCallback));
  };

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
          <img src={addLogo} className='icon-size' style={{ width: "20px", height: "20px", color: "#001d56" }} />
          <Text size={"md"} fw='bold' color={"#001d56"}>
            Add Zone
          </Text>
        </Flex>
      }>
      <form onSubmit={form.onSubmit(handleFormSubmit)}>
        <Table>
          <tbody>
            <TableRow title={"Zone Name"} withAsterisk value={<TextInput maxLength={100} placeholder='Enter Zone Name' {...form.getInputProps("zone")} />} />
          </tbody>
        </Table>
        <Space h={"sm"} />
        <Flex justify={"end"} gap={"xl"}>
          <Button color='truboard-primary.0' type='submit' loading={zoneLoaders.addZone}>
            Submit
          </Button>
        </Flex>
      </form>
    </Modal>
  );
};

export default AddEntityZone;
