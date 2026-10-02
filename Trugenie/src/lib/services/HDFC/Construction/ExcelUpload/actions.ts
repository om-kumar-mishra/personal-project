import { ExcelUploadPastHistoryData, ConstructionPendingData, UploadConstructionSetupTemplatePayload, UploadConstructionSetupTemplateResponse, CanSetupConstructionData, UpdateConstructionSetupStatusPayload, UpdateConstructionSetupStatusResponse, UploadConstructionUpdateTemplatePayload, UploadConstructionUpdateTemplateResponse, IsConstructionSetupData, CanUpdateConstructionData, UpdateConstructionUpdateStatusResponse, UpdateConstructionUpdateStatusPayload, DeleteConstructionUploadPayload, DeleteConstructionUploadResponse } from "./dataTypes";
import * as actionTypes from "./types";


// ===================================Get Construction Excel upload PastHistory List================================================
//#region [PastHistory Requested]
export type GetExcelUploadPastHistoryRequestedType = {
  type: typeof actionTypes.GET_CONTRUCTION_EXCEL_UPLOAD_PAST_HISTORY_REQUESTED;
  reAssetId: number;
  createdBy: string;
  Type: string;
};

export const GetExcelUploadPastHistoryListRequested = (reAssetId: number, createdBy: string, Type: string): GetExcelUploadPastHistoryRequestedType => ({
  type: actionTypes.GET_CONTRUCTION_EXCEL_UPLOAD_PAST_HISTORY_REQUESTED,
  reAssetId,
  createdBy,
  Type,
});
//#endregion

//#region [PastHistory Succeeded]
export type GetExcelUploadPastHistorySucceededType = {
  type: typeof actionTypes.GET_CONTRUCTION_EXCEL_UPLOAD_PAST_HISTORY_SUCCEEDED;
  result: ExcelUploadPastHistoryData[];
};

export const GetExcelUploadHistoryListSucceeded = (result: ExcelUploadPastHistoryData[]): GetExcelUploadPastHistorySucceededType => ({
  type: actionTypes.GET_CONTRUCTION_EXCEL_UPLOAD_PAST_HISTORY_SUCCEEDED,
  result,
});

//#endregion

//#region [PastHistory Failed]
export type GetExcelUploadPastHistoryFailedType = {
  type: typeof actionTypes.GET_CONTRUCTION_EXCEL_UPLOAD_PAST_HISTORY_FAILED;
  error?: string;
};

export const GetExcelUploadPastHistoryListFailed = (error?: string): GetExcelUploadPastHistoryFailedType => ({
  type: actionTypes.GET_CONTRUCTION_EXCEL_UPLOAD_PAST_HISTORY_FAILED,
  error,
});
//#endregion

// ===================================Get Pending List================================================
//#region [Summary Pending List Requested]
export type GetConstructionPendignMISRequestedType = {
  type: typeof actionTypes.GET_CONTRUCTION_PENDING_MIS_REQUESTED;
  reAssetId,
  createdBy,
  Type,
};

export const GetConstructionPendignMISListRequested = (reAssetId: number, createdBy: string, Type: string): GetConstructionPendignMISRequestedType => ({
  type: actionTypes.GET_CONTRUCTION_PENDING_MIS_REQUESTED,
  reAssetId,
  createdBy,
  Type,
});
//#endregion

//#region [Summary Pending List Succeeded]
export type GetConstructionPendignMISSucceededType = {
  type: typeof actionTypes.GET_CONTRUCTION_PENDING_MIS_SUCCEEDED;
  result: ConstructionPendingData[];
};

export const GetConstructionPendignMISListSucceeded = (result: ConstructionPendingData[]): GetConstructionPendignMISSucceededType => ({
  type: actionTypes.GET_CONTRUCTION_PENDING_MIS_SUCCEEDED,
  result,
});

//#endregion

//#region [Summary Pending List Failed]
export type GetConstructionPendignMISFailedType = {
  type: typeof actionTypes.GET_CONTRUCTION_PENDING_MIS_FAILED;
  error?: string;
};

export const GetConstructionPendignMISListFailed = (error?: string): GetConstructionPendignMISFailedType => ({
  type: actionTypes.GET_CONTRUCTION_PENDING_MIS_FAILED,
  error,
});
//#endregion

