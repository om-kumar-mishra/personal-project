import { call, put, select, takeEvery, takeLatest, takeLeading } from "redux-saga/effects";
import { errorNotification, successNotification } from "../../../utils/notifications";
import {
  LoginRequestedAction,
  LoginSucceededAction,
  LogoutRequestAction,
  PermissionsSucceededAction,
  RefreshTokenRequestAction,
  RefreshTokenSucceededAction,
  getAppVersionSuccessful,
  loginSucceeded,
  permissionsFailed,
  permissionsSucceeded,
  refreshTokenSucceeded,
} from "./actions";
import { fetchAppVersion, fetchUserPermissionsAPI, loginAPI, logoutAPI, refreshTokenAPI } from "./api";
import { AppVersionResponseType, LoginResponse, PermissionResponse, RefreshTokenResponse } from "./dataTypes";
import { selectAccessToken } from "./selectors";
import * as actionTypes from "./types";
import { SwitchClientAction, switchClient } from "../HDFC/Commons/actions";

function* handleUserLogin(action: LoginRequestedAction): Generator<any, any, any> {
  try {
    const response: LoginResponse | null = yield call(loginAPI, action.username, action.password);

    if (response === null || response?.data === null || response?.info?.code != 100) {
      throw new Error(response?.info?.message || "Login Failed...");
    } else {
      const permissionsResposne: PermissionResponse = yield call(fetchUserPermissionsAPI, response.data.token);
      if (permissionsResposne === null || permissionsResposne?.data === null || permissionsResposne?.info?.code != 100) {
        throw new Error(permissionsResposne?.info?.message || "User Permission Failed...");
      } else {
        // dispatch actions
        const permissionsSuccess: PermissionsSucceededAction = yield call(permissionsSucceeded, permissionsResposne);
        yield put(permissionsSuccess);
        const loginSuccess: LoginSucceededAction = yield call(loginSucceeded, response);
        yield put(loginSuccess);
        const setClient: SwitchClientAction = yield call(switchClient, {
          ClientId: response.data.userDetails.ClientId,
          ClientName: response.data.userDetails.ClientName,
        });
        yield put(setClient);
        if (permissionsResposne?.info?.code === 100 && response?.info?.code === 100 && action.callback) {
          yield call(action.callback, true, "Loggedin Successfully...");
        }
      }
    }
  } catch (error: any) {
    const errorMessage = error?.info?.message || error?.message || "Invalid UserID or Password";
    if (action.callback) {
      yield call(action.callback, false, errorMessage);
    } else {
      yield call(errorNotification, errorMessage);
    }
    yield put({ type: actionTypes.LOGIN_FAILED });
  }
}

function* handleUserPermissions(): Generator<any, any, any> {
  const accessToken: string | undefined = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token required for API call.");
  }
  try {
    const response: PermissionResponse | null = yield call(fetchUserPermissionsAPI, accessToken);

    if (response === null) {
      throw new Error("API Failed...");
    } else {
      const next: PermissionsSucceededAction = yield call(permissionsSucceeded, response);
      yield put(next);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      const errorMessage = "Could not fetch user permissions login...";
      yield call(errorNotification, errorMessage);
    } else {
      yield put(permissionsFailed());
    }
  }
}

function* handleLoginSuccess() {
  // yield put({ type: actionTypes.PERMISSIONS_REQUESTED });
}

function* handleUserLogout(action: LogoutRequestAction): Generator<any, any, any> {
  const accessToken = action.token;
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const response: { info: { code: number; message: string } } = yield call(logoutAPI, accessToken);

    if (response === null || response?.info.code === 102) {
      yield call(errorNotification, response?.info.message);
      throw new Error(response?.info.message || "Logout Failed...");
    } else {
      yield call(successNotification, response?.info.message);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      let errorMessage = "Could not perform logout.";
      if (error?.message) {
        errorMessage = error.message;
      }
      errorNotification(errorMessage);
      yield call(errorNotification, errorMessage);
    }
  }
}

function* handleFetchAppVersion(): Generator<any, any, any> {
  try {
    const response: AppVersionResponseType = yield call(fetchAppVersion);

    if (response === null || response?.info.code !== 100 || !response.data?.version) {
      throw new Error(response?.info.message || "Unable to fetch App version...");
    } else {
      yield put(getAppVersionSuccessful(response.data?.version, response.data?.key));
    }
  } catch (error: unknown) {
    yield put({
      type: actionTypes.APP_VERSION_FAILED,
    });
  }
}

function* handleFetchRefreshToken(action: RefreshTokenRequestAction) {
  try {
    const response: RefreshTokenResponse = yield call(refreshTokenAPI, action.token);

    if (response === null || response.message == "Token is not valid") {
      throw new Error("Unable to fetch token...");
    } else {
      const next: RefreshTokenSucceededAction = yield call(refreshTokenSucceeded, response.message);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put({
      type: actionTypes.REFRESH_TOKEN_FAILED,
    });
  }
}

function* hdfcAuthSaga() {
  yield takeLatest(actionTypes.LOGIN_REQUESTED, handleUserLogin);
  yield takeEvery(actionTypes.LOGIN_SUCCEEDED, handleLoginSuccess);
  yield takeEvery(actionTypes.PERMISSIONS_REQUESTED, handleUserPermissions);
  yield takeLatest(actionTypes.LOGOUT_REQUESTED, handleUserLogout);
  yield takeLeading(actionTypes.APP_VERSION_REQUESTED, handleFetchAppVersion);
  yield takeLeading(actionTypes.REFRESH_TOKEN_REQUESTED, handleFetchRefreshToken);
}

export default hdfcAuthSaga;
