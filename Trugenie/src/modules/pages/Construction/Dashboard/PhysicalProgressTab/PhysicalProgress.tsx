import React from "react";
import { customStyle } from "../style";
import SummaryTable from "./SummaryTable";
import DetailTable from "./DetailTable";
import { ConstructionSummaryResult } from "../../../../../lib/services/constructionDashboardv2/dataType";
import { RemarksObjType } from "../../../../../layout/dashboardRemarks/Datatypes";
import { InsertDashboardRemarkPayload } from "../../../../../lib/services/dashboardRemarks/dataType";
import { DashboardRemarkInput } from "../../../../../layout/dashboardRemarks/RemarksReportDashboard";
import { constrcutionChartNames } from "../../../../../lib/services/dashboardRemarks/constants";

const PhysicalProgress: React.FC<{
  constructionSummary?: ConstructionSummaryResult;
  addRemark: boolean;
  remarks: RemarksObjType;
  setRemarks: (obj: RemarksObjType) => void;
  saveRequest: InsertDashboardRemarkPayload;
}> = ({ constructionSummary, addRemark, remarks, setRemarks, saveRequest }) => {

  const getDetailTableCellColor = (val?: number | string) => {
    if (val) {
      const value = Number(val);
      if (value === 0 || val === "") return "";
      else if (value >= 1) return "green-bg-color";
      else if (value < 1) return "yellow-bg-color";
    } else return "";
  };

  return (
    <div>
      <div className="sales-graph-heading">Physical Progress</div>
      {constructionSummary?.data?.physicalProgress &&
        constructionSummary.data.physicalProgress.map((v,i) => (
          <div key={`${v.title}-${i}`}>
            <div style={customStyle.physicalProgressSubheader}>{v.title}</div>
            <SummaryTable
              data={v.physicalProgressParticulars ?? []}
              title={v.title}
            />
            <DetailTable
              data={v.physicalProgressDetails ?? []}
              getDetailTableCellColor={getDetailTableCellColor}
              title={v.title}
            />
            <div className="mt-4 mb-4">
              <DashboardRemarkInput
                addRemark={addRemark}
                remarkKey={`${constrcutionChartNames.Approvals}(${v.title})`}
                remarks={remarks}
                setRemarks={setRemarks}
                saveRequest={saveRequest}
              />
            </div>
          </div>
        ))}
    </div>
  );
};

export default PhysicalProgress;
