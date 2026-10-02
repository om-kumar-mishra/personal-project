import { AppState } from "../../../common/appState";

export const selectZoneList = (state: AppState) => state.hdfc.zones.zonesList;
export const selectZoneLoaders = (state: AppState) => state.hdfc.zones.loaders;