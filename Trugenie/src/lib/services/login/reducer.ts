import { LoginActionType } from "./types";

interface initialStateType {
  token: string;
  emailid: string;
  oid: string;
  tokenExpired: boolean;
  loading: boolean;
}

export const initialState: initialStateType = {
  token: "",
  emailid: "",
  oid: "",
  tokenExpired: false,
  loading: false,
};

interface Action {
  type: LoginActionType;
  result: any;
  payload: any;
}

const LoginReducer = (
  state: initialStateType = initialState,
  action: Action
) => {
  switch (action.type) {
    case LoginActionType.GENERATE_TOKEN_REQUESTED:
      return {
        ...state,
        token: "",
        loading: true,
        tokenExpired: false,
      };
    case LoginActionType.GENERATE_TOKEN_SUCCESS:
      return {
        ...state,
        ...action.result,
        token: action.result?.token ?? "",
        loading: false,
        tokenExpired: false,
      };
    case LoginActionType.GENERATE_TOKEN_FAILED:
      return {
        ...state,
        token: "",
        loading: false,
        tokenExpired: false,
      };
    case LoginActionType.GENERATE_TOKEN_EXPIRED:
      return {
        ...state,
        loading: false,
        tokenExpired: true,
      };
    case LoginActionType.SAVE_REQUEST_BY_EMAIL_AND_OID:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default LoginReducer;
