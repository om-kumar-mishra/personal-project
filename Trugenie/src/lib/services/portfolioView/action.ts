
import { dropdowns } from "../../../modules/pages/Portfolio/Dashboard/investmentPerformance";
import { dropdownsSales } from "../../../modules/pages/Portfolio/Dashboard/salesPerformance";
import { PortfolioSummaryList, InvestementPerformanceFilters, SalesPerformanceFilters, SalesPerformanceList } from "./dataTypes";

import * as types from "./types";

//#region Get portfolio summary
// portfolio summary Requested
export type GetPortfolioSummaryListRequestAction = {
  type: typeof types.GET_PORTFOLIO_SUMMARY_LIST_REQUESTED;
  clientID: string;
  emailID: string;
  fundId: string;
  summaryAsOn: string;
  developerId: string;
  region: string;
  exitTimeline: string;
};
export const fetchPortfolioSummaryListRequested = (
  clientID: string,
  emailID: string,
  fundId: string,
  summaryAsOn: string,
  developerId: string,
  region: string,
  exitTimeline: string
): GetPortfolioSummaryListRequestAction => ({
  type: types.GET_PORTFOLIO_SUMMARY_LIST_REQUESTED,
  clientID,
  emailID,
  fundId,
  summaryAsOn,
  developerId,
  region,
  exitTimeline,
});
// portfolio summary list Succeded
export type GetPortfolioSummaryListSucceeded = {
  type: typeof types.GET_PORTFOLIO_SUMMARY_LIST_SUCCEEDED;
  result: PortfolioSummaryList;
};
export const fetchPortfolioSummaryListSucceeded = (
  result: PortfolioSummaryList
): GetPortfolioSummaryListSucceeded => ({
  type: types.GET_PORTFOLIO_SUMMARY_LIST_SUCCEEDED,
  result,
});
// portfolio summary list failed
export type GetPortfolioSummaryListFailed = {
  type: typeof types.GET_PORTFOLIO_SUMMARY_LIST_FAILED;
  error?: unknown;
};
export const GetPortfolioSummaryListFailed = (
  error?: unknown
): GetPortfolioSummaryListFailed => ({
  type: types.GET_PORTFOLIO_SUMMARY_LIST_FAILED,
  error,
});
//#endregion

//#region Get portfolio summary

// filters api of portfolio view investement performance
export type GetInvestementPerformanceFiltersListRequestAction = {
  type: typeof types.GET_INVESTEMENT_PERFORMANCE_LIST_REQUESTED;
  clientId: string;
};
export const fetchInvestementPerformanceFiltersRequested = (
  clientId: string
): GetInvestementPerformanceFiltersListRequestAction => ({
  type: types.GET_INVESTEMENT_PERFORMANCE_LIST_REQUESTED,
  clientId,
});
// investement performance filters list Succeded
export type GetInvestementPerformanceFiltersListSucceeded = {
  type: typeof types.GET_INVESTEMENT_PERFORMANCE_LIST_SUCCEEDED;
  result: InvestementPerformanceFilters;
};
export const fetchInvestementPerformanceFiltersListSucceeded = (
  result: InvestementPerformanceFilters
): GetInvestementPerformanceFiltersListSucceeded => ({
  type: types.GET_INVESTEMENT_PERFORMANCE_LIST_SUCCEEDED,
  result,
});
//investement performance filters failed
export type GetInvestementPerformanceFiltersListFailed = {
  type: typeof types.GET_INVESTEMENT_PERFORMANCE_LIST_FAILED;
  error?: unknown;
};
export const GetInvestementPerformanceFiltersListFailed = (
  error?: unknown
): GetInvestementPerformanceFiltersListFailed => ({
  type: types.GET_INVESTEMENT_PERFORMANCE_LIST_FAILED,
  error,
});

