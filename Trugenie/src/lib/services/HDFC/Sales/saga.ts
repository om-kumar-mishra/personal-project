import { call, put, select, takeEvery, takeLatest, takeLeading } from "redux-saga/effects";
import { handelReponseCode, handleDownloadResponseCheck } from "../../../../modules/Components/UtilityFunctions";
import { successNotification } from "../../../../utils/notifications";
import { selectAccessToken } from "../../hdfc_login/selectors";
import { FileUploadResponse } from "../services/dataTypes";
import {
  CanUploadSalesTemplateRequested,
  CanUploadSalesTemplateSucceeded,
  DeleteSalesHistoryRequested,
  DeleteSalesHistorySucceeded,
  DeleteUpdateSalesPastHistoryRequested,
  DeleteUpdateSalesPastHistorySucceeded,
  DownloadSalesTemplateRequested,
  DownloadSalesTemplateSucceeded,
  GetPastSalesSummaryDetailRequested,
  GetPastSalesSummaryDetailSucceeded,
  GetPendingSalesForApprovalRequested,
  GetPendingSalesForApprovalSucceeded,
  GetSalesPastHistoryRequested,
  GetSalesPastHistorySucceeded,
  GetSalesSummaryDetailRequested,
  GetSalesSummaryDetailSucceeded,
  GetSalesSummaryRequested,
  GetSalesSummarySucceeded,
  GetTaggedRMRequested,
  GetTaggedRMSucceeded,
  SalesSetupPendingStatus,
  SalesSetupPendingStatusSuccess,
  UpdateSalesPastHistoryRequested,
  UpdateSalesPastHistorySucceeded,
  UploadSalesTemplateRequested,
  UploadSalesTemplateSucceeded,
  canUploadSalesTemplateSucceeded,
  deleteSalesHistorySucceeded,
  deleteUpdateSalesPastHistorySucceeded,
  downloadSalesTemplateSucceeded,
  fetchTaggedRMSucceeded,
  getPastSalesSummaryDetailSucceeded,
  getPendingSalesForApprovalListRequested,
  getPendingSalesForApprovalListSucceeded,
  getSalesPastHistoryListRequested,
  getSalesPastHistoryListSucceeded,
  getSalesSummaryDetailSucceeded,
  getSalesSummarySucceeded,
  isSalesSetupPendingSuccess,
  updateSalesPastHistoryListSucceeded,
  uploadSalesTemplateSucceeded,
} from "./actions";
import {
  canUploadSalesTemplateDataAPI,
  deleteSalesHistoryAPI,
  deleteUpdateSalesPastHistoryAPI,
  downloadSalesTemplateDataAPI,
  fetchTaggedRMAPI,
  getPastSalesSummaryDetailsAPI,
  getPendingSalesForApprovalAPI,
  getSalesPastHistoryAPI,
  getSalesSummaryAPI,
  getSalesSummaryDetailsAPI,
  isSalesSetupPendingAPI,
  updateSalesPastHistoryAPI,
  uploadSalesTemplateDataAPI,
} from "./api";
import {
  CanUploadSalesTemplateDataResponse,
  PastSalesSummaryDetailResponse,
  PendingSalesForApprovalResponse,
  RemoveSalesHistoryResponse,
  SalesPastHistoryResponse,
  SalesSummaryResponse,
  SummaryDetailResponse,
  TaggedRMDataResponse,
  UpdateSalesPastHistoryResponse,
} from "./dataTypes";
import * as actionTypes from "./types";

function* handleFetchSalesPastHistoryList(action: GetSalesPastHistoryRequested) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: SalesPastHistoryResponse = yield call(getSalesPastHistoryAPI, accessToken, action.reAssetId, action.typeCheck);
    const { isError } = handelReponseCode(action.callback, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: GetSalesPastHistorySucceeded = yield call(getSalesPastHistoryListSucceeded, response);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put({
      type: actionTypes.GET_SALES_PAST_HISTORY_FAILED,
      message: "",
    });
  }
}

function* handleFetchPastSalesSummaryDetails(action: GetPastSalesSummaryDetailRequested) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }

    const { reAssetId, useremail, SaleMISHistoryId } = action;
    const response: PastSalesSummaryDetailResponse = yield call(getPastSalesSummaryDetailsAPI, accessToken, reAssetId, useremail, SaleMISHistoryId);
    const { isError } = handelReponseCode(action.callback, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: GetPastSalesSummaryDetailSucceeded = yield call(getPastSalesSummaryDetailSucceeded, response);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put({
      type: actionTypes.GET_PAST_SALES_SUMMARY_DETAIL_FAILED,
      message: "",
    });
  }
}

function* handlePendingSalesForApprovalList(action: GetPendingSalesForApprovalRequested) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }

    const response: PendingSalesForApprovalResponse = yield call(getPendingSalesForApprovalAPI, accessToken, action.reAssetId);
    const { isError } = handelReponseCode(action.callback, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: GetPendingSalesForApprovalSucceeded = yield call(getPendingSalesForApprovalListSucceeded, response);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put({
      type: actionTypes.GET_PENDING_SALES_FOR_APPROVAL_FAILED,
      message: "",
    });
  }
}

