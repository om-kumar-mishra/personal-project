import { AppState } from "../../common/appState";

//#region [Auth]
export const selectAccessToken = (state: AppState) => state.hdfcAuth.accessToken;
export const selectUserDetails = (state: AppState) => state.hdfcAuth.userDetails;
export const selectUserPermissions = (state: AppState) => state.hdfcAuth.userPermissions;
export const selectLoaders = (state: AppState) => state.hdfcAuth.loader;
export const selectExpiryDuration = (state: AppState) => state.hdfcAuth.expiryDuration;
export const selectExpiryDate = (state: AppState) => state.hdfcAuth.expiryDate;
export const selectActiveMenu = (state: AppState) => state.hdfcAuth.activeMenu;
export const selectLogoutTimer = (state: AppState) => state.hdfcAuth.logoutMiliseconds;
export const selectActiveSubMenu = (state: AppState) => state.hdfcAuth.subMenu;
export const selectAppVersion = (state: AppState) => state.hdfcAuth.appVersion;
export const selectPublicKey = (state: AppState) => state.hdfcAuth.publicKey;
export const selectLastActivityTimestamp = (state: AppState) => state.hdfcAuth.lastActivityTimeStamp;
//#region
