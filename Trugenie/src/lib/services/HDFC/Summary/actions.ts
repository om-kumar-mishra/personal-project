import {
  CanSetupProjectSummaryData,
  CheckProjectSummaryDetailsExistData,
  DeleteProjectSummaryDetailsPayload,
  DeleteProjectSummaryDetailsResponse,
  IsSummarySetupData,
  SummaryPastHistoryData,
  SummaryPendingData,
  UpdateProjectSummaryStatusPayload,
  UpdateProjectSummaryStatusResponse,
  UploadProjectSummaryTemplatePayload,
  UploadProjectSummaryTemplateResponse,
  UploadProjectSummaryTemplateSetupPayload,
  UploadProjectSummaryTemplateSetupResponse,
} from "./dataTypes";
import * as actionTypes from "./types";

// ===================================Get Summary PastHistory List================================================
//#region [PastHistory Requested]
export type GetSummaryPastHistoryRequestedType = {
  type: typeof actionTypes.GET_SUMMARY_PAST_HISTORY_REQUESTED;
  REAssetId: number;
  Type: string;
};

export const GetSummaryPastHistoryListRequested = (REAssetId: number, Type: string): GetSummaryPastHistoryRequestedType => ({
  type: actionTypes.GET_SUMMARY_PAST_HISTORY_REQUESTED,
  REAssetId,
  Type,
});
//#endregion

//#region [PastHistory Succeeded]
export type GetSummaryPastHistorySucceededType = {
  type: typeof actionTypes.GET_SUMMARY_PAST_HISTORY_SUCCEEDED;
  result: SummaryPastHistoryData[];
};

export const GetSummaryPastHistoryListSucceeded = (result: SummaryPastHistoryData[]): GetSummaryPastHistorySucceededType => ({
  type: actionTypes.GET_SUMMARY_PAST_HISTORY_SUCCEEDED,
  result,
});

//#endregion

//#region [PastHistory Failed]
export type GetSummaryPastHistoryFailedType = {
  type: typeof actionTypes.GET_SUMMARY_PAST_HISTORY_FAILED;
  error?: string;
};

export const GetSummaryPastHistoryListFailed = (error?: string): GetSummaryPastHistoryFailedType => ({
  type: actionTypes.GET_SUMMARY_PAST_HISTORY_FAILED,
  error,
});
//#endregion

// ===================================Get Summary Pending List================================================
//#region [Summary Pending List Requested]
export type GetSummaryPendingUpdateRequestedType = {
  type: typeof actionTypes.GET_SUMMARY_PENDING_UPDATE_REQUESTED;
  REAssetId: number;
  Type: string;
};

export const GetSummaryPendingUpdateListRequested = (REAssetId: number, Type: string): GetSummaryPendingUpdateRequestedType => ({
  type: actionTypes.GET_SUMMARY_PENDING_UPDATE_REQUESTED,
  REAssetId,
  Type,
});
//#endregion

//#region [Summary Pending List Succeeded]
export type GetSummaryPendingUpdateSucceededType = {
  type: typeof actionTypes.GET_SUMMARY_PENDING_UPDATE_SUCCEEDED;
  result: SummaryPendingData[];
};

export const GetSummaryPendingUpdateListSucceeded = (result: SummaryPendingData[]): GetSummaryPendingUpdateSucceededType => ({
  type: actionTypes.GET_SUMMARY_PENDING_UPDATE_SUCCEEDED,
  result,
});

//#endregion

//#region [Summary Pending List Failed]
export type GetSummaryPendingUpdateFailedType = {
  type: typeof actionTypes.GET_SUMMARY_PENDING_UPDATE_FAILED;
  error?: string;
};

export const GetSummaryPendingUpdateListFailed = (error?: string): GetSummaryPendingUpdateFailedType => ({
  type: actionTypes.GET_SUMMARY_PENDING_UPDATE_FAILED,
  error,
});
//#endregion

// ===================================Is Summary Setup================================================
//#region [Is Summary Setup Requested]
export type IsSummarySetupRequestedType = {
  type: typeof actionTypes.IS_SUMMARY_SETUP_REQUESTED;
  REAssetId: number;
  AssetName:string;
  Type?: string;
};

