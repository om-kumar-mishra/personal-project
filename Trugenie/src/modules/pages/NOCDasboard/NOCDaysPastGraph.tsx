import React, { useMemo, useCallback } from "react";
import FallBackUIDataNotAvailable from "../../../widgets/charts/FallBackUIDataNotAvailable";
import { numberWithCommasAndFraction } from "../../../widgets/charts/Recharts/utils";
import CustomPieChart, {
  PieOptionsType,
} from "../../../widgets/charts/Recharts/CustomPieChart";
import CommonCustomTooltip from "../../../widgets/charts/Recharts/CommonCustomTooltip";
import { daysPastNOCCountType } from "../../../lib/services/nocDashboard/datatypes";

const NOCDaysPastGraph = (props: {
  data: daysPastNOCCountType;
  setDaysPastNocIndex: (index: number) => void;
}) => {
  const { data, setDaysPastNocIndex } = props;

  const onPieClick = (index: any, value: any) => {
    setDaysPastNocIndex(value);
  };

  const daysPastData = () => {
    const dynamicData: { [key: string]: string | number }[] = [];
    if (data) {
      dynamicData.push(
        {
          name: "NOC Amount Paid",
          value: data.nocAmountPaidUnits,
          fill: "#D0CECE",
          area: numberWithCommasAndFraction(
            data.nocAmountPaidArea,
            import.meta.env.VITE_REACT_APP_AREA_DECIMAL
          ),
        },
        {
          name: "NOC DPN",
          value: data.nocDpnUnits,
          fill: "#2F5597",
          area: numberWithCommasAndFraction(
            data.nocDpnArea,
            import.meta.env.VITE_REACT_APP_AREA_DECIMAL
          ),
        }
      );
    }
    return dynamicData;
  };

  const graphData = daysPastData();

  const labelFormatter = useCallback((obj: any) => {
    const span = (
      <>
        <tspan textAnchor={obj.textAnchor}>
          <tspan className="bold-text">{obj.name}</tspan>,
          {numberWithCommasAndFraction(
            obj.value,
            import.meta.env.VITE_REACT_APP_UNIT_DECIMAL
          )}
        </tspan>
      </>
    );
    return span;
  }, []);

  const options: PieOptionsType = useMemo(
    () => ({
      pie: {
        outerRadius: 130,
        labelLine: false,
        onClick: onPieClick,
      },
      CustomTooltip: (
        <CommonCustomTooltip
          pie
          decimals={[import.meta.env.VITE_REACT_APP_UNIT_DECIMAL]}
          payloadDetails={(obj: { area: string; name: string }) => {
            return (
              <div key={obj.name}>
                <span className="tooltip-label">{`Area: `}</span>
                <span className="tooltip-value">{`${obj.area} sq.ft.`}</span>
              </div>
            );
          }}
        />
      ),
      labelFormatter,
    }),
    [labelFormatter]
  );
  return (
    <>
      <div className="col-md-6 col-sm-12 mt-1">
        <div className="graph-border-lines">
          <h4 className="text-center mb-3 mt-2 main-color font-bold right-align">
            Days Past NOC
          </h4>
          {data ? (
            <>
              <CustomPieChart data={graphData} options={options} />
            </>
          ) : (
            <FallBackUIDataNotAvailable />
          )}
        </div>
      </div>
    </>
  );
};

export default NOCDaysPastGraph;
