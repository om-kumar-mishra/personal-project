import { Flex, Modal, Table, Text } from "@mantine/core";
import { UserDetails } from "../../../../lib/services/hdfc_login/dataTypes";
import { TableRow } from "../../../../modules/Components/TableRow";
import { getPresentableValue } from "../../../../modules/Components/UtilityFunctions";

const ProfileModal = ({
    open,
    onClose,
    userDetails,
}: {
    userDetails?: UserDetails | null;
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
                        Profile Details
                    </Text>
                </Flex>
            }>
            <Table>
                <tbody>
                    <TableRow title={"Name"} value={
                        <Text>{userDetails?.EmpName}</Text>
                    }
                    />
                    <TableRow title={"User ID"} value={<Text>{userDetails?.HdfcUserId}</Text>} />
                    <TableRow title={"Employee ID"} value={<Text>{userDetails?.EmpCode}</Text>} />
                    <TableRow title={"Role"} value={<Text>{userDetails?.TemplateRoleName}</Text>} />
                    <TableRow title={"Email Id"} value={<Text>{userDetails?.EmailId}</Text>} />
                    <TableRow title={"Last Login"} value={<Text>{getPresentableValue(userDetails?.lastlogin, true)}</Text>} />
                </tbody>
            </Table>
        </Modal>
    );
};

export default ProfileModal;
