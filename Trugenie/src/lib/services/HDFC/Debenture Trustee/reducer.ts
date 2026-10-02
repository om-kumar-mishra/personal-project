import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
import { storageKeys } from "../../../../utils/constants";
import * as actionTypes from "./types";
import { DebentureActions } from "./actions";
import {
  AddDebentureListResponse,
  DebentureListData,
} from "./dataTypes";

type DebentureState = {
  debentureList?: DebentureListData[];
  addDebentureListDetails?: AddDebentureListResponse;
  loader: {
    debentureList: boolean;
    addDebentureListDetails: boolean;
  };
};

const initialState: DebentureState = {
  debentureList: undefined,
    addDebentureListDetails: undefined,
  loader: {
    debentureList: false,
    addDebentureListDetails: false,
  },
};

const debentureReducer = (state: DebentureState = initialState, action: DebentureActions): DebentureState => {
  switch (action.type) {

    // debenture-list
    case actionTypes.GET_DEBENTURE_LIST_REQUESTED:
      return {
        ...state,
        debentureList: undefined,
        loader: {
          ...state.loader,
          debentureList: true,
        },
      };
    case actionTypes.GET_DEBENTURE_LIST_SUCCEEDED:
      return {
        ...state,
        debentureList: action.result,
        loader: {
          ...state.loader,
          debentureList: false,
        },
      };
    case actionTypes.GET_DEBENTURE_LIST_FAILED:
      return {
        ...state,
        debentureList: undefined,
        loader: {
          ...state.loader,
          debentureList: false,
        },
      };
      case actionTypes.ADD_DEBENTURE_LIST_REQUESTED:
        return {
          ...state,
          addDebentureListDetails: undefined,
          loader: {
            ...state.loader,
            addDebentureListDetails: true,
          },
        };
      case actionTypes.ADD_DEBENTURE_LIST_SUCCEEDED:
        return {
          ...state,
          addDebentureListDetails: action.result,
          loader: {
            ...state.loader,
            addDebentureListDetails: false,
          },
        };
      case actionTypes.ADD_DEBENTURE_LIST_FAILED:
        return {
          ...state,
          addDebentureListDetails: undefined,
          loader: {
            ...state.loader,
            addDebentureListDetails: false,
          },
        };
    default:
      return state;
  }
};
const config = {
  storage,
  key: storageKeys.debenture,
  blacklist: ["loader"], // topic will not be persisted
};

export default persistReducer(config, debentureReducer);
// export default debentureReducer;
