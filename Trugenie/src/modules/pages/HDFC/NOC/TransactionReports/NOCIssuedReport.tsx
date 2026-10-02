import { Button, Card, Flex, Text } from "@mantine/core";
import { DateInput, DatesProvider } from "@mantine/dates";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import calanderIcon from "../../../../../assets/logos/SVG/calendar.svg";
import shareIcon from "../../../../../assets/logos/SVG/export.svg";
import useSearchAndPagination from "../../../../../hooks/useSearchAndPagination";
import { selectSetProject } from "../../../../../lib/services/HDFC/Project/selectors";
import { exportIssuedNOCReportRequest, getIssuedNOCReportRequest } from "../../../../../lib/services/reports/actions";
import { selectIssuedNOCReportState, selectReportLoaders } from "../../../../../lib/services/reports/selectors";
import NewTableWithActions, { TableHeader } from "../../../../../widgets/tables/MantineTable/NewTableWithActions";
import { DEFAULT_DATE_FORMAT, errorNotification, getPresentableValue } from "../../../../Components/UtilityFunctions";
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

function NOCIssuedReport() {
  const dispatch = useDispatch();

  // Fetching data from Redux store state
  const selectedProject = useSelector(selectSetProject);
  const issuedNOCReportData = useSelector(selectIssuedNOCReportState);
  const loader = useSelector(selectReportLoaders);

  const { finalData, SearchComponent, PaginationComponent } = useSearchAndPagination({
    data: issuedNOCReportData ?? [],
    columnsToSearch: [
      { accessorKey: "UnitNo", type: "text" },
      { accessorKey: "InitiatedBy", type: "text" },
      { accessorKey: "InitiatedOn", type: "text" },
      { accessorKey: "ApprovedBy", type: "text" },
      { accessorKey: "ApprovedOn", type: "text" },
      { accessorKey: "CurrentStatus", type: "text" },
      { accessorKey: "OverAllTat", type: "text" },
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
    if (selectedProject?.REAssetId) {
      if (dayjs(fromDate) > dayjs(toDate)) {
        errorNotification("To date cannot be less than the From date.");
        setFromDate(defaultFromDate);
        setToDate(defaultToDate);
        return;
      } else if (fromDate && toDate && dayjs(fromDate) <= dayjs(toDate)) {
        dispatch(getIssuedNOCReportRequest(selectedProject?.REAssetId, dayjs(fromDate)?.format("YYYY-MM-DD"), dayjs(toDate)?.format("YYYY-MM-DD")));
      }
    }
  }, [dispatch, fromDate, toDate]);

  const handleDownload = () => {
    if (selectedProject?.REAssetId && fromDate && toDate && dayjs(fromDate) <= dayjs(toDate)) {
      dispatch(exportIssuedNOCReportRequest(selectedProject?.REAssetId, dayjs(fromDate)?.format("YYYY-MM-DD"), dayjs(toDate)?.format("YYYY-MM-DD")));
    }
  };

  const handleFromDateChange = (date: Date) => setFromDate(date);
  const handleToDateChange = (date: Date) => setToDate(date);

  // const dateFiltered = finalData.filter(item => dayjs(item.InitiatedOn).isAfter(dayjs(fromDate)) && dayjs(item.ApprovedOn).isBefore(dayjs(toDate)) )

  return (
    <>
      <Card style={{ overflow: "visible" }}>
        <NewTableWithActions
          noMargin
          loader={loader?.issuedNOCReport}
          cardHeader={
            <TableHeader
              title='Issued NOC Report'
              SearchComponent={
                <>
                  <Button onClick={handleDownload} variant='default' loading={loader?.nocIssueExport}>
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
                        valueFormat={DEFAULT_DATE_FORMAT}
                        placeholder='From Date'
                        icon={<img src={calanderIcon} style={{ width: "1rem", height: "1rem", color: "#001d56" }} />}
                        value={fromDate}
                        maxDate={toDate}
                        onChange={handleFromDateChange}
                        w='130px'
                      />
                    </Flex>
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
            { title: "Unit No.", accessorKey: "UnitNo" },
            { title: "Initiated By", accessorKey: "InitiatedBy" },
            {
              title: "Initiated On",
              accessorKey: "InitiatedOn",
              transform: (value: string) => (
                <Text title={getPresentableValue(value, true, false, false) as any}>{getPresentableValue(value, true, false, false)}</Text>
              ),
            },
            { title: "Approved By", accessorKey: "ApprovedBy" },
            {
              title: "Approved On",
              accessorKey: "ApprovedOn",
              transform: (value: string) => (
                <Text title={getPresentableValue(value, true, false, false) as any}>{getPresentableValue(value, true, false, false)}</Text>
              ),
            },
            { title: "Current Status", accessorKey: "CurrentStatus" },
            { title: "Overall TAT", accessorKey: "OverAllTat" },
          ]}
          data={finalData}
        />
      </Card>
    </>
  );
}

export default NOCIssuedReport;
