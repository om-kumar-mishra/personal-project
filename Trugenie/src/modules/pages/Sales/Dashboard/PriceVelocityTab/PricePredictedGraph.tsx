import React, { useEffect, useMemo, useState } from "react";
import FallBackUIDataNotAvailable from "../../../../../widgets/charts/FallBackUIDataNotAvailable";
import { minMaxValueOfArrayofObject } from "../../../../../widgets/charts/Recharts/utils";
import CommonCustomTooltip from "../../../../../widgets/charts/Recharts/CommonCustomTooltip";
import {
  brightRed,
  darkCharcoalGrey,
  darkGrey,
} from "../../../../../assets/colorConstants";
import LineBarChart, {
  optionsType,
} from "../../../../../widgets/charts/Recharts/LineBarChart";
import { getMonthName } from "../../../../../utils/commonFunctions";
import { pricehistoricFutureType } from "../../../../../lib/services/salesDashboard/dataTypes";

const PricePredictedGraph: React.FC<{
  graphData: pricehistoricFutureType[];
  domain: string[] | number[];
}> = ({ graphData, domain }) => {
  const [data, setData] = useState<pricehistoricFutureType[]>([]);

  useEffect(() => {
    if (graphData && graphData.length > 0) {
      const data = graphData.map((v) => ({
        ...v,
        monthyear: `${getMonthName(v.projectionMonth)} ${v.projectionYear}`,
      }));
      setData(data);
    } else setData([]);
  }, [graphData]);

  const options: optionsType = useMemo(
    () => ({
      chartData: [
        {
          type: "line",
          name: "Underwritten",
          dataKey: "rateUnderWritten",
          stroke: brightRed,
          dot: false,
        },
        {
          type: "line",
          name: "Business Plan",
          dataKey: "rateBusinessPlan",
          stroke: darkCharcoalGrey,
          dot: false,
        },
        {
          type: "line",
          name: "Projected",
          dataKey: "rate",
          stroke: darkGrey,
          dot: false,
        },
      ],

      CustomTooltip: (
        <CommonCustomTooltip
          decimals={[
            import.meta.env.VITE_REACT_APP_RATE_DECIMAL,
            import.meta.env.VITE_REACT_APP_RATE_DECIMAL,
            import.meta.env.VITE_REACT_APP_RATE_DECIMAL,
          ]}
        />
      ),
      xAxis: {
        dataKey: "monthyear",
        label: "Month-Year",
        customizedAxisTick: 0,
        minLength: 3,
        angle: -45,
      },
      yAxis: [
        {
          domain: domain,
          label: "Rate (per Sq.ft.)",
        },
      ],
    }),
    [data, domain]
  );
  return (
    <div className="col-md-6 col-sm-12">
      <div className="sales-graph-sub-heading">Going Forward</div>
      <div className="sales-graph-border">
        {data && data.length > 0 ? (
          <LineBarChart graphData={data} options={options} ChartHeightSm />
        ) : (
          <FallBackUIDataNotAvailable sm />
        )}
      </div>
    </div>
  );
};

export default PricePredictedGraph;
