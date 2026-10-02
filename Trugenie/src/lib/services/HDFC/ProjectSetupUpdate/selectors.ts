import { AppState } from "../../../common/appState";

export const selectProjectSalesList = (state: AppState) => state.hdfc.projectSetup.projectSalesList;
export const selectProjectSalesApprovalsList = (state: AppState) => state.hdfc.projectSetup.projectSalesApprovalsList;
export const selectcanUpdateSetup = (state: AppState) => state.hdfc.projectSetup.canSetupProjectUpdate;
export const selectcanCreateSetup = (state: AppState) => state.hdfc.projectSetup.canCreateSetup;
export const selectProjectLoaders = (state: AppState) => state.hdfc.projectSetup.loaders
