import { Button, Card, Flex, Loader, Select, Space, Text, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import EditIcon from "../../../../assets/logos/SVG/Edit.svg";
import { ResetRMUsersList, getTaggedRMUserListRequested } from "../../../../lib/services/HDFC/Commons/actions";
import { GetClientData, GetRmUsersDataType } from "../../../../lib/services/HDFC/Commons/dataTypes";
import { selectRMUserLoaders, selectSwitchClient, selectTaggedRMUserList } from "../../../../lib/services/HDFC/Commons/selectors";
import { getLocationListRequested } from "../../../../lib/services/HDFC/Location/actions";
import { selectLocationList, selectLocationLoaders } from "../../../../lib/services/HDFC/Location/selectors";
import { projectUpdateFailedAction, projectUpdateRequestAction } from "../../../../lib/services/HDFC/Project/actions";
import { updateREProjectPayload } from "../../../../lib/services/HDFC/Project/dataTypes";
import { selectCustomerTaggedRMUsers, selectLoaders, selectREProjectUpdate } from "../../../../lib/services/HDFC/Project/selectors";
import { getRegionListRequested } from "../../../../lib/services/HDFC/Region/actions";
import { selectRegionList, selectRegionLoaders } from "../../../../lib/services/HDFC/Region/selectors";
import { getZonesListRequested } from "../../../../lib/services/HDFC/Zone/actions";
import { selectZoneList, selectZoneLoaders } from "../../../../lib/services/HDFC/Zone/selectors";
import { selectUserDetails } from "../../../../lib/services/hdfc_login/selectors";
import { ROUTES } from "../../../../routeConstants";
import { TableRow } from "../../../Components/TableRow";

type editFormType = {
  ProjectName: string;
  RegionsId: string | null;
  ZoneID: string | null;
  Address: string;
  remark: string;
  locationId: string | null;
};

const rmsNeeded = ["Lead RM", "RM 2", "RM 3"];

const EditProject = () => {
  const dispatch = useDispatch();
  const rmTags = useSelector(selectCustomerTaggedRMUsers);
  const userDetails = useSelector(selectUserDetails);
  const zoneList = useSelector(selectZoneList);
  const zoneLoaders = useSelector(selectZoneLoaders);
  const regionList = useSelector(selectRegionList);
  const regionLoaders = useSelector(selectRegionLoaders);
  const reProject = useSelector(selectREProjectUpdate);
  const loaders = useSelector(selectLoaders);
  const activeClient = useSelector(selectSwitchClient) as GetClientData;

  const location = useLocation();
  const navigate = useNavigate();

  const locationList = useSelector(selectLocationList);
  const locationLoaders = useSelector(selectLocationLoaders);
  const rmListLoader = useSelector(selectRMUserLoaders)
  const taggedRmUserList = useSelector(selectTaggedRMUserList);

  const [rmData, setRmData] = useState<GetRmUsersDataType[] | null>(taggedRmUserList ?? []);

  useEffect(() => {
    return () => {
      dispatch(ResetRMUsersList());
    };
  }, []);

  useEffect(() => {
    setRmData(taggedRmUserList);
  }, [taggedRmUserList]);

  // useEffect(() => {
  //   if (location.state?.DeveloperId && userDetails?.EmailId) {
  //     dispatch(getTaggedRMUserListRequested(userDetails?.EmailId ?? "", Number(location.state?.DeveloperId)));
  //   }
  // }, [location.state?.DeveloperId]);

  const formDataIntialValues = {
    ProjectName: location?.state.AssetName ?? "",
    RegionsId: location?.state.RegionsId ?? "",
    ZoneID: location?.state?.ZoneID ?? "",
    Address: location?.state.Address ?? "",
    locationId: location?.state.LocationId ?? "",
    remark: "",
  };
  const form = useForm<editFormType>({
    initialValues: formDataIntialValues,
    validateInputOnChange: true,
    validate: {
      ProjectName: value => (value.trim().length !== 0 ? null : "This field cannot be empty."),
      RegionsId: value => (value !== "" ? null : "This field cannot be empty."),
      ZoneID: value => (value !== "" ? null : "This field cannot be empty."),
      Address: value => (value.trim().length !== 0 ? null : "This field cannot be empty."),
      remark: value =>
        value.trim() == "" || value == null || value.trim().length == 0
          ? "This field cannot be empty."
          : value && value.trim().length > 500
            ? "Invalid Input! Input can not be more than 500 characters."
            : null,
      locationId: value => (value !== "" ? null : "This field is required"),
    },
  });

  useEffect(() => {
    if (reProject?.info.code) {
      form.reset();
      dispatch(projectUpdateFailedAction());
      navigate(ROUTES.PROJECT_PAGE);
    }
  }, [reProject?.info.code]);

  useEffect(() => {
    if (userDetails?.EmailId) {
      dispatch(getRegionListRequested(activeClient.ClientId, userDetails.EmailId));
      dispatch(getZonesListRequested(activeClient.ClientId, userDetails.EmailId));
      dispatch(getLocationListRequested(activeClient.ClientId, userDetails?.EmailId ?? ""));
    }
  }, [userDetails?.EmailId]);

  const zoneListSelect = zoneList && zoneList.length > 0 ? zoneList.map(item => ({ value: item.ZoneID, label: item.ZoneName })) : [];

  const regionListSelect =
    regionList && regionList.length > 0
      ? regionList
        ?.filter(item => item.ZoneID === Number(form.values.ZoneID))
        .map(item => ({
          value: item.RegionsId,
          label: item?.RegionsName,
        }))
      : [];

  const filteredaLocationList =
    locationList && locationList.length > 0
      ? locationList
        ?.filter(item => item.RegionsId === Number(form.values.RegionsId))
        .map(item => ({
          value: item.LocationId,
          label: item?.LocationName,
        }))
      : [];

  const handleFormSubmit = (values: editFormType) => {
    const updateObj: updateREProjectPayload = {
      REAssetId: location.state.REAssetId,
      assetname: values.ProjectName,
      BorrowerDetailId: location.state.BorrowerDetailId,
      BorrowerName: location.state.BorrowerName,
      DeveloperId: location.state.DeveloperId,
      DeveloperName: location.state.DeveloperName,
      createdby: userDetails?.EmailId ?? "", //doubt
      RegionsId: Number(values.RegionsId),
      LocationId: Number(values.locationId),
      zoneid: Number(values.ZoneID),
      address: values.Address,
      projectid: location.state.ProjectId,
      Remark: values.remark,
      username: userDetails?.EmpName ?? "",
      actionbyusername: userDetails?.userName ?? "",
      actionbyuserrole: userDetails?.TemplateRoleName ?? "",
    };
    dispatch(projectUpdateRequestAction(updateObj));
  };

  return (
    <>
      <Card shadow='sm' padding='lg' radius='md' withBorder m={20}>
        <Flex gap={10}>
          <img src={EditIcon} className='icon-size' style={{ width: "20px", height: "20px", color: "#001d56" }} />
          <Text size={"md"} fw='bold' color={"#001d56"}>
            Edit Project
          </Text>
        </Flex>
        <Space h={"sm"} />
        <Space h={"sm"} />
        <form onSubmit={form.onSubmit(handleFormSubmit)}>
          <TableRow fullWidth withAsterisk title='Group' value={<Text>{location?.state?.DeveloperName}</Text>} />
          <TableRow withAsterisk title='Borrower' value={<Text>{location?.state?.BorrowerName}</Text>} />
          <TableRow withAsterisk title='Project ID' value={<Text>{location?.state?.ProjectId}</Text>} />
          <TableRow
            title='Project Name'
            value={<TextInput placeholder='Edit Project Name' withAsterisk {...form.getInputProps("ProjectName")} />}
            withAsterisk
          />
          <TableRow
            title='Zone'
            value={
              <Select
                searchable
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                data={zoneListSelect}
                nothingFound={zoneLoaders.zonesList ? <Loader /> : "No Zone found"}
                placeholder='Select Zone'
                withAsterisk
                {...form.getInputProps("ZoneID")}
                onChange={value => {
                  if (value !== form.values.ZoneID)
                    form.setValues({
                      ZoneID: value,
                      RegionsId: "",
                      locationId: "",
                    });
                }}
              />
            }
            withAsterisk
          />
          <TableRow
            title='Region'
            value={
              <Select
                searchable
                nothingFound={regionLoaders.RegionList ? <Loader /> : "No Region found"}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                data={regionListSelect}
                placeholder='Select Region'
                withAsterisk
                {...form.getInputProps("RegionsId")}
                onChange={value => {
                  if (value !== form.values.RegionsId)
                    form.setValues({
                      RegionsId: value,
                      locationId: "",
                    });
                }}
              />
            }
            withAsterisk
          />
          <TableRow
            title='Location'
            value={
              <Select
                nothingFound={locationLoaders.locationList ? <Loader /> : "No Location found"}
                searchable
                data={filteredaLocationList as any}
                placeholder='Select Location'
                {...form.getInputProps("locationId")}
                onChange={value => {
                  if (value !== form.values.locationId) form.setValues({ locationId: value });
                }}
              />
            }
            withAsterisk
          />
          <TableRow
            title='Address'
            withAsterisk
            value={<Textarea placeholder='Edit Address...' maxLength={500} withAsterisk {...form.getInputProps("Address")} />}
          />
          {/* <TableRow
            title="RM's Tagged"
            value={
              <Flex direction={"column"}>
                {rmData?.map((item, index) => {
                  return (
                    <Flex key={index}>
                      <Text>{item.AccessTag} - &emsp;</Text>
                      <Text>{`${item.EmpCode} ${item.EmpName} `}</Text>
                    </Flex>
                  );
                })}
                {rmsNeeded
                  .filter(item => !rmData?.map(item => item.AccessTag)?.includes(item))
                  .map((item, index) => {
                    return (
                      <Flex key={index}>
                        <Text>{item} - &emsp;</Text>
                        {rmData && rmData.length > 0 && <Text>Not Tagged</Text>}
                      </Flex>
                    );
                  })}
              </Flex>
            }
          />{" "} */}
          <TableRow title='Status' value={<Text>{location?.state?.status}</Text>} />
          <TableRow
            title='Remark'
            withAsterisk
            value={<Textarea maxLength={500} placeholder='Enter Remarks...' withAsterisk {...form.getInputProps("remark")} />}
          />
          <Space h={"sm"} />
          <Flex justify={"end"} gap={"xl"}>
            <Button pl={30} pr={30} variant='outline' className='reset-btn-onhover' onClick={form.reset}>
              Reset
            </Button>
            <Button type='submit' pl={30} pr={30} color='truboard-primary.0' loading={loaders.reProjectUpdate}>
              Submit
            </Button>
          </Flex>
        </form>
      </Card>
    </>
  );
};

export default EditProject;