export const IsSummarySetupRequested = (REAssetId: number,AssetName:string, Type?: string): IsSummarySetupRequestedType => ({
  type: actionTypes.IS_SUMMARY_SETUP_REQUESTED,
  REAssetId,
  AssetName,
  Type,
});
//#endregion [Is Summary Setup Requested]

//#region [Is Summary Setup Succeeded]
export type IsSummarySetupSucceededType = {
  type: typeof actionTypes.IS_SUMMARY_SETUP_SUCCEEDED;
  result: IsSummarySetupData;
};

export const IsSummarySetupSucceeded = (result: IsSummarySetupData): IsSummarySetupSucceededType => ({
  type: actionTypes.IS_SUMMARY_SETUP_SUCCEEDED,
  result,
});

//#endregion [Is Summary Setup Succeeded]

//#region [Is Summary Setup Failed]
export type IsSummarySetupFailedType = {
  type: typeof actionTypes.IS_SUMMARY_SETUP_FAILED;
  error?: string;
};

export const IsSummarySetupFailed = (error?: string): IsSummarySetupFailedType => ({
  type: actionTypes.IS_SUMMARY_SETUP_FAILED,
  error,
});
//#endregion [Is Summary Setup Failed]

// =================================== Delete Project Summary Details ================================================
//#region [Delete Requested]
export type DeleteProjectSummaryDetailsRequestedType = {
  type: typeof actionTypes.DELETE_PROJECT_SUMMARY_DETAILS_REQUESTED;
  payload: DeleteProjectSummaryDetailsPayload;
  callback?: (success: boolean, message?: string) => void;
};

export const DeleteProjectSummaryDetailsRequested = (
  payload: DeleteProjectSummaryDetailsPayload,
  callback?: (success: boolean, message?: string) => void,
): DeleteProjectSummaryDetailsRequestedType => ({
  type: actionTypes.DELETE_PROJECT_SUMMARY_DETAILS_REQUESTED,
  payload,
  callback,
});
//#endregion [Delete Requested]

//#region [Delete Succeeded]
export type DeleteProjectSummaryDetailsSucceededType = {
  type: typeof actionTypes.DELETE_PROJECT_SUMMARY_DETAILS_SUCCEEDED;
  result: DeleteProjectSummaryDetailsResponse;
};

export const DeleteProjectSummaryDetailsSucceeded = (result: DeleteProjectSummaryDetailsResponse): DeleteProjectSummaryDetailsSucceededType => ({
  type: actionTypes.DELETE_PROJECT_SUMMARY_DETAILS_SUCCEEDED,
  result,
});

//#endregion [Delete Succeeded]

//#region [Delete Failed]
export type DeleteProjectSummaryDetailsFailedType = {
  type: typeof actionTypes.DELETE_PROJECT_SUMMARY_DETAILS_FAILED;
  error?: string;
};

export const DeleteProjectSummaryDetailsFailed = (error?: string): DeleteProjectSummaryDetailsFailedType => ({
  type: actionTypes.DELETE_PROJECT_SUMMARY_DETAILS_FAILED,
  error,
});
//#endregion [Delete Failed]

// =================================== Update Project Summary Stattus ================================================
//#region [Update Requested]
export type UpdateProjectSummaryStatusRequestedType = {
  type: typeof actionTypes.UPDATE_PROJECT_SUMMARY_STATUS_REQUESTED;
  payload: UpdateProjectSummaryStatusPayload;
  callback?: (success: boolean, message?: string) => void;
};

export const UpdateProjectSummaryStatusRequested = (
  payload: UpdateProjectSummaryStatusPayload,
  callback?: (success: boolean, message?: string) => void,
): UpdateProjectSummaryStatusRequestedType => ({
  type: actionTypes.UPDATE_PROJECT_SUMMARY_STATUS_REQUESTED,
  payload,
  callback,
});
//#endregion [Update Requested]

//#region [Update Succeeded]
export type UpdateProjectSummaryStatusSucceededType = {
  type: typeof actionTypes.UPDATE_PROJECT_SUMMARY_STATUS_SUCCEEDED;
  result: UpdateProjectSummaryStatusResponse;
};

