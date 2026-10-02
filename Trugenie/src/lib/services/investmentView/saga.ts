import { select, put, takeLeading, call } from "redux-saga/effects";
import {
  InvestmentDataRequestAction,
  InvestmentDataSuccessAction,
  InvestmentDataSummaryAsOnRequestAction,
  InvestmentDataSummaryAsOnSuccessAction,
  investmentDataSuccess,
  investmentDataSummaryAsOnSuccess,
} from "./actions";
import { getInvestmentDataApi, getInvestmentSummaryAsOnApi } from "./api";
import * as types from "./types";
import { InvestmentDataResponseType, InvestmentSummaryAsOnResponseType } from "./dataTypes";
import { selectAccessToken } from "../hdfc_login/selectors";
import { handelReponseCode } from "../../../modules/Components/UtilityFunctions";

function* fetchInvestmentData(action: InvestmentDataRequestAction): Generator<any, any, any> {
  try {
    const accessToken = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token Required for API Call.");
    }
    const result: InvestmentDataResponseType | any | null = yield call(
      getInvestmentDataApi,
      // action.clientID,
      action.emailID,
      action.investmentID,
      action.summaryAsOn,
      accessToken
    );
    const { isError } = handelReponseCode(undefined, result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: InvestmentDataSuccessAction = yield call(investmentDataSuccess, (result.data as InvestmentDataResponseType) ?? null);
      yield put(next);
    }
  } catch (error: any) {
    yield put({
      type: types.INVESTMENT_DATA_FAILURE,
    });
  }
}

function* fetchInvestmentSummaryAsOnData(action: InvestmentDataSummaryAsOnRequestAction): Generator<any, any, any> {
  try {
    const accessToken = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token Required for API Call.");
    }
    const result: InvestmentSummaryAsOnResponseType | any | null = yield call(getInvestmentSummaryAsOnApi, action.investmentId, accessToken);

    const { isError } = handelReponseCode(undefined, result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: InvestmentDataSummaryAsOnSuccessAction = yield call(
        investmentDataSummaryAsOnSuccess,
        (result.data as InvestmentSummaryAsOnResponseType) ?? { misdates: [] },
      );
      yield put(next);
    }
  } catch (error: any) {
    yield put({
      type: types.INVESTMENT_DATA_SUMMARY_AS_ON_FAILURE,
    });
  }
}

function* InvestmentDetailsSaga() {
  yield takeLeading(types.INVESTMENT_DATA_REQUEST, fetchInvestmentData);
  yield takeLeading(types.INVESTMENT_DATA_SUMMARY_AS_ON_REQUESTED, fetchInvestmentSummaryAsOnData);
}

export default InvestmentDetailsSaga;
