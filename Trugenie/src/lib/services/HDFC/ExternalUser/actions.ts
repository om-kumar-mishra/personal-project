import { AddExternalUserPayloadType, ApproveRejectExternalUserpPayload, EditExternalUserPayloadType, EnableDisableExternalUserPayload, GetExternalUserDataType, PendingExternalResp, PendingExternalUserpayload } from './dataTypes';
import * as types from './types';

//----------------------------------Add eXTERNAL User  List----------------------------------

export type AddExternalUserRequestedAction = {
    type: typeof types.ADD_EXTERNAL_USER_REQUESTED;
    payload: AddExternalUserPayloadType;
    onSuccessCallback?: (success: boolean) => void;
};

export const addExternalUserRequested = (payload: AddExternalUserPayloadType, onSuccessCallback?: (success: boolean) => void): AddExternalUserRequestedAction => ({
    type: types.ADD_EXTERNAL_USER_REQUESTED,
    payload,
    onSuccessCallback,
});

export type AddExternalUserSucceededAction = {
    type: typeof types.ADD_EXTERNAL_USER_SUCCEEDED;
    payload: any;
};

export const addExternalUserSucceeded = (payload: any): AddExternalUserSucceededAction => ({
    type: types.ADD_EXTERNAL_USER_SUCCEEDED,
    payload,
});

export type AddExternalUserFailedAction = {
    type: typeof types.ADD_EXTERNAL_USER_FAILED;
    message: string;
};

export const addExternalUserFailed = (message: string): AddExternalUserFailedAction => ({
    type: types.ADD_EXTERNAL_USER_FAILED,
    message,
});

//----------------------------------Get eXTERNAL User  List----------------------------------

export type GetExternalUserListRequestedAction = {
    type: typeof types.GET_EXTERNAL_USER_LIST_REQUESTED;
    createdBy: string;
    clientId:number;
};

export const getExternalUserListRequested = (createdBy: string, clientId: number): GetExternalUserListRequestedAction => ({
    type: types.GET_EXTERNAL_USER_LIST_REQUESTED,
    createdBy,
    clientId,
});

export type GetExternalUserListSucceededAction = {
    type: typeof types.GET_EXTERNAL_USER_LIST_SUCCEEDED;
    payload: GetExternalUserDataType[];
};

export const getExternalUserListSucceeded = (payload: GetExternalUserDataType[]): GetExternalUserListSucceededAction => ({
    type: types.GET_EXTERNAL_USER_LIST_SUCCEEDED,
    payload,
});

export type GetExternalUserListFailedAction = {
    type: typeof types.GET_EXTERNAL_USER_LIST_FAILED;
    message: string;
};

export const getExternalUserListFailed = (message: string): GetExternalUserListFailedAction => ({
    type: types.GET_EXTERNAL_USER_LIST_FAILED,
    message,
});

//------------------------------------Change eXTERNAL User  Status----------------------------------

export type ChangeExternalUserStatusRequestedAction = {
    type: typeof types.CHANGE_EXTERNAL_USER_STATUS_REQUESTED;
    payload: ApproveRejectExternalUserpPayload;
    onSuccessCallback?: (success: boolean) => void;
};

export const changeExternalUserStatusRequested = (payload: ApproveRejectExternalUserpPayload, onSuccessCallback: (success: boolean) => void): ChangeExternalUserStatusRequestedAction => ({
    type: types.CHANGE_EXTERNAL_USER_STATUS_REQUESTED,
    payload,
    onSuccessCallback,
});

export type ChangeExternalUserStatusSucceededAction = {
    type: typeof types.CHANGE_EXTERNAL_USER_STATUS_SUCCEEDED;

};

export const changeExternalUserStatusSucceeded = (): ChangeExternalUserStatusSucceededAction => ({
    type: types.CHANGE_EXTERNAL_USER_STATUS_SUCCEEDED,

});

export type ChangeExternalUserStatusFailedAction = {
    type: typeof types.CHANGE_EXTERNAL_USER_STATUS_FAILED;
};

export const changeExternalUserStatusFailed = (): ChangeExternalUserStatusFailedAction => ({
    type: types.CHANGE_EXTERNAL_USER_STATUS_FAILED,

});

//---------------------------------- Pending External User Actions----------------------------------

export type GetPendingExternalUserDetailsRequestedAction = {
    type: typeof types.GET_PENDING_EXTERNAL_USER_DETAILS_REQUESTED;
    payload: PendingExternalUserpayload;
}

