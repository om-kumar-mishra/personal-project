import { AppState } from "../../../common/appState";

export const selectInvestmentList = (state: AppState) => state.hdfc.entityInvestment.investmentList;
export const selectInvestmentLoaders = (state: AppState) => state.hdfc.entityInvestment.loader;
export const selectDeleteInvestmentList = (state: AppState) => state.hdfc.entityInvestment.deleteInvestmentListDetails;
