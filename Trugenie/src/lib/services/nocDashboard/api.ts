import { NOC_DASHBOARD_ENDPOINT, postData } from "../../api/commons";
import { NocDashboardPayloadType } from "./datatypes";

export const getREWing = async (accessToken: string, reAssetId: number) => {
  try {
    const url = `${NOC_DASHBOARD_ENDPOINT}/getREWing`;
    const data = { reAssetId };
    const res = await postData(url, data, accessToken);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getNOCDashboardDetails = async (
  accessToken: string,
  payload: NocDashboardPayloadType
) => {
  try {
    const url = `${NOC_DASHBOARD_ENDPOINT}/getNOCDashboardDetails`;
    const res = await postData(url, payload, accessToken);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getNOCDashboardTowerView = async (
  accessToken: string,
  payload: NocDashboardPayloadType
) => {
  try {
    const url = `${NOC_DASHBOARD_ENDPOINT}/getNOCDashboardTowerView`;
    const res = await postData(url, payload, accessToken);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
