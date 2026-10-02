import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../../lib/common/appState";
import { getDocFiles } from "../../../../lib/api";
import { getFileExtrension } from "../../../../utils/commonFunctions";
import { selectAccessToken } from "../../../../lib/services/hdfc_login/selectors";

const ProjectSummaryDetail = () => {
  const { projectSummaryReducer } = useSelector((state: AppState) => state);
  const accessToken = useSelector(selectAccessToken);
  const { dashboardDetails } = projectSummaryReducer;
  const summarySectionData = dashboardDetails?.data?.summarySection || {};
  const [logo, setLogo] = useState<string | undefined>(undefined);
  const projectDetailRow = [
    {
      name: "Project",
      key: "project",
    },
    {
      name: "Developer Group",
      key: "developerGroup",
    },
    {
      name: "Location",
      key: "location",
    },
    {
      name: "Description",
      key: "description",
    },
    {
      name: "Instrument",
      key: "instrument",
    },
    {
      name: "Investment Fund",
      key: "investmentFund",
    },
    {
      name: "Borrower Entity",
      key: "borrowerEntity",
    },
  ];

  useEffect(() => {
    async function fetchData() {
      const res = getDocFiles(
        dashboardDetails?.data?.summarySection?.schemaimageFileContainer,
        dashboardDetails?.data?.summarySection?.schemaimageFilePath,
        dashboardDetails?.data?.summarySection?.schemaimageFileName,
        accessToken,
        "thumb",
      );
      const fileExtension = getFileExtrension(dashboardDetails?.data?.summarySection?.schemaimageFileName);
      res
        .then(response => {
          if (response.ok) {
            return response.blob();
          } else {
            throw new Error("Failed to download file");
          }
        })
        .then(blob => {
          if (fileExtension === "png" || fileExtension === "jpg" || fileExtension === "jpeg") setLogo(URL.createObjectURL(blob));
          else setLogo(undefined);
        })
        .catch(error => {
          console.error(error);
        });
    }
    if (
      dashboardDetails?.data?.summarySection &&
      dashboardDetails.data.summarySection.schemaimageFileContainer &&
      dashboardDetails.data.summarySection.schemaimageFilePath &&
      dashboardDetails.data.summarySection.schemaimageFileName
    )
      fetchData();
  }, [dashboardDetails?.data?.summarySection]);

  const renderRows = () => {
    return projectDetailRow.map(detail => (
      <tr key={detail.key}>
        <th className='project-summay-detail-format align-middle'>{detail.name}:</th>
        <td className='project-summay-detail-format align-middle'>{String(summarySectionData[detail.key])}</td>
      </tr>
    ));
  };

  return (
    <>
      <div className='row'>
        <div className='col-md-6 col-sm-12'>
          <div className='sales-graph-border'>
            <div className='p-3'>
              <table style={{ width: "100%" }}>{renderRows()}</table>
            </div>
          </div>
        </div>
        <div className='col-md-6 col-sm-12'>
          <div className='sales-graph-border'>
            <div className='p-3'>
              <img src={logo} height={300} width={700} alt='Land Area' className='project-summary-image-position' />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectSummaryDetail;
