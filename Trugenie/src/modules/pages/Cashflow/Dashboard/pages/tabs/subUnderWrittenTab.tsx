import { useMemo } from "react";
import CashflowTable from "../../CashflowTable";
import { useSelector } from "react-redux";
import { getBuisnessPlanList } from "../../../../../../lib/services/cashflowDashboard/selectors";
import { getNumberSystem } from "../../../../../../lib/services/common/selector";
import { isMonthKey } from "../../../../../../utils/commonFunctions";
import { numberWithCommasAndFraction } from "../../../../../../widgets/charts/Recharts/utils";

const SubUnderWrittenTab = () => {
  const data = useSelector(getBuisnessPlanList);
  const numberSystem = useSelector(getNumberSystem);
  // data handeling
  const dataTotal: any = [];
  if (data?.HistoricUnderwritten?.Inflows) {
    dataTotal.push({ Particulars: "Inflows", isHeading: true });
    if (Array.isArray(data.HistoricUnderwritten.Inflows)) {
      dataTotal.push(...data.HistoricUnderwritten.Inflows);
    }
    if (Array.isArray(data.HistoricUnderwritten["Total Inflows"]) && data.HistoricUnderwritten["Total Inflows"].length > 0) {
      dataTotal.push({ ...data.HistoricUnderwritten["Total Inflows"][0], isTotal: true });
    }
  }
  if (data?.HistoricUnderwritten?.Outflows) {
    dataTotal.push({ Particulars: "Outflows", isHeading: true });
    if (Array.isArray(data.HistoricUnderwritten.Outflows)) {
      dataTotal.push(...data.HistoricUnderwritten.Outflows);
    }
    if (Array.isArray(data.HistoricUnderwritten["Total Outflows"]) && data.HistoricUnderwritten["Total Outflows"].length > 0) {
      dataTotal.push({ ...data.HistoricUnderwritten["Total Outflows"][0], isTotal: true });
    }
  }
  if (data?.HistoricUnderwritten?.["Net Operating Cashflows"]) {
    dataTotal.push({
      ...data.HistoricUnderwritten?.["Net Operating Cashflows"]?.[0],
      isTotal: true,
    });
  }
  if (data?.HistoricUnderwritten?.["Other Adjustments"] && Array.isArray(data.HistoricUnderwritten["Other Adjustments"])) {
    dataTotal.push(...data.HistoricUnderwritten["Other Adjustments"]);
  }
  if (data?.HistoricUnderwritten?.["Total Adjustments"]) {
    dataTotal.push({
      ...data.HistoricUnderwritten?.["Total Adjustments"]?.[0],
      isTotal: true,
    });
  }
  if (data?.HistoricUnderwritten?.["Adjusted Net Operating Cashflows"]) {
    dataTotal.push({
      ...data.HistoricUnderwritten?.["Adjusted Net Operating Cashflows"]?.[0],
      isTotal: true,
    });
  }
  if (data?.HistoricUnderwritten?.Financing) {
    dataTotal.push({ Particulars: "Financing", isHeading: true });
    if (data?.HistoricUnderwritten?.Financing && Array.isArray(data.HistoricUnderwritten.Financing)) {
      dataTotal.push(...data.HistoricUnderwritten.Financing);
    }
  }
  if (data?.HistoricUnderwritten?.["Closing Cash Balance"]) {
    dataTotal.push({
      ...data.HistoricUnderwritten?.["Closing Cash Balance"]?.[0],
      isTotal: true,
    });
  }
  const headersList = useMemo(() => {
    return data?.HistoricUnderwritten?.headers ? data?.HistoricUnderwritten?.headers.filter(key => isMonthKey(key)) : [];
  }, [data?.HistoricUnderwritten?.headers]);

  const headers = useMemo(() => {
    return headersList.map(v => ({
      title: v,
      accessorKey: v,
      formatValue: (value: number) => numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_INR_DECIMALS),
    }));
  }, [headersList]);

  return (
    <div className='table-Cashflow-col-scroll table-border'>
      <div className='p-3 gap'>
        <div style={{ width: "100%", overflowX: "auto" }}>
          <CashflowTable
            containerStyles={{
              minHeight: "250px",
            }}
            columns={[
              { title: `Particulars`, accessorKey: "Particulars" },
              {
                title: `Underwritten Planned Till Date (${numberSystem})`,
                accessorKey: "PlannedTillDate",
                formatValue: (value: number) => numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_INR_DECIMALS),
              },
              {
                title: `Actual till date (${numberSystem})`,
                accessorKey: "ActualTillDate",
                formatValue: (value: number) => numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_INR_DECIMALS),
              },
              {
                title: `Variance (${numberSystem})`,
                accessorKey: "Variance",
                formatValue: (value: number) => numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_INR_DECIMALS),
              },
              // { title: `till Dec-22`, accessorKey: "Dec-23", type: "float" },
              ...headers,
            ]}
            emptyIndicator=''
            data={dataTotal}
          />
        </div>
      </div>
    </div>
  );
};

export default SubUnderWrittenTab;
