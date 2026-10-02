import { call, put, select, takeLatest, takeLeading } from "redux-saga/effects";
import { handelReponseCode } from "../../../../modules/Components/UtilityFunctions";
import { selectAccessToken } from "../../hdfc_login/selectors";
import {
  AddCustomerInvesteeTypeRequested,
  AddCustomerInvesteeTypeSucceeded,
  EditCustomerInvesteeTypeRequested,
  EditCustomerInvesteeTypeSucceeded,
  GetCustomerInvesteeTypeRequested,
  GetCustomerInvesteeTypeSucceeded,
  GetFilteredInvesteeListTypeRequested,
  GetFilteredInvesteeListTypeSucceeded,
  ViewCustomerInvesteeTypeRequested,
  ViewCustomerInvesteeTypeSucceeded,
  addCustomerInvesteeSucceeded,
  editCustomerInvesteeSucceeded,
  getCustomerInvesteeListSucceeded,
  getFilteredInvesteeListSucceeded,
  viewCustomerInvesteeSucceeded,
} from "./actions";
import {
  addCustomerInvesteeAPI,
  editCustomerInvesteeAPI,
  getCustomerInvesteeListAPI,
  getFilteredCustomerInvesteeListAPI,
  viewCustomerInvesteeAPI,
} from "./api";
import { CustomerInvesteeList, FilteredInvesteeList } from "./dataTypes";
import * as ActionTypes from "./types";

function* handleGetCustomerInvestee(action: GetCustomerInvesteeTypeRequested) {
  const accessToken = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const result: CustomerInvesteeList = yield call(getCustomerInvesteeListAPI, accessToken, action.useremail, action.client);
    const { isError } = handelReponseCode(undefined, result?.info, "Failed to fetch borrower list...");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: GetCustomerInvesteeTypeSucceeded = yield call(getCustomerInvesteeListSucceeded, result.data);
      yield put(next);
    }
  } catch (error: any) {
    yield put({
      type: ActionTypes.GET_CUSTOMER_INVESTEE_LIST_FAILED,
    });
  }
}

function* handleGetFilteredCustomerInvestee(action: GetFilteredInvesteeListTypeRequested) {
  const accessToken = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const result: FilteredInvesteeList = yield call(getFilteredCustomerInvesteeListAPI, accessToken, action.DeveloperId, action.createdby);
    const { isError } = handelReponseCode(undefined, result?.info, "Failed to borrower list...");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: GetFilteredInvesteeListTypeSucceeded = yield call(getFilteredInvesteeListSucceeded, result.data);
      yield put(next);
    }
  } catch (error: any) {
    yield put({
      type: ActionTypes.GET_FILTERED_INVESTEE_LIST_FAILED,
    });
  }
}

function* handleAddCustomerInvestee(action: AddCustomerInvesteeTypeRequested) {
  const accessToken = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const result: any = yield call(
      addCustomerInvesteeAPI,
      accessToken,
      action.borrowername,
      action.cin,
      action.clientId,
      action.DeveloperID,
      action.createdby,
      action.gst,
      action.pan,
      action.address,
    );
    const { isError } = handelReponseCode(action.onSuccessCallback, result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: AddCustomerInvesteeTypeSucceeded = yield call(addCustomerInvesteeSucceeded);
      yield put(next);
    }
  } catch (error: any) {
    yield put({
      type: ActionTypes.ADD_CUSTOMER_INVESTEE_FAILED,
      // error: error?.message,
    });
  }
}

function* handleEditCustomerInvestee(action: EditCustomerInvesteeTypeRequested) {
  const accessToken = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const result: any = yield call(
      editCustomerInvesteeAPI,
      accessToken,
      action.borrowerDetailId,
      action.borrowerName,
      action.cin,
      action.createdby,
      action.gst,
      action.pan,
      action.address,
      action?.remark,
    );
    const { isError } = handelReponseCode(action.onSuccessCallback, result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: EditCustomerInvesteeTypeSucceeded = yield call(editCustomerInvesteeSucceeded);
      yield put(next);
    }
  } catch (error: any) {
    yield put({
      type: ActionTypes.EDIT_CUSTOMER_INVESTEE_FAILED,
      message: error.message,
    });
  }
}
function* handleViewCustomerInvestee(action: ViewCustomerInvesteeTypeRequested) {
  const accessToken = yield select(selectAccessToken);

  try {
    const result: any = yield call(viewCustomerInvesteeAPI, accessToken, action.developerId, action.createdby);
    const { isError } = handelReponseCode(action.onSuccessCallback, result?.info, "Failed to view cutomer Investee list...");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: ViewCustomerInvesteeTypeSucceeded = yield call(viewCustomerInvesteeSucceeded);
      yield put(next);
    }
  } catch (error: any) {
    action.onSuccessCallback && action.onSuccessCallback(false);
    yield put({
      type: ActionTypes.VIEW_CUSTOMER_INVESTEE_FAILED,
      message: error.message,
    });
  }
}

function* customerInvesteeSaga() {
  yield takeLeading(ActionTypes.GET_CUSTOMER_INVESTEE_LIST_REQUESTED, handleGetCustomerInvestee);
  yield takeLeading(ActionTypes.ADD_CUSTOMER_INVESTEE_REQUESTED, handleAddCustomerInvestee);
  yield takeLeading(ActionTypes.EDIT_CUSTOMER_INVESTEE_REQUESTED, handleEditCustomerInvestee);
  yield takeLatest(ActionTypes.VIEW_CUSTOMER_INVESTEE_REQUESTED, handleViewCustomerInvestee);
  yield takeLatest(ActionTypes.GET_FILTERED_INVESTEE_LIST_REQUESTED, handleGetFilteredCustomerInvestee);
}

export default customerInvesteeSaga;
