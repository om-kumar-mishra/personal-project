import React from "react";

export interface TypeFilter {
  key: string;
  title: string;
}
interface GraphTypeFilterSpanType {
  typeFilter: TypeFilter[];
  type: string;
  setType: (key: string) => void;
}
const GraphTypeFilterSpan: React.FC<GraphTypeFilterSpanType> = ({
  typeFilter,
  type,
  setType,
}) => {
  return (
    <div className="d-flex flex-wrap">
      {typeFilter.map((v) => (
        <span
          key={v.key}
          className={`${type === v.key ? "active-red" : "grey-bg"}`}
          style={{
            fontWeight: 600,
            padding: "0.2em 1em",
            margin: "0.5em 0.5em 0 0.5em",
            borderRadius: "20px",
            cursor: "pointer",
          }}
          onClick={() => setType(v.key)}
        >
          {v.title}
        </span>
      ))}
    </div>
  );
};

export default GraphTypeFilterSpan;
