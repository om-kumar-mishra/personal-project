/* eslint-disable react/prop-types */
import { useState, useRef, useMemo } from "react";
import "../table.css";
import SubUnderWrittenTab from "./tabs/subUnderWrittenTab";
import SubBuisnessPlanTab from "./tabs/subBuisnessTab";
import { DashboardRemarkInput } from "../../../../../layout/dashboardRemarks/RemarksReportDashboard";
import { cashflowChartNames } from "../../../../../lib/services/dashboardRemarks/constants";
import { CashflowChildComponentPropsTypes } from "..";

interface ButtonTabType {
  id: string;
  value: string;
}
const HistoricalCashFlow: React.FC<CashflowChildComponentPropsTypes> = ({ addRemark, remarks, setRemarks, saveRequest }) => {
  const [activeTab, setActiveTab] = useState<string>("underwritten");
  const underwrittenTab = useRef(null);
  const buisnessPlanTab = useRef(null);

  const ButtonTab: ButtonTabType[] = useMemo(() => {
    return [
      {
        id: "underwritten",
        value: "Underwritten",
      },
      {
        id: "buisnessplan",
        value: "Business Plan",
      },
    ];
  }, []);

  return (
    <>
      <div className='sales-graph-heading'>Historical Cashflow</div>
      <div className='d-flex justify-content-end'>
        {ButtonTab.map((v: ButtonTabType) => (
          <span
            key={v.id}
            style={{
              width: "120px",
              // fontSize: "11px",
              cursor: "pointer",
              padding: ".3em",
              margin: ".1em",
            }}
            className={`${activeTab === v.id ? "black" : "white"}  text-center font-bold`}
            onClick={() => setActiveTab(v.id)}>
            {v.value}
          </span>
        ))}
      </div>
      <div className='mt-1'>
        {activeTab === ButtonTab[0].id && (
          <div ref={underwrittenTab}>
            <SubUnderWrittenTab />
          </div>
        )}
      </div>
      <div className='mt-3'>
        {activeTab === ButtonTab[1].id && (
          <div ref={buisnessPlanTab}>
            <SubBuisnessPlanTab />
          </div>
        )}
      </div>
      <div className='mt-4 mb-4'>
        <DashboardRemarkInput
          addRemark={addRemark}
          remarkKey={cashflowChartNames.Historical_Cashflow}
          remarks={remarks}
          setRemarks={setRemarks}
          saveRequest={saveRequest}
        />
      </div>
    </>
  );
};

export default HistoricalCashFlow;