// =================================== Upload Construction Setup Template ================================================
//#region [Upload setup Requested]
export type UploadConstructionTemplateSetupRequestedType = {
  type: typeof actionTypes.INSERT_CONSTRUCTION_SETUP_TEMPLATE_REQUESTED;
  payload: UploadConstructionSetupTemplatePayload;
  callback?: (success: boolean, message?: string) => void;
};

export const UploadConstructionTemplateSetupRequested = (
  payload: UploadConstructionSetupTemplatePayload,
  callback?: (success: boolean, message?: string) => void,
): UploadConstructionTemplateSetupRequestedType => ({
  type: actionTypes.INSERT_CONSTRUCTION_SETUP_TEMPLATE_REQUESTED,
  payload,
  callback,
});
//#endregion [Upload setup Requested]

//#region [Upload setup Succeeded]
export type UploadConstructionTemplateSetupSucceededType = {
  type: typeof actionTypes.INSERT_CONSTRUCTION_SETUP_TEMPLATE_SUCCEEDED;
  result: UploadConstructionSetupTemplateResponse;
};

export const UploadConstructionTemplateSetupSucceeded = (
  result: UploadConstructionSetupTemplateResponse,
): UploadConstructionTemplateSetupSucceededType => ({
  type: actionTypes.INSERT_CONSTRUCTION_SETUP_TEMPLATE_SUCCEEDED,
  result,
});

//#endregion [Upload setup Succeeded]

// //#region [Upload setup Failed]
export type UploadConstructionTemplateSetupFailedType = {
  type: typeof actionTypes.INSERT_CONSTRUCTION_SETUP_TEMPLATE_FAILED;
  error?: string;
};

export const UploadConstructionTemplateSetupFailed = (error?: string): UploadConstructionTemplateSetupFailedType => ({
  type: actionTypes.INSERT_CONSTRUCTION_SETUP_TEMPLATE_FAILED,
  error,
});
//#endregion [Upload setup Failed]


// =================================== Can SETUP CONSTRUCTION SETUP ================================================
//#region [Can Setup Requested]
export type CanSetupConstructionRequestedType = {
  type: typeof actionTypes.CAN_SETUP_CONSTRUCTION_REQUESTED;
  reAssetId: number;
  callback?: (success: boolean, message?: string) => void;
};

export const CanSetupConstructionRequested = (
  reAssetId: number,
  callback?: (success: boolean, message?: string) => void,
): CanSetupConstructionRequestedType => ({
  type: actionTypes.CAN_SETUP_CONSTRUCTION_REQUESTED,
  reAssetId,
  callback,
});
//#endregion [Requested]

//#region [Can Setup Succeeded]
export type CanSetupConstructionSucceededType = {
  type: typeof actionTypes.CAN_SETUP_CONSTRUCTION_SUCCEEDED;
  result: CanSetupConstructionData;
};

export const CanSetupConstructionSucceeded = (result: CanSetupConstructionData): CanSetupConstructionSucceededType => ({
  type: actionTypes.CAN_SETUP_CONSTRUCTION_SUCCEEDED,
  result,
});

//#endregion [Succeeded]

//#region [Can Setup Failed]
export type CanSetupConstructionFailedType = {
  type: typeof actionTypes.CAN_SETUP_CONSTRUCTION_FAILED;
  error?: string;
};

export const CanSetupConstructionFailed = (error?: string): CanSetupConstructionFailedType => ({
  type: actionTypes.CAN_SETUP_CONSTRUCTION_FAILED,
  error,
});

// =================================== Update Project Summary Stattus ================================================
//#region [Update Requested]
export type UpdateConstructionSetupStatusRequestedType = {
  type: typeof actionTypes.UPDATE_CONSTRUCTION_SETUP_STATUS_REQUESTED;
  payload: UpdateConstructionSetupStatusPayload;
  callback?: (success: boolean, message?: string) => void;
};

export const UpdateConstructionSetupStatusRequested = (
  payload: UpdateConstructionSetupStatusPayload,
  callback?: (success: boolean, message?: string) => void,
): UpdateConstructionSetupStatusRequestedType => ({
  type: actionTypes.UPDATE_CONSTRUCTION_SETUP_STATUS_REQUESTED,
  payload,
  callback,
});
//#endregion [Update Requested]

