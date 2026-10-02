import { AppState } from "../../common/appState";


export const selectPorfolioSummaryLoaders = (state: AppState) => state.portfolioSummaryView.loaders;
export const selectPortfolioSummaryList = (state: AppState) => state.portfolioSummaryView.portfolioSummaryList;
export const selectInvestementPerformanceFiltersList = (state: AppState) => state.portfolioSummaryView.investementPerformanceFiltersList;
export const selectSalesPerformanceFilters = (state: AppState) => state.portfolioSummaryView.salesPerformanceFilters;
export const selectSalesPerformanceList = (state: AppState) => state.portfolioSummaryView.salesPerformanceList;
export const selectfilterValues = (state: AppState) => state.portfolioSummaryView.selectedFilterValue;
export const selectSalesfilterValues = (state: AppState) => state.portfolioSummaryView.selectedSalesFilterValue;