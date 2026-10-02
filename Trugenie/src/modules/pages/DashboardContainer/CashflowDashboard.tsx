import React, { useEffect } from "react";
import CashflowDashbaordIndex from "../Cashflow/Dashboard";

const CashflowDashboard = () => {
  useEffect(() => {
    document.title = "CashflowDashboard";
  }, []);
  return (
    <div className="row main-body m-0">
      <CashflowDashbaordIndex />
    </div>
  );
};

export default CashflowDashboard;
