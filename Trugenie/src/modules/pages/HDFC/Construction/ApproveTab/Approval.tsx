import { Flex, Text, createStyles } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectDocumentDownloadLoaders } from "../../../../../lib/services/HDFC/common/selectors";
import { selectUserDetails } from "../../../../../lib/services/hdfc_login/selectors";
import { UserDetails } from "../../../../../lib/services/hdfc_login/dataTypes";
import { selectSetProject } from "../../../../../lib/services/HDFC/Project/selectors";
import { Project } from "../../../../../lib/services/HDFC/Project/dataTypes";
import { selectApprovalLoaders, selectApprovalPastHistoryList } from "../../../../../lib/services/HDFC/Construction/Approvals/selector";
import { IsConstructionSetupRequested } from "../../../../../lib/services/HDFC/Construction/ExcelUpload/actions";
import { errorNotification, getPresentableValue, successNotification } from "../../../../Components/UtilityFunctions";
import { GetApprovalPastHistoryListRequested, UpdateApprovalStatusRequested } from "../../../../../lib/services/HDFC/Construction/Approvals/actions";
import useSearchAndPagination from "../../../../../hooks/useSearchAndPagination";
import { ApprovalPastHistoryData } from "../../../../../lib/services/HDFC/Construction/Approvals/dataTypes";
import { ActionType } from "../../../../../lib/services/HDFC/services/dataTypes";
import NewTableWithActions, { TableHeader } from "../../../../../widgets/tables/MantineTable/NewTableWithActions";
import { default as WithdrawIcon, default as withDrawn } from "../../../../../assets/logos/SVG/withdraw.svg";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Approvals = ({ handleOnClick }: { handleOnClick?: (data: any) => void }) => {
    const dispatch = useDispatch();

    //#region [state]
    const [showLoadingForRow, setShowLoadingForRow] = useState<string | number | null>(null);
    //#endregion
    const documentDownloadLoaders = useSelector(selectDocumentDownloadLoaders);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const userDetails = useSelector(selectUserDetails) as UserDetails;
    const project = useSelector(selectSetProject) as Project;
    const approvalHistoryList = useSelector(selectApprovalPastHistoryList)
    const loaders = useSelector(selectApprovalLoaders);
    
    useEffect(() => {
        dispatch(IsConstructionSetupRequested(project?.REAssetId));
        return () => {
            setUploadedFile(null);
        };
    }, []);

    // delete-callback
    const onCallback = (success: boolean, message?: string) => {
        setShowLoadingForRow(null);
        if (success) {
            successNotification(message ?? "");
            dispatch(GetApprovalPastHistoryListRequested(Number(project?.REAssetId), userDetails?.EmailId));
        } else {
            errorNotification(message ?? "");
        }
    };

    const { finalData, SearchComponent, PaginationComponent } = useSearchAndPagination({
        data: approvalHistoryList,
        columnsToSearch: [
            { accessorKey: "createdby", type: "text" },
            { accessorKey: "createdAt", type: "date" },
            { accessorKey: "entityName", type: "text" },
            { accessorKey: "role", type: "text" },
            { accessorKey: "status", type: "text" },
        ],
        itemsPerPageData: [10, 20, 30, 40, 50],
        showItemsPerPageDropdown: true,
        showPaginationWithSearch: false,
    });

    const handelWithDrawRowData = (data: ApprovalPastHistoryData) => {
        openConfirmModal({
            title: (
                <Flex align='center'>
                    <img src={WithdrawIcon} style={{ width: "1rem", height: "1rem", marginRight: "8px" }} />
                    <Text size='md'>Confirm Withdraw ?</Text>
                </Flex>
            ),
            centered: true,
            children: <Text size='sm'>Are you sure you want to Withdraw MIS dated {getPresentableValue(data.misdate, true, false, false)}?</Text>,
            labels: { confirm: "Confirm", cancel: "Cancel" },
            confirmProps: {
                style: { backgroundColor: "#001d56" },
                disabled: undefined,
                loading: undefined,
            },
            onClose: () => {
                // no action specified;
            },
            onConfirm: () =>
                dispatch(
                    UpdateApprovalStatusRequested(
                        {
                            documentHistoryId: data.documentHistoryId,
                            status: ActionType.WITHDRAW,
                            createdBy: userDetails?.EmailId
                        },
                        (success: boolean) => {
                            setShowLoadingForRow(null);
                            dispatch(GetApprovalPastHistoryListRequested(Number(project?.REAssetId), userDetails?.EmailId));
                            // dispatch(GetConstructionPendignMISListRequested(Number(project?.REAssetId), userDetails?.EmailId,  "Update"));
                            onCallback(success, "Request Withdrawn!");
                        },
                    ),
                ),
        });
    };


    return (
        <>
            {/* Approval summary Table */}
            <NewTableWithActions
                loader={loaders?.PendingConstructionApprovalDocuments}
                cardHeader={<TableHeader title='Approval Table' SearchComponent={SearchComponent} PaginationComponent={PaginationComponent} />}
                columns={[
                    {
                        title: "Approval Authority",
                        accessorKey: "createdAt",
                        transform: (value: string) => <Text title={getPresentableValue(value, true) as string}>{getPresentableValue(value, true) as string}</Text>,
                    },
                    { title: "Remarks", accessorKey: "entityName" },
                    { title: "Planned Application Date", accessorKey: "role" },
                    { title: "Stage", accessorKey: "createdby" },

                    {
                        title: "Actions",
                        accessorKey: "actions",
                        actionTypes: [
                            {
                                type: "download",
                                onClick: data => {
                                    //
                                },
                                loading(row) {
                                    return showLoadingForRow === row?.documentHistoryId && documentDownloadLoaders.downloadRowData;
                                },
                            },
                            {
                                type: "withDraw",
                                onClick: row => {
                                    handelWithDrawRowData(row);
                                    setShowLoadingForRow(row?.documentHistoryId);
                                },
                                override: rowData => {
                                    return {
                                        icon: rowData.status === "Pending" ? withDrawn : null,
                                        tooltip: rowData.status === "Pending" ? "Withdraw" : "",
                                    };
                                },
                                loading(row) {
                                    return showLoadingForRow === row?.documentHistoryId && loaders.updateApprovalStatus;
                                },
                            },
                        ],
                    },
                ]}
                data={finalData}
            />

            {/* table */}
            <NewTableWithActions
                loader={loaders?.approvalPastHistoryList}
                cardHeader={<TableHeader title='Past Updates' SearchComponent={SearchComponent} PaginationComponent={PaginationComponent} />}
                columns={[
                    {
                        title: "Upload Date",
                        accessorKey: "createdAt",
                        transform: (value: string) => <Text title={getPresentableValue(value, true) as string}>{getPresentableValue(value, true) as string}</Text>,
                    },
                    { title: "Entity", accessorKey: "entityName" },
                    { title: "Role", accessorKey: "role" },
                    { title: "Updated By", accessorKey: "createdby" },
                    { title: "Status", accessorKey: "status" },
                    {
                        title: "Actions",
                        accessorKey: "actions",
                        actionTypes: [
                            {
                                type: "download",
                                onClick: data => {
                                    // setShowLoadingForRow(data?.documentHistoryId);
                                    // dispatch(
                                    //   downloadRowDataRequest(data?.FileContainer, data?.FilePath, data?.FileName, (success: boolean) => {
                                    //     setShowLoadingForRow(null);
                                    //   }),
                                    // );
                                },
                                loading(row) {
                                    return showLoadingForRow === row?.documentHistoryId && documentDownloadLoaders.downloadRowData;
                                },
                            },
                            {
                                type: "withDraw",
                                onClick: row => {
                                    handelWithDrawRowData(row);
                                    setShowLoadingForRow(row?.documentHistoryId);
                                },
                                override: rowData => {
                                    return {
                                        icon: rowData.status === "Pending" ? withDrawn : null,
                                        tooltip: rowData.status === "Pending" ? "Withdraw" : "",
                                    };
                                },
                                loading(row) {
                                    return showLoadingForRow === row?.documentHistoryId && loaders.updateApprovalStatus;
                                },
                            },
                        ],
                    },
                ]}
                data={finalData}
            />
        </>
    );
};

export default Approvals;
