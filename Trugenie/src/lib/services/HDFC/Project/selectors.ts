import { AppState } from "../../../common/appState";

//#region [Auth]
export const selectProjectList = (state: AppState) => state.hdfc.project.projectList;
export const selectAllProjectList = (state: AppState) => state.hdfc.project.allProjectList;
export const selectSetProject = (state: AppState) => state.hdfc.project.selectedProject;
export const selectLoaders = (state: AppState) => state.hdfc.project.loader;
export const selectCustomerTaggedRMUsers = (state: AppState) => state.hdfc.project.customerTaggedRMUsers;
export const selectREProjectUpdate = (state: AppState) => state.hdfc.project.reProjectUpdate;
export const selectREProjectUpdateStatus = (state: AppState) => state.hdfc.project.reProjectUpdateStatus;
export const selectProjectLogs = (state: AppState) => state.hdfc.project.projectLogs;
export const selectProjectAssignUser = (state: AppState) => state.hdfc.project.projectAssignUser; // insert data for assignuser
export const selectProjectAccessUserList = (state: AppState) => state.hdfc.project.projectAccessUserList;
export const selectProjectAccessUserDetails = (state: AppState) => state.hdfc.project.projectAccessUserDetails;
export const selectRemoveUserProjectAccess = (state: AppState) => state.hdfc.project.removeUserProjectAccess;
export const selectRoleTemplateNameList = (state: AppState) => state.hdfc.project.roleTemplateNameList;
export const selectUserByRoleList = (state: AppState) => state.hdfc.project.userByRoleList;
export const selectProjectUserList = (state: AppState) => state.hdfc.project.projectUsersList;
export const selectAssetInvestmentList = (state: AppState) => state.hdfc.project.assetInvestmentList;
export const selectSetAssetInvestment = (state: AppState) => state.hdfc.project.selectedAssetInvestment;
//#region
