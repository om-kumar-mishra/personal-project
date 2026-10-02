import { useDisclosure } from "@mantine/hooks";
import { useMemo, useState } from "react";
import useSearchAndPagination from "../../../../hooks/useSearchAndPagination";
import { PaymentData, PaymentVerificationResponse } from "../../../../lib/services/HDFC/ExternalNOC/dataTypes";
import NewTableWithActions, { TableHeader } from "../../../../widgets/tables/MantineTable/NewTableWithActions";
import AddRemarksModal from "./AddRemarks";
import { Text } from "@mantine/core";
import { Currency } from "../../../Components/UtilityFunctions";

function PaymentVerification({
  paymentData,
  setPaymentData,
}: {
  paymentData: PaymentVerificationResponse | null;
  setPaymentData: React.Dispatch<React.SetStateAction<PaymentVerificationResponse | null>>;
}) {
  //#region [state]
  const [data, setData] = useState<PaymentData | null>(null);
  //#endregion

  // disclosure
  const [modalOpen, { open: openModal, close: closeModal }] = useDisclosure(false);

  const tableData = useMemo(() => {
    return paymentData
      ? paymentData?.transaction?.map((trans, i) => ({
          index: i,
          bank: paymentData?.BankName,
          accountNumber: paymentData?.accountNumber,
          date: trans?.date,
          referenceNo: trans?.referenceNo,
          transDescription: trans?.transactionDescription,
          amount: trans?.credit,
          status: trans?.status,
          reason: trans?.reason,
          remarks: trans?.remarks ?? "",
        }))
      : [];
  }, [paymentData]);

  const { finalData } = useSearchAndPagination({
    data: tableData,
    columnsToSearch: [
      { accessorKey: "bank", type: "text" },
      { accessorKey: "accountNumber", type: "text" },
      { accessorKey: "date", type: "text" },
    ],
    itemsPerPageData: [10, 20, 30, 40, 50],
    showItemsPerPageDropdown: true,
    showPaginationWithSearch: false,
  });

  return (
    <>
      <NewTableWithActions
        cardHeader={<TableHeader title='Payment Verification' />}
        columns={[
          { title: "Bank", accessorKey: "bank" },
          { title: "Account Number", accessorKey: "accountNumber" },
          { title: "Date", accessorKey: "date" },
          { title: "Reference No.", accessorKey: "referenceNo" },
          // { title: "Cheque No", accessorKey: "chequeNo" },
          { title: "Transaction Description", accessorKey: "transDescription" },
          { title: "Amount", accessorKey: "amount",transform: (amount: string) => <Currency value={amount} currencyCode='INR'/> },
          { title: "Status", accessorKey: "status", transform: (value: string) => <Text color={value === "Not Verified" ? "red" : "green"}>{value}</Text> },
          { title: "Reason", accessorKey: "reason" },
          { title: "Remarks", accessorKey: "remarks" },
          {
            title: "Action",
            accessorKey: "actions",
            actionTypes: [
              {
                type: "remarks",
                onClick: rowData => {
                  setData(rowData);
                  openModal();
                },
              },
            ],
          },
        ]}
        data={finalData}
      />

      <AddRemarksModal open={modalOpen} onClose={closeModal} data={data as PaymentData} paymentData={paymentData} setPaymentData={setPaymentData} />
    </>
  );
}

export default PaymentVerification;
