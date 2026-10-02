import {
  AllProjectListResponse,
  AssetInvestmentType,
  CreateProjectPayloadType,
  CustomerTaggedRMUsersPayload,
  CustomerTaggedRMUsersResponse,
  Project,
  ProjectAsignUserPayload,
  ProjectAssignUserResponse,
  ProjectListResponse,
  ProjectLogsListResponse,
  ProjectUpdateResponse,
  ProjectUpdateStatusPayload,
  ProjectUserAccessDetailsResponse,
  ProjectUserAccessListResponse,
  RemoveUserProjectAccessPayload,
  RemoveUserProjectAccessResponse,
  RoleTemplateNameListResponse,
  UserByRoleListResponse,
  updateREProjectPayload,
} from "./dataTypes";
import * as actionTypes from "./types";

//#region [List Requested]
export type ProjectListRequestedAction = {
  type: typeof actionTypes.PROJECT_LIST_REQUESTED;
  client: number;
  callback?: (success: boolean, message?: string) => void;
};
export const requestProjectList = (client: number, callback?: (success: boolean, message?: string) => void): ProjectListRequestedAction => ({
  type: actionTypes.PROJECT_LIST_REQUESTED,
  client,
  callback,
});
//#endregion

//#region [List Succeeded]
export type ProjectListSucceededAction = {
  type: typeof actionTypes.PROJECT_LIST_SUCCEEDED;
  result: ProjectListResponse;
};
export const projectListSucceeded = (result: ProjectListResponse): ProjectListSucceededAction => ({
  type: actionTypes.PROJECT_LIST_SUCCEEDED,
  result,
});
//#endregion

//#region [List Failed]
export type ProjectListFailedAction = {
  type: typeof actionTypes.PROJECT_LIST_FAILED;
  error?: string;
};
export const projectListFailed = (error?: string): ProjectListFailedAction => ({
  type: actionTypes.PROJECT_LIST_FAILED,
  error,
});
//#endregion

//#region [Reset Data]
export type ProjectListResetAction = {
  type: typeof actionTypes.PROJECT_LIST_RESET;
};

//#region [All project List Requested]
export type AllProjectListRequestedAction = {
  type: typeof actionTypes.ALL_PROJECT_LIST_REQUESTED;
  client: number;
  useremail: string;
};
export const requestAllProjectList = (client: number, useremail: string): AllProjectListRequestedAction => ({
  type: actionTypes.ALL_PROJECT_LIST_REQUESTED,
  client,
  useremail,
});
//#endregion

//#region [All project List Succeeded]
export type AllProjectListSucceededAction = {
  type: typeof actionTypes.ALL_PROJECT_LIST_SUCCEEDED;
  result: AllProjectListResponse;
};
export const allProjectListSucceeded = (result: AllProjectListResponse): AllProjectListSucceededAction => ({
  type: actionTypes.ALL_PROJECT_LIST_SUCCEEDED,
  result,
});
//#endregion

//#region [all project List Failed]
export type AllProjectListFailedAction = {
  type: typeof actionTypes.ALL_PROJECT_LIST_FAILED;
  error?: string;
};
export const allProjectListFailed = (error?: string): AllProjectListFailedAction => ({
  type: actionTypes.ALL_PROJECT_LIST_FAILED,
  error,
});
//#endregion

export const projectListReset = (): ProjectListResetAction => ({ type: actionTypes.PROJECT_LIST_RESET });
//#endregion

//#region [Selected Project]
export type SetProjectAction = {
  type: typeof actionTypes.SET_SELECTED_PROJECT;
  data: Project;
};

export const selectedProject = (data: Project): SetProjectAction => ({ type: actionTypes.SET_SELECTED_PROJECT, data });
//#endregion

//#region [Reset Data]
export type AssetInvestmentListResetAction = {
  type: typeof actionTypes.ASSET_INVESTMENT_LIST_RESET;
};
export const AssetInvestmentListReset = (): AssetInvestmentListResetAction => ({ type: actionTypes.ASSET_INVESTMENT_LIST_RESET });
//#endregion

//#region [Selected Project]
export type SetAssetInvestemntAction = {
  type: typeof actionTypes.SET_SELECTED_ASSET_INVESTMENT;
  data: AssetInvestmentType;
};

export const selectedAssetInvestment = (data: AssetInvestmentType): SetAssetInvestemntAction => ({ type: actionTypes.SET_SELECTED_ASSET_INVESTMENT, data });
//#endregion

