import { call, put, select, takeLatest } from "redux-saga/effects";
import { handelReponseCode, successNotification } from "../../../../modules/Components/UtilityFunctions";
import { selectAccessToken } from "../../hdfc_login/selectors";
import { GenericResponseTypes } from "../common/dataTypes";
import { AddExternalUserRequestedAction, ChangeExternalUserStatusRequestedAction, EditExternalUserRequestedAction, EnableDisableExternalUserRequestedAction, GetExternalUserListRequestedAction, GetPendingExternalUserDetailsRequestedAction, addExternalUserSucceeded, changeExternalUserStatusSucceeded, editExternalUserSucceeded, enableDisableExternalUserSucceeded, getExternalUserListSucceeded, getPendingExternalUserDetailsSucceeded } from "./actions";
import { addExternalUserAPI, changeExternalUserStatusAPI, editExternalUserAPI, enableDisableExternalUserAPI, getExternalUserAPI, getPendingExternalUserAPI } from "./api";
import { ExternalUserList } from "./dataTypes";
import * as ActionTypes from "./types";

function* handleAddExternalUser(action: AddExternalUserRequestedAction) {
    const accessToken = yield select(selectAccessToken)
    if (accessToken === undefined) {
        throw new TypeError("Access Token Required for API Call.");
    }
    try {
        const result: GenericResponseTypes = yield call(addExternalUserAPI, accessToken, action.payload);
        const { isError } = handelReponseCode(action.onSuccessCallback, result?.info);
        if (isError) {
            throw new Error("API Call Failed.");
        } else {
            yield put(addExternalUserSucceeded(result));
            yield call(successNotification, result?.info.message ?? "Success");
        }
    } catch (e: any) {
        yield put({
            type: ActionTypes.ADD_EXTERNAL_USER_FAILED,
            message: e.message,
        });
    }
}

function* handleGetExternalUser(action: GetExternalUserListRequestedAction) {
    const accessToken = yield select(selectAccessToken)
    if (accessToken === undefined) {
        throw new TypeError("Access Token Required for API Call.");
    }
    try {
        const result: ExternalUserList = yield call(getExternalUserAPI, accessToken, action.createdBy,action.clientId);
        const { isError } = handelReponseCode(undefined, result?.info);
        if (isError) {
            throw new Error("API Call Failed.");
        } else {
            yield put(getExternalUserListSucceeded(result.data));
        }
    } catch (e: any) {
        yield put({
            type: ActionTypes.GET_EXTERNAL_USER_LIST_FAILED,
            message: e.message,
        });
    }
}


function* handleChangeExternalUserStatus(action: ChangeExternalUserStatusRequestedAction) {
    const accessToken = yield select(selectAccessToken)
    if (accessToken === undefined) {
        throw new TypeError("Access Token Required for API Call.");
    }
    try {
        const result: ExternalUserList = yield call(changeExternalUserStatusAPI, accessToken, action.payload);
        const { isError } = handelReponseCode(action.onSuccessCallback, result?.info);
        if (isError) {
            throw new Error("API Call Failed.");
        } else {
            yield put(changeExternalUserStatusSucceeded());
        }
    } catch (e: any) {
        yield put({
            type: ActionTypes.CHANGE_EXTERNAL_USER_STATUS_FAILED,
            message: e.message,
        });
    }
}

function* handleGetPendingExternalUserDetail(action: GetPendingExternalUserDetailsRequestedAction) {
    const accessToken = yield select(selectAccessToken)
    if (accessToken === undefined) {
        throw new TypeError("Access Token Required for API Call.");
    }
    try {
        const result: GenericResponseTypes = yield call(getPendingExternalUserAPI, accessToken, action.payload);
        const { isError } = handelReponseCode(undefined, result?.info);
        if (isError) {
            throw new Error("API Call Failed.");
        } else {
            yield put(getPendingExternalUserDetailsSucceeded(result.data));
        }
    } catch (e: any) {
        yield put({
            type: ActionTypes.GET_PENDING_EXTERNAL_USER_DETAILS_FAILED,
            message: e.message,
        });
    }
}

function* handleEditExternalUserDetail(action: EditExternalUserRequestedAction) {
    const accessToken = yield select(selectAccessToken)
    if (accessToken === undefined) {
        throw new TypeError("Access Token Required for API Call.");
    }
    try {
        const result: GenericResponseTypes = yield call(editExternalUserAPI, accessToken, action.payload);
        const { isError } = handelReponseCode(action.onSuccessCallback, result?.info);
        if (isError) {
            throw new Error("API Call Failed.");
        } else {
            yield put(editExternalUserSucceeded());
        }
    } catch (e: any) {
        yield put({
            type: ActionTypes.EDIT_EXTERNAL_USER_FAILED,
            message: e.message,
        });
    }
}

function* handleEnableDisableExternalUserDetail(action: EnableDisableExternalUserRequestedAction) {
    const accessToken = yield select(selectAccessToken)
    if (accessToken === undefined) {
        throw new TypeError("Access Token Required for API Call.");
    }
    try {
        const result: GenericResponseTypes = yield call(enableDisableExternalUserAPI, accessToken, action.payload);
        const { isError } = handelReponseCode(action.onSuccessCallback, result?.info);
        if (isError) {
            throw new Error("API Call Failed.");
        } else {
            yield put(enableDisableExternalUserSucceeded());
        }
    } catch (e: any) {
        yield put({
            type: ActionTypes.ENABLE_DISABLE_EXTERNAL_USER_FAILED,
            message: e.message,
        });
    }
}

function* externalUserSaga() {
    yield takeLatest(ActionTypes.ADD_EXTERNAL_USER_REQUESTED, handleAddExternalUser);
    yield takeLatest(ActionTypes.GET_EXTERNAL_USER_LIST_REQUESTED, handleGetExternalUser);
    yield takeLatest(ActionTypes.CHANGE_EXTERNAL_USER_STATUS_REQUESTED, handleChangeExternalUserStatus);
    yield takeLatest(ActionTypes.GET_PENDING_EXTERNAL_USER_DETAILS_REQUESTED, handleGetPendingExternalUserDetail);
    yield takeLatest(ActionTypes.EDIT_EXTERNAL_USER_REQUESTED, handleEditExternalUserDetail);
    yield takeLatest(ActionTypes.ENABLE_DISABLE_EXTERNAL_USER_REQUESTED, handleEnableDisableExternalUserDetail);
}

export default externalUserSaga;

