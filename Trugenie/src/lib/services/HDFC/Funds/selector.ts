import { AppState } from "../../../common/appState";

export const selectFundsList = (state: AppState) => state.hdfc.funds.fundsList;
export const selectFundsLoaders = (state: AppState) => state.hdfc.funds.loader;
export const selectDeleteFundsList = (state: AppState) => state.hdfc.funds.deleteFundsListDetails;
