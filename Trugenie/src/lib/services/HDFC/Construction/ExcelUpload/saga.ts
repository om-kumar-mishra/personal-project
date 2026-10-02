import { call, put, select, takeLeading } from "redux-saga/effects";
import * as actionTypes from "./types";
import { selectAccessToken } from "../../../hdfc_login/selectors";
import {
  ExcelUploadPastHistoryResponse,
  ConstructionPendingResponse,
  UploadConstructionSetupTemplateResponse,
  CanSetupConstructionResponse,
  UpdateConstructionSetupStatusResponse,
  UploadConstructionUpdateTemplateResponse,
  IsConstructionSetupResponse,
  CanUpdateConstructionResponse,
  UpdateConstructionUpdateStatusResponse,
  DeleteConstructionUploadResponse,
} from "./dataTypes";
import { handelReponseCode, handleDownloadResponseCheck } from "../../../../../modules/Components/UtilityFunctions";
import {
  GetExcelUploadHistoryListSucceeded,
  GetExcelUploadPastHistorySucceededType,
  GetExcelUploadPastHistoryRequestedType,
  GetExcelUploadPastHistoryListFailed,
  GetConstructionPendignMISRequestedType,
  GetConstructionPendignMISSucceededType,
  GetConstructionPendignMISListSucceeded,
  GetConstructionPendignMISListFailed,
  UploadConstructionTemplateSetupRequestedType,
  UploadConstructionTemplateSetupSucceededType,
  UploadConstructionTemplateSetupFailed,
  UploadConstructionTemplateSetupSucceeded,
  CanSetupConstructionRequestedType,
  CanSetupConstructionSucceededType,
  CanSetupConstructionSucceeded,
  CanSetupConstructionFailed,
  UpdateConstructionSetupStatusRequestedType,
  UpdateConstructionSetupStatusSucceededType,
  UpdateConstructionSetupStatusSucceeded,
  UpdateConstructionSetupStatusFailed,
  DownloadConstructionTemplateRequestedType,
  DownloadConstructionTemplateSucceededType,
  DownloadConstructionTemplateSucceeded,
  DownloadConstructionTemplateFailed,
  UploadConstructionUpdateTemplateRequestedType,
  UploadConstructionUpdateTemplateSucceededType,
  UploadConstructionUpdateTemplateSucceeded,
  UploadConstructionUpdateTemplateFailed,
  IsConstructionSetupRequestedType,
  IsConstructionSetupSucceededType,
  IsConstructionSetupSucceeded,
  IsConstructionSetupFailed,
  CanUpdateConstructionRequestedType,
  CanUpdateConstructionSucceeded,
  CanUpdateConstructionSucceededType,
  CanUpdateConstructionFailed,
  UpdateConstructionStatusRequestedType,
  UpdateConstructionStatusSucceededType,
  UpdateConstructionStatusSucceeded,
  UpdateConstructionStatusFailed,
  DeleteConstructionUploadRequestedType,
  DeleteConstructionUploadSucceeded,
  DeleteConstructionUploadSucceededType,
  DeleteConstructionUploadFailed,
  DownloadConstructionTemplateUpdateRequestedType,
  DownloadConstructionTemplateUpdateSucceededType,
  DownloadConstructionTemplateUpdateSucceeded,
  DownloadConstructionTemplateUpdateFailed,
  DownloadExcelUploadRowRequestAction
} from "./actions";
import { successNotification } from "../../../../../utils/notifications";
import { getConstructionPendingAPI, getExcelPastHistoryAPI, uploadConstructionSetupTemplateAPI,canSetupConstructionAPI, updateConstructionSetupStatusAPI, downloadConstructionTemplateAPI, uploadConstructionTemplateAPI, isConstructionSetupPendingAPI, canUpdateConstructionAPI, updateConstructionStatusAPI, DeleteConstructionUploadAPI, downloadConstructionTemplateUpdateAPI, getDownloadExcelUploadRowListAPI } from "./api";
// import { GetSummaryPastHistoryListSucceeded. } from "../../Summary/actions";


