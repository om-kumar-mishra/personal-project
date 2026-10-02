import { call, put, select, takeLeading } from "redux-saga/effects";
import {
  AddDebentureListFailed,
  AddDebentureListRequestedType,
  AddDebentureListSucceeded,
  AddDebentureListSucceededType,
  GetDebentureListFailed,
  GetDebentureListRequestedType,
  GetDebentureListSucceeded,
  GetDebentureListSucceededType,
} from "./actions";
import { AddDebentureListResponse, DebentureListResponse } from "./dataTypes";
import { addDebentureListAPI, getDebentureListAPI } from "./api";
import { handelReponseCode } from "../../../../modules/Components/UtilityFunctions";
import { selectAccessToken } from "../../hdfc_login/selectors";
import * as actionTypes from "./types";

function* handleFetchDebentureList(action: GetDebentureListRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: DebentureListResponse = yield call(getDebentureListAPI, accessToken, action.client, action.useremail);
    const { isError } = handelReponseCode(undefined, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: GetDebentureListSucceededType = yield call(GetDebentureListSucceeded, response.data);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(GetDebentureListFailed());
  }
}

function* handleAddDebentureList(action: AddDebentureListRequestedType) {
  const accessToken = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const result: AddDebentureListResponse = yield call(addDebentureListAPI, accessToken, action.payload);
    const { isError } = handelReponseCode(action.callback, result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: AddDebentureListSucceededType = yield call(AddDebentureListSucceeded, result);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(AddDebentureListFailed());
  }
}

function* debentureSaga() {
  yield takeLeading(actionTypes.GET_DEBENTURE_LIST_REQUESTED, handleFetchDebentureList);
  yield takeLeading(actionTypes.ADD_DEBENTURE_LIST_REQUESTED, handleAddDebentureList);
}

export default debentureSaga;