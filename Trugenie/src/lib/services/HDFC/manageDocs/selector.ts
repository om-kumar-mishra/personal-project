import { AppState } from "../../../common/appState";

export const selectManageDocsUpdateLoaders = (state: AppState) => state.manageDocsUpdate.loaders;
export const selectDeleteProjectDocument = (state: AppState) => state.manageDocsUpdate.deleteProjectDocument;
export const selectGetProjectDocument = (state: AppState) => state.manageDocsUpdate.getProjectDocument;
export const selectGetProjectDocumentHistory = (state: AppState) => state.manageDocsUpdate.getProjectDocumentHistory;
export const selectInsertProjectDocument = (state: AppState) => state.manageDocsUpdate.insertProjectDocument;
