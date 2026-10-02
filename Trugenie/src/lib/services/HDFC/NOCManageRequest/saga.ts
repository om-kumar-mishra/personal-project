import FileSaver from "file-saver";
import { call, put, select, takeLeading } from "redux-saga/effects";
import { handelReponseCode, handleDownloadResponseCheck } from "../../../../modules/Components/UtilityFunctions";
import { successNotification } from "../../../../utils/notifications";
import { selectAccessToken } from "../../hdfc_login/selectors";
import {
  DownloadApprovedNOCRequested,
  DownloadCancelledNOCRequested,
  DownloadHoldNOCRequested,
  DownloadNOCSummaryRequested,
  DownloadPendingNOCRequested,
  DownloadRejectedNOCRequested,
  GetApprovedNOCListRequested,
  GetCancelledNOCListRequested,
  GetHoldNOCRequested,
  GetNOCDecisionRequested,
  GetNOCDocumentsRequested,
  GetNOCPaymentDetailsRequested,
  GetNOCProjectDetailsRequested,
  GetNOCRemarksRequested,
  GetNOCRequestRemarksRequest,
  GetNOCRequesttIimelineRequest,
  GetNocDeveloperDocRefRequest,
  GetNocLetterRequest,
  GetNocPriceHeadersRequested,
  GetNocRequestChangeHistoryRequest,
  GetPendingNOCListRequested,
  GetRejectedNOCListRequested,
  GetSendBackUsersRequest,
  NewSendNocAuthorizeRequest,
  SendNocAuthorizeRequest,
  SubmitNOCPaymentRequested,
  SubmitNOCRemarksRequested,
  downloadApprovedNOCSuccessful,
  downloadCancelledNOCSuccessful,
  downloadHoldNOCSuccessful,
  downloadNOCSummarySuccessful,
  downloadPendingNOCSuccessful,
  downloadRejectedNOCSuccessful,
  getApprovedNOCListSuccessful,
  getCancelledNOCListSuccessful,
  getHoldNOCSuccessful,
  getNOCDecisionSuccessful,
  getNOCDocumentsSuccessful,
  getNOCPaymentDetailsSuccessful,
  getNOCProjectDetailsSuccessful,
  getNOCRemarksSuccessful,
  getNOCRequestRemarksSuccessful,
  getNOCRequestTimelineSuccessful,
  getNocDeveloperDocRefSuccessful,
  getNocLetterSuccessful,
  getNocPriceHeadersSuccessful,
  getNocRequestChangeHistorySuccessful,
  getPendingNOCListSuccessful,
  getSendBackUsersSuccessful,
  newsendNocAuthorizeSuccessful,
  rejectedNocListSuccessful,
  sendNocAuthorizeSuccessful,
  submitNOCPaymentSuccessful,
  submitNOCRemarksSuccessful,
} from "./actions";
import {
  authorizeNoc,
  authorizeNocNew,
  downloadApprovedNocAPI,
  downloadCancelledNocAPI,
  downloadHoldNocAPI,
  downloadNocSummaryAPI,
  downloadPendingNocAPI,
  downloadRejectedNocAPI,
  getApprovedNocRequestAPI,
  getCancelledNocRequestAPI,
  getDeveloperDocRef,
  getHoldNocRequestAPI,
  getNOCDecisionData,
  getNOCLetter,
  getNOCPriceHeadersData,
  getNOCRequestRemarks,
  getNOCRequestTimeline,
  getNocDocumentsAPI,
  getNocPaymentDetailsAPI,
  getNocProjectDetailsAPI,
  getNocRemarksAPI,
  getNocRequestChangeHistory,
  getPendingNocRequestAPI,
  getRejectedNocRequestAPI,
  getSendBackUsers,
  submitNocPaymentAPI,
  submitNocRemarksAPI,
} from "./api";
import {
  ApprovedNOCReturnType,
  CancelledNOCReturnType,
  GeneralisedReturnType,
  GetDecisionDataReturnType,
  GetNOCRequestRemarksResponse,
  GetNocDeveloperDocRefResponse,
  GetNocRequestChangeHistoryResponse,
  GetNocRequestTimelineResponse,
  HoldNOCReturnType,
  NOCDocumentListReturnType,
  NOCPaymentDetailsReturnType,
  NOCPriceHeadersReturnType,
  NOCProjectDetailsResponseType,
  NOCRemarksListReturnType,
  NocSendBackUsersResponse,
  PendingNOCReturnType,
  RejectedNOCReturnType,
  SendAuthorizeNocResponse,
} from "./dataTypes";
import * as ActionTypes from "./types";

function* handleGetApproveNoc(action: GetApprovedNOCListRequested) {
  const accessToken = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const result: ApprovedNOCReturnType = yield call(getApprovedNocRequestAPI, accessToken, action.nocProjectId, action.userEmail);
    const { isError } = handelReponseCode(undefined, result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      yield put(getApprovedNOCListSuccessful(result.data));
    }
  } catch (e: any) {
    yield put({
      type: ActionTypes.GET_NOC_APPROVED_FAILED,
    });
  }
}

function* handleGetCancelledNoc(action: GetCancelledNOCListRequested) {
  const accessToken = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const result: CancelledNOCReturnType = yield call(getCancelledNocRequestAPI, accessToken, action.nocProjectId, action.userEmail);
    const { isError } = handelReponseCode(undefined, result?.info, "Failed to fetch Cancel list...");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      yield put(getCancelledNOCListSuccessful(result.data));
    }
  } catch (e: any) {
    yield put({
      type: ActionTypes.GET_NOC_CANCELLED_FAILED,
    });
  }
}

function* handleGetpendingNoc(action: GetPendingNOCListRequested) {
  const accessToken = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const result: PendingNOCReturnType = yield call(getPendingNocRequestAPI, accessToken, action.projectId, action.showMineOnly, action.userEmail);
    const { isError } = handelReponseCode(undefined, result?.info, "Failed to fetch Pending list...");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      yield put(getPendingNOCListSuccessful(result.data));
    }
  } catch (e: any) {
    yield put({
      type: ActionTypes.GET_NOC_PENDING_FAILED,
    });
  }
}

function* handleGetRejectedNoc(action: GetRejectedNOCListRequested) {
  const accessToken = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const result: RejectedNOCReturnType = yield call(getRejectedNocRequestAPI, accessToken, action.nocProjectId, action.userEmail);
    const { isError } = handelReponseCode(undefined, result?.info, "Failed to fetch Reject list...");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      yield put(rejectedNocListSuccessful(result.data));
    }
  } catch (e: any) {
    yield put({
      type: ActionTypes.GET_NOC_REJECT_FAILED,
    });
  }
}

function* handleGetHoldNoc(action: GetHoldNOCRequested) {
  const accessToken = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const result: HoldNOCReturnType = yield call(getHoldNocRequestAPI, accessToken, action.nocProjectId, action.showMineOnly, action.userEmail);
    const { isError } = handelReponseCode(undefined, result?.info, "Failed to fetch send-back list...");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      yield put(getHoldNOCSuccessful(result.data));
    }
  } catch (e: any) {
    yield put({
      type: ActionTypes.GET_HOLD_NOC_FAILED,
    });
  }
}

function* handleDownloadRejectedNoc(action: DownloadRejectedNOCRequested) {
  const accessToken = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const result = yield call(downloadRejectedNocAPI, accessToken, action.nocProjectId, action.userEmail);
    const { isError } = handleDownloadResponseCheck(action?.onSuccessCallback, result);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      yield put(downloadRejectedNOCSuccessful(result.data));
    }
  } catch (e: any) {
    yield put({
      type: ActionTypes.DOWNLOAD_REJECTED_NOC_FAILED,
      message: e.message,
    });
  }
}

function* handleDownloadPendingNoc(action: DownloadPendingNOCRequested) {
  const accessToken = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const result = yield call(downloadPendingNocAPI, accessToken, action.projectId, action.showMineOnly, action.userEmail);
    const { isError } = handleDownloadResponseCheck(action?.onSuccessCallback, result);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      yield put(downloadPendingNOCSuccessful(result.data));
    }
  } catch (e: any) {
    yield put({
      type: ActionTypes.DOWNLOAD_PENDING_NOC_FAILED,
      message: e.message,
    });
  }
}

function* handleDownloadApprovedNoc(action: DownloadApprovedNOCRequested) {
  const accessToken = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const result = yield call(downloadApprovedNocAPI, accessToken, action.nocProjectId, action.userEmail);
    const { isError } = handleDownloadResponseCheck(action?.onSuccessCallback, result);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      yield put(downloadApprovedNOCSuccessful(result.data));
    }
  } catch (e: any) {
    yield put({
      type: ActionTypes.DOWNLOAD_APPROVED_NOC_FAILED,
      message: e.message,
    });
  }
}

function* handleDownloadCancelledNoc(action: DownloadCancelledNOCRequested) {
  const accessToken = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const result = yield call(downloadCancelledNocAPI, accessToken, action.nocProjectId, action.userEmail);
    const { isError } = handleDownloadResponseCheck(action?.onSuccessCallback, result);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      yield put(downloadCancelledNOCSuccessful(result.data));
    }
  } catch (e: any) {
    yield put({
      type: ActionTypes.DOWNLOAD_CANCELLED_NOC_FAILED,
      message: e.message,
    });
  }
}

function* handleDownloadHoldNoc(action: DownloadHoldNOCRequested) {
  const accessToken = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const result = yield call(downloadHoldNocAPI, accessToken, action.nocProjectId, action.showMineOnly, action.userEmail);
    const { isError } = handleDownloadResponseCheck(action?.onSuccessCallback, result);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      yield put(downloadHoldNOCSuccessful(result.data));
    }
  } catch (e: any) {
    yield put({
      type: ActionTypes.DOWNLOAD_HOLD_NOC_FAILED,
      message: e.message,
    });
  }
}

function* handleGetNOCProjectDetails(action: GetNOCProjectDetailsRequested) {
  const accessToken = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const result: NOCProjectDetailsResponseType = yield call(getNocProjectDetailsAPI, accessToken, action.nocProjectId, action.userEmail);
    const { isError } = handelReponseCode(undefined, result?.info, "Failed to fetch detailes list...");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      yield put(getNOCProjectDetailsSuccessful(result.data));
    }
  } catch (e: any) {
    yield put({
      type: ActionTypes.GET_NOC_REQUEST_PROJECT_DETAILS_FAILED,
      message: e.message,
    });
  }
}

function* handleDownloadNocSummary(action: DownloadNOCSummaryRequested) {
  const accessToken = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const result: GeneralisedReturnType = yield call(downloadNocSummaryAPI, accessToken, action.nocProjectId, action.reAssetId);
    const { isError } = handelReponseCode(undefined, result?.info, "Download Failed...");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      yield put(downloadNOCSummarySuccessful(result.data));
    }
  } catch (e: any) {
    yield put({
      type: ActionTypes.DOWNLOAD_NOC_SUMMARY_FAILED,
      message: e.message,
    });
  }
}

function* handleGetNOCPaymentDetails(action: GetNOCPaymentDetailsRequested) {
  const accessToken = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const result: NOCPaymentDetailsReturnType = yield call(getNocPaymentDetailsAPI, accessToken, action.nocProjectId);
    const { isError } = handelReponseCode(undefined, result?.info, "Failed to fetch detailes list...");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      yield put(getNOCPaymentDetailsSuccessful(result.data));
    }
  } catch (e: any) {
    yield put({
      type: ActionTypes.GET_NOC_PAYMENT_DETAILS_FAILED,
      message: e.message,
    });
  }
}

function* handleSubmitNOCPaymentDetails(action: SubmitNOCPaymentRequested) {
  const accessToken = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const result: GeneralisedReturnType = yield call(submitNocPaymentAPI, accessToken, action.nocProjectId, action.status);
    const { isError } = handelReponseCode(action.onSuccessCallback, result?.info, "Failed to fetch detailes list...");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      yield put(submitNOCPaymentSuccessful(result.data));
    }
  } catch (e: any) {
    yield put({
      type: ActionTypes.SUBMIT_NOC_PAYMENT_FAILED,
      message: e.message,
    });
  }
}

function* handleGetNOCRemarksDetails(action: GetNOCRemarksRequested) {
  const accessToken = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const result: NOCRemarksListReturnType = yield call(getNocRemarksAPI, accessToken, action.nocProjectId);
    const { isError } = handelReponseCode(undefined, result?.info, "Failed to fetch detailes list...");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      yield put(getNOCRemarksSuccessful(result.data));
    }
  } catch (e: any) {
    yield put({
      type: ActionTypes.SUBMIT_NOC_PAYMENT_FAILED,
      message: e.message,
    });
  }
}

function* handleSubmitNOCRemarksDetails(action: SubmitNOCRemarksRequested) {
  const accessToken = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const result: GeneralisedReturnType = yield call(submitNocRemarksAPI, accessToken, action.payload);
    const { isError } = handelReponseCode(action.onSuccessCallback, result?.info, "Failed to fetch detailes list...");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      yield put(submitNOCRemarksSuccessful(result.data));
    }
  } catch (e: any) {
    yield put({
      type: ActionTypes.SUBMIT_NOC_PAYMENT_FAILED,
      message: e.message,
    });
  }
}

function* handleGetNOCDocumentDetails(action: GetNOCDocumentsRequested) {
  const accessToken = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const result: NOCDocumentListReturnType = yield call(getNocDocumentsAPI, accessToken, action.nocProjectId);
    const { isError } = handelReponseCode(undefined, result?.info, "Failed to fetch detailes list...");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      yield put(getNOCDocumentsSuccessful(result.data));
    }
  } catch (e: any) {
    yield put({
      type: ActionTypes.GET_NOC_DOCUMENTS_FAILED,
      message: e.message,
    });
  }
}

function* handleGetNOCDecisionDetails(action: GetNOCDecisionRequested) {
  const accessToken = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const result: GetDecisionDataReturnType = yield call(getNOCDecisionData, accessToken, action.nocProjectId, action.email);
    const { isError } = handelReponseCode(undefined, result?.info, "Failed to fetch detailes list...");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      yield put(getNOCDecisionSuccessful(result.data));
    }
  } catch (e: any) {
    yield put({
      type: ActionTypes.GET_NOC_DECISION_DATA_FAILED,
      message: e.message,
    });
  }
}

function* handleGetNOCPriceHeaders(action: GetNocPriceHeadersRequested) {
  const accessToken = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const result: NOCPriceHeadersReturnType = yield call(getNOCPriceHeadersData, accessToken, action.nocProjectId, action.salesId, action.nocRequestId);
    const { isError } = handelReponseCode(undefined, result?.info, "Failed to fetch price header list...");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      yield put(getNocPriceHeadersSuccessful(result.data));
    }
  } catch (e: any) {
    yield put({
      type: ActionTypes.GET_NOC_PRICE_HEADERS_FAILED,
      message: e.message,
    });
  }
}

function* handleGetSendBackUsers(action: GetSendBackUsersRequest) {
  const accessToken = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const result: NocSendBackUsersResponse = yield call(getSendBackUsers, accessToken, action.nocProjectId, action.nocrequestid, action.useremail);
    const { isError } = handelReponseCode(undefined, result?.info, "Failed to fetch send back user list...");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      yield put(getSendBackUsersSuccessful(result.data));
    }
  } catch (e: any) {
    yield put({
      type: ActionTypes.GET_SEND_BACK_USERS_FAILED,
      message: e.message,
    });
  }
}

function* handleGetNOCLetter(action: GetNocLetterRequest) {
  try {
    const accessToken = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token Required for API Call.");
    }
    const response = yield call(getNOCLetter, accessToken, action.nocProjectId, action.letterType, action.email, action.req, action.nocRequestId, action.sign);
    const { isError } = handleDownloadResponseCheck(undefined, response, "Download Failed...");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      FileSaver.saveAs(response?.data, response?.fileName);
      yield put(getNocLetterSuccessful());
      yield call(successNotification, "Noc Letter downloaded successfully");
    }
  } catch (error: any) {
    yield put({
      type: ActionTypes.GET_NOC_LETTER_FAILED,
      message: error.message,
    });
  }
}

function* handleSendAuthorizeNoc(action: SendNocAuthorizeRequest) {
  const accessToken = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const result: SendAuthorizeNocResponse = yield call(authorizeNoc, accessToken, action.formData);
    const { isError } = handelReponseCode(undefined, result?.info, "failed to fetch list...");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      yield call(successNotification, result?.info.message ?? "Success");
      yield put(sendNocAuthorizeSuccessful(result));
    }
  } catch (e: any) {
    yield put({
      type: ActionTypes.SEND_AUTHORIZE_NOC_FAILED,
      message: e.message,
    });
  }
}

// new send noc
function* handleNewSendAuthorizeNoc(action: NewSendNocAuthorizeRequest) {
  const accessToken = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const { projectid, requestid, status } = action;
    const result: SendAuthorizeNocResponse = yield call(authorizeNocNew, accessToken, projectid, requestid, status);
    const { isError } = handelReponseCode(action.callBack, result?.info, "Failed to fetch cancel list..");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      yield call(successNotification, result?.info.message ?? "Success");
      yield put(newsendNocAuthorizeSuccessful(result));
      if (action?.callBack) {
        yield call(action.callBack, true);
      }
    }
  } catch (e: any) {
    yield put({
      type: ActionTypes.SEND_AUTHORIZE_NOC_FAILED_NEW,
      message: e.message,
    });
  }
}

function* handleGetNOCRequestRemarks(action: GetNOCRequestRemarksRequest) {
  const accessToken = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const result: GetNOCRequestRemarksResponse = yield call(getNOCRequestRemarks, accessToken, action.payload);
    const { isError } = handelReponseCode(undefined, result?.info, "Failed to fetch remarks...");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      yield put(getNOCRequestRemarksSuccessful(result.data));
    }
  } catch (e: any) {
    yield put({
      type: ActionTypes.GET_NOC_REQUEST_REMARKS_FAILED,
      message: e.message,
    });
  }
}

function* handleGetNOCRequestTimeline(action: GetNOCRequesttIimelineRequest) {
  const accessToken = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const result: GetNocRequestTimelineResponse = yield call(getNOCRequestTimeline, accessToken, action.payload);
    const { isError } = handelReponseCode(undefined, result?.info, "Failed to fetch timeline details...");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      yield put(getNOCRequestTimelineSuccessful(result.data));
    }
  } catch (e: any) {
    yield put({
      type: ActionTypes.GET_NOC_REQUEST_TIMELINE_FAILED,
      message: e.message,
    });
  }
}

function* handleGetNocRequestChangeHistory(action: GetNocRequestChangeHistoryRequest) {
  const accessToken = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const result: GetNocRequestChangeHistoryResponse = yield call(getNocRequestChangeHistory, accessToken, action.nocRequestId, action.email);
    const { isError } = handelReponseCode(undefined, result?.info, "Failed to fetch change history details...");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      yield put(getNocRequestChangeHistorySuccessful(result.data));
    }
  } catch (e: any) {
    yield put({
      type: ActionTypes.GET_NOC_REQUEST_CHANGE_HISTORY_FAILED,
      message: e.message,
    });
  }
}

function* handleGetNocDeveloperDocRef(action: GetNocDeveloperDocRefRequest) {
  const accessToken = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const result: GetNocDeveloperDocRefResponse = yield call(getDeveloperDocRef, accessToken, action.payload);
    const { isError } = handelReponseCode(undefined, result?.info, "Failed to fetch developer list...");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      yield put(getNocDeveloperDocRefSuccessful(result.data));
    }
  } catch (e: any) {
    yield put({
      type: ActionTypes.GET_NOC_DEVELOPER_DOC_REF_FAILED,
      message: e.message,
    });
  }
}

