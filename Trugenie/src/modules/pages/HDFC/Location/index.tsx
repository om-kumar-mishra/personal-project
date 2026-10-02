import { Flex, useMantineTheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { openConfirmModal } from "@mantine/modals";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import addLogo from "../../../../assets/logos/SVG/add_new.svg";
import useSearchAndPagination from "../../../../hooks/useSearchAndPagination";
import { deleteLocationRequested, getLocationListRequested } from "../../../../lib/services/HDFC/Location/actions";
import { LocationListDataType } from "../../../../lib/services/HDFC/Location/dataTypes";
import { selectLocationList, selectLocationLoaders } from "../../../../lib/services/HDFC/Location/selectors";
import { selectUserDetails } from "../../../../lib/services/hdfc_login/selectors";
import NewTableWithActions, { TableHeader } from "../../../../widgets/tables/MantineTable/NewTableWithActions";
import CommonAddButton from "../../../Components/Buttons";
import { errorNotification, successNotification } from "../../../Components/UtilityFunctions";
import AddEntityLocation from "./AddEntityLocation";
import { selectSwitchClient } from "../../../../lib/services/HDFC/Commons/selectors";
import { GetClientData } from "../../../../lib/services/HDFC/Commons/dataTypes";

function EntityLocation() {
    const dispatch = useDispatch();
    const locationList = useSelector(selectLocationList)
    const locationLoaders = useSelector(selectLocationLoaders)
    const userDetails = useSelector(selectUserDetails);
    const activeClient = useSelector(selectSwitchClient) as GetClientData;

    const [modifiedLocation, setModifiedLocation] = useState<number | null>(null);
    const theme = useMantineTheme()
    useEffect(() => {
        activeClient.ClientId && userDetails?.EmailId && dispatch(getLocationListRequested(activeClient.ClientId, userDetails?.EmailId ?? ""))
    }, [activeClient.ClientId, userDetails?.EmailId])

    const [AddModalState, { open: openAddModal, close: closeAddModal }] =
        useDisclosure(false);


    const { finalData, SearchComponent, PaginationComponent } = useSearchAndPagination({
        data: locationList ?? [],
        columnsToSearch: [
            { accessorKey: "ZoneName", type: "text" },
            { accessorKey: "RegionsName", type: "text" },
            { accessorKey: "LocationName", type: "text" },
        ],
        itemsPerPageData: [10, 20, 30, 40, 50],
        showItemsPerPageDropdown: true,
        showPaginationWithSearch: false,
    });

    const actionCallback = (success: boolean) => {
        setModifiedLocation(null);
        if (success) {
            successNotification("Location deleted successfully");
            dispatch(getLocationListRequested(activeClient.ClientId, userDetails?.EmailId ?? ""));
        } else {
            errorNotification("Failed to delete Location");
        }
    };

    const handleDeleteLocation = (row: LocationListDataType) => {
        setModifiedLocation(row.LocationId)
        dispatch(deleteLocationRequested(row.LocationId, userDetails?.EmailId ?? "", actionCallback));
    }

    const openModal = (data: LocationListDataType) => {
        openConfirmModal({
            title: "Are you sure you want to delete this Location?",
            centered: true,
            color: "blue",
            labels: { confirm: "Delete", cancel: "Cancel" },
            onConfirm: () => {
                handleDeleteLocation(data)
            },
            confirmProps: {
                color: "truboard-primary.0"
            }
        });
    };

    return (
        <>
            <Flex justify={"flex-end"} gap={"xl"} mt="sm">
                <CommonAddButton
                    handleClick={openAddModal}
                    title="Add Location"
                    leftIcon={<img src={addLogo} style={{ width: "20px", height: "20px", filter: "invert(1)" }} />}
                />
            </Flex>

            <NewTableWithActions
                loader={locationLoaders?.locationList}
                cardHeader={
                    <TableHeader
                        title="Location"
                        SearchComponent={SearchComponent}
                        PaginationComponent={PaginationComponent}
                    />
                }
                columns={[
                    {
                        title: "Zone",
                        accessorKey: "ZoneName",
                    },
                    { title: "Region", accessorKey: "RegionsName" },
                    { title: "Location Name", accessorKey: "LocationName" },
                    {
                        title: "Action", accessorKey: "actions",
                        actionTypes: [
                            {
                                type: "delete", onClick: (rowData) => openModal(rowData),
                                loading(row) {
                                    return row.LocationId === modifiedLocation && locationLoaders.deleteLocation;
                                },
                            },
                        ]
                    },
                ]}
                data={finalData}
            />
            <AddEntityLocation
                open={AddModalState}
                onClose={closeAddModal}
            />

        </>
    );
}

export default EntityLocation;
