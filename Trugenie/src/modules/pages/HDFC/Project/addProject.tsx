import { Button, Card, Flex, Loader, Select, Space, Text, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import addLogo from "../../../../assets/logos/SVG/add_new.svg";
import { ResetRMUsersList, getTaggedRMUserListRequested } from "../../../../lib/services/HDFC/Commons/actions";
import { GetClientData, GetRmUsersDataType } from "../../../../lib/services/HDFC/Commons/dataTypes";
import { selectSwitchClient, selectTaggedRMUserList } from "../../../../lib/services/HDFC/Commons/selectors";
import { getCustomerGroupListRequested } from "../../../../lib/services/HDFC/CustomerGroupServices/actions";
import { selectCustomerGroupList, selectCustomerGroupLoaders } from "../../../../lib/services/HDFC/CustomerGroupServices/selectors";
import { getFilteredInvesteeListRequested } from "../../../../lib/services/HDFC/CustomerInvesteeCompany/actions";
import { selectCustomerInvesteeLoaders, selectFilteredCustomerInvesteeList } from "../../../../lib/services/HDFC/CustomerInvesteeCompany/selectors";
import { getLocationListRequested } from "../../../../lib/services/HDFC/Location/actions";
import { selectLocationList, selectLocationLoaders } from "../../../../lib/services/HDFC/Location/selectors";
import { createProjectRequest, projectUsersListRequest, requestAllProjectList } from "../../../../lib/services/HDFC/Project/actions";
import { selectLoaders, selectProjectUserList } from "../../../../lib/services/HDFC/Project/selectors";
import { getRegionListRequested } from "../../../../lib/services/HDFC/Region/actions";
import { selectRegionList, selectRegionLoaders } from "../../../../lib/services/HDFC/Region/selectors";
import { getZonesListRequested } from "../../../../lib/services/HDFC/Zone/actions";
import { selectZoneList, selectZoneLoaders } from "../../../../lib/services/HDFC/Zone/selectors";
import { selectUserDetails } from "../../../../lib/services/hdfc_login/selectors";
import { ROUTES } from "../../../../routeConstants";
import { TableRow } from "../../../Components/TableRow";
import { getMantineDropdownData, successNotification } from "../../../Components/UtilityFunctions";

type FormData = {
  customer_group: string | null;
  customer_investee_company: string;
  project_id: string | null;
  project_name: string;
  zone: string | null;
  region: string | null;
  locations: string | null;
  address: string;
};

const rmsNeeded = ["Lead RM", "RM 2", "RM 3"];

const AddProject = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDetails = useSelector(selectUserDetails);
  const projectLoaders = useSelector(selectLoaders);
  const activeClient = useSelector(selectSwitchClient) as GetClientData;

  const customerGroupList = useSelector(selectCustomerGroupList);
  const customerInvesteeList = useSelector(selectFilteredCustomerInvesteeList);

  const customerGroupLoaders = useSelector(selectCustomerGroupLoaders);
  const customerInvesteeLoaders = useSelector(selectCustomerInvesteeLoaders);

  const customerGroupListData = getMantineDropdownData(customerGroupList ?? [], "DeveloperId", "DeveloperName");
  const customerInvesteeListData = getMantineDropdownData(customerInvesteeList ?? [], "BorrowerDetailId", "BorrowerName");

  const zoneLoaders = useSelector(selectZoneLoaders);
  const zoneList = useSelector(selectZoneList);

  const regionLoaders = useSelector(selectRegionLoaders);
  const regionList = useSelector(selectRegionList);

  const locationList = useSelector(selectLocationList);
  const locationLoaders = useSelector(selectLocationLoaders);
  const projectUsersList = useSelector(selectProjectUserList);

  const taggedRmUserList = useSelector(selectTaggedRMUserList);

  const zoneDropdownData = getMantineDropdownData(zoneList ?? [], "ZoneID", "ZoneName");

  const [rmData, setRmData] = useState<GetRmUsersDataType[] | null>(taggedRmUserList ?? []);

  useEffect(() => {
    if (userDetails?.EmailId) {
      dispatch(getZonesListRequested(activeClient.ClientId, userDetails.EmailId));
      dispatch(getRegionListRequested(activeClient.ClientId, userDetails.EmailId));
      dispatch(getLocationListRequested(activeClient.ClientId, userDetails?.EmailId));
    }
  }, [userDetails?.EmailId]);

  useEffect(() => {
    activeClient.ClientId && dispatch(getCustomerGroupListRequested(activeClient.ClientId));
  }, [activeClient.ClientId]);

  useEffect(() => {
    return () => {
      dispatch(ResetRMUsersList());
    };
  }, []);

  const appendedProjectUsers =
    projectUsersList && projectUsersList.length > 0
      ? projectUsersList.map(item => {
        return {
          emailId: item.EmailId.toString(),
          empCode: item.EmpCode.toString(),
          empName: item.EmpName.toString(),
          userRole: item.TemplateRoleName.toString(),
          accessTag: item.AccessTag,
        };
      })
      : [];

  // useEffect(() => {
  //   setRmData(taggedRmUserList);
  // }, [taggedRmUserList]);

  const form = useForm<FormData>({
    initialValues: {
      customer_group: null,
      customer_investee_company: "",
      project_id: "",
      project_name: "",
      zone: "",
      region: "",
      locations: "",
      address: "",
    },

    validate: {
      customer_group: value => (value !== null ? null : "This field is required"),
      customer_investee_company: value => (value !== "" ? null : "This field is required"),
      project_id: value => {
        if (!value) {
          return "This field cannot be empty.";
        } else if (!/^[a-zA-Z0-9]+$/.test(value)) {
          return "Invalid input! Input can contains only alphanumerics.";
        } else {
          return null;
        }
      },
      project_name: value => (value.trim().length !== 0 ? null : "This field is required"),
      zone: value => (value !== "" ? null : "This field is required"),
      region: value => (value !== "" ? null : "This field is required"),
      locations: value => (value !== "" ? null : "This field is required"),
      address: value => (value.trim().length !== 0 ? null : "This field is required"),
    },
  });

  // useEffect(() => {
  //   if (form.values.customer_group && userDetails?.EmailId) {
  //     dispatch(getTaggedRMUserListRequested(userDetails?.EmailId ?? "", Number(form.values.customer_group)));
  //   }
  // }, [form.values.customer_group]);

  const zoneFilterId =
    regionList && regionList.length > 0
      ? regionList
        ?.filter(item => item.ZoneID === Number(form.values.zone))
        .map(item => ({
          value: item.RegionsId.toString(),
          label: item?.RegionsName,
        }))
      : [];

  const filteredaLocationList =
    locationList && locationList.length > 0
      ? locationList
        ?.filter(item => item.RegionsId === Number(form.values.region))
        .map(item => ({
          value: item.LocationId.toString(),
          label: item?.LocationName,
        }))
      : [];

  useEffect(() => {
    if (form.values.customer_group) {
      dispatch(getFilteredInvesteeListRequested(Number(form.values.customer_group), userDetails?.EmailId ?? ""));
      dispatch(projectUsersListRequest(Number(form.values.customer_group), userDetails?.EmailId ?? ""));
    }
  }, [form.values.customer_group]);

  const actionCallback = (success: boolean) => {
    if (success) {
      successNotification("Project Added successfully");
      dispatch(requestAllProjectList(activeClient.ClientId, userDetails?.EmailId ?? ""));
      navigate(ROUTES.PROJECT_PAGE);
    }
  };

  const handleFormSubmit = (data: FormData) => {
    const payload = {
      assetName: data.project_name,
      borrowerDetailId: Number(data.customer_investee_company),
      borrowerName: customerInvesteeListData.find(item => item.value === data.customer_investee_company)?.label ?? "",
      developerId: Number(data.customer_group),
      developerName: customerGroupListData.find(item => item.value === data.customer_group)?.label ?? "",
      createdBy: userDetails?.EmailId ?? "",
      regionsId: Number(data.region),
      locationId: Number(data.locations),
      zoneId: Number(data.zone),
      address: data.address,
      projectId: data.project_id?.toString() ?? "",
      // userType: appendedProjectUsers,
      userName: userDetails?.userName ?? "",
      userRole: userDetails?.TemplateRoleName ?? "",
      clientId: activeClient.ClientId ,
      clientName:activeClient.ClientName ,

    };
    dispatch(createProjectRequest(payload, actionCallback));
  };

  return (
    <>
      <Card shadow='sm' padding='lg' radius='md' withBorder m={20}>
        <Flex gap={"xs"} align={"center"}>
          <img src={addLogo} className='icon-size' style={{ width: "20px", height: "20px", color: "#001d56" }} />
          <Text size={"md"} fw='bold' color={"#001d56"}>
            Add Project
          </Text>
        </Flex>
        <Space h={"sm"} />
        <form onSubmit={form.onSubmit(handleFormSubmit)}>
          <TableRow
            fullWidth
            title='Group'
            value={
              <Select
                nothingFound={customerGroupLoaders.customerGroupList ? <Loader /> : "No Group found"}
                searchable
                data={customerGroupListData}
                placeholder='Group'
                {...form.getInputProps("customer_group")}
                onChange={value => {
                  if (value)
                    form.setValues({
                      customer_group: value,
                      customer_investee_company: "",
                    });
                }}
              />
            }
            withAsterisk
          />
          <TableRow
            title='Borrower     '
            value={
              <Select
                nothingFound={customerInvesteeLoaders.customerInvesteeList ? <Loader /> : "No Borrower found"}
                searchable
                data={customerInvesteeListData}
                placeholder='Borrower'
                {...form.getInputProps("customer_investee_company")}
              />
            }
            withAsterisk
          />
          <TableRow title='Project ID' value={<TextInput maxLength={50} placeholder='Enter Project ID' {...form.getInputProps("project_id")} />} withAsterisk />
          <TableRow
            title='Project Name'
            value={<TextInput maxLength={100} placeholder='Enter Project Name' {...form.getInputProps("project_name")} />}
            withAsterisk
          />
          <TableRow
            title='Zone'
            value={
              <Select
                nothingFound={zoneLoaders.zonesList ? <Loader /> : "No Zone found"}
                searchable
                data={zoneDropdownData}
                placeholder='Zone'
                {...form.getInputProps("zone")}
                onChange={value => {
                  if (value !== form.values.zone)
                    form.setValues({
                      zone: value,
                      region: "",
                      locations: "",
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
                nothingFound={regionLoaders.RegionList ? <Loader /> : "No region found"}
                searchable
                data={zoneFilterId}
                placeholder='Region'
                {...form.getInputProps("region")}
                onChange={value => {
                  if (value !== form.values.region)
                    form.setValues({
                      region: value,
                      locations: "",
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
                data={filteredaLocationList}
                placeholder='Location'
                {...form.getInputProps("locations")}
                onChange={value => {
                  if (value !== form.values.locations) form.setValues({ locations: value });
                }}
              />
            }
            withAsterisk
          />
          <TableRow
            centerHeader={false}
            title='Address'
            value={<Textarea maxLength={500} placeholder='Enter Address' {...form.getInputProps("address")} />}
            withAsterisk
          />
          {/* <TableRow
            title="RM's Tagged"
            value={
              <Flex direction={"column"}>
                {rmData?.map((item, index) => {
                  return <Text key={index}>{`${item.AccessTag} - ${item.EmpCode} ${item.EmpName}`}</Text>;
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
          <Flex justify={"end"} gap={"xl"}>
            <Button
              pl={30}
              pr={30}
              variant='outline'
              className='reset-btn-onhover'
              onClick={() => {
                form.reset();
                dispatch(ResetRMUsersList());
              }}>
              Reset
            </Button>
            <Button type='submit' pl={30} pr={30} color='truboard-primary.0' loading={projectLoaders.addProject}>
              Submit
            </Button>
          </Flex>
        </form>
      </Card>
    </>
  );
};

export default AddProject;
