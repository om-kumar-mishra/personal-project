import React, { useMemo, useState } from "react";
import LineBarChart, {
  optionsType,
} from "../../../../../widgets/charts/Recharts/LineBarChart";
import FallBackUIDataNotAvailable from "../../../../../widgets/charts/FallBackUIDataNotAvailable";
import {
  minMaxValueOfArrayofObject,
  numConvertM,
} from "../../../../../widgets/charts/Recharts/utils";
import CommonCustomTooltip from "../../../../../widgets/charts/Recharts/CommonCustomTooltip";
import { black, brightRed, silver } from "../../../../../assets/colorConstants";
import { QualityOfBalanceRecivablesTableResponseType } from "../../../../../lib/services/salesDashboard/dataTypes";
import { useSelector } from "react-redux";
import { getNumberSystem } from "../../../../../lib/services/common/selector";

interface QualityOfBalanceReceivableProps {
  graphData: QualityOfBalanceRecivablesTableResponseType[];
}

const QualityOfBalanceReceivable: React.FC<QualityOfBalanceReceivableProps> = ({
  graphData,
}) => {
  const numberSystem = useSelector(getNumberSystem);
  const dataLength = graphData && graphData.length;
  const options: optionsType = useMemo(
    () => ({
      chartData: [
        {
          type: "bar",
          name: "Total Future Receivables against Overdue Bucket",
          dataKey: "totalBalanceReceivable",
          fill: silver,
          yAxisId: "left-axis",
          stackId: "a",
          showLabel: false,
          labelBg: false,
          barSize: 25,
        },
        {
          type: "bar",
          name: "Overdue Amount",
          dataKey: "overdue",
          fill: brightRed,
          yAxisId: "left-axis",
          stackId: "b",
          showLabel: false,
          labelBg: false,
          barSize: 25,
        },
        {
          type: "line",
          name: "Collection Efficency",
          dataKey: "collectionEfficency",
          stroke: black,
          yAxisId: "right-axis",
          showLabel: false,
          labelBg: false,
        },
      ],
      CustomTooltip: (
        <CommonCustomTooltip
          decimals={[
            import.meta.env.VITE_REACT_APP_INR_DECIMALS,
            import.meta.env.VITE_REACT_APP_INR_DECIMALS,
            import.meta.env.VITE_REACT_APP_PERCENTAGE_DECIMALS,
          ]}
        />
      ),
      xAxis: {
        dataKey: "daysForWhichAmountDemandedIsOverdue",
      },
      yAxis: [
        {
          domain: minMaxValueOfArrayofObject(graphData, [
            "totalBalanceReceivable",
            "overdue",
          ]),
          label: `Amount (${numberSystem})`,
          // tickFormatter: (label: number) => {
          //   return numConvertM(label) + "M";
          // },
        },
        {
          domain: minMaxValueOfArrayofObject(graphData, [
            "collectionEfficency",
          ]),
          label: "Collection Efficiency (%)",
        },
      ],
    }),
    [graphData]
  );
  return (
    <div className="sales-graph-border">
      {dataLength > 0 ? (
        <LineBarChart graphData={graphData} options={options} />
      ) : (
        <FallBackUIDataNotAvailable />
      )}
    </div>
  );
};

export default QualityOfBalanceReceivable;
