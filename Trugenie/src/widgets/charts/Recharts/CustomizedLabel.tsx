import React from "react";

interface PropsDataType {
  line?: boolean;
  dataLabelPrefix?: string;
  dataLabelSufix?: string;
  width?: number;
  labelBg?: boolean;
  labelFormatter?: (obj: any) => string;
  [key: string]: any;
}

export default function CustomizedLabel(props: PropsDataType) {
  const { x, y, line, value, width, labelBg, labelFormatter } = props;
  const dx = width ? width / 2 : 15;
  return (
    <>
      {value !== 0 && value !== "0.0" && (
        <g>
          {(labelBg || !line) && (
            <rect
              fill="#f1f1f1"
              x={line ? x + 5 : x}
              y={line ? (!labelBg ? y : y - 5) : y + 5}
              width={width ?? 30}
              height="14"
              fillOpacity="75%"
              rx="4"
            />
          )}
          <text
            x={line ? x + 5 : x}
            y={line ? (!labelBg ? y - 2 : y - 10) : y}
            dy={line && !labelBg ? -6 : 15}
            dx={line && !labelBg ? 0 : dx}
            fill="#000"
            opacity={5}
            // fontFamily={fontCustomStyle.fontFamily}
            fontSize={9}
            textAnchor="middle"
          >
            {props?.dataLabelPrefix ? props.dataLabelPrefix + " " : ""}
            {labelFormatter
              ? labelFormatter(value)
              : value}
            {props?.dataLabelSufix ? " " + props.dataLabelSufix : ""}
          </text>
        </g>
      )}
    </>
  );
}
