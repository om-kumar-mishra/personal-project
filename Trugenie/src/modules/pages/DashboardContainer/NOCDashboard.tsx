import React, { useEffect } from "react";
import NOCDashboardPage from "../NOCDasboard/NOCDashboardPage";

const NOCDashboard = () => {
  useEffect(() => {
    document.title = "NOC Dashboard";
  }, []);
  return (
    <div className="row main-body m-0">
      <NOCDashboardPage />
    </div>
  );
};

export default NOCDashboard;
