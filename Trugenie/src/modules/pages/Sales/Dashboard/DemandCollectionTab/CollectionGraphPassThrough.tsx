import React, { useState, useMemo, useEffect } from "react";
import FallBackUIDataNotAvailable from "../../../../../widgets/charts/FallBackUIDataNotAvailable";
import { black, brightRed } from "../../../../../assets/colorConstants";
import CommonCustomTooltip from "../../../../../widgets/charts/Recharts/CommonCustomTooltip";
import { minMaxValueOfArrayofObject } from "../../../../../widgets/charts/Recharts/utils";
import LineBarChart, {
  optionsType,
} from "../../../../../widgets/charts/Recharts/LineBarChart";
import { demandAndCollectionDataType } from "../../../../../lib/services/salesDashboard/dataTypes";
import { useSelector } from "react-redux";
import { getNumberSystem } from "../../../../../lib/services/common/selector";
import { convertDateFormatYY } from "../../../../../utils/commonFunctions";

const CollectionGraphPassThrough: React.FC<{
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
          type: "line",
          name: "Pass Through Charges Liability",
          dataKey: "liabilityAgainstPassThorughCharges",
          stroke: brightRed,
          yAxisId: "left-axis",
          showLabel: false,
          labelBg: false,
        },
        {
          type: "line",
          name: "Collection against Pass Through Charges",
          dataKey: "collectionAgainstPassThroughCharges",
          stroke: black,
          yAxisId: "left-axis",
          showLabel: false,
          labelBg: false,
        },
      ],
      CustomTooltip: (
        <CommonCustomTooltip
          decimals={[
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
            "liabilityAgainstPassThorughCharges",
            "collectionAgainstPassThroughCharges",
          ]),
          label: `Amount (${numberSystem})`,
          // tickFormatter: (label: number) => {
          //   return numConvertM(label) + "M";
          // },
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

export default CollectionGraphPassThrough;
