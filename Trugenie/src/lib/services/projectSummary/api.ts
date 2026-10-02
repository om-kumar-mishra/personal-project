import { API_ENDPOINT_MAIN, postData } from "../../api/commons";

export const getSummaryDashboardDetailsV2 = async (reAssetId: string, misDate?: string, accessToken?: string): Promise<any | null> => {
  try {
    const url = `${API_ENDPOINT_MAIN}/resummary/getSummaryDashboardDetailsV2`;
    const data = { reAssetId, misDate };
    const res = await postData(url, data, accessToken);
    return res;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};

export const getSummaryDashboardFilterApi = async (reAssetId: string, accessToken?: string) => {
  try {
    const url = `${API_ENDPOINT_MAIN}/resummary/getSummaryFilters`;
    const data = { reAssetId };
    const res = await postData(url, data, accessToken);
    return res;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};
