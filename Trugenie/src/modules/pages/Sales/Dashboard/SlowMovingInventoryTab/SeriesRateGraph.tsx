import React, { useState, useMemo } from "react";
import  FallBackUIDataNotAvailable from "../../../../../widgets/charts/FallBackUIDataNotAvailable";
import LineBarChart, {
  optionsType,
} from "../../../../../widgets/charts/Recharts/LineBarChart";
import { minMaxValueOfArrayofObject } from "../../../../../widgets/charts/Recharts/utils";
import CommonCustomTooltip from "../../../../../widgets/charts/Recharts/CommonCustomTooltip";
import { black, brightRed, lightGrey } from "../../../../../assets/colorConstants";

const SeriesRateGraph = () => {
  const graphData = [
    {
      series: 1,
      totalArea: 13000,
      soldArea: 10000,
      absorptionRate: 20,
    },
    {
      series: 2,
      totalArea: 10000,
      soldArea: 7000,
      absorptionRate: 60,
    },
    {
      series: 3,
      totalArea: 9000,
      soldArea: 5000,
      absorptionRate: 36,
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
          dataKey: "totalArea",
          fill: brightRed,
          yAxisId: "left-axis",
          stackId: "a",
          showLabel: false,
          labelBg: false,
          barSize: 20,
        },
        {
          type: "bar",
          name: "Sold",
          dataKey: "soldArea",
          fill: lightGrey,
          yAxisId: "left-axis",
          stackId: "b",
          showLabel: false,
          labelBg: false,
          barSize: 20,
        },
        {
          type: "line",
          name: "Absorption Rate",
          dataKey: "absorptionRate",
          stroke: black,
          yAxisId: "right-axis",
          showLabel: false,
        },
      ],
      CustomTooltip: CommonCustomTooltip,
      xAxis: {
        dataKey: "series",
      },
      yAxis: [
        {
          domain: minMaxValueOfArrayofObject(data, ["totalArea", "soldArea"]),
          // label: "Area (per Sq.ft.)",
        },
        {
          domain: minMaxValueOfArrayofObject(data, ["absorptionRate"]),
          // label: "Rate (per Sq.ft.)",
          unit: "%",
        },
      ],
    }),
    [data]
  );
  return (
    <div className="sales-graph-border">
      {dataLength > 0 ? (
        <LineBarChart graphData={data} options={options} ChartHeightSm />
      ) : (
        <FallBackUIDataNotAvailable />
      )}
    </div>
  );
};

export default SeriesRateGraph;
