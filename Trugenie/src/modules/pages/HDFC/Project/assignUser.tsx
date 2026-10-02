import { Card, Flex, Space, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import AssigneduserIcon from "../../../../assets/logos/SVG/Assign_User.svg";
import useSearchAndPagination from "../../../../hooks/useSearchAndPagination";
import { ResetRMUsersList, getTaggedRMUserListRequested } from "../../../../lib/services/HDFC/Commons/actions";
import { GetRmUsersDataType } from "../../../../lib/services/HDFC/Commons/dataTypes";
import { selectTaggedRMUserList } from "../../../../lib/services/HDFC/Commons/selectors";
import {
  getUserProjectAccessDetailsFailedAction,
  getUserProjectAccessDetailsRequestAction,
  getUserProjectAccessRequestAction,
} from "../../../../lib/services/HDFC/Project/actions";
import { ProjectUserAccessList } from "../../../../lib/services/HDFC/Project/dataTypes";
import {
  selectCustomerTaggedRMUsers,
  selectLoaders,
  selectProjectAccessUserDetails,
  selectProjectAccessUserList,
} from "../../../../lib/services/HDFC/Project/selectors";
import { selectUserDetails } from "../../../../lib/services/hdfc_login/selectors";
import TableWithAction, { TableHeader } from "../../../../widgets/tables/MantineTable/NewTableWithActions";
import CommonAddButton from "../../../Components/Buttons";
import { TableRow } from "../../../Components/TableRow";
import { getPresentableValue } from "../../../Components/UtilityFunctions";
import AddAssignUserModal from "./modals/addAssignUser";
import RemoveAccessUserModal from "./modals/removeAccessUserModal";
import ViewAccessUserModal from "./modals/viewAccessModal";
const rmsNeeded = ["Lead RM", "RM 2", "RM 3"];

const AssignUserInProject = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector(selectUserDetails);
  const rmTags = useSelector(selectCustomerTaggedRMUsers);
  const projectAccessUserList = useSelector(selectProjectAccessUserList);
  const projectLoaders = useSelector(selectLoaders);
  const projectAccessUserDetails = useSelector(selectProjectAccessUserDetails);
  const location = useLocation();

  const [modalOpenType, setModalOpenType] = useState<"view" | "access" | undefined>(undefined);
  const [selectedRow, setSelectedRow] = useState<ProjectUserAccessList | undefined>(undefined);
  const [viewModalState, { open: openViewModal, close: closeViewModal }] = useDisclosure(false);
  const [removeAccessModalState, { open: openRemoveAccessUserModal, close: closeRemoveAccessModal }] = useDisclosure(false);
  const [addAssignModalState, { open: openAddAssignUserModal, close: closeAddAssignModal }] = useDisclosure(false);

  const taggedRmUserList = useSelector(selectTaggedRMUserList);

  const [rmData, setRmData] = useState<GetRmUsersDataType[] | null>(taggedRmUserList ?? []);

  useEffect(() => {
    return () => {
      dispatch(ResetRMUsersList());
    };
  }, []);

  useEffect(() => {
    setRmData(taggedRmUserList);
  }, [taggedRmUserList]);

  const { finalData, SearchComponent, PaginationComponent } = useSearchAndPagination({
    data: projectAccessUserList ?? [],
    columnsToSearch: [
      {
        label: "Role Name",
        accessorKey: "UserRole",
        type: "text",
      },
      {
        label: "Employee Name",
        accessorKey: "UserName",
        type: "text",
      },
      {
        label: "Email Id",
        accessorKey: "UserEmail",
        type: "text",
      },
    ],
    itemsPerPageData: [10, 20, 30, 40, 50],
    showItemsPerPageDropdown: true,
    showPaginationWithSearch: false,
  });

  useEffect(() => {
    projectAccessUserDetails && modalOpenType === "view" && openViewModal();
    projectAccessUserDetails && modalOpenType === "access" && selectedRow && openRemoveAccessUserModal();
  }, [projectAccessUserDetails, modalOpenType, selectedRow]);

  useEffect(() => {
    if (userDetails && location.state) {
      location.state?.DeveloperId && dispatch(getUserProjectAccessRequestAction(userDetails?.EmailId, location.state.REAssetId, userDetails?.TemplateRoleName));
    }
  }, [location.state, userDetails]);

  useEffect(() => {
    if (location?.state?.DeveloperId && userDetails?.EmailId) {
      dispatch(getTaggedRMUserListRequested(userDetails?.EmailId ?? "", Number(location?.state?.DeveloperId)));
    }
  }, [location?.state?.DeveloperId]);

  return (
    <>
      <Flex justify={"end"}>
        <CommonAddButton
          handleClick={openAddAssignUserModal}
          title=' Assign User'
          leftIcon={<img src={AssigneduserIcon} style={{ width: "20px", height: "20px", filter: "invert(1)" }} />}
        />
      </Flex>

      <Card shadow='sm' padding='lg' radius='md' withBorder m={20}>
        <Flex gap={10} align={"center"}>
          <img src={AssigneduserIcon} className='icon-size' style={{ width: "20px", height: "20px", color: "#001d56" }} />
          <Text size={"md"} fw='bold' color={"#001d56"}>
            User Assigned to Project
          </Text>
        </Flex>

        <Space h={"sm"} />

        <Flex gap={200}>
          <div>
            <TableRow fullWidth title='Group' value={<Text>{location?.state?.DeveloperName}</Text>} />
            <TableRow title='Project ID' value={<Text>{location?.state?.ProjectId}</Text>} />
            {/* <TableRow
              title="RM's Tagged"
              value={
                <Flex direction={"column"}>
                  {rmData?.map((item, index) => {
                    return (
                      <Flex key={index}>
                        <Text>{item.AccessTag} - &emsp;</Text>
                        <Text>{`${item.EmpCode} ${item.EmpName} `}</Text>
                      </Flex>
                    );
                  })}
                  {rmsNeeded
                    .filter(item => !rmData?.map(item => item.AccessTag)?.includes(item))
                    .map((item, index) => {
                      return (
                        <Flex key={index}>
                          <Text>{item} - &emsp;</Text>
                          {rmData && rmData.length > 0 && <Text>Not Tagged</Text>}
                        </Flex>
                      );
                    })}
                </Flex>
              }
            /> */}
          </div>
          <div>
            <TableRow title='Borrower' value={<Text>{location?.state?.BorrowerName}</Text>} />
            <TableRow title='Project Name' value={<Text>{location?.state?.AssetName}</Text>} />
            <TableRow
              title='Last edited By/On'
              value={
                <Text>
                  {location?.state?.lasteditby} -{getPresentableValue(location?.state.lastediton, true) as string}
                </Text>
              }
            />
          </div>
        </Flex>
      </Card>

      <TableWithAction
        loader={projectLoaders.projectAccessUserList}
        cardHeader={<TableHeader title='List of Users' SearchComponent={SearchComponent} PaginationComponent={PaginationComponent} />}
        columns={[
          {
            title: "Role Name",
            accessorKey: "UserRole",
          },
          {
            title: "Employee Name",
            accessorKey: "UserName",
          },
          { title: "Email Id", accessorKey: "UserEmail" },
          {
            title: "Actions",
            accessorKey: "actions",
            actionTypes: [
              {
                type: "view",
                onClick: (row: ProjectUserAccessList) => {
                  userDetails &&
                    location.state &&
                    dispatch(getUserProjectAccessDetailsRequestAction(row.UserEmail, row.EMPCode, row.UserRole, location.state.REAssetId));
                  setModalOpenType("view");
                },
              },
              {
                type: "removeUser",
                onClick: (row: ProjectUserAccessList) => {
                  setSelectedRow(row);
                  userDetails &&
                    location.state &&
                    dispatch(getUserProjectAccessDetailsRequestAction(row.UserEmail, row.EMPCode, row.UserRole, location.state.REAssetId));
                  setModalOpenType("access");
                },
                disabled: (row: ProjectUserAccessList) => row.canremoveaccess !== 1,
              },
            ],
          },
        ]}
        data={finalData}
      />
      <ViewAccessUserModal
        open={viewModalState}
        onClose={() => {
          dispatch(getUserProjectAccessDetailsFailedAction());
          closeViewModal();
        }}
      />
      <RemoveAccessUserModal
        open={removeAccessModalState}
        onClose={() => {
          dispatch(getUserProjectAccessDetailsFailedAction());
          setSelectedRow(undefined);
          closeRemoveAccessModal();
        }}
        data={selectedRow}
        state={location.state}
      />
      {addAssignModalState && <AddAssignUserModal open={addAssignModalState} state={location.state} onClose={closeAddAssignModal} />}
    </>
  );
};

export default AssignUserInProject;
