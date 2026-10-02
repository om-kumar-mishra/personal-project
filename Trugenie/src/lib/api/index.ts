import { stringNumber } from "../services/Datatype";
import { SalesDashboardDetailApiRequest, SalesDashboardDetailv2Payload, SalesDashboardFiscalYearApiRequest } from "../services/salesDashboard/dataTypes";
import { postData, API_ENDPOINT, API_ENDPOINT_MAIN } from "./commons";
import { GenerateTokenResponse } from "./types";

export const getClients = async (userEmail: string) => {
  try {
    const url = `${API_ENDPOINT}getClients`;
    const data = {
      userEmail: userEmail,
    };
    const res = await postData(url, data);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const downloadSummaryDashboardDoc = (
  containerName: string,
  filePath: string,
  fileName: string,
  download: boolean,
  token: string,
  type?: string,
  setLoader?: (params: boolean) => void
) => {
  const url = `${API_ENDPOINT_MAIN}/resummary/getSummaryDashboardDetails/files?containerName=${containerName}&filePath=${filePath}&fileName=${fileName}&type=${type}`;
  if (download) {
    setLoader && setLoader(true);
    // Download the file
    fetch(url, {
      method: "POST",
      // responseType: "blob", // typescrpitchanges
      headers: {
        // "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.blob();
        } else {
          throw new Error("Failed to download file");
        }
      })
      .then((blob) => {
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(blobUrl);
        setLoader && setLoader(false);
      })
      .catch((error) => {
        console.error(error);
        setLoader && setLoader(false);
      });
  }
};


export const downloadInvestmentDashboardDoc = (
  fileContainer: string,
  filePath: string,
  fileName: string,
  download: boolean,
  // visible: boolean,
  // setVisible: (params: boolean) => void
) => {
  const url = `http://localhost:8090/investmentSummary/getInvestmentPerformanceSummary/files?containerName=${fileContainer}&filePath=${filePath}&fileName=${fileName}`;
  if (download) {
    // Download the file
    fetch(url, {
      method: "POST",
      // responseType: "blob", // typescrpitchanges
      headers: {
        // "Content-Type": "application/json",
        Authorization: "",
      },
    })
      .then(response => {
        if (response.ok) {
          return response.blob();
        } else {
          alert("Bad Request");

          throw new Error("Failed to download file");
        }
      })
      .then(blob => {
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(blobUrl);
      })
      .catch(error => {
        console.error(error);
      });
  }
};

export const generateToken = async (emailId: string, oid: string): Promise<GenerateTokenResponse | null> => {
  try {
    const url = `${API_ENDPOINT_MAIN}token/generateToken`;
    const data = { emailId, oid };
    const res = await postData(url, data);
    res.then(resp => {
      if (resp?.status && resp.status !== 200) {
        alert("Try Again");
      }
    });
    return res;
  } catch (error: unknown) {
    console.log("generateToken", error);
    throw error;
  }
};

export const getDocFiles = (containerName: string, filePath: string, fileName: string, tokenLocal?: string, type?: string) => {
  const url = `${API_ENDPOINT_MAIN}/resummary/getSummaryDashboardDetails/files?containerName=${containerName}&filePath=${filePath}&fileName=${fileName}&type=${type}`;
  const res = fetch(url, {
    method: "POST",
    // responseType: "blob", typescrpitchanges
    headers: {
      Authorization: tokenLocal ? `Bearer ${tokenLocal}` : "",
    },
  });
  return res;
};

export const getSalesDashboardProjectNames = async (emailId: string, accessToken: string) => {
  try {
    const url = `${API_ENDPOINT_MAIN}/salesDashboard/getUserAssignedREAsset`;
    const data = { email: emailId };
    const res = await postData(url, data, accessToken);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getSalesDashboardUnitTypes = async (accessToken: string, reAssetId: stringNumber) => {
  try {
    const url = `${API_ENDPOINT_MAIN}/salesDashboard/getRESUnits`;
    const data = { reAssetId };
    const res = await postData(url, data, accessToken);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getSalesDashboardPhase = async (accessToken: string, reAssetId: stringNumber) => {
  try {
    const url = `${API_ENDPOINT_MAIN}/salesDashboard/getREPhase`;
    const data = { reAssetId };
    const res = await postData(url, data, accessToken);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getSalesDashboardTower = async (accessToken: string, reAssetId: stringNumber) => {
  try {
    const url = `${API_ENDPOINT_MAIN}/salesDashboard/getRETower`;
    const data = { reAssetId };
    const res = await postData(url, data, accessToken);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getSalesDashboardFiscalYear = async (accessToken: string, action: SalesDashboardFiscalYearApiRequest) => {
  try {
    const url = `${API_ENDPOINT_MAIN}/salesDashboard/getFiscalYear`;
    const data = action.request;
    const res = await postData(url, data, accessToken);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getSalesDashboardDetails = async (accessToken: string, action: SalesDashboardDetailApiRequest) => {
  try {
    const url = `${API_ENDPOINT_MAIN}/salesDashboard/getSalesDashboardDetails`;
    const data = action.request;
    const res = await postData(url, data, accessToken);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getSalesDashboardDetailsv2 = async (accessToken, action: SalesDashboardDetailApiRequest) => {
  try {
    const url = `${API_ENDPOINT_MAIN}/salesDashboard/getSalesDashboardv2Details`;
    const data = action.request;
    const res = await postData(url, data, accessToken);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getSalesMisHistory = async (accessToken, reAssetId: stringNumber) => {
  try {
    const url = `${API_ENDPOINT_MAIN}/salesDashboard/getSalesMisHistory`;
    const data = { reAssetId };
    const res = await postData(url, data, accessToken);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getREProjectType = async (accessToken: string, reAssetId: stringNumber) => {
  try {
    const url = `${API_ENDPOINT_MAIN}/salesDashboard/getREProjectType`;
    const data = { reAssetId };
    const res = await postData(url, data, accessToken);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getREProjectSubType = async (accessToken: string, request: SalesDashboardDetailv2Payload) => {
  try {
    const url = `${API_ENDPOINT_MAIN}/salesDashboard/getREProjectSubType`;
    const data = {
      reAssetId: request.reAssetId,
      projectType: request.projectType,
      projectSubType: request.projectSubType,
      phase: request.phase,
    };
    const res = await postData(url, data, accessToken);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getREUnitStatus = async (accessToken: string, request: SalesDashboardDetailv2Payload) => {
  try {
    const url = `${API_ENDPOINT_MAIN}/salesDashboard/getREUnitStatus`;
    const data = {
      reAssetId: request.reAssetId,
      statusType: request.statusType,
    };
    const res = await postData(url, data, accessToken);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getRETowerV2 = async (accessToken: string, request: SalesDashboardDetailv2Payload) => {
  try {
    const url = `${API_ENDPOINT_MAIN}/salesDashboard/getRETowerV2`;
    const data = {
      reAssetId: request.reAssetId,
      projectType: request.projectType,
      projectSubType: request.projectSubType,
      phase: request.phase,
    };
    const res = await postData(url, data, accessToken);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getREWingV2 = async (accessToken: string, request: SalesDashboardDetailv2Payload) => {
  try {
    const url = `${API_ENDPOINT_MAIN}/salesDashboard/getREWingV2`;
    const data = {
      reAssetId: request.reAssetId,
      projectType: request.projectType,
      projectSubType: request.projectSubType,
      phase: request.phase,
      unitLocationSubTypeName: request.unitLocationSubTypeName,
    };
    const res = await postData(url, data, accessToken);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getREUnitOwnedBy = async (accessToken: string, request: SalesDashboardDetailv2Payload) => {
  try {
    const url = `${API_ENDPOINT_MAIN}/salesDashboard/getREUnitOwnedBy`;
    const data = {
      reAssetId: request.reAssetId,
      projectType: request.projectType,
      projectSubType: request.projectSubType,
      phase: request.phase,
      unitLocationSubTypeName: request.unitLocationSubTypeName,
      wing: request.wing,
    };
    const res = await postData(url, data, accessToken);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getCovenantSummaryClauses = async (payload: any) => {
  try {
    const url = `${API_ENDPOINT}getCovenantSummaryClauses`;
    const data = { ...payload };
    const res = await postData(url, data);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getCovenantSummaryDetail = async (payload: any) => {
  try {
    const url = `${API_ENDPOINT}getCovenantSummaryDetail`;
    const data = { ...payload };
    const res = await postData(url, data);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getCovenantHistory = async (payload: any) => {
  try {
    const url = `${API_ENDPOINT}getCovenantHistory`;
    const data = { ...payload };
    const res = await postData(url, data);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getCovenantLogs = async (payload: any) => {
  try {
    const url = `${API_ENDPOINT}getCovenantLogs`;
    const data = { ...payload };
    const res = await postData(url, data);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getCovenantSummaryAreaDetail = async (payload: any) => {
  try {
    const url = `${API_ENDPOINT}getCovenantSummaryAreaDetail`;
    const data = { ...payload };
    const res = await postData(url, data);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
