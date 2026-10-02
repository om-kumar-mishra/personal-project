import { call, put, select, takeLeading } from "redux-saga/effects";
import * as actionTypes from "./types";
import { selectAccessToken } from "../../hdfc_login/selectors";
import {
  CanSetupInvestmentResponse,
  CheckInvestmentDetailsExistResponse,
  DeleteInvestmentDetailsResponse,
  InvestmentDeveloperResponse,
  InvestmentFundsResponse,
  InvestmentListResponse,
  InvestmentPastHistoryResponse,
  InvestmentPendingResponse,
  IsInvestmentSetupResponse,
  UpdateInvestmentStatusResponse,
  UploadInvestmentSetupTemplateResponse,
  UploadInvestmentTemplateResponse,
} from "./dataTypes";
import { handelReponseCode, handleDownloadResponseCheck } from "../../../../modules/Components/UtilityFunctions";
import {
  canSetupInvestmentAPI,
  checkInvestmentDetailExistAPI,
  deleteInvestmentDetailsAPI,
  downloadInvestmentTemplateAPI,
  getInvestmentDeveloperAPI,
  getInvestmentFundsAPI,
  getInvestmentListAPI,
  getInvestmentPastHistoryAPI,
  getInvestmentPendingAPI,
  isInvestmentSetupPendingAPI,
  updateInvestmentStatusAPI,
  uploadInvestmentSetupTemplateAPI,
  uploadInvestmentTemplateAPI,
} from "./api";
import {
  CanSetupInvestmentFailed,
  CanSetupInvestmentRequestedType,
  CanSetupInvestmentSucceeded,
  CanSetupInvestmentSucceededType,
  CheckInvestmentDetailsExistFailed,
  CheckInvestmentDetailsExistRequestedType,
  CheckInvestmentDetailsExistSucceeded,
  CheckInvestmentDetailsExistSucceededType,
  DeleteInvestmentDetailsFailed,
  DeleteInvestmentDetailsRequestedType,
  DeleteInvestmentDetailsSucceeded,
  DeleteInvestmentDetailsSucceededType,
  DownloadInvestmentTemplateFailed,
  DownloadInvestmentTemplateRequestedType,
  DownloadInvestmentTemplateSucceeded,
  DownloadInvestmentTemplateSucceededType,
  GetInvestmentDeveloperFailed,
  GetInvestmentDeveloperRequestedType,
  GetInvestmentDeveloperSucceeded,
  GetInvestmentDeveloperSucceededType,
  GetInvestmentFundsFailed,
  GetInvestmentFundsRequestedType,
  GetInvestmentFundsSucceeded,
  GetInvestmentFundsSucceededType,
  GetInvestmentListDataFailed,
  GetInvestmentListDataRequestedType,
  GetInvestmentListDataSucceeded,
  GetInvestmentListDataSucceededType,
  GetInvestmentPastHistoryListFailed,
  GetInvestmentPastHistoryListSucceeded,
  GetInvestmentPastHistoryRequestedType,
  GetInvestmentPastHistorySucceededType,
  GetInvestmentPendingUpdateListFailed,
  GetInvestmentPendingUpdateListSucceeded,
  GetInvestmentPendingUpdateRequestedType,
  GetInvestmentPendingUpdateSucceededType,
  IsInvestmentSetupFailed,
  IsInvestmentSetupRequestedType,
  IsInvestmentSetupSucceeded,
  IsInvestmentSetupSucceededType,
  UpdateInvestmentStatusFailed,
  UpdateInvestmentStatusRequestedType,
  UpdateInvestmentStatusSucceeded,
  UpdateInvestmentStatusSucceededType,
  UploadInvestmentSetupTemplateFailed,
  UploadInvestmentSetupTemplateRequestedType,
  UploadInvestmentSetupTemplateSucceeded,
  UploadInvestmentSetupTemplateSucceededType,
  UploadInvestmentTemplateFailed,
  UploadInvestmentTemplateRequestedType,
  UploadInvestmentTemplateSucceeded,
  UploadInvestmentTemplateSucceededType,
} from "./actions";
import { successNotification } from "../../../../utils/notifications";

