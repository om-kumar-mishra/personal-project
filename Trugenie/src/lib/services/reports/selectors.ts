import { createSelector } from "reselect";
import { AppState } from "../../common/appState";

export const selectAccessToken = (state: AppState) => state.hdfcAuth.accessToken;

// Population Report
const selectPopulationReportState = (state: AppState) => state.report;

export const selectPopulationReportData = createSelector(selectPopulationReportState, populationReportState => populationReportState.data);
export const selectPopulationReportLoading = createSelector(selectPopulationReportState, populationReportState => populationReportState.loading);
export const selectPopulationReportError = createSelector(selectPopulationReportState, populationReportState => populationReportState.error);

// Admin (Report)
const selectAdminReportState = (state: AppState) => state.report;

export const selectAdminReportData = createSelector(selectAdminReportState, adminReportState => adminReportState.data);
export const selectAdminReportLoading = createSelector(selectAdminReportState, adminReportState => adminReportState.loading);
export const selectAdminReportError = createSelector(selectAdminReportState, adminReportState => adminReportState.error);

// Login report
const selectLoginReportState = (state: AppState) => state.report;

export const selectLoginReportData = createSelector(selectLoginReportState, loginReportState => loginReportState.data);
export const selectLoginReportLoading = createSelector(selectLoginReportState, loginReportState => loginReportState.loading);
export const selectLoginReportError = createSelector(selectLoginReportState, loginReportState => loginReportState.error);

// RoleRight report
const selectRoleRightReportState = (state: AppState) => state.report;

export const selectRoleRightReportData = createSelector(selectRoleRightReportState, roleRightReportState => roleRightReportState.data);
export const selectRoleRightReportLoading = createSelector(selectRoleRightReportState, roleRightReportState => roleRightReportState.loading);
export const selectRoleRightReportError = createSelector(selectRoleRightReportState, roleRightReportState => roleRightReportState.error);

// master-application
export const selectMasterApplicationState = (state: AppState) => state.report;

export const selectMasterApplicationData = createSelector(selectMasterApplicationState, masterApplicationState => masterApplicationState.applicationMaster);
export const selectUpdateMasterState = (state: AppState) => state.report;
export const selectMasterApplicationLoading = createSelector(
  selectMasterApplicationState,
  masterApplicationState => masterApplicationState.loaders.getApplicationMaster,
);

export const selectReportLoaders = (state: AppState) => state.report.loaders;
export const selectIssuedNOCReportState = (state: AppState) => state.report.issuedNOCReport;
export const selectAllNOCReportState = (state: AppState) => state.report.allNOCReport;
