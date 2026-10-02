import { AppState } from "../../../common/appState";

export const selectDevLocationList = (state: AppState) => state.hdfc.developerLocation.devloperLocationList;
export const selectDevLocationLoaders = (state: AppState) => state.hdfc.developerLocation.loaders;