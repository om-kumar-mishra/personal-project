import { HDFC_API_ENDPOINT, VERSION_TOKEN, getData, postData } from "../../api/commons";
import { LoginResponse, PermissionResponse, RefreshTokenResponse } from "./dataTypes";

//#region [User Login]
export const loginAPI = async (username: string, password: string): Promise<LoginResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/auth/login`;
  try {
    password = btoa(password);
    const res: LoginResponse = await postData(url, { username, password, deviceId: navigator.userAgent });
    return res;
  } catch (error: unknown) {
    console.log(`Error calling URL : ${url}`);
    throw error;
  }
};
//#endregion

//#region [User Permission]
export const fetchUserPermissionsAPI = async (token: string): Promise<PermissionResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/users/permissions`;
  try {
    const res: PermissionResponse = await getData(url, token);
    return res;
  } catch (error: unknown) {
    console.log(`Error calling URL : ${url}`);
    throw error;
  }
};
//#endregion

//#region [User Logout]
export const logoutAPI = async (token: string) => {
  const url = `${HDFC_API_ENDPOINT}/auth/logout`;
  try {
    const res = await postData(url, { deviceId: navigator.userAgent }, token);
    return res;
  } catch (error: unknown) {
    console.log(`Error while logout : ${url}`);
    throw error;
  }
};

//#region [Fetch Version]
export const fetchAppVersion = async (): Promise<PermissionResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/application/version`;
  try {
    const res: PermissionResponse = await getData(url, VERSION_TOKEN);
    // const res: PermissionResponse = await getData(url);
    return res;
  } catch (error: unknown) {
    console.log(`Error calling URL : ${url}`);
    throw error;
  }
};
//#endregion

//#region [Refresh Token]
export const refreshTokenAPI = async (token: string): Promise<RefreshTokenResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/auth/checktoken`;
  try {
    const res: RefreshTokenResponse | null = await getData(url, token);
    return res;
  } catch (error: unknown) {
    console.log(`Error calling URL : ${url}`);
    throw error;
  }
};
//#endregion
