import { Flex, SimpleGrid, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import crossIcon from "../../../../../assets/logos/SVG/Check.svg";
import addLogo from "../../../../../assets/logos/SVG/add_new.svg";
import checkIcon from "../../../../../assets/logos/SVG/cross.svg";
import totalApprovedIcon from "../../../../../assets/logos/SVG/total_approved_users.svg";
import pendingIcon from "../../../../../assets/logos/SVG/total_pending_for_approval.svg";
import rejectedIcon from "../../../../../assets/logos/SVG/total_rejected.svg";
import useSearchAndPagination from "../../../../../hooks/useSearchAndPagination";
import { getCustomerInvesteeListRequested } from "../../../../../lib/services/HDFC/CustomerInvesteeCompany/actions";
import { getExternalUserListRequested } from "../../../../../lib/services/HDFC/ExternalUser/actions";
import { GetExternalUserDataType } from "../../../../../lib/services/HDFC/ExternalUser/dataTypes";
import { selectExternalUserList, selectExternalUserLoaders } from "../../../../../lib/services/HDFC/ExternalUser/selectors";
import { selectUserDetails } from "../../../../../lib/services/hdfc_login/selectors";
import { ROUTES } from "../../../../../routeConstants";
import { errorNotification } from "../../../../../utils/notifications";
import NewTableWithActions, { ActionType, TableHeader } from "../../../../../widgets/tables/MantineTable/NewTableWithActions";
import CommonAddButton from "../../../../Components/Buttons";
import { getPresentableValue } from "../../../../Components/UtilityFunctions";
import { FilterCardsWithIcon } from "../../../InvestmentsDashboard/components";
import EnableDisableUser from "./Approve/EnableDisableUser";
import EditExtenalUser from "./EditExternalUser";
import { GetClientData } from "../../../../../lib/services/HDFC/Commons/dataTypes";
import { selectSwitchClient } from "../../../../../lib/services/HDFC/Commons/selectors";

enum CardFilters {
  TotalApprovedUsers = "Approved",
  PendingForApproval = "Pending",
  RejectedRequest = "Rejected",
}

const UpdateExternalUser = () => {
  const [selectedCardFilter, setSelectedCardFilter] = useState<CardFilters>(CardFilters.TotalApprovedUsers);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Location = useLocation();

  const externalUserLoaders = useSelector(selectExternalUserLoaders);
  const externalUserList = useSelector(selectExternalUserList);
  const userDetails = useSelector(selectUserDetails);
  const activeClient = useSelector(selectSwitchClient) as GetClientData;

  const [viewEditModal, { open: openEditModal, close: closeEditModal }] = useDisclosure(false);
  const [viewEnableModal, { open: openEnableModal, close: closeEnableModal }] = useDisclosure(false);

  const [data, setData] = useState<GetExternalUserDataType | null>(null);

  
  useEffect(() => {
    if (Location.state?.from && Location.state.from === ROUTES.ADD_EXTERNAL_USER) {
      setSelectedCardFilter(CardFilters.PendingForApproval);
      window.history.replaceState(null, "");
    }
  }, [Location]);

  useEffect(() => {
    dispatch(getExternalUserListRequested(userDetails?.EmailId ?? "",activeClient.ClientId));
    dispatch(getCustomerInvesteeListRequested(activeClient.ClientId, userDetails?.EmailId ?? ""));
  }, []);

  const selectedFilterData = (externalUserList ?? []).filter(item => {
    return item.Status === selectedCardFilter;
  });

  const pendingData = (externalUserList ?? []).filter(item => {
    return item.Status === CardFilters.PendingForApproval;
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
      { accessorKey: "RoleName", type: "text" },
      { accessorKey: "Status", type: "text" },
      { accessorKey: "CreatedBy", type: "text" },
      { accessorKey: "Name", type: "text" },
      { accessorKey: "Email", type: "text" },
    ],
    itemsPerPageData: [10, 20, 30, 40, 50],
    showItemsPerPageDropdown: true,
    showPaginationWithSearch: false,
  });

  const navigateUser = (userData: GetExternalUserDataType, selectedCardFilter: CardFilters) => {
    const route =
      selectedCardFilter === CardFilters.PendingForApproval ? ROUTES.VIEW_EXTERNAL_USER_PENDING_FOR_APPROVAL : ROUTES.VIEW_EXTERNAL_USER_REJECTED_USER;
    navigate(route, {
      state: {
        userData: userData,
        from: "Update",
        selectedCardFilter: selectedCardFilter,
      },
    });
  };

  let commonColumns: {
    title: string;
    accessorKey: keyof GetExternalUserDataType | "actions";
    transform?: (value: any, row: GetExternalUserDataType) => string | JSX.Element;
    actionTypes?: {
      type?: ActionType;
      onClick?: (row: GetExternalUserDataType) => void;
      override?: (row: GetExternalUserDataType) => { icon?: React.ElementType | any; tooltip?: string };
    }[];
  }[] = [
    { title: "User Name", accessorKey: "Name" },
    { title: "Email ID", accessorKey: "Email" },
    { title: "Group", accessorKey: "DeveloperName" },
    { title: "Borrower", accessorKey: "InvesteeName" },
  ];
  switch (selectedCardFilter) {
    case CardFilters.TotalApprovedUsers:
      commonColumns = [
        ...commonColumns,
        { title: "Status", accessorKey: "Status" },
        {
          title: "Actions",
          accessorKey: "actions",
          actionTypes: [
            {
              type: "edit",
              onClick: rowData => {
                const isPendingExists = pendingData.some(item => item.Email === rowData?.Email);
                if (isPendingExists) {
                  errorNotification("Request is still pending for approve");
                  return;
                }
                setData(rowData);
                openEditModal();
              },
            },
            {
              type: "deactivate",
              onClick: rowData => {
                const isPendingExists = pendingData.some(item => item.Email === rowData?.Email);
                if (isPendingExists) {
                  errorNotification("Request is still pending for approve");
                  return;
                }
                setData(rowData);
                openEnableModal();
              },
              override: rowData => {
                if (rowData.IsActive) {
                  return { icon: checkIcon, tooltip: "Disable User" };
                } else {
                  return { icon: crossIcon, tooltip: "Enable User" };
                }
              },
            },
          ],
        },
      ];
      break;
    case CardFilters.PendingForApproval:
      commonColumns = [...commonColumns, { title: "Type of Activity", accessorKey: "Activity" }];
      break;
    case CardFilters.RejectedRequest:
      commonColumns = [
        ...commonColumns,
        { title: "Type of Activity", accessorKey: "Activity" },
        {
          title: "Rejected By/On",
          accessorKey: "CreatedBy",
          transform(value, row) {
            return (
              <Text title={`${value} - ${getPresentableValue(row.CreatedAt ?? row.CheckerApprovedDate, true)}`}>
                {value} -{getPresentableValue(row.CreatedAt ?? row.CheckerApprovedDate, true) as string}
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

  const tableTitles =
    selectedCardFilter === CardFilters.TotalApprovedUsers
      ? "External User List"
      : selectedCardFilter === CardFilters.PendingForApproval
      ? "Pending for Approval"
      : "Rejected Request";

  return (
    <>
      <Flex align={"center"} justify={"space-between"} m={"md"}>
        <SimpleGrid cols={3} spacing='md' style={{ width: `calc(100% + 80px)` }}>
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
            handleClick={() => navigate(ROUTES.ADD_EXTERNAL_USER)}
            title='User'
            offsetToBreadcrumb={true}
            leftIcon={<img src={addLogo} style={{ width: "20px", height: "20px", filter: "invert(1)" }} />}
          />
        ) : null}
      </Flex>

      <NewTableWithActions
        loader={externalUserLoaders.getExternalUserList}
        cardHeader={<TableHeader title={tableTitles} SearchComponent={SearchComponent} PaginationComponent={PaginationComponent} />}
        rowClick={
          selectedCardFilter !== CardFilters.TotalApprovedUsers
            ? selectedCardFilter === CardFilters.PendingForApproval
              ? row => navigateUser(row, selectedCardFilter)
              : row => navigateUser(row, selectedCardFilter)
            : undefined
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        columns={commonColumns}
        data={finalData}
      />

      <EditExtenalUser
        externalUserDetails={data}
        open={viewEditModal}
        onClose={() => {
          closeEditModal();
          setData(null);
        }}
        onSubmit={() => {
          setSelectedCardFilter(CardFilters.PendingForApproval);
        }}
      />
      <EnableDisableUser
        externalUserDetails={data}
        open={viewEnableModal}
        onClose={() => {
          closeEnableModal();
          setData(null);
        }}
        onSubmit={() => {
          setSelectedCardFilter(CardFilters.PendingForApproval);
        }}
      />
    </>
  );
};

export default UpdateExternalUser;