//#region [Update Succeeded]
export type UpdateConstructionSetupStatusSucceededType = {
  type: typeof actionTypes.UPDATE_CONSTRUCTION_SETUP_STATUS_SUCCEEDED;
  result: UpdateConstructionSetupStatusResponse;
};

export const UpdateConstructionSetupStatusSucceeded = (result: UpdateConstructionSetupStatusResponse): UpdateConstructionSetupStatusSucceededType => ({
  type: actionTypes.UPDATE_CONSTRUCTION_SETUP_STATUS_SUCCEEDED,
  result,
});

//#endregion [Update Succeeded]

//#region [Update Failed]
export type UpdateConstructionSetupStatusFailedType = {
  type: typeof actionTypes.UPDATE_CONSTRUCTION_SETUP_STATUS_FAILED;
  error?: string;
};

export const UpdateConstructionSetupStatusFailed = (error?: string): UpdateConstructionSetupStatusFailedType => ({
  type: actionTypes.UPDATE_CONSTRUCTION_SETUP_STATUS_FAILED,
  error,
});
//#endregion [Update Failed]
//#endregion [Can Setup Failed]

// =================================== Download Project Summary Template ================================================
//#region [Download Requested]
export type DownloadConstructionTemplateRequestedType = {
  type: typeof actionTypes.DOWNLOAD_CONSTRUCTION_SETUP_TEMPLATE_REQUESTED;
  reassetId: number;
  callback?: (success: boolean, message?: string) => void;
};

export const DownloadConstructionTemplateRequested = (
  reassetId: number,
  callback?: (success: boolean, message?: string) => void,
): DownloadConstructionTemplateRequestedType => ({
  type: actionTypes.DOWNLOAD_CONSTRUCTION_SETUP_TEMPLATE_REQUESTED,
  reassetId,
  callback,
});
//#endregion [Download Requested]

//#region [Download Succeeded]
export type DownloadConstructionTemplateSucceededType = {
  type: typeof actionTypes.DOWNLOAD_CONSTRUCTION_SETUP_TEMPLATE_SUCCEEDED;
};

export const DownloadConstructionTemplateSucceeded = (): DownloadConstructionTemplateSucceededType => ({
  type: actionTypes.DOWNLOAD_CONSTRUCTION_SETUP_TEMPLATE_SUCCEEDED,
});

//#endregion [Download Succeeded]

//#region [Download Failed]
export type DownloadConstructionTemplateFailedType = {
  type: typeof actionTypes.DOWNLOAD_CONSTRUCTION_SETUP_TEMPLATE_FAILED;
  error?: string;
};

export const DownloadConstructionTemplateFailed = (error?: string): DownloadConstructionTemplateFailedType => ({
  type: actionTypes.DOWNLOAD_CONSTRUCTION_SETUP_TEMPLATE_FAILED,
  error,
});
//#endregion [Download Failed]


// =================================== Upload Construction update Template ================================================
//#region [Upload Project Summary Requested]
export type UploadConstructionUpdateTemplateRequestedType = {
  type: typeof actionTypes.UPLOAD_CONSTRUCTIO_UPDATE_TEMPLATE_REQUESTED;
  payload: UploadConstructionUpdateTemplatePayload;
  callback?: (success: boolean, message?: string) => void;
};

export const UploadContruectionUpdateTemplateRequested = (
  payload: UploadConstructionUpdateTemplatePayload,
  callback?: (success: boolean, message?: string) => void,
): UploadConstructionUpdateTemplateRequestedType => ({
  type: actionTypes.UPLOAD_CONSTRUCTIO_UPDATE_TEMPLATE_REQUESTED,
  payload,
  callback,
});
//#endregion [Upload Project Summary Requested]

//#region [Upload Project Summary Succeeded]
export type UploadConstructionUpdateTemplateSucceededType = {
  type: typeof actionTypes.UPLOAD_CONSTRUCTIO_UPDATE_TEMPLATE_SUCCEEDED;
  result: UploadConstructionUpdateTemplateResponse;
};
export const UploadConstructionUpdateTemplateSucceeded = (result: UploadConstructionUpdateTemplateResponse): UploadConstructionUpdateTemplateSucceededType => ({
  type: actionTypes.UPLOAD_CONSTRUCTIO_UPDATE_TEMPLATE_SUCCEEDED,
  result,
});

