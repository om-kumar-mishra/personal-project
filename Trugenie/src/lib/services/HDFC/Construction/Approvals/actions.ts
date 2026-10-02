import {
  ApprovalDropDownData,
  ApprovalPastHistoryData,
  PendingConstructionApprovalDocumentsData,
  UpdateApprovalStatusPayload,
  UpdateApprovalStatusResponse,
  UploadConstructionApprovalDocumentsPayload,
  UploadConstructionApprovalDocumentsResponse,
} from "./dataTypes";
import * as actionTypes from "./types";


// ===================================Get Construction Approval PastHistory List================================================
//#region [Approval PastHistory Requested]
export type GetApprovalPastHistoryRequestedType = {
  type: typeof actionTypes.GET_CONTRUCTION_APPROVAL_PAST_HISTORY_REQUESTED;
  reAssetId: number;
  createdBy: string;
};

export const GetApprovalPastHistoryListRequested = (reAssetId: number, createdBy: string): GetApprovalPastHistoryRequestedType => ({
  type: actionTypes.GET_CONTRUCTION_APPROVAL_PAST_HISTORY_REQUESTED,
  reAssetId,
  createdBy,
});
//#endregion

//#region [Approval PastHistory Succeeded]
export type GetApprovalPastHistorySucceededType = {
  type: typeof actionTypes.GET_CONTRUCTION_APPROVAL_PAST_HISTORY_SUCCEEDED;
  result: ApprovalPastHistoryData[];
};

export const GetApprovalHistoryListSucceeded = (result: ApprovalPastHistoryData[]): GetApprovalPastHistorySucceededType => ({
  type: actionTypes.GET_CONTRUCTION_APPROVAL_PAST_HISTORY_SUCCEEDED,
  result,
});

//#endregion

//#region [PastHistory Failed]
export type GetApprovalPastHistoryFailedType = {
  type: typeof actionTypes.GET_CONTRUCTION_APPROVAL_PAST_HISTORY_FAILED;
  error?: string;
};

export const GetApprovalPastHistoryListFailed = (error?: string): GetApprovalPastHistoryFailedType => ({
  type: actionTypes.GET_CONTRUCTION_APPROVAL_PAST_HISTORY_FAILED,
  error,
});
//#endregion

// =================================== Update Approval Stattus ================================================
//#region [Update Requested]
export type UpdateApprovalStatusRequestedType = {
  type: typeof actionTypes.UPDATE_APPROVAl_STATUS_REQUESTED;
  payload: UpdateApprovalStatusPayload;
  callback?: (success: boolean, message?: string) => void;
};

export const UpdateApprovalStatusRequested = (
  payload: UpdateApprovalStatusPayload,
  callback?: (success: boolean, message?: string) => void,
): UpdateApprovalStatusRequestedType => ({
  type: actionTypes.UPDATE_APPROVAl_STATUS_REQUESTED,
  payload,
  callback,
});
//#endregion [Update Requested]

//#region [Update Succeeded]
export type UpdateApprovalStatusSucceededType = {
  type: typeof actionTypes.UPDATE_APPROVAl_STATUS_SUCCEEDED;
  result: UpdateApprovalStatusResponse;
};

export const UpdateApprovalStatusSucceeded = (result: UpdateApprovalStatusResponse): UpdateApprovalStatusSucceededType => ({
  type: actionTypes.UPDATE_APPROVAl_STATUS_SUCCEEDED,
  result,
});

//#endregion [Update Succeeded]

//#region [Update Failed]
export type UpdateApprovalStatusFailedType = {
  type: typeof actionTypes.UPDATE_APPROVAl_STATUS_FAILED;
  error?: string;
};

export const UpdateApprovalStatusFailed = (error?: string): UpdateApprovalStatusFailedType => ({
  type: actionTypes.UPDATE_APPROVAl_STATUS_FAILED,
  error,
});
//#endregion [Update Failed]

// ===================================Get Pending Construction Approval Documents================================================
//#region [Approval Requested]
export type GetPendingConstructionApprovalDocumentsRequestedType = {
  type: typeof actionTypes.GET_PENDING_APPROVAL_DOCUMENTS_REQUESTED;
  reAssetId: number;
  createdBy: string;
};

export const GetPendingConstructionApprovalDocumentsListRequested =
  (reAssetId: number, createdBy: string): GetPendingConstructionApprovalDocumentsRequestedType => ({
    type: actionTypes.GET_PENDING_APPROVAL_DOCUMENTS_REQUESTED,
    reAssetId,
    createdBy,
  });
//#endregion

//#region [Approval Succeeded]
export type GetPendingConstructionApprovalDocumentsSucceededType = {
  type: typeof actionTypes.GET_PENDING_APPROVAL_DOCUMENTS_SUCCEEDED;
  result: PendingConstructionApprovalDocumentsData[];
};

export const PendingConstructionApprovalDocumentsListSucceeded =
  (result: PendingConstructionApprovalDocumentsData[]): GetPendingConstructionApprovalDocumentsSucceededType => ({
    type: actionTypes.GET_PENDING_APPROVAL_DOCUMENTS_SUCCEEDED,
    result,
  });

