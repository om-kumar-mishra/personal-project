import { HDFC_API_ENDPOINT, getFileBlob, postData, postDataMultipart } from "../../../api/commons";
import { MoitoringSheetDetailsList, RemoveSalesMonitoringHistoryResponse, SalesMisDatesResponse, SalesMonitoringPastHistoryResponse } from "./dataTypes";
import { FileUploadResponse } from "../services/dataTypes";

import FileSaver from "file-saver";
//upload-SalesMonitoring-template-data
export const uploadSalesMonitoringTemplateDataAPI = async (
  token: string,
  reAssetId: string,
  salesMisDate: string,
  costMisDate: string,
  createdBy: string,
  EntityName: string,
  Role: string,
  userName: string,
  fileContainer: string,
  filePath: string,
  fileName: string,
  remarks: string,
  uploaded_file: File,
): Promise<FileUploadResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/sales/uploadMonitoringSheet`;
  try {
    const formData = new FormData();
    formData.append("reAssetId", reAssetId);
    formData.append("salesMisDate", salesMisDate);
    formData.append("costMisDate", costMisDate);
    formData.append("createdBy", createdBy);
    formData.append("EntityName", EntityName);
    formData.append("Role", Role);
    formData.append("userName", userName);
    formData.append("fileContainer", fileContainer);
    formData.append("filePath", filePath);
    formData.append("fileName", fileName);
    formData.append("remarks", remarks);
    formData.append("file", uploaded_file);
    const res: FileUploadResponse = await postDataMultipart(url, formData, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};

//delete-SalesMonitoring-history
export const deleteSalesMonitoringHistoryAPI = async (
  token: string,
  MonitoringHistoryId: number,
  CreatedBy: string,
): Promise<RemoveSalesMonitoringHistoryResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/sales/removeSalesMonitoringDetails`;
  try {
    const res: RemoveSalesMonitoringHistoryResponse = await postData(url, { MonitoringHistoryId, CreatedBy }, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};

//SalesMonitoring-history-list
export const getSalesMonitoringPastHistoryAPI = async (
  token: string,
  REAssetId: number,
  CreatedBy: string,
): Promise<SalesMonitoringPastHistoryResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/sales/getSalesMonitoringHistory`;
  try {
    const res: SalesMonitoringPastHistoryResponse = await postData(url, { REAssetId, CreatedBy }, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};

//download-salesMonitoring-template-data

export const downloadSalesMonitoringTemplateDataAPI = async (token: string, reAssetId: number, emaild: string) => {
  const url = `${HDFC_API_ENDPOINT}/sales/downloadSalesMonitoringDetail?reAssetId=${reAssetId}&emaild=${emaild}`;
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

//Sale-MIS-Date
export const getSalesMisDatesAPI = async (token: string, REAssetId: number): Promise<SalesMisDatesResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/sales/getSalesMisDates`;
  try {
    const res: SalesMisDatesResponse = await postData(url, { REAssetId }, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
// -------------------------------------------------------------------------------------------

export const getSalesMonitoringDashboardDetails = async (token: string, reassetid: string): Promise<MoitoringSheetDetailsList | null> => {
  const url = `${HDFC_API_ENDPOINT}/sales/getSalesMonitoringDashboardDetails`;
  try {
    const res: MoitoringSheetDetailsList = await postData(url, { reassetid }, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
