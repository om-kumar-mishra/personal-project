import React, { useState, useMemo } from "react";
import FallBackUIDataNotAvailable from "../../../../../widgets/charts/FallBackUIDataNotAvailable";
import {
  brightRed,
  darkGrey,
  lightGrey,
} from "../../../../../assets/colorConstants";
import LineBarChart, {
  optionsType,
} from "../../../../../widgets/charts/Recharts/LineBarChart";
import { minMaxValueOfArrayofObject } from "../../../../../widgets/charts/Recharts/utils";
import CommonCustomTooltip from "../../../../../widgets/charts/Recharts/CommonCustomTooltip";

const CollectionPreInvestmentGraph = () => {
  const graphData = [
    {
      scheme: "CLP",
      area: 1276,
      rate: 7809,
    },
    {
      scheme: "Subvention",
      area: 127,
      rate: 780,
    },
  ];
  const [data, setData] = useState<any[]>(graphData);
  const dataLength = data && data.length;
  const options: optionsType = useMemo(
    () => ({
      chartData: [
        {
          type: "bar",
          name: "Area",
          dataKey: "area",
          fill: brightRed,
          yAxisId: "left-axis",
        },
        {
          type: "line",
          name: "Rate",
          dataKey: "rate",
          stroke: darkGrey,
          yAxisId: "right-axis",
          showLabel: false,
        },
      ],
      CustomTooltip: CommonCustomTooltip,
      xAxis: {
        dataKey: "scheme",
      },
      yAxis: [
        {
          domain: minMaxValueOfArrayofObject(data, ["area"]),
          label: "Area (per Sq.ft.)",
        },
        {
          domain: minMaxValueOfArrayofObject(data, ["rate"]),
          label: "Rate (per Sq.ft.)",
        },
      ],
    }),
    [data]
  );
  return (
    <div>
      <div style={{ marginLeft: "1.4em", fontSize: "12px", color: brightRed }}>
        Pre Investment
      </div>
      <div className="sales-graph-border">
        {dataLength > 0 ? (
          <LineBarChart graphData={data} options={options} ChartHeightSm/>
        ) : (
          <FallBackUIDataNotAvailable />
        )}
      </div>
    </div>
  );
};

export default CollectionPreInvestmentGraph;