export const UpdateProjectSummaryStatusSucceeded = (result: UpdateProjectSummaryStatusResponse): UpdateProjectSummaryStatusSucceededType => ({
  type: actionTypes.UPDATE_PROJECT_SUMMARY_STATUS_SUCCEEDED,
  result,
});

//#endregion [Update Succeeded]

//#region [Update Failed]
export type UpdateProjectSummaryStatusFailedType = {
  type: typeof actionTypes.UPDATE_PROJECT_SUMMARY_STATUS_FAILED;
  error?: string;
};

export const UpdateProjectSummaryStatusFailed = (error?: string): UpdateProjectSummaryStatusFailedType => ({
  type: actionTypes.UPDATE_PROJECT_SUMMARY_STATUS_FAILED,
  error,
});
//#endregion [Update Failed]

// =================================== Download Project Summary Template ================================================
//#region [Download Requested]
export type DownloadProjectSummaryTemplateRequestedType = {
  type: typeof actionTypes.DOWNLOAD_PROJECT_SUMMARY_TEMPLATE_REQUESTED;
  reAssetId: number;
  typecheck: string;
  callback?: (success: boolean, message?: string) => void;
};

export const DownloadProjectSummaryTemplateRequested = (
  reAssetId: number,
  typecheck: string,
  callback?: (success: boolean, message?: string) => void,
): DownloadProjectSummaryTemplateRequestedType => ({
  type: actionTypes.DOWNLOAD_PROJECT_SUMMARY_TEMPLATE_REQUESTED,
  reAssetId,
  typecheck,
  callback,
});
//#endregion [Download Requested]

//#region [Download Succeeded]
export type DownloadProjectSummaryTemplateSucceededType = {
  type: typeof actionTypes.DOWNLOAD_PROJECT_SUMMARY_TEMPLATE_SUCCEEDED;
};

export const DownloadProjectSummaryTemplateSucceeded = (): DownloadProjectSummaryTemplateSucceededType => ({
  type: actionTypes.DOWNLOAD_PROJECT_SUMMARY_TEMPLATE_SUCCEEDED,
});

//#endregion [Download Succeeded]

//#region [Download Failed]
export type DownloadProjectSummaryTemplateFailedType = {
  type: typeof actionTypes.DOWNLOAD_PROJECT_SUMMARY_TEMPLATE_FAILED;
  error?: string;
};

export const DownloadProjectSummaryTemplateFailed = (error?: string): DownloadProjectSummaryTemplateFailedType => ({
  type: actionTypes.DOWNLOAD_PROJECT_SUMMARY_TEMPLATE_FAILED,
  error,
});
//#endregion [Download Failed]

// =================================== Can Setup Project Summary ================================================
//#region [Can Setup Requested]
export type CanSetupProjectSummaryRequestedType = {
  type: typeof actionTypes.CAN_SETUP_PROJECT_SUMMARY_REQUESTED;
  reAssetId: number;
  callback?: (success: boolean, message?: string) => void;
};

export const CanSetupProjectSummaryRequested = (
  reAssetId: number,
  callback?: (success: boolean, message?: string) => void,
): CanSetupProjectSummaryRequestedType => ({
  type: actionTypes.CAN_SETUP_PROJECT_SUMMARY_REQUESTED,
  reAssetId,
  callback,
});
//#endregion [Requested]

//#region [Can Setup Succeeded]
export type CanSetupProjectSummarySucceededType = {
  type: typeof actionTypes.CAN_SETUP_PROJECT_SUMMARY_SUCCEEDED;
  result: CanSetupProjectSummaryData;
};

export const CanSetupProjectSummarySucceeded = (result: CanSetupProjectSummaryData): CanSetupProjectSummarySucceededType => ({
  type: actionTypes.CAN_SETUP_PROJECT_SUMMARY_SUCCEEDED,
  result,
});

//#endregion [Succeeded]

//#region [Can Setup Failed]
export type CanSetupProjectSummaryFailedType = {
  type: typeof actionTypes.CAN_SETUP_PROJECT_SUMMARY_FAILED;
  error?: string;
};

