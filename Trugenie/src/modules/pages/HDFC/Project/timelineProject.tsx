import { Card, Flex, Space, Text, Timeline, createStyles } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import addIcon from "../../../../assets/logos/SVG/add_new.svg";
import LeftarrowIcon from "../../../../assets/logos/SVG/left_arrow.svg";
import useShareIcon from "../../../../assets/logos/SVG/profile.svg";
import removeAccessIcon from "../../../../assets/logos/SVG/remove_access.svg";
import timelineIcon from "../../../../assets/logos/SVG/timeline.svg";
import viewIcon from "../../../../assets/logos/SVG/view.svg";
import { ResetRMUsersList, getTaggedRMUserListRequested } from "../../../../lib/services/HDFC/Commons/actions";
import { GetRmUsersDataType } from "../../../../lib/services/HDFC/Commons/dataTypes";
import { selectTaggedRMUserList } from "../../../../lib/services/HDFC/Commons/selectors";
import { projectLogsRequestAction } from "../../../../lib/services/HDFC/Project/actions";
import { selectCustomerTaggedRMUsers, selectProjectLogs } from "../../../../lib/services/HDFC/Project/selectors";
import { selectUserDetails } from "../../../../lib/services/hdfc_login/selectors";
import { formatDateWithSuffix } from "../../../../utils/commonFunctions";
import { TableRow } from "../../../Components/TableRow";
import { getPresentableValue } from "../../../Components/UtilityFunctions";

const useStyles = createStyles(() => ({
  TimelineLeftFontSize: {
    fontSize: "9px",
  },
}));

const rmsNeeded = ["Lead RM", "RM 2", "RM 3"];

const TimelineProject = () => {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const userDetails = useSelector(selectUserDetails);
  const rmTags = useSelector(selectCustomerTaggedRMUsers);
  const projectLogs = useSelector(selectProjectLogs);
  const location = useLocation();

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

  useEffect(() => {
    location.state?.REAssetId && userDetails?.EmailId && dispatch(projectLogsRequestAction(userDetails.EmailId, location.state.REAssetId));
  }, [location.state]);

  const getIcon = (value: string | null) => {
    let icon = <img src={removeAccessIcon} style={{ width: "12px", height: "12px" }} />;
    if (value) {
      if (value.toLowerCase().includes("remove")) {
        icon = <img src={removeAccessIcon} style={{ width: "12px", height: "12px" }} />;
      } else if (value.toLowerCase().includes("add")) {
        icon = <img src={viewIcon} style={{ width: "12px", height: "12px" }} />;
      } else if (value.toLowerCase().includes("edit")) {
        icon = <img src={addIcon} style={{ width: "12px", height: "12px" }} />;
      } else if (value.toLowerCase().includes("give")) {
        icon = <img src={useShareIcon} style={{ width: "12px", height: "12px" }} />;
      } else if (value.toLowerCase().includes("enable" || "disable")) {
        icon = <img src={LeftarrowIcon} style={{ width: "12px", height: "12px" }} />;
      } else {
        icon = <img src={removeAccessIcon} style={{ width: "12px", height: "12px" }} />;
      }
    }
    return icon;
  };

  const eventsList = useMemo(() => {
    if (projectLogs && projectLogs.length > 0) {
      return projectLogs.map(value => ({
        type: value.LogMessage,
        icon: getIcon(value.LogMessage),
        remarks: [`Name: ${value.actionby}`, `Remarks: ${value.Remark}`],
        date: value?.CreateAt ? formatDateWithSuffix(new Date(value.CreateAt)) : undefined,
        time: value?.CreateAt ? getPresentableValue(value.CreateAt, true, false, false, true) : undefined,
        user: value.username,
      }));
    } else return [];
  }, [projectLogs, getIcon]);

  return (
    <>
      <Card shadow='sm' padding='lg' radius='md' withBorder m={20}>
        <Flex gap={10} align={"center"}>
          <img src={timelineIcon} className='icon-size' style={{ width: "20px", height: "20px", color: "#001d56" }} />
          <Text size={"md"} fw='bold' color={"#001d56"}>
            TimeLine
          </Text>
        </Flex>
        <Space h={"sm"} />

        <Flex gap={200}>
          <div>
            <TableRow fullWidth title='Group' value={<Text>{location?.state?.DeveloperName}</Text>} />
            <TableRow title='Project ID' value={<Text>{location?.state?.ProjectId}</Text>} />
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
          </div>
          <div>
            <TableRow title='Borrower' value={<Text>{location?.state?.BorrowerName}</Text>} />
            <TableRow title='Project Name' value={<Text>{location?.state?.AssetName}</Text>} />
          </div>
        </Flex>
        <Space h={"sm"} />
      </Card>
      <Card shadow='sm' padding='lg' radius='md' withBorder m={20}>
        <Flex>
          <Flex direction={"column"} justify={"space-evenly"} gap={"xl"}>
            {eventsList.map((event, index) => {
              return (
                <div key={`timeline-${index}`}>
                  <Text className={classes.TimelineLeftFontSize}>{event.date}</Text>
                  <Text className={classes.TimelineLeftFontSize}>{event.time}</Text>
                  {/* <Text className={classes.TimelineLeftFontSize}>
                    <u>Admin User:</u>
                  </Text> */}
                  <Text className={classes.TimelineLeftFontSize}>{event.user}</Text>
                </div>
              );
            })}
          </Flex>
          <Timeline active={10} bulletSize={24} lineWidth={2} w={"100%"}>
            {eventsList.map((event, index) => (
              <Timeline.Item key={`timelineItem-${index}`} bullet={event.icon} title={event.type} p={20} style={{ fontSize: "15px" }}>
                {Array.isArray(event.remarks) ? (
                  event.remarks.map((remark, idx) => (
                    <Text key={idx} color='dimmed' size='sm'>
                      {remark}
                    </Text>
                  ))
                ) : (
                  <Text color='dimmed' size='sm'>
                    {event.remarks}
                  </Text>
                )}
              </Timeline.Item>
            ))}
          </Timeline>
        </Flex>
      </Card>
    </>
  );
};

export default TimelineProject;
