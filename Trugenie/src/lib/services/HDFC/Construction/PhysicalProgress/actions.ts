import { PhysicalProgressPastHistoryData, PhysicalProgressPendingHistoryData, UpdatePhysicalProgressStatusPayload, UpdatePhysicalProgressStatusResponse, UploadPhysicalProgressSetupTemplatePayload, UploadPhysicalProgressSetupTemplateResponse } from "./dataTypes";
import * as actionTypes from "./types";


// ===================================Get Construction Physical Progress PastHistory List================================================
//#region [PhysicalProgress PastHistory Requested]
export type GetPhysicalProgressPastHistoryRequestedType = {
  type: typeof actionTypes.GET_CONTRUCTION_PHYSICAL_PROGRESS_PAST_HISTORY_REQUESTED;
  reAssetId: number;
  createdBy: string;
  Type: string;
};

export const GetPhysicalProgressPastHistoryListRequested = (reAssetId: number, createdBy: string, Type: string): GetPhysicalProgressPastHistoryRequestedType => ({
  type: actionTypes.GET_CONTRUCTION_PHYSICAL_PROGRESS_PAST_HISTORY_REQUESTED,
  reAssetId,
  createdBy,
  Type,
});
//#endregion

//#region [PhysicalProgress PastHistory Succeeded]
export type GetPhysicalProgressPastHistorySucceededType = {
  type: typeof actionTypes.GET_CONTRUCTION_PHYSICAL_PROGRESS_PAST_HISTORY_SUCCEEDED;
  result: PhysicalProgressPastHistoryData[];
};

export const GetPhysicalProgressHistoryListSucceeded = (result: PhysicalProgressPastHistoryData[]): GetPhysicalProgressPastHistorySucceededType => ({
  type: actionTypes.GET_CONTRUCTION_PHYSICAL_PROGRESS_PAST_HISTORY_SUCCEEDED,
  result,
});

//#endregion

//#region [PastHistory Failed]
export type GetPhysicalProgressPastHistoryFailedType = {
  type: typeof actionTypes.GET_CONTRUCTION_PHYSICAL_PROGRESS_PAST_HISTORY_FAILED;
  error?: string;
};

export const GetPhysicalProgressPastHistoryListFailed = (error?: string): GetPhysicalProgressPastHistoryFailedType => ({
  type: actionTypes.GET_CONTRUCTION_PHYSICAL_PROGRESS_PAST_HISTORY_FAILED,
  error,
});
//#endregion

// ===================================Get Construction Physical Progress Pending History List================================================
//#region [PhysicalProgress PendingHistory Requested]
export type GetPhysicalProgressPendingHistoryRequestedType = {
  type: typeof actionTypes.GET_CONTRUCTION_PHYSICAL_PROGRESS_PENDING_HISTORY_REQUESTED;
  reAssetId: number;
  createdBy: string;
  Type: string;
};

export const GetPhysicalProgressPendingHistoryListRequested = (reAssetId: number, createdBy: string, Type: string): GetPhysicalProgressPendingHistoryRequestedType => ({
  type: actionTypes.GET_CONTRUCTION_PHYSICAL_PROGRESS_PENDING_HISTORY_REQUESTED,
  reAssetId,
  createdBy,
  Type,
});
//#endregion

//#region [PhysicalProgress PendingHistory Succeeded]
export type GetPhysicalProgressPendingHistorySucceededType = {
  type: typeof actionTypes.GET_CONTRUCTION_PHYSICAL_PROGRESS_PENDING_HISTORY_SUCCEEDED;
  result: PhysicalProgressPendingHistoryData[];
};

export const GetPhysicalProgressPendingHistoryListSucceeded = (result: PhysicalProgressPendingHistoryData[]): GetPhysicalProgressPendingHistorySucceededType => ({
  type: actionTypes.GET_CONTRUCTION_PHYSICAL_PROGRESS_PENDING_HISTORY_SUCCEEDED,
  result,
});

//#endregion

//#region [Pending History Failed]
export type GetPhysicalProgressPendingHistoryFailedType = {
  type: typeof actionTypes.GET_CONTRUCTION_PHYSICAL_PROGRESS_PENDING_HISTORY_FAILED;
  error?: string;
};

export const GetPhysicalProgressPendingHistoryListFailed = (error?: string): GetPhysicalProgressPendingHistoryFailedType => ({
  type: actionTypes.GET_CONTRUCTION_PHYSICAL_PROGRESS_PENDING_HISTORY_FAILED,
  error,
});
//#endregion


