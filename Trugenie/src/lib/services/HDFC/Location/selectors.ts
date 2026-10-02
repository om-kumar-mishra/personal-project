import { AppState } from "../../../common/appState";

export const selectLocationList = (state: AppState) => state.hdfc.location.locationList;
export const selectLocationLoaders = (state: AppState) => state.hdfc.location.loaders;