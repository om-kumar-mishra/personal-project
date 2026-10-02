import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
import { storageKeys } from "../../../../utils/constants";
import { ExternalUserActions } from "./actions";
import { GetExternalUserDataType, PendingExternalResp } from "./dataTypes";
import * as types from "./types";

type ExternalUserState = {
  externalUserList: GetExternalUserDataType[] | null;
  pendingExternalUserDetails: PendingExternalResp[] | null;
  loaders: {
    addExternalUser: boolean;
    getExternalUserList: boolean;
    changeExternalUserStatus: boolean;
    getPendingExternalUserDetails: boolean;
    editExternalUser: boolean;
    enableDisableExternalUser: boolean;
  };
};

const initialState: ExternalUserState = {
  externalUserList: null,
  pendingExternalUserDetails: null,
  loaders: {
    addExternalUser: false,
    getExternalUserList: false,
    changeExternalUserStatus: false,
    getPendingExternalUserDetails: false,
    editExternalUser: false,
    enableDisableExternalUser: false,
  },
};

const externalUserReducer = (state: ExternalUserState = initialState, action: ExternalUserActions): ExternalUserState => {
  switch (action.type) {
    case types.ADD_EXTERNAL_USER_REQUESTED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          addExternalUser: true,
        },
      };
    case types.ADD_EXTERNAL_USER_SUCCEEDED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          addExternalUser: false,
        },
      };
    case types.ADD_EXTERNAL_USER_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          addExternalUser: false,
        },
      };

    case types.GET_EXTERNAL_USER_LIST_REQUESTED:
      return {
        ...state,
        externalUserList: null,
        loaders: {
          ...state.loaders,
          getExternalUserList: true,
        },
      };

    case types.GET_EXTERNAL_USER_LIST_SUCCEEDED:
      return {
        ...state,
        externalUserList: action.payload,
        loaders: {
          ...state.loaders,
          getExternalUserList: false,
        },
      };

    case types.GET_EXTERNAL_USER_LIST_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          getExternalUserList: false,
        },
      };

    case types.CHANGE_EXTERNAL_USER_STATUS_REQUESTED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          changeExternalUserStatus: true,
        },
      };

    case types.CHANGE_EXTERNAL_USER_STATUS_SUCCEEDED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          changeExternalUserStatus: false,
        },
      };

    case types.CHANGE_EXTERNAL_USER_STATUS_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          changeExternalUserStatus: false,
        },
      };

    case types.GET_PENDING_EXTERNAL_USER_DETAILS_REQUESTED:
      return {
        ...state,
        pendingExternalUserDetails: null,
        loaders: {
          ...state.loaders,
          getPendingExternalUserDetails: true,
        },
      };

    case types.GET_PENDING_EXTERNAL_USER_DETAILS_SUCCEEDED:
      return {
        ...state,
        pendingExternalUserDetails: action.payload,
        loaders: {
          ...state.loaders,
          getPendingExternalUserDetails: false,
        },
      };

    case types.GET_PENDING_EXTERNAL_USER_DETAILS_FAILED:
      return {
        ...state,
        pendingExternalUserDetails: null,
        loaders: {
          ...state.loaders,
          getPendingExternalUserDetails: false,
        },
      };

    case types.EDIT_EXTERNAL_USER_REQUESTED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          editExternalUser: true,
        },
      };

    case types.EDIT_EXTERNAL_USER_SUCCEEDED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          editExternalUser: false,
        },
      };

    case types.EDIT_EXTERNAL_USER_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          editExternalUser: false,
        },
      };

    case types.ENABLE_DISABLE_EXTERNAL_USER_REQUESTED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          enableDisableExternalUser: true,
        },
      };

    case types.ENABLE_DISABLE_EXTERNAL_USER_SUCCEEDED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          enableDisableExternalUser: false,
        },
      };

    case types.ENABLE_DISABLE_EXTERNAL_USER_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          enableDisableExternalUser: false,
        },
      };

    default:
      return state;
  }
};

const config = {
  storage,
  key: storageKeys.externalUser,
  blacklist: ["loaders"], // topic will not be persisted
};

export default persistReducer(config, externalUserReducer);
