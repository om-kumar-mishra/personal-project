import { LoginActionType } from "./types";

export interface GenerateTokenAction {
  type: LoginActionType;
  payload: {
    emailId: string;
    oid: string;
  };
}
