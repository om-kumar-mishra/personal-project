import { useEffect, useMemo, useRef, useState } from "react";
import Select from "react-select";
import BuisnessPlan from "./pages/buisnessPlanTab";
import HistoricalCashFlow from "./pages/historicalTab";
import ProjectedCashFlow from "./pages/projectedTab";
import UnderWritten from "./pages/underWrittenTab";
import { useDispatch, useSelector } from "react-redux";
import { faFloppyDisk, faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { IconListType, RemarksObjType } from "../../../../layout/dashboardRemarks/Datatypes";
import { InsertDashboardRemarkPayload } from "../../../../lib/services/dashboardRemarks/dataType";
import { getNumberSystem } from "../../../../lib/services/common/selector";
import { getBuisnessPlanList, getLoaders, getMisdatesFiltersList } from "../../../../lib/services/cashflowDashboard/selectors";
import { AppState } from "../../../../lib/common/appState";
import SwitchTab, { ButtonTabType } from "../../../Components/SwitchTab";
import { convertDateFormatYY } from "../../../../utils/commonFunctions";
import { fetchBuisnessPlanListRequest, fetchMisdatesFiltersRequested } from "../../../../lib/services/cashflowDashboard/action";
import { cashflowDashboardName, modules } from "../../../../lib/services/dashboardRemarks/constants";
import SpinnerComponent from "../../../Components/SpinnerComponent";
import { DashboardIcons } from "../../../../layout/dashboardRemarks/RemarksReportDashboard";
import { selectSetProject } from "../../../../lib/services/HDFC/Project/selectors";
import { selectUserDetails } from "../../../../lib/services/hdfc_login/selectors";
import { Project } from "../../../../lib/services/HDFC/Project/dataTypes";
import { UserDetails } from "../../../../lib/services/hdfc_login/dataTypes";

export interface CashflowChildComponentPropsTypes {
  addRemark: boolean;
  remarks: RemarksObjType;
  setRemarks: (obj: RemarksObjType) => void;
  saveRequest: InsertDashboardRemarkPayload;
}
export type dropdowns = {
  startDate: { value: string; label: string } | null;
};
const CashflowDashbaordIndex = () => {
  const dispatch = useDispatch();
  const numberSystem = useSelector(getNumberSystem);
  //usestate
  const [activeTab, setActiveTab] = useState<string>("underWritten");
  const [selectedValue, setSelectedValue] = useState<any>({});
  const [addRemark, setAddRemark] = useState<boolean>(false);
  const [remarks, setRemarks] = useState<RemarksObjType>({});
  //selectors
  const misdatesfilterList = useSelector(getMisdatesFiltersList);
  const loaders = useSelector(getLoaders);
  const data = useSelector(getBuisnessPlanList);
  const {dashboardRemark } = useSelector((state: AppState) => state);
  const project = useSelector(selectSetProject) as Project;
  const userDetails = useSelector(selectUserDetails) as UserDetails;

  // tabs change
  const underWritten = useRef(null);
  const businessPlanTab = useRef(null);
  const historicalCashflowTab = useRef(null);
  const projectedCashflowTab = useRef(null);

  // tab buttons
  const ButtonTab: ButtonTabType[] = useMemo(() => {
    return [
      {
        id: "underWritten",
        value: "Underwritten",
      },
      {
        id: "businessPlan",
        value: "Business Plan",
      },
      {
        id: "historicalCashflow",
        value: "Historical Cashflow",
      },
      {
        id: "projectedCashflow",
        value: "Projected Cashflow",
      },
    ];
  }, []);

  const misdatesData = useMemo(() => {
    return misdatesfilterList && misdatesfilterList?.misDates
      ? misdatesfilterList.misDates?.map((item: string) => ({
          value: item,
          label: item ? convertDateFormatYY(item) : item,
        }))
      : [];
  }, [misdatesfilterList]);

  useEffect(() => {
    dispatch(fetchMisdatesFiltersRequested(project.REAssetId));
  }, [project.REAssetId]);

  useEffect(() => {project.REAssetId && selectedValue?.value && dispatch(fetchBuisnessPlanListRequest(project.REAssetId, selectedValue?.value));
  }, [project.REAssetId, selectedValue]);

  useEffect(() => {
    if (misdatesfilterList) setSelectedValue(misdatesData[0]);
  }, [misdatesfilterList]);

  useEffect(() => {
    if (data?.remarks) setRemarks(data.remarks);
    else setRemarks({});
  }, [data?.remarks]);

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

  const saveRemarkRequest = useMemo(() => {
    return {
      moduleId: project.REAssetId ?? "",
      module: modules.Cashflow,
      misDate: selectedValue?.value,
      dashboardName: cashflowDashboardName.Cashflow,
      chartName: "",
      remark: "",
      addedBy: "",
      createdBy: userDetails.EmailId,
      filters: [],
    };
  }, [project.REAssetId, selectedValue]);

  return (
    <div className='main-body'>
      {(loaders.buisnesPlanListLoader ||
        loaders.misdatesList ||
        dashboardRemark.loading.getDashboardRemark ||
        dashboardRemark.loading.insertDashboardRemark) && <SpinnerComponent />}
      <div className='padding-none'>
        <div className='main-color mt-1 p-2 d-flex justify-content-between dashboard-heading heading-bg-color'>
          <span className='dashboard-heading-text'>{`Cashflow Dashboard - ${data?.assetname}`}</span>
          <DashboardIcons iconsList={iconsList} />
        </div>
      </div>
      <div className='row'>
        <div className='col-md-10 col-sm-8'>
          <div className='col-md-2 col-sm-6 d-flex flex-wrap justify-content-between'>
            <label className='mb-1 mt-1 select-label'>Cashflow Date</label>
            <Select options={misdatesData} onChange={(e: any) => setSelectedValue(e)} className='p-0 w-100' value={selectedValue} />
          </div>
        </div>
        <div className='col-md-2 col-sm-4 bold-text'>
          <span className='float-end'>{`*Amount in ${numberSystem}`}</span>
        </div>
      </div>
      <SwitchTab ButtonTab={ButtonTab} width={"180px"} setActiveTab={setActiveTab} activeTab={activeTab} />

      <div className='mt-3'>
        {activeTab === ButtonTab[0].id && (
          <div ref={underWritten}>
            <UnderWritten addRemark={addRemark} remarks={remarks} setRemarks={setRemarks} saveRequest={saveRemarkRequest} />
          </div>
        )}
      </div>
      <div className='mt-3'>
        {activeTab === ButtonTab[1].id && (
          <div ref={businessPlanTab}>
            <BuisnessPlan addRemark={addRemark} remarks={remarks} setRemarks={setRemarks} saveRequest={saveRemarkRequest} />
          </div>
        )}
      </div>
      <div className='mt-3'>
        {activeTab === ButtonTab[2].id && (
          <div ref={historicalCashflowTab}>
            <HistoricalCashFlow addRemark={addRemark} remarks={remarks} setRemarks={setRemarks} saveRequest={saveRemarkRequest} />
          </div>
        )}
      </div>
      <div className='mt-3'>
        {activeTab === ButtonTab[3].id && (
          <div ref={projectedCashflowTab}>
            <ProjectedCashFlow addRemark={addRemark} remarks={remarks} setRemarks={setRemarks} saveRequest={saveRemarkRequest} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CashflowDashbaordIndex;
