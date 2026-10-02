import { call, put, select, takeLeading } from "redux-saga/effects";
import { handelReponseCode, handleDownloadResponseCheck } from "../../../modules/Components/UtilityFunctions";
import { successNotification } from "../../../utils/notifications";
import {
  ApplicationMasterUpdateRequestedAction,
  ApplicationMasterUpdateSucceededAction,
  ExportAllNOCReportRequestAction,
  ExportAllNOCReportSucceededAction,
  ExportIssuedNOCReportRequestAction,
  ExportIssuedNOCReportSucceededAction,
  GetAllNOCReportRequestAction,
  GetAllNOCReportSucceededAction,
  GetApplicationMasterRequestedAction,
  GetIssuedNOCReportRequestAction,
  GetIssuedNOCReportSucceededAction,
  applicationMasterUpdateSucceeded,
  exportAllNOCReportSucceeded,
  exportIssuedNOCReportSucceeded,
  getAdminReportSuccess,
  getAllNOCReportSucceeded,
  getApplicationMasterSucceeded,
  getExportAdminReportSuccess,
  getExportLoginReportSuccess,
  getExportPopulationReportSuccess,
  getExportRoleRightReportSuccess,
  getIssuedNOCReportSucceeded,
  getLoginReportSuccess,
  getPopulationReportSuccess,
  getRoleRightReportSuccess,
} from "./actions";
import {
  exportAdminReportAPI,
  exportAllNOCReportAPI,
  exportIssuedNOCReportAPI,
  exportLoginReportAPI,
  exportPopulationReportAPI,
  exportRoleRightReportAPI,
  getAdminReportAPI,
  getAllNOCReportAPI,
  getApplicationMasterAPI,
  getIssuedNOCReportAPI,
  getLoginReportAPI,
  getPopulationReportAPI,
  getRoleRightReportAPI,
  updateApplicationMasterAPI,
} from "./api";
import {
  AdminReportResponse,
  AllNOCReportResponse,
  ApplicationMasterResponse,
  IssuedNOCReportResponse,
  LoginReportResponse,
  PopulationReportResponse,
  RoleRightReportResponse,
} from "./dataTypes";
import { selectAccessToken } from "./selectors";
import * as actionTypes from "./types";

function* fetchPopulationReport() {
  const token = yield select(selectAccessToken);

  if (token === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const response: PopulationReportResponse = yield call(getPopulationReportAPI, token);
    const { isError } = handelReponseCode(undefined, response?.info, "failed to fetch population list");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      yield put(getPopulationReportSuccess(response));
    }
  } catch (error: any) {
    yield put({
      type: actionTypes.GET_POPULATION_REPORT_FAILURE,
    });
  }
}

function* exportPopulationReport() {
  const token = yield select(selectAccessToken);
  if (token === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const response = yield call(exportPopulationReportAPI, token);
    const { isError } = handleDownloadResponseCheck(undefined, response, "Download failed...");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      yield put(getExportPopulationReportSuccess());
      yield call(successNotification, "Population report downloaded successfully");
    }
  } catch (error: any) {
    yield put({
      type: actionTypes.EXPORT_POPULATION_REPORT_ERROR,
      message: error.message,
    });
  }
}

function* fetchAdminReport(action: any) {
  const token = yield select(selectAccessToken);
  if (token === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const response: AdminReportResponse = yield call(getAdminReportAPI, token, action.payload);
    const { isError } = handelReponseCode(undefined, response?.info, "failed to fetch report list..");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      yield put(getAdminReportSuccess(response));
    }
  } catch (error) {
    yield put({
      type: actionTypes.GET_ADMIN_REPORT_FAILURE,
    });
  }
}

