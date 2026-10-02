import {
  GetDashboardRemarkPayload,
  InsertDashboardRemarkPayload,
} from "./dataType";
import { DashboardRemarkActionType } from "./types";

export const insertDashboardRemarkAction = (
  payload: InsertDashboardRemarkPayload
) => ({
  type: DashboardRemarkActionType.INSERT_DASHBOARD_REMARK_REQUESTED,
  payload,
});

export const resetInsertDashboardRemarkAction = () => ({
  type: DashboardRemarkActionType.INSERT_DASHBOARD_REMARK_FAILED,
});

export const getDashboardRemarkAction = (
  payload: GetDashboardRemarkPayload
) => ({
  type: DashboardRemarkActionType.GET_DASHBOARD_REMARK_REQUESTED,
  payload,
});

export const resetDashboardRemarkAction = () => ({
  type: DashboardRemarkActionType.GET_DASHBOARD_REMARK_FAILED,
});

