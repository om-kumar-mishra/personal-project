import { AppState } from "../../../../common/appState";

export const selectSiteVisitLoaders = (state: AppState) => state.hdfc.siteImage.loader;
export const selectSiteVisitPendingImagesTable = (state: AppState) => state.hdfc.siteImage.siteVisitPendingImagesTable;
export const selectUpdateConstructionSiteImageStatus = (state: AppState) => state.hdfc.siteImage.updateConstructionSiteImageStatus;
export const selectConstructionPastSiteVisitImages = (state: AppState) => state.hdfc.siteImage.constructionPastSiteVisitImages;
export const selectCanAddSiteVisitImages = (state: AppState) => state.hdfc.siteImage.canAddSiteVisitImages

//Setup
export const selectCanViewImages = (state: AppState) => state.hdfc.siteImage.canViewImages;
export const selectSiteVisitApprovalTable = (state: AppState) => state.hdfc.siteImage.siteVisitApprovalTable;
export const selectSiteVisitPastUpdateTable = (state: AppState) => state.hdfc.siteImage.siteVisitPastUpdateTable;
export const selectUploadSiteImageUpdate = (state: AppState) => state.hdfc.siteImage.uploadSiteImageUpdate;
export const selectOnUploadImagePopupValidate = (state: AppState) => state.hdfc.siteImage.onUploadImagePopupValidate;
export const selectPastUpdateTableDownloadButton = (state: AppState) => state.hdfc.siteImage.pastUpdateTableDownloadButton;