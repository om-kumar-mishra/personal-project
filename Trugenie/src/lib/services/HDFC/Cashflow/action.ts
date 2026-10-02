import {
  CanSetupCashflowData,
  CashflowPastHistoryData,
  CashflowPendingData,
  CashflowSetupPastUpdatesData,
  CashflowSetupPendingData,
  CheckCashflowDetailsExistData,
  DeleteCashflowDetailsPayload,
  DeleteCashflowDetailsResponse,
  IsCashflowSetupData,
  UpdateCashflowStatusPayload,
  UpdateCashflowStatusResponse,
  UploadCashflowSetupTemplatePayload,
  UploadCashflowSetupTemplateResponse,
  UploadCashflowTemplatePayload,
  UploadCashflowTemplateResponse,
} from "./dataTypes";
import * as actionTypes from "./types";

// ===================================Get Cashflow PastHistory List================================================
//#region [Requested]
export type GetCashflowPastHistoryRequested = {
  type: typeof actionTypes.GET_CASHFLOW_PAST_HISTORY_REQUESTED;
  reAssetId: number;
};

export const GetCashflowPastHistoryListRequested = (reAssetId: number): GetCashflowPastHistoryRequested => ({
  type: actionTypes.GET_CASHFLOW_PAST_HISTORY_REQUESTED,
  reAssetId,
});
//#endregion

//#region [Succeeded]
export type GetCashflowPastHistorySucceeded = {
  type: typeof actionTypes.GET_CASHFLOW_PAST_HISTORY_SUCCEEDED;
  result: CashflowPastHistoryData[];
};

export const GetCashflowPastHistoryListSucceeded = (result: CashflowPastHistoryData[]): GetCashflowPastHistorySucceeded => ({
  type: actionTypes.GET_CASHFLOW_PAST_HISTORY_SUCCEEDED,
  result,
});

//#endregion

//#region [Failed]
export type GetCashflowPastHistoryFailed = {
  type: typeof actionTypes.GET_CASHFLOW_PAST_HISTORY_FAILED;
  error?: string;
};

export const GetCashflowPastHistoryListFailed = (error?: string): GetCashflowPastHistoryFailed => ({
  type: actionTypes.GET_CASHFLOW_PAST_HISTORY_FAILED,
  error,
});

// ===================================Is Cashflow Setup================================================
//#region [Requested]
export type IsCashflowSetupRequestedType = {
  type: typeof actionTypes.IS_CASHFLOW_SETUP_REQUESTED;
  REAssetId: number;
  Type?: string;
};

export const IsCashflowSetupRequested = (REAssetId: number, Type?: string): IsCashflowSetupRequestedType => ({
  type: actionTypes.IS_CASHFLOW_SETUP_REQUESTED,
  REAssetId,
  Type,
});
//#endregion [Requested]

//#region [Succeeded]
export type IsCashflowSetupSucceededType = {
  type: typeof actionTypes.IS_CASHFLOW_SETUP_SUCCEEDED;
  result: IsCashflowSetupData;
};

export const IsCashflowSetupSucceeded = (result: IsCashflowSetupData): IsCashflowSetupSucceededType => ({
  type: actionTypes.IS_CASHFLOW_SETUP_SUCCEEDED,
  result,
});

//#endregion [Succeeded]

//#region [Failed]
export type IsCashflowSetupFailedType = {
  type: typeof actionTypes.IS_CASHFLOW_SETUP_FAILED;
  error?: string;
};

export const IsCashflowSetupFailed = (error?: string): IsCashflowSetupFailedType => ({
  type: actionTypes.IS_CASHFLOW_SETUP_FAILED,
  error,
});
//#endregion [Failed]

// =================================== Delete Cashflow Details ================================================
//#region [Requested]
export type DeleteCashflowDetailsRequestedType = {
  type: typeof actionTypes.DELETE_CASHFLOW_DETAILS_REQUESTED;
  payload: DeleteCashflowDetailsPayload;
  callback?: (success: boolean, message?: string) => void;
};

