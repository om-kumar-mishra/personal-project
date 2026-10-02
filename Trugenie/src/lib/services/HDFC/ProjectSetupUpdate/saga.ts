import { call, put, select, takeLeading } from "redux-saga/effects";
import { handelReponseCode, handleDownloadResponseCheck } from "../../../../modules/Components/UtilityFunctions";
import { successNotification } from "../../../../utils/notifications";
import { selectAccessToken } from "../../hdfc_login/selectors";
import { GenericResponseTypes } from "../common/dataTypes";
import {
  CanCreateSetupRequested,
  CanProjectSetupUpdateRequested,
  DownloadProjectSetupRequestAction,
  DownloadProjectSetupRowRequestAction,
  DownloadProjectSetupSucceededAction,
  GetProjectSalesApprovalsListRequested,
  GetProjectSalesListRequested,
  GetProjectSalesListSucceeded,
  StatusChangeProjectSalesListRequested,
  StatusChangeProjectSalesListSucceeded,
  UploadProjectSetupRequestAction,
  UploadProjectSetupSucceededAction,
  canCreateSetupSucceeded,
  canSetupProjectUpdateSucceeded,
  downloadProjectSetupSucceeded,
  getProjectSalesApprovalsListSucceeded,
  getProjectSalesListSucceeded,
  statusChangeProjectSalesListSucceeded,
  uploadProjectSetupSucceeded,
} from "./action";
import {
  canCreateSetupProjectAPI,
  canSetupProjectUpdateAPI,
  getDownloadProjectSalesListAPI,
  getDownloadProjectSalesRowListAPI,
  getProjectSalesApprovalsListAPI,
  getProjectSalesListAPI,
  statusChangeAPI,
  uploadProjectSetupAPI,
} from "./api";
import {
  CanCreateSetupDataType,
  CanCreateSetupDataTypeResponse,
  CanProjectSetupUpdateDataType,
  CanProjectSetupUpdateDataTypeResponse,
  GetProjectSalesResponse,
  ProjectSalesApprovalsListResponse,
  ProjectSetupList,
} from "./dataTypes";
import * as ActionTypes from "./types";

function* handleGetProjectSalesList(action: GetProjectSalesListRequested) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const result: GetProjectSalesResponse = yield call(getProjectSalesListAPI, accessToken, action.reAssetId, action.historyType);
    const { isError } = handelReponseCode(undefined, result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: GetProjectSalesListSucceeded = yield call(getProjectSalesListSucceeded, result as GetProjectSalesResponse);
      yield put(next);
    }
  } catch (e: any) {
    yield put({
      type: ActionTypes.GET_PROJECT_SALES_LIST_FAILED,
      message: e.message,
    });
  }
}
// Download Template covenant list Button
function* handleDownloadProjectSalesList(action: DownloadProjectSetupRequestAction): Generator<any, any, any> {
  const accessToken: string | undefined = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token required for API call.");
  }
  try {
    const response = yield call(getDownloadProjectSalesListAPI, accessToken, action.reAssetId);
    const { isError } = handleDownloadResponseCheck(action.successCallback, response, "Download Failed...");
    if (isError) {
      throw new Error(response?.info?.message || "API Failed...");
    } else {
      const next: DownloadProjectSetupSucceededAction = yield call(downloadProjectSetupSucceeded);
      yield put(next);
      yield call(successNotification, "Download Succeeded...");
    }
  } catch (error: unknown) {
    yield put({
      type: ActionTypes.DOWNLOAD_PROJECT_SETUP_FAILED,
      message: "",
    });
  }
}
// upload template
function* handleUploadUpdateFile(action: UploadProjectSetupRequestAction): Generator<any, any, any> {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const { uploadProjectSetupProps } = action;
    const result: ProjectSetupList = yield call(uploadProjectSetupAPI, accessToken, uploadProjectSetupProps);
    const { isError } = handelReponseCode(action.callback, result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: UploadProjectSetupSucceededAction = yield call(uploadProjectSetupSucceeded, result.data);
      yield put(next);
    }
  } catch (error: any) {
    yield put({
      type: ActionTypes.UPLOAD_PROJECT_SETUP_FAILED,
      error,
    });
  }
}
function* handleGetProjectSalesApprovalsList(action: GetProjectSalesApprovalsListRequested) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const result: ProjectSalesApprovalsListResponse = yield call(getProjectSalesApprovalsListAPI, accessToken, action.reAssetId);
    const { isError } = handelReponseCode(undefined, result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: UploadProjectSetupSucceededAction = yield call(getProjectSalesApprovalsListSucceeded, result.data);
      yield put(next);
    }
  } catch (e: any) {
    yield put({
      type: ActionTypes.GET_PROJECT_SALES_APPROVALS_LIST_FAILED,
      message: e.message,
    });
  }
}
// Download Template covenant list Button
function* handleDownloadProjectSalesRowList(action: DownloadProjectSetupRowRequestAction): Generator<any, any, any> {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const result = yield call(getDownloadProjectSalesRowListAPI, accessToken, action.containerName, action.fileName, action.filePath);
    const { isError } = handleDownloadResponseCheck(action.callBack, result, "Download Failed...");
    if (isError) {
      throw new Error("API Failed...");
    } else {
      yield call(yield call(successNotification, "Download Succeeded..."));
      yield put({
        type: ActionTypes.DOWNLOAD_PROJECT_SETUP_ROW_SUCCEEDED,
        result: result,
      });
    }
  } catch (e: any) {
    yield put({
      type: ActionTypes.DOWNLOAD_PROJECT_SETUP_ROW_FAILED,
      message: e.message,
    });
  }
}

