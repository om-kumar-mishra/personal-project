import { useEffect, useMemo, useRef, useState } from "react";
// import Logo from "../../../assets/img/tbp_original.png";
import { faFilter, faFloppyDisk, faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import usePrevious from "../../../../hooks/usePrevious";
import { IconListType, RemarksObjType } from "../../../../layout/dashboardRemarks/Datatypes";
import { CustomDropDownProps, DashboardIcons, customDropDownsType } from "../../../../layout/dashboardRemarks/RemarksReportDashboard";
import { AppState } from "../../../../lib/common/appState";
import { Project } from "../../../../lib/services/HDFC/Project/dataTypes";
import { selectSetProject } from "../../../../lib/services/HDFC/Project/selectors";
import { modules, salesDashboardName } from "../../../../lib/services/dashboardRemarks/constants";
import { InsertDashboardRemarkPayload } from "../../../../lib/services/dashboardRemarks/dataType";
import {
  getREProjectSubTypeAction,
  getREProjectTypeAction,
  getRETowerV2Action,
  getREUnitApprovalStatusAction,
  getREUnitLaunchStatusAction,
  getREUnitOwnedByAction,
  getREUnitSecurityStatusAction,
  getREWingV2Action,
  getSalesDashboardDetailsv2Action,
  getSalesMisHistoryAction,
  getSalesPhase,
  resetREProjectSubTypeAction,
  resetRETowerV2Action,
  resetREUnitOwnedByAction,
  resetREWingV2Action,
} from "../../../../lib/services/salesDashboard/action";
import { SalesDashboardDetailv2Payload } from "../../../../lib/services/salesDashboard/dataTypes";
import { generateMultipagePDF } from "../../../../utils/GeneateReport";
import { convertIntoSelectArray } from "../../../../utils/commonFunctions";
import { DEFAULT_ALL } from "../../../../utils/constants";
import SelectOrMultiselect, { DropDownProps, dropDownsType } from "../../../Components/SelectOrMultiselect";
import SpinnerComponent from "../../../Components/SpinnerComponent";
import SwitchTab, { ButtonTabType } from "../../../Components/SwitchTab";
import DemandCollectionTab from "./DemandCollectionTab/DemandCollectionTab";
import OtherInsightsTab from "./OtherInsightsTab/OtherInsightsTab";
import PriceVelocityTab from "./PriceVelocityTab/PriceVelocityTab";
import SlowMovingInventoryTab from "./SlowMovingInventoryTab/SlowMovingInventoryTab";
import AreaSummaryTab from "./SummaryTab/SummaryTab";
import MicroMarketTab from "./MicroMarketTab/MicroMarketTab";
import { selectUserDetails } from "../../../../lib/services/hdfc_login/selectors";
import { UserDetails } from "../../../../lib/services/hdfc_login/dataTypes";

const bookingDate = "2023-05-01";

const SalesDashboardv2Page = () => {
  const dispatch = useDispatch();
  const areaSummaryTabref = useRef(null);
  const priceVelocityTabRef = useRef(null);
  const demandCollectionTabRef = useRef(null);
  const slowMovingInventoryTabRef = useRef(null);
  const microMarketTabRef = useRef(null);
  const otherInsightsTabRef = useRef(null);
  const project = useSelector(selectSetProject) as Project;
  const userDetails = useSelector(selectUserDetails) as UserDetails;
  const { salesDashboard, dashboardRemark } = useSelector((state: AppState) => state);
  const {
    phase,
    salesMisHistory,
    reProjectType,
    reProjectSubType,
    reUnitLaunchStatus,
    reUnitSecurityStatus,
    reUnitApprovalStatus,
    reTowerV2,
    reWingV2,
    reUnitOwnedBy,
  } = salesDashboard;
  const [dropDownsValue, setDropDownsValue] = useState<DropDownProps>({});
  const prevDropDownsValue: any = usePrevious({ dropDownsValue });
  const [customDropDownsValue, setCustomDropDownsValue] = useState<CustomDropDownProps>({});
  const [addRemark, setAddRemark] = useState<boolean>(false);
  const [remarks, setRemarks] = useState<RemarksObjType>({});
  const [activeTab, setActiveTab] = useState<string>("summary");
  const [printPDF, setPrintPDF] = useState<boolean>(false);
  const ButtonTab: ButtonTabType[] = useMemo(() => {
    return [
      {
        id: "summary",
        value: "Summary",
      },
      {
        id: "priceVelocity",
        value: "Price & Velocity",
      },
      {
        id: "demandCollection",
        value: "Demand & Collection",
      },
      {
        id: "slowMovingInventory",
        value: "Slow Moving Inventory",
      },
      {
        id: "microMarket",
        value: "Micro-Market",
      },
      {
        id: "otherInsights",
        value: "Other Insights",
      },
    ];
  }, []);

  const dropDownValueToCallAPI = useMemo(() => {
    return {
      phase: dropDownsValue?.phase?.value ?? DEFAULT_ALL,
      projectType: dropDownsValue?.projectType?.value ?? DEFAULT_ALL,
      projectSubType: dropDownsValue?.projectSubType?.value ?? DEFAULT_ALL,
      unitLocationSubTypeName: dropDownsValue?.unitLocationSubTypeName?.value ?? DEFAULT_ALL,
      unitLocationWing: dropDownsValue?.unitLocationWing?.value ?? DEFAULT_ALL,
      unitOwnedBy: customDropDownsValue?.unitOwnedBy?.value ?? DEFAULT_ALL,
      launchStatus: customDropDownsValue?.launchStatus?.value ?? DEFAULT_ALL,
      securityStatus: customDropDownsValue?.securityStatus?.value ?? DEFAULT_ALL,
      approvalStatus: customDropDownsValue?.approvalStatus?.value ?? DEFAULT_ALL,
      startDate: customDropDownsValue.startDate,
      endDate: customDropDownsValue.endDate,
    };
  }, [dropDownsValue, customDropDownsValue]);

  const callDashboardDetailApi = () => {
    if (dropDownsValue?.misDate || dropDownsValue?.misDate === null) {
      const dashboardDetailRequest: SalesDashboardDetailv2Payload = {
        reAssetId: project?.REAssetId,
        misDate: dropDownsValue.misDate?.value ?? "1900-01-01",
        ...dropDownValueToCallAPI,
      };
      dispatch(getSalesDashboardDetailsv2Action(dashboardDetailRequest));
    }
  };

  useEffect(() => {
    if (salesDashboard?.dashboardDetailsv2?.data?.remarks) setRemarks(salesDashboard.dashboardDetailsv2.data.remarks);
    else setRemarks({});
  }, [salesDashboard?.dashboardDetailsv2?.data?.remarks]);

  useEffect(() => {
    const values: CustomDropDownProps = {};
    if (Array.isArray(salesMisHistory)) values.misDate = salesMisHistory.length > 0 ? salesMisHistory[0] : null;
    setDropDownsValue(d => ({ ...d, ...values }));
  }, [salesMisHistory]);

  useEffect(() => {
    if (dropDownsValue?.misDate?.value)
      setCustomDropDownsValue(c => ({
        ...c,
        startDate: new Date(bookingDate),
        endDate: new Date(dropDownsValue.misDate.value),
      }));
  }, [dropDownsValue?.misDate?.value]);

  useEffect(() => {
    // if (projectId && login?.token) {
    dispatch(getSalesMisHistoryAction(project?.REAssetId));
    dispatch(getSalesPhase(project?.REAssetId));
    dispatch(getREProjectTypeAction(project?.REAssetId));
    dispatch(getREUnitLaunchStatusAction(project?.REAssetId));
    dispatch(getREUnitSecurityStatusAction(project?.REAssetId));
    dispatch(getREUnitApprovalStatusAction(project?.REAssetId));
    dispatch(
      getREUnitOwnedByAction({
        reAssetId: project?.REAssetId,
        projectType: DEFAULT_ALL,
        projectSubType: DEFAULT_ALL,
        phase: DEFAULT_ALL,
        unitLocationSubTypeName: DEFAULT_ALL,
        wing: DEFAULT_ALL,
      }),
    );
  }, []);
  useEffect(() => {
    if (dropDownsValue?.phase?.value && dropDownsValue?.projectType?.value) {
      if (
        prevDropDownsValue?.dropDownsValue?.phase?.value !== dropDownsValue.phase.value ||
        prevDropDownsValue?.dropDownsValue?.projectType?.value !== dropDownsValue.projectType.value
      ) {
        dispatch(
          getREProjectSubTypeAction({
            reAssetId: project?.REAssetId,
            projectType: dropDownsValue.projectType.value,
            phase: dropDownsValue.phase.value,
          }),
        );
      }
      if (dropDownsValue?.projectSubType?.value) {
        if (
          prevDropDownsValue?.dropDownsValue?.phase?.value !== dropDownsValue.phase.value ||
          prevDropDownsValue?.dropDownsValue?.projectType.value !== dropDownsValue.projectType.value ||
          prevDropDownsValue?.dropDownsValue?.projectSubType?.value !== dropDownsValue.projectSubType.value
        )
          dispatch(
            getRETowerV2Action({
              reAssetId: project?.REAssetId,
              projectType: dropDownsValue.projectType.value,
              projectSubType: dropDownsValue.projectSubType.value,
              phase: dropDownsValue.phase.value,
            }),
          );
        if (dropDownsValue?.unitLocationSubTypeName?.value) {
          if (
            prevDropDownsValue?.dropDownsValue?.phase?.value !== dropDownsValue.phase.value ||
            prevDropDownsValue?.dropDownsValue?.projectType?.value !== dropDownsValue.projectType.value ||
            prevDropDownsValue?.dropDownsValue?.projectSubType?.value !== dropDownsValue.projectSubType.value ||
            prevDropDownsValue?.dropDownsValue?.unitLocationSubTypeName?.value !== dropDownsValue.unitLocationSubTypeName.value
          )
            dispatch(
              getREWingV2Action({
                reAssetId: project?.REAssetId,
                projectType: dropDownsValue.projectType.value,
                projectSubType: dropDownsValue.projectSubType.value,
                phase: dropDownsValue.phase.value,
                unitLocationSubTypeName: dropDownsValue.unitLocationSubTypeName.value,
              }),
            );
          if (dropDownsValue?.unitLocationWing?.value) {
            if (
              prevDropDownsValue?.dropDownsValue?.phase?.value !== dropDownsValue.phase.value ||
              prevDropDownsValue?.dropDownsValue?.projectType?.value !== dropDownsValue.projectType.value ||
              prevDropDownsValue?.dropDownsValue?.projectSubType?.value !== dropDownsValue.projectSubType.value ||
              prevDropDownsValue?.dropDownsValue?.unitLocationSubTypeName?.value !== dropDownsValue.unitLocationSubTypeName.value ||
              prevDropDownsValue?.dropDownsValue?.unitLocationWing?.value !== dropDownsValue.unitLocationWing.value
            )
              dispatch(
                getREUnitOwnedByAction({
                  reAssetId: project?.REAssetId,
                  projectType: dropDownsValue.projectType.value,
                  projectSubType: dropDownsValue.projectSubType.value,
                  phase: dropDownsValue.phase.value,
                  unitLocationSubTypeName: dropDownsValue.unitLocationSubTypeName.value,
                  wing: dropDownsValue.unitLocationWing.value,
                }),
              );
          } else {
            dispatch(resetREUnitOwnedByAction());
            setCustomDropDownsValue(value => ({
              ...value,
              unitOwnedBy: undefined,
            }));
          }
        } else {
          dispatch(resetREWingV2Action());
          dispatch(resetREUnitOwnedByAction());
          setDropDownsValue(value => ({
            ...value,
            unitLocationWing: undefined,
          }));
          setCustomDropDownsValue(value => ({
            ...value,
            unitOwnedBy: undefined,
          }));
        }
      } else {
        dispatch(resetRETowerV2Action());
        dispatch(resetREWingV2Action());
        dispatch(resetREUnitOwnedByAction());
        setDropDownsValue(value => ({
          ...value,
          unitLocationSubTypeName: undefined,
          unitLocationWing: undefined,
        }));
        setCustomDropDownsValue(value => ({
          ...value,
          unitOwnedBy: undefined,
        }));
      }
    } else {
      dispatch(resetREProjectSubTypeAction());
      dispatch(resetRETowerV2Action());
      dispatch(resetREWingV2Action());
      dispatch(resetREUnitOwnedByAction());
      setDropDownsValue(value => ({
        ...value,
        projectSubType: undefined,
        unitLocationSubTypeName: undefined,
        unitLocationWing: undefined,
      }));
      setCustomDropDownsValue(value => ({
        ...value,
        unitOwnedBy: undefined,
      }));
    }
  }, [
    dropDownsValue?.phase?.value,
    dropDownsValue?.projectType?.value,
    dropDownsValue?.projectSubType?.value,
    dropDownsValue?.unitLocationSubTypeName?.value,
    dropDownsValue?.unitLocationWing?.value,
  ]);

  useEffect(() => {
    callDashboardDetailApi();
  }, [dropDownsValue?.misDate, dropDownValueToCallAPI]);

  const dropDowns: dropDownsType[] = useMemo(() => {
    return [
      {
        label: "MIS Date",
        name: "misDate",
        id: "label",
        value: "value",
        options: salesMisHistory,
        singleSelect: true,
      },
      {
        label: "Phase",
        name: "phase",
        id: "label",
        value: "value",
        options:
          phase?.data?.projectPhases && phase?.data?.projectPhases.length > 0
            ? convertIntoSelectArray(phase?.data?.projectPhases, "projectPhase", "projectPhase")
            : [],
        singleSelect: true,
        isClearable: true,
      },
      {
        label: "Product Type",
        name: "projectType",
        id: "label",
        value: "value",
        options: reProjectType,
        singleSelect: true,
        isClearable: true,
      },
      // {
      //   label: "Product Subtype",
      //   name: "projectSubType",
      //   id: "label",
      //   value: "value",
      //   options: reProjectSubType,
      //   singleSelect: true,
      //   isClearable: true,
      // },
      // {
      //   label: "Development Type",
      //   name: "unitLocationSubTypeName",
      //   id: "label",
      //   value: "value",
      //   options: reTowerV2,
      //   singleSelect: true,
      //   isClearable: true,
      // },
      // {
      //   label: "Wing",
      //   name: "unitLocationWing",
      //   id: "label",
      //   value: "value",
      //   options: reWingV2,
      //   singleSelect: true,
      //   isClearable: true,
      // },
    ];
  }, [phase?.data?.projectPhases, salesMisHistory, reProjectType, reProjectSubType, reTowerV2, reWingV2]);

  const customDropDowns: customDropDownsType[] = useMemo(() => {
    return [
      {
        label: "Unit Owned By",
        name: "unitOwnedBy",
        id: "label",
        value: "value",
        options: reUnitOwnedBy,
        singleSelect: true,
        isClearable: true,
      },
      {
        label: "Launch Status",
        name: "launchStatus",
        id: "label",
        value: "value",
        options: reUnitLaunchStatus ?? [],
        singleSelect: true,
        isClearable: true,
      },
      {
        label: "Security Status",
        name: "securityStatus",
        id: "label",
        value: "value",
        options: reUnitSecurityStatus ?? [],
        singleSelect: true,
        isClearable: true,
      },
      {
        label: "Approval Status",
        name: "approvalStatus",
        id: "label",
        value: "value",
        options: reUnitApprovalStatus ?? [],
        singleSelect: true,
        isClearable: true,
      },
      // {
      //   label: "Start Date",
      //   name: "startDate",
      //   date: true,
      //   minDate: new Date(bookingDate), // add booking date
      //   maxDate: dropDownsValue?.misDate?.value
      //     ? new Date(dropDownsValue?.misDate?.value)
      //     : undefined,
      // },
      // {
      //   label: "End Date",
      //   name: "endDate",
      //   date: true,
      //   minDate: customDropDownsValue?.startDate,
      //   maxDate: dropDownsValue?.misDate?.value
      //     ? new Date(dropDownsValue?.misDate?.value)
      //     : undefined,
      // },
    ];
  }, [reUnitLaunchStatus, reUnitSecurityStatus, reUnitApprovalStatus, reUnitOwnedBy, customDropDownsValue?.startDate, dropDownsValue?.misDate]);

  useEffect(() => {
    if (printPDF) {
      setTimeout(
        () =>
          generateMultipagePDF(
            [areaSummaryTabref, priceVelocityTabRef, demandCollectionTabRef, slowMovingInventoryTabRef, microMarketTabRef, otherInsightsTabRef],
            setPrintPDF,
          ),
        10000,
      );
      // generatePDF(images, setPrintPDF);
    }
  }, [printPDF]);

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
      {
        title: "Custom Filters",
        icon: faFilter,
        filters: true,
      },
    ];
  }, [addRemark, setPrintPDF, setAddRemark]);

  const pageHeader = useMemo(() => {
    return (
      <div className='padding-none'>
        <div className='main-color p-2 d-flex justify-content-between dashboard-heading heading-bg-color'>
          <span className='dashboard-heading-text'>{`Sales Dashboard - ${salesDashboard.dashboardDetailsv2?.data?.assetname}`}</span>
          {/* <img className="dashboard-heading-logo" src={Logo} alt="Logo" /> */}
          <DashboardIcons
            customDropDowns={customDropDowns}
            customDropDownsValue={customDropDownsValue}
            setCustomDropDownsValue={setCustomDropDownsValue}
            iconsList={iconsList}
          />
        </div>
      </div>
    );
  }, [addRemark, customDropDowns, customDropDownsValue, salesDashboard.dashboardDetailsv2?.data?.assetname]);

  const dropDownElements = useMemo(() => {
    return (
      <div className='row sticky-top sticky-header pt-2 pb-2 m-0 ' style={{ transition: "background-color 0.3s ease" }}>
        <SelectOrMultiselect id='salesdashboardv2' dropDowns={dropDowns} dropDownsValue={dropDownsValue} setDropDownsValue={setDropDownsValue} />
      </div>
    );
  }, [dropDowns, dropDownsValue]);

  const saveRemarkRequest: InsertDashboardRemarkPayload = useMemo(() => {
    return {
      moduleId: project?.REAssetId ?? "",
      module: modules.Sale,
      misDate: dropDownsValue?.misDate?.value,
      dashboardName: salesDashboardName.Sales,
      chartName: "",
      remark: "",
      addedBy: "",
      createdBy: userDetails.EmailId,
      filters: [
        {
          filterName: "phase",
          filterValue: dropDownValueToCallAPI.phase,
        },
        {
          filterName: "projectType",
          filterValue: dropDownValueToCallAPI.projectType,
        },
        {
          filterName: "projectSubType",
          filterValue: dropDownValueToCallAPI?.projectSubType,
        },
        {
          filterName: "unitLocationSubTypeName",
          filterValue: dropDownValueToCallAPI?.unitLocationSubTypeName,
        },
        {
          filterName: "unitLocationWing",
          filterValue: dropDownValueToCallAPI?.unitLocationWing,
        },
        {
          filterName: "unitOwnedBy",
          filterValue: dropDownValueToCallAPI?.unitOwnedBy,
        },
        {
          filterName: "launchStatus",
          filterValue: dropDownValueToCallAPI?.launchStatus,
        },
        {
          filterName: "securityStatus",
          filterValue: dropDownValueToCallAPI?.securityStatus,
        },
        {
          filterName: "approvalStatus",
          filterValue: dropDownValueToCallAPI?.approvalStatus,
        },
      ],
    };
  }, [dropDownValueToCallAPI, project?.REAssetId, dropDownsValue?.misDate?.value]);

  return (
    <div>
      {(salesDashboard.loading || printPDF || dashboardRemark.loading.getDashboardRemark || dashboardRemark.loading.insertDashboardRemark) && (
        <SpinnerComponent />
      )}
      {pageHeader}
      {dropDownElements}

      <SwitchTab ButtonTab={ButtonTab} width='180px' setActiveTab={setActiveTab} activeTab={activeTab} />

      <div className='mt-3'>
        {(activeTab === ButtonTab[4].id || printPDF) && (
          <div ref={microMarketTabRef}>
            <MicroMarketTab addRemark={addRemark} remarks={remarks} setRemarks={setRemarks} saveRequest={saveRemarkRequest} />
          </div>
        )}
        {(activeTab === ButtonTab[0].id || printPDF) && (
          <div ref={areaSummaryTabref}>
            {printPDF && pageHeader}
            {printPDF && dropDownElements}
            <AreaSummaryTab addRemark={addRemark} remarks={remarks} setRemarks={setRemarks} printPDF={printPDF} saveRequest={saveRemarkRequest} />
          </div>
        )}
        {(activeTab === ButtonTab[1].id || printPDF) && (
          <div ref={priceVelocityTabRef}>
            <PriceVelocityTab addRemark={addRemark} remarks={remarks} setRemarks={setRemarks} saveRequest={saveRemarkRequest} />
          </div>
        )}
        {(activeTab === ButtonTab[2].id || printPDF) && (
          <div ref={demandCollectionTabRef}>
            <DemandCollectionTab addRemark={addRemark} remarks={remarks} setRemarks={setRemarks} saveRequest={saveRemarkRequest} />
          </div>
        )}
        {(activeTab === ButtonTab[3].id || printPDF) && (
          <div ref={slowMovingInventoryTabRef}>
            <SlowMovingInventoryTab addRemark={addRemark} remarks={remarks} setRemarks={setRemarks} printPDF={printPDF} saveRequest={saveRemarkRequest} />
          </div>
        )}

        {(activeTab === ButtonTab[5].id || printPDF) && (
          <div ref={otherInsightsTabRef}>
            <OtherInsightsTab addRemark={addRemark} remarks={remarks} setRemarks={setRemarks} saveRequest={saveRemarkRequest} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesDashboardv2Page;
