import { FileUploadResponse } from "../services/dataTypes";
import {
  checkFundsDetailExist,
  // CanUploadSalesTemplateDataResponse,
  // PastSalesSummaryDetailResponse,
  // PendingSalesForApprovalResponse,
  // RemoveSalesHistoryResponse,
  // SalesPastHistoryResponse,
  // SalesSummaryResponse,
  // SummaryDetailResponse,
  // TaggedRMDataResponse,
  // UpdateSalesPastHistoryResponse,\
  GetFundsPastUpdateResponse,
  GetFundsPendingResponse,
  RemoveFundsHistoryResponse,
  UpdateFundsStatusPayload,
  UpdateFundsStatusResponse,
  // InsertFundsUpdateRequested
  //
} from "./dataTypes";
import * as actionTypes from "./types";

// funds-past-History
//#region [List Requested]
export type GetFundsPastUpdateRequested = {
  type: typeof actionTypes.GET_FUNDS_PAST_UPDATE_REQUESTED;
  ClientId: number;
  typeCheck: string;
  callback?: (success: boolean, message?: string) => void;
};

export const getFundsPastUpdateListRequested = (
  ClientId: number,
  typeCheck: string,
  callback?: (success: boolean, message?: string) => void,
): GetFundsPastUpdateRequested => ({
  type: actionTypes.GET_FUNDS_PAST_UPDATE_REQUESTED,
  ClientId,
  typeCheck,
  callback,
});
//#endregion

//#region [List Succeeded]
export type GetFundsPastUpdateSucceeded = {
  type: typeof actionTypes.GET_FUNDS_PAST_UPDATE_SUCCEEDED;
  result: GetFundsPastUpdateResponse;
};

export const getFundsPastUpdateListSucceeded = (result: GetFundsPastUpdateResponse): GetFundsPastUpdateSucceeded => ({
  type: actionTypes.GET_FUNDS_PAST_UPDATE_SUCCEEDED,
  result,
});

//#endregion

//#region [List Failed]
export type GetFundsPastUpdateFailed = {
  type: typeof actionTypes.GET_FUNDS_PAST_UPDATE_FAILED;
  error?: string;
};

export const getFundsPastUpdateListFailed = (error?: string): GetFundsPastUpdateFailed => ({
  type: actionTypes.GET_FUNDS_PAST_UPDATE_FAILED,
  error,
});
//#endregion

// funds-details
//#region [Details Requested]

// funds-pending-History
//#region [List Requested]
export type GetFundsPendingRequested = {
  type: typeof actionTypes.GET_PENDING_FUNDS_UPDATE_REQUESTED;
  ClientId: number;
  // typeCheck: string;
  callback?: (success: boolean, message?: string) => void;
};

export const getFundsPendingListRequested = (
  ClientId: number,
  // typeCheck: string,
  callback?: (success: boolean, message?: string) => void,
): GetFundsPendingRequested => ({
  type: actionTypes.GET_PENDING_FUNDS_UPDATE_REQUESTED,
  ClientId,
  // typeCheck,
  callback,
});
//#endregion

//#region [List Succeeded]
export type GetFundsPendingSucceeded = {
  type: typeof actionTypes.GET_PENDING_FUNDS_UPDATE_SUCCEEDED;
  result: GetFundsPendingResponse;
};

export const getFundsPendingListSucceeded = (result: GetFundsPendingResponse): GetFundsPendingSucceeded => ({
  type: actionTypes.GET_PENDING_FUNDS_UPDATE_SUCCEEDED,
  result,
});

//#endregion

//#region [List Failed]
export type GetFundsPendingFailed = {
  type: typeof actionTypes.GET_PENDING_FUNDS_UPDATE_FAILED;
  error?: string;
};

export const getFundsPendingListFailed = (error?: string): GetFundsPendingFailed => ({
  type: actionTypes.GET_PENDING_FUNDS_UPDATE_FAILED,
  error,
});
//#endregion

// funds-pending-History
//#region [List Requested]

export type InsertFundsUpdateRequested = {
  type: typeof actionTypes.INSERT_FUNDS_UPDATE_REQUESTED;
  clientId: number;
  misDate: string;
  clientName: string;
  entityName: string;
  remarks: string;
  uploaded_file: File;
  callback?: (success: boolean, message?: string) => void;
};

