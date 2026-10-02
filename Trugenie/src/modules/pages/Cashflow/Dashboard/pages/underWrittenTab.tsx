/* eslint-disable react/prop-types */
import { useMemo } from "react";
import { useSelector } from "react-redux";
import "../table.css";
import CashflowTable from "../CashflowTable";
import { CashflowChildComponentPropsTypes } from "..";
import { getBuisnessPlanList } from "../../../../../lib/services/cashflowDashboard/selectors";
import { getNumberSystem } from "../../../../../lib/services/common/selector";
import { numberWithCommasAndFraction } from "../../../../../widgets/charts/Recharts/utils";
import { isMonthKey } from "../../../../../utils/commonFunctions";
import { DashboardRemarkInput } from "../../../../../layout/dashboardRemarks/RemarksReportDashboard";
import { cashflowChartNames } from "../../../../../lib/services/dashboardRemarks/constants";

const SubUnderWrittenTab: React.FC<CashflowChildComponentPropsTypes> = ({ addRemark, remarks, setRemarks, saveRequest }) => {
  // use selector
  const data = useSelector(getBuisnessPlanList);
  const numberSystem = useSelector(getNumberSystem);

  //data handeling
  const dataTotal: any = [];
  if (data?.Underwritten?.Inflows) {
    dataTotal.push({ Particulars: "Inflows", isHeading: true });
    if (Array.isArray(data.Underwritten.Inflows)) {
      dataTotal.push(...data.Underwritten.Inflows);
    }
    if (Array.isArray(data.Underwritten["Total Inflows"]) && data.Underwritten["Total Inflows"].length > 0) {
      dataTotal.push({ ...data.Underwritten["Total Inflows"][0], isTotal: true });
    }
  }
  if (data?.Underwritten?.Outflows) {
    dataTotal.push({ Particulars: "Outflows", isHeading: true });
    if (Array.isArray(data.Underwritten.Outflows)) {
      dataTotal.push(...data.Underwritten.Outflows);
    }
    if (Array.isArray(data.Underwritten["Total Outflows"]) && data.Underwritten["Total Outflows"].length > 0) {
      dataTotal.push({ ...data.Underwritten["Total Outflows"][0], isTotal: true });
    }
  }
  if (data?.Underwritten?.["Net Operating Cashflows"]) {
    dataTotal.push({
      ...data.Underwritten?.["Net Operating Cashflows"]?.[0],
      isTotal: true,
    });
  }
  if (data?.Underwritten?.["Other Adjustments"] && Array.isArray(data.Underwritten["Other Adjustments"])) {
    dataTotal.push(...data.Underwritten["Other Adjustments"]);
  }
  if (data?.Underwritten?.["Total Adjustments"]) {
    dataTotal.push({
      ...data.Underwritten?.["Total Adjustments"]?.[0],
      isTotal: true,
    });
  }
  if (data?.Underwritten?.["Adjusted Net Operating Cashflows"]) {
    dataTotal.push({
      ...data.Underwritten?.["Adjusted Net Operating Cashflows"]?.[0],
      isTotal: true,
    });
  }
  if (data?.Underwritten?.Financing) {
    dataTotal.push({ Particulars: "Financing", isHeading: true });
    if (data?.Underwritten?.Financing && Array.isArray(data.Underwritten.Financing)) dataTotal.push(...data.Underwritten.Financing);
  }
  if (data?.Underwritten?.["Closing Cash Balance"]) {
    dataTotal.push({
      ...data.Underwritten?.["Closing Cash Balance"]?.[0],
      isTotal: true,
    });
  }

  const headersList = useMemo(() => {
    return data?.Underwritten?.headers ? data?.Underwritten?.headers.filter(key => isMonthKey(key)) : [];
  }, [data?.Underwritten?.headers]);

  const headers = useMemo(() => {
    return headersList.map(v => ({
      title: v,
      accessorKey: v,
      formatValue: (value: number) => numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_INR_DECIMALS),
    }));
  }, [headersList]);

  return (
    <>
      <div className='sales-graph-heading'>Underwritten</div>
      <div className='table-Cashflow-col-scroll table-border'>
        <div className='p-3 gap'>
          <div className='table-scrollbar'>
            <CashflowTable
              containerStyles={{
                minHeight: "250px",
              }}
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
                  title: `Till Underwritten Date (${numberSystem})`,
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
          remarkKey={cashflowChartNames.Underwritten}
          remarks={remarks}
          setRemarks={setRemarks}
          saveRequest={saveRequest}
        />
      </div>
    </>
  );
};

export default SubUnderWrittenTab;
