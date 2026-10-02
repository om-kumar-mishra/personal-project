import { AppState } from "../../common/appState";

export const selectPrefrenceLoader = (state: AppState) => state.nocPrefrence.loaders;
export const selectCalculateCashCover = (state: AppState) => state.nocPrefrence.cashCoverDetail;
export const selectReProjectExposure = (state: AppState) => state.nocPrefrence.reProjectExposure;
export const selectReProjectSecurity = (state: AppState) => state.nocPrefrence.reProjectSecurity;
export const selectNOCProjectPrefrence = (state: AppState) => state.nocPrefrence.nocProjectPrefrence;
export const selectUpdateHoldStatus = (state: AppState) => state.nocPrefrence.getUpdateHoldStatus;