export const PROJECT_NON_SERIALIZABLE = [];

//#start CustomerTaggedRMUsers Requested
export type CustomerTaggedRMUsersRequestType = {
  type: typeof actionTypes.CUSTOMER_TAGGED_RM_USER_REQUESTED;
  payload: CustomerTaggedRMUsersPayload;
};
export const CustomerTaggedRMUsersRequestAction = (payload: CustomerTaggedRMUsersPayload): CustomerTaggedRMUsersRequestType => ({
  type: actionTypes.CUSTOMER_TAGGED_RM_USER_REQUESTED,
  payload,
});
//#end

//#start [CustomerTaggedRMUsers Succeeded]
export type CustomerTaggedRMUsersSucceededType = {
  type: typeof actionTypes.CUSTOMER_TAGGED_RM_USER_SUCCEEDED;
  result: CustomerTaggedRMUsersResponse;
};
export const CustomerTaggedRMUsersSucceededAction = (result: CustomerTaggedRMUsersResponse): CustomerTaggedRMUsersSucceededType => ({
  type: actionTypes.CUSTOMER_TAGGED_RM_USER_SUCCEEDED,
  result,
});
//#end

//#start [CustomerTaggedRMUsers Failed]
export type CustomerTaggedRMUsersFailedType = {
  type: typeof actionTypes.CUSTOMER_TAGGED_RM_USER_FAILED;
  error?: string;
};
export const CustomerTaggedRMUsersFailedAction = (error?: string): CustomerTaggedRMUsersFailedType => ({
  type: actionTypes.CUSTOMER_TAGGED_RM_USER_FAILED,
  error,
});
//#end

//#start project update Requested
export type ProjectUpdateRequestType = {
  type: typeof actionTypes.PROJECT_UPDATE_REQUESTED;
  payload: updateREProjectPayload;
  onSuccessCallback?: (success: boolean) => void;
};
export const projectUpdateRequestAction = (payload: updateREProjectPayload, onSuccessCallback?: (success: boolean) => void): ProjectUpdateRequestType => ({
  type: actionTypes.PROJECT_UPDATE_REQUESTED,
  payload,
  onSuccessCallback,
});
//#end

//#start [project update Succeeded]
export type ProjectUpdateSucceededType = {
  type: typeof actionTypes.PROJECT_UPDATE_SUCCEEDED;
  result: ProjectUpdateResponse;
};
export const projectUpdateSucceededAction = (result: ProjectUpdateResponse): ProjectUpdateSucceededType => ({
  type: actionTypes.PROJECT_UPDATE_SUCCEEDED,
  result,
});
//#end

//#start [project update Failed]
export type ProjectUpdateFailedType = {
  type: typeof actionTypes.PROJECT_UPDATE_FAILED;
  error?: string;
};
export const projectUpdateFailedAction = (error?: string): ProjectUpdateFailedType => ({
  type: actionTypes.PROJECT_UPDATE_FAILED,
  error,
});
//#end

//#start [project update status Requested]
export type ProjectUpdateStatusRequestType = {
  type: typeof actionTypes.PROJECT_ENABLE_DISABLE_REQUESTED;
  payload: ProjectUpdateStatusPayload;
};
export const projectUpdateStatusRequestAction = (payload: ProjectUpdateStatusPayload): ProjectUpdateStatusRequestType => ({
  type: actionTypes.PROJECT_ENABLE_DISABLE_REQUESTED,
  payload,
});
//#end

//#start [project update Status Succeeded]
export type ProjectUpdateStatusSucceededType = {
  type: typeof actionTypes.PROJECT_ENABLE_DISABLE_SUCCEEDED;
  result: ProjectUpdateResponse;
};
export const projectUpdateStatusSucceededAction = (result: ProjectUpdateResponse): ProjectUpdateStatusSucceededType => ({
  type: actionTypes.PROJECT_ENABLE_DISABLE_SUCCEEDED,
  result,
});
//#end

//#start [project update Status Failed]
export type ProjectUpdateStatusFailedType = {
  type: typeof actionTypes.PROJECT_ENABLE_DISABLE_FAILED;
  error?: string;
};
export const projectUpdateStatusFailedAction = (error?: string): ProjectUpdateStatusFailedType => ({
  type: actionTypes.PROJECT_ENABLE_DISABLE_FAILED,
  error,
});
//#end