//#endregion
//#region Get sales performance filters
// sales performance filters Requested
export type GetSalesPerformanceFiltersRequestAction = {
  type: typeof types.GET_SALES_PERFORMANCE_FILTERS_REQUESTED;
  clientId: number;
};
export const fetchSalesPerformanceFiltersRequested = (
  clientId: number
): GetSalesPerformanceFiltersRequestAction => ({
  type: types.GET_SALES_PERFORMANCE_FILTERS_REQUESTED,
  clientId,
});
// Get sales performance filters Succeded
export type GetSalesPerformanceFiltersSucceeded = {
  type: typeof types.GET_SALES_PERFORMANCE_FILTERS_SUCCEEDED;
  result: SalesPerformanceFilters;
};
export const fetchSalesPerformanceFiltersSucceeded = (
  result: SalesPerformanceFilters
): GetSalesPerformanceFiltersSucceeded => ({
  type: types.GET_SALES_PERFORMANCE_FILTERS_SUCCEEDED,
  result,
});
// Get sales performance filtersfailed
export type GetSalesPerformanceFiltersFailed = {
  type: typeof types.GET_SALES_PERFORMANCE_FILTERS_FAILED;
  error?: unknown;
};
export const GetSalesPerformanceFailed = (
  error?: unknown
): GetSalesPerformanceFiltersFailed => ({
  type: types.GET_SALES_PERFORMANCE_FILTERS_FAILED,
  error,
});
//#endregion

//#endregion
//#region Get sales performance list
// sales performance list Requested
export type GetSalesPerformanceListRequestAction = {
  type: typeof types.GET_SALES_PERFORMANCE_LIST_REQUESTED;
  clientId: string;
  developerType: string;
  fund: string;
  developer: string;
  region: string;
  location: string;
  startDate: string;
  endDate: string;
};
export const fetchSalesPerformanceListRequested = (
  clientId: string,
  developerType: string,
  fund: string,
  developer: string,
  region: string,
  location: string,
  startDate: string,
  endDate: string
): GetSalesPerformanceListRequestAction => ({
  type: types.GET_SALES_PERFORMANCE_LIST_REQUESTED,
  clientId,
  developerType,
  fund,
  developer,
  region,
  location,
  startDate,
  endDate,
});
// Get sales performance list Succeded
export type GetSalesPerformanceListSucceeded = {
  type: typeof types.GET_SALES_PERFORMANCE_LIST_SUCCEEDED;
  result: SalesPerformanceList;
};
export const fetchSalesPerformanceListSucceeded = (
  result: SalesPerformanceList
): GetSalesPerformanceListSucceeded => ({
  type: types.GET_SALES_PERFORMANCE_LIST_SUCCEEDED,
  result,
});
// Get sales performance list failed
export type GetSalesPerformanceListFailed = {
  type: typeof types.GET_SALES_PERFORMANCE_LIST_FAILED;
  error?: unknown;
};
export const GetSalesPerformanceList = (
  error?: unknown
): GetSalesPerformanceListFailed => ({
  type: types.GET_SALES_PERFORMANCE_LIST_FAILED,
  error,
});
//#endregion
// selected filter value cpersist
export type SelectedFilterChangesAction = {
  type: typeof types.SELECTED_FILTER_VALUE;
  selectedFilter: dropdowns;
};

export const selectedFilterValue = (selectedFilter: dropdowns): SelectedFilterChangesAction => ({
  type: types.SELECTED_FILTER_VALUE,
  selectedFilter,
});
// selected sales filter value cpersist
export type SelectedSalesFilterChangesAction = {
  type: typeof types.SELECTED_SALES_FILTER_VALUE;
  selectedSalesFilter: dropdownsSales;
};

export const selectedSalesFilterValue = (selectedSalesFilter: dropdownsSales): SelectedSalesFilterChangesAction => ({
  type: types.SELECTED_SALES_FILTER_VALUE,
  selectedSalesFilter,
});
export type PortfolioSummaryActions =
  // portfolio summary list
  | GetPortfolioSummaryListRequestAction
  | GetPortfolioSummaryListSucceeded
  | GetPortfolioSummaryListFailed
  // investement performance filters
  | GetInvestementPerformanceFiltersListRequestAction
  | GetInvestementPerformanceFiltersListSucceeded
  | GetInvestementPerformanceFiltersListFailed
  // sales performance filters
  | GetSalesPerformanceFiltersRequestAction
  | GetSalesPerformanceFiltersSucceeded
  | GetSalesPerformanceFiltersFailed
  // sales performance list
  | GetSalesPerformanceListRequestAction
  | GetSalesPerformanceListSucceeded
  | GetSalesPerformanceListFailed
  // selected filter value
  |SelectedFilterChangesAction
  // sales selected filter value
  |SelectedSalesFilterChangesAction
  ;
