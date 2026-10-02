import { call, put, select, takeLeading } from "redux-saga/effects";
import { AddFundsListResponse, DeleteFundsListResponse, FundsListResponse } from "./dataTypes";
import { addFundsListAPI, deleteFundsListAPI, getFundsListAPI } from "./api";
import { handelReponseCode } from "../../../../modules/Components/UtilityFunctions";
import { selectAccessToken } from "../../hdfc_login/selectors";
import * as actionTypes from "./types";
import {
  AddFundsListFailed,
  AddFundsListRequestedType,
  AddFundsListSucceeded,
  AddFundsListSucceededType,
  DeleteFundsListFailed,
  DeleteFundsListRequestedType,
  DeleteFundsListSucceeded,
  DeleteFundsListSucceededType,
  GetFundsListFailed,
  GetFundsListRequestedType,
  GetFundsListSucceeded,
  GetFundsListSucceededType
} from "./action";

function* handleFetchFundsList(action: GetFundsListRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: FundsListResponse = yield call(getFundsListAPI, accessToken, action.clientId, action.createdBy);
    const { isError } = handelReponseCode(undefined, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: GetFundsListSucceededType = yield call(GetFundsListSucceeded, response.data);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(GetFundsListFailed());
  }
}

function* handleAddFundsList(action: AddFundsListRequestedType) {
  const accessToken = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const result: AddFundsListResponse = yield call(addFundsListAPI, accessToken, action.payload);
    const { isError } = handelReponseCode(action.callback, result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: AddFundsListSucceededType = yield call(AddFundsListSucceeded, result);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(AddFundsListFailed());
  }
}

function* handleDeleteFundsList(action: DeleteFundsListRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: DeleteFundsListResponse = yield call(deleteFundsListAPI, accessToken, action.payload);
    const { isError } = handelReponseCode(action.callback, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: DeleteFundsListSucceededType = yield call(DeleteFundsListSucceeded, response);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(DeleteFundsListFailed());
  }
}


function* fundsSaga() {
  yield takeLeading(actionTypes.GET_FUNDS_LIST_REQUESTED, handleFetchFundsList);
  yield takeLeading(actionTypes.ADD_FUNDS_LIST_REQUESTED, handleAddFundsList);
  yield takeLeading(actionTypes.DELETE_FUNDS_LIST_REQUESTED, handleDeleteFundsList);
}

export default fundsSaga;