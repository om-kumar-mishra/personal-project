import { API_ENDPOINT_MAIN, postData } from "../../api/commons";

export const getInvestmentDataApi = async (
  // clientID: string,
  emailID: string,
  investmentID: string,
  summaryAsOn: string,
  token: string,
): Promise<any | any | null> => {
  const params = {
    // clientID,
    emailID,
    investmentID,
    summaryAsOn,
  };
  try {
    const url = `${API_ENDPOINT_MAIN}/investmentSummary/getInvestmentPerformanceSummary`;
    const res = await postData(url, params, token);
    return res;
  } catch (error) {
    console.log(`Error while getting Investment Summary: ${error}`);
    return null;
  }
};

export const getInvestmentSummaryAsOnApi = async (investmentId: number, token: string): Promise<any | any | null> => {
  const params = {
    investmentId,
  };
  try {
    const url = `${API_ENDPOINT_MAIN}/investmentSummary/getInvestmentSummaryAsOnFilter`;
    const res = await postData(url, params, token);
    return res;
  } catch (error) {
    console.log(`Error while getting Investment Summary As on: ${error}`);
    return null;
  }
};
