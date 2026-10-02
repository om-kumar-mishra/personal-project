import React, { useEffect, useMemo, useState } from "react";
import FallBackUIDataNotAvailable from "../../../../../widgets/charts/FallBackUIDataNotAvailable";
import LineBarChart, {
  optionsType,
} from "../../../../../widgets/charts/Recharts/LineBarChart";
import {
  brightRed,
  darkCharcoalGrey,
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
  valueSummaryOtherType,
  valueSummaryParentType,
  valueSummaryType,
} from "../../../../../lib/services/salesDashboard/dataTypes";
import { useSelector } from "react-redux";
import { getNumberSystem } from "../../../../../lib/services/common/selector";

const ValueSummary: React.FC<{
  valueSummaryTable: valueSummaryParentType;
  activeBtn: string;
}> = ({ valueSummaryTable, activeBtn }) => {
  const [data, setData] = useState<valueSummaryType[]>([]);
  const [otherData, setOtherData] = useState<valueSummaryOtherType[]>([]);
  const [graphKey, setGraphKey] = useState<string>("phase");

  const numberSystem = useSelector(getNumberSystem);

  const dataLength = data && data.length;

  useEffect(() => {
    if (valueSummaryTable?.other && activeBtn) {
      const other = valueSummaryTable.other.filter(
        (v) => v.title === activeBtn
      );
      setOtherData(other);
    } else setOtherData([]);
  }, [valueSummaryTable?.other && activeBtn]);

  useEffect(() => {
    if (valueSummaryTable?.valueSummary)
      setData(valueSummaryTable.valueSummary);
    else setData([]);
  }, [valueSummaryTable]);

  const options: optionsType = useMemo(
    () => ({
      chartData: [
        {
          type: "bar",
          name: "Demand",
          dataKey: "demand",
          fill: lightGrey,
          yAxisId: "left-axis",
          stackId: "a",
          showLabel: false,
          barSize: graphKey === "wing" ? 5 : 15,
        },
        {
          type: "bar",
          name: "Collections",
          dataKey: "collections",
          fill: brightRed,
          yAxisId: "left-axis",
          stackId: "b",
          showLabel: false,
          barSize: graphKey === "wing" ? 5 : 15,
        },
        {
          type: "bar",
          name: "Balance Receivable",
          dataKey: "balanceReceivable",
          fill: darkCharcoalGrey,
          yAxisId: "left-axis",
          stackId: "c",
          showLabel: false,
          barSize: graphKey === "wing" ? 5 : 15,
        },
      ],
      CustomTooltip: (
        <CommonCustomTooltip
          decimals={[
            import.meta.env.VITE_REACT_APP_INR_DECIMALS,
            import.meta.env.VITE_REACT_APP_INR_DECIMALS,
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
            "demand",
            "balanceReceivable",
            "collections",
          ]),
          label: "Amount",
          // tickFormatter: (label: number) => {
          //   return numConvertM(label) + "M";
          // },
        },
      ],
    }),
    [data]
  );

  const valueSummaryRows = useMemo(() => {
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
        name: `Sale Value (${numberSystem})`,
        key: "saleValue",
        formatValue: (value: number) =>
          numberWithCommasAndFraction(
            value,
            import.meta.env.VITE_REACT_APP_INR_DECIMALS
          ),
      },
      {
        name: `Demand (${numberSystem})`,
        key: "demand",
        formatValue: (value: number) =>
          numberWithCommasAndFraction(
            value,
            import.meta.env.VITE_REACT_APP_INR_DECIMALS
          ),
      },
      {
        name: `Collections (${numberSystem})`,
        key: "collections",
        formatValue: (value: number) =>
          numberWithCommasAndFraction(
            value,
            import.meta.env.VITE_REACT_APP_INR_DECIMALS
          ),
      },
      {
        name: `Total Overdue (${numberSystem})`,
        key: "totalOverdue",
        formatValue: (value: number) =>
          numberWithCommasAndFraction(
            value,
            import.meta.env.VITE_REACT_APP_INR_DECIMALS
          ),
      },
      // Overdue 90+ Days (Days)
      // {
      //   name: "Overdue 90+ Days (Days)",
      //   key: "totalOverdue",
      //   formatValue: (value: number) => numberWithCommasAndFraction(value, 0),
      // },
      {
        name: `Balance Receivable (${numberSystem})`,
        key: "balanceReceivable",
        formatValue: (value: number) =>
          numberWithCommasAndFraction(
            value,
            import.meta.env.VITE_REACT_APP_INR_DECIMALS
          ),
      },
      {
        name: "Demand (%)",
        key: "demandPercentage",
        formatValue: (value: number) =>
          numberWithCommasAndFraction(
            value,
            import.meta.env.VITE_REACT_APP_PERCENTAGE_DECIMALS
          ),
      },
      {
        name: "Collection (%)",
        key: "collectionPercentage",
        formatValue: (value: number) =>
          numberWithCommasAndFraction(
            value,
            import.meta.env.VITE_REACT_APP_PERCENTAGE_DECIMALS
          ),
      },
    ];
  }, []);

  return (
    <div className="row mt-5">
      <div className="sales-graph-heading">Receivable Summary</div>
      <div className="col-md-7 col-sm-12">
        <div className="sales-graph-border">
          <div className="p-1">
            <OperatableExpandAllTable
              data={valueSummaryTable?.valueSummary ?? []}
              cols={valueSummaryRows}
              firstId="phase"
              secondId="tower"
              thirdId="wing"
              setData={setData}
              setGraphKey={setGraphKey}
              firstChildKey="towerList"
              secondChildKey="wingList"
              totalRow={valueSummaryTable?.total}
              otherRow={otherData}
            />
          </div>
        </div>
      </div>
      <div className="col-md-5 col-sm-12">
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

export default ValueSummary;
