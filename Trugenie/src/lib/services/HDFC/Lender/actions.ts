import { AddLenderListPayload, AddLenderListResponse, LenderListData, AddUserLenderPayload, AddUserLenderResponse, getClientUserResponse,RemoveUserLenderResponse } from "./dataTypes";
import * as actionTypes from "./types";

// ===================================Get Lender List================================================
//#region [Lender List Requested]
export type GetLenderListRequestedType = {
  type: typeof actionTypes.GET_LENDER_LIST_REQUESTED;
  client: number;
  useremail: string;
};

export const GetLenderListRequested = (client: number, useremail: string): GetLenderListRequestedType => ({
  type: actionTypes.GET_LENDER_LIST_REQUESTED,
  client,
  useremail,
});
//#endregion

//#region [Lender List Succeeded]
export type GetLenderListSucceededType = {
  type: typeof actionTypes.GET_LENDER_LIST_SUCCEEDED;
  result: LenderListData[];
};

export const GetLenderListSucceeded = (result: LenderListData[]): GetLenderListSucceededType => ({
  type: actionTypes.GET_LENDER_LIST_SUCCEEDED,
  result,
});

//#endregion

//#region [Lender List Failed]
export type GetLenderListFailedType = {
  type: typeof actionTypes.GET_LENDER_LIST_FAILED;
  error?: string;
};

export const GetLenderListFailed = (error?: string): GetLenderListFailedType => ({
  type: actionTypes.GET_LENDER_LIST_FAILED,
  error,
});
//#endregion

// =================================== Add Lender List Details ================================================
//#region [Add lender Requested]
export type AddLenderListRequestedType = {
  type: typeof actionTypes.ADD_LENDER_LIST_REQUESTED;
  payload: AddLenderListPayload;
  callback?: (success: boolean, message?: string) => void;
};

export const AddLenderListRequested = (
  payload: AddLenderListPayload,
  callback?: (success: boolean, message?: string) => void,
): AddLenderListRequestedType => ({
  type: actionTypes.ADD_LENDER_LIST_REQUESTED,
  payload,
  callback,
});
//#endregion [Add Requested]

//#region [Add Succeeded]
export type AddLenderListSucceededType = {
  type: typeof actionTypes.ADD_LENDER_LIST_SUCCEEDED;
  result: AddLenderListResponse;
};

export const AddLenderListSucceeded = (result: AddLenderListResponse): AddLenderListSucceededType => ({
  type: actionTypes.ADD_LENDER_LIST_SUCCEEDED,
  result,
});
//#endregion [Add Succeeded]

//#region [Add Failed]
export type AddLenderListFailedType = {
  type: typeof actionTypes.ADD_LENDER_LIST_FAILED;
  error?: string;
};

export const AddLenderListFailed = (error?: string): AddLenderListFailedType => ({
  type: actionTypes.ADD_LENDER_LIST_FAILED,
  error,
});
//#endregion [Add Failed]



// =================================== Add Lender User  Details ================================================
//#region [Add lender Requested]
export type AddUserLenderRequestedType = {
  type: typeof actionTypes.ADD_LENDER_USER_REQUESTED;
  payload: AddUserLenderPayload;
  callback?: (success: boolean, message?: string) => void;
};

export const AddUserLenderRequested = (
  payload: AddUserLenderPayload,
  callback?: (success: boolean, message?: string) => void,
): AddUserLenderRequestedType => ({
  type: actionTypes.ADD_LENDER_USER_REQUESTED,
  payload,
  callback,
});
//#endregion [Add Requested]

//#region [Add Succeeded]
export type AddUserLenderSucceededType = {
  type: typeof actionTypes.ADD_LENDER_USER_SUCCEEDED;
  result: AddUserLenderResponse;
};

export const AddUserLenderSucceeded = (result: AddUserLenderResponse): AddUserLenderSucceededType => ({
  type: actionTypes.ADD_LENDER_USER_SUCCEEDED,
  result,
});
//#endregion [Add Succeeded]

