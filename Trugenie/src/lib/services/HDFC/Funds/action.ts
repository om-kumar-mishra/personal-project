import { AddFundsListPayload, AddFundsListResponse, DeleteFundsListPayload, DeleteFundsListResponse, FundsListData } from "./dataTypes";
import * as actionTypes from "./types";

// ===================================Get Funds List================================================
//#region [Funds List Requested]
export type GetFundsListRequestedType = {
    type: typeof actionTypes.GET_FUNDS_LIST_REQUESTED;
    clientId: number;
    createdBy: string;
};

export const GetFundsListRequested = (clientId: number, createdBy: string): GetFundsListRequestedType => ({
    type: actionTypes.GET_FUNDS_LIST_REQUESTED,
    clientId,
    createdBy,
});
//#endregion

//#region [Funds List Succeeded]
export type GetFundsListSucceededType = {
    type: typeof actionTypes.GET_FUNDS_LIST_SUCCEEDED;
    result: FundsListData[];
};

export const GetFundsListSucceeded = (result: FundsListData[]): GetFundsListSucceededType => ({
    type: actionTypes.GET_FUNDS_LIST_SUCCEEDED,
    result,
});

//#endregion

//#region [Funds List Failed]
export type GetFundsListFailedType = {
    type: typeof actionTypes.GET_FUNDS_LIST_FAILED;
    error?: string;
};

export const GetFundsListFailed = (error?: string): GetFundsListFailedType => ({
    type: actionTypes.GET_FUNDS_LIST_FAILED,
    error,
});
//#endregion

// =================================== Add Funds List Details ================================================
//#region [Add Funds Requested]
export type AddFundsListRequestedType = {
    type: typeof actionTypes.ADD_FUNDS_LIST_REQUESTED;
    payload: AddFundsListPayload;
    callback?: (success: boolean, message?: string) => void;
};

export const AddFundsListRequested = (
    payload: AddFundsListPayload,
    callback?: (success: boolean, message?: string) => void,
): AddFundsListRequestedType => ({
    type: actionTypes.ADD_FUNDS_LIST_REQUESTED,
    payload,
    callback,
});
//#endregion [Add Requested]

//#region [Add Succeeded]
export type AddFundsListSucceededType = {
    type: typeof actionTypes.ADD_FUNDS_LIST_SUCCEEDED;
    result: AddFundsListResponse;
};

export const AddFundsListSucceeded = (result: AddFundsListResponse): AddFundsListSucceededType => ({
    type: actionTypes.ADD_FUNDS_LIST_SUCCEEDED,
    result,
});
//#endregion [Add Succeeded]

//#region [Add Failed]
export type AddFundsListFailedType = {
    type: typeof actionTypes.ADD_FUNDS_LIST_FAILED;
    error?: string;
};

export const AddFundsListFailed = (error?: string): AddFundsListFailedType => ({
    type: actionTypes.ADD_FUNDS_LIST_FAILED,
    error,
});
//#endregion [Add Failed]

// =================================== Delete Funds List Details ================================================
//#region [Delete Requested]
export type DeleteFundsListRequestedType = {
    type: typeof actionTypes.DELETE_FUNDS_LIST_REQUESTED;
    payload: DeleteFundsListPayload;
    callback?: (success: boolean, message?: string) => void;
  };
  
  export const DeleteFundsListRequested = (
    payload: DeleteFundsListPayload,
    callback?: (success: boolean, message?: string) => void,
  ): DeleteFundsListRequestedType => ({
    type: actionTypes.DELETE_FUNDS_LIST_REQUESTED,
    payload,
    callback,
  });
  //#endregion [Delete Requested]
  
  //#region [Delete Succeeded]
  export type DeleteFundsListSucceededType = {
    type: typeof actionTypes.DELETE_FUNDS_LIST_SUCCEEDED;
    result: DeleteFundsListResponse;
  };
  
  export const DeleteFundsListSucceeded = (result: DeleteFundsListResponse): DeleteFundsListSucceededType => ({
    type: actionTypes.DELETE_FUNDS_LIST_SUCCEEDED,
    result,
  });
  
  //#endregion [Delete Succeeded]
  
  //#region [Delete Failed]
  export type DeleteFundsListFailedType = {
    type: typeof actionTypes.DELETE_FUNDS_LIST_FAILED;
    error?: string;
  };
  
  export const DeleteFundsListFailed = (error?: string): DeleteFundsListFailedType => ({
    type: actionTypes.DELETE_FUNDS_LIST_FAILED,
    error,
  });
  //#endregion [Delete Failed]
  

export type FundsActions =
    // Funds List
    | GetFundsListRequestedType
    | GetFundsListSucceededType
    | GetFundsListFailedType

    //Add Funds List
    | AddFundsListRequestedType
    | AddFundsListSucceededType
    | AddFundsListFailedType
    
     //Delete Funds List
     | DeleteFundsListRequestedType
     | DeleteFundsListSucceededType
     | DeleteFundsListFailedType;