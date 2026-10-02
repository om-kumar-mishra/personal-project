import { call, put, select, takeLatest } from "redux-saga/effects";
import { handelReponseCode } from "../../../../modules/Components/UtilityFunctions";
import { selectAccessToken } from "../../hdfc_login/selectors";
import {
  AddRegionTypeRequested,
  DeleteRegionTypeRequested,
  GetRegionTypeRequested,
  addRegionSucceeded,
  deleteRegionSucceeded,
  getRegionListSucceeded,
} from "./actions";
import { addRegionAPI, deleteRegionAPI, getRegionListAPI } from "./api";
import { RegionList } from "./dataTypes";
import * as ActionTypes from "./types";

function* handleGetRegion(action: GetRegionTypeRequested) {
  const accessToken = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const result: RegionList = yield call(getRegionListAPI, accessToken, action.client, action.createdBy);
    const { isError } = handelReponseCode(undefined, result?.info, "Failed to fetch region list...");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      yield put(getRegionListSucceeded(result.data));
    }
  } catch (error: any) {
    yield put({
      type: ActionTypes.GET_REGION_LIST_FAILED,
    });
  }
}

function* handleDeleteRegion(action: DeleteRegionTypeRequested) {
  const accessToken = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const result: RegionList = yield call(deleteRegionAPI, accessToken, action.regionId, action.createdBy);
    const { isError } = handelReponseCode(action?.onSuccessCallback, result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      yield put(deleteRegionSucceeded());
    }
  } catch (error: any) {
    yield put({
      type: ActionTypes.DELETE_REGION_FAILED,
      message: error.message,
    });
  }
}

function* handleAddRegion(action: AddRegionTypeRequested) {
  const accessToken = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const result: RegionList = yield call(addRegionAPI, accessToken, action.client, action.regionName, action.createdBy, action.zoneID);
    const { isError } = handelReponseCode(action.onSuccessCallback, result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      yield put(addRegionSucceeded());
    }
  } catch (error: any) {
    yield put({
      type: ActionTypes.ADD_REGION_FAILED,
      message: error.message,
    });
  }
}

function* RegionSaga() {
  yield takeLatest(ActionTypes.GET_REGION_LIST_REQUESTED, handleGetRegion);
  yield takeLatest(ActionTypes.DELETE_REGION_REQUESTED, handleDeleteRegion);
  yield takeLatest(ActionTypes.ADD_REGION_REQUESTED, handleAddRegion);
}

export default RegionSaga;
