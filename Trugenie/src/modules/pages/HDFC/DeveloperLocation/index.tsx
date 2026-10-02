import { Flex, useMantineTheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { openConfirmModal } from "@mantine/modals";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import addLogo from "../../../../assets/logos/SVG/add_new.svg";
import useSearchAndPagination from "../../../../hooks/useSearchAndPagination";
import { GetDeveloperLocationListRequested,deleteDeveloperLocationRequested } from "../../../../lib/services/HDFC/DeveloperLocation/actions";
import { LocationListDataType } from "../../../../lib/services/HDFC/DeveloperLocation/dataTypes";
import { selectDevLocationList,selectDevLocationLoaders } from "../../../../lib/services/HDFC/DeveloperLocation/selectors";
import { selectUserDetails } from "../../../../lib/services/hdfc_login/selectors";
import NewTableWithActions, { TableHeader } from "../../../../widgets/tables/MantineTable/NewTableWithActions";
import CommonAddButton from "../../../Components/Buttons";
import { successNotification } from "../../../Components/UtilityFunctions";
import AddEntityDeveloperLocation from "./AddDeveloperLocation";
import { selectSwitchClient } from "../../../../lib/services/HDFC/Commons/selectors";
import { GetClientData } from "../../../../lib/services/HDFC/Commons/dataTypes";

export type TableRowDataType = {
  DeveloperLocation: string;
};

function DeveloperLocation() {
  const dispatch = useDispatch();
  const List = useSelector(selectDevLocationList)
  const loaders = useSelector(selectDevLocationLoaders)
  const userDetails = useSelector(selectUserDetails);
  const activeClient = useSelector(selectSwitchClient) as GetClientData;

  const [modifiedDeveloperLocation, setModifiedDeveloperLocation] = useState<number | null>(null);

  useEffect(() => {
    activeClient.ClientId && userDetails?.EmailId && dispatch(GetDeveloperLocationListRequested(activeClient.ClientId, userDetails?.EmailId ?? ""))
  }, [userDetails?.EmailId, activeClient.ClientId])

  const [AddModalState, { open: openAddModal, close: closeAddModal }] =
    useDisclosure(false);

  const { finalData, SearchComponent, PaginationComponent } = useSearchAndPagination({
    data: List ?? [],
    columnsToSearch: [
      { accessorKey: "DeveloperLocationName", type: "text" },
    ],
    itemsPerPageData: [10, 20, 30, 40, 50],
    showItemsPerPageDropdown: true,
    showPaginationWithSearch: false,
  });

  const actionCallback = (success: boolean) => {
    setModifiedDeveloperLocation(null);
    if (success) {
      successNotification("Developer Location deleted successfully");
      dispatch(GetDeveloperLocationListRequested(activeClient.ClientId, userDetails?.EmailId ?? ""));

    }
  };

  const handleDeleteDeveloperLocation = (row: LocationListDataType) => {
    setModifiedDeveloperLocation(row.DeveloperLocationId);
    dispatch(deleteDeveloperLocationRequested(row.DeveloperLocationId, userDetails?.EmailId ?? "",userDetails?.ClientId ?? 0, actionCallback));
  }

  const openModal = (data: LocationListDataType) => {
    openConfirmModal({
      title: "Are you sure you want to delete this Group Head Office?",
      centered: true,
      color: "blue",
      labels: { confirm: "Delete", cancel: "Cancel" },
      onConfirm: () => {
        handleDeleteDeveloperLocation(data)
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
          title="Add Group Head Office"
          leftIcon={<img src={addLogo} style={{ width: "20px", height: "20px", filter: "invert(1)" }} />}
        />
      </Flex>
      <NewTableWithActions
        loader={loaders?.devloperLocationList}
        cardHeader={
          <TableHeader
            title="Group Head Office "
            SearchComponent={SearchComponent}
            PaginationComponent={PaginationComponent}
          />
        }
        columns={[
          {
            title: "Group Head Office Name",
            accessorKey: "DeveloperLocationName",
          },
          {
            title: "Action", accessorKey: "actions",
            actionTypes: [
              {
                type: "delete", onClick: (rowData) => openModal(rowData),
                loading(row) {
                  return loaders.deleteDeveloperLocation && modifiedDeveloperLocation === row.DeveloperLocationId;
                },
              },
            ]
          },
        ]}

        data={finalData}
      />
      <AddEntityDeveloperLocation open={AddModalState} onClose={closeAddModal} />
    </>
  );
}

export default DeveloperLocation;
