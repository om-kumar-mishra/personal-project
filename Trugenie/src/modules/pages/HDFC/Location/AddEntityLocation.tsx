import { Button, Flex, Loader, Modal, Select, Space, Table, Text, TextInput, useMantineTheme } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import addLogo from "../../../../assets/logos/SVG/add_new.svg";
import { addLocationRequested, getLocationListRequested } from "../../../../lib/services/HDFC/Location/actions";
import { selectLocationLoaders } from "../../../../lib/services/HDFC/Location/selectors";
import { getRegionListRequested } from "../../../../lib/services/HDFC/Region/actions";
import { selectRegionList, selectRegionLoaders } from "../../../../lib/services/HDFC/Region/selectors";
import { getZonesListRequested } from "../../../../lib/services/HDFC/Zone/actions";
import { selectZoneList, selectZoneLoaders } from "../../../../lib/services/HDFC/Zone/selectors";
import { selectUserDetails } from "../../../../lib/services/hdfc_login/selectors";
import { TableRow } from "../../../Components/TableRow";
import { getMantineDropdownData, successNotification } from "../../../Components/UtilityFunctions";
import { GetClientData } from "../../../../lib/services/HDFC/Commons/dataTypes";
import { selectSwitchClient } from "../../../../lib/services/HDFC/Commons/selectors";

type FormData = {
  ZoneName: string | number;
  RegionName?: string;
  LocationName: string;
};

const AddEntityLocation = ({ open, onClose }: { onClose: () => void; open: boolean }) => {
  const form = useForm<FormData>({
    initialValues: {
      ZoneName: "",
      RegionName: "",
      LocationName: "",
    },
    validate: {
      ZoneName: value => (value !== "" ? null : "This field cannot be empty."),
      RegionName: value => (value !== "" ? null : "This field cannot be empty."),
      LocationName: value => {
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
  const theme = useMantineTheme();
  const userDetails = useSelector(selectUserDetails);
  const dispatch = useDispatch();
  const zoneLoaders = useSelector(selectZoneLoaders);
  const zoneList = useSelector(selectZoneList);
  const regionLoaders = useSelector(selectRegionLoaders);
  const regionList = useSelector(selectRegionList);
  const locationLoader = useSelector(selectLocationLoaders);
  const zoneDropdownData = getMantineDropdownData(zoneList ?? [], "ZoneID", "ZoneName");
  const activeClient = useSelector(selectSwitchClient) as GetClientData;

  const zoneFilterId = regionList
    ?.filter(item => item.ZoneID === Number(form.values.ZoneName))
    .map(item => ({
      value: item.RegionsId,
      label: item?.RegionsName,
    }));

  useEffect(() => {
    dispatch(getZonesListRequested(activeClient.ClientId, userDetails?.EmailId ?? ""));
    dispatch(getRegionListRequested(activeClient.ClientId, userDetails?.EmailId ?? ""));
  }, []);

  const actionCallback = (success: boolean) => {
    if (success) {
      successNotification("Location added successfully");
      dispatch(getLocationListRequested(activeClient.ClientId, userDetails?.EmailId ?? ""));
      form.reset();
      onClose();
    }
  };
  const handleFormSubmit = (data: FormData) => {
    dispatch(addLocationRequested(activeClient.ClientId, Number(data.ZoneName), userDetails?.EmailId ?? "", data.LocationName, Number(data.RegionName), actionCallback));
  };
  useEffect(() => {
    form.values?.ZoneName && form.setFieldValue("RegionName", "");
  }, [form.values.ZoneName]);

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
            Add Location
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
                  placeholder='Select Zone Name'
                  nothingFound={zoneLoaders.zonesList ? <Loader /> : "No zones found"}
                  data={zoneDropdownData}
                  {...form.getInputProps("ZoneName")}
                />
              }
            />
            <TableRow
              title={"Region Name"}
              withAsterisk
              value={
                <Select
                  placeholder='Select Region Name'
                  nothingFound={regionLoaders.RegionList ? <Loader /> : "No regions found"}
                  data={zoneFilterId as any}
                  {...form.getInputProps("RegionName")}
                />
              }
            />
            <TableRow
              title={"Location name"}
              withAsterisk
              value={<TextInput maxLength={100} placeholder='Enter Location name' {...form.getInputProps("LocationName")} />}
            />
          </tbody>
        </Table>
        <Space h={"sm"} />
        <Flex justify={"end"} gap={"xl"}>
          <Button color='truboard-primary.0' type='submit' loading={locationLoader?.addLocation}>
            Submit
          </Button>
        </Flex>
      </form>
    </Modal>
  );
};

export default AddEntityLocation;
