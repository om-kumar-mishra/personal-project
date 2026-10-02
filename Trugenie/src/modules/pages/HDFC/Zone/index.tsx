import { Flex, useMantineTheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { openConfirmModal } from "@mantine/modals";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import addLogo from "../../../../assets/logos/SVG/add_new.svg";
import useSearchAndPagination from "../../../../hooks/useSearchAndPagination";
import { deleteZoneRequested, getZonesListRequested } from "../../../../lib/services/HDFC/Zone/actions";
import { ZonesListDataType } from "../../../../lib/services/HDFC/Zone/dataTypes";
import { selectZoneList, selectZoneLoaders } from "../../../../lib/services/HDFC/Zone/selectors";
import { selectUserDetails } from "../../../../lib/services/hdfc_login/selectors";
import NewTableWithActions, { TableHeader } from "../../../../widgets/tables/MantineTable/NewTableWithActions";
import CommonAddButton from "../../../Components/Buttons";
import { successNotification } from "../../../Components/UtilityFunctions";
import AddEntityZone from "./AddEntityZone";
import { selectSwitchClient } from "../../../../lib/services/HDFC/Commons/selectors";
import { GetClientData } from "../../../../lib/services/HDFC/Commons/dataTypes";

export type TableRowDataType = {
  Zone: string;
};

function EntityZone() {
  const dispatch = useDispatch();
  const zoneList = useSelector(selectZoneList)
  const zoneLoaders = useSelector(selectZoneLoaders)
  const userDetails = useSelector(selectUserDetails);
  const activeClient = useSelector(selectSwitchClient) as GetClientData;

  const [modifiedZone, setModifiedZone] = useState<number | null>(null);

  useEffect(() => {
    activeClient.ClientId && userDetails?.EmailId && dispatch(getZonesListRequested(activeClient.ClientId, userDetails?.EmailId ?? ""))
  }, [userDetails?.EmailId, activeClient.ClientId])

  const [AddModalState, { open: openAddModal, close: closeAddModal }] =
    useDisclosure(false);

  const { finalData, SearchComponent, PaginationComponent } = useSearchAndPagination({
    data: zoneList ?? [],
    columnsToSearch: [
      { accessorKey: "ZoneName", type: "text" },
    ],
    itemsPerPageData: [10, 20, 30, 40, 50],
    showItemsPerPageDropdown: true,
    showPaginationWithSearch: false,
  });

  const actionCallback = (success: boolean) => {
    setModifiedZone(null);
    if (success) {
      successNotification("Zone deleted successfully");
      dispatch(getZonesListRequested(activeClient.ClientId, userDetails?.EmailId ?? ""));

    }
  };

  const handleDeleteZone = (row: ZonesListDataType) => {
    setModifiedZone(row.ZoneID);
    dispatch(deleteZoneRequested(row.ZoneID, userDetails?.EmailId ?? "", actionCallback));
  }

  const openModal = (data: ZonesListDataType) => {
    openConfirmModal({
      title: "Are you sure you want to delete this Zone?",
      centered: true,
      color: "blue",
      labels: { confirm: "Delete", cancel: "Cancel" },
      onConfirm: () => {
        handleDeleteZone(data)
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
          title="Add Zone"
          leftIcon={<img src={addLogo} style={{ width: "20px", height: "20px", filter: "invert(1)" }} />}
        />
      </Flex>
      <NewTableWithActions
        loader={zoneLoaders?.zonesList}
        cardHeader={
          <TableHeader
            title="Zone"
            SearchComponent={SearchComponent}
            PaginationComponent={PaginationComponent}
          />
        }
        columns={[
          {
            title: "Zone Name",
            accessorKey: "ZoneName",
          },
          {
            title: "Action", accessorKey: "actions",
            actionTypes: [
              {
                type: "delete", onClick: (rowData) => openModal(rowData),
                loading(row) {
                  return zoneLoaders.deleteZone && modifiedZone === row.ZoneID;
                },
              },
            ]
          },
        ]}

        data={finalData}
      />
      <AddEntityZone open={AddModalState} onClose={closeAddModal} />
    </>
  );
}

export default EntityZone;