function* exportAdminReport(action: any) {
  const token = yield select(selectAccessToken);
  if (token === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const response = yield call(exportAdminReportAPI, token, action.payload?.startDate, action.payload?.endDate);
    const { isError } = handleDownloadResponseCheck(undefined, response, "Download Failed...");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      yield put(getExportAdminReportSuccess());
      yield call(successNotification, "Admin Report downloaded successfully");
    }
  } catch (error) {
    yield put({
      type: actionTypes.EXPORT_ADMIN_REPORT_ERROR,
    });
    // Handle errors
  }
}

function* fetchLoginReport(action: any) {
  const token = yield select(selectAccessToken);
  if (token === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const response: LoginReportResponse = yield call(getLoginReportAPI, token, action.payload);
    const { isError } = handelReponseCode(undefined, response?.info, "Failed to fetch login report..");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      yield put(getLoginReportSuccess(response));
    }
  } catch (error) {
    yield put({
      type: actionTypes.GET_LOGIN_REPORT_FAILURE,
    });
  }
}

function* exportLoginReport(action: any) {
  const token = yield select(selectAccessToken);
  if (token === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const response = yield call(exportLoginReportAPI, token, action.payload?.startDate, action.payload?.endDate);
    const { isError } = handleDownloadResponseCheck(undefined, response, "Download Failed...");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      yield put(getExportLoginReportSuccess());
      yield call(successNotification, "Login.logout/Report downloaded successfully");
    }
  } catch (error) {
    yield put({
      type: actionTypes.EXPORT_LOGIN_REPORT_ERROR,
    });
    // Handle errors
  }
}

function* fetchRoleRightReport() {
  const token = yield select(selectAccessToken);
  if (token === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const response: RoleRightReportResponse = yield call(getRoleRightReportAPI, token);
    const { isError } = handelReponseCode(undefined, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      yield put(getRoleRightReportSuccess(response));
    }
  } catch (error: any) {
    yield put({
      type: actionTypes.GET_ROLERIGHT_REPORT_FAILURE,
    });
  }
}

function* exportRoleRightReport() {
  const token = yield select(selectAccessToken);
  if (token === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const response = yield call(exportRoleRightReportAPI, token);
    const { isError } = handleDownloadResponseCheck(undefined, response, "Download Failed...");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      yield put(getExportRoleRightReportSuccess());
      yield call(successNotification, "Role Rights report downloaded successfully");
    }
  } catch (error: unknown) {
    yield put({
      type: actionTypes.EXPORT_ROLERIGHT_REPORT_ERROR,
    });
  }
}

function* handleGetApplicationMaster(action: GetApplicationMasterRequestedAction) {
  const accessToken = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const result: ApplicationMasterResponse = yield call(getApplicationMasterAPI, accessToken, action.createdby);
    const { isError } = handelReponseCode(action.callback, result?.info, "Failed to fetch List");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      yield put(getApplicationMasterSucceeded(result.data));
    }
  } catch (e: any) {
    yield put({
      type: actionTypes.GET_APPLICATION_MASTER_FAILED,
      message: e.message,
    });
  }
}

function* handleUpdateApplicationMaster(action: ApplicationMasterUpdateRequestedAction) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);

    if (accessToken === undefined) {
      throw new TypeError("Access Token Required for API Call.");
    }
    const result: any | null = yield call(updateApplicationMasterAPI, action.value, accessToken);
    const { isError } = handelReponseCode(action.callback, result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: ApplicationMasterUpdateSucceededAction = yield call(applicationMasterUpdateSucceeded, result);
      yield put(next);
    }
  } catch (error: any) {
    yield put({
      type: actionTypes.UPDATE_APPLICATION_MASTER_FAILED,
    });
  }
}

function* handleGetIssuedNOCReport(action: GetIssuedNOCReportRequestAction) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token Required for API Call.");
    }
    const result: IssuedNOCReportResponse = yield call(getIssuedNOCReportAPI, accessToken, action.reAssetId, action.startDate, action.endDate);
    const { isError } = handelReponseCode(undefined, result?.info, "failed to fetch noc request");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: GetIssuedNOCReportSucceededAction = yield call(getIssuedNOCReportSucceeded, result);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put({
      type: actionTypes.GET_NOC_ISSUED_REPORT_FAILURE,
    });
  }
}

