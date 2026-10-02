import { call, put, select, takeLeading } from "redux-saga/effects";
import {
  AddLenderListFailed,
  AddLenderListRequestedType,
  AddLenderListSucceeded,
  AddLenderListSucceededType,
  GetLenderListFailed,
  GetLenderListRequestedType,
  GetLenderListSucceeded,
  GetLenderListSucceededType,
  AddUserLenderRequestedType,
  AddUserLenderSucceeded,
  AddUserLenderSucceededType,
  AddUserLenderFailed,
  GetClientUserListRequestedType,
  GetClientUserListSucceededType,
  GetClientUserListSucceeded,
  GetClientUserListFailed,
  RemoveUserLenderRequestedType,
  removeUserLenderSucceeded,
  RemoveUserLenderSucceededType,
  removeUserLenderFailed,
} from "./actions";
import { AddLenderListResponse, LenderListResponse, AddUserLenderResponse,getClientUserResponse,RemoveUserLenderResponse  } from "./dataTypes";
import { addLenderListAPI, getLenderListAPI, AddUserLenderAPI, ClientAllUserAPI, RemoveUserLenderAPI } from "./api";
import { handelReponseCode } from "../../../../modules/Components/UtilityFunctions";
import { selectAccessToken } from "../../hdfc_login/selectors";
import * as actionTypes from "./types";

function* handleFetchLenderList(action: GetLenderListRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: LenderListResponse = yield call(getLenderListAPI, accessToken, action.client, action.useremail);
    const { isError } = handelReponseCode(undefined, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: GetLenderListSucceededType = yield call(GetLenderListSucceeded, response.data);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(GetLenderListFailed());
  }
}

function* handleAddLenderList(action: AddLenderListRequestedType) {
  const accessToken = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const result: AddLenderListResponse = yield call(addLenderListAPI, accessToken, action.payload);
    const { isError } = handelReponseCode(action.callback, result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: AddLenderListSucceededType = yield call(AddLenderListSucceeded, result);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(AddLenderListFailed());
  }
}


function* handleAddUserLender(action: AddUserLenderRequestedType) {
  const accessToken = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const result: AddUserLenderResponse = yield call(AddUserLenderAPI, accessToken, action.payload);
    const { isError } = handelReponseCode(action.callback, result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: AddUserLenderSucceededType = yield call(AddUserLenderSucceeded, result);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(AddUserLenderFailed());
  }
}


function* handleGetClientAllUser(action: GetClientUserListRequestedType) {
  const accessToken = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const result: getClientUserResponse = yield call(ClientAllUserAPI, accessToken, action.clientId);
    const { isError } = handelReponseCode(undefined, result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: GetClientUserListSucceededType = yield call(GetClientUserListSucceeded, result);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(GetClientUserListFailed());
  }
}


function* handleRemoveUserLender(action: RemoveUserLenderRequestedType) {
  const accessToken = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const result: RemoveUserLenderResponse = yield call(RemoveUserLenderAPI, accessToken, action.EUId);
    const { isError } = handelReponseCode(action.callback, result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: RemoveUserLenderSucceededType = yield call(removeUserLenderSucceeded, result);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(removeUserLenderFailed());
  }
}

function* lenderSaga() {
  yield takeLeading(actionTypes.GET_LENDER_LIST_REQUESTED, handleFetchLenderList);
  yield takeLeading(actionTypes.ADD_LENDER_LIST_REQUESTED, handleAddLenderList);
  yield takeLeading(actionTypes.ADD_LENDER_USER_REQUESTED, handleAddUserLender);
  yield takeLeading(actionTypes.GET_CLIENT_ALL_USER_REQUESTED, handleGetClientAllUser);
  yield takeLeading(actionTypes.REMOVE_LENDER_USER_REQUESTED, handleRemoveUserLender);
  
}

export default lenderSaga;