function* handleStatusChange(action: StatusChangeProjectSalesListRequested): Generator<any, any, any> {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token Required for API Call.");
    }
    const { statusChangeProjectProps } = action;
    const result: GenericResponseTypes = yield call(statusChangeAPI, accessToken, statusChangeProjectProps);
    const { isError } = handelReponseCode(action?.successCallback, result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: StatusChangeProjectSalesListSucceeded = yield call(statusChangeProjectSalesListSucceeded, result as any);
      yield put(next);
    }
  } catch (error: any) {
    action.errorCallback && action.errorCallback(true);
    // errorNotification("");
    yield put({
      type: ActionTypes.STATUS_CHANGE_PROJECT_SALES_LIST_FAILED,
      message: error.message,
    });
  }
}

function* handleCanSetupProjectUpdateList(action: CanProjectSetupUpdateRequested) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const result: CanProjectSetupUpdateDataTypeResponse = yield call(canSetupProjectUpdateAPI, accessToken, action.reAssetId);
    const { isError } = handelReponseCode(action?.actionCallback, result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next = yield call(canSetupProjectUpdateSucceeded, result.data as CanProjectSetupUpdateDataType[]);
      yield put(next);
    }
  } catch (e: any) {
    yield put({
      type: ActionTypes.CAN_SETUP_UPDATE_FAILED,
      message: e.message,
    });
  }
}

// can update setup project
function* handleCanCreateSetupProject(action: CanCreateSetupRequested) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const result: CanCreateSetupDataTypeResponse = yield call(canCreateSetupProjectAPI, accessToken, action.reAssetId);
    const { isError } = handelReponseCode(action?.actionCallback, result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next = yield call(canCreateSetupSucceeded, result.data as CanCreateSetupDataType[]);
      yield put(next);
    }
  } catch (e: any) {
    yield put({
      type: ActionTypes.CAN_CREATE_PROJECT_SETUP_FAILED,
      message: e.message,
    });
  }
}

function* ProjectSetupSaga() {
  yield takeLeading(ActionTypes.GET_PROJECT_SALES_LIST_REQUESTED, handleGetProjectSalesList);
  yield takeLeading(ActionTypes.CAN_SETUP_UPDATE_REQUESTED, handleCanSetupProjectUpdateList);
  yield takeLeading(ActionTypes.GET_PROJECT_SALES_APPROVALS_LIST_REQUESTED, handleGetProjectSalesApprovalsList);
  yield takeLeading(ActionTypes.DOWNLOAD_PROJECT_SETUP_REQUESTED, handleDownloadProjectSalesList);
  yield takeLeading(ActionTypes.DOWNLOAD_PROJECT_SETUP_ROW_REQUESTED, handleDownloadProjectSalesRowList);
  yield takeLeading(ActionTypes.UPLOAD_PROJECT_SETUP_REQUESTED, handleUploadUpdateFile);
  yield takeLeading(ActionTypes.STATUS_CHANGE_PROJECT_SALES_LIST_REQUESTED, handleStatusChange);
  yield takeLeading(ActionTypes.CAN_CREATE_PROJECT_SETUP_REQUESTED, handleCanCreateSetupProject);
}

export default ProjectSetupSaga;
