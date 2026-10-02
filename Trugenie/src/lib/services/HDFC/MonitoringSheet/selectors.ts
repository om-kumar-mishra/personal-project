import { AppState } from "../../../common/appState";

export const selectSalesMonitoringPastHistoryList = (state: AppState) => state.hdfc.salesMonitoring.salesMonitoringHistoryList;
export const selectSalesMonitoringLoaders = (state: AppState) => state.hdfc.salesMonitoring.loader;
export const selectMisDate = (state: AppState) => state.hdfc.salesMonitoring.misDate;
export const selectMonitoringSheetDetails = (state: AppState) => state.hdfc.salesMonitoring.MoitoringSheetDetailsList;
export const selectMontinoringSheetLoader = (state: AppState) => state.hdfc.salesMonitoring.loader