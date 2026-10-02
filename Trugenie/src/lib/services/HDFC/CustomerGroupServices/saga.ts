import { call, put, select, takeLatest, takeLeading } from "redux-saga/effects";
import { handelReponseCode } from "../../../../modules/Components/UtilityFunctions";
import { selectAccessToken } from "../../hdfc_login/selectors";
import { resetFilteredInvesteeList } from "../CustomerInvesteeCompany/actions";
import { GenericResponseTypes } from "../common/dataTypes";
import {
  AddCustomerGroupTypeRequested,
  AddCustomerGroupTypeSucceeded,
  EditCustomerGroupTypeRequested,
  EditCustomerGroupTypeSucceeded,
  GetCustomerGroupTypeRequested,
  GetCustomerGroupTypeSucceeded,
  addCustomerGroupSucceeded,
  editCustomerGroupSucceeded,
  getCustomerGroupListSucceeded,
} from "./actions";
import { addCustomerGroupAPI, editCustomerGroupAPI, getCustomerGroupListAPI } from "./api";
import { CustomerGroupList } from "./dataTypes";
import * as ActionTypes from "./types";

function* handleGetCustomerGroup(action: GetCustomerGroupTypeRequested) {
  const accessToken = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const result: CustomerGroupList = yield call(getCustomerGroupListAPI, accessToken, action.client);
    const next: GetCustomerGroupTypeSucceeded = yield call(resetFilteredInvesteeList);
    yield put(next);
    const { isError } = handelReponseCode(undefined, result?.info, "Failed to fetch Group list...");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: GetCustomerGroupTypeSucceeded = yield call(getCustomerGroupListSucceeded, result);
      yield put(next);
    }
  } catch (error: any) {
    yield put({
      type: ActionTypes.GET_CUSTOMER_GROUP_LIST_FAILED,
    });
  }
}

function* handleAddCustomerGroup(action: AddCustomerGroupTypeRequested) {
  const accessToken = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const result: GenericResponseTypes = yield call(addCustomerGroupAPI, accessToken, action.createdBy, action.customerName, action.clientId, action.groupHeadOffice);
    const { isError } = handelReponseCode(action.onSuccessCallback, result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: AddCustomerGroupTypeSucceeded = yield call(addCustomerGroupSucceeded);
      yield put(next);
    }
  } catch (e: any) {
    yield put({
      type: ActionTypes.ADD_CUSTOMER_GROUP_FAILED,
    });
  }
}

function* handleEditCustomerGroup(action: EditCustomerGroupTypeRequested) {
  const accessToken = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const result: GenericResponseTypes = yield call(
      editCustomerGroupAPI,
      accessToken,
      action.developerId,
      action.customerName,
      action.createdBy,
      action.remark,
      action.developerLocation,
    );
    const { isError } = handelReponseCode(action?.onSuccessCallback, result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: EditCustomerGroupTypeSucceeded = yield call(editCustomerGroupSucceeded);
      yield put(next);
    }
  } catch (e: any) {
    yield put({
      type: ActionTypes.EDIT_CUSTOMER_GROUP_FAILED,
      message: e.message,
    });
  }
}

function* customerGroupSaga() {
  yield takeLeading(ActionTypes.GET_CUSTOMER_GROUP_LIST_REQUESTED, handleGetCustomerGroup);
  yield takeLeading(ActionTypes.ADD_CUSTOMER_GROUP_REQUESTED, handleAddCustomerGroup);
  yield takeLeading(ActionTypes.EDIT_CUSTOMER_GROUP_REQUESTED, handleEditCustomerGroup);
}

export default customerGroupSaga;
