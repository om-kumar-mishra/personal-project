import { AppState } from "../../../common/appState";

export const selectRMUserLoaders = (state: AppState) => state.hdfc.commons.loaders;
export const selectTaggedRMUserList = (state: AppState) => state.hdfc.commons.taggedRmUserList;
export const selectRMUserList = (state: AppState) => state.hdfc.commons.rmUserList;
export const selectValidateExcelFile = (state: AppState) => state.hdfc.commons.validateExcel;
export const selectSwitchClient = (state: AppState) => state.hdfc.commons.switchClient;
export const selectGetSwitchClientList = (state: AppState) => state.hdfc.commons.getSwitchClientList;
