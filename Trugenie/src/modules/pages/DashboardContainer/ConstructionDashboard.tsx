import { useEffect } from "react";
import ConstructionDashboardv2Page from "../Construction/Dashboard/ConstructionDashboardv2Page";
const ConstructionDashboard = () => {
  useEffect(() => {
    document.title = "Construction Dashboard";
  }, []);
  return <div className='m-0 row main-body'>{<ConstructionDashboardv2Page />}</div>;
};

export default ConstructionDashboard;
