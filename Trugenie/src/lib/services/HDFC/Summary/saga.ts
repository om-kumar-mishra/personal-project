import { call, put, select, takeLeading } from "redux-saga/effects";
import * as actionTypes from "./types";
import { selectAccessToken } from "../../hdfc_login/selectors";
import {
  CanSetupProjectSummaryResponse,
  CheckProjectSummaryDetailsExistResponse,
  DeleteProjectSummaryDetailsResponse,
  IsSummarySetupResponse,
  SummaryPastHistoryResponse,
  SummaryPendingResponse,
  UpdateProjectSummaryStatusResponse,
  UploadProjectSummaryTemplateResponse,
  UploadProjectSummaryTemplateSetupResponse,
} from "./dataTypes";
import { handelReponseCode, handleDownloadResponseCheck } from "../../../../modules/Components/UtilityFunctions";
import {
  canSetupProjectSummaryAPI,
  checkProjectSummaryDetailExistAPI,
  deleteProjectSummaryDetailsAPI,
  downloadProjectSummaryTemplateAPI,
  getSummaryPastHistoryAPI,
  getSummaryPendingAPI,
  isSummarySetupPendingAPI,
  updateProjectSummaryStatusAPI,
  uploadProjectSummarySetupAPI,
  uploadProjectSummaryTemplateAPI,
} from "./api";
import {
  CanSetupProjectSummaryFailed,
  CanSetupProjectSummaryRequestedType,
  CanSetupProjectSummarySucceeded,
  CanSetupProjectSummarySucceededType,
  CheckProjectSummaryDetailsExistFailed,
  CheckProjectSummaryDetailsExistRequestedType,
  CheckProjectSummaryDetailsExistSucceeded,
  CheckProjectSummaryDetailsExistSucceededType,
  DeleteProjectSummaryDetailsFailed,
  DeleteProjectSummaryDetailsRequestedType,
  DeleteProjectSummaryDetailsSucceeded,
  DeleteProjectSummaryDetailsSucceededType,
  DownloadProjectSummaryTemplateFailed,
  DownloadProjectSummaryTemplateRequestedType,
  DownloadProjectSummaryTemplateSucceeded,
  DownloadProjectSummaryTemplateSucceededType,
  GetSummaryPastHistoryListFailed,
  GetSummaryPastHistoryListSucceeded,
  GetSummaryPastHistoryRequestedType,
  GetSummaryPastHistorySucceededType,
  GetSummaryPendingUpdateListFailed,
  GetSummaryPendingUpdateListSucceeded,
  GetSummaryPendingUpdateRequestedType,
  GetSummaryPendingUpdateSucceededType,
  IsSummarySetupFailed,
  IsSummarySetupRequestedType,
  IsSummarySetupSucceeded,
  IsSummarySetupSucceededType,
  UpdateProjectSummaryStatusFailed,
  UpdateProjectSummaryStatusRequestedType,
  UpdateProjectSummaryStatusSucceeded,
  UpdateProjectSummaryStatusSucceededType,
  UploadProjectSummaryTemplateFailed,
  UploadProjectSummaryTemplateRequestedType,
  UploadProjectSummaryTemplateSetupFailed,
  UploadProjectSummaryTemplateSetupRequestedType,
  UploadProjectSummaryTemplateSetupSucceeded,
  UploadProjectSummaryTemplateSetupSucceededType,
  UploadProjectSummaryTemplateSucceeded,
  UploadProjectSummaryTemplateSucceededType,
} from "./actions";
import { successNotification } from "../../../../utils/notifications";

function* handleFetchSummaryPastHistoryList(action: GetSummaryPastHistoryRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: SummaryPastHistoryResponse = yield call(getSummaryPastHistoryAPI, accessToken, action.REAssetId, action.Type);
    const { isError } = handelReponseCode(undefined, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: GetSummaryPastHistorySucceededType = yield call(GetSummaryPastHistoryListSucceeded, response.data);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(GetSummaryPastHistoryListFailed());
  }
}

function* handleFetchSummaryPendingList(action: GetSummaryPendingUpdateRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: SummaryPendingResponse = yield call(getSummaryPendingAPI, accessToken, action.REAssetId, action.Type);
    const { isError } = handelReponseCode(undefined, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: GetSummaryPendingUpdateSucceededType = yield call(GetSummaryPendingUpdateListSucceeded, response.data);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(GetSummaryPendingUpdateListFailed());
  }
}

function* handleFetchIsSummarySetup(action: IsSummarySetupRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: IsSummarySetupResponse = yield call(isSummarySetupPendingAPI, accessToken, action.REAssetId,action.AssetName);
    const { isError } = handelReponseCode(undefined, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: IsSummarySetupSucceededType = yield call(IsSummarySetupSucceeded, response.data?.[0]);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(IsSummarySetupFailed());
  }
}

function* handleDeleteProjectSummaryDetails(action: DeleteProjectSummaryDetailsRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: DeleteProjectSummaryDetailsResponse = yield call(deleteProjectSummaryDetailsAPI, accessToken, action.payload);
    const { isError } = handelReponseCode(action.callback, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: DeleteProjectSummaryDetailsSucceededType = yield call(DeleteProjectSummaryDetailsSucceeded, response);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(DeleteProjectSummaryDetailsFailed());
  }
}

function* handleUpdateProjectSummaryStatus(action: UpdateProjectSummaryStatusRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: UpdateProjectSummaryStatusResponse = yield call(updateProjectSummaryStatusAPI, accessToken, action.payload);
    const { isError } = handelReponseCode(action.callback, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: UpdateProjectSummaryStatusSucceededType = yield call(UpdateProjectSummaryStatusSucceeded, response);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(UpdateProjectSummaryStatusFailed());
  }
}

function* handleDownloadProjectSummaryTemplate(action: DownloadProjectSummaryTemplateRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response = yield call(downloadProjectSummaryTemplateAPI, accessToken, action.reAssetId, action.typecheck);
    const { isError } = handleDownloadResponseCheck(action.callback, response, "Download Failed...");
    if (isError) {
      throw new Error(response?.info?.message || "API Failed...");
    } else {
      yield call(successNotification, "Download Succeeded...");
      const next: DownloadProjectSummaryTemplateSucceededType = yield call(DownloadProjectSummaryTemplateSucceeded);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(DownloadProjectSummaryTemplateFailed());
  }
}

function* handleCanSetupProjectSummary(action: CanSetupProjectSummaryRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: CanSetupProjectSummaryResponse = yield call(canSetupProjectSummaryAPI, accessToken, action.reAssetId);
    const { isError } = handelReponseCode(action.callback, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: CanSetupProjectSummarySucceededType = yield call(CanSetupProjectSummarySucceeded, response?.data?.[0]);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(CanSetupProjectSummaryFailed());
  }
}

function* handleCheckProjectSummaryDetailExist(action: CheckProjectSummaryDetailsExistRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: CheckProjectSummaryDetailsExistResponse = yield call(
      checkProjectSummaryDetailExistAPI,
      accessToken,
      action.reAssetId,
      action.typeCheck,
      action.MisDate,
    );
    const { isError } = handelReponseCode(action?.callback, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: CheckProjectSummaryDetailsExistSucceededType = yield call(CheckProjectSummaryDetailsExistSucceeded, response.data?.[0]);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(CheckProjectSummaryDetailsExistFailed());
  }
}

function* handleUploadProjectSummaryTemplate(action: UploadProjectSummaryTemplateRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: UploadProjectSummaryTemplateResponse = yield call(uploadProjectSummaryTemplateAPI, accessToken, action.payload);
    const { isError } = handelReponseCode(action.callback, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: UploadProjectSummaryTemplateSucceededType = yield call(UploadProjectSummaryTemplateSucceeded, response);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(UploadProjectSummaryTemplateFailed());
  }
}

function* handleUploadProjectSummarySetup(action: UploadProjectSummaryTemplateSetupRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: UploadProjectSummaryTemplateSetupResponse = yield call(uploadProjectSummarySetupAPI, accessToken, action.payload);
    const { isError } = handelReponseCode(action.callback, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: UploadProjectSummaryTemplateSetupSucceededType = yield call(UploadProjectSummaryTemplateSetupSucceeded, response);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(UploadProjectSummaryTemplateSetupFailed());
  }
}

function* summarySaga() {
  yield takeLeading(actionTypes.GET_SUMMARY_PAST_HISTORY_REQUESTED, handleFetchSummaryPastHistoryList);
  yield takeLeading(actionTypes.GET_SUMMARY_PENDING_UPDATE_REQUESTED, handleFetchSummaryPendingList);
  yield takeLeading(actionTypes.IS_SUMMARY_SETUP_REQUESTED, handleFetchIsSummarySetup);
  yield takeLeading(actionTypes.DELETE_PROJECT_SUMMARY_DETAILS_REQUESTED, handleDeleteProjectSummaryDetails);
  yield takeLeading(actionTypes.UPDATE_PROJECT_SUMMARY_STATUS_REQUESTED, handleUpdateProjectSummaryStatus);
  yield takeLeading(actionTypes.DOWNLOAD_PROJECT_SUMMARY_TEMPLATE_REQUESTED, handleDownloadProjectSummaryTemplate);
  yield takeLeading(actionTypes.CAN_SETUP_PROJECT_SUMMARY_REQUESTED, handleCanSetupProjectSummary);
  yield takeLeading(actionTypes.CHECK_PROJECT_SUMMARY_DETAILS_EXIST_REQUESTED, handleCheckProjectSummaryDetailExist);
  yield takeLeading(actionTypes.UPLOAD_PROJECT_SUMMARY_TEMPLATE_REQUESTED, handleUploadProjectSummaryTemplate);
  yield takeLeading(actionTypes.UPLOAD_PROJECT_SUMMARY_SETUP_REQUESTED, handleUploadProjectSummarySetup);
}

export default summarySaga;