export const DeleteCashflowDetailsRequested = (
  payload: DeleteCashflowDetailsPayload,
  callback?: (success: boolean, message?: string) => void,
): DeleteCashflowDetailsRequestedType => ({
  type: actionTypes.DELETE_CASHFLOW_DETAILS_REQUESTED,
  payload,
  callback,
});
//#endregion [Requested]

//#region [Succeeded]
export type DeleteCashflowDetailsSucceededType = {
  type: typeof actionTypes.DELETE_CASHFLOW_DETAILS_SUCCEEDED;
  result: DeleteCashflowDetailsResponse;
};

export const DeleteCashflowDetailsSucceeded =
  (result: DeleteCashflowDetailsResponse):
    DeleteCashflowDetailsSucceededType => ({
      type: actionTypes.DELETE_CASHFLOW_DETAILS_SUCCEEDED,
      result,
    });

//#endregion [Succeeded]

//#region [Failed]
export type DeleteCashflowDetailsFailedType = {
  type: typeof actionTypes.DELETE_CASHFLOW_DETAILS_FAILED;
  error?: string;
};

export const DeleteCashflowDetailsFailed =
  (error?: string): DeleteCashflowDetailsFailedType => ({
    type: actionTypes.DELETE_CASHFLOW_DETAILS_FAILED,
    error,
  });
//#endregion [Failed]

// =================================== Update Cashflow Stattus ================================================
//#region [Requested]
export type UpdateCashflowStatusRequestedType = {
  type: typeof actionTypes.UPDATE_CASHFLOW_STATUS_REQUESTED;
  payload: UpdateCashflowStatusPayload;
  callback?: (success: boolean, message?: string) => void;
};

export const UpdateCashflowStatusRequested = (
  payload: UpdateCashflowStatusPayload,
  callback?: (success: boolean, message?: string) => void,
): UpdateCashflowStatusRequestedType => ({
  type: actionTypes.UPDATE_CASHFLOW_STATUS_REQUESTED,
  payload,
  callback,
});
//#endregion [Requested]

//#region [Succeeded]
export type UpdateCashflowStatusSucceededType = {
  type: typeof actionTypes.UPDATE_CASHFLOW_STATUS_SUCCEEDED;
  result: UpdateCashflowStatusResponse;
};

export const UpdateCashflowStatusSucceeded = (result: UpdateCashflowStatusResponse): UpdateCashflowStatusSucceededType => ({
  type: actionTypes.UPDATE_CASHFLOW_STATUS_SUCCEEDED,
  result,
});

//#endregion [Succeeded]

//#region [Failed]
export type UpdateCashflowStatusFailedType = {
  type: typeof actionTypes.UPDATE_CASHFLOW_STATUS_FAILED;
  error?: string;
};

export const UpdateCashflowStatusFailed = (error?: string): UpdateCashflowStatusFailedType => ({
  type: actionTypes.UPDATE_CASHFLOW_STATUS_FAILED,
  error,
});
//#endregion [Failed]

// =================================== Download Cashflow Template ================================================
//#region [Requested]
export type DownloadCashflowTemplateRequestedType = {
  type: typeof actionTypes.DOWNLOAD_CASHFLOW_TEMPLATE_REQUESTED;
  reAssetId: number;
  typecheck: string;
  callback?: (success: boolean, message?: string) => void;
};

export const DownloadCashflowTemplateRequested = (
  reAssetId: number,
  typecheck: string,
  callback?: (success: boolean, message?: string) => void,
): DownloadCashflowTemplateRequestedType => ({
  type: actionTypes.DOWNLOAD_CASHFLOW_TEMPLATE_REQUESTED,
  reAssetId,
  typecheck,
  callback,
});
//#endregion [Requested]

//#region [Succeeded]
export type DownloadCashflowTemplateSucceededType = {
  type: typeof actionTypes.DOWNLOAD_CASHFLOW_TEMPLATE_SUCCEEDED;
};

