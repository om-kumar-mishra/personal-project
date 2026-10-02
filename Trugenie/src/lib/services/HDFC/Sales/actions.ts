import { FileUploadResponse } from "../services/dataTypes";
import {
  CanUploadSalesTemplateDataResponse,
  PastSalesSummaryDetailResponse,
  PendingSalesForApprovalResponse,
  RemoveSalesHistoryResponse,
  SalesPastHistoryResponse,
  SalesSummaryResponse,
  SummaryDetailResponse,
  TaggedRMDataResponse,
  UpdateSalesPastHistoryResponse,
} from "./dataTypes";
import * as actionTypes from "./types";

// Sales-Past-History
//#region [List Requested]
export type GetSalesPastHistoryRequested = {
  type: typeof actionTypes.GET_SALES_PAST_HISTORY_REQUESTED;
  reAssetId: number;
  typeCheck: string;
  callback?: (success: boolean, message?: string) => void;
};

export const getSalesPastHistoryListRequested = (
  reAssetId: number,
  typeCheck: string,
  callback?: (success: boolean, message?: string) => void,
): GetSalesPastHistoryRequested => ({
  type: actionTypes.GET_SALES_PAST_HISTORY_REQUESTED,
  reAssetId,
  typeCheck,
  callback,
});
//#endregion

//#region [List Succeeded]
export type GetSalesPastHistorySucceeded = {
  type: typeof actionTypes.GET_SALES_PAST_HISTORY_SUCCEEDED;
  result: SalesPastHistoryResponse;
};

export const getSalesPastHistoryListSucceeded = (result: SalesPastHistoryResponse): GetSalesPastHistorySucceeded => ({
  type: actionTypes.GET_SALES_PAST_HISTORY_SUCCEEDED,
  result,
});

//#endregion

//#region [List Failed]
export type GetSalesPastHistoryFailed = {
  type: typeof actionTypes.GET_SALES_PAST_HISTORY_FAILED;
  error?: string;
};

export const getSalesPastHistoryListFailed = (error?: string): GetSalesPastHistoryFailed => ({
  type: actionTypes.GET_SALES_PAST_HISTORY_FAILED,
  error,
});
//#endregion

// Past-sales-summary-details
//#region [Details Requested]
export type GetPastSalesSummaryDetailRequested = {
  type: typeof actionTypes.GET_PAST_SALES_SUMMARY_DETAIL_REQUESTED;
  reAssetId: number;
  useremail: string;
  SaleMISHistoryId: number;
  callback?: (success: boolean, message?: string) => void;
};

export const getPastSalesSummaryDetailRequested = (
  reAssetId: number,
  useremail: string,
  SaleMISHistoryId: number,
  callback?: (success: boolean, message?: string) => void,
): GetPastSalesSummaryDetailRequested => ({
  type: actionTypes.GET_PAST_SALES_SUMMARY_DETAIL_REQUESTED,
  reAssetId,
  useremail,
  SaleMISHistoryId,
  callback,
});
//#endregion

//#region [Detail Succeeded]
export type GetPastSalesSummaryDetailSucceeded = {
  type: typeof actionTypes.GET_PAST_SALES_SUMMARY_DETAIL_SUCCEEDED;
  result: PastSalesSummaryDetailResponse;
};

export const getPastSalesSummaryDetailSucceeded = (result: PastSalesSummaryDetailResponse): GetPastSalesSummaryDetailSucceeded => ({
  type: actionTypes.GET_PAST_SALES_SUMMARY_DETAIL_SUCCEEDED,
  result,
});
//#endregion

//#region [Detail Failed]
export type GetPastSalesSummaryDetailFailed = {
  type: typeof actionTypes.GET_PAST_SALES_SUMMARY_DETAIL_FAILED;
  error?: string;
};

export const getPastSalesSummaryDetailFailed = (error?: string): GetPastSalesSummaryDetailFailed => ({
  type: actionTypes.GET_PAST_SALES_SUMMARY_DETAIL_FAILED,
  error,
});
//#endregion

// Pending-Sales-For-Approval
//#region [List Requested]
export type GetPendingSalesForApprovalRequested = {
  type: typeof actionTypes.GET_PENDING_SALES_FOR_APPROVAL_REQUESTED;
  reAssetId: number;
  callback?: (success: boolean, message?: string) => void;
};

export const getPendingSalesForApprovalListRequested = (
  reAssetId: number,
  callback?: (success: boolean, message?: string) => void,
): GetPendingSalesForApprovalRequested => ({
  type: actionTypes.GET_PENDING_SALES_FOR_APPROVAL_REQUESTED,
  reAssetId,
  callback,
});
//#endregion

//#region [List Succeeded]
export type GetPendingSalesForApprovalSucceeded = {
  type: typeof actionTypes.GET_PENDING_SALES_FOR_APPROVAL_SUCCEEDED;
  result: PendingSalesForApprovalResponse;
};

export const getPendingSalesForApprovalListSucceeded = (result: PendingSalesForApprovalResponse): GetPendingSalesForApprovalSucceeded => ({
  type: actionTypes.GET_PENDING_SALES_FOR_APPROVAL_SUCCEEDED,
  result,
});

//#endregion

//#region [List Failed]
export type GetPendingSalesForApprovalFailed = {
  type: typeof actionTypes.GET_PENDING_SALES_FOR_APPROVAL_FAILED;
  error?: string;
};

export const getPendingSalesForApprovalListFailed = (error?: string): GetPendingSalesForApprovalFailed => ({
  type: actionTypes.GET_PENDING_SALES_FOR_APPROVAL_FAILED,
  error,
});
//#endregion

// Update-Sales-Past-History
//#region [List Requested]
export type UpdateSalesPastHistoryRequested = {
  type: typeof actionTypes.UPDATE_SALES_PAST_HISTORY_REQUESTED;
  reassetId: number;
  SaleMISHistoryId: number;
  status: string;
  createdby: string;
  callback?: (success: boolean, message?: string) => void;
};

export const updateSalesPastHistoryListRequested = (
  reassetId: number,
  SaleMISHistoryId: number,
  status: string,
  createdby: string,
  callback?: (success: boolean, message?: string) => void,
): UpdateSalesPastHistoryRequested => ({
  type: actionTypes.UPDATE_SALES_PAST_HISTORY_REQUESTED,
  reassetId,
  SaleMISHistoryId,
  status,
  createdby,
  callback,
});
//#endregion

//#region [List Succeeded]
export type UpdateSalesPastHistorySucceeded = {
  type: typeof actionTypes.UPDATE_SALES_PAST_HISTORY_SUCCEEDED;
  result: UpdateSalesPastHistoryResponse;
};

export const updateSalesPastHistoryListSucceeded = (result: UpdateSalesPastHistoryResponse): UpdateSalesPastHistorySucceeded => ({
  type: actionTypes.UPDATE_SALES_PAST_HISTORY_SUCCEEDED,
  result,
});

//#endregion

//#region [List Failed]
export type UpdateSalesPastHistoryFailed = {
  type: typeof actionTypes.UPDATE_SALES_PAST_HISTORY_FAILED;
  error?: string;
};

export const updateSalesPastHistoryListFailed = (error?: string): UpdateSalesPastHistoryFailed => ({
  type: actionTypes.UPDATE_SALES_PAST_HISTORY_FAILED,
  error,
});
//#endregion

// Delete-Sales-History
//#region [Delete Requested]
export type DeleteSalesHistoryRequested = {
  type: typeof actionTypes.DELETE_SALES_HISTORY_REQUESTED;
  reassetId: number;
  SaleMISHistoryId: number;
  createdby: string;
  callback?: (success: boolean, message?: string) => void;
};

export const deleteSalesHistoryRequested = (
  reassetId: number,
  SaleMISHistoryId: number,
  createdby: string,
  callback?: (success: boolean, message?: string) => void,
): DeleteSalesHistoryRequested => ({
  type: actionTypes.DELETE_SALES_HISTORY_REQUESTED,
  reassetId,
  SaleMISHistoryId,
  createdby,
  callback,
});
//#endregion

//#region [Delete Succeeded]
export type DeleteSalesHistorySucceeded = {
  type: typeof actionTypes.DELETE_SALES_HISTORY_SUCCEEDED;
  result: RemoveSalesHistoryResponse;
};

