import { HDFC_API_ENDPOINT, getData, getParams, postData } from "../../../api/commons";
import { AddLenderListPayload, AddLenderListResponse, AddUserLenderPayload, AddUserLenderResponse, LenderListResponse, getClientUserResponse,RemoveUserLenderResponse } from "./dataTypes";

//#region [Lender-list]
export const getLenderListAPI = async (token: string, client: number, useremail: string): Promise<LenderListResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/entity/getLenderList${getParams({ client, useremail })}`;
  try {
    const res: LenderListResponse = await getData(url, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [Lender-list]
export const addLenderListAPI = async (
  token: string,
  payload: AddLenderListPayload,
): Promise<AddLenderListResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/entity/addLender`;
  try {
    const res: AddLenderListResponse = await postData(url, payload, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion
export const AddUserLenderAPI = async (
  token: string,
  payload: AddUserLenderPayload,
): Promise<AddUserLenderResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/entity/insertEntityUser`;
  try {
    const res: AddUserLenderResponse = await postData(url, payload, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#endregion
export const ClientAllUserAPI = async (
  token: string,
  clientId: number,
): Promise<getClientUserResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/entity/getClientAllUser?clientId=${clientId}`;
  try {
    const res: getClientUserResponse = await getData(url, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion


//#endregion
export const RemoveUserLenderAPI = async (
  token: string,
  EUId: number,
): Promise<RemoveUserLenderResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/entity/removeEntityUser?EUId=${EUId}`;
  try {
    const res: RemoveUserLenderResponse = await postData(url,null , token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion