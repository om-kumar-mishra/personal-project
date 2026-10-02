import { HDFC_API_ENDPOINT, postData, postDataMultipart } from "../../../api/commons";
import { DeleteProjectDocumentsPayload, InsertProjectDocumentsPayload } from "./dataType";

export const insertProjectDocuments = async (token: string, payload: InsertProjectDocumentsPayload) => {
  try {
    const url = `${HDFC_API_ENDPOINT}/documents/insertProjectDocuments`;
    const formData = new FormData();
    Object.entries(payload)?.forEach(([key, data]) => data && formData.append(key, Array.isArray(data) ? JSON.stringify(data) : data));
    const res = await postDataMultipart(url, formData, token);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
};

export const getProjectDocumentsHistory = async (token: string, REAssetId: number) => {
  try {
    const url = `${HDFC_API_ENDPOINT}/documents/getProjectDocumentsHistory`;
    const res = await postData(url, { REAssetId }, token);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
};

export const getProjectDocuments = async (token: string, REAssetId: number) => {
  try {
    const url = `${HDFC_API_ENDPOINT}/documents/getProjectDocuments`;
    const res = await postData(url, { REAssetId }, token);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
};

export const deleteProjectDocuments = async (token: string, payload: DeleteProjectDocumentsPayload) => {
  try {
    const url = `${HDFC_API_ENDPOINT}/documents/deleteProjectDocuments`;
    const res = await postData(url, payload, token);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
};
