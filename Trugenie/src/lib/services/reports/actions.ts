import {
  PopulationReportResponse,
  AdminReportResponse,
  LoginReportResponse,
  RoleRightReportResponse,
  ApplicationMasterData,
  IssuedNOCReportResponse,
  AllNOCReportResponse,
} from "./dataTypes";
import * as actionTypes from "./types";

// POPULATION
//#region [Population Report]
export function getPopulationReportRequest() {
  return { type: actionTypes.GET_POPULATION_REPORT_REQUEST };
}

export function getPopulationReportSuccess(data: PopulationReportResponse) {
  return { type: actionTypes.GET_POPULATION_REPORT_SUCCESS, payload: data };
}

export function getPopulationReportFailure(error: string) {
  return { type: actionTypes.GET_POPULATION_REPORT_FAILURE, error };
}
//#endregion [Population Report]

//#region [Export Population Report]
export function getExportPopulationReportRequest() {
  return { type: actionTypes.EXPORT_POPULATION_REPORT_REQUEST };
}

export function getExportPopulationReportSuccess() {
  return { type: actionTypes.EXPORT_POPULATION_REPORT_SUCCESS };
}

export function getExportPopulationReportFailure(error: string) {
  return { type: actionTypes.EXPORT_POPULATION_REPORT_ERROR, error };
}
//#endregion [Export Population Report]

// ADMIN
//#region [Admin Report]
export function getAdminReportRequest(startDate: string, endDate: string) {
  return {
    type: actionTypes.GET_ADMIN_REPORT_REQUEST,
    payload: {
      startDate,
      endDate,
    },
  };
}

export function getAdminReportSuccess(data: AdminReportResponse) {
  return { type: actionTypes.GET_ADMIN_REPORT_SUCCESS, payload: data };
}

export function getAdminReportFailure(error: string) {
  return { type: actionTypes.GET_ADMIN_REPORT_FAILURE, error };
}
//#endregion [Admin Report]

//#region [Export Admin Report]
export function getExportAdminReportRequest(startDate: string, endDate: string) {
  return {
    type: actionTypes.EXPORT_ADMIN_REPORT_REQUEST,
    payload: {
      startDate,
      endDate,
    },
  };
}

export function getExportAdminReportSuccess() {
  return { type: actionTypes.EXPORT_ADMIN_REPORT_SUCCESS };
}

export function getExportAdminReportFailure(error: string) {
  return { type: actionTypes.EXPORT_ADMIN_REPORT_ERROR, error };
}
//#endregion [Export Admin Report]

// LOGIN
//#region [Login Report]
export function getLoginReportRequest(startDate: string, endDate: string) {
  return {
    type: actionTypes.GET_LOGIN_REPORT_REQUEST,
    payload: {
      startDate,
      endDate,
    },
  };
}

export function getLoginReportSuccess(data: LoginReportResponse) {
  return { type: actionTypes.GET_LOGIN_REPORT_SUCCESS, payload: data };
}

export function getLoginReportFailure(error: string) {
  return { type: actionTypes.GET_LOGIN_REPORT_FAILURE, error };
}
//#endregion [Login Report]

//#region [Export Login Report]
export function getExportLoginReportRequest(startDate: string, endDate: string) {
  return {
    type: actionTypes.EXPORT_LOGIN_REPORT_REQUEST,
    payload: {
      startDate,
      endDate,
    },
  };
}

export function getExportLoginReportSuccess() {
  return { type: actionTypes.EXPORT_LOGIN_REPORT_SUCCESS };
}

export function getExportLoginReportFailure(error: string) {
  return { type: actionTypes.EXPORT_LOGIN_REPORT_ERROR, error };
}
//#endregion [Export Login Report]

// ROLE RIGHTS
//#region [RoleRight Report]
export function getRoleRightReportRequest() {
  return { type: actionTypes.GET_ROLERIGHT_REPORT_REQUEST };
}

export function getRoleRightReportSuccess(data: RoleRightReportResponse) {
  return { type: actionTypes.GET_ROLERIGHT_REPORT_SUCCESS, payload: data };
}

export function getRoleRightReportFailure(error: string) {
  return { type: actionTypes.GET_ROLERIGHT_REPORT_FAILURE, error };
}
//#endregion [RoleRight Report]

//#region [Export RoleRight Report]
export function getExportRoleRightReportRequest() {
  return { type: actionTypes.EXPORT_ROLERIGHT_REPORT_REQUEST };
}

export function getExportRoleRightReportSuccess() {
  return { type: actionTypes.EXPORT_ROLERIGHT_REPORT_SUCCESS };
}

