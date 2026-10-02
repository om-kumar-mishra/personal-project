import { Flex, Text } from "@mantine/core";
import decisionIcon from "../../assets/logos/SVG/decision.svg";
import { openConfirmModal } from "@mantine/modals";
import { getPresentableValue } from "./UtilityFunctions";

const openOverWriteModal = (misDate: string, onCancel: () => void, onConfirm?: () => void) => {
  openConfirmModal({
    title: (
      <Flex align='center'>
        <img src={decisionIcon} style={{ width: "1rem", height: "1rem", marginRight: "8px" }} />
        <Text size='md'>Confirm Overwrite</Text>
      </Flex>
    ),
    centered: true,
    children: (
      <Text size='sm'>
        {`"${getPresentableValue(misDate, true, false, false)}" date selected for MIS has already been approved. Are you sure you want to Overwrite it?`}
      </Text>
    ),
    labels: { confirm: "Yes", cancel: "No" },
    confirmProps: {
      style: { backgroundColor: "#001d56" },
      disabled: undefined,
      loading: undefined,
    },
    onClose: onConfirm,
    onConfirm: onConfirm,
    onCancel: onCancel,
  });
};

export default openOverWriteModal;