//#start [project logs Requested]
export type ProjectLogsRequestType = {
  type: typeof actionTypes.PROJECT_LOGS_LIST_REQUESTED;
  userEmail: string;
  assetId: number;
};
export const projectLogsRequestAction = (userEmail: string, assetId: number): ProjectLogsRequestType => ({
  type: actionTypes.PROJECT_LOGS_LIST_REQUESTED,
  userEmail,
  assetId,
});
//#end

//#start [project logs Succeeded]
export type ProjectLogsSucceededType = {
  type: typeof actionTypes.PROJECT_LOGS_LIST_SUCCEEDED;
  result: ProjectLogsListResponse;
};
export const projectLogsSucceededAction = (result: ProjectLogsListResponse): ProjectLogsSucceededType => ({
  type: actionTypes.PROJECT_LOGS_LIST_SUCCEEDED,
  result,
});
//#end

//#start [project logs Failed]
export type ProjectLogsFailedType = {
  type: typeof actionTypes.PROJECT_LOGS_LIST_FAILED;
  error?: string;
};
export const projectLogsFailedAction = (error?: string): ProjectLogsFailedType => ({
  type: actionTypes.PROJECT_LOGS_LIST_FAILED,
  error,
});
//#end

//#start [project assign user Requested]
export type ProjectAssignUserRequestType = {
  type: typeof actionTypes.PROJECT_ASSIGN_USER_REQUESTED;
  payload: ProjectAsignUserPayload;
  onSuccessCallback: (success: boolean) => void;
};
export const projectAssignUserRequestAction = (
  payload: ProjectAsignUserPayload,
  onSuccessCallback: (success: boolean) => void,
): ProjectAssignUserRequestType => ({
  type: actionTypes.PROJECT_ASSIGN_USER_REQUESTED,
  payload,
  onSuccessCallback,
});
//#end

//#start [project assign user Succeeded]
export type ProjectAssignUserSucceededType = {
  type: typeof actionTypes.PROJECT_ASSIGN_USER_SUCCEEDED;
  result: ProjectAssignUserResponse;
};
export const projectAssignUserSucceededAction = (result: ProjectAssignUserResponse): ProjectAssignUserSucceededType => ({
  type: actionTypes.PROJECT_ASSIGN_USER_SUCCEEDED,
  result,
});
//#end

//#start [project assign user Failed]
export type ProjectAssignUserFailedType = {
  type: typeof actionTypes.PROJECT_ASSIGN_USER_FAILED;
  error?: string;
};
export const projectAssignUserFailedAction = (error?: string): ProjectAssignUserFailedType => ({
  type: actionTypes.PROJECT_ASSIGN_USER_FAILED,
  error,
});
//#end

//#start [project access user list Requested]
export type GetUserProjectAccessRequestType = {
  type: typeof actionTypes.PROJECT_ACCESS_USER_LIST_REQUESTED;
  userEmail: string;
  assetId: number;
  userRole: string;
};
export const getUserProjectAccessRequestAction = (userEmail: string, assetId: number, userRole: string): GetUserProjectAccessRequestType => ({
  type: actionTypes.PROJECT_ACCESS_USER_LIST_REQUESTED,
  userEmail,
  assetId,
  userRole,
});
//#end

//#start [project access user list Succeeded]
export type GetUserProjectAccessSucceededType = {
  type: typeof actionTypes.PROJECT_ACCESS_USER_LIST_SUCCEEDED;
  result: ProjectUserAccessListResponse;
};
export const getUserProjectAccessSucceededAction = (result: ProjectUserAccessListResponse): GetUserProjectAccessSucceededType => ({
  type: actionTypes.PROJECT_ACCESS_USER_LIST_SUCCEEDED,
  result,
});
//#end

//#start [project access user list Failed]
export type GetUserProjectAccessFailedType = {
  type: typeof actionTypes.PROJECT_ACCESS_USER_LIST_FAILED;
  error?: string;
};
export const getUserProjectAccessFailedAction = (error?: string): GetUserProjectAccessFailedType => ({
  type: actionTypes.PROJECT_ACCESS_USER_LIST_FAILED,
  error,
});
//#end

