import FileSaver from "file-saver";
import { HDFC_API_ENDPOINT, getData, getFileBlob, getParams, postData, postDataMultipart } from "../../../api/commons";
import {
  CanSetupProjectSummaryResponse,
  CheckProjectSummaryDetailsExistResponse,
  DeleteProjectSummaryDetailsPayload,
  DeleteProjectSummaryDetailsResponse,
  IsSummarySetupResponse,
  SummaryPastHistoryResponse,
  SummaryPendingResponse,
  UpdateProjectSummaryStatusPayload,
  UpdateProjectSummaryStatusResponse,
  UploadProjectSummaryTemplatePayload,
  UploadProjectSummaryTemplateResponse,
  UploadProjectSummaryTemplateSetupPayload,
} from "./dataTypes";

//#region [Summary-history-list]
export const getSummaryPastHistoryAPI = async (token: string, REAssetId: number, Type: string): Promise<SummaryPastHistoryResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/summary/getProjectSummaryPastUpdates${getParams({ REAssetId, Type })}`;
  try {
    const res: SummaryPastHistoryResponse = await getData(url, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [Pending List]
export const getSummaryPendingAPI = async (token: string, reAssetId: number, type: string): Promise<SummaryPendingResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/summary/getProjectSummaryPendingUpdates`;//${getParams({ REAssetId, Type })}`;
  try {
    // const res: SummaryPendingResponse = await getData(url, token);
    const res: SummaryPendingResponse = await postData(url, {reAssetId, type}, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [is-Summary-Setup-PendingAPI]
export const isSummarySetupPendingAPI = async (token: string, REAssetId: number,AssetName:string): Promise<IsSummarySetupResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/summary/isSummarySetupPending${getParams({ REAssetId ,AssetName})}`;
  try {
    const res: IsSummarySetupResponse = await getData(url, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [delete project summary details]
export const deleteProjectSummaryDetailsAPI = async (
  token: string,
  payload: DeleteProjectSummaryDetailsPayload,
): Promise<DeleteProjectSummaryDetailsResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/summary/deleteProjectSummaryDetails`;
  try {
    const res: DeleteProjectSummaryDetailsResponse = await postData(url, payload, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [update project summary status]
export const updateProjectSummaryStatusAPI = async (
  token: string,
  payload: UpdateProjectSummaryStatusPayload,
): Promise<UpdateProjectSummaryStatusResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/summary/updateProjectSummaryStatus`;
  try {
    const res: UpdateProjectSummaryStatusResponse = await postData(url, payload, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [download project summary template]
export const downloadProjectSummaryTemplateAPI = async (token: string, reAssetId: number, type: string) => {
  const url = `${HDFC_API_ENDPOINT}/summary/downloadProjectSummaryTemplate${getParams({ reAssetId, type })}`;
  try {
    const { fileName, data } = await getFileBlob(url, token);
    if (fileName && data) {
      FileSaver.saveAs(data, fileName !== undefined ? fileName : "download.xlsx");
      return { fileName, data };
    } else {
      return null;
    }
  } catch (error: unknown) {
    console.log(`Error while downloading file : ${JSON.stringify(error)}`);
    return null;
  }
};
//#endregion

//#region [Can Setup project summary]
export const canSetupProjectSummaryAPI = async (token: string, reAssetId: number): Promise<CanSetupProjectSummaryResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/summary/canSetupProjectSummary`;
  try {
    const res: CanSetupProjectSummaryResponse = await postData(url, { reAssetId }, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [Check project summary Details Exist]
export const checkProjectSummaryDetailExistAPI = async (
  token: string,
  REAssetId: number,
  type: string,
  MisDate: string,
): Promise<CheckProjectSummaryDetailsExistResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/summary/checkProjectSummaryDetailExist${getParams({ REAssetId, type, MisDate })}`;
  try {
    const res: CheckProjectSummaryDetailsExistResponse = await getData(url, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [Upload project summary Template]
export const uploadProjectSummaryTemplateAPI = async (
  token: string,
  payload: UploadProjectSummaryTemplatePayload,
): Promise<UploadProjectSummaryTemplateResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/summary/uploadSummaryTemplate`;
  try {
    const formData = new FormData();
    formData.append("reAssetId", String(payload.reAssetId));
    formData.append("clientName", payload.clientName);
    formData.append("projectName", payload.projectName);
    formData.append("entityName", payload.entityName);
    formData.append("misDate", payload.misDate);
    formData.append("remark", payload.remark);
    formData.append("file", payload.file);
    const res: UploadProjectSummaryTemplateResponse = await postDataMultipart(url, formData, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [Upload project summary Template]
export const uploadProjectSummarySetupAPI = async (
  token: string,
  payload: UploadProjectSummaryTemplateSetupPayload,
): Promise<UploadProjectSummaryTemplateSetupPayload | null> => {
  const url = `${HDFC_API_ENDPOINT}/summary/uploadProjectSetupSummary`;
  try {
    const formData = new FormData();
    formData.append("reAssetId", String(payload.reAssetId));
    formData.append("clientName", payload.clientName);
    formData.append("projectName", payload.projectName);
    formData.append("entityName", payload.entityName);
    formData.append("misDate", payload.misDate);
    formData.append("remark", payload.remark);
    formData.append("file", payload.file);
    const res: UploadProjectSummaryTemplateSetupPayload = await postDataMultipart(url, formData, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion
