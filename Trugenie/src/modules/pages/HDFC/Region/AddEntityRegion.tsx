import { Button, Flex, Loader, Modal, Select, Space, Table, Text, TextInput, useMantineTheme } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import addLogo from "../../../../assets/logos/SVG/add_new.svg";
import { addRegionRequested, getRegionListRequested } from "../../../../lib/services/HDFC/Region/actions";
import { selectRegionLoaders } from "../../../../lib/services/HDFC/Region/selectors";
import { getZonesListRequested } from "../../../../lib/services/HDFC/Zone/actions";
import { selectZoneList, selectZoneLoaders } from "../../../../lib/services/HDFC/Zone/selectors";
import { selectUserDetails } from "../../../../lib/services/hdfc_login/selectors";
import { TableRow } from "../../../Components/TableRow";
import { getMantineDropdownData, successNotification } from "../../../Components/UtilityFunctions";
import { GetClientData } from "../../../../lib/services/HDFC/Commons/dataTypes";
import { selectSwitchClient } from "../../../../lib/services/HDFC/Commons/selectors";

type FormData = {
  zoneID: string;
  regionName: string;
};

const AddEntityRegion = ({ open, onClose }: { onClose: () => void; open: boolean }) => {
  const theme = useMantineTheme();
  const userDetails = useSelector(selectUserDetails);
  const dispatch = useDispatch();
  const RegionLoaders = useSelector(selectRegionLoaders);

  const zoneLoaders = useSelector(selectZoneLoaders);
  const zoneList = useSelector(selectZoneList);
  const zoneDropdownData = getMantineDropdownData(zoneList ?? [], "ZoneID", "ZoneName");
  const activeClient = useSelector(selectSwitchClient) as GetClientData;


  useEffect(() => {
    dispatch(getZonesListRequested(activeClient.ClientId, userDetails?.EmailId ?? ""));
  }, []);

  const form = useForm<FormData>({
    initialValues: {
      zoneID: "",
      regionName: "",
    },

    validate: {
      zoneID: value => (value !== "" ? null : "This field cannot be empty."),
      regionName: value => {
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
      successNotification("Region added successfully");
      dispatch(getRegionListRequested(activeClient.ClientId, userDetails?.EmailId ?? ""));
      form.reset();
      onClose();
    }
  };
  const handleFormSubmit = (data: FormData) => {
    dispatch(addRegionRequested(activeClient.ClientId, data.regionName, userDetails?.EmailId ?? "", Number(data.zoneID), actionCallback));
  };
  return (
    <Modal
      size={"lg"}
      opened={open}
      onClose={() => {
        onClose();
        form.reset();
      }}
      className='modalDropdownOverlay'
      title={
        <Flex gap={"xs"}>
          <img src={addLogo} className='icon-size' style={{ width: "20px", height: "20px", color: "#001d56" }} />
          <Text size={"md"} fw='bold' color={"#001d56"}>
            Add Region
          </Text>
        </Flex>
      }>
      <form onSubmit={form.onSubmit(handleFormSubmit)}>
        <Table>
          <tbody>
            <TableRow
              title={"Zone Name"}
              withAsterisk
              value={
                <Select
                  searchable
                  placeholder='Select Zone'
                  nothingFound={zoneLoaders.zonesList ? <Loader /> : "No zones found"}
                  data={zoneDropdownData}
                  {...form.getInputProps("zoneID")}
                />
              }
            />
            <TableRow
              title={"Region Name"}
              withAsterisk
              value={<TextInput maxLength={100} placeholder='Enter Region Name' {...form.getInputProps("regionName")} />}
            />
          </tbody>
        </Table>
        <Space h={"sm"} />
        <Flex justify={"end"} gap={"xl"}>
          <Button color='truboard-primary.0' type='submit' loading={RegionLoaders.addRegion}>
            Submit
          </Button>
        </Flex>
      </form>
    </Modal>
  );
};

export default AddEntityRegion;
