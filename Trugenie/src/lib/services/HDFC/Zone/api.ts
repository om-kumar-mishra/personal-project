import { HDFC_API_ENDPOINT, postData } from "../../../api/commons";

export const getZonesListAPI = async (token: string, client: number, createdBy: string) => {
  try {
    const url = `${HDFC_API_ENDPOINT}/entity/getZones`;
    const res = await postData(url, { client, createdBy }, token);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
};

export const addZoneAPI = async (token: string, client: number, zonename: string, createdBy: string) => {
  try {
    const url = `${HDFC_API_ENDPOINT}/entity/addZone`;
    const res = await postData(url, { client, zonename, createdBy }, token);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
};

export const deleteZoneAPI = async (token: string, zoneId: number, createdBy: string) => {
  try {
    const url = `${HDFC_API_ENDPOINT}/entity/removeZone`;
    const res = await postData(url, { createdBy, zoneId }, token);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
};

export const updateZoneAPI = async (token: string, zonename: string, zoneId: number, createdBy: string) => {
  try {
    const url = `${HDFC_API_ENDPOINT}/entity/updateZone`;
    const res = await postData(url, { createdBy, zoneId, zonename }, token);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
};