export const deleteSalesHistorySucceeded = (result: RemoveSalesHistoryResponse): DeleteSalesHistorySucceeded => ({
  type: actionTypes.DELETE_SALES_HISTORY_SUCCEEDED,
  result,
});
//#endregion

//#region [Delete Failed]
export type DeleteSalesHistoryFailed = {
  type: typeof actionTypes.DELETE_SALES_HISTORY_FAILED;
  error?: string;
};

export const deleteSalesHistoryFailed = (error?: string): DeleteSalesHistoryFailed => ({
  type: actionTypes.DELETE_SALES_HISTORY_FAILED,
  error,
});
//#endregion

// Delete-Update-Sales-Past-History
//#region [Delete Requested]
export type DeleteUpdateSalesPastHistoryRequested = {
  type: typeof actionTypes.DELETE_UPDATE_SALES_PAST_HISTORY_REQUESTED;
  reassetId: number;
  Type: string;
  callback?: (success: boolean, message?: string) => void;
};

export const deleteUpdateSalesPastHistoryRequested = (
  reassetId: number,
  Type: string,
  callback?: (success: boolean, message?: string) => void,
): DeleteUpdateSalesPastHistoryRequested => ({
  type: actionTypes.DELETE_UPDATE_SALES_PAST_HISTORY_REQUESTED,
  reassetId,
  Type,
  callback,
});
//#endregion

//#region [Delete Succeeded]
export type DeleteUpdateSalesPastHistorySucceeded = {
  type: typeof actionTypes.DELETE_UPDATE_SALES_PAST_HISTORY_SUCCEEDED;
  result: RemoveSalesHistoryResponse;
};

export const deleteUpdateSalesPastHistorySucceeded = (result: RemoveSalesHistoryResponse): DeleteUpdateSalesPastHistorySucceeded => ({
  type: actionTypes.DELETE_UPDATE_SALES_PAST_HISTORY_SUCCEEDED,
  result,
});
//#endregion

//#region [Delete Failed]
export type DeleteUpdateSalesPastHistoryFailed = {
  type: typeof actionTypes.DELETE_UPDATE_SALES_PAST_HISTORY_FAILED;
  error?: string;
};

export const deleteUpdateSalesPastHistoryFailed = (error?: string): DeleteUpdateSalesPastHistoryFailed => ({
  type: actionTypes.DELETE_UPDATE_SALES_PAST_HISTORY_FAILED,
  error,
});
//#endregion

// Can-Upload-sales-template
//#region [List Requested]
export type CanUploadSalesTemplateRequested = {
  type: typeof actionTypes.CAN_UPLOAD_SALES_TEMPLATE_DATA_REQUESTED;
  reassetId: number;
  MISDate: string;
  Type: string;
  actionCallback: (canUpdate: boolean) => void;
  callback?: (success: boolean, message?: string) => void;
};

export const canUploadSalesTemplateRequested = (
  reassetId: number,
  MISDate: string,
  Type: string,
  actionCallback: (canUpdate: boolean) => void,
  callback?: (success: boolean, message?: string) => void,
): CanUploadSalesTemplateRequested => ({
  type: actionTypes.CAN_UPLOAD_SALES_TEMPLATE_DATA_REQUESTED,
  reassetId,
  MISDate,
  Type,
  actionCallback,
  callback,
});
//#endregion

//#region [List Succeeded]
export type CanUploadSalesTemplateSucceeded = {
  type: typeof actionTypes.CAN_UPLOAD_SALES_TEMPLATE_DATA_SUCCEEDED;
  result: CanUploadSalesTemplateDataResponse;
};

export const canUploadSalesTemplateSucceeded = (result: CanUploadSalesTemplateDataResponse): CanUploadSalesTemplateSucceeded => ({
  type: actionTypes.CAN_UPLOAD_SALES_TEMPLATE_DATA_SUCCEEDED,
  result,
});
//#endregion

//#region [List Failed]
export type CanUploadSalesTemplateFailed = {
  type: typeof actionTypes.CAN_UPLOAD_SALES_TEMPLATE_DATA_FAILED;
  error?: string;
};

export const canUploadSalesTemplateFailed = (error?: string): CanUploadSalesTemplateFailed => ({
  type: actionTypes.CAN_UPLOAD_SALES_TEMPLATE_DATA_FAILED,
  error,
});
//#endregion

