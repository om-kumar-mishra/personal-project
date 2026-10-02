import { AppState } from "../../../common/appState";

export const selectInvestmentPastHistoryList = (state: AppState) => state.hdfc.investment.investmentHistoryList;
export const selectInvestmentLoaders = (state: AppState) => state.hdfc.investment.loader;
export const selectIsInvestmentSetup = (state: AppState) => state.hdfc.investment.isInvestmentSetup;
export const selectCheckInvestmentDetailExist = (state: AppState) => state.hdfc.investment.checkInvestmentDetailExist;
export const selectDeleteInvestmentDetails = (state: AppState) => state.hdfc.investment.deleteInvestmentDetails;
export const selectUpdateProject = (state: AppState) => state.hdfc.investment.updateInvestmentStatus;
export const selectUploadInvestmentTemplate = (state: AppState) => state.hdfc.investment.uploadInvestment;
export const selectUploadInvestmentSetupTemplate = (state: AppState) => state.hdfc.investment.uploadInvestmentSetup;
// export const selectUploadInvestmentSetup = (state: AppState) => state.hdfc.investment.uploadInvestmentSetup;
export const selectCanSetupInvestment = (state: AppState) => state.hdfc.investment.canSetupInvestment;

export const selectInvestmentPendingList = (state: AppState) => state.hdfc.investment.investmentPendingList;
export const selectInvestmentList = (state: AppState) => state.hdfc.investment.investmentList;
export const selectInvestmentFundsList = (state: AppState) => state.hdfc.investment.investmentFunds;
export const selectInvestmentDevloperList = (state: AppState) => state.hdfc.investment.InvestmentDeveloper;
export const selectSelectedInvestment = (state: AppState) => state.hdfc.investment.selectedInvestment;