export const DownloadCashflowTemplateSucceeded = (): DownloadCashflowTemplateSucceededType => ({
  type: actionTypes.DOWNLOAD_CASHFLOW_TEMPLATE_SUCCEEDED,
});

//#endregion [Succeeded]

//#region [Failed]
export type DownloadCashflowTemplateFailedType = {
  type: typeof actionTypes.DOWNLOAD_CASHFLOW_TEMPLATE_FAILED;
  error?: string;
};

export const DownloadCashflowTemplateFailed = (error?: string): DownloadCashflowTemplateFailedType => ({
  type: actionTypes.DOWNLOAD_CASHFLOW_TEMPLATE_FAILED,
  error,
});
//#endregion [Failed]

// =================================== Upload Cashflow Actual-Plan Template ================================================
//#region [Requested]
export type UploadCashflowActualPlanTemplateRequestedType = {
  type: typeof actionTypes.UPLOAD_CASHFLOW_ACTUAL_PLAN_TEMPLATE_REQUESTED;
  payload: UploadCashflowTemplatePayload;
  callback?: (success: boolean, message?: string) => void;
};

export const UploadCashflowActualPlanTemplateRequested = (
  payload: UploadCashflowTemplatePayload,
  callback?: (success: boolean, message?: string) => void,
): UploadCashflowActualPlanTemplateRequestedType => ({
  type: actionTypes.UPLOAD_CASHFLOW_ACTUAL_PLAN_TEMPLATE_REQUESTED,
  payload,
  callback,
});
//#endregion [Requested]

//#region [Succeeded]
export type UploadCashflowActualPlanTemplateSucceededType = {
  type: typeof actionTypes.UPLOAD_CASHFLOW_ACTUAL_PLAN_TEMPLATE_SUCCEEDED;
  result: UploadCashflowTemplateResponse;
};

export const UploadCashflowActualPlanTemplateSucceeded = (result: UploadCashflowTemplateResponse): UploadCashflowActualPlanTemplateSucceededType => ({
  type: actionTypes.UPLOAD_CASHFLOW_ACTUAL_PLAN_TEMPLATE_SUCCEEDED,
  result,
});
//#endregion [Succeeded]

//#region [Failed]
export type UploadCashflowActualPlanTemplateFailedType = {
  type: typeof actionTypes.UPLOAD_CASHFLOW_ACTUAL_PLAN_TEMPLATE_FAILED;
  error?: string;
};

export const UploadCashflowActualPlanTemplateFailed = (error?: string): UploadCashflowActualPlanTemplateFailedType => ({
  type: actionTypes.UPLOAD_CASHFLOW_ACTUAL_PLAN_TEMPLATE_FAILED,
  error,
});
//#endregion [Failed]

// =================================== Upload Cashflow Projected-Plan Template ================================================
//#region [Requested]
export type UploadCashflowProjectedPlanTemplateRequestedType = {
  type: typeof actionTypes.UPLOAD_CASHFLOW_PROJECTED_PLAN_TEMPLATE_REQUESTED;
  payload: UploadCashflowTemplatePayload;
  callback?: (success: boolean, message?: string) => void;
};

export const UploadCashflowProjectedPlanTemplateRequested = (
  payload: UploadCashflowTemplatePayload,
  callback?: (success: boolean, message?: string) => void,
): UploadCashflowProjectedPlanTemplateRequestedType => ({
  type: actionTypes.UPLOAD_CASHFLOW_PROJECTED_PLAN_TEMPLATE_REQUESTED,
  payload,
  callback,
});
//#endregion [Requested]

//#region [Succeeded]
export type UploadCashflowProjectedPlanTemplateSucceededType = {
  type: typeof actionTypes.UPLOAD_CASHFLOW_PROJECTED_PLAN_TEMPLATE_SUCCEEDED;
  result: UploadCashflowTemplateResponse;
};

export const UploadCashflowProjectedPlanTemplateSucceeded = (result: UploadCashflowTemplateResponse): UploadCashflowProjectedPlanTemplateSucceededType => ({
  type: actionTypes.UPLOAD_CASHFLOW_PROJECTED_PLAN_TEMPLATE_SUCCEEDED,
  result,
});
//#endregion [Succeeded]

