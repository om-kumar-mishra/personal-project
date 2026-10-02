import { HDFC_API_ENDPOINT, postData } from "../../../api/commons";

export const getLocationListAPI = async (
    token: string,
    client: number,
    createdBy: string
) => {
    try {
        const url = `${HDFC_API_ENDPOINT}/entity/getLocations`;
        const res = await postData(url, { client, createdBy }, token);
        return res;
    } catch (error) {
        console.log(`Error: ${error}`);
        return null;
    }
};

export const addLocationAPI = async (
    token: string,
    clientId: number,
    zoneid: number,
    CreatedBy: string,
    locationsName: string,
    regionId: number,
) => {
    try {
        const url = `${HDFC_API_ENDPOINT}/entity/addLocation`;
        const res = await postData(url, { clientId, regionId, locationsName, CreatedBy, zoneid }, token);
        return res;
    } catch (error) {
        console.log(`Error: ${error}`);
        return null;
    }
};

export const deleteLocationAPI = async (
    token: string,
    LocationId: number,
    createdBy: string
) => {
    try {
        const url = `${HDFC_API_ENDPOINT}/entity/removeLocation`;
        const res = await postData(url, { LocationId, createdBy }, token);
        return res;
    } catch (error) {
        console.log(`Error: ${error}`);
        return null;
    }
};

// export const updateLocationAPI = async (
// token: string,
//     regionId: number,
//     locationsName: string,
//     createdBy: string,
//     locationId: string,
//     zoneId: number,
// ) => {
//     try {
//         const url = `${HDFC_API_ENDPOINT}/entity/updateLocation`;
//         const res = await postData(url, { regionId, locationsName, createdBy, locationId, zoneId });
//         return res;
//     } catch (error) {
//         console.log(`Error: ${error}`);
//         return null;
//     }
// };
