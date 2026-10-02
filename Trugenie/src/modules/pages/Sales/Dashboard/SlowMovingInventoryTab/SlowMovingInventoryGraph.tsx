import React, { useState, useMemo } from "react";
import FallBackUIDataNotAvailable from "../../../../../widgets/charts/FallBackUIDataNotAvailable";
import LineBarChart, {
  optionsType,
} from "../../../../../widgets/charts/Recharts/LineBarChart";
import {
  numberWithCommasAndFraction,
  minMaxValueOfArrayofObject,
} from "../../../../../widgets/charts/Recharts/utils";
import CommonCustomTooltip from "../../../../../widgets/charts/Recharts/CommonCustomTooltip";
import { brightRed } from "../../../../../assets/colorConstants";
import { SlowMovingInventorySummaryType } from "../../../../../lib/services/salesDashboard/dataTypes";

const SlowMovingInventoryGraph: React.FC<{
  data: SlowMovingInventorySummaryType[];
  setInventoryObj: (obj: string) => void;
}> = ({ data, setInventoryObj }) => {
  const options: optionsType = useMemo(
    () => ({
      chartData: [
        {
          type: "bar",
          name: "Slow Moving Threshold",
          dataKey: "particularsValue",
          fill: brightRed,
          yAxisId: "left-axis",
          stackId: "a",
          showLabel: true,
          labelBg: false,
          barSize: 40,
          labelFormatter: (val) => {
            return `${numberWithCommasAndFraction(
              val,
              import.meta.env.VITE_REACT_APP_PERCENTAGE_DECIMALS
            )}%`;
          },
          onClick: (obj) => {
            setInventoryObj(obj.particulars);
          },
        },
      ],
      CustomTooltip: (
        <CommonCustomTooltip
          decimals={[import.meta.env.VITE_REACT_APP_PERCENTAGE_DECIMALS]}
        />
      ),
      xAxis: {
        dataKey: "particulars",
        label: "Parameters",
      },
      yAxis: [
        {
          domain: minMaxValueOfArrayofObject(data, ["particularsValue"], true),
          unit: "%",
        },
      ],
    }),
    [data]
  );
  return (
    <div className="row">
      <div className="sales-graph-heading">
        Slow Moving Inventory (In Unsold Inventory)
      </div>
      <div className="col-md-12">
        <div className="sales-graph-border">
          {data && data.length > 0 ? (
            <LineBarChart graphData={data} options={options} ChartHeightSm />
          ) : (
            <FallBackUIDataNotAvailable />
          )}
        </div>
      </div>
    </div>
  );
};

export default SlowMovingInventoryGraph;