export const CanSetupProjectSummaryFailed = (error?: string): CanSetupProjectSummaryFailedType => ({
  type: actionTypes.CAN_SETUP_PROJECT_SUMMARY_FAILED,
  error,
});
//#endregion [Can Setup Failed]

// =================================== Check Project Summary Details Exist ================================================
//#region [Check Project Summary Requested]
export type CheckProjectSummaryDetailsExistRequestedType = {
  type: typeof actionTypes.CHECK_PROJECT_SUMMARY_DETAILS_EXIST_REQUESTED;
  reAssetId: number;
  MisDate: string;
  typeCheck: string;
  callback?: (success: boolean, message?: string) => void;
};

export const CheckProjectSummaryDetailsExistRequested = (
  reAssetId: number,
  MisDate: string,
  typeCheck: string,
  callback?: (success: boolean, message?: string) => void,
): CheckProjectSummaryDetailsExistRequestedType => ({
  type: actionTypes.CHECK_PROJECT_SUMMARY_DETAILS_EXIST_REQUESTED,
  reAssetId,
  typeCheck,
  MisDate,
  callback,
});
//#endregion [Requested]

//#region [Check Project Summary Succeeded]
export type CheckProjectSummaryDetailsExistSucceededType = {
  type: typeof actionTypes.CHECK_PROJECT_SUMMARY_DETAILS_EXIST_SUCCEEDED;
  result: CheckProjectSummaryDetailsExistData;
};

export const CheckProjectSummaryDetailsExistSucceeded = (result: CheckProjectSummaryDetailsExistData): CheckProjectSummaryDetailsExistSucceededType => ({
  type: actionTypes.CHECK_PROJECT_SUMMARY_DETAILS_EXIST_SUCCEEDED,
  result,
});

//#endregion [Succeeded]

//#region [Check Project Summary Failed]
export type CheckProjectSummaryDetailsExistFailedType = {
  type: typeof actionTypes.CHECK_PROJECT_SUMMARY_DETAILS_EXIST_FAILED;
  error?: string;
};

export const CheckProjectSummaryDetailsExistFailed = (error?: string): CheckProjectSummaryDetailsExistFailedType => ({
  type: actionTypes.CHECK_PROJECT_SUMMARY_DETAILS_EXIST_FAILED,
  error,
});
//#endregion [Failed]

// =================================== Upload Project Summary Template ================================================
//#region [Upload Project Summary Requested]
export type UploadProjectSummaryTemplateRequestedType = {
  type: typeof actionTypes.UPLOAD_PROJECT_SUMMARY_TEMPLATE_REQUESTED;
  payload: UploadProjectSummaryTemplatePayload;
  callback?: (success: boolean, message?: string) => void;
};

export const UploadProjectSummaryTemplateRequested = (
  payload: UploadProjectSummaryTemplatePayload,
  callback?: (success: boolean, message?: string) => void,
): UploadProjectSummaryTemplateRequestedType => ({
  type: actionTypes.UPLOAD_PROJECT_SUMMARY_TEMPLATE_REQUESTED,
  payload,
  callback,
});
//#endregion [Upload Project Summary Requested]

//#region [Upload Project Summary Succeeded]
export type UploadProjectSummaryTemplateSucceededType = {
  type: typeof actionTypes.UPLOAD_PROJECT_SUMMARY_TEMPLATE_SUCCEEDED;
  result: UploadProjectSummaryTemplateResponse;
};

export const UploadProjectSummaryTemplateSucceeded = (result: UploadProjectSummaryTemplateResponse): UploadProjectSummaryTemplateSucceededType => ({
  type: actionTypes.UPLOAD_PROJECT_SUMMARY_TEMPLATE_SUCCEEDED,
  result,
});

//#endregion [Upload Project Summary Succeeded]

//#region [Upload Project Summary Failed]
export type UploadProjectSummaryTemplateFailedType = {
  type: typeof actionTypes.UPLOAD_PROJECT_SUMMARY_TEMPLATE_FAILED;
  error?: string;
};

