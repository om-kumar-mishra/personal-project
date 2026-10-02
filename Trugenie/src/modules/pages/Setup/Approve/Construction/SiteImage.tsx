import { Button, Flex, Text, useMantineTheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { openConfirmModal } from "@mantine/modals";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import withDraw from "../../../../../assets/logos/SVG/withdraw.svg";
import useSearchAndPagination from "../../../../../hooks/useSearchAndPagination";
import { Project } from "../../../../../lib/services/HDFC/Project/dataTypes";
import { selectSetProject } from "../../../../../lib/services/HDFC/Project/selectors";
import { UserDetails } from "../../../../../lib/services/hdfc_login/dataTypes";
import { selectUserDetails } from "../../../../../lib/services/hdfc_login/selectors";
import NewTableWithActions, { TableHeader } from "../../../../../widgets/tables/MantineTable/NewTableWithActions";
import { getPresentableValue, successNotification } from "../../../../Components/UtilityFunctions";
import UploadDocumentModal from "./modals/UploadDocumentModal";
import CanUploadDocumentModal from "../../../Common/CanUploadDocumentModal";
import {
    CanSetupConstructionRequested,
} from "../../../../../lib/services/HDFC/Construction/ExcelUpload/actions";
import {
    selectCanSetupConstruction,
} from "../../../../../lib/services/HDFC/Construction/ExcelUpload/selector";
import {
    SiteVisitApprovalTableRequested,
    SiteVisitPastUpdateTableRequested,
    UpdateConstructionSiteImageStatusRequested
} from "../../../../../lib/services/HDFC/Construction/SiteImage/actions";
import {
    SiteVisitApprovalTableData,
    UpdateConstructionSiteImageStatusPayload
} from "../../../../../lib/services/HDFC/Construction/SiteImage/dataTypes";
import {
    selectSiteVisitApprovalTable,
    selectSiteVisitLoaders
} from "../../../../../lib/services/HDFC/Construction/SiteImage/selector";

const SiteImage = () => {
    const dispatch = useDispatch();
    const theme = useMantineTheme();
    const [dowloadRowLoader, setdowloadRowLoader] = useState<string | number | null>(null);

    const project = useSelector(selectSetProject) as Project;
    const projectSalesList = useSelector(selectSiteVisitApprovalTable);
    const canUpdateValue = useSelector(selectCanSetupConstruction);
    const userDetails = useSelector(selectUserDetails) as UserDetails;
    const loaders = useSelector(selectSiteVisitLoaders);
    const canUpdate = canUpdateValue?.canupdate;
    const [uploadDocumentModal, { open: openUploadDocumentModal, close: closeUploadDocumentModal }] = useDisclosure(false);
    const [canUploadDocumentModal, { open: openCanUploadDocumentModal, close: closeCanUploadDocumentModal }] = useDisclosure(false);
    const { finalData, SearchComponent, PaginationComponent } = useSearchAndPagination({
        data: projectSalesList || [],
        columnsToSearch: [
            { accessorKey: "CreatedAt", type: "text" },
            { accessorKey: "EntityName", type: "date" },
            { accessorKey: "Role", type: "text" },
            { accessorKey: "Createdby", type: "text" },
            // { accessorKey: "UserName", type: "text" },
            { accessorKey: "Status", type: "text" },
        ],
        itemsPerPageData: [10, 20, 30, 40, 50],
        showItemsPerPageDropdown: true,
        showPaginationWithSearch: false,
    });

    useEffect(() => {
        dispatch(SiteVisitApprovalTableRequested(Number(project?.REAssetId), project?.CreatedBy));
        dispatch(SiteVisitPastUpdateTableRequested(Number(project?.REAssetId), project?.CreatedBy));
        dispatch(CanSetupConstructionRequested(project?.REAssetId));
    }, []);

    const successCallback = (success: boolean) => {
        setdowloadRowLoader(null);
        if (success) {
            successNotification("Withdraw successfully");
            dispatch(SiteVisitApprovalTableRequested(Number(project?.REAssetId), project?.CreatedBy));
            dispatch(SiteVisitPastUpdateTableRequested(Number(project?.REAssetId), project?.CreatedBy));
            dispatch(CanSetupConstructionRequested(project?.REAssetId));
        }
    };
    const handelWithDrawRowData = (row: SiteVisitApprovalTableData) => {
        openConfirmModal({
            title: (
                <Flex align='center'>
                    <img src={withDraw} style={{ width: "1rem", height: "1rem", marginRight: "8px" }} />
                    <Text size='md'>Withdraw Setup</Text>
                </Flex>
            ),
            centered: true,
            color: "blue",
            size: "lg",
            children: (
                <>
                    <Text size='sm'>Are you sure you want to withdraw the setup uploaded on {getPresentableValue(row?.CreatedAt, true, false, false)} ?</Text>
                </>
            ),
            labels: { confirm: "Confirm", cancel: "Cancel" },
            confirmProps: {
                loading: loaders?.updateConstructionSiteImageStatus,
                style: { backgroundColor: theme.colors["truboard-primary"][0], color: theme.colors["white"][0] },
            },
            cancelProps: {
                style: { backgroundColor: theme.colors["truboard-primary"][0], color: theme.colors["white"][0] },
            },
            onConfirm: () => {
                setdowloadRowLoader(row?.SiteImageHistoryId);
                const data: UpdateConstructionSiteImageStatusPayload = {
                    siteImageHistoryId: row.SiteImageHistoryId,
                    status: "Withdraw",
                    createdBy: userDetails?.EmailId,
                };
                dispatch(dispatch(UpdateConstructionSiteImageStatusRequested(data, successCallback)));
            },
        });
    };

    return (
        <>
            <NewTableWithActions
                loader={loaders?.siteVisitApprovalTable}
                cardHeader={<TableHeader title={"Site Visit Approval"} SearchComponent={SearchComponent} PaginationComponent={PaginationComponent} />}
                columns={[
                    {
                        title: "Updated Date",
                        accessorKey: "CreatedAt",
                        transform: (value: string) => <Text title={getPresentableValue(value, true) as string}>{getPresentableValue(value, true) as string}</Text>,
                    },

                    { title: "Entity", accessorKey: "EntityName" },
                    { title: "Role", accessorKey: "Role" },
                    { title: "Updated By", accessorKey: "Createdby" },
                    { title: "Status", accessorKey: "Status" },
                    {
                        title: "Actions",
                        accessorKey: "actions",
                        actionTypes: [
                            // {
                            //   type: "download",
                            //   onClick: row => handelDownloadRowData(row),
                            //   loading(row) {
                            //     return row?.FileName === dowloadRowLoader && loaders?.downloadProjectRowLoader;
                            //   },
                            // },

                            {
                                type: "withDraw",
                                onClick: row => handelWithDrawRowData(row),
                                override: rowData => {
                                    return {
                                        icon: rowData.Status === "Pending" ? withDraw : null,
                                        tooltip: rowData.Status === "Pending" ? "Withdraw" : "",
                                    };
                                },
                                loading(row) {
                                    return row?.SiteImageHistoryId === dowloadRowLoader && loaders?.updateConstructionSiteImageStatus;
                                },
                            },
                        ],
                    },
                ]}
                data={finalData}
            />

            <NewTableWithActions
                loader={loaders?.siteVisitPastUpdateTable}
                cardHeader={<TableHeader title={"Past Update"} SearchComponent={SearchComponent} PaginationComponent={PaginationComponent} />}
                columns={[
                    {
                        title: "Updated Date",
                        accessorKey: "CreatedAt",
                        transform: (value: string) => <Text title={getPresentableValue(value, true) as string}>{getPresentableValue(value, true) as string}</Text>,
                    },

                    { title: "Entity", accessorKey: "EntityName" },
                    { title: "Role", accessorKey: "Role" },
                    { title: "Created By", accessorKey: "Createdby" },
                    { title: "Status", accessorKey: "Status" },
                    {
                        title: "Actions",
                        accessorKey: "actions",
                        actionTypes: [
                            // {
                            //   type: "download",
                            //   onClick: row => handelDownloadRowData(row),
                            //   loading(row) {
                            //     return row?.FileName === dowloadRowLoader && loaders?.downloadProjectRowLoader;
                            //   },
                            // },

                            {
                                type: "withDraw",
                                onClick: row => handelWithDrawRowData(row),
                                override: rowData => {
                                    return {
                                        icon: rowData.Status === "Pending" ? withDraw : null,
                                        tooltip: rowData.Status === "Pending" ? "Withdraw" : "",
                                    };
                                },
                                loading(row) {
                                    return row?.SiteImageHistoryId === dowloadRowLoader && loaders?.updateConstructionSiteImageStatus;
                                },
                            },
                        ],
                    },
                ]}
                data={finalData}
            />
            <UploadDocumentModal open={uploadDocumentModal} onClose={closeUploadDocumentModal} projectId={project?.REAssetId} />
            <CanUploadDocumentModal open={canUploadDocumentModal} onClose={closeCanUploadDocumentModal} />
        </>
    );
};

export default SiteImage;
