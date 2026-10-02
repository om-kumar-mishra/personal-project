import { call, put, select, takeLeading } from "redux-saga/effects";
import {
  AddPMCListFailed,
  AddPMCListRequestedType,
  AddPMCListSucceeded,
  AddPMCListSucceededType,
  GetPMCListFailed,
  GetPMCListRequestedType,
  GetPMCListSucceeded,
  GetPMCListSucceededType
} from "./actions";
import { AddPMCListResponse, PMCListResponse } from "./dataTypes";
import { addPMCListAPI, getPMCListAPI } from "./api";
import { handelReponseCode } from "../../../../modules/Components/UtilityFunctions";
import { selectAccessToken } from "../../hdfc_login/selectors";
import * as actionTypes from "./types";

function* handleFetchPMCList(action: GetPMCListRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: PMCListResponse = yield call(getPMCListAPI, accessToken, action.client, action.useremail);
    const { isError } = handelReponseCode(undefined, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: GetPMCListSucceededType = yield call(GetPMCListSucceeded, response.data);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(GetPMCListFailed());
  }
}

function* handleAddPMCList(action: AddPMCListRequestedType) {
  const accessToken = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const result: AddPMCListResponse = yield call(addPMCListAPI, accessToken, action.payload);
    const { isError } = handelReponseCode(action.callback, result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: AddPMCListSucceededType = yield call(AddPMCListSucceeded, result);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(AddPMCListFailed());
  }
}

function* pmcSaga() {
  yield takeLeading(actionTypes.GET_PMC_LIST_REQUESTED, handleFetchPMCList);
  yield takeLeading(actionTypes.ADD_PMC_LIST_REQUESTED, handleAddPMCList);
}

export default pmcSaga;