function* handleUpdateSalesPastHistory(action: UpdateSalesPastHistoryRequested) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }

    const { reassetId, SaleMISHistoryId, status, createdby } = action;
    const response: UpdateSalesPastHistoryResponse = yield call(updateSalesPastHistoryAPI, accessToken, reassetId, SaleMISHistoryId, status, createdby);

    const { isError } = handelReponseCode(action.callback, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const success: UpdateSalesPastHistorySucceeded = yield call(updateSalesPastHistoryListSucceeded, response);
      yield put(success);
      const misList: GetPendingSalesForApprovalRequested = yield call(getPendingSalesForApprovalListRequested, reassetId);
      yield put(misList);
      const salesList: GetSalesPastHistoryRequested = yield call(getSalesPastHistoryListRequested, reassetId, "Update");
      yield put(salesList);
    }
  } catch (error: unknown) {
    yield put({
      type: actionTypes.UPDATE_SALES_PAST_HISTORY_FAILED,
      message: "",
    });
  }
}

function* handleDeleteSalesHistory(action: DeleteSalesHistoryRequested) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }

    const { reassetId, SaleMISHistoryId, createdby } = action;
    const response: RemoveSalesHistoryResponse = yield call(deleteSalesHistoryAPI, accessToken, reassetId, SaleMISHistoryId, createdby);

    const { isError } = handelReponseCode(action.callback, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const success: DeleteSalesHistorySucceeded = yield call(deleteSalesHistorySucceeded, response);
      yield put(success);
      const list: GetSalesPastHistoryRequested = yield call(getSalesPastHistoryListRequested, reassetId, "Update");
      yield put(list);
    }
  } catch (error: unknown) {
    yield put({
      type: actionTypes.DELETE_SALES_HISTORY_FAILED,
      message: "",
    });
  }
}

function* handleDeleteUpdateSalesPastHistory(action: DeleteUpdateSalesPastHistoryRequested) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }

    const { reassetId, Type } = action;
    const response: RemoveSalesHistoryResponse = yield call(deleteUpdateSalesPastHistoryAPI, accessToken, reassetId, Type);
    const { isError } = handelReponseCode(action.callback, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: DeleteUpdateSalesPastHistorySucceeded = yield call(deleteUpdateSalesPastHistorySucceeded, response);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put({
      type: actionTypes.DELETE_UPDATE_SALES_PAST_HISTORY_FAILED,
      message: "",
    });
  }
}

function* handleCanUploadSalesTemplateData(action: CanUploadSalesTemplateRequested) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }

    const { reassetId, MISDate, Type } = action;
    const response: CanUploadSalesTemplateDataResponse = yield call(canUploadSalesTemplateDataAPI, accessToken, reassetId, MISDate, Type);
    const { isError } = handelReponseCode(action.callback, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      if (action.actionCallback) {
        yield call(action.actionCallback, !!response.data[0].canupdate);
      }
      const next: CanUploadSalesTemplateSucceeded = yield call(canUploadSalesTemplateSucceeded, response);
      yield put(next);
    }
  } catch (error: any) {
    yield put({
      type: actionTypes.CAN_UPLOAD_SALES_TEMPLATE_DATA_FAILED,
      message: "",
    });
  }
}

function* handleUploadSalesTemplateData(action: UploadSalesTemplateRequested) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }

    const { reassetId, misDate, entity, entityRole, fileContainer, filePath, fileName, remarks, uploaded_file } = action;
    const response: FileUploadResponse = yield call(
      uploadSalesTemplateDataAPI,
      accessToken,
      reassetId,
      misDate,
      entity,
      entityRole,
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
      const success: UploadSalesTemplateSucceeded = yield call(uploadSalesTemplateSucceeded, response);
      yield put(success);
      const salesList: GetSalesPastHistoryRequested = yield call(getSalesPastHistoryListRequested, reassetId, "Update");
      yield put(salesList);
    }
  } catch (error: unknown) {
    yield put({
      type: actionTypes.UPLOAD_SALES_TEMPLATE_DATA_FAILED,
      message: "",
    });
  }
}

function* handleDownloadSalesTemplateData(action: DownloadSalesTemplateRequested) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }

    const { reassetId } = action;
    const response = yield call(downloadSalesTemplateDataAPI, accessToken, reassetId);
    const { isError } = handleDownloadResponseCheck(action.callback, response, "Download Failed...");
    if (isError) {
      throw new Error(response?.info?.message || "API Failed...");
    } else {
      yield call(successNotification, "Download Succeeded...");
      const next: DownloadSalesTemplateSucceeded = yield call(downloadSalesTemplateSucceeded, response);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put({
      type: actionTypes.DOWNLOAD_SALES_TEMPLATE_DATA_FAILED,
      message: "",
    });
  }
}

