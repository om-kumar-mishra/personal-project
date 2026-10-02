import FileSaver from "file-saver";
import { HDFC_API_ENDPOINT, getData, getFileBlob, getParams, postData, postDataMultipart } from "../../../../api/commons";
import {
  ExcelUploadPastHistoryResponse,
  UploadConstructionSetupTemplatePayload,
  UploadConstructionSetupTemplateResponse,
  CanSetupConstructionResponse,
  UpdateConstructionSetupStatusPayload,
  UpdateConstructionSetupStatusResponse,
  UploadConstructionUpdateTemplatePayload,
  UploadConstructionUpdateTemplateResponse,
  IsConstructionSetupResponse,
  CanUpdateConstructionResponse,
  UpdateConstructionUpdateStatusPayload,
  UpdateConstructionUpdateStatusResponse,
  DeleteConstructionUploadResponse,
  DeleteConstructionUploadPayload,
} from "./dataTypes";

//############################################# Excel Upload Setup Region  ########################################################//

//#region [Construction-history-list]
export const getExcelPastHistoryAPI = async (
  token: string,
  reAssetId: number,
  createdBy: string,
  type: string,
): Promise<ExcelUploadPastHistoryResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/construction/getConstructionPastHistory${getParams({ reAssetId, createdBy, type })}`;
  try {
    const res: ExcelUploadPastHistoryResponse = await getData(url, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [Upload project summary Template]
export const uploadConstructionSetupTemplateAPI = async (
  token: string,
  payload: UploadConstructionSetupTemplatePayload,
): Promise<UploadConstructionSetupTemplateResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/construction/insertConstructionSetupTemplate`;
  try {
    const formData = new FormData();
    formData.append("reassetId", String(payload.reassetId));
    formData.append("entityName", payload.entityName);
    formData.append("role", payload.role);
    formData.append("status", ""); // need to remove
    formData.append("fileContainer", payload.fileContainer);
    formData.append("filePath", payload.filePath);
    formData.append("file", payload.file);
    const res: UploadConstructionSetupTemplateResponse = await postDataMultipart(url, formData, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [update project summary status]
export const updateConstructionSetupStatusAPI = async (
  token: string,
  payload: UpdateConstructionSetupStatusPayload,
): Promise<UpdateConstructionSetupStatusResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/construction/updateConstructionSetupStatus`;
  try {
    const res: UpdateConstructionSetupStatusResponse = await postData(url, payload, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [download Comnstruction setup  template]
export const downloadConstructionTemplateAPI = async (token: string, reassetId: number) => {
  const url = `${HDFC_API_ENDPOINT}/construction/constructionSetupTemplateDownload${getParams({ reassetId })}`;
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

//-----------------------------------------------------------------------------------------------------------------

//#region [Pending List]
export const getConstructionPendingAPI = async (
  token: string,
  reAssetId: number,
  createdBy: string,
  type: string,
): Promise<ExcelUploadPastHistoryResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/construction/getConstructionPendingMIS${getParams({ reAssetId, createdBy, type })}`;
  try {
    const res: ExcelUploadPastHistoryResponse = await getData(url, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [Can Setup project summary]
export const canSetupConstructionAPI = async (token: string, reAssetId: number): Promise<CanSetupConstructionResponse | null> => {
  // const url = `${HDFC_API_ENDPOINT}/construction/canSetupConstruction`;
  try {
    const url = `${HDFC_API_ENDPOINT}/construction/canSetupConstruction?REAssetId=${reAssetId}`;
    const res = await getData(url, token);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
};
//#endregion

//#########################################     Excel Upload Construction Update    #######################//

//#region [Upload project summary Template]
export const uploadConstructionTemplateAPI = async (
  token: string,
  payload: UploadConstructionUpdateTemplatePayload,
): Promise<UploadConstructionUpdateTemplateResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/construction/insertConstructionUpdateTemplate`;
  try {
    const formData = new FormData();
    formData.append("reassetId", String(payload.reassetId));
    formData.append("entityName", payload.entityName);
    formData.append("role", payload.role);
    formData.append("status", payload.status);
    formData.append("fileContainer", payload.fileContainer);
    formData.append("filePath", payload.filePath);
    formData.append("file", payload.file);
    formData.append("misDate", payload.misDate);
    const res: UploadConstructionSetupTemplateResponse = await postDataMultipart(url, formData, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#endregion

//#region [is-Construction-Setup-PendingAPI]
export const isConstructionSetupPendingAPI = async (token: string, reAssetId: number): Promise<IsConstructionSetupResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/construction/isConstructionSetup${getParams({ reAssetId })}`;
  try {
    const res: IsConstructionSetupResponse = await getData(url, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [Can Update]
export const canUpdateConstructionAPI = async (token: string, date: string, reAssetId: number): Promise<CanUpdateConstructionResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/construction/canUpdateConstruction${getParams({ date, reAssetId })}`;
  try {
    const res: CanUpdateConstructionResponse = await getData(url, token);
    return res;
  } catch (error) {
    console.log("log", error);
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [update status]
export const updateConstructionStatusAPI = async (
  token: string,
  payload: UpdateConstructionUpdateStatusPayload,
): Promise<UpdateConstructionUpdateStatusResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/construction/updateConstructionUpdateStatus`;
  try {
    const res: UpdateConstructionUpdateStatusResponse = await postData(url, payload, token);
    return res;
  } catch (error) {
    console.log("loigs..", error);
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [delete Constreuction details]
export const DeleteConstructionUploadAPI = async (
  token: string,
  payload: DeleteConstructionUploadPayload,
): Promise<DeleteConstructionUploadResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/construction/deleteConstructionDetails`;
  try {
    const res: DeleteConstructionUploadResponse = await postData(url, payload, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [download project summary template]
export const downloadConstructionTemplateUpdateAPI = async (token: string, reassetId: number) => {
  const url = `${HDFC_API_ENDPOINT}/construction/constructionUpdateTemplateDownload${getParams({ reassetId })}`;
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

export const getDownloadExcelUploadRowListAPI = async (token: string, containerName: string, fileNames: string, filePath: string) => {
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
