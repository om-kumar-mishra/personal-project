import { CONSTRUCTION_DASHBOARD_ENDPOINT, postData } from "../../api/commons";
import { ApprovalDocumentsPayload, ConstructionDropDownPayload, ConstructionSummaryPayload } from "./dataType";

export const getConstructionSummaryApi = async (token: string, payload: ConstructionSummaryPayload) => {
  try {
    const url = `${CONSTRUCTION_DASHBOARD_ENDPOINT}/constructionDashboardData`;
    const res = await postData(url, payload, token);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
};

export const getConstructionDashboardDropDownDetails = async (token: string, payload: ConstructionDropDownPayload) => {
  try {
    const url = `${CONSTRUCTION_DASHBOARD_ENDPOINT}/constructionDashboardDropDownDetails`;
    const res = await postData(url, payload, token);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
};

export const getConstructionApprovalDocuments = async (token: string, payload: ApprovalDocumentsPayload) => {
  try {
    const url = `${CONSTRUCTION_DASHBOARD_ENDPOINT}/getApprovalDocuments`;
    const res = await postData(url, payload, token);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
};
