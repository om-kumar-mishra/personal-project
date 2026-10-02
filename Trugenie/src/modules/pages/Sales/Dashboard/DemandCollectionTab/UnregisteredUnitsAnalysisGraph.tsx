import React, { useState, useMemo } from "react";
import  FallBackUIDataNotAvailable  from "../../../../../widgets/charts/FallBackUIDataNotAvailable";
import CommonCustomTooltip from "../../../../../widgets/charts/Recharts/CommonCustomTooltip";
import { minMaxValueOfArrayofObject } from "../../../../../widgets/charts/Recharts/utils";
import {
  brightRed,
  darkCharcoalGrey,
  lightGrey,
} from "../../../../../assets/colorConstants";
import LineBarChart, {
  optionsType,
} from "../../../../../widgets/charts/Recharts/LineBarChart";

interface UnregisteredUnitsAnalysisType {
  title: string;
  amountDemanded: number;
  receivedTillDate: number;
  soldArea: number;
}
const graphData = [
  {
    title: "Demanded and Collected",
    amountDemanded: 13000,
    receivedTillDate: 10000,
    soldArea: 20000,
  },
  {
    title: "Demanded but No Collection",
    amountDemanded: 10000,
    receivedTillDate: 9000,
    soldArea: 10000,
  },
  {
    title: "Demanded but Not entirely Collected",
    amountDemanded: 18000,
    receivedTillDate: 15000,
    soldArea: 30000,
  },
  {
    title: "Not Demanded",
    amountDemanded: 15000,
    receivedTillDate: 11000,
    soldArea: 40000,
  },
];
const UnregisteredUnitsAnalysisGraph = () => {
  const [data, setData] = useState<UnregisteredUnitsAnalysisType[]>(graphData);
  const dataLength = data && data.length;
  const options: optionsType = useMemo(
    () => ({
      chartData: [
        {
          type: "bar",
          name: "Amount Demanded",
          dataKey: "amountDemanded",
          fill: brightRed,
          yAxisId: "left-axis",
          stackId: "a",
          showLabel: false,
          labelBg: false,
        },
        {
          type: "bar",
          name: "Received Till Date",
          dataKey: "receivedTillDate",
          fill: lightGrey,
          yAxisId: "left-axis",
          stackId: "b",
          showLabel: false,
          labelBg: false,
        },
        {
          type: "line",
          name: "Sold Area",
          dataKey: "soldArea",
          stroke: darkCharcoalGrey,
          yAxisId: "right-axis",
          showLabel: false,
        },
      ],
      CustomTooltip: CommonCustomTooltip,
      xAxis: {
        dataKey: "title",
        customizedAxisTick: 1,
      },
      yAxis: [
        {
          domain: minMaxValueOfArrayofObject(data, [
            "amountDemanded",
            "receivedTillDate",
          ]),
          label: "Area (per Sq.ft.)",
        },
        {
          domain: minMaxValueOfArrayofObject(data, ["soldArea"]),
          label: "Rate (per Sq.ft.)",
        },
      ],
    }),
    [data]
  );
  return (
    <div>
      <div className="sales-graph-heading">Unregistered Units Analysis</div>
      <div className="sales-graph-border">
        {dataLength > 0 ? (
          <LineBarChart graphData={data} options={options} />
        ) : (
          <FallBackUIDataNotAvailable />
        )}
      </div>
    </div>
  );
};

export default UnregisteredUnitsAnalysisGraph;
