import {
  ApprovedDataType,
  CancelledDataType,
  GetDecisionDataResponse,
  HoldDataType,
  NOCDocumentReturnType,
  NOCPaymentDetailsResponse,
  NOCProjectDetails,
  NOCRemarksPayload,
  NOCRemarksReturnType,
  NOCRequestRemarks,
  NOCRequestRemarksPayload,
  NOCRequestTimelinePayload,
  NocDeveloperDocRef,
  NocDeveloperDocRefPayload,
  NocRequestChangeHistory,
  NocRequestTimeline,
  NocSendBackUsers,
  RejectedDataType,
  SendAuthorizeNocResponse,
  nocAuthororizeRequest,
} from "./dataTypes";
import * as types from "./types";

//------------------------------------------- Get Rejected NOC List -------------------------------------------//

export type GetRejectedNOCListRequested = {
  type: typeof types.GET_NOC_REJECT_REQUESTED;
  nocProjectId: number;
  userEmail: string;
};

export const requestRejectedNOCList = (nocProjectId: number, userEmail: string): GetRejectedNOCListRequested => ({
  type: types.GET_NOC_REJECT_REQUESTED,
  nocProjectId,
  userEmail,
});

export type GetRejectedNOCListSuccessful = {
  type: typeof types.GET_NOC_REJECT_SUCCESSFUL;
  data: RejectedDataType[];
};

export const rejectedNocListSuccessful = (data: RejectedDataType[]): GetRejectedNOCListSuccessful => ({
  type: types.GET_NOC_REJECT_SUCCESSFUL,
  data,
});

export type GetRejectedNOCListFailed = {
  type: typeof types.GET_NOC_REJECT_FAILED;
};

export const rejectedNocListFuccessful = (): GetRejectedNOCListFailed => ({
  type: types.GET_NOC_REJECT_FAILED,
});

//------------------------------------------- Get Pending NOC List -------------------------------------------//

export type GetPendingNOCListRequested = {
  type: typeof types.GET_NOC_PENDING_REQUESTED;
  projectId: number;
  showMineOnly: number;
  userEmail: string;
};

export const getPendingNOCListRequested = (projectId: number, showMineOnly: number, userEmail: string): GetPendingNOCListRequested => ({
  type: types.GET_NOC_PENDING_REQUESTED,
  projectId,
  showMineOnly,
  userEmail,
});

export type GetPendingNOCListSuccessful = {
  type: typeof types.GET_NOC_PENDING_SUCCESSFUL;
  data: any;
};

export const getPendingNOCListSuccessful = (data: any): GetPendingNOCListSuccessful => ({
  type: types.GET_NOC_PENDING_SUCCESSFUL,
  data,
});

export type GetPendingNOCListFailed = {
  type: typeof types.GET_NOC_PENDING_FAILED;
};

export const getPendingNOCListFailed = (): GetPendingNOCListFailed => ({
  type: types.GET_NOC_PENDING_FAILED,
});

//------------------------------------------- Get Approved NOC List -------------------------------------------//

export type GetApprovedNOCListRequested = {
  type: typeof types.GET_NOC_APPROVED_REQUESTED;
  nocProjectId: number;
  userEmail: string;
};

export const getApprovedNOCListRequested = (nocProjectId: number, userEmail: string): GetApprovedNOCListRequested => ({
  type: types.GET_NOC_APPROVED_REQUESTED,
  nocProjectId,
  userEmail,
});

export type GetApprovedNOCListSuccessful = {
  type: typeof types.GET_NOC_APPROVED_SUCCESSFUL;
  data: ApprovedDataType[];
};

export const getApprovedNOCListSuccessful = (data: ApprovedDataType[]): GetApprovedNOCListSuccessful => ({
  type: types.GET_NOC_APPROVED_SUCCESSFUL,
  data,
});

export type GetApprovedNOCListFailed = {
  type: typeof types.GET_NOC_APPROVED_FAILED;
};

export const getApprovedNOCListFailed = (): GetApprovedNOCListFailed => ({
  type: types.GET_NOC_APPROVED_FAILED,
});

//------------------------------------------- Get Cancelled NOC List -------------------------------------------//

export type GetCancelledNOCListRequested = {
  type: typeof types.GET_NOC_CANCELLED_REQUESTED;
  nocProjectId: number;
  userEmail: string;
};

export const getCancelledNOCListRequested = (nocProjectId: number, userEmail: string): GetCancelledNOCListRequested => ({
  type: types.GET_NOC_CANCELLED_REQUESTED,
  nocProjectId,
  userEmail,
});

export type GetCancelledNOCListSuccessful = {
  type: typeof types.GET_NOC_CANCELLED_SUCCESSFUL;
  data: CancelledDataType[];
};

export const getCancelledNOCListSuccessful = (data: CancelledDataType[]): GetCancelledNOCListSuccessful => ({
  type: types.GET_NOC_CANCELLED_SUCCESSFUL,
  data,
});

