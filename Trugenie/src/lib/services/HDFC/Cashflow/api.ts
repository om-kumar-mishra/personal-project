import FileSaver from "file-saver";
import { HDFC_API_ENDPOINT, getData, getFileBlob, getParams, postData, postDataMultipart } from "../../../api/commons";
import {
  CanSetupCashflowResponse,
  CashflowPastHistoryData,
  CashflowPendingResponse,
  CashflowSetupPastUpdatesData,
  CashflowSetupPendingListResponse,
  CheckCashflowDetailsExistResponse,
  DeleteCashflowDetailsPayload,
  DeleteCashflowDetailsResponse,
  IsCashflowSetupResponse,
  UpdateCashflowStatusPayload,
  UpdateCashflowStatusResponse,
  UploadCashflowSetupTemplatePayload,
  UploadCashflowTemplatePayload,
  UploadCashflowTemplateResponse,
} from "./dataTypes";

//#region [Cashflow-history-list]
export const getCashflowPastHistoryAPI = async (token: string, reAssetId: number): Promise<CashflowPastHistoryData | null> => {
  const url = `${HDFC_API_ENDPOINT}/cashflow/getCashflowPastUpdates`;
  try {
    const res: CashflowPastHistoryData = await getData(url, token, { reAssetId });
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [Cashflow-setup-pending]
export const isCashflowSetupPeningAPI = async (token: string, REAssetId: number): Promise<IsCashflowSetupResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/cashflow/isCashflowSetup${getParams({ REAssetId })}`;
  try {
    const res: IsCashflowSetupResponse = await getData(url, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion


//#region [Check Cashflow Details Exist]
export const checkCashflowDetailExistAPI = async (
  token: string,
  REAssetId: number,
  Type: string,
  MisDate: string,
): Promise<CheckCashflowDetailsExistResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/cashflow/checkCashflowDetailExist${getParams({ REAssetId, Type, MisDate })}`;
  try {
    const res: CheckCashflowDetailsExistResponse = await getData(url, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [delete cashflow details]
export const deleteCashflowDetailsAPI = async (
  token: string,
  payload: DeleteCashflowDetailsPayload,
): Promise<DeleteCashflowDetailsResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/cashflow/deleteCashflowDetails`;
  try {
    const res: DeleteCashflowDetailsResponse = await postData(url, payload, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [update cashflow status]
export const updateCashflowStatusAPI = async (
  token: string,
  payload: UpdateCashflowStatusPayload,
): Promise<UpdateCashflowStatusResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/cashflow/updateCashflowStatus`;
  try {
    const res: UpdateCashflowStatusResponse = await postData(url, payload, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [download cashflow template]
export const downloadCashflowTemplateAPI = async (token: string, reAssetId: number, type: string) => {
  const url = `${HDFC_API_ENDPOINT}/cashflow/downloadCashFlowTemplate${getParams({ reAssetId, type })}`;
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


//#region [Upload Cashflow Actual-Plan Template]
export const uploadCashflowActualPlanTemplateAPI = async (
  token: string,
  payload: UploadCashflowTemplatePayload,
): Promise<UploadCashflowTemplateResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/cashflow/insertCashflowActualPlan`;
  try {
    const formData = new FormData();
    formData.append("reAssetId", String(payload.reAssetId));
    formData.append("clientName", payload.clientName);
    formData.append("projectName", payload.projectName);
    formData.append("entityName", payload.entityName);
    formData.append("misDate", payload.misDate);
    formData.append("remark", payload.remark);
    formData.append("file", payload.file);
    const res: UploadCashflowTemplateResponse = await postDataMultipart(url, formData, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [Upload Cashflow Projected-Plan Template]
export const uploadCashflowProjectedPlanTemplateAPI = async (
  token: string,
  payload: UploadCashflowTemplatePayload,
): Promise<UploadCashflowTemplateResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/cashflow/insertCashflowProjectedPlan`;
  try {
    const formData = new FormData();
    formData.append("reAssetId", String(payload.reAssetId));
    formData.append("clientName", payload.clientName);
    formData.append("projectName", payload.projectName);
    formData.append("entityName", payload.entityName);
    formData.append("misDate", payload.misDate);
    formData.append("remark", payload.remark);
    formData.append("file", payload.file);
    const res: UploadCashflowTemplateResponse = await postDataMultipart(url, formData, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [Cashflow Pending List]
export const getCashflowPendingAPI = async (token: string, reAssetId: number): Promise<CashflowPendingResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/cashflow/getCashflowPendingUpdates${getParams({ reAssetId})}`; 
  try {
    const res: CashflowPendingResponse = await getData(url, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [Can Setup cashflow]
export const canSetupCashflowAPI = async (token: string, type: string, reAssetid: number): Promise<CanSetupCashflowResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/cashflow/canSetupCashFlow${getParams({ reAssetid, type })}`;
  try {
    const res: CanSetupCashflowResponse = await getData(url, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [Upload Cashflow Underwritten Template]
export const uploadCashflowUnderwrittenSetupAPI = async (
  token: string,
  payload: UploadCashflowSetupTemplatePayload,
): Promise<UploadCashflowSetupTemplatePayload | null> => {
  const url = `${HDFC_API_ENDPOINT}/cashflow/insertCashflowUnderwritten`;
  try {
    const formData = new FormData();
    formData.append("reAssetId", String(payload.reAssetId));
    formData.append("clientName", payload.clientName);
    formData.append("projectName", payload.projectName);
    formData.append("entityName", payload.entityName);
    formData.append("misDate", payload.misDate);
    formData.append("remark", payload.remark);
    formData.append("file", payload.file);
    const res: UploadCashflowSetupTemplatePayload = await postDataMultipart(url, formData, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [Upload Cashflow Business-plan Template]
export const uploadCashflowBusinessPlanSetupAPI = async (
  token: string,
  payload: UploadCashflowSetupTemplatePayload,
): Promise<UploadCashflowSetupTemplatePayload | null> => {
  const url = `${HDFC_API_ENDPOINT}/cashflow/insertCashflowLatestBusinessPlan`;
  try {
    const formData = new FormData();
    formData.append("reAssetId", String(payload.reAssetId));
    formData.append("clientName", payload.clientName);
    formData.append("projectName", payload.projectName);
    formData.append("entityName", payload.entityName);
    formData.append("misDate", payload.misDate);
    formData.append("remark", payload.remark);
    formData.append("file", payload.file);
    const res: UploadCashflowSetupTemplatePayload = await postDataMultipart(url, formData, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion


//#region [Cashflow Pending List]
export const getCashflowSetupPendingUpdatesAPI = async (token: string, reAssetId: number): Promise<CashflowSetupPendingListResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/cashflow/getCashflowSetupPendingUpdates${getParams({ reAssetId})}`; 
  try {
    const res: CashflowSetupPendingListResponse = await getData(url, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [Cashflow-setup-update]
export const getCashflowSetupPastUpdatesAPI = async (token: string, reAssetId: number): Promise<CashflowSetupPastUpdatesData | null> => {
  const url = `${HDFC_API_ENDPOINT}/cashflow/getCashflowSetupPastUpdates${getParams({ reAssetId})}`;
  try {
    const res: CashflowSetupPastUpdatesData = await getData(url, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

