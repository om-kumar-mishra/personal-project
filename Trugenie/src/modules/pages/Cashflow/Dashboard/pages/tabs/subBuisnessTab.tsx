import { useMemo } from "react";
import { useSelector } from "react-redux";
import CashflowTable from "../../CashflowTable";
import { getBuisnessPlanList } from "../../../../../../lib/services/cashflowDashboard/selectors";
import { getNumberSystem } from "../../../../../../lib/services/common/selector";
import { numberWithCommasAndFraction } from "../../../../../../widgets/charts/Recharts/utils";
import { isMonthKey } from "../../../../../../utils/commonFunctions";

const SubBuisnessPlanTab = () => {
  const data = useSelector(getBuisnessPlanList);
  const numberSystem = useSelector(getNumberSystem);
  // data handeling
  const dataTotal: any = [];
  if (data?.HistoricBusiness?.Inflows) {
    dataTotal.push({ Particulars: "Inflows", isHeading: true });
    if (Array.isArray(data.HistoricBusiness.Inflows)) {
      dataTotal.push(...data.HistoricBusiness.Inflows);
    }
    if (Array.isArray(data.HistoricBusiness["Total Inflows"]) && data.HistoricBusiness["Total Inflows"].length > 0) {
      dataTotal.push({ ...data.HistoricBusiness["Total Inflows"][0], isTotal: true });
    }
  }
  if (data?.HistoricBusiness?.Outflows) {
    dataTotal.push({ Particulars: "Outflows", isHeading: true });
    if (Array.isArray(data.HistoricBusiness.Outflows)) {
      dataTotal.push(...data.HistoricBusiness.Outflows);
    }
    if (Array.isArray(data.HistoricBusiness["Total Outflows"]) && data.HistoricBusiness["Total Outflows"].length > 0) {
      dataTotal.push({ ...data.HistoricBusiness["Total Outflows"][0], isTotal: true });
    }
  }
  if (data?.HistoricBusiness?.["Net-Operating Cash Flow"]) {
    dataTotal.push({
      ...data.HistoricBusiness?.["Net-Operating Cash Flow"]?.[0],
      isTotal: true,
    });
  }
  if (data?.HistoricBusiness?.["Other Adjustments"] && Array.isArray(data?.HistoricBusiness["Other Adjustments"])) {
    dataTotal.push(...data.HistoricBusiness["Other Adjustments"]);
  }
  if (data?.HistoricBusiness?.["Total Adjustments"]) {
    dataTotal.push({
      ...data.HistoricBusiness?.["Total Adjustments"]?.[0],
      isTotal: true,
    });
  }
  if (data?.HistoricBusiness?.["Adjusted Net Operating Cashflows"]) {
    dataTotal.push({
      ...data.HistoricBusiness?.["Adjusted Net Operating Cashflows"]?.[0],
      isTotal: true,
    });
  }
  if (data?.HistoricBusiness?.Financing) {
    dataTotal.push({ Particulars: "Financing", isHeading: true });
    if (data?.HistoricBusiness?.Financing && Array.isArray(data?.HistoricBusiness.Financing)) dataTotal.push(...data.HistoricBusiness.Financing);
  }
  if (data?.HistoricBusiness?.["Closing Cash Balance"]) {
    dataTotal.push({
      ...data.HistoricBusiness?.["Closing Cash Balance"]?.[0],
      isTotal: true,
    });
  }
  const headersList = useMemo(() => {
    return data?.HistoricBusiness?.headers ? data?.HistoricBusiness?.headers.filter(key => isMonthKey(key)) : [];
  }, [data?.HistoricBusiness?.headers]);

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
                title: `Business Planned Till Date (${numberSystem})`,
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

export default SubBuisnessPlanTab;
