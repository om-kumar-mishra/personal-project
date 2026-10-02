import {
  AddInvestmentListPayload,
  AddInvestmentListResponse,
  DeleteInvestmentListPayload,
  DeleteInvestmentListResponse,
  InvestmentListData,
} from "./dataTypes";
import * as actionTypes from "./types";

// ===================================Get Investment List================================================
//#region [Investment List Requested]
export type GetInvestmentListRequestedType = {
  type: typeof actionTypes.GET_ENTITY_INVESTMENT_LIST_REQUESTED;
  clientId: number;
  createdBy: string;
};

export const GetInvestmentListRequested = (clientId: number, createdBy: string): GetInvestmentListRequestedType => ({
  type: actionTypes.GET_ENTITY_INVESTMENT_LIST_REQUESTED,
  clientId,
  createdBy,
});
//#endregion

//#region [Investment List Succeeded]
export type GetInvestmentListSucceededType = {
  type: typeof actionTypes.GET_ENTITY_INVESTMENT_LIST_SUCCEEDED;
  result: InvestmentListData[];
};

export const GetInvestmentListSucceeded = (result: InvestmentListData[]): GetInvestmentListSucceededType => ({
  type: actionTypes.GET_ENTITY_INVESTMENT_LIST_SUCCEEDED,
  result,
});

//#endregion

//#region [Investment List Failed]
export type GetInvestmentListFailedType = {
  type: typeof actionTypes.GET_ENTITY_INVESTMENT_LIST_FAILED;
  error?: string;
};

export const GetInvestmentListFailed = (error?: string): GetInvestmentListFailedType => ({
  type: actionTypes.GET_ENTITY_INVESTMENT_LIST_FAILED,
  error,
});
//#endregion

// =================================== Add Investment List Details ================================================
//#region [Add Investment Requested]
export type AddInvestmentListRequestedType = {
  type: typeof actionTypes.ADD_ENTITY_INVESTMENT_LIST_REQUESTED;
  payload: AddInvestmentListPayload;
  callback?: (success: boolean, message?: string) => void;
};

export const AddInvestmentListRequested = (
  payload: AddInvestmentListPayload,
  callback?: (success: boolean, message?: string) => void,
): AddInvestmentListRequestedType => ({
  type: actionTypes.ADD_ENTITY_INVESTMENT_LIST_REQUESTED,
  payload,
  callback,
});
//#endregion [Add Requested]

//#region [Add Succeeded]
export type AddInvestmentListSucceededType = {
  type: typeof actionTypes.ADD_ENTITY_INVESTMENT_LIST_SUCCEEDED;
  result: AddInvestmentListResponse;
};

export const AddInvestmentListSucceeded = (result: AddInvestmentListResponse): AddInvestmentListSucceededType => ({
  type: actionTypes.ADD_ENTITY_INVESTMENT_LIST_SUCCEEDED,
  result,
});
//#endregion [Add Succeeded]

//#region [Add Failed]
export type AddInvestmentListFailedType = {
  type: typeof actionTypes.ADD_ENTITY_INVESTMENT_LIST_FAILED;
  error?: string;
};

export const AddInvestmentListFailed = (error?: string): AddInvestmentListFailedType => ({
  type: actionTypes.ADD_ENTITY_INVESTMENT_LIST_FAILED,
  error,
});
//#endregion [Add Failed]

// =================================== Delete Investment List Details ================================================
//#region [Delete Requested]
export type DeleteInvestmentListRequestedType = {
  type: typeof actionTypes.DELETE_ENTITY_INVESTMENT_LIST_REQUESTED;
  payload: DeleteInvestmentListPayload;
  callback?: (success: boolean, message?: string) => void;
};

export const DeleteInvestmentListRequested = (
  payload: DeleteInvestmentListPayload,
  callback?: (success: boolean, message?: string) => void,
): DeleteInvestmentListRequestedType => ({
  type: actionTypes.DELETE_ENTITY_INVESTMENT_LIST_REQUESTED,
  payload,
  callback,
});
//#endregion [Delete Requested]

//#region [Delete Succeeded]
export type DeleteInvestmentListSucceededType = {
  type: typeof actionTypes.DELETE_ENTITY_INVESTMENT_LIST_SUCCEEDED;
  result: DeleteInvestmentListResponse;
};

export const DeleteInvestmentListSucceeded = (result: DeleteInvestmentListResponse): DeleteInvestmentListSucceededType => ({
  type: actionTypes.DELETE_ENTITY_INVESTMENT_LIST_SUCCEEDED,
  result,
});

//#endregion [Delete Succeeded]

//#region [Delete Failed]
export type DeleteInvestmentListFailedType = {
  type: typeof actionTypes.DELETE_ENTITY_INVESTMENT_LIST_FAILED;
  error?: string;
};

export const DeleteInvestmentListFailed = (error?: string): DeleteInvestmentListFailedType => ({
  type: actionTypes.DELETE_ENTITY_INVESTMENT_LIST_FAILED,
  error,
});
//#endregion [Delete Failed]

export type InvestmentActions =
  // Investment List
  | GetInvestmentListRequestedType
  | GetInvestmentListSucceededType
  | GetInvestmentListFailedType

  //Add Investment List
  | AddInvestmentListRequestedType
  | AddInvestmentListSucceededType
  | AddInvestmentListFailedType

  //Delete Investment List
  | DeleteInvestmentListRequestedType
  | DeleteInvestmentListSucceededType
  | DeleteInvestmentListFailedType;
