import { Button, Flex, Modal, Text, useMantineTheme } from "@mantine/core";
const CanUploadDocumentModal = ({ open, onClose }: { open: boolean; onClose: () => void; }) => {
    const theme = useMantineTheme();
    return (
        <Modal
            size={"md"}
            opened={open}
            onClose={onClose}
            title={
                <Flex gap={"xs"}>
                    <Text size={"md"} fw='bold' color={"#001d56"}>
                        Alert
                    </Text>
                </Flex>
            }>
            <Text color="red" size={"sm"}>Cannot proceed. Setup is still pending.</Text>
            <Flex justify={"flex-end"} gap={"xl"} >
                <Button color="truboard-primary.0" onClick={onClose}
                >
                    Ok
                </Button>
            </Flex>
        </Modal >
    );

}
export default CanUploadDocumentModal;
