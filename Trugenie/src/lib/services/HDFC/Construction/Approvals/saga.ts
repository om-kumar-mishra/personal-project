import { call, put, select, takeLeading } from "redux-saga/effects";
import * as actionTypes from "./types";
import { selectAccessToken } from "../../../hdfc_login/selectors";
import { handelReponseCode } from "../../../../../modules/Components/UtilityFunctions";
import {
  GetApprovalDropDownFailed,
  GetApprovalDropDownRequestedType,
  GetApprovalDropDownSucceeded,
  GetApprovalDropDownSucceededType,
  GetApprovalHistoryListSucceeded,
  GetApprovalPastHistoryListFailed,
  GetApprovalPastHistoryRequestedType,
  GetApprovalPastHistorySucceededType,
  GetPendingConstructionApprovalDocumentsListFailed,
  GetPendingConstructionApprovalDocumentsRequestedType,
  GetPendingConstructionApprovalDocumentsSucceededType,
  PendingConstructionApprovalDocumentsListSucceeded,
  UpdateApprovalStatusFailed,
  UpdateApprovalStatusRequestedType,
  UpdateApprovalStatusSucceeded,
  UpdateApprovalStatusSucceededType,
  UploadConstructionApprovalDocumentsFailed,
  UploadConstructionApprovalDocumentsRequestedType,
  UploadConstructionApprovalDocumentsSucceeded,
  UploadConstructionApprovalDocumentsSucceededType,
} from "./actions";
import {
  ApprovalDropDownResponse,
  ApprovalPastHistoryResponse,
  PendingConstructionApprovalDocumentsResponse,
  UpdateApprovalStatusResponse,
  UploadConstructionApprovalDocumentsResponse,
} from "./dataTypes";
import {
  getApprovalDropDownAPI,
  getApprovalPastHistoryAPI,
  getPendingConstructionApprovalDocumentsAPI,
  updateApprovalStatusAPI,
  uploadConstructionApprovalDocumentsAPI,
} from "./api";

function* handleFetchApprovalPastHistoryList(action: GetApprovalPastHistoryRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: ApprovalPastHistoryResponse = yield call(getApprovalPastHistoryAPI, accessToken, action.reAssetId, action.createdBy);
    const { isError } = handelReponseCode(undefined, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: GetApprovalPastHistorySucceededType = yield call(GetApprovalHistoryListSucceeded, response.data);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(GetApprovalPastHistoryListFailed());
  }
}

function* handleUpdateApprovalStatus(action: UpdateApprovalStatusRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: UpdateApprovalStatusResponse = yield call(updateApprovalStatusAPI, accessToken, action.payload);
    const { isError } = handelReponseCode(action.callback, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: UpdateApprovalStatusSucceededType = yield call(UpdateApprovalStatusSucceeded, response);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(UpdateApprovalStatusFailed());
  }
}

function* handleFetchPendingConstructionApprovalDocumentsList(action: GetPendingConstructionApprovalDocumentsRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: PendingConstructionApprovalDocumentsResponse = yield call(getPendingConstructionApprovalDocumentsAPI, accessToken, action.reAssetId, action.createdBy);
    const { isError } = handelReponseCode(undefined, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: GetPendingConstructionApprovalDocumentsSucceededType = yield call(PendingConstructionApprovalDocumentsListSucceeded, response.data);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(GetPendingConstructionApprovalDocumentsListFailed());
  }
}

function* handleUploadConstructionApprovalDocuments(action: UploadConstructionApprovalDocumentsRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: UploadConstructionApprovalDocumentsResponse = yield call(uploadConstructionApprovalDocumentsAPI, accessToken, action.payload);
    const { isError } = handelReponseCode(action.callback, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: UploadConstructionApprovalDocumentsSucceededType = yield call(UploadConstructionApprovalDocumentsSucceeded, response);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(UploadConstructionApprovalDocumentsFailed());
  }
}

function* handleFetchApprovalDropDown(action: GetApprovalDropDownRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: ApprovalDropDownResponse = yield call(getApprovalDropDownAPI, accessToken, action.REAssetId, action.CreatedBy);
    const { isError } = handelReponseCode(undefined, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: GetApprovalDropDownSucceededType = yield call(GetApprovalDropDownSucceeded, response.data);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(GetApprovalDropDownFailed());
  }
}

function* approvalSaga() {
  yield takeLeading(actionTypes.GET_CONTRUCTION_APPROVAL_PAST_HISTORY_REQUESTED, handleFetchApprovalPastHistoryList);
  yield takeLeading(actionTypes.UPDATE_APPROVAl_STATUS_REQUESTED, handleUpdateApprovalStatus);
  yield takeLeading(actionTypes.GET_PENDING_APPROVAL_DOCUMENTS_REQUESTED, handleFetchPendingConstructionApprovalDocumentsList);
  yield takeLeading(actionTypes.INSERT_CONSTRUCTION_APPROVAL_DOCUMENTS_REQUESTED, handleUploadConstructionApprovalDocuments);
  yield takeLeading(actionTypes.GET_APPROVAL_DROPDOWN_REQUESTED, handleFetchApprovalDropDown);
}

export default approvalSaga;
