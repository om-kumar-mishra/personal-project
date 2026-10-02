import React, { useEffect, useMemo, useState } from "react";
import FallBackUIDataNotAvailable from "../../../../../widgets/charts/FallBackUIDataNotAvailable";
import OperatableExpandTable from "../../../../../widgets/tables/OperatableExpandTable";
import LineBarChart, {
  optionsType,
} from "../../../../../widgets/charts/Recharts/LineBarChart";
import {
  brightRed,
  darkCharcoalGrey,
  darkGrey,
  lightGrey,
} from "../../../../../assets/colorConstants";
import CommonCustomTooltip from "../../../../../widgets/charts/Recharts/CommonCustomTooltip";
import { toTitleCase } from "../../../../../utils/commonFunctions";
import {
  minMaxValueOfArrayofObject,
  numberWithCommasAndFraction,
} from "../../../../../widgets/charts/Recharts/utils";
import OperatableExpandAllTable from "../../../../../widgets/tables/OperatableExpandAllTable";
import {
  unitSummaryOtherType,
  unitSummaryParentType,
  unitSummaryType,
} from "../../../../../lib/services/salesDashboard/dataTypes";
import { useSelector } from "react-redux";
import { getUnitNumberSystem } from "../../../../../lib/services/common/selector";

const UnitSummary: React.FC<{
  unitSummaryTable: unitSummaryParentType;
  printPDF: boolean;
  activeBtn: string;
}> = ({ unitSummaryTable, printPDF, activeBtn }) => {
  const [data, setData] = useState<unitSummaryType[]>([]);
  const [otherData, setOtherData] = useState<unitSummaryOtherType[]>([]);
  const [graphKey, setGraphKey] = useState<string>("phase");

  const unitNumberSystem = useSelector(getUnitNumberSystem);

  const dataLength = data && data.length;

  useEffect(() => {
    if (unitSummaryTable?.other && activeBtn) {
      const other = unitSummaryTable.other.filter((v) => v.title === activeBtn);
      setOtherData(other);
    } else setOtherData([]);
  }, [unitSummaryTable?.other && activeBtn]);

  useEffect(() => {
    if (unitSummaryTable?.unitSummary) setData(unitSummaryTable.unitSummary);
    else setData([]);
  }, [unitSummaryTable]);

  const options: optionsType = useMemo(
    () => ({
      chartData: [
        {
          type: "bar",
          name: "Sold Units",
          dataKey: "soldUnits",
          fill: lightGrey,
          yAxisId: "left-axis",
          stackId: "b",
          showLabel: false,
          barSize: graphKey === "wing" ? 5 : 15,
        },
        {
          type: "bar",
          name: "Unsold Units",
          dataKey: "unSoldUnits",
          fill: brightRed,
          yAxisId: "left-axis",
          stackId: "c",
          showLabel: false,
          barSize: graphKey === "wing" ? 5 : 15,
        },
        {
          type: "bar",
          name: "Launched Units",
          dataKey: "launchedUnits",
          fill: darkCharcoalGrey,
          yAxisId: "left-axis",
          stackId: "a",
          showLabel: false,
          barSize: graphKey === "wing" ? 5 : 15,
        },
        {
          type: "line",
          name: "Avg Sale Value/Unit",
          dataKey: "averageSaleValuePerUnit",
          stroke: darkGrey,
          yAxisId: "right-axis",
          showLabel: false,
        },
      ],
      CustomTooltip: (
        <CommonCustomTooltip
          decimals={[
            import.meta.env.VITE_REACT_APP_UNIT_DECIMAL,
            import.meta.env.VITE_REACT_APP_UNIT_DECIMAL,
            import.meta.env.VITE_REACT_APP_UNIT_DECIMAL,
            import.meta.env.VITE_REACT_APP_INR_DECIMALS,
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
          domain: minMaxValueOfArrayofObject(data, [
            "launchedUnits",
            "unSoldUnits",
            "soldUnits",
          ]),
          label: "Units",
        },
        {
          domain: minMaxValueOfArrayofObject(data, ["averageSaleValuePerUnit"]),
          label: "Avg. Sale Value(per unit)",
        },
      ],
    }),
    [data]
  );

  const unitSummaryRows = useMemo(() => {
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
        name: "Total Units (Nos.)",
        key: "totalUnits",
        formatValue: (value: number) =>
          numberWithCommasAndFraction(
            value,
            import.meta.env.VITE_REACT_APP_UNIT_DECIMAL
          ),
      },
      {
        name: "Launched Units (Nos.)",
        key: "launchedUnits",
        formatValue: (value: number) =>
          numberWithCommasAndFraction(
            value,
            import.meta.env.VITE_REACT_APP_UNIT_DECIMAL
          ),
      },
      {
        name: "Sold Units (Nos.)",
        key: "soldUnits",
        formatValue: (value: number) =>
          numberWithCommasAndFraction(
            value,
            import.meta.env.VITE_REACT_APP_UNIT_DECIMAL
          ),
      },
      {
        name: "Unsold Units (Nos.)",
        key: "unSoldUnits",
        formatValue: (value: number) =>
          numberWithCommasAndFraction(
            value,
            import.meta.env.VITE_REACT_APP_UNIT_DECIMAL
          ),
      },
      {
        name: `Avg Sale Value/Unit (${unitNumberSystem})`,
        key: "averageSaleValuePerUnit",
        formatValue: (value: number) =>
          numberWithCommasAndFraction(
            value,
            import.meta.env.VITE_REACT_APP_INR_DECIMALS
          ),
      },
    ];
  }, []);

  return (
    <div className={`row ${printPDF ? "mt-5" : ""}`}>
      <div className="sales-graph-heading">Sales Summary in terms of units</div>
      <div className={printPDF ? "col-md-7" : "col-md-12 col-sm-12"}>
        <div className="sales-graph-border">
          <div className="p-1">
            <OperatableExpandAllTable
              data={unitSummaryTable?.unitSummary ?? []}
              cols={unitSummaryRows}
              firstId="phase"
              secondId="tower"
              thirdId="wing"
              setData={setData}
              setGraphKey={setGraphKey}
              firstChildKey="towerList"
              secondChildKey="wingList"
              totalRow={unitSummaryTable?.total}
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

export default UnitSummary;
