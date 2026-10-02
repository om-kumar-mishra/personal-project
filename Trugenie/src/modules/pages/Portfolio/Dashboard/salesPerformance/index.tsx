import React, { useEffect, useMemo, useState } from "react";
import SalesPerformanceSelectBox from "./selectBox";
import { useDispatch, useSelector } from "react-redux";
import { faFloppyDisk, faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { Option } from "react-multi-select-component";
import { selectSalesPerformanceList, selectSalesfilterValues } from "../../../../../lib/services/portfolioView/selectors";
import { AppState } from "../../../../../lib/common/appState";
import { getNumberSystem, getUnitNumberSystem } from "../../../../../lib/services/common/selector";
import { ResidentialSalesPerformance } from "../../../../../lib/services/portfolioView/dataTypes";
import { IconListType, RemarksObjType } from "../../../../../layout/dashboardRemarks/Datatypes";
import { modules, portfolioChartNames, portfolioDashboardName } from "../../../../../lib/services/dashboardRemarks/constants";
import { DEFAULT_ALL } from "../../../../../utils/constants";
import { fetchSalesPerformanceFiltersRequested, fetchSalesPerformanceListRequested } from "../../../../../lib/services/portfolioView/action";
import { convertDateFormatYY, openInNewTab } from "../../../../../utils/commonFunctions";
import SpinnerComponent from "../../../../Components/SpinnerComponent";
import InvestmentTable from "../../../InvestmentsDashboard/InvestmentTable";
import { DashboardIcons, DashboardRemarkInput } from "../../../../../layout/dashboardRemarks/RemarksReportDashboard";
import { numberWithCommasAndFraction } from "../../../../../widgets/charts/Recharts/utils";
import { selectUserDetails } from "../../../../../lib/services/hdfc_login/selectors";
import { UserDetails } from "../../../../../lib/services/hdfc_login/dataTypes";
import { selectSwitchClient } from "../../../../../lib/services/HDFC/Commons/selectors";
import { GetClientData } from "../../../../../lib/services/HDFC/Commons/dataTypes";

export const salesDropdowns = {
  startDate: null,
  endDate: null,
  developer: null,
  fund: null,
  region: null,
  location: null,
};
export type dropdownsSales = {
  startDate: Date | null;
  endDate: Date | null;
  developer: Option[] | null;
  fund: Option[] | null;
  region: Option[] | null;
  location: Option[] | null;
};
type ArrayItem = Record<string, any>;
const SalesPerformance = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector(selectUserDetails) as UserDetails;
  const activeClient = useSelector(selectSwitchClient) as GetClientData;
  const clientId = String(activeClient.ClientId);
  // useselectors
  const selectSalesFilterValue = useSelector(selectSalesfilterValues);
  const { dashboardRemark } = useSelector((state: AppState) => state);
  const salesPerformanceList = useSelector(selectSalesPerformanceList);
  const numberSystem = useSelector(getNumberSystem);
  const unitNumberSystem = useSelector(getUnitNumberSystem);
  //usestate
  const [residentialTableList, setResidencialTableList] = useState<ResidentialSalesPerformance[]>([]);
  const [addRemark, setAddRemark] = useState<boolean>(false);
  const [remarks, setRemarks] = useState<RemarksObjType>({});

  const iconsList: IconListType[] = useMemo(() => {
    return [
      {
        title: addRemark ? "Save Remark" : "Add Remark",
        icon: addRemark ? faFloppyDisk : faFolderPlus,
        onClick: () => setAddRemark(!addRemark),
        remark: true,
      },
    ];
  }, [addRemark, setAddRemark]);

  const saveRemarkRequest = useMemo(() => {
    return {
      moduleId: Number(clientId) ?? "",
      module: modules.Portfolio,
      misDate: "",
      dashboardName: portfolioDashboardName.Sales_Performance,
      chartName: "",
      remark: "",
      addedBy: "",
      createdBy: userDetails.EmailId,
      filters: [
        {
          filterName: "fund",
          filterValue: selectSalesFilterValue?.fund ? selectSalesFilterValue.fund.map(v => v.value).join(",") : DEFAULT_ALL,
        },
        {
          filterName: "developers",
          filterValue: selectSalesFilterValue?.developer ? selectSalesFilterValue.developer.map(v => v.value).join(",") : DEFAULT_ALL,
        },

        {
          filterName: "region",
          filterValue: selectSalesFilterValue?.region ? selectSalesFilterValue.region.map(v => v.value).join(",") : DEFAULT_ALL,
        },
        {
          filterName: "location",
          filterValue: selectSalesFilterValue?.location ? selectSalesFilterValue.location.map(v => v.value).join(",") : DEFAULT_ALL,
        },
        {
          filterName: "startDate",
          filterValue: selectSalesFilterValue.startDate?.toISOString() ?? "",
        },
        {
          filterName: "endDate",
          filterValue: selectSalesFilterValue.endDate?.toISOString() ?? "",
        },
      ],
    };
  }, [clientId, selectSalesFilterValue]);

  useEffect(() => {
    if (salesPerformanceList?.remarks) setRemarks(salesPerformanceList.remarks);
    else setRemarks({});
  }, [salesPerformanceList?.remarks]);

  useEffect(() => {
    if (clientId) {
      dispatch(fetchSalesPerformanceFiltersRequested(Number(clientId)));
    }
  }, [clientId]);

  useEffect(() => {
    if (selectSalesFilterValue && clientId && selectSalesFilterValue?.startDate && selectSalesFilterValue?.endDate)
      dispatch(
        fetchSalesPerformanceListRequested(
          clientId,
          DEFAULT_ALL,
          selectSalesFilterValue?.fund ? selectSalesFilterValue.fund.map(v => v.value).join(",") : DEFAULT_ALL,
          selectSalesFilterValue?.developer ? selectSalesFilterValue.developer.map(v => v.value).join(",") : DEFAULT_ALL,
          selectSalesFilterValue?.region ? selectSalesFilterValue.region.map(v => v.value).join(",") : DEFAULT_ALL,
          selectSalesFilterValue?.location ? selectSalesFilterValue.location.map(v => v.value).join(",") : DEFAULT_ALL,
          selectSalesFilterValue.startDate?.toISOString() ?? "",
          selectSalesFilterValue.endDate?.toISOString() ?? "",
        ),
      );
    setResidencialTableList([]);
  }, [selectSalesFilterValue]);

  const handelOnclick = (row: ResidentialSalesPerformance) => {
    if (salesPerformanceList?.residentialSales && salesPerformanceList.residentialSales.length > 0) {
      const filterList = salesPerformanceList.residentialSales.filter(v => v.type === row.type);
      setResidencialTableList(filterList);
    } else {
      setResidencialTableList([]);
    }
  };

  const calculateTotalForAKey = (array: Array<ArrayItem>, key: keyof ArrayItem): number => {
    return array.reduce((acc, item) => {
      return acc + Number(item[key]) || acc;
    }, 0);
  };

  const handelView = (row: ResidentialSalesPerformance) => {
    localStorage.setItem("reassetid", row.reassetId);
    const url = `${salesPerformanceList?.url}/#/ReSummaryDashboard`;
    openInNewTab(url);
  };

  return (
    <>
      {(dashboardRemark.loading.getDashboardRemark || dashboardRemark.loading.insertDashboardRemark) && <SpinnerComponent />}
      <div className='padding-none'>
        <div className='main-color p-2 d-flex justify-content-between dashboard-heading heading-bg-color'>
          <span className='dashboard-heading-text'>SALES PERFORMANCE - PORTFOLIO VIEW</span>
          <DashboardIcons iconsList={iconsList} />
        </div>
      </div>
      <br></br>

      <SalesPerformanceSelectBox />

      <br></br>

      <div className='sales-graph-heading'>Sales Performance</div>
      <div className='col-md-12 col-sm-12'>
        <div className='table-border'>
          <div className='p-3'>
            <InvestmentTable
              columns={[
                {
                  title: "Development Type",
                  accessorKey: "type",
                  onClick: handelOnclick,
                },
                {
                  title: "Unit Launched (Nos.)",
                  accessorKey: "unitLaunched",
                  // type: "round",
                  formatValue: (value: number) => `${numberWithCommasAndFraction(value, 0)}`,
                },
                {
                  title: "Net Unit Sold (Nos.) ",
                  accessorKey: "netUnitSold",
                  // type: "round",
                  formatValue: (value: number) => `${numberWithCommasAndFraction(value, 0)}`,
                },
                {
                  title: `Area Launched (${import.meta.env.VITE_REACT_APP_AREA_UNIT})`,
                  accessorKey: "areaLaunched",
                  // type: "round",
                  formatValue: (value: number) => `${numberWithCommasAndFraction(value, 0)}`,
                },
                {
                  title: `Area Sold (${import.meta.env.VITE_REACT_APP_AREA_UNIT})`,
                  accessorKey: "areaSold",
                  // type: "round",
                  formatValue: (value: number) => `${numberWithCommasAndFraction(value, 0)}`,
                },
                {
                  title: `Net Sale Value (${numberSystem})`,
                  accessorKey: "netSaleValue",
                  // type: "float",
                  formatValue: (value: number) => `${numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_INR_DECIMALS)}`,
                },
                {
                  title: `Collections (${numberSystem})`,
                  accessorKey: "collections",
                  // type: "float",
                  formatValue: (value: number) => `${numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_INR_DECIMALS)}`,
                },
                {
                  title: "Avg Rate (psf)",
                  accessorKey: "averageRate",
                  // type: "round",
                  formatValue: (value: number) => `${numberWithCommasAndFraction(value, 0)}`,
                },
                {
                  title: `Avg Sale Value per unit (${unitNumberSystem})`,
                  accessorKey: "averageSaleValue",
                  // type: "float",
                  formatValue: (value: number) => `${numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_INR_DECIMALS)}`,
                },
              ]}
              // sales performance data
              data={(salesPerformanceList?.saleperformance as any) || []}
              finalRow={[
                {
                  type: "Total",
                  unitLaunched: `${
                    numberWithCommasAndFraction(
                      calculateTotalForAKey(salesPerformanceList?.saleperformance ?? [], "unitLaunched"),
                      import.meta.env.VITE_REACT_APP_UNIT_DECIMAL,
                    ) ?? 0
                  }`,

                  netUnitSold: `${numberWithCommasAndFraction(
                    calculateTotalForAKey(salesPerformanceList?.saleperformance ?? [], "netUnitSold"),
                    import.meta.env.VITE_REACT_APP_UNIT_DECIMAL,
                  )}`,
                  areaLaunched: `${numberWithCommasAndFraction(
                    calculateTotalForAKey(salesPerformanceList?.saleperformance ?? [], "areaLaunched"),
                    import.meta.env.VITE_REACT_APP_AREA_DECIMAL,
                  )}`,
                  areaSold: `${numberWithCommasAndFraction(
                    calculateTotalForAKey(salesPerformanceList?.saleperformance ?? [], "areaSold"),
                    import.meta.env.VITE_REACT_APP_AREA_DECIMAL,
                  )}`,
                  netSaleValue: `${numberWithCommasAndFraction(
                    calculateTotalForAKey(salesPerformanceList?.saleperformance ?? [], "netSaleValue"),
                    import.meta.env.VITE_REACT_APP_INR_DECIMALS,
                  )}`,
                  collections: `${numberWithCommasAndFraction(
                    calculateTotalForAKey(salesPerformanceList?.saleperformance ?? [], "collections"),
                    import.meta.env.VITE_REACT_APP_INR_DECIMALS,
                  )}`,
                  averageRate: "",
                  // `${
                  //   calculateTotalForAKey(
                  //     salesPerformanceList?.saleperformance ?? [],
                  //     "netSaleValue"
                  //   ) /
                  //   calculateTotalForAKey(
                  //     salesPerformanceList?.saleperformance ?? [],
                  //     "areaSold"
                  //   )
                  // }`,
                  averageSaleValue: "",
                  // `${
                  //   calculateTotalForAKey(
                  //     salesPerformanceList?.saleperformance ?? [],
                  //     "netSaleValue"
                  //   ) /
                  //   calculateTotalForAKey(
                  //     salesPerformanceList?.saleperformance ?? [],
                  //     "netUnitSold"
                  //   )
                  // }`,
                  // id: 100,
                },
              ]}
            />
          </div>
        </div>
      </div>
      <br></br>
      {/* residential sales table */}
      {residentialTableList.length > 0 ? (
        <>
          <div className='sales-graph-heading'>{`${residentialTableList[0].type} Sales`}</div>
          <div className='col-md-12 col-sm-12'>
            <div className='table-border table-sales-performace'>
              <div className='p-3'>
                <InvestmentTable
                  columns={[
                    {
                      title: "Action",
                      accessorKey: "actions",
                    },
                    { title: "Developer", accessorKey: "developer" },
                    { title: "Project", accessorKey: "project" },
                    { title: "Region", accessorKey: "region" },
                    {
                      title: "Date as of",
                      accessorKey: "dataAsOf",
                      // dateFormat: true,
                      formatValue: (value: string) => `${convertDateFormatYY(value)}`,
                    },
                    {
                      title: "Launch Date",
                      accessorKey: "launchDate",
                      // dateFormat: true,
                      formatValue: (value: string) => `${convertDateFormatYY(value)}`,
                    },
                    {
                      title: "Units Launched (Nos.)",
                      accessorKey: "unitsLaunched",
                      // type: "round",
                      formatValue: (value: number) => `${numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_UNIT_DECIMAL)}`,
                    },
                    {
                      title: "Net Units Sold (Nos.)",
                      accessorKey: "netSoldUnits",
                      // type: "round",
                      formatValue: (value: number) => `${numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_UNIT_DECIMAL)}`,
                    },
                    {
                      title: `Area Launched (${import.meta.env.VITE_REACT_APP_AREA_UNIT})`,
                      accessorKey: "areaLaunched",
                      // type: "round",
                      formatValue: (value: number) => `${numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_AREA_DECIMAL)}`,
                    },
                    {
                      title: `Area Sold (${import.meta.env.VITE_REACT_APP_AREA_UNIT})`,
                      accessorKey: "areaSold",
                      // type: "round",
                      formatValue: (value: number) => `${numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_AREA_DECIMAL)}`,
                    },
                    {
                      title: `Net Sale Value (${numberSystem})`,
                      accessorKey: "netSaleValue",
                      // type: "float",
                      formatValue: (value: number) => `${numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_INR_DECIMALS)}`,
                    },
                    {
                      title: `Collections (${numberSystem})`,
                      accessorKey: "collections",
                      // type: "float",
                      formatValue: (value: number) => `${numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_INR_DECIMALS)}`,
                    },
                    {
                      title: "Avg Rate psf",
                      accessorKey: "averageRatePSF",
                      // type: "round",
                      formatValue: (value: number) => `${numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_RATE_DECIMAL)}`,
                    },
                    {
                      title: `Avg Sale Value per unit (${unitNumberSystem})`,
                      accessorKey: "averageSaleValuePerUnit",
                      // type: "float",
                      formatValue: (value: number) => `${numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_INR_DECIMALS)}`,
                    },
                  ]}
                  // sales performance data
                  data={residentialTableList}
                  finalRow={[
                    {
                      type: "Total",
                      developer: "",
                      project: "",
                      region: "",
                      dataAsOf: "",
                      launchDate: "",
                      unitsLaunched: `${numberWithCommasAndFraction(
                        calculateTotalForAKey(residentialTableList, "unitsLaunched"),
                        import.meta.env.VITE_REACT_APP_UNIT_DECIMAL,
                      )}`,
                      netSoldUnits: `${numberWithCommasAndFraction(
                        calculateTotalForAKey(residentialTableList, "netSoldUnits"),
                        import.meta.env.VITE_REACT_APP_UNIT_DECIMAL,
                      )}`,
                      areaLaunched: `${numberWithCommasAndFraction(
                        calculateTotalForAKey(residentialTableList, "areaLaunched"),
                        import.meta.env.VITE_REACT_APP_AREA_DECIMAL,
                      )}`,
                      areaSold: `${numberWithCommasAndFraction(
                        calculateTotalForAKey(residentialTableList, "areaSold"),
                        import.meta.env.VITE_REACT_APP_AREA_DECIMAL,
                      )}`,
                      netSaleValue: `${numberWithCommasAndFraction(
                        calculateTotalForAKey(residentialTableList, "netSaleValue"),
                        import.meta.env.VITE_REACT_APP_INR_DECIMALS,
                      )}`,
                      collections: `${numberWithCommasAndFraction(
                        calculateTotalForAKey(residentialTableList, "collections"),
                        import.meta.env.VITE_REACT_APP_INR_DECIMALS,
                      )}`,
                      averageRatePSF: "",
                      // `${
                      //   calculateTotalForAKey(
                      //     residentialTableList,
                      //     "netSaleValue"
                      //   ) /
                      //   calculateTotalForAKey(residentialTableList, "areaSold")
                      // }`,
                      averageSaleValuePerUnit: "",
                      // `${
                      //   calculateTotalForAKey(
                      //     residentialTableList,
                      //     "netSaleValue"
                      //   ) /
                      //   calculateTotalForAKey(
                      //     residentialTableList,
                      //     "netSoldUnits"
                      //   )
                      // }`,
                    },
                  ]}
                  isRowViewEnabled={true}
                  handleView={handelView}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
      <div className='mt-4 mb-4'>
        <DashboardRemarkInput
          addRemark={addRemark}
          remarkKey={portfolioChartNames.Sales_Performance}
          remarks={remarks}
          setRemarks={setRemarks}
          saveRequest={saveRemarkRequest}
        />
      </div>
    </>
  );
};

export default SalesPerformance;