function* handleFetchTaggedRM(action: GetTaggedRMRequested) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }

    const { reassetId, SaleMISHistoryId, createdby } = action;
    const response: TaggedRMDataResponse = yield call(fetchTaggedRMAPI, accessToken, reassetId, SaleMISHistoryId, createdby);
    const { isError } = handelReponseCode(action.callback, response?.info, "Download Failed...");
    if (isError) {
      throw new Error(response?.info?.message || "API Failed...");
    } else {
      const success: GetTaggedRMSucceeded = yield call(fetchTaggedRMSucceeded, response);
      yield put(success);
    }
  } catch (error: unknown) {
    yield put({
      type: actionTypes.GET_TAGGED_RM_FAILED,
      message: "",
    });
  }
}

function* handleGetCustomerGroup(action: SalesSetupPendingStatus) {
  const accessToken = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const result: { data: { isSetup: number }[]; info: { code: number; message: string } } = yield call(isSalesSetupPendingAPI, accessToken, action.ReAssetId);
    const { isError } = handelReponseCode(undefined, result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const getFinalData = result.data && result.data.length > 0 ? result.data[0] : null;
      const next: SalesSetupPendingStatusSuccess = yield put(isSalesSetupPendingSuccess(getFinalData));
      yield put(next);
    }
  } catch (e: any) {
    yield put({
      type: actionTypes.IS_SALES_SETUP_PENDING_FAILED,
      message: e.message,
    });
  }
}

function* handleFetchSalesSummary(action: GetSalesSummaryRequested) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }

    const { misDate, reAssetId, remarks, uploaded_file } = action;
    const response: SalesSummaryResponse = yield call(getSalesSummaryAPI, accessToken, reAssetId, misDate, uploaded_file);

    const { isError } = handelReponseCode(action.callback, response?.info, "Unable to fetch data...");
    if (isError) {
      throw new Error(response?.info?.message || "API Failed...");
    } else {
      const next: GetSalesSummarySucceeded = yield call(getSalesSummarySucceeded, response, misDate, remarks, uploaded_file);
      yield put(next);
    }
  } catch (error: any) {
    yield put({
      type: actionTypes.GET_SALES_SUMMARY_FAILED,
      message: "",
    });
  }
}

function* handleFetchSalesSummaryDetails(action: GetSalesSummaryDetailRequested) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }

    const { reAssetId, uploadedFile, status, misDate } = action;
    const response: SummaryDetailResponse = yield call(getSalesSummaryDetailsAPI, accessToken, reAssetId, uploadedFile, status, misDate);
    const { isError } = handelReponseCode(action.callback, response?.info, "Unable to fetch data...");
    if (isError) {
      throw new Error(response?.info?.message || "API Failed...");
    } else {
      const next: GetSalesSummaryDetailSucceeded = yield call(getSalesSummaryDetailSucceeded, response);
      yield put(next);
    }
  } catch (error: any) {
    yield put({
      type: actionTypes.GET_SALES_SUMMARY_DETAIL_FAILED,
      message: "",
    });
  }
}

function* salesSaga() {
  yield takeEvery(actionTypes.GET_SALES_PAST_HISTORY_REQUESTED, handleFetchSalesPastHistoryList);
  yield takeLeading(actionTypes.GET_PAST_SALES_SUMMARY_DETAIL_REQUESTED, handleFetchPastSalesSummaryDetails);
  yield takeEvery(actionTypes.GET_PENDING_SALES_FOR_APPROVAL_REQUESTED, handlePendingSalesForApprovalList);
  yield takeLeading(actionTypes.UPDATE_SALES_PAST_HISTORY_REQUESTED, handleUpdateSalesPastHistory);
  yield takeLeading(actionTypes.DELETE_SALES_HISTORY_REQUESTED, handleDeleteSalesHistory);
  yield takeLeading(actionTypes.DELETE_UPDATE_SALES_PAST_HISTORY_REQUESTED, handleDeleteUpdateSalesPastHistory);
  yield takeEvery(actionTypes.UPLOAD_SALES_TEMPLATE_DATA_REQUESTED, handleUploadSalesTemplateData);
  yield takeEvery(actionTypes.CAN_UPLOAD_SALES_TEMPLATE_DATA_REQUESTED, handleCanUploadSalesTemplateData);
  yield takeEvery(actionTypes.DOWNLOAD_SALES_TEMPLATE_DATA_REQUESTED, handleDownloadSalesTemplateData);
  yield takeLatest(actionTypes.GET_TAGGED_RM_REQUESTED, handleFetchTaggedRM);
  yield takeLatest(actionTypes.IS_SALES_SETUP_PENDING_REQUESTED, handleGetCustomerGroup);
  yield takeLeading(actionTypes.GET_SALES_SUMMARY_REQUESTED, handleFetchSalesSummary);
  yield takeLeading(actionTypes.GET_SALES_SUMMARY_DETAIL_REQUESTED, handleFetchSalesSummaryDetails);
}

export default salesSaga;
