/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from "react";
import Chart from "react-apexcharts";
import "./gantt.css";
import { TransformedData } from "./data";
import { gantChartDataType } from "../../../../../lib/services/constructionDashboardv2/dataType";
import { white } from "../../../../../assets/colorConstants";
import dayjs from "dayjs";

const TimelineChart: React.FC<{
  responseData: gantChartDataType[];
  transFormedData: TransformedData;
  activeBtn: string;
}> = ({ responseData, transFormedData, activeBtn }) => {
  const [xAxisLabels, setXAxisLabels] = useState<
    {
      niceMax: number;
      niceMin: number;
      result: number[];
    }[]
  >([]);

  useEffect(() => {
    setXAxisLabels([]);
  }, [activeBtn]);

  const options = useMemo(() => {
    return {
      grid: {
        padding: {
          left: -12,
          bottom: -12,
          top: 14,
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: "100%",
        },
      },
      chart: {
        id: "gantt",
        background: white,
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      tooltip: {
        enabled: true,
        x: {
          // show: true,
          formatter: (val: any) => {
            return Number(val)
              ? new Date(val)
                  .toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "2-digit",
                  })
                  .replace(/\//g, " ")
              : val;
          },
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "vertical",
          shadeIntensity: 1,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 0, 100, 100],
        },
      },
      xaxis: {
        min: responseData.reduce((acc, curr) => {
          const min = curr.stages.reduce((acc, curr) => {
            return Math.min(
              acc,
              activeBtn === "UnderWritten"
                ? curr.underWritten.startDate === "0"
                  ? new Date().valueOf()
                  : new Date(curr.underWritten.startDate).valueOf()
                : curr.businessPlan.startDate === "0"
                ? new Date().valueOf()
                : new Date(curr.businessPlan.startDate).valueOf(),
              curr.projected.startDate === "0"
                ? new Date().valueOf()
                : new Date(curr.projected.startDate).valueOf(),
              curr.actual.startDate === "0"
                ? new Date().valueOf()
                : new Date(curr.actual.startDate).valueOf()
            );
          }, Infinity);
          return Math.min(acc, min);
        }, Infinity),

        max: responseData.reduce((acc, curr) => {
          const max = curr.stages.reduce((acc, curr) => {
            return Math.max(
              acc,
              activeBtn === "UnderWritten"
                ? curr.underWritten.endDate === "0"
                  ? new Date().valueOf()
                  : new Date(curr.underWritten.endDate).valueOf()
                : curr.businessPlan.endDate === "0"
                ? new Date().valueOf()
                : new Date(curr.businessPlan.endDate).valueOf(),
              curr.projected.endDate === "0"
                ? new Date().valueOf()
                : new Date(curr.projected.endDate).valueOf(),
              curr.actual.endDate === "0"
                ? new Date().valueOf()
                : new Date(curr.actual.endDate).valueOf()
            );
          }, 0);
          return Math.max(acc, max);
        }, 0),
        tickAmount: 10,
        labels: {
          show: false,
          formatter: function (value: any, timestamp: any, index: any) {
            index?.w.globals.yAxisScale &&
              setXAxisLabels(index.w.globals.yAxisScale);
            return dayjs(value).format("MMM YY");
          },
        },
        axisTicks: {
          show: false,
        },
        // show: false,
        // type: "datetime",
        position: "top",
        tooltip: {
          enabled: true,
        },
      },
      yaxis: {
        show: false,
      },
    };
  }, [responseData, activeBtn, xAxisLabels.length]);

  return (
    <div
      className="scrollbar-width-thin"
      style={{ height: "500px", overflow: "scroll" }}
    >
      <table className="table">
        <thead className="fixed-header">
          <tr>
            <th className="active-red align-middle">Product Type</th>
            <th className="active-red align-middle ">Timeline Head</th>
            <th className="active-red align-middle">
              &emsp;&emsp;&emsp;&emsp;&nbsp;
            </th>
            {xAxisLabels && xAxisLabels.length
              ? xAxisLabels[0].result?.map((label, index) => {
                  if (index === 0) return null;
                  return (
                    <th key={index} className="active-red align-middle">
                      {dayjs(label).format("MMM YY")}
                    </th>
                  );
                })
              : null}
            {/* <th className="active-red align-middle w-100"></th> */}
          </tr>
        </thead>
        <tbody>
          {transFormedData.map((row, rowIndex) => {
            return (
              <tr key={rowIndex} className="align-middle">
                <td>{row.productType}</td>
                <td className="font-weight-bold">{row.timeLineHead}</td>
                <td
                  colSpan={
                    xAxisLabels && xAxisLabels.length
                      ? xAxisLabels[0].result.length + 1
                      : 1
                  }
                >
                  {row.stages.map((stage, stageIndex) => {
                    return (
                      <tr key={stageIndex}>
                        <td className="d-flex flex-column " align="center">
                          <span className="stageName">{stage.name}</span>
                          <span className="underwritten">{activeBtn}</span>
                          <span className="actualProjection">
                            Actual/Projection
                          </span>
                        </td>
                        <td
                          style={{
                            width: "100%",
                          }}
                        >
                          <Chart
                            options={options}
                            series={[{ ...stage }]}
                            type="rangeBar"
                            height={100}
                            width="100%"
                          />
                        </td>
                      </tr>
                    );
                  })}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TimelineChart;
