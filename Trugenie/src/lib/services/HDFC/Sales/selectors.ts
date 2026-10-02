import { AppState } from "../../../common/appState";

//#region [Auth]
export const selectSalesPastHistoryList = (state: AppState) => state.hdfc.sales.salesHistoryList;
export const selectPastSalesSummaryDetail = (state: AppState) => state.hdfc.sales.pastSalesSummary;
export const selectPendingForApprovalSales = (state: AppState) => state.hdfc.sales.pendingForApprovalSalesList;
export const selectPendingForApprovalData = (state: AppState) => state.hdfc.sales.salesSetupPendingData;
export const selectSalesSummaryData = (state: AppState) => state.hdfc.sales.salesSummary;
export const selectSalesSummaryDetails = (state: AppState) => state.hdfc.sales.salesSummaryDetail;
export const selectSalesLoaders = (state: AppState) => state.hdfc.sales.loader;
//#region
