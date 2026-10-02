import { call, put, select, takeLatest } from "redux-saga/effects";
import { handelReponseCode } from "../../../../modules/Components/UtilityFunctions";
import { selectAccessToken } from "../../hdfc_login/selectors";
import {
  AddZoneTypeRequested,
  DeleteZoneTypeRequested,
  GetZonesTypeRequested,
  UpdateZoneTypeRequested,
  addZoneSucceeded,
  deleteZoneSucceeded,
  getZonesListSucceeded,
  updateZoneSucceeded,
} from "./actions";
import { addZoneAPI, deleteZoneAPI, getZonesListAPI, updateZoneAPI } from "./api";
import { ZonesList } from "./dataTypes";
import * as ActionTypes from "./types";

function* handleGetZones(action: GetZonesTypeRequested) {
  const accessToken = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const result: ZonesList = yield call(getZonesListAPI, accessToken, action.client, action.createdby);
    const { isError } = handelReponseCode(undefined, result?.info, "Failed to fetch zone list...");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next = yield call(getZonesListSucceeded, result);
      yield put(next);
    }
  } catch (error: any) {
    yield put({
      type: ActionTypes.GET_ZONES_LIST_FAILED,
    });
  }
}

function* handleDeleteZone(action: DeleteZoneTypeRequested) {
  const accessToken = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const result: ZonesList = yield call(deleteZoneAPI, accessToken, action.zoneId, action.createdBy);
    const { isError } = handelReponseCode(action?.onSuccessCallback, result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      yield put(deleteZoneSucceeded());
    }
  } catch (e: any) {
    yield put({
      type: ActionTypes.DELETE_ZONE_FAILED,
    });
  }
}

function* handleAddZone(action: AddZoneTypeRequested) {
  const accessToken = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const result: ZonesList = yield call(addZoneAPI, accessToken, action.client, action.zonename, action.createdBy);
    const { isError } = handelReponseCode(action.onSuccessCallback, result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      yield put(addZoneSucceeded());
    }
  } catch (error: any) {
    yield put({
      type: ActionTypes.ADD_ZONE_FAILED,
      message: error.message,
    });
  }
}

function* handleUpdateZone(action: UpdateZoneTypeRequested) {
  const accessToken = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const result: ZonesList = yield call(updateZoneAPI, accessToken, action.zonename, action.zoneId, action.createdBy);
    const { isError } = handelReponseCode(action.onSuccessCallback, result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      yield put(updateZoneSucceeded());
    }
  } catch (e: any) {
    yield put({
      type: ActionTypes.UPDATE_ZONE_FAILED,
      message: e.message,
    });
  }
}

function* zonesSaga() {
  yield takeLatest(ActionTypes.GET_ZONES_LIST_REQUESTED, handleGetZones);
  yield takeLatest(ActionTypes.DELETE_ZONE_REQUESTED, handleDeleteZone);
  yield takeLatest(ActionTypes.ADD_ZONE_REQUESTED, handleAddZone);
  yield takeLatest(ActionTypes.UPDATE_ZONE_REQUESTED, handleUpdateZone);
}

export default zonesSaga;
