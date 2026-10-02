import React, { useState, useMemo } from "react";
import FallBackUIDataNotAvailable from "../../../../../widgets/charts/FallBackUIDataNotAvailable";
import LineBarChart, {
  optionsType,
} from "../../../../../widgets/charts/Recharts/LineBarChart";
import { minMaxValueOfArrayofObject } from "../../../../../widgets/charts/Recharts/utils";
import CommonCustomTooltip from "../../../../../widgets/charts/Recharts/CommonCustomTooltip";
import { black, brightRed, lightGrey } from "../../../../../assets/colorConstants";

const FloorAnalysisPriceGraph = () => {
  const graphData = [
    {
      floor: 1,
      totalArea: 13000,
      soldArea: 10000,
      salePrice: 20300,
    },
    {
      floor: 2,
      totalArea: 10000,
      soldArea: 7000,
      salePrice: 60200,
    },
    {
      floor: 3,
      totalArea: 9000,
      soldArea: 5000,
      salePrice: 3600,
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
          name: "Sale Price",
          dataKey: "salePrice",
          stroke: black,
          yAxisId: "right-axis",
          showLabel: false,
        },
      ],
      CustomTooltip: CommonCustomTooltip,
      xAxis: {
        dataKey: "floor",
      },
      yAxis: [
        {
          domain: minMaxValueOfArrayofObject(data, ["totalArea", "soldArea"]),
          // label: "Area (per Sq.ft.)",
        },
        {
          domain: minMaxValueOfArrayofObject(data, ["salePrice"]),
          // label: "Rate (per Sq.ft.)",
        },
      ],
    }),
    [data]
  );
  return (
    <div className="sales-graph-border">
      {dataLength > 0 ? (
        <LineBarChart graphData={data} options={options} ChartHeightSm/>
      ) : (
        <FallBackUIDataNotAvailable />
      )}
    </div>
  );
};

export default FloorAnalysisPriceGraph;
