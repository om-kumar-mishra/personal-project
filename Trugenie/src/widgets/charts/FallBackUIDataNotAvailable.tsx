import React from "react";

const FallBackUIDataNotAvailable: React.FC<{ sm?: boolean }> = ({
  sm,
}) => {
  return (
    <h3
      className={sm ? "chart-min-max-height-sm" : "chart-min-max-height"}
      style={{
        margin: "0 auto",
        lineHeight: "10em",
        color: "gray",
        textAlign: "center",
      }}
    >
      Data Not Available
    </h3>
  );
};

export default FallBackUIDataNotAvailable;