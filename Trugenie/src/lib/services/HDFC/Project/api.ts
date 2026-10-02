import FileSaver from "file-saver";
import { HDFC_API_ENDPOINT, getData, getFileBlob, getParams, postData } from "../../../api/commons";
import {
  AllProjectListResponse,
  CreateProjectPayloadType,
  CustomerTaggedRMUsersPayload,
  CustomerTaggedRMUsersResponse,
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

//#region [Project-List]
export const fetchProjectListAPI = async (token: string,client: number): Promise<ProjectListResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/project/getUserAssignedProjects`;
  try {
    const res: ProjectListResponse = await postData(url, { client }, token);
    return res;
  } catch (error: unknown) {
    console.log(`Error calling URL : ${url}`);
    throw error;
  }
};
//#endregion

// all Project List
export const fetchAllProjectListAPI = async (token: string, client: number, useremail: string): Promise<AllProjectListResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/project/getAllProjects`;
  try {
    const res: AllProjectListResponse = await postData(url, { client, useremail }, token);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
};

export const getCustomerTaggedRMUsers = async (token: string, payload: CustomerTaggedRMUsersPayload): Promise<CustomerTaggedRMUsersResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/entity/getCustomerTaggedRMUsers`;
  try {
    const res: CustomerTaggedRMUsersResponse = await postData(url, payload, token);
    return res;
  } catch (error: unknown) {
    console.log(`Error calling URL : ${error}`);
    return null;
  }
};

export const updateREProject = async (token: string, payload: updateREProjectPayload): Promise<ProjectUpdateResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/project/updateREProject`;
  try {
    const res: ProjectUpdateResponse = await postData(url, payload, token);
    return res;
  } catch (error: unknown) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};

export const updateProjectStatus = async (token: string, payload: ProjectUpdateStatusPayload): Promise<ProjectUpdateResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/project/updateProjectStatus`;
  try {
    const res: ProjectUpdateResponse = await postData(url, payload, token);
    return res;
  } catch (error: unknown) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};

// get Project logs List
export const getProjectLogs = async (token: string, userEmail: string, assetId: number): Promise<ProjectLogsListResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/project/getProjectLogs?userEmail=${userEmail}&assetId=${assetId}`;
  try {
    const res: ProjectLogsListResponse = await getData(url, token);
    return res;
  } catch (error: unknown) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};

// assign user submit
export const insertUserProjectAccess = async (token: string, payload: ProjectAsignUserPayload): Promise<ProjectAssignUserResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/project/insertUserProjectAccess`;
  try {
    const res: ProjectAssignUserResponse = await postData(url, payload, token);
    return res;
  } catch (error: unknown) {
    console.log(`Error calling URL : ${url}`);
    throw error;
  }
};

// get Project Access Users List
export const getUserProjectAccess = async (
  token: string,
  userEmail: string,
  assetId: number,
  userRole: string,
): Promise<ProjectUserAccessListResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/project/getUserProjectAccess?userEmail=${userEmail}&assetId=${assetId}&userRole=${userRole}`;
  try {
    const res: ProjectUserAccessListResponse = await getData(url, token);
    return res;
  } catch (error: unknown) {
    console.log(`Error calling URL : ${url}`);
    throw error;
  }
};

// get Project Access Users Detail
export const getUserInformationDetails = async (
  token: string,
  userEmail: string,
  empCode: string,
  userRole: string,
  reassetId: number,
): Promise<ProjectUserAccessDetailsResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/project/getUserInformationDetails?userRole=${userRole}&empCode=${empCode}&userEmail=${userEmail}&reassetId=${reassetId}`;
  try {
    const res: ProjectUserAccessDetailsResponse = await getData(url, token);
    return res;
  } catch (error: unknown) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};

// remove User Project Access
export const removeUserProjectAccess = async (token: string, payload: RemoveUserProjectAccessPayload): Promise<RemoveUserProjectAccessResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/project/removeUserProjectAccess`;
  try {
    const res: RemoveUserProjectAccessResponse = await postData(url, payload, token);
    return res;
  } catch (error: unknown) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};

// get Users By Role
export const getUserByRole = async (token: string, roleType: string, createdBy: string, developerId: number): Promise<UserByRoleListResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/project/getUserByRole?roleType=${roleType}&createdBy=${createdBy}&developerId=${developerId}`;
  try {
    const res: UserByRoleListResponse = await getData(url, token);
    return res;
  } catch (error: unknown) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};

// get Users By Role
export const getRoleTemplateName = async (token: string): Promise<RoleTemplateNameListResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/users/roles`//project/getRoleTemplateName`;
  try {
    const res: RoleTemplateNameListResponse = await getData(url, token);
    return res;
  } catch (error: unknown) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};

export const createProjectListAPI = async (token: string, formData: CreateProjectPayloadType): Promise<any | null> => {
  const url = `${HDFC_API_ENDPOINT}/project/insertREProject`;
  try {
    const res: any = await postData(url, formData, token);
    return res;
  } catch (error: unknown) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};

export const downloadNocProjectSummaryAPI = async (token: string, nocProjectId: number, REAssetId: number, projectName: string) => {
  try {
    const url = `${HDFC_API_ENDPOINT}/noc/request/downloadNoCProjectSummary${getParams({ nocProjectId, REAssetId, projectName })}`;
    const { fileName, data } = await getFileBlob(url, token);
    if (fileName && data) {
      FileSaver.saveAs(data, fileName !== undefined ? fileName : "export.xls");
      return { fileName, data };
    } else {
      return null;
    }
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
};
export const getProjectUsersListAPI = async (token: string, developerId: number, createdBy: string): Promise<any | null> => {
  const url = `${HDFC_API_ENDPOINT}/project/getUsersforProject${getParams({ developerId, createdBy })}`;
  try {
    const res: any = await getData(url, token);
    return res;
  } catch (error: unknown) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};

export const getAssetInvestmentListAPI = async (token: string, ClientId: number, useremail: string): Promise<any | null> => {
  const url = `${HDFC_API_ENDPOINT}/project/getREAssetInvestmentList${getParams({ ClientId, useremail })}`;
  try {
    const res: any = await getData(url, token);
    return res;
  } catch (error: unknown) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
