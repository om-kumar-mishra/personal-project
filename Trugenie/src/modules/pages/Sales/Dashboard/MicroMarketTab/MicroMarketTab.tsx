import React from "react";
import { RemarksObjType } from "../../../../../layout/dashboardRemarks/Datatypes";
import CompetitionAnalysisTable from "./CompetitionAnalysisTable";
import { DashboardRemarkInput } from "../../../../../layout/dashboardRemarks/RemarksReportDashboard";
import LocationAnalysisCard from "./LocationAnalysisCard";
import LocationAnalysisMap from "./LocationAnalysisMap";
import CompetitionAnalysisMicroMap from "./CompetitionAnalysisMicroMap";
import { useSelector } from "react-redux";
import { AppState } from "../../../../../lib/common/appState";
import { salesChartNames } from "../../../../../lib/services/dashboardRemarks/constants";
import { InsertDashboardRemarkPayload } from "../../../../../lib/services/dashboardRemarks/dataType";

interface MicroMarketTabTypes {
  addRemark: boolean;
  remarks: RemarksObjType;
  setRemarks: (obj: RemarksObjType) => void;
  saveRequest: InsertDashboardRemarkPayload;
}

const MicroMarketTab: React.FC<MicroMarketTabTypes> = ({
  addRemark,
  remarks,
  setRemarks,
  saveRequest,
}) => {
  const salesDashboard = useSelector((state: AppState) => state.salesDashboard);
  return (
    <>
      <>
        <div className="row">
          <div className="sales-graph-heading">Competition Analysis</div>
          <div className="col-md-5 col-sm-12">
            <div className="sales-graph-border">
              <CompetitionAnalysisMicroMap
                data={
                  salesDashboard.dashboardDetailsv2?.data?.microMarket
                    ?.completionAnalysisList ?? []
                }
              />
            </div>
          </div>
          <div className="col-md-7 col-sm-12">
            <div className="sales-graph-border">
              <CompetitionAnalysisTable
                data={
                  salesDashboard.dashboardDetailsv2?.data?.microMarket
                    ?.completionAnalysisList ?? []
                }
              />
            </div>
          </div>
        </div>
        <div className="mt-4 mb-4">
          <DashboardRemarkInput
            addRemark={addRemark}
            remarkKey={salesChartNames.Competion_Analysis}
            remarks={remarks}
            setRemarks={setRemarks}
            // saveRemark={saveRemark}
            saveRequest={saveRequest}
          />
        </div>
      </>
      {/* <>
        <div className="row">
          <div className="sales-graph-heading">Location Analysis</div>
          <div className="col-md-5 col-sm-12">
            <div className="sales-graph-border">
              <LocationAnalysisMap />
            </div>
          </div>
          <div className="col-md-7 col-sm-12">
            <div className="sales-graph-border">
              <LocationAnalysisCard />
            </div>
          </div>
        </div>
        <div className="mt-4 mb-4">
          <DashboardRemarkInput
            addRemark={addRemark}
            remarkKey="locationAnalysisMicroMarket"
            remarks={remarks}
            setRemarks={setRemarks}
            saveRemark={saveRemark}
          />
        </div>
      </> */}
    </>
  );
};

export default MicroMarketTab;
