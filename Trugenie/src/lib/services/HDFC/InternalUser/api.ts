import { HDFC_API_ENDPOINT, postData } from "../../../api/commons";
import { AddInternalUserPayloadType, ApproveRejectInternalUserpPayload } from "./dataTypes";

export const addInternalUserAPI = async (
    token: string,
    payload: AddInternalUserPayloadType
) => {
    try {
        const url = `${HDFC_API_ENDPOINT}/users/addinternaluser`;
        const res = await postData(url, payload, token);
        return res;
    } catch (error) {
        console.log(`Error: ${error}`);
        return null;
    }
};

export const getInternalUserAPI = async (
    token: string,
    createdBy: string
) => {
    try {
        const url = `${HDFC_API_ENDPOINT}/users/getInternalUsers`;
        const res = await postData(url, { createdBy }, token);
        return res;
    } catch (error) {
        console.log(`Error: ${error}`);
        return null;
    }
};

export const changeInternalUserStatusAPI = async (
    token: string,
    payload: ApproveRejectInternalUserpPayload,
    statusType: "Approve" | "Reject"
) => {
    try {
        let url = `${HDFC_API_ENDPOINT}/users/rejectUserRequest`;
        if (statusType === "Approve") {
            url = `${HDFC_API_ENDPOINT}/users/approveInternalUser`;
        }
        const res = await postData(url, payload, token);
        return res;
    } catch (error) {
        console.log(`Error: ${error}`);
        return null;
    }
}