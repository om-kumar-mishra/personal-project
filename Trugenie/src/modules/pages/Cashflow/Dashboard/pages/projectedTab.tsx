/* eslint-disable react/prop-types */
import { useMemo } from "react";
import { useSelector } from "react-redux";
import "../table.css";
import CashflowTable from "../CashflowTable";
import { CashflowChildComponentPropsTypes } from "..";
import { getBuisnessPlanList } from "../../../../../lib/services/cashflowDashboard/selectors";
import { getNumberSystem } from "../../../../../lib/services/common/selector";
import { isMonthKey } from "../../../../../utils/commonFunctions";
import { numberWithCommasAndFraction } from "../../../../../widgets/charts/Recharts/utils";
import { DashboardRemarkInput } from "../../../../../layout/dashboardRemarks/RemarksReportDashboard";
import { cashflowChartNames } from "../../../../../lib/services/dashboardRemarks/constants";

const ProjectedCashFlow: React.FC<CashflowChildComponentPropsTypes> = ({
  addRemark,
  remarks,
  setRemarks,
  saveRequest,
}) => {
  // selectors
  const data = useSelector(getBuisnessPlanList);
  const numberSystem = useSelector(getNumberSystem);
  //data handeling
  const dataTotal: any = [];
  if (data?.ProjectedPlan?.Inflows) {
    dataTotal.push({ Particulars: "Inflows", isHeading: true });
    if (Array.isArray(data.ProjectedPlan.Inflows)) {
      dataTotal.push(...data.ProjectedPlan.Inflows);
    }
    if (Array.isArray(data.ProjectedPlan["Total Inflows"]) && data.ProjectedPlan["Total Inflows"].length > 0) {
      dataTotal.push({ ...data.ProjectedPlan["Total Inflows"][0], isTotal: true });
    }
  }
  if (data?.ProjectedPlan?.Outflows) {
    dataTotal.push({ Particulars: "Outflows", isHeading: true });
    if (Array.isArray(data.ProjectedPlan.Outflows)) {
      dataTotal.push(...data.ProjectedPlan.Outflows);
    }
    if (Array.isArray(data.ProjectedPlan["Total Outflows"]) && data.ProjectedPlan["Total Outflows"].length > 0) {
      dataTotal.push({ ...data.ProjectedPlan["Total Outflows"][0], isTotal: true });
    }
  }
  if (data?.ProjectedPlan?.["Net Operating Cashflows"]) {
    dataTotal.push({
      ...data.ProjectedPlan?.["Net Operating Cashflows"]?.[0],
      isTotal: true,
    });
  }
  if (data?.ProjectedPlan?.["Other Adjustments"] && Array.isArray(data?.ProjectedPlan["Other Adjustments"])) {
    dataTotal.push(...data.ProjectedPlan["Other Adjustments"]);
  }
  if (data?.ProjectedPlan?.["Total Adjustments"]) {
    dataTotal.push({
      ...data.ProjectedPlan?.["Total Adjustments"]?.[0],
      isTotal: true,
    });
  }
  if (data?.ProjectedPlan?.["Adjusted Net Operating Cashflows"]) {
    dataTotal.push({
      ...data.ProjectedPlan?.["Adjusted Net Operating Cashflows"]?.[0],
      isTotal: true,
    });
  }
  if (data?.ProjectedPlan?.Financing) {
    dataTotal.push({ Particulars: "Financing", isHeading: true });
    if (data?.ProjectedPlan?.Financing && Array.isArray(data?.ProjectedPlan.Financing)) {
      dataTotal.push(...data.ProjectedPlan.Financing);
  }}
  if (data?.ProjectedPlan?.["Closing Cash Balance"]) {
    dataTotal.push({
      ...data.ProjectedPlan?.["Closing Cash Balance"]?.[0],
      isTotal: true,
    });
  }

  const headersList = useMemo(() => {
    return data?.ProjectedPlan?.headers ? data?.ProjectedPlan?.headers.filter(key => isMonthKey(key)) : [];
  }, [data?.ProjectedPlan?.headers]);

  const headers = useMemo(() => {
    return headersList.map(v => ({
      title: v,
      accessorKey: v,
      formatValue: (value: number) => numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_INR_DECIMALS),
    }));
  }, [headersList]);

  return (
    <>
      <div className="sales-graph-heading">Projected Cashflow</div>
      <div className="table-Cashflow-col-scroll table-border">
        <div className="p-3 gap">
          <div className="table-scrollbar">
            <CashflowTable
              columns={[
                { title: `Particulars`, accessorKey: "Particulars" },
                {
                  title: `Total (${numberSystem})`,
                  accessorKey: "Total",
                  formatValue: (value: number) =>
                    numberWithCommasAndFraction(
                      value,
                      import.meta.env.VITE_REACT_APP_INR_DECIMALS
                    ),
                },
                {
                  title: `Till Date (${numberSystem})`,
                  accessorKey: "ActualTillDate",
                  formatValue: (value: number) =>
                    numberWithCommasAndFraction(
                      value,
                      import.meta.env.VITE_REACT_APP_INR_DECIMALS
                    ),
                },
                {
                  title: `Future Total (${numberSystem})`,
                  accessorKey: "ProjectedTotal",
                  formatValue: (value: number) =>
                    numberWithCommasAndFraction(
                      value,
                      import.meta.env.VITE_REACT_APP_INR_DECIMALS
                    ),
                },
                ...headers,
              ]}
              data={dataTotal}
              emptyIndicator=""
            />
          </div>
        </div>
      </div>
      <div className="mt-4 mb-4">
        <DashboardRemarkInput
          addRemark={addRemark}
          remarkKey={cashflowChartNames.Projected_Cashflow}
          remarks={remarks}
          setRemarks={setRemarks}
          saveRequest={saveRequest}
        />
      </div>
    </>
  );
};

export default ProjectedCashFlow;
