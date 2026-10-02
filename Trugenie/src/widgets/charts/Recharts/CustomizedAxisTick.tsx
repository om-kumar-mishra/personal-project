import React from "react";
import { axisStrokeColor, fontCustomStyle } from "./constants";
import { splitIntoPhrases } from "./utils";

export default function CustomizedAxisTick(props: any) {
  const { x, y, stroke, minLength, payload } = props;
  const checkLength = minLength ?? 14;
  const value = splitIntoPhrases(payload.value, checkLength);
  return (
    <g transform={`translate(${x},${y})`} style={fontCustomStyle}>
      {typeof payload.value === "string" && (
        <text x={0} y={0} dy={0} fill={axisStrokeColor}>
          {payload.value.length < checkLength - 1 ? (
            <tspan textAnchor="middle" x="0">
              {payload.value}
            </tspan>
          ) : (
            <>
              <tspan textAnchor="middle" x="0">
                {value[0]}
              </tspan>
              {value[1] && (
                <tspan textAnchor="middle" x="0" dy="10">
                  {value[1]}
                </tspan>
              )}
              {value[2] && (
                <tspan textAnchor="middle" x="0" dy="10">
                  {value[2]}
                </tspan>
              )}
            </>
          )}
        </text>
      )}
    </g>
  );
}
