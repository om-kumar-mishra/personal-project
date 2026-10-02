import React from "react";
import {
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
  ComposedChart,
  Bar,
} from "recharts";
import CustomizedLabel from "./CustomizedLabel";
import {
  fontCustomStyle,
  fontLegendCustomStyle,
  graphMaxWidth,
  lineChartHeight,
  xAsisPadding,
  legendPadding,
  legendIconSizeDefault,
  lineStrokeWidthDefault,
  axisStrokeColor,
  ChartHeightMin,
} from "./constants";
import { ScaleType } from "recharts/types/util/types";
import { darkBlue, offWhiteGrey } from "../../../assets/colorConstants";
import { stringNumber } from "../../../lib/services/Datatype";
import CustomizedAxisTick from "./CustomizedAxisTick";

interface ChartType {
  type: string;
  name: string;
  dataKey: string;
  stroke?: string;
  onClick?: (obj: any, index: any) => void;
  strokeWidth?: number;
  dot?: boolean;
  showLabel?: boolean;
  strokeDasharray?: boolean;
  stackId?: string;
  barSize?: number;
  fill?: string;
  yAxisId?: "left-axis" | "right-axis";
  dataLabelSufix?: string;
  dataLabelPrefix?: string;
  labelBg?: boolean;
  labelFormatter?: (obj: any) => string;
  stacked?: boolean;
}
interface xAxisType {
  dataKey: string;
  customizedAxisTick?: 1 | 0;
  minLength?: number;
  label?: string;
  angle?: number;
  tickFormatter?: (label: number) => string;
}
interface yAxisType {
  // yAxisId?: string;
  tickFormatter?: (label: number) => string;
  type?: string;
  domain?: number[] | string[];
  scale?: ScaleType | Function;
  orientation?: "left" | "right";
  hide?: boolean;
  unit?: string;
  label?: string;
}
export interface optionsType {
  chartData: ChartType[];
  xAxis: xAxisType;
  yAxis: yAxisType[];
  CustomTooltip?: any;
  legendHide?: boolean;
}
interface PropsDataType {
  graphData: any[];
  options: optionsType;
  ChartHeightSm?: boolean;
}
const LineBarChart: React.FC<PropsDataType> = ({
  graphData,
  options,
  ChartHeightSm,
}) => {
  return (
    <div style={graphMaxWidth}>
      <ResponsiveContainer
        width="100%"
        height={ChartHeightSm ? ChartHeightMin : lineChartHeight}
      >
        <ComposedChart
          height={ChartHeightSm ? ChartHeightMin : lineChartHeight}
          data={graphData}
        >
          <XAxis
            interval={0}
            height={50}
            tick={
              options.xAxis.customizedAxisTick === 1 ? (
                <CustomizedAxisTick minLength={options.xAxis.minLength} />
              ) : (
                true
              )
            }
            // tick={true}
            // tickMargin={options.xAxis.customizedAxisTick ? 7 : 4}
            tickMargin={10}
            stroke={axisStrokeColor}
            strokeWidth={0}
            dataKey={options.xAxis.dataKey}
            padding={xAsisPadding}
            style={fontCustomStyle}
            // angle={options.xAxis.customizedAxisTick ? -30 : 0}
            angle={options.xAxis.angle ?? 0}
            tickFormatter={options?.xAxis?.tickFormatter}
            tickLine={false}
            // dx={15}
            // dy={20}
            // minTickGap={-200}
            axisLine={false}
            width={30}
            // margin={{ top: 10 }}
            label={
              options.xAxis?.label
                ? {
                    value: options.xAxis.label,
                    angle: 0,
                    position: "insideBottom",
                    fill: darkBlue,
                    ...fontCustomStyle,
                  }
                : ""
            }
          />
          <YAxis
            stroke={axisStrokeColor}
            strokeWidth={0}
            type="number"
            yAxisId="left-axis"
            orientation="left"
            domain={options?.yAxis?.[0]?.domain ?? ["auto", "auto"]}
            style={fontCustomStyle}
            hide={options?.yAxis?.[0]?.hide}
            unit={options?.yAxis?.[0]?.unit ?? ""}
            scale={options?.yAxis?.[0]?.scale ?? "auto"}
            tickFormatter={options?.yAxis?.[0]?.tickFormatter}
            tickLine={false}
            minTickGap={1}
            // tickCount={6}
            label={
              options?.yAxis?.[0]?.label
                ? {
                    value: options.yAxis[0].label,
                    angle: -90,
                    position: "insideLeft",
                    fill: darkBlue,
                    ...fontCustomStyle,
                  }
                : ""
            }
          />
          {options.yAxis.length > 1 && (
            <YAxis
              stroke={axisStrokeColor}
              strokeWidth={0}
              type="number"
              yAxisId="right-axis"
              orientation="right"
              domain={options?.yAxis?.[1]?.domain ?? ["auto", "auto"]}
              style={fontCustomStyle}
              hide={options?.yAxis?.[1]?.hide}
              unit={options?.yAxis?.[1]?.unit ?? ""}
              scale={options?.yAxis?.[1]?.scale ?? "auto"}
              tickFormatter={options?.yAxis?.[1]?.tickFormatter}
              tickLine={false}
              minTickGap={1}
              // tickCount={6}
              label={
                options?.yAxis?.[1]?.label
                  ? {
                      value: options.yAxis[1].label,
                      angle: 90,
                      position: "insideRight",
                      fill: darkBlue,
                      ...fontCustomStyle,
                    }
                  : ""
              }
            />
          )}
          <Tooltip
            cursor={true}
            shared={false}
            content={options.CustomTooltip}
          />
          {!options?.legendHide && (
            <Legend
              layout="horizontal"
              iconSize={legendIconSizeDefault}
              wrapperStyle={{
                ...legendPadding,
                ...fontLegendCustomStyle,
              }}
              align="left"
              verticalAlign="top"
            />
          )}
          {options.chartData.length > 0 &&
            options.chartData.map((chart: ChartType, i: number) => (
              <>
                {chart?.type === "bar" && (
                  <Bar
                    layout="horizontal"
                    name={chart.name}
                    dataKey={chart.dataKey}
                    stackId={chart?.stackId ?? "a"}
                    barSize={chart?.barSize ?? 30}
                    fill={chart?.fill ?? offWhiteGrey}
                    yAxisId={chart?.yAxisId ?? "left-axis"}
                    legendType="circle"
                    onClick={chart?.onClick}
                    // radius={[10, 10, 0, 0]}
                  >
                    {chart?.showLabel && chart?.labelBg && (
                      <LabelList
                        dataKey={chart.dataKey}
                        content={
                          <CustomizedLabel
                            line
                            labelBg={chart?.labelBg}
                            dataLabelPrefix={chart?.dataLabelPrefix}
                            dataLabelSufix={chart?.dataLabelSufix}
                            labelFormatter={chart?.labelFormatter}
                          />
                        }
                      />
                    )}
                    {chart?.showLabel && !chart?.labelBg && (
                      <LabelList
                        dataKey={chart.dataKey}
                        position="top"
                        formatter={chart?.labelFormatter}
                        onClick={(e) => console.log(e)}
                      />
                    )}
                  </Bar>
                )}
                {chart?.type === "line" && (
                  <Line
                    legendType="circle"
                    strokeLinecap="round"
                    activeDot={true}
                    strokeDasharray={chart.strokeDasharray ? "2 7" : ""}
                    key={`${chart.name}-${i}`}
                    name={chart.name}
                    dataKey={chart.dataKey}
                    stroke={chart?.stroke ?? offWhiteGrey}
                    onClick={chart?.onClick}
                    type="linear"
                    strokeWidth={chart?.strokeWidth ?? lineStrokeWidthDefault}
                    dot={
                      chart?.dot === false
                        ? false
                        : {
                            stroke: chart?.stroke ?? offWhiteGrey,
                            strokeWidth: 1,
                            r: 2,
                            strokeDasharray: "",
                          }
                    }
                    yAxisId={chart?.yAxisId ?? "left-axis"}
                  >
                    {chart?.showLabel && (
                      <LabelList
                        dataKey={chart.dataKey}
                        content={
                          <CustomizedLabel
                            line
                            labelBg={chart?.labelBg}
                            dataLabelPrefix={chart?.dataLabelPrefix}
                            dataLabelSufix={chart?.dataLabelSufix}
                            labelFormatter={chart?.labelFormatter}
                          />
                        }
                      />
                    )}
                  </Line>
                )}
              </>
            ))}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineBarChart;
