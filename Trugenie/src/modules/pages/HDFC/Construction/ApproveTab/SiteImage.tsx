import { Button, Card, Center, Flex, Loader, Table, Text, createStyles } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { openConfirmModal } from "@mantine/modals";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectDocumentDownloadLoaders } from "../../../../../lib/services/HDFC/common/selectors";
import { selectUserDetails } from "../../../../../lib/services/hdfc_login/selectors";
import { selectSetProject } from "../../../../../lib/services/HDFC/Project/selectors";
import { selectConstructionPastSiteVisitImages, selectSiteVisitLoaders } from "../../../../../lib/services/HDFC/Construction/SiteImage/selector";
import { IsConstructionSetupRequested } from "../../../../../lib/services/HDFC/Construction/ExcelUpload/actions";
import { GetConstructionPastSiteVisitImagesRequested, UpdateConstructionSiteImageStatusRequested } from "../../../../../lib/services/HDFC/Construction/SiteImage/actions";
import { errorNotification, getPresentableValue, successNotification } from "../../../../Components/UtilityFunctions";
import { ConstructionPastSiteVisitImagesData } from "../../../../../lib/services/HDFC/Construction/SiteImage/dataTypes";
import useSearchAndPagination from "../../../../../hooks/useSearchAndPagination";
import { default as WithdrawIcon, default as withDrawn } from "../../../../../assets/logos/SVG/withdraw.svg";
import { default as additionIcon } from "../../../../../assets/logos/SVG/add_new.svg";
import { default as deletionIcon } from "../../../../../assets/logos/SVG/Delete.svg";
import { UserDetails } from "../../../../../lib/services/hdfc_login/dataTypes";
import { Project } from "../../../../../lib/services/HDFC/Project/dataTypes";
import { ActionType } from "../../../../../lib/services/HDFC/services/dataTypes";
import NewTableWithActions, { TableHeader } from "../../../../../widgets/tables/MantineTable/NewTableWithActions";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SiteImage = ({ handleOnClick }: { handleOnClick?: (data: any) => void }) => {
    const dispatch = useDispatch();

    //#region [state]
    const [showLoadingForRow, setShowLoadingForRow] = useState<string | number | null>(null);
    //#endregion
    const documentDownloadLoaders = useSelector(selectDocumentDownloadLoaders);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    //#endregion

    //#region [selector]
    const userDetails = useSelector(selectUserDetails) as UserDetails;
    const project = useSelector(selectSetProject) as Project;
    const constructionHistoryList = useSelector(selectConstructionPastSiteVisitImages)
    const loaders = useSelector(selectSiteVisitLoaders);
    //#endregion

    //#region [useEffect]
    useEffect(() => {
        dispatch(IsConstructionSetupRequested(project?.REAssetId));
        return () => {
            setUploadedFile(null);
        };
    }, []);

    useEffect(() => {
        if (project) {
            dispatch(GetConstructionPastSiteVisitImagesRequested(Number(project?.REAssetId), userDetails?.EmailId));
        }
    }, [project]);
    //#endregion

    // delete-callback
    const onCallback = (success: boolean, message?: string) => {
        setShowLoadingForRow(null);
        if (success) {
            successNotification(message ?? "");
            dispatch(GetConstructionPastSiteVisitImagesRequested(Number(project?.REAssetId), userDetails?.EmailId));
        } else {
            errorNotification(message ?? "");
        }
    };

    // delete-confirm-modal
    const openModal = (data: ConstructionPastSiteVisitImagesData) => {
        openConfirmModal({
            title: (
                <Flex align='center'>
                    <Text size='md'>Confirm Delete</Text>
                </Flex>
            ),
            centered: true,
            children: <Text size='sm'>Are you sure you want to delete MIS dated {getPresentableValue(data.MISDate, true, false, false)}?</Text>,
            labels: { confirm: "Confirm", cancel: "Cancel" },
            confirmProps: {
                style: { backgroundColor: "#001d56" },
                disabled: undefined,
                loading: undefined,
            },
            onClose: () => {
                // no action specified;
            },
            onConfirm: () => {
                //
            }
        });
    };

    const { finalData, SearchComponent, PaginationComponent } = useSearchAndPagination({
        data: constructionHistoryList,
        columnsToSearch: [
            { accessorKey: "Createdby", type: "text" },
            { accessorKey: "CreatedAt", type: "date" },
            { accessorKey: "EntityName", type: "text" },
            { accessorKey: "Role", type: "text" },
            { accessorKey: "Status", type: "text" },
        ],
        itemsPerPageData: [10, 20, 30, 40, 50],
        showItemsPerPageDropdown: true,
        showPaginationWithSearch: false,
    });

    const handelWithDrawRowData = (data: ConstructionPastSiteVisitImagesData) => {
        openConfirmModal({
            title: (
                <Flex align='center'>
                    <img src={WithdrawIcon} style={{ width: "1rem", height: "1rem", marginRight: "8px" }} />
                    <Text size='md'>Confirm Withdraw ?</Text>
                </Flex>
            ),
            centered: true,
            children: <Text size='sm'>Are you sure you want to Withdraw MIS dated {getPresentableValue(data.MISDate, true, false, false)}?</Text>,
            labels: { confirm: "Confirm", cancel: "Cancel" },
            confirmProps: {
                style: { backgroundColor: "#001d56" },
                disabled: undefined,
                loading: loaders.constructionPastSiteVisitImages,
            },
            onClose: () => {
                // no action specified;
            },
            onConfirm: () =>
                dispatch(
                    UpdateConstructionSiteImageStatusRequested(
                        {
                            siteImageHistoryId: data.SiteImageHistoryId,
                            status: ActionType.WITHDRAW,
                            createdBy: userDetails?.EmailId
                        },
                        (success: boolean) => {
                            setShowLoadingForRow(null);
                            dispatch(GetConstructionPastSiteVisitImagesRequested(Number(project?.REAssetId), userDetails?.EmailId));
                            // dispatch(GetConstructionPendignMISListRequested(Number(project?.REAssetId), userDetails?.EmailId,  "Update"));
                            onCallback(success, "Request Withdrawn!");
                        },
                    ),
                ),
        });
    };


    return (
        <>

            <NewTableWithActions
                loader={loaders?.siteVisitPendingImagesTable}
                cardHeader={
                    <TableHeader
                        title='Upload Site Images'
                        SearchComponent={
                            SearchComponent
                        }
                        PaginationComponent={PaginationComponent}
                    />
                }
                columns={[
                    {
                        title: "Classification",
                        accessorKey: "actions",
                        actionTypes: [
                            {
                                type: "delete",
                                override: rowData => {
                                    return {
                                        icon: rowData.ActionType === "Deletion" ? deletionIcon : null,
                                        tooltip: rowData.ActionType === "Deletion" ? "" : null,
                                    };
                                },
                            },
                            {
                                type: "trashFilled",
                                override: rowData => {
                                    return {
                                        icon: rowData.ActionType === "Addition" ? additionIcon : null,
                                        tooltip: rowData.ActionType === "Addition" ? "Addition" : null,
                                    };
                                },
                            },
                        ],
                    },
                    {
                        title: "MIS Date",
                        accessorKey: "MISDate",
                        transform: (value: string) => getPresentableValue(value, true, false, false) as string,
                    },
                    { title: "Entity", accessorKey: "EntityName" },
                    { title: "Role", accessorKey: "Role" },
                    { title: "Status", accessorKey: "Status", transform: (value: string, row: any) => value + " for " + row?.ActionType },
                    {
                        title: "Actions",
                        accessorKey: "actions",
                        actionTypes: [
                            {
                                type: "withDraw",
                                onClick: row => {
                                    handelWithDrawRowData(row);
                                    setShowLoadingForRow(row?.SiteImageHistoryId);
                                },
                                override: rowData => {
                                    return {
                                        icon: rowData.Status === "Pending" ? withDrawn : null,
                                        tooltip: rowData.Status === "Pending" ? "Withdraw" : "",
                                    };
                                },
                                loading(row) {
                                    return showLoadingForRow === row?.SiteImageHistoryId && loaders.updateConstructionSiteImageStatus;
                                },
                            },
                        ],
                    },
                ]}
                data={finalData}
            />

            {/* table */}
            <NewTableWithActions
                loader={loaders?.constructionPastSiteVisitImages}
                cardHeader={<TableHeader title='Past Updates' SearchComponent={SearchComponent} PaginationComponent={PaginationComponent} />}
                columns={[
                    {
                        title: "Update Date",
                        accessorKey: "CreatedAt",
                        transform: (value: string) => <Text title={getPresentableValue(value, true) as string}>{getPresentableValue(value, true) as string}</Text>,
                    },
                    { title: "Entity Name", accessorKey: "EntityName" },
                    { title: "Role", accessorKey: "Role" },
                    { title: "Updated By", accessorKey: "Createdby" },
                    { title: "Status", accessorKey: "Status" },
                    {
                        title: "Actions",
                        accessorKey: "actions",
                        actionTypes: [
                            {
                                type: "withDraw",
                                onClick: row => {
                                    handelWithDrawRowData(row);
                                    setShowLoadingForRow(row?.SiteImageHistoryId);
                                },
                                override: rowData => {
                                    return {
                                        icon: rowData.Status === "Pending" ? withDrawn : null,
                                        tooltip: rowData.Status === "Pending" ? "Withdraw" : "",
                                    };
                                },
                                loading(row) {
                                    return showLoadingForRow === row?.SiteImageHistoryId && loaders.updateConstructionSiteImageStatus;
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

export default SiteImage;
