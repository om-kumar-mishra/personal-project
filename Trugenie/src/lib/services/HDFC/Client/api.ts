import { HDFC_API_ENDPOINT, getData, postData } from "../../../api/commons";
import { AddClientPayload } from "./dataTypes";

export const getClientAPI = async (accessToken: string) => {
  try {
    const url = `${HDFC_API_ENDPOINT}/entity/getClientList`;
    const res = await getData(url, accessToken);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
};

export const addClientAPI = async (token: string, payload: AddClientPayload) => {
  try {
    const url = `${HDFC_API_ENDPOINT}/entity/insertClient`;
    const res = await postData(url, payload, token);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
};