//#endregion [Upload Project Summary Succeeded]

//#region [Upload Project Summary Failed]
export type UploadConstructionUpdateTemplateFailedType = {
  type: typeof actionTypes.UPLOAD_CONSTRUCTIO_UPDATE_TEMPLATE_FAILED;
  error?: string;
};

export const UploadConstructionUpdateTemplateFailed = (error?: string): UploadConstructionUpdateTemplateFailedType => ({
  type: actionTypes.UPLOAD_CONSTRUCTIO_UPDATE_TEMPLATE_FAILED,
  error,
});

// ===================================Is Construction Setup================================================
//#region [Is Construction Setup Requested]
export type IsConstructionSetupRequestedType = {
  type: typeof actionTypes.IS_CONSTRUCTION_SETUP_REQUESTED;
  REAssetId: number;
  Type?: string;
};

export const IsConstructionSetupRequested = (REAssetId: number): IsConstructionSetupRequestedType => ({
  type: actionTypes.IS_CONSTRUCTION_SETUP_REQUESTED,
  REAssetId
});
//#endregion [Is Construction Setup Requested]

//#region [Is Construction Setup Succeeded]
export type IsConstructionSetupSucceededType = {
  type: typeof actionTypes.IS_CONSTRUCTION_SETUP_SUCCEEDED;
  result: IsConstructionSetupData;
};

export const IsConstructionSetupSucceeded = (result: IsConstructionSetupData): IsConstructionSetupSucceededType => ({
  type: actionTypes.IS_CONSTRUCTION_SETUP_SUCCEEDED,
  result,
});

//#endregion [Is Construction Setup Succeeded]

//#region [Is Construction Setup Failed]
export type IsConstructionSetupFailedType = {
  type: typeof actionTypes.IS_CONSTRUCTION_SETUP_FAILED;
  error?: string;
};

export const IsConstructionSetupFailed = (error?: string): IsConstructionSetupFailedType => ({
  type: actionTypes.IS_CONSTRUCTION_SETUP_FAILED,
  error,
});
//#endregion [Is Construction Setup Failed]

// =================================== Can Setup Project Summary ================================================
//#region [Can Setup Requested]
export type CanUpdateConstructionRequestedType = {
  type: typeof actionTypes.CAN_UPDATE_CONSTRUCTION_REQUESTED;
  date: string,
  reAssetId: number;
  callback?: (success: boolean, message?: string) => void;
};

export const CanUpdateConstructionRequested = (
  date: string,
  reAssetId: number,
  callback?: (success: boolean, message?: string) => void,
): CanUpdateConstructionRequestedType => ({
  type: actionTypes.CAN_UPDATE_CONSTRUCTION_REQUESTED,
  date,
  reAssetId,
  callback,
});
//#endregion [Requested]

//#region [Can Setup Succeeded]
export type CanUpdateConstructionSucceededType = {
  type: typeof actionTypes.CAN_UPDATE_CONSTRUCTION_SUCCEEDED;
  result: CanUpdateConstructionData;
};

export const CanUpdateConstructionSucceeded = (result: CanUpdateConstructionData): CanUpdateConstructionSucceededType => ({
  type: actionTypes.CAN_UPDATE_CONSTRUCTION_SUCCEEDED,
  result,
});

//#endregion [Succeeded]

//#region [Can Setup Failed]
export type CanUpdateConstructionFailedType = {
  type: typeof actionTypes.CAN_UPDATE_CONSTRUCTION_FAILED;
  error?: string;
};

export const CanUpdateConstructionFailed = (error?: string): CanUpdateConstructionFailedType => ({
  type: actionTypes.CAN_UPDATE_CONSTRUCTION_FAILED,
  error,
});
//#endregion [Can Setup Failed]


// =================================== Update Construction  Stattus ================================================
//#region [Update Requested]
export type UpdateConstructionStatusRequestedType = {
  type: typeof actionTypes.UPDATE_CONSTRUCTION_STATUS_REQUESTED;
  payload: UpdateConstructionUpdateStatusPayload;
  callback?: (success: boolean, message?: string) => void;
};