//#region [Failed]
export type UploadCashflowProjectedPlanTemplateFailedType = {
  type: typeof actionTypes.UPLOAD_CASHFLOW_PROJECTED_PLAN_TEMPLATE_FAILED;
  error?: string;
};

export const UploadCashflowProjectedPlanTemplateFailed = (error?: string): UploadCashflowProjectedPlanTemplateFailedType => ({
  type: actionTypes.UPLOAD_CASHFLOW_PROJECTED_PLAN_TEMPLATE_FAILED,
  error,
});
//#endregion [Failed]

// ===================================Get Cashflow Pending List================================================
//#region [Requested]
export type GetCashflowPendingUpdateRequestedType = {
  type: typeof actionTypes.GET_CASHFLOW_PENDING_UPDATE_REQUESTED;
  REAssetId: number;
  Type: string;
};

export const GetCashflowPendingUpdateListRequested = (REAssetId: number, Type: string): GetCashflowPendingUpdateRequestedType => ({
  type: actionTypes.GET_CASHFLOW_PENDING_UPDATE_REQUESTED,
  REAssetId,
  Type,
});
//#endregion

//#region [Succeeded]
export type GetCashflowPendingUpdateSucceededType = {
  type: typeof actionTypes.GET_CASHFLOW_PENDING_UPDATE_SUCCEEDED;
  result: CashflowPendingData[];
};

export const GetCashflowPendingUpdateListSucceeded = (result: CashflowPendingData[]): GetCashflowPendingUpdateSucceededType => ({
  type: actionTypes.GET_CASHFLOW_PENDING_UPDATE_SUCCEEDED,
  result,
});

//#endregion

//#region [Failed]
export type GetCashflowPendingUpdateFailedType = {
  type: typeof actionTypes.GET_CASHFLOW_PENDING_UPDATE_FAILED;
  error?: string;
};

export const GetCashflowPendingUpdateListFailed = (error?: string): GetCashflowPendingUpdateFailedType => ({
  type: actionTypes.GET_CASHFLOW_PENDING_UPDATE_FAILED,
  error,
});

// =================================== Can Setup Cashflow ================================================
//#region [Requested]
export type CanSetupCashflowRequestedType = {
  type: typeof actionTypes.CAN_SETUP_CASHFLOW_REQUESTED;
  reAssetId: number;
  typeCheck: string;
  callback?: (success: boolean, message?: string) => void;
};

export const CanSetupCashflowRequested = (
  reAssetId: number,
  typeCheck: string,
  callback?: (success: boolean, message?: string) => void,
): CanSetupCashflowRequestedType => ({
  type: actionTypes.CAN_SETUP_CASHFLOW_REQUESTED,
  reAssetId,
  typeCheck,
  callback,
});
//#endregion [Requested]

//#region [Succeeded]
export type CanSetupCashflowSucceededType = {
  type: typeof actionTypes.CAN_SETUP_CASHFLOW_SUCCEEDED;
  result: CanSetupCashflowData;
};

export const CanSetupCashflowSucceeded = (result: CanSetupCashflowData): CanSetupCashflowSucceededType => ({
  type: actionTypes.CAN_SETUP_CASHFLOW_SUCCEEDED,
  result,
});

//#endregion [Succeeded]

//#region [Failed]
export type CanSetupCashflowFailedType = {
  type: typeof actionTypes.CAN_SETUP_CASHFLOW_FAILED;
  error?: string;
};

export const CanSetupCashflowFailed = (error?: string): CanSetupCashflowFailedType => ({
  type: actionTypes.CAN_SETUP_CASHFLOW_FAILED,
  error,
});
//#endregion [Failed]

