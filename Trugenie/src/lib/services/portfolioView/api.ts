import { API_ENDPOINT, API_ENDPOINT_MAIN, postData } from "../../api/commons";
import { PortfolioSummaryList, SalesPerformanceFilters, SalesPerformanceList } from "./dataTypes";

//#region [Get portfolio summary List]
export const getPortfolioSummaryListAPI = async (
  token: string,
  clientID: string,
  emailID: string,
  fundId: string,
  summaryAsOn: string,
  developerId: string,
  region: string,
  exitTimeline: string,
) => {
  const data = {
    clientID,
    emailID,
    fundId,
    summaryAsOn,
    developerId,
    region,
    exitTimeline,
  };
  try {
    const url = `${API_ENDPOINT_MAIN}/investmentSummary/getPortFolioSummary`;
    const res: any = await postData(url, data, token);
    return res;
  } catch (error) {
    console.log(`Error while fetching list: ${error}`);
    return null;
  }
};
// investement performance filters
export const getInvestementPerformanceFiltersListAPI = async (token: string, clientId: string) => {
  const data = {
    clientId,
  };
  try {
    const url = `${API_ENDPOINT_MAIN}/investmentSummary/getInvestmentFilters`;
    const res: any = await postData(url, data, token);
    return res;
  } catch (error) {
    console.log(`Error while fetching filter list: ${error}`);
    return null;
  }
};
// sales performance filters
export const getSalesPerformanceFiltersAPI = async (token: string, clientId: number) => {
  const data = {
    clientId,
  };
  try {
    // here name of end point is getPortfolioFilters but it works for sales performance filters
    const url = `${API_ENDPOINT_MAIN}/investmentSummary/getPortfolioFilters`;
    const res: any = await postData(url, data, token);
    return res;
  } catch (error) {
    console.log(`Error while fetching filter list: ${error}`);
    return null;
  }
};
// sales performance LIST
export const getSalesPerformanceListAPI = async (
  token: string,
  clientId: number,
  developerType: string,
  fund: string,
  developer: string,
  region: string,
  location: string,
  startDate: string,
  endDate: string,
) => {
  const data = {
    clientId,
    developerType,
    fund,
    developer,
    region,
    location,
    startDate,
    endDate,
  };
  try {
    const url = `${API_ENDPOINT_MAIN}/investmentSummary/getSalePerformanceData`;
    const res: any = await postData(url, data, token);
    return res;
  } catch (error) {
    console.log(`Error while fetching filter list: ${error}`);
    return null;
  }
};
