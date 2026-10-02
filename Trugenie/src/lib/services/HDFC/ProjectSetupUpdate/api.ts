import FileSaver from "file-saver";
import { HDFC_API_ENDPOINT, getData, getFileBlob, getParams, postData, postDataMultipart } from "../../../api/commons";
import { GetProjectSalesResponse, StatusChangeProjectDataType, UploadProjectSetupType } from "./dataTypes";

export const getProjectSalesListAPI = async (token: string, reAssetId: number, historyType: string): Promise<GetProjectSalesResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/project/getSalesHistory?reAssetId=${reAssetId}&historyType=${historyType}`;
  try {
    const res: GetProjectSalesResponse = await getData(url, token);
    return res;
  } catch (error: unknown) {
    console.log(`Error: ${url}`);
    throw error;
  }
};

export const getProjectSalesApprovalsListAPI = async (token: string, reAssetId: number) => {
  try {
    const url = `${HDFC_API_ENDPOINT}/project/getSalesSetupApproval?reAssetId=${reAssetId}`;
    const res = await getData(url, token);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
};
export const getDownloadProjectSalesListAPI = async (token: string, reAssetId: number): Promise<any> => {
  const url = `${HDFC_API_ENDPOINT}/project/downloadSetupTemplate?reAssetId=${reAssetId}`;
  try {
    const { fileName, data } = await getFileBlob(url, token);
    if (fileName && data) {
      FileSaver.saveAs(data, fileName !== undefined ? fileName : "download.xlsx");
      return { fileName, data };
    } else {
      return null;
    }
  } catch (error: unknown) {
    console.log(`Error ${error} while calling URL : ${url}`);
    return null;
  }
};

export const getDownloadProjectSalesRowListAPI = async (token: string, containerName: string, fileNames: string, filePath: string) => {
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

export const statusChangeAPI = async (token: string, statusChangeProjectProps: StatusChangeProjectDataType) => {
  try {
    const url = `${HDFC_API_ENDPOINT}/project/updateSalesSetupStatus`;
    const res: StatusChangeProjectDataType = await postData(url, statusChangeProjectProps, token);
    return res;
  } catch (error) {
    console.log(`Error while adding portfolio : ${error}`);
    return null;
  }
};

export const uploadProjectSetupAPI = async (token: string, uploadProjectSetupProps: UploadProjectSetupType) => {
  const url = `${HDFC_API_ENDPOINT}/project/addREProjectDetails`;
  try {
    const formData = new FormData();
    formData.append("reAssetId", uploadProjectSetupProps.reAssetId);
    formData.append("misDate", uploadProjectSetupProps.misDate);
    formData.append("file", uploadProjectSetupProps.file as any);
    formData.append("entity", uploadProjectSetupProps.entity);
    formData.append("entityRole", uploadProjectSetupProps.entityRole);
    formData.append("userName", uploadProjectSetupProps.userName);
    formData.append("fileContainer ", uploadProjectSetupProps.fileContainer);
    formData.append("filePath", uploadProjectSetupProps.filePath);
    formData.append("fileName", uploadProjectSetupProps.fileName);
    formData.append("userEmail", uploadProjectSetupProps.userEmail);
    formData.append("remarks", uploadProjectSetupProps.remarks);
    const res = await postDataMultipart(url, formData, token);

    console.log(formData);
    return res as unknown as UploadProjectSetupType;
  } catch (error: unknown) {
    console.log(`Error while uploading : ${url}`);
    return null;
  }
};

export const canSetupProjectUpdateAPI = async (token: string, reAssetId: number) => {
  try {
    const url = `${HDFC_API_ENDPOINT}/project/canSetupSales?reAssetId=${reAssetId}`;
    const res = await getData(url, token);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
};

export const canCreateSetupProjectAPI = async (token: string, reAssetId: number) => {
  try {
    const url = `${HDFC_API_ENDPOINT}/project/getProjectDetails?reAssetId=${reAssetId}`;
    const res = await getData(url, token);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
};