export const UpdateConstructionStatusRequested = (
  payload: UpdateConstructionUpdateStatusPayload,
  callback?: (success: boolean, message?: string) => void,
): UpdateConstructionStatusRequestedType => ({
  type: actionTypes.UPDATE_CONSTRUCTION_STATUS_REQUESTED,
  payload,
  callback,
});
//#endregion [Update Requested]

//#region [Update Succeeded]
export type UpdateConstructionStatusSucceededType = {
  type: typeof actionTypes.UPDATE_CONSTRUCTION_STATUS_SUCCEEDED;
  result: UpdateConstructionUpdateStatusResponse;
};

export const UpdateConstructionStatusSucceeded = (result: UpdateConstructionUpdateStatusResponse): UpdateConstructionStatusSucceededType => ({
  type: actionTypes.UPDATE_CONSTRUCTION_STATUS_SUCCEEDED,
  result,
});

//#endregion [Update Succeeded]

//#region [Update Failed]
export type UpdateConstructionStatusFailedType = {
  type: typeof actionTypes.UPDATE_CONSTRUCTION_STATUS_FAILED;
  error?: string;
};

export const UpdateConstructionStatusFailed = (error?: string): UpdateConstructionStatusFailedType => ({
  type: actionTypes.UPDATE_CONSTRUCTION_STATUS_FAILED,
  error,
});
//#endregion [Update Failed]


// =================================== Delete Project Summary Details ================================================
//#region [Delete Requested]
export type DeleteConstructionUploadRequestedType = {
  type: typeof actionTypes.DELETE_CONSTRUCTION_UPDATE_DETAILS_REQUESTED;
  payload: DeleteConstructionUploadPayload;
  callback?: (success: boolean, message?: string) => void;
};

export const DeleteConstructionUploadRequested = (
  payload: DeleteConstructionUploadPayload,
  callback?: (success: boolean, message?: string) => void,
): DeleteConstructionUploadRequestedType => ({
  type: actionTypes.DELETE_CONSTRUCTION_UPDATE_DETAILS_REQUESTED,
  payload,
  callback,
});
//#endregion [Delete Requested]

//#region [Delete Succeeded]
export type DeleteConstructionUploadSucceededType = {
  type: typeof actionTypes.DELETE_CONSTRUCTION_UPDATE_DETAILS_SUCCEEDED;
  result: DeleteConstructionUploadResponse;
};

export const DeleteConstructionUploadSucceeded = (result: DeleteConstructionUploadResponse): DeleteConstructionUploadSucceededType => ({
  type: actionTypes.DELETE_CONSTRUCTION_UPDATE_DETAILS_SUCCEEDED,
  result,
});

//#endregion [Delete Succeeded]

//#region [Delete Failed]
export type DeleteConstructionUploadFailedType = {
  type: typeof actionTypes.DELETE_CONSTRUCTION_UPDATE_DETAILS_FAILED;
  error?: string;
};

export const DeleteConstructionUploadFailed = (error?: string): DeleteConstructionUploadFailedType => ({
  type: actionTypes.DELETE_CONSTRUCTION_UPDATE_DETAILS_FAILED,
  error,
});
//#endregion [Delete Failed]

// =================================== Download Construction Template ================================================
//#region [Download Requested]
export type DownloadConstructionTemplateUpdateRequestedType = {
  type: typeof actionTypes.DOWNLOAD_CONSTRUCTION_TEMPLATE_REQUESTED;
  reassetId: number;
  callback?: (success: boolean, message?: string) => void;
};

export const DownloadConstructionTemplateUpdateRequested = (
  reassetId: number,
  callback?: (success: boolean, message?: string) => void,
): DownloadConstructionTemplateUpdateRequestedType => ({
  type: actionTypes.DOWNLOAD_CONSTRUCTION_TEMPLATE_REQUESTED,
  reassetId,
  callback,
});
//#endregion [Download Requested]

//#region [Download Succeeded]
export type DownloadConstructionTemplateUpdateSucceededType = {
  type: typeof actionTypes.DOWNLOAD_CONSTRUCTION_TEMPLATE_SUCCEEDED;
};

export const DownloadConstructionTemplateUpdateSucceeded = (): DownloadConstructionTemplateUpdateSucceededType => ({
  type: actionTypes.DOWNLOAD_CONSTRUCTION_TEMPLATE_SUCCEEDED,
});

//#endregion [Download Succeeded]

