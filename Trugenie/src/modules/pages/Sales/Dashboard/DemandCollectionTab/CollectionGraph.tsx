import React, { useState, useMemo, useEffect } from "react";
import FallBackUIDataNotAvailable from "../../../../../widgets/charts/FallBackUIDataNotAvailable";
import {
  black,
  brightRed,
  darkCharcoalGrey,
  peach,
  silver,
} from "../../../../../assets/colorConstants";
import CommonCustomTooltip from "../../../../../widgets/charts/Recharts/CommonCustomTooltip";
import {
  minMaxValueOfArrayofObject,
  numConvertM,
} from "../../../../../widgets/charts/Recharts/utils";
import LineBarChart, {
  optionsType,
} from "../../../../../widgets/charts/Recharts/LineBarChart";
import { demandAndCollectionDataType } from "../../../../../lib/services/salesDashboard/dataTypes";
import { useSelector } from "react-redux";
import { getNumberSystem } from "../../../../../lib/services/common/selector";
import { convertDateFormatYY } from "../../../../../utils/commonFunctions";

const CollectionGraph: React.FC<{
  graphData: demandAndCollectionDataType[];
}> = ({ graphData }) => {
  const numberSystem = useSelector(getNumberSystem);
  const [data, setData] = useState<demandAndCollectionDataType[]>([]);

  useEffect(() => {
    if (graphData) {
      setData(
        graphData.map((v) => ({
          ...v,
          misDate: convertDateFormatYY(v.misDate),
        }))
      );
    } else setData([]);
  }, [graphData]);

  const options: optionsType = useMemo(
    () => ({
      chartData: [
        {
          type: "bar",
          name: "Collection Efficiency",
          dataKey: "collectionEfficiency",
          fill: silver,
          yAxisId: "right-axis",
          stackId: "a",
          showLabel: false,
          labelBg: false,
          barSize: 25,
        },
        {
          type: "line",
          name: "Cumulative Actual Collections",
          dataKey: "collectionAgainstSaleValue",
          stroke: black,
          yAxisId: "left-axis",
          showLabel: false,
          labelBg: false,
        },
        {
          type: "line",
          name: "Cumulative Actual Demand",
          dataKey: "actualDemand",
          stroke: brightRed,
          yAxisId: "left-axis",
          showLabel: false,
          labelBg: false,
        },
        {
          type: "line",
          name: "Cumulative Underwritten Collections",
          dataKey: "underWrittenCollection",
          stroke: peach,
          yAxisId: "left-axis",
          showLabel: false,
          labelBg: false,
        },
      ],
      CustomTooltip: (
        <CommonCustomTooltip
          decimals={[
            import.meta.env.VITE_REACT_APP_PERCENTAGE_DECIMALS,
            import.meta.env.VITE_REACT_APP_INR_DECIMALS,
            import.meta.env.VITE_REACT_APP_INR_DECIMALS,
            import.meta.env.VITE_REACT_APP_INR_DECIMALS,
          ]}
        />
      ),
      xAxis: {
        dataKey: "misDate",
      },
      yAxis: [
        {
          domain: minMaxValueOfArrayofObject(data, [
            "collectionAgainstSaleValue",
            "actualDemand",
            "underWrittenCollection",
          ]),
          label: `Amount (${numberSystem})`,
          // tickFormatter: (label: number) => {
          //   return numConvertM(label) + "M";
          // },
        },
        {
          domain: minMaxValueOfArrayofObject(data, ["collectionEfficiency"]),
          label: "Collection Efficiency (%)",
        },
      ],
    }),
    [data]
  );
  return (
    <div className="sales-graph-border">
      {data && data.length > 0 ? (
        <LineBarChart graphData={data} options={options} />
      ) : (
        <FallBackUIDataNotAvailable />
      )}
    </div>
  );
};

export default CollectionGraph;
