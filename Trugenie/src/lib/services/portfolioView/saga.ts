/* eslint-disable @typescript-eslint/ban-ts-comment */
import { call, put, select, takeLeading } from "redux-saga/effects";
import * as types from "./types";
import {
  GetInvestementPerformanceFiltersListRequestAction,
  GetInvestementPerformanceFiltersListSucceeded,
  GetPortfolioSummaryListRequestAction,
  GetPortfolioSummaryListSucceeded,
  GetSalesPerformanceFiltersRequestAction,
  GetSalesPerformanceFiltersSucceeded,
  GetSalesPerformanceListRequestAction,
  GetSalesPerformanceListSucceeded,
  fetchInvestementPerformanceFiltersListSucceeded,
  fetchPortfolioSummaryListSucceeded,
  fetchSalesPerformanceFiltersSucceeded,
  fetchSalesPerformanceListSucceeded,
} from "./action";
import { InvestementPerformanceFilters, PortfolioSummaryList, SalesPerformanceFilters, SalesPerformanceList } from "./dataTypes";
import { getPortfolioSummaryListAPI, getInvestementPerformanceFiltersListAPI, getSalesPerformanceFiltersAPI, getSalesPerformanceListAPI } from "./api";
import { selectAccessToken } from "../hdfc_login/selectors";
import { handelReponseCode } from "../../../modules/Components/UtilityFunctions";

// Portfolio Summary List
function* getPortfolioSummaryList(action: GetPortfolioSummaryListRequestAction): Generator<any, any, any> {
  try {
    const accessToken = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token Required for API Call.");
    }
    const { clientID, emailID, fundId, summaryAsOn, developerId, region, exitTimeline } = action;
    const result: PortfolioSummaryList | null | any = yield call(
      getPortfolioSummaryListAPI,
      accessToken,
      clientID,
      emailID,
      fundId,
      summaryAsOn,
      developerId,
      region,
      exitTimeline,
    );
    const { isError } = handelReponseCode(undefined, result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: GetPortfolioSummaryListSucceeded = yield call(fetchPortfolioSummaryListSucceeded, result?.data as PortfolioSummaryList);
      yield put(next);
    }
  } catch {
    yield put({
      type: types.GET_PORTFOLIO_SUMMARY_LIST_FAILED,
      // message: error.message,
    });
  }
}

// investement performance filters

function* getInvestementPerformanceList(action: GetInvestementPerformanceFiltersListRequestAction): Generator<any, any, any> {
  try {
    const accessToken = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token Required for API Call.");
    }
    const { clientId } = action;
    const result: InvestementPerformanceFilters | null | any = yield call(getInvestementPerformanceFiltersListAPI, accessToken, clientId);
    const { isError } = handelReponseCode(undefined, result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: GetInvestementPerformanceFiltersListSucceeded = yield call(
        fetchInvestementPerformanceFiltersListSucceeded,
        result?.data as InvestementPerformanceFilters,
      );
      yield put(next);
    }
  } catch {
    yield put({
      type: types.GET_INVESTEMENT_PERFORMANCE_LIST_FAILED,
      // message: error.message,
    });
  }
}
// investement performance filters

function* getSalesPerformanceFilters(action: GetSalesPerformanceFiltersRequestAction): Generator<any, any, any> {
  try {
    const accessToken = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token Required for API Call.");
    }
    const { clientId } = action;
    const result: SalesPerformanceFilters | null | any = yield call(getSalesPerformanceFiltersAPI,accessToken, clientId);

    const { isError } = handelReponseCode(undefined, result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: GetSalesPerformanceFiltersSucceeded = yield call(fetchSalesPerformanceFiltersSucceeded, result?.data as SalesPerformanceFilters);
      yield put(next);
    }
  } catch {
    yield put({
      type: types.GET_SALES_PERFORMANCE_FILTERS_FAILED,
      // message: error.message,
    });
  }
}
// get sales performance list
function* getSalesPerformanceList(action: GetSalesPerformanceListRequestAction): Generator<any, any, any> {
  try {
    const accessToken = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token Required for API Call.");
    }
    const { clientId, developerType, fund, developer, region, location, startDate, endDate } = action;

    const result: SalesPerformanceList | null | any = yield call(
      //@ts-ignore
      getSalesPerformanceListAPI,
      accessToken,
      clientId,
      developerType,
      fund,
      developer,
      region,
      location,
      startDate,
      endDate,
    );

    const { isError } = handelReponseCode(undefined, result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: GetSalesPerformanceListSucceeded = yield call(fetchSalesPerformanceListSucceeded, result?.data as SalesPerformanceList);
      yield put(next);
    }
  } catch {
    yield put({
      type: types.GET_SALES_PERFORMANCE_LIST_FAILED,
      // message: error.message,
    });
  }
}
function* portfolioSummaryinSaga() {
  yield takeLeading(types.GET_PORTFOLIO_SUMMARY_LIST_REQUESTED, getPortfolioSummaryList);
  yield takeLeading(types.GET_INVESTEMENT_PERFORMANCE_LIST_REQUESTED, getInvestementPerformanceList);
  yield takeLeading(types.GET_SALES_PERFORMANCE_FILTERS_REQUESTED, getSalesPerformanceFilters);
  yield takeLeading(types.GET_SALES_PERFORMANCE_LIST_REQUESTED, getSalesPerformanceList);
}
export default portfolioSummaryinSaga;
