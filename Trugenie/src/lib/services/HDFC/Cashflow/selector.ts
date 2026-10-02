import { AppState } from "../../../common/appState";

export const selectCashflowPastHistoryList = (state: AppState) => state.hdfc.cashflow.cashflowHistoryList;
export const selectIsCashflowSetup = (state: AppState) => state.hdfc.cashflow.isCashflowSetup;
export const selectDeleteCashflowDetails = (state: AppState) => state.hdfc.cashflow.deleteCashflowDetails;
export const selectUpdateCashflow = (state: AppState) => state.hdfc.cashflow.updateCashflowStatus;
export const selectCashflowLoaders = (state: AppState) => state.hdfc.cashflow.loader;

export const selectCashflowPendingList = (state: AppState) => state.hdfc.cashflow.cashflowPendingList;
export const selectCanSetupCashflow = (state: AppState) => state.hdfc.cashflow.canSetupCashflow;
export const selectUploadCashflowSetup = (state: AppState) => state.hdfc.cashflow.uploadCashflowUnderwrittenSetup;
export const selectCheckCashflowDetailExist = (state: AppState) => state.hdfc.cashflow.checkCashflowDetailExist;
export const selectCashflowSetupPendingList = (state: AppState) => state.hdfc.cashflow.cashflowSetupPendingList;
export const selectCashflowSetupPastUpdate = (state: AppState) => state.hdfc.cashflow.cashflowSetupPastUpdate;

