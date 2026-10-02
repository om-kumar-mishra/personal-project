import { HDFC_API_ENDPOINT, getData, getParams, postData } from "../../../api/commons";
import { AddDebentureListPayload, AddDebentureListResponse, DebentureListResponse } from "./dataTypes";

//#region [Debenture-list]
export const getDebentureListAPI = async (token: string, client: number, username: string): Promise<DebentureListResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/entity/getDebenture${getParams({ client, username })}`;
  try {
    const res: DebentureListResponse = await getData(url, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [Add-Debenture-list]
export const addDebentureListAPI = async (
  token: string,
  payload: AddDebentureListPayload,
): Promise<AddDebentureListResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/entity/insertDebenture`;
  try {
    const res: AddDebentureListResponse = await postData(url, payload, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion