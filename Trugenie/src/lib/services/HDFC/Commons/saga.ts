import { call, put, select, takeLeading } from "redux-saga/effects";
import { selectAccessToken } from "../../hdfc_login/selectors";
import {
  DownloadExcelErrorFileFailed,
  DownloadExcelErrorFileRequestedAction,
  DownloadExcelErrorFileSucceeded,
  DownloadExcelErrorFileSucceededAction,
  GetRMUserListRequestedAction,
  GetSwitchClientListRequestedAction,
  GetTaggedRMUserListRequestedAction,
  ValidateExcelFailed,
  ValidateExcelRequestedAction,
  ValidateExcelSucceeded,
  getRMUserListSucceeded,
  getSwitchClientListFailed,
  getSwitchClientListSucceeded,
  getTaggedRMUserListSucceeded,
} from "./actions";
import { downloadExcelErrorFileAPI, getRMUsersAPI, getTaggedRMUsers, getUserClientAccessV2, validateExcelFileApi } from "./api";
import { GetClientDataResponse, RmUsersList, ValidateExcelResponse } from "./dataTypes";
import * as ActionTypes from "./types";
import { errorNotification, handelReponseCode, handleDownloadResponseCheck } from "../../../../modules/Components/UtilityFunctions";
import { successNotification } from "../../../../utils/notifications";

function* handleGetRMUser(action: GetRMUserListRequestedAction) {
  const accessToken = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const result: RmUsersList = yield call(getRMUsersAPI, accessToken, action.createdBy);
    if (result === null) {
      throw new Error("API Call Failed.");
    } else {
      yield put(getRMUserListSucceeded(result.data));
    }
  } catch (e: any) {
    yield put({
      type: ActionTypes.GET_RM_USERS_FAILED,
      message: e.message,
    });
  }
}

function* handleTaggedRMUser(action: GetTaggedRMUserListRequestedAction) {
  const accessToken = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const result: RmUsersList = yield call(getTaggedRMUsers, accessToken, action.developerId, action.createdBy);
    const { isError } = handelReponseCode(undefined, result?.info, "Failed to fetch Rm Tagged...");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      yield put(getTaggedRMUserListSucceeded(result.data));
    }
  } catch (e: any) {
    yield put({
      type: ActionTypes.GET_TAGGED_RM_USERS_FAILED,
    });
  }
}

function* handleValidateExcelFile(action: ValidateExcelRequestedAction) {
  const accessToken = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const result: ValidateExcelResponse = yield call(validateExcelFileApi, accessToken, action.payload);
    // const { isError } = handelReponseCode(action.onSuccessCallback, result?.info, "", true);
    // if (isError) {
    //   yield call(errorNotification, result.info.message ?? "API Failed..");
    // }
    yield put(ValidateExcelSucceeded(result));
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield call(errorNotification, error?.message ?? "API Failed..");
    }
    yield put(ValidateExcelFailed());
  }
}

function* handleDownloadExcelErrorFile(action: DownloadExcelErrorFileRequestedAction) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response = yield call(downloadExcelErrorFileAPI, accessToken, action.payload);
    const { isError } = handleDownloadResponseCheck(action.onSuccessCallback, response, "Download Failed...");
    if (isError) {
      throw new Error(response?.info?.message || "API Failed...");
    } else {
      yield call(successNotification, "Download Succeeded...");
      const next: DownloadExcelErrorFileSucceededAction = yield call(DownloadExcelErrorFileSucceeded, response);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(DownloadExcelErrorFileFailed());
  }
}

function* handleGetSwitchClientList(action: GetSwitchClientListRequestedAction) {
  const accessToken = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const result: GetClientDataResponse = yield call(getUserClientAccessV2, accessToken, action.userId);
    const { isError } = handelReponseCode(undefined, result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      yield put(getSwitchClientListSucceeded(result.data));
    }
  } catch (e: any) {
    yield put(getSwitchClientListFailed());
  }
}

function* hdfcCommonsSaga() {
  yield takeLeading(ActionTypes.GET_RM_USERS_REQUESTED, handleGetRMUser);
  yield takeLeading(ActionTypes.GET_TAGGED_RM_USERS_REQUESTED, handleTaggedRMUser);
  yield takeLeading(ActionTypes.VALIDATE_EXCEL_REQUESTED, handleValidateExcelFile);
  yield takeLeading(ActionTypes.DOWNLOAD_EXCEL_ERROR_FILE_REQUESTED, handleDownloadExcelErrorFile);
  yield takeLeading(ActionTypes.GET_SWITCH_CLIENT_LIST_REQUESTED, handleGetSwitchClientList);
}

export default hdfcCommonsSaga;
