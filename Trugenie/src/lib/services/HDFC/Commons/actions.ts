import { GetClientData, GetRmUsersDataType, ValidateExcelPayload, ValidateExcelResponse } from "./dataTypes";
import * as types from "./types";

export type GetRMUserListRequestedAction = {
  type: typeof types.GET_RM_USERS_REQUESTED;
  createdBy: string;
};

export const getRMUserListRequested = (createdBy: string): GetRMUserListRequestedAction => ({
  type: types.GET_RM_USERS_REQUESTED,
  createdBy,
});

export type GetRMUserListSucceededAction = {
  type: typeof types.GET_RM_USERS_SUCCEEDED;
  payload: GetRmUsersDataType[];
};

export const getRMUserListSucceeded = (payload: GetRmUsersDataType[]): GetRMUserListSucceededAction => ({
  type: types.GET_RM_USERS_SUCCEEDED,
  payload,
});

export type GetRMUserListFailedAction = {
  type: typeof types.GET_RM_USERS_FAILED;
  message: string;
};

export const getRMUserListFailed = (message: string): GetRMUserListFailedAction => ({
  type: types.GET_RM_USERS_FAILED,
  message,
});

export type ResetRMUsersListAction = {
  type: typeof types.RESET_TAGGED_RM_USERS;
};

export const ResetRMUsersList = (): ResetRMUsersListAction => ({
  type: types.RESET_TAGGED_RM_USERS,
});

//------------------------------------------ Get tagged RM users ----------------------------------------------

export type GetTaggedRMUserListRequestedAction = {
  type: typeof types.GET_TAGGED_RM_USERS_REQUESTED;
  createdBy: string;
  developerId: number;
};

export const getTaggedRMUserListRequested = (createdBy: string, developerId: number): GetTaggedRMUserListRequestedAction => ({
  type: types.GET_TAGGED_RM_USERS_REQUESTED,
  createdBy,
  developerId,
});

export type GetTaggedRMUserListSucceededAction = {
  type: typeof types.GET_TAGGED_RM_USERS_SUCCEEDED;
  payload: GetRmUsersDataType[];
};

export const getTaggedRMUserListSucceeded = (payload: GetRmUsersDataType[]): GetTaggedRMUserListSucceededAction => ({
  type: types.GET_TAGGED_RM_USERS_SUCCEEDED,
  payload,
});

export type GetTaggedRMUserListFailedAction = {
  type: typeof types.GET_TAGGED_RM_USERS_FAILED;
};

export const getTaggedRMUserListFailed = (): GetTaggedRMUserListFailedAction => ({
  type: types.GET_TAGGED_RM_USERS_FAILED,
});

export type ResetTaggedRMList = {
  type: typeof types.RESET_TAGGED_RM_USER_LIST;
};

export const resetTaggedRMListRequested = (): ResetTaggedRMList => ({
  type: types.RESET_TAGGED_RM_USER_LIST,
});

//------------------------------------------ Tag RM users End ----------------------------------------------

//------------------------------------------ Validate Excel Start ----------------------------------------------
//#region [validate Excel]
export type ValidateExcelRequestedAction = {
  type: typeof types.VALIDATE_EXCEL_REQUESTED;
  payload: ValidateExcelPayload;
  onSuccessCallback?: (success: boolean, message?: string) => void;
};

export const ValidateExcelRequested = (payload: ValidateExcelPayload, onSuccessCallback?: (success: boolean) => void): ValidateExcelRequestedAction => ({
  type: types.VALIDATE_EXCEL_REQUESTED,
  payload,
  onSuccessCallback,
});

export type ValidateExcelSucceededAction = {
  type: typeof types.VALIDATE_EXCEL_SUCCEEDED;
  result: ValidateExcelResponse;
};

export const ValidateExcelSucceeded = (result: ValidateExcelResponse): ValidateExcelSucceededAction => ({
  type: types.VALIDATE_EXCEL_SUCCEEDED,
  result,
});

export type ValidateExcelFailedAction = {
  type: typeof types.VALIDATE_EXCEL_FAILED;
  result?: ValidateExcelResponse;
};

