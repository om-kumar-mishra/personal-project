import { HDFC_API_ENDPOINT, postData } from "../../../api/commons";
import { AddExternalUserPayloadType, ApproveRejectExternalUserpPayload, EditExternalUserPayloadType, EnableDisableExternalUserPayload, PendingExternalUserpayload } from "./dataTypes";

export const addExternalUserAPI = async (
    token: string,
    payload: AddExternalUserPayloadType
) => {
    try {
        const url = `${HDFC_API_ENDPOINT}/users/addExternalUser`;
        const res = await postData(url, payload, token);
        return res;
    } catch (error) {
        console.log(`Error: ${error}`);
        return null;
    }
};

export const getExternalUserAPI = async (
    token: string,
    createdBy: string,
    clientId :number
) => {
    try {
        const url = `${HDFC_API_ENDPOINT}/users/getExternalUsers`;
        const res = await postData(url, { createdBy,clientId }, token);
        return res;
    } catch (error) {
        console.log(`Error: ${error}`);
        return null;
    }
};


export const changeExternalUserStatusAPI = async (
    token: string,
    payload: ApproveRejectExternalUserpPayload,
) => {
    try {
        const url = `${HDFC_API_ENDPOINT}/users/updateExternalUserStatus`;

        const res = await postData(url, payload, token);
        return res;
    } catch (error) {
        console.log(`Error: ${error}`);
        return null;
    }
}

export const getPendingExternalUserAPI = async (
    token: string,
    payload: PendingExternalUserpayload,
) => {
    try {
        const url = `${HDFC_API_ENDPOINT}/users/getPendingExternalUserDetail`;

        const res = await postData(url, payload, token);
        return res;
    } catch (error) {
        console.log(`Error: ${error}`);
        return null;
    }
}

export const editExternalUserAPI = async (
    token: string,
    payload: EditExternalUserPayloadType,
) => {
    try {
        const url = `${HDFC_API_ENDPOINT}/users/updateExternalUser`;

        const res = await postData(url, payload, token);
        return res;
    } catch (error) {
        console.log(`Error: ${error}`);
        return null;
    }
}

export const enableDisableExternalUserAPI = async (
    token: string,
    payload: EnableDisableExternalUserPayload,
) => {
    try {
        const url = `${HDFC_API_ENDPOINT}/users/updateExternalUserRequestStatus`;
        const res = await postData(url, payload, token);
        return res;
    } catch (error) {
        console.log(`Error: ${error}`);
        return null;
    }
}