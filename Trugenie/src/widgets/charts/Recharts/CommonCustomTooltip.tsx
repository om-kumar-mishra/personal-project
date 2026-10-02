import React from "react";
import { numberWithCommasAndFraction } from "./utils";

const CommonCustomTooltip = (p: any) => {
  const { payload, label, active, decimals, pie, payloadDetails } = p;
  if (active) {
    return (
      <div className="custom-tooltip">
        {label && <div className="tooltip-header">{label}</div>}
        {payload.map((v: { name: string; value: number }, index: number) => (
          <>
            <div key={index}>
              <span className="tooltip-label">{`${v.name} : `}</span>
              <span className="tooltip-value">{`${numberWithCommasAndFraction(
                v.value,
                pie
                  ? decimals?.[0] ?? 2
                  : decimals?.[index] !== undefined
                  ? decimals?.[index]
                  : 2
              )}`}</span>
            </div>
            {payloadDetails && payloadDetails(payload[0].payload)}
          </>
        ))}
      </div>
    );
  }

  return null;
};
export default CommonCustomTooltip;
