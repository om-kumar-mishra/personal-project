import { call, put, select, takeLeading } from "redux-saga/effects";
import { handelReponseCode } from "../../../modules/Components/UtilityFunctions";
import { selectAccessToken } from "../hdfc_login/selectors";
import {
  AccountDelinquentUpdateRequestedAction,
  AccountDelinquentUpdateSucceededAction,
  CashCoverCalculateRequestedAction,
  CashCoverCalculateSucceededAction,
  CashCoverUpdateRequestedAction,
  CashCoverUpdateSucceededAction,
  GetUpdateHoldStatusRequestedAction,
  GetUpdateHoldStatusSucceededAction,
  NOCProjectPrefrenceRequestedAction,
  NOCProjectPrefrenceSucceededAction,
  ReProjectExposureRequestedAction,
  ReProjectExposureSucceededAction,
  ReProjectSecurityRequestedAction,
  ReProjectSecuritySucceededAction,
  ReProjectSecurityUpdateRequestedAction,
  ReProjectSecurityUpdateSucceededAction,
  UpdateHoldStatusRequestedAction,
  UpdateHoldStatusSucceededAction,
  accountDelinquentUpdateSucceeded,
  cashCoverCalculateSucceeded,
  cashCoverUpdateSucceeded,
  getUpdateHoldStatusSucceeded,
  nocProjectPrefrenceSucceeded,
  reProjectExposureSucceeded,
  reProjectSecuritySucceeded,
  reProjectSecurityUpdateSucceeded,
  updateHoldStatusSucceeded,
} from "./actions";
import {
  calculateCashCoverAPI,
  getUpdateHoldStatusAPI,
  nocProjectPrefrenceAPI,
  reProjectExposureAPI,
  reProjectSecurityAPI,
  updateAccountDelinquentAPI,
  updateCashCoverAPI,
  updateHoldStatusAPI,
  updateReprojectSecurityAPI,
} from "./api";
import {
  CalculateCashCoverResponse,
  GetUpdateHoldStatusResponse,
  NOCProjectPrefrenceResponse,
  ReProjectExposureResponse,
  ReProjectSecurityResponse,
} from "./dataTypes";
import * as types from "./types";

function* handleNOCProjectPrefrence(action: NOCProjectPrefrenceRequestedAction): Generator<any, any, any> {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);

    if (accessToken === undefined) {
      throw new TypeError("Access Token Required for API Call.");
    }
    const result: NOCProjectPrefrenceResponse = yield call(nocProjectPrefrenceAPI, action.reAssetId, accessToken);

    const { isError } = handelReponseCode(action.callback, result?.info, "Failed to fetch prefernce list...");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: NOCProjectPrefrenceSucceededAction = yield call(nocProjectPrefrenceSucceeded, result);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put({
      type: types.NOC_PROJECT_PREFRENCE_FAILED,
    });
  }
}

function* handleReProjectExposure(action: ReProjectExposureRequestedAction): Generator<any, any, any> {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);

    if (accessToken === undefined) {
      throw new TypeError("Access Token Required for API Call.");
    }
    const result: ReProjectExposureResponse = yield call(reProjectExposureAPI, action.reAssetId, accessToken);
    const { isError } = handelReponseCode(action.callback, result?.info, "Failed to fetch exposure list...");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: ReProjectExposureSucceededAction = yield call(reProjectExposureSucceeded, result);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put({
      type: types.REPROJECT_EXPOSURE_FAILED,
    });
  }
}

function* handleReProjectSecurity(action: ReProjectSecurityRequestedAction): Generator<any, any, any> {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);

    if (accessToken === undefined) {
      throw new TypeError("Access Token Required for API Call.");
    }
    const result: ReProjectSecurityResponse = yield call(reProjectSecurityAPI, action.reAssetId, accessToken);
    const { isError } = handelReponseCode(action.callback, result?.info, "Failed to fetch project security list...");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: ReProjectSecuritySucceededAction = yield call(reProjectSecuritySucceeded, result);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put({
      type: types.REPROJECT_SECURITY_FAILED,
    });
  }
}

function* handleUpdateCashCover(action: CashCoverUpdateRequestedAction): Generator<any, any, any> {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);

    if (accessToken === undefined) {
      throw new TypeError("Access Token Required for API Call.");
    }
    const result: any | null = yield call(updateCashCoverAPI, action.data, accessToken);
    const { isError } = handelReponseCode(action.callback, result?.info, "Failed to update cash cover...");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: CashCoverUpdateSucceededAction = yield call(cashCoverUpdateSucceeded, result);
      yield put(next);
      action.callback && action.callback(true);
    }
  } catch (error: unknown) {
    yield put({
      type: types.UPDATE_CASH_COVER_FAILED,
    });
  }
}

