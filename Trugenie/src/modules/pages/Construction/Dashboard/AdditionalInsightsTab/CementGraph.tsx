import React, { useEffect, useMemo, useState } from "react";
import { convertDateFormatMMMYY } from "../../../../../utils/commonFunctions";
import { cementListType } from "../../../../../lib/services/constructionDashboardv2/dataType";
import LineBarChart, { optionsType } from "../../../../../widgets/charts/Recharts/LineBarChart";
import { black, brightRed } from "../../../../../assets/colorConstants";
import CommonCustomTooltip from "../../../../../widgets/charts/Recharts/CommonCustomTooltip";
import { minMaxValueOfArrayofObject } from "../../../../../widgets/charts/Recharts/utils";
import FallBackUIDataNotAvailable from "../../../../../widgets/charts/FallBackUIDataNotAvailable";

interface CementListProps {
  graphData: cementListType[];
}

const CementGraph: React.FC<CementListProps> = ({ graphData }) => {
  const [data, setData] = useState(graphData);

  useEffect(() => {
    const dataResult = graphData.map((v) => ({
      ...v,
      qe: v.qe ? convertDateFormatMMMYY(v.qe) : v.qe,
    }));
    setData(dataResult);
  }, [graphData]);

  const dataLength = data && data.length;
  const options: optionsType = useMemo(
    () => ({
      chartData: [
        {
          type: "line",
          name: "Pozzolana Cement",
          dataKey: "pozzolana_cement",
          stroke: brightRed,
          showLabel: false,
        },
        {
          type: "line",
          name: "Ordinary Portland Cement",
          dataKey: "ordinary_portland_cement",
          stroke: black,
          showLabel: false,
        },
      ],
      CustomTooltip: (
        <CommonCustomTooltip
          decimals={[
            import.meta.env.VITE_REACT_APP_UNIT_DECIMAL,
            import.meta.env.VITE_REACT_APP_UNIT_DECIMAL,
          ]}
        />
      ),
      xAxis: {
        dataKey: "qe",
        angle: -45,
      },
      yAxis: [
        {
          domain: minMaxValueOfArrayofObject(data, [
            "pozzolana_cement",
            "ordinary_portland_cement",
          ]),
        },
      ],
    }),
    [data]
  );
  return (
    <div>
      <div className="sales-graph-border">
        {dataLength > 0 ? (
          <LineBarChart graphData={data} options={options} ChartHeightSm />
        ) : (
          <FallBackUIDataNotAvailable sm />
        )}
      </div>
    </div>
  );
};

export default CementGraph;
