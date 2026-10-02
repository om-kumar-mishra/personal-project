import { AppState } from "../../../common/appState";

export const selectPMCList = (state: AppState) => state.hdfc.pmc.pmcList;
export const selectPMCLoaders = (state: AppState) => state.hdfc.pmc.loader;