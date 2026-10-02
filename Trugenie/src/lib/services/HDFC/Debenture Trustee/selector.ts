import { AppState } from "../../../common/appState";

export const selectDebentureList = (state: AppState) => state.hdfc.debenture.debentureList;
export const selectDebentureLoaders = (state: AppState) => state.hdfc.debenture.loader;