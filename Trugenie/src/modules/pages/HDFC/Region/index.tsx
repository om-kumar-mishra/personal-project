import { Flex, useMantineTheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { openConfirmModal } from "@mantine/modals";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import addLogo from "../../../../assets/logos/SVG/add_new.svg";
import useSearchAndPagination from "../../../../hooks/useSearchAndPagination";
import { deleteRegionRequested, getRegionListRequested } from "../../../../lib/services/HDFC/Region/actions";
import { RegionListDataType } from "../../../../lib/services/HDFC/Region/dataTypes";
import { selectRegionList, selectRegionLoaders } from "../../../../lib/services/HDFC/Region/selectors";
import { selectUserDetails } from "../../../../lib/services/hdfc_login/selectors";
import NewTableWithActions, { TableHeader } from "../../../../widgets/tables/MantineTable/NewTableWithActions";
import CommonAddButton from "../../../Components/Buttons";
import { successNotification } from "../../../Components/UtilityFunctions";
import AddEntityRegion from "./AddEntityRegion";
import { selectSwitchClient } from "../../../../lib/services/HDFC/Commons/selectors";
import { GetClientData } from "../../../../lib/services/HDFC/Commons/dataTypes";

export type TableRowDataType = {
    Zone: string;
    Region: string;
};

function EntityRegion() {
    const dispatch = useDispatch();
    const RegionList = useSelector(selectRegionList)
    const RegionLoaders = useSelector(selectRegionLoaders)
    const userDetails = useSelector(selectUserDetails);
    const [modifiedRegion, setModifiedRegion] = useState<number | null>(null);
    const activeClient = useSelector(selectSwitchClient) as GetClientData;


    useEffect(() => {
        activeClient.ClientId && userDetails?.EmailId && dispatch(getRegionListRequested(activeClient.ClientId, userDetails?.EmailId ?? ""))
    }, [activeClient.ClientId, userDetails?.EmailId])

    const [AddModalState, { open: openAddModal, close: closeAddModal }] =
        useDisclosure(false);


    const { finalData, SearchComponent, PaginationComponent } = useSearchAndPagination({
        data: RegionList ?? [],
        columnsToSearch: [
            { accessorKey: "ZoneName", label: "Zone", type: "text" },
            { accessorKey: "RegionsName", label: "Region", type: "text" },
        ],
        itemsPerPageData: [10, 20, 30, 40, 50],
        showItemsPerPageDropdown: true,
        showPaginationWithSearch: false,
    });

    const actionCallback = (success: boolean) => {
        setModifiedRegion(null);
        if (success) {
            successNotification("Region deleted successfully");
            dispatch(getRegionListRequested(activeClient.ClientId, userDetails?.EmailId ?? ""));

        }
    };

    const handleDeleteRegion = (row: any) => {
        setModifiedRegion(row.RegionsId);
        dispatch(deleteRegionRequested(row.RegionsId, userDetails?.EmailId ?? "", actionCallback));
    }

    const openModal = (data: RegionListDataType) => {
        openConfirmModal({
            title: "Are you sure you want to delete this Region?",
            centered: true,
            color: "blue",
            labels: { confirm: "Delete", cancel: "Cancel" },
            onConfirm: () => {
                handleDeleteRegion(data)
            },
            confirmProps: {
                color: "truboard-primary.0"
            }
        });
    };

    return (
        <>
            <Flex justify={"flex-end"} gap={"xl"} mt='sm'>
                <CommonAddButton handleClick={openAddModal} title='Add Region' leftIcon={<img src={addLogo} style={{ width: "20px", height: "20px", filter: "invert(1)" }} />} />
            </Flex>

            <NewTableWithActions
                loader={RegionLoaders?.RegionList}
                cardHeader={
                    <TableHeader
                        title="Region"
                        SearchComponent={SearchComponent}
                        PaginationComponent={PaginationComponent}
                    />
                }
                columns={[
                    {
                        title: "Zone Name",
                        accessorKey: "ZoneName",
                    },
                    { title: "Region Name", accessorKey: "RegionsName" },
                    {
                        title: "Action", accessorKey: "actions",
                        actionTypes: [
                            {
                                type: "delete", onClick: (rowData) => openModal(rowData),
                                loading(row) {
                                    return RegionLoaders.deleteRegion && modifiedRegion === row.RegionsId;
                                },
                            },
                        ]
                    },
                ]}
                data={finalData}
            />
            <AddEntityRegion
                open={AddModalState}
                onClose={closeAddModal}
            />

        </>
    );
}

export default EntityRegion;