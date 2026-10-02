import React, { useEffect } from "react";
import PortfolioView from "../Portfolio/Dashboard";

const PortfolioViewDashboard = () => {
  useEffect(() => {
    document.title = "PortfolioView";
  }, []);
  return (
    <div className="row main-body m-0" style={{ backgroundColor: "#fff" }}>
      <PortfolioView />
    </div>
  );
};

export default PortfolioViewDashboard;