function* handleExportIssuedNOCReport(action: ExportIssuedNOCReportRequestAction) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token Required for API Call.");
    }
    const result = yield call(exportIssuedNOCReportAPI, accessToken, action.reAssetId, action.startDate, action.endDate);
    const { isError } = handleDownloadResponseCheck(undefined, result);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: ExportIssuedNOCReportSucceededAction = yield call(exportIssuedNOCReportSucceeded, result);
      yield put(next);
      yield call(successNotification, "Report downloaded successfully");
    }
  } catch (error: unknown) {
    yield put({
      type: actionTypes.EXPORT_NOC_ISSUED_REPORT_FAILURE,
    });
  }
}

function* handleGetAllNOCReport(action: GetAllNOCReportRequestAction) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token Required for API Call.");
    }
    const result: AllNOCReportResponse = yield call(getAllNOCReportAPI, accessToken, action.reAssetId, action.startDate, action.endDate);
    const { isError } = handelReponseCode(undefined, result?.info, "failed to fetch noc list..");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: GetAllNOCReportSucceededAction = yield call(getAllNOCReportSucceeded, result);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put({
      type: actionTypes.GET_ALL_NOC_REPORT_FAILURE,
    });
  }
}

function* handleExportAllNOCReport(action: ExportAllNOCReportRequestAction) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token Required for API Call.");
    }
    const result = yield call(exportAllNOCReportAPI, accessToken, action.reAssetId, action.startDate, action.endDate);
    const { isError } = handleDownloadResponseCheck(undefined, result);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: ExportAllNOCReportSucceededAction = yield call(exportAllNOCReportSucceeded, result);
      yield put(next);
      yield call(successNotification, "Report downloaded successfully");
    }
  } catch (error: unknown) {
    yield put({
      type: actionTypes.EXPORT_ALL_NOC_REPORT_FAILURE,
    });
  }
}

function* reportSaga() {
  yield takeLeading(actionTypes.GET_POPULATION_REPORT_REQUEST, fetchPopulationReport);
  yield takeLeading(actionTypes.EXPORT_POPULATION_REPORT_REQUEST, exportPopulationReport);
  yield takeLeading(actionTypes.GET_ADMIN_REPORT_REQUEST, fetchAdminReport);
  yield takeLeading(actionTypes.EXPORT_ADMIN_REPORT_REQUEST, exportAdminReport);
  yield takeLeading(actionTypes.GET_LOGIN_REPORT_REQUEST, fetchLoginReport);
  yield takeLeading(actionTypes.EXPORT_LOGIN_REPORT_REQUEST, exportLoginReport);
  yield takeLeading(actionTypes.GET_ROLERIGHT_REPORT_REQUEST, fetchRoleRightReport);
  yield takeLeading(actionTypes.EXPORT_ROLERIGHT_REPORT_REQUEST, exportRoleRightReport);
  yield takeLeading(actionTypes.GET_APPLICATION_MASTER_REQUESTED, handleGetApplicationMaster);
  yield takeLeading(actionTypes.UPDATE_APPLICATION_MASTER_REQUESTED, handleUpdateApplicationMaster);
  yield takeLeading(actionTypes.GET_NOC_ISSUED_REPORT_REQUEST, handleGetIssuedNOCReport);
  yield takeLeading(actionTypes.EXPORT_NOC_ISSUED_REPORT_REQUEST, handleExportIssuedNOCReport);
  yield takeLeading(actionTypes.GET_ALL_NOC_REPORT_REQUEST, handleGetAllNOCReport);
  yield takeLeading(actionTypes.EXPORT_ALL_NOC_REPORT_REQUEST, handleExportAllNOCReport);
}

export default reportSaga;
