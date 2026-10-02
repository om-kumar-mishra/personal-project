import React, { useEffect, useState } from "react";
import { RemarksObjType } from "../../../../../layout/dashboardRemarks/Datatypes";
import PriceHistoryGraph from "./PriceHistoryGraph";
import PricePredictedGraph from "./PricePredictedGraph";
import VelocityHistoryGraph from "./VelocityHistoryGraph";
import VelocityPredictedGraph from "./VelocityPredictedGraph";
import ComparisonPerformanceHistoryGraph from "./ComparisonPerformanceHistoryGraph";
import ComparisonPerformancePredictedGraph from "./ComparisonPerformancePredictedGraph";
import LastTwelveMonthsPerformance from "./LastTwelveMonthsPerformance";
import TraillingPerformance from "./TraillingPerformance";
import { DashboardRemarkInput } from "../../../../../layout/dashboardRemarks/RemarksReportDashboard";
import { useSelector } from "react-redux";
import { AppState } from "../../../../../lib/common/appState";
import { minMaxValueOfArrayofObject } from "../../../../../widgets/charts/Recharts/utils";
import { salesChartNames } from "../../../../../lib/services/dashboardRemarks/constants";
import { InsertDashboardRemarkPayload } from "../../../../../lib/services/dashboardRemarks/dataType";

interface PriceVelocityTabTypes {
  addRemark: boolean;
  remarks: RemarksObjType;
  setRemarks: (obj: RemarksObjType) => void;
  saveRequest: InsertDashboardRemarkPayload;
}
const PriceVelocityTab: React.FC<PriceVelocityTabTypes> = ({
  addRemark,
  remarks,
  setRemarks,
  saveRequest,
}) => {
  const salesDashboard = useSelector((state: AppState) => state.salesDashboard);
  const [priceDomain, setPriceDomain] = useState<number[] | string[]>([
    "auto",
    "auto",
  ]);
  const [velocityDomain, setVelocityDomain] = useState<number[] | string[]>([
    "auto",
    "auto",
  ]);

  useEffect(() => {
    if (
      salesDashboard.dashboardDetailsv2?.data?.priceAndVelocityDetails
        ?.pricevelocityResponse.pricehistoric &&
      salesDashboard.dashboardDetailsv2?.data?.priceAndVelocityDetails
        ?.pricevelocityResponse.pricefuture
    ) {
      const priceList = [
        ...salesDashboard.dashboardDetailsv2.data.priceAndVelocityDetails
          .pricevelocityResponse.pricehistoric,
        ...salesDashboard.dashboardDetailsv2.data.priceAndVelocityDetails
          .pricevelocityResponse.pricefuture,
      ];
      const range = minMaxValueOfArrayofObject(priceList, [
        "rateUnderWritten",
        "rateBusinessPlan",
        "rate",
      ]);
      setPriceDomain(range);
    }
    if (
      salesDashboard.dashboardDetailsv2?.data?.priceAndVelocityDetails
        ?.pricevelocityResponse.velcoityhisoric &&
      salesDashboard.dashboardDetailsv2?.data?.priceAndVelocityDetails
        ?.pricevelocityResponse.velcoityFuture
    ) {
      const velocityList = [
        ...salesDashboard.dashboardDetailsv2.data.priceAndVelocityDetails
          .pricevelocityResponse.velcoityhisoric,
        ...salesDashboard.dashboardDetailsv2.data.priceAndVelocityDetails
          .pricevelocityResponse.velcoityFuture,
      ];
      const range = minMaxValueOfArrayofObject(velocityList, [
        "areaUnderWritten",
        "areaBusinessPlan",
        "areaSold",
      ]);
      setVelocityDomain(range);
    }
  }, [
    salesDashboard.dashboardDetailsv2?.data?.priceAndVelocityDetails
      ?.pricevelocityResponse,
  ]);

  return (
    <>
      <div className="row">
        <div className="sales-graph-heading">Price</div>
        <PriceHistoryGraph
          graphData={
            salesDashboard.dashboardDetailsv2?.data?.priceAndVelocityDetails
              ?.pricevelocityResponse.pricehistoric ?? []
          }
          domain={priceDomain}
        />
        <PricePredictedGraph
          graphData={
            salesDashboard.dashboardDetailsv2?.data?.priceAndVelocityDetails
              ?.pricevelocityResponse.pricefuture ?? []
          }
          domain={priceDomain}
        />
      </div>
      <div className="mt-4">
        <DashboardRemarkInput
          addRemark={addRemark}
          remarkKey={salesChartNames.Price}
          remarks={remarks}
          setRemarks={setRemarks}
          saveRequest={saveRequest}
        />
      </div>
      <div className="row mt-4">
        <div className="sales-graph-heading">Velocity</div>
        <VelocityHistoryGraph
          graphData={
            salesDashboard.dashboardDetailsv2?.data?.priceAndVelocityDetails
              ?.pricevelocityResponse.velcoityhisoric ?? []
          }
          domain={velocityDomain}
        />
        <VelocityPredictedGraph
          graphData={
            salesDashboard.dashboardDetailsv2?.data?.priceAndVelocityDetails
              ?.pricevelocityResponse.velcoityFuture ?? []
          }
          domain={velocityDomain}
        />
      </div>
      <div className="mt-4">
        <DashboardRemarkInput
          addRemark={addRemark}
          remarkKey={salesChartNames.Velocity}
          remarks={remarks}
          setRemarks={setRemarks}
          saveRequest={saveRequest}
        />
      </div>
      <div className="row mt-4">
        <div className="sales-graph-heading">
          Comparison of Historical Performance
        </div>
        <ComparisonPerformanceHistoryGraph
          graphData={
            salesDashboard.dashboardDetailsv2?.data?.priceAndVelocityDetails
              ?.comparisonHistoricalPerformance ?? []
          }
        />
        <ComparisonPerformancePredictedGraph
          graphData={
            salesDashboard.dashboardDetailsv2?.data?.priceAndVelocityDetails
              ?.comparisonHistoricalPerformance ?? []
          }
        />
      </div>
      <div className="mt-4">
        <DashboardRemarkInput
          addRemark={addRemark}
          remarkKey={salesChartNames.Comparison_of_Historical_Performance}
          remarks={remarks}
          setRemarks={setRemarks}
          saveRequest={saveRequest}
        />
      </div>
      <LastTwelveMonthsPerformance
        graphData={
          salesDashboard.dashboardDetailsv2?.data?.priceAndVelocityDetails
            ?.trailing12MonthsPerformancesList
        }
      />
      <div className="mt-4">
        <DashboardRemarkInput
          addRemark={addRemark}
          remarkKey={salesChartNames.L12_Months_Performace}
          remarks={remarks}
          setRemarks={setRemarks}
          saveRequest={saveRequest}
        />
      </div>
      <TraillingPerformance />
      <div className="mt-4 mb-4">
        <DashboardRemarkInput
          addRemark={addRemark}
          remarkKey={salesChartNames.Trailling_Performance}
          remarks={remarks}
          setRemarks={setRemarks}
          saveRequest={saveRequest}
        />
      </div>
    </>
  );
};

export default PriceVelocityTab;
