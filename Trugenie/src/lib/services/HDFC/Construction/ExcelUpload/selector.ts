import { AppState } from "../../../../common/appState";
export const selectConstructionExcelUploadPastHistoryList = (state: AppState) => state.hdfc.excelConstructionReducer.excelUploadHistoryList;
export const selectConstructionPendingList = (state: AppState) => state.hdfc.excelConstructionReducer.constructionPendingData;
export const selectContructionExcelLoaders = (state: AppState) => state.hdfc.excelConstructionReducer.loader;
export const selectUploadConstructionSetup = (state: AppState) => state.hdfc.excelConstructionReducer.UploadConstructionSetup;
export const selectwithdrawnConfirmLoader = (state:AppState) =>state.hdfc.excelConstructionReducer.updateConstructionSetupStatus
export const selectUploadConstructionUpdateTemplate = (state: AppState) => state.hdfc.excelConstructionReducer.uploadConstructionTemplate
export const selectCanSetupConstruction = (state: AppState) => state.hdfc.excelConstructionReducer.canSetupConstructionData;
export const selectIsConstructionSetupPending = (state:AppState)=>state.hdfc.excelConstructionReducer.isConstructionSetup
export const selectCanUpdateConstruction = (state :AppState)=>state.hdfc.excelConstructionReducer.CanUpdateConstructionData
export const selectDeleteConstructionUpload = (state: AppState) => state.hdfc.excelConstructionReducer.DeleteConstructionUpload;