// =================================== Upload Cashflow-Underwritten Setup Template ================================================
//#region [Upload setup Requested]
export type UploadCashflowUnderwrittenTemplateSetupRequestedType = {
  type: typeof actionTypes.UPLOAD_CASHFLOW_UNDERWRITTEN_SETUP_REQUESTED;
  payload: UploadCashflowSetupTemplatePayload;
  callback?: (success: boolean, message?: string) => void;
};

export const UploadCashflowUnderwrittenTemplateSetupRequested = (
  payload: UploadCashflowSetupTemplatePayload,
  callback?: (success: boolean, message?: string) => void,
): UploadCashflowUnderwrittenTemplateSetupRequestedType => ({
  type: actionTypes.UPLOAD_CASHFLOW_UNDERWRITTEN_SETUP_REQUESTED,
  payload,
  callback,
});
//#endregion [Upload setup Requested]

//#region [Upload setup Succeeded]
export type UploadCashflowUnderwrittenTemplateSetupSucceededType = {
  type: typeof actionTypes.UPLOAD_CASHFLOW_UNDERWRITTEN_SETUP_SUCCEEDED;
  result: UploadCashflowSetupTemplateResponse;
};

export const UploadCashflowUnderwrittenTemplateSetupSucceeded = (
  result: UploadCashflowSetupTemplateResponse,
): UploadCashflowUnderwrittenTemplateSetupSucceededType => ({
  type: actionTypes.UPLOAD_CASHFLOW_UNDERWRITTEN_SETUP_SUCCEEDED,
  result,
});

//#endregion [Upload setup Succeeded]

//#region [Upload setup Failed]
export type UploadCashflowUnderwrittenTemplateSetupFailedType = {
  type: typeof actionTypes.UPLOAD_CASHFLOW_UNDERWRITTEN_SETUP_FAILED;
  error?: string;
};

export const UploadCashflowUnderwrittenTemplateSetupFailed = (error?: string): UploadCashflowUnderwrittenTemplateSetupFailedType => ({
  type: actionTypes.UPLOAD_CASHFLOW_UNDERWRITTEN_SETUP_FAILED,
  error,
});
//#endregion [Upload setup Failed]

// =================================== Upload Cashflow-Business Plan Setup Template ================================================
//#region [Upload setup Requested]
export type UploadCashflowBusinessPlanTemplateSetupRequestedType = {
  type: typeof actionTypes.UPLOAD_CASHFLOW_BUSINESS_PLAN_SETUP_REQUESTED;
  payload: UploadCashflowSetupTemplatePayload;
  callback?: (success: boolean, message?: string) => void;
};

export const UploadCashflowBusinessPlanTemplateSetupRequested = (
  payload: UploadCashflowSetupTemplatePayload,
  callback?: (success: boolean, message?: string) => void,
): UploadCashflowBusinessPlanTemplateSetupRequestedType => ({
  type: actionTypes.UPLOAD_CASHFLOW_BUSINESS_PLAN_SETUP_REQUESTED,
  payload,
  callback,
});
//#endregion [Upload setup Requested]

//#region [Upload setup Succeeded]
export type UploadCashflowBusinessPlanTemplateSetupSucceededType = {
  type: typeof actionTypes.UPLOAD_CASHFLOW_BUSINESS_PLAN_SETUP_SUCCEEDED;
  result: UploadCashflowSetupTemplateResponse;
};

export const UploadCashflowBusinessPlanTemplateSetupSucceeded = (
  result: UploadCashflowSetupTemplateResponse,
): UploadCashflowBusinessPlanTemplateSetupSucceededType => ({
  type: actionTypes.UPLOAD_CASHFLOW_BUSINESS_PLAN_SETUP_SUCCEEDED,
  result,
});

//#endregion [Upload setup Succeeded]

//#region [Upload setup Failed]
export type UploadCashflowBusinessPlanTemplateSetupFailedType = {
  type: typeof actionTypes.UPLOAD_CASHFLOW_BUSINESS_PLAN_SETUP_FAILED;
  error?: string;
};

