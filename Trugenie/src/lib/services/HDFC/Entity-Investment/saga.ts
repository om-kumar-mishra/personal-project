import { call, put, select, takeLeading } from "redux-saga/effects";
import { handelReponseCode } from "../../../../modules/Components/UtilityFunctions";
import { selectAccessToken } from "../../hdfc_login/selectors";
import * as actionTypes from "./types";
import {
  AddInvestmentListFailed,
  AddInvestmentListRequestedType,
  AddInvestmentListSucceeded,
  AddInvestmentListSucceededType,
  DeleteInvestmentListFailed,
  DeleteInvestmentListRequestedType,
  DeleteInvestmentListSucceeded,
  DeleteInvestmentListSucceededType,
  GetInvestmentListFailed,
  GetInvestmentListRequestedType,
  GetInvestmentListSucceeded,
  GetInvestmentListSucceededType
} from "./action";
import { AddInvestmentListResponse, DeleteInvestmentListResponse, InvestmentListResponse } from "./dataTypes";
import { addInvestmentListAPI, deleteInvestmentListAPI, getInvestmentListAPI } from "./api";


function* handleFetchInvestmentList(action: GetInvestmentListRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: InvestmentListResponse = yield call(getInvestmentListAPI, accessToken, action.clientId, action.createdBy);
    const { isError } = handelReponseCode(undefined, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: GetInvestmentListSucceededType = yield call(GetInvestmentListSucceeded, response.data);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(GetInvestmentListFailed());
  }
}

function* handleAddInvestmentList(action: AddInvestmentListRequestedType) {
  const accessToken = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const result: AddInvestmentListResponse = yield call(addInvestmentListAPI, accessToken, action.payload);
    const { isError } = handelReponseCode(action.callback, result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: AddInvestmentListSucceededType = yield call(AddInvestmentListSucceeded, result);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(AddInvestmentListFailed());
  }
}

function* handleDeleteInvestmentList(action: DeleteInvestmentListRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: DeleteInvestmentListResponse = yield call(deleteInvestmentListAPI, accessToken, action.payload);
    const { isError } = handelReponseCode(action.callback, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: DeleteInvestmentListSucceededType = yield call(DeleteInvestmentListSucceeded, response);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(DeleteInvestmentListFailed());
  }
}


function* entityInvestmentSaga() {
  yield takeLeading(actionTypes.GET_ENTITY_INVESTMENT_LIST_REQUESTED, handleFetchInvestmentList);
  yield takeLeading(actionTypes.ADD_ENTITY_INVESTMENT_LIST_REQUESTED, handleAddInvestmentList);
  yield takeLeading(actionTypes.DELETE_ENTITY_INVESTMENT_LIST_REQUESTED, handleDeleteInvestmentList);
}

export default entityInvestmentSaga;