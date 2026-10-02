import { ResponseCodeType } from "../Datatype";
import { NOCSetupAccountTypeApiResponse, NOCSetupProjectDetailsApiResponse, NocSetupProjectPayload, NocProjectEntitiesApiResponse, NocProjectEntityUsersApiResponse,NocWorkflowDetailsApiResponse, GetLenderByClientApiResponse, GetDebentureByClientApiResponse, GetDeveloperByClientApiResponse, GetPMCByClientApiResponse, GetEntityUserApiResponse,UploadSetupNOCResponse, UploadSetupNocPayload } from "./datatype";
import { NocSetupActionType } from "./types";

export type NocSetupThresholdRequestType = {
  type: NocSetupActionType.GET_THRESHOLD_TYPE_REQUESTED;
};

export const getThresholdTypeAction = (): NocSetupThresholdRequestType => ({
  type: NocSetupActionType.GET_THRESHOLD_TYPE_REQUESTED,
});

export type NocSetupPeriodRequestType = {
  type: NocSetupActionType.GET_PERIOD_REQUESTED;
};

export const getPeriodAction = (): NocSetupPeriodRequestType => ({
  type: NocSetupActionType.GET_PERIOD_REQUESTED,
});

export type NocSetupProjectTypeRequestType = {
  type: NocSetupActionType.GET_PROJECT_TYPE_REQUESTED;
};

export const getProjectTypeAction = (): NocSetupProjectTypeRequestType => ({
  type: NocSetupActionType.GET_PROJECT_TYPE_REQUESTED,
});

export type NocSetupReraDetailsRequestType = {
  type: NocSetupActionType.GET_RERA_NO_REQUESTED;
  reAssetId: number;
  towers: string;
};

export const getReraDetailsAction = (reAssetId: number, towers: string): NocSetupReraDetailsRequestType => ({
  type: NocSetupActionType.GET_RERA_NO_REQUESTED,
  reAssetId,
  towers,
});

export type NocSetupREProjectTowersRequestType = {
  type: NocSetupActionType.GET_PROJECT_TOWERS_REQUESTED;
  reassetId: number;
};

export const getREProjectTowersAction = (reassetId: number): NocSetupREProjectTowersRequestType => ({
  type: NocSetupActionType.GET_PROJECT_TOWERS_REQUESTED,
  reassetId,
});

// type for project price header request
export type NocSetupProjectPriceHeadersRequestType = {
  type: typeof NocSetupActionType.GET_PROJECT_PRICE_HEADERS_REQUESTED;
  nocProjectId: number;
  reassetId: number;
};

// request action for project price headers
export const getProjectPriceHeadersAction = (nocProjectId: number, reassetId: number): NocSetupProjectPriceHeadersRequestType => ({
  type: NocSetupActionType.GET_PROJECT_PRICE_HEADERS_REQUESTED,
  nocProjectId,
  reassetId,
});

// type for account details request
export type NocSetupAccountDetailsRequestType = {
  type: typeof NocSetupActionType.GET_ACCOUNT_DETAILS_REQUESTED;
  nocProjectId: number;
};

// request action for account details
export const getAccountDetailsAction = (nocProjectId: number): NocSetupAccountDetailsRequestType => ({
  type: NocSetupActionType.GET_ACCOUNT_DETAILS_REQUESTED,
  nocProjectId,
});

// type for account details failed
export type NocSetupAccountDetailsFailedType = {
  type: typeof NocSetupActionType.GET_ACCOUNT_DETAILS_FAILED;
};

// request action for account details
export const getAccountDetailsFailedAction = (): NocSetupAccountDetailsFailedType => ({
  type: NocSetupActionType.GET_ACCOUNT_DETAILS_FAILED,
});

//#start [ workflow request]
export type NocSetupWorkFlowRequestType = {
  type: NocSetupActionType.GET_SETUP_WORKFLOW_REQUESTED;
};

export const getNOCSetupWorkFlowAction = (): NocSetupWorkFlowRequestType => ({
  type: NocSetupActionType.GET_SETUP_WORKFLOW_REQUESTED,
});
//#end

//#start [ view user request]
export type NocSetupViewUserDetailsRequestType = {
  type: typeof NocSetupActionType.GET_VIEW_USER_DETAILS_REQUESTED;
  reassetId: number;
  roleName: string;
};

