import React, { useMemo, useCallback } from "react";
import FallBackUIDataNotAvailable from "../../../../../widgets/charts/FallBackUIDataNotAvailable";
import { black, brightRed, silver } from "../../../../../assets/colorConstants";
import CommonCustomTooltip from "../../../../../widgets/charts/Recharts/CommonCustomTooltip";
import CustomPieChart, {
  PieOptionsType,
} from "../../../../../widgets/charts/Recharts/CustomPieChart";
import { fundingType } from "../../../../../lib/services/salesDashboard/dataTypes";
import {
  numberWithCommasAndFraction,
} from "../../../../../widgets/charts/Recharts/utils";

const CollectionPreInvestmentPieGraph: React.FC<{
  graphData: fundingType[];
}> = ({ graphData }) => {
  const colors = [brightRed, silver, black];

  const data: fundingType[] =
    graphData && graphData.length > 0
      ? graphData.map((v: fundingType, i: number) => ({
          ...v,
          fill: colors[i],
          name: v.schema,
          value: v.area,
        }))
      : [];

  const labelFormatter = useCallback((obj: any) => {
    const span = (
      <>
        <tspan textAnchor={obj.textAnchor}>
          <tspan className="bold-text">{obj.name}</tspan>,
          {numberWithCommasAndFraction(
            obj.value,
            import.meta.env.VITE_REACT_APP_AREA_DECIMAL
          )}
        </tspan>
      </>
    );
    return span;
  }, []);

  const options: PieOptionsType = useMemo(
    () => ({
      pie: {
        outerRadius: 105,
        labelLine: false,
      },
      legend: {
        verticalAlign: "top",
        layout: "horizontal",
        align: "left",
      },
      CustomTooltip: (
        <CommonCustomTooltip
          pie
          decimals={[import.meta.env.VITE_REACT_APP_AREA_DECIMAL]}
        />
      ),
      labelFormater: labelFormatter,
    }),
    [labelFormatter]
  );

  return (
    <div>
      <div style={{ marginLeft: "1.4em", fontSize: "12px", color: brightRed }}>
        Pre Investment
      </div>
      <div className="sales-graph-border">
        {data && data.length > 0 ? (
          <CustomPieChart data={data} options={options} />
        ) : (
          <FallBackUIDataNotAvailable />
        )}
      </div>
    </div>
  );
};

export default CollectionPreInvestmentPieGraph;
