import React, { useState, useMemo } from "react";
import FallBackUIDataNotAvailable from "../../../../../widgets/charts/FallBackUIDataNotAvailable";
import LineBarChart, {
  optionsType,
} from "../../../../../widgets/charts/Recharts/LineBarChart";
import { minMaxValueOfArrayofObject } from "../../../../../widgets/charts/Recharts/utils";
import CommonCustomTooltip from "../../../../../widgets/charts/Recharts/CommonCustomTooltip";
import {
  brightRed,
  darkCharcoalGrey,
  lightGrey,
} from "../../../../../assets/colorConstants";
import AgeingAnalysisTable from "./AgeingAnalysisTable";

const AgeingAnalysisGraph = () => {
  const graphData = [
    {
      range: "0",
      saleValue: 12767,
      amountDemanded: 7809,
      overdue: 678,
    },
    {
      range: "1-30",
      saleValue: 127687,
      amountDemanded: 78909,
      overdue: 6788,
    },
  ];
  const [data, setData] = useState<any[]>(graphData);
  const [ageingAnalysisIndex, setAgeingAnalysisIndex] = useState<
    number | undefined
  >(undefined);
  const dataLength = data && data.length;
  const options: optionsType = useMemo(
    () => ({
      chartData: [
        {
          type: "bar",
          name: "Sale Value",
          dataKey: "saleValue",
          fill: brightRed,
          yAxisId: "left-axis",
          stackId: "a",
          showLabel: false,
          labelBg: false,
          onClick: (obj, index) => setAgeingAnalysisIndex(index),
        },
        {
          type: "bar",
          name: "Amount Demanded",
          dataKey: "amountDemanded",
          fill: darkCharcoalGrey,
          yAxisId: "left-axis",
          stackId: "b",
          showLabel: false,
          labelBg: false,
          onClick: (obj, index) => setAgeingAnalysisIndex(index),
        },
        {
          type: "bar",
          name: "Overdue",
          dataKey: "overdue",
          fill: lightGrey,
          yAxisId: "left-axis",
          stackId: "c",
          showLabel: false,
          labelBg: false,
          onClick: (obj, index) => setAgeingAnalysisIndex(index),
        },
      ],
      CustomTooltip: CommonCustomTooltip,
      xAxis: {
        dataKey: "range",
      },
      yAxis: [
        {
          domain: minMaxValueOfArrayofObject(data, [
            "saleValue",
            "amountDemanded",
            "overdue",
          ]),
          label: "Amount (per Sq.ft.)",
        },
      ],
    }),
    [data]
  );
  return (
    <div className="row mt-5">
      <div className="sales-graph-heading">Ageing Analysis</div>
      <div className="col-md-12">
        <div className="sales-graph-border">
          {dataLength > 0 ? (
            <LineBarChart graphData={data} options={options} ChartHeightSm />
          ) : (
            <FallBackUIDataNotAvailable />
          )}
        </div>
      </div>
      {ageingAnalysisIndex !== undefined && <AgeingAnalysisTable />}
    </div>
  );
};

export default AgeingAnalysisGraph;
