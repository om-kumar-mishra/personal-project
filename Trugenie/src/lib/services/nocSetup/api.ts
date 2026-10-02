import { NOC_DASHBOARD_ENDPOINT, getData, postData,API_ENDPOINT_MAIN, postDataMultipart } from "../../api/commons";
import {
  NOCSetupAccountTypeApiResponse,
  NOCSetupProjectDetailsApiResponse,
  NOCSetupWorkFlowApiResponse,
  NOCViewUserDetailApiResponse,
  NocAccountDetailsApiResponse,
  NocPeriodApiResponse,
  NocPriceHeadersApiResponse,
  NocProjectTowerApiResponse,
  NocSetupProjectApiResponse,
  NocSetupProjectPayload,
  NocThresholdTypeApiResponse,
  NocProjectEntitiesApiResponse,
  NocProjectEntityUsersApiResponse,
  NocWorkflowDetailsApiResponse,
  GetEntityUserApiResponse,
  UploadSetupNocPayload,
  UploadSetupNOCResponse
} from "./datatype";

export const getThresholdType = async (token: string): Promise<NocThresholdTypeApiResponse | null> => {
  try {
    const url = `${NOC_DASHBOARD_ENDPOINT}/getThresholdType`;
    const res = await getData(url, token);
    return res;
  } catch (error) {
    console.log(error);
    return null
  }
};

export const getPeriod = async (token: string): Promise<NocPeriodApiResponse | null> => {
  try {
    const url = `${NOC_DASHBOARD_ENDPOINT}/getPeriod`;
    const res = await getData(url, token);
    return res;
  } catch (error) {
    console.log(error);
    return null
  }
};

export const getProjectType = async (token: string): Promise<NocThresholdTypeApiResponse | null> => {
  try {
    const url = `${NOC_DASHBOARD_ENDPOINT}/getProjectType`;
    const res = await getData(url, token);
    return res;
  } catch (error) {
    console.log(error);
    return null
  }
};

export const getReraDetails = async (token: string, reAssetId: number, towers: string): Promise<NocThresholdTypeApiResponse | null> => {
  try {
    const url = `${NOC_DASHBOARD_ENDPOINT}/getReraDetails?reAssetId=${reAssetId}&towers=${towers}`;
    const res = await getData(url, token);
    return res;
  } catch (error) {
    console.log(error);
    return null
  }
};

export const getREProjectTowers = async (token: string, reassetId: number): Promise<NocProjectTowerApiResponse | null> => {
  try {
    const url = `${NOC_DASHBOARD_ENDPOINT}/getREProjectTowers?reassetId=${reassetId}`;
    const res = await getData(url, token);
    return res;
  } catch (error) {
    console.log(error);
    return null
  }
};

export const getProjectPriceHeaders = async (token: string, nocProjectId: number, reassetId: number): Promise<NocPriceHeadersApiResponse | null> => {
  try {
    const url = `${NOC_DASHBOARD_ENDPOINT}/getProjectPriceHeaders?nocProjectId=${nocProjectId}&reassetId=${reassetId}`;
    const res = await getData(url, token);
    return res;
  } catch (error) {
    console.log(error);
    return null
  }
};

export const getAccountDetails = async (token: string, nocProjectId: number): Promise<NocAccountDetailsApiResponse | null> => {
  try {
    const url = `${NOC_DASHBOARD_ENDPOINT}/getAccountDetails?nocProjectId=${nocProjectId}`;
    const res = await getData(url, token);
    return res;
  } catch (error) {
    console.log(error);
    return null
  }
};

export const getNOCSetupWorkFlow = async (token: string): Promise<NOCSetupWorkFlowApiResponse | null> => {
  try {
    const url = `${NOC_DASHBOARD_ENDPOINT}/getNOCSetupWorkFlow`;
    const res = await getData(url, token);
    return res;
  } catch (error) {
    console.log(error);
    return null
  }
};

export const getViewUserDetails = async (token: string, reassetId: number, roleName: string): Promise<NOCViewUserDetailApiResponse | null> => {
  try {
    const url = `${NOC_DASHBOARD_ENDPOINT}/getViewUserDetails?reassetId=${reassetId}&roleName=${roleName}`;
    const res = await getData(url, token);
    return res;
  } catch (error) {
    console.log(error);
    return null
  }
};

export const setupNocProject = async (token: string, payload: NocSetupProjectPayload): Promise<NocSetupProjectApiResponse | null> => {
  try {
    const url = `${NOC_DASHBOARD_ENDPOINT}/setupNOCProject`;
    const res = await postData(url, payload, token);
    return res;
  } catch (error) {
    console.log(error);
    return null
  }
};

export const getAccountType = async (token: string): Promise<NOCSetupAccountTypeApiResponse | null> => {
  try {
    const url = `${NOC_DASHBOARD_ENDPOINT}/getAccountType`;
    const res = await getData(url, token);
    return res;
  } catch (error) {
    console.log(error);
    return null
  }
};

