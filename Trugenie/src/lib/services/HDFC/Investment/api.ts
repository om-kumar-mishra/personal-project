import FileSaver from "file-saver";
import { HDFC_API_ENDPOINT, getData, getFileBlob, getParams, postData, postDataMultipart } from "../../../api/commons";
import {
  InvestmentPastHistoryResponse,
  IsInvestmentSetupResponse,
  UploadInvestmentTemplateResponse,
  UploadInvestmentTemplatePayload,
  CheckInvestmentDetailsExistResponse,
  UpdateInvestmentStatusResponse,
  UpdateInvestmentStatusPayload,
  DeleteInvestmentDetailsResponse,
  DeleteInvestmentDetailsPayload,
  InvestmentPendingResponse,
  InvestmentListResponse,
  InvestmentFundsResponse,
  CanSetupInvestmentResponse,
  UploadInvestmentSetupTemplatePayload,
  UploadInvestmentSetupTemplateResponse,
} from "./dataTypes";

//#region [Investment-history-list]
export const getInvestmentPastHistoryAPI = async (token: string, investmentId: number, type: string): Promise<InvestmentPastHistoryResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/investment/getInvestmentsPastUpdates${getParams({ investmentId, type })}`;
  try {
    const res: InvestmentPastHistoryResponse = await getData(url, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [is-Investment-Setup-PendingAPI]
export const isInvestmentSetupPendingAPI = async (token: string, InvestmentId: number): Promise<IsInvestmentSetupResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/investment/isInvestmentSetupPending${getParams({ InvestmentId })}`;
  try {
    const res: IsInvestmentSetupResponse = await getData(url, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [download Investment template]
export const downloadInvestmentTemplateAPI = async (token: string, investmentId: number, type: string) => {
  const url =
    type === "Setup"
      ? `${HDFC_API_ENDPOINT}/investment/downloadInvestmentSetupTemplate${getParams({ investmentId })}`
      : `${HDFC_API_ENDPOINT}/investment/downloadUpdateInvestmentSummaryTemplate${getParams({ investmentId })}`;
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

//#region [Upload Investment Template]
export const uploadInvestmentTemplateAPI = async (
  token: string,
  payload: UploadInvestmentTemplatePayload,
): Promise<UploadInvestmentTemplateResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/investment/updateInvestmentSummary`;
  try {
    const formData = new FormData();
    formData.append("investmentId", String(payload.investmentId));
    formData.append("clientName", payload.clientName);
    formData.append("entityName", payload.entityName);
    formData.append("misDate", payload.misDate);
    formData.append("remark", payload.remark);
    formData.append("file", payload.file);
    const res: UploadInvestmentTemplateResponse = await postDataMultipart(url, formData, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [Check Investment Details Exist]
export const checkInvestmentDetailExistAPI = async (
  token: string,
  InvestmentId: number,
  type: string,
  MisDate: string,
): Promise<CheckInvestmentDetailsExistResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/investment/checkInvestmentDetailExist${getParams({ InvestmentId, type, MisDate })}`;
  try {
    const res: CheckInvestmentDetailsExistResponse = await getData(url, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [update Investment status]
export const updateInvestmentStatusAPI = async (token: string, payload: UpdateInvestmentStatusPayload): Promise<UpdateInvestmentStatusResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/investment/updateInvestmentStatus`;
  try {
    const res: UpdateInvestmentStatusResponse = await postData(url, payload, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [delete Investment details]
export const deleteInvestmentDetailsAPI = async (token: string, payload: DeleteInvestmentDetailsPayload): Promise<DeleteInvestmentDetailsResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/investment/deleteInvestmentDetails`;
  try {
    const res: DeleteInvestmentDetailsResponse = await postData(url, payload, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [Pending List]
export const getInvestmentPendingAPI = async (token: string, InvestmentId: number, Type: string): Promise<InvestmentPendingResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/investment/getInvestmentsPendingUpdates${getParams({ InvestmentId, Type })}`;
  try {
    // const res: InvestmentPendingResponse = await getData(url, token);
    const res: InvestmentPendingResponse = await getData(url, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [Can Setup Investment]
export const canSetupInvestmentAPI = async (token: string, InvestmentId: number): Promise<CanSetupInvestmentResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/investment/canSetupInvestment${getParams({ InvestmentId })}`;
  try {
    const res: CanSetupInvestmentResponse = await getData(url, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [Upload Investment-Setup Template]
export const uploadInvestmentSetupTemplateAPI = async (
  token: string,
  payload: UploadInvestmentSetupTemplatePayload,
): Promise<UploadInvestmentSetupTemplateResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/investment/insertInvestmentSummary`;
  try {
    const formData = new FormData();
    formData.append("investmentId", String(payload.investmentId));
    formData.append("clientName", payload.clientName);
    formData.append("entityName", payload.entityName);
    formData.append("misDate", payload.misDate);
    formData.append("remark", payload.remark);
    formData.append("file", payload.file);
    const res: UploadInvestmentSetupTemplateResponse = await postDataMultipart(url, formData, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [investment List]
export const getInvestmentListAPI = async (
  token: string,
  ClientId: number,
  CreatedBy: string,
  fundid: number,
  developerid: number,
): Promise<InvestmentListResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/project/getInvestmentList${getParams({ ClientId, CreatedBy, fundid, developerid })}`;
  try {
    // const res: InvestmentPendingResponse = await getData(url, token);
    const res: InvestmentListResponse = await getData(url, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [investment funds]
export const getInvestmentFundsAPI = async (token: string, ClientId: number, CreatedBy: string): Promise<InvestmentFundsResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/project/getInvestmentFunds${getParams({ ClientId, CreatedBy })}`;
  try {
    // const res: InvestmentPendingResponse = await getData(url, token);
    const res: InvestmentFundsResponse = await getData(url, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [investment funds]
export const getInvestmentDeveloperAPI = async (token: string, ClientId: number, CreatedBy: string): Promise<InvestmentFundsResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/project/getDevelopersnew${getParams({ ClientId })}`;
  try {
    // const res: InvestmentPendingResponse = await getData(url, token);
    const res: InvestmentFundsResponse = await getData(url, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion
