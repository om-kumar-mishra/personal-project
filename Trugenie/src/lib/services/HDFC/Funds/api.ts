import { HDFC_API_ENDPOINT, getData, getParams, postData } from "../../../api/commons";
import { AddFundsListPayload, AddFundsListResponse, DeleteFundsListPayload, DeleteFundsListResponse, FundsListResponse } from "./dataTypes";

//#region [Funds-list]
export const getFundsListAPI = async (token: string, clientId: number, createdBy: string): Promise<FundsListResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/entity/getFunds${getParams({ clientId, createdBy })}`;
  try {
    const res: FundsListResponse = await getData(url, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [Add-Funds-list]
export const addFundsListAPI = async (
  token: string,
  payload: AddFundsListPayload,
): Promise<AddFundsListResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/entity/insertFund`;
  try {
    const res: AddFundsListResponse = await postData(url, payload, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [Delete-Funds-list]
export const deleteFundsListAPI = async (
  token: string,
  payload: DeleteFundsListPayload,
): Promise<DeleteFundsListResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/entity/deleteFunds`;
  try {
    const res: DeleteFundsListResponse = await postData(url, payload, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion