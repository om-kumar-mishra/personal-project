import { HDFC_API_ENDPOINT, postData } from "../../../api/commons";

export const getRegionListAPI = async (
    token: string,
    client: number,
    createdBy: string
) => {
    try {
        const url = `${HDFC_API_ENDPOINT}/entity/getRegions`;
        const res = await postData(url, { client, createdBy }, token);
        return res;
    } catch (error) {
        console.log(`Error: ${error}`);
        return null;
    }
};

export const addRegionAPI = async (
    token: string,
    client: number,
    regionName: string,
    createdBy: string,
    zoneID: number,
) => {
    try {
        const url = `${HDFC_API_ENDPOINT}/entity/addRegion`;
        const res = await postData(url, { client, regionName, createdBy, zoneID }, token);
        return res;
    } catch (error) {
        console.log(`Error: ${error}`);
        return null;
    }
};


export const deleteRegionAPI = async (
    token: string,
    regionId: number,
    createdBy: string
) => {
    try {
        const url = `${HDFC_API_ENDPOINT}/entity/removeRegion`;
        const res = await postData(url, { regionId, createdBy }, token);
        return res;
    } catch (error) {
        console.log(`Error: ${error}`);
        return null;
    }
};

