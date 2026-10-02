import React, { useState } from "react";
import { customStyle } from "../style";
import SummaryTable from "./SummaryTable";
import ConstructionActivitySchedule from "./ConstructionActivitySchedule";
import { ConstructionSummaryResult } from "../../../../../lib/services/constructionDashboardv2/dataType";
import { RemarksObjType } from "../../../../../layout/dashboardRemarks/Datatypes";
import { InsertDashboardRemarkPayload } from "../../../../../lib/services/dashboardRemarks/dataType";
import { DashboardRemarkInput } from "../../../../../layout/dashboardRemarks/RemarksReportDashboard";
import { constrcutionChartNames } from "../../../../../lib/services/dashboardRemarks/constants";

const ConstructionActivity: React.FC<{
  constructionSummary?: ConstructionSummaryResult;
  addRemark: boolean;
  remarks: RemarksObjType;
  setRemarks: (obj: RemarksObjType) => void;
  saveRequest: InsertDashboardRemarkPayload;
}> = ({ constructionSummary, addRemark, remarks, setRemarks, saveRequest }) => {
  const [activeBtn, setActiveBtn] = useState<string>("UnderWritten");
  const HeaderButton = ["UnderWritten", "Business Plan"];
  return (
    <>
      <div className="d-flex justify-content-between">
        <span className="sales-graph-heading">Summary</span>
        <span>
          {HeaderButton.map((v) => (
            <span
              key={`construction-activity-${v}`}
              style={
                activeBtn === v
                  ? customStyle.constructionActivityBtnActive
                  : customStyle.constructionActivityBtn
              }
              onClick={() => setActiveBtn(v)}
            >
              {v}
            </span>
          ))}
        </span>
      </div>
      <SummaryTable
        activeBtn={activeBtn}
        data={
          constructionSummary?.data?.constructionActivity
            ?.casummaryProductTypeGroupList ?? []
        }
      />
      <ConstructionActivitySchedule
        activeBtn={activeBtn}
        data={constructionSummary?.data?.constructionActivity?.gantChart ?? []}
      />
      <div className="mt-4 mb-4">
        <DashboardRemarkInput
          addRemark={addRemark}
          remarkKey={constrcutionChartNames.Construction_Activity}
          remarks={remarks}
          setRemarks={setRemarks}
          saveRequest={saveRequest}
        />
      </div>
    </>
  );
};

export default ConstructionActivity;
