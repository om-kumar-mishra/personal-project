import { LoginActions } from "./actions";
import { UserDetails } from "./dataTypes";
import * as actionTypes from "./types";

type AuthState = {
  accessToken?: string;
  userDetails?: UserDetails;
  expiryDuration: number;
  expiryDate: string | null;
  userPermissions?: string[];
  activeMenu: string;
  subMenu: string;
  appVersion?: string;
  publicKey?: string;
  logoutMiliseconds: number | null;
  lastActivityTimeStamp: number | null;
  loader: {
    login: boolean;
  };
};

const initialState: AuthState = {
  activeMenu: "",
  subMenu: "",
  accessToken: undefined,
  userDetails: undefined,
  expiryDuration: 1800000,
  expiryDate: null,
  logoutMiliseconds: null,
  appVersion: undefined,
  publicKey: undefined,
  lastActivityTimeStamp: null,
  loader: {
    login: false,
  },
};

const authReducer = (state: AuthState = initialState, action: LoginActions): AuthState => {
  switch (action.type) {
    // login
    case actionTypes.LOGIN_REQUESTED:
      return {
        ...state,
        loader: {
          ...state.loader,
          login: true,
        },
      };

    case actionTypes.LOGIN_SUCCEEDED:
      return {
        ...state,
        accessToken: action.result.data.token,
        userDetails: action.result.data.userDetails,
        expiryDuration: action.result.data.expiryDuration,
        expiryDate: action.result.data.expiryDate,
        loader: {
          ...state.loader,
          // login: false,
        },
      };

    case actionTypes.LOGIN_FAILED:
      return {
        ...state,
        accessToken: initialState.accessToken,
        userDetails: initialState.userDetails,
        loader: {
          ...state.loader,
          login: false,
        },
      };

    // permissions
    case actionTypes.PERMISSIONS_SUCCEEDED:
      return {
        ...state,
        userPermissions: action.result.data.Permission,
        loader: {
          ...state.loader,
          login: false,
        },
      };

    // logout
    case actionTypes.LOGOUT_REQUESTED:
      return {
        ...state,
        accessToken: initialState.accessToken,
        userDetails: initialState.userDetails,
        loader: {
          ...state.loader,
          login: false,
        },
      };

    // active-menu
    case actionTypes.SETTINGS_ACTIVE_MENUITEM:
      return {
        ...state,
        activeMenu: action.value,
      };
    case actionTypes.SETTINGS_ACTIVE_SUB_MENUITEM:
      return {
        ...state,
        subMenu: action.value,
      };

    // app-version
    case actionTypes.APP_VERSION_REQUESTED:
      return {
        ...state,
        appVersion: undefined,
        publicKey: undefined,
      };
    case actionTypes.APP_VERSION_SUCCEEDED:
      return {
        ...state,
        appVersion: action.version,
        publicKey: action.key,
      };
    case actionTypes.APP_VERSION_FAILED:
      return {
        ...state,
        appVersion: undefined,
        publicKey: undefined,
      };

    // logout-timer
    case actionTypes.SET_LOGOUT_TIMER:
      return {
        ...state,
        logoutMiliseconds: action.value,
      };

    case actionTypes.RESET_LOGOUT_TIMER:
      return {
        ...state,
        logoutMiliseconds: 0,
      };

    // activity-timestamp
    case actionTypes.SET_ACTIVITY_TIMESTAMP:
      return {
        ...state,
        lastActivityTimeStamp: action.value,
      };

    case actionTypes.RESET_ACTIVITY_TIMESTAMP:
      return {
        ...state,
        lastActivityTimeStamp: null,
      };

    default:
      return state;
  }
};

export default authReducer;