//#start [project access user details Requested]
export type GetUserProjectAccessDetailsRequestType = {
  type: typeof actionTypes.PROJECT_ACCESS_USER_DETAILS_REQUESTED;
  userEmail: string;
  empCode: string;
  userRole: string;
  reassetId: number;
};
export const getUserProjectAccessDetailsRequestAction = (
  userEmail: string,
  empCode: string,
  userRole: string,
  reassetId: number,
): GetUserProjectAccessDetailsRequestType => ({
  type: actionTypes.PROJECT_ACCESS_USER_DETAILS_REQUESTED,
  userEmail,
  empCode,
  userRole,
  reassetId,
});
//#end

//#start [project access user Details Succeeded]
export type GetUserProjectAccessDetailsSucceededType = {
  type: typeof actionTypes.PROJECT_ACCESS_USER_DETAILS_SUCCEEDED;
  result: ProjectUserAccessDetailsResponse;
};
export const getUserProjectAccessDetailsSucceededAction = (result: ProjectUserAccessDetailsResponse): GetUserProjectAccessDetailsSucceededType => ({
  type: actionTypes.PROJECT_ACCESS_USER_DETAILS_SUCCEEDED,
  result,
});
//#end

//#start [project access user Details Failed]
export type GetUserProjectAccessDetailsFailedType = {
  type: typeof actionTypes.PROJECT_ACCESS_USER_DETAILS_FAILED;
  error?: string;
};
export const getUserProjectAccessDetailsFailedAction = (error?: string): GetUserProjectAccessDetailsFailedType => ({
  type: actionTypes.PROJECT_ACCESS_USER_DETAILS_FAILED,
  error,
});
//#end

//#start [removeUserProjectAccess Requested]
export type RemoveUserProjectAccessRequestType = {
  type: typeof actionTypes.REMOVE_PROJECT_USER_ACCESS_REQUESTED;
  payload: RemoveUserProjectAccessPayload;
};
export const RemoveUserProjectAccessRequestAction = (payload: RemoveUserProjectAccessPayload): RemoveUserProjectAccessRequestType => ({
  type: actionTypes.REMOVE_PROJECT_USER_ACCESS_REQUESTED,
  payload,
});
//#end

//#start [removeUserProjectAccess Succeeded]
export type RemoveUserProjectAccessSucceededType = {
  type: typeof actionTypes.REMOVE_PROJECT_USER_ACCESS_SUCCEEDED;
  result: RemoveUserProjectAccessResponse;
};
export const RemoveUserProjectAccessSucceededAction = (result: RemoveUserProjectAccessResponse): RemoveUserProjectAccessSucceededType => ({
  type: actionTypes.REMOVE_PROJECT_USER_ACCESS_SUCCEEDED,
  result,
});
//#end

//#start [removeUserProjectAccess Failed]
export type RemoveUserProjectAccessFailedType = {
  type: typeof actionTypes.REMOVE_PROJECT_USER_ACCESS_FAILED;
  error?: string;
};
export const RemoveUserProjectAccessFailedAction = (error?: string): RemoveUserProjectAccessFailedType => ({
  type: actionTypes.REMOVE_PROJECT_USER_ACCESS_FAILED,
  error,
});
//#end

//#start [getRoleTemplateName Requested]
export type RoleTemplateNameListRequestType = {
  type: typeof actionTypes.ROLE_TEMPLATE_NAME_LIST_REQUESTED;
};
export const roleTemplateNameListRequestAction = (): RoleTemplateNameListRequestType => ({
  type: actionTypes.ROLE_TEMPLATE_NAME_LIST_REQUESTED,
});
//#end

//#start [getRoleTemplateName Succeeded]
export type RoleTemplateNameListSucceededType = {
  type: typeof actionTypes.ROLE_TEMPLATE_NAME_LIST_SUCCEEDED;
  result: RoleTemplateNameListResponse;
};
export const roleTemplateNameListSucceededAction = (result: RoleTemplateNameListResponse): RoleTemplateNameListSucceededType => ({
  type: actionTypes.ROLE_TEMPLATE_NAME_LIST_SUCCEEDED,
  result,
});
//#end

//#start [getRoleTemplateName Failed]
export type RoleTemplateNameListFailedType = {
  type: typeof actionTypes.ROLE_TEMPLATE_NAME_LIST_FAILED;
  error?: string;
};
export const roleTemplateNameListFailedAction = (error?: string): RoleTemplateNameListFailedType => ({
  type: actionTypes.ROLE_TEMPLATE_NAME_LIST_FAILED,
  error,
});
//#end

