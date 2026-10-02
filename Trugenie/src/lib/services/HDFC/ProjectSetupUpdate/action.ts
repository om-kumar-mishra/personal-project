import {
  CanCreateSetupDataType,
  CanProjectSetupUpdateDataType,
  GetProjectSalesResponse,
  ProjectSalesApprovalsListDataType,
  StatusChangeProjectDataType,
  UploadProjectSetupType,
} from "./dataTypes";
import * as types from "./types";

//----------------------------------Get Past Update List start----------------------------------

export type GetProjectSalesListRequested = {
  type: typeof types.GET_PROJECT_SALES_LIST_REQUESTED;
  reAssetId: number;
  historyType: string;
};

export const getGetProjectSalesListRequested = (reAssetId: number, historyType: string): GetProjectSalesListRequested => ({
  type: types.GET_PROJECT_SALES_LIST_REQUESTED,
  reAssetId,
  historyType,
});

export type GetProjectSalesListSucceeded = {
  type: typeof types.GET_PROJECT_SALES_LIST_SUCCEEDED;
  result: GetProjectSalesResponse;
};

export const getProjectSalesListSucceeded = (result: GetProjectSalesResponse): GetProjectSalesListSucceeded => ({
  type: types.GET_PROJECT_SALES_LIST_SUCCEEDED,
  result,
});

export type GetProjectSalesListFailed = {
  type: typeof types.GET_PROJECT_SALES_LIST_FAILED;
  error: string;
};

export const getProjectSalesListFailed = (error: string): GetProjectSalesListFailed => ({
  type: types.GET_PROJECT_SALES_LIST_FAILED,
  error,
});

//----------------------------------Get Past Update List End---------------------------------------------

//----------------------------------Get Past Update List start----------------------------------

export type GetProjectSalesApprovalsListRequested = {
  type: typeof types.GET_PROJECT_SALES_APPROVALS_LIST_REQUESTED;
  reAssetId: number;
};

export const getGetProjectSalesApprovalsListRequested = (reAssetId: number): GetProjectSalesApprovalsListRequested => ({
  type: types.GET_PROJECT_SALES_APPROVALS_LIST_REQUESTED,
  reAssetId,
});

export type GetProjectSalesApprovalsListSucceeded = {
  type: typeof types.GET_PROJECT_SALES_APPROVALS_LIST_SUCCEEDED;
  projectSalesApprovalsList: ProjectSalesApprovalsListDataType[];
};

export const getProjectSalesApprovalsListSucceeded = (
  projectSalesApprovalsList: ProjectSalesApprovalsListDataType[],
): GetProjectSalesApprovalsListSucceeded => ({
  type: types.GET_PROJECT_SALES_APPROVALS_LIST_SUCCEEDED,
  projectSalesApprovalsList,
});

export type GetProjectSalesApprovalsListFailed = {
  type: typeof types.GET_PROJECT_SALES_APPROVALS_LIST_FAILED;
  error: string;
};

export const getProjectSalesApprovalsListFailed = (error: string): GetProjectSalesApprovalsListFailed => ({
  type: types.GET_PROJECT_SALES_APPROVALS_LIST_FAILED,
  error,
});

//----------------------------------Get Past Update List End---------------------------------------------
//-----------------------------------------------Download  documents project setup start----------------------------------------------

export type DownloadProjectSetupRequestAction = {
  type: typeof types.DOWNLOAD_PROJECT_SETUP_REQUESTED;
  reAssetId: number;
  successCallback?: (success: boolean) => void;
};

export const downloadProjectSetupRequest = (reAssetId: number, successCallback?: (success: boolean) => void): DownloadProjectSetupRequestAction => ({
  type: types.DOWNLOAD_PROJECT_SETUP_REQUESTED,
  reAssetId,
  successCallback,
});

export type DownloadProjectSetupSucceededAction = {
  type: typeof types.DOWNLOAD_PROJECT_SETUP_SUCCEEDED;
};

export const downloadProjectSetupSucceeded = (): DownloadProjectSetupSucceededAction => ({
  type: types.DOWNLOAD_PROJECT_SETUP_SUCCEEDED,
});

export type DownloadProjectSetupFailedAction = {
  type: typeof types.DOWNLOAD_PROJECT_SETUP_FAILED;
};