//#region [Add Failed]
export type AddUserLenderFailedType = {
  type: typeof actionTypes.ADD_LENDER_USER_FAILED;
  error?: string;
};

export const AddUserLenderFailed = (error?: string): AddUserLenderFailedType => ({
  type: actionTypes.ADD_LENDER_USER_FAILED,
  error,
});
//#endregion [Add Failed]


// =================================== Get Client User list Details ================================================
//#region [get client user list Requested]
export type GetClientUserListRequestedType = {
  type: typeof actionTypes.GET_CLIENT_ALL_USER_REQUESTED;
  clientId: number
};

export const GetClientUserListRequested = (
  clientId: number,
): GetClientUserListRequestedType => ({
  type: actionTypes.GET_CLIENT_ALL_USER_REQUESTED,
  clientId,
});
//#endregion [Add Requested]

//#region [Add Succeeded]
export type GetClientUserListSucceededType = {
  type: typeof actionTypes.GET_CLIENT_ALL_USER_SUCCEEDED;
  result: getClientUserResponse;
};

export const GetClientUserListSucceeded = (result: getClientUserResponse): GetClientUserListSucceededType => ({
  type: actionTypes.GET_CLIENT_ALL_USER_SUCCEEDED,
  result,
});
//#endregion [Add Succeeded]

//#region [Add Failed]
export type GetClientUserListFailedType = {
  type: typeof actionTypes.GET_CLIENT_ALL_USER_FAILED;
  error?: string;
};

export const GetClientUserListFailed = (error?: string): GetClientUserListFailedType => ({
  type: actionTypes.GET_CLIENT_ALL_USER_FAILED,
  error,
});
//#endregion [Add Failed]'



// =================================== REMOVE Lender User  Details ================================================
//#region [Remove lender Requested]
export type RemoveUserLenderRequestedType = {
  type: typeof actionTypes.REMOVE_LENDER_USER_REQUESTED;
  EUId:number;
  callback?: (success: boolean, message?: string) => void;
};

export const removeUserLenderRequested = (
  EUId: number,
  callback?: (success: boolean, message?: string) => void,
): RemoveUserLenderRequestedType => ({
  type: actionTypes.REMOVE_LENDER_USER_REQUESTED,
  EUId,
  callback,
});
//#endregion [Remove Requested]

//#region [Remove Succeeded]
export type RemoveUserLenderSucceededType = {
  type: typeof actionTypes.REMOVE_LENDER_USER_SUCCEEDED;
  result: RemoveUserLenderResponse;
};

export const removeUserLenderSucceeded = (result: RemoveUserLenderResponse): RemoveUserLenderSucceededType => ({
  type: actionTypes.REMOVE_LENDER_USER_SUCCEEDED,
  result,
});
//#endregion [Remove Succeeded]

//#region [Remove Failed]
export type RemoveUserLenderFailedType = {
  type: typeof actionTypes.REMOVE_LENDER_USER_FAILED;
  error?: string;
};

export const removeUserLenderFailed = (error?: string): RemoveUserLenderFailedType => ({
  type: actionTypes.REMOVE_LENDER_USER_FAILED,
  error,
});
//#endregion [Remove Failed]





export type LenderActions =
  // lender  List
  | GetLenderListRequestedType
  | GetLenderListSucceededType
  | GetLenderListFailedType

    //Remove Lender user
    | RemoveUserLenderRequestedType
    | RemoveUserLenderSucceededType
    | RemoveUserLenderFailedType

  //Add Lender user
  | AddUserLenderRequestedType
  | AddUserLenderSucceededType
  | AddUserLenderFailedType

  //Add Lender user
  | GetClientUserListRequestedType
  | GetClientUserListSucceededType
  | GetClientUserListFailedType

  //Add Lender List
  | AddLenderListRequestedType
  | AddLenderListSucceededType
  | AddLenderListFailedType;