export type GetCancelledNOCListFailed = {
  type: typeof types.GET_NOC_CANCELLED_FAILED;
};

export const getCancelledNOCListFailed = (): GetCancelledNOCListFailed => ({
  type: types.GET_NOC_CANCELLED_FAILED,
});

//------------------------------------------- NOC Project Details Action -------------------------------------------//

export type GetNOCProjectDetailsRequested = {
  type: typeof types.GET_NOC_REQUEST_PROJECT_DETAILS_REQUESTED;
  nocProjectId: number;
  userEmail: string;
};

export const getNOCProjectDetailsRequested = (nocProjectId: number, userEmail: string): GetNOCProjectDetailsRequested => ({
  type: types.GET_NOC_REQUEST_PROJECT_DETAILS_REQUESTED,
  nocProjectId,
  userEmail,
});

export type GetNOCProjectDetailsSuccessful = {
  type: typeof types.GET_NOC_REQUEST_PROJECT_DETAILS_SUCCESSFUL;
  data: NOCProjectDetails[];
};

export const getNOCProjectDetailsSuccessful = (data: NOCProjectDetails[]): GetNOCProjectDetailsSuccessful => ({
  type: types.GET_NOC_REQUEST_PROJECT_DETAILS_SUCCESSFUL,
  data,
});

export type GetNOCProjectDetailsFailed = {
  type: typeof types.GET_NOC_REQUEST_PROJECT_DETAILS_FAILED;
};

export const getNOCProjectDetailsFailed = (): GetNOCProjectDetailsFailed => ({
  type: types.GET_NOC_REQUEST_PROJECT_DETAILS_FAILED,
});

//------------------------------------------- Hold NOC Action -------------------------------------------//

export type GetHoldNOCRequested = {
  type: typeof types.GET_HOLD_NOC_REQUESTED;
  nocProjectId: number;
  showMineOnly: number;
  userEmail: string;
};

export const getHoldNOCRequested = (nocProjectId: number, showMineOnly: number, userEmail: string): GetHoldNOCRequested => ({
  type: types.GET_HOLD_NOC_REQUESTED,
  nocProjectId,
  showMineOnly,
  userEmail,
});

export type GetHoldNOCSuccessful = {
  type: typeof types.GET_HOLD_NOC_SUCCESSFUL;
  data: HoldDataType[];
};

export const getHoldNOCSuccessful = (data: HoldDataType[]): GetHoldNOCSuccessful => ({
  type: types.GET_HOLD_NOC_SUCCESSFUL,
  data,
});

export type GetHoldNOCFailed = {
  type: typeof types.GET_HOLD_NOC_FAILED;
};

export const getHoldNOCFailed = (): GetHoldNOCFailed => ({
  type: types.GET_HOLD_NOC_FAILED,
});

//------------------------------------------- Download Rejected NOC Action -------------------------------------------//

export type DownloadRejectedNOCRequested = {
  type: typeof types.DOWNLOAD_REJECTED_NOC_REQUESTED;
  nocProjectId: number;
  userEmail: string;
  onSuccessCallback?: (success: boolean) => void;
};

export const downloadRejectedNOCRequested = (
  nocProjectId: number,
  userEmail: string,
  onSuccessCallback?: (success: boolean) => void,
): DownloadRejectedNOCRequested => ({
  type: types.DOWNLOAD_REJECTED_NOC_REQUESTED,
  nocProjectId,
  userEmail,
  onSuccessCallback,
});

export type DownloadRejectedNOCSuccessful = {
  type: typeof types.DOWNLOAD_REJECTED_NOC_SUCCESSFUL;
  data: any;
};

export const downloadRejectedNOCSuccessful = (data: any): DownloadRejectedNOCSuccessful => ({
  type: types.DOWNLOAD_REJECTED_NOC_SUCCESSFUL,
  data,
});

export type DownloadRejectedNOCFailed = {
  type: typeof types.DOWNLOAD_REJECTED_NOC_FAILED;
};

export const downloadRejectedNOCFailed = (): DownloadRejectedNOCFailed => ({
  type: types.DOWNLOAD_REJECTED_NOC_FAILED,
});

//------------------------------------------- Download Pending NOC Action -------------------------------------------//

export type DownloadPendingNOCRequested = {
  type: typeof types.DOWNLOAD_PENDING_NOC_REQUESTED;
  projectId: number;
  showMineOnly: number;
  userEmail: string;
  onSuccessCallback?: (success: boolean) => void;
};

export const downloadPendingNOCRequested = (
  projectId: number,
  showMineOnly: number,
  userEmail: string,
  onSuccessCallback?: (success: boolean) => void,
): DownloadPendingNOCRequested => ({
  type: types.DOWNLOAD_PENDING_NOC_REQUESTED,
  projectId,
  showMineOnly,
  userEmail,
  onSuccessCallback,
});

export type DownloadPendingNOCSuccessful = {
  type: typeof types.DOWNLOAD_PENDING_NOC_SUCCESSFUL;
  data: any;
};

export const downloadPendingNOCSuccessful = (data: any): DownloadPendingNOCSuccessful => ({
  type: types.DOWNLOAD_PENDING_NOC_SUCCESSFUL,
  data,
});

export type DownloadPendingNOCFailed = {
  type: typeof types.DOWNLOAD_PENDING_NOC_FAILED;
};

export const downloadPendingNOCFailed = (): DownloadPendingNOCFailed => ({
  type: types.DOWNLOAD_PENDING_NOC_FAILED,
});

//------------------------------------------- Download Approved NOC Action -------------------------------------------//

export type DownloadApprovedNOCRequested = {
  type: typeof types.DOWNLOAD_APPROVED_NOC_REQUESTED;
  nocProjectId: number;
  userEmail: string;
  onSuccessCallback?: (success: boolean) => void;
};

export const downloadApprovedNOCRequested = (
  nocProjectId: number,
  userEmail: string,
  onSuccessCallback?: (success: boolean) => void,
): DownloadApprovedNOCRequested => ({
  type: types.DOWNLOAD_APPROVED_NOC_REQUESTED,
  nocProjectId,
  userEmail,
  onSuccessCallback,
});

export type DownloadApprovedNOCSuccessful = {
  type: typeof types.DOWNLOAD_APPROVED_NOC_SUCCESSFUL;
  data: any;
};

export const downloadApprovedNOCSuccessful = (data: any): DownloadApprovedNOCSuccessful => ({
  type: types.DOWNLOAD_APPROVED_NOC_SUCCESSFUL,
  data,
});

export type DownloadApprovedNOCFailed = {
  type: typeof types.DOWNLOAD_APPROVED_NOC_FAILED;
};

export const downloadApprovedNOCFailed = (): DownloadApprovedNOCFailed => ({
  type: types.DOWNLOAD_APPROVED_NOC_FAILED,
});

//------------------------------------------- Download Cancelled NOC Action -------------------------------------------//

export type DownloadCancelledNOCRequested = {
  type: typeof types.DOWNLOAD_CANCELLED_NOC_REQUESTED;
  nocProjectId: number;
  userEmail: string;
  onSuccessCallback?: (success: boolean) => void;
};

export const downloadCancelledNOCRequested = (
  nocProjectId: number,
  userEmail: string,
  onSuccessCallback?: (success: boolean) => void,
): DownloadCancelledNOCRequested => ({
  type: types.DOWNLOAD_CANCELLED_NOC_REQUESTED,
  nocProjectId,
  userEmail,
  onSuccessCallback,
});

export type DownloadCancelledNOCSuccessful = {
  type: typeof types.DOWNLOAD_CANCELLED_NOC_SUCCESSFUL;
  data: any;
};

export const downloadCancelledNOCSuccessful = (data: any): DownloadCancelledNOCSuccessful => ({
  type: types.DOWNLOAD_CANCELLED_NOC_SUCCESSFUL,
  data,
});

export type DownloadCancelledNOCFailed = {
  type: typeof types.DOWNLOAD_CANCELLED_NOC_FAILED;
};

export const downloadCancelledNOCFailed = (): DownloadCancelledNOCFailed => ({
  type: types.DOWNLOAD_CANCELLED_NOC_FAILED,
});

//------------------------------------------- Download Hold NOC Action -------------------------------------------//

export type DownloadHoldNOCRequested = {
  type: typeof types.DOWNLOAD_HOLD_NOC_REQUESTED;
  nocProjectId: number;
  showMineOnly: number;
  userEmail: string;
  onSuccessCallback?: (success: boolean) => void;
};

export const downloadHoldNOCRequested = (
  nocProjectId: number,
  showMineOnly: number,
  userEmail: string,
  onSuccessCallback?: (success: boolean) => void,
): DownloadHoldNOCRequested => ({
  type: types.DOWNLOAD_HOLD_NOC_REQUESTED,
  nocProjectId,
  showMineOnly,
  userEmail,
  onSuccessCallback,
});

export type DownloadHoldNOCSuccessful = {
  type: typeof types.DOWNLOAD_HOLD_NOC_SUCCESSFUL;
  data: any;
};

export const downloadHoldNOCSuccessful = (data: any): DownloadHoldNOCSuccessful => ({
  type: types.DOWNLOAD_HOLD_NOC_SUCCESSFUL,
  data,
});

export type DownloadHoldNOCFailed = {
  type: typeof types.DOWNLOAD_HOLD_NOC_FAILED;
};

export const downloadHoldNOCFailed = (): DownloadHoldNOCFailed => ({
  type: types.DOWNLOAD_HOLD_NOC_FAILED,
});

//------------------------------------------- Download NOC Summary Action -------------------------------------------//

export type DownloadNOCSummaryRequested = {
  type: typeof types.DOWNLOAD_NOC_SUMMARY_REQUESTED;
  nocProjectId: number;
  reAssetId: number;
};

export const downloadNOCSummaryRequested = (nocProjectId: number, reAssetId: number): DownloadNOCSummaryRequested => ({
  type: types.DOWNLOAD_NOC_SUMMARY_REQUESTED,
  nocProjectId,
  reAssetId,
});

export type DownloadNOCSummarySuccessful = {
  type: typeof types.DOWNLOAD_NOC_SUMMARY_SUCCESSFUL;
  data: any;
};

export const downloadNOCSummarySuccessful = (data: any): DownloadNOCSummarySuccessful => ({
  type: types.DOWNLOAD_NOC_SUMMARY_SUCCESSFUL,
  data,
});

export type DownloadNOCSummaryFailed = {
  type: typeof types.DOWNLOAD_NOC_SUMMARY_FAILED;
};

export const downloadNOCSummaryFailed = (): DownloadNOCSummaryFailed => ({
  type: types.DOWNLOAD_NOC_SUMMARY_FAILED,
});

//------------------------------------------- NOC Manage Request Action -------------------------------------------//

export type GetNOCPaymentDetailsRequested = {
  type: typeof types.GET_NOC_PAYMENT_DETAILS_REQUESTED;
  nocProjectId: number;
};

export const getNOCPaymentDetailsRequested = (nocProjectId: number): GetNOCPaymentDetailsRequested => ({
  type: types.GET_NOC_PAYMENT_DETAILS_REQUESTED,
  nocProjectId,
});

export type GetNOCPaymentDetailsSuccessful = {
  type: typeof types.GET_NOC_PAYMENT_DETAILS_SUCCESSFUL;
  data: NOCPaymentDetailsResponse[];
};

export const getNOCPaymentDetailsSuccessful = (data: NOCPaymentDetailsResponse[]): GetNOCPaymentDetailsSuccessful => ({
  type: types.GET_NOC_PAYMENT_DETAILS_SUCCESSFUL,
  data,
});

export type GetNOCPaymentDetailsFailed = {
  type: typeof types.GET_NOC_PAYMENT_DETAILS_FAILED;
};

export const getNOCPaymentDetailsFailed = (): GetNOCPaymentDetailsFailed => ({
  type: types.GET_NOC_PAYMENT_DETAILS_FAILED,
});

//------------------------------------------- Submit NOC Payment Action -------------------------------------------//

export type SubmitNOCPaymentRequested = {
  type: typeof types.SUBMIT_NOC_PAYMENT_REQUESTED;
  nocProjectId: number;
  status: "Approve" | "Reject";
  onSuccessCallback?: (success: boolean) => void;
};

export const submitNOCPaymentRequested = (
  nocProjectId: number,
  status: "Approve" | "Reject",
  onSuccessCallback?: (success: boolean) => void,
): SubmitNOCPaymentRequested => ({
  type: types.SUBMIT_NOC_PAYMENT_REQUESTED,
  nocProjectId,
  status,
  onSuccessCallback,
});

export type SubmitNOCPaymentSuccessful = {
  type: typeof types.SUBMIT_NOC_PAYMENT_SUCCESSFUL;
  data: any;
};

export const submitNOCPaymentSuccessful = (data: any): SubmitNOCPaymentSuccessful => ({
  type: types.SUBMIT_NOC_PAYMENT_SUCCESSFUL,
  data,
});

export type SubmitNOCPaymentFailed = {
  type: typeof types.SUBMIT_NOC_PAYMENT_FAILED;
};

export const submitNOCPaymentFailed = (): SubmitNOCPaymentFailed => ({
  type: types.SUBMIT_NOC_PAYMENT_FAILED,
});

//------------------------------------------- Get NOC Remarks Action -------------------------------------------//

export type GetNOCRemarksRequested = {
  type: typeof types.GET_NOC_REMARKS_REQUESTED;
  nocProjectId: number;
};

export const getNOCRemarksRequested = (nocProjectId: number): GetNOCRemarksRequested => ({
  type: types.GET_NOC_REMARKS_REQUESTED,
  nocProjectId,
});

export type GetNOCRemarksSuccessful = {
  type: typeof types.GET_NOC_REMARKS_SUCCESSFUL;
  data: NOCRemarksReturnType[];
};

export const getNOCRemarksSuccessful = (data: NOCRemarksReturnType[]): GetNOCRemarksSuccessful => ({
  type: types.GET_NOC_REMARKS_SUCCESSFUL,
  data,
});

export type GetNOCRemarksFailed = {
  type: typeof types.GET_NOC_REMARKS_FAILED;
};

export const getNOCRemarksFailed = (): GetNOCRemarksFailed => ({
  type: types.GET_NOC_REMARKS_FAILED,
});

//------------------------------------------- Submit NOC Remarks Action -------------------------------------------//

