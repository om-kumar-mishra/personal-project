import { HDFC_API_ENDPOINT, getData, getParams, postDataMultipart } from "../../../api/commons";
import {
  BankDetailsType,
  CreateExternalNOCData,
  CreateExternalNOCResponse,
  LenderDetails,
  NOCAccountsResponse,
  NOCPriceHeaderResponse,
  NOCTypeResponse,
  PaymentVerificationResponse,
  SalesUnitForNOCResponse,
  SalesUnitPriceHeaderResponse,
} from "./dataTypes";

//#region [NOC-types-list]
export const getNOCTypesListAPI = async (token: string): Promise<NOCTypeResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/noc/external/nocTypes`;
  try {
    const res: NOCTypeResponse = await getData(url, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [Sales-unit-for-NOC]
export const getSalesUnitForNOCAPI = async (token: string, reAssetId: number, nocType: string): Promise<SalesUnitForNOCResponse | null> => {
  const params = {
    reAssetId,
    nocType,
  };
  const url = `${HDFC_API_ENDPOINT}/noc/external/getSalesUnitforNOC${getParams(params)}`;
  try {
    const res: SalesUnitForNOCResponse = await getData(url, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [sales-unit-price-header]
export const getSalesUnitPriceHeaderAPI = async (token: string, salesId: number): Promise<SalesUnitPriceHeaderResponse | null> => {
  const params = {
    salesId,
  };
  const url = `${HDFC_API_ENDPOINT}/noc/external/getSalesUnitPriceHeaders${getParams(params)}`;
  try {
    const res: SalesUnitPriceHeaderResponse = await getData(url, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [noc-price-header]
export const getNOCPriceHeaderAPI = async (
  token: string,
  nocProjectId: number,
  salesId: number,
  nocrequestid: number,
): Promise<NOCPriceHeaderResponse | null> => {
  const params = {
    nocProjectId,
    salesId,
    nocrequestid,
  };
  const url = `${HDFC_API_ENDPOINT}/noc/external/getNOCPriceHeaders${getParams(params)}`;
  try {
    const res: NOCPriceHeaderResponse = await getData(url, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [noc-accounts]
export const getNOCAccountsAPI = async (token: string, nocProjectId: number, createdBy: string, tower: string): Promise<NOCAccountsResponse | null> => {
  const params = {
    nocProjectId,
    createdBy,
    tower,
  };
  const url = `${HDFC_API_ENDPOINT}/noc/external/getNOCAccounts${getParams(params)}`;
  try {
    const res: NOCAccountsResponse = await getData(url, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [payment-verification]
export const paymentVerificationAPI = async (
  token: string,
  bankDetails: BankDetailsType[],
  lenderDetails: LenderDetails[],
  ledgerType: string,
  ledger: File,
  bankStatement: File[],
): Promise<PaymentVerificationResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/noc/external/paymentVerification`;
  try {
    const formData = new FormData();
    formData.append("bankDetails", JSON.stringify(bankDetails));
    formData.append("lenderDetails", JSON.stringify(lenderDetails));
    formData.append("ledgerType", ledgerType);
    formData.append("ledger", ledger);
    bankStatement.forEach(file => {
      formData.append("bankStatement", file);
    });
    // formData.append("bankStatement", bankStatement);

    const res: PaymentVerificationResponse = await postDataMultipart(url, formData, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [create-external-noc]
export const createExternalNOCAPI = async (token: string, payloadData: CreateExternalNOCData): Promise<CreateExternalNOCResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/noc/external/insertExternalNOCRequest`;
  try {
    const formData = new FormData();
    Object.entries(payloadData)?.forEach(([key, data]) => formData.append(key, Array.isArray(data) ? JSON.stringify(data) : data));
    // formData.append("bankDetails", JSON.stringify(bankDetails));
    const res: CreateExternalNOCResponse = await postDataMultipart(url, formData, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion
