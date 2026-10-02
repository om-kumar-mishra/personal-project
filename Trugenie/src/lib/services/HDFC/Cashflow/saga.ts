import { call, put, select, takeLeading } from "redux-saga/effects";
import * as actionTypes from "./types";
import { selectAccessToken } from "../../hdfc_login/selectors";
import {
  CashflowPastHistoryResponse,
  DeleteCashflowDetailsResponse,
  IsCashflowSetupResponse,
  UpdateCashflowStatusResponse,
  UploadCashflowTemplateResponse,
  CashflowPendingResponse,
  CanSetupCashflowResponse,
  UploadCashflowSetupTemplateResponse,
  CheckCashflowDetailsExistResponse,
  CashflowSetupPendingListResponse,
  CashflowSetupPastUpdatesResponse,
} from "./dataTypes";
import { handelReponseCode, handleDownloadResponseCheck } from "../../../../modules/Components/UtilityFunctions";
import {
  downloadCashflowTemplateAPI,
  deleteCashflowDetailsAPI,
  getCashflowPastHistoryAPI,
  isCashflowSetupPeningAPI,
  updateCashflowStatusAPI,
  uploadCashflowActualPlanTemplateAPI,
  uploadCashflowProjectedPlanTemplateAPI,
  getCashflowPendingAPI,
  canSetupCashflowAPI,
  uploadCashflowUnderwrittenSetupAPI,
  uploadCashflowBusinessPlanSetupAPI,
  checkCashflowDetailExistAPI,
  getCashflowSetupPendingUpdatesAPI,
  getCashflowSetupPastUpdatesAPI,
} from "./api";
import {
  DeleteCashflowDetailsFailed,
  DeleteCashflowDetailsRequestedType,
  DeleteCashflowDetailsSucceeded,
  DeleteCashflowDetailsSucceededType,
  GetCashflowPastHistoryListFailed,
  GetCashflowPastHistoryListSucceeded,
  GetCashflowPastHistoryRequested,
  GetCashflowPastHistorySucceeded,
  IsCashflowSetupFailed,
  IsCashflowSetupRequestedType,
  IsCashflowSetupSucceeded,
  IsCashflowSetupSucceededType,
  DownloadCashflowTemplateFailed,
  DownloadCashflowTemplateRequestedType,
  DownloadCashflowTemplateSucceeded,
  DownloadCashflowTemplateSucceededType,
  UpdateCashflowStatusFailed,
  UpdateCashflowStatusRequestedType,
  UpdateCashflowStatusSucceeded,
  UpdateCashflowStatusSucceededType,
  UploadCashflowActualPlanTemplateRequestedType,
  UploadCashflowActualPlanTemplateSucceededType,
  UploadCashflowActualPlanTemplateSucceeded,
  UploadCashflowActualPlanTemplateFailed,
  UploadCashflowProjectedPlanTemplateRequestedType,
  UploadCashflowProjectedPlanTemplateSucceededType,
  UploadCashflowProjectedPlanTemplateSucceeded,
  UploadCashflowProjectedPlanTemplateFailed,
  GetCashflowPendingUpdateRequestedType,
  GetCashflowPendingUpdateSucceededType,
  GetCashflowPendingUpdateListSucceeded,
  GetCashflowPendingUpdateListFailed,
  CanSetupCashflowFailed,
  CanSetupCashflowRequestedType,
  CanSetupCashflowSucceeded,
  CanSetupCashflowSucceededType,
  UploadCashflowUnderwrittenTemplateSetupRequestedType,
  UploadCashflowUnderwrittenTemplateSetupSucceededType,
  UploadCashflowUnderwrittenTemplateSetupSucceeded,
  UploadCashflowUnderwrittenTemplateSetupFailed,
  UploadCashflowBusinessPlanTemplateSetupRequestedType,
  UploadCashflowBusinessPlanTemplateSetupSucceededType,
  UploadCashflowBusinessPlanTemplateSetupSucceeded,
  UploadCashflowBusinessPlanTemplateSetupFailed,
  CheckCashflowDetailsExistRequestedType,
  CheckCashflowDetailsExistSucceededType,
  CheckCashflowDetailsExistFailed,
  CheckCashflowDetailsExistSucceeded,
  GetCashflowSetupPendingListRequestedType,
  GetCashflowSetupPendingListSucceededType,
  getCashflowSetupPendingListSucceeded,
  getCashflowSetupPendingListFailed,
  GetCashflowSetupPastUpdatesFailed,
  GetCashflowSetupPastUpdatesSucceeded,
  GetCashflowSetupPastUpdatesRequestedType,
  GetCashflowSetupPastUpdatesSucceededType,
} from "./action";
import { successNotification } from "../../../../utils/notifications";