export const ValidateExcelFailed = (result?: ValidateExcelResponse): ValidateExcelFailedAction => ({
  type: types.VALIDATE_EXCEL_FAILED,
  result,
});
//#endregion

//------------------------------------------ Download Excel Error File Start ----------------------------------------------
//#region [Download Excel Error File]
export type DownloadExcelErrorFileRequestedAction = {
  type: typeof types.DOWNLOAD_EXCEL_ERROR_FILE_REQUESTED;
  payload: ValidateExcelPayload;
  onSuccessCallback?: (success: boolean, message?: string) => void;
};

export const DownloadExcelErrorFileRequested = (
  payload: ValidateExcelPayload,
  onSuccessCallback?: (success: boolean) => void,
): DownloadExcelErrorFileRequestedAction => ({
  type: types.DOWNLOAD_EXCEL_ERROR_FILE_REQUESTED,
  payload,
  onSuccessCallback,
});

export type DownloadExcelErrorFileSucceededAction = {
  type: typeof types.DOWNLOAD_EXCEL_ERROR_FILE_SUCCEEDED;
  result: any;
};

export const DownloadExcelErrorFileSucceeded = (result: any): DownloadExcelErrorFileSucceededAction => ({
  type: types.DOWNLOAD_EXCEL_ERROR_FILE_SUCCEEDED,
  result,
});

export type DownloadExcelErrorFileFailedAction = {
  type: typeof types.DOWNLOAD_EXCEL_ERROR_FILE_FAILED;
  message?: string;
};

export const DownloadExcelErrorFileFailed = (message?: string): DownloadExcelErrorFileFailedAction => ({
  type: types.DOWNLOAD_EXCEL_ERROR_FILE_FAILED,
  message,
});
//#endregion

//------------------------------------------ get Switch Client list Start ----------------------------------------------
//#region [get Switch Client list]
export type GetSwitchClientListRequestedAction = {
  type: typeof types.GET_SWITCH_CLIENT_LIST_REQUESTED;
  userId: number;
  onCallback?: (success: boolean, message?: string) => void;
};

export const getSwitchClientRequested = (userId: number, onCallback?: (success: boolean) => void): GetSwitchClientListRequestedAction => ({
  type: types.GET_SWITCH_CLIENT_LIST_REQUESTED,
  userId,
  onCallback,
});

export type GetSwitchClientListSucceededAction = {
  type: typeof types.GET_SWITCH_CLIENT_LIST_SUCCEEDED;
  result: GetClientData[];
};

export const getSwitchClientListSucceeded = (result: GetClientData[]): GetSwitchClientListSucceededAction => ({
  type: types.GET_SWITCH_CLIENT_LIST_SUCCEEDED,
  result,
});

export type GetSwitchClientListFailedAction = {
  type: typeof types.GET_SWITCH_CLIENT_LIST_FAILED;
  message?: string;
};

export const getSwitchClientListFailed = (message?: string): GetSwitchClientListFailedAction => ({
  type: types.GET_SWITCH_CLIENT_LIST_FAILED,
  message,
});
//#endregion

//------------------------------------------ switch client Start ----------------------------------------------
//#region [Switch Client]
export type SwitchClientAction = {
  type: typeof types.SWITCH_CLIENT;
  result?: GetClientData;
};

export const switchClient = (result?: GetClientData): SwitchClientAction => ({
  type: types.SWITCH_CLIENT,
  result,
});
//#endregion

export type RMUserActions =
  | GetRMUserListRequestedAction
  | GetRMUserListSucceededAction
  | GetRMUserListFailedAction
  | GetTaggedRMUserListRequestedAction
  | GetTaggedRMUserListSucceededAction
  | GetTaggedRMUserListFailedAction
  | ResetTaggedRMList
  | ResetRMUsersListAction

  // validate excel file
  | ValidateExcelRequestedAction
  | ValidateExcelSucceededAction
  | ValidateExcelFailedAction

  // download excel error file
  | DownloadExcelErrorFileRequestedAction
  | DownloadExcelErrorFileSucceededAction
  | DownloadExcelErrorFileFailedAction

  // get switch client list
  | GetSwitchClientListRequestedAction
  | GetSwitchClientListSucceededAction
  | GetSwitchClientListFailedAction

  // switch client
  | SwitchClientAction;