//#start [getRoleTemplateName Requested]
export type UserByRoleListRequestType = {
  type: typeof actionTypes.USER_BY_ROLE_LIST_REQUESTED;
  roleType: string;
  createdBy: string;
  developerId: number;
};

export const userByRoleListRequestAction = (roleType: string, createdBy: string, developerId: number): UserByRoleListRequestType => ({
  type: actionTypes.USER_BY_ROLE_LIST_REQUESTED,
  roleType,
  createdBy,
  developerId,
});
//#end

//#start [getUserByRole Succeeded]
export type UserByRoleListSucceededType = {
  type: typeof actionTypes.USER_BY_ROLE_LIST_SUCCEEDED;
  result: UserByRoleListResponse;
};
export const userByRoleListSucceededAction = (result: UserByRoleListResponse): UserByRoleListSucceededType => ({
  type: actionTypes.USER_BY_ROLE_LIST_SUCCEEDED,
  result,
});
//#end

//#start [getUserByRole Failed]
export type UserByRoleListFailedType = {
  type: typeof actionTypes.USER_BY_ROLE_LIST_FAILED;
  error?: string;
};
export const userByRoleListFailedAction = (error?: string): UserByRoleListFailedType => ({
  type: actionTypes.USER_BY_ROLE_LIST_FAILED,
  error,
});
//#end

//---------------------------------------Add project  -------------------------------------

// start create project
export interface CreateProjectRequestAction {
  type: typeof actionTypes.CREATE_PROJECT_REQUEST;
  payload: CreateProjectPayloadType;
  onSuccessCallback: (success: boolean) => void;
}

export const createProjectRequest = (payload: CreateProjectPayloadType, onSuccessCallback: (success: boolean) => void): CreateProjectRequestAction => ({
  type: actionTypes.CREATE_PROJECT_REQUEST,
  payload,
  onSuccessCallback,
});
export interface CreateProjectSuccessAction {
  type: typeof actionTypes.CREATE_PROJECT_SUCCESS;
  data: CreateProjectPayloadType;
}

export const createProjectSuccess = (data: any): CreateProjectSuccessAction => ({
  type: actionTypes.CREATE_PROJECT_SUCCESS,
  data,
});

export interface CreateProjectFailureAction {
  type: typeof actionTypes.CREATE_PROJECT_FAILURE;
}

export const createProjectFailure = (): CreateProjectFailureAction => ({
  type: actionTypes.CREATE_PROJECT_FAILURE,
});

// end create project

//====================================== Get Project Users List ======================================

export type ProjectUsersListRequestAction = {
  type: typeof actionTypes.GET_USERS_FOR_PROJECT_REQUESTED;
  developerId: number;
  createdBy: string;
};

export const projectUsersListRequest = (developerId: number, createdBy: string): ProjectUsersListRequestAction => ({
  type: actionTypes.GET_USERS_FOR_PROJECT_REQUESTED,
  developerId,
  createdBy,
});

export type ProjectUsersListSuccessAction = {
  type: typeof actionTypes.GET_USERS_FOR_PROJECT_SUCCEEDED;
  data: any;
};

export const projectUsersListSuccess = (data: any): ProjectUsersListSuccessAction => ({
  type: actionTypes.GET_USERS_FOR_PROJECT_SUCCEEDED,
  data,
});

export type ProjectUsersListFailureAction = {
  type: typeof actionTypes.GET_USERS_FOR_PROJECT_FAILED;
};

export const projectUsersListFailure = (): ProjectUsersListFailureAction => ({
  type: actionTypes.GET_USERS_FOR_PROJECT_FAILED,
});

// [NOC Project Summary]
export type DownloadNOCProjectSummaryRequested = {
  type: typeof actionTypes.DOWNLOAD_NOC_PROJECT_SUMMARY_REQUESTED;
  projectId: number;
  REAssetId: number;
  projectName: string;
  onSuccessCallback?: (success: boolean) => void;
};

export const downloadNOCProjectSummaryRequest = (
  projectId: number,
  REAssetId: number,
  projectName: string,
  onSuccessCallback?: (success: boolean) => void,
): DownloadNOCProjectSummaryRequested => ({
  type: actionTypes.DOWNLOAD_NOC_PROJECT_SUMMARY_REQUESTED,
  projectId,
  REAssetId,
  projectName,
  onSuccessCallback,
});

export type DownloadNOCProjectSummarySuccessful = {
  type: typeof actionTypes.DOWNLOAD_NOC_PROJECT_SUMMARY_SUCCESSFUL;
  data: any;
};

export const downloadNOCProjectSummarySuccessful = (data: any): DownloadNOCProjectSummarySuccessful => ({
  type: actionTypes.DOWNLOAD_NOC_PROJECT_SUMMARY_SUCCESSFUL,
  data,
});

export type DownloadNOCProjectSummaryFailed = {
  type: typeof actionTypes.DOWNLOAD_NOC_PROJECT_SUMMARY_FAILED;
};

export const downloadNOCProjectSummaryFailed = (): DownloadNOCProjectSummaryFailed => ({
  type: actionTypes.DOWNLOAD_NOC_PROJECT_SUMMARY_FAILED,
});
// end download project summary


// [Asset Investment list Search]
export type GetAssetInvestmentRequested = {
  type: typeof actionTypes.GET_ASSET_INVESTMENT_LIST_REQUESTED;
  ClientId: number;
  useremail: string;
  onSuccessCallback?: (success: boolean) => void;
};

export const getAssetInvestmentRequest = (
  ClientId: number,
  useremail: string,
  onSuccessCallback?: (success: boolean) => void,
): GetAssetInvestmentRequested => ({
  type: actionTypes.GET_ASSET_INVESTMENT_LIST_REQUESTED,
  ClientId,
  useremail,
  onSuccessCallback,
});

export type GetAssetInvestmentSuccessful = {
  type: typeof actionTypes.GET_ASSET_INVESTMENT_LIST_SUCCESSFUL;
  data: any;
};

export const getAssetInvestmentSuccessful = (data: any): GetAssetInvestmentSuccessful => ({
  type: actionTypes.GET_ASSET_INVESTMENT_LIST_SUCCESSFUL,
  data,
});

export type GetAssetInvestmentFailed = {
  type: typeof actionTypes.GET_ASSET_INVESTMENT_LIST_FAILED;
};

export const GetAssetInvestmentFailed = (): GetAssetInvestmentFailed => ({
  type: actionTypes.GET_ASSET_INVESTMENT_LIST_FAILED,
});
// end download project summary

export type ProjectActions =
  // List
  | ProjectListRequestedAction
  | ProjectListSucceededAction
  | ProjectListFailedAction
  | AllProjectListRequestedAction
  | AllProjectListSucceededAction
  | AllProjectListFailedAction
  | ProjectListResetAction
  | SetProjectAction
  | CustomerTaggedRMUsersRequestType
  | CustomerTaggedRMUsersSucceededType
  | CustomerTaggedRMUsersFailedType
  | ProjectUpdateRequestType
  | ProjectUpdateSucceededType
  | ProjectUpdateFailedType
  | ProjectUpdateStatusRequestType
  | ProjectUpdateStatusSucceededType
  | ProjectUpdateStatusFailedType
  | ProjectLogsRequestType
  | ProjectLogsSucceededType
  | ProjectLogsFailedType
  | ProjectAssignUserRequestType
  | ProjectAssignUserSucceededType
  | ProjectAssignUserFailedType
  | GetUserProjectAccessRequestType
  | GetUserProjectAccessSucceededType
  | GetUserProjectAccessFailedType
  | GetUserProjectAccessDetailsRequestType
  | GetUserProjectAccessDetailsSucceededType
  | GetUserProjectAccessDetailsFailedType
  | RemoveUserProjectAccessRequestType
  | RemoveUserProjectAccessSucceededType
  | RemoveUserProjectAccessFailedType
  | RoleTemplateNameListRequestType
  | RoleTemplateNameListSucceededType
  | RoleTemplateNameListFailedType
  | UserByRoleListRequestType
  | UserByRoleListSucceededType
  | UserByRoleListFailedType
  | CreateProjectRequestAction
  | CreateProjectSuccessAction
  | CreateProjectFailureAction
  | DownloadNOCProjectSummaryRequested
  | DownloadNOCProjectSummarySuccessful
  | DownloadNOCProjectSummaryFailed
  | ProjectUsersListRequestAction
  | ProjectUsersListSuccessAction
  | ProjectUsersListFailureAction
  | GetAssetInvestmentFailed
  | GetAssetInvestmentRequested
  | GetAssetInvestmentSuccessful
  | AssetInvestmentListResetAction
  | SetAssetInvestemntAction;
