import React, { useEffect, useMemo, useState } from "react";
import  FallBackUIDataNotAvailable from "../../../../../widgets/charts/FallBackUIDataNotAvailable";
import LineBarChart, {
  optionsType,
} from "../../../../../widgets/charts/Recharts/LineBarChart";
import CommonCustomTooltip from "../../../../../widgets/charts/Recharts/CommonCustomTooltip";
import {
  brightRed,
  darkCharcoalGrey,
  darkGrey,
} from "../../../../../assets/colorConstants";
import { getMonthName } from "../../../../../utils/commonFunctions";
import { velocityhistoricFutureType } from "../../../../../lib/services/salesDashboard/dataTypes";

const VelocityHistoryGraph: React.FC<{
  graphData: velocityhistoricFutureType[];
  domain: string[] | number[];
}> = ({ graphData, domain }) => {
  const [data, setData] = useState<velocityhistoricFutureType[]>([]);

  useEffect(() => {
    if (graphData && graphData.length > 0) {
      const data = graphData.map((v) => ({
        ...v,
        monthyear: `${getMonthName(v.projectionMonth)} ${v.projectionYear}`,
        // realisedRate: v.realisedRate !== 0 ? v.realisedRate : null,
        // areaUnderWritten: v.areaUnderWritten !== 0 ? v.areaUnderWritten : null,
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
          dataKey: "areaUnderWritten",
          stroke: brightRed,
          dot: false,
        },
        {
          type: "line",
          name: "Business Plan",
          dataKey: "areaBusinessPlan",
          stroke: darkCharcoalGrey,
          dot: false,
        },
        {
          type: "line",
          name: "Realised",
          dataKey: "areaSold",
          stroke: darkGrey,
          dot: false,
        },
      ],

      CustomTooltip: (
        <CommonCustomTooltip
          decimals={[
            import.meta.env.VITE_REACT_APP_AREA_DECIMAL,
            import.meta.env.VITE_REACT_APP_AREA_DECIMAL,
            import.meta.env.VITE_REACT_APP_AREA_DECIMAL,
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
          domain,
          label: "Area (In Sq.ft.)",
        },
      ],
    }),
    [data, domain]
  );
  return (
    <div className="col-md-6 col-sm-12">
      <div className="sales-graph-sub-heading">Till Date</div>
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

export default VelocityHistoryGraph;
