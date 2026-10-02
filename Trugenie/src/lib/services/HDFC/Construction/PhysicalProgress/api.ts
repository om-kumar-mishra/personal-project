import FileSaver from "file-saver";
import { HDFC_API_ENDPOINT, getData, getFileBlob, getParams, postData, postDataMultipart } from "../../../../api/commons";
import { PhysicalProgressPastHistoryResponse, PhysicalProgressPendingHistoryResponse, UpdatePhysicalProgressStatusPayload, UpdatePhysicalProgressStatusResponse, UploadPhysicalProgressSetupTemplatePayload, UploadPhysicalProgressSetupTemplateResponse } from "./dataTypes";


//############################################# Physical Progress Setup Region  ########################################################//

//#region [Construction-PhysicalProgress-list]
export const getPhysicalProgressPastHistoryAPI = async (token: string, reAssetId: number, createdBy: string, type: string): Promise<PhysicalProgressPastHistoryResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/construction/getPhyscialProgressPastHistory${getParams({ reAssetId, createdBy, type })}`;
  try {
    const res: PhysicalProgressPastHistoryResponse = await getData(url, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion


//#region [Pending-PhysicalProgress-list]
export const getPhysicalProgressPendingHistoryAPI = async (token: string, reAssetId: number, createdBy: string, type: string): Promise<PhysicalProgressPendingHistoryResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/construction/getPhyscialProgressPendingHistory${getParams({ reAssetId, createdBy, type })}`;
  try {
    const res: PhysicalProgressPendingHistoryResponse = await getData(url, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [download Physical Progress setup  template]
export const downloadPhysicalProgressTemplateAPI = async (token: string, reassetId: number, projectType: string, developmentType: string, phase: string, type: string) => {
  const url = `${HDFC_API_ENDPOINT}/construction/constructionPhysicalProgressTemplateDownload${getParams({ reassetId, projectType, developmentType, phase, type })}`;
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

//#region [update Physical Progress status]
export const updatePhysicalProgressStatusAPI = async (
  token: string,
  payload: UpdatePhysicalProgressStatusPayload,
): Promise<UpdatePhysicalProgressStatusResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/construction/updatePhysicalProgressStatus`;
  try {
    const res: UpdatePhysicalProgressStatusResponse = await postData(url, payload, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [Upload Physical Progress Template]
export const uploadPhysicalProgressSetupTemplateAPI = async (
  token: string,
  payload: UploadPhysicalProgressSetupTemplatePayload,
): Promise<UploadPhysicalProgressSetupTemplateResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/construction/insertPhysicalProgressSetupTemplate`;
  try {
    const formData = new FormData();
    formData.append("reassetId", String(payload.reassetId));
    formData.append("entityName", payload.entityName);
    formData.append("role", payload.role);
    formData.append("fileContainer", payload.fileContainer);
    formData.append("filePath", payload.filePath);
    formData.append("projectType", payload.projectType);
    formData.append("developmentType", payload.developmentType);
    formData.append("phase", payload.phase);
    formData.append("file", payload.file);
    const res: UploadPhysicalProgressSetupTemplateResponse = await postDataMultipart(url, formData, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

export const getDownloadPhysicalProgressRowListAPI = async (token: string, containerName: string, fileNames: string, filePath: string) => {
  const params = {
    containerName,
    fileName: fileNames,
    filePath,
  };
  const url = `${HDFC_API_ENDPOINT}/fileManager/downloadFile${getParams(params)}`;
  try {
    const { fileName, data } = await getFileBlob(url, token);
    if (fileName && data) {
      FileSaver.saveAs(data, fileName !== undefined ? fileNames : fileNames);
      return { fileName, data };
    } else {
      return null;
    }
  } catch (error: unknown) {
    console.log(`Error while fetching Download Template : ${error}`);
    return null;
  }
};