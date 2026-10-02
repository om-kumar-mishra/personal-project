import { PortfolioSummaryActions } from "./action";
import { InvestementPerformanceFilters, PortfolioSummaryList, SalesPerformanceFilters, SalesPerformanceList } from "./dataTypes";
import * as types from "./types";
import { dropdowns, filterDropdowns } from "../../../modules/pages/Portfolio/Dashboard/investmentPerformance";
import { dropdownsSales, salesDropdowns } from "../../../modules/pages/Portfolio/Dashboard/salesPerformance";

export type DashboardState = {
  token: string;
  portfolioSummaryList: PortfolioSummaryList|null;
  investementPerformanceFiltersList: InvestementPerformanceFilters|null;
  salesPerformanceFilters: SalesPerformanceFilters|null;
  salesPerformanceList: SalesPerformanceList|null;
  selectedFilterValue:dropdowns;
  selectedSalesFilterValue:dropdownsSales;
  loaders: {
    portfolioSummaryListLoader: boolean;
    investementPerformanceFiltersListLoader:boolean;
    salesPerformanceFiltersLoader:boolean;
    salesPerformanceListLoader:boolean;
  };
};
const initialState: DashboardState = {
  token: "",
  portfolioSummaryList:null ,
  investementPerformanceFiltersList:null,
  salesPerformanceFilters:null,
  salesPerformanceList:null,
  selectedFilterValue:filterDropdowns,
  selectedSalesFilterValue:salesDropdowns,
  loaders: {
    portfolioSummaryListLoader: false,
    investementPerformanceFiltersListLoader:false,
    salesPerformanceFiltersLoader:false,
    salesPerformanceListLoader:false
  },
};
const portfolioSummaryReducer = (
  state: DashboardState = initialState,
  action: PortfolioSummaryActions
): DashboardState => {
  switch (action.type) {
    //portfolio list loader
    case types.GET_PORTFOLIO_SUMMARY_LIST_REQUESTED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          portfolioSummaryListLoader: true,
        },
      };
    case types.GET_PORTFOLIO_SUMMARY_LIST_SUCCEEDED:
      return {
        ...state,
        portfolioSummaryList: action.result,
        loaders: {
          ...state.loaders,
          portfolioSummaryListLoader: false,
        },
      };
    case types.GET_PORTFOLIO_SUMMARY_LIST_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          portfolioSummaryListLoader: false,
        },
      };
      //portfolio investement performance filters
       
    case types.GET_INVESTEMENT_PERFORMANCE_LIST_REQUESTED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          investementPerformanceFiltersListLoader: true,
        },
      };
    case types.GET_INVESTEMENT_PERFORMANCE_LIST_SUCCEEDED:
      return {
        ...state,
        investementPerformanceFiltersList: action.result,
        loaders: {
          ...state.loaders,
          portfolioSummaryListLoader: false,
        },
      };
    case types.GET_INVESTEMENT_PERFORMANCE_LIST_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          investementPerformanceFiltersListLoader: false,
        },
      };
      //sales performance filters
    case types.GET_SALES_PERFORMANCE_FILTERS_REQUESTED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          salesPerformanceFiltersLoader: true,
        },
      };
    case types.GET_SALES_PERFORMANCE_FILTERS_SUCCEEDED:
      return {
        ...state,
        salesPerformanceFilters: action.result,
        loaders: {
          ...state.loaders,
          salesPerformanceFiltersLoader: false,
        },
      };
    case types.GET_SALES_PERFORMANCE_FILTERS_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          salesPerformanceFiltersLoader: false,
        },
      };
        //sales performance list
    case types.GET_SALES_PERFORMANCE_LIST_REQUESTED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          salesPerformanceListLoader: true,
        },
      };
    case types.GET_SALES_PERFORMANCE_LIST_SUCCEEDED:
      return {
        ...state,
        salesPerformanceList: action.result,
        loaders: {
          ...state.loaders,
          salesPerformanceListLoader: false,
        },
      };
    case types.GET_SALES_PERFORMANCE_LIST_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          salesPerformanceListLoader: false,
        },
      };
       // selected filter values
    case types.SELECTED_FILTER_VALUE:
      return {
        ...state,
        selectedFilterValue: action.selectedFilter,
      };
         // selected sales filter values
    case types.SELECTED_SALES_FILTER_VALUE:
      return {
        ...state,
        selectedSalesFilterValue: action.selectedSalesFilter,
      };
    default:
      return state;
  }
};
export default portfolioSummaryReducer;
