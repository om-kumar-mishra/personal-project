import { AppState } from "../../common/appState";

export const selectNocSetup = (state: AppState) => state.nocSetup;
export const selectNocSetupLoader = (state: AppState) => state.nocSetup.loaders;