export const getViewUserDetailsAction = (reassetId: number, roleName: string): NocSetupViewUserDetailsRequestType => ({
  type: NocSetupActionType.GET_VIEW_USER_DETAILS_REQUESTED,
  reassetId,
  roleName,
});
//#end

//#start [view user failed or reset]
export type resetViewUserDetailsType = {
  type: NocSetupActionType.GET_VIEW_USER_DETAILS_FAILED;
};

export const resetViewUserDetailsAction = (): resetViewUserDetailsType => ({
  type: NocSetupActionType.GET_VIEW_USER_DETAILS_FAILED,
});
//#end

//#start [save noc setup project request]
export type NocSetupProjectRequestType = {
  type: NocSetupActionType.SETUP_NOC_PROJECT_REQUESTED;
  payload: NocSetupProjectPayload;
  callBack?: (success: boolean) => void;
};

export const setupNocProjectRequestAction = (payload: NocSetupProjectPayload, callBack?: (success: boolean) => void): NocSetupProjectRequestType => ({
  type: NocSetupActionType.SETUP_NOC_PROJECT_REQUESTED,
  payload,
  callBack,
});
//#end

//#start [save noc setup success]
export type NocSetupProjectSuccessType = {
  type: NocSetupActionType.SETUP_NOC_PROJECT_SUCCESS;
  result: ResponseCodeType | Response;
};
export const setupNocProjectAction = (result: ResponseCodeType | Response): NocSetupProjectSuccessType => ({
  type: NocSetupActionType.SETUP_NOC_PROJECT_SUCCESS,
  result,
});
//#end

//#start [ save noc setup failed]
export type NocSetupProjectFailedType = {
  type: NocSetupActionType.SETUP_NOC_PROJECT_FAILED;
  result: ResponseCodeType | undefined;
};
export const setupNocProjectFailedAction = (result: ResponseCodeType | undefined): NocSetupProjectFailedType => ({
  type: NocSetupActionType.SETUP_NOC_PROJECT_FAILED,
  result,
});
//#end

//#start [ get Accout type request]
export type NocAccountTypeRequestType = {
  type: NocSetupActionType.GET_ACCOUNT_TYPE_REQUESTED;
};
export const NOCAccountTypeRequestAction = (): NocAccountTypeRequestType => ({
  type: NocSetupActionType.GET_ACCOUNT_TYPE_REQUESTED,
});
//#end

//#start [ get Accout type success]
export type NocAccountTypeSuccessType = {
  type: NocSetupActionType.GET_ACCOUNT_TYPE_SUCCESS;
  result: NOCSetupAccountTypeApiResponse;
};
export const NOCAccountTypeSuccessAction = (result: NOCSetupAccountTypeApiResponse): NocAccountTypeSuccessType => ({
  type: NocSetupActionType.GET_ACCOUNT_TYPE_SUCCESS,
  result,
});
//#end

//#start [ get Accout type failed]
export type NocAccountTypeFailedType = {
  type: NocSetupActionType.GET_ACCOUNT_TYPE_FAILED;
};
export const NOCAccountTypeFailedAction = (): NocAccountTypeFailedType => ({
  type: NocSetupActionType.GET_ACCOUNT_TYPE_FAILED,
});
//#end

//#start [ get noc project details request]
export type NocProjectDetailsRequestType = {
  type: NocSetupActionType.GET_NOC_PROJECT_DETAILS_REQUESTED;
  NocProjectId: number;
};
export const NOCProjectDetailsRequestAction = (NocProjectId: number): NocProjectDetailsRequestType => ({
  type: NocSetupActionType.GET_NOC_PROJECT_DETAILS_REQUESTED,
  NocProjectId,
});
//#end

//#start [ get noc project details success]
export type NocProjectDetailsSuccessType = {
  type: NocSetupActionType.GET_NOC_PROJECT_DETAILS_SUCCESS;
  result: NOCSetupProjectDetailsApiResponse;
};
export const NOCProjectDetailsSuccessAction = (result: NOCSetupProjectDetailsApiResponse): NocProjectDetailsSuccessType => ({
  type: NocSetupActionType.GET_NOC_PROJECT_DETAILS_SUCCESS,
  result,
});
//#end

//#start [ get noc project details failed]
export type NocProjectDetailsFailedType = {
  type: NocSetupActionType.GET_NOC_PROJECT_DETAILS_FAILED;
};
export const NOCProjectDetailsFailedAction = (): NocProjectDetailsFailedType => ({
  type: NocSetupActionType.GET_NOC_PROJECT_DETAILS_FAILED,
});
//#end