function* handleFetchInvestmentPastHistoryList(action: GetInvestmentPastHistoryRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: InvestmentPastHistoryResponse = yield call(getInvestmentPastHistoryAPI, accessToken, action.REAssetId, action.Type);
    const { isError } = handelReponseCode(undefined, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: GetInvestmentPastHistorySucceededType = yield call(GetInvestmentPastHistoryListSucceeded, response.data);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(GetInvestmentPastHistoryListFailed());
  }
}

function* handleFetchIsInvestmentSetup(action: IsInvestmentSetupRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: IsInvestmentSetupResponse = yield call(isInvestmentSetupPendingAPI, accessToken, action.InvestmentId);
    const { isError } = handelReponseCode(undefined, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: IsInvestmentSetupSucceededType = yield call(IsInvestmentSetupSucceeded, response.data?.[0]);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(IsInvestmentSetupFailed());
  }
}

function* handleDownloadInvestmentTemplate(action: DownloadInvestmentTemplateRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response = yield call(downloadInvestmentTemplateAPI, accessToken, action.investmentId, action.typecheck);
    const { isError } = handleDownloadResponseCheck(action.callback, response, "Download Failed...");
    if (isError) {
      throw new Error(response?.info?.message || "API Failed...");
    } else {
      yield call(successNotification, "Download Succeeded...");
      const next: DownloadInvestmentTemplateSucceededType = yield call(DownloadInvestmentTemplateSucceeded);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(DownloadInvestmentTemplateFailed());
  }
}

function* handleUploadInvestmentTemplate(action: UploadInvestmentTemplateRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: UploadInvestmentTemplateResponse = yield call(uploadInvestmentTemplateAPI, accessToken, action.payload);
    const { isError } = handelReponseCode(action.callback, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: UploadInvestmentTemplateSucceededType = yield call(UploadInvestmentTemplateSucceeded, response);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(UploadInvestmentTemplateFailed());
  }
}

function* handleUpdateInvestmentStatus(action: UpdateInvestmentStatusRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: UpdateInvestmentStatusResponse = yield call(updateInvestmentStatusAPI, accessToken, action.payload);
    const { isError } = handelReponseCode(action.callback, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: UpdateInvestmentStatusSucceededType = yield call(UpdateInvestmentStatusSucceeded, response);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(UpdateInvestmentStatusFailed());
  }
}

function* handleFetchInvestmentPendingList(action: GetInvestmentPendingUpdateRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: InvestmentPendingResponse = yield call(getInvestmentPendingAPI, accessToken, action.InvestmentId, action.Type);
    const { isError } = handelReponseCode(undefined, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: GetInvestmentPendingUpdateSucceededType = yield call(GetInvestmentPendingUpdateListSucceeded, response.data);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(GetInvestmentPendingUpdateListFailed());
  }
}



function* handleDeleteInvestmentDetails(action: DeleteInvestmentDetailsRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: DeleteInvestmentDetailsResponse = yield call(deleteInvestmentDetailsAPI, accessToken, action.payload);
    const { isError } = handelReponseCode(action.callback, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: DeleteInvestmentDetailsSucceededType = yield call(DeleteInvestmentDetailsSucceeded, response);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(DeleteInvestmentDetailsFailed());
  }
}

function* handleCheckInvestmentDetailExist(action: CheckInvestmentDetailsExistRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: CheckInvestmentDetailsExistResponse = yield call(
      checkInvestmentDetailExistAPI,
      accessToken,
      action.InvestmentId,
      action.typeCheck,
      action.MisDate,
    );
    const { isError } = handelReponseCode(action?.callback, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: CheckInvestmentDetailsExistSucceededType = yield call(CheckInvestmentDetailsExistSucceeded, response.data?.[0]);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(CheckInvestmentDetailsExistFailed());
  }
}