export const UploadProjectSummaryTemplateFailed = (error?: string): UploadProjectSummaryTemplateFailedType => ({
  type: actionTypes.UPLOAD_PROJECT_SUMMARY_TEMPLATE_FAILED,
  error,
});
//#endregion [Upload Project Summary Failed]

// =================================== Upload Project Summary Setup Template ================================================
//#region [Upload setup Requested]
export type UploadProjectSummaryTemplateSetupRequestedType = {
  type: typeof actionTypes.UPLOAD_PROJECT_SUMMARY_SETUP_REQUESTED;
  payload: UploadProjectSummaryTemplateSetupPayload;
  callback?: (success: boolean, message?: string) => void;
};

export const UploadProjectSummaryTemplateSetupRequested = (
  payload: UploadProjectSummaryTemplateSetupPayload,
  callback?: (success: boolean, message?: string) => void,
): UploadProjectSummaryTemplateSetupRequestedType => ({
  type: actionTypes.UPLOAD_PROJECT_SUMMARY_SETUP_REQUESTED,
  payload,
  callback,
});
//#endregion [Upload setup Requested]

//#region [Upload setup Succeeded]
export type UploadProjectSummaryTemplateSetupSucceededType = {
  type: typeof actionTypes.UPLOAD_PROJECT_SUMMARY_SETUP_SUCCEEDED;
  result: UploadProjectSummaryTemplateSetupResponse;
};

export const UploadProjectSummaryTemplateSetupSucceeded = (
  result: UploadProjectSummaryTemplateSetupResponse,
): UploadProjectSummaryTemplateSetupSucceededType => ({
  type: actionTypes.UPLOAD_PROJECT_SUMMARY_SETUP_SUCCEEDED,
  result,
});

//#endregion [Upload setup Succeeded]

//#region [Upload setup Failed]
export type UploadProjectSummaryTemplateSetupFailedType = {
  type: typeof actionTypes.UPLOAD_PROJECT_SUMMARY_SETUP_FAILED;
  error?: string;
};

export const UploadProjectSummaryTemplateSetupFailed = (error?: string): UploadProjectSummaryTemplateSetupFailedType => ({
  type: actionTypes.UPLOAD_PROJECT_SUMMARY_SETUP_FAILED,
  error,
});
//#endregion [Upload setup Failed]

export type SummaryActions =
  // summary past history List
  | GetSummaryPastHistoryRequestedType
  | GetSummaryPastHistorySucceededType
  | GetSummaryPastHistoryFailedType

  //is summary setup
  | IsSummarySetupRequestedType
  | IsSummarySetupSucceededType
  | IsSummarySetupFailedType

  // delete project summary details
  | DeleteProjectSummaryDetailsRequestedType
  | DeleteProjectSummaryDetailsSucceededType
  | DeleteProjectSummaryDetailsFailedType

  // update project summary status
  | UpdateProjectSummaryStatusRequestedType
  | UpdateProjectSummaryStatusSucceededType
  | UpdateProjectSummaryStatusFailedType

  // download project summary template
  | DownloadProjectSummaryTemplateRequestedType
  | DownloadProjectSummaryTemplateSucceededType
  | DownloadProjectSummaryTemplateFailedType

  // can setup project summary
  | CanSetupProjectSummaryRequestedType
  | CanSetupProjectSummarySucceededType
  | CanSetupProjectSummaryFailedType

  // check project summary details exist
  | CheckProjectSummaryDetailsExistRequestedType
  | CheckProjectSummaryDetailsExistSucceededType
  | CheckProjectSummaryDetailsExistFailedType

  // upload project summary template
  | UploadProjectSummaryTemplateRequestedType
  | UploadProjectSummaryTemplateSucceededType
  | UploadProjectSummaryTemplateFailedType

  //Pending Update List
  | GetSummaryPendingUpdateRequestedType
  | GetSummaryPendingUpdateSucceededType
  | GetSummaryPendingUpdateFailedType

  // upload project summary template setup
  | UploadProjectSummaryTemplateSetupRequestedType
  | UploadProjectSummaryTemplateSetupSucceededType
  | UploadProjectSummaryTemplateSetupFailedType;
