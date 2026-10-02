import React, { useState, useMemo } from "react";
import FallBackUIDataNotAvailable from "../../../../../widgets/charts/FallBackUIDataNotAvailable";
import LineBarChart, {
  optionsType,
} from "../../../../../widgets/charts/Recharts/LineBarChart";
import { minMaxValueOfArrayofObject } from "../../../../../widgets/charts/Recharts/utils";
import CommonCustomTooltip from "../../../../../widgets/charts/Recharts/CommonCustomTooltip";
import { black, brightRed, lightGrey } from "../../../../../assets/colorConstants";
import { SlowMovingInventoryDetailsType } from "../../../../../lib/services/salesDashboard/dataTypes";

interface slowMovingInventoryGraphTypes {
  graphData: SlowMovingInventoryDetailsType[];
}

const SlowMovingInventoryPriceGraph: React.FC<
  slowMovingInventoryGraphTypes
> = ({ graphData }) => {
  const dataLength = graphData && graphData.length;
  const options: optionsType = useMemo(
    () => ({
      chartData: [
        {
          type: "bar",
          name: "Area",
          dataKey: "unSoldArea",
          fill: brightRed,
          yAxisId: "left-axis",
          stackId: "a",
          showLabel: false,
          labelBg: false,
          barSize: 10,
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
          barSize: 10,
        },
        {
          type: "line",
          name: "Sale Price",
          dataKey: "averageSalePrice",
          stroke: black,
          yAxisId: "right-axis",
          showLabel: false,
        },
      ],
      CustomTooltip: (
        <CommonCustomTooltip
          decimals={[
            import.meta.env.VITE_REACT_APP_AREA_DECIMAL,
            import.meta.env.VITE_REACT_APP_AREA_DECIMAL,
            import.meta.env.VITE_REACT_APP_INR_DECIMALS,
          ]}
        />
      ),
      xAxis: {
        dataKey: "unit",
        angle: dataLength > 7 ? -45 : 0,
      },
      yAxis: [
        {
          domain: minMaxValueOfArrayofObject(graphData, [
            "unSoldArea",
            "soldArea",
          ]),
          // label: "Area (per Sq.ft.)",
        },
        {
          domain: minMaxValueOfArrayofObject(graphData, ["averageSalePrice"]),
          // label: "Rate (per Sq.ft.)",
        },
      ],
    }),
    [graphData]
  );

  return (
    <div className="sales-graph-border">
      {dataLength > 0 ? (
        <LineBarChart graphData={graphData} options={options} ChartHeightSm />
      ) : (
        <FallBackUIDataNotAvailable />
      )}
    </div>
  );
};

export default SlowMovingInventoryPriceGraph;