//#start [ get noc project Entities request]
export type NocProjectEntitiesRequestType = {
  type: NocSetupActionType.GET_NOC_PROJECT_ENTITIES_REQUESTED;
  NocProjectId: number;
  email:string| undefined;
};
export const NOCProjectEntitiesRequestAction = (NocProjectId: number,email:string|undefined): NocProjectEntitiesRequestType => ({
  type: NocSetupActionType.GET_NOC_PROJECT_ENTITIES_REQUESTED,
  NocProjectId,
  email
});
//#end

//#start [ get noc project Entities success]
export type NocProjectEntitiesSuccessType = {
  type: NocSetupActionType.GET_NOC_PROJECT_ENTITIES_SUCCESS;
  result: NocProjectEntitiesApiResponse;
};
export const NOCProjectEntitiesSuccessAction = (result: NocProjectEntitiesApiResponse): NocProjectEntitiesSuccessType => ({
  type: NocSetupActionType.GET_NOC_PROJECT_ENTITIES_SUCCESS,
  result,
});
//#end

//#start [ get noc project Entities failed]
export type NocProjectEntitiesFailedType = {
  type: NocSetupActionType.GET_NOC_PROJECT_ENTITIES_FAILED;
};
export const NOCProjectEntitiesFailedAction = (): NocProjectEntitiesFailedType => ({
  type: NocSetupActionType.GET_NOC_PROJECT_ENTITIES_FAILED,
});
//#end




//#start [ get noc project EntityUsers request]
export type NocProjectEntityUsersRequestType = {
  type: NocSetupActionType.GET_NOC_PROJECT_ENTITY_USERS_REQUESTED;
  NocProjectId: number;
  email:string| undefined;
};
export const NOCProjectEntityUsersRequestAction = (NocProjectId: number,email:string|undefined): NocProjectEntityUsersRequestType => ({
  type: NocSetupActionType.GET_NOC_PROJECT_ENTITY_USERS_REQUESTED,
  NocProjectId,
  email
});
//#end

//#start [ get noc project EntityUsers success]
export type NocProjectEntityUsersSuccessType = {
  type: NocSetupActionType.GET_NOC_PROJECT_ENTITY_USERS_SUCCESS;
  result: NocProjectEntityUsersApiResponse;
};
export const NOCProjectEntityUsersSuccessAction = (result: NocProjectEntityUsersApiResponse): NocProjectEntityUsersSuccessType => ({
  type: NocSetupActionType.GET_NOC_PROJECT_ENTITY_USERS_SUCCESS,
  result,
});
//#end

//#start [ get noc project EntityUsers failed]
export type NocProjectEntityUsersFailedType = {
  type: NocSetupActionType.GET_NOC_PROJECT_ENTITY_USERS_FAILED;
};
export const NOCProjectEntityUsersFailedAction = (): NocProjectEntityUsersFailedType => ({
  type: NocSetupActionType.GET_NOC_PROJECT_ENTITY_USERS_FAILED,
});
//#end



//#start [ get noc project EntityUsers request]
export type NocWorkflowDetailsRequestType = {
  type: NocSetupActionType.GET_NOC_WORKFLOW_DETAILS_REQUESTED;
  NocProjectId: number;
};
export const NOCWorkflowDetailsRequestAction = (NocProjectId: number): NocWorkflowDetailsRequestType => ({
  type: NocSetupActionType.GET_NOC_WORKFLOW_DETAILS_REQUESTED,
  NocProjectId,
});
//#end

//#start [ get noc project EntityUsers success]
export type NocWorkflowDetailsSuccessType = {
  type: NocSetupActionType.GET_NOC_WORKFLOW_DETAILS_SUCCESS;
  result: NocWorkflowDetailsApiResponse;
};
export const NOCWorkflowDetailsSuccessAction = (result: NocWorkflowDetailsApiResponse): NocWorkflowDetailsSuccessType => ({
  type: NocSetupActionType.GET_NOC_WORKFLOW_DETAILS_SUCCESS,
  result,
});
//#end