function* manageRequestSaga() {
  yield takeLeading(ActionTypes.GET_NOC_APPROVED_REQUESTED, handleGetApproveNoc);
  yield takeLeading(ActionTypes.GET_NOC_CANCELLED_REQUESTED, handleGetCancelledNoc);
  yield takeLeading(ActionTypes.GET_NOC_PENDING_REQUESTED, handleGetpendingNoc);
  yield takeLeading(ActionTypes.GET_NOC_REJECT_REQUESTED, handleGetRejectedNoc);
  yield takeLeading(ActionTypes.GET_HOLD_NOC_REQUESTED, handleGetHoldNoc);
  yield takeLeading(ActionTypes.DOWNLOAD_REJECTED_NOC_REQUESTED, handleDownloadRejectedNoc);
  yield takeLeading(ActionTypes.DOWNLOAD_PENDING_NOC_REQUESTED, handleDownloadPendingNoc);
  yield takeLeading(ActionTypes.DOWNLOAD_APPROVED_NOC_REQUESTED, handleDownloadApprovedNoc);
  yield takeLeading(ActionTypes.DOWNLOAD_CANCELLED_NOC_REQUESTED, handleDownloadCancelledNoc);
  yield takeLeading(ActionTypes.DOWNLOAD_HOLD_NOC_REQUESTED, handleDownloadHoldNoc);
  yield takeLeading(ActionTypes.GET_NOC_REQUEST_PROJECT_DETAILS_REQUESTED, handleGetNOCProjectDetails);
  yield takeLeading(ActionTypes.DOWNLOAD_NOC_SUMMARY_REQUESTED, handleDownloadNocSummary);
  yield takeLeading(ActionTypes.GET_NOC_PAYMENT_DETAILS_REQUESTED, handleGetNOCPaymentDetails);
  yield takeLeading(ActionTypes.SUBMIT_NOC_PAYMENT_REQUESTED, handleSubmitNOCPaymentDetails);
  yield takeLeading(ActionTypes.GET_NOC_REMARKS_REQUESTED, handleGetNOCRemarksDetails);
  yield takeLeading(ActionTypes.SUBMIT_NOC_REMARKS_REQUESTED, handleSubmitNOCRemarksDetails);
  yield takeLeading(ActionTypes.GET_NOC_DOCUMENTS_REQUESTED, handleGetNOCDocumentDetails);
  yield takeLeading(ActionTypes.GET_NOC_DECISION_DATA_REQUESTED, handleGetNOCDecisionDetails);
  yield takeLeading(ActionTypes.GET_NOC_PRICE_HEADERS_REQUESTED, handleGetNOCPriceHeaders);
  yield takeLeading(ActionTypes.GET_SEND_BACK_USERS_REQUESTED, handleGetSendBackUsers);
  yield takeLeading(ActionTypes.GET_NOC_LETTER_REQUESTED, handleGetNOCLetter);
  yield takeLeading(ActionTypes.SEND_AUTHORIZE_NOC_REQUESTED, handleSendAuthorizeNoc);
  yield takeLeading(ActionTypes.SEND_AUTHORIZE_NOC_REQUESTED_NEW, handleNewSendAuthorizeNoc);
  yield takeLeading(ActionTypes.GET_NOC_REQUEST_REMARKS_REQUESTED, handleGetNOCRequestRemarks);
  yield takeLeading(ActionTypes.GET_NOC_REQUEST_TIMELINE_REQUESTED, handleGetNOCRequestTimeline);
  yield takeLeading(ActionTypes.GET_NOC_REQUEST_CHANGE_HISTORY_REQUESTED, handleGetNocRequestChangeHistory);
  yield takeLeading(ActionTypes.GET_NOC_DEVELOPER_DOC_REF_REQUESTED, handleGetNocDeveloperDocRef);
}

export default manageRequestSaga;
