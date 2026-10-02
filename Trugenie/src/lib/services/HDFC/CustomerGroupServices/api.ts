import { HDFC_API_ENDPOINT, getData, postData } from "../../../api/commons";

export const getCustomerGroupListAPI = async (token: string, client: number) => {
  try {
    const url = `${HDFC_API_ENDPOINT}/entity/getCustomerGroup?clientid=${client}`;
    const res = await getData(url, token);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
};

export const addCustomerGroupAPI = async (token: string, createdBy: string, customerName: string, clientId: number, groupHeadOffice: string) => {
  try {
    const url = `${HDFC_API_ENDPOINT}/entity/addCustomerGroup`;
    const res = await postData(url, { customerName, createdBy, clientId, groupHeadOffice }, token);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
};

export const editCustomerGroupAPI = async (token: string, developerId: number, customerName: string, createdBy: string, remark: string, developerLocation: string) => {
  try {
    const url = `${HDFC_API_ENDPOINT}/entity/updateCustomerGroup`;
    const res = await postData(url, { developerId, customerName, createdBy, remark, developerLocation }, token);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
};
