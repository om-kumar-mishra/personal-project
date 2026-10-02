import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
import { storageKeys } from "../../../../utils/constants";
import { InternalUserActions } from "./actions";
import { GetInternalUserDataType } from "./dataTypes";
import * as types from "./types";

type InternalUserState = {
  internalUserList: GetInternalUserDataType[] | null;
  loaders: {
    addInternalUser: boolean;
    getInternalUserList: boolean;
    changeInternalUserStatus: boolean;
  };
};

const initialState: InternalUserState = {
  internalUserList: null,
  loaders: {
    addInternalUser: false,
    getInternalUserList: false,
    changeInternalUserStatus: false,
  },
};

const internalUserReducer = (state: InternalUserState = initialState, action: InternalUserActions): InternalUserState => {
  switch (action.type) {
    case types.ADD_INTERNAL_USER_REQUESTED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          addInternalUser: true,
        },
      };
    case types.ADD_INTERNAL_USER_SUCCEEDED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          addInternalUser: false,
        },
      };
    case types.ADD_INTERNAL_USER_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          addInternalUser: false,
        },
      };

    case types.GET_INTERNAL_USER_LIST_REQUESTED:
      return {
        ...state,
        internalUserList: null,
        loaders: {
          ...state.loaders,
          getInternalUserList: true,
        },
      };

    case types.GET_INTERNAL_USER_LIST_SUCCEEDED:
      return {
        ...state,
        internalUserList: action.payload,
        loaders: {
          ...state.loaders,
          getInternalUserList: false,
        },
      };

    case types.GET_INTERNAL_USER_LIST_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          getInternalUserList: false,
        },
      };

    case types.CHANGE_INTERNAL_USER_STATUS_REQUESTED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          changeInternalUserStatus: true,
        },
      };

    case types.CHANGE_INTERNAL_USER_STATUS_SUCCEEDED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          changeInternalUserStatus: false,
        },
      };

    case types.CHANGE_INTERNAL_USER_STATUS_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          changeInternalUserStatus: false,
        },
      };

    default:
      return state;
  }
};
const config = {
  storage,
  key: storageKeys.internalUser,
  blacklist: ["loaders"], // topic will not be persisted
};

export default persistReducer(config, internalUserReducer);
