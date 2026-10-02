import { call, put, select, takeLatest } from "redux-saga/effects";
import { handelReponseCode } from "../../../../modules/Components/UtilityFunctions";
import { selectAccessToken } from "../../hdfc_login/selectors";
import {
  AddDeveloperLocationTypeRequested,
  DeleteDeveloperLocationTypeRequested,
  GetDeveloperLocationTypeRequested,
  AddDeveloperLocationSucceeded,
  deleteDeveloperLocationSucceeded,
  GetDeveloperLocationListSucceeded,
} from "./actions";
import { addDeveloperLocationAPI, DeleteDeveloperLocationAPI, getDeveloperLocationListAPI } from "./api";
import { LocationList } from "./dataTypes";
import * as ActionTypes from "./types";

function* handleGetLocation(action: GetDeveloperLocationTypeRequested) {
  const accessToken = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const result: LocationList = yield call(getDeveloperLocationListAPI, accessToken, action.client, action.createdBy);
    console.log(result);
    const { isError } = handelReponseCode(undefined, result?.info, "Failed to fetch Location list...");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      yield put(GetDeveloperLocationListSucceeded(result.data));
    }
  } catch (error: any) {
    yield put({
      type: ActionTypes.GET_DEVELOPER_LOCATION_LIST_FAILED,
    });
  }
}

function* handleDeleteDeveloperLocation(action: DeleteDeveloperLocationTypeRequested) {
  const accessToken = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const result: LocationList = yield call(DeleteDeveloperLocationAPI, accessToken, action.LocationId, action.createdBy, action.clientId);

    const { isError } = handelReponseCode(action.onSuccessCallback, result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      yield put(deleteDeveloperLocationSucceeded());
      action.onSuccessCallback && action.onSuccessCallback(true);
    }
  } catch (error: any) {
    yield put({
      type: ActionTypes.DELETE_DEVELOPER_LOCATION_FAILED,
      message: error.message,
    });
  }
}

function* handleAddDeveloperLocation(action: AddDeveloperLocationTypeRequested) {
  const accessToken = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const result: LocationList = yield call(addDeveloperLocationAPI, accessToken, action.clientId,  action.CreatedBy, action.locationsName,);
    const { isError } = handelReponseCode(action?.onSuccessCallback, result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      yield put(AddDeveloperLocationSucceeded());
    }
  } catch (error: any) {
    yield put({
      type: ActionTypes.ADD_DEVELOPER_LOCATION_FAILED,
    });
  }
}

function* DeveloperlocationSaga() {
  yield takeLatest(ActionTypes.GET_DEVELOPER_LOCATION_LIST_REQUESTED, handleGetLocation);
  yield takeLatest(ActionTypes.DELETE_DEVELOPER_LOCATION_REQUESTED, handleDeleteDeveloperLocation);
  yield takeLatest(ActionTypes.ADD_DEVELOPER_LOCATION_REQUESTED, handleAddDeveloperLocation);
}

export default DeveloperlocationSaga;