function* handleFetchCashflowPastHistoryList(action: GetCashflowPastHistoryRequested) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: CashflowPastHistoryResponse = yield call(getCashflowPastHistoryAPI, accessToken, action.reAssetId);
    const { isError } = handelReponseCode(undefined, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: GetCashflowPastHistorySucceeded = yield call(GetCashflowPastHistoryListSucceeded, response.data);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(GetCashflowPastHistoryListFailed());
  }
}

function* handleFetchIsCashflowSetup(action: IsCashflowSetupRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: IsCashflowSetupResponse = yield call(isCashflowSetupPeningAPI, accessToken, action.REAssetId);
    const { isError } = handelReponseCode(undefined, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: IsCashflowSetupSucceededType = yield call(IsCashflowSetupSucceeded, response.data?.[0]);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(IsCashflowSetupFailed());
  }
}

function* handleDeleteCashflowDetails(action: DeleteCashflowDetailsRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: DeleteCashflowDetailsResponse = yield call(deleteCashflowDetailsAPI, accessToken, action.payload);
    const { isError } = handelReponseCode(action.callback, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: DeleteCashflowDetailsSucceededType = yield call(DeleteCashflowDetailsSucceeded, response);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(DeleteCashflowDetailsFailed());
  }
}

function* handleUpdateCashflowStatus(action: UpdateCashflowStatusRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: UpdateCashflowStatusResponse = yield call(updateCashflowStatusAPI, accessToken, action.payload);
    const { isError } = handelReponseCode(action.callback, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: UpdateCashflowStatusSucceededType = yield call(UpdateCashflowStatusSucceeded, response);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(UpdateCashflowStatusFailed());
  }
}

function* handleDownloadCashflowTemplate(action: DownloadCashflowTemplateRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response = yield call(downloadCashflowTemplateAPI, accessToken, action.reAssetId, action.typecheck);
    const { isError } = handleDownloadResponseCheck(action.callback, response, "Download Failed...");
    if (isError) {
      throw new Error(response?.info?.message || "API Failed...");
    } else {
      yield call(successNotification, "Download Succeeded...");
      const next: DownloadCashflowTemplateSucceededType = yield call(DownloadCashflowTemplateSucceeded);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(DownloadCashflowTemplateFailed());
  }
}

function* handleUploadCashflowActualPlanTemplate(action: UploadCashflowActualPlanTemplateRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: UploadCashflowTemplateResponse = yield call(uploadCashflowActualPlanTemplateAPI, accessToken, action.payload);
    const { isError } = handelReponseCode(action.callback, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: UploadCashflowActualPlanTemplateSucceededType = yield call(UploadCashflowActualPlanTemplateSucceeded, response);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(UploadCashflowActualPlanTemplateFailed());
  }
}

function* handleUploadCashflowProjectedPlanTemplate(action: UploadCashflowProjectedPlanTemplateRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: UploadCashflowTemplateResponse = yield call(uploadCashflowProjectedPlanTemplateAPI, accessToken, action.payload);
    const { isError } = handelReponseCode(action.callback, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: UploadCashflowProjectedPlanTemplateSucceededType = yield call(UploadCashflowProjectedPlanTemplateSucceeded, response);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(UploadCashflowProjectedPlanTemplateFailed());
  }
}

function* handleFetchCashflowPendingList(action: GetCashflowPendingUpdateRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: CashflowPendingResponse = yield call(getCashflowPendingAPI, accessToken, action.REAssetId);
    const { isError } = handelReponseCode(undefined, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: GetCashflowPendingUpdateSucceededType = yield call(GetCashflowPendingUpdateListSucceeded, response.data);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(GetCashflowPendingUpdateListFailed());
  }
}

function* handleCanSetupCashflow(action: CanSetupCashflowRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: CanSetupCashflowResponse = yield call(canSetupCashflowAPI, accessToken, action.typeCheck, action.reAssetId);
    const { isError } = handelReponseCode(undefined, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: CanSetupCashflowSucceededType = yield call(CanSetupCashflowSucceeded, response.data?.[0]);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(CanSetupCashflowFailed());
  }
}

function* handleUploadCashflowUnderwrittenSetup(action: UploadCashflowUnderwrittenTemplateSetupRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: UploadCashflowSetupTemplateResponse = yield call(uploadCashflowUnderwrittenSetupAPI, accessToken, action.payload);
    const { isError } = handelReponseCode(action.callback, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: UploadCashflowUnderwrittenTemplateSetupSucceededType = yield call(UploadCashflowUnderwrittenTemplateSetupSucceeded, response);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(UploadCashflowUnderwrittenTemplateSetupFailed());
  }
}

