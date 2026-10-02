import {
  CanSetupInvestmentData,
  CheckInvestmentDetailsExistData,
  DeleteInvestmentDetailsPayload,
  DeleteInvestmentDetailsResponse,
  InvestmentDeveloperData,
  InvestmentFundsData,
  InvestmentListData,
  // CanSetupProjectSummaryData,
  // CheckProjectSummaryDetailsExistData,
  // DeleteProjectSummaryDetailsPayload,
  // DeleteProjectSummaryDetailsResponse,
  // IsSummarySetupData,
  // SummaryPendingData,
  // UpdateProjectSummaryStatusPayload,
  // UpdateProjectSummaryStatusResponse,
  // UploadProjectSummaryTemplatePayload,
  // UploadProjectSummaryTemplateResponse,
  // UploadProjectSummaryTemplateSetupPayload,
  // UploadProjectSummaryTemplateSetupResponse,
  InvestmentPastHistoryData,
  InvestmentPendingData,
  IsInvestmentSetupData,
  UpdateInvestmentStatusPayload,
  UpdateInvestmentStatusResponse,
  UploadInvestmentSetupTemplatePayload,
  UploadInvestmentSetupTemplateResponse,
  UploadInvestmentTemplatePayload,
  UploadInvestmentTemplateResponse,
} from "./dataTypes";
import * as actionTypes from "./types";

// ===================================Get Investment PastHistory List================================================
//#region [PastHistory Requested]
export type GetInvestmentPastHistoryRequestedType = {
  type: typeof actionTypes.GET_INVESTMENT_PAST_HISTORY_REQUESTED;
  REAssetId: number;
  Type: string;
};

export const GetInvestmentPastHistoryListRequested = (REAssetId: number, Type: string): GetInvestmentPastHistoryRequestedType => ({
  type: actionTypes.GET_INVESTMENT_PAST_HISTORY_REQUESTED,
  REAssetId,
  Type,
});
//#endregion

//#region [PastHistory Succeeded]
export type GetInvestmentPastHistorySucceededType = {
  type: typeof actionTypes.GET_INVESTMENT_PAST_HISTORY_SUCCEEDED;
  result: InvestmentPastHistoryData[];
};

export const GetInvestmentPastHistoryListSucceeded = (result: InvestmentPastHistoryData[]): GetInvestmentPastHistorySucceededType => ({
  type: actionTypes.GET_INVESTMENT_PAST_HISTORY_SUCCEEDED,
  result,
});

//#endregion

//#region [PastHistory Failed]
export type GetInvestmentPastHistoryFailedType = {
  type: typeof actionTypes.GET_INVESTMENT_PAST_HISTORY_FAILED;
  error?: string;
};

export const GetInvestmentPastHistoryListFailed = (error?: string): GetInvestmentPastHistoryFailedType => ({
  type: actionTypes.GET_INVESTMENT_PAST_HISTORY_FAILED,
  error,
});
//#endregion

// ===================================Get Investment Pending List================================================
//#region [Investment Pending List Requested]
export type GetInvestmentPendingUpdateRequestedType = {
  type: typeof actionTypes.GET_INVESTMENT_PENDING_UPDATE_REQUESTED;
  InvestmentId: number;
  Type: string;
};

export const GetInvestmentPendingUpdateListRequested = (InvestmentId: number, Type: string): GetInvestmentPendingUpdateRequestedType => ({
  type: actionTypes.GET_INVESTMENT_PENDING_UPDATE_REQUESTED,
  InvestmentId,
  Type,
});
//#endregion

//#region [Investment Pending List Succeeded]
export type GetInvestmentPendingUpdateSucceededType = {
  type: typeof actionTypes.GET_INVESTMENT_PENDING_UPDATE_SUCCEEDED;
  result: InvestmentPendingData[];
};

export const GetInvestmentPendingUpdateListSucceeded = (result: InvestmentPendingData[]): GetInvestmentPendingUpdateSucceededType => ({
  type: actionTypes.GET_INVESTMENT_PENDING_UPDATE_SUCCEEDED,
  result,
});

//#endregion

//#region [Investment Pending List Failed]
export type GetInvestmentPendingUpdateFailedType = {
  type: typeof actionTypes.GET_INVESTMENT_PENDING_UPDATE_FAILED;
  error?: string;
};

