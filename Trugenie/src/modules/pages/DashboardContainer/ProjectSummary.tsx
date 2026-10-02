import React, { useEffect } from "react";
import ProjectSummaryDashboard from "../Summary/Dashboard/ProjectSummaryDashboard";

const ProjectSummary = () => {
  useEffect(() => {
    document.title = "Project Summary";
  }, []);
  return (
    <div className="row main-body m-0">
      <ProjectSummaryDashboard />
    </div>
  );
};

export default ProjectSummary;
