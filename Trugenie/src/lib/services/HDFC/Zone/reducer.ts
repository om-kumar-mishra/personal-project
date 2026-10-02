import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
import { storageKeys } from "../../../../utils/constants";
import { ZonesListActions } from "./actions";
import { ZonesListDataType } from "./dataTypes";
import * as types from "./types";

type ZonesState = {
  zonesList: ZonesListDataType[] | null;
  loaders: {
    zonesList: boolean;
    addZone: boolean;
    editZone: boolean;
    deleteZone: boolean;
  };
};

const initialState: ZonesState = {
  zonesList: null,
  loaders: {
    zonesList: false,
    addZone: false,
    editZone: false,
    deleteZone: false,
  },
};

const zonesReducer = (state: ZonesState = initialState, action: ZonesListActions): ZonesState => {
  switch (action.type) {
    case types.GET_ZONES_LIST_REQUESTED:
      return {
        ...state,
        zonesList: null,
        loaders: {
          ...state.loaders,
          zonesList: true,
        },
      };
    case types.GET_ZONES_LIST_SUCCEEDED:
      return {
        ...state,
        zonesList: action.zonesList.data,
        loaders: {
          ...state.loaders,
          zonesList: false,
        },
      };
    case types.GET_ZONES_LIST_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          zonesList: false,
        },
      };

    case types.DELETE_ZONE_REQUESTED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          deleteZone: true,
        },
      };

    case types.DELETE_ZONE_SUCCEEDED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          deleteZone: false,
        },
      };

    case types.DELETE_ZONE_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          deleteZone: false,
        },
      };

    case types.ADD_ZONE_REQUESTED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          addZone: true,
        },
      };

    case types.ADD_ZONE_SUCCEEDED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          addZone: false,
        },
      };

    case types.ADD_ZONE_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          addZone: false,
        },
      };

    case types.UPDATE_ZONE_REQUESTED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          editZone: true,
        },
      };

    case types.UPDATE_ZONE_SUCCEEDED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          editZone: false,
        },
      };

    case types.UPDATE_ZONE_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          editZone: false,
        },
      };

    default:
      return state;
  }
};

const config = {
  storage,
  key: storageKeys.zone,
  blacklist: ["loaders"], // topic will not be persisted
};

export default persistReducer(config, zonesReducer);
