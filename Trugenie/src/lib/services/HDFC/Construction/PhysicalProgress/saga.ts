import { call, put, select, takeLeading } from "redux-saga/effects";
import * as actionTypes from "./types";
import { selectAccessToken } from "../../../hdfc_login/selectors";
import { handelReponseCode, handleDownloadResponseCheck, successNotification } from "../../../../../modules/Components/UtilityFunctions";
import { DownloadPhysicalProgressRowRequestAction, DownloadPhysicalProgressTemplateUpdateFailed, DownloadPhysicalProgressTemplateUpdateRequestedType, DownloadPhysicalProgressTemplateUpdateSucceeded, DownloadPhysicalProgressTemplateUpdateSucceededType, GetPhysicalProgressHistoryListSucceeded, GetPhysicalProgressPastHistoryListFailed, GetPhysicalProgressPastHistoryRequestedType, GetPhysicalProgressPastHistorySucceededType, GetPhysicalProgressPendingHistoryListFailed, GetPhysicalProgressPendingHistoryRequestedType, GetPhysicalProgressPendingHistorySucceededType, UpdatePhysicalProgressStatusFailed, UpdatePhysicalProgressStatusRequestedType, UpdatePhysicalProgressStatusSucceeded, UpdatePhysicalProgressStatusSucceededType, UploadPhysicalProgressTemplateSetupFailed, UploadPhysicalProgressTemplateSetupRequestedType, UploadPhysicalProgressTemplateSetupSucceeded, UploadPhysicalProgressTemplateSetupSucceededType } from "./actions";
import { PhysicalProgressPastHistoryResponse, PhysicalProgressPendingHistoryResponse, UpdatePhysicalProgressStatusResponse, UploadPhysicalProgressSetupTemplateResponse } from "./dataTypes";
import { downloadPhysicalProgressTemplateAPI, getDownloadPhysicalProgressRowListAPI, getPhysicalProgressPastHistoryAPI, getPhysicalProgressPendingHistoryAPI, updatePhysicalProgressStatusAPI, uploadPhysicalProgressSetupTemplateAPI } from "./api";

function* handleFetchPhysicalProgressPastHistoryList(action: GetPhysicalProgressPastHistoryRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: PhysicalProgressPastHistoryResponse = yield call(getPhysicalProgressPastHistoryAPI, accessToken, action.reAssetId, action.createdBy, action.Type);
    const { isError } = handelReponseCode(undefined, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: GetPhysicalProgressPastHistorySucceededType = yield call(GetPhysicalProgressHistoryListSucceeded, response.data);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(GetPhysicalProgressPastHistoryListFailed());
  }
}


function* handleFetchPhysicalProgressPendingHistoryList(action: GetPhysicalProgressPendingHistoryRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: PhysicalProgressPendingHistoryResponse = yield call(getPhysicalProgressPendingHistoryAPI, accessToken, action.reAssetId, action.createdBy, action.Type);
    const { isError } = handelReponseCode(undefined, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: GetPhysicalProgressPendingHistorySucceededType = yield call(GetPhysicalProgressHistoryListSucceeded, response.data);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(GetPhysicalProgressPendingHistoryListFailed());
  }
}


function* handleDownloadPhysicalProgressTemplate(action: DownloadPhysicalProgressTemplateUpdateRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response = yield call(downloadPhysicalProgressTemplateAPI, accessToken, action.reassetId, action.projectType, action.developmentType, action.phase, action.type);
    const { isError } = handleDownloadResponseCheck(action.callback, response, "Download Failed...");
    if (isError) {
      throw new Error(response?.info?.message || "API Failed...");
    } else {
      yield call(successNotification, "Download Succeeded...");
      const next: DownloadPhysicalProgressTemplateUpdateSucceededType = yield call(DownloadPhysicalProgressTemplateUpdateSucceeded);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(DownloadPhysicalProgressTemplateUpdateFailed());
  }
}

function* handleUpdatePhysicalProgressStatus(action: UpdatePhysicalProgressStatusRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: UpdatePhysicalProgressStatusResponse = yield call(updatePhysicalProgressStatusAPI, accessToken, action.payload);
    const { isError } = handelReponseCode(action.callback, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: UpdatePhysicalProgressStatusSucceededType = yield call(UpdatePhysicalProgressStatusSucceeded, response);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(UpdatePhysicalProgressStatusFailed());
  }
}

function* handleUploadPhysicalProgressSetup(action: UploadPhysicalProgressTemplateSetupRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: UploadPhysicalProgressSetupTemplateResponse = yield call(uploadPhysicalProgressSetupTemplateAPI, accessToken, action.payload);
    const { isError } = handelReponseCode(action.callback, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: UploadPhysicalProgressTemplateSetupSucceededType = yield call(UploadPhysicalProgressTemplateSetupSucceeded, response);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(UploadPhysicalProgressTemplateSetupFailed());
  }
}

// Download Template covenant list Button
function* handleDownloadPhysicalProgressRowList(action: DownloadPhysicalProgressRowRequestAction): Generator<any, any, any> {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const result = yield call(getDownloadPhysicalProgressRowListAPI, accessToken, action.containerName, action.fileName, action.filePath);
    const { isError } = handleDownloadResponseCheck(action.callBack, result, "Download Failed...");
    if (isError) {
      throw new Error("API Failed...");
    } else {
      yield call(yield call(successNotification, "Download Succeeded..."));
      yield put({
        type: actionTypes.DOWNLOAD_PHYSICAL_PROGRESS_SETUP_ROW_SUCCEEDED,
        result: result,
      });
    }
  } catch (e: any) {
    yield put({
      type: actionTypes.DOWNLOAD_PHYSICAL_PROGRESS_SETUP_ROW_FAILED,
      message: e.message,
    });
  }
}

function* physicalProgressSaga() {
  yield takeLeading(actionTypes.GET_CONTRUCTION_PHYSICAL_PROGRESS_PAST_HISTORY_REQUESTED, handleFetchPhysicalProgressPastHistoryList);
  yield takeLeading(actionTypes.GET_CONTRUCTION_PHYSICAL_PROGRESS_PENDING_HISTORY_REQUESTED, handleFetchPhysicalProgressPendingHistoryList);
  yield takeLeading(actionTypes.DOWNLOAD_PHYSICAL_PROGRESS_TEMPLATE_REQUESTED, handleDownloadPhysicalProgressTemplate);
  yield takeLeading(actionTypes.UPDATE_PHYSICAL_PROGRESS_STATUS_REQUESTED, handleUpdatePhysicalProgressStatus);
  yield takeLeading(actionTypes.INSERT_PHYSICAL_PROGRESS_SETUP_TEMPLATE_REQUESTED, handleUploadPhysicalProgressSetup);


  yield takeLeading(actionTypes.DOWNLOAD_PHYSICAL_PROGRESS_SETUP_ROW_REQUESTED, handleDownloadPhysicalProgressRowList);
}

export default physicalProgressSaga;
