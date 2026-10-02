import { Flex, Modal, Table, Text } from "@mantine/core";
import viewIcon from "../../../../assets/logos/SVG/view.svg";
import { CustomerGroupListDataType } from "../../../../lib/services/HDFC/CustomerGroupServices/dataTypes";
import { TableRow } from "../../../Components/TableRow";
import { getPresentableValue } from "../../../Components/UtilityFunctions";

const ViewCustomerGroupPageModal = ({
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
            View Group
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
                {customerGroupData?.DeveloperName ?? ""}
              </Text>
            }
          />
          <TableRow
            title={"Group head office"}
            value={
              <Text
                sx={{
                  wordBreak: "break-all",
                }}>
                {customerGroupData?.DeveloperLocation ?? ""}
              </Text>
            }
          />
          <TableRow
            title='Last Edited By/On'
            value={
              <>
                <Text>{customerGroupData?.createdBy}</Text>
                <Text>{getPresentableValue(customerGroupData?.CreatedAt, true, false) as string}</Text>
              </>
            }
          />
        </tbody>
      </Table>
    </Modal>
  );
};

export default ViewCustomerGroupPageModal;
