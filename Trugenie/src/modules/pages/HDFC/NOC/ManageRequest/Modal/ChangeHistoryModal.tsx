import { Button, Flex, Modal, Text } from "@mantine/core";
import { GetDecisionDataResponse, NocRequestChangeHistory } from "../../../../../../lib/services/HDFC/NOCManageRequest/dataTypes";
import NewTableWithActions from "../../../../../../widgets/tables/MantineTable/NewTableWithActions";
import { useSelector } from "react-redux";
import { selectedNocRequestChangeHistoryData } from "../../../../../../lib/services/HDFC/NOCManageRequest/selectors";

const ChangeHistoryModal = ({ open, onClose, modalData }: { open: boolean; onClose: () => void; modalData: GetDecisionDataResponse | null }) => {
  const tableData = useSelector(selectedNocRequestChangeHistoryData);
  // const keysToCompare: {
  //     oldKey: keyof GetDecisionDataResponse;
  //     newKey: keyof GetDecisionDataResponse;
  //     title: string;
  //     condition?: (data: GetDecisionDataResponse) => boolean;
  // }[] = [
  //         {
  //             oldKey: "orgCustomerName",
  //             newKey: "PurchaserName",
  //             title: "Purchaser Name",
  //             condition: (data: GetDecisionDataResponse) => Boolean(data.orgCustomerName && data.PurchaserName !== data.orgCustomerName),
  //         },
  //         {
  //             oldKey: "orgBuyerLendingBank",
  //             newKey: "Financer",
  //             title: "Financer",
  //             condition: (data: GetDecisionDataResponse) => Boolean(data.orgBuyerLendingBank && data.Financer !== data.orgBuyerLendingBank),
  //         },
  //         {
  //             oldKey: "orgReceivedTillDate",
  //             newKey: "AdvancePaymentReceived",
  //             title: "Advance Payment Received",
  //             condition: (data: GetDecisionDataResponse) => Boolean(data.orgReceivedTillDate && Number(data.AdvancePaymentReceived) !== Number(data.orgReceivedTillDate)),
  //         },
  //         {
  //             oldKey: "orgPurchaseConsideration",
  //             newKey: "PurchaseConsideration",
  //             title: "Purchase Consideration",
  //             condition: (data: GetDecisionDataResponse) => Boolean(data.orgPurchaseConsideration && Math.abs(data.PurchaseConsideration - data.orgPurchaseConsideration) > 0),
  //         },
  //         {
  //             oldKey: "orgUnitAreaSaleable",
  //             newKey: "UnitAreaSaleable",
  //             title: "Unit Area Saleable",
  //             condition: (data: GetDecisionDataResponse) => Boolean(data.orgUnitAreaSaleable && Math.abs(Number(data.UnitAreaSaleable) - Number(data.orgUnitAreaSaleable)) > 0),
  //         },
  //     ];

  // const tableData = modalData ? keysToCompare
  //     .map(({ oldKey, title, newKey, condition }) => {
  //         const oldData = modalData[oldKey];
  //         const newData = modalData[newKey];
  //         if (condition && !condition(modalData)) {
  //             return null;
  //         }
  //         return {
  //             title,
  //             oldData,
  //             newData,
  //         };
  //     })
  //     .filter(Boolean) as { title: string; oldData: any; newData: any }[] : []

  return (
    <Modal
      size={800}
      opened={open}
      onClose={() => {
        onClose();
      }}
      title={
        <Text size={"md"} fw='bold' color={"#001d56"}>
          Change History
        </Text>
      }>
      <NewTableWithActions
        cardHeader={<></>}
        columns={[
          { title: "Title", accessorKey: "title" },
          { title: "Old Data ", accessorKey: "oldValue" },
          { title: "New Data ", accessorKey: "newValue", transform: (value: string, row: NocRequestChangeHistory) => <Text color={row.color}>{value}</Text> },
        ]}
        data={tableData ?? []}
      />
      <Flex justify={"flex-end"}>
        <Button
          style={{ backgroundColor: "#001d56" }}
          onClick={() => {
            onClose();
          }}>
          Close
        </Button>
      </Flex>
    </Modal>
  );
};

export default ChangeHistoryModal;
