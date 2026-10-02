import { useMemo, useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import SummarySection from "./SummaryTab/SummarySection";
import CumulativeCost from "./CumulativeCostTab/CumulativeCost";
import ConstructionActivity from "./ConstructionActivityTab/ConstructionActivity";
import PhysicalProgress from "./PhysicalProgressTab/PhysicalProgress";
import SiteVisit from "./SiteVisitTab/SiteVisit";
import AdditionalInsights from "./AdditionalInsightsTab/AdditionalInsights";
import Approvals from "./ApprovalsTab/Approvals";
import { faFloppyDisk, faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { AppState } from "../../../../lib/common/appState";
import SelectOrMultiselect, { DropDownProps, dropDownsType } from "../../../Components/SelectOrMultiselect";
import { IconListType, RemarksObjType } from "../../../../layout/dashboardRemarks/Datatypes";
import SwitchTab, { ButtonTabType } from "../../../Components/SwitchTab";
import { convertIntoSelectArrayWithoutKey } from "../../../../utils/commonFunctions";
import { DEFAULT_ALL } from "../../../../utils/constants";
import { ConstructionSummaryPayload } from "../../../../lib/services/constructionDashboardv2/dataType";
import { selectUserDetails } from "../../../../lib/services/hdfc_login/selectors";
import { UserDetails } from "../../../../lib/services/hdfc_login/dataTypes";
import { selectSetProject } from "../../../../lib/services/HDFC/Project/selectors";
import { Project } from "../../../../lib/services/HDFC/Project/dataTypes";
import { getConstructionDropDownAction, getConstructionSummaryAction } from "../../../../lib/services/constructionDashboardv2/action";
import { CustomDropDownProps, DashboardIcons } from "../../../../layout/dashboardRemarks/RemarksReportDashboard";
import { generateMultipagePDF } from "../../../../utils/GeneateReport";
import { constructionDashboardName, modules } from "../../../../lib/services/dashboardRemarks/constants";
import SpinnerComponent from "../../../Components/SpinnerComponent";

const ConstructionDashboardv2Page = () => {
  const dispatch = useDispatch();
  //#region [Refs]
  const summaryTabRef = useRef(null);
  const cumulativeCostRef = useRef(null);
  const constructionActivityRef = useRef(null);
  const physicalProgressRef = useRef(null);
  const siteVisitRef = useRef(null);
  const approvalsRef = useRef(null);
  const additionalInsightsRef = useRef(null);
  //#endregion

  //#region [selectors]
  const { constructionDashboard, dashboardRemark } = useSelector((state: AppState) => state);
  const { constructionLoading, constructionSummary, constructionDropdown, approvalDocuments } = constructionDashboard;
  const userDetails = useSelector(selectUserDetails) as UserDetails;
  const project = useSelector(selectSetProject) as Project;
  //#endregion

  //#region [states]
  const [alertVisible, setAlertVisible] = useState<boolean>(false);
  const [dropDownsValue, setDropDownsValue] = useState<DropDownProps>({});
  const [addRemark, setAddRemark] = useState<boolean>(false);
  const [remarks, setRemarks] = useState<RemarksObjType>({});
  const [activeTab, setActiveTab] = useState<string>("summary");
  const [printPDF, setPrintPDF] = useState<boolean>(false);
  //#endregion

  const ButtonTab: ButtonTabType[] = useMemo(() => {
    return [
      {
        id: "summary",
        value: "Summary",
      },
      {
        id: "cumulativeCost",
        value: "Cumulative Cost",
      },
      {
        id: "constructionActivity",
        value: "Construction Activity",
      },
      {
        id: "physicalProgress",
        value: "Physical Progress",
      },
      {
        id: "siteVisit",
        value: "Site Visit",
      },
      {
        id: "approvals",
        value: "Approvals",
      },
      {
        id: "additionalInsights",
        value: "Additional Insights",
      },
    ];
  }, []);

  const iconsList: IconListType[] = useMemo(() => {
    return [
      {
        title: addRemark ? "Save Remark" : "Add Remark",
        icon: addRemark ? faFloppyDisk : faFolderPlus,
        onClick: () => setAddRemark(!addRemark),
        remark: true,
      },
    ];
  }, [addRemark, setAddRemark]);

  const dropDowns: dropDownsType[] = useMemo(() => {
    return [
      {
        label: "MIS Date",
        name: "misDate",
        id: "label",
        value: "value",
        options: convertIntoSelectArrayWithoutKey(constructionDropdown?.data?.misDate, true),
        singleSelect: true,
      },
      {
        label: "Phase",
        name: "phase",
        id: "label",
        value: "value",
        options: convertIntoSelectArrayWithoutKey(constructionDropdown?.data?.phase),
        singleSelect: true,
        isClearable: true,
      },
      {
        label: "Project Type",
        name: "projectType",
        id: "label",
        value: "value",
        options: convertIntoSelectArrayWithoutKey(constructionDropdown?.data?.projectType),
        singleSelect: true,
        isClearable: true,
      },
      // {
      //   label: "Project Subtype",
      //   name: "projectSubType",
      //   id: "label",
      //   value: "value",
      //   options: convertIntoSelectArrayWithoutKey(
      //     constructionDropdown?.data?.projectSubType
      //   ),
      //   singleSelect: true,
      //   isClearable: true,
      // },
      // {
      //   label: "Unit Location subtype name",
      //   name: "unitLocationSubtypeName",
      //   id: "label",
      //   value: "value",
      //   options: convertIntoSelectArrayWithoutKey(
      //     constructionDropdown?.data?.unitLocationSubtypeName
      //   ),
      //   singleSelect: true,
      //   isClearable: true,
      // },
      // {
      //   label: "Unit Location Wing",
      //   name: "unitLocationWing",
      //   id: "label",
      //   value: "value",
      //   options: convertIntoSelectArrayWithoutKey(
      //     constructionDropdown?.data?.unitLocationWing
      //   ),
      //   singleSelect: true,
      //   isClearable: true,
      // },
    ];
  }, [constructionDropdown]);

  const dropDownValueToCallAPI = useMemo(() => {
    return {
      projectPhase: dropDownsValue?.phase?.value ?? constructionDropdown?.data?.phase.join(","),
      projectType: dropDownsValue?.projectType?.value ?? constructionDropdown?.data?.projectType.join(","),
      developmentType: dropDownsValue?.projectSubType?.value ?? constructionDropdown?.data?.projectSubType.join(","),
      costHead: dropDownsValue?.unitLocationSubtypeName?.value ?? constructionDropdown?.data?.unitLocationSubtypeName.join(","),
      costSubHead: dropDownsValue?.unitLocationWing?.value ?? constructionDropdown?.data?.unitLocationWing.join(","),
      timelineHead: constructionDropdown?.data?.timeLineHead.join(","),
      timelineSubHead: constructionDropdown?.data?.timeLineSubHead.join(","),
      progressHead: DEFAULT_ALL,
      progressSubHead: DEFAULT_ALL,
    };
  }, [dropDownsValue]);

  const callDashboardDetailApi = () => {
    if (dropDownsValue?.misDate?.value) {
      const dashboardDetailRequest: ConstructionSummaryPayload = {
        reAssetId: project.REAssetId,
        misDate: dropDownsValue.misDate.value,
        ...dropDownValueToCallAPI,
      };
      dispatch(getConstructionSummaryAction(dashboardDetailRequest));
    }
  };

  // // on Page Scroll
  // useEffect(() => {
  //   const header = document.querySelector(".sticky-header");
  //   const handleScroll = () => {
  //     if (window.scrollY > 0) {
  //       header?.classList.add("bg-color-onscroll");
  //       // header?.classList.add("text-light");
  //     } else {
  //       header?.classList.remove("bg-color-onscroll");
  //       // header?.classList.remove("text-light");
  //     }
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  useEffect(() => {
    const values: CustomDropDownProps = {};
    if (dropDowns[0].options && dropDowns[0].options.length > 0) {
      values.misDate = dropDowns[0].options[0];
    }
    setDropDownsValue(d => ({ ...d, ...values }));
  }, [dropDowns[0].options]);

  useEffect(() => {
    project.REAssetId && dispatch(getConstructionDropDownAction(project.REAssetId));
  }, [project.REAssetId]);

  useEffect(() => {
    callDashboardDetailApi();
  }, [dropDownsValue?.misDate?.value, dropDownValueToCallAPI]);

  useEffect(() => {
    if (printPDF) {
      setTimeout(
        () =>
          generateMultipagePDF([summaryTabRef, constructionActivityRef, physicalProgressRef, siteVisitRef, approvalsRef, additionalInsightsRef], setPrintPDF),
        10000,
      );
    }
  }, [printPDF]);

  useEffect(() => {
    if (constructionDashboard.constructionSummary?.data?.remarks) setRemarks(constructionDashboard.constructionSummary.data.remarks);
    else setRemarks({});
  }, [constructionDashboard.constructionSummary?.data?.remarks]);

  const saveRemarkRequest = useMemo(() => {
    return {
      moduleId: project.REAssetId ?? "",
      module: modules.Construction,
      misDate: dropDownsValue?.misDate?.value,
      dashboardName: constructionDashboardName.Construction,
      chartName: "",
      remark: "",
      addedBy: "",
      createdBy: userDetails.EmailId,
      filters: [
        {
          filterName: "projectPhase",
          filterValue: dropDownValueToCallAPI.projectPhase,
        },
        {
          filterName: "projectType",
          filterValue: dropDownValueToCallAPI.projectType,
        },
        {
          filterName: "developmentType",
          filterValue: dropDownValueToCallAPI.developmentType,
        },
        {
          filterName: "costHead",
          filterValue: dropDownValueToCallAPI.costHead,
        },
        {
          filterName: "costSubHead",
          filterValue: dropDownValueToCallAPI.costSubHead,
        },
        // {
        //   filterName: "timelineHead",
        //   filterValue: dropDownValueToCallAPI.timelineHead,
        // },
        {
          filterName: "timelineSubHead",
          filterValue: dropDownValueToCallAPI.timelineSubHead,
        },
        {
          filterName: "progressHead",
          filterValue: dropDownValueToCallAPI.progressHead,
        },
        {
          filterName: "progressSubHead",
          filterValue: dropDownValueToCallAPI.progressSubHead,
        },
      ],
    };
  }, [project.REAssetId, dropDownsValue?.misDate?.value, dropDownValueToCallAPI]);

  const pageHeader = useMemo(() => {
    return (
      <div className='padding-none'>
        <div className='main-color p-2 mt-1 d-flex justify-content-between dashboard-heading heading-bg-color'>
          <span className='dashboard-heading-text'>{`Construction Dashboard - ${constructionDashboard.constructionSummary?.data?.assetname}`}</span>
          <DashboardIcons iconsList={iconsList} />
        </div>
      </div>
    );
  }, [addRemark, constructionDashboard.constructionSummary?.data?.assetname]);

  const dropDownElements = useMemo(() => {
    return (
      <div className='row sticky-top sticky-header pt-2 pb-2 m-0' style={{ transition: "background-color 0.3s ease" }}>
        <SelectOrMultiselect
          id='construtiondashboardv2select'
          dropDowns={dropDowns}
          dropDownsValue={dropDownsValue}
          setDropDownsValue={setDropDownsValue}
          selectSize={2}
        />
      </div>
    );
  }, [dropDowns, dropDownsValue]);

  return (
    <div>
      {(constructionLoading.constructionSummary ||
        constructionLoading.constructionDropdown ||
        constructionLoading.approvalDocuments ||
        printPDF ||
        dashboardRemark.loading.getDashboardRemark ||
        dashboardRemark.loading.insertDashboardRemark) && <SpinnerComponent />}

      {pageHeader}
      {dropDownElements}

      <SwitchTab ButtonTab={ButtonTab} width={"160px"} setActiveTab={setActiveTab} activeTab={activeTab} />

      <div className='mt-3'>
        {(activeTab === ButtonTab[0].id || printPDF) && (
          <div ref={summaryTabRef}>
            {printPDF && pageHeader}
            {printPDF && dropDownElements}
            <SummarySection addRemark={addRemark} remarks={remarks} setRemarks={setRemarks} saveRequest={saveRemarkRequest} />
          </div>
        )}
        {(activeTab === ButtonTab[1].id || printPDF) && (
          <div ref={cumulativeCostRef}>
            <CumulativeCost
              constructionSummary={constructionSummary}
              addRemark={addRemark}
              remarks={remarks}
              setRemarks={setRemarks}
              saveRequest={saveRemarkRequest}
            />
          </div>
        )}
        {(activeTab === ButtonTab[2].id || printPDF) && (
          <div ref={constructionActivityRef}>
            <ConstructionActivity
              constructionSummary={constructionSummary}
              addRemark={addRemark}
              remarks={remarks}
              setRemarks={setRemarks}
              saveRequest={saveRemarkRequest}
            />
          </div>
        )}
        {(activeTab === ButtonTab[3].id || printPDF) && (
          <div ref={physicalProgressRef}>
            <PhysicalProgress
              constructionSummary={constructionSummary}
              addRemark={addRemark}
              remarks={remarks}
              setRemarks={setRemarks}
              saveRequest={saveRemarkRequest}
            />
          </div>
        )}
        {(activeTab === ButtonTab[4].id || printPDF) && (
          <div ref={siteVisitRef}>
            <SiteVisit addRemark={addRemark} remarks={remarks} setRemarks={setRemarks} saveRequest={saveRemarkRequest} />
          </div>
        )}
        {(activeTab === ButtonTab[5].id || printPDF) && (
          <div ref={approvalsRef}>
            <Approvals
              constructionSummary={constructionSummary}
              addRemark={addRemark}
              remarks={remarks}
              setRemarks={setRemarks}
              saveRequest={saveRemarkRequest}
              misDate={dropDownsValue?.misDate?.value}
              projectId={project.REAssetId}
              emailid={userDetails.EmailId}
              approvalDocuments={approvalDocuments}
              alertVisible={alertVisible}
              setAlertVisible={setAlertVisible}
            />
          </div>
        )}
        {(activeTab === ButtonTab[6].id || printPDF) && (
          <div ref={additionalInsightsRef}>
            <AdditionalInsights addRemark={addRemark} remarks={remarks} setRemarks={setRemarks} saveRequest={saveRemarkRequest} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ConstructionDashboardv2Page;
