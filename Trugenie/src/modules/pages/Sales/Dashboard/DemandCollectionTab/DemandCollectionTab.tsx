import React from "react";
import { RemarksObjType } from "../../../../../layout/dashboardRemarks/Datatypes";
import CollectionGraph from "./CollectionGraph";
import { DashboardRemarkInput } from "../../../../../layout/dashboardRemarks/RemarksReportDashboard";
import CollectionGraphPassThrough from "./CollectionGraphPassThrough";
import DemandCollectionForSoldUnit from "./DemandCollectionForSoldUnit";
import DemandPhysicalProgressVsActual from "./DemandPhysicalProgressVsActual";
import QualityOfBalanceReceivable from "./QualityOfBalanceReceivable";
import QualityOfBalanceReceivableTable from "./QualityOfBalanceReceivableTable";
import CollectionPostInvestmentPieGraph from "./CollectionPostInvestmentPieGraph";
import CollectionPreInvestmentPieGraph from "./CollectionPreInvestmentPieGraph";
import { useSelector } from "react-redux";
import { AppState } from "../../../../../lib/common/appState";
import { salesChartNames } from "../../../../../lib/services/dashboardRemarks/constants";
import { InsertDashboardRemarkPayload } from "../../../../../lib/services/dashboardRemarks/dataType";

interface DemandCollectionTabTypes {
  addRemark: boolean;
  remarks: RemarksObjType;
  setRemarks: (obj: RemarksObjType) => void;
  saveRequest: InsertDashboardRemarkPayload;
}
const DemandCollectionTab: React.FC<DemandCollectionTabTypes> = ({
  addRemark,
  remarks,
  setRemarks,
  saveRequest
}) => {
  const salesDashboard = useSelector((state: AppState) => state.salesDashboard);
  return (
    <>
      <div className="row mt-2">
        <div className="sales-graph-heading">Collections</div>
        <div className="col-md-6 col-sm-12">
          <CollectionGraph
            graphData={
              salesDashboard.dashboardDetailsv2?.data?.demandAndCollectionData
                ?.demandAndCollection ?? []
            }
          />
        </div>
        <div className="col-md-6 col-sm-12">
          <CollectionGraphPassThrough
            graphData={
              salesDashboard.dashboardDetailsv2?.data?.demandAndCollectionData
                ?.demandAndCollection ?? []
            }
          />
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-6 col-sm-12">
          <DemandCollectionForSoldUnit
            graphData={
              salesDashboard.dashboardDetailsv2?.data?.demandAndCollectionData
                ?.demandAndCollectionsAnalysis ?? []
            }
          />
        </div>
        <div className="col-md-6 col-sm-12">
          <DemandPhysicalProgressVsActual
            data={
              salesDashboard.dashboardDetailsv2?.data?.demandAndCollectionData
                ?.physicalVsActualDemand ?? []
            }
          />
        </div>
      </div>
      <div className="row mt-5">
        <div className="sales-graph-heading">Quality of Balance Receivable</div>
        <div className="col-md-6 col-sm-12">
          <QualityOfBalanceReceivable
            graphData={
              salesDashboard.dashboardDetailsv2?.data?.demandAndCollectionData
                ?.qualityOfBalanceRecivablesTable ?? []
            }
          />
        </div>
        <div className="col-md-6 col-sm-12">
          <QualityOfBalanceReceivableTable
            data={
              salesDashboard.dashboardDetailsv2?.data?.demandAndCollectionData
                ?.qualityOfBalanceRecivablesTable ?? []
            }
          />
        </div>
      </div>
      {/* <AgeingAnalysisGraph /> */}
      <div className="row mt-5">
        <div className="sales-graph-heading">Collection Scheme</div>
        <div className="col-md-6 col-sm-12">
          {/* <CollectionPreInvestmentGraph /> */}
          <CollectionPreInvestmentPieGraph
            graphData={
              salesDashboard.dashboardDetailsv2?.data?.demandAndCollectionData
                ?.preFunding ?? []
            }
          />
        </div>
        <div className="col-md-6 col-sm-12">
          {/* <CollectionPostInvestmentGraph /> */}
          <CollectionPostInvestmentPieGraph
            graphData={
              salesDashboard.dashboardDetailsv2?.data?.demandAndCollectionData
                ?.postFunding ?? []
            }
          />
        </div>
      </div>
      {/* <div className="row mt-5">
        <div className="col-md-6 col-sm-12">
          <DemandCollectionAnalysisGraph />
        </div>
        <div className="col-md-6 col-sm-12">
          <UnregisteredUnitsAnalysisGraph />
        </div>
      </div> */}
      <div className="mt-4 mb-4">
        <DashboardRemarkInput
          addRemark={addRemark}
          remarkKey={salesChartNames.Demand_Collection}
          remarks={remarks}
          setRemarks={setRemarks}
          saveRequest={saveRequest}
        />
      </div>
    </>
  );
};

export default DemandCollectionTab;
