import { HDFC_API_ENDPOINT, getData, getParams, postData } from "../../../api/commons";

export const getCustomerInvesteeListAPI = async (accessToken: string, useremail: string, client: number) => {
  try {
    const url = `${HDFC_API_ENDPOINT}/entity/getInvesteeCompany`;
    const res = await postData(url, { client, useremail }, accessToken);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
};

export const getFilteredCustomerInvesteeListAPI = async (accessToken: string, DeveloperId: number, createdby: string) => {
  try {
    const url = `${HDFC_API_ENDPOINT}/entity/getInvesteeCompanies${getParams({ DeveloperId, createdby })}`;
    const res = await getData(url, accessToken);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
};

export const addCustomerInvesteeAPI = async (
  token: string,
  borrowername: string,
  cin: string,
  clientId: number,
  DeveloperID: number,
  createdby: string,
  gst: string,
  pan: string,
  address: string
) => {
  try {
    const url = `${HDFC_API_ENDPOINT}/entity/addInvesteeCompany`;
    const res = await postData(url, { borrowername, cin, clientId, DeveloperID, createdby, gst, pan, address }, token);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
};

export const editCustomerInvesteeAPI = async (
  token: string,
  borrowerDetailId: number,
  borrowerName: string,
  cin: string,
  createdby: string,
  gst: string,
  pan: string,
  address: string,
  remark: string,
) => {
  try {
    const url = `${HDFC_API_ENDPOINT}/entity/updateInvesteeCompanyDetail`;
    const res = await postData(url, { borrowerDetailId, borrowerName, cin, createdby, gst, pan, address, remark }, token);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
};

export const viewCustomerInvesteeAPI = async (token: string, developerId: number, createdby: string) => {
  try {
    const url = `${HDFC_API_ENDPOINT}/entity/ViewInvesteeCompany`;
    const res = await postData(url, { developerId, createdby }, token);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
};