function* handleFetchInvestmentDataList(action: GetInvestmentListDataRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: InvestmentListResponse = yield call(getInvestmentListAPI, accessToken, action.ClientId, action.CreatedBy, action.developerid, action.fundid);
    const { isError } = handelReponseCode(undefined, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: GetInvestmentListDataSucceededType = yield call(GetInvestmentListDataSucceeded, response.data);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(GetInvestmentListDataFailed());
  }
}

function* handleFetchInvestmentFundsList(action: GetInvestmentFundsRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: InvestmentFundsResponse = yield call(getInvestmentFundsAPI, accessToken, action.ClientId, action.CreatedBy);
    const { isError } = handelReponseCode(undefined, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: GetInvestmentFundsSucceededType = yield call(GetInvestmentFundsSucceeded, response.data);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(GetInvestmentFundsFailed());
  }
}
function* handleFetchInvestmentDeveloperList(action: GetInvestmentDeveloperRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: InvestmentDeveloperResponse = yield call(getInvestmentDeveloperAPI, accessToken, action.ClientId, action.CreatedBy);
    const { isError } = handelReponseCode(undefined, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: GetInvestmentDeveloperSucceededType = yield call(GetInvestmentDeveloperSucceeded, response.data);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(GetInvestmentDeveloperFailed());
  }
}

function* handleCanSetupInvestment(action: CanSetupInvestmentRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: CanSetupInvestmentResponse = yield call(canSetupInvestmentAPI, accessToken, action.InvestmentId);
    const { isError } = handelReponseCode(action.callback, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: CanSetupInvestmentSucceededType = yield call(CanSetupInvestmentSucceeded, response?.data?.[0]);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(CanSetupInvestmentFailed());
  }
}


function* handleUploadInvestmentSetupTemplate(action: UploadInvestmentSetupTemplateRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: UploadInvestmentSetupTemplateResponse = yield call(uploadInvestmentSetupTemplateAPI, accessToken, action.payload);
    const { isError } = handelReponseCode(action.callback, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: UploadInvestmentSetupTemplateSucceededType = yield call(UploadInvestmentSetupTemplateSucceeded, response);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(UploadInvestmentSetupTemplateFailed());
  }
}


function* investmentSaga() {
  yield takeLeading(actionTypes.GET_INVESTMENT_PAST_HISTORY_REQUESTED, handleFetchInvestmentPastHistoryList);
  yield takeLeading(actionTypes.IS_INVESTMENT_SETUP_REQUESTED, handleFetchIsInvestmentSetup);
  yield takeLeading(actionTypes.DOWNLOAD_INVESTMENT_TEMPLATE_REQUESTED, handleDownloadInvestmentTemplate);
  yield takeLeading(actionTypes.UPLOAD_INVESTMENT_TEMPLATE_REQUESTED, handleUploadInvestmentTemplate);
  yield takeLeading(actionTypes.CHECK_INVESTMENT_DETAILS_EXIST_REQUESTED, handleCheckInvestmentDetailExist);
  yield takeLeading(actionTypes.UPDATE_INVESTMENT_STATUS_REQUESTED, handleUpdateInvestmentStatus);
   yield takeLeading(actionTypes.DELETE_INVESTMENT_DETAILS_REQUESTED, handleDeleteInvestmentDetails);
  yield takeLeading(actionTypes.GET_INVESTMENT_PENDING_UPDATE_REQUESTED, handleFetchInvestmentPendingList);
  yield takeLeading(actionTypes.GET_INVESTMENT_LIST_REQUESTED, handleFetchInvestmentDataList);
  yield takeLeading(actionTypes.GET_INVESTMENT_FUNDS_REQUESTED, handleFetchInvestmentFundsList);
  yield takeLeading(actionTypes.GET_INVESTMENT_DEVELOPER_REQUESTED, handleFetchInvestmentDeveloperList);
  yield takeLeading(actionTypes.CAN_SETUP_INVESTMENT_REQUESTED, handleCanSetupInvestment);
  yield takeLeading(actionTypes.UPLOAD_INVESTMENT_SETUP_TEMPLATE_REQUESTED, handleUploadInvestmentSetupTemplate);
}

export default investmentSaga;