function* handleFetchExcelUploadStatePastHistoryList(action: GetExcelUploadPastHistoryRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: ExcelUploadPastHistoryResponse = yield call(getExcelPastHistoryAPI,  accessToken, action.reAssetId, action.createdBy, action.Type);
    const { isError } = handelReponseCode(undefined, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: GetExcelUploadPastHistorySucceededType = yield call(GetExcelUploadHistoryListSucceeded, response.data);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(GetExcelUploadPastHistoryListFailed());
  }
}

function* handleUploadConstructionSetup(action: UploadConstructionTemplateSetupRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: UploadConstructionSetupTemplateResponse = yield call(uploadConstructionSetupTemplateAPI, accessToken, action.payload);
    const { isError } = handelReponseCode(action.callback, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: UploadConstructionTemplateSetupSucceededType = yield call(UploadConstructionTemplateSetupSucceeded, response);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(UploadConstructionTemplateSetupFailed());
  }
}

function* handleUpdateConstructionSetupStatus(action: UpdateConstructionSetupStatusRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: UpdateConstructionSetupStatusResponse = yield call(updateConstructionSetupStatusAPI, accessToken, action.payload);
    const { isError } = handelReponseCode(action.callback, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: UpdateConstructionSetupStatusSucceededType = yield call(UpdateConstructionSetupStatusSucceeded, response);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(UpdateConstructionSetupStatusFailed());
  }
}

function* handleDownloadConstructionTemplate(action: DownloadConstructionTemplateRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response = yield call(downloadConstructionTemplateAPI, accessToken, action.reassetId);
    const { isError } = handleDownloadResponseCheck(action.callback, response, "Download Failed...");
    if (isError) {
      throw new Error(response?.info?.message || "API Failed...");
    } else {
      yield call(successNotification, "Download Succeeded...");
      const next: DownloadConstructionTemplateSucceededType = yield call(DownloadConstructionTemplateSucceeded);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(DownloadConstructionTemplateFailed());
  }
}

//_______________________________________________________________________________________________________________________


function* handleFetchConstructionPendingList(action: GetConstructionPendignMISRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: ConstructionPendingResponse = yield call(getConstructionPendingAPI, accessToken, action.reAssetId, action.createdBy, action.Type);
    const { isError } = handelReponseCode(undefined, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: GetConstructionPendignMISSucceededType = yield call(GetConstructionPendignMISListSucceeded, response.data);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(GetConstructionPendignMISListFailed());
  }
}

function* handleCanSetupConstruction(action: CanSetupConstructionRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: CanSetupConstructionResponse = yield call(canSetupConstructionAPI, accessToken, action.reAssetId);
    const { isError } = handelReponseCode(action.callback, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: CanSetupConstructionSucceededType = yield call(CanSetupConstructionSucceeded, response?.data?.[0]);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(CanSetupConstructionFailed());
  }
}

function* handleUploadConstructionUpdate(action: UploadConstructionUpdateTemplateRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: UploadConstructionUpdateTemplateResponse = yield call(uploadConstructionTemplateAPI, accessToken, action.payload);
    const { isError } = handelReponseCode(action.callback, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: UploadConstructionUpdateTemplateSucceededType = yield call(UploadConstructionUpdateTemplateSucceeded, response);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(UploadConstructionUpdateTemplateFailed());
  }
}
function* handleFetchIsSummarySetup(action: IsConstructionSetupRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: IsConstructionSetupResponse = yield call(isConstructionSetupPendingAPI, accessToken, action.REAssetId);
    const { isError } = handelReponseCode(undefined, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: IsConstructionSetupSucceededType = yield call(IsConstructionSetupSucceeded, response.data?.[0]);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(IsConstructionSetupFailed());
  }
}

function* handleCanUpdateConstruction(action: CanUpdateConstructionRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: CanUpdateConstructionResponse = yield call(canUpdateConstructionAPI, accessToken,action.date, action.reAssetId);
    const { isError } = handelReponseCode(action.callback, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: CanUpdateConstructionSucceededType = yield call(CanUpdateConstructionSucceeded, response?.data?.[0]);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(CanUpdateConstructionFailed());
  }
}
function* handleUpdateConstructionStatus(action: UpdateConstructionStatusRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: UpdateConstructionUpdateStatusResponse = yield call(updateConstructionStatusAPI, accessToken, action.payload);
    const { isError } = handelReponseCode(action.callback, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: UpdateConstructionStatusSucceededType = yield call(UpdateConstructionStatusSucceeded, response);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(UpdateConstructionStatusFailed());
  }
}
function* handleDeleteConstructionUploadDetails(action:DeleteConstructionUploadRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response:DeleteConstructionUploadResponse = yield call(DeleteConstructionUploadAPI, accessToken, action.payload);
    const { isError } = handelReponseCode(action.callback, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next:DeleteConstructionUploadSucceededType = yield call(DeleteConstructionUploadSucceeded, response);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(DeleteConstructionUploadFailed());
  }
}

