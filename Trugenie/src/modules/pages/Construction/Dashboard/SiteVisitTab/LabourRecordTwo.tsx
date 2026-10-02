import React, { useEffect, useMemo, useState } from "react";
import { customStyle } from "../style";
import { labourRecordListType } from "../../../../../lib/services/constructionDashboardv2/dataType";
import { convertDateFormatMMMYY } from "../../../../../utils/commonFunctions";
import LineBarChart, { optionsType } from "../../../../../widgets/charts/Recharts/LineBarChart";
import { darkGrey } from "../../../../../assets/colorConstants";
import CommonCustomTooltip from "../../../../../widgets/charts/Recharts/CommonCustomTooltip";
import FallBackUIDataNotAvailable from "../../../../../widgets/charts/FallBackUIDataNotAvailable";

interface LabourRecordListProps {
  graphData: labourRecordListType[];
  domain: string[] | number[];
}

const LabourRecordTwo: React.FC<LabourRecordListProps> = ({
  graphData,
  domain,
}) => {
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
          name: "Projected Labour Count (PMC)",
          dataKey: "projectedValue",
          stroke: darkGrey,
          showLabel: false,
          dot: false,
        },
      ],
      CustomTooltip: (
        <CommonCustomTooltip
          decimals={[import.meta.env.VITE_REACT_APP_UNIT_DECIMAL]}
        />
      ),
      xAxis: {
        dataKey: "projectionDate",
        angle: -45,
      },
      yAxis: [
        {
          domain: domain,
          label: "No. of Labours",
        },
      ],
    }),
    [data, domain]
  );
  return (
    <div>
      <div style={customStyle.constructionSubheader}>Projected</div>
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

export default LabourRecordTwo;
