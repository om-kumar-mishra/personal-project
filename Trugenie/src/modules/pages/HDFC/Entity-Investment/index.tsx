import { Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import addLogo from "../../../../assets/logos/SVG/add_new.svg";
import useSearchAndPagination from "../../../../hooks/useSearchAndPagination";
import { selectUserDetails } from "../../../../lib/services/hdfc_login/selectors";
import NewTableWithActions, { TableHeader } from "../../../../widgets/tables/MantineTable/NewTableWithActions";
import CommonAddButton from "../../../Components/Buttons";
import AddInvestmentPage from "./AddInvestmentPage";
import { openConfirmModal } from "@mantine/modals";
import { successNotification } from "../../../Components/UtilityFunctions";
import { selectInvestmentList, selectInvestmentLoaders } from "../../../../lib/services/HDFC/Entity-Investment/selector";
import { InvestmentListData } from "../../../../lib/services/HDFC/Entity-Investment/dataTypes";
import { DeleteInvestmentListRequested, GetInvestmentListRequested } from "../../../../lib/services/HDFC/Entity-Investment/action";
import { GetClientData } from "../../../../lib/services/HDFC/Commons/dataTypes";
import { selectSwitchClient } from "../../../../lib/services/HDFC/Commons/selectors";
import { GetFundsListRequested } from "../../../../lib/services/HDFC/Funds/action";

function InvestmentPage() {
  const dispatch = useDispatch();
  const InvestmentList = useSelector(selectInvestmentList);
  const userDetails = useSelector(selectUserDetails);
  const loaders = useSelector(selectInvestmentLoaders);
  const activeClient = useSelector(selectSwitchClient) as GetClientData;

  useEffect(() => {
    activeClient.ClientId && userDetails?.EmailId && dispatch(GetInvestmentListRequested(activeClient.ClientId, userDetails?.EmailId ?? ""))&& dispatch(GetFundsListRequested(activeClient.ClientId, userDetails?.EmailId ?? ""));
  }, [activeClient.ClientId, userDetails?.EmailId]);

  const [AddModalState, { open: openAddModal, close: closeAddModal }] = useDisclosure(false);
  const [modifiedInvestment, setModifiedInvestment] = useState<number | null>(null);

  const { finalData, SearchComponent, PaginationComponent } = useSearchAndPagination({
    data: InvestmentList ?? [],
    columnsToSearch: [
      { accessorKey: "InvestmentName", type: "text" },
      { accessorKey: "FundName", type: "text" },
      { accessorKey: "projectlist", type: "text" },
      { accessorKey: "Createdby", type: "text" },
      { accessorKey: "CreatedAt", type: "text" },
    ],
    itemsPerPageData: [10, 20, 30, 40, 50],
    showItemsPerPageDropdown: true,
    showPaginationWithSearch: false,
  });

  const actionCallback = (success: boolean) => {
    if (success) {
      successNotification("Investment added successfully");
    }
  };

  const handleDeleteInvestment = (row: InvestmentListData) => {
    setModifiedInvestment(row.InvestmentId);
    dispatch(
      DeleteInvestmentListRequested(
        {
          investmentId: row.InvestmentId,
          clientId: userDetails?.UserId ?? 0,
          createdBy: userDetails?.EmailId ?? "",
        },
        actionCallback
      )
    );
  };

  const openDeleteModal = (data: InvestmentListData) => {
    openConfirmModal({
      title: "Are you sure you want to delete this Investment?",
      centered: true,
      color: "blue",
      labels: { confirm: "Delete", cancel: "Cancel" },
      onConfirm: () => {
        handleDeleteInvestment(data)
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
          title='Add Investment'
        />
      </Flex>
      <NewTableWithActions
        loader={loaders?.investmentList}
        cardHeader={<TableHeader title='Investment' SearchComponent={SearchComponent} PaginationComponent={PaginationComponent} />}
        columns={[
          {
            title: "Investment Name",
            accessorKey: "InvestmentName",
          },
          { title: "Fund Name", accessorKey: "FundName" },
          { title: "Project List", accessorKey: "projectlist" },
          // { title: "Created By", accessorKey: "Createdby" },
          // { title: "Created At", accessorKey: "CreatedAt" },
          {
            title: "Actions",
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
                  return loaders?.deleteInvestmentListDetails && modifiedInvestment === row.InvestmentId;
                },
              },
            ],
          },
        ]}
        data={finalData}
      />
      <AddInvestmentPage open={AddModalState} onClose={closeAddModal} />
    </>
  );
}

export default InvestmentPage;
