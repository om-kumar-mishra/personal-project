import React from "react";
import { useSelector } from "react-redux";
import { RemarksObjType } from "../../../../../layout/dashboardRemarks/Datatypes";
import { InsertDashboardRemarkPayload } from "../../../../../lib/services/dashboardRemarks/dataType";
import { AppState } from "../../../../../lib/common/appState";
import { getNumberSystem } from "../../../../../lib/services/common/selector";
import { numberWithCommasAndFraction } from "../../../../../widgets/charts/Recharts/utils";
import { convertDateFormatYY } from "../../../../../utils/commonFunctions";
import TableWithRedHeader from "../../../../../widgets/tables/TableWithRedHeader";
import { DashboardRemarkInput } from "../../../../../layout/dashboardRemarks/RemarksReportDashboard";
import { constrcutionChartNames } from "../../../../../lib/services/dashboardRemarks/constants";

interface SummarySectionProps {
  addRemark: boolean;
  remarks: RemarksObjType;
  setRemarks: (obj: RemarksObjType) => void;
  saveRequest: InsertDashboardRemarkPayload;
}
const SummarySection: React.FC<SummarySectionProps> = ({
  addRemark,
  remarks,
  setRemarks,
  saveRequest,
}) => {
  const { constructionDashboard } = useSelector((state: AppState) => state);
  const { constructionSummary } = constructionDashboard;
  const numberSystem = useSelector(getNumberSystem);

  const totalCostRow = [
    {
      name: "Cost Head",
      key: "costHead",
    },
    {
      name: `Underwritten (${numberSystem})`,
      key: "underwritten",
      formatValue: (value: number) =>
        `${numberWithCommasAndFraction(
          value,
          import.meta.env.VITE_REACT_APP_INR_DECIMALS
        )}`,
    },
    {
      name: `Business Plan (${numberSystem})`,
      key: "businessPlan",
      formatValue: (value: number) =>
        `${numberWithCommasAndFraction(
          value,
          import.meta.env.VITE_REACT_APP_INR_DECIMALS
        )}`,
    },
    {
      name: "Actual/Anticipated",
      key: "actualAnticipated",
      formatValue: (value: number) =>
        `${numberWithCommasAndFraction(
          value,
          import.meta.env.VITE_REACT_APP_INR_DECIMALS
        )}`,
    },
    {
      name: "Variance w.r.t Underwritten (%)",
      key: "varianceUnderwritten",
      formatValue: (value: number) =>
        `${numberWithCommasAndFraction(
          value,
          import.meta.env.VITE_REACT_APP_INR_DECIMALS
        )}%`,
    },
    {
      name: "Variance w.r.t Business Plan (%)",
      key: "varianceBusinessPlan",
      formatValue: (value: number) =>
        `${numberWithCommasAndFraction(
          value,
          import.meta.env.VITE_REACT_APP_INR_DECIMALS
        )}%`,
    },
  ];

  const physicalProgressRow = [
    {
      name: "Particulars",
      key: "particular",
    },
    {
      name: `Underwritten(%)`,
      key: "underwritten",
      formatValue: (value: number) =>
        `${numberWithCommasAndFraction(
          value,
          import.meta.env.VITE_REACT_APP_PERCENTAGE_DECIMALS
        )}%`,
    },
    {
      name: `Business Plan(%)`,
      key: "businnesPlan",
      formatValue: (value: number) =>
        `${numberWithCommasAndFraction(
          value,
          import.meta.env.VITE_REACT_APP_PERCENTAGE_DECIMALS
        )}%`,
    },
    {
      name: "Actual/Anticipated(%)",
      key: "actualAnticipated",
      formatValue: (value: number) =>
        `${numberWithCommasAndFraction(
          value,
          import.meta.env.VITE_REACT_APP_PERCENTAGE_DECIMALS
        )}%`,
    },
  ];

  const completiondateRow = [
    {
      name: "Particulars",
      key: "productType",
    },
    {
      name: "Underwritten",
      key: "underwritten",
      formatValue: (value: string) => `${convertDateFormatYY(value)}`,
    },
    {
      name: "Business Plan",
      key: "businessPlan",
      formatValue: (value: string) => `${convertDateFormatYY(value)}`,
    },
    {
      name: "Actual/Anticipated",
      key: "actualAnticipated",
      formatValue: (value: string) => `${convertDateFormatYY(value)}`,
    },
    {
      name: "Delay (Months) w.r.t underwritten",
      key: "delaysMonthWrtUnderwritten",
      formatValue: (value: number) => value,
    },
    {
      name: "Delay (Months) w.r.t Business Plan",
      key: "delaysMonthWrtBusinessPlan",
      formatValue: (value: number) => value,
    },
  ];

  const financialProgressRow = [
    {
      name: "Cost Head",
      key: "costHead",
    },
    {
      name: `(${numberSystem})`,
      key: "underwrittenInrMn",
      formatValue: (value: number) =>
        `${numberWithCommasAndFraction(
          value,
          import.meta.env.VITE_REACT_APP_INR_DECIMALS
        )}`,
    },
    {
      name: "%",
      key: "underwrittenPercentage",
      formatValue: (value: number) =>
        `${numberWithCommasAndFraction(
          value,
          import.meta.env.VITE_REACT_APP_PERCENTAGE_DECIMALS
        )}%`,
    },
    {
      name: `(${numberSystem})`,
      key: "businessPlanInrMn",
      formatValue: (value: number) =>
        `${numberWithCommasAndFraction(
          value,
          import.meta.env.VITE_REACT_APP_INR_DECIMALS
        )}`,
    },
    {
      name: "%",
      key: "businessPlanPercentage",
      formatValue: (value: number) =>
        `${numberWithCommasAndFraction(
          value,
          import.meta.env.VITE_REACT_APP_PERCENTAGE_DECIMALS
        )}%`,
    },
    {
      name: `(${numberSystem})`,
      key: "actualAnticipatedInrMn",
      formatValue: (value: number) =>
        `${numberWithCommasAndFraction(
          value,
          import.meta.env.VITE_REACT_APP_INR_DECIMALS
        )}`,
    },
    {
      name: "%",
      key: "actualPercentage",
      formatValue: (value: number) =>
        `${numberWithCommasAndFraction(
          value,
          import.meta.env.VITE_REACT_APP_PERCENTAGE_DECIMALS
        )}%`,
    },
    {
      name: "Variance w.r.t Underwritten (%)",
      key: "varianceUnderwritten",
      formatValue: (value: number) =>
        `${numberWithCommasAndFraction(
          value,
          import.meta.env.VITE_REACT_APP_INR_DECIMALS
        )}%`,
    },
    {
      name: "Variance w.r.t Business Plan (%)",
      key: "varianceBusinessPlan",
      formatValue: (value: number) =>
        `${numberWithCommasAndFraction(
          value,
          import.meta.env.VITE_REACT_APP_INR_DECIMALS
        )}%`,
    },
  ];

  const upperHeader = () => {
    const head = ["UnderWritten", "Business plan", "Actual/Anticipated"];
    return (
      <tr>
        <td colSpan={1}></td>
        <td colSpan={2} className="background-red-table text-center">
          {head[0]}
        </td>
        <td colSpan={2} className="background-red-table text-center">
          {head[1]}
        </td>
        <td colSpan={2} className="background-red-table text-center">
          {head[2]}
        </td>
      </tr>
    );
  };

  return (
    <>
      <div className="row">
        <div className="sales-graph-heading">Total Cost</div>
        <div className="col-md-9 col-sm-12">
          <div className="sales-graph-border">
            <div className="p-3">
              <TableWithRedHeader
                data={constructionSummary?.data?.summary?.totalCost ?? []}
                cols={totalCostRow}
                showTotalRow={false}
                shiftLastRowToFirst={true}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row" style={{ paddingTop: "25px" }}>
        <div className="sales-graph-heading" style={{ paddingTop: "15px" }}>
          Physical Progress
          <span style={{ paddingLeft: "515px" }}>Completion Date</span>
        </div>
        <div className="col-md-5 col-sm-12">
          <div className="sales-graph-border">
            <div className="p-3">
              <TableWithRedHeader
                data={constructionSummary?.data?.summary?.physical ?? []}
                cols={physicalProgressRow}
                showTotalRow={false}
              />
            </div>
          </div>
        </div>

        <div className="col-md-7 col-sm-12">
          <div className="sales-graph-border">
            <div className="p-3">
              <TableWithRedHeader
                data={constructionSummary?.data?.summary?.completion ?? []}
                cols={completiondateRow}
                showTotalRow={false}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row" style={{ paddingTop: "25px" }}>
        <div className="sales-graph-heading">Financial Progress</div>
        <div className="col-md-9 col-sm-12">
          <div className="sales-graph-border">
            <div className="p-3">
              <TableWithRedHeader
                data={constructionSummary?.data?.summary?.financial ?? []}
                cols={financialProgressRow}
                upperHeader={upperHeader}
                showTotalRow={false}
                shiftLastRowToFirst={true}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Remark */}
      <div className="mt-4 mb-4">
        <DashboardRemarkInput
          addRemark={addRemark}
          remarkKey={constrcutionChartNames.Summary}
          remarks={remarks}
          setRemarks={setRemarks}
          saveRequest={saveRequest}
        />
      </div>
    </>
  );
};

export default SummarySection;
