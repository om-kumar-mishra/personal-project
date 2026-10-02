import { LoginResponse, PermissionResponse } from "./dataTypes";
import * as actionTypes from "./types";

// User Login
//#region [Login Requested]
export type LoginRequestedAction = {
  type: typeof actionTypes.LOGIN_REQUESTED;
  username: string;
  password: string;
  callback?: (success: boolean, message?: string) => void;
};
export const requestLogin = (username: string, password: string, callback?: (success: boolean, message?: string) => void): LoginRequestedAction => ({
  type: actionTypes.LOGIN_REQUESTED,
  username,
  password,
  callback,
});
//#endregion

//#region [Login Succeeded]
export type LoginSucceededAction = {
  type: typeof actionTypes.LOGIN_SUCCEEDED;
  result: LoginResponse;
};
export const loginSucceeded = (result: LoginResponse): LoginSucceededAction => ({
  type: actionTypes.LOGIN_SUCCEEDED,
  result,
});
//#endregion

//#region [Login Failed]
export type LoginFailedAction = {
  type: typeof actionTypes.LOGIN_FAILED;
  error?: string;
};
export const loginFailed = (error?: string): LoginFailedAction => ({
  type: actionTypes.LOGIN_FAILED,
  error,
});
//#endregion

//#region [Logout Request]
export type LogoutRequestAction = {
  type: typeof actionTypes.LOGOUT_REQUESTED;
  token?: string;
};

export const logout = (token?: string) => ({ type: actionTypes.LOGOUT_REQUESTED, token });
//#endregion

//#region [User Permissions Requested]
export type PermissionsRequestedAction = {
  type: typeof actionTypes.PERMISSIONS_REQUESTED;
};
export const requestPermissions = (): PermissionsRequestedAction => ({
  type: actionTypes.PERMISSIONS_REQUESTED,
});
//#endregion

//#region [User Permissions Succeeded]
export type PermissionsSucceededAction = {
  type: typeof actionTypes.PERMISSIONS_SUCCEEDED;
  result: PermissionResponse;
};
export const permissionsSucceeded = (result: PermissionResponse): PermissionsSucceededAction => ({
  type: actionTypes.PERMISSIONS_SUCCEEDED,
  result,
});
//#endregion

//#region [User Permissions Failed]
export type PermissionsFailedAction = {
  type: typeof actionTypes.PERMISSIONS_FAILED;
  error?: string;
};
export const permissionsFailed = (error?: string): PermissionsFailedAction => ({
  type: actionTypes.PERMISSIONS_FAILED,
  error,
});
//#endregion

// Refresh Token
//#region [Refresh Token Requested]
export type RefreshTokenRequestAction = {
  type: typeof actionTypes.REFRESH_TOKEN_REQUESTED;
  token: string;
};
export const requestRefreshToken = (token: string): RefreshTokenRequestAction => ({
  type: actionTypes.REFRESH_TOKEN_REQUESTED,
  token,
});
//#endregion

//#region [Refresh Token Succeeded]
export type RefreshTokenSucceededAction = {
  type: typeof actionTypes.REFRESH_TOKEN_SUCCEEDED;
  result: string;
};
export const refreshTokenSucceeded = (result: string): RefreshTokenSucceededAction => ({
  type: actionTypes.REFRESH_TOKEN_SUCCEEDED,
  result,
});
//#endregion

//#region [Refresh Token Failed]
export type RefreshTokenFailedAction = {
  type: typeof actionTypes.REFRESH_TOKEN_FAILED;
  error?: string;
};
export const refreshTokenFailed = (error?: string): RefreshTokenFailedAction => ({
  type: actionTypes.REFRESH_TOKEN_FAILED,
  error,
});
//#endregion

// App Version
//#region [App Version Requested]
export type GetAppVersionRequested = {
  type: typeof actionTypes.APP_VERSION_REQUESTED;
};
export const getAppVersionRequested = (): GetAppVersionRequested => ({
  type: actionTypes.APP_VERSION_REQUESTED,
});
//#endregion

//#region [App Version Succeeded]
export type GetAppVersionSuccessful = {
  type: typeof actionTypes.APP_VERSION_SUCCEEDED;
  version: string;
  key: string;
};
export const getAppVersionSuccessful = (version: string, key:string): GetAppVersionSuccessful => ({
  type: actionTypes.APP_VERSION_SUCCEEDED,
  version,
  key,
});
//#endregion

//#region [App Version Failed]
export type GetAppVersionFailed = {
  type: typeof actionTypes.APP_VERSION_FAILED;
};
export const getAppVersionFailed = (): GetAppVersionFailed => ({
  type: actionTypes.APP_VERSION_FAILED,
});
//#endregion

//#region [Active Menu]
export type SettingActiveMenuAction = {
  type: typeof actionTypes.SETTINGS_ACTIVE_MENUITEM;
  value: string;
};
export const changeActiveMenuItem = (value: string): SettingActiveMenuAction => ({
  type: actionTypes.SETTINGS_ACTIVE_MENUITEM,
  value,
});

export type SettingActiveSubMenuAction = {
  type: typeof actionTypes.SETTINGS_ACTIVE_SUB_MENUITEM;
  value: string;
};
export const changeActiveSubMenuItem = (value: string): SettingActiveSubMenuAction => ({
  type: actionTypes.SETTINGS_ACTIVE_SUB_MENUITEM,
  value,
});
//#endregion

//#region [Logout Timer]
export type SetLogoutTimerAction = {
  type: typeof actionTypes.SET_LOGOUT_TIMER;
  value: number;
};
export const setLogoutTimer = (value: number): SetLogoutTimerAction => ({
  type: actionTypes.SET_LOGOUT_TIMER,
  value,
});

export type ResetLogoutTimerAction = {
  type: typeof actionTypes.RESET_LOGOUT_TIMER;
};
export const resetLogoutTimer = (): ResetLogoutTimerAction => ({
  type: actionTypes.RESET_LOGOUT_TIMER,
});
//#endregion

//#region [Activity Timestamp]
export type SetActivityTimestamp = {
  type: typeof actionTypes.SET_ACTIVITY_TIMESTAMP;
  value: number;
};
export const setActivityTimestamp = (value: number): SetActivityTimestamp => ({
  type: actionTypes.SET_ACTIVITY_TIMESTAMP,
  value,
});

export type ResetActivityTimestamp = {
  type: typeof actionTypes.RESET_ACTIVITY_TIMESTAMP;
};
export const resetActivityTimestamp = (): ResetActivityTimestamp => ({
  type: actionTypes.RESET_ACTIVITY_TIMESTAMP,
});
//#endregion

export const AUTH_NON_SERIALIZABLE = [actionTypes.LOGIN_REQUESTED];

export type LoginActions =
  // Login
  | LoginRequestedAction
  | LoginSucceededAction
  | LoginFailedAction

  // Permissions
  | PermissionsRequestedAction
  | PermissionsSucceededAction
  | PermissionsFailedAction

  // Refresh token
  | RefreshTokenRequestAction
  | RefreshTokenSucceededAction
  | RefreshTokenFailedAction

  // Active Menu
  | SettingActiveMenuAction
  | SettingActiveSubMenuAction

  // Logout
  | LogoutRequestAction
  | SetLogoutTimerAction
  | ResetLogoutTimerAction

  // App version
  | GetAppVersionRequested
  | GetAppVersionSuccessful
  | GetAppVersionFailed

  // Activity Timestamp
  | SetActivityTimestamp
  | ResetActivityTimestamp;
