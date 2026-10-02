import { Box, Button, Flex, Modal, Select, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNOCPaymentDetailsRequested, submitNOCPaymentRequested } from "../../../../../../lib/services/HDFC/NOCManageRequest/actions";
import { selectManageRequestLoaders, selectedNocPaymentDetails } from "../../../../../../lib/services/HDFC/NOCManageRequest/selectors";
import NewTableWithActions from "../../../../../../widgets/tables/MantineTable/NewTableWithActions";
import { TableRow } from "../../../../../Components/TableRow";
import { Currency, getPresentableValue, numberToCurrencyWordsFormatted, successNotification } from "../../../../../Components/UtilityFunctions";

const ViewRequestModal = ({ open, onClose, modalData, decision }: { open: boolean; onClose: () => void; modalData: any; decision?: boolean }) => {
  const dispatch = useDispatch();
  const nocPaymentDetails = useSelector(selectedNocPaymentDetails);
  const loader = useSelector(selectManageRequestLoaders);
  useEffect(() => {
    if (modalData && modalData.NocRequestId) dispatch(getNOCPaymentDetailsRequested(modalData.NocRequestId));
  }, [modalData]);

  const form = useForm<any>({
    initialValues: {
      decision: "",
      remarks: "",
    },
    validate: {
      decision: val => (val === "" || val === null ? "This field cannot be empty." : null),
      remarks: val => (val === "" || val === null ? "This field cannot be empty." : null),
    },
  });

  const actionCallback = (success: boolean) => {
    if (success) {
      successNotification("Modified payment status successfully");
      onClose();
      form.reset();
    }
  };

  const handleFormSubmit = (data: any) => {
    dispatch(submitNOCPaymentRequested(modalData.NocRequestId, data.decision, actionCallback));
  };

  const amountVerified = nocPaymentDetails
    ? nocPaymentDetails?.reduce((total, item) => {
        if (item.Status === "Verified") {
          return total + Number(item.amount);
        }
        return total;
      }, 0)
    : 0;

  const amountNotVerified = nocPaymentDetails
    ? nocPaymentDetails?.reduce((total, item) => {
        if (item.Status === "Not Verified") {
          return total + Number(item.amount);
        }
        return total;
      }, 0)
    : 0;

  return (
    <Modal
      size='85%'
      opened={open}
      onClose={() => {
        onClose();
      }}
      title={
        <Flex gap={"xs"}>
          <Text size={"md"} fw='bold' color={"#001d56"}>
            Payment Verification
          </Text>
        </Flex>
      }>
      <NewTableWithActions
        noMargin
        loader={loader?.getNocPaymentDetails}
        cardHeader={<></>}
        columns={[
          { title: "Bank", accessorKey: "Bank" },
          { title: "Account Number ", accessorKey: "AccountNumber" },
          { title: "Date", accessorKey: "Date", transform: value => getPresentableValue(value, true, false, false) as string },
          { title: "Cheque No", accessorKey: "VchNo" },
          { title: "Transaction", accessorKey: "ReferenceNo" },
          { title: " Amount ", accessorKey: "amount", transform: (val: number) => <Currency value={val} /> },
          { title: "Status", accessorKey: "Status", transform: (val: string) => <Text color={val === "Not Verified" ? "red" : "green"}>{val}</Text> },
          { title: "Region ", accessorKey: "ReferenceNo" },
          { title: "Remarks ", accessorKey: "Remarks" },
        ]}
        data={nocPaymentDetails ?? []}
      />
      <Flex gap={100}>
        <TableRow
          title='Total Amount Verified'
          value={
            <>
              <Text color='green'>
                <Currency value={amountVerified} currencyCode='INR' />
              </Text>
              <Text size={"xs"} color='green'>
                {numberToCurrencyWordsFormatted({ number: amountVerified, indianWordsFormat: false, useComma: true })}
              </Text>
            </>
          }
        />
        <TableRow
          title='Total Amount Not Verified'
          value={
            <>
              <Text color='red'>
                <Currency value={amountNotVerified} currencyCode='INR' />
              </Text>
              <Text size={"xs"} color='red'>
                {numberToCurrencyWordsFormatted({ number: amountNotVerified, indianWordsFormat: false, useComma: true })}
              </Text>
            </>
          }
        />
      </Flex>
      {!decision ? (
        <Box mt='md'>
          <form onSubmit={form.onSubmit(handleFormSubmit)} id='payment'>
            <TableRow
              title='Final Decision'
              withAsterisk
              fullWidth
              value={<Select searchable placeholder='Select your decision' data={["Approve", "Reject"]} {...form.getInputProps("decision")} />}
            />
            <TableRow withAsterisk title={"Remarks"} value={<TextInput mb='md' {...form.getInputProps("remarks")} placeholder='Enter your remarks' />} />

            <Flex justify={"flex-end"}>
              <Button style={{ backgroundColor: "#001d56" }} type='submit' form='payment' loading={loader?.submitNocPayment}>
                Submit
              </Button>
            </Flex>
          </form>
        </Box>
      ) : null}
    </Modal>
  );
};

export default ViewRequestModal;
