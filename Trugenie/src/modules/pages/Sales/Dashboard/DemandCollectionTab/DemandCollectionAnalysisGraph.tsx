import React, { useState, useEffect } from "react";
import FallBackUIDataNotAvailable from "../../../../../widgets/charts/FallBackUIDataNotAvailable";

import CustomPieChart, {
  PieOptionsType,
} from "../../../../../widgets/charts/Recharts/CustomPieChart";
import CommonCustomTooltip from "../../../../../widgets/charts/Recharts/CommonCustomTooltip";
import {
  black,
  brightRed,
  burntOrange,
  lightGrey,
} from "../../../../../assets/colorConstants";

const DemandCollectionAnalysisGraph = () => {
  const graphData: any[] = [
    {
      name: "Demanded but Partially Collected",
      value: 290264,
    },
    {
      name: "Demanded and Fully Collected",
      value: 103952,
    },
    {
      name: "Demanded but Nil Collected",
      value: 3785,
    },
    {
      name: "Nil Demanded",
      value: 227368,
    },
  ];
  // const [data, setData] = useState<any[]>([]);
  const colors = [brightRed, burntOrange, black, lightGrey];

  const data: any[] =
    graphData && graphData.length > 0
      ? graphData.map((v: any, i: number) => ({
          ...v,
          fill: colors[i],
        }))
      : [];

  const options: PieOptionsType = {
    pie: {
      outerRadius: 105,
      innerRadius: 40,
    },
    legend: {
      verticalAlign: "top",
      layout: "horizontal",
      align: "center",
    },
    CustomTooltip: CommonCustomTooltip,
  };
  return (
    <div>
      <div className="sales-graph-heading" style={{ paddingLeft: "1.5em" }}>
        Demand vs Collection Analysis
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

export default DemandCollectionAnalysisGraph;
