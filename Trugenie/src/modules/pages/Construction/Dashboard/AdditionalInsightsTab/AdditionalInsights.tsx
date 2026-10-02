import React from "react";
import AluminiumGraph from "./AluminiumGraph";
import CementGraph from "./CementGraph";
import SteelGraph from "./SteelGraph";
import { useSelector } from "react-redux";
import { RemarksObjType } from "../../../../../layout/dashboardRemarks/Datatypes";
import { InsertDashboardRemarkPayload } from "../../../../../lib/services/dashboardRemarks/dataType";
import TableWithRedHeader from "../../../../../widgets/tables/TableWithRedHeader";
import { DashboardRemarkInput } from "../../../../../layout/dashboardRemarks/RemarksReportDashboard";
import { constrcutionChartNames } from "../../../../../lib/services/dashboardRemarks/constants";

interface AdditionalInsightsProps {
  addRemark: boolean;
  remarks: RemarksObjType;
  setRemarks: (obj: RemarksObjType) => void;
  saveRequest: InsertDashboardRemarkPayload;
}

const reraTableRow = [
  {
    name: "Phase",
    key: "projectPhase",
  },
  {
    name: "Particulars",
    key: "particulars",
  },
  {
    name: "Details",
    key: "details",
  },
];

const AdditionalInsights: React.FC<AdditionalInsightsProps> = ({
  addRemark,
  remarks,
  setRemarks,
  saveRequest,
}) => {
  // const [yearChecked, setYearChecked] = useState<string[]>([]);
  const { constructionDashboard } = useSelector((state: any) => state);
  const { constructionSummary } = constructionDashboard;

  return (
    <>
      <div className="sales-graph-heading">RERA Details</div>
      <div className="row">
        <div className="col-md-12 col-sm-12">
          <div className="sales-graph-border">
            <div className="p-3">
              <TableWithRedHeader
                data={
                  constructionSummary?.data?.additionalInsights
                    ?.reraDetailsList ?? []
                }
                cols={reraTableRow}
                showTotalRow={false}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 mb-4">
        <DashboardRemarkInput
          addRemark={addRemark}
          remarkKey={constrcutionChartNames.RERA_Details}
          remarks={remarks}
          setRemarks={setRemarks}
          saveRequest={saveRequest}
        />
      </div>

      <div className="row mt-4">
        <div className="sales-graph-heading">
          Input Cost - Industry Price Movement
        </div>

        {/* <div className="col-md-1 col-sm-12">
          <div className="sales-graph-border">
            <h5>Year</h5>
            <div className="mt-0 p-0">
              {["2012", "2013", "2014", "2016"].map((v: any) => (
                <span
                  className="construction-year-display"
                  style={{ marginRight: "10px" }}
                  key={v}
                >
                  <input
                    style={{ marginRight: "3px" }}
                    type="checkbox"
                    checked={yearChecked.includes(v)}
                    id={`year-${v}`}
                    onChange={() => {
                      setYearChecked(v);
                    }}
                  />
                  <label className="form-check-label" htmlFor={`year-${v}`}>
                    {v}
                  </label>
                </span>
              ))}
            </div>
          </div>
        </div> */}
        <AluminiumGraph
          graphData={constructionSummary?.data?.additionalInsights?.aluminiumList ?? []} />
        <SteelGraph />
      </div>
      <div className="row mt-4">
        <CementGraph
          graphData={constructionSummary?.data?.additionalInsights?.cementList ?? []} />
      </div>
      <div className="mt-4 mb-4">
        <DashboardRemarkInput
          addRemark={addRemark}
          remarkKey={constrcutionChartNames.Input_Cost_Industury_Price_Movement}
          remarks={remarks}
          setRemarks={setRemarks}
          saveRequest={saveRequest}
        />
      </div>
    </>
  );
};

export default AdditionalInsights;