export function getExportRoleRightReportFailure(error: string) {
  return { type: actionTypes.EXPORT_ROLERIGHT_REPORT_ERROR, error };
}
//#endregion [Export RoleRight Report]

//#region [Get Application Master]
export type GetApplicationMasterRequestedAction = {
  type: typeof actionTypes.GET_APPLICATION_MASTER_REQUESTED;
  createdby: string;
  callback?: (success: boolean) => void;
};
export const getApplicationMasterRequested = (createdby: string, callback?: (success: boolean) => void): GetApplicationMasterRequestedAction => ({
  type: actionTypes.GET_APPLICATION_MASTER_REQUESTED,
  createdby,
  callback,
});

export type GetApplicationMasterSucceededAction = {
  type: typeof actionTypes.GET_APPLICATION_MASTER_SUCCESS;
  result: ApplicationMasterData[];
};
export const getApplicationMasterSucceeded = (result: ApplicationMasterData[]): GetApplicationMasterSucceededAction => ({
  type: actionTypes.GET_APPLICATION_MASTER_SUCCESS,
  result,
});

export type GetApplicationMasterFailedAction = {
  type: typeof actionTypes.GET_APPLICATION_MASTER_FAILED;
  error: unknown;
};
export const getApplicationMasterFailed = (error: unknown): GetApplicationMasterFailedAction => ({
  type: actionTypes.GET_APPLICATION_MASTER_FAILED,
  error,
});
//#endregion [Get Application Master]

//#region [Update Master]
export type ApplicationMasterUpdateRequestedAction = {
  type: typeof actionTypes.UPDATE_APPLICATION_MASTER_REQUESTED;
  value: number;
  callback?: (success: boolean) => void;
};
export const applicationMasterUpdateRequested = (value: number, callback?: (success: boolean) => void): ApplicationMasterUpdateRequestedAction => ({
  type: actionTypes.UPDATE_APPLICATION_MASTER_REQUESTED,
  value,
  callback,
});

export type ApplicationMasterUpdateSucceededAction = {
  type: typeof actionTypes.UPDATE_APPLICATION_MASTER_SUCCESS;
  result: any;
};
export const applicationMasterUpdateSucceeded = (result: any): ApplicationMasterUpdateSucceededAction => ({
  type: actionTypes.UPDATE_APPLICATION_MASTER_SUCCESS,
  result,
});

export type ApplicationMasterUpdateFailedAction = {
  type: typeof actionTypes.UPDATE_APPLICATION_MASTER_FAILED;
  error: unknown;
};
export const applicationMasterUpdateFailed = (error: unknown): ApplicationMasterUpdateFailedAction => ({
  type: actionTypes.UPDATE_APPLICATION_MASTER_FAILED,
  error,
});
//#endregion [Update Master]

// ISSUED NOC
//#region [Issued NOC Report]
export type GetIssuedNOCReportRequestAction = {
  type: typeof actionTypes.GET_NOC_ISSUED_REPORT_REQUEST;
  reAssetId: number;
  startDate?: string;
  endDate?: string;
};
export const getIssuedNOCReportRequest = (reAssetId: number, startDate?: string, endDate?: string): GetIssuedNOCReportRequestAction => ({
  type: actionTypes.GET_NOC_ISSUED_REPORT_REQUEST,
  reAssetId,
  startDate,
  endDate,
});

export type GetIssuedNOCReportSucceededAction = {
  type: typeof actionTypes.GET_NOC_ISSUED_REPORT_SUCCESS;
  result: IssuedNOCReportResponse;
};
export const getIssuedNOCReportSucceeded = (result: IssuedNOCReportResponse): GetIssuedNOCReportSucceededAction => ({
  type: actionTypes.GET_NOC_ISSUED_REPORT_SUCCESS,
  result,
});

export type GetIssuedNOCReportFailedAction = {
  type: typeof actionTypes.GET_NOC_ISSUED_REPORT_FAILURE;
};
export const getIssuedNOCReportFailed = (): GetIssuedNOCReportFailedAction => ({
  type: actionTypes.GET_NOC_ISSUED_REPORT_FAILURE,
});
//#endregion [Issued NOC Report]

//#region [Export Issued NOC Report]
export type ExportIssuedNOCReportRequestAction = {
  type: typeof actionTypes.EXPORT_NOC_ISSUED_REPORT_REQUEST;
  reAssetId: number;
  startDate?: string;
  endDate?: string;
};
export const exportIssuedNOCReportRequest = (reAssetId: number, startDate?: string, endDate?: string): ExportIssuedNOCReportRequestAction => ({
  type: actionTypes.EXPORT_NOC_ISSUED_REPORT_REQUEST,
  reAssetId,
  startDate,
  endDate,
});

