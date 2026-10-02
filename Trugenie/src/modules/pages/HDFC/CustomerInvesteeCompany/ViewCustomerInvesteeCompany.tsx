import { Flex, Modal, Table, Text } from "@mantine/core";
import viewIcon from "../../../../assets/logos/SVG/view.svg";
import { CustomerInvesteeListDataType } from "../../../../lib/services/HDFC/CustomerInvesteeCompany/dataTypes";
import { TableRow } from "../../../Components/TableRow";
import { getPresentableValue } from "../../../Components/UtilityFunctions";

const ViewCustomerInvesteeModal = ({
  open,
  onClose,
  customerInvesteeData,
}: {
  customerInvesteeData: CustomerInvesteeListDataType | null;
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
            View Borrower
          </Text>
        </Flex>
      }>
      <Table>
        <tbody>
          <TableRow title={"Group"} value={customerInvesteeData?.customergroup || ""} />
          <TableRow title={"Borrower"} value={<Text>{customerInvesteeData?.customerinvesteecompany}</Text>} />
          <TableRow title={"Identity Number (CIN/LLPIN etc)"} value={<Text>{customerInvesteeData?.CIN ? customerInvesteeData?.CIN : "Not Given"}</Text>} />
          {/* <TableRow title={"PAN"} value={<Text>{customerInvesteeData?.PAN}</Text>} /> */}
          <TableRow title={"GST"} value={<Text>{customerInvesteeData?.GST}</Text>} />
          <TableRow title={"Address"} value={<Text>{customerInvesteeData?.Address}</Text>} />
          <TableRow
            title='Last Edited By/On:'
            value={
              <>
                <Text>{customerInvesteeData?.lastEditBy ?? customerInvesteeData?.CreatedBy}</Text>
                <Text>{getPresentableValue(customerInvesteeData?.lastediton ?? customerInvesteeData?.CreatedAt, true, false) as string}</Text>
              </>
            }
          />
        </tbody>
      </Table>
    </Modal>
  );
};

export default ViewCustomerInvesteeModal;