// Upload-sales-template
//#region [List Requested]
export type UploadSalesTemplateRequested = {
  type: typeof actionTypes.UPLOAD_SALES_TEMPLATE_DATA_REQUESTED;
  reassetId: number;
  misDate: string;
  entity: string;
  entityRole: string;
  fileContainer: string;
  filePath: string;
  fileName: string;
  remarks: string;
  uploaded_file: File;
  callback?: (success: boolean, message?: string) => void;
};

export const uploadSalesTemplateRequested = (
  reassetId: number,
  misDate: string,
  entity: string,
  entityRole: string,
  fileContainer: string,
  filePath: string,
  fileName: string,
  remarks: string,
  uploaded_file,
  callback?: (success: boolean, message?: string) => void,
): UploadSalesTemplateRequested => ({
  type: actionTypes.UPLOAD_SALES_TEMPLATE_DATA_REQUESTED,
  reassetId,
  misDate,
  entity,
  entityRole,
  fileContainer,
  filePath,
  fileName,
  remarks,
  uploaded_file,
  callback,
});
//#endregion

//#region [List Succeeded]
export type UploadSalesTemplateSucceeded = {
  type: typeof actionTypes.UPLOAD_SALES_TEMPLATE_DATA_SUCCEEDED;
  result: FileUploadResponse;
};

export const uploadSalesTemplateSucceeded = (result: FileUploadResponse): UploadSalesTemplateSucceeded => ({
  type: actionTypes.UPLOAD_SALES_TEMPLATE_DATA_SUCCEEDED,
  result,
});
//#endregion

//#region [List Failed]
export type UploadSalesTemplateFailed = {
  type: typeof actionTypes.UPLOAD_SALES_TEMPLATE_DATA_FAILED;
  error?: string;
};

export const uploadSalesTemplateFailed = (error?: string): UploadSalesTemplateFailed => ({
  type: actionTypes.UPLOAD_SALES_TEMPLATE_DATA_FAILED,
  error,
});
//#endregion

// Download-sales-template
//#region [List Requested]
export type DownloadSalesTemplateRequested = {
  type: typeof actionTypes.DOWNLOAD_SALES_TEMPLATE_DATA_REQUESTED;
  reassetId: number;
  callback?: (success: boolean, message?: string) => void;
};

export const downloadSalesTemplateRequested = (reassetId: number, callback?: (success: boolean, message?: string) => void): DownloadSalesTemplateRequested => ({
  type: actionTypes.DOWNLOAD_SALES_TEMPLATE_DATA_REQUESTED,
  reassetId,
  callback,
});
//#endregion

//#region [List Succeeded]
export type DownloadSalesTemplateSucceeded = {
  type: typeof actionTypes.DOWNLOAD_SALES_TEMPLATE_DATA_SUCCEEDED;
  result: SalesPastHistoryResponse;
};

export const downloadSalesTemplateSucceeded = (result: SalesPastHistoryResponse): DownloadSalesTemplateSucceeded => ({
  type: actionTypes.DOWNLOAD_SALES_TEMPLATE_DATA_SUCCEEDED,
  result,
});
//#endregion

//#region [List Failed]
export type DownloadSalesTemplateFailed = {
  type: typeof actionTypes.DOWNLOAD_SALES_TEMPLATE_DATA_FAILED;
  error?: string;
};

export const downloadSalesTemplateFailed = (error?: string): DownloadSalesTemplateFailed => ({
  type: actionTypes.DOWNLOAD_SALES_TEMPLATE_DATA_FAILED,
  error,
});
//#endregion

// Tagged-RM
//#region [List Requested]
export type GetTaggedRMRequested = {
  type: typeof actionTypes.GET_TAGGED_RM_REQUESTED;
  reassetId: number;
  SaleMISHistoryId: number;
  createdby: string;
  callback?: (success: boolean, message?: string) => void;
};

export const fetchTaggedRMRequested = (
  reassetId: number,
  SaleMISHistoryId: number,
  createdby: string,
  callback?: (success: boolean, message?: string) => void,
): GetTaggedRMRequested => ({
  type: actionTypes.GET_TAGGED_RM_REQUESTED,
  reassetId,
  SaleMISHistoryId,
  createdby,
  callback,
});
//#endregion

//#region [List Succeeded]
export type GetTaggedRMSucceeded = {
  type: typeof actionTypes.GET_TAGGED_RM_SUCCEEDED;
  result: TaggedRMDataResponse;
};

export const fetchTaggedRMSucceeded = (result: TaggedRMDataResponse): GetTaggedRMSucceeded => ({
  type: actionTypes.GET_TAGGED_RM_SUCCEEDED,
  result,
});
//#endregion

//#region [List Failed]
export type GetTaggedRMFailed = {
  type: typeof actionTypes.GET_TAGGED_RM_FAILED;
  error?: string;
};
export const fetchTaggedRMFailed = (error?: string): GetTaggedRMFailed => ({
  type: actionTypes.GET_TAGGED_RM_FAILED,
  error,
});
//#endregion

// Sales Setup Pending Status
export type FinalSalesSetupPendingStatus = { isSetup: number };
//#region [Request Action]
export type SalesSetupPendingStatus = {
  type: typeof actionTypes.IS_SALES_SETUP_PENDING_REQUESTED;
  ReAssetId: number;
};

export const isSalesSetupPendingRequested = (ReAssetId: number): SalesSetupPendingStatus => ({
  type: actionTypes.IS_SALES_SETUP_PENDING_REQUESTED,
  ReAssetId,
});
//#endregion

//#region [Request Succeeded]
export type SalesSetupPendingStatusSuccess = {
  type: typeof actionTypes.IS_SALES_SETUP_PENDING_SUCCEEDED;
  payload: FinalSalesSetupPendingStatus | null;
};

export const isSalesSetupPendingSuccess = (payload: FinalSalesSetupPendingStatus | null): SalesSetupPendingStatusSuccess => ({
  type: actionTypes.IS_SALES_SETUP_PENDING_SUCCEEDED,
  payload,
});
//#endregion

//#region [Request Failed]
export type SalesSetupPendingStatusFailed = {
  type: typeof actionTypes.IS_SALES_SETUP_PENDING_FAILED;
  error?: string;
};

export const isSalesSetupPendingFailed = (error?: string): SalesSetupPendingStatusFailed => ({
  type: actionTypes.IS_SALES_SETUP_PENDING_FAILED,
  error,
});
//#endregion

// Sales-Summary-Request
//#region [Request Action]
export type GetSalesSummaryRequested = {
  type: typeof actionTypes.GET_SALES_SUMMARY_REQUESTED;
  reAssetId: number;
  misDate: string;
  remarks: string;
  uploaded_file: File;
  callback?: (success: boolean, message?: string) => void;
};

export const getSalesSummaryRequested = (
  reAssetId: number,
  misDate: string,
  remarks: string,
  uploaded_file: File,
  callback?: (success: boolean, message?: string) => void,
): GetSalesSummaryRequested => ({
  type: actionTypes.GET_SALES_SUMMARY_REQUESTED,
  reAssetId,
  misDate,
  remarks,
  uploaded_file,
  callback,
});
//#endregion

//#region [Request Succeeded]
export type GetSalesSummarySucceeded = {
  type: typeof actionTypes.GET_SALES_SUMMARY_SUCCEEDED;
  result: SalesSummaryResponse;
  misDate: string;
  remarks: string;
  uploaded_file: File;
};

export const getSalesSummarySucceeded = (result: SalesSummaryResponse, misDate: string, remarks: string, uploaded_file: File): GetSalesSummarySucceeded => ({
  type: actionTypes.GET_SALES_SUMMARY_SUCCEEDED,
  result,
  misDate,
  remarks,
  uploaded_file,
});
//#endregion

//#region [Request Failed]
export type GetSalesSummaryFailed = {
  type: typeof actionTypes.GET_SALES_SUMMARY_FAILED;
  error?: string;
};

export const getSalesSummaryFailed = (error?: string): GetSalesSummaryFailed => ({
  type: actionTypes.GET_SALES_SUMMARY_FAILED,
  error,
});
//#endregion

//#region [Reset Request]
export type SalesSummaryReset = {
  type: typeof actionTypes.GET_SALES_SUMMARY_RESET;
};

export const salesSummaryReset = (): SalesSummaryReset => ({
  type: actionTypes.GET_SALES_SUMMARY_RESET,
});
//#endregion

