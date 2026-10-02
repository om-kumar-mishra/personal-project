import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../../lib/common/appState";
import { getNumberSystem } from "../../../../lib/services/common/selector";
import { numberWithCommasAndFraction } from "../../../../widgets/charts/Recharts/utils";
import TableWithRedHeader from "../../../../widgets/tables/TableWithRedHeader";

const ConstructionSection: React.FC<{ isUnderwrittenActive: boolean }> = ({
  isUnderwrittenActive,
}) => {
  const { projectSummaryReducer } = useSelector((state: AppState) => state);
  const { dashboardDetails } = projectSummaryReducer;
  const data = dashboardDetails?.data;
  const numberSystem = useSelector(getNumberSystem);

  const constructionSectionTable = [
    {
      name: "Cost Head",
      key: "costhead",
    },
    {
      name: `Cost Incurred (${numberSystem}) (A)`,
      key: "costIncurred",
      formatValue: (value: number) =>
        `${numberWithCommasAndFraction(
          value,
          import.meta.env.VITE_REACT_APP_INR_DECIMALS
        )}`,
    },
    {
      name: `Balance Cost ${
        isUnderwrittenActive ? "Underwritten" : "Business Plan"
      } (${numberSystem}) (B)`,
      key: isUnderwrittenActive
        ? "balanceCostUnderwritten"
        : "balanceCostBusinessPlan",
      formatValue: (value: number) =>
        `${numberWithCommasAndFraction(
          value,
          import.meta.env.VITE_REACT_APP_INR_DECIMALS
        )}`,
    },
    {
      name: `Balance Cost Projected (${numberSystem}) (C)`,
      key: "balanceCostProjected",
      formatValue: (value: number) =>
        `${numberWithCommasAndFraction(
          value,
          import.meta.env.VITE_REACT_APP_INR_DECIMALS
        )}`,
    },
    {
      name: `Total Cost ${
        isUnderwrittenActive ? "Underwritten" : "Business Plan"
      } (${numberSystem}) (D) = A + B`,
      key: isUnderwrittenActive
        ? "totalCostUnderwritten"
        : "totalCostBusinessPlan",
      formatValue: (value: number) =>
        `${numberWithCommasAndFraction(
          value,
          import.meta.env.VITE_REACT_APP_INR_DECIMALS
        )}`,
    },
    {
      name: `Total Cost Actual (${numberSystem}) (E) = A + C`,
      key: "totalCostActual",
      formatValue: (value: number) =>
        `${numberWithCommasAndFraction(
          value,
          import.meta.env.VITE_REACT_APP_INR_DECIMALS
        )}`,
    },
    {
      name: `Variance (${numberSystem}) (F) = D - E`,
      key: isUnderwrittenActive
        ? "underWrittenVariance"
        : "businessPlanVariance",
      formatValue: (value: number) =>
        `${numberWithCommasAndFraction(
          value,
          import.meta.env.VITE_REACT_APP_INR_DECIMALS
        )}`,
    },
  ];

  const constructionSectionDivs = useMemo(() => {
    return [
      {
        type: "Physical Progress",
        actual: `${numberWithCommasAndFraction(
          data?.constructionProgress?.actualPhysicalProgress,
          import.meta.env.VITE_REACT_APP_PERCENTAGE_DECIMALS
        )}%`,
        planned: `${
          isUnderwrittenActive
            ? numberWithCommasAndFraction(
                data?.constructionProgress?.underwrittenPhysicalProgress,
                import.meta.env.VITE_REACT_APP_PERCENTAGE_DECIMALS
              )
            : numberWithCommasAndFraction(
                data?.constructionProgress?.businessPlanPhysicalProgress,
                import.meta.env.VITE_REACT_APP_PERCENTAGE_DECIMALS
              )
        }%`,
      },
      {
        type: "Overall Progress- Total Cost",
        actual: `${numberWithCommasAndFraction(
          data?.constructionProgress?.actualOverallProgressTotalCost,
          import.meta.env.VITE_REACT_APP_PERCENTAGE_DECIMALS
        )}%`,
        planned: `${
          isUnderwrittenActive
            ? numberWithCommasAndFraction(
                data?.constructionProgress
                  ?.underwrittenOverallProgressTotalCost,
                import.meta.env.VITE_REACT_APP_PERCENTAGE_DECIMALS
              )
            : numberWithCommasAndFraction(
                data?.constructionProgress
                  ?.businessPlanOverallProgressTotalCost,
                import.meta.env.VITE_REACT_APP_PERCENTAGE_DECIMALS
              )
        }%`,
      },
    ];
  }, [data, isUnderwrittenActive]);

  return (
    <div className="row">
      <div className="sales-graph-heading">Construction</div>
      <div className="col-md-12 col-sm-12">
        <div className="sales-graph-border">
          <div className="row">
            <div className="col-md-3 col-sm-12">
              <div className="p-1">
                <div className="d-flex justify-content-around sales-graph-border-twoSided">
                  <div>
                    <div className="box blackBox"></div>
                    <div className="boxText">Actual</div>
                  </div>
                  <div>
                    <div className="box whiteBox"></div>
                    <div className="boxText">Planned</div>
                  </div>
                </div>
                <div>
                  {constructionSectionDivs.map((item: any, index: number) => {
                    return (
                      <div key={index}>
                        <div className="big-box">
                          <div className="progress-text">{item.planned}</div>
                        </div>
                        <div className="small-box-1">
                          <div className="progress-text-inside">
                            {item.actual}
                          </div>
                        </div>
                        <p className="progress-below-div-text">{item.type}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="col-md-9 col-sm-12">
              <div className="sales-graph-border-twoSided">
                <div className="p-1">
                  <TableWithRedHeader
                    data={
                      dashboardDetails?.data?.constructionSectionTables || []
                    }
                    height="400px"
                    cols={constructionSectionTable}
                    showTotalRowAbove
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConstructionSection;
