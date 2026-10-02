/* eslint-disable @typescript-eslint/ban-types */
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { InsertDashboardRemarkPayload } from "../../lib/services/dashboardRemarks/dataType";
import {
  CustomDropDownProps,
  customDropDownsType,
} from "./RemarksReportDashboard";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";

export interface IconListType {
  title: string;
  icon: IconDefinition;
  className?: string;
  size?: SizeProp;
  remark?: boolean;
  viewReport?: boolean;
  filters?: boolean;
  onClick?: (val?: any) => void;
}

export interface RemarksReportBtnType {
  // addRemark: boolean;
  // setAddRemark: (b: boolean) => void;
  // handlePrint: () => void;
  customDropDowns?: customDropDownsType[];
  customDropDownsValue?: CustomDropDownProps;
  setCustomDropDownsValue?: (obj: CustomDropDownProps) => void;
  iconsList: IconListType[];
}

export interface RemarkHistoryListType {
  misDate: string;
  remarkBy: string;
  entity: string;
  remarkAddedOn: string;
  remark: string;
  phase: string;
  tower: string;
  wing: string;
}

export interface RemarkHistoryTableTypes {
  id: string;
  data: RemarkHistoryListType[];
  setCopyText: (str: string) => void;
  addRemark: boolean;
}

export interface ViewReportListType {
  userName: string;
  entity: string;
  misDate: string;
  reportGeneratedOn: string;
  file: string;
  phase: string;
  tower: string;
  wing: string;
}

export interface ViewReportTableTypes {
  id: string;
  data: ViewReportListType[];
}

export interface DashboardRemarkInputType {
  addRemark: boolean;
  remarkKey: string;
  setRemarks: (str: RemarksObjType | {}) => void;
  remarks: RemarksObjType;
  saveRequest: InsertDashboardRemarkPayload;
}

export interface RemarksObjType {
  [key: string]: string;
}

export interface historyOpen {
  [key: string]: boolean;
}
