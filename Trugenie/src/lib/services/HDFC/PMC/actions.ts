import { AddPMCListPayload, AddPMCListResponse, PMCListData } from "./dataTypes";
import * as actionTypes from "./types";

// ===================================Get PMC List================================================
//#region [PMC List Requested]
export type GetPMCListRequestedType = {
  type: typeof actionTypes.GET_PMC_LIST_REQUESTED;
  client: number;
  useremail: string;
};

export const GetPMCListRequested = (client: number, useremail: string): GetPMCListRequestedType => ({
  type: actionTypes.GET_PMC_LIST_REQUESTED,
  client,
  useremail,
});
//#endregion

//#region [PMC List Succeeded]
export type GetPMCListSucceededType = {
  type: typeof actionTypes.GET_PMC_LIST_SUCCEEDED;
  result: PMCListData[];
};

export const GetPMCListSucceeded = (result: PMCListData[]): GetPMCListSucceededType => ({
  type: actionTypes.GET_PMC_LIST_SUCCEEDED,
  result,
});

//#endregion

//#region [PMC List Failed]
export type GetPMCListFailedType = {
  type: typeof actionTypes.GET_PMC_LIST_FAILED;
  error?: string;
};

export const GetPMCListFailed = (error?: string): GetPMCListFailedType => ({
  type: actionTypes.GET_PMC_LIST_FAILED,
  error,
});
//#endregion

// =================================== Add PMC List Details ================================================
//#region [Add PMC Requested]
export type AddPMCListRequestedType = {
  type: typeof actionTypes.ADD_PMC_LIST_REQUESTED;
  payload: AddPMCListPayload;
  callback?: (success: boolean, message?: string) => void;
};

export const AddPMCListRequested = (
  payload: AddPMCListPayload,
  callback?: (success: boolean, message?: string) => void,
): AddPMCListRequestedType => ({
  type: actionTypes.ADD_PMC_LIST_REQUESTED,
  payload,
  callback,
});
//#endregion [Add Requested]

//#region [Add Succeeded]
export type AddPMCListSucceededType = {
  type: typeof actionTypes.ADD_PMC_LIST_SUCCEEDED;
  result: AddPMCListResponse;
};

export const AddPMCListSucceeded = (result: AddPMCListResponse): AddPMCListSucceededType => ({
  type: actionTypes.ADD_PMC_LIST_SUCCEEDED,
  result,
});
//#endregion [Add Succeeded]

//#region [Add Failed]
export type AddPMCListFailedType = {
  type: typeof actionTypes.ADD_PMC_LIST_FAILED;
  error?: string;
};

export const AddPMCListFailed = (error?: string): AddPMCListFailedType => ({
  type: actionTypes.ADD_PMC_LIST_FAILED,
  error,
});
//#endregion [Add Failed]


export type PMCActions =
  // PMC  List
  | GetPMCListRequestedType
  | GetPMCListSucceededType
  | GetPMCListFailedType

  //Add PMC List
  | AddPMCListRequestedType
  | AddPMCListSucceededType
  | AddPMCListFailedType;