function* handleUpdateReProjectSecurity(action: ReProjectSecurityUpdateRequestedAction): Generator<any, any, any> {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);

    if (accessToken === undefined) {
      throw new TypeError("Access Token Required for API Call.");
    }
    const result: any | null = yield call(updateReprojectSecurityAPI, action.data, accessToken);
    if (result === null) {
      throw new Error("Failed to Update Cash Cover.");
    } else {
      const { isError } = handelReponseCode(action.callback, result?.info);
      if (isError) {
        throw new Error("API Call Failed.");
      } else {
        const next: ReProjectSecurityUpdateSucceededAction = yield call(reProjectSecurityUpdateSucceeded, result);
        yield put(next);
      }
    }
  } catch (error: unknown) {
    yield put({
      type: types.UPDATE_REPROJECT_SECURITY_FAILED,
    });
  }
}

function* handleCalculateCashCover(action: CashCoverCalculateRequestedAction): Generator<any, any, any> {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);

    if (accessToken === undefined) {
      throw new TypeError("Access Token Required for API Call.");
    }
    const result: CalculateCashCoverResponse = yield call(calculateCashCoverAPI, action.data, accessToken);
    const { isError } = handelReponseCode(undefined, result?.info, "Failed to update calculate...");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: CashCoverCalculateSucceededAction = yield call(cashCoverCalculateSucceeded, result);
      yield put(next);
      action.callback && action.callback(true);
    }
  } catch (error: unknown) {
    yield put({
      type: types.CALCULATE_CASH_COVER_FAILED,
    });
  }
}

function* handleAccountDelinquent(action: AccountDelinquentUpdateRequestedAction): Generator<any, any, any> {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);

    if (accessToken === undefined) {
      throw new TypeError("Access Token Required for API Call.");
    }
    const result: any | null = yield call(updateAccountDelinquentAPI, action.reAssetId, action.value, action.misdate, accessToken);
    const { isError } = handelReponseCode(action.callback, result?.info, "Failed to update account delinquenct...");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: AccountDelinquentUpdateSucceededAction = yield call(accountDelinquentUpdateSucceeded, result);
      yield put(next);
      action.callback && action.callback(true);
    }
  } catch (error: unknown) {
    yield put({
      type: types.UPDATE_ACCOUNT_DELINQUENT_FAILED,
      // message: error.message,
    });
  }
}
function* handleUpdateHoldStatus(action: UpdateHoldStatusRequestedAction): Generator<any, any, any> {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);

    if (accessToken === undefined) {
      throw new TypeError("Access Token Required for API Call.");
    }
    const result: any | null = yield call(
      updateHoldStatusAPI,
      action.ReAssetId,
      action.onHold,
      action.StateOndate,
      action.Remarks,
      action.createdBy,
      accessToken,
    );
    const { isError } = handelReponseCode(action.callback, result?.info, "Failed to update hold status...");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: UpdateHoldStatusSucceededAction = yield call(updateHoldStatusSucceeded, result);
      yield put(next);
      action.callback && action.callback(true);
    }
  } catch (error: unknown) {
    yield put({
      type: types.UPDATE_HOLD_STATUS_FAILED,
      // message: error.message,
    });
  }
}
function* handleGetUpdateHoldSatus(action: GetUpdateHoldStatusRequestedAction): Generator<any, any, any> {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);

    if (accessToken === undefined) {
      throw new TypeError("Access Token Required for API Call.");
    }
    const result: GetUpdateHoldStatusResponse = yield call(getUpdateHoldStatusAPI, action.reAssetId, accessToken);
    const { isError } = handelReponseCode(action.callback, result?.info, "Failed to fetch hold status...");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: GetUpdateHoldStatusSucceededAction = yield call(getUpdateHoldStatusSucceeded, result);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put({
      type: types.GET_UPDATE_HOLD_STATUS_FAILED,
    });
  }
}
function* NOCPrefrencesSaga() {
  yield takeLeading(types.NOC_PROJECT_PREFRENCE_REQUESTED, handleNOCProjectPrefrence);
  yield takeLeading(types.REPROJECT_EXPOSURE_REQUESTED, handleReProjectExposure);
  yield takeLeading(types.REPROJECT_SECURITY_REQUESTED, handleReProjectSecurity);
  yield takeLeading(types.UPDATE_CASH_COVER_REQUESTED, handleUpdateCashCover);
  yield takeLeading(types.UPDATE_REPROJECT_SECURITY_REQUESTED, handleUpdateReProjectSecurity);
  yield takeLeading(types.UPDATE_ACCOUNT_DELINQUENT_REQUESTED, handleAccountDelinquent);
  yield takeLeading(types.UPDATE_HOLD_STATUS_REQUESTED, handleUpdateHoldStatus);
  yield takeLeading(types.CALCULATE_CASH_COVER_REQUESTED, handleCalculateCashCover);
  yield takeLeading(types.GET_UPDATE_HOLD_STATUS_REQUESTED, handleGetUpdateHoldSatus);
}
export default NOCPrefrencesSaga;