//#start [ get noc project EntityUsers failed]
export type NocWorkflowDetailsFailedType = {
  type: NocSetupActionType.GET_NOC_WORKFLOW_DETAILS_FAILED;
};
export const NOCWorkflowDetailsFailedAction = (): NocWorkflowDetailsFailedType => ({
  type: NocSetupActionType.GET_NOC_WORKFLOW_DETAILS_FAILED,
});
//#end


//#start [ get noc lender by client request]
export type GetLenderByClientRequestType = {
  type: NocSetupActionType.GET_NOC_LENDER_BY_CLIENT_REQUESTED;
  NocProjectId: number;
};
export const GetLenderByClientRequestAction = (NocProjectId: number): GetLenderByClientRequestType => ({
  type: NocSetupActionType.GET_NOC_LENDER_BY_CLIENT_REQUESTED,
  NocProjectId,
});
//#end

//#start [ get noc project EntityUsers success]
export type GetLenderByClientSuccessType = {
  type: NocSetupActionType.GET_NOC_LENDER_BY_CLIENT_SUCCESS;
  result: GetLenderByClientApiResponse;
};
export const GetLenderByClientSuccessAction = (result: GetLenderByClientApiResponse): GetLenderByClientSuccessType => ({
  type: NocSetupActionType.GET_NOC_LENDER_BY_CLIENT_SUCCESS,
  result,
});
//#end

//#start [ get noc project EntityUsers failed]
export type GetLenderByClientFailedType = {
  type: NocSetupActionType.GET_NOC_LENDER_BY_CLIENT_FAILED;
};
export const GetLenderByClientFailedAction = (): GetLenderByClientFailedType => ({
  type: NocSetupActionType.GET_NOC_LENDER_BY_CLIENT_FAILED,
});
//#end



//#start [ get noc Debenture By client request]
export type GetDebentureByClientRequestType = {
  type: NocSetupActionType.GET_NOC_DEBENTURE_BY_CLIENT_REQUESTED;
  NocProjectId: number;
};
export const GetDebentureByClientRequestAction = (NocProjectId: number): GetDebentureByClientRequestType => ({
  type: NocSetupActionType.GET_NOC_DEBENTURE_BY_CLIENT_REQUESTED,
  NocProjectId,
});
//#end

//#start [ get noc project EntityUsers success]
export type GetDebentureByClientSuccessType = {
  type: NocSetupActionType.GET_NOC_DEBENTURE_BY_CLIENT_SUCCESS;
  result: GetDebentureByClientApiResponse;
};
export const GetDebentureByClientSuccessAction = (result: GetDebentureByClientApiResponse): GetDebentureByClientSuccessType => ({
  type: NocSetupActionType.GET_NOC_DEBENTURE_BY_CLIENT_SUCCESS,
  result,
});
//#end

//#start [ get noc project EntityUsers failed]
export type GetDebentureByClientFailedType = {
  type: NocSetupActionType.GET_NOC_DEBENTURE_BY_CLIENT_FAILED;
};
export const GetDebentureByClientFailedAction = (): GetDebentureByClientFailedType => ({
  type: NocSetupActionType.GET_NOC_DEBENTURE_BY_CLIENT_FAILED,
});
//#end



//#start [ get noc project EntityUsers request]
export type GetDeveloperByClientRequestType = {
  type: NocSetupActionType.GET_NOC_DEVELOPER_BY_CLIENT_REQUESTED;
  NocProjectId: number;
};
export const GetDeveloperByClientRequestAction = (NocProjectId: number): GetDeveloperByClientRequestType => ({
  type: NocSetupActionType.GET_NOC_DEVELOPER_BY_CLIENT_REQUESTED,
  NocProjectId,
});
//#end

//#start [ get noc project EntityUsers success]
export type GetDeveloperByClientSuccessType = {
  type: NocSetupActionType.GET_NOC_DEVELOPER_BY_CLIENT_SUCCESS;
  result: GetDeveloperByClientApiResponse;
};
export const GetDeveloperByClientSuccessAction = (result: GetDeveloperByClientApiResponse): GetDeveloperByClientSuccessType => ({
  type: NocSetupActionType.GET_NOC_DEVELOPER_BY_CLIENT_SUCCESS,
  result,
});
//#end

//#start [ get noc project EntityUsers failed]
export type GetDeveloperByClientFailedType = {
  type: NocSetupActionType.GET_NOC_DEVELOPER_BY_CLIENT_FAILED;
};
export const GetDeveloperByClientFailedAction = (): GetDeveloperByClientFailedType => ({
  type: NocSetupActionType.GET_NOC_DEVELOPER_BY_CLIENT_FAILED,
});
//#end



