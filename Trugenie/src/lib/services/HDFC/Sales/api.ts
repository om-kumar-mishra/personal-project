import FileSaver from "file-saver";
import { HDFC_API_ENDPOINT, getFileBlob, getParams, postData, postDataMultipart } from "../../../api/commons";
import { FileUploadResponse } from "../services/dataTypes";
import {
  CanUploadSalesTemplateDataResponse,
  PastSalesSummaryDetailResponse,
  PendingSalesForApprovalResponse,
  RemoveSalesHistoryResponse,
  SalesPastHistoryResponse,
  SalesSummaryResponse,
  SummaryDetailResponse,
  TaggedRMDataResponse,
  UpdateSalesPastHistoryResponse,
} from "./dataTypes";

//#region [Sale-history-list]
export const getSalesPastHistoryAPI = async (token: string, reassetId: number, typeCheck: string): Promise<SalesPastHistoryResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/sales/getSalesPastHistory`;
  try {
    const res: SalesPastHistoryResponse = await postData(url, { reassetId, type: typeCheck }, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [Past-Sale-summary-details]
export const getPastSalesSummaryDetailsAPI = async (
  token: string,
  reassetId: number,
  useremail: string,
  SaleMISHistoryId: number,
): Promise<PastSalesSummaryDetailResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/sales/getPastSalesSummaryDetails`;
  try {
    const res: PastSalesSummaryDetailResponse = await postData(url, { reassetId, useremail, SaleMISHistoryId }, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [pending-sales-for-approval-list]
export const getPendingSalesForApprovalAPI = async (token: string, reassetId: number): Promise<PendingSalesForApprovalResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/sales/getPendingSalesforApproval`;
  try {
    const res: PendingSalesForApprovalResponse = await postData(url, { reassetId }, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [update-sales-past-history]
export const updateSalesPastHistoryAPI = async (
  token: string,
  reassetId: number,
  SaleMISHistoryId: number,
  status: string,
  createdby: string,
): Promise<UpdateSalesPastHistoryResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/sales/updateSalesPastHistory`;
  try {
    const res: UpdateSalesPastHistoryResponse = await postData(url, { reassetId, SaleMISHistoryId, status, createdby }, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [delete-sales-history]
export const deleteSalesHistoryAPI = async (
  token: string,
  reassetId: number,
  SaleMISHistoryId: number,
  createdby: string,
): Promise<RemoveSalesHistoryResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/sales/removeSalesHistory`;
  try {
    const res: RemoveSalesHistoryResponse = await postData(url, { reassetId, SaleMISHistoryId, createdby }, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [delete-update-sales-past-history]
export const deleteUpdateSalesPastHistoryAPI = async (token: string, reassetId: number, Type: string): Promise<RemoveSalesHistoryResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/sales/removeUpdateSalesPastHistory`;
  try {
    const res: RemoveSalesHistoryResponse = await postData(url, { reassetId, Type }, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [can-upload-sales-template-data]
export const canUploadSalesTemplateDataAPI = async (
  token: string,
  reassetId: number,
  MISDate: string,
  Type: string,
): Promise<CanUploadSalesTemplateDataResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/sales/canUpdateSalesMISHistory`;
  try {
    const res: CanUploadSalesTemplateDataResponse = await postData(url, { reassetId, MISDate, type: Type }, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [upload-sales-template-data]
export const uploadSalesTemplateDataAPI = async (
  token: string,
  reassetId: number,
  mISDate: string,
  entity: string,
  entityRole: string,
  fileContainer: string,
  filePath: string,
  fileName: string,
  remarks: string,
  uploaded_file: File,
): Promise<FileUploadResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/sales/insertReSalesTemplateData`;
  try {
    const formData = new FormData();
    formData.append("reassetId", reassetId.toString());
    formData.append("mISDate", mISDate);
    formData.append("entity", entity);
    formData.append("entityRole", entityRole);
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
//#endregion

//#region [download-sales-template-data]
export const downloadSalesTemplateDataAPI = async (token: string, reassetId: number) => {
  const params = {
    reassetId: reassetId,
  };
  const url = `${HDFC_API_ENDPOINT}/sales/downloadReAssetTemplate${getParams(params)}`;
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

//#region [tagged-rm]
export const fetchTaggedRMAPI = async (token: string, reassetId: number, SaleMISHistoryId: number, createdby: string): Promise<TaggedRMDataResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/sales/removeSalesHistory`;
  try {
    const res: TaggedRMDataResponse = await postData(url, { reassetId, SaleMISHistoryId, createdby }, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [setup-pending]
export const isSalesSetupPendingAPI = async (token: string, REAssetId: number) => {
  const url = `${HDFC_API_ENDPOINT}/sales/isSalesSetupPending`;
  try {
    const res: TaggedRMDataResponse = await postData(url, { REAssetId }, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [Sale-summary]
export const getSalesSummaryAPI = async (token: string, reAssetId: number, misDate: string, uploaded_file: File): Promise<SalesSummaryResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/sales/getSalesSummary`;
  try {
    const formData = new FormData();
    formData.append("reAssetId", reAssetId.toString());
    formData.append("misDate", misDate);
    formData.append("file", uploaded_file);
    const res: SalesSummaryResponse | null = await postDataMultipart(url, formData, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [Sale-summary-details]
export const getSalesSummaryDetailsAPI = async (
  token: string,
  reassetId: number,
  uploadedFile: File,
  status: string,
  misDate: string,
): Promise<SummaryDetailResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/sales/summaryDetail`;
  try {
    const formData = new FormData();
    formData.append("reAssetId", reassetId.toString());
    formData.append("file", uploadedFile);
    formData.append("type", status);
    formData.append("misDate", misDate);
    const res: SummaryDetailResponse | null = await postDataMultipart(url, formData, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion
