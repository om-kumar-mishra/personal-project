import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
import { storageKeys } from "../../../../utils/constants";
import * as types from "./types";
import { ClientListDataType } from "./dataTypes";
import { ClientListActions } from "./actions";

type ClientState = {
  clientList: ClientListDataType[] | null;
  loaders: {
    clientList: boolean;
    addClient: boolean;
  };
};

const initialState: ClientState = {
  clientList: null,
  loaders: {
    clientList: false,
    addClient: false,
  },
};

const clientReducer = (state: ClientState = initialState, action: ClientListActions): ClientState => {
  switch (action.type) {
    case types.GET_CLIENT_LIST_REQUESTED:
      return {
        ...state,
        clientList: null,
        loaders: {
          ...state.loaders,
          clientList: true,
        },
      };
    case types.GET_CLIENT_LIST_SUCCEEDED:
      return {
        ...state,
        clientList: action.clientList,
        loaders: {
          ...state.loaders,
          clientList: false,
        },
      };
    case types.GET_CLIENT_LIST_FAILED:
      return {
        ...state,
        clientList: null,
        loaders: {
          ...state.loaders,
          clientList: false,
        },
      };

    case types.ADD_CLIENT_REQUESTED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          addClient: true,
        },
      };

    case types.ADD_CLIENT_SUCCEEDED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          addClient: false,
        },
      };

    case types.ADD_CLIENT_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          addClient: false,
        },
      };

    default:
      return state;
  }
};
const config = {
  storage,
  key: storageKeys.client,
  blacklist: ["loaders"], // topic will not be persisted
};

export default persistReducer(config, clientReducer);
