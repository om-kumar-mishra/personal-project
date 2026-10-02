import { call, put, select, takeLeading } from "redux-saga/effects";
import { selectAccessToken } from "../hdfc_login/selectors";
import * as Api from "./api";
import { NOCDashboardDetailsResponse, NOCDashboardTowerViewResponse, NocDashboardAction } from "./datatypes";
import { NocActionType } from "./types";

function* getREWingList(action: NocDashboardAction) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const result: number | string | Response = yield call(Api.getREWing, accessToken, action.reAssetId);
    if ((result as Response)?.ok === false) {
      throw new Error("API Call Failed.");
    } else {
      yield put({
        type: NocActionType.GET_WING_SUCCESS,
        result: result,
      });
    }
  } catch (e: any) {
    yield put({
      type: NocActionType.GET_WING_FAILED,
      message: e.message,
    });
  }
}

function* getNOCDashboardDetails(action: NocDashboardAction) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const result: NOCDashboardDetailsResponse | Response = yield call(Api.getNOCDashboardDetails, accessToken, action.payload);
    if ((result as Response)?.ok === false) {
      throw new Error("API Call Failed.");
    } else {
      yield put({
        type: NocActionType.GET_NOC_DASHBOARD_DETAIL_SUCCESS,
        result: result,
      });
    }
  } catch (e: any) {
    yield put({
      type: NocActionType.GET_NOC_DASHBOARD_DETAIL_FAILED,
      message: e.message,
    });
  }
}

function* getNOCDashboardTowerView(action: NocDashboardAction) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const result: NOCDashboardTowerViewResponse | Response = yield call(Api.getNOCDashboardTowerView, accessToken, action.payload);
    if ((result as Response)?.ok === false) {
      throw new Error("API Call Failed.");
    } else {
      yield put({
        type: NocActionType.GET_NOC_DASHBOARD_TOWER_SUCCESS,
        result: result,
      });
    }
  } catch (e: any) {
    yield put({
      type: NocActionType.GET_NOC_DASHBOARD_TOWER_FAILED,
      message: e.message,
    });
  }
}

export default function* nocDashboardSaga() {
  yield takeLeading(NocActionType.GET_WING_REQUESTED, getREWingList);
  yield takeLeading(NocActionType.GET_NOC_DASHBOARD_DETAIL_REQUESTED, getNOCDashboardDetails);
  yield takeLeading(NocActionType.GET_NOC_DASHBOARD_TOWER_REQUESTED, getNOCDashboardTowerView);
}
