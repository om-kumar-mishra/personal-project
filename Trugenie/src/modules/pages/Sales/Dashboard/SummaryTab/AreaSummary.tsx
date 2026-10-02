import React, { useState, useMemo, useEffect } from "react";
import  FallBackUIDataNotAvailable  from "../../../../../widgets/charts/FallBackUIDataNotAvailable";
import LineBarChart, {
  optionsType,
} from "../../../../../widgets/charts/Recharts/LineBarChart";
import {
  minMaxValueOfArrayofObject,
  numberWithCommasAndFraction,
} from "../../../../../widgets/charts/Recharts/utils";
import {
  brightRed,
  darkGrey,
  lightGrey,
} from "../../../../../assets/colorConstants";
import CommonCustomTooltip from "../../../../../widgets/charts/Recharts/CommonCustomTooltip";
import { toTitleCase } from "../../../../../utils/commonFunctions";
import OperatableExpandAllTable from "../../../../../widgets/tables/OperatableExpandAllTable";
import {
  areaSummaryOtherType,
  areaSummaryParentType,
  areaSummaryType,
} from "../../../../../lib/services/salesDashboard/dataTypes";

const AreaSummary: React.FC<{
  areaSummaryTable?: areaSummaryParentType;
  printPDF: boolean;
  activeBtn: string;
}> = ({ areaSummaryTable, printPDF, activeBtn }) => {
  const [data, setData] = useState<areaSummaryType[]>([]);
  const [otherData, setOtherData] = useState<areaSummaryOtherType[]>([]);
  const [graphKey, setGraphKey] = useState<string>("phase");

  useEffect(() => {
    if (areaSummaryTable?.areaSummary) setData(areaSummaryTable.areaSummary);
    else setData([]);
  }, [areaSummaryTable]);

  useEffect(() => {
    if (areaSummaryTable?.other && activeBtn) {
      const other = areaSummaryTable.other.filter((v) => v.title === activeBtn);
      setOtherData(other);
    } else setOtherData([]);
  }, [areaSummaryTable?.other && activeBtn]);

  const dataLength = data ? data.length : 0;

  const options: optionsType = useMemo(
    () => ({
      chartData: [
        {
          type: "bar",
          name: "Area Sold",
          dataKey: "soldArea",
          fill: lightGrey,
          yAxisId: "left-axis",
          stackId: "b",
          showLabel: false,
          labelBg: false,
          barSize: graphKey === "wing" ? 5 : 15,
        },
        {
          type: "bar",
          name: "Area UnSold",
          dataKey: "unsoldArea",
          fill: brightRed,
          yAxisId: "left-axis",
          stackId: "a",
          showLabel: false,
          labelBg: false,
          barSize: graphKey === "wing" ? 5 : 15,
        },
        {
          type: "line",
          name: "Rate",
          dataKey: "rate",
          stroke: darkGrey,
          yAxisId: "right-axis",
          showLabel: false,
        },
      ],
      CustomTooltip: (
        <CommonCustomTooltip
          decimals={[
            import.meta.env.VITE_REACT_APP_AREA_DECIMAL,
            import.meta.env.VITE_REACT_APP_AREA_DECIMAL,
            import.meta.env.VITE_REACT_APP_RATE_DECIMAL,
          ]}
        />
      ),
      xAxis: {
        dataKey: graphKey,
        label: toTitleCase(graphKey),
        customizedAxisTick: 1,
        minLength: 11,
      },
      yAxis: [
        {
          domain: minMaxValueOfArrayofObject(data, ["unsoldArea", "soldArea"]),
          label: "Area (per Sq.ft.)",
        },
        {
          domain: minMaxValueOfArrayofObject(data, ["rate"]),
          label: "Rate (per Sq.ft.)",
        },
      ],
    }),
    [data]
  );

  const areaSummaryRows = useMemo(() => {
    return [
      {
        name: "Phase",
        key: "phase",
      },
      {
        name: "Tower",
        key: "tower",
      },
      {
        name: "Wing",
        key: "wing",
      },
      {
        name: `Saleable Area (${import.meta.env.VITE_REACT_APP_AREA_UNIT})`,
        key: "saleableArea",
        formatValue: (value: number) => numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_AREA_DECIMAL),
      },
      {
        name: `Launched Area (${import.meta.env.VITE_REACT_APP_AREA_UNIT})`,
        key: "launchedArea",
        formatValue: (value: number) => numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_AREA_DECIMAL),
      },
      {
        name: `Sold Area (${import.meta.env.VITE_REACT_APP_AREA_UNIT})`,
        key: "soldArea",
        formatValue: (value: number) => numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_AREA_DECIMAL),
      },
      {
        name: `Unsold Area (${import.meta.env.VITE_REACT_APP_AREA_UNIT})`,
        key: "unsoldArea",
        formatValue: (value: number) => numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_AREA_DECIMAL),
      },
      {
        name: "Sold (%)",
        key: "soldPercentage",
        formatValue: (value: number) =>
          numberWithCommasAndFraction(
            value,
            import.meta.env.VITE_REACT_APP_PERCENTAGE_DECIMALS
          ),
      },
      {
        name: "Rate (per Sq. Ft.)",
        key: "rate",
        formatValue: (value: number) => numberWithCommasAndFraction(value, import.meta.env.VITE_REACT_APP_RATE_DECIMAL),
      },
    ];
  }, []);

  return (
    <div className="row">
      <div className="sales-graph-heading">Sales Summary in terms of area</div>
      <div className={printPDF ? "col-md-7" : "col-md-12 col-sm-12"}>
        <div className="sales-graph-border">
          <div className="p-1">
            <OperatableExpandAllTable
              data={areaSummaryTable?.areaSummary ?? []}
              cols={areaSummaryRows}
              firstId="phase"
              secondId="tower"
              thirdId="wing"
              setData={setData}
              setGraphKey={setGraphKey}
              firstChildKey="towerList"
              secondChildKey="wingList"
              totalRow={areaSummaryTable?.total}
              otherRow={otherData}
            />
          </div>
        </div>
      </div>
      <div className={printPDF ? "col-md-5" : "col-md-12 col-sm-12 mt-3"}>
        <div className="sales-graph-border">
          {dataLength > 0 ? (
            <LineBarChart graphData={data} options={options} />
          ) : (
            <FallBackUIDataNotAvailable />
          )}
        </div>
      </div>
    </div>
  );
};

export default AreaSummary;
