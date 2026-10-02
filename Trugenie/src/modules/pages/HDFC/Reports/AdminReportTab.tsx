import { Button, Card, Flex, Text } from "@mantine/core";
import { DateInput, DatesProvider } from "@mantine/dates";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import calanderIcon from "../../../../assets/logos/SVG/calendar.svg";
import shareIcon from "../../../../assets/logos/SVG/export.svg";
import useSearchAndPagination from "../../../../hooks/useSearchAndPagination";
import { getAdminReportRequest, getExportAdminReportRequest } from "../../../../lib/services/reports/actions";
import { selectAdminReportData, selectAdminReportError, selectAdminReportLoading, selectReportLoaders } from "../../../../lib/services/reports/selectors";
import NewTableWithActions, { TableHeader } from "../../../../widgets/tables/MantineTable/NewTableWithActions";
import { errorNotification } from "../../../Components/UtilityFunctions";
import dayjs from "dayjs";

export type TableRowDataType = {
  HdfcUserId: string;
  NewEmpName: string;
  BranchCode: string;
  BranchName: string;
  ProfileName: string;
  Activity: string;
  LastModifiedMakerId: string;
  LastModifiedCheckerId: string;
  MakerDateTime: string;
  CheckerDateTime: string;
};

function AdminReport() {
  const dispatch = useDispatch();
  // Fetching data from Redux store state
  const adminReportData = useSelector(selectAdminReportData);
  const isLoading = useSelector(selectAdminReportLoading);
  const error = useSelector(selectAdminReportError);
  const exportLoader = useSelector(selectReportLoaders);

  const { finalData, SearchComponent, PaginationComponent } = useSearchAndPagination({
    data: adminReportData?.data,
    columnsToSearch: [
      { accessorKey: "HdfcUserId", type: "text" },
      { accessorKey: "UserName", type: "text" },
      { accessorKey: "BranchCode", type: "text" },
      { accessorKey: "BranchName", type: "text" },
      { accessorKey: "ProfileName", type: "text" },
      { accessorKey: "Activity", type: "text" },
      { accessorKey: "MakerIdAndName", type: "text" },
      { accessorKey: "CheckerIdAndName", type: "text" },
      { accessorKey: "MakerDateTime", type: "text" },
      { accessorKey: "CheckerDateTime", type: "text" },
      { accessorKey: "OldEmpName", type: "text" },
      { accessorKey: "EmpName", type: "text" },
      { accessorKey: "oldTemplateRoleName", type: "text" },
      { accessorKey: "TemplateRoleName", type: "text" },
      { accessorKey: "oldBranchName", type: "text" },
      { accessorKey: "oldBranchCode", type: "text" },
      { accessorKey: "BranchCode", type: "text" },
    ],
    itemsPerPageData: [10, 20, 30, 40, 50],
    showItemsPerPageDropdown: true,
    showPaginationWithSearch: false,
  });

  const today = dayjs();
  const backDate = today.subtract(30, "day");

  const defaultFromDate = backDate.toDate();
  const defaultToDate = today.toDate();

  const [fromDate, setFromDate] = useState<Date>(defaultFromDate);
  const [toDate, setToDate] = useState<Date>(defaultToDate);

  useEffect(() => {
    if (dayjs(fromDate) > dayjs(toDate)) {
      errorNotification("To date cannot be less than the From date.");
      setFromDate(defaultFromDate);
      setToDate(defaultToDate);
      return;
    } else if (fromDate && toDate && dayjs(fromDate) <= dayjs(toDate)) {
      dispatch(getAdminReportRequest(dayjs(fromDate)?.format("YYYY-MM-DD"), dayjs(toDate)?.format("YYYY-MM-DD")));
    }
  }, [dispatch, fromDate, toDate]);

  const handleDownload = () => {
    dispatch(getExportAdminReportRequest(dayjs(fromDate)?.format("YYYY-MM-DD"), dayjs(toDate)?.format("YYYY-MM-DD")));
  };
  const handleFromDateChange = (date: Date) => setFromDate(date);
  const handleToDateChange = (date: Date) => setToDate(date);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Card style={{ overflow: "visible" }}>
        <NewTableWithActions
          noMargin
          loader={isLoading}
          cardHeader={
            <TableHeader
              title='Admin Report'
              SearchComponent={
                <>
                  <Button onClick={handleDownload} variant='default' loading={exportLoader?.adminReportExport}>
                    <img src={shareIcon} style={{ width: "1rem", height: "1rem", color: "#001d56" }} />
                  </Button>
                  {SearchComponent}
                </>
              }
              PaginationComponent={PaginationComponent}
              afterSearch={
                <Flex gap={"sm"}>
                  <DatesProvider settings={{ firstDayOfWeek: 0, weekendDays: [0] }}>
                    <Flex gap={10} align={"center"}>
                      <Text size={12}>From Date</Text>
                      <DateInput
                        valueFormat='YYYY-MM-DD'
                        placeholder='From Date'
                        icon={<img src={calanderIcon} style={{ width: "1rem", height: "1rem", color: "#001d56" }} />}
                        value={fromDate}
                        maxDate={toDate}
                        onChange={handleFromDateChange}
                        w='125px'
                      />
                    </Flex>
                    <Flex gap={10} align={"center"}>
                      <Text size={12}>End Date</Text>
                      <DateInput
                        valueFormat='YYYY-MM-DD'
                        placeholder='To Date'
                        icon={<img src={calanderIcon} style={{ width: "1rem", height: "1rem", color: "#001d56" }} />}
                        value={toDate}
                        minDate={fromDate}
                        onChange={handleToDateChange}
                        w='125px'
                      />
                    </Flex>
                  </DatesProvider>
                </Flex>
              }
            />
          }
          columns={[
            { title: "User ID", accessorKey: "HdfcUserId" },
            { title: "User Name", accessorKey: "UserName" },
            { title: "Branch Code", accessorKey: "BranchCode" },
            { title: "Branch Name", accessorKey: "BranchName" },
            { title: "Profile Name", accessorKey: "ProfileName" },
            { title: "Activity", accessorKey: "Activity" },
            { title: "Maker ID & Name", accessorKey: "MakerIdAndName" },
            { title: "Checker ID & Name", accessorKey: "CheckerIdAndName" },
            { title: "Maker Date & Time", accessorKey: "MakerDateTime" },
            { title: "Checker Date & Time", accessorKey: "CheckerDateTime" },
            { title: "Old Emp Name", accessorKey: "OldEmpName" },
            { title: "New Emp Name", accessorKey: "EmpName" },
            { title: "Old Profile Name", accessorKey: "oldTemplateRoleName" },
            { title: "New Profile Name", accessorKey: "TemplateRoleName" },
            { title: "Old Branch Name", accessorKey: "oldBranchName" },
            { title: "New Branch Name", accessorKey: "BranchName" },
            { title: "Old Branch Code", accessorKey: "oldBranchCode" },
            { title: "New Branch Code", accessorKey: "BranchCode" },
          ]}
          data={finalData}
        />
      </Card>
    </>
  );
}

export default AdminReport;
