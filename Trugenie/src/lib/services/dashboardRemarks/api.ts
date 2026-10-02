import { DASHBOARD_REMARK_ENDPOINT, postData } from "../../api/commons";
import { GetDashboardRemarkPayload, InsertDashboardRemarkPayload } from "./dataType";

export const insertDashboardRemarkApi = async (token: string, payload: InsertDashboardRemarkPayload) => {
  try {
    const url = `${DASHBOARD_REMARK_ENDPOINT}/insertDashboardRemark`;
    const res = await postData(url, payload, token);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
};

export const getDashboardRemarkApi = async (token: string, payload: GetDashboardRemarkPayload) => {
  try {
    const url = `${DASHBOARD_REMARK_ENDPOINT}/getDashboardRemark`;
    const res = await postData(url, payload, token);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
};
