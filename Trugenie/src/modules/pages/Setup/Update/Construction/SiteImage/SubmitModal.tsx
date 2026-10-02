import {
    Button,
    Flex,
    Modal,
    Space,
    Table,
    Text,
    Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import uploadDocument from "../../../../../../assets/logos/upload.svg";
import { successNotification } from "../../../../../Components/UtilityFunctions";
import { TableRow } from "../../../../../Components/TableRow";
import { selectSetProject } from "../../../../../../lib/services/HDFC/Project/selectors";
import { Project } from "../../../../../../lib/services/HDFC/Project/dataTypes";
import { selectUserDetails } from "../../../../../../lib/services/hdfc_login/selectors";
import { UserDetails } from "../../../../../../lib/services/hdfc_login/dataTypes";
import {
    selectIsConstructionSetupPending,
    selectCanUpdateConstruction,
} from "../../../../../../lib/services/HDFC/Construction/ExcelUpload/selector";
import {
    CanAddSiteVisitImagesRequested,
    GetConstructionPastSiteVisitImagesRequested,
    UploadConstructionModuleSiteImagesRequested,
} from "../../../../../../lib/services/HDFC/Construction/SiteImage/actions";

type FormData = {
    uploadedFile: File| null;
    remark: string | null;
};

const SubmitModal = ({
    open,
    onClose,
    formValues,
}: {
    open: boolean;
    onClose: () => void;
    showTypeField?: boolean;
    formValues: any;
}) => {
    const dispatch = useDispatch();
    //#region [selector]
    const project = useSelector(selectSetProject) as Project;
    const canUpdateConstruction = useSelector(selectCanUpdateConstruction);
    const userDetails = useSelector(selectUserDetails) as UserDetails;
    const isSetuppending = useSelector(selectIsConstructionSetupPending);
    //#endregion

    //#region [state]
    const [canUpate, setCanUpdate] = useState<boolean>(false);
    const [uploadLoader, setUploadLoader] = useState<boolean>(false);
    const [selectedType, setSelectedType] = useState<string>("");
    //#endregion
    

    const form = useForm<FormData>({
        initialValues: {
            // misDate: null,
            uploadedFile: null,
            remark: "",
        },
        validateInputOnBlur: true,
        validateInputOnChange: true,
        validate: {
            remark: (val) =>
                !val || val.length < 500
                    ? null
                    : "Invalid Input! Input can not be more than 500 characters.",
        },
    });
    //#region [useEffect]

    useEffect(() => {
        if (canUpdateConstruction) {
            setCanUpdate(canUpdateConstruction?.canupdate === 1);
        }
    }, [canUpdateConstruction]);

    useEffect(() => {
        if (project.REAssetId) {
            dispatch(
                CanAddSiteVisitImagesRequested(
                    project.REAssetId,
                    userDetails.EmailId
                )
            );
        }
    }, [ project.REAssetId]);

    const onCallback = (success: boolean, message?: string) => {
        setUploadLoader(false);
        if (success) {
            successNotification(message ?? "Construction uploaded successfully...");
            form.reset();
            onClose();
            dispatch(
                GetConstructionPastSiteVisitImagesRequested(
                    Number(project?.REAssetId),
                    userDetails?.EmailId
                )
            );
            handelOnclose();
        }
    };

    const handleUpload = (values: FormData) => {
            setUploadLoader(true);
            const payload = {
                reassetId: project.REAssetId,
                role: userDetails?.TemplateRoleName,
                entityName: userDetails?.entity,
                CreatedBy: userDetails?.EmailId,
                data: {
                    Type: "Construction",
                    FileContainer: "renoc",
                    FilePath: `construction/${project.AssetName}`,
                    FileName: values.uploadedFile?.name,
                    Remark: values.remark ?? "",
                },
                files: formValues.uploadedFile,
            };
            dispatch(UploadConstructionModuleSiteImagesRequested(payload, onCallback));
    };

    const handelOnclose = () => {
        onClose();
        form.reset();
        setCanUpdate(false);
        setSelectedType("");
    };

    return (
        <Modal
            size="lg"
            withinPortal
            opened={open}
            onClose={handelOnclose}
            style={{ overflow: "visible" }}
            title={
                <Flex gap={"xs"}>
                    <img src={uploadDocument} style={{ width: "10px", height: "10px" }} />
                    <Text size={"md"} fw="bold" color={"#001d56"}>
                        Upload
                    </Text>
                </Flex>
            }
        >
            <div>
                <form onSubmit={form.onSubmit(handleUpload)}>
                    {formValues.uploadedFile && (
                        <img src={URL.createObjectURL(formValues.uploadedFile)} />
                    )}
                    <Table>
                        <tbody>
                            <TableRow
                                title={"Remarks"}
                                value={
                                    <Textarea
                                        placeholder="Remarks"
                                        {...form.getInputProps("remark")}
                                    />
                                }
                            />
                        </tbody>
                    </Table>
                    <Space h={"sm"} />
                    {canUpate && (
                    <Flex justify={"flex-end"} gap={"xl"}>
                        <Button
                            color="truboard-primary.0"
                            type="submit"
                        >
                            Submit
                        </Button>
                    </Flex>
                     )} 
                </form>
            </div>
        </Modal>
    );
};

export default SubmitModal;
