import { AppState } from "../../../common/appState";

export const selectInternalUserLoaders = (state: AppState) => state.hdfc.internalUser.loaders;
export const selectInternalUserList = (state: AppState) => state.hdfc.internalUser.internalUserList;