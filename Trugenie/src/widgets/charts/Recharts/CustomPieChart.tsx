import React from "react";
import {
  PieChart,
  Pie,
  Legend,
  Tooltip,
  ResponsiveContainer,
  LegendType,
} from "recharts";
// import "../../../assets/CSS/Recharts.css";
import "../../../assets/Styles/ReCharts.css";
import {
  RADIAN,
  fontCustomStyle,
  fontLegendCustomStyle,
  fontSizePie,
  // dataLabelFontColor,
  legendPaddingPie,
  ChartHeightMin,
  customLabelFontColor,
} from "./constants";
import { graphMaxWidth, lineChartHeight } from "./constants";
import {
  // pieHorizontalType,
  stringNumber,
} from "../../../lib/services/Datatype";
import {
  HorizontalAlignmentType,
  Payload,
  VerticalAlignmentType,
} from "recharts/types/component/DefaultLegendContent";
import { LayoutType } from "recharts/types/util/types";

export interface PieOptionsType {
  height?: number;
  legend?: {
    align?: HorizontalAlignmentType;
    verticalAlign?: VerticalAlignmentType;
    payload?: Array<Payload>;
    layout?: LayoutType;
  };
  pie?: {
    outerRadius?: number;
    innerRadius?: number;
    labelLine?: boolean;
    showLabel?: boolean;
    dataKey?: string;
    nameKey?: string;
    legendType?: LegendType;
    onClick?: (data: any, index: number) => void;
  };
  CustomTooltip?: any;
  labelFormater?: (obj: pieLabelFormaterType) => any;
}

interface CustomPieChartProps {
  data: any[];
  options?: PieOptionsType;
  ChartHeightSm?: boolean;
}

interface CustomLabelPropsPie {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  name: string | number | undefined | null;
  value: number;
  [key: string]: any;
}

export interface pieLabelFormaterType {
  name: string | number | null | undefined;
  value: number;
  payload: any;
  textAnchor?: string;
}
const CustomizedLabel = (
  props: CustomLabelPropsPie,
  labelFormater?: (obj: pieLabelFormaterType) => stringNumber
) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, name, value, payload } =
    props;
  const radius = 25 + innerRadius + (outerRadius - innerRadius);
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <g>
      <text
        x={x}
        y={y}
        fill={customLabelFontColor}
        fontSize={fontSizePie}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="center"
      >
        {props.percent > 0.005 ? (
          <>
            {labelFormater
              ? labelFormater({
                  name: name,
                  value: value,
                  payload: payload?.payload,
                  textAnchor: x > cx ? "start" : "end",
                })
              : value}
          </>
        ) : (
          <></>
        )}
      </text>
    </g>
  );
};

const CustomPieChart: React.FC<CustomPieChartProps> = ({
  data,
  options,
  ChartHeightSm,
}) => {
  return (
    <div style={graphMaxWidth}>
      <ResponsiveContainer
        width="100%"
        height={
          ChartHeightSm ? ChartHeightMin : options?.height ?? lineChartHeight
        }
      >
        <PieChart
          height={
            ChartHeightSm ? ChartHeightMin : options?.height ?? lineChartHeight
          }
        >
          <Legend
            payload={options?.legend?.payload}
            layout={options?.legend?.layout ?? "vertical"}
            wrapperStyle={{
              ...legendPaddingPie,
              ...fontCustomStyle,
            }}
            align={options?.legend?.align ?? "right"}
            verticalAlign={options?.legend?.verticalAlign ?? "middle"}
          />
          <Pie
            isAnimationActive={false}
            outerRadius={options?.pie?.outerRadius ?? 110}
            innerRadius={options?.pie?.innerRadius ?? 0}
            data={data}
            labelLine={options?.pie?.labelLine ?? true}
            label={
              options?.pie?.showLabel !== false
                ? (props: CustomLabelPropsPie) =>
                    CustomizedLabel(props, options?.labelFormater)
                : undefined
            }
            dataKey={options?.pie?.dataKey ?? "value"}
            nameKey={options?.pie?.nameKey ?? "name"}
            legendType={options?.pie?.legendType ?? "circle"}
            onClick={options?.pie?.onClick}
            // colors={options?.pie?.colors};
          />
          <Tooltip
            cursor={true}
            content={options?.CustomTooltip}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomPieChart;
