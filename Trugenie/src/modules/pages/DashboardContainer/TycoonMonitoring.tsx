import React, { useEffect } from "react";
import TycoonMonitoringPage from "../Monitoring/index";

// const NOCDashboard: React.FC<{ type: number }> = ({ type }) => {
const MonitoringPage = () => {
  useEffect(() => {
    document.title = "Monitoring Page";
  }, []);
  return (
    <div className="row main-body m-0">
      <TycoonMonitoringPage />
    </div>
  );
};

export default MonitoringPage;