//#endregion

//#region [Failed]
export type GetPendingConstructionApprovalDocumentsFailedType = {
  type: typeof actionTypes.GET_PENDING_APPROVAL_DOCUMENTS_FAILED;
  error?: string;
};

export const GetPendingConstructionApprovalDocumentsListFailed =
  (error?: string): GetPendingConstructionApprovalDocumentsFailedType => ({
    type: actionTypes.GET_PENDING_APPROVAL_DOCUMENTS_FAILED,
    error,
  });
//#endregion

// =================================== Upload Construction Approval Documents ================================================
//#region [Upload setup Requested]
export type UploadConstructionApprovalDocumentsRequestedType = {
  type: typeof actionTypes.INSERT_CONSTRUCTION_APPROVAL_DOCUMENTS_REQUESTED;
  payload: UploadConstructionApprovalDocumentsPayload;
  callback?: (success: boolean, message?: string) => void;
};

export const UploadConstructionApprovalDocumentsRequested = (
  payload: UploadConstructionApprovalDocumentsPayload,
  callback?: (success: boolean, message?: string) => void,
): UploadConstructionApprovalDocumentsRequestedType => ({
  type: actionTypes.INSERT_CONSTRUCTION_APPROVAL_DOCUMENTS_REQUESTED,
  payload,
  callback,
});
//#endregion [Upload setup Requested]

//#region [Upload setup Succeeded]
export type UploadConstructionApprovalDocumentsSucceededType = {
  type: typeof actionTypes.INSERT_CONSTRUCTION_APPROVAL_DOCUMENTS_SUCCEEDED;
  result: UploadConstructionApprovalDocumentsResponse;
};

export const UploadConstructionApprovalDocumentsSucceeded = (
  result: UploadConstructionApprovalDocumentsResponse,
): UploadConstructionApprovalDocumentsSucceededType => ({
  type: actionTypes.INSERT_CONSTRUCTION_APPROVAL_DOCUMENTS_SUCCEEDED,
  result,
});

//#endregion [Upload setup Succeeded]

// //#region [Upload setup Failed]
export type UploadConstructionApprovalDocumentsFailedType = {
  type: typeof actionTypes.INSERT_CONSTRUCTION_APPROVAL_DOCUMENTS_FAILED;
  error?: string;
};

export const UploadConstructionApprovalDocumentsFailed = (error?: string): UploadConstructionApprovalDocumentsFailedType => ({
  type: actionTypes.INSERT_CONSTRUCTION_APPROVAL_DOCUMENTS_FAILED,
  error,
});
//#endregion [Upload setup Failed]

// ===================================Get Approval DropDown================================================
//#region [Approval DropDown Requested]
export type GetApprovalDropDownRequestedType = {
  type: typeof actionTypes.GET_APPROVAL_DROPDOWN_REQUESTED;
  REAssetId: number;
  CreatedBy: string;
};

export const GetApprovalDropDownListRequested = (REAssetId: number, CreatedBy: string): GetApprovalDropDownRequestedType => ({
  type: actionTypes.GET_APPROVAL_DROPDOWN_REQUESTED,
  REAssetId,
  CreatedBy,
});
//#endregion

//#region [Approval DropDown Succeeded]
export type GetApprovalDropDownSucceededType = {
  type: typeof actionTypes.GET_APPROVAL_DROPDOWN_SUCCEEDED;
  result: ApprovalDropDownData[];
};

export const GetApprovalDropDownSucceeded = (result: ApprovalDropDownData[]): GetApprovalDropDownSucceededType => ({
  type: actionTypes.GET_APPROVAL_DROPDOWN_SUCCEEDED,
  result,
});

//#endregion

//#region [Approval DropDown Failed]
export type GetApprovalDropDownFailedType = {
  type: typeof actionTypes.GET_APPROVAL_DROPDOWN_FAILED;
  error?: string;
};

export const GetApprovalDropDownFailed = (error?: string): GetApprovalDropDownFailedType => ({
  type: actionTypes.GET_APPROVAL_DROPDOWN_FAILED,
  error,
});
//#endregion



export type ApprovalActions =
  // Approval past history List
  | GetApprovalPastHistoryRequestedType
  | GetApprovalPastHistorySucceededType
  | GetApprovalPastHistoryFailedType

  // upload Approval template
  | UpdateApprovalStatusRequestedType
  | UpdateApprovalStatusSucceededType
  | UpdateApprovalStatusFailedType

  //Pending Construction Approval Documents
  | GetPendingConstructionApprovalDocumentsRequestedType
  | GetPendingConstructionApprovalDocumentsSucceededType
  | GetPendingConstructionApprovalDocumentsFailedType

  // upload Construction Approval Documents
  | UploadConstructionApprovalDocumentsRequestedType
  | UploadConstructionApprovalDocumentsSucceededType
  | UploadConstructionApprovalDocumentsFailedType

   // Approval DropDown
   | GetApprovalDropDownRequestedType
   | GetApprovalDropDownSucceededType
   | GetApprovalDropDownFailedType;
