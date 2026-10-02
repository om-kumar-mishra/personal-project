import { SimpleGrid, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import pendingIcon from "../../../../../../assets/logos/SVG/total_pending_for_approval.svg";
import rejectedIcon from "../../../../../../assets/logos/SVG/total_rejected.svg";
import useSearchAndPagination from "../../../../../../hooks/useSearchAndPagination";
import { getExternalUserListRequested } from "../../../../../../lib/services/HDFC/ExternalUser/actions";
import { GetExternalUserDataType } from "../../../../../../lib/services/HDFC/ExternalUser/dataTypes";
import { selectExternalUserList, selectExternalUserLoaders } from "../../../../../../lib/services/HDFC/ExternalUser/selectors";
import { selectUserDetails } from "../../../../../../lib/services/hdfc_login/selectors";
import { ROUTES } from "../../../../../../routeConstants";
import NewTableWithActions, { TableHeader } from "../../../../../../widgets/tables/MantineTable/NewTableWithActions";
import { getPresentableValue } from "../../../../../Components/UtilityFunctions";
import { FilterCardsWithIcon } from "../../../../InvestmentsDashboard/components";
import { selectSwitchClient } from "../../../../../../lib/services/HDFC/Commons/selectors";
  import { GetClientData } from "../../../../../../lib/services/HDFC/Commons/dataTypes";

enum CardFilters {
  PendingForApproval = "Pending",
  RejectedUsers = "Rejected",
  TotalUsers = "Approved",
}

const ApproveExternalUser = () => {
  const [selectedCardFilter, setSelectedCardFilter] = useState<CardFilters>(CardFilters.PendingForApproval);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const externalUserLoaders = useSelector(selectExternalUserLoaders);
  const externalUserList = useSelector(selectExternalUserList);
  const userDetails = useSelector(selectUserDetails);
  const activeClient = useSelector(selectSwitchClient) as GetClientData;

  useEffect(() => {
    dispatch(getExternalUserListRequested(userDetails?.EmailId ?? "",activeClient.ClientId));
  }, []);

  const selectedFilterData = (externalUserList ?? []).filter(item => {
    return item.Status === selectedCardFilter;
  });

  const getStatusCount = (status: string) => {
    return (externalUserList ?? []).filter(item => {
      return item.Status === status;
    }).length;
  };

  const { finalData, SearchComponent, PaginationComponent } = useSearchAndPagination({
    data: selectedFilterData ?? [],
    columnsToSearch: [
      { accessorKey: "DeveloperName", type: "text" },
      { accessorKey: "Email", type: "text" },
      { accessorKey: "InvesteeName", type: "text" },
      { accessorKey: "RoleName", type: "text" },
      { accessorKey: "Status", type: "text" },
      { type: "text", accessorKey: "Name" },
      { type: "text", accessorKey: "Email" },
      { type: "text", accessorKey: "DeveloperName" },
      { type: "text", accessorKey: "InvesteeName" },
    ],
    itemsPerPageData: [10, 20, 30, 40, 50],
    showItemsPerPageDropdown: true,
    showPaginationWithSearch: false,
  });

  let commonColumns: {
    title: string;
    accessorKey: keyof GetExternalUserDataType | "actions";
    transform?: (value: keyof GetExternalUserDataType, row: GetExternalUserDataType) => JSX.Element | string;
    actionTypes?: { type?: string; onClick?: (rowData) => void; override?: (rowData) => { tooltip?: string; icon?: JSX.Element } }[];
  }[] = [
      { title: "User Name", accessorKey: "Name" },
      { title: "Email ID", accessorKey: "Email" },
      { title: "Group", accessorKey: "DeveloperName" },
      { title: "Borrower", accessorKey: "InvesteeName" },
    ];

  switch (selectedCardFilter) {
    case CardFilters.PendingForApproval:
      commonColumns = [
        ...commonColumns,
        { title: "Type of Activity", accessorKey: "Activity" },
        {
          title: "Actions",
          accessorKey: "actions",
          actionTypes: [
            {
              type: "enableDisableUser",
              onClick: rowData =>
                navigate(ROUTES.APPROVE_SPECIFIC_EXTERNAL_USER, {
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
        { title: "Type of Activity", accessorKey: "Activity" },
        {
          title: "Rejected By/On",
          accessorKey: "CreatedBy",
          transform(value, row) {
            return (
              <Text
                title={`${value} - ${getPresentableValue(row.CreatedAt, true) as string}`}>
                {value} -{getPresentableValue(row.CreatedAt, true) as string}
              </Text>
            );
          },
        },
      ];
      break;

    case CardFilters.TotalUsers:
      commonColumns = [...commonColumns, { title: "Status", accessorKey: "Status" },
      ];
      break;

    default:
      commonColumns = [...commonColumns];
      break;
  }

  const tableTitles = selectedCardFilter === CardFilters.TotalUsers ? "External User List" :
    selectedCardFilter === CardFilters.PendingForApproval ? "Pending for Approval" : "Rejected Request"

  return (
    <>
      <SimpleGrid cols={3} spacing='md' w={"97%"} m={"md"}>

        <FilterCardsWithIcon
          icon={pendingIcon}
          selectedFilterCard={selectedCardFilter === CardFilters.PendingForApproval}
          title={"Pending for Approval"}
          count={getStatusCount(CardFilters.PendingForApproval) + ""}
          clickHandler={() => setSelectedCardFilter(CardFilters.PendingForApproval)}
        />
        <FilterCardsWithIcon
          icon={rejectedIcon}
          selectedFilterCard={selectedCardFilter === CardFilters.RejectedUsers}
          title={"Rejected Request"}
          count={getStatusCount(CardFilters.RejectedUsers) + ""}
          clickHandler={() => setSelectedCardFilter(CardFilters.RejectedUsers)}
        />
        <FilterCardsWithIcon
          icon={pendingIcon}
          selectedFilterCard={selectedCardFilter === CardFilters.TotalUsers}
          title={"Total Approved Users"}
          count={getStatusCount(CardFilters.TotalUsers) + ""}
          clickHandler={() => setSelectedCardFilter(CardFilters.TotalUsers)}
        />
      </SimpleGrid>
      <NewTableWithActions
        cardHeader={<TableHeader title={tableTitles} SearchComponent={SearchComponent} PaginationComponent={PaginationComponent} />}
        loader={externalUserLoaders.getExternalUserList}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        columns={commonColumns}
        rowClick={
          selectedCardFilter === CardFilters.RejectedUsers
            ? rowData =>
              navigate(ROUTES.VIEW_EXTERNAL_USER_REJECTED_USER, {
                state: {
                  userData: rowData,
                  from: "Approve",
                  selectedCardFilter,
                },
              })
            : selectedCardFilter === CardFilters.TotalUsers
              ? rowData =>
                navigate(ROUTES.VIEW_EXTERNAL_TOTAL_USER, {
                  state: {
                    userData: rowData,
                    from: "Approve",
                    selectedCardFilter,
                  },
                })
              : undefined
        }
        data={finalData}
      />
    </>
  );
};

export default ApproveExternalUser;
