import { HDFC_API_ENDPOINT, postData, getData } from "../../../api/commons";

export const getDeveloperLocationListAPI = async (
    token: string,
    clientId: number,
    createdBy: string
) => {
    try {
        const url = `${HDFC_API_ENDPOINT}/entity/getDeveloperLocation?clientId=${clientId}&createdBy=${createdBy}`;
        const res = await getData(url, token);
        return res;
    } catch (error) {
        console.log(`Error: ${error}`);
        return null;
    }
};

export const addDeveloperLocationAPI = async (
    token: string,
    clientId: number,
    CreatedBy: string,
    developerLocationName: string,
) => {
    try {
        const url = `${HDFC_API_ENDPOINT}/entity/insertDeveloperLocation`;
        const res = await postData(url, { clientId, developerLocationName, CreatedBy }, token);
        return res;
    } catch (error) {
        console.log(`Error: ${error}`);
        return null;
    }
};

export const DeleteDeveloperLocationAPI = async (
    token: string,
    developerLocationId: number,
    createdBy: string,
    clientId:number
) => {
    try {
        const url = `${HDFC_API_ENDPOINT}/entity/deleteDeveloperLocation`;
        const res = await postData(url, { developerLocationId, createdBy, clientId }, token);
        return res;
    } catch (error) {
        console.log(`Error: ${error}`);
        return null;
    }
};
