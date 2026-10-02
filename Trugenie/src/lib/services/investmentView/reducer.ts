import { InvestmnentDataActions } from "./actions";
import {
  InvestmentDataResponseType,
  InvestmentSummaryAsOnResponseType,
} from "./dataTypes";
import * as ReportTypes from "./types";

type InvetsmentState = {
  investmentData: InvestmentDataResponseType | null;
  investmentSummaryAsOnData: InvestmentSummaryAsOnResponseType | null;
  loaders: {
    fetchInvestmentData: boolean;
    fetchInvestmentDataSummaryAsOn: boolean;
  };
};

const initialState: InvetsmentState = {
  investmentData: null,
  investmentSummaryAsOnData: null,
  loaders: {
    fetchInvestmentData: false,
    fetchInvestmentDataSummaryAsOn: false,
  },
};

const investmentDataReducer = (
  state: InvetsmentState = initialState,
  action: InvestmnentDataActions
): InvetsmentState => {
  switch (action.type) {
    case ReportTypes.INVESTMENT_DATA_REQUEST:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          fetchInvestmentData: true,
        },
      };

    case ReportTypes.INVESTMENT_DATA_SUCCESS:
      return {
        ...state,
        investmentData: action.payload,
        loaders: {
          ...state.loaders,
          fetchInvestmentData: false,
        },
      };

    case ReportTypes.INVESTMENT_DATA_FAILURE:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          fetchInvestmentData: false,
        },
      };

    case ReportTypes.INVESTMENT_DATA_SUMMARY_AS_ON_REQUESTED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          fetchInvestmentDataSummaryAsOn: true,
        },
      };

    case ReportTypes.INVESTMENT_DATA_SUMMARY_AS_ON_SUCCESS:
      return {
        ...state,
        investmentSummaryAsOnData: action.payload,
        loaders: {
          ...state.loaders,
          fetchInvestmentDataSummaryAsOn: false,
        },
      };

    case ReportTypes.INVESTMENT_DATA_SUMMARY_AS_ON_FAILURE:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          fetchInvestmentDataSummaryAsOn: false,
        },
      };

    default:
      return state;
  }
};

export default investmentDataReducer;
