import { call, put, select, takeLeading } from "redux-saga/effects";
import { DashboardRemarkActionType as ActionTypes } from "./types";
import * as Api from "./api";
import {
  GetDashboardRemarkAction,
  GetDashboardRemarkResponse,
  InsertDashboardRemarkAction,
  InsertDashboardRemarkResponse,
} from "./dataType";
import { handelReponseCode } from "../../../modules/Components/UtilityFunctions";
import { selectAccessToken } from "../hdfc_login/selectors";

function* insertDashboardRemarkSaga(action: InsertDashboardRemarkAction) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const result: InsertDashboardRemarkResponse = yield call(Api.insertDashboardRemarkApi, accessToken, action.payload);
    const { isError } = handelReponseCode(undefined, result?.info, "Something Went Wrong!");
    if (isError) {
      throw new Error(result?.info?.message || "API Failed...");
    } else {
      yield put({
        type: ActionTypes.INSERT_DASHBOARD_REMARK_SUCCESS,
        result: result,
      });
    }
  } catch (e: any) {
    yield put({
      type: ActionTypes.INSERT_DASHBOARD_REMARK_FAILED,
      message: e.message,
    });
  }
}

function* getDashboardRemarkSaga(action: GetDashboardRemarkAction) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const result: GetDashboardRemarkResponse = yield call(Api.getDashboardRemarkApi, accessToken, action.payload);
    const { isError } = handelReponseCode(undefined, result?.info, "Something Went Wrong!");
    if (isError) {
      throw new Error(result?.info?.message || "API Failed...");
    } else {
      yield put({
        type: ActionTypes.GET_DASHBOARD_REMARK_SUCCESS,
        result: result,
      });
    }
  } catch (e: any) {
    yield put({
      type: ActionTypes.GET_DASHBOARD_REMARK_FAILED,
      message: e.message,
    });
  }
}


export default function* dashboardRemarkSaga() {
  yield takeLeading(ActionTypes.INSERT_DASHBOARD_REMARK_REQUESTED, insertDashboardRemarkSaga);
  yield takeLeading(ActionTypes.GET_DASHBOARD_REMARK_REQUESTED, getDashboardRemarkSaga);
}
