import { call, put, takeLeading } from "redux-saga/effects";
import * as Api from "../../api/index";
import { LoginActionType } from "./types";
import { GenerateTokenAction } from "./dataTypes";

type TokenResult = { token: string };

function* generateToken(action: GenerateTokenAction) {
  try {
    const result: TokenResult = yield call(
      Api.generateToken,
      action.payload.emailId,
      action.payload.oid
    );
    yield put({
      type: LoginActionType.GENERATE_TOKEN_SUCCESS,
      result: result,
    });
    localStorage.setItem("trugenieToken", result.token);
  } catch (e: any) {
    yield put({
      type: LoginActionType.GENERATE_TOKEN_FAILED,
      message: e.message,
    });
  }
}

function* removeToken() {
  yield put({
    type: LoginActionType.GENERATE_TOKEN_FAILED,
    message: "Failed",
  });
}


export default function* loginSaga() {
  yield takeLeading(LoginActionType.GENERATE_TOKEN_REQUESTED, generateToken);
  yield takeLeading(LoginActionType.GENERATE_TOKEN_FAILED, removeToken);
}
