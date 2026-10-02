import { Button, Card, Flex, Space, Text, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { openConfirmModal } from "@mantine/modals";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import RouteIcon from "../../../../assets/logos/SVG/enable_disable.svg";
import { ResetRMUsersList, getTaggedRMUserListRequested } from "../../../../lib/services/HDFC/Commons/actions";
import { GetRmUsersDataType } from "../../../../lib/services/HDFC/Commons/dataTypes";
import { selectTaggedRMUserList } from "../../../../lib/services/HDFC/Commons/selectors";
import {
  CustomerTaggedRMUsersRequestAction,
  projectUpdateStatusFailedAction,
  projectUpdateStatusRequestAction,
} from "../../../../lib/services/HDFC/Project/actions";
import { ProjectUpdateStatusPayload } from "../../../../lib/services/HDFC/Project/dataTypes";
import { selectLoaders, selectREProjectUpdateStatus } from "../../../../lib/services/HDFC/Project/selectors";
import { selectUserDetails } from "../../../../lib/services/hdfc_login/selectors";
import { ROUTES } from "../../../../routeConstants";
import { TableRow } from "../../../Components/TableRow";
import { getPresentableValue } from "../../../Components/UtilityFunctions";

type enableDisableFormType = {
  remark: string;
};

const rmsNeeded = ["Lead RM", "RM 2", "RM 3"];

const EnableDisableProject = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector(selectUserDetails);
  const reProjectStatus = useSelector(selectREProjectUpdateStatus);
  const loaders = useSelector(selectLoaders);
  const location = useLocation();
  const navigate = useNavigate();

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
  //   location.state?.DeveloperId &&
  //     // location.state?.lasteditby &&
  //     dispatch(
  //       CustomerTaggedRMUsersRequestAction({
  //         developerId: location.state.DeveloperId,
  //         createdby: location.state.lasteditby ?? userDetails?.EmailId,
  //       }),
  //     );
  // }, [location.state]);

  useEffect(() => {
    if (reProjectStatus?.info.code) {
      form.reset();
      dispatch(projectUpdateStatusFailedAction());
      navigate(ROUTES.PROJECT_PAGE);
    }
  }, [reProjectStatus?.info.code]);

  const formDataIntialValues = {
    remark: "",
  };

  const form = useForm<enableDisableFormType>({
    initialValues: formDataIntialValues,
    validateInputOnChange: true,
    validate: {
      remark: value => (value.trim().length !== 0 ? null : "This field cannot be empty."),
    },
  });

  useEffect(() => {
    if (location?.state?.DeveloperId && userDetails?.EmailId) {
      dispatch(getTaggedRMUserListRequested(userDetails?.EmailId ?? "", Number(location?.state?.DeveloperId)));
    }
  }, [location?.state?.DeveloperId]);

  const isActive = useMemo(() => {
    if (location?.state?.status) return location?.state?.status === "Enabled" ? 1 : location?.state?.status === "Disabled" ? 0 : -1;
    else return -1;
  }, [location?.state?.status]);

  const openModal = (data: enableDisableFormType) => {
    if (data) {
      openConfirmModal({
        title: (
          <>
            <img src={RouteIcon} className="icon-size" style={{ width: "20px", height: "20px", color: "#001d56" }} />
            &nbsp; {isActive ? "Disable" : "Enable"} Project
          </>
        ),
        centered: true,
        children: (
          <Text size='sm' display='flex'>
            Are you sure you want to {isActive ? "Disable" : "Enable"} project {`"${location?.state?.ProjectId}"`} ?
          </Text>
        ),
        labels: { confirm: "Confirm", cancel: "Cancel" },
        confirmProps: {
          style: { backgroundColor: "#001d56" },
        },
        onConfirm: () => handleFormSubmit(data),
      });
    }
  };

  const handleFormSubmit = (values: enableDisableFormType) => {
    const updateStatus: ProjectUpdateStatusPayload = {
      reAssetId: location.state.REAssetId,
      isActive: isActive === 1 ? 0 : 1,
      createdby: userDetails?.EmailId ?? "", //doubt
      username: userDetails?.EmpName ?? "",
      remark: values.remark,
      actionByUsername: userDetails?.userName ?? "",
      actionByUserrole: userDetails?.TemplateRoleName ?? "",
    };
    dispatch(projectUpdateStatusRequestAction(updateStatus));
  };

  return (
    <>
      <Card shadow='sm' padding='lg' radius='md' withBorder m={20}>
        <Flex gap={"xs"} justify={"space-between"}>
          <div>
            <Flex gap={10} justify={"center"} align={"center"}>
              <img src={RouteIcon} className='icon-size' style={{ width: "20px", height: "20px", color: "#001d56" }} />
              <Text size={"md"} fw='bold' color={"#001d56"}>
                Enable / Disable Project
              </Text>
            </Flex>
          </div>
        </Flex>
        <Space h={"sm"} />
        <form onSubmit={form.onSubmit(openModal)}>
          <TableRow fullWidth title='Group' value={<Text>{location?.state?.DeveloperName}</Text>} />
          <TableRow title='Borrower' value={<Text>{location?.state?.BorrowerName}</Text>} />
          <TableRow title='Project ID' value={<Text>{location?.state?.ProjectId}</Text>} />
          <TableRow title='Project Name' value={<Text>{location?.state?.AssetName}</Text>} />
          <TableRow title='Zone' value={<Text>{location?.state?.zonename}</Text>} />
          <TableRow title='Region' value={<Text>{location?.state?.RegionsName}</Text>} />
          <TableRow title='Location' value={<Text>{location?.state?.LocationName}</Text>} />
          <TableRow title='Address' value={<Text>{location?.state?.Address}</Text>} />
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
          /> */}
          <TableRow
            title='Last Edited by'
            value={
              <Text>
                {location?.state?.lasteditby ? `${location?.state?.lasteditby} - ` : ""}
                {getPresentableValue(location?.state.lastediton, true) as string}
              </Text>
            }
          />
          <TableRow title='Status' value={<Text>{location?.state?.status}</Text>} />
          <TableRow
            title='Remark'
            value={<Textarea maxLength={500} placeholder='Enter Remarks...' withAsterisk {...form.getInputProps("remark")} />}
            withAsterisk
          />
          <Space h={"sm"} />
          <Flex justify={"end"}>
            <Button color={isActive ? "red" : "green"} type='submit' pl={30} pr={30} loading={loaders.reProjectUpdateStatus}>
              {isActive ? "Disable" : !isActive ? "Enable" : ""}
            </Button>
          </Flex>
        </form>
      </Card>
    </>
  );
};

export default EnableDisableProject;
