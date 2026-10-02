import { AddDebentureListPayload, AddDebentureListResponse, DebentureListData } from "./dataTypes";
import * as actionTypes from "./types";

// ===================================Get Debenture List================================================
//#region [Debenture List Requested]
export type GetDebentureListRequestedType = {
  type: typeof actionTypes.GET_DEBENTURE_LIST_REQUESTED;
  client: number,
  useremail: string;
};

export const GetDebentureListRequested = (client: number, useremail: string): GetDebentureListRequestedType => ({
  type: actionTypes.GET_DEBENTURE_LIST_REQUESTED,
  client,
  useremail,
});
//#endregion

//#region [Debenture List Succeeded]
export type GetDebentureListSucceededType = {
  type: typeof actionTypes.GET_DEBENTURE_LIST_SUCCEEDED;
  result: DebentureListData[];
};

export const GetDebentureListSucceeded = (result: DebentureListData[]): GetDebentureListSucceededType => ({
  type: actionTypes.GET_DEBENTURE_LIST_SUCCEEDED,
  result,
});

//#endregion

//#region [Debenture List Failed]
export type GetDebentureListFailedType = {
  type: typeof actionTypes.GET_DEBENTURE_LIST_FAILED;
  error?: string;
};

export const GetDebentureListFailed = (error?: string): GetDebentureListFailedType => ({
  type: actionTypes.GET_DEBENTURE_LIST_FAILED,
  error,
});
//#endregion

// =================================== Add Debenture List Details ================================================
//#region [Add Debenture Requested]
export type AddDebentureListRequestedType = {
  type: typeof actionTypes.ADD_DEBENTURE_LIST_REQUESTED;
  payload: AddDebentureListPayload;
  callback?: (success: boolean, message?: string) => void;
};

export const AddDebentureListRequested = (
  payload: AddDebentureListPayload,
  callback?: (success: boolean, message?: string) => void,
): AddDebentureListRequestedType => ({
  type: actionTypes.ADD_DEBENTURE_LIST_REQUESTED,
  payload,
  callback,
});
//#endregion [Add Requested]

//#region [Add Succeeded]
export type AddDebentureListSucceededType = {
  type: typeof actionTypes.ADD_DEBENTURE_LIST_SUCCEEDED;
  result: AddDebentureListResponse;
};

export const AddDebentureListSucceeded = (result: AddDebentureListResponse): AddDebentureListSucceededType => ({
  type: actionTypes.ADD_DEBENTURE_LIST_SUCCEEDED,
  result,
});
//#endregion [Add Succeeded]

//#region [Add Failed]
export type AddDebentureListFailedType = {
  type: typeof actionTypes.ADD_DEBENTURE_LIST_FAILED;
  error?: string;
};

export const AddDebentureListFailed = (error?: string): AddDebentureListFailedType => ({
  type: actionTypes.ADD_DEBENTURE_LIST_FAILED,
  error,
});
//#endregion [Add Failed]


export type DebentureActions =
  // Debenture List
  | GetDebentureListRequestedType
  | GetDebentureListSucceededType
  | GetDebentureListFailedType

  //Add Debenture List
  | AddDebentureListRequestedType
  | AddDebentureListSucceededType
  | AddDebentureListFailedType;