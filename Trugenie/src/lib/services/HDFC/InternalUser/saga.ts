import { call, put, select, takeLatest } from "redux-saga/effects";
import { handelReponseCode } from "../../../../modules/Components/UtilityFunctions";
import { selectAccessToken } from "../../hdfc_login/selectors";
import { GenericResponseTypes } from "../common/dataTypes";
import { AddInternalUserRequestedAction, ChangeInternalUserStatusRequestedAction, GetInternalUserListRequestedAction, addInternalUserSucceeded, changeInternalUserStatusSucceeded, getInternalUserListSucceeded } from "./actions";
import { addInternalUserAPI, changeInternalUserStatusAPI, getInternalUserAPI } from "./api";
import { InternalUserList } from "./dataTypes";
import * as ActionTypes from "./types";

function* handleAddInternalUser(action: AddInternalUserRequestedAction) {
    const accessToken = yield select(selectAccessToken)
    if (accessToken === undefined) {
        throw new TypeError("Access Token Required for API Call.");
    }
    try {
        const result: GenericResponseTypes = yield call(addInternalUserAPI, accessToken, action.payload);
        const { isError } = handelReponseCode(action.onSuccessCallback, result?.info);
        if (isError) {
            throw new Error("API Call Failed.");
        } else {
            yield put(addInternalUserSucceeded(result));
        }
    } catch (e: any) {
        yield put({
            type: ActionTypes.ADD_INTERNAL_USER_FAILED,
            message: e.message,
        });
    }
}

function* handleGetInternalUser(action: GetInternalUserListRequestedAction) {
    const accessToken = yield select(selectAccessToken)
    if (accessToken === undefined) {
        throw new TypeError("Access Token Required for API Call.");
    }
    try {
        const result: InternalUserList = yield call(getInternalUserAPI, accessToken, action.createdBy);
        const { isError } = handelReponseCode(undefined, result?.info);
        if (isError) {
            throw new Error("API Call Failed.");
        } else {
            yield put(getInternalUserListSucceeded(result.data));
        }
    } catch (e: any) {
        yield put({
            type: ActionTypes.GET_INTERNAL_USER_LIST_FAILED,
            message: e.message,
        });
    }
}


function* handleChangeInternalUserStatus(action: ChangeInternalUserStatusRequestedAction) {
    const accessToken = yield select(selectAccessToken)
    if (accessToken === undefined) {
        throw new TypeError("Access Token Required for API Call.");
    }
    try {
        const result: InternalUserList = yield call(changeInternalUserStatusAPI, accessToken, action.payload, action.statusType);
        const { isError } = handelReponseCode(action.onSuccessCallback, result?.info);
        if (isError) {
            throw new Error("API Call Failed.");
        } else {
            yield put(changeInternalUserStatusSucceeded());
        }
    } catch (e: any) {
        yield put({
            type: ActionTypes.CHANGE_INTERNAL_USER_STATUS_FAILED,
            message: e.message,
        });
    }
}


function* internalUserSaga() {
    yield takeLatest(ActionTypes.ADD_INTERNAL_USER_REQUESTED, handleAddInternalUser);
    yield takeLatest(ActionTypes.GET_INTERNAL_USER_LIST_REQUESTED, handleGetInternalUser);
    yield takeLatest(ActionTypes.CHANGE_INTERNAL_USER_STATUS_REQUESTED, handleChangeInternalUserStatus);
}

export default internalUserSaga;

