import { Card, Center, Flex, Loader, Modal, Text, Timeline, createStyles } from "@mantine/core";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNOCRequestTimelineRequested } from "../../../../../../lib/services/HDFC/NOCManageRequest/actions";
import { selectManageRequestLoaders, selectedNocRequestTimelineData } from "../../../../../../lib/services/HDFC/NOCManageRequest/selectors";
import { formatDateWithSuffix } from "../../../../../../utils/commonFunctions";
import { getPresentableValue } from "../../../../../Components/UtilityFunctions";

interface NOCTimelineModalProps {
  open: boolean;
  onClose: () => void;
  modalData: any;
}
const useStyles = createStyles(() => ({
  TimelineLeftFontSize: {
    fontSize: "9px",
  },
}));

const NOCTimelineModal: React.FC<NOCTimelineModalProps> = ({ open, onClose, modalData }: NOCTimelineModalProps) => {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const timelineData = useSelector(selectedNocRequestTimelineData);
  const manageRequestLoaders = useSelector(selectManageRequestLoaders); const loader = useSelector(selectManageRequestLoaders);

  useEffect(() => {
    if (modalData?.NocRequestId) {
      dispatch(getNOCRequestTimelineRequested({ nocRequestId: modalData.NocRequestId }));
    }
  }, [modalData?.NocRequestId]);

  const eventsList = useMemo(() => {
    if (timelineData && timelineData.length > 0) {
      return timelineData.map(value => ({
        type: value.NocAction,
        remarks: [
          `Emp Code: ${value.EMPCode ?? "-"}`,
          `Name: ${value.UserName ?? "-"}`,
          `Role: ${value.UserRole}`,
          `Date: ${value?.CreatedAt ? formatDateWithSuffix(new Date(value.CreatedAt)) : "-"}`,
          `Time: ${value?.CreatedAt ? getPresentableValue(value.CreatedAt, true, false, false, true) : "-"}`,
        ],

      }));
    } else return [];
  }, [timelineData]);

  return (
    <Modal
      size='sm'
      opened={open}
      onClose={onClose}
      title={
        <Flex align={"center"} gap={"sm"}>
          <Text size='sm' fw='bold' color='#001d56'>
            NOC Timeline
          </Text>
        </Flex>
      }>
      {timelineData ? (
        // <Timeline active={1} bulletSize={24} lineWidth={2} color='#001d56'>
        //   {timelineData &&
        //     timelineData.length > 0 &&
        //     timelineData.map((item: NocRequestTimeline) => (
        //       <Timeline.Item key={item.NocAction} title={item.NocAction}>
        //         <Text color='dimmed' size='sm'>
        //           {item.CreatedBy}
        //         </Text>
        //         <Text size='xs' mt={4}>
        //           {getPresentableValue(item.CreatedAt, true, true)}
        //         </Text>
        //       </Timeline.Item>
        //     ))}
        // </Timeline>
        <Card shadow='sm'>
          <Flex>
            {/* <Flex direction={"column"} justify={"space-evenly"} w={200} gap="xl">
              {eventsList.map((event, index) => {
                return (
                  <div key={`timeline-${index}`}>
                    <Text className={classes.TimelineLeftFontSize}>{event.date}</Text>
                    <Text className={classes.TimelineLeftFontSize}>{event.time}</Text>
                    <Text className={classes.TimelineLeftFontSize}>
                      <u>Admin User:</u>
                    </Text>
                    <Text className={classes.TimelineLeftFontSize}>{event.user}</Text>
                    <Text className={classes.TimelineLeftFontSize}>{event.role}</Text>
                  </div>
                );
              })}
            </Flex> */}
            <Timeline bulletSize={24} lineWidth={2} w={"100%"}>
              {eventsList.map((event, index) => (
                <Timeline.Item key={`timelineItem-${index}`} title={event.type} p={20} style={{ fontSize: "15px" }}>
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
      ) : (
        <Center mx='auto'>{loader.nocRequestTimeline ? <Loader size='md' /> : "No data Found!"}</Center>
      )}
    </Modal>
  );
};

export default NOCTimelineModal;
