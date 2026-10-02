import FileSaver from "file-saver";
import { HDFC_API_ENDPOINT, getData, getFileBlob, getParams, postData, postDataMultipart, postDownloadFileWithSign } from "../../../api/commons";
import { NOCRemarksPayload, NOCRequestRemarksPayload, NOCRequestTimelinePayload, NocDeveloperDocRefPayload, nocAuthororizeRequest } from "./dataTypes";

export const getApprovedNocRequestAPI = async (token: string, nocProjectId: number, userEmail: string) => {
  try {
    const url = `${HDFC_API_ENDPOINT}/noc/request/getApprovedNocRequest${getParams({ nocProjectId, userEmail })}`;
    const res = await getData(url, token);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
};

export const getCancelledNocRequestAPI = async (token: string, nocProjectId: number, userEmail: string) => {
  try {
    const url = `${HDFC_API_ENDPOINT}/noc/request/getCancelledNocRequest${getParams({ nocProjectId, userEmail })}`;
    const res = await getData(url, token);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
};

export const getPendingNocRequestAPI = async (token: string, projectId: number, showMineOnly: number, userEmail: string) => {
  try {
    const url = `${HDFC_API_ENDPOINT}/noc/request/getPendingNOCRequest${getParams({ projectId, showMineOnly, userEmail })}`;
    const res = await getData(url, token);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
};

export const getRejectedNocRequestAPI = async (token: string, nocProjectId: number, userEmail: string) => {
  try {
    const url = `${HDFC_API_ENDPOINT}/noc/request/getRejectNocRequest${getParams({ nocProjectId, userEmail })}`;
    const res = await getData(url, token);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
};

export const getHoldNocRequestAPI = async (token: string, projectId: number, showMineOnly: number, userEmail: string) => {
  try {
    const url = `${HDFC_API_ENDPOINT}/noc/request/getHoldNocRequest${getParams({ projectId, showMineOnly, userEmail })}`;
    const res = await getData(url, token);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
};

export const getNocProjectDetailsAPI = async (token: string, nocProjectId: number, userEmail: string) => {
  try {
    const url = `${HDFC_API_ENDPOINT}/noc/request/getNocProjectDetail${getParams({ nocProjectId, userEmail })}`;
    const res = await getData(url, token);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
};

export const downloadRejectedNocAPI = async (token: string, nocProjectId: number, userEmail: string) => {
  try {
    const url = `${HDFC_API_ENDPOINT}/noc/request/downloadRejectNocRequest${getParams({ nocProjectId, userEmail })}`;
    const { fileName, data } = await getFileBlob(url, token);
    if (fileName && data) {
      FileSaver.saveAs(data, fileName !== undefined ? fileName : "export.xls");
      return { fileName, data };
    } else {
      return null;
    }
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
};

export const downloadPendingNocAPI = async (token: string, projectId: number, showMineOnly: number, userEmail: string) => {
  try {
    const url = `${HDFC_API_ENDPOINT}/noc/request/downloadPendingNOCRequest${getParams({ projectId, showMineOnly, userEmail })}`;
    const { fileName, data } = await getFileBlob(url, token);
    if (fileName && data) {
      FileSaver.saveAs(data, fileName !== undefined ? fileName : "export.xls");
      return { fileName, data };
    } else {
      return null;
    }
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
};

export const downloadApprovedNocAPI = async (token: string, nocProjectId: number, userEmail: string) => {
  try {
    const url = `${HDFC_API_ENDPOINT}/noc/request/downloadApprovedNocRequest${getParams({ nocProjectId, userEmail })}`;
    const { fileName, data } = await getFileBlob(url, token);
    if (fileName && data) {
      FileSaver.saveAs(data, fileName !== undefined ? fileName : "export.xls");
      return { fileName, data };
    } else {
      return null;
    }
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
};

export const downloadCancelledNocAPI = async (token: string, nocProjectId: number, userEmail: string) => {
  try {
    const url = `${HDFC_API_ENDPOINT}/noc/request/downloadCancelledNocRequest${getParams({ nocProjectId, userEmail })}`;
    const { fileName, data } = await getFileBlob(url, token);
    if (fileName && data) {
      FileSaver.saveAs(data, fileName !== undefined ? fileName : "export.xls");
      return { fileName, data };
    } else {
      return null;
    }
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
};

export const downloadHoldNocAPI = async (token: string, projectId: number, showMineOnly: number, userEmail: string) => {
  try {
    const url = `${HDFC_API_ENDPOINT}/noc/request/downloadHoldNocRequest${getParams({ projectId, showMineOnly, userEmail })}`;
    const { fileName, data } = await getFileBlob(url, token);
    if (fileName && data) {
      FileSaver.saveAs(data, fileName !== undefined ? fileName : "export.xls");
      return { fileName, data };
    } else {
      return null;
    }
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
};

export const downloadNocSummaryAPI = async (token: string, nocProjectId: number, reAssetId: number) => {
  try {
    const url = `${HDFC_API_ENDPOINT}/noc/request/downloadNOCSummary${getParams({ nocProjectId, reAssetId })}`;
    const { fileName, data } = await getFileBlob(url, token);
    if (fileName && data) {
      FileSaver.saveAs(data, fileName !== undefined ? fileName : "export.xls");
      return { fileName, data };
    } else {
      return null;
    }
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
};

export const getNocPaymentDetailsAPI = async (token: string, nocRequestId: number) => {
  try {
    const url = `${HDFC_API_ENDPOINT}/noc/request/getNocRequestUnitPaymentDetails${getParams({ nocRequestId })}`;
    const res = await getData(url, token);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
};

export const submitNocPaymentAPI = async (token: string, nocProjectId: number, status: string) => {
  try {
    const url = `${HDFC_API_ENDPOINT}/noc/request/updateNocPaymentStatus`;
    const res = await postData(url, { nocProjectId, status }, token);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
};

export const getNocRemarksAPI = async (token: string, nocRequestId: number) => {
  try {
    const url = `${HDFC_API_ENDPOINT}/noc/request/getNocLenderHoldRemarks${getParams({ nocRequestId })}`;
    const res = await getData(url, token);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
};

export const submitNocRemarksAPI = async (token: string, payload: NOCRemarksPayload) => {
  try {
    const formData = new FormData();
    Object.entries(payload)?.forEach(([key, data]) => data && formData.append(key, Array.isArray(data.toString) ? (JSON.stringify(data) as any) : data));
    const url = `${HDFC_API_ENDPOINT}/noc/request/insertNocHoldProjectDetails`;
    const res = await postDataMultipart(url, formData, token);

    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
};

export const getNocDocumentsAPI = async (token: string, nocProjectId: number) => {
  try {
    const url = `${HDFC_API_ENDPOINT}/noc/request/getNocDocuments${getParams({ nocRequestId: nocProjectId })}`;
    const res = await getData(url, token);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
};

export const getNOCDecisionData = async (token: string, nocRequestId: number, email: string) => {
  try {
    const url = `${HDFC_API_ENDPOINT}/noc/request/getNocRequestDetail${getParams({ nocRequestId, email })}`;
    const res = await getData(url, token);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
};

export const getNOCPriceHeadersData = async (token: string, nocProjectId: number, salesId: number, nocrequestid: number) => {
  try {
    const url = `${HDFC_API_ENDPOINT}/noc/external/getNOCPriceHeaders${getParams({ nocProjectId, salesId, nocrequestid })}`;
    const res = await getData(url, token);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
};

export const getSendBackUsers = async (token: string, nocProjectId: number, nocrequestid: number, useremail: string) => {
  try {
    const url = `${HDFC_API_ENDPOINT}/noc/request/getSendBackUsers${getParams({ nocProjectId, nocrequestid, useremail })}`;
    const res = await getData(url, token);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
};

export const getNOCLetter = async (
  token: string,
  nocProjectId: number,
  letterType: string,
  email: string,
  req?: string,
  nocRequestId?: number,
  sign?: File,
) => {
  try {
    const url = `${HDFC_API_ENDPOINT}/noc/getSignedNOCLetter`;
    const formData = new FormData();
    sign && formData.append("signImage", sign);
    req && formData.append("req", req);
    formData.append("nocProjectId", String(nocProjectId));
    formData.append("letterType", String(letterType));
    formData.append("email", String(email));
    formData.append("nocRequestId", String(nocRequestId));
    const res = await postDownloadFileWithSign(url, formData, token);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
};

export const authorizeNoc = async (token: string, payloadData: nocAuthororizeRequest): Promise<any | null> => {
  const url = `${HDFC_API_ENDPOINT}/noc/request/authorizeNoc`;
  try {
    const formData = new FormData();
    Object.entries(payloadData)?.forEach(([key, data]) => data && formData.append(key, Array.isArray(data) ? JSON.stringify(data) : data));
    const res = await postDataMultipart(url, formData, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};

// send noc authorize
export const authorizeNocNew = async (token: string, projectid?: number, requestid?: number, status?: string): Promise<any | null> => {
  const url = `${HDFC_API_ENDPOINT}/noc/request/cancelNoc${getParams({ projectid, requestid, status })}`;
  try {
    const res = await getData(url, token);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
};

export const getNOCRequestRemarks = async (token: string, payload: NOCRequestRemarksPayload) => {
  try {
    const url = `${HDFC_API_ENDPOINT}/noc/request/getNOCRequestRemarks`;
    const res = await postData(url, payload, token);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
};

export const getNOCRequestTimeline = async (token: string, payload: NOCRequestTimelinePayload) => {
  try {
    const url = `${HDFC_API_ENDPOINT}/noc/request/getNOCRequestTimeline`;
    const res = await postData(url, payload, token);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
};

export const getNocRequestChangeHistory = async (token: string, nocRequestId: number, email: string) => {
  try {
    const url = `${HDFC_API_ENDPOINT}/noc/request/getNocRequestChangeHistory${getParams({ nocRequestId, email })}`;
    const res = await getData(url, token);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
};

export const getDeveloperDocRef = async (token: string, payload: NocDeveloperDocRefPayload) => {
  try {
    const url = `${HDFC_API_ENDPOINT}/noc/request/getDeveloperDocRef`;
    const res = await postData(url, payload, token);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
};
