import { AppState } from "../../../../common/appState";
export const selectPhysicalProgressPastHistoryList = (state: AppState) => state.hdfc.physicalProgress.physicalProgressPastHistoryList;
export const selectPhysicalProgressPendingHistoryList = (state: AppState) => state.hdfc.physicalProgress.physicalProgressPendingHistoryList;
export const selectPhysicalProgressLoaders = (state: AppState) => state.hdfc.physicalProgress.loader;
export const selectwithdrawnConfirmLoader = (state:AppState) =>state.hdfc.physicalProgress.updatePhysicalProgressStatus;
export const selectUploadPhysicalProgressSetup = (state: AppState) => state.hdfc.physicalProgress.uploadPhysicalProgressSetup;