export const UploadCashflowBusinessPlanTemplateSetupFailed = (error?: string): UploadCashflowBusinessPlanTemplateSetupFailedType => ({
  type: actionTypes.UPLOAD_CASHFLOW_BUSINESS_PLAN_SETUP_FAILED,
  error,
});
//#endregion [Upload setup Failed]

// =================================== Check Cashflow Details Exist ================================================
//#region [Check Cashflow Requested]
export type CheckCashflowDetailsExistRequestedType = {
  type: typeof actionTypes.CHECK_CASHFLOW_DETAILS_EXIST_REQUESTED;
  REAssetId: number;
  MisDate: string;
  TypeCheck: string;
  callback?: (success: boolean, message?: string) => void;
};

export const CheckCashflowDetailsExistRequested = (
  REAssetId: number,
  MisDate: string,
  TypeCheck: string,
  callback?: (success: boolean, message?: string) => void,
): CheckCashflowDetailsExistRequestedType => ({
  type: actionTypes.CHECK_CASHFLOW_DETAILS_EXIST_REQUESTED,
  REAssetId,
  TypeCheck,
  MisDate,
  callback,
});
//#endregion [Requested]

//#region [Check Cashflow Succeeded]
export type CheckCashflowDetailsExistSucceededType = {
  type: typeof actionTypes.CHECK_CASHFLOW_DETAILS_EXIST_SUCCEEDED;
  result: CheckCashflowDetailsExistData;
};

export const CheckCashflowDetailsExistSucceeded = (result: CheckCashflowDetailsExistData): CheckCashflowDetailsExistSucceededType => ({
  type: actionTypes.CHECK_CASHFLOW_DETAILS_EXIST_SUCCEEDED,
  result,
});
//#endregion [Succeeded]

//#region [Check Cashflow Failed]
export type CheckCashflowDetailsExistFailedType = {
  type: typeof actionTypes.CHECK_CASHFLOW_DETAILS_EXIST_FAILED;
  error?: string;
};

export const CheckCashflowDetailsExistFailed = (error?: string): CheckCashflowDetailsExistFailedType => ({
  type: actionTypes.CHECK_CASHFLOW_DETAILS_EXIST_FAILED,
  error,
});
//#endregion [Failed]

// ===================================Get Cashflow setup Pending List================================================
//#region [Get Cashflow setup Pending List Requested]
export type GetCashflowSetupPendingListRequestedType = {
  type: typeof actionTypes.GET_CASHFLOW_SETUP_PENDING_LIST_REQUESTED;
  REAssetId: number;
};

export const getCashflowSetupPendingListRequested = (REAssetId: number): GetCashflowSetupPendingListRequestedType => ({
  type: actionTypes.GET_CASHFLOW_SETUP_PENDING_LIST_REQUESTED,
  REAssetId,
});

export type GetCashflowSetupPendingListSucceededType = {
  type: typeof actionTypes.GET_CASHFLOW_SETUP_PENDING_LIST_SUCCEEDED;
  result: CashflowSetupPendingData[];
};

export const getCashflowSetupPendingListSucceeded = (result: CashflowSetupPendingData[]): GetCashflowSetupPendingListSucceededType => ({
  type: actionTypes.GET_CASHFLOW_SETUP_PENDING_LIST_SUCCEEDED,
  result,
});

export type GetCashflowSetupPendingListFailedType = {
  type: typeof actionTypes.GET_CASHFLOW_SETUP_PENDING_LIST_FAILED;
  error?: string;
};

export const getCashflowSetupPendingListFailed = (error?: string): GetCashflowSetupPendingListFailedType => ({
  type: actionTypes.GET_CASHFLOW_SETUP_PENDING_LIST_FAILED,
  error,
});
//#endregion

// ===================================Get Cashflow Setup PastHistory List================================================
//#region [Requested]
export type GetCashflowSetupPastUpdatesRequestedType = {
  type: typeof actionTypes.GET_CASHFLOW_SETUP_PAST_UPDATE_REQUESTED;
  reAssetId: number;
};

