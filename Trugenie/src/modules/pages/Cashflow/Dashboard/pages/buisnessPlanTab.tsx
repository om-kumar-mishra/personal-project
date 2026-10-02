/* eslint-disable react/prop-types */
import { useMemo } from "react";
import { useSelector } from "react-redux";
import "../table.css";
import { getBuisnessPlanList } from "../../../../../lib/services/cashflowDashboard/selectors";
import { getNumberSystem } from "../../../../../lib/services/common/selector";
import { numberWithCommasAndFraction } from "../../../../../widgets/charts/Recharts/utils";
import { isMonthKey } from "../../../../../utils/commonFunctions";
import { CashflowChildComponentPropsTypes } from "..";
import CashflowTable from "../CashflowTable";
import { DashboardRemarkInput } from "../../../../../layout/dashboardRemarks/RemarksReportDashboard";
import { cashflowChartNames } from "../../../../../lib/services/dashboardRemarks/constants";

const BuisnessPlan: React.FC<CashflowChildComponentPropsTypes> = ({ addRemark, remarks, setRemarks, saveRequest }) => {
  const data = useSelector(getBuisnessPlanList);
  const numberSystem = useSelector(getNumberSystem);
  // data handeling
  const dataTotal: any = [];
  if (data?.BusinessPlan?.Inflows) {
    dataTotal.push({ Particulars: "Inflows", isHeading: true });
    if (Array.isArray(data.BusinessPlan.Inflows)) {
      dataTotal.push(...data.BusinessPlan.Inflows);
    }
    if (Array.isArray(data.BusinessPlan["Total Inflows"]) && data.BusinessPlan["Total Inflows"].length > 0) {
      dataTotal.push({ ...data.BusinessPlan["Total Inflows"][0], isTotal: true });
    }
  }
  if (data?.BusinessPlan?.Outflows) {
    dataTotal.push({ Particulars: "Outflows", isHeading: true });
    if (Array.isArray(data.BusinessPlan.Outflows)) {
      dataTotal.push(...data.BusinessPlan.Outflows);
    }
    if (Array.isArray(data.BusinessPlan["Total Outflows"]) && data.BusinessPlan["Total Outflows"].length > 0) {
      dataTotal.push({ ...data.BusinessPlan["Total Outflows"][0], isTotal: true });
    }
  }
  if (data?.BusinessPlan?.["Net-Operating Cash Flow"]) {
    dataTotal.push({
      ...data.BusinessPlan?.["Net-Operating Cash Flow"]?.[0],
      isTotal: true,
    });
  }
  if (data?.BusinessPlan?.["Other Adjustments"] && Array.isArray(data.BusinessPlan["Other Adjustments"])) {
    dataTotal.push(...data.BusinessPlan["Other Adjustments"]);
  }
  if (data?.BusinessPlan?.["Total Adjustments"]) {
    dataTotal.push({
      ...data.BusinessPlan?.["Total Adjustments"]?.[0],
      isTotal: true,
    });
  }
  if (data?.BusinessPlan?.["Adjusted Net Operating Cashflows"]) {
    dataTotal.push({
      ...data.BusinessPlan?.["Adjusted Net Operating Cashflows"]?.[0],
      isTotal: true,
    });
  }
  if (data?.BusinessPlan?.Financing) {
    dataTotal.push({ Particulars: "Financing", isHeading: true });
    if (Array.isArray(data.BusinessPlan.Financing)) {
      dataTotal.push(...data.BusinessPlan.Financing);
    }
  }
  if (data?.BusinessPlan?.["Closing Cash Balance"]) {
    dataTotal.push({
      ...data.BusinessPlan?.["Closing Cash Balance"]?.[0],
      isTotal: true,
    });
  }

  const headersList = useMemo(() => {
    return data?.BusinessPlan?.headers ? data?.BusinessPlan?.headers.filter(key => isMonthKey(key)) : [];
  }, [data?.BusinessPlan?.headers]);

  const headers = useMemo(() => {
    return headersList.map(v => ({
      title: v,
      accessorKey: v,
      formatValue: (value: number) => numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_INR_DECIMALS),
    }));
  }, [headersList]);

  return (
    <>
      <div className='sales-graph-heading'>Business Plan</div>
      <div className='table-Cashflow-col-scroll table-border'>
        <div className='p-3 gap'>
          <div className='table-scrollbar'>
            <CashflowTable
              columns={[
                {
                  title: `Particulars`,
                  accessorKey: "Particulars",
                },
                {
                  title: `Total (${numberSystem})`,
                  accessorKey: "Total",
                  formatValue: (value: number) => numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_INR_DECIMALS),
                },
                {
                  title: `Till Business Plan Date (${numberSystem})`,
                  accessorKey: "ActualTillDate",
                  formatValue: (value: number) => numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_INR_DECIMALS),
                },
                {
                  title: `Future Total (${numberSystem})`,
                  accessorKey: "ProjectedTotal",
                  formatValue: (value: number) => numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_INR_DECIMALS),
                },
                ...headers,
              ]}
              data={dataTotal}
              emptyIndicator=''
            />
          </div>
        </div>
      </div>
      <div className='mt-4 mb-4'>
        <DashboardRemarkInput
          addRemark={addRemark}
          remarkKey={cashflowChartNames.Business_Plan}
          remarks={remarks}
          setRemarks={setRemarks}
          saveRequest={saveRequest}
        />
      </div>
    </>
  );
};

export default BuisnessPlan;
