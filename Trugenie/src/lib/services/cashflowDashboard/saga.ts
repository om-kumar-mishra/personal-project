import { handelReponseCode } from "../../../modules/Components/UtilityFunctions";
import { selectAccessToken } from "../hdfc_login/selectors";
import {
  GetBuisnessPlanListRequestAction,
  GetBuisnessPlanListSuccessAction,
  GetMisdatesFiltersRequestAction,
  GetMisdatesFiltersSucceeded,
  fetchBuisnessPlanListSuccess,
  fetchMisdatesFiltersSucceeded,
} from "./action";
import { getBuisnessPlanListApi, getMisdatesFiltersAPI } from "./api";
import { BuisnessPlanList, BuisnessPlanListReponse, CashflowFilterReponse, MisdatesFilters } from "./dataTypes";
import * as types from "./types";
import { call, put, select, takeLeading } from "redux-saga/effects";

// buisness and underwritten
function* fetchBuisnessPlanList(action: GetBuisnessPlanListRequestAction): Generator<any, any, any> {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: BuisnessPlanListReponse = yield call(getBuisnessPlanListApi, action.reassetid, action.misDate, accessToken);
    const { isError } = handelReponseCode(undefined, response?.info);
    if (isError) {
      throw new Error(response?.info?.message || "API Failed...");
    } else {
      const next: GetBuisnessPlanListSuccessAction = yield call(fetchBuisnessPlanListSuccess, (response.data as BuisnessPlanList) ?? null);
      yield put(next);
    }
  } catch (error: any) {
    yield put({
      type: types.GET_BUISNESS_PLAN_LIST_FAILURE,
    });
  }
}

// misdates
function* fetchMisdatesCashflowList(action: GetMisdatesFiltersRequestAction): Generator<any, any, any> {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const { reassetid } = action;
    const response: CashflowFilterReponse = yield call(getMisdatesFiltersAPI, reassetid, accessToken);
    const { isError } = handelReponseCode(undefined, response?.info);
    if (isError) {
      throw new Error(response?.info?.message || "API Failed...");
    } else {
      const next: GetMisdatesFiltersSucceeded = yield call(fetchMisdatesFiltersSucceeded, response?.data as MisdatesFilters);
      yield put(next);
    }
  } catch {
    yield put({
      type: types.GET_MISDATE_CASHFLOW_LIST_FAILURE,
      // message: error.message,
    });
  }
}

function* CashflowDetailsSaga() {
  yield takeLeading(types.GET_BUISNESS_PLAN_LIST_REQUEST, fetchBuisnessPlanList);
  yield takeLeading(types.GET_MISDATE_CASHFLOW_LIST_REQUEST, fetchMisdatesCashflowList);
}

export default CashflowDetailsSaga;
