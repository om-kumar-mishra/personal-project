import { AppState } from "../../common/appState";

export const getInvestmentLoader = (state: AppState) =>
  state.investmentData.loaders;
export const getInvestmentDetailsData = (state: AppState) =>
  state.investmentData.investmentData;

export const getInvestmentSummaryAsOnData = (state: AppState) =>
  state.investmentData.investmentSummaryAsOnData;