//#start [ get noc project EntityUsers request]
export type GetPMCByClientRequestType = {
  type: NocSetupActionType.GET_NOC_PMC_BY_CLIENT_REQUESTED;
  NocProjectId: number;
};
export const GetPMCByClientRequestAction = (NocProjectId: number): GetPMCByClientRequestType => ({
  type: NocSetupActionType.GET_NOC_PMC_BY_CLIENT_REQUESTED,
  NocProjectId,
});
//#end

//#start [ get noc project EntityUsers success]
export type GetPMCByClientSuccessType = {
  type: NocSetupActionType.GET_NOC_PMC_BY_CLIENT_SUCCESS;
  result: GetPMCByClientApiResponse;
};
export const GetPMCByClientSuccessAction = (result: GetPMCByClientApiResponse): GetPMCByClientSuccessType => ({
  type: NocSetupActionType.GET_NOC_PMC_BY_CLIENT_SUCCESS,
  result,
});
//#end

//#start [ get noc project EntityUsers failed]
export type GetPMCByClientFailedType = {
  type: NocSetupActionType.GET_NOC_PMC_BY_CLIENT_FAILED;
};
export const GetPMCByClientFailedAction = (): GetPMCByClientFailedType => ({
  type: NocSetupActionType.GET_NOC_PMC_BY_CLIENT_FAILED,
});
//#end


//#start [ get  EntityUsers request]
export type GetEntityUserRequestType = {
  type: NocSetupActionType.GET_ENTITY_USER_REQUESTED;
  entityId: number;
  entityType:number
};
export const GetEntityUserRequestAction = (entityId: number,entityType:number): GetEntityUserRequestType => ({
  type: NocSetupActionType.GET_ENTITY_USER_REQUESTED,
  entityId,
  entityType,
});
//#end

//#start [ get noc project EntityUsers success]
export type GetEntityUserSuccessType = {
  type: NocSetupActionType.GET_ENTITY_USER_SUCCESS;
  result: GetEntityUserApiResponse;
};
export const GetEntityUserSuccessAction = (result: GetEntityUserApiResponse): GetEntityUserSuccessType => ({
  type: NocSetupActionType.GET_ENTITY_USER_SUCCESS,
  result,
});
//#end

//#start [ get noc project EntityUsers failed]
export type GetEntityUserFailedType = {
  type: NocSetupActionType.GET_ENTITY_USER_FAILED;
};
export const GetEntityUserFailedAction = (): GetEntityUserFailedType => ({
  type: NocSetupActionType.GET_ENTITY_USER_FAILED,
});
//#end




//#start [   Noc Setup Update request]
export type NocSetupUpdateRequestType = {
  type: NocSetupActionType.NOC_SETUP_UPDATE_REQUESTED;
  payload: UploadSetupNocPayload;
  callBack?: (success: boolean) => void;
};
export const NocSetupUpdateRequestAction = (payload :UploadSetupNocPayload,callBack?: (success: boolean, message?: string) => void,): NocSetupUpdateRequestType => ({
  type: NocSetupActionType.NOC_SETUP_UPDATE_REQUESTED,
  payload,
  callBack,
});
//#end

//#start [ get noc project EntityUsers success]
export type NocSetupUpdateSuccessType = {
  type: NocSetupActionType.NOC_SETUP_UPDATE_SUCCESS;
  result: UploadSetupNOCResponse;
};
export const NocSetupUpdateSuccessAction = (result: UploadSetupNOCResponse): NocSetupUpdateSuccessType => ({
  type: NocSetupActionType.NOC_SETUP_UPDATE_SUCCESS,
  result,
});
//#end

//#start [ get noc project EntityUsers failed]
export type NocSetupUpdateFailedType = {
  type: NocSetupActionType.NOC_SETUP_UPDATE_FAILED;
};
export const NocSetupUpdateFailedAction = (): NocSetupUpdateFailedType => ({
  type: NocSetupActionType.NOC_SETUP_UPDATE_FAILED,
});
//#end

// type ActionType =
//   | NocSetupViewUserDetailsRequestType
//   | NocSetupReraDetailsRequestType
//   | NocSetupREProjectTowersRequestType
//   | NocSetupAccountDetailsRequestType
//   | NocSetupProjectPriceHeadersRequestType;
