import { AppState } from "../../../common/appState";

export const selectRegionList = (state: AppState) => state.hdfc.region.RegionList;
export const selectRegionLoaders = (state: AppState) => state.hdfc.region.loaders;