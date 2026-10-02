import { Button, Card, Flex, Text } from "@mantine/core";
import { DateInput, DatesProvider } from "@mantine/dates";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import calanderIcon from "../../../../../assets/logos/SVG/calendar.svg";
import shareIcon from "../../../../../assets/logos/SVG/export.svg";
import useSearchAndPagination from "../../../../../hooks/useSearchAndPagination";
import { exportAllNOCReportRequest, getAllNOCReportRequest } from "../../../../../lib/services/reports/actions";
import { selectAllNOCReportState, selectReportLoaders } from "../../../../../lib/services/reports/selectors";
import NewTableWithActions, { TableHeader } from "../../../../../widgets/tables/MantineTable/NewTableWithActions";
import { DEFAULT_DATE_FORMAT, errorNotification, getPresentableValue } from "../../../../Components/UtilityFunctions";

function AllNOCReport() {
  const dispatch = useDispatch();

  // Fetching data from Redux store state
  const allNOCReportData = useSelector(selectAllNOCReportState);
  const loader = useSelector(selectReportLoaders);

  const { finalData, SearchComponent, PaginationComponent } = useSearchAndPagination({
    data: allNOCReportData,
    columnsToSearch: [
      { accessorKey: "NocRequestId", type: "text" },
      { accessorKey: "DeveloperName", type: "text" },
      { accessorKey: "BorrowerName", type: "text" },
      { accessorKey: "AssetName", type: "text" },
      { accessorKey: "ProjectId", type: "text" },
      { accessorKey: "ZoneName", type: "text" },
      { accessorKey: "RegionsName", type: "text" },
      { accessorKey: "LocationName", type: "text" },
      { accessorKey: "LeadRM", type: "text" },
      { accessorKey: "RM2", type: "text" },
      { accessorKey: "RM3", type: "text" },
      { accessorKey: "UnitDetail", type: "text" },
      { accessorKey: "InitiatedBy", type: "text" },
      { accessorKey: "InitiatedOn", type: "text" },
      { accessorKey: "LastActionBy", type: "text" },
      { accessorKey: "LastActionOn", type: "text" },
      // { accessorKey: "SentBackBy", type: "text" },
      // { accessorKey: "SentBackOn", type: "text" },
      { accessorKey: "SentBackCount", type: "text" },
      // { accessorKey: "SentBackReason", type: "text" },
      { accessorKey: "CurrentStatus", type: "text" },
      { accessorKey: "OverallTat", type: "text" },
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
      dispatch(getAllNOCReportRequest(-1, dayjs(fromDate)?.format("YYYY-MM-DD"), dayjs(toDate)?.format("YYYY-MM-DD")));
    }
  }, [dispatch, fromDate, toDate]);

  // handle-downlaod
  const handleDownload = () => {
    if (fromDate && toDate && dayjs(fromDate) <= dayjs(toDate)) {
      dispatch(exportAllNOCReportRequest(-1, dayjs(fromDate)?.format("YYYY-MM-DD"), dayjs(toDate)?.format("YYYY-MM-DD")));
    }
  };

  // handle-from-date
  const handleFromDateChange = (date: Date) => setFromDate(date);

  // handle-to-date
  const handleToDateChange = (date: Date) => setToDate(date);

  return (
    <>
      <Card style={{ overflow: "visible" }}>
        <NewTableWithActions
          loader={loader?.allNOCReport}
          cardHeader={
            <TableHeader
              title='All NOC Report'
              SearchComponent={
                <>
                  <Button onClick={handleDownload} variant='default' loading={loader.allNocReportExport}>
                    <img src={shareIcon} style={{ width: "1rem", height: "1rem", color: "#001d56" }} />
                  </Button>
                  {SearchComponent}
                </>
              }
              PaginationComponent={PaginationComponent}
              afterSearch={
                <Flex gap={"sm"}>
                  <Flex gap={10} align={"center"}>
                    <Text size={12}>From Date</Text>
                    <DateInput
                      valueFormat={DEFAULT_DATE_FORMAT}
                      placeholder='From Date'
                      icon={<img src={calanderIcon} style={{ width: "1rem", height: "1rem", color: "#001d56" }} />}
                      value={fromDate}
                      maxDate={toDate}
                      onChange={handleFromDateChange}
                      w='130px'
                    />
                  </Flex>
                  <DatesProvider settings={{ firstDayOfWeek: 0, weekendDays: [0] }}>
                    <Flex gap={10} align={"center"}>
                      <Text size={12}>End Date</Text>
                      <DateInput
                        valueFormat={DEFAULT_DATE_FORMAT}
                        placeholder='To Date'
                        icon={<img src={calanderIcon} style={{ width: "1rem", height: "1rem", color: "#001d56" }} />}
                        value={toDate}
                        minDate={fromDate}
                        onChange={handleToDateChange}
                        w='130px'
                      />
                    </Flex>
                  </DatesProvider>
                </Flex>
              }
            />
          }
          columns={[
            { title: "CID", accessorKey: "NocRequestId" },
            { title: "Group", accessorKey: "DeveloperName" },
            { title: "Borrower", accessorKey: "BorrowerName" },
            { title: "Project Name", accessorKey: "AssetName" },
            { title: "Project ID", accessorKey: "ProjectId" },
            { title: "Zone", accessorKey: "ZoneName" },
            { title: "Region", accessorKey: "RegionsName" },
            { title: "Location", accessorKey: "LocationName" },
            { title: "Lead RM", accessorKey: "LeadRM" },
            { title: "RM 2", accessorKey: "RM2" },
            { title: "RM 3", accessorKey: "RM3" },
            { title: "Unit Details", accessorKey: "UnitDetail" },
            { title: "Initiated By", accessorKey: "InitiatedBy" },
            { title: "Initiated On", accessorKey: "InitiatedOn", transform: (value: string) => <Text title={getPresentableValue(value, true, false, true) as string}>{getPresentableValue(value, true, false, true)}</Text> },
            { title: "Action By", accessorKey: "LastActionBy" },
            { title: "Action On", accessorKey: "LastActionOn", transform: (value: string) => <Text title={getPresentableValue(value, true, false, true) as string}>{getPresentableValue(value, true, false, true)}</Text> },
            // { title: "Send Back By", accessorKey: "SentBackBy" },
            // { title: "Send Back On", accessorKey: "SentBackOn", transform: (value: string) => <Text>{getPresentableValue(value, true, false, true)}</Text> },
            { title: "Sent Back Count", accessorKey: "SentBackCount" },
            // { title: "Sent Back Reason", accessorKey: "SentBackReason" },
            { title: "Current Status", accessorKey: "CurrentStatus" },
            { title: "Overall TAT", accessorKey: "OverallTat" },
          ]}
          data={finalData}
        />
      </Card>
    </>
  );
}

export default AllNOCReport;
