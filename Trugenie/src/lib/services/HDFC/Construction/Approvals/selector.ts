import { AppState } from "../../../../common/appState";

export const selectApprovalPastHistoryList = (state: AppState) => state.hdfc.approval.approvalPastHistoryList;
export const selectApprovalLoaders = (state: AppState) => state.hdfc.approval.loader;
export const selectUpdateStatusLoader = (state:AppState) =>state.hdfc.approval.updateApprovalStatus;
export const selectPendingConstructionApprovalDocuments = (state:AppState) =>state.hdfc.approval.PendingConstructionApprovalDocuments;
export const selectUploadConstructionApprovalDocuments = (state:AppState) =>state.hdfc.approval.uploadConstructionApprovalDocuments;
export const selectApprovalDropDownList = (state: AppState) => state.hdfc.approval.approvalDropdown;