export const GetCashflowSetupPastUpdatesRequested = (reAssetId: number): GetCashflowSetupPastUpdatesRequestedType => ({
  type: actionTypes.GET_CASHFLOW_SETUP_PAST_UPDATE_REQUESTED,
  reAssetId,
});
//#endregion

//#region [Succeeded]
export type GetCashflowSetupPastUpdatesSucceededType = {
  type: typeof actionTypes.GET_CASHFLOW_SETUP_PAST_UPDATE_SUCCEEDED;
  result: CashflowSetupPastUpdatesData[];
};

export const GetCashflowSetupPastUpdatesSucceeded = (result: CashflowSetupPastUpdatesData[]): GetCashflowSetupPastUpdatesSucceededType => ({
  type: actionTypes.GET_CASHFLOW_SETUP_PAST_UPDATE_SUCCEEDED,
  result,
});

//#endregion

//#region [Failed]
export type GetCashflowSetupPastUpdatesFailedType = {
  type: typeof actionTypes.GET_CASHFLOW_SETUP_PAST_UPDATE_FAILED;
  error?: string;
};

export const GetCashflowSetupPastUpdatesFailed = (error?: string): GetCashflowSetupPastUpdatesFailedType => ({
  type: actionTypes.GET_CASHFLOW_SETUP_PAST_UPDATE_FAILED,
  error,
});

export type CashflowActions =
  // Cashflow past history List
  | GetCashflowPastHistoryRequested
  | GetCashflowPastHistorySucceeded
  | GetCashflowPastHistoryFailed

  // //is cashflow setup
  | IsCashflowSetupRequestedType
  | IsCashflowSetupSucceededType
  | IsCashflowSetupFailedType

  // delete cashflow details
  | DeleteCashflowDetailsRequestedType
  | DeleteCashflowDetailsSucceededType
  | DeleteCashflowDetailsFailedType

  // update cashflow status
  | UpdateCashflowStatusRequestedType
  | UpdateCashflowStatusSucceededType
  | UpdateCashflowStatusFailedType

  // download project summary template
  | DownloadCashflowTemplateRequestedType
  | DownloadCashflowTemplateSucceededType
  | DownloadCashflowTemplateFailedType

  // upload Cashflow Actual-Plan template
  | UploadCashflowActualPlanTemplateRequestedType
  | UploadCashflowActualPlanTemplateSucceededType
  | UploadCashflowActualPlanTemplateFailedType

  // upload Cashflow Projected-Plan template
  | UploadCashflowProjectedPlanTemplateRequestedType
  | UploadCashflowProjectedPlanTemplateSucceededType
  | UploadCashflowProjectedPlanTemplateFailedType

  //Pending Update List
  | GetCashflowPendingUpdateRequestedType
  | GetCashflowPendingUpdateSucceededType
  | GetCashflowPendingUpdateFailedType

  // can setup Cashflow
  | CanSetupCashflowRequestedType
  | CanSetupCashflowSucceededType
  | CanSetupCashflowFailedType

  // upload Cashflow Actual-Plan template
  | UploadCashflowUnderwrittenTemplateSetupRequestedType
  | UploadCashflowUnderwrittenTemplateSetupSucceededType
  | UploadCashflowUnderwrittenTemplateSetupFailedType

  // check project summary details exist
  | CheckCashflowDetailsExistRequestedType
  | CheckCashflowDetailsExistSucceededType
  | CheckCashflowDetailsExistFailedType

  // upload Cashflow Projected-Plan template
  | UploadCashflowBusinessPlanTemplateSetupRequestedType
  | UploadCashflowBusinessPlanTemplateSetupSucceededType
  | UploadCashflowBusinessPlanTemplateSetupFailedType

  // get cashflow setup pending list
  | GetCashflowSetupPendingListRequestedType
  | GetCashflowSetupPendingListSucceededType
  | GetCashflowSetupPendingListFailedType

  // Cashflow Setup past update
  | GetCashflowSetupPastUpdatesRequestedType
  | GetCashflowSetupPastUpdatesSucceededType
  | GetCashflowSetupPastUpdatesFailedType;
