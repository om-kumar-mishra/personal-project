import React, { useEffect} from "react";
import NewTableWithActions from "../../../../../../widgets/tables/MantineTable/NewTableWithActions";
import { Button, Flex, Modal, Text } from "@mantine/core";
import { errorNotification } from "../../../../../Components/UtilityFunctions";
import { useDispatch, useSelector } from "react-redux";
import { getSendBackUsersRequested } from "../../../../../../lib/services/HDFC/NOCManageRequest/actions";
import { selectUserDetails } from "../../../../../../lib/services/hdfc_login/selectors";
import { selectedNocDecisionData, selectedNocSendBackUsersData } from "../../../../../../lib/services/HDFC/NOCManageRequest/selectors";
import { NocSendBackUsers } from "../../../../../../lib/services/HDFC/NOCManageRequest/dataTypes";

const ViewSendBackToListModal = ({
  open,
  onClose,
  selectedRow,
  setSelectedRow,
}: {
  open: boolean;
  onClose: () => void;
  selectedRow?: NocSendBackUsers;
  setSelectedRow?: (row: NocSendBackUsers) => void;
}) => {
  const dispatch = useDispatch();
  const userDetails = useSelector(selectUserDetails);
  const decisionData = useSelector(selectedNocDecisionData);
  const sendBackUsersData = useSelector(selectedNocSendBackUsersData);

  useEffect(() => {
    decisionData?.NocProjectId &&
      decisionData?.NocRequestId &&
      userDetails?.EmailId &&
      dispatch(getSendBackUsersRequested(decisionData?.NocProjectId, decisionData.NocRequestId, userDetails.EmailId));
  }, [decisionData, userDetails]);
  
  return (
    <Modal
      size={800}
      opened={open}
      onClose={() => {
        onClose();
      }}
      title={
        <Flex gap={"s"}>
          <Text size={"md"} fw='bold' color={"#001d56"}>
            Send Back List
          </Text>
        </Flex>
      }>
      <NewTableWithActions
        selectedRow={selectedRow}
        setSelectedRow={setSelectedRow}
        columns={[
          {
            title: "Step",
            accessorKey: "Priority",
          },
          {
            title: "Role",
            accessorKey: "EntityRole",
          },
          {
            title: "Type of Step",
            accessorKey: "StepType",
          },
        ]}
        data={sendBackUsersData ?? []}
      />
      <>
        <Flex
          onClick={() => {
            selectedRow ? onClose() : errorNotification("Please Select Row");
          }}
          direction={{ base: "column", sm: "row" }}
          gap={{ base: "sm", sm: "lg" }}
          justify={{ sm: "end" }}>
          <Button color="truboard-primary.0">Submit</Button>
        </Flex>
      </>
    </Modal>
  );
};

export default ViewSendBackToListModal;