export const GetInvestmentPendingUpdateListFailed = (error?: string): GetInvestmentPendingUpdateFailedType => ({
  type: actionTypes.GET_INVESTMENT_PENDING_UPDATE_FAILED,
  error,
});
//#endregion

// ===================================Is Investment Setup================================================
//#region [Is Investment Setup Requested]
export type IsInvestmentSetupRequestedType = {
  type: typeof actionTypes.IS_INVESTMENT_SETUP_REQUESTED;
  InvestmentId: number;
  // MisDate: string;
  // Type?: string;
};

export const IsInvestmentSetupRequested = (InvestmentId: number): IsInvestmentSetupRequestedType => ({
  type: actionTypes.IS_INVESTMENT_SETUP_REQUESTED,
  InvestmentId,
  // MisDate,
  // Type,
});
//#endregion [Is Investment Setup Requested]

//#region [Is Investment Setup Succeeded]
export type IsInvestmentSetupSucceededType = {
  type: typeof actionTypes.IS_INVESTMENT_SETUP_SUCCEEDED;
  result: IsInvestmentSetupData;
};

export const IsInvestmentSetupSucceeded = (result: IsInvestmentSetupData): IsInvestmentSetupSucceededType => ({
  type: actionTypes.IS_INVESTMENT_SETUP_SUCCEEDED,
  result,
});

//#endregion [Is Investment Setup Succeeded]

//#region [Is Investment Setup Failed]
export type IsInvestmentSetupFailedType = {
  type: typeof actionTypes.IS_INVESTMENT_SETUP_FAILED;
  error?: string;
};

export const IsInvestmentSetupFailed = (error?: string): IsInvestmentSetupFailedType => ({
  type: actionTypes.IS_INVESTMENT_SETUP_FAILED,
  error,
});
//#endregion [Is Investment Setup Failed]

// =================================== Download Investment Template ================================================
//#region [Download Requested]
export type DownloadInvestmentTemplateRequestedType = {
  type: typeof actionTypes.DOWNLOAD_INVESTMENT_TEMPLATE_REQUESTED;
  investmentId: number;
  typecheck: string;
  callback?: (success: boolean, message?: string) => void;
};

export const DownloadInvestmentTemplateRequested = (
  investmentId: number,
  typecheck: string,
  callback?: (success: boolean, message?: string) => void,
): DownloadInvestmentTemplateRequestedType => ({
  type: actionTypes.DOWNLOAD_INVESTMENT_TEMPLATE_REQUESTED,
  investmentId,
  typecheck,
  callback,
});
//#endregion [Download Requested]

//#region [Download Succeeded]
export type DownloadInvestmentTemplateSucceededType = {
  type: typeof actionTypes.DOWNLOAD_INVESTMENT_TEMPLATE_SUCCEEDED;
};

export const DownloadInvestmentTemplateSucceeded = (): DownloadInvestmentTemplateSucceededType => ({
  type: actionTypes.DOWNLOAD_INVESTMENT_TEMPLATE_SUCCEEDED,
});

//#endregion [Download Succeeded]

//#region [Download Failed]
export type DownloadInvestmentTemplateFailedType = {
  type: typeof actionTypes.DOWNLOAD_INVESTMENT_TEMPLATE_FAILED;
  error?: string;
};

export const DownloadInvestmentTemplateFailed = (error?: string): DownloadInvestmentTemplateFailedType => ({
  type: actionTypes.DOWNLOAD_INVESTMENT_TEMPLATE_FAILED,
  error,
});
//#endregion [Download Failed]

// =================================== Upload Investment Template ================================================
//#region [Upload Investment Requested]
export type UploadInvestmentTemplateRequestedType = {
  type: typeof actionTypes.UPLOAD_INVESTMENT_TEMPLATE_REQUESTED;
  payload: UploadInvestmentTemplatePayload;
  callback?: (success: boolean, message?: string) => void;
};

export const UploadInvestmentTemplateRequested = (
  payload: UploadInvestmentTemplatePayload,
  callback?: (success: boolean, message?: string) => void,
): UploadInvestmentTemplateRequestedType => ({
  type: actionTypes.UPLOAD_INVESTMENT_TEMPLATE_REQUESTED,
  payload,
  callback,
});
//#endregion [Upload Investment Requested]