// =================================== Download Physical Progress Template ================================================
//#region [Download Physical Progress Requested]
export type DownloadPhysicalProgressTemplateUpdateRequestedType = {
  type: typeof actionTypes.DOWNLOAD_PHYSICAL_PROGRESS_TEMPLATE_REQUESTED;
  reassetId: number;
  projectType: string;
  developmentType: string;
  phase: string;
  callback?: (success: boolean, message?: string) => void;
};

export const DownloadPhysicalProgressTemplateUpdateRequested = (
  reassetId: number,
  projectType: string,
  developmentType: string,
  phase: string,
  callback?: (success: boolean, message?: string) => void,
): DownloadPhysicalProgressTemplateUpdateRequestedType => ({
  type: actionTypes.DOWNLOAD_PHYSICAL_PROGRESS_TEMPLATE_REQUESTED,
  reassetId,
  projectType,
  developmentType,
  phase,
  callback,
});
//#endregion [Download Physical Progress Requested]

//#region [Download Physical Progress Succeeded]
export type DownloadPhysicalProgressTemplateUpdateSucceededType = {
  type: typeof actionTypes.DOWNLOAD_PHYSICAL_PROGRESS_TEMPLATE_SUCCEEDED;
};

export const DownloadPhysicalProgressTemplateUpdateSucceeded = (): DownloadPhysicalProgressTemplateUpdateSucceededType => ({
  type: actionTypes.DOWNLOAD_PHYSICAL_PROGRESS_TEMPLATE_SUCCEEDED,
});

//#endregion [Download Physical Progress Succeeded]

//#region [Download Physical Progress Failed]
export type DownloadPhysicalProgressTemplateUpdateFailedType = {
  type: typeof actionTypes.DOWNLOAD_PHYSICAL_PROGRESS_TEMPLATE_FAILED;
  error?: string;
};

export const DownloadPhysicalProgressTemplateUpdateFailed = (error?: string): DownloadPhysicalProgressTemplateUpdateFailedType => ({
  type: actionTypes.DOWNLOAD_PHYSICAL_PROGRESS_TEMPLATE_FAILED,
  error,
});
//#endregion [Download Failed]

// =================================== Update Physical Progress Stattus ================================================
//#region [Update Requested]
export type UpdatePhysicalProgressStatusRequestedType = {
  type: typeof actionTypes.UPDATE_PHYSICAL_PROGRESS_STATUS_REQUESTED;
  payload: UpdatePhysicalProgressStatusPayload;
  callback?: (success: boolean, message?: string) => void;
};

export const UpdatePhysicalProgressStatusRequested = (
  payload: UpdatePhysicalProgressStatusPayload,
  callback?: (success: boolean, message?: string) => void,
): UpdatePhysicalProgressStatusRequestedType => ({
  type: actionTypes.UPDATE_PHYSICAL_PROGRESS_STATUS_REQUESTED,
  payload,
  callback,
});
//#endregion [Update Requested]

//#region [Update Succeeded]
export type UpdatePhysicalProgressStatusSucceededType = {
  type: typeof actionTypes.UPDATE_PHYSICAL_PROGRESS_STATUS_SUCCEEDED;
  result: UpdatePhysicalProgressStatusResponse;
};

export const UpdatePhysicalProgressStatusSucceeded = (result: UpdatePhysicalProgressStatusResponse): UpdatePhysicalProgressStatusSucceededType => ({
  type: actionTypes.UPDATE_PHYSICAL_PROGRESS_STATUS_SUCCEEDED,
  result,
});

//#endregion [Update Succeeded]

//#region [Update Failed]
export type UpdatePhysicalProgressStatusFailedType = {
  type: typeof actionTypes.UPDATE_PHYSICAL_PROGRESS_STATUS_FAILED;
  error?: string;
};

export const UpdatePhysicalProgressStatusFailed = (error?: string): UpdatePhysicalProgressStatusFailedType => ({
  type: actionTypes.UPDATE_PHYSICAL_PROGRESS_STATUS_FAILED,
  error,
});
//#endregion [Update Failed]

// =================================== Upload Physical Progress Setup Template ================================================
//#region [Upload setup Requested]
export type UploadPhysicalProgressTemplateSetupRequestedType = {
  type: typeof actionTypes.INSERT_PHYSICAL_PROGRESS_SETUP_TEMPLATE_REQUESTED;
  payload: UploadPhysicalProgressSetupTemplatePayload;
  callback?: (success: boolean, message?: string) => void;
};

