import { Flex, SimpleGrid, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import addLogo from "../../../../../assets/logos/SVG/add_new.svg";
import totalApprovedIcon from "../../../../../assets/logos/SVG/total_approved_users.svg";
import pendingIcon from "../../../../../assets/logos/SVG/total_pending_for_approval.svg";
import rejectedIcon from "../../../../../assets/logos/SVG/total_rejected.svg";
import useSearchAndPagination from "../../../../../hooks/useSearchAndPagination";
import { getInternalUserListRequested } from "../../../../../lib/services/HDFC/InternalUser/actions";
import { GetInternalUserDataType } from "../../../../../lib/services/HDFC/InternalUser/dataTypes";
import { selectInternalUserList, selectInternalUserLoaders } from "../../../../../lib/services/HDFC/InternalUser/selectors";
import { selectUserDetails } from "../../../../../lib/services/hdfc_login/selectors";
import { ROUTES } from "../../../../../routeConstants";
import NewTableWithActions, { ActionType, TableHeader } from "../../../../../widgets/tables/MantineTable/NewTableWithActions";
import CommonAddButton from "../../../../Components/Buttons";
import { getPresentableValue } from "../../../../Components/UtilityFunctions";
import { FilterCardsWithIcon } from "../../../InvestmentsDashboard/components";

export enum CardFilters {
  TotalApprovedUsers = "Approved",
  PendingForApproval = "Pending",
  RejectedRequest = "Rejected",
}

const UpdateInternalUser = () => {
  const [selectedCardFilter, setSelectedCardFilter] = useState<CardFilters>(CardFilters.TotalApprovedUsers);
  const Location = useLocation();

  useEffect(() => {
    if (Location.state?.from && Location.state.from === ROUTES.ADD_USER) {
      setSelectedCardFilter(CardFilters.PendingForApproval);
      window.history.replaceState(null, "");
    }
  }, [Location]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const internalUserLoaders = useSelector(selectInternalUserLoaders);
  const internalUserList = useSelector(selectInternalUserList);
  const userDetails = useSelector(selectUserDetails);

  useEffect(() => {
    dispatch(getInternalUserListRequested(userDetails?.EmailId ?? ""));
  }, []);

  const navigateUser = (route: string, userData: GetInternalUserDataType) => {
    navigate(route, {
      state: {
        userData: userData,
        from: "Update",
        selectedCard: selectedCardFilter,
      },
    });
  };

  const selectedFilterData = (internalUserList ?? []).filter(item => {
    return item.Title === selectedCardFilter;
  });

  const getStatusCount = (status: string) => {
    return (internalUserList ?? []).filter(item => {
      return item.Title === status;
    }).length;
  };

  const { finalData, SearchComponent, PaginationComponent } = useSearchAndPagination({
    data: selectedFilterData || [],
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
    transform?: (value: any, row: GetInternalUserDataType) => string | JSX.Element;
    actionTypes?: {
      type?: ActionType;
      onClick?: (row: GetInternalUserDataType) => void;
      override?: { icon?: React.ElementType; tooltip?: string };
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
        {
          title: "Status",
          accessorKey: "Activity",
        },
        { title: "Source", accessorKey: "UserSource" },
      ];
      break;
    case CardFilters.PendingForApproval:
      commonColumns = [...commonColumns, { title: "Type Of Activity", accessorKey: "Activity" }, { title: "Source", accessorKey: "UserSource" }];
      break;
    case CardFilters.RejectedRequest:
      commonColumns = [
        ...commonColumns,
        { title: "Activity", accessorKey: "Activity" },
        {
          title: "Rejected By/On",
          accessorKey: "CheckerEmpName",
          transform(value, row) {
            return (
              <Text title={`${value}${getPresentableValue(row.CheckerApprovedDate, true) as string}`}>
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
      <Flex align={"center"} justify={"space-between"} m={"md"}>
        <SimpleGrid cols={3} spacing='md' ml={"md"} style={{ width: "100%" }}>
          <FilterCardsWithIcon
            icon={totalApprovedIcon}
            selectedFilterCard={selectedCardFilter === CardFilters.TotalApprovedUsers}
            title={"Total Approved Users"}
            count={getStatusCount(CardFilters.TotalApprovedUsers) + ""}
            clickHandler={() => setSelectedCardFilter(CardFilters.TotalApprovedUsers)}
          />
          <FilterCardsWithIcon
            icon={pendingIcon}
            selectedFilterCard={selectedCardFilter === CardFilters.PendingForApproval}
            title={"Pending for Approval"}
            count={getStatusCount(CardFilters.PendingForApproval) + ""}
            clickHandler={() => setSelectedCardFilter(CardFilters.PendingForApproval)}
          />
          <FilterCardsWithIcon
            icon={rejectedIcon}
            selectedFilterCard={selectedCardFilter === CardFilters.RejectedRequest}
            title={"Rejected Request"}
            count={getStatusCount(CardFilters.RejectedRequest) + ""}
            clickHandler={() => setSelectedCardFilter(CardFilters.RejectedRequest)}
          />
        </SimpleGrid>

        {selectedCardFilter === CardFilters.TotalApprovedUsers ? (
          <CommonAddButton
            handleClick={() => navigate(ROUTES.ADD_USER)}
            title='User'
            offsetToBreadcrumb={true}
            leftIcon={<img src={addLogo} style={{ width: "20px", height: "20px", filter: "invert(1)" }} />}
          />
        ) : null}
      </Flex>

      <NewTableWithActions
        loader={internalUserLoaders.getInternalUserList}
        cardHeader={<TableHeader title={tableTitles} SearchComponent={SearchComponent} PaginationComponent={PaginationComponent} />}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        columns={commonColumns}
        rowClick={
          selectedCardFilter === CardFilters.TotalApprovedUsers
            ? row => navigateUser(ROUTES.VIEW_USER, row)
            : selectedCardFilter === CardFilters.PendingForApproval
              ? row => navigateUser(ROUTES.VIEW_INTERNAL_USER_FOR_PENDING_AND_REJECTED, row)
              : row => navigateUser(ROUTES.VIEW_INTERNAL_USER_FOR_REJECTED, row)
        }
        data={finalData}
      />
    </>
  );
};

export default UpdateInternalUser;