export const getProjectDetails = async (token: string, NocProjectId: number): Promise<NOCSetupProjectDetailsApiResponse | null> => {
  try {
    const url = `${NOC_DASHBOARD_ENDPOINT}/getProjectDetails?NocProjectId=${NocProjectId}`;
    const res = await getData(url, token);
    return res;
  } catch (error) {
    console.log(error);
    return null
  }
};

export const getNocProjectEntities = async (token: string, nocProjectId: number, userEmail:string|undefined): Promise<NocProjectEntitiesApiResponse | null> => {
  try {
    const url = `${NOC_DASHBOARD_ENDPOINT}/getNoCProjectEntites?nocProjectId=${nocProjectId}&userEmail=${userEmail}`;
    const res = await getData(url, token);
    return res;
  } catch (error) {
    console.log(error);
    return null
  }
};

export const getNocProjectEntityUsers = async (token: string, nocProjectId: number, userEmail:string|undefined): Promise<NocProjectEntityUsersApiResponse | null> => {
  try {
    const url = `${NOC_DASHBOARD_ENDPOINT}/getNoCProjectEntityUser?nocProjectId=${nocProjectId}&userEmail=${userEmail}`;
    const res = await getData(url, token);
    return res;
  } catch (error) {
    console.log(error);
    return null
  }
};

export const getNocWorkflowDetails = async (token: string, nocProjectId: number): Promise<NocWorkflowDetailsApiResponse | null> => {
  try {
    const url = `${NOC_DASHBOARD_ENDPOINT}/getNocWorkFlowDetail?nocProjectId=${nocProjectId}`;
    const res = await getData(url, token);
    return res;
  } catch (error) {
    console.log(error);
    return null
  }
};

export const getLenderByClient = async (token: string, nocProjectId: number): Promise<NocWorkflowDetailsApiResponse | null> => {
  try {
    const url = `${NOC_DASHBOARD_ENDPOINT}/getLenderbyclient?clientId=${nocProjectId}`;
    const res = await getData(url, token);
    return res;
  } catch (error) {
    console.log(error);
    return null
  }
};

export const getDeveloperByClient = async (token: string, nocProjectId: number): Promise<NocWorkflowDetailsApiResponse | null> => {
  try {
    
    const url = `${NOC_DASHBOARD_ENDPOINT}/getDeveloperbyclient?clientId=${nocProjectId}`;
    const res = await getData(url, token);
    return res;
  } catch (error) {
    console.log(error);
    return null
  }
};
export const getDebentureByClient = async (token: string, nocProjectId: number): Promise<NocWorkflowDetailsApiResponse | null> => {
  try {
    const url = `${NOC_DASHBOARD_ENDPOINT}/getDebenturebyclient?clientId=${nocProjectId}`;
    const res = await getData(url, token);
    return res;
  } catch (error) {
    console.log(error);
    return null
  }
};
export const getPMCByClient = async (token: string, nocProjectId: number): Promise<NocWorkflowDetailsApiResponse | null> => {
  try {
    const url = `${NOC_DASHBOARD_ENDPOINT}/getPMCbyclient?clientId=${nocProjectId}`;
    const res = await getData(url, token);
    return res;
  } catch (error) {
    console.log(error);
    return null
  }
};

export const getEntityUser = async (token: string, entityId: number, entitytype:number): Promise<GetEntityUserApiResponse | null> => {
  try {
  const payload ={
    "entityId":entityId,
    "entitytype":entitytype
  }
    const url = `${NOC_DASHBOARD_ENDPOINT}/getEntityUser?entityId=${entityId}&entitytype=${entitytype}`;
    const res = await getData(url, token);
    return res;
  } catch (error) {
    console.log(error);
    return null
  }
};

export const updateSetupNOC = async (token: string, payload: UploadSetupNocPayload): Promise<NocSetupProjectApiResponse | null> => {
  try {
    const url = `${NOC_DASHBOARD_ENDPOINT}/addUpdateNOCProject?entityId`;
    // const res = await postData(url, payload, token);
    const formData = new FormData();
    formData.append("nocProjectId", String(payload.nocProjectId));
    formData.append("minimumsptolerance", String(payload.minimumSPTolerance));
    formData.append("advancedpayment", String(payload.advancedPayment));
    formData.append("advancedpaymenttolerance", String(payload.advancedPaymentTolerance));
    formData.append("thresholdDate", String(payload.thresholdDate));
    formData.append("remark", String(payload.nocProjectId));
    formData.append("thresholdtype", String(payload?.thresholdType));
    formData.append("FlowType", String(payload.FlowType));
    formData.append("period", String(payload.period));
    formData.append("enableprefence", String(payload.enableprefence));
    formData.append("file", payload.file, "data.json");
    const res: UploadSetupNOCResponse = await postDataMultipart(url, formData, token);
    return res;
  } catch (error) {
    console.log(error);
    return null
  }
};