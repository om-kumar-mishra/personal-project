import { SimpleGrid, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import pendingIcon from "../../../../../../assets/logos/SVG/total_pending_for_approval.svg";
import rejectedIcon from "../../../../../../assets/logos/SVG/total_rejected.svg";
import useSearchAndPagination from "../../../../../../hooks/useSearchAndPagination";
import { getInternalUserListRequested } from "../../../../../../lib/services/HDFC/InternalUser/actions";
import { GetInternalUserDataType } from "../../../../../../lib/services/HDFC/InternalUser/dataTypes";
import { selectInternalUserList, selectInternalUserLoaders } from "../../../../../../lib/services/HDFC/InternalUser/selectors";
import { selectUserDetails } from "../../../../../../lib/services/hdfc_login/selectors";
import { ROUTES } from "../../../../../../routeConstants";
import NewTableWithActions, { TableHeader } from "../../../../../../widgets/tables/MantineTable/NewTableWithActions";
import { getPresentableValue } from "../../../../../Components/UtilityFunctions";
import { FilterCardsWithIcon } from "../../../../InvestmentsDashboard/components";

enum CardFilters {
  PendingForApproval = "Pending",
  RejectedUsers = "Rejected",
  TotalApprovedUsers = "Approved",
}

const ApproveInternalUser = () => {
  const [selectedCardFilter, setSelectedCardFilter] = useState<CardFilters>(CardFilters.PendingForApproval);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const internalUserLoaders = useSelector(selectInternalUserLoaders);
  const internalUserList = useSelector(selectInternalUserList);
  const userDetails = useSelector(selectUserDetails);

  useEffect(() => {
    dispatch(getInternalUserListRequested(userDetails?.EmailId ?? ""));
  }, []);

  const selectedFilterData = (internalUserList ?? []).filter(item => {
    return item.Title === selectedCardFilter;
  });

  const getStatusCount = (status: string) => {
    return (internalUserList ?? []).filter(item => {
      return item.Title === status;
    }).length;
  };

  const { finalData, SearchComponent, PaginationComponent } = useSearchAndPagination({
    data: selectedFilterData,
    columnsToSearch: [
      { accessorKey: "DepartmentName", type: "text" },
      { accessorKey: "HdfcUserId", type: "text" },
      { accessorKey: "EmpCode", type: "text" },
      { accessorKey: "EmpName", type: "text" },
      { accessorKey: "BranchName", type: "text" },
      { accessorKey: "SupervisorName", type: "text" },
      { accessorKey: "DepartmentName", type: "text" },
      { accessorKey: "EmailId", type: "text" },
      { accessorKey: "TemplateRoleName", type: "text" },
      { accessorKey: "CompanyType", type: "text" },
      { accessorKey: "Title", type: "text" },
      { accessorKey: "UserSource", type: "text" },
      { accessorKey: "Activity", type: "text" },
    ],
    itemsPerPageData: [10, 20, 30, 40, 50],
    showItemsPerPageDropdown: true,
    showPaginationWithSearch: false,
  });

  let commonColumns: {
    title: string;
    accessorKey: keyof GetInternalUserDataType | "actions";
    transform?: (value: string, row: GetInternalUserDataType) => string | JSX.Element;
    actionTypes?: {
      type?: string;
      onClick?: (rowData: GetInternalUserDataType) => void;
      override?: (rowData: GetInternalUserDataType) => { tooltip?: string; icon?: JSX.Element };
      loading?: (rowData: GetInternalUserDataType) => boolean;
    }[];
  }[] = [
      { title: "User ID", accessorKey: "HdfcUserId" },
      { title: "Employee Code", accessorKey: "EmpCode" },
      { title: "Employee Name", accessorKey: "EmpName" },
      { title: "Branch Name", accessorKey: "BranchName" },
      { title: "Supervisor Name", accessorKey: "SupervisorName" },
      { title: "Department Name", accessorKey: "DepartmentName" },
      { title: "Email ID", accessorKey: "EmailId" },
      { title: "Role", accessorKey: "TemplateRoleName" },
      { title: "Company Type", accessorKey: "CompanyType" },
    ];

  switch (selectedCardFilter) {
    case CardFilters.TotalApprovedUsers:
      commonColumns = [
        ...commonColumns,
        { title: "Status", accessorKey: "Activity" },
        {
          title: "Approved By/On",
          accessorKey: "CheckerEmpName",
          transform: (value, row) => {
            return (
              <Text title={`${value} - ${getPresentableValue(row.CheckerApprovedDate, true) as string}`}>
                {value} -{getPresentableValue(row.CheckerApprovedDate, true) as string}
              </Text>
            );
          },
        },
      ];
      break;
    case CardFilters.PendingForApproval:
      commonColumns = [
        ...commonColumns,
        { title: "Type Of Activity", accessorKey: "Activity" },
        { title: "Source", accessorKey: "UserSource" },
        {
          title: "Actions",
          accessorKey: "actions",
          actionTypes: [
            {
              type: "enableDisableUser",
              onClick: rowData =>
                navigate(ROUTES.APPROVE_SPECIFIC_INTERNAL_USER, {
                  state: {
                    userData: rowData,
                  },
                }),
              override: () => ({ tooltip: "View" }),
            },
          ],
        },
      ];
      break;
    case CardFilters.RejectedUsers:
      commonColumns = [
        ...commonColumns,
        { title: "Activity", accessorKey: "Activity" },
        {
          title: "Rejected By/On",
          accessorKey: "CheckerEmpName",
          transform: (value, row) => {
            return (
              <Text title={`${value} - ${getPresentableValue(row.CheckerApprovedDate, true) as string}`}>
                {value} -{getPresentableValue(row.CheckerApprovedDate, true) as string}
              </Text>
            );
          },
        },
      ];
      break;

    default:
      commonColumns = [...commonColumns];
      break;
  }

  const tableTitles = selectedCardFilter === CardFilters.TotalApprovedUsers ? "Internal User List" :
    selectedCardFilter === CardFilters.PendingForApproval ? "Pending for Approval" : "Rejected Request"

  return (
    <>
      <SimpleGrid cols={3} spacing='md' w={"97%"} mx={"md"}>

        <FilterCardsWithIcon
          icon={pendingIcon}
          selectedFilterCard={selectedCardFilter === CardFilters.PendingForApproval}
          title={"Pending for Approval"}
          count={getStatusCount(CardFilters.PendingForApproval).toString()}
          clickHandler={() => setSelectedCardFilter(CardFilters.PendingForApproval)}
        />
        <FilterCardsWithIcon
          icon={rejectedIcon}
          selectedFilterCard={selectedCardFilter === CardFilters.RejectedUsers}
          title={"Rejected Request"}
          count={getStatusCount(CardFilters.RejectedUsers).toString()}
          clickHandler={() => setSelectedCardFilter(CardFilters.RejectedUsers)}
        />
        <FilterCardsWithIcon
          icon={pendingIcon}
          selectedFilterCard={selectedCardFilter === CardFilters.TotalApprovedUsers}
          title={"Total Approved Users"}
          count={getStatusCount(CardFilters.TotalApprovedUsers).toString()}
          clickHandler={() => setSelectedCardFilter(CardFilters.TotalApprovedUsers)}
        />
      </SimpleGrid>

      <NewTableWithActions
        loader={internalUserLoaders.getInternalUserList}
        rowClick={
          selectedCardFilter !== CardFilters.TotalApprovedUsers
            ? selectedCardFilter === CardFilters.RejectedUsers
              ? rowData =>
                navigate(ROUTES.VIEW_INTERNAL_USER_FOR_APPROVE_REJECTED, {
                  state: { userData: rowData, from: "Approve", selectedCard: selectedCardFilter },
                })
              : undefined
            : rowData => navigate(ROUTES.INTERNAL_USER_APPROVED_DETAILS, { state: { userData: rowData, from: "Approve" } })
        }
        cardHeader={<TableHeader title={tableTitles} SearchComponent={SearchComponent} PaginationComponent={PaginationComponent} />}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        columns={commonColumns}
        data={finalData}
      />
    </>
  );
};

export default ApproveInternalUser;
