import { Button, Flex, Modal, Table, Text, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { openConfirmModal } from "@mantine/modals";
import { useDispatch, useSelector } from "react-redux";
import addLogo from "../../../../../../assets/logos/SVG/add_new.svg";
import { enableDisableExternalUserRequested } from "../../../../../../lib/services/HDFC/ExternalUser/actions";
import { GetExternalUserDataType } from "../../../../../../lib/services/HDFC/ExternalUser/dataTypes";
import { selectExternalUserLoaders } from "../../../../../../lib/services/HDFC/ExternalUser/selectors";
import { selectUserDetails } from "../../../../../../lib/services/hdfc_login/selectors";
import { TableRow } from "../../../../../Components/TableRow";
import { successNotification } from "../../../../../Components/UtilityFunctions";

type FormData = {
    remarks: string;
};

const EnableDisableUser = ({
    open,
    onClose,
    onSubmit,
    externalUserDetails,
}: {
    onClose: () => void;
    open: boolean;
    onSubmit: () => void;
    externalUserDetails: GetExternalUserDataType | null;
}) => {
    const userDetails = useSelector(selectUserDetails);
    const externalUserLoaders = useSelector(selectExternalUserLoaders);
    const dispatch = useDispatch();
    const form = useForm<FormData>({
        initialValues: {
            remarks: "",
        },

        validate: {
            remarks: value => (value.length < 1 ? "Remarks is required" : null),
        },
    });

    const actionCallback = (success: boolean) => {
        if (success) {
            successNotification("User status updated successfully");
            form.reset();
            onSubmit();
            onClose();
        }
    };

    const actionText = externalUserDetails?.IsActive ? "Disable" : "Enable";

    //   confirm-modal
    const openModal = (data: FormData) => {
        if (data) {
            openConfirmModal({
                title: `Confirm Action`,
                centered: true,
                children: (
                    <Text size='sm'>
                        Are you sure you want to {actionText} the user {externalUserDetails?.Name}?
                    </Text>
                ),
                labels: { confirm: "Confirm", cancel: "Cancel" },
                confirmProps: {
                    style: { backgroundColor: "#001d56" },
                    disabled: undefined,
                    loading: undefined,
                },
                onConfirm: () => handleFormSubmit(data),
            });
        }
    };

    const handleFormSubmit = (data: FormData) => {
        const payload = {
            EUserId: externalUserDetails?.EUserId ?? 0,
            enable: Number(!externalUserDetails?.IsActive),
            createdby: userDetails?.EmailId ?? "",
            createbyusername: `${userDetails?.EmpCode}-${userDetails?.EmpName} (${userDetails?.TemplateRoleName})`,
            Remark: data.remarks,
        };
        dispatch(enableDisableExternalUserRequested(payload, actionCallback));
    };

    return (
        <Modal
            size={"lg"}
            opened={open}
            onClose={() => {
                onClose();
                form.reset();
            }}
            title={
                <Flex gap={"xs"}>
                    <img src={addLogo} className="icon-size" style={{ width: "20px", height: "20px", color: "#001d56" }} />
                    <Text size={"md"} fw='bold' color={"#001d56"}>
                        Enable/Disable External User
                    </Text>
                </Flex>
            }>
            <form onSubmit={form.onSubmit(openModal)}>
                <Table>
                    <tbody>
                        <TableRow title={"Group"} value={<Text>{externalUserDetails?.DeveloperName}</Text>} />
                        <TableRow title={"Borrower"} value={<Text>{externalUserDetails?.InvesteeName}</Text>} />
                        <TableRow title={"Employee name"} value={<Text>{externalUserDetails?.Name}</Text>} />
                        <TableRow title={"Email ID"} value={<Text>{externalUserDetails?.Email}</Text>} />
                        <TableRow title={"Role/Template Name"} value={<Text>{externalUserDetails?.RoleName}</Text>} />
                        <TableRow title={"Status"} value={<Text>{externalUserDetails?.Status}</Text>} />
                        <TableRow title={"Remarks"} withAsterisk value={<Textarea maxLength={500} placeholder='Remarks' {...form.getInputProps("remarks")} />} />
                    </tbody>
                </Table>
                <Flex justify={"end"} gap={"xl"} my='md'>

                    <Button type='submit' color={externalUserDetails?.IsActive ? "red" : "green"} loading={externalUserLoaders.enableDisableExternalUser}>
                        {actionText}
                    </Button>

                </Flex>
            </form>
        </Modal >
    );
};

export default EnableDisableUser;
