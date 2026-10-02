import { Button, Card, Flex, Text } from "@mantine/core";
import shareIcon from "../../../../assets/logos/SVG/export.svg";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSearchAndPagination from "../../../../hooks/useSearchAndPagination";
import { getExportPopulationReportRequest, getPopulationReportRequest } from "../../../../lib/services/reports/actions";
import { selectPopulationReportData, selectPopulationReportLoading, selectReportLoaders } from "../../../../lib/services/reports/selectors";
import NewTableWithActions, { TableHeader } from "../../../../widgets/tables/MantineTable/NewTableWithActions";
import { DEFAULT_DATE_FORMAT, getPresentableValue } from "../../../Components/UtilityFunctions";
import dayjs from "dayjs";

export type TableRowDataType = {
  HdfcUserId: string;
  EmpName: string;
  EmpCode: string;
  BranchCode: string;
  BranchName: string;
  DepartmentCode: string;
  DepartmentName: string;
  TemplateRoleName: string;
  Status: string;
  CreationDateTime: string;
  LastLoginDateTime: string;
};

function PopulationReport() {
  const dispatch = useDispatch();

  //#region [selectors]
  const populationReportData = useSelector(selectPopulationReportData);
  const isLoading = useSelector(selectPopulationReportLoading);
  const loaders = useSelector(selectReportLoaders);
  //#endregion

  useEffect(() => {
    dispatch(getPopulationReportRequest());
  }, [dispatch]);

  const { finalData, SearchComponent, PaginationComponent } = useSearchAndPagination({
    data: populationReportData?.data,
    columnsToSearch: [
      { accessorKey: "HdfcUserId", type: "text" },
      { accessorKey: "EmpName", type: "text" },
      { accessorKey: "EmpCode", type: "text" },
      { accessorKey: "BranchCode", type: "text" },
      { accessorKey: "BranchName", type: "text" },
      { accessorKey: "DepartmentCode", type: "text" },
      { accessorKey: "DepartmentName", type: "text" },
      { accessorKey: "TemplateRoleName", type: "text" },
      { accessorKey: "Status", type: "text" },
      { accessorKey: "CreationDateTime", type: "text" },
      { accessorKey: "LastLoginDateTime", type: "text" },
      { accessorKey: "LastModifiedMakerId", type: "text" },
      { accessorKey: "MakerDateTime", type: "text" },
      { accessorKey: "LastModifiedCheckerId", type: "text" },
      { accessorKey: "CheckerDateTime", type: "text" },
      { accessorKey: "DisabledDateTime", type: "text" },
      { accessorKey: "ProfileEndDate", type: "text" },
      { accessorKey: "LastModifiedMakerName", type: "text" },
      { accessorKey: "LastModifiedCheckerName", type: "text" },
    ],
    itemsPerPageData: [10, 20, 30, 40, 50],
    showItemsPerPageDropdown: true,
    showPaginationWithSearch: false,
  });

  const handleDownload = () => {
    dispatch(getExportPopulationReportRequest());
  };

  return (
    <>
      <Card style={{ overflow: "visible" }}>
        <Flex justify={"flex-end"} gap={"xl"} mt='sm'>
          <h6>As on {dayjs().format(DEFAULT_DATE_FORMAT)}</h6>
        </Flex>
        <NewTableWithActions
          noMargin
          loader={isLoading}
          cardHeader={
            <TableHeader
              title='Population Report'
              SearchComponent={
                <>
                  {" "}
                  <Button onClick={handleDownload} variant='default' loading={loaders?.populationReportExport}>
                    <img src={shareIcon} style={{ width: "1rem", height: "1rem", color: "#001d56" }} />
                  </Button>
                  {SearchComponent}
                </>
              }
              PaginationComponent={PaginationComponent}
            />
          }
          columns={[
            {
              title: "User ID",
              accessorKey: "HdfcUserId",
            },
            { title: "User Name", accessorKey: "EmpName" },
            { title: "Employee Code", accessorKey: "EmpCode" },
            { title: "Branch Code", accessorKey: "BranchCode" },
            { title: "Branch Name", accessorKey: "BranchName" },
            { title: "Department Code", accessorKey: "DepartmentCode" },
            { title: "Department Name", accessorKey: "DepartmentName" },
            { title: "Profile", accessorKey: "TemplateRoleName" },
            { title: "Status", accessorKey: "Status" },
            {
              title: "Creation Date & Time",
              accessorKey: "CreationDateTime",
              transform: value => <Text title={getPresentableValue(value, true) as string}>{getPresentableValue(value, true) as string}</Text>,
            },
            {
              title: "Last Login Date & Time",
              accessorKey: "LastLoginDateTime",
              transform: value => <Text title={getPresentableValue(value, true) as string}>{getPresentableValue(value, true) as string}</Text>,
            },
            {
              title: "Last Modified Maker ID & Maker Name",
              accessorKey: "LastModifiedMakerId",
              transform: (value, row) => (
                <Text>
                  {value} {row.LastModifiedMakerName}
                </Text>
              ),
            },
            {
              title: " Maker Date &  Time",
              accessorKey: "MakerDateTime",
              transform: value => <Text title={getPresentableValue(value, true) as string}>{getPresentableValue(value, true) as string}</Text>,
            },
            {
              title: "Last modified Checker ID & Checker Name",
              accessorKey: "LastModifiedCheckerId",
              transform: (value, row) => (
                <Text>
                  {value} {row.LastModifiedCheckerName}
                </Text>
              ),
            },
            {
              title: "Checker Date & time",
              accessorKey: "CheckerDateTime",
              transform: value => <Text title={getPresentableValue(value, true) as string}>{getPresentableValue(value, true) as string}</Text>,
            },
            {
              title: "Disabled Date & Time",
              accessorKey: "DisabledDateTime",
              transform: value => <Text title={getPresentableValue(value, true) as string}>{getPresentableValue(value, true) as string}</Text>,
            },
            {
              title: "Profile End Date & Time/Deletion date & time",
              accessorKey: "ProfileEndDate",
              transform: value => <Text title={getPresentableValue(value, true) as string}>{getPresentableValue(value, true) as string}</Text>,
            },
          ]}
          data={finalData}
        />
      </Card>
    </>
  );
}

export default PopulationReport;