//#region [Upload Investment Succeeded]
export type UploadInvestmentTemplateSucceededType = {
  type: typeof actionTypes.UPLOAD_INVESTMENT_TEMPLATE_SUCCEEDED;
  result: UploadInvestmentTemplateResponse;
};

export const UploadInvestmentTemplateSucceeded = (result: UploadInvestmentTemplateResponse): UploadInvestmentTemplateSucceededType => ({
  type: actionTypes.UPLOAD_INVESTMENT_TEMPLATE_SUCCEEDED,
  result,
});

//#endregion [Upload Investment Succeeded]

//#region [Upload Investment Failed]
export type UploadInvestmentTemplateFailedType = {
  type: typeof actionTypes.UPLOAD_INVESTMENT_TEMPLATE_FAILED;
  error?: string;
};

export const UploadInvestmentTemplateFailed = (error?: string): UploadInvestmentTemplateFailedType => ({
  type: actionTypes.UPLOAD_INVESTMENT_TEMPLATE_FAILED,
  error,
});
//#endregion [Upload Investment Failed]

// =================================== Check Investment Details Exist ================================================
//#region [Check Investment Requested]
export type CheckInvestmentDetailsExistRequestedType = {
  type: typeof actionTypes.CHECK_INVESTMENT_DETAILS_EXIST_REQUESTED;
  InvestmentId: number;
  MisDate: string;
  typeCheck: string;
  callback?: (success: boolean, message?: string) => void;
};

export const CheckInvestmentDetailsExistRequested = (
  InvestmentId: number,
  MisDate: string,
  typeCheck: string,
  callback?: (success: boolean, message?: string) => void,
): CheckInvestmentDetailsExistRequestedType => ({
  type: actionTypes.CHECK_INVESTMENT_DETAILS_EXIST_REQUESTED,
  InvestmentId,
  typeCheck,
  MisDate,
  callback,
});
//#endregion [Requested]

//#region [Check Investment Succeeded]
export type CheckInvestmentDetailsExistSucceededType = {
  type: typeof actionTypes.CHECK_INVESTMENT_DETAILS_EXIST_SUCCEEDED;
  result: CheckInvestmentDetailsExistData;
};

export const CheckInvestmentDetailsExistSucceeded = (result: CheckInvestmentDetailsExistData): CheckInvestmentDetailsExistSucceededType => ({
  type: actionTypes.CHECK_INVESTMENT_DETAILS_EXIST_SUCCEEDED,
  result,
});

//#endregion [Succeeded]

//#region [Check Investment Failed]
export type CheckInvestmentDetailsExistFailedType = {
  type: typeof actionTypes.CHECK_INVESTMENT_DETAILS_EXIST_FAILED;
  error?: string;
};

export const CheckInvestmentDetailsExistFailed = (error?: string): CheckInvestmentDetailsExistFailedType => ({
  type: actionTypes.CHECK_INVESTMENT_DETAILS_EXIST_FAILED,
  error,
});
//#endregion [Failed]

// =================================== Update Investment Stattus ================================================
//#region [Update Requested]
export type UpdateInvestmentStatusRequestedType = {
  type: typeof actionTypes.UPDATE_INVESTMENT_STATUS_REQUESTED;
  payload: UpdateInvestmentStatusPayload;
  callback?: (success: boolean, message?: string) => void;
};

export const UpdateInvestmentStatusRequested = (
  payload: UpdateInvestmentStatusPayload,
  callback?: (success: boolean, message?: string) => void,
): UpdateInvestmentStatusRequestedType => ({
  type: actionTypes.UPDATE_INVESTMENT_STATUS_REQUESTED,
  payload,
  callback,
});
//#endregion [Update Requested]

//#region [Update Succeeded]
export type UpdateInvestmentStatusSucceededType = {
  type: typeof actionTypes.UPDATE_INVESTMENT_STATUS_SUCCEEDED;
  result: UpdateInvestmentStatusResponse;
};

export const UpdateInvestmentStatusSucceeded = (result: UpdateInvestmentStatusResponse): UpdateInvestmentStatusSucceededType => ({
  type: actionTypes.UPDATE_INVESTMENT_STATUS_SUCCEEDED,
  result,
});

//#endregion [Update Succeeded]

//#region [Update Failed]
export type UpdateInvestmentStatusFailedType = {
  type: typeof actionTypes.UPDATE_INVESTMENT_STATUS_FAILED;
  error?: string;
};

