import React, { useCallback } from "react";
import { RemarksObjType } from "../../../../../layout/dashboardRemarks/Datatypes";
import CustomerProfileAnalysisGraph from "./CustomerProfileAnalysisGraph";
import { DashboardRemarkInput } from "../../../../../layout/dashboardRemarks/RemarksReportDashboard";
import HomeLoanAnalysisGraph from "./HomeLoanAnalysisGraph";
import RegisterationStatusAnalysisGraph from "./RegisterationStatusAnalysisGraph";
import { useSelector } from "react-redux";
import { AppState } from "../../../../../lib/common/appState";
import {
  black,
  neutralGrey,
  brightRed,
  darkGrey,
  lightGrey,
  offWhiteGrey,
} from "../../../../../assets/colorConstants";
import {
  getPercent,
  numberWithCommasAndFraction,
} from "../../../../../widgets/charts/Recharts/utils";
import { pieLabelFormaterType } from "../../../../../widgets/charts/Recharts/CustomPieChart";
import { salesChartNames } from "../../../../../lib/services/dashboardRemarks/constants";
import { InsertDashboardRemarkPayload } from "../../../../../lib/services/dashboardRemarks/dataType";

interface OtherInsightsTabTypes {
  addRemark: boolean;
  remarks: RemarksObjType;
  setRemarks: (obj: RemarksObjType) => void;
  saveRequest: InsertDashboardRemarkPayload;
}

const OtherInsightsTab: React.FC<OtherInsightsTabTypes> = ({
  addRemark,
  remarks,
  setRemarks,
  saveRequest,
}) => {
  const salesDashboard = useSelector((state: AppState) => state.salesDashboard);
  const chartColors = [
    brightRed,
    black,
    neutralGrey,
    lightGrey,
    darkGrey,
    offWhiteGrey,
  ];

  const labelFormatter = useCallback(
    (obj: pieLabelFormaterType, valueTotal: string, type: string) => {
      const span = (
        <>
          <tspan textAnchor={obj.textAnchor}>
            {numberWithCommasAndFraction(
              obj.value,
              type === "unit"
                ? import.meta.env.VITE_REACT_APP_UNIT_DECIMAL
                : import.meta.env.VITE_REACT_APP_AREA_DECIMAL
            )}
          </tspan>
          <tspan
            className="bold-text"
            textAnchor={obj.textAnchor}
            dx={obj.value && String(obj.value).length > 10 ? "-50" : "-20"}
            dy="10"
          >
            {obj.value ? getPercent(Number(obj.value), Number(valueTotal)) : ""}
          </tspan>
        </>
      );
      return span;
    },
    []
  );

  return (
    <>
      <div className="row">
        <div className="col-md-4 col-sm-12">
          <CustomerProfileAnalysisGraph
            graphData={
              salesDashboard.dashboardDetailsv2?.data?.additionalInsights
                ?.customerProfileAnalysis ?? []
            }
            colors={chartColors}
            labelFormatter={labelFormatter}
          />
        </div>
        <div className="col-md-4 col-sm-12">
          <HomeLoanAnalysisGraph
            graphData={
              salesDashboard.dashboardDetailsv2?.data?.additionalInsights
                ?.homeLoanAnalysis ?? []
            }
            colors={chartColors}
            labelFormatter={labelFormatter}
          />
        </div>
        <div className="col-md-4 col-sm-12">
          <RegisterationStatusAnalysisGraph
            graphData={
              salesDashboard.dashboardDetailsv2?.data?.additionalInsights
                ?.registrationStatusAnalysis ?? []
            }
            colors={chartColors}
            labelFormatter={labelFormatter}
          />
        </div>
      </div>
      <div className="mt-4 mb-4">
        <DashboardRemarkInput
          addRemark={addRemark}
          remarkKey={salesChartNames.Aditional_Insights}
          remarks={remarks}
          setRemarks={setRemarks}
          saveRequest={saveRequest}
        />
      </div>
    </>
  );
};

export default OtherInsightsTab;