export type SubmitNOCRemarksRequested = {
  type: typeof types.SUBMIT_NOC_REMARKS_REQUESTED;
  payload: NOCRemarksPayload;
  onSuccessCallback?: (success: boolean) => void;
};

export const submitNOCRemarksRequested = (payload: NOCRemarksPayload, onSuccessCallback?: (success: boolean) => void): SubmitNOCRemarksRequested => ({
  type: types.SUBMIT_NOC_REMARKS_REQUESTED,
  payload,
  onSuccessCallback,
});

export type SubmitNOCRemarksSuccessful = {
  type: typeof types.SUBMIT_NOC_REMARKS_SUCCESSFUL;
  data: any;
};

export const submitNOCRemarksSuccessful = (data: any): SubmitNOCRemarksSuccessful => ({
  type: types.SUBMIT_NOC_REMARKS_SUCCESSFUL,
  data,
});

export type SubmitNOCRemarksFailed = {
  type: typeof types.SUBMIT_NOC_REMARKS_FAILED;
};

export const submitNOCRemarksFailed = (): SubmitNOCRemarksFailed => ({
  type: types.SUBMIT_NOC_REMARKS_FAILED,
});

//------------------------------------------- Export Action Types -------------------------------------------//

export type GetNOCDocumentsRequested = {
  type: typeof types.GET_NOC_DOCUMENTS_REQUESTED;
  nocProjectId: number;
};

export const getNOCDocumentsRequested = (nocProjectId: number): GetNOCDocumentsRequested => ({
  type: types.GET_NOC_DOCUMENTS_REQUESTED,
  nocProjectId,
});

export type GetNOCDocumentsSuccessful = {
  type: typeof types.GET_NOC_DOCUMENTS_SUCCESSFUL;
  data: NOCDocumentReturnType[];
};

export const getNOCDocumentsSuccessful = (data: NOCDocumentReturnType[]): GetNOCDocumentsSuccessful => ({
  type: types.GET_NOC_DOCUMENTS_SUCCESSFUL,
  data,
});

export type GetNOCDocumentsFailed = {
  type: typeof types.GET_NOC_DOCUMENTS_FAILED;
};

export const getNOCDocumentsFailed = (): GetNOCDocumentsFailed => ({
  type: types.GET_NOC_DOCUMENTS_FAILED,
});

//------------------------------------------- NOC Decision Get api Action -------------------------------------------//

export type GetNOCDecisionRequested = {
  type: typeof types.GET_NOC_DECISION_DATA_REQUESTED;
  nocProjectId: number;
  email: string;
};

export const getNOCDecisionRequested = (nocProjectId: number, email: string): GetNOCDecisionRequested => ({
  type: types.GET_NOC_DECISION_DATA_REQUESTED,
  nocProjectId,
  email,
});

export type GetNOCDecisionSuccessful = {
  type: typeof types.GET_NOC_DECISION_DATA_SUCCESSFUL;
  data: GetDecisionDataResponse[];
};

export const getNOCDecisionSuccessful = (data: GetDecisionDataResponse[]): GetNOCDecisionSuccessful => ({
  type: types.GET_NOC_DECISION_DATA_SUCCESSFUL,
  data,
});

export type GetNOCDecisionFailed = {
  type: typeof types.GET_NOC_DECISION_DATA_FAILED;
};

export const getNOCDecisionFailed = (): GetNOCDecisionFailed => ({
  type: types.GET_NOC_DECISION_DATA_FAILED,
});

//------------------------------------------- Get Noc Price headers -------------------------------------------//

export type GetNocPriceHeadersRequested = {
  type: typeof types.GET_NOC_PRICE_HEADERS_REQUESTED;
  nocProjectId: number;
  salesId: number;
  nocRequestId: number;
};

export const getNocPriceHeadersRequested = (nocProjectId: number, salesId: number, nocRequestId: number): GetNocPriceHeadersRequested => ({
  type: types.GET_NOC_PRICE_HEADERS_REQUESTED,
  nocProjectId,
  salesId,
  nocRequestId,
});

export type GetNocPriceHeadersSuccessful = {
  type: typeof types.GET_NOC_PRICE_HEADERS_SUCCESSFUL;
  data: any;
};

export const getNocPriceHeadersSuccessful = (data: any): GetNocPriceHeadersSuccessful => ({
  type: types.GET_NOC_PRICE_HEADERS_SUCCESSFUL,
  data,
});

export type GetNocPriceHeadersFailed = {
  type: typeof types.GET_NOC_PRICE_HEADERS_FAILED;
};

export const getNocPriceHeadersFailed = (): GetNocPriceHeadersFailed => ({
  type: types.GET_NOC_PRICE_HEADERS_FAILED,
});

//------------------------------------------- NOC SEND BACK USERS Action -------------------------------------------//

export type GetSendBackUsersRequest = {
  type: typeof types.GET_SEND_BACK_USERS_REQUESTED;
  nocProjectId: number;
  nocrequestid: number;
  useremail: string;
};

export const getSendBackUsersRequested = (nocProjectId: number, nocrequestid: number, useremail: string): GetSendBackUsersRequest => ({
  type: types.GET_SEND_BACK_USERS_REQUESTED,
  nocProjectId,
  nocrequestid,
  useremail,
});

export type GetSendBackUsersSuccessful = {
  type: typeof types.GET_SEND_BACK_USERS_SUCCESSFUL;
  data: NocSendBackUsers[];
};

export const getSendBackUsersSuccessful = (data: NocSendBackUsers[]): GetSendBackUsersSuccessful => ({
  type: types.GET_SEND_BACK_USERS_SUCCESSFUL,
  data,
});

export type GetSendBackUsersFailed = {
  type: typeof types.GET_SEND_BACK_USERS_FAILED;
  error?: string;
};

export const getSendBackUsersFailed = (error?: string): GetSendBackUsersFailed => ({
  type: types.GET_SEND_BACK_USERS_FAILED,
  error,
});

//------------------------------------------- NOC LETTER Action -------------------------------------------//

export type GetNocLetterRequest = {
  type: typeof types.GET_NOC_LETTER_REQUESTED;
  nocProjectId: number;
  nocRequestId?: number;
  letterType: string;
  email: string;
  req?: string;
  sign?: File;
};

export const getNocLetterRequested = (
  nocProjectId: number,
  letterType: string,
  email: string,
  req?: string,
  nocRequestId?: number,
  sign?: File,
): GetNocLetterRequest => ({
  type: types.GET_NOC_LETTER_REQUESTED,
  nocProjectId,
  letterType,
  email,
  req,
  nocRequestId,
  sign,
});

export type GetNocLetterSuccessful = {
  type: typeof types.GET_NOC_LETTER_SUCCESSFUL;
};

export const getNocLetterSuccessful = (): GetNocLetterSuccessful => ({
  type: types.GET_NOC_LETTER_SUCCESSFUL,
});

export type GetNocLetterFailed = {
  type: typeof types.GET_NOC_LETTER_FAILED;
  error?: string;
};

export const getNocLetterFailed = (error?: string): GetNocLetterFailed => ({
  type: types.GET_NOC_LETTER_FAILED,
  error,
});

//------------------------------------------- NOC Authorize Action -------------------------------------------//

export type SendNocAuthorizeRequest = {
  type: typeof types.SEND_AUTHORIZE_NOC_REQUESTED;
  formData: nocAuthororizeRequest;
};

export const sendNocAuthorizeRequested = (formData: nocAuthororizeRequest): SendNocAuthorizeRequest => ({
  type: types.SEND_AUTHORIZE_NOC_REQUESTED,
  formData,
});

export type SendNocAuthorizeSuccessful = {
  type: typeof types.SEND_AUTHORIZE_NOC_SUCCESSFUL;
  data?: SendAuthorizeNocResponse;
};

export const sendNocAuthorizeSuccessful = (data?: SendAuthorizeNocResponse): SendNocAuthorizeSuccessful => ({
  type: types.SEND_AUTHORIZE_NOC_SUCCESSFUL,
  data,
});

export type SendNocAuthorizeFailed = {
  type: typeof types.SEND_AUTHORIZE_NOC_FAILED;
  error?: string;
};

export const sendNocAuthorizeFailed = (error?: string): SendNocAuthorizeFailed => ({
  type: types.SEND_AUTHORIZE_NOC_FAILED,
  error,
});

//#region [NOC authorized]
export type NewSendNocAuthorizeRequest = {
  type: typeof types.SEND_AUTHORIZE_NOC_REQUESTED_NEW;
  projectid?: number;
  requestid?: number;
  status?: string;
  callBack?: (success: boolean) => void;
};

export const newsendNocAuthorizeRequested = (
  projectid?: number,
  requestid?: number,
  status?: string,
  callBack?: (success: boolean) => void,
): NewSendNocAuthorizeRequest => ({
  type: types.SEND_AUTHORIZE_NOC_REQUESTED_NEW,
  projectid,
  requestid,
  status,
  callBack,
});

export type NewSendNocAuthorizeSuccessful = {
  type: typeof types.SEND_AUTHORIZE_NOC_SUCCESSFUL_NEW;
  data?: SendAuthorizeNocResponse;
};

export const newsendNocAuthorizeSuccessful = (data?: SendAuthorizeNocResponse): NewSendNocAuthorizeSuccessful => ({
  type: types.SEND_AUTHORIZE_NOC_SUCCESSFUL_NEW,
  data,
});

export type NewSendNocAuthorizeFailed = {
  type: typeof types.SEND_AUTHORIZE_NOC_FAILED_NEW;
  error?: string;
};

export const newsendNocAuthorizeFailed = (error?: string): NewSendNocAuthorizeFailed => ({
  type: types.SEND_AUTHORIZE_NOC_FAILED_NEW,
  error,
});

//#endregion

//------------------------------------------- GET NOC REQUEST REMARK Action -------------------------------------------//

export type GetNOCRequestRemarksRequest = {
  type: typeof types.GET_NOC_REQUEST_REMARKS_REQUESTED;
  payload: NOCRequestRemarksPayload;
};

export const getNOCRequestRemarksRequested = (payload: NOCRequestRemarksPayload): GetNOCRequestRemarksRequest => ({
  type: types.GET_NOC_REQUEST_REMARKS_REQUESTED,
  payload,
});

export type GetNOCRequestRemarksSuccessful = {
  type: typeof types.GET_NOC_REQUEST_REMARKS_SUCCESSFUL;
  data: NOCRequestRemarks[];
};

export const getNOCRequestRemarksSuccessful = (data: NOCRequestRemarks[]): GetNOCRequestRemarksSuccessful => ({
  type: types.GET_NOC_REQUEST_REMARKS_SUCCESSFUL,
  data,
});

export type GetNOCRequestRemarksFailed = {
  type: typeof types.GET_NOC_REQUEST_REMARKS_FAILED;
  error?: string;
};

export const getNOCRequestRemarksFailed = (error?: string): GetNOCRequestRemarksFailed => ({
  type: types.GET_NOC_REQUEST_REMARKS_FAILED,
  error,
});

//------------------------------------------- GET NOC REQUEST TIMELINE Action -------------------------------------------//

export type GetNOCRequesttIimelineRequest = {
  type: typeof types.GET_NOC_REQUEST_TIMELINE_REQUESTED;
  payload: NOCRequestTimelinePayload;
};

export const getNOCRequestTimelineRequested = (payload: NOCRequestTimelinePayload): GetNOCRequesttIimelineRequest => ({
  type: types.GET_NOC_REQUEST_TIMELINE_REQUESTED,
  payload,
});

export type GetNOCRequestTimelineSuccessful = {
  type: typeof types.GET_NOC_REQUEST_TIMELINE_SUCCESSFUL;
  data: NocRequestTimeline[];
};

export const getNOCRequestTimelineSuccessful = (data: NocRequestTimeline[]): GetNOCRequestTimelineSuccessful => ({
  type: types.GET_NOC_REQUEST_TIMELINE_SUCCESSFUL,
  data,
});

export type GetNOCRequestTimelineFailed = {
  type: typeof types.GET_NOC_REQUEST_TIMELINE_FAILED;
  error?: string;
};

export const getNOCRequestTimelineFailed = (error?: string): GetNOCRequestTimelineFailed => ({
  type: types.GET_NOC_REQUEST_TIMELINE_FAILED,
  error,
});

//------------------------------------------- NOC REQUEST CHANGE HISTORY Action -------------------------------------------//

export type GetNocRequestChangeHistoryRequest = {
  type: typeof types.GET_NOC_REQUEST_CHANGE_HISTORY_REQUESTED;
  nocRequestId: number;
  email: string;
};

export const getNocRequestChangeHistoryRequested = (nocRequestId: number, email: string): GetNocRequestChangeHistoryRequest => ({
  type: types.GET_NOC_REQUEST_CHANGE_HISTORY_REQUESTED,
  nocRequestId,
  email,
});

export type GetNocRequestChangeHistorySuccessful = {
  type: typeof types.GET_NOC_REQUEST_CHANGE_HISTORY_SUCCESSFUL;
  data: NocRequestChangeHistory[];
};

export const getNocRequestChangeHistorySuccessful = (data: NocRequestChangeHistory[]): GetNocRequestChangeHistorySuccessful => ({
  type: types.GET_NOC_REQUEST_CHANGE_HISTORY_SUCCESSFUL,
  data,
});

export type GetNocRequestChangeHistoryFailed = {
  type: typeof types.GET_NOC_REQUEST_CHANGE_HISTORY_FAILED;
  error?: string;
};

export const getNocRequestChangeHistoryFailed = (error?: string): GetNocRequestChangeHistoryFailed => ({
  type: types.GET_NOC_REQUEST_CHANGE_HISTORY_FAILED,
  error,
});

//------------------------------------------- GET NOC DEVELOPER DOC REF Action -------------------------------------------//

export type GetNocDeveloperDocRefRequest = {
  type: typeof types.GET_NOC_DEVELOPER_DOC_REF_REQUESTED;
  payload: NocDeveloperDocRefPayload;
};

export const getNocDeveloperDocRefRequested = (payload: NocDeveloperDocRefPayload): GetNocDeveloperDocRefRequest => ({
  type: types.GET_NOC_DEVELOPER_DOC_REF_REQUESTED,
  payload,
});

export type GetNocDeveloperDocRefSuccessful = {
  type: typeof types.GET_NOC_DEVELOPER_DOC_REF_SUCCESSFUL;
  data: NocDeveloperDocRef[];
};