export const downloadProjectSetupFailed = (): DownloadProjectSetupFailedAction => ({
  type: types.DOWNLOAD_PROJECT_SETUP_FAILED,
});

//-----------------------------------------------Download  documents project setup end----------------------------------------------
//----------------------------------Get Past Update List start----------------------------------

//#region [add Clause  Request]
export type StatusChangeProjectSalesListRequested = {
  type: typeof types.STATUS_CHANGE_PROJECT_SALES_LIST_REQUESTED;
  statusChangeProjectProps: StatusChangeProjectDataType;
  successCallback?: (success: boolean) => void;
  errorCallback?: (error: boolean) => void;
};
export const statusChangeProjectSalesListRequested = (
  statusChangeProjectProps: StatusChangeProjectDataType,
  successCallback?: (success: boolean) => void,
  errorCallback?: (error: boolean) => void,
): StatusChangeProjectSalesListRequested => ({
  type: types.STATUS_CHANGE_PROJECT_SALES_LIST_REQUESTED,
  statusChangeProjectProps,
  successCallback,
  errorCallback,
});
//#region [Add Single Clause  Success]
export type StatusChangeProjectSalesListSucceeded = {
  type: typeof types.STATUS_CHANGE_PROJECT_SALES_LIST_SUCCEEDED;
  result: StatusChangeProjectDataType;
};
export const statusChangeProjectSalesListSucceeded = (result: StatusChangeProjectDataType): StatusChangeProjectSalesListSucceeded => ({
  type: types.STATUS_CHANGE_PROJECT_SALES_LIST_SUCCEEDED,
  result,
});
//#region [Get Single Clause Failed]
export type StatusChangeProjectSalesListFailed = {
  type: typeof types.STATUS_CHANGE_PROJECT_SALES_LIST_FAILED;
  error?: unknown;
};
export const statusChangeProjectSalesListFailed = (error?: unknown): StatusChangeProjectSalesListFailed => ({
  type: types.STATUS_CHANGE_PROJECT_SALES_LIST_FAILED,
  error,
});
//#endregion

//----------------------------------Get Past Update List End---------------------------------------------

//===============================================  Document Upload Start ===============================================
export type UploadProjectSetupRequestAction = {
  type: typeof types.UPLOAD_PROJECT_SETUP_REQUESTED;
  uploadProjectSetupProps: UploadProjectSetupType;
  callback?: (success: boolean, message?: string) => void;
};

export const uploadProjectSetupRequest = (
  uploadProjectSetupProps: UploadProjectSetupType,
  callback?: (success: boolean) => void,
): UploadProjectSetupRequestAction => ({
  type: types.UPLOAD_PROJECT_SETUP_REQUESTED,
  uploadProjectSetupProps,
  callback,
});

export type UploadProjectSetupSucceededAction = {
  type: typeof types.UPLOAD_PROJECT_SETUP_SUCCEEDED;
  result: UploadProjectSetupType;
};

export const uploadProjectSetupSucceeded = (result: UploadProjectSetupType): UploadProjectSetupSucceededAction => ({
  type: types.UPLOAD_PROJECT_SETUP_SUCCEEDED,
  result,
});

export type UploadProjectSetupFailedAction = {
  type: typeof types.UPLOAD_PROJECT_SETUP_FAILED;
};

export const uploadTemplateFailed = (): UploadProjectSetupFailedAction => ({
  type: types.UPLOAD_PROJECT_SETUP_FAILED,
});

//=================================================  Document Upload End ================================================

export type DownloadProjectSetupRowRequestAction = {
  type: typeof types.DOWNLOAD_PROJECT_SETUP_ROW_REQUESTED;
  containerName: string;
  filePath: string;
  fileName: string;
  callBack?: (success: boolean) => void;
};

export const downloadProjectSetupRowRequest = (
  containerName: string,
  filePath: string,
  fileName: string,
  callBack?: (success: boolean) => void,
): DownloadProjectSetupRowRequestAction => ({
  type: types.DOWNLOAD_PROJECT_SETUP_ROW_REQUESTED,
  containerName,
  filePath,
  fileName,
  callBack,
});

export type DownloadProjectSetupRowSucceededAction = {
  type: typeof types.DOWNLOAD_PROJECT_SETUP_ROW_SUCCEEDED;
};

export const downloadProjectSetupRowSucceeded = (): DownloadProjectSetupRowSucceededAction => ({
  type: types.DOWNLOAD_PROJECT_SETUP_ROW_SUCCEEDED,
});

