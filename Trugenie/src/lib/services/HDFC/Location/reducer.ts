import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
import { storageKeys } from "../../../../utils/constants";
import { LocationListActions } from "./actions";
import { LocationListDataType } from "./dataTypes";
import * as types from "./types";

type LocationState = {
  locationList: LocationListDataType[] | null;
  loaders: {
    locationList: boolean;
    addLocation: boolean;
    deleteLocation: boolean;
  };
};

const initialState: LocationState = {
  locationList: null,
  loaders: {
    locationList: false,
    addLocation: false,
    deleteLocation: false,
  },
};

const locationReducer = (state: LocationState = initialState, action: LocationListActions): LocationState => {
  switch (action.type) {
    case types.GET_LOCATION_LIST_REQUESTED:
      return {
        ...state,
        locationList: null,
        loaders: {
          ...state.loaders,
          locationList: true,
        },
      };
    case types.GET_LOCATION_LIST_SUCCEEDED:
      return {
        ...state,
        locationList: action.locationList,
        loaders: {
          ...state.loaders,
          locationList: false,
        },
      };
    case types.GET_LOCATION_LIST_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          locationList: false,
        },
      };

    case types.DELETE_LOCATION_REQUESTED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          deleteLocation: true,
        },
      };

    case types.DELETE_LOCATION_SUCCEEDED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          deleteLocation: false,
        },
      };

    case types.DELETE_LOCATION_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          deleteLocation: false,
        },
      };

    case types.ADD_LOCATION_REQUESTED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          addLocation: true,
        },
      };

    case types.ADD_LOCATION_SUCCEEDED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          addLocation: false,
        },
      };

    case types.ADD_LOCATION_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          addLocation: false,
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

export default persistReducer(config, locationReducer);
