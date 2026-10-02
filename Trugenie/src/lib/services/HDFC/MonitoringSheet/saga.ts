import { call, put, select, takeEvery, takeLeading } from "redux-saga/effects";
import { handelReponseCode, handleDownloadResponseCheck, successNotification } from "../../../../modules/Components/UtilityFunctions";
import { selectAccessToken } from "../../hdfc_login/selectors";
import { FileUploadResponse } from "../services/dataTypes";
import {
  DeleteSalesMonitoringHistoryRequested,
  DeleteSalesMonitoringHistorySucceeded,
  DownloadSalesMonitoringTemplateRequested,
  GetMonitoringSheetDetailsTypeRequested,
  GetMonitoringSheetDetailsTypeSucceeded,
  GetSalesMISRequested,
  GetSalesMISSucceeded,
  GetSalesMonitoringPastHistoryRequested,
  GetSalesMonitoringPastHistorySucceeded,
  UploadSalesMonitoringTemplateRequested,
  UploadSalesMonitoringTemplateSucceeded,
  deleteSalesMonitoringHistorySucceeded,
  downloadSalesMonitoringTemplateSucceeded,
  getMonitoringSheetDetailsSucceeded,
  getSalesMISSucceeded,
  getSalesMonitoringPastHistoryListRequested,
  getSalesMonitoringPastHistoryListSucceeded,
  uploadSalesMonitoringTemplateSucceeded
} from "./action";
import {
  deleteSalesMonitoringHistoryAPI,
  downloadSalesMonitoringTemplateDataAPI,
  getSalesMisDatesAPI,
  getSalesMonitoringDashboardDetails,
  getSalesMonitoringPastHistoryAPI,
  uploadSalesMonitoringTemplateDataAPI,
} from "./api";
import { MoitoringSheetDetailsList, RemoveSalesMonitoringHistoryResponse, SalesMisDatesResponse, SalesMonitoringPastHistoryResponse } from "./dataTypes";
import * as actionTypes from "./types";

function* handleFetchSalesMonitoringPastHistoryList(action: GetSalesMonitoringPastHistoryRequested) {
  const accessToken: string | undefined = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token required for API call.");
  }
  try {
    const response: SalesMonitoringPastHistoryResponse = yield call(getSalesMonitoringPastHistoryAPI, accessToken, action.REAssetId, action.CreatedBy);
    const { isError } = handelReponseCode(action.callback, response?.info, "Failed to fetch sales monitoring past list...");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: GetSalesMonitoringPastHistorySucceeded = yield call(getSalesMonitoringPastHistoryListSucceeded, response);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put({
      type: actionTypes.GET_SALES_MONITORING_PAST_HISTORY_FAILED,
    });
  }
}

function* handleDeleteSalesMonitoringHistory(action: DeleteSalesMonitoringHistoryRequested) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const { MonitoringHistoryId, REAssetId, CreatedBy } = action;
    const response: RemoveSalesMonitoringHistoryResponse = yield call(deleteSalesMonitoringHistoryAPI, accessToken, MonitoringHistoryId, CreatedBy);
    const { isError } = handelReponseCode(action.callback, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      if (action.callback) {
        yield call(action.callback, true, "Data delete successfully...");
      }
      const success: DeleteSalesMonitoringHistorySucceeded = yield call(deleteSalesMonitoringHistorySucceeded, response);
      yield put(success);
      const list: GetSalesMonitoringPastHistoryRequested = yield call(getSalesMonitoringPastHistoryListRequested, REAssetId, CreatedBy);
      yield put(list);
    }
  } catch (error: unknown) {
    yield put({
      type: actionTypes.DELETE_SALES_MONITORING_HISTORY_FAILED,
    });
  }
}

function* handleDownloadSalesMonitoringTemplateData(action: DownloadSalesMonitoringTemplateRequested) {
  try {
    const token = yield select(selectAccessToken);
    const response = yield call(downloadSalesMonitoringTemplateDataAPI, token, action.payload?.reAssetId, action?.payload?.emaild);
    const { isError } = handleDownloadResponseCheck(action.callback, response, "Download Failed...");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      yield put(downloadSalesMonitoringTemplateSucceeded());
      yield call(successNotification, "Downloaded successfully");
    }
  } catch (error) {
    yield put({
      type: actionTypes.DOWNLOAD_SALES_MONITORING_TEMPLATE_DATA_FAILED,
    });
  }
}
function* handleUploadSalesMonitoringTemplateData(action: UploadSalesMonitoringTemplateRequested) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const { reAssetId, salesMisDate, costMisDate, createdBy, EntityName, Role, userName, fileContainer, filePath, fileName, remarks, uploaded_file } = action;
    const response: FileUploadResponse = yield call(
      uploadSalesMonitoringTemplateDataAPI,
      accessToken,
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
    );
    const { isError } = handelReponseCode(action.callback, response.info, "Failed to upload file...");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      if (action.callback) {
        yield call(action.callback, true, "File uploaded successfully...");
      }
      const success: UploadSalesMonitoringTemplateSucceeded = yield call(uploadSalesMonitoringTemplateSucceeded, response);
      yield put(success);
      const salesMonitoringList: GetSalesMonitoringPastHistoryRequested = yield call(getSalesMonitoringPastHistoryListRequested, Number(reAssetId), "Update");
      yield put(salesMonitoringList);
    }
  } catch (error: any) {
    yield put({
      type: actionTypes.UPLOAD_SALES_MONITORING_TEMPLATE_DATA_FAILED,
    });
  }
}

function* handleSalesMisDateList(action: GetSalesMISRequested) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: SalesMisDatesResponse = yield call(getSalesMisDatesAPI, accessToken, action.REAssetId);
    const { isError } = handelReponseCode(action.callback, response?.info, "Failed to fetch sales data...");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: GetSalesMISSucceeded = yield call(getSalesMISSucceeded, response);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put({
      type: actionTypes.SALES_MIS_DATE_FAILED,
    });
  }
}

function* handleGetMonitoringSheetDetails(action: GetMonitoringSheetDetailsTypeRequested) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: MoitoringSheetDetailsList = yield call(getSalesMonitoringDashboardDetails, accessToken, action.reassetid);
    const { isError } = handelReponseCode(undefined, response?.info, "Failed to fetch monitoring sheet details...");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: GetMonitoringSheetDetailsTypeSucceeded = yield call(getMonitoringSheetDetailsSucceeded, response);
      yield put(next);
    }
  } catch (error: any) {
    yield put({
      type: actionTypes.GET_MONITORING_SHEET_FAILED,
    });
  }
}

function* salesMonitoringSaga() {
  yield takeEvery(actionTypes.GET_SALES_MONITORING_PAST_HISTORY_REQUESTED, handleFetchSalesMonitoringPastHistoryList);
  yield takeLeading(actionTypes.DELETE_SALES_MONITORING_HISTORY_REQUESTED, handleDeleteSalesMonitoringHistory);
  yield takeEvery(actionTypes.DOWNLOAD_SALES_MONITORING_TEMPLATE_DATA_REQUESTED, handleDownloadSalesMonitoringTemplateData);
  yield takeEvery(actionTypes.UPLOAD_SALES_MONITORING_TEMPLATE_DATA_REQUESTED, handleUploadSalesMonitoringTemplateData);
  yield takeEvery(actionTypes.SALES_MIS_DATE_REQUESTED, handleSalesMisDateList);
  yield takeEvery(actionTypes.GET_MONITORING_SHEET_REQUESTED, handleGetMonitoringSheetDetails);
}

export default salesMonitoringSaga;
