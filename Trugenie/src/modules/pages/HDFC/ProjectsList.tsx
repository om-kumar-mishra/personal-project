/* eslint-disable react/jsx-no-undef */
import { Box, Flex, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import useSearchAndPagination from "../../../hooks/useSearchAndPagination";
import { downloadNOCProjectSummaryRequest, requestProjectList, selectedProject } from "../../../lib/services/HDFC/Project/actions";
import { Project } from "../../../lib/services/HDFC/Project/dataTypes";
import { selectLoaders, selectProjectList } from "../../../lib/services/HDFC/Project/selectors";
import { UserDetails, UserRoles } from "../../../lib/services/hdfc_login/dataTypes";
import { selectUserDetails } from "../../../lib/services/hdfc_login/selectors";
import { getUpdateHoldStatusRequested } from "../../../lib/services/prefrences/actions";
import { ROUTES } from "../../../routeConstants";
import { errorNotification } from "../../../utils/notifications";
import NewTableWithActions from "../../../widgets/tables/MantineTable/NewTableWithActions";
import { successNotification } from "../../Components/UtilityFunctions";
import { setSideMenuType } from "../../../lib/services/common/action";
import { NavFor } from "../../../layout/navigationBar/navList";

const ProjectsList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //#region [selector]
  const userDetails = useSelector(selectUserDetails) as UserDetails;
  const projectList = useSelector(selectProjectList) as Project[];
  const projectLoaders = useSelector(selectLoaders);
  //#endregion

  const [currentLoadingRowAction, setCurrentLoadingRowAction] = useState<string | number | null>(null);

  //#region [useEffect]

  useEffect(() => {
    dispatch(setSideMenuType(NavFor.PROJECT));
  }, []);

  useEffect(() => {
    if (userDetails) {
      dispatch(requestProjectList(userDetails?.ClientId));
    }
  }, [userDetails]);

  const handleRedirect = (data: Project) => {
    const path = ROUTES.NOC_MANAGE_REQUEST;
    const setupPath = ROUTES.PROJECT_SETUP_UPDATE;
    dispatch(getUpdateHoldStatusRequested(data?.REAssetId));
    dispatch(selectedProject(data));
    navigate(userDetails.TemplateRoleName === UserRoles.VENDOR ? setupPath : path, { state: { reAssetId: data.REAssetId } });
  };

  const actionCallback = (success: boolean) => {
    setCurrentLoadingRowAction(null);
    if (success) {
      successNotification("NOC Project Summary downloaded successfully");
    } else {
      errorNotification("NOC Project summary downloaded failed");
    }
  };

  const handleDownloadProjectSummary = (data: Project) => {
    if (data) {
      setCurrentLoadingRowAction(data?.NocProjectId);
      dispatch(downloadNOCProjectSummaryRequest(data?.NocProjectId, data?.REAssetId, data?.AssetName, actionCallback));
    }
  };

  const { finalData, SearchComponent } = useSearchAndPagination({
    data: projectList,
    columnsToSearch: [
      { accessorKey: "REAssetId", type: "text" },
      { accessorKey: "DeveloperName", type: "text" },
      { accessorKey: "BorrowerName", type: "text" },
      { accessorKey: "AssetName", type: "text" },
      // { accessorKey: "TotalUnits", type: "text" },
      // { accessorKey: "PendingNOC", type: "text" },
      // { accessorKey: "ApporvedNoc", type: "text" },
    ],
    itemsPerPageData: [10, 20, 30, 40, 50],
    showItemsPerPageDropdown: true,
    useSearchOnly: true,
  });

  return (
    <Box mx={"md"}>
      <Flex justify={"flex-start"} m={"md"} gap={"md"}>
        <Text size='xl' weight={700} color='#001d56'>
          Project List
        </Text>
        {SearchComponent}
      </Flex>

      <NewTableWithActions
        loader={projectLoaders?.list}
        // cardHeader={<TableHeader title="Search" SearchComponent={SearchComponent} />}
        columns={[
          // { title: "Sr. No.", accessorKey: "REAssetId" },
          { title: "Group", accessorKey: "DeveloperName" },
          { title: "Borrower", accessorKey: "BorrowerName" },
          { title: "Project", accessorKey: "AssetName" },
          { title: "Total Units", accessorKey: "totalunits" },
          { title: "Pending NOC", accessorKey: "pending" },
          { title: "Approved NOC", accessorKey: "approved" },
          { title: "Setup Status", accessorKey: "status" },
          {
            title: "Actions",
            accessorKey: "actions",
            actionTypes: [
              { type: "view", onClick: data => handleRedirect(data) },
              {
                type: "download",
                onClick: data => handleDownloadProjectSummary(data),
                loading(row) {
                  return currentLoadingRowAction === row.NocProjectId && projectLoaders.downloadNocProjectSummary;
                },
              },
            ],
          },
        ]}
        data={finalData}
      />
    </Box>
  );
};

export default ProjectsList;