//#region [Download Failed]
export type DownloadConstructionTemplateUpdateFailedType = {
  type: typeof actionTypes.DOWNLOAD_CONSTRUCTION_TEMPLATE_FAILED;
  error?: string;
};

export const DownloadConstructionTemplateUpdateFailed = (error?: string): DownloadConstructionTemplateUpdateFailedType => ({
  type: actionTypes.DOWNLOAD_CONSTRUCTION_TEMPLATE_FAILED,
  error,
});
//#endregion [Download Failed]

//=================================================Document download Row ================================================

export type DownloadExcelUploadRowRequestAction = {
  type: typeof actionTypes.DOWNLOAD_EXCEL_UPLOAD_SETUP_ROW_REQUESTED;
  containerName: string;
  filePath: string;
  fileName: string;
  callBack?: (success: boolean) => void;
};

export const downloadExcelUploadRowRequest = (
  containerName: string,
  filePath: string,
  fileName: string,
  callBack?: (success: boolean) => void,
): DownloadExcelUploadRowRequestAction => ({
  type: actionTypes.DOWNLOAD_EXCEL_UPLOAD_SETUP_ROW_REQUESTED,
  containerName,
  filePath,
  fileName,
  callBack,
});

export type DownloadExcelUploadRowSucceededAction = {
  type: typeof actionTypes.DOWNLOAD_EXCEL_UPLOAD_SETUP_ROW_SUCCEEDED;
};

export const downloadExcelUploadRowSucceeded = (): DownloadExcelUploadRowSucceededAction => ({
  type: actionTypes.DOWNLOAD_EXCEL_UPLOAD_SETUP_ROW_SUCCEEDED,
});

export type DownloadExcelUploadRowFailedAction = {
  type: typeof actionTypes.DOWNLOAD_EXCEL_UPLOAD_SETUP_ROW_FAILED;
};

export const downloadExcelUploadRowFailed = (): DownloadExcelUploadRowFailedAction => ({
  type: actionTypes.DOWNLOAD_EXCEL_UPLOAD_SETUP_ROW_FAILED,
});


export type ExcelUploadActions =
  // ExcelUpload past history List
  | GetExcelUploadPastHistoryRequestedType
  | GetExcelUploadPastHistorySucceededType
  | GetExcelUploadPastHistoryFailedType

  // upload Construction template setup
  | UploadConstructionTemplateSetupRequestedType
  | UploadConstructionTemplateSetupSucceededType
  | UploadConstructionTemplateSetupFailedType
  // Pending Update List
  | GetConstructionPendignMISRequestedType
  | GetConstructionPendignMISSucceededType
  | GetConstructionPendignMISFailedType

  // update project summary status
  | UpdateConstructionSetupStatusRequestedType
  | UpdateConstructionSetupStatusSucceededType
  | UpdateConstructionSetupStatusFailedType

  // can setup project summary
  | CanSetupConstructionRequestedType
  | CanSetupConstructionSucceededType
  | CanSetupConstructionFailedType

  // download project summary template
  | DownloadConstructionTemplateRequestedType
  | DownloadConstructionTemplateSucceededType
  | DownloadConstructionTemplateFailedType

  // upload Construction template
  | UploadConstructionUpdateTemplateRequestedType
  | UploadConstructionUpdateTemplateSucceededType
  | UploadConstructionUpdateTemplateFailedType

  // can Update
  | CanUpdateConstructionRequestedType
  | CanUpdateConstructionSucceededType
  | CanUpdateConstructionFailedType


  //   // upload project summary template
  | UpdateConstructionStatusRequestedType
  | UpdateConstructionStatusSucceededType
  | UpdateConstructionStatusFailedType

  //is summary setup
  | IsConstructionSetupRequestedType
  | IsConstructionSetupSucceededType
  | IsConstructionSetupFailedType

  // delete project summary details
  | DeleteConstructionUploadRequestedType
  | DeleteConstructionUploadSucceededType
  | DeleteConstructionUploadFailedType

  // download project summary template
  | DownloadConstructionTemplateUpdateRequestedType
  | DownloadConstructionTemplateUpdateSucceededType
  | DownloadConstructionTemplateUpdateFailedType

  //Document download Row
  | DownloadExcelUploadRowRequestAction
  | DownloadExcelUploadRowSucceededAction
  | DownloadExcelUploadRowFailedAction;

