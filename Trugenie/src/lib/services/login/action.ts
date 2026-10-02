import { LoginActionType } from "./types";

export const generateTokenAction = (emailId: string, oid: string) => ({
  type: LoginActionType.GENERATE_TOKEN_REQUESTED,
  payload: { emailId, oid },
});

export const removeTokenAction = () => ({
  type: LoginActionType.GENERATE_TOKEN_FAILED,
});

export const expiredToken = () => ({
  type: LoginActionType.GENERATE_TOKEN_EXPIRED,
});

export const saveRequestByEmailAndOid = (payload: any) => ({
  type: LoginActionType.SAVE_REQUEST_BY_EMAIL_AND_OID,
  payload,
});
