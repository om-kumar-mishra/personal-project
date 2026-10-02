import { call, put, select, takeLeading } from "redux-saga/effects";
import { handelReponseCode, handleDownloadResponseCheck } from "../../../../modules/Components/UtilityFunctions";
import { successNotification } from "../../../../utils/notifications";
import { selectAccessToken } from "../../hdfc_login/selectors";
import { FileUploadResponse } from "../services/dataTypes";
import {
  CheckFundsDetailsExistFailed,
  CheckFundsDetailsExistRequestedType,
  CheckFundsDetailsExistSucceeded,
  CheckFundsDetailsExistSucceededType,
  DeleteFundsPastHistoryRequested,
  DeleteFundsPastHistorySucceeded,
  DownloadFundsTemplateFailed,
  DownloadFundsTemplateRequestedType,
  DownloadFundsTemplateSucceeded,
  DownloadFundsTemplateSucceededType,
  GetFundsPastUpdateRequested,
  GetFundsPastUpdateSucceeded,
  GetFundsPendingSucceeded,
  InsertFundsTemplateSucceeded,
  InsertFundsUpdateRequested,
  UpdateFundsStatusFailed,
  UpdateFundsStatusRequestedType,
  UpdateFundsStatusSucceeded,
  UpdateFundsStatusSucceededType,
  deleteFundsPastHistorySucceeded,
  getFundsPastUpdateListRequested,
  getFundsPastUpdateListSucceeded,
  getFundsPendingListSucceeded,
  insertFundsTemplateSucceeded,
} from "./actions";
import {
  DeleteFundsPastHistoryAPI,
  getFundsPastUpdateAPI,
  getFundsPendingAPI,
  insertFundsTemplateDataAPI,
  checkFundsDetailExistAPI,
  updateFundsStatusAPI,
  downloadFundsTemplateAPI,
} from "./api";
import {
  CheckFundsDetailsExistResponse,
  GetFundsPastUpdateResponse,
  GetFundsPendingResponse,
  RemoveFundsHistoryResponse,
  UpdateFundsStatusResponse,
} from "./dataTypes";
import * as actionTypes from "./types";

function* handleFetchFundsPastHistoryList(action: GetFundsPastUpdateRequested) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: GetFundsPastUpdateResponse = yield call(getFundsPastUpdateAPI, accessToken, action.ClientId, action.typeCheck);
    const { isError } = handelReponseCode(action.callback, response.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: GetFundsPastUpdateSucceeded = yield call(getFundsPastUpdateListSucceeded, response);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put({
      type: actionTypes.GET_FUNDS_PAST_UPDATE_FAILED,
      message: "",
    });
  }
}

function* handleFetchFundsPendingList(action: GetFundsPastUpdateRequested) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: GetFundsPendingResponse = yield call(getFundsPendingAPI, accessToken, action.ClientId);
    const { isError } = handelReponseCode(action.callback, response.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: GetFundsPendingSucceeded = yield call(getFundsPendingListSucceeded, response);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put({
      type: actionTypes.GET_PENDING_FUNDS_UPDATE_FAILED,
      message: "",
    });
  }
}
function* handleUploadSalesTemplateData(action: InsertFundsUpdateRequested) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }

    const { clientId, misDate, clientName, entityName, remarks, uploaded_file } = action;
    const response: FileUploadResponse = yield call(insertFundsTemplateDataAPI, accessToken, clientId, misDate, clientName, entityName, remarks, uploaded_file);
    const { isError } = handelReponseCode(action.callback, response.info, "Failed to upload file...");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const success: InsertFundsTemplateSucceeded = yield call(insertFundsTemplateSucceeded, response);
      yield put(success);
      const salesList: GetFundsPastUpdateRequested = yield call(getFundsPastUpdateListRequested, clientId, "Update");
      yield put(salesList);
    }
  } catch (error: unknown) {
    yield put({
      type: actionTypes.INSERT_FUNDS_UPDATE_FAILED,
      message: "",
    });
  }
}

function* handleDeleteFundsPastHistory(action: DeleteFundsPastHistoryRequested) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }

    const { clientId, fundMISHistoryId } = action;
    const response: RemoveFundsHistoryResponse = yield call(DeleteFundsPastHistoryAPI, accessToken, clientId, fundMISHistoryId);
    const { isError } = handelReponseCode(action.callback, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: DeleteFundsPastHistorySucceeded = yield call(deleteFundsPastHistorySucceeded, response);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put({
      type: actionTypes.DELETE_FUNDS_FAILED,
      message: "",
    });
  }
}

function* handleFundsDetailExist(action: CheckFundsDetailsExistRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: CheckFundsDetailsExistResponse = yield call(checkFundsDetailExistAPI, accessToken, action.client, action.MisDate);
    const { isError } = handelReponseCode(action?.callback, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: CheckFundsDetailsExistSucceededType = yield call(CheckFundsDetailsExistSucceeded, response.data?.[0]);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(CheckFundsDetailsExistFailed());
  }
}

function* handleUpdateFundsStatus(action: UpdateFundsStatusRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: UpdateFundsStatusResponse = yield call(updateFundsStatusAPI, accessToken, action.payload);
    const { isError } = handelReponseCode(action.callback, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: UpdateFundsStatusSucceededType = yield call(UpdateFundsStatusSucceeded, response);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(UpdateFundsStatusFailed());
  }
}

function* handleDownloadProjectSummaryTemplate(action: DownloadFundsTemplateRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response = yield call(downloadFundsTemplateAPI, accessToken, action.clientId);
    const { isError } = handleDownloadResponseCheck(action.callback, response, "Download Failed...");
    if (isError) {
      throw new Error(response?.info?.message || "API Failed...");
    } else {
      yield call(successNotification, "Download Succeeded...");
      const next: DownloadFundsTemplateSucceededType = yield call(DownloadFundsTemplateSucceeded);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(DownloadFundsTemplateFailed());
  }
}
function* salesSaga() {
  yield takeLeading(actionTypes.GET_FUNDS_PAST_UPDATE_REQUESTED, handleFetchFundsPastHistoryList);
  yield takeLeading(actionTypes.GET_PENDING_FUNDS_UPDATE_REQUESTED, handleFetchFundsPendingList);
  yield takeLeading(actionTypes.INSERT_FUNDS_UPDATE_REQUESTED, handleUploadSalesTemplateData);
  yield takeLeading(actionTypes.CHECK_FUNDS_DETAILS_EXIST_REQUESTED, handleFundsDetailExist);
  yield takeLeading(actionTypes.DELETE_FUNDS_REQUESTED, handleDeleteFundsPastHistory);
  yield takeLeading(actionTypes.UPDATE_FUNDS_STATUS_REQUESTED, handleUpdateFundsStatus);
  yield takeLeading(actionTypes.DOWNLOAD_FUNDS_TEMPLATE_REQUESTED, handleDownloadProjectSummaryTemplate);
}

export default salesSaga;
