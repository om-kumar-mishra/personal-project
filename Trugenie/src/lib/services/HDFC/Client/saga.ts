import { call, put, select, takeLeading } from "redux-saga/effects";
import { handelReponseCode } from "../../../../modules/Components/UtilityFunctions";
import { selectAccessToken } from "../../hdfc_login/selectors";
import * as ActionTypes from "./types";
import { AddClientTypeRequested, AddClientTypeSucceeded, GetClientTypeSucceeded, addClientFailed, addClientSucceeded, getClientListFailed, getClientListSucceeded } from "./actions";
import { AddClientResponse, ClientListResponse } from "./dataTypes";
import { addClientAPI, getClientAPI } from "./api";

function* handleGetClientList() {
  const accessToken = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const result: ClientListResponse = yield call(getClientAPI, accessToken);
    const { isError } = handelReponseCode(undefined, result?.info, "Failed to fetch client list...");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: GetClientTypeSucceeded = yield call(getClientListSucceeded, result.data);
      yield put(next);
    }
  } catch (error: any) {
    yield put(getClientListFailed());
  }
}

function* handleAddClient(action: AddClientTypeRequested) {
  const accessToken = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const result: AddClientResponse = yield call(addClientAPI, accessToken, action.payload);
    const { isError } = handelReponseCode(action.onSuccessCallback, result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: AddClientTypeSucceeded = yield call(addClientSucceeded);
      yield put(next);
    }
  } catch (error: any) {
    yield put(addClientFailed());
  }
}

function* clientSaga() {
  yield takeLeading(ActionTypes.GET_CLIENT_LIST_REQUESTED, handleGetClientList);
  yield takeLeading(ActionTypes.ADD_CLIENT_REQUESTED, handleAddClient);
}

export default clientSaga;
