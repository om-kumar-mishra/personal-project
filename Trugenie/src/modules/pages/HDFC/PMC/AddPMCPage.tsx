import { Button, Flex, Modal, Space, Table, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import addLogo from "../../../../assets/logos/SVG/add_new.svg";
// import { selectRMUserList, selectRMUserLoaders } from "../../../../lib/services/HDFC/Commons/selectors";
import { selectUserDetails } from "../../../../lib/services/hdfc_login/selectors";
import { successNotification } from "../../../../utils/notifications";
import { TableRow } from "../../../Components/TableRow";
import { selectPMCLoaders } from "../../../../lib/services/HDFC/PMC/selector";
import { AddPMCListRequested, GetPMCListRequested } from "../../../../lib/services/HDFC/PMC/actions";
import { GetClientData } from "../../../../lib/services/HDFC/Commons/dataTypes";
import { selectSwitchClient } from "../../../../lib/services/HDFC/Commons/selectors";

type FormData = {
  client: string;
  pmc_name: string;
  pmc_cin: string;
};

const AddPMCPageModal = ({ open, onClose }: { onClose: () => void; open: boolean }) => {
  const dispatch = useDispatch();
  const userDetails = useSelector(selectUserDetails);
  const loaders = useSelector(selectPMCLoaders);
  const activeClient = useSelector(selectSwitchClient) as GetClientData;

  const form = useForm<FormData>({
    initialValues: {
      client: "",
      pmc_name: "",
      pmc_cin: "",
    },
    validateInputOnChange: true,
    validate: {
      //If required
    },
  });

  const actionCallback = (success: boolean) => {
    if (success) {
      successNotification("Group added successfully");
      dispatch(GetPMCListRequested(activeClient.ClientId, userDetails?.EmailId ?? ""));
      onClose();
      form.reset();
    }
  };

  const handleFormSubmit = (data: FormData) => {
    dispatch(
      AddPMCListRequested(
        {
          pmcname: data.pmc_name,
          cin: data.pmc_cin,
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
            Add PMC
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
              withAsterisk
              title={"PMC Name"}
              value={<TextInput maxLength={100} placeholder='Enter PMC Name' {...form.getInputProps("pmc_name")} />}
            />
            <TableRow
              withAsterisk
              title={"PMC CIN"}
              value={<TextInput maxLength={100} placeholder='Enter PMC CIN' {...form.getInputProps("pmc_cin")} />}
            />
          </tbody>
        </Table>
        <Space h={"sm"} />
        <Flex justify={"end"} gap={"xl"}>
          <Button onClick={form.reset} variant='outline' className='reset-btn-onhover'>
            Reset
          </Button>
          <Button color='truboard-primary.0' type='submit' loading={loaders.pmcList}>
            Submit
          </Button>
        </Flex>
      </form>
    </Modal>
  );
};

export default AddPMCPageModal;
