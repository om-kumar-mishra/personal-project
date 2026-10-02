import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../lib/common/appState";
import { Project } from "../../../lib/services/HDFC/Project/dataTypes";
import { selectSetProject } from "../../../lib/services/HDFC/Project/selectors";
import { UserDetails } from "../../../lib/services/hdfc_login/dataTypes";
import { selectUserDetails } from "../../../lib/services/hdfc_login/selectors";
import { getNOCDashboardTowerView, getNocDashboardDetails, getREWing } from "../../../lib/services/nocDashboard/action";
import {
  BuildingTowerViewFloorListType,
  BuildingTowerViewType,
  NocTowerViewListType,
  daysPastNocDpnDetailsListType,
  daysPastNocDpnListType,
} from "../../../lib/services/nocDashboard/datatypes";
import { getSalesPhase, getSalesTower } from "../../../lib/services/salesDashboard/action";
import { arrSort, sumArrayofObj, sumArrayofObjFixedTwo } from "../../../utils/commonFunctions";
import { DATE_FORMAT, DEFAULT_ALL } from "../../../utils/constants";
import FallBackUIDataNotAvailable from "../../../widgets/charts/FallBackUIDataNotAvailable";
import { numberWithCommasAndFraction } from "../../../widgets/charts/Recharts/utils";
import SpinnerComponent from "../../Components/SpinnerComponent";
import CompareBarChartComponent from "./NOCCompareGraph";
import NOCDaysPastGraph from "./NOCDaysPastGraph";
import NOCDaysPastTable from "./NOCDaysPastTable";
import NocFloorUnitsTable from "./NOCStatusTable";
import NOCTotalUnitsGraph from "./NOCTotalUnitsGraph";
import dayjs from "dayjs";

interface NocDropDowns {
  [key: string]: string;
  phase: string;
  tower: string;
  wing: string;
}
interface TowerDropDowns {
  [key: string]: string;
  phase: string;
  tower: string;
  wing: string;
}

const NOCDashboardPage: React.FC = () => {
  const dispatch = useDispatch();
  const { salesDashboard, nocDashboardReducer, login } = useSelector((state: AppState) => ({
    salesDashboard: state.salesDashboard,
    nocDashboardReducer: state.nocDashboardReducer,
    login: state.login,
  }));
  const { phase, tower } = salesDashboard;
  const { wings, dashboardDetails, towerView } = nocDashboardReducer;
  const project = useSelector(selectSetProject) as Project;
  const userDetails = useSelector(selectUserDetails) as UserDetails;
  const defaultDropDownValues: NocDropDowns = {
    phase: DEFAULT_ALL,
    tower: DEFAULT_ALL,
    wing: DEFAULT_ALL,
  };
  const [dropDownsValue, setDropDownsValue] = useState<NocDropDowns>(defaultDropDownValues);
  const deafultTowerDropDownValues: TowerDropDowns = {
    phase: "",
    tower: "",
    wing: "",
  };
  const [towerDropDownsValue, setTowerDropDownsValue] = useState<TowerDropDowns>(deafultTowerDropDownValues);
  console.log("towerDropDownsValue: ", towerDropDownsValue);
  const [daysPastNocIndex, setDaysPastNocIndex] = useState<number>();
  const [nocDPNIndex, setNocDPNIndex] = useState<number>();
  const [daysPastNocDpnDetailsList, setDaysPastNocDpnDetailsList] = useState<daysPastNocDpnDetailsListType[]>([]);
  const [daysPastNocDpnList, setDaysPastNocDpnList] = useState<daysPastNocDpnListType[]>([]);
  const [buildingTowerView, setBuildingTowerView] = useState<BuildingTowerViewType | undefined>(undefined);

  const handleBarChange = (index: number) => {
    setNocDPNIndex(index);
  };

  useEffect(() => {
    if (project?.REAssetId) {
      dispatch(getSalesPhase(project?.REAssetId));
      dispatch(getSalesTower(project?.REAssetId));
      dispatch(getREWing(project?.REAssetId));
      dispatch(
        getNOCDashboardTowerView({
          reAssetId: project?.REAssetId,
          emailId: userDetails.EmailId,
        }),
      );
    }
  }, [project?.REAssetId]);

  useEffect(() => {
    if (project?.REAssetId && dropDownsValue.phase && dropDownsValue.tower && dropDownsValue.wing) {
      dispatch(
        getNocDashboardDetails({
          reAssetId: project?.REAssetId,
          phase: dropDownsValue.phase,
          tower: dropDownsValue.tower,
          wing: dropDownsValue.wing,
          emailId: userDetails.EmailId,
        }),
      );
    }
  }, [dropDownsValue, project?.REAssetId]);

  useEffect(() => {
    if (dashboardDetails?.data?.daysPastNocDpnDetailsList && dashboardDetails.data.daysPastNocDpnDetailsList.length > 0) {
      const array = ["0-30", "31-60", "61-90", "91-120", "120++"];
      const arr: daysPastNocDpnListType[] = [];
      array.forEach(a => {
        const filterList = dashboardDetails.data.daysPastNocDpnDetailsList.filter((v: daysPastNocDpnDetailsListType) => v.bucketing === a);
        if (filterList.length > 0) {
          const sqft = sumArrayofObjFixedTwo(filterList, "sqft");

          //To make typescript
          const obj = {
            daysPastDuedate: a,
            unitNo: filterList.length,
            list: filterList,
            sqft: sqft,
          };

          arr.push(obj);
        }
      });
      setDaysPastNocDpnList(arr);
    } else {
      setDaysPastNocDpnList([]);
    }
  }, [dashboardDetails?.data?.daysPastNocDpnDetailsList]);

  useEffect(() => {
    if (nocDPNIndex !== null && nocDPNIndex !== undefined && daysPastNocDpnList.length > 0 && nocdpnLabel[nocDPNIndex]) {
      const filterList = daysPastNocDpnList.filter(v => v.daysPastDuedate === nocdpnLabel[nocDPNIndex]);
      setDaysPastNocDpnDetailsList(filterList[0].list);
    } else {
      setDaysPastNocDpnDetailsList([]);
    }
  }, [nocDPNIndex]);

  const dropDownList = useMemo(() => {
    const optionsTower =
      phase?.data?.projectPhases && phase.data.projectPhases.length > 0 && towerDropDownsValue.phase && phase.data.unitSubType
        ? phase.data.unitSubType.filter(v => v.projectPhase === towerDropDownsValue.phase)
        : [];
    const optionsWing =
      phase?.data?.projectPhases && phase.data.projectPhases.length > 0 && towerDropDownsValue.phase && phase.data.unitWing && towerDropDownsValue.tower
        ? phase.data.unitWing.filter(v => v.projectPhase === towerDropDownsValue.phase && v.unitLocationSubTypeName === towerDropDownsValue.tower)
        : [];
    return [
      {
        label: "Phase",
        name: "phase",
        id: "projectPhase",
        value: "projectPhase",
        options: phase?.data?.projectPhases ?? [],
        optionsTower: phase?.data?.projectPhases ?? [],
        visible: phase?.data?.projectPhases && phase?.data?.projectPhases.length > 0,
      },
      {
        label: "Product Sub Type",
        name: "tower",
        id: "unitLocationSubTypeName",
        value: "unitLocationSubTypeName",
        options: tower?.data?.unitLocationSubTypeName ?? [],
        optionsTower: optionsTower,
        visible: optionsTower.length === 1 && optionsWing[0]?.unitLocationSubTypeName === "" ? false : true,
      },
      {
        label: "Wing",
        name: "wing",
        id: "unitLocationWing",
        value: "unitLocationWing",
        options: wings?.data?.unitLocationWing ?? [],
        optionsTower: optionsWing,
        visible: optionsWing.length === 1 && optionsWing[0]?.unitLocationWing === "" ? false : true,
      },
    ];
  }, [phase?.data?.projectPhases, towerDropDownsValue, tower?.data?.unitLocationSubTypeName, wings?.data?.unitLocationWing]);

  useEffect(() => {
    if (project?.REAssetId && phase?.data?.projectPhases) {
      const obj = { ...towerDropDownsValue };
      if (phase.data.projectPhases.length > 0) {
        obj.phase = towerDropDownsValue.phase === "" ? phase.data.projectPhases[0].projectPhase : towerDropDownsValue.phase;
        const towerval = phase.data?.unitSubType ? phase.data.unitSubType.find(v => v.projectPhase === obj.phase)?.unitLocationSubTypeName : undefined;
        obj.tower = towerval;
        const wingVal =
          phase.data.unitWing && towerval
            ? phase.data.unitWing.find(v => v.projectPhase === obj.phase && v.unitLocationSubTypeName === tower)?.unitLocationWing
            : undefined;
        obj.wing =
          phase.data.unitWing && towerval
            ? phase.data.unitWing.find(v => v.projectPhase === obj.phase && v.unitLocationSubTypeName === tower)?.unitLocationWing
            : undefined;
      }
      setTowerDropDownsValue(obj);
    }
  }, [phase?.data?.projectPhases, towerDropDownsValue.phase]);

  useEffect(() => {
    //tower view logic
    if (towerView?.data?.nocFloorList && towerView.data.nocFloorList.length > 0) {
      const list = towerView.data.nocFloorList;
      const floorList = new Set();
      const filteredList: NocTowerViewListType[] = [];
      list.forEach((v: NocTowerViewListType) => {
        if (
          (!towerDropDownsValue.phase || v.phase === towerDropDownsValue.phase) &&
          (!towerDropDownsValue.tower || v.tower === towerDropDownsValue.tower) &&
          (!towerDropDownsValue.wing || v.wing === towerDropDownsValue.wing)
        ) {
          floorList.add(v.unitFloor);
          filteredList.push(v);
        }
      });
      const setUnitFloor: string[] = arrSort(Array.from(floorList)).reverse();
      const nocFloorList: BuildingTowerViewFloorListType[] = [];
      let maxUnits = 0;
      setUnitFloor.forEach((floor: string) => {
        const nocUnitsStatusList = filteredList.filter(v => v.unitFloor === floor);
        if (nocUnitsStatusList.length > maxUnits) maxUnits = nocUnitsStatusList.length;
        nocFloorList.push({ unitFloor: floor, nocUnitsStatusList });
      });
      setBuildingTowerView(() => ({ nocFloorList, maxUnits }));
    }
  }, [towerDropDownsValue.phase, towerDropDownsValue.tower, towerDropDownsValue.wing, towerView?.data?.nocFloorList]);

  const nocUnits = useMemo(
    () => [
      {
        id: "nocUnits-1",
        title: "Total Units",
        value: dashboardDetails?.data?.nocDashboardOverview?.totalunit ?? 0,
      },
      {
        id: "nocUnits-2",
        title: "Total Booked",
        value: dashboardDetails?.data?.nocDashboardOverview?.totalBooked ?? 0,
      },
      {
        id: "nocUnits-3",
        title: "Total Registered",
        value: dashboardDetails?.data?.nocDashboardOverview?.totalRegistered ?? 0,
      },
      {
        id: "nocUnits-4",
        title: "Total NOC Issued",
        value: dashboardDetails?.data?.nocDashboardOverview?.totalNocIssued ?? 0,
      },
      {
        id: "nocUnits-5",
        title: "Unapproved Units",
        value: dashboardDetails?.data?.nocDashboardOverview?.unapprovedUnits ?? 0,
      },
    ],
    [dashboardDetails?.data?.nocDashboardOverview],
  );

  const nocAmountPaidTableRows = ["Units", "Sqft", "Sales Value (INR cr)", "Amount Received (INR cr)", "Receivable (INR cr)"];

  const nocdpnLabel = useMemo(() => (daysPastNocDpnList.length > 0 ? daysPastNocDpnList.map(v => v.daysPastDuedate) : []), [daysPastNocDpnList]);

  const getFloorUnitColor = useCallback((status: string) => {
    let color = "";
    if (status === "NOC Rejected") {
      color = "units-noc-rejected-color";
    } else if (status === "NOC Approved") {
      color = "units-noc-issued-color";
    } else if (status === "NOC Cancelled") {
      color = "units-noc-cancelled-color";
    } else if (status === "NOC Pending") {
      color = "units-noc-pending-color";
    } else if (status === null) {
      color = "units-noc-unsold-color";
    }
    return color;
  }, []);

  return (
    <>
      {(salesDashboard.loading || login.loading || nocDashboardReducer.loading) && <SpinnerComponent />}
      <h4 className='p-2 m-0 main-color d-flex justify-content-between dashboard-heading heading-bg-color'>NOC Dashboard</h4>
      <div className='d-flex justify-content-end bold-text p-0 m-0 pe-2'>{dayjs().format(DATE_FORMAT)}</div>
      <div className='active mt-1 rounded-header font-bold'> NOC Overview</div>
      <div className='d-flex flex-wrap justify-content-around p-2'>
        {dropDownList.map(v => (
          <div className='d-flex align-items-center' key={v.name}>
            <label className='select-lable' style={{ marginRight: "5px" }} htmlFor={`select-${v.name}`}>
              {v.label}:
            </label>
            <select
              id={`select-${v.name}`}
              name={v.name}
              className='rounded m-1 select-others'
              value={dropDownsValue[v.name]}
              onChange={e => {
                setDropDownsValue({
                  ...dropDownsValue,
                  [v.name]: e.target.value,
                });
              }}>
              <option key={`${v.name}-0`} value='All'>
                All
              </option>
              {v.options.map((option: any, index: number) => (
                <option key={`${option[v.id]}_${index}`} value={option[v.id]}>
                  {option[v.value]}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <div className='d-flex flex-wrap justify-content-around text-center mt-2 mb-2'>
        {nocUnits &&
          nocUnits.map(v => (
            <div key={v.id} className='flex-unit-border rounded'>
              <h6 className='main-color font-bold'>{v.title}</h6>
              <h6 className='font-bold m-0'>{v.value ? numberWithCommasAndFraction(v.value, import.meta.env.VITE_REACT_APP_UNIT_DECIMAL) : "-"}</h6>
            </div>
          ))}
      </div>
      <div className='active mt-1 rounded-header font-bold'>Days Pending NOC Analysis</div>
      <div className='row m-0 p-2'>
        <NOCTotalUnitsGraph data={dashboardDetails?.data?.daysPendingNOCAnalysisTotalUnits ?? {}} />
        <NOCDaysPastGraph data={dashboardDetails?.data?.daysPastNOCCount} setDaysPastNocIndex={setDaysPastNocIndex} />
      </div>
      {(daysPastNocIndex == 0 || daysPastNocIndex == 1) && (
        <>
          <div className='active mt-1 rounded-header font-bold'>Days Past NOC</div>
          <>
            {daysPastNocIndex === 0 && (
              <div className='table-responsive' style={{ margin: "1rem auto" }}>
                <h6 className='font-bold main-color p-0'>Amount Paid</h6>
                <table className='table'>
                  <thead className='table-secondary main-color'>
                    <tr>
                      {nocAmountPaidTableRows.map((v, index) => (
                        <th key={index} className='text-center'>
                          {v}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardDetails?.data?.daysPastNocAmountList &&
                      dashboardDetails?.data?.daysPastNocAmountList.length > 0 &&
                      dashboardDetails?.data?.daysPastNocAmountList.map(v => (
                        <tr key={v.units}>
                          <td className='text-center'>{v.units}</td>
                          <td className='text-center'>{v.sqft ? numberWithCommasAndFraction(v.sqft, import.meta.env.VITE_REACT_APP_AREA_DECIMAL) : "-"}</td>
                          <td className='text-center'>
                            {v.salesvalue ? numberWithCommasAndFraction(v.salesvalue, import.meta.env.VITE_REACT_APP_INR_DECIMALS) : "-"}
                          </td>
                          <td className='text-center'>
                            {v.amountRecevied ? numberWithCommasAndFraction(v.amountRecevied, import.meta.env.VITE_REACT_APP_INR_DECIMALS) : "-"}
                          </td>
                          <td className='text-center'>
                            {v.receivable ? numberWithCommasAndFraction(v.receivable, import.meta.env.VITE_REACT_APP_INR_DECIMALS) : "-"}
                          </td>
                        </tr>
                      ))}
                    {dashboardDetails?.data?.daysPastNocAmountList && dashboardDetails?.data?.daysPastNocAmountList.length > 0 && (
                      <tr>
                        <th className='text-center'>Total</th>
                        <th className='text-center'>{sumArrayofObj(dashboardDetails?.data?.daysPastNocAmountList ?? [], "sqft")}</th>
                        <th className='text-center'>
                          {sumArrayofObj(dashboardDetails?.data?.daysPastNocAmountList ?? [], "salesvalue", val =>
                            val ? numberWithCommasAndFraction(val, import.meta.env.VITE_REACT_APP_INR_DECIMALS) : "-",
                          )}
                        </th>
                        <th className='text-center'>
                          {sumArrayofObj(dashboardDetails?.data?.daysPastNocAmountList ?? [], "amountRecevied", val =>
                            val ? numberWithCommasAndFraction(val, import.meta.env.VITE_REACT_APP_INR_DECIMALS) : "-",
                          )}
                        </th>
                        <th className='text-center'>
                          {sumArrayofObj(dashboardDetails?.data?.daysPastNocAmountList ?? [], "receivable", val =>
                            val ? numberWithCommasAndFraction(val, import.meta.env.VITE_REACT_APP_INR_DECIMALS) : "-",
                          )}
                        </th>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </>
          <>
            {daysPastNocIndex === 1 && (
              <>
                <div
                  className='border rounded'
                  style={{
                    maxHeight: "700px",
                    width: "98%",
                    margin: "1rem auto",
                    padding: "1.5rem",
                  }}>
                  {daysPastNocDpnList.length > 0 ? (
                    <CompareBarChartComponent daysPastNocDpnList={daysPastNocDpnList} setNocDPNIndex={handleBarChange} />
                  ) : (
                    <FallBackUIDataNotAvailable />
                  )}
                </div>
                {nocDPNIndex !== null && nocDPNIndex !== undefined && (
                  <div className='table-responsive'>
                    <h6 className='font-bold main-color p-0' style={{ width: "98%", margin: "auto" }}>
                      {nocdpnLabel[nocDPNIndex]}
                    </h6>
                    <NOCDaysPastTable daysPastNocDpnDetailsList={daysPastNocDpnDetailsList} />
                  </div>
                )}
              </>
            )}
          </>
        </>
      )}
      <div className='active mt-1 rounded-header font-bold'>NOC Status</div>
      <div className='border rounded table-responsive' style={{ width: "98%", margin: "1rem auto" }}>
        <div className='d-flex flex-wrap p-2'>
          {dropDownList.map(v => (
            <>
              {v.visible && (
                <div className='d-flex align-items-center m-3 mt-0 mb-0' key={v.name}>
                  <label className='select-lable' style={{ marginRight: "5px" }} htmlFor={`select-${v.name}`}>
                    {v.label}:
                  </label>
                  <select
                    id={`select-${v.name}`}
                    name={v.name}
                    className='rounded m-1 select-others'
                    value={towerDropDownsValue[v.name]}
                    onChange={e => {
                      setBuildingTowerView({ nocFloorList: [], maxUnits: 0 });
                      setTowerDropDownsValue({
                        ...towerDropDownsValue,
                        [v.name]: e.target.value,
                      });
                    }}>
                    {v.optionsTower.map((option: any, index: number) => (
                      <option key={`${option[v.id]}_${index}`} value={option[v.id]}>
                        {option[v.value]}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </>
          ))}
        </div>
        <div className='d-flex mt-3'>
          <span className='units-noc-rejected-color units-noc-legend'>Rejected</span>
          <span className='units-noc-cancelled-color units-noc-legend'>Cancelled</span>
          <span className='units-noc-issued-color units-noc-legend'>Approved</span>
          <span className='units-noc-pending-color units-noc-legend'>Pending</span>
          <span className='units-noc-unsold-color units-noc-legend'>Unsold</span>
        </div>
        <NocFloorUnitsTable buildingTowerView={buildingTowerView} getFloorUnitColor={getFloorUnitColor} />
      </div>
    </>
  );
};

export default NOCDashboardPage;
