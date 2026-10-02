import React from "react";
import SimpleTable from "../../../../../widgets/tables/SimpleTable";

const AgeingAnalysisTable = () => {
  const tableData = {
    id: "AgeingAnalysisTable",
    columns: [
      {
        name: "Unit No",
        key: "unitNo",
      },
      {
        name: "Area",
        key: "area",
      },
      {
        name: "Configuration",
        key: "configuration",
      },
      {
        name: "Customer Name",
        key: "customerName",
      },
      {
        name: "Date of Booking",
        key: "dateOfBooking",
      },
      {
        name: "Scheme",
        key: "scheme",
      },
      {
        name: "Sales Value",
        key: "salesValue",
      },
      {
        name: "Passthrough Charges",
        key: "passthroghCharges",
      },
      {
        name: "Amount Demanded(INR)",
        key: "amountDemanded",
      },
      {
        name: "Collection Against SV",
        key: "collectionAgainstSV",
      },
      {
        name: "Collection Against PTC",
        key: "collectionAgainstPtc",
      },
      {
        name: "Balance Receivables",
        key: "balanceReceivables",
      },
    ],
    data: [],
  };
  return (
    <div className="col-md-12 mt-3">
      <div className="sales-graph-border">
        <SimpleTable tableData={tableData} headerColorClass="active-red" />
      </div>
    </div>
  );
};

export default AgeingAnalysisTable;
