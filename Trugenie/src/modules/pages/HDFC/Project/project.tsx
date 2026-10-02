import { Flex, Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import addLogo from "../../../../assets/logos/SVG/add_new.svg";
import useSearchAndPagination from "../../../../hooks/useSearchAndPagination";
import { requestAllProjectList } from "../../../../lib/services/HDFC/Project/actions";
import { AllProjectList } from "../../../../lib/services/HDFC/Project/dataTypes";
import { selectAllProjectList, selectLoaders } from "../../../../lib/services/HDFC/Project/selectors";
import { selectUserDetails } from "../../../../lib/services/hdfc_login/selectors";
import { ROUTES } from "../../../../routeConstants";
import TableWithAction, { TableHeader } from "../../../../widgets/tables/MantineTable/NewTableWithActions";
import CommonAddButton from "../../../Components/Buttons";
import { selectSwitchClient } from "../../../../lib/services/HDFC/Commons/selectors";
import { GetClientData } from "../../../../lib/services/HDFC/Commons/dataTypes";

const ProjectPage = () => {
  const dispatch = useDispatch();
  const projectList = useSelector(selectAllProjectList);
  const loaders = useSelector(selectLoaders);
  const userDetails = useSelector(selectUserDetails);
  const activeClient = useSelector(selectSwitchClient) as GetClientData;
  const navigate = useNavigate();
  // add portfolio
  const handelAddProject = () => {
    navigate(ROUTES.ADD_PROJECT_PAGE);
  };
  // handel view
  const handelProjectView = (row: AllProjectList) => {
    navigate(ROUTES.VIEW_PROJECT_PAGE, { state: row });
  };
  // handel enableDisable
  const handelEnableDisable = (row: AllProjectList) => {
    if (row.IsActive == 1 && row?.pendingnoc > 0) {
      openConfirmModal({
        title: `Confirm Disable ${row?.AssetName}`,
        centered: true,
        children: (
          <Text size='sm'>
            There are <strong>{row?.pendingnoc}</strong> NOCs request in progress. Do you still want to disable the project?
          </Text>
        ),
        labels: { confirm: "Confirm", cancel: "Cancel" },
        confirmProps: {
          style: { backgroundColor: "#001d56" },
          disabled: undefined,
          loading: undefined,
        },
        onClose: () => {
          // no action specified;
        },

        onConfirm: () => navigate(ROUTES.ENABLE_DISABLE_PROJECT_PAGE, { state: row }),
      });
    } else {
      navigate(ROUTES.ENABLE_DISABLE_PROJECT_PAGE, { state: row });
    }
  };
  // handel timeline
  const handelTimeline = (row: AllProjectList) => {
    navigate(ROUTES.TIMELINE_PROJECT_PAGE, { state: row });
  };
  // handel assign user
  const handelAssignUser = (row: AllProjectList) => {
    navigate(ROUTES.ASSIGN_USER_PROJECT_PAGE, { state: row });
  };

  useEffect(() => {
    activeClient.ClientId && userDetails?.EmailId && dispatch(requestAllProjectList(activeClient.ClientId, userDetails.EmailId));
  }, [userDetails?.EmailId]);

  const { finalData, SearchComponent, PaginationComponent } = useSearchAndPagination({
    data: projectList ?? [],
    columnsToSearch: [
      {
        accessorKey: "REAssetId",
        label: "Project ID",
        type: "number",
      },
      {
        accessorKey: "AssetName",
        label: "Project",
        type: "text",
      },
      { label: "Group", accessorKey: "DeveloperName", type: "text" },
      {
        label: "Borrower",
        accessorKey: "BorrowerName",
        type: "text",
      },
    ],
    itemsPerPageData: [10, 20, 30, 40, 50],
    showItemsPerPageDropdown: true,
    showPaginationWithSearch: false,
  });
  return (
    <>
      <Flex justify={"end"}>
        <CommonAddButton
          handleClick={handelAddProject}
          title='Add'
          leftIcon={<img src={addLogo} style={{ width: "20px", height: "20px", filter: "invert(1)" }} />}
        />
      </Flex>
      <TableWithAction
        loader={loaders.allProjectList}
        cardHeader={<TableHeader title='Project List' SearchComponent={SearchComponent} PaginationComponent={PaginationComponent} />}
        columns={[
          {
            title: "Project ID",
            accessorKey: "ProjectId",
          },
          {
            title: "Project",
            accessorKey: "AssetName",
          },
          { title: "Group", accessorKey: "DeveloperName" },
          {
            title: "Borrower",
            accessorKey: "BorrowerName",
          },
          // { title: "Lead RM", accessorKey: "LeadRM" },
          {
            title: "Project Status",
            accessorKey: "status",
          },
          // { title: "Actions", accessorKey: "actions" },
          {
            title: "Actions",
            accessorKey: "actions",
            actionTypes: [
              { type: "view", onClick: handelProjectView },
              { type: "enableDisableUser", onClick: handelEnableDisable },
              { type: "assignUser", onClick: handelAssignUser },
              { type: "timeline", onClick: handelTimeline },
            ],
          },
        ]}
        data={finalData}
      />
    </>
  );
};

export default ProjectPage;
