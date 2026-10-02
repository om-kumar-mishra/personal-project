import { HDFC_API_ENDPOINT, getData, getParams, postData } from "../../api/commons";
import {
  CalculateCashCoverResponse,
  CalculateCashCoverType,
  GetUpdateHoldStatusResponse,
  NOCProjectPrefrenceResponse,
  ReProjectExposureResponse,
  ReProjectSecurityResponse,
  UpdateAccountDelinquentResponse,
  UpdateNOCProjectCashCoverDetailsType,
  UpdateReProjectSecurityDetails,
} from "./dataTypes";

//#region [NOC Project Prefrence API]
export const nocProjectPrefrenceAPI = async (reAssetId: number, token: string): Promise<NOCProjectPrefrenceResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/noc/preferences/getNoCProjectPreference${getParams({ reAssetId })}`;
  try {
    const res: NOCProjectPrefrenceResponse | null = await getData(url, token);
    return res;
  } catch (error: unknown) {
    console.log(`Error while getting NOC Project Prefrence : ${error}`);
    return null;
  }
};
//#endregion [Reproject exposure API]

//#region [Reproject exposure API]
export const reProjectExposureAPI = async (reAssetId: number, token: string): Promise<ReProjectExposureResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/noc/preferences/getREProjectExposure${getParams({ reAssetId })}`;
  try {
    const res: ReProjectExposureResponse | null = await getData(url, token);
    return res;
  } catch (error: unknown) {
    console.log(`Error while getting reProject exposure data : ${error}`);
    return null;
  }
};
//#endregion [Reproject exposure API]

//#region [Reproject Security API]
export const reProjectSecurityAPI = async (reAssetId: number, token: string): Promise<ReProjectSecurityResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/noc/preferences/getREProjectSecurity${getParams({ reAssetId })}`;
  try {
    const res: ReProjectSecurityResponse | null = await getData(url, token);
    return res;
  } catch (error: unknown) {
    console.log(`Error while getting reProject Security data : ${error}`);
    return null;
  }
};
//#endregion [Reproject Security API]

//#region [Update cash cover API]
export const updateCashCoverAPI = async (data: UpdateNOCProjectCashCoverDetailsType, token: string): Promise<any | null> => {
  const url = `${HDFC_API_ENDPOINT}/noc/preferences/updateNoCProjectCashCoverDetails`;

  try {
    const res: any | null = await postData(url, data, token);
    return res;
  } catch (error: unknown) {
    console.log(`Error while updating : ${error}`);
    return null;
  }
};
//#endregion

//#region [Update reproject security API]
export const updateReprojectSecurityAPI = async (data: UpdateReProjectSecurityDetails, token: string): Promise<any | null> => {
  const url = `${HDFC_API_ENDPOINT}/noc/preferences/updateREProjectSecurityDetails`;

  try {
    const res: any | null = await postData(url, data, token);
    return res;
  } catch (error: unknown) {
    console.log(`Error while updating : ${error}`);
    return null;
  }
};
//#endregion

//#region [calculate cash cover API]
export const calculateCashCoverAPI = async (data: CalculateCashCoverType, token: string): Promise<any | null> => {
  const params = { ...data };
  const url = `${HDFC_API_ENDPOINT}/noc/preferences/calculateCashCover${getParams(params)}`;
  try {
    const res: CalculateCashCoverResponse | null = await getData(url, token);
    return res;
  } catch (error: unknown) {
    console.log(`Error while calculating : ${error}`);
    return null;
  }
};
//#endregion [calculate cash cover API]

//#region [Update account delinquent API]
export const updateAccountDelinquentAPI = async (reAssetId: number, value: string, misdate: string, token: string): Promise<any | null> => {
  const url = `${HDFC_API_ENDPOINT}/noc/preferences/updateAccountDelinquent`;

  try {
    const res: UpdateAccountDelinquentResponse | null = await postData(url, { reAssetId, value, misdate }, token);
    return res;
  } catch (error: unknown) {
    console.log(`Error while updating : ${error}`);
    return null;
  }
};
//#endregion

//#region [Update hold status API]
export const updateHoldStatusAPI = async (
  ReAssetId: number,
  onHold: number,
  StateOndate: string,
  Remarks: string,
  createdBy: string,
  token: string,
): Promise<any | null> => {
  const url = `${HDFC_API_ENDPOINT}/noc/preferences/updateNocProjectHoldStatus`;

  try {
    const res: UpdateAccountDelinquentResponse | null = await postData(url, { ReAssetId, onHold, StateOndate, Remarks, createdBy }, token);
    return res;
  } catch (error: unknown) {
    console.log(`Error while updating : ${error}`);
    return null;
  }
};
//#endregion

//#region [Get update hold status]
export const getUpdateHoldStatusAPI = async (reAssetId: number, token: string): Promise<GetUpdateHoldStatusResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/noc/preferences/getNocHoldDetail${getParams({ reAssetId })}`;
  try {
    const res: GetUpdateHoldStatusResponse | null = await getData(url, token);
    return res;
  } catch (error: unknown) {
    console.log(`Error while getting hold status data : ${error}`);
    return null;
  }
};
//#endregion [Get update hold status]
