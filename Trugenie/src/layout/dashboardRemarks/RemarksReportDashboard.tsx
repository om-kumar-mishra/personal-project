import React, { useEffect, useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import clockRotateIcon from "../../assets/nikeIcons/7 - Remark history.svg";
import checkIcon from "../../assets/nikeIcons/8-Ticks.svg";
// import copyIcon from "../../assets/nikeIcons/6- Save.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import SimpleTable from "../../widgets/tables/SimpleTable";
import withModal from "../../hoc/withModal";
import {
  DashboardRemarkInputType,
  IconListType,
  RemarkHistoryListType,
  RemarkHistoryTableTypes,
  RemarksObjType,
  RemarksReportBtnType,
  ViewReportTableTypes,
  historyOpen,
} from "./Datatypes";
import Select from "react-select";
import { MultiSelect, Option } from "react-multi-select-component";
import { convertDateFormatYY, customValueRendererMultiSelect } from "../../utils/commonFunctions";
import { useDispatch, useSelector } from "react-redux";
// import { setFullScreen } from "../lib/services/common/action";
import { AppState } from "../../lib/common/appState";
import usePrevious from "../../hooks/usePrevious";
import {
  getDashboardRemarkAction,
  insertDashboardRemarkAction,
  resetDashboardRemarkAction,
  resetInsertDashboardRemarkAction,
} from "../../lib/services/dashboardRemarks/action";
import { InsertDashboardRemarkPayload } from "../../lib/services/dashboardRemarks/dataType";
import { selectUserDetails } from "../../lib/services/hdfc_login/selectors";
import { UserDetails } from "../../lib/services/hdfc_login/dataTypes";
import { successNotification, errorNotification } from "../../modules/Components/UtilityFunctions";
import { defaultIconSize } from "../../assets/constants";

const DashboardIconsComponent: React.FC<RemarksReportBtnType> = ({ customDropDowns, customDropDownsValue, setCustomDropDownsValue, iconsList }) => {
  // const dispatch = useDispatch();
  // const commonReducer = useSelector((state: AppState) => state.commonReducer);
  const [viewReportOpen, setViewReportOpen] = useState<boolean>(false);
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const iconSize = "xl";

  return (
    <>
      <div className='d-flex align-items-center'>
        {iconsList.map((v: IconListType) => (
          <FontAwesomeIcon
            key={v.title}
            title={v.title}
            icon={v.icon}
            className={`${v.className ?? "dashboard-icons"}`}
            size={v.size ?? iconSize}
            onClick={v.filters ? () => setFilterOpen(!viewReportOpen) : v.viewReport ? () => setViewReportOpen(!viewReportOpen) : v.onClick}
          />
        ))}

        {/* <FontAwesomeIcon
          title="Fullscreen"
          icon={faCompress}
          className="dashboard-icons"
          size={iconSize}
          onClick={() => dispatch(setFullScreen(!commonReducer.isFullScreen))}
        /> */}
      </div>

      <ViewReportTableWithModal isOpen={viewReportOpen} setIsOpen={setViewReportOpen} title='View Report' id='DashboardViewReport' data={[]} />
      <ViewFilterWithModal
        isOpen={filterOpen}
        setIsOpen={setFilterOpen}
        title='Custom Filter'
        id='DashboardCustomFilter'
        position='modal-top-right'
        removeFooter={true}
        dropDowns={customDropDowns}
        dropDownsValue={customDropDownsValue}
        setDropDownsValue={setCustomDropDownsValue}
      />
    </>
  );
};

export const DashboardIcons = React.memo(DashboardIconsComponent);

const DashboardRemarkInputComponent: React.FC<DashboardRemarkInputType> = ({ addRemark, remarkKey, remarks, setRemarks, saveRequest }) => {
  const dispatch = useDispatch();
  const [showRemarkMessage, setShowRemarkMessage] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<historyOpen>({});
  const [copyText, setCopyText] = useState<string>("");
  const [showHistoryKey, setShowHistoryKey] = useState<string>("");
  const userDetails = useSelector(selectUserDetails) as UserDetails;
  const dashboardRemark = useSelector((state: AppState) => state.dashboardRemark);
  const prevValues: any = usePrevious({ remarks });
  const RemarkOnChange = (value: string | null) => {
    setRemarks((prev: RemarksObjType) => ({
      ...prev,
      [remarkKey]: value ?? "",
    }));
  };

  useEffect(() => {
    if (dashboardRemark?.insertDashboardRemark?.info.code) {
      setShowRemarkMessage(true);
      setTimeout(() => setShowRemarkMessage(false), 2000);
    }
  }, [dashboardRemark?.insertDashboardRemark?.info.code]);

  useEffect(() => {
    if (!showRemarkMessage) {
      dispatch(resetInsertDashboardRemarkAction());
    }
  }, [showRemarkMessage]);

  useEffect(() => {
    if (copyText && remarkKey) {
      RemarkOnChange(copyText);
      setCopyText("");
    }
  }, [copyText, remarkKey]);

  const setHistoryOpen = (b: boolean) => {
    !b && setShowHistoryKey("");
    setIsOpen((open: historyOpen) => ({ ...open, [showHistoryKey]: b }));
  };

  useEffect(() => {
    if (dashboardRemark?.getDashboardRemark?.data && showHistoryKey) {
      setHistoryOpen(true);
    }
  }, [dashboardRemark?.getDashboardRemark?.data]);

  useEffect(() => {
    if (!isOpen && dashboardRemark?.getDashboardRemark?.data) {
      dispatch(resetDashboardRemarkAction());
    }
  }, [isOpen]);

  const getRowsLength = useMemo(() => {
    if (remarks?.[remarkKey]) {
      const len = remarks[remarkKey]?.length;
      if (len > 800) return 5;
      else if (len > 600) return 4;
      else if (len > 400) return 3;
      else if (len > 200) return 2;
      else return 1;
    } else return 1;
  }, [remarks?.[remarkKey]?.length]);

  const saveRemark = () => {
    const req: InsertDashboardRemarkPayload = {
      ...saveRequest,
      addedBy: userDetails?.EmpName,
      createdBy: userDetails?.EmailId,
      chartName: remarkKey,
      remark: remarks[remarkKey],
    };
    dispatch(insertDashboardRemarkAction(req));
  };

  const getHistoryList = () => {
    const request = {
      moduleId: saveRequest.moduleId,
      module: saveRequest.module,
      misDate: saveRequest.misDate,
      dashboardName: saveRequest.dashboardName,
      chartName: remarkKey,
    };
    dispatch(getDashboardRemarkAction(request));
  };

  useEffect(() => {
    if (showRemarkMessage) {
      dashboardRemark.insertDashboardRemark.info.code === 100
        ? successNotification(dashboardRemark.insertDashboardRemark.info.message)
        : errorNotification(dashboardRemark.insertDashboardRemark.info.message);
    }
  }, [showRemarkMessage]);

  return (
    <>
      <div className='form-group d-flex align-items-center mt-2'>
        <label htmlFor='remark' className='select-lable' style={{ margin: "20px", fontSize: "14px" }}>
          Remark
        </label>
        <textarea
          className='form-control main-body'
          id='remark'
          rows={getRowsLength}
          disabled={!addRemark}
          maxLength={1000}
          value={remarks?.[remarkKey] ?? ""}
          onChange={(e: any) => {
            RemarkOnChange(e.target.value);
          }}></textarea>
        {addRemark && (
          <img
            src={checkIcon}
            className={!remarks?.[remarkKey] || prevValues?.remarks?.[remarkKey] === remarks?.[remarkKey] ? "disabled-icon" : "filter-green"}
            style={{ ...defaultIconSize, margin: "1em 0 1em 1em", marginLeft: "20px", cursor: "pointer" }}
            onClick={saveRemark}
          />
        )}
        <img
          src={clockRotateIcon}
          style={{ ...defaultIconSize, margin: "1em", marginLeft: "20px", cursor: "pointer" }}
          onClick={() => {
            getHistoryList();
            setShowHistoryKey(remarkKey);
          }}
        />
      </div>
      <RemarkHistoryTableWithModal
        isOpen={isOpen[showHistoryKey]}
        setIsOpen={setHistoryOpen}
        title='Remark History'
        id={remarkKey}
        data={dashboardRemark?.getDashboardRemark?.data ?? []}
        setCopyText={setCopyText}
        addRemark={addRemark}
      />
    </>
  );
};

export const DashboardRemarkInput = React.memo(DashboardRemarkInputComponent);

export const RemarkHistoryTable: React.FC<RemarkHistoryTableTypes> = ({ id, data, setCopyText, addRemark }) => {
  const tableData = {
    id: id,
    columns: [
      {
        name: "MIS Date",
        key: "misdate",
        formatValue: (value: string) => `${convertDateFormatYY(value)}`,
      },
      {
        name: "Remarks Added By",
        key: "addedBy",
      },
      {
        name: "Remark Added On",
        key: "createdAt",
        formatValue: (value: string) => `${convertDateFormatYY(value)}`,
      },
      {
        name: "Remark",
        key: "remark",
        string: true,
        icon: {
          icon: faCopy,
          onClick: (row: RemarkHistoryListType) => {
            addRemark && setCopyText(row?.remark);
          },
          className: !addRemark ? "disabled-icon" : "",
        },
      },
    ],
    data: data,
  };
  return <SimpleTable tableData={tableData} headerColorClass='active-red' />;
};

export const RemarkHistoryTableWithModal = React.memo(withModal(RemarkHistoryTable));

export const ViewReportTable: React.FC<ViewReportTableTypes> = ({ id, data }) => {
  const tableData = {
    id: id,
    columns: [
      {
        name: "User Name",
        key: "userName",
      },
      {
        name: "Entity",
        key: "entity",
      },
      {
        name: "MIS Date",
        key: "misDate",
      },
      {
        name: "Report Generated On",
        key: "reportGeneratedOn",
      },
      {
        name: "Action",
        key: "file",
      },
      {
        name: "Phase",
        key: "phase",
      },
      {
        name: "Tower",
        key: "tower",
      },
      {
        name: "Wing",
        key: "wing",
      },
    ],
    data: data,
  };
  return <SimpleTable tableData={tableData} headerColorClass='active-red' />;
};

export const ViewReportTableWithModal = React.memo(withModal(ViewReportTable));

export type customDropDownsType = {
  label: string;
  name: string;
  id?: string;
  value?: string;
  options?: Option[];
  singleSelect?: boolean;
  date?: boolean;
  minDate?: Date;
  maxDate?: Date;
  isClearable: boolean;
};

export interface CustomDropDownProps {
  [key: string]: any;
}

interface ViewFilterTypes {
  dropDowns: customDropDownsType[];
  dropDownsValue: CustomDropDownProps;
  setDropDownsValue: (obj: CustomDropDownProps) => void;
}

export const ViewFilter: React.FC<ViewFilterTypes> = ({ dropDowns, dropDownsValue, setDropDownsValue }) => {
  return (
    <>
      {dropDowns.map((v: customDropDownsType) => (
        <div key={v.name} className='row d-flex align-items-center mb-3 main-body'>
          <label className='select-lable col-md-3 m-0' htmlFor={`select-${v.name}`}>
            {v.label}:
          </label>
          {v?.date ? (
            <div className='col-md-9'>
              <DatePicker
                selected={dropDownsValue[v.name]}
                onChange={date => {
                  setDropDownsValue({
                    ...dropDownsValue,
                    [v.name]: date,
                  });
                }}
                dateFormat='dd/MM/yyyy'
                minDate={v?.minDate ?? null}
                maxDate={v?.maxDate ?? null}
                className='dashboard-filter-date'
                // withPortal
              />
            </div>
          ) : (
            <>
              {v?.singleSelect ? (
                <Select
                  options={v?.options ?? []}
                  className=' col-md-9'
                  value={dropDownsValue[v.name] ?? []}
                  onChange={(e: any) => {
                    setDropDownsValue({
                      ...dropDownsValue,
                      [v.name]: e,
                    });
                  }}
                  isClearable={v?.isClearable}
                />
              ) : (
                <MultiSelect
                  options={v?.options ?? []}
                  className=' col-md-9'
                  value={dropDownsValue[v.name] ?? []}
                  onChange={(e: any) => {
                    setDropDownsValue({
                      ...dropDownsValue,
                      [v.name]: e,
                    });
                  }}
                  labelledBy='Select'
                  ClearSelectedIcon={true}
                  valueRenderer={customValueRendererMultiSelect}
                />
              )}
            </>
          )}
        </div>
      ))}
      {/* <button
        style={{
          backgroundColor: "#259B2E",
          color: "#fff",
          padding: "0.5em 1em",
          float: "right",
          borderRadius: "10px",
          border: "none",
          fontWeight: 600,
        }}
      >
        Submit
      </button> */}
    </>
  );
};

export const ViewFilterWithModal = React.memo(withModal(ViewFilter));
