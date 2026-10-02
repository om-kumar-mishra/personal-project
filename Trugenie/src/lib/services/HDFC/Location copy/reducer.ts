import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
import { storageKeys } from "../../../../utils/constants";
import { DevloperLocationListActions } from "./actions";
import { LocationListDataType } from "./dataTypes";
import * as types from "./types";

type LocationState = {
  devloperLocationList: LocationListDataType[] | null;
  loaders: {
    devloperLocationList: boolean;
    AddDeveloperLocation: boolean;
    deleteDeveloperLocation: boolean;
  };
};

const initialState: LocationState = {
  devloperLocationList: null,
  loaders: {
    devloperLocationList: false,
    AddDeveloperLocation: false,
    deleteDeveloperLocation: false,
  },
};

const DevlocationReducer = (state: LocationState = initialState, action: DevloperLocationListActions): LocationState => {
  switch (action.type) {
    case types.GET_DEVELOPER_LOCATION_LIST_REQUESTED:
      return {
        ...state,
        devloperLocationList: null,
        loaders: {
          ...state.loaders,
          devloperLocationList: true,
        },
      };
    case types.GET_DEVELOPER_LOCATION_LIST_SUCCEEDED:
      return {
        ...state,
        devloperLocationList: action.devloperLocationList,
        loaders: {
          ...state.loaders,
          devloperLocationList: false,
        },
      };
    case types.GET_DEVELOPER_LOCATION_LIST_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          devloperLocationList: false,
        },
      };

    case types.DELETE_DEVELOPER_LOCATION_REQUESTED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          deleteDeveloperLocation: true,
        },
      };

    case types.DELETE_DEVELOPER_LOCATION_SUCCEEDED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          deleteDeveloperLocation: false,
        },
      };

    case types.DELETE_DEVELOPER_LOCATION_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          deleteDeveloperLocation: false,
        },
      };

    case types.ADD_DEVELOPER_LOCATION_REQUESTED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          AddDeveloperLocation: true,
        },
      };

    case types.ADD_DEVELOPER_LOCATION_SUCCEEDED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          AddDeveloperLocation: false,
        },
      };

    case types.ADD_DEVELOPER_LOCATION_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          AddDeveloperLocation: false,
        },
      };

    default:
      return state;
  }
};
const config = {
  storage,
  key: storageKeys.location,
  blacklist: ["loaders"], // topic will not be persisted
};

export default persistReducer(config, DevlocationReducer);
