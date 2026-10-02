import { AddClientPayload, ClientListDataType } from "./dataTypes";
import * as types from "./types";

//----------------------------------Get Client List----------------------------------
//#region [client list]
export type GetClientTypeRequested = {
  type: typeof types.GET_CLIENT_LIST_REQUESTED;
};

export const getClientListRequested = (): GetClientTypeRequested => ({
  type: types.GET_CLIENT_LIST_REQUESTED,
});

export type GetClientTypeSucceeded = {
  type: typeof types.GET_CLIENT_LIST_SUCCEEDED;
  clientList: ClientListDataType[];
};

export const getClientListSucceeded = (clientList: ClientListDataType[]): GetClientTypeSucceeded => ({
  type: types.GET_CLIENT_LIST_SUCCEEDED,
  clientList,
});

export type GetClientTypeFailed = {
  type: typeof types.GET_CLIENT_LIST_FAILED;
  error?: string;
};

export const getClientListFailed = (error?: string): GetClientTypeFailed => ({
  type: types.GET_CLIENT_LIST_FAILED,
  error,
});
//#endregion

//----------------------------------Add Client----------------------------------

//#region [add client]
export type AddClientTypeRequested = {
  type: typeof types.ADD_CLIENT_REQUESTED;
  payload: AddClientPayload;
  onSuccessCallback?: (success: boolean, message?: string) => void;
};

export const addClientRequested = (payload: AddClientPayload, onSuccessCallback?: (success: boolean, message?: string) => void): AddClientTypeRequested => ({
  type: types.ADD_CLIENT_REQUESTED,
  payload,
  onSuccessCallback,
});

export type AddClientTypeSucceeded = {
  type: typeof types.ADD_CLIENT_SUCCEEDED;
};

export const addClientSucceeded = (): AddClientTypeSucceeded => ({
  type: types.ADD_CLIENT_SUCCEEDED,
});

export type AddClientTypeFailed = {
  type: typeof types.ADD_CLIENT_FAILED;
};

export const addClientFailed = (): AddClientTypeFailed => ({
  type: types.ADD_CLIENT_FAILED,
});
//#endregion

export type ClientListActions =
  | GetClientTypeRequested
  | GetClientTypeSucceeded
  | GetClientTypeFailed
  | AddClientTypeRequested
  | AddClientTypeSucceeded
  | AddClientTypeFailed;
