import { call, put, select, takeEvery, takeLeading } from "redux-saga/effects";
import { handelReponseCode } from "../../../../modules/Components/UtilityFunctions";
import { selectAccessToken } from "../../hdfc_login/selectors";
import {
  AddExternalNOCRequested,
  AddExternalNOCSucceeded,
  GetNOCAccountRequested,
  GetNOCAccountSucceeded,
  GetNOCPriceHeaderRequested,
  GetNOCPriceHeaderSucceeded,
  GetNOCTypeRequested,
  GetNOCTypeSucceeded,
  GetSalesUnitForNOCRequested,
  GetSalesUnitForNOCSucceeded,
  GetSalesUnitPriceHeaderRequested,
  GetSalesUnitPriceHeaderSucceeded,
  PaymentVerificationRequested,
  PaymentVerificationSucceeded,
  createExternalNOCSucceeded,
  getNOCAccountSucceeded,
  getNOCPriceHeaderSucceeded,
  getNOCTypeListSucceeded,
  getSalesUnitForNOCSucceeded,
  getSalesUnitPriceHeaderSucceeded,
  paymentVerificationSucceeded,
} from "./actions";
import {
  createExternalNOCAPI,
  getNOCAccountsAPI,
  getNOCPriceHeaderAPI,
  getNOCTypesListAPI,
  getSalesUnitForNOCAPI,
  getSalesUnitPriceHeaderAPI,
  paymentVerificationAPI,
} from "./api";
import {
  CreateExternalNOCResponse,
  NOCAccountsResponse,
  NOCPriceHeaderResponse,
  NOCTypeResponse,
  PaymentVerificationResponse,
  SalesUnitForNOCResponse,
  SalesUnitPriceHeaderResponse,
} from "./dataTypes";
import * as actionTypes from "./types";

function* handleFetchNOCTypesList(action: GetNOCTypeRequested) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: NOCTypeResponse = yield call(getNOCTypesListAPI, accessToken);
    const { isError } = handelReponseCode(action.callback, response?.info, "Failed to fetch NOC type list...");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: GetNOCTypeSucceeded = yield call(getNOCTypeListSucceeded, response);
      yield put(next);
    }
  } catch (error: any) {
    yield put({
      type: actionTypes.GET_NOC_TYPES_FAILED,
    });
  }
}

function* handleFetchSalesUnitForNOC(action: GetSalesUnitForNOCRequested) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }

    const { reAssetId, nocType } = action;
    const response: SalesUnitForNOCResponse = yield call(getSalesUnitForNOCAPI, accessToken, reAssetId, nocType);
    const { isError } = handelReponseCode(action.callback, response?.info, "Failed to fetch sales unit list...");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: GetSalesUnitForNOCSucceeded = yield call(getSalesUnitForNOCSucceeded, response);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put({
      type: actionTypes.GET_SALES_UNIT_FOR_NOC_FAILED,
      message: "",
    });
  }
}

function* handleFetchSalesUnitPriceHeader(action: GetSalesUnitPriceHeaderRequested) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: SalesUnitPriceHeaderResponse = yield call(getSalesUnitPriceHeaderAPI, accessToken, action.salesId);
    const { isError } = handelReponseCode(action.callback, response?.info, "Failed to fetch sales price haeder list...");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: GetSalesUnitPriceHeaderSucceeded = yield call(getSalesUnitPriceHeaderSucceeded, response);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put({
      type: actionTypes.GET_SALES_UNIT_PRICE_HEADER_FAILED,
      message: "",
    });
  }
}

function* handleFetchNOCPriceHeader(action: GetNOCPriceHeaderRequested) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }

    const { nocProjectId, salesId, nocrequestid } = action;
    const response: NOCPriceHeaderResponse = yield call(getNOCPriceHeaderAPI, accessToken, nocProjectId, salesId, nocrequestid);
    const { isError } = handelReponseCode(action.callback, response?.info, "Failed to fetch price haeder unit list...");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const success: GetNOCPriceHeaderSucceeded = yield call(getNOCPriceHeaderSucceeded, response);
      yield put(success);
    }
  } catch (error: unknown) {
    yield put({
      type: actionTypes.GET_NOC_PRICE_HEADER_FAILED,
      message: "",
    });
  }
}

function* handleFetchNOCAccounts(action: GetNOCAccountRequested) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const { nocProjectId, createdBy, tower } = action;
    const response: NOCAccountsResponse = yield call(getNOCAccountsAPI, accessToken, nocProjectId, createdBy, tower);
    const { isError } = handelReponseCode(action.callback, response?.info, "Failed to fetch NOC account list...");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const success: GetNOCAccountSucceeded = yield call(getNOCAccountSucceeded, response);
      yield put(success);
    }
  } catch (error: unknown) {
    yield put({
      type: actionTypes.GET_NOC_ACCOUNTS_FAILED,
      message: "",
    });
  }
}

function* handlePaymentVerification(action: PaymentVerificationRequested) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }

    const { bankDetails, lenderDetails, ledgerType, ledger, bankStatement } = action;
    const response: PaymentVerificationResponse = yield call(
      paymentVerificationAPI,
      accessToken,
      bankDetails,
      lenderDetails,
      ledgerType,
      ledger,
      bankStatement,
    );
    const { isError } = handelReponseCode(action.callback, response?.info, "Failed to fetch payment verification...");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      if (action.callback) {
        yield call(action.callback, true, "Payment Verification done successfully...");
      }
      const next: PaymentVerificationSucceeded = yield call(paymentVerificationSucceeded, response);
      yield put(next);
    }
  } catch (error: unknown) {

    yield put({
      type: actionTypes.PAYMENT_VERIFICATION_FAILED,
      message: "",
    });

  }
}

function* handleAddExternalNOC(action: AddExternalNOCRequested) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const { formData } = action;
    const response: CreateExternalNOCResponse = yield call(createExternalNOCAPI, accessToken, formData);
    console.log(response);
    const { isError } = handelReponseCode(action.callback, response?.info, "Failed to add external NOC...");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: AddExternalNOCSucceeded = yield call(createExternalNOCSucceeded, response);
      yield put(next);
      if (action.callback) {
        yield call(action.callback, true, "External NOC created successfully...");
      }
    }
  } catch (error: any) {
    yield put({
      type: actionTypes.ADD_EXTERNAL_NOC_FAILED,
      message: error?.message,
    });
  }
}

function* externalNOCSaga() {
  yield takeEvery(actionTypes.GET_NOC_TYPES_REQUESTED, handleFetchNOCTypesList);
  yield takeEvery(actionTypes.GET_SALES_UNIT_FOR_NOC_REQUESTED, handleFetchSalesUnitForNOC);
  yield takeEvery(actionTypes.GET_SALES_UNIT_PRICE_HEADER_REQUESTED, handleFetchSalesUnitPriceHeader);
  yield takeEvery(actionTypes.GET_NOC_PRICE_HEADER_REQUESTED, handleFetchNOCPriceHeader);
  yield takeEvery(actionTypes.GET_NOC_ACCOUNTS_REQUESTED, handleFetchNOCAccounts);
  yield takeLeading(actionTypes.PAYMENT_VERIFICATION_REQUESTED, handlePaymentVerification);
  yield takeLeading(actionTypes.ADD_EXTERNAL_NOC_REQUESTED, handleAddExternalNOC);
}

export default externalNOCSaga;
