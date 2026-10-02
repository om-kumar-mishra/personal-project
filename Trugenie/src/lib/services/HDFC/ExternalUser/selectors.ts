import { AppState } from "../../../common/appState";

export const selectExternalUserLoaders = (state: AppState) => state.hdfc.externalUser.loaders;
export const selectExternalUserList = (state: AppState) => state.hdfc.externalUser.externalUserList;
export const selectPendingExternalUserDetails = (state: AppState) => state.hdfc.externalUser.pendingExternalUserDetails;