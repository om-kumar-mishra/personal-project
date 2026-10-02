import React, { useCallback, useEffect, useMemo, useState } from "react";
import CommonCustomTooltip from "../../../../../widgets/charts/Recharts/CommonCustomTooltip";
import CustomPieChart, {
  PieOptionsType,
  pieLabelFormaterType,
} from "../../../../../widgets/charts/Recharts/CustomPieChart";
import FallBackUIDataNotAvailable from "../../../../../widgets/charts/FallBackUIDataNotAvailable";
import {
  black,
  brightRed,
  lightSalmonPink,
  neutralGrey,
  orangePeel,
  palePeach,
  silver,
} from "../../../../../assets/colorConstants";
import {
  numberWithCommasAndFraction,
} from "../../../../../widgets/charts/Recharts/utils";
import { DemandAndCollectionsAnalysisResponseType } from "../../../../../lib/services/salesDashboard/dataTypes";

interface DemandCollectionForSoldUnitProps {
  graphData: DemandAndCollectionsAnalysisResponseType[];
}

const DemandCollectionForSoldUnit: React.FC<
  DemandCollectionForSoldUnitProps
> = ({ graphData }) => {
  const colors = [
    neutralGrey,
    lightSalmonPink,
    palePeach,
    orangePeel,
    black,
    silver,
    brightRed,
  ];

  const data: DemandAndCollectionsAnalysisResponseType[] = useMemo(() => {
    return graphData && graphData.length > 0
      ? graphData.map(
          (v: DemandAndCollectionsAnalysisResponseType, i: number) => ({
            ...v,
            fill: colors[i],
            name: v.finalOverdueBucket,
            value: Number(v.unitCount),
          })
        )
      : [];
  }, [graphData]);

  const labelFormatter = useCallback((obj: pieLabelFormaterType) => {
    const span = (
      <>
        <tspan textAnchor={obj.textAnchor}>{obj.name}</tspan>
        <tspan textAnchor={obj.textAnchor} dx="-45" dy="10">
          {numberWithCommasAndFraction(
            obj.payload.overdueBucketPercenrage,
            import.meta.env.VITE_REACT_APP_PERCENTAGE_DECIMALS
          )}
          %
        </tspan>
      </>
    );
    return span;
  }, []);

  const options: PieOptionsType = useMemo(
    () => ({
      pie: {
        outerRadius: 105,
        innerRadius: 40,
        labelLine: false,
      },
      legend: {
        verticalAlign: "top",
        layout: "horizontal",
        align: "left",
      },
      CustomTooltip: (
        <CommonCustomTooltip
          pie
          decimals={[import.meta.env.VITE_REACT_APP_UNIT_DECIMAL]}
        />
      ),
      labelFormater: labelFormatter,
    }),
    [labelFormatter]
  );

  return (
    <div>
      <div className="sales-graph-heading" style={{ paddingLeft: "1.5em" }}>
        Demand and Collection Analysis for Sold Units
      </div>
      <div className="sales-graph-border">
        {data && data.length > 0 ? (
          <CustomPieChart data={data} options={options} />
        ) : (
          <FallBackUIDataNotAvailable />
        )}
      </div>
    </div>
  );
};

export default DemandCollectionForSoldUnit;
