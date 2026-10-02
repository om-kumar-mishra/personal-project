import { AddInternalUserPayloadType, ApproveRejectInternalUserpPayload, GetInternalUserDataType } from './dataTypes';
import * as types from './types';

//----------------------------------Add Internal User  List----------------------------------

export type AddInternalUserRequestedAction = {
    type: typeof types.ADD_INTERNAL_USER_REQUESTED;
    payload: AddInternalUserPayloadType;
    onSuccessCallback?: (success: boolean) => void;
};

export const addInternalUserRequested = (payload: AddInternalUserPayloadType, onSuccessCallback?: (success: boolean) => void): AddInternalUserRequestedAction => ({
    type: types.ADD_INTERNAL_USER_REQUESTED,
    payload,
    onSuccessCallback,
});

export type AddInternalUserSucceededAction = {
    type: typeof types.ADD_INTERNAL_USER_SUCCEEDED;
    payload: any;
};

export const addInternalUserSucceeded = (payload: any): AddInternalUserSucceededAction => ({
    type: types.ADD_INTERNAL_USER_SUCCEEDED,
    payload,
});

export type AddInternalUserFailedAction = {
    type: typeof types.ADD_INTERNAL_USER_FAILED;
    message: string;
};

export const addInternalUserFailed = (message: string): AddInternalUserFailedAction => ({
    type: types.ADD_INTERNAL_USER_FAILED,
    message,
});

//----------------------------------Get Internal User  List----------------------------------

export type GetInternalUserListRequestedAction = {
    type: typeof types.GET_INTERNAL_USER_LIST_REQUESTED;
    createdBy: string;
};

export const getInternalUserListRequested = (createdBy: string): GetInternalUserListRequestedAction => ({
    type: types.GET_INTERNAL_USER_LIST_REQUESTED,
    createdBy,
});

export type GetInternalUserListSucceededAction = {
    type: typeof types.GET_INTERNAL_USER_LIST_SUCCEEDED;
    payload: GetInternalUserDataType[];
};

export const getInternalUserListSucceeded = (payload: GetInternalUserDataType[]): GetInternalUserListSucceededAction => ({
    type: types.GET_INTERNAL_USER_LIST_SUCCEEDED,
    payload,
});

export type GetInternalUserListFailedAction = {
    type: typeof types.GET_INTERNAL_USER_LIST_FAILED;
    message: string;
};

export const getInternalUserListFailed = (message: string): GetInternalUserListFailedAction => ({
    type: types.GET_INTERNAL_USER_LIST_FAILED,
    message,
});

//----------------------------------Internal User Actions----------------------------------

export type ChangeInternalUserStatusRequestedAction = {
    type: typeof types.CHANGE_INTERNAL_USER_STATUS_REQUESTED;
    payload: ApproveRejectInternalUserpPayload;
    statusType: "Approve" | "Reject";
    onSuccessCallback?: (success: boolean) => void;
};

export const changeInternalUserStatusRequested = (payload: ApproveRejectInternalUserpPayload, statusType: "Approve" | "Reject", onSuccessCallback: (success: boolean) => void): ChangeInternalUserStatusRequestedAction => ({
    type: types.CHANGE_INTERNAL_USER_STATUS_REQUESTED,
    payload,
    statusType,
    onSuccessCallback,
});

export type ChangeInternalUserStatusSucceededAction = {
    type: typeof types.CHANGE_INTERNAL_USER_STATUS_SUCCEEDED;

};

export const changeInternalUserStatusSucceeded = (): ChangeInternalUserStatusSucceededAction => ({
    type: types.CHANGE_INTERNAL_USER_STATUS_SUCCEEDED,
});

export type ChangeInternalUserStatusFailedAction = {
    type: typeof types.CHANGE_INTERNAL_USER_STATUS_FAILED;

};

export const changeInternalUserStatusFailed = (): ChangeInternalUserStatusFailedAction => ({
    type: types.CHANGE_INTERNAL_USER_STATUS_FAILED,
});

//----------------------------------Internal User Actions----------------------------------

export type InternalUserActions =
    AddInternalUserRequestedAction
    | AddInternalUserSucceededAction
    | AddInternalUserFailedAction

    | GetInternalUserListRequestedAction
    | GetInternalUserListSucceededAction
    | GetInternalUserListFailedAction

    | ChangeInternalUserStatusRequestedAction
    | ChangeInternalUserStatusSucceededAction
    | ChangeInternalUserStatusFailedAction;