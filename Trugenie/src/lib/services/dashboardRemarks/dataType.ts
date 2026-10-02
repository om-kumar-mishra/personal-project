import { ResponseCodeType } from "../Datatype";
import { ChartNames, DashboardName, modules } from "./constants";
import { DashboardRemarkActionType } from "./types";

export interface InsertDashboardRemarkResponse {
  info: ResponseCodeType;
}

export type Filter = {
  filterName: string;
  filterValue: any;
};

export interface InsertDashboardRemarkPayload {
  moduleId: number;
  module: modules;
  misDate: string;
  dashboardName: DashboardName;
  chartName: ChartNames | string;
  remark: string;
  addedBy: string;
  createdBy: string;
  filters: Filter[];
}

export interface InsertDashboardRemarkAction {
  type: DashboardRemarkActionType;
  payload: InsertDashboardRemarkPayload;
}

export interface GetDashboardRemarkPayload {
  moduleId: number;
  module: modules;
  misDate: string;
  dashboardName: DashboardName;
  chartName: string;
}

export interface GetDashboardRemarkAction {
  type: DashboardRemarkActionType;
  payload: GetDashboardRemarkPayload;
}

export interface GetDashboardRemarkResponseData {
  misdate: string;
  addedBy: string;
  createdAt: string;
  remark: string;
}

export interface GetDashboardRemarkResponse {
  info: ResponseCodeType;
  data: GetDashboardRemarkResponseData;
}

export interface GetUserDetailResponseData {
  ClientId: string;
  Email: string;
  RoleName: string;
  UserName: string;
  clientId: string;
  email: string;
  roleName: string;
  userName: string;
  userType: string;
}

