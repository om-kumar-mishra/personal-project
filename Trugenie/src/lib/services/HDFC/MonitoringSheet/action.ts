import { FileUploadResponse } from "../services/dataTypes";
import { MoitoringSheetDetailsList, RemoveSalesMonitoringHistoryResponse, SalesMisDatesResponse, SalesMonitoringPastHistoryResponse } from "./dataTypes";
import * as actionTypes from "./types";

// Download-salesMonitoring-template
export type DownloadSalesMonitoringTemplateRequested = {
  type: typeof actionTypes.DOWNLOAD_SALES_MONITORING_TEMPLATE_DATA_REQUESTED;
  payload: {
    reAssetId: number;
    emaild: string
  },
  callback?: (success: boolean, message?: string) => void;
};


export function downloadSalesMonitoringTemplateRequested(reAssetId: number, emaild: string, callback?: (success: boolean) => void) {
  return {
    type: actionTypes.DOWNLOAD_SALES_MONITORING_TEMPLATE_DATA_REQUESTED,
    payload: {
      reAssetId,
      emaild,
    },
    callback
  };
}
export type DownloadSalesMonitoringTemplateSucceeded = {
  type: typeof actionTypes.DOWNLOAD_SALES_MONITORING_TEMPLATE_DATA_SUCCEEDED;
};

export function downloadSalesMonitoringTemplateSucceeded() {
  return { type: actionTypes.DOWNLOAD_SALES_MONITORING_TEMPLATE_DATA_SUCCEEDED };
}
export type DownloadSalesMonitoringTemplateFailed = {
  type: typeof actionTypes.DOWNLOAD_SALES_MONITORING_TEMPLATE_DATA_FAILED;
  error?: string;
};
export function downloadSalesMonitoringTemplateFailed(error: string) {
  return { type: actionTypes.DOWNLOAD_SALES_MONITORING_TEMPLATE_DATA_FAILED, error };
}

// SalesMonitoring-Past-History
export type GetSalesMonitoringPastHistoryRequested = {
  type: typeof actionTypes.GET_SALES_MONITORING_PAST_HISTORY_REQUESTED;
  REAssetId: number;
  CreatedBy: string;
  MonitoringHistoryId?: number,
  callback?: (success: boolean, message?: string) => void;
};

export const getSalesMonitoringPastHistoryListRequested = (
  REAssetId: number,
  CreatedBy: string,
  MonitoringHistoryId?: number,
  callback?: (success: boolean, message?: string) => void,
): GetSalesMonitoringPastHistoryRequested => ({
  type: actionTypes.GET_SALES_MONITORING_PAST_HISTORY_REQUESTED,
  REAssetId,
  CreatedBy,
  callback,
});

export type GetSalesMonitoringPastHistorySucceeded = {
  type: typeof actionTypes.GET_SALES_MONITORING_PAST_HISTORY_SUCCEEDED;
  result: SalesMonitoringPastHistoryResponse;
};

export const getSalesMonitoringPastHistoryListSucceeded = (result: SalesMonitoringPastHistoryResponse): GetSalesMonitoringPastHistorySucceeded => ({
  type: actionTypes.GET_SALES_MONITORING_PAST_HISTORY_SUCCEEDED,
  result,
});

export type GetSalesMonitoringPastHistoryFailed = {
  type: typeof actionTypes.GET_SALES_MONITORING_PAST_HISTORY_FAILED;
  error?: string;
};

export const getSalesMonitoringPastHistoryListFailed = (error?: string): GetSalesMonitoringPastHistoryFailed => ({
  type: actionTypes.GET_SALES_MONITORING_PAST_HISTORY_FAILED,
  error,
});

// Delete-SalesMonitoring-History
export type DeleteSalesMonitoringHistoryRequested = {
  type: typeof actionTypes.DELETE_SALES_MONITORING_HISTORY_REQUESTED;
  MonitoringHistoryId: number,
  REAssetId: number,
  CreatedBy: string,
  callback?: (success: boolean, message?: string) => void;
};

export const deleteSalesMonitoringHistoryRequested = (
  MonitoringHistoryId: number,
  REAssetId: number,
  CreatedBy: string,
  callback?: (success: boolean, message?: string) => void,
): DeleteSalesMonitoringHistoryRequested => ({
  type: actionTypes.DELETE_SALES_MONITORING_HISTORY_REQUESTED,
  MonitoringHistoryId,
  REAssetId,
  CreatedBy,
  callback,
});

export type DeleteSalesMonitoringHistorySucceeded = {
  type: typeof actionTypes.DELETE_SALES_MONITORING_HISTORY_SUCCEEDED;
  result: RemoveSalesMonitoringHistoryResponse;
};

export const deleteSalesMonitoringHistorySucceeded = (result: RemoveSalesMonitoringHistoryResponse): DeleteSalesMonitoringHistorySucceeded => ({
  type: actionTypes.DELETE_SALES_MONITORING_HISTORY_SUCCEEDED,
  result,
});

export type DeleteSalesMonitoringHistoryFailed = {
  type: typeof actionTypes.DELETE_SALES_MONITORING_HISTORY_FAILED;
  error?: string;
};

export const deleteSalesMonitoringHistoryFailed = (error?: string): DeleteSalesMonitoringHistoryFailed => ({
  type: actionTypes.DELETE_SALES_MONITORING_HISTORY_FAILED,
  error,
});

// Upload-salesMonitoring-template
export type UploadSalesMonitoringTemplateRequested = {
  type: typeof actionTypes.UPLOAD_SALES_MONITORING_TEMPLATE_DATA_REQUESTED;
  reAssetId: string,
  salesMisDate: string,
  costMisDate: string,
  createdBy: string,
  EntityName: string,
  Role: string,
  userName: string,
  fileContainer: string,
  filePath: string,
  fileName: string,
  remarks: string,
  uploaded_file: File;
  callback?: (success: boolean, message?: string) => void;
};