function* handleDownloadProjectSummaryTemplate(action: DownloadConstructionTemplateUpdateRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response = yield call(downloadConstructionTemplateUpdateAPI, accessToken, action.reassetId);
    const { isError } = handleDownloadResponseCheck(action.callback, response, "Download Failed...");
    if (isError) {
      throw new Error(response?.info?.message || "API Failed...");
    } else {
      yield call(successNotification, "Download Succeeded...");
      const next: DownloadConstructionTemplateUpdateSucceededType = yield call(DownloadConstructionTemplateUpdateSucceeded);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(DownloadConstructionTemplateUpdateFailed());
  }
}


// Download Template covenant list Button
function* handleDownloadExcelUploadRowList(action: DownloadExcelUploadRowRequestAction): Generator<any, any, any> {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const result = yield call(getDownloadExcelUploadRowListAPI, accessToken, action.containerName, action.fileName, action.filePath);
    const { isError } = handleDownloadResponseCheck(action.callBack, result, "Download Failed...");
    if (isError) {
      throw new Error("API Failed...");
    } else {
      yield call(yield call(successNotification, "Download Succeeded..."));
      yield put({
        type: actionTypes.DOWNLOAD_EXCEL_UPLOAD_SETUP_ROW_SUCCEEDED,
        result: result,
      });
    }
  } catch (e: any) {
    yield put({
      type: actionTypes.DOWNLOAD_EXCEL_UPLOAD_SETUP_ROW_FAILED,
      message: e.message,
    });
  }
}

function* excelSaga() {
  yield takeLeading(actionTypes.GET_CONTRUCTION_EXCEL_UPLOAD_PAST_HISTORY_REQUESTED, handleFetchExcelUploadStatePastHistoryList);
  yield takeLeading(actionTypes.GET_CONTRUCTION_PENDING_MIS_REQUESTED, handleFetchConstructionPendingList);
  yield takeLeading(actionTypes.INSERT_CONSTRUCTION_SETUP_TEMPLATE_REQUESTED, handleUploadConstructionSetup);
  yield takeLeading(actionTypes.CAN_SETUP_CONSTRUCTION_REQUESTED, handleCanSetupConstruction);
  yield takeLeading(actionTypes.UPDATE_CONSTRUCTION_SETUP_STATUS_REQUESTED, handleUpdateConstructionSetupStatus);
  yield takeLeading(actionTypes.DOWNLOAD_CONSTRUCTION_SETUP_TEMPLATE_REQUESTED, handleDownloadConstructionTemplate);
  yield takeLeading(actionTypes.UPLOAD_CONSTRUCTIO_UPDATE_TEMPLATE_REQUESTED, handleUploadConstructionUpdate);
  yield takeLeading(actionTypes.IS_CONSTRUCTION_SETUP_REQUESTED, handleFetchIsSummarySetup);
  yield takeLeading(actionTypes.CAN_UPDATE_CONSTRUCTION_REQUESTED, handleCanUpdateConstruction);
  yield takeLeading(actionTypes.UPDATE_CONSTRUCTION_STATUS_REQUESTED, handleUpdateConstructionStatus);
  yield takeLeading(actionTypes.DELETE_CONSTRUCTION_UPDATE_DETAILS_REQUESTED, handleDeleteConstructionUploadDetails);
  yield takeLeading(actionTypes.DOWNLOAD_CONSTRUCTION_TEMPLATE_REQUESTED, handleDownloadProjectSummaryTemplate);
  yield takeLeading(actionTypes.DOWNLOAD_EXCEL_UPLOAD_SETUP_ROW_REQUESTED, handleDownloadExcelUploadRowList);

}

export default excelSaga;
