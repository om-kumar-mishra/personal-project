import FileSaver from "file-saver";
import { HDFC_API_ENDPOINT, getData, getParams, postData, postDataMultipart } from "../../../../api/commons";
import {
  ApprovalDropDownResponse,
  ApprovalPastHistoryResponse,
  PendingConstructionApprovalDocumentsResponse,
  UpdateApprovalStatusPayload,
  UpdateApprovalStatusResponse,
  UploadConstructionApprovalDocumentsPayload,
  UploadConstructionApprovalDocumentsResponse,
} from "./dataTypes";


//############################################# Approval Past History  ########################################################//

//#region [Construction-Approval Past History]
export const getApprovalPastHistoryAPI = async (token: string, reAssetId: number, createdBy: string): Promise<ApprovalPastHistoryResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/construction/getPastConstructionApprovalDocuments${getParams({ reAssetId, createdBy })}`;
  try {
    const res: ApprovalPastHistoryResponse = await getData(url, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [update Approval status]
export const updateApprovalStatusAPI = async (
  token: string,
  payload: UpdateApprovalStatusPayload,
): Promise<UpdateApprovalStatusResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/construction/updateConstructionApprovalDocumentStatus`;
  try {
    const res: UpdateApprovalStatusResponse = await postData(url, payload, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [Construction-Approval-list]
export const getPendingConstructionApprovalDocumentsAPI = async (token: string, reAssetId: number, createdBy: string): Promise<PendingConstructionApprovalDocumentsResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/construction/getPendingConstructionApprovalDocuments${getParams({ reAssetId, createdBy })}`;
  try {
    const res: PendingConstructionApprovalDocumentsResponse = await getData(url, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [Upload Construction Approval Documents]
export const uploadConstructionApprovalDocumentsAPI = async (
  token: string,
  payload: UploadConstructionApprovalDocumentsPayload,
): Promise<UploadConstructionApprovalDocumentsResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/construction/insertConstructionApprovalDocuments`;
  console.log("Payload", payload.files);
  try {
    const formData = new FormData();
    formData.append("files", payload.files);
    // formData.append("files", String(payload.files));
    formData.append("reassetId", String(payload.reassetId));
    formData.append("CreatedBy", String(payload.CreatedBy));
    formData.append("entityName", String(payload.entityName));
    formData.append("role", String(payload.role));
    formData.append("data", String(JSON.stringify(payload.data)));
    formData.append("MISDate", String(payload.MISDate));
    const res: UploadConstructionApprovalDocumentsResponse = await postDataMultipart(url, formData, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [Construction-Approval-list]
export const getApprovalDropDownAPI = async (token: string, REAssetId: number, CreatedBy: string): Promise<ApprovalDropDownResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/construction/getConstructionApprovals${getParams({ REAssetId, CreatedBy })}`;
  try {
    const res: ApprovalDropDownResponse = await getData(url, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion


















