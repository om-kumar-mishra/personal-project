import { Button, Flex, Modal, Text, Textarea } from "@mantine/core";
import { useEffect, useState } from "react";
import { PaymentData, PaymentVerificationResponse } from "../../../../lib/services/HDFC/ExternalNOC/dataTypes";

const AddRemarksModal = ({
  open,
  data,
  paymentData,
  onClose,
  setPaymentData,
}: {
  open: boolean;
  data: PaymentData;
  paymentData: PaymentVerificationResponse | null;
  onClose: () => void;
  setPaymentData: React.Dispatch<React.SetStateAction<PaymentVerificationResponse | null>>;
}) => {
  //#region [state]
  const [remarks, setRemarks] = useState<string>(data?.remarks ?? "");
  //#endregion

  //#region [useEffect]
  useEffect(() => {
    if (data?.remarks) {
      setRemarks(data?.remarks ?? "");
    } else {
      setRemarks("");
    }
  }, [data?.remarks]);
  //#endregion

  // reset-form
  const resetForm = () => {
    onClose();
  };

  // add-remarks
  const handleAddRemarks = () => {
    if (paymentData) {
      const updatedTransaction = [...paymentData.transaction];
      updatedTransaction[data.index].remarks = remarks;
      setPaymentData({
        ...paymentData,
        transaction: [...updatedTransaction],
      });
      onClose();
      setRemarks("");
    }
  };

  return (
    <Modal
      size={"lg"}
      opened={open}
      onClose={onClose}
      title={
        <Text size={"md"} fw='bold' color={"#001d56"}>
          Add Remarks
        </Text>
      }>
      <Textarea autosize withAsterisk minRows={2} value={remarks} placeholder='Add Remarks' onChange={e => setRemarks(e.target.value)} />

      <Flex justify='flex-end' gap='xs' my='xs'>
        <Button variant='outline' onClick={resetForm} className='reset-btn-onhover'>
          Cancel
        </Button>

        <Button fullWidth color='truboard-primary.0' onClick={handleAddRemarks}>
          Add
        </Button>
      </Flex>
    </Modal>
  );
};

export default AddRemarksModal;
