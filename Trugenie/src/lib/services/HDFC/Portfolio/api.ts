import FileSaver from "file-saver";
import { HDFC_API_ENDPOINT, getData, getFileBlob, getParams, postData, postDataMultipart } from "../../../api/commons";
import { FileUploadResponse } from "../services/dataTypes";
import {
  GetFundsPastUpdateResponse,
  GetFundsPendingResponse,
  RemoveFundsHistoryResponse,
  CheckFundsDetailsExistResponse,
  UpdateFundsStatusPayload,
  UpdateFundsStatusResponse,
} from "./dataTypes";

//#region [funds-history-list]
export const getFundsPastUpdateAPI = async (token: string, ClientId: number, Type: string): Promise<GetFundsPastUpdateResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/portfolio/getFundsPastUpdates${getParams({ ClientId, Type })}`;
  try {
    const res: GetFundsPastUpdateResponse = await getData(url, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion
//# region [Funds-pending-list]
export const getFundsPendingAPI = async (token: string, ClientId: number): Promise<GetFundsPendingResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/portfolio/getPendingFundsUpdates${getParams({ ClientId })}`;
  try {
    const res: GetFundsPendingResponse = await getData(url, token);
    return res;
  } catch (error) {
    console.log("hello", error);
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [upload-funds-template-data]
export const insertFundsTemplateDataAPI = async (
  token: string,
  clientId: number,
  mISDate: string,
  clientName: string,
  entityName: string,
  // fileContainer: string,
  // filePath: string,
  // fileName: string,
  remarks: string,
  uploaded_file: File,
): Promise<FileUploadResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/portfolio/insertFundSummary`;
  try {
    const formData = new FormData();
    formData.append("clientId", clientId.toString());
    formData.append("entityName", entityName);
    formData.append("clientName", clientName);
    formData.append("misDate", mISDate);
    formData.append("remark", remarks);
    formData.append("file", uploaded_file);
    const res: FileUploadResponse = await postDataMultipart(url, formData, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [delete-Funds-past-history]
export const DeleteFundsPastHistoryAPI = async (token: string, clientId: number, fundMISHistoryId: number) => {
  const url = `${HDFC_API_ENDPOINT}/portfolio/deleteFundDetails`;
  try {
    const res: RemoveFundsHistoryResponse = await postData(url, { clientId, fundMISHistoryId }, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [Check project summary Details Exist]
export const checkFundsDetailExistAPI = async (token: string, client: number, MisDate: string): Promise<CheckFundsDetailsExistResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/portfolio/checkFundDetailExist${getParams({ client, MisDate })}`;
  try {
    const res: CheckFundsDetailsExistResponse = await getData(url, token);
    // const res: CheckFundsDetailsExistResponse = await postData(url, {client,MisDate}, token, 'GET');

    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [update project summary status]
export const updateFundsStatusAPI = async (token: string, payload: UpdateFundsStatusPayload): Promise<UpdateFundsStatusResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/portfolio/updateFund`;
  try {
    const res: UpdateFundsStatusResponse = await postData(url, payload, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [download funds template]
export const downloadFundsTemplateAPI = async (token: string, clientId: number) => {
  const url = `${HDFC_API_ENDPOINT}/portfolio/downloadUpdateFundSummaryTemplate${getParams({ clientId })}`;
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
