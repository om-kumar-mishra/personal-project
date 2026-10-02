import { Button, Flex, Modal, Space, Table, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import addLogo from "../../../../assets/logos/SVG/add_new.svg";
import { AddDeveloperLocationRequested, GetDeveloperLocationListRequested } from "../../../../lib/services/HDFC/DeveloperLocation/actions";
import { selectDevLocationLoaders, } from "../../../../lib/services/HDFC/DeveloperLocation/selectors";
import { selectUserDetails } from "../../../../lib/services/hdfc_login/selectors";
import { TableRow } from "../../../Components/TableRow";
import { successNotification } from "../../../Components/UtilityFunctions";
import { GetClientData } from "../../../../lib/services/HDFC/Commons/dataTypes";
import { selectSwitchClient } from "../../../../lib/services/HDFC/Commons/selectors";

type FormData = {
  DeveloperLocation: string;
};

const AddDeveloperLocation = ({ open, onClose }: { onClose: () => void; open: boolean }) => {
  const userDetails = useSelector(selectUserDetails);
  const devLoaders = useSelector(selectDevLocationLoaders);
  const activeClient = useSelector(selectSwitchClient) as GetClientData;

  const dispatch = useDispatch();
  const form = useForm<FormData>({
    initialValues: {
      DeveloperLocation: "",
    },

    validate: {
      DeveloperLocation: value => {
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
      successNotification("Group Head Office added successfully");
      dispatch(GetDeveloperLocationListRequested(activeClient.ClientId, userDetails?.EmailId ?? ""));
      form.reset();
      onClose();
    }
  };

  const handleFormSubmit = (data: FormData) => {
    dispatch(AddDeveloperLocationRequested(activeClient.ClientId, userDetails?.EmailId ?? "",data.DeveloperLocation, actionCallback));
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
            Add Group Head Office
          </Text>
        </Flex>
      }>
      <form onSubmit={form.onSubmit(handleFormSubmit)}>
        <Table>
          <tbody>
            <TableRow title={"Group Head Office"} withAsterisk value={<TextInput maxLength={100} placeholder='Enter Group Head Office' {...form.getInputProps("DeveloperLocation")} />} />
          </tbody>
        </Table>
        <Space h={"sm"} />
        <Flex justify={"end"} gap={"xl"}>
          <Button color='truboard-primary.0' type='submit' loading={devLoaders.AddDeveloperLocation}>
            Submit
          </Button>
        </Flex>
      </form>
    </Modal>
  );
};

export default AddDeveloperLocation;
