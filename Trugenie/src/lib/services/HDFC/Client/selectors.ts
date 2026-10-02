import { AppState } from "../../../common/appState";

export const selectClientList = (state: AppState) => state.hdfc.client.clientList;
export const selectClientLoaders = (state: AppState) => state.hdfc.client.loaders;
