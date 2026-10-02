import React, { useEffect, useMemo, useState } from "react";
import FallBackUIDataNotAvailable from "../../../../../widgets/charts/FallBackUIDataNotAvailable";
import {
  groupByKeys,
  minMaxValueOfArrayofObject,
} from "../../../../../widgets/charts/Recharts/utils";
import LineBarChart, {
  optionsType,
} from "../../../../../widgets/charts/Recharts/LineBarChart";
import {
  black,
  brightRed,
  burntOrange,
  coral,
  darkBlue,
  darkCharcoalGrey,
  darkGrey,
} from "../../../../../assets/colorConstants";
import CommonCustomTooltip from "../../../../../widgets/charts/Recharts/CommonCustomTooltip";
import {
  convertDateFormatYY,
  toTitleCase,
} from "../../../../../utils/commonFunctions";
import GraphTypeFilterSpan from "../../../../../widgets/charts/Recharts/GraphTypeFilterSpan";
import { IndexSignatureStringType } from "../../../../../lib/services/Datatype";
import { ComparisonHistoricalPerformanceType } from "../../../../../lib/services/salesDashboard/dataTypes";

interface TypeFilter {
  key: string;
  title: string;
}

const ComparisonPerformanceHistoryGraph: React.FC<{
  graphData: ComparisonHistoricalPerformanceType[];
}> = ({ graphData }) => {
  const [data, setData] = useState<ComparisonHistoricalPerformanceType[]>([]);
  const [keys, setKeys] = useState<string[]>([]);
  const [type, setType] = useState<string>("projectphase");

  const typeFilter: TypeFilter[] = useMemo(
    () => [
      {
        key: "projectphase",
        title: "Phase",
      },
      {
        key: "subtype",
        title: "Sub-Type",
      },
      {
        key: "wing",
        title: "Wing",
      },
    ],
    []
  );

  useEffect(() => {
    const byTypeData = groupByKeys(graphData, type, "monthEnd", "rate");
    const dataResult = byTypeData.result.map((v: IndexSignatureStringType) => ({
      ...v,
      monthEnd: v.monthEnd ? convertDateFormatYY(v.monthEnd) : v.monthEnd,
    }));
    setData(dataResult);
    setKeys(byTypeData.keys);
  }, [type]);

  const colors = [
    brightRed,
    darkCharcoalGrey,
    darkGrey,
    black,
    burntOrange,
    darkBlue,
    coral,
  ];

  const options: optionsType = useMemo(
    () => ({
      chartData: keys.map((v, i) => ({
        type: "line",
        name: toTitleCase(v),
        dataKey: v,
        stroke: colors[i],
        dot: false,
      })),

      CustomTooltip: <CommonCustomTooltip decimals={[0, 0, 0, 0, 0]} />,
      xAxis: {
        dataKey: "monthEnd",
        label: "Date",
        angle: -45,
      },
      yAxis: [
        {
          domain:
            keys.length > 0
              ? minMaxValueOfArrayofObject(data, keys)
              : ["auto", "auto"],
          label: "Rate (per Sq.ft.)",
        },
      ],
    }),
    [data, keys]
  );
  return (
    <div className="col-md-6 col-sm-12">
      <div className="sales-graph-border">
        {/* <div className="d-flex flex-wrap">
          <GraphTypeFilterSpan
            type={type}
            typeFilter={typeFilter}
            setType={setType}
          />
        </div> */}
        {data && data.length > 0 ? (
          <LineBarChart graphData={data} options={options} ChartHeightSm />
        ) : (
          <FallBackUIDataNotAvailable />
        )}
      </div>
    </div>
  );
};

export default ComparisonPerformanceHistoryGraph;
