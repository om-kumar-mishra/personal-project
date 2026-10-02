import React from "react";
import ErrorBoundary from "../../../../../widgets/ErrorBoundary";
import CompetitionAnalysisSalesMap from "../../../../../layout/maps/CompetitionAnalysisSalesMap";
import { MicroMarketCompletionAnalysisType } from "../../../../../lib/services/salesDashboard/dataTypes";

const CompetitionAnalysisMicroMap: React.FC<{
  data: MicroMarketCompletionAnalysisType[];
}> = ({data}) => {
  return (
    <div>
      <ErrorBoundary>
        <CompetitionAnalysisSalesMap markers={data} mapHeight="45vh" />
      </ErrorBoundary>
    </div>
  );
};

export default CompetitionAnalysisMicroMap;
