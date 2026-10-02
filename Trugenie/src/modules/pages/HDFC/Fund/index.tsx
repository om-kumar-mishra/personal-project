import { Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import addLogo from "../../../../assets/logos/SVG/add_new.svg";
import useSearchAndPagination from "../../../../hooks/useSearchAndPagination";
import { selectUserDetails } from "../../../../lib/services/hdfc_login/selectors";
import NewTableWithActions, { TableHeader } from "../../../../widgets/tables/MantineTable/NewTableWithActions";
import CommonAddButton from "../../../Components/Buttons";
import AddFundPage from "./AddFundPage";
import { selectFundsList, selectFundsLoaders } from "../../../../lib/services/HDFC/Funds/selector";
import { FundsListData } from "../../../../lib/services/HDFC/Funds/dataTypes";
import { openConfirmModal } from "@mantine/modals";
import { DeleteFundsListRequested, GetFundsListRequested } from "../../../../lib/services/HDFC/Funds/action";
import { successNotification } from "../../../Components/UtilityFunctions";
import { GetClientData } from "../../../../lib/services/HDFC/Commons/dataTypes";
import { selectSwitchClient } from "../../../../lib/services/HDFC/Commons/selectors";

function FundPage() {
  const dispatch = useDispatch();
  const FundList = useSelector(selectFundsList);
  const userDetails = useSelector(selectUserDetails);
  const loaders = useSelector(selectFundsLoaders);
  const activeClient = useSelector(selectSwitchClient) as GetClientData;

  useEffect(() => {
    activeClient.ClientId && userDetails?.EmailId && dispatch(GetFundsListRequested(activeClient.ClientId, userDetails?.EmailId ?? ""));
  }, [activeClient.ClientId, userDetails?.EmailId]);

  const [AddModalState, { open: openAddModal, close: closeAddModal }] = useDisclosure(false);
  const [modifiedFund, setModifiedFund] = useState<number | null>(null);

  const { finalData, SearchComponent, PaginationComponent } = useSearchAndPagination({
    data: FundList ?? [],
    columnsToSearch: [
      { accessorKey: "FundName", type: "text" },
      { accessorKey: "ClientName", type: "text" },
    ],
    itemsPerPageData: [10, 20, 30, 40, 50],
    showItemsPerPageDropdown: true,
    showPaginationWithSearch: false,
  });

  const actionCallback = (success: boolean) => {
    if (success) {
      successNotification("Fund added successfully");
    }
  };

  const handleDeleteFund = (row: FundsListData) => {
    setModifiedFund(row.FundId);
    dispatch(
      DeleteFundsListRequested(
        {
          fundId: row.FundId,
          clientId: userDetails?.UserId ?? 0,
          createdBy: userDetails?.EmailId ?? "",
        },
        actionCallback
      )
    );
  };
  
  const openDeleteModal = (data: FundsListData) => {
    openConfirmModal({
      title: "Are you sure you want to delete this Fund?",
      centered: true,
      color: "blue",
      labels: { confirm: "Delete", cancel: "Cancel" },
      onConfirm: () => {
        handleDeleteFund(data)
      },
      confirmProps: {
        color: "truboard-primary.0"
      }
    });
  };

  return (
    <>
      <Flex justify={"flex-end"} align={"center"} m={"md"}>
        <CommonAddButton
          handleClick={openAddModal}
          leftIcon={<img src={addLogo} style={{ width: "20px", height: "20px", filter: "invert(1)" }} />}
          title='Add Fund'
        />
      </Flex>
      <NewTableWithActions
        loader={loaders?.fundsList}
        cardHeader={<TableHeader title='Fund' SearchComponent={SearchComponent} PaginationComponent={PaginationComponent} />}
        columns={[
          {
            title: "Fund Name",
            accessorKey: "FundName",
          },
          { title: "Client", accessorKey: "ClientName" },
          {
            title: "Action",
            accessorKey: "actions",
            actionTypes: [
              // {
              //   type: "view",
              //   onClick: rowData => {
              //     setData(rowData);
              //     openViewModal();
              //   },
              // },
              // {
              //   type: "edit",
              //   onClick: rowData => {
              //     setData(rowData);
              //     openModal();
              //   },
              // },
              {
                type: "delete", onClick: (rowData) => openDeleteModal(rowData),
                loading(row) {
                  return loaders?.deleteFundsListDetails && modifiedFund === row.FundId;
                },
              },
            ],
          },
        ]}
        data={finalData}
      />
      <AddFundPage open={AddModalState} onClose={closeAddModal} />
    </>
  );
}

export default FundPage;
