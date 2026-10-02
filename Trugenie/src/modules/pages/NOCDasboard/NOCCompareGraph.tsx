import React, { useMemo } from "react";
import FallBackUIDataNotAvailable from "../../../widgets/charts/FallBackUIDataNotAvailable";
import { deepOrange, deepRichBlue } from "../../../assets/colorConstants";
import { daysPastNocDpnListType } from "../../../lib/services/nocDashboard/datatypes";
import LineBarChart, {
  optionsType,
} from "../../../widgets/charts/Recharts/LineBarChart";
import {
  minMaxValueOfArrayofObject,
  numConvertK,
  numberWithCommasAndFraction,
} from "../../../widgets/charts/Recharts/utils";
import CommonCustomTooltip from "../../../widgets/charts/Recharts/CommonCustomTooltip";

interface PropsDatatype {
  daysPastNocDpnList: daysPastNocDpnListType[];
  setNocDPNIndex: (index: number) => void;
}

const CompareBarChartComponent = (props: PropsDatatype) => {
  const { daysPastNocDpnList, setNocDPNIndex } = props;

  const handleBarClick = (obj: any, index: number) => {
    setNocDPNIndex(index);
  };

  const options: optionsType = useMemo(
    () => ({
      chartData: [
        {
          type: "bar",
          name: "Sq. Ft",
          dataKey: "sqft",
          fill: "#2F5597",
          yAxisId: "left-axis",
          showLabel: true,
          barSize: 70,
          onClick: handleBarClick,
          labelFormatter: (obj: number) => {
            return numberWithCommasAndFraction(
              obj,
              import.meta.env.VITE_REACT_APP_AREA_DECIMAL
            );
          },
        },
        {
          type: "line",
          name: "Unit No.",
          dataKey: "unitNo",
          stroke: deepOrange,
          yAxisId: "right-axis",
          showLabel: true,
          labelFormatter: (obj: number) => {
            return numberWithCommasAndFraction(
              obj,
              import.meta.env.VITE_REACT_APP_UNIT_DECIMAL
            );
          },
        },
      ],

      CustomTooltip: (
        <CommonCustomTooltip
          decimals={[
            import.meta.env.VITE_REACT_APP_AREA_DECIMAL,
            import.meta.env.VITE_REACT_APP_UNIT_DECIMAL,
          ]}
        />
      ),
      xAxis: {
        dataKey: "daysPastDuedate",
      },
      yAxis: [
        {
          domain: minMaxValueOfArrayofObject(daysPastNocDpnList, ["unitNo"]),
          hide: true,
        },
        {
          domain: minMaxValueOfArrayofObject(daysPastNocDpnList, ["sqft"]),
          hide: false,
          tickFormatter: (label: number) => {
            return numConvertK(label, false);
          },
          unit: "K",
        },
      ],
    }),
    [daysPastNocDpnList]
  );

  return (
    <div className="graph-border-lines">
      {daysPastNocDpnList ? (
        <LineBarChart graphData={daysPastNocDpnList} options={options} />
      ) : (
        <FallBackUIDataNotAvailable />
      )}
    </div>
  );
};

export default CompareBarChartComponent;