export const getNocDeveloperDocRefSuccessful = (data: NocDeveloperDocRef[]): GetNocDeveloperDocRefSuccessful => ({
  type: types.GET_NOC_DEVELOPER_DOC_REF_SUCCESSFUL,
  data,
});

export type GetNocDeveloperDocRefFailed = {
  type: typeof types.GET_NOC_DEVELOPER_DOC_REF_FAILED;
  error?: string;
};

export const getNocDeveloperDocRefFailed = (error?: string): GetNocDeveloperDocRefFailed => ({
  type: types.GET_NOC_DEVELOPER_DOC_REF_FAILED,
  error,
});

export type NOCManageRequestAction =
  // GET Rejected NOC List
  | GetRejectedNOCListRequested
  | GetRejectedNOCListSuccessful
  | GetRejectedNOCListFailed

  // Get Pending NOC List
  | GetPendingNOCListRequested
  | GetPendingNOCListSuccessful
  | GetPendingNOCListFailed

  // Get Approved NOC List
  | GetApprovedNOCListRequested
  | GetApprovedNOCListSuccessful
  | GetApprovedNOCListFailed

  // Get Cancelled NOC List
  | GetCancelledNOCListRequested
  | GetCancelledNOCListSuccessful
  | GetCancelledNOCListFailed

  // NOC Project Details
  | GetNOCProjectDetailsRequested
  | GetNOCProjectDetailsSuccessful
  | GetNOCProjectDetailsFailed

  // Hold NOC
  | GetHoldNOCRequested
  | GetHoldNOCSuccessful
  | GetHoldNOCFailed

  // Download Rejected NOC
  | DownloadRejectedNOCRequested
  | DownloadRejectedNOCSuccessful
  | DownloadRejectedNOCFailed

  // Download Pending NOC
  | DownloadPendingNOCRequested
  | DownloadPendingNOCSuccessful
  | DownloadPendingNOCFailed

  // Download Approved NOC
  | DownloadApprovedNOCRequested
  | DownloadApprovedNOCSuccessful
  | DownloadApprovedNOCFailed

  // Download Cancelled NOC
  | DownloadCancelledNOCRequested
  | DownloadCancelledNOCSuccessful
  | DownloadCancelledNOCFailed

  // Download Hold NOC
  | DownloadHoldNOCRequested
  | DownloadHoldNOCSuccessful
  | DownloadHoldNOCFailed

  // Download NOC Summary
  | DownloadNOCSummaryRequested
  | DownloadNOCSummarySuccessful
  | DownloadNOCSummaryFailed

  // Get NOC Payment Details
  | GetNOCPaymentDetailsRequested
  | GetNOCPaymentDetailsSuccessful
  | GetNOCPaymentDetailsFailed

  // Submit NOC Payment
  | SubmitNOCPaymentRequested
  | SubmitNOCPaymentSuccessful
  | SubmitNOCPaymentFailed

  // Get NOC Remarks
  | GetNOCRemarksRequested
  | GetNOCRemarksSuccessful
  | GetNOCRemarksFailed

  // Submit NOC Remarks
  | SubmitNOCRemarksRequested
  | SubmitNOCRemarksSuccessful
  | SubmitNOCRemarksFailed

  // Export Action Types
  | GetNOCDocumentsRequested
  | GetNOCDocumentsSuccessful
  | GetNOCDocumentsFailed

  // NOC Decision Get api
  | GetNOCDecisionRequested
  | GetNOCDecisionSuccessful
  | GetNOCDecisionFailed

  // Get Noc Price headers
  | GetNocPriceHeadersRequested
  | GetNocPriceHeadersSuccessful
  | GetNocPriceHeadersFailed

  // Get send back users
  | GetSendBackUsersRequest
  | GetSendBackUsersSuccessful
  | GetSendBackUsersFailed

  //Download Noc Letter
  | GetNocLetterRequest
  | GetNocLetterSuccessful
  | GetNocLetterFailed

  //send noc authorize
  | SendNocAuthorizeRequest
  | SendNocAuthorizeSuccessful
  | SendNocAuthorizeFailed

  //new send noc
  | NewSendNocAuthorizeRequest
  | NewSendNocAuthorizeSuccessful
  | NewSendNocAuthorizeFailed

  //get noc request remarks
  | GetNOCRequestRemarksRequest
  | GetNOCRequestRemarksSuccessful
  | GetNOCRequestRemarksFailed

  // get noc request timeline
  | GetNOCRequesttIimelineRequest
  | GetNOCRequestTimelineSuccessful
  | GetNOCRequestTimelineFailed

  // get noc request change history
  | GetNocRequestChangeHistoryRequest
  | GetNocRequestChangeHistorySuccessful
  | GetNocRequestChangeHistoryFailed

  // get noc developer doc ref
  | GetNocDeveloperDocRefRequest
  | GetNocDeveloperDocRefSuccessful
  | GetNocDeveloperDocRefFailed;
