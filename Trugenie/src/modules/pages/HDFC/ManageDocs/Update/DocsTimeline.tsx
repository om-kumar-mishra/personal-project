import { Card, Center, Flex, Loader, Space, Text, Timeline, createStyles } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import deleteIcon from "../../../../../assets/logos/SVG/Delete.svg";
import addIcon from "../../../../../assets/logos/SVG/add_new.svg";
import timelineIcon from "../../../../../assets/logos/SVG/timeline.svg";
import filexlsxIcon from "../../../../../assets/logos/filexlsx.svg";
import { getTaggedRMUserListRequested } from "../../../../../lib/services/HDFC/Commons/actions";
import { selectTaggedRMUserList } from "../../../../../lib/services/HDFC/Commons/selectors";
import { selectSetProject } from "../../../../../lib/services/HDFC/Project/selectors";
import { getProjectDocumentHistoryRequested } from "../../../../../lib/services/HDFC/manageDocs/actions";
import { selectGetProjectDocumentHistory, selectManageDocsUpdateLoaders } from "../../../../../lib/services/HDFC/manageDocs/selector";
import { selectUserDetails } from "../../../../../lib/services/hdfc_login/selectors";
import { TableRow } from "../../../../Components/TableRow";
import { getPresentableValue } from "../../../../Components/UtilityFunctions";

const useStyles = createStyles(() => ({
  TimelineLeftFontSize: {
    fontSize: "9px",
  },
}));

type RmsTagged = {
  AccessTag: string;
  EmpCode: string;
  EmpName: string;
};

const DocsTimeline = () => {
  const dispatch = useDispatch();
  const { classes } = useStyles();
  const project = useSelector(selectSetProject);
  const userDetails = useSelector(selectUserDetails);
  const loader = useSelector(selectManageDocsUpdateLoaders);
  const projectDocumentHistory = useSelector(selectGetProjectDocumentHistory);
  const taggedRmUserList = useSelector(selectTaggedRMUserList);
  const rmsNeeded = ["Lead RM", "RM 2", "RM 3"];
  const [rms, setRms] = useState<RmsTagged[]>([]);

  useEffect(() => {
    if (taggedRmUserList) {
      const rmList: RmsTagged[] = rmsNeeded.map(rm => {
        const emp = taggedRmUserList.find(v => v.AccessTag === rm);
        return { AccessTag: rm, EmpCode: emp?.EmpCode ?? "Not Tagged", EmpName: emp?.EmpName ?? "" };
      });
      setRms(rmList);
    } else setRms([]);
  }, [taggedRmUserList]);

  useEffect(() => {
    project?.REAssetId && dispatch(getProjectDocumentHistoryRequested(project?.REAssetId));
    userDetails?.EmailId && project?.DeveloperId && dispatch(getTaggedRMUserListRequested(userDetails?.EmailId, project?.DeveloperId));
  }, [project?.REAssetId]);

  const getIcon = (value: string | null) => {
    let icon = <img src={filexlsxIcon} style={{ width: "12px", height: "12px" }} />;
    if (value) {
      if (value.toLowerCase().includes("create")) {
        icon = <img src={addIcon} style={{ width: "12px", height: "12px" }} />;
      } else if (value.toLowerCase().includes("delete")) {
        icon = <img src={deleteIcon} style={{ width: "12px", height: "12px" }} />;
      } else {
        icon = <img src={filexlsxIcon} style={{ width: "12px", height: "12px" }} />;
      }
    }
    return icon;
  };

  const eventsList = useMemo(() => {
    return projectDocumentHistory
      ? projectDocumentHistory.map(value => ({
        type: (
          <Flex mt={-28} align='center' gap={2}>
            <img src={filexlsxIcon} className='filter-blue' style={{ width: "16px", height: "16px", marginRight: "0.2em" }} />
            <Text>{value.DocumentName}</Text>
          </Flex>
        ),
        icon: getIcon(value.Action),
        remarks: `Remarks: ${value.Remarks ?? "-"}`,
        date: value?.CreatedAt ? getPresentableValue(value.CreatedAt, true, false, false) : undefined,
        time: value?.CreatedAt ? getPresentableValue(value.CreatedAt, true, false, false, true) : undefined,
        user: value.UserName,
        title: value.Action,
      }))
      : [];
  }, [projectDocumentHistory, getIcon]);

  return (
    <>
      <Card shadow='sm' padding='lg' radius='md' withBorder m={20}>
        <Flex gap={10} align={"center"}>
          <img src={timelineIcon} className='icon-size' style={{ width: "20px", height: "20px" }} />
          <Text size='md' fw='bold' color='#001d56'>
            TimeLine
          </Text>
        </Flex>
        <Space h='sm' />
        <Flex gap={200}>
          <div>
            <TableRow fullWidth title='Group' value={<Text>{project?.DeveloperName}</Text>} />
            <TableRow title='Project ID' value={<Text>{project?.REAssetId}</Text>} />
            <TableRow
              title="RM's Tagged"
              value={
                <Text>
                  {rms?.map(item => {
                    return (
                      <Flex key={item.AccessTag}>
                        <Text>{item.AccessTag} - &emsp;</Text>
                        <Text>{`${item.EmpCode} ${item.EmpName} `}</Text>
                      </Flex>
                    );
                  })}
                </Text>
              }
            />
          </div>
          <div>
            <TableRow title='Borrower' value={<Text>{project?.BorrowerName}</Text>} />
            <TableRow title='Project Name' value={<Text>{project?.AssetName}</Text>} />
          </div>
        </Flex>
        <Space h='sm' />
      </Card>
      <Card shadow='sm' padding='lg' radius='md' withBorder m={20} className='scrollbar-width-thin' style={{ maxHeight: "450px", overflowY: "scroll" }}>
        {!loader.getProjectDocumentHistory ? (
          <Flex>
            <Flex w={90} direction='column' justify='space-evenly' gap='md'>
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
                <Timeline.Item key={`timelineItem-${index}`} bullet={event.icon} title={event.type} p={20}>
                  <Text color='dimmed' size='sm'>
                    {event.remarks}
                  </Text>
                </Timeline.Item>
              ))}
            </Timeline>
          </Flex>
        ) : (
          <Center mx='auto'>
            <Loader size='md' />
          </Center>
        )}
      </Card>
    </>
  );
};

export default DocsTimeline;
