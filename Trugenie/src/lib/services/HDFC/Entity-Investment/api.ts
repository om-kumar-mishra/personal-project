import { HDFC_API_ENDPOINT, getData, getParams, postData } from "../../../api/commons";
import {
  AddInvestmentListPayload,
  AddInvestmentListResponse,
  DeleteInvestmentListPayload,
  DeleteInvestmentListResponse,
  InvestmentListResponse
} from "./dataTypes";

//#region [Investment-list]
export const getInvestmentListAPI = async (token: string, clientId: number, createdBy: string): Promise<InvestmentListResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/entity/getInvestments${getParams({ clientId, createdBy })}`;
  try {
    const res: InvestmentListResponse = await getData(url, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [Add-Investment-list]
export const addInvestmentListAPI = async (
  token: string,
  payload: AddInvestmentListPayload,
): Promise<AddInvestmentListResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/entity/insertInvestments`;
  try {
    const res: AddInvestmentListResponse = await postData(url, payload, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [Delete-Investment-list]
export const deleteInvestmentListAPI = async (
  token: string,
  payload: DeleteInvestmentListPayload,
): Promise<DeleteInvestmentListResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/entity/deleteInvestments`;
  try {
    const res: DeleteInvestmentListResponse = await postData(url, payload, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion