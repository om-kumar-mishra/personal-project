import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
import { storageKeys } from "../../../../utils/constants";
import * as actionTypes from "./types";
import { PMCActions } from "./actions";
import {
  AddPMCListResponse,
  PMCListData,
} from "./dataTypes";

type PMCState = {
  pmcList?: PMCListData[];
  addPMCListDetails?: AddPMCListResponse;
  loader: {
    pmcList: boolean;
    addPMCListDetails: boolean;
  };
};

const initialState: PMCState = {
  pmcList: undefined,
  addPMCListDetails: undefined,
  loader: {
    pmcList: false,
    addPMCListDetails: false,
  },
};

const pmcReducer = (state: PMCState = initialState, action: PMCActions): PMCState => {
  switch (action.type) {

    // PMC-list
    case actionTypes.GET_PMC_LIST_REQUESTED:
      return {
        ...state,
        pmcList: undefined,
        loader: {
          ...state.loader,
          pmcList: true,
        },
      };
    case actionTypes.GET_PMC_LIST_SUCCEEDED:
      return {
        ...state,
        pmcList: action.result,
        loader: {
          ...state.loader,
          pmcList: false,
        },
      };
    case actionTypes.GET_PMC_LIST_FAILED:
      return {
        ...state,
        pmcList: undefined,
        loader: {
          ...state.loader,
          pmcList: false,
        },
      };
    case actionTypes.ADD_PMC_LIST_REQUESTED:
      return {
        ...state,
        addPMCListDetails: undefined,
        loader: {
          ...state.loader,
          addPMCListDetails: true,
        },
      };
    case actionTypes.ADD_PMC_LIST_SUCCEEDED:
      return {
        ...state,
        addPMCListDetails: action.result,
        loader: {
          ...state.loader,
          addPMCListDetails: false,
        },
      };
    case actionTypes.ADD_PMC_LIST_FAILED:
      return {
        ...state,
        addPMCListDetails: undefined,
        loader: {
          ...state.loader,
          addPMCListDetails: false,
        },
      };
    default:
      return state;
  }
};
const config = {
  storage,
  key: storageKeys.pmc,
  blacklist: ["loader"], // topic will not be persisted
};

export default persistReducer(config, pmcReducer);
// export default pmcReducer;