export const UploadPhysicalProgressTemplateSetupRequested = (
  payload: UploadPhysicalProgressSetupTemplatePayload,
  callback?: (success: boolean, message?: string) => void,
): UploadPhysicalProgressTemplateSetupRequestedType => ({
  type: actionTypes.INSERT_PHYSICAL_PROGRESS_SETUP_TEMPLATE_REQUESTED,
  payload,
  callback,
});
//#endregion [Upload setup Requested]

//#region [Upload setup Succeeded]
export type UploadPhysicalProgressTemplateSetupSucceededType = {
  type: typeof actionTypes.INSERT_PHYSICAL_PROGRESS_SETUP_TEMPLATE_SUCCEEDED;
  result: UploadPhysicalProgressSetupTemplateResponse;
};

export const UploadPhysicalProgressTemplateSetupSucceeded = (
  result: UploadPhysicalProgressSetupTemplateResponse,
): UploadPhysicalProgressTemplateSetupSucceededType => ({
  type: actionTypes.INSERT_PHYSICAL_PROGRESS_SETUP_TEMPLATE_SUCCEEDED,
  result,
});

//#endregion [Upload setup Succeeded]

// //#region [Upload setup Failed]
export type UploadPhysicalProgressTemplateSetupFailedType = {
  type: typeof actionTypes.INSERT_PHYSICAL_PROGRESS_SETUP_TEMPLATE_FAILED;
  error?: string;
};

export const UploadPhysicalProgressTemplateSetupFailed = (error?: string): UploadPhysicalProgressTemplateSetupFailedType => ({
  type: actionTypes.INSERT_PHYSICAL_PROGRESS_SETUP_TEMPLATE_FAILED,
  error,
});
//#endregion [Upload setup Failed]



//=================================================  Document download Row ================================================

export type DownloadPhysicalProgressRowRequestAction = {
  type: typeof actionTypes.DOWNLOAD_PHYSICAL_PROGRESS_SETUP_ROW_REQUESTED;
  containerName: string;
  filePath: string;
  fileName: string;
  callBack?: (success: boolean) => void;
};

export const downloadPhysicalProgressRowRequest = (
  containerName: string,
  filePath: string,
  fileName: string,
  callBack?: (success: boolean) => void,
): DownloadPhysicalProgressRowRequestAction => ({
  type: actionTypes.DOWNLOAD_PHYSICAL_PROGRESS_SETUP_ROW_REQUESTED,
  containerName,
  filePath,
  fileName,
  callBack,
});

export type DownloadPhysicalProgressRowSucceededAction = {
  type: typeof actionTypes.DOWNLOAD_PHYSICAL_PROGRESS_SETUP_ROW_SUCCEEDED;
};

export const downloadPhysicalProgressRowSucceeded = (): DownloadPhysicalProgressRowSucceededAction => ({
  type: actionTypes.DOWNLOAD_PHYSICAL_PROGRESS_SETUP_ROW_SUCCEEDED,
});

export type DownloadPhysicalProgressRowFailedAction = {
  type: typeof actionTypes.DOWNLOAD_PHYSICAL_PROGRESS_SETUP_ROW_FAILED;
};

export const downloadPhysicalProgressRowFailed = (): DownloadPhysicalProgressRowFailedAction => ({
  type: actionTypes.DOWNLOAD_PHYSICAL_PROGRESS_SETUP_ROW_FAILED,
});

export type PhysicalProgressActions =
  // PhysicalProgress past history List
  | GetPhysicalProgressPastHistoryRequestedType
  | GetPhysicalProgressPastHistorySucceededType
  | GetPhysicalProgressPastHistoryFailedType

    // PhysicalProgress pending history List
    | GetPhysicalProgressPendingHistoryRequestedType
    | GetPhysicalProgressPendingHistorySucceededType
    | GetPhysicalProgressPendingHistoryFailedType

  // download physical progress template
  | DownloadPhysicalProgressTemplateUpdateRequestedType
  | DownloadPhysicalProgressTemplateUpdateSucceededType
  | DownloadPhysicalProgressTemplateUpdateFailedType

  // upload project summary template
  | UpdatePhysicalProgressStatusRequestedType
  | UpdatePhysicalProgressStatusSucceededType
  | UpdatePhysicalProgressStatusFailedType

  // upload Physical Progress template setup
  | UploadPhysicalProgressTemplateSetupRequestedType
  | UploadPhysicalProgressTemplateSetupSucceededType
  | UploadPhysicalProgressTemplateSetupFailedType
  
  
  | DownloadPhysicalProgressRowRequestAction
  | DownloadPhysicalProgressRowSucceededAction
  | DownloadPhysicalProgressRowFailedAction;