export type DownloadProjectSetupRowFailedAction = {
  type: typeof types.DOWNLOAD_PROJECT_SETUP_ROW_FAILED;
};

export const downloadProjectSetupRowFailed = (): DownloadProjectSetupRowFailedAction => ({
  type: types.DOWNLOAD_PROJECT_SETUP_ROW_FAILED,
});
// export const UPLOAD_DOCUMENT_NON_SERIALIZABLE = [types.UPLOAD_PROJECT_SETUP_REQUESTED];

export type CanProjectSetupUpdateRequested = {
  type: typeof types.CAN_SETUP_UPDATE_REQUESTED;
  reAssetId: number;
  actionCallback?: (canUpdate: boolean) => void;
};

export const canSetupUpdateRequested = (reAssetId: number, actionCallback?: (canUpdate: boolean) => void): CanProjectSetupUpdateRequested => ({
  type: types.CAN_SETUP_UPDATE_REQUESTED,
  reAssetId,
  actionCallback,
});

export type CanSetupProjectUpdateSucceeded = {
  type: typeof types.CAN_SETUP_UPDATE_SUCCEEDED;
  canProjectSetupUpdate: CanProjectSetupUpdateDataType[];
};

export const canSetupProjectUpdateSucceeded = (canProjectSetupUpdate: CanProjectSetupUpdateDataType[]): CanSetupProjectUpdateSucceeded => ({
  type: types.CAN_SETUP_UPDATE_SUCCEEDED,
  canProjectSetupUpdate,
});

export type CanSetupProjectUpdateFailed = {
  type: typeof types.CAN_SETUP_UPDATE_FAILED;
  error: string;
};

export const canSetupProjectUpdateFailed = (error: string): CanSetupProjectUpdateFailed => ({
  type: types.CAN_SETUP_UPDATE_FAILED,
  error,
});

export type CanCreateSetupRequested = {
  type: typeof types.CAN_CREATE_PROJECT_SETUP_REQUESTED;
  reAssetId: number;
  actionCallback?: (canCreateSetup: boolean) => void;
};

export const canCreateSetupRequested = (reAssetId: number, actionCallback?: (canCreateSetup: boolean) => void): CanCreateSetupRequested => ({
  type: types.CAN_CREATE_PROJECT_SETUP_REQUESTED,
  reAssetId,
  actionCallback,
});

export type CanCreateSetupSucceeded = {
  type: typeof types.CAN_CREATE_PROJECT_SETUP_SUCCEEDED;
  canCreateSetup: CanCreateSetupDataType[];
};

export const canCreateSetupSucceeded = (canCreateSetup: CanCreateSetupDataType[]): CanCreateSetupSucceeded => ({
  type: types.CAN_CREATE_PROJECT_SETUP_SUCCEEDED,
  canCreateSetup,
});

export type CanCreateSetupFailed = {
  type: typeof types.CAN_CREATE_PROJECT_SETUP_FAILED;
  error: string;
};

export const canCreateSetupFailed = (error: string): CanCreateSetupFailed => ({
  type: types.CAN_CREATE_PROJECT_SETUP_FAILED,
  error,
});

export type ProjectSetupListActions =
  | GetProjectSalesListRequested
  | GetProjectSalesListSucceeded
  | GetProjectSalesListFailed
  | DownloadProjectSetupRequestAction
  | DownloadProjectSetupSucceededAction
  | DownloadProjectSetupFailedAction
  | UploadProjectSetupRequestAction
  | UploadProjectSetupSucceededAction
  | UploadProjectSetupFailedAction
  | GetProjectSalesApprovalsListRequested
  | GetProjectSalesApprovalsListSucceeded
  | GetProjectSalesApprovalsListFailed
  | DownloadProjectSetupRowRequestAction
  | DownloadProjectSetupRowSucceededAction
  | DownloadProjectSetupRowFailedAction
  | StatusChangeProjectSalesListRequested
  | StatusChangeProjectSalesListSucceeded
  | StatusChangeProjectSalesListFailed
  | CanProjectSetupUpdateRequested
  | CanSetupProjectUpdateSucceeded
  | CanSetupProjectUpdateFailed
  | CanCreateSetupRequested
  | CanCreateSetupSucceeded
  | CanCreateSetupFailed;
