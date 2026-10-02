import { Flex, Modal, Table, Text } from "@mantine/core";
import { TableRow } from "../../../../modules/Components/TableRow";
import { GetUpdateHoldStatusResponse } from "../../../../lib/services/prefrences/dataTypes";
import { getPresentableValue } from "../../../../modules/Components/UtilityFunctions";

const ProjectOnHoldModal = ({
  open,
  onClose,
  holdProjectData,
}: {
  holdProjectData?: GetUpdateHoldStatusResponse | undefined;
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal
      size={"lg"}
      opened={open}
      onClose={() => {
        onClose();
      }}
      title={
        <Flex gap={"xs"}>
          <Text size={"md"} fw='bold' color={"#001d56"}>
            Project &nbsp; {holdProjectData?.data[0]?.AssetName} - Put on Hold
          </Text>
        </Flex>
      }>
      <Table>
        <tbody>
          <TableRow title={"Date"} value={<Text>{getPresentableValue(holdProjectData?.data[0]?.HoldDate, true, false, false)}</Text>} />
          <TableRow
            title={"User/Entity"}
            value={
              <Text>
                {holdProjectData?.data?.[0].username} &nbsp;
                {holdProjectData?.data?.[0].entityname}
              </Text>
            }
          />
          <TableRow title={"Remarks"} value={<Text>{holdProjectData?.data[0]?.Remarks}</Text>} />
        </tbody>
      </Table>
    </Modal>
  );
};

export default ProjectOnHoldModal;
