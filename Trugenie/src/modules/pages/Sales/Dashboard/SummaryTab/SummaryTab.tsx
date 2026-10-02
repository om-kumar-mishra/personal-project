import React, { useState } from "react";
import { DashboardRemarkInput } from "../../../../../layout/dashboardRemarks/RemarksReportDashboard";
import { RemarksObjType } from "../../../../../layout/dashboardRemarks/Datatypes";
import AreaSummary from "./AreaSummary";
import ValueSummary from "./ValueSummary";
import UnitSummary from "./UnitSummary";
import { useSelector } from "react-redux";
import { AppState } from "../../../../../lib/common/appState";
import { salesChartNames } from "../../../../../lib/services/dashboardRemarks/constants";
import { InsertDashboardRemarkPayload } from "../../../../../lib/services/dashboardRemarks/dataType";
import { customStyle } from "../../../Construction/Dashboard/style";

interface SummaryTabTypes {
  addRemark: boolean;
  remarks: RemarksObjType;
  setRemarks: (obj: RemarksObjType) => void;
  printPDF: boolean;
  saveRequest: InsertDashboardRemarkPayload;
}

const SummaryTab: React.FC<SummaryTabTypes> = ({
  addRemark,
  remarks,
  setRemarks,
  printPDF,
  saveRequest,
}) => {
  const salesDashboard = useSelector((state: AppState) => state.salesDashboard);
  const [activeBtn, setActiveBtn] = useState<string>("Underwritten");
  const HeaderButton = ["Underwritten", "Business Plan"];

  return (
    <>
      <div className="d-flex justify-content-end me-4">
        {HeaderButton.map((v) => (
          <span
            key={`${v}-sales-summary`}
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
      </div>
      <div className="row">
        <div className={printPDF ? "col-md-12" : "col-md-6"}>
          <AreaSummary
            areaSummaryTable={
              salesDashboard.dashboardDetailsv2?.data?.summary?.areaSummary
            }
            printPDF={printPDF}
            activeBtn={activeBtn}
          />
        </div>
        <div className={printPDF ? "col-md-12" : "col-md-6"}>
          <UnitSummary
            unitSummaryTable={
              salesDashboard.dashboardDetailsv2?.data?.summary?.unitSummary
            }
            printPDF={printPDF}
            activeBtn={activeBtn}
          />
        </div>
      </div>
      <ValueSummary
        valueSummaryTable={
          salesDashboard.dashboardDetailsv2?.data?.summary?.valueSummary
        }
        activeBtn={activeBtn}
      />
      <div className="mt-4 mb-4">
        <DashboardRemarkInput
          addRemark={addRemark}
          remarkKey={salesChartNames.Summary}
          remarks={remarks}
          setRemarks={setRemarks}
          saveRequest={saveRequest}
        />
      </div>
    </>
  );
};

export default SummaryTab;
