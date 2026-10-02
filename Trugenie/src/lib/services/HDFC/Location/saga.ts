import { call, put, select, takeLatest } from "redux-saga/effects";
import { handelReponseCode } from "../../../../modules/Components/UtilityFunctions";
import { selectAccessToken } from "../../hdfc_login/selectors";
import {
  AddLocationTypeRequested,
  DeleteLocationTypeRequested,
  GetLocationTypeRequested,
  addLocationSucceeded,
  deleteLocationSucceeded,
  getLocationListSucceeded,
} from "./actions";
import { addLocationAPI, deleteLocationAPI, getLocationListAPI } from "./api";
import { LocationList } from "./dataTypes";
import * as ActionTypes from "./types";

function* handleGetLocation(action: GetLocationTypeRequested) {
  const accessToken = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const result: LocationList = yield call(getLocationListAPI, accessToken, action.client, action.createdBy);
    console.log(result);
    const { isError } = handelReponseCode(undefined, result?.info, "Failed to fetch Location list...");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      yield put(getLocationListSucceeded(result.data));
    }
  } catch (error: any) {
    yield put({
      type: ActionTypes.GET_LOCATION_LIST_FAILED,
    });
  }
}

function* handleDeleteLocation(action: DeleteLocationTypeRequested) {
  const accessToken = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const result: LocationList = yield call(deleteLocationAPI, accessToken, action.LocationId, action.createdBy);

    const { isError } = handelReponseCode(action.onSuccessCallback, result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      yield put(deleteLocationSucceeded());
      action.onSuccessCallback && action.onSuccessCallback(true);
    }
  } catch (error: any) {
    yield put({
      type: ActionTypes.DELETE_LOCATION_FAILED,
      message: error.message,
    });
  }
}

function* handleAddLocation(action: AddLocationTypeRequested) {
  const accessToken = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const result: LocationList = yield call(addLocationAPI, accessToken, action.clientId, action.zoneid, action.CreatedBy, action.locationsName, action.regionId);
    const { isError } = handelReponseCode(action?.onSuccessCallback, result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      yield put(addLocationSucceeded());
    }
  } catch (error: any) {
    yield put({
      type: ActionTypes.ADD_LOCATION_FAILED,
    });
  }
}

function* locationSaga() {
  yield takeLatest(ActionTypes.GET_LOCATION_LIST_REQUESTED, handleGetLocation);
  yield takeLatest(ActionTypes.DELETE_LOCATION_REQUESTED, handleDeleteLocation);
  yield takeLatest(ActionTypes.ADD_LOCATION_REQUESTED, handleAddLocation);
}

export default locationSaga;
