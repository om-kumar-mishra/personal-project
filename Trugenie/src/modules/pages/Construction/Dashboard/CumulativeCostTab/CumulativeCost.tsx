import React, { useEffect, useState } from "react";
import { customStyle } from "../style";
import CostScheduleHistory from "./CostScheduleHistory";
import CostSchedulePredicted from "./CostSchedulePredicted";
import SummaryTable from "./SummaryTable";
import { ConstructionCumulativeCostScheduleList, ConstructionSummaryResult } from "../../../../../lib/services/constructionDashboardv2/dataType";
import { RemarksObjType } from "../../../../../layout/dashboardRemarks/Datatypes";
import { InsertDashboardRemarkPayload } from "../../../../../lib/services/dashboardRemarks/dataType";
import { minMaxValueOfArrayofObject } from "../../../../../widgets/charts/Recharts/utils";
import { DashboardRemarkInput } from "../../../../../layout/dashboardRemarks/RemarksReportDashboard";
import { constrcutionChartNames } from "../../../../../lib/services/dashboardRemarks/constants";

const CumulativeCost: React.FC<{
  constructionSummary?: ConstructionSummaryResult;
  addRemark: boolean;
  remarks: RemarksObjType;
  setRemarks: (obj: RemarksObjType) => void;
  saveRequest: InsertDashboardRemarkPayload;
}> = ({ constructionSummary, addRemark, remarks, setRemarks, saveRequest }) => {
  const [activeBtn, setActiveBtn] = useState<string>("UnderWritten");
  const [historyGraphData, setHistoryGraphData] = useState<ConstructionCumulativeCostScheduleList[]>([]);
  const [projectedGraphData, setProjectedGraphData] = useState<ConstructionCumulativeCostScheduleList[]>([]);
  const [domain, setDomain] = useState<number[] | string[]>(["auto", "auto"]);

  useEffect(() => {
    if (constructionSummary?.data?.cumulativeCost?.costScheduleList && constructionSummary.data.cumulativeCost.costScheduleList.length > 0) {
      const alldata = constructionSummary?.data?.cumulativeCost?.costScheduleList;
      setHistoryGraphData(alldata.filter(v => v.title === "Cost Schedule Historical"));
      setProjectedGraphData(alldata.filter(v => v.title === "Cost Schedule Projected"));
      const range = minMaxValueOfArrayofObject(alldata, ["underwritten", "businnesPlan", "actual", "projectionAmount"]);
      setDomain(range);
    } else {
      setHistoryGraphData([]);
      setProjectedGraphData([]);
      setDomain(["auto", "auto"]);
    }
  }, [constructionSummary?.data?.cumulativeCost?.costScheduleList]);

  const HeaderButton = ["UnderWritten", "Business Plan"];

  return (
    <>
      <div className='d-flex justify-content-between'>
        <span className='sales-graph-heading'>Cost Schedule</span>
        <span>
          {HeaderButton.map(v => (
            <span
              key={`cumulative-cost-${v}`}
              style={activeBtn === v ? customStyle.constructionActivityBtnActive : customStyle.constructionActivityBtn}
              onClick={() => setActiveBtn(v)}>
              {v}
            </span>
          ))}
        </span>
      </div>
      <div className='row'>
        <div className='col-md-6 col-sm-12'>
          <CostScheduleHistory graphData={historyGraphData} domain={domain} activeBtn={activeBtn} />
        </div>
        <div className='col-md-6 col-sm-12'>
          <CostSchedulePredicted graphData={projectedGraphData} domain={domain} activeBtn={activeBtn} />
        </div>
        <div className='mt-4 mb-4'>
          <DashboardRemarkInput
            addRemark={addRemark}
            remarkKey={constrcutionChartNames.Cost_Schedule}
            remarks={remarks}
            setRemarks={setRemarks}
            saveRequest={saveRequest}
          />
        </div>
      </div>
      <>
        <SummaryTable activeBtn={activeBtn} data={constructionSummary?.data?.cumulativeCost?.ccsummaryProductTypeGroupList ?? []} />
        <div className='mt-4 mb-4'>
          <DashboardRemarkInput
            addRemark={addRemark}
            remarkKey={constrcutionChartNames.Cumulative_Cost_Summary}
            remarks={remarks}
            setRemarks={setRemarks}
            saveRequest={saveRequest}
          />
        </div>
      </>
    </>
  );
};

export default CumulativeCost;
