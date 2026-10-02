import { Flex, Modal, Table, Text } from "@mantine/core";
import viewIcon from "../../../../assets/logos/SVG/view.svg";
import { CustomerGroupListDataType } from "../../../../lib/services/HDFC/CustomerGroupServices/dataTypes";
import { TableRow } from "../../../Components/TableRow";
import { getPresentableValue } from "../../../Components/UtilityFunctions";

const ViewPMCPageModal = ({
  open,
  onClose,
  customerGroupData,
}: {
  customerGroupData: CustomerGroupListDataType | null;
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
          <img src={viewIcon} style={{ width: "20px", height: "20px", color: "#001d56" }} />
          <Text size={"md"} fw='bold' color={"#001d56"}>
            View PMC
          </Text>
        </Flex>
      }>
      <Table>
        <tbody>
          <TableRow
            title={"Group"}
            value={
              <Text
                sx={{
                  wordBreak: "break-all",
                }}>
                {customerGroupData?.DeveloperName || ""}
              </Text>
            }
          />
          <TableRow title={"Lead RM"} value={<Text>{customerGroupData?.["Lead RM"] ? customerGroupData?.["Lead RM"] : "Not Tagged"}</Text>} />
          <TableRow title={"RM 2"} value={<Text>{customerGroupData?.["RM 2"] ? customerGroupData?.["RM 2"] : "Not Tagged"}</Text>} />
          <TableRow title={"RM 3"} value={<Text>{customerGroupData?.["RM 3"] ? customerGroupData["RM 3"] : "Not Tagged"}</Text>} />
          <TableRow
            title='Last Edited By/On'
            value={
              <>
                <Text>{customerGroupData?.createdBy}</Text>
                <Text>{getPresentableValue(customerGroupData?.CreatedAt ?? customerGroupData?.CreatedAt, true, false) as string}</Text>
              </>
            }
          />
        </tbody>
      </Table>
    </Modal>
  );
};

export default ViewPMCPageModal;
