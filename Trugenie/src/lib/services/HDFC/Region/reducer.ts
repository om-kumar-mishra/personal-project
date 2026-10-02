import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
import { storageKeys } from "../../../../utils/constants";
import { RegionListActions } from "./actions";
import { RegionListDataType } from "./dataTypes";
import * as types from "./types";

type RegionState = {
  RegionList: RegionListDataType[] | null;
  loaders: {
    RegionList: boolean;
    addRegion: boolean;
    deleteRegion: boolean;
  };
};

const initialState: RegionState = {
  RegionList: null,
  loaders: {
    RegionList: false,
    addRegion: false,
    deleteRegion: false,
  },
};

const RegionReducer = (state: RegionState = initialState, action: RegionListActions): RegionState => {
  switch (action.type) {
    case types.GET_REGION_LIST_REQUESTED:
      return {
        ...state,
        RegionList: null,
        loaders: {
          ...state.loaders,
          RegionList: true,
        },
      };
    case types.GET_REGION_LIST_SUCCEEDED:
      return {
        ...state,
        RegionList: action.RegionList,
        loaders: {
          ...state.loaders,
          RegionList: false,
        },
      };
    case types.GET_REGION_LIST_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          RegionList: false,
        },
      };

    case types.DELETE_REGION_REQUESTED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          deleteRegion: true,
        },
      };

    case types.DELETE_REGION_SUCCEEDED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          deleteRegion: false,
        },
      };

    case types.DELETE_REGION_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          deleteRegion: false,
        },
      };

    case types.ADD_REGION_REQUESTED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          addRegion: true,
        },
      };

    case types.ADD_REGION_SUCCEEDED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          addRegion: false,
        },
      };

    case types.ADD_REGION_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          addRegion: false,
        },
      };

    default:
      return state;
  }
};

const config = {
  storage,
  key: storageKeys.region,
  blacklist: ["loaders"], // topic will not be persisted
};

export default persistReducer(config, RegionReducer);
