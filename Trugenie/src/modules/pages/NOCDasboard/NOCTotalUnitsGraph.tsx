import React, { useCallback, useMemo } from "react";
import FallBackUIDataNotAvailable from "../../../widgets/charts/FallBackUIDataNotAvailable";
import { numberWithCommasAndFraction } from "../../../widgets/charts/Recharts/utils";
import CommonCustomTooltip from "../../../widgets/charts/Recharts/CommonCustomTooltip";
import CustomPieChart, {
  PieOptionsType,
} from "../../../widgets/charts/Recharts/CustomPieChart";
import { daysPendingNOCAnalysisTotalUnitsType } from "../../../lib/services/nocDashboard/datatypes";

const NOCTotalUnitsGraph = (props: {
  data: daysPendingNOCAnalysisTotalUnitsType;
}) => {
  const { data } = props;

  const totalUnitsData = useMemo(() => {
    return [
      {
        name: "NOC Issued",
        value: data.nocIssued,
        fill: "#001D56",
        area: numberWithCommasAndFraction(
          data.nocIssuedArea,
          import.meta.env.VITE_REACT_APP_AREA_DECIMAL
        ),
      },
      {
        name: "NOC Not Issued",
        value: data.nocNotIssued,
        fill: "#203864",
        area: numberWithCommasAndFraction(
          data.nocNotIssuedArea,
          import.meta.env.VITE_REACT_APP_AREA_DECIMAL
        ),
      },
      {
        name: "NOC Rejected",
        value: data.nocRejected,
        fill: "#5172A9",
        area: numberWithCommasAndFraction(
          data.nocRejectedArea,
          import.meta.env.VITE_REACT_APP_AREA_DECIMAL
        ),
      },
      {
        name: "NOC Cancelled",
        value: data.nocCancelled,
        fill: "#7070707",
        area: numberWithCommasAndFraction(
          data.nocCancelledArea,
          import.meta.env.VITE_REACT_APP_AREA_DECIMAL
        ),
      },
      {
        name: "Units Unbooked",
        value: data.unitsUnbooked,
        fill: "#D0CECE",
        area: numberWithCommasAndFraction(
          data.unitsUnbookedArea,
          import.meta.env.VITE_REACT_APP_AREA_DECIMAL
        ),
      },
    ];
  }, [data]);

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
      },
      CustomTooltip: (
        <CommonCustomTooltip
          pie
          decimals={[import.meta.env.VITE_REACT_APP_UNIT_DECIMAL]}
          payloadDetails={(obj: { area: string; name: string }) => {
            return (
              <div key={obj.name}>
                <span className="tooltip-label">Area: </span>
                <span className="tooltip-value">{`${obj.area} sq.ft.`}</span>
              </div>
            );
          }}
        />
      ),
      labelFormatter: labelFormatter,
    }),
    [labelFormatter]
  );

  return (
    <div className="col-md-6 col-sm-12 mt-1">
      <div className="graph-border-lines">
        <h4 className="text-center mt-2 main-color font-bold right-align">
          Total Units
        </h4>
        {data ? (
          <CustomPieChart data={totalUnitsData} options={options} />
        ) : (
          <FallBackUIDataNotAvailable />
        )}
      </div>
    </div>
  );
};

export default NOCTotalUnitsGraph;