export const insertFundsUpdateRequested = (
  clientId: number,
  misDate: string,
  clientName: string,
  entityName: string,
  remarks: string,
  uploaded_file: File,
  callback?: (success: boolean, message?: string) => void,
): InsertFundsUpdateRequested => ({
  type: actionTypes.INSERT_FUNDS_UPDATE_REQUESTED,
  clientId,
  misDate,
  clientName,
  entityName,
  remarks,
  uploaded_file,
  callback,
});
//#endregion
//#region [List Succeeded]
export type InsertFundsTemplateSucceeded = {
  type: typeof actionTypes.INSERT_FUNDS_UPDATE_SUCCEEDED;
  result: FileUploadResponse;
};

export const insertFundsTemplateSucceeded = (result: FileUploadResponse): InsertFundsTemplateSucceeded => ({
  type: actionTypes.INSERT_FUNDS_UPDATE_SUCCEEDED,
  result,
});
//#endregion

//#region [List Failed]
export type InsertFundsUpdateFailed = {
  type: typeof actionTypes.INSERT_FUNDS_UPDATE_FAILED;
  error?: string;
};

export const insertFundsTemplateFailed = (error?: string): InsertFundsUpdateFailed => ({
  type: actionTypes.INSERT_FUNDS_UPDATE_FAILED,
  error,
});
//#endregion

// Delete-Update-Sales-Past-History
//#region [Delete Requested]
export type DeleteFundsPastHistoryRequested = {
  type: typeof actionTypes.DELETE_FUNDS_REQUESTED;
  clientId: number;
  fundMISHistoryId: number;
  callback?: (success: boolean, message?: string) => void;
};

export const deleteFundsPastHistoryRequested = (
  clientId: number,
  fundMISHistoryId: number,
  // Type: string,
  callback?: (success: boolean, message?: string) => void,
): DeleteFundsPastHistoryRequested => ({
  type: actionTypes.DELETE_FUNDS_REQUESTED,
  clientId,
  fundMISHistoryId,
  callback,
});
//#endregion

//#region [Delete Succeeded]
export type DeleteFundsPastHistorySucceeded = {
  type: typeof actionTypes.DELETE_FUNDS_SUCCEEDED;
  result: RemoveFundsHistoryResponse;
};

export const deleteFundsPastHistorySucceeded = (result: RemoveFundsHistoryResponse): DeleteFundsPastHistorySucceeded => ({
  type: actionTypes.DELETE_FUNDS_SUCCEEDED,
  result,
});
//#endregion

//#region [Delete Failed]
export type DeleteFundsPastHistoryFailed = {
  type: typeof actionTypes.DELETE_FUNDS_FAILED;
  error?: string;
};

export const deleteFundsPastHistoryFailed = (error?: string): DeleteFundsPastHistoryFailed => ({
  type: actionTypes.DELETE_FUNDS_FAILED,
  error,
});
//#endregion

//#region [Check funds Requested]
export type CheckFundsDetailsExistRequestedType = {
  type: typeof actionTypes.CHECK_FUNDS_DETAILS_EXIST_REQUESTED;
  client: number;
  MisDate: string;
  callback?: (success: boolean, message?: string) => void;
};

export const CheckFundsDetailsExistRequested = (
  client: number,
  MisDate: string,
  callback?: (success: boolean, message?: string) => void,
): CheckFundsDetailsExistRequestedType => ({
  type: actionTypes.CHECK_FUNDS_DETAILS_EXIST_REQUESTED,
  client,
  MisDate,
  callback,
});
//#endregion [Requested]

//#region [Check Project Summary Succeeded]
export type CheckFundsDetailsExistSucceededType = {
  type: typeof actionTypes.CHECK_FUNDS_DETAILS_EXIST_SUCCEEDED;
  result: checkFundsDetailExist;
};

export const CheckFundsDetailsExistSucceeded = (result: checkFundsDetailExist): CheckFundsDetailsExistSucceededType => ({
  type: actionTypes.CHECK_FUNDS_DETAILS_EXIST_SUCCEEDED,
  result,
});

//#endregion [Succeeded]

//#region [Check Project Summary Failed]
export type CheckFundsDetailsExistFailedType = {
  type: typeof actionTypes.CHECK_FUNDS_DETAILS_EXIST_FAILED;
  error?: string;
};

