import { AppState } from "../../../common/appState";

export const selectSummaryPastHistoryList = (state: AppState) => state.hdfc.summary.summaryHistoryList;
export const selectSummaryPendingList = (state: AppState) => state.hdfc.summary.summaryPendingList;
export const selectIsSummarySetup = (state: AppState) => state.hdfc.summary.isSummarySetup;
export const selectDeleteProjectSummaryDetails = (state: AppState) => state.hdfc.summary.deleteProjectSummaryDetails;
export const selectUpdateProject = (state: AppState) => state.hdfc.summary.deleteProjectSummaryDetails;
export const selectSummaryLoaders = (state: AppState) => state.hdfc.summary.loader;
export const selectCheckProjectSummaryDetailExist = (state: AppState) => state.hdfc.summary.checkProjectSummaryDetailExist;
export const selectUploadProjectSummaryTemplate = (state: AppState) => state.hdfc.summary.uploadProjectSummary;
export const selectUploadProjectSummarySetup = (state: AppState) => state.hdfc.summary.uploadProjectSummarySetup;
export const selectCanSetupSummary = (state: AppState) => state.hdfc.summary.canSetupProjectSummary;
