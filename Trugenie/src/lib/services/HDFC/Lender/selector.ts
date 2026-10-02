import { AppState } from "../../../common/appState";

export const selectLenderList = (state: AppState) => state.hdfc.lender.lenderList;
export const selectclientList = (state: AppState) => state.hdfc.lender.clientAllUserList;
export const selectLenderLoaders = (state: AppState) => state.hdfc.lender.loader;