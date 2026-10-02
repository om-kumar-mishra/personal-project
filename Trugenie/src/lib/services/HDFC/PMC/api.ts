import { HDFC_API_ENDPOINT, getData, getParams, postData } from "../../../api/commons";
import { AddPMCListPayload, AddPMCListResponse, PMCListResponse } from "./dataTypes";

//#region [PMC-list]
export const getPMCListAPI = async (token: string, client: number, useremail: string): Promise<PMCListResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/entity/getPMC${getParams({ client, useremail })}`;
  try {
    const res: PMCListResponse = await getData(url, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [Add-PMC-list]
export const addPMCListAPI = async (
  token: string,
  payload: AddPMCListPayload,
): Promise<AddPMCListResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/entity/insertPMC`;
  try {
    const res: AddPMCListResponse = await postData(url, payload, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion