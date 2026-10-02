import { useMemo, useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../../lib/common/appState";
import SelectOrMultiselect, { DropDownProps, dropDownsType } from "../../../Components/SelectOrMultiselect";
import { IconListType, RemarksObjType } from "../../../../layout/dashboardRemarks/Datatypes";
import { getProjectSummaryDetails, getProjectSummaryFilterAction } from "../../../../lib/services/projectSummary/action";
import { generateMultipagePDF } from "../../../../utils/GeneateReport";
import { selectSetProject } from "../../../../lib/services/HDFC/Project/selectors";
import { Project } from "../../../../lib/services/HDFC/Project/dataTypes";
import { convertIntoSelectArrayWithoutKey, getCurrentDateProjectSummaryFormat } from "../../../../utils/commonFunctions";
import { modules, projectSummaryChartNames, projectSummaryDashboardName } from "../../../../lib/services/dashboardRemarks/constants";
import { selectUserDetails } from "../../../../lib/services/hdfc_login/selectors";
import { UserDetails } from "../../../../lib/services/hdfc_login/dataTypes";
import { faFloppyDisk, faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { DashboardIcons, DashboardRemarkInput } from "../../../../layout/dashboardRemarks/RemarksReportDashboard";
import SpinnerComponent from "../../../Components/SpinnerComponent";
import ProjectSummaryDetail from "./ProjectSummaryDetail";
import ProjectSummary from "./ProjectSummarySection";
import SalesSummary from "./SalesSection";
import ConstructionSection from "./ConstructionSection";

const ProjectSummaryDashboard = () => {
  const dispatch = useDispatch();
  //#region [ref]
  const projectSummaryDetailRef = useRef(null);
  //#endregion

  //#region [selector]
  const { projectSummaryReducer, dashboardRemark } = useSelector((state: AppState) => state);
  const project = useSelector(selectSetProject) as Project;
  const userDetails = useSelector(selectUserDetails) as UserDetails;
  //#endregion

  //#region [usememo]
  const projectId = useMemo(() => {
    return project.REAssetId;
  }, [project]);

  const emailid = useMemo(() => {
    return userDetails.EmailId;
  }, [userDetails]);
  //#endregion

  //#region [state]
  const [dropDownsValue, setDropDownsValue] = useState<DropDownProps>({});
  const [isUnderwrittenActive, setIsUnderwrittenActive] = useState(true);
  const [addRemark, setAddRemark] = useState<boolean>(false);
  const [remarks, setRemarks] = useState<RemarksObjType>({});
  const [printPDF, setPrintPDF] = useState<boolean>(false);
  //#endregion

  useEffect(() => {
    dispatch(getProjectSummaryFilterAction(String(projectId)));
  }, []);

  const handleButtonClick = (isUnderwritten: boolean) => {
    setIsUnderwrittenActive(isUnderwritten);
  };

  useEffect(() => {
    if (printPDF) {
      setTimeout(() => generateMultipagePDF([projectSummaryDetailRef], setPrintPDF), 2000);
      // generatePDF(images, setPrintPDF);
    }
  }, [printPDF]);

  const dropDowns: dropDownsType[] = useMemo(() => {
    return [
      {
        label: "MIS Date",
        name: "misDate",
        id: "label",
        value: "value",
        options: convertIntoSelectArrayWithoutKey(projectSummaryReducer.filters?.data?.dates, true),
        singleSelect: true,
      },
    ];
  }, [projectSummaryReducer.filters?.data?.dates]);

  useEffect(() => {
    if (dropDowns[0].options && dropDowns[0].options.length > 0) {
      setDropDownsValue({
        ...dropDownsValue,
        misDate: dropDowns[0].options[0],
      });
    }
  }, [dropDowns]);

  useEffect(() => {
    if (dropDownsValue?.misDate?.value) {
      dispatch(getProjectSummaryDetails(String(projectId), dropDownsValue?.misDate?.value));
    }
  }, [dropDownsValue?.misDate?.value]);

  const dropDownElements = useMemo(() => {
    return (
      <div className='col-md-7 col-sm-6 m-0'>
        <SelectOrMultiselect
          id='projectSummarydashboardv2'
          dropDowns={dropDowns}
          dropDownsValue={dropDownsValue}
          setDropDownsValue={setDropDownsValue}
          selectSize={3}
        />
      </div>
    );
  }, [dropDowns, dropDownsValue]);

  useEffect(() => {
    if (projectSummaryReducer.dashboardDetails?.data?.remarks) setRemarks(projectSummaryReducer.dashboardDetails.data.remarks);
    else setRemarks({});
  }, [projectSummaryReducer.dashboardDetails?.data?.remarks]);

  const saveRemarkRequest = useMemo(() => {
    return {
      moduleId: projectId ?? "",
      module: modules.Project_Summary,
      misDate: dropDownsValue?.misDate?.value,
      dashboardName: projectSummaryDashboardName.Project_Summary,
      chartName: "",
      remark: "",
      addedBy: "",
      createdBy: emailid,
      filters: [],
    };
  }, [projectId, dropDownsValue?.misDate?.value]);

  const iconsList: IconListType[] = useMemo(() => {
    return [
      {
        title: addRemark ? "Save Remark" : "Add Remark",
        icon: addRemark ? faFloppyDisk : faFolderPlus,
        onClick: () => setAddRemark(!addRemark),
        remark: true,
      },
      // {
      //   title: "Generate Report",
      //   icon: faFileMedical,
      //   onClick: () => setPrintPDF(true),
      // },
      // {
      //   title: "View Report",
      //   icon: faFileLines,
      //   viewReport: true,
      // },
      // {
      //   title: "Custom Filters",
      //   icon: faFilter,
      //   filters: true,
      // },
    ];
  }, [addRemark, setPrintPDF, setAddRemark]);

  return (
    <div ref={projectSummaryDetailRef}>
      {(projectSummaryReducer.loading.filters ||
        projectSummaryReducer.loading.dashboardDetails ||
        printPDF ||
        dashboardRemark.loading.getDashboardRemark ||
        dashboardRemark.loading.insertDashboardRemark) && <SpinnerComponent />}

      <div className='row' style={{ padding: "10px" }}>
        <div className='col-md-4 col-sm-8' style={{ marginTop: "5px" }}></div>
        <div className='col-md-8 col-sm-4' style={{ position: "relative" }}>
          <span
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              fontWeight: 800,
              marginRight: "15px",
            }}>
            <span>Report date - </span>
            {getCurrentDateProjectSummaryFormat()}
          </span>
        </div>
      </div>
      <div className='padding-none'>
        <div className='main-color p-2 d-flex justify-content-between dashboard-heading heading-bg-color'>
          <span className='dashboard-heading-text'>
            {`Project Summary -
            ${projectSummaryReducer.dashboardDetails?.data?.summarySection?.project}`}
          </span>
          <DashboardIcons iconsList={iconsList} />
        </div>
      </div>
      <div className='row'>
        {dropDownElements}
        <div className='col-md-5 col-sm-6 d-flex justify-content-end'>
          <span>
            <div className='bold-text mt-2'>Comparison with respect to</div>
            <button
              className='project-summary-button me-2'
              style={{
                background: isUnderwrittenActive ? "black" : "white",
                color: isUnderwrittenActive ? "white" : "black",
              }}
              onClick={() => handleButtonClick(true)}>
              Underwritten
            </button>
            <button
              className='project-summary-button'
              style={{
                background: !isUnderwrittenActive ? "black" : "white",
                color: !isUnderwrittenActive ? "white" : "black",
                marginRight: "10px",
              }}
              onClick={() => handleButtonClick(false)}>
              Business Plan
            </button>
          </span>
        </div>
      </div>
      <ProjectSummaryDetail />
      <div className='mt-3 box-space'>
        <ProjectSummary isUnderwrittenActive={isUnderwrittenActive} handleButtonClick={handleButtonClick} />
      </div>
      <div className='mt-3 box-space'>
        <SalesSummary isUnderwrittenActive={isUnderwrittenActive} />
      </div>
      <div className='mt-3 box-space'>
        <ConstructionSection isUnderwrittenActive={isUnderwrittenActive} />
      </div>
      <div className='mt-4 mb-4'>
        <DashboardRemarkInput
          addRemark={addRemark}
          remarkKey={projectSummaryChartNames.Project_Summary}
          remarks={remarks}
          setRemarks={setRemarks}
          saveRequest={saveRemarkRequest}
        />
      </div>
    </div>
  );
};

export default ProjectSummaryDashboard;