export const getPendingExternalUserDetailsRequested = (payload: PendingExternalUserpayload): GetPendingExternalUserDetailsRequestedAction => ({
    type: types.GET_PENDING_EXTERNAL_USER_DETAILS_REQUESTED,
    payload,
});

export type GetPendingExternalUserDetailsSucceededAction = {
    type: typeof types.GET_PENDING_EXTERNAL_USER_DETAILS_SUCCEEDED;
    payload: PendingExternalResp[];
}

export const getPendingExternalUserDetailsSucceeded = (payload: PendingExternalResp[]): GetPendingExternalUserDetailsSucceededAction => ({
    type: types.GET_PENDING_EXTERNAL_USER_DETAILS_SUCCEEDED,
    payload,
});

export type GetPendingExternalUserDetailsFailedAction = {
    type: typeof types.GET_PENDING_EXTERNAL_USER_DETAILS_FAILED;
}

export const getPendingExternalUserDetailsFailed = (): GetPendingExternalUserDetailsFailedAction => ({
    type: types.GET_PENDING_EXTERNAL_USER_DETAILS_FAILED,
});

//--------------------------------- eDIT EXTERNAL user Actions----------------------------------

export type EditExternalUserRequestedAction = {
    type: typeof types.EDIT_EXTERNAL_USER_REQUESTED;
    payload: EditExternalUserPayloadType;
    onSuccessCallback?: (success: boolean) => void;
};

export const editExternalUserRequested = (payload: EditExternalUserPayloadType, onSuccessCallback?: (success: boolean) => void): EditExternalUserRequestedAction => ({
    type: types.EDIT_EXTERNAL_USER_REQUESTED,
    payload,
    onSuccessCallback,
});

export type EditExternalUserSucceededAction = {
    type: typeof types.EDIT_EXTERNAL_USER_SUCCEEDED;
};

export const editExternalUserSucceeded = (): EditExternalUserSucceededAction => ({
    type: types.EDIT_EXTERNAL_USER_SUCCEEDED,
});

export type EditExternalUserFailedAction = {
    type: typeof types.EDIT_EXTERNAL_USER_FAILED;
};

export const editExternalUserFailed = (): EditExternalUserFailedAction => ({
    type: types.EDIT_EXTERNAL_USER_FAILED,
});

//--------------------------------- eNABLE dISABLE EXTERNAL user Actions----------------------------------

export type EnableDisableExternalUserRequestedAction = {
    type: typeof types.ENABLE_DISABLE_EXTERNAL_USER_REQUESTED;
    payload: EnableDisableExternalUserPayload;
    onSuccessCallback?: (success: boolean) => void;
};

export const enableDisableExternalUserRequested = (payload: EnableDisableExternalUserPayload, onSuccessCallback?: (success: boolean) => void): EnableDisableExternalUserRequestedAction => ({
    type: types.ENABLE_DISABLE_EXTERNAL_USER_REQUESTED,
    payload,
    onSuccessCallback,
});

export type EnableDisableExternalUserSucceededAction = {
    type: typeof types.ENABLE_DISABLE_EXTERNAL_USER_SUCCEEDED;
};

export const enableDisableExternalUserSucceeded = (): EnableDisableExternalUserSucceededAction => ({
    type: types.ENABLE_DISABLE_EXTERNAL_USER_SUCCEEDED,
});

export type EnableDisableExternalUserFailedAction = {
    type: typeof types.ENABLE_DISABLE_EXTERNAL_USER_FAILED;
};

export const enableDisableExternalUserFailed = (): EnableDisableExternalUserFailedAction => ({
    type: types.ENABLE_DISABLE_EXTERNAL_USER_FAILED,
});

//----------------------------------External User Actions----------------------------------


export type ExternalUserActions =
    AddExternalUserRequestedAction
    | AddExternalUserSucceededAction
    | AddExternalUserFailedAction

    // Get External User List
    | GetExternalUserListRequestedAction
    | GetExternalUserListSucceededAction
    | GetExternalUserListFailedAction

    // Change External User Status
    | ChangeExternalUserStatusRequestedAction
    | ChangeExternalUserStatusSucceededAction
    | ChangeExternalUserStatusFailedAction

    // Pending External User
    | GetPendingExternalUserDetailsRequestedAction
    | GetPendingExternalUserDetailsSucceededAction
    | GetPendingExternalUserDetailsFailedAction

    // Edit External User
    | EditExternalUserRequestedAction
    | EditExternalUserSucceededAction
    | EditExternalUserFailedAction

    // Enable Disable External User
    | EnableDisableExternalUserRequestedAction
    | EnableDisableExternalUserSucceededAction
    | EnableDisableExternalUserFailedAction;