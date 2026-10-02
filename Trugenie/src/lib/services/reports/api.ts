import FileSaver from "file-saver";
import { HDFC_API_ENDPOINT, getData, getFileBlob, getParams, postData } from "../../api/commons";
import {
  AdminReportResponse,
  AllNOCReportResponse,
  ApplicationMasterResponse,
  IssuedNOCReportResponse,
  LoginReportResponse,
  PopulationReportResponse,
  RoleRightReportResponse,
} from "./dataTypes";

// Report Entity
// Population Report
export const getPopulationReportAPI = async (token: string) => {
  const url = `${HDFC_API_ENDPOINT}/entity/getPopulationReport`;
  try {
    const res: PopulationReportResponse = await getData(url, token);
    return res;
  } catch (error: unknown) {
    console.log(`Error ${error} while calling URL : ${url}`);
    return null;
  }
};

export const exportPopulationReportAPI = async (token: string) => {
  const url = `${HDFC_API_ENDPOINT}/entity/exportPopulationReport`;
  try {
    const { fileName, data } = await getFileBlob(url, token);
    if (fileName && data) {
      FileSaver.saveAs(data, fileName !== undefined ? fileName : "export.xls");
      return { fileName, data };
    } else {
      return null;
    }
  } catch (error: unknown) {
    console.log(`Error ${error} while calling URL : ${url}`);
    return null;
  }
};

// Admin Report
export const getAdminReportAPI = async (token: string, data: object) => {
  const url = `${HDFC_API_ENDPOINT}/entity/getAdminReport`;
  try {
    const res: AdminReportResponse = await getData(url, token, data);
    return res;
  } catch (error: unknown) {
    console.log(`Error ${error} while calling URL : ${url}`);
    return null;
  }
};

export const exportAdminReportAPI = async (token: string, startDate: string, endDate: string) => {
  const url = `${HDFC_API_ENDPOINT}/entity/exportAdminReport?startDate=${startDate}&endDate=${endDate}`;
  try {
    const { fileName, data } = await getFileBlob(url, token);
    if (fileName && data) {
      FileSaver.saveAs(data, fileName !== undefined ? fileName : "export.xls");
      return { fileName, data };
    } else {
      return null;
    }
  } catch (error: unknown) {
    console.log(`Error ${error} while calling URL : ${url}`);
    return null;
  }
};

// Login Report
export const getLoginReportAPI = async (token: string, data: object) => {
  const url = `${HDFC_API_ENDPOINT}/entity/getLoginReport`;
  try {
    const res: LoginReportResponse = await getData(url, token, data);
    return res;
  } catch (error: unknown) {
    console.log(`Error ${error} while calling URL : ${url}`);
    return null;
  }
};

export const exportLoginReportAPI = async (token: string, startDate: string, endDate: string) => {
  const url = `${HDFC_API_ENDPOINT}/entity/exportLoginReport${getParams({ startDate, endDate })}`;
  try {
    const { fileName, data } = await getFileBlob(url, token);
    if (fileName && data) {
      FileSaver.saveAs(data, fileName !== undefined ? fileName : "export.xls");
      return { fileName, data };
    } else {
      return null;
    }
  } catch (error: unknown) {
    console.log(`Error ${error} while calling URL : ${url}`);
    return null;
  }
};

// Role-right Report
export const getRoleRightReportAPI = async (token: string) => {
  const url = `${HDFC_API_ENDPOINT}/entity/getRoleRightsReport`;
  try {
    const res: RoleRightReportResponse = await getData(url, token);
    return res;
  } catch (error: unknown) {
    console.log(`Error ${error} while calling URL : ${url}`);
    return null;
  }
};

export const exportRoleRightReportAPI = async (token: string) => {
  const url = `${HDFC_API_ENDPOINT}/entity/exportRoleRightsReport`;
  try {
    const { fileName, data } = await getFileBlob(url, token);
    if (fileName && data) {
      FileSaver.saveAs(data, fileName !== undefined ? fileName : "export.xls");
      return { fileName, data };
    } else {
      return null;
    }
  } catch (error: unknown) {
    console.log(`Error ${error} while calling URL : ${url}`);
    return null;
  }
};

//#region [Get Application Master API]
export const getApplicationMasterAPI = async (token: string, createdby: string) => {
  try {
    const url = `${HDFC_API_ENDPOINT}/users/getApplicationMaster`;
    const res: ApplicationMasterResponse = await postData(url, { createdby }, token);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
};
//#endregion [Get Application Master]

//#region [Update Application Master API]
export const updateApplicationMasterAPI = async (value: number, token: string): Promise<any | null> => {
  const url = `${HDFC_API_ENDPOINT}/users/updateApplicationMaster${getParams({ value })}`;

  try {
    const res: any | null = await postData(url, undefined, token);
    return res;
  } catch (error: unknown) {
    console.log(`Error: ${error}`);
    return null;
  }
};
//#endregion [Update Application Master]

// Issued NOC Report
export const getIssuedNOCReportAPI = async (
  token: string,
  REAssetId: number,
  startDate?: string,
  endDate?: string,
): Promise<IssuedNOCReportResponse | null> => {
  const params = {
    REAssetId,
    startDate,
    endDate,
  };
  const url = `${HDFC_API_ENDPOINT}/noc/report/getNocIssuedReport${getParams(params)}`;
  try {
    // const res: IssuedNOCReportResponse | null = await getData(url, token, { REAssetId, startDate, endDate });
    const res: IssuedNOCReportResponse | null = await getData(url, token);
    return res;
  } catch (error: unknown) {
    console.log(`Error ${error} while calling URL : ${url}`);
    return null;
  }
};

// Export Issued NOC Report
export const exportIssuedNOCReportAPI = async (token: string, REAssetId: number, startDate?: string, endDate?: string) => {
  const params = {
    REAssetId,
    startDate,
    endDate,
  };
  const url = `${HDFC_API_ENDPOINT}/noc/report/exportNocIssuedReport${getParams(params)}`;
  try {
    const { fileName, data } = await getFileBlob(url, token);
    if (fileName && data) {
      FileSaver.saveAs(data, fileName !== undefined ? fileName : "export.xls");
      return { fileName, data };
    } else {
      return null;
    }
  } catch (error: unknown) {
    console.log(`Error ${error} while calling URL : ${url}`);
    return null;
  }
};

// All NOC Report
export const getAllNOCReportAPI = async (token: string, REAssetId: number, startDate?: string, endDate?: string): Promise<AllNOCReportResponse | null> => {
  const params = {
    REAssetId,
    startDate,
    endDate,
  };
  const url = `${HDFC_API_ENDPOINT}/noc/report/getAllNocReport${getParams(params)}`;
  try {
    const res: AllNOCReportResponse | null = await getData(url, token);
    return res;
  } catch (error: unknown) {
    console.log(`Error ${error} while calling URL : ${url}`);
    return null;
  }
};

// Export All NOC Report
export const exportAllNOCReportAPI = async (token: string, REAssetId: number, startDate?: string, endDate?: string) => {
  const params = {
    REAssetId,
    startDate,
    endDate,
  };
  const url = `${HDFC_API_ENDPOINT}/noc/report/exportAllNocReport${getParams(params)}`;
  try {
    const { fileName, data } = await getFileBlob(url, token);
    if (fileName && data) {
      FileSaver.saveAs(data, fileName !== undefined ? fileName : "export.xls");
      return { fileName, data };
    } else {
      return null;
    }
  } catch (error: unknown) {
    console.log(`Error ${error} while calling URL : ${url}`);
    return null;
  }
};