// Sales-Summary-Detail-Request
//#region [Details Requested]
export type GetSalesSummaryDetailRequested = {
  type: typeof actionTypes.GET_SALES_SUMMARY_DETAIL_REQUESTED;
  reAssetId: number;
  uploadedFile: File;
  status: string;
  misDate: string;
  callback?: (success: boolean, message?: string) => void;
};

export const getSalesSummaryDetailRequested = (
  reAssetId: number,
  uploadedFile: File,
  status: string,
  misDate: string,
  callback?: (success: boolean, message?: string) => void,
): GetSalesSummaryDetailRequested => ({
  type: actionTypes.GET_SALES_SUMMARY_DETAIL_REQUESTED,
  reAssetId,
  uploadedFile,
  status,
  misDate,
  callback,
});
//#endregion

//#region [Detail Succeeded]
export type GetSalesSummaryDetailSucceeded = {
  type: typeof actionTypes.GET_SALES_SUMMARY_DETAIL_SUCCEEDED;
  result: SummaryDetailResponse;
};

export const getSalesSummaryDetailSucceeded = (result: SummaryDetailResponse): GetSalesSummaryDetailSucceeded => ({
  type: actionTypes.GET_SALES_SUMMARY_DETAIL_SUCCEEDED,
  result,
});
//#endregion

//#region [Detail Failed]
export type GetSalesSummaryDetailFailed = {
  type: typeof actionTypes.GET_SALES_SUMMARY_DETAIL_FAILED;
  error?: string;
};

export const getSalesSummaryDetailFailed = (error?: string): GetSalesSummaryDetailFailed => ({
  type: actionTypes.GET_SALES_SUMMARY_DETAIL_FAILED,
  error,
});
//#endregion

//#region [Reset Request]
export type SalesSummaryDetailReset = {
  type: typeof actionTypes.GET_SALES_SUMMARY_DETAIL_RESET;
};

export const salesSummaryDetailReset = (): SalesSummaryDetailReset => ({
  type: actionTypes.GET_SALES_SUMMARY_DETAIL_RESET,
});
//#endregion

export const SALES_NON_SERIALIZABLE = [];

export type SalesActions =
  // List
  | GetSalesPastHistoryRequested
  | GetSalesPastHistorySucceeded
  | GetSalesPastHistoryFailed

  // summary-details
  | GetPastSalesSummaryDetailRequested
  | GetPastSalesSummaryDetailSucceeded
  | GetPastSalesSummaryDetailFailed

  // sales-pending-for-approval-list
  | GetPendingSalesForApprovalRequested
  | GetPendingSalesForApprovalSucceeded
  | GetPendingSalesForApprovalFailed

  // update-past-history
  | UpdateSalesPastHistoryRequested
  | UpdateSalesPastHistorySucceeded
  | UpdateSalesPastHistoryFailed

  // delete-update-past-history
  | DeleteUpdateSalesPastHistoryRequested
  | DeleteUpdateSalesPastHistorySucceeded
  | DeleteUpdateSalesPastHistoryFailed

  // delete-sales-history
  | DeleteSalesHistoryRequested
  | DeleteSalesHistorySucceeded
  | DeleteSalesHistoryFailed

  // upload-sales-template
  | UploadSalesTemplateRequested
  | UploadSalesTemplateSucceeded
  | UploadSalesTemplateFailed

  // download-sales-template
  | DownloadSalesTemplateRequested
  | DownloadSalesTemplateSucceeded
  | DownloadSalesTemplateFailed

  // Tagged RM
  | GetTaggedRMRequested
  | GetTaggedRMSucceeded
  | GetTaggedRMFailed

  // Can-Upload-sales-template
  | SalesSetupPendingStatus
  | SalesSetupPendingStatusSuccess
  | SalesSetupPendingStatusFailed

  // sales-summary
  | GetSalesSummaryRequested
  | GetSalesSummarySucceeded
  | GetSalesSummaryFailed
  | SalesSummaryReset

  // sales-summary-details
  | GetSalesSummaryDetailRequested
  | GetSalesSummaryDetailSucceeded
  | GetSalesSummaryDetailFailed
  | SalesSummaryDetailReset;