export const UpdateInvestmentStatusFailed = (error?: string): UpdateInvestmentStatusFailedType => ({
  type: actionTypes.UPDATE_INVESTMENT_STATUS_FAILED,
  error,
});
//#endregion [Update Failed]

// =================================== Delete Investment Details ================================================
//#region [Delete Requested]
export type DeleteInvestmentDetailsRequestedType = {
  type: typeof actionTypes.DELETE_INVESTMENT_DETAILS_REQUESTED;
  payload: DeleteInvestmentDetailsPayload;
  callback?: (success: boolean, message?: string) => void;
};

export const DeleteInvestmentDetailsRequested = (
  payload: DeleteInvestmentDetailsPayload,
  callback?: (success: boolean, message?: string) => void,
): DeleteInvestmentDetailsRequestedType => ({
  type: actionTypes.DELETE_INVESTMENT_DETAILS_REQUESTED,
  payload,
  callback,
});
//#endregion [Delete Requested]

//#region [Delete Succeeded]
export type DeleteInvestmentDetailsSucceededType = {
  type: typeof actionTypes.DELETE_INVESTMENT_DETAILS_SUCCEEDED;
  result: DeleteInvestmentDetailsResponse;
};

export const DeleteInvestmentDetailsSucceeded = (result: DeleteInvestmentDetailsResponse): DeleteInvestmentDetailsSucceededType => ({
  type: actionTypes.DELETE_INVESTMENT_DETAILS_SUCCEEDED,
  result,
});

//#endregion [Delete Succeeded]

//#region [Delete Failed]
export type DeleteInvestmentDetailsFailedType = {
  type: typeof actionTypes.DELETE_INVESTMENT_DETAILS_FAILED;
  error?: string;
};

export const DeleteInvestmentDetailsFailed = (error?: string): DeleteInvestmentDetailsFailedType => ({
  type: actionTypes.DELETE_INVESTMENT_DETAILS_FAILED,
  error,
});
//#endregion [Delete Failed]

// ===================================Get Investment List================================================
//#region [Investment List Requested]
export type GetInvestmentListDataRequestedType = {
  type: typeof actionTypes.GET_INVESTMENT_LIST_REQUESTED;
  ClientId: number;
  CreatedBy: string;
  fundid: number;
  developerid: number;
};

export const GetInvestmentListDataRequested = (
  ClientId: number,
  CreatedBy: string,
  fundid: number,
  developerid: number,
): GetInvestmentListDataRequestedType => ({
  type: actionTypes.GET_INVESTMENT_LIST_REQUESTED,
  ClientId,
  CreatedBy,
  fundid,
  developerid,
});
//#endregion

//#region [Investment  List Succeeded]
export type GetInvestmentListDataSucceededType = {
  type: typeof actionTypes.GET_INVESTMENT_LIST_SUCCEEDED;
  result: InvestmentListData[];
};

export const GetInvestmentListDataSucceeded = (result: InvestmentListData[]): GetInvestmentListDataSucceededType => ({
  type: actionTypes.GET_INVESTMENT_LIST_SUCCEEDED,
  result,
});

//#endregion

//#region [Investment List Failed]
export type GetInvestmentListDataFailedType = {
  type: typeof actionTypes.GET_INVESTMENT_LIST_FAILED;
  error?: string;
};

export const GetInvestmentListDataFailed = (error?: string): GetInvestmentListDataFailedType => ({
  type: actionTypes.GET_INVESTMENT_LIST_FAILED,
  error,
});
//#endregion

// ===================================Get Investment Funds================================================
//#region [Investment List Requested]
export type GetInvestmentFundsRequestedType = {
  type: typeof actionTypes.GET_INVESTMENT_FUNDS_REQUESTED;
  ClientId: number;
  CreatedBy: string;
};

export const GetInvestmentFundsRequested = (ClientId: number, CreatedBy: string): GetInvestmentFundsRequestedType => ({
  type: actionTypes.GET_INVESTMENT_FUNDS_REQUESTED,
  ClientId,
  CreatedBy,
});
//#endregion

//#region [Investment  List Succeeded]
export type GetInvestmentFundsSucceededType = {
  type: typeof actionTypes.GET_INVESTMENT_FUNDS_SUCCEEDED;
  result: InvestmentFundsData[];
};

