import { Button, Card, Flex, Text } from "@mantine/core";
import { DateInput, DatesProvider } from "@mantine/dates";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import calanderIcon from "../../../../assets/logos/SVG/calendar.svg";
import shareIcon from "../../../../assets/logos/SVG/export.svg";
import useSearchAndPagination from "../../../../hooks/useSearchAndPagination";
import { getExportLoginReportRequest, getLoginReportRequest } from "../../../../lib/services/reports/actions";
import { selectLoginReportData, selectLoginReportError, selectLoginReportLoading, selectReportLoaders } from "../../../../lib/services/reports/selectors";
import NewTableWithActions, { TableHeader } from "../../../../widgets/tables/MantineTable/NewTableWithActions";
import { errorNotification, getPresentableValue } from "../../../Components/UtilityFunctions";

export type TableRowDataType = {
  HdfcUserId: string;
  EmpCode: string;
  EmpName: string;
  LoginDate: string;
  LoginTime: string;
  LogoutTime: string;
  ApplicationName: string;
  IPAddress: string;
  HostDetails: string;
};

function LoginLogoutReport() {
  const dispatch = useDispatch();

  // Fetching data from Redux store state
  const loginReportData = useSelector(selectLoginReportData);
  const isLoading = useSelector(selectLoginReportLoading);
  const error = useSelector(selectLoginReportError);
  const exportLoader = useSelector(selectReportLoaders);

  const { finalData, SearchComponent, PaginationComponent } = useSearchAndPagination({
    data: loginReportData?.data,
    columnsToSearch: [
      { accessorKey: "HdfcUserId", type: "text" },
      { accessorKey: "EmpCode", type: "text" },
      { accessorKey: "EmpName", type: "text" },
      { accessorKey: "LoginDate", type: "text" },
      { accessorKey: "LoginTime", type: "text" },
      { accessorKey: "LogoutTime", type: "text" },
      { accessorKey: "ApplicationName", type: "text" },
      { accessorKey: "IPAddress", type: "text" },
      { accessorKey: "HostDetails", type: "text" },
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
      dispatch(getLoginReportRequest(dayjs(fromDate)?.format("YYYY-MM-DD"), dayjs(toDate)?.format("YYYY-MM-DD")));
    }
  }, [dispatch, fromDate, toDate]);

  // handle-download
  const handleDownload = () => {
    dispatch(getExportLoginReportRequest(dayjs(fromDate)?.format("YYYY-MM-DD"), dayjs(toDate)?.format("YYYY-MM-DD")));
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
              title='Login Logout Report'
              SearchComponent={
                <>
                  <Button onClick={handleDownload} variant='default' loading={exportLoader?.loginLogoutExport}>
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
                      valueFormat='YYYY-MM-DD'
                      placeholder='From Date'
                      icon={<img src={calanderIcon} style={{ width: "1rem", height: "1rem", color: "#001d56" }} />}
                      value={fromDate}
                      maxDate={toDate}
                      onChange={handleFromDateChange}
                      w='125px'
                    />
                  </Flex>
                  <DatesProvider settings={{ firstDayOfWeek: 0, weekendDays: [0] }}>
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
            {
              title: "User ID",
              accessorKey: "HdfcUserId",
            },
            { title: "Employee Code", accessorKey: "EmpCode" },
            { title: "Employee Name", accessorKey: "EmpName" },
            {
              title: "Login Date",
              accessorKey: "LoginDate",
              transform: value => (
                <Text title={getPresentableValue(value, true, false, false) as string}>{getPresentableValue(value, true, false, false) as string}</Text>
              ),
            },
            { title: "Login Time", accessorKey: "LoginTime" },
            { title: "Logout Time", accessorKey: "LogoutTime" },
            { title: "Application Name", accessorKey: "ApplicationName" },
            { title: "IP Address", accessorKey: "IPAddress" },
            { title: "Asset/Host Details", accessorKey: "HostDetails" },
            // {
            //   title: "Actions",
            //   accessorKey: "actions",
            //   actionTypes: [
            //     {
            //       type: "view",
            //       onClick: rowData => {
            //         setData(rowData);
            //         setIsEdit(false);
            //         openModal();
            //       },
            //     },
            //     {
            //       type: "edit",
            //       onClick: rowData => {
            //         setData(rowData);
            //         setIsEdit(true);
            //         openModal();
            //       },
            //     },
            //   ],
            // },
          ]}
          data={finalData}
        />
      </Card>
    </>
  );
}

export default LoginLogoutReport;