export type ExportIssuedNOCReportSucceededAction = {
  type: typeof actionTypes.EXPORT_NOC_ISSUED_REPORT_SUCCESS;
  data: IssuedNOCReportResponse;
};
export const exportIssuedNOCReportSucceeded = (data: IssuedNOCReportResponse): ExportIssuedNOCReportSucceededAction => ({
  type: actionTypes.EXPORT_NOC_ISSUED_REPORT_SUCCESS,
  data,
});

export type ExportIssuedNOCReportFailedAction = {
  type: typeof actionTypes.EXPORT_NOC_ISSUED_REPORT_FAILURE;
};
export const exportIssuedNOCReportFailed = (): ExportIssuedNOCReportFailedAction => ({
  type: actionTypes.EXPORT_NOC_ISSUED_REPORT_FAILURE,
});
//#endregion [Export Issued NOC Report]

// ALL NOC
//#region [All NOC Report]
export type GetAllNOCReportRequestAction = {
  type: typeof actionTypes.GET_ALL_NOC_REPORT_REQUEST;
  reAssetId: number;
  startDate?: string;
  endDate?: string;
};
export const getAllNOCReportRequest = (reAssetId: number, startDate?: string, endDate?: string): GetAllNOCReportRequestAction => ({
  type: actionTypes.GET_ALL_NOC_REPORT_REQUEST,
  reAssetId,
  startDate,
  endDate,
});

export type GetAllNOCReportSucceededAction = {
  type: typeof actionTypes.GET_ALL_NOC_REPORT_SUCCESS;
  result: AllNOCReportResponse;
};
export const getAllNOCReportSucceeded = (result: AllNOCReportResponse): GetAllNOCReportSucceededAction => ({
  type: actionTypes.GET_ALL_NOC_REPORT_SUCCESS,
  result,
});

export type GetAllNOCReportFailedAction = {
  type: typeof actionTypes.GET_ALL_NOC_REPORT_FAILURE;
};
export const getAllNOCReportFailed = (): GetAllNOCReportFailedAction => ({
  type: actionTypes.GET_ALL_NOC_REPORT_FAILURE,
});
//#endregion [All NOC Report]

//#region [Export All NOC Report]
export type ExportAllNOCReportRequestAction = {
  type: typeof actionTypes.EXPORT_ALL_NOC_REPORT_REQUEST;
  reAssetId: number;
  startDate?: string;
  endDate?: string;
};
export const exportAllNOCReportRequest = (reAssetId: number, startDate?: string, endDate?: string): ExportAllNOCReportRequestAction => ({
  type: actionTypes.EXPORT_ALL_NOC_REPORT_REQUEST,
  reAssetId,
  startDate,
  endDate,
});

export type ExportAllNOCReportSucceededAction = {
  type: typeof actionTypes.EXPORT_ALL_NOC_REPORT_SUCCESS;
  data: AllNOCReportResponse;
};
export const exportAllNOCReportSucceeded = (data: AllNOCReportResponse): ExportAllNOCReportSucceededAction => ({
  type: actionTypes.EXPORT_ALL_NOC_REPORT_SUCCESS,
  data,
});

export type ExportAllNOCReportFailedAction = {
  type: typeof actionTypes.EXPORT_ALL_NOC_REPORT_FAILURE;
};
export const exportAllNOCReportFailed = (): ExportAllNOCReportFailedAction => ({
  type: actionTypes.EXPORT_ALL_NOC_REPORT_FAILURE,
});
//#endregion [Export All NOC Report]

export type ReportActions =
  // get-master
  | GetApplicationMasterRequestedAction
  | GetApplicationMasterSucceededAction
  | GetApplicationMasterFailedAction

  // update-master
  | ApplicationMasterUpdateRequestedAction
  | ApplicationMasterUpdateSucceededAction
  | ApplicationMasterUpdateFailedAction

  // issue-noc
  | GetIssuedNOCReportRequestAction
  | GetIssuedNOCReportSucceededAction
  | GetIssuedNOCReportFailedAction

  // export-issued-noc
  | ExportIssuedNOCReportRequestAction
  | ExportIssuedNOCReportSucceededAction
  | ExportIssuedNOCReportFailedAction

  // all-noc
  | GetAllNOCReportRequestAction
  | GetAllNOCReportSucceededAction
  | GetAllNOCReportFailedAction

  // export-all-noc
  | ExportAllNOCReportRequestAction
  | ExportAllNOCReportSucceededAction
  | ExportAllNOCReportFailedAction;