export const CheckFundsDetailsExistFailed = (error?: string): CheckFundsDetailsExistFailedType => ({
  type: actionTypes.CHECK_FUNDS_DETAILS_EXIST_FAILED,
  error,
});
//#endregion [Failed]

//#region [Update Requested]
export type UpdateFundsStatusRequestedType = {
  type: typeof actionTypes.UPDATE_FUNDS_STATUS_REQUESTED;
  payload: UpdateFundsStatusPayload;
  callback?: (success: boolean, message?: string) => void;
};

export const UpdateFundsStatusRequested = (
  payload: UpdateFundsStatusPayload,
  callback?: (success: boolean, message?: string) => void,
): UpdateFundsStatusRequestedType => ({
  type: actionTypes.UPDATE_FUNDS_STATUS_REQUESTED,
  payload,
  callback,
});
//#endregion [Update Requested]

//#region [Update Succeeded]
export type UpdateFundsStatusSucceededType = {
  type: typeof actionTypes.UPDATE_FUNDS_STATUS_SUCCEEDED;
  result: UpdateFundsStatusResponse;
};

export const UpdateFundsStatusSucceeded = (result: UpdateFundsStatusResponse): UpdateFundsStatusSucceededType => ({
  type: actionTypes.UPDATE_FUNDS_STATUS_SUCCEEDED,
  result,
});

//#endregion [Update Succeeded]

//#region [Update Failed]
export type UpdateFundsStatusFailedType = {
  type: typeof actionTypes.UPDATE_FUNDS_STATUS_FAILED;
  error?: string;
};

export const UpdateFundsStatusFailed = (error?: string): UpdateFundsStatusFailedType => ({
  type: actionTypes.UPDATE_FUNDS_STATUS_FAILED,
  error,
});
//#endregion [Update Failed]

//#region [Download Requested]
export type DownloadFundsTemplateRequestedType = {
  type: typeof actionTypes.DOWNLOAD_FUNDS_TEMPLATE_REQUESTED;
  clientId: number;
  callback?: (success: boolean, message?: string) => void;
};

export const DownloadFundsTemplateRequested = (
  clientId: number,
  callback?: (success: boolean, message?: string) => void,
): DownloadFundsTemplateRequestedType => ({
  type: actionTypes.DOWNLOAD_FUNDS_TEMPLATE_REQUESTED,
  clientId,
  callback,
});
//#endregion [Download Requested]

//#region [Download Succeeded]
export type DownloadFundsTemplateSucceededType = {
  type: typeof actionTypes.DOWNLOAD_FUNDS_TEMPLATE_SUCCEEDED;
};

export const DownloadFundsTemplateSucceeded = (): DownloadFundsTemplateSucceededType => ({
  type: actionTypes.DOWNLOAD_FUNDS_TEMPLATE_SUCCEEDED,
});

//#endregion [Download Succeeded]

//#region [Download Failed]
export type DownloadFundsTemplateFailedType = {
  type: typeof actionTypes.DOWNLOAD_FUNDS_TEMPLATE_FAILED;
  error?: string;
};

export const DownloadFundsTemplateFailed = (error?: string): DownloadFundsTemplateFailedType => ({
  type: actionTypes.DOWNLOAD_FUNDS_TEMPLATE_FAILED,
  error,
});
//#endregion [Download Failed]

export const SALES_NON_SERIALIZABLE = [];

export type FundsActions =
  // List
  | GetFundsPastUpdateRequested //getFundsPastUpdates
  | GetFundsPastUpdateSucceeded
  | GetFundsPastUpdateFailed
  | GetFundsPendingRequested
  | GetFundsPendingSucceeded
  | GetFundsPendingFailed
  | InsertFundsUpdateRequested
  | InsertFundsTemplateSucceeded
  | InsertFundsUpdateFailed
  | DeleteFundsPastHistoryFailed
  | DeleteFundsPastHistoryRequested
  | DeleteFundsPastHistorySucceeded
  | CheckFundsDetailsExistFailedType
  | CheckFundsDetailsExistRequestedType
  | CheckFundsDetailsExistSucceededType

  // update funds status
  | UpdateFundsStatusRequestedType
  | UpdateFundsStatusSucceededType
  | UpdateFundsStatusFailedType

  // download fund template
  | DownloadFundsTemplateRequestedType
  | DownloadFundsTemplateSucceededType
  | DownloadFundsTemplateFailedType;