export const GetInvestmentFundsSucceeded = (result: InvestmentFundsData[]): GetInvestmentFundsSucceededType => ({
  type: actionTypes.GET_INVESTMENT_FUNDS_SUCCEEDED,
  result,
});

//#endregion

//#region [Investment List Failed]
export type GetInvestmentFundsFailedType = {
  type: typeof actionTypes.GET_INVESTMENT_FUNDS_FAILED;
  error?: string;
};

export const GetInvestmentFundsFailed = (error?: string): GetInvestmentFundsFailedType => ({
  type: actionTypes.GET_INVESTMENT_FUNDS_FAILED,
  error,
});
//#endregion

// ===================================Get Investment developer================================================
//#region [Investment List Requested]
export type GetInvestmentDeveloperRequestedType = {
  type: typeof actionTypes.GET_INVESTMENT_DEVELOPER_REQUESTED;
  ClientId: number;
  CreatedBy: string;
};

export const GetInvestmentDeveloperRequested = (ClientId: number, CreatedBy: string): GetInvestmentDeveloperRequestedType => ({
  type: actionTypes.GET_INVESTMENT_DEVELOPER_REQUESTED,
  ClientId,
  CreatedBy,
});
//#endregion

//#region [Investment  List Succeeded]
export type GetInvestmentDeveloperSucceededType = {
  type: typeof actionTypes.GET_INVESTMENT_DEVELOPER_SUCCEEDED;
  result: InvestmentDeveloperData[];
};

export const GetInvestmentDeveloperSucceeded = (result: InvestmentDeveloperData[]): GetInvestmentDeveloperSucceededType => ({
  type: actionTypes.GET_INVESTMENT_DEVELOPER_SUCCEEDED,
  result,
});

//#endregion

//#region [Investment List Failed]
export type GetInvestmentDeveloperFailedType = {
  type: typeof actionTypes.GET_INVESTMENT_DEVELOPER_FAILED;
  error?: string;
};

export const GetInvestmentDeveloperFailed = (error?: string): GetInvestmentDeveloperFailedType => ({
  type: actionTypes.GET_INVESTMENT_DEVELOPER_FAILED,
  error,
});
//#endregion

// =================================== Can Setup Investment ================================================
//#region [Can Setup Requested]
export type CanSetupInvestmentRequestedType = {
  type: typeof actionTypes.CAN_SETUP_INVESTMENT_REQUESTED;
  InvestmentId: number;
  callback?: (success: boolean, message?: string) => void;
};

export const CanSetupInvestmentRequested = (
  InvestmentId: number,
  callback?: (success: boolean, message?: string) => void,
): CanSetupInvestmentRequestedType => ({
  type: actionTypes.CAN_SETUP_INVESTMENT_REQUESTED,
  InvestmentId,
  callback,
});
//#endregion [Requested]

//#region [Can Setup Succeeded]
export type CanSetupInvestmentSucceededType = {
  type: typeof actionTypes.CAN_SETUP_INVESTMENT_SUCCEEDED;
  result: CanSetupInvestmentData;
};

export const CanSetupInvestmentSucceeded = (result: CanSetupInvestmentData): CanSetupInvestmentSucceededType => ({
  type: actionTypes.CAN_SETUP_INVESTMENT_SUCCEEDED,
  result,
});

//#endregion [Succeeded]

//#region [Can Setup Failed]
export type CanSetupInvestmentFailedType = {
  type: typeof actionTypes.CAN_SETUP_INVESTMENT_FAILED;
  error?: string;
};

export const CanSetupInvestmentFailed = (error?: string): CanSetupInvestmentFailedType => ({
  type: actionTypes.CAN_SETUP_INVESTMENT_FAILED,
  error,
});
//#endregion [Can Setup Failed]

// =================================== Upload Investment-Setup Template ================================================
//#region [Upload Investment-Setup Requested]
export type UploadInvestmentSetupTemplateRequestedType = {
  type: typeof actionTypes.UPLOAD_INVESTMENT_SETUP_TEMPLATE_REQUESTED;
  payload: UploadInvestmentSetupTemplatePayload;
  callback?: (success: boolean, message?: string) => void;
};

export const UploadInvestmentSetupTemplateRequested = (
  payload: UploadInvestmentSetupTemplatePayload,
  callback?: (success: boolean, message?: string) => void,
): UploadInvestmentSetupTemplateRequestedType => ({
  type: actionTypes.UPLOAD_INVESTMENT_SETUP_TEMPLATE_REQUESTED,
  payload,
  callback,
});
//#endregion [Upload Investment-Setup Requested]

//#region [Upload Investment-Setup Succeeded]
export type UploadInvestmentSetupTemplateSucceededType = {
  type: typeof actionTypes.UPLOAD_INVESTMENT_SETUP_TEMPLATE_SUCCEEDED;
  result: UploadInvestmentSetupTemplateResponse;
};

export const UploadInvestmentSetupTemplateSucceeded = (result: UploadInvestmentSetupTemplateResponse): UploadInvestmentSetupTemplateSucceededType => ({
  type: actionTypes.UPLOAD_INVESTMENT_SETUP_TEMPLATE_SUCCEEDED,
  result,
});

//#endregion [Upload Investment-Setup Succeeded]

//#region [Upload Investment-Setup Failed]
export type UploadInvestmentSetupTemplateFailedType = {
  type: typeof actionTypes.UPLOAD_INVESTMENT_SETUP_TEMPLATE_FAILED;
  error?: string;
};

export const UploadInvestmentSetupTemplateFailed = (error?: string): UploadInvestmentSetupTemplateFailedType => ({
  type: actionTypes.UPLOAD_INVESTMENT_SETUP_TEMPLATE_FAILED,
  error,
});
//#endregion [Upload Investment-Setup Failed]

//#region [set investment]
export type SetInvestmentType = {
  type: typeof actionTypes.SET_INVESTMENT;
  result: InvestmentListData;
};

export const setInvestment = (result: InvestmentListData): SetInvestmentType => ({
  type: actionTypes.SET_INVESTMENT,
  result,
});
//#endregion

//#region [reset investment]
export type ReSetInvestmentType = {
  type: typeof actionTypes.RESET_INVESTMENT;
};

export const resetInvestment = (): ReSetInvestmentType => ({
  type: actionTypes.RESET_INVESTMENT,
});
//#endregion

export type InvestmentActions =
  // Investment past history List
  | GetInvestmentPastHistoryRequestedType
  | GetInvestmentPastHistorySucceededType
  | GetInvestmentPastHistoryFailedType

  //is summary setup
  | IsInvestmentSetupRequestedType
  | IsInvestmentSetupSucceededType
  | IsInvestmentSetupFailedType

  // download Investment template
  | DownloadInvestmentTemplateRequestedType
  | DownloadInvestmentTemplateSucceededType
  | DownloadInvestmentTemplateFailedType

  // upload Investment template
  | UploadInvestmentTemplateRequestedType
  | UploadInvestmentTemplateSucceededType
  | UploadInvestmentTemplateFailedType

  // check Investment details exist
  | CheckInvestmentDetailsExistRequestedType
  | CheckInvestmentDetailsExistSucceededType
  | CheckInvestmentDetailsExistFailedType

  // update Investment status
  | UpdateInvestmentStatusRequestedType
  | UpdateInvestmentStatusSucceededType
  | UpdateInvestmentStatusFailedType

  // delete project summary details
  | DeleteInvestmentDetailsRequestedType
  | DeleteInvestmentDetailsSucceededType
  | DeleteInvestmentDetailsFailedType

  //Pending Update List
  | CanSetupInvestmentRequestedType
  | CanSetupInvestmentSucceededType
  | CanSetupInvestmentFailedType

  //Pending Update List
  | GetInvestmentPendingUpdateRequestedType
  | GetInvestmentPendingUpdateSucceededType
  | GetInvestmentPendingUpdateFailedType

  //Investment List
  | GetInvestmentListDataRequestedType
  | GetInvestmentListDataSucceededType
  | GetInvestmentListDataFailedType
  //Investment Funds
  | GetInvestmentFundsRequestedType
  | GetInvestmentFundsSucceededType
  | GetInvestmentFundsFailedType

  //Investment Developer
  | GetInvestmentDeveloperRequestedType
  | GetInvestmentDeveloperSucceededType
  | GetInvestmentDeveloperFailedType

  // upload Investment-Setup template
  | UploadInvestmentSetupTemplateRequestedType
  | UploadInvestmentSetupTemplateSucceededType
  | UploadInvestmentSetupTemplateFailedType

  //set investment and reset
  | ReSetInvestmentType
  | SetInvestmentType;
