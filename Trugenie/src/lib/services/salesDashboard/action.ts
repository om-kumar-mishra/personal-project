import { stringNumber } from "../Datatype";
import {
  SalesDashboardDetailPayload,
  SalesDashboardDetailv2Payload,
  SalesDashboardFiscalYearApiPayload,
} from "./dataTypes";
import { SalesDashboardActionTypes as ActionTypes } from "./types";

export const getSalesProjectNames = (emailId: string) => ({
  type: ActionTypes.GET_SALES_PROJECT_NAME_REQUESTED,
  emailId,
});

export const getSalesUnitTypes = (reAssetId: stringNumber) => ({
  type: ActionTypes.GET_UNIT_TYPE_REQUESTED,
  reAssetId,
});

export const getSalesPhase = (reAssetId: stringNumber) => ({
  type: ActionTypes.GET_PHASE_REQUESTED,
  reAssetId,
});

export const getSalesTower = (reAssetId: stringNumber) => ({
  type: ActionTypes.GET_TOWER_REQUESTED,
  reAssetId,
});

export const getSalesFiscalYear = (
  request: SalesDashboardFiscalYearApiPayload
) => ({
  type: ActionTypes.GET_FISCAL_YEAR_REQUESTED,
  request,
});

export const refreshSalesDashboard = () => ({
  type: ActionTypes.REFRESH_SALES_DASHBOARD,
});

export const getSalesDashboardDetailsAction = (
  request: SalesDashboardDetailPayload
) => ({
  type: ActionTypes.GET_SALES_DASHBOARD_DETAILS_REQUESTED,
  request,
});

export const getSalesDashboardDetailsv2Action = (
  request: SalesDashboardDetailv2Payload
) => ({
  type: ActionTypes.GET_SALES_DASHBOARD_DETAILS_V2_REQUESTED,
  request,
});

export const getSalesMisHistoryAction = (reAssetId: stringNumber) => ({
  type: ActionTypes.GET_SALES_MIS_HISTORY_REQUESTED,
  reAssetId,
});

export const getREProjectTypeAction = (reAssetId: stringNumber) => ({
  type: ActionTypes.GET_RE_PROJECT_TYPE_REQUESTED,
  reAssetId,
});

export const getREProjectSubTypeAction = (
  payload: SalesDashboardDetailv2Payload
) => ({
  type: ActionTypes.GET_RE_PROJECT_SUB_TYPE_REQUESTED,
  payload,
});

export const resetREProjectSubTypeAction = () => ({
  type: ActionTypes.GET_RE_PROJECT_SUB_TYPE_FAILED,
});

export const getREUnitLaunchStatusAction = (reAssetId: stringNumber) => ({
  type: ActionTypes.GET_RE_UNIT_LAUNCH_STATUS_REQUESTED,
  payload: { reAssetId, statusType: 1 },
});

export const getREUnitSecurityStatusAction = (reAssetId: stringNumber) => ({
  type: ActionTypes.GET_RE_UNIT_SECURITY_STATUS_REQUESTED,
  payload: { reAssetId, statusType: 2 },
});

export const getREUnitApprovalStatusAction = (reAssetId: stringNumber) => ({
  type: ActionTypes.GET_RE_UNIT_APPROVAL_STATUS_REQUESTED,
  payload: { reAssetId, statusType: 3 },
});

export const getRETowerV2Action = (payload: SalesDashboardDetailv2Payload) => ({
  type: ActionTypes.GET_RE_TOWER_V2_REQUESTED,
  payload,
});

export const resetRETowerV2Action = () => ({
  type: ActionTypes.GET_RE_TOWER_V2_FAILED,
});

export const getREWingV2Action = (payload: SalesDashboardDetailv2Payload) => ({
  type: ActionTypes.GET_RE_WING_V2_REQUESTED,
  payload,
});

export const resetREWingV2Action = () => ({
  type: ActionTypes.GET_RE_WING_V2_FAILED,
});

export const getREUnitOwnedByAction = (
  payload: SalesDashboardDetailv2Payload
) => ({
  type: ActionTypes.GET_RE_UNIT_OWNED_BY_REQUESTED,
  payload,
});

export const resetREUnitOwnedByAction = () => ({
  type: ActionTypes.GET_RE_UNIT_OWNED_BY_FAILED,
});

export const stopLoading = () => ({
  type: ActionTypes.STOP_LOADING,
});