export const uploadSalesMonitoringTemplateRequested = (
  reAssetId: string,
  salesMisDate: string,
  costMisDate: string,
  createdBy: string,
  EntityName: string,
  Role: string,
  userName: string,
  fileContainer: string,
  filePath: string,
  fileName: string,
  remarks: string,
  uploaded_file,
  callback?: (success: boolean, message?: string) => void,
): UploadSalesMonitoringTemplateRequested => ({
  type: actionTypes.UPLOAD_SALES_MONITORING_TEMPLATE_DATA_REQUESTED,
  reAssetId,
  salesMisDate,
  costMisDate,
  createdBy,
  EntityName,
  Role,
  userName,
  fileContainer,
  filePath,
  fileName,
  remarks,
  uploaded_file,
  callback,
});

export type UploadSalesMonitoringTemplateSucceeded = {
  type: typeof actionTypes.UPLOAD_SALES_MONITORING_TEMPLATE_DATA_SUCCEEDED;
  result: FileUploadResponse;
};

export const uploadSalesMonitoringTemplateSucceeded = (result: FileUploadResponse): UploadSalesMonitoringTemplateSucceeded => ({
  type: actionTypes.UPLOAD_SALES_MONITORING_TEMPLATE_DATA_SUCCEEDED,
  result,
});

export type UploadSalesMonitoringTemplateFailed = {
  type: typeof actionTypes.UPLOAD_SALES_MONITORING_TEMPLATE_DATA_FAILED;
  error?: string;
};

export const uploadSalesMonitoringTemplateFailed = (error?: string): UploadSalesMonitoringTemplateFailed => ({
  type: actionTypes.UPLOAD_SALES_MONITORING_TEMPLATE_DATA_FAILED,
  error,
});

// MISDate
export type GetSalesMISRequested = {
  type: typeof actionTypes.SALES_MIS_DATE_REQUESTED;
  REAssetId: number;
  callback?: (success: boolean, message?: string) => void;
};

export const getSalesMISRequested = (
  REAssetId: number,
  callback?: (success: boolean, message?: string) => void,
): GetSalesMISRequested => ({
  type: actionTypes.SALES_MIS_DATE_REQUESTED,
  REAssetId,
  callback,
});

export type GetSalesMISSucceeded = {
  type: typeof actionTypes.SALES_MIS_DATE_SUCCEEDED;
  result: SalesMisDatesResponse;
};

export const getSalesMISSucceeded = (result: SalesMisDatesResponse): GetSalesMISSucceeded => ({
  type: actionTypes.SALES_MIS_DATE_SUCCEEDED,
  result,
});

export type GetSalesMISFailed = {
  type: typeof actionTypes.SALES_MIS_DATE_FAILED;
  error?: string;
};

export const getSalesMISFailed = (error?: string): GetSalesMISFailed => ({
  type: actionTypes.SALES_MIS_DATE_FAILED,
  error,
});

//---------------------------Get Monitoring Sheet Details -----------------------------
export type GetMonitoringSheetDetailsTypeRequested = {
  type: typeof actionTypes.GET_MONITORING_SHEET_REQUESTED;
  reassetid: string,
};

export const getMonitoringSheetDetailsRequested = (reassetid: string): GetMonitoringSheetDetailsTypeRequested => ({
  type: actionTypes.GET_MONITORING_SHEET_REQUESTED,
  reassetid,
});

export type GetMonitoringSheetDetailsTypeSucceeded = {
  type: typeof actionTypes.GET_MONITORING_SHEET_SUCCEEDED;
  MoitoringSheetDetailsList: MoitoringSheetDetailsList;
};

export const getMonitoringSheetDetailsSucceeded = (MoitoringSheetDetailsList: MoitoringSheetDetailsList): GetMonitoringSheetDetailsTypeSucceeded => ({
  type: actionTypes.GET_MONITORING_SHEET_SUCCEEDED,
  MoitoringSheetDetailsList,
});

export type GetMonitoringSheetDetailsTypeFailed = {
  type: typeof actionTypes.GET_MONITORING_SHEET_FAILED;
  error: string;
};

export const getMonitoringSheetDetailsFailed = (error: string): GetMonitoringSheetDetailsTypeFailed => ({
  type: actionTypes.GET_MONITORING_SHEET_FAILED,
  error,
});

export type SalesMonitoringActions =
  // download-sales-template
  | DownloadSalesMonitoringTemplateRequested
  | DownloadSalesMonitoringTemplateSucceeded
  | DownloadSalesMonitoringTemplateFailed

  //get-salesMonitoring-past-history
  | GetSalesMonitoringPastHistoryRequested
  | GetSalesMonitoringPastHistorySucceeded
  | GetSalesMonitoringPastHistoryFailed

  //Remove
  | DeleteSalesMonitoringHistoryRequested
  | DeleteSalesMonitoringHistorySucceeded
  | DeleteSalesMonitoringHistoryFailed

  //Upload
  | UploadSalesMonitoringTemplateRequested
  | UploadSalesMonitoringTemplateSucceeded
  | UploadSalesMonitoringTemplateFailed

  //MISDate
  | GetSalesMISRequested
  | GetSalesMISSucceeded
  | GetSalesMISFailed

  //MonitoringSheetDetails
  | GetMonitoringSheetDetailsTypeRequested
  | GetMonitoringSheetDetailsTypeSucceeded
  | GetMonitoringSheetDetailsTypeFailed