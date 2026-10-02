import React, { useEffect, useMemo, useState } from "react";
import { customStyle } from "../style";
import { useSelector } from "react-redux";
import { ConstructionCumulativeCostScheduleList } from "../../../../../lib/services/constructionDashboardv2/dataType";
import { getNumberSystem } from "../../../../../lib/services/common/selector";
import { convertDateFormatMMMYY } from "../../../../../utils/commonFunctions";
import LineBarChart, { optionsType } from "../../../../../widgets/charts/Recharts/LineBarChart";
import { black, brightRed, darkGrey } from "../../../../../assets/colorConstants";
import CommonCustomTooltip from "../../../../../widgets/charts/Recharts/CommonCustomTooltip";
import FallBackUIDataNotAvailable from "../../../../../widgets/charts/FallBackUIDataNotAvailable";

interface CostScheduleHistoryProps {
  graphData: ConstructionCumulativeCostScheduleList[];
  domain: string[] | number[];
  activeBtn: string;
}

const CostScheduleHistory: React.FC<CostScheduleHistoryProps> = ({
  graphData,
  domain,
  activeBtn,
}) => {
  const numberSystem = useSelector(getNumberSystem);
  const [data, setData] = useState(graphData);

  useEffect(() => {
    const dataResult = graphData.map((v) => ({
      ...v,
      projectionDate: v.projectionDate
        ? convertDateFormatMMMYY(v.projectionDate)
        : v.projectionDate,
    }));
    setData(dataResult);
  }, [graphData]);

  const dataLength = data && data.length;
  const options: optionsType = useMemo(
    () => ({
      chartData: [
        {
          type: "line",
          name: activeBtn,
          dataKey:
            activeBtn === "UnderWritten" ? "underwritten" : "businnesPlan",
          stroke: activeBtn === "UnderWritten" ? brightRed : black,
          showLabel: false,
          dot: false,
        },
        {
          type: "line",
          name: "Actual",
          dataKey: "actual",
          stroke: darkGrey,
          showLabel: false,
          dot: false,
        },
      ],
      CustomTooltip: (
        <CommonCustomTooltip
          decimals={[
            import.meta.env.VITE_REACT_APP_INR_DECIMALS,
            import.meta.env.VITE_REACT_APP_INR_DECIMALS,
            import.meta.env.VITE_REACT_APP_INR_DECIMALS,
          ]}
        />
      ),
      xAxis: {
        dataKey: "projectionDate",
        angle: -45,
      },
      yAxis: [
        {
          domain,
          label: `Amount (${numberSystem})`,
        },
      ],
    }),
    [data, domain, activeBtn]
  );
  return (
    <div>
      <div style={customStyle.constructionSubheader}>History</div>
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

export default CostScheduleHistory;
