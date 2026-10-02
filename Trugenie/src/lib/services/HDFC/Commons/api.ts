import FileSaver from "file-saver";
import { HDFC_API_ENDPOINT, postData, postDataMultipart, postDownloadFileWithSign } from "../../../api/commons";
import { ValidateExcelPayload, ValidateExcelResponse } from "./dataTypes";

export const getRMUsersAPI = async (token: string, createdby: string) => {
  try {
    const url = `${HDFC_API_ENDPOINT}/entity/getRMUsers`;
    const res = await postData(url, { createdby }, token);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
};

export const getTaggedRMUsers = async (token: string, developerId: number, createdby: string) => {
  try {
    const url = `${HDFC_API_ENDPOINT}/entity/getCustomerTaggedRMUsers`;
    const res = await postData(url, { developerId, createdby }, token);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
};

//#region [validate Excel file]
export const validateExcelFileApi = async (token: string, payload: ValidateExcelPayload): Promise<ValidateExcelResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/validation/validateExcel`;
  try {
    const formData = new FormData();
    formData.append("module", payload.module);
    payload.file && formData.append("file", payload.file);
    formData.append("type", payload.type);
    formData.append("clientId", String(payload.clientId));
    formData.append("investmentId", String(payload.investmentId));
    formData.append("reassetId", String(payload.reassetId));
    const res: ValidateExcelResponse = await postDataMultipart(url, formData, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [Download Excel Error File]
export const downloadExcelErrorFileAPI = async (token: string, payload: ValidateExcelPayload) => {
  const url = `${HDFC_API_ENDPOINT}/validation/downloadErrorExcel`;
  try {
    const formData = new FormData();
    formData.append("module", payload.module);
    payload.file && formData.append("file", payload.file);
    formData.append("type", payload.type);
    formData.append("clientId", String(payload.clientId));
    formData.append("investmentId", String(payload.investmentId));
    formData.append("reassetId", String(payload.reassetId));
    const { fileName, data } = await postDownloadFileWithSign(url, formData, token);
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

//#region [get switch client list]
export const getUserClientAccessV2 = async (token: string, userId: number) => {
  try {
    const url = `${HDFC_API_ENDPOINT}/users/getUserClientAccessV2?userId=${userId}`;
    const res = await postData(url, {}, token);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
};
//#endregion
