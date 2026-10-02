import { Button, Card, Flex } from "@mantine/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import shareIcon from "../../../../assets/logos/SVG/export.svg";
import useSearchAndPagination from "../../../../hooks/useSearchAndPagination";
import { getExportRoleRightReportRequest, getRoleRightReportRequest } from "../../../../lib/services/reports/actions";
import {
  selectReportLoaders,
  selectRoleRightReportData,
  // selectRoleRightReportError,
  selectRoleRightReportLoading,
} from "../../../../lib/services/reports/selectors";
import NewTableWithActions, { TableHeader } from "../../../../widgets/tables/MantineTable/NewTableWithActions";
import dayjs from "dayjs";
import { DEFAULT_DATE_FORMAT } from "../../../Components/UtilityFunctions";

export type TableRowDataType = {
  name: string;
  description: string;
  rightsAssignedtoRole: string;
  rightsDescription: string;
  rightsAssigned: string;
  status: string;
  profileAssignedTo: string;
  types: string;
};

function RoleRightsReport() {
  const dispatch = useDispatch();

  //#region [selectors]
  const roleRightReportData = useSelector(selectRoleRightReportData);
  const isLoading = useSelector(selectRoleRightReportLoading);
  // const error = useSelector(selectRoleRightReportError);
  const exportLoader = useSelector(selectReportLoaders);
  //#endregion

  useEffect(() => {
    dispatch(getRoleRightReportRequest());
  }, [dispatch]);

  const { finalData, SearchComponent, PaginationComponent } = useSearchAndPagination({
    data: roleRightReportData?.data,
    columnsToSearch: [
      { accessorKey: "ProfileName", type: "text" },
      { accessorKey: "ProfileDescription", type: "text" },
      { accessorKey: "RightsAssignedRole", type: "text" },
      { accessorKey: "RightsDescription", type: "text" },
      { accessorKey: "RightsAssignedtoRole", type: "text" },
      { accessorKey: "Profile Status", type: "text" },
      { accessorKey: "ProfileAssignedDepartment", type: "text" },
      { accessorKey: "AccessType", type: "text" },
    ],
    itemsPerPageData: [10, 20, 30, 40, 50],
    showItemsPerPageDropdown: true,
    showPaginationWithSearch: false,
  });

  const today = new Date();
  const fifteenDaysAgo = new Date(today);
  fifteenDaysAgo.setDate(today.getDate() - 15);

  const handleDownload = () => {
    dispatch(getExportRoleRightReportRequest());
  };

  return (
    <Card>
      <Flex justify={"flex-end"} gap={"xl"} mt='sm'>
        <h6>As on {dayjs().format(DEFAULT_DATE_FORMAT)}</h6>
      </Flex>
      <NewTableWithActions
        noMargin
        loader={isLoading}
        cardHeader={
          <TableHeader
            title='Role Rights Report'
            SearchComponent={
              <>
                {" "}
                <Button onClick={handleDownload} variant='default' loading={exportLoader?.roleRightExport}>
                  <img src={shareIcon} style={{ width: "1rem", height: "1rem", color: "#001d56" }} />
                </Button>
                {SearchComponent}
              </>
            }
            PaginationComponent={PaginationComponent}
          />
        }
        columns={[
          { title: "Role/Profile Name", accessorKey: "ProfileName" },
          { title: "Role/Profile Description", accessorKey: "ProfileDescription" },
          { title: "Rights Assigned to Role", accessorKey: "RightsAssignedRole" },
          { title: "Rights Description", accessorKey: "RightsDescription" },
          { title: "Rights Assigned to Role Y/N", accessorKey: "RightsAssignedtoRole" },
          { title: "Role/Profile Status", accessorKey: "Profile Status" },
          { title: "Profile Assigned to (Department/Business Unit)", accessorKey: "ProfileAssignedDepartment" },
          { title: "Type of Access", accessorKey: "AccessType" },
        ]}
        data={finalData}
      />
    </Card>
  );
}

export default RoleRightsReport;
