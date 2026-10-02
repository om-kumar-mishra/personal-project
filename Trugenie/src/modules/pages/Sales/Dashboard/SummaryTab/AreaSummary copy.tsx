import React, { useState, useMemo } from "react";
import FallBackUIDataNotAvailable from "../../../../../widgets/charts/FallBackUIDataNotAvailable";
import OperatableExpandTable from "../../../../../widgets/tables/OperatableExpandTable";
import LineBarChart, {
  optionsType,
} from "../../../../../widgets/charts/Recharts/LineBarChart";
import { minMaxValueOfArrayofObject } from "../../../../../widgets/charts/Recharts/utils";
import {
  brightRed,
  darkGrey,
  lightGrey,
} from "../../../../../assets/colorConstants";
import CommonCustomTooltip from "../../../../../widgets/charts/Recharts/CommonCustomTooltip";
import { toTitleCase } from "../../../../../utils/commonFunctions";

const AreaSummary = () => {
  const areaSummaryTable = [
    {
      phase: "Phase A",
      seleableArea: 1,
      launchedArea: 78,
      soldArea: 12345,
      unsoldArea: 4356,
      soldPer: 78,
      ratePsf: 54,
      firstChild: [
        {
          phase: "Phase A",
          tower: "tower 1",
          seleableArea: 1,
          launchedArea: 78,
          soldArea: 12345,
          unsoldArea: 4356,
          soldPer: 78,
          ratePsf: 54,
          secondChild: [
            {
              phase: "Phase A",
              tower: "tower 1",
              wing: "wing 1",
              seleableArea: 1,
              launchedArea: 78,
              soldArea: 12345,
              unsoldArea: 4356,
              soldPer: 78,
              ratePsf: 54,
            },
            {
              phase: "phase",
              tower: "tower 1",
              wing: "wing 2",
              seleableArea: 1,
              launchedArea: 78,
              soldArea: 12345,
              unsoldArea: 4356,
              soldPer: 78,
              ratePsf: 54,
            },
          ],
        },
      ],
    },
    {
      phase: "phase B",
      seleableArea: 1,
      launchedArea: 78,
      soldArea: 12345,
      unsoldArea: 4356,
      soldPer: 78,
      ratePsf: 54,
      firstChild: [
        {
          tower: "tower",
          phase: "phase",
          seleableArea: 1,
          launchedArea: 78,
          soldArea: 12345,
          unsoldArea: 4356,
          soldPer: 78,
          ratePsf: 54,
          secondChild: [
            {
              phase: "phase",
              tower: "tower",
              wing: "wing 3",
              seleableArea: 1,
              launchedArea: 78,
              soldArea: 12345,
              unsoldArea: 4356,
              soldPer: 78,
              ratePsf: 54,
            },
          ],
        },
      ],
    },
    {
      phase: "phase C",
      seleableArea: 1,
      launchedArea: 78,
      soldArea: 12345,
      unsoldArea: 4356,
      soldPer: 78,
      ratePsf: 54,
      firstChild: [
        {
          tower: "tower",
          phase: "phase",
          seleableArea: 1,
          launchedArea: 78,
          soldArea: 12345,
          unsoldArea: 4356,
          soldPer: 78,
          ratePsf: 54,
          secondChild: [
            {
              phase: "phase",
              tower: "tower",
              wing: "wing 3",
              seleableArea: 1,
              launchedArea: 78,
              soldArea: 12345,
              unsoldArea: 4356,
              soldPer: 78,
              ratePsf: 54,
            },
          ],
        },
      ],
    },
    {
      phase: "phase D",
      seleableArea: 1,
      launchedArea: 78,
      soldArea: 12345,
      unsoldArea: 4356,
      soldPer: 78,
      ratePsf: 54,
      firstChild: [
        {
          tower: "tower",
          phase: "phase",
          seleableArea: 1,
          launchedArea: 78,
          soldArea: 12345,
          unsoldArea: 4356,
          soldPer: 78,
          ratePsf: 54,
          secondChild: [
            {
              phase: "phase",
              tower: "tower",
              wing: "wing 3",
              seleableArea: 1,
              launchedArea: 78,
              soldArea: 12345,
              unsoldArea: 4356,
              soldPer: 78,
              ratePsf: 54,
            },
          ],
        },
      ],
    },
    {
      phase: "phase E",
      seleableArea: 1,
      launchedArea: 78,
      soldArea: 12345,
      unsoldArea: 4356,
      soldPer: 78,
      ratePsf: 54,
      firstChild: [
        {
          tower: "tower",
          phase: "phase",
          seleableArea: 1,
          launchedArea: 78,
          soldArea: 12345,
          unsoldArea: 4356,
          soldPer: 78,
          ratePsf: 54,
          secondChild: [
            {
              phase: "phase",
              tower: "tower",
              wing: "wing 3",
              seleableArea: 1,
              launchedArea: 78,
              soldArea: 12345,
              unsoldArea: 4356,
              soldPer: 78,
              ratePsf: 54,
            },
          ],
        },
      ],
    },
    {
      phase: "phase F",
      seleableArea: 1,
      launchedArea: 78,
      soldArea: 12345,
      unsoldArea: 4356,
      soldPer: 78,
      ratePsf: 54,
      firstChild: [
        {
          tower: "tower",
          phase: "phase",
          seleableArea: 1,
          launchedArea: 78,
          soldArea: 12345,
          unsoldArea: 4356,
          soldPer: 78,
          ratePsf: 54,
          secondChild: [
            {
              phase: "phase",
              tower: "tower",
              wing: "wing 3",
              seleableArea: 1,
              launchedArea: 78,
              soldArea: 12345,
              unsoldArea: 4356,
              soldPer: 78,
              ratePsf: 54,
            },
          ],
        },
      ],
    },
  ];
  const [data, setData] = useState<any[]>(areaSummaryTable);
  const [graphKey, setGraphKey] = useState<string>("phase");
  const dataLength = data && data.length;
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
          showLabel: true,
          labelBg: false,
        },
        {
          type: "bar",
          name: "Area UnSold",
          dataKey: "unsoldArea",
          fill: brightRed,
          yAxisId: "left-axis",
          stackId: "a",
          showLabel: true,
          labelBg: false,
        },
        {
          type: "line",
          name: "Rate",
          dataKey: "ratePsf",
          stroke: darkGrey,
          yAxisId: "right-axis",
          showLabel: true,
        },
      ],
      CustomTooltip: CommonCustomTooltip,
      xAxis: {
        dataKey: graphKey,
        label: toTitleCase(graphKey),
      },
      yAxis: [
        {
          domain: minMaxValueOfArrayofObject(data, ["unsoldArea", "soldArea"]),
          label: "Area (per Sq.ft.)",
        },
        {
          domain: minMaxValueOfArrayofObject(data, ["ratePsf"]),
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
        name: "Seleable Area",
        key: "seleableArea",
      },
      {
        name: "Launched Area",
        key: "launchedArea",
      },
      {
        name: "Sold Area",
        key: "soldArea",
      },
      {
        name: "UNSold Area",
        key: "unsoldArea",
      },
      {
        name: "Sold %",
        key: "soldPer",
      },
      {
        name: "Rate psf",
        key: "ratePsf",
      },
    ];
  }, []);

  return (
    <div className="row">
      <div className="sales-graph-heading">Area Summary</div>
      <div className="col-md-7 col-sm-12">
        <div className="sales-graph-border">
          <div
            className="p-3"
            style={{ maxHeight: "320px", overflowY: "scroll" }}
          >
            <OperatableExpandTable
              data={areaSummaryTable}
              cols={areaSummaryRows}
              firstId="phase"
              secondId="tower"
              thirdId="wing"
              setData={setData}
              setGraphKey={setGraphKey}
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

export default AreaSummary;
