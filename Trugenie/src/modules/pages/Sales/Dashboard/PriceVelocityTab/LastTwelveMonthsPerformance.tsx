import React, { useMemo, useState, useEffect } from "react";
import FallBackUIDataNotAvailable from "../../../../../widgets/charts/FallBackUIDataNotAvailable";
import LineBarChart, {
  optionsType,
} from "../../../../../widgets/charts/Recharts/LineBarChart";
import {
  minMaxValueOfArrayofObject,
  numberWithCommasAndFraction,
} from "../../../../../widgets/charts/Recharts/utils";
import CommonCustomTooltip from "../../../../../widgets/charts/Recharts/CommonCustomTooltip";
import { brightRed, darkGrey } from "../../../../../assets/colorConstants";
import { trailing12MonthsPerformancesType } from "../../../../../lib/services/salesDashboard/dataTypes";
import { getMonthName } from "../../../../../utils/commonFunctions";

const LastTwelveMonthsPerformance: React.FC<{
  graphData: trailing12MonthsPerformancesType[];
}> = ({ graphData }) => {
  const [data, setData] = useState<trailing12MonthsPerformancesType[]>([]);

  useEffect(() => {
    if (graphData && graphData.length > 0) {
      const data = graphData.map((v) => ({
        ...v,
        trailingPeriod: `${getMonthName(v.projectionMonth)} ${
          v.projectionYear
        }`,
      }));
      setData(data);
    } else setData([]);
  }, [graphData]);

  const options: optionsType = useMemo(
    () => ({
      chartData: [
        {
          type: "bar",
          name: "Area Sold",
          dataKey: "area",
          fill: brightRed,
          yAxisId: "left-axis",
          showLabel: true,
          barSize: 40,
          labelFormatter: (obj: number) => {
            return numberWithCommasAndFraction(
              obj,
              import.meta.env.VITE_REACT_APP_AREA_DECIMAL
            );
          },
        },
        {
          type: "line",
          name: "Avg. Sell Rate",
          dataKey: "rate",
          stroke: darkGrey,
          yAxisId: "right-axis",
          showLabel: true,
          labelFormatter: (obj: number) => {
            return numberWithCommasAndFraction(
              obj,
              import.meta.env.VITE_REACT_APP_RATE_DECIMAL
            );
          },
        },
      ],

      CustomTooltip: (
        <CommonCustomTooltip
          decimals={[
            import.meta.env.VITE_REACT_APP_AREA_DECIMAL,
            import.meta.env.VITE_REACT_APP_RATE_DECIMAL,
          ]}
        />
      ),
      xAxis: {
        dataKey: "trailingPeriod",
        label: "Year",
        customizedAxisTick: 1,
        minLength: 3,
        // angle: -45,
      },
      yAxis: [
        {
          domain: minMaxValueOfArrayofObject(graphData, ["area"]),
          label: "Area (In Sq. Ft.)",
        },
        {
          domain: minMaxValueOfArrayofObject(graphData, ["rate"]),
          label: "Rate (Per Sq. Ft.)",
        },
      ],
    }),
    [data]
  );

  return (
    <div className="row mt-4">
      <div className="sales-graph-heading">L12 Months Performace</div>
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

export default LastTwelveMonthsPerformance;