function* handleUploadCashflowBusinessPlanSetup(action: UploadCashflowBusinessPlanTemplateSetupRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: UploadCashflowSetupTemplateResponse = yield call(uploadCashflowBusinessPlanSetupAPI, accessToken, action.payload);
    const { isError } = handelReponseCode(action.callback, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: UploadCashflowBusinessPlanTemplateSetupSucceededType = yield call(UploadCashflowBusinessPlanTemplateSetupSucceeded, response);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(UploadCashflowBusinessPlanTemplateSetupFailed());
  }
}

function* handleCheckCashflowDetailExist(action: CheckCashflowDetailsExistRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: CheckCashflowDetailsExistResponse = yield call(
      checkCashflowDetailExistAPI,
      accessToken,
      action.REAssetId,
      action.TypeCheck,
      action.MisDate,
    );
    const { isError } = handelReponseCode(action?.callback, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: CheckCashflowDetailsExistSucceededType = yield call(CheckCashflowDetailsExistSucceeded, response.data?.[0]);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(CheckCashflowDetailsExistFailed());
  }
}


function* handleFetchCashflowSetupPendingList(action: GetCashflowSetupPendingListRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: CashflowSetupPendingListResponse = yield call(getCashflowSetupPendingUpdatesAPI, accessToken, action.REAssetId);
    const { isError } = handelReponseCode(undefined, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: GetCashflowSetupPendingListSucceededType = yield call(getCashflowSetupPendingListSucceeded, response.data);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(getCashflowSetupPendingListFailed());
  }
}

function* handleFetchCashflowSetupPastUpdates(action: GetCashflowSetupPastUpdatesRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: CashflowSetupPastUpdatesResponse = yield call(getCashflowSetupPastUpdatesAPI, accessToken, action.reAssetId);
    const { isError } = handelReponseCode(undefined, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: GetCashflowSetupPastUpdatesSucceededType = yield call(GetCashflowSetupPastUpdatesSucceeded, response.data);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(GetCashflowSetupPastUpdatesFailed());
  }
}

function* cashflowSaga() {
  yield takeLeading(actionTypes.GET_CASHFLOW_PAST_HISTORY_REQUESTED, handleFetchCashflowPastHistoryList);
  yield takeLeading(actionTypes.IS_CASHFLOW_SETUP_REQUESTED, handleFetchIsCashflowSetup);
  yield takeLeading(actionTypes.DELETE_CASHFLOW_DETAILS_REQUESTED, handleDeleteCashflowDetails);
  yield takeLeading(actionTypes.UPDATE_CASHFLOW_STATUS_REQUESTED, handleUpdateCashflowStatus);
  yield takeLeading(actionTypes.DOWNLOAD_CASHFLOW_TEMPLATE_REQUESTED, handleDownloadCashflowTemplate);
  yield takeLeading(actionTypes.UPLOAD_CASHFLOW_ACTUAL_PLAN_TEMPLATE_REQUESTED, handleUploadCashflowActualPlanTemplate);
  yield takeLeading(actionTypes.UPLOAD_CASHFLOW_PROJECTED_PLAN_TEMPLATE_REQUESTED, handleUploadCashflowProjectedPlanTemplate);
  yield takeLeading(actionTypes.GET_CASHFLOW_PENDING_UPDATE_REQUESTED, handleFetchCashflowPendingList);
  yield takeLeading(actionTypes.GET_CASHFLOW_SETUP_PENDING_LIST_REQUESTED, handleFetchCashflowSetupPendingList);
  yield takeLeading(actionTypes.CAN_SETUP_CASHFLOW_REQUESTED, handleCanSetupCashflow);
  yield takeLeading(actionTypes.UPLOAD_CASHFLOW_UNDERWRITTEN_SETUP_REQUESTED, handleUploadCashflowUnderwrittenSetup);
  yield takeLeading(actionTypes.UPLOAD_CASHFLOW_BUSINESS_PLAN_SETUP_REQUESTED, handleUploadCashflowBusinessPlanSetup);
  yield takeLeading(actionTypes.CHECK_CASHFLOW_DETAILS_EXIST_REQUESTED, handleCheckCashflowDetailExist);
  yield takeLeading(actionTypes.GET_CASHFLOW_SETUP_PAST_UPDATE_REQUESTED, handleFetchCashflowSetupPastUpdates);
}

export default cashflowSaga;
