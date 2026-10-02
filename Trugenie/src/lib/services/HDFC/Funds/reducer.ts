import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
import { storageKeys } from "../../../../utils/constants";
import * as actionTypes from "./types";
import { AddFundsListResponse, FundsListData } from "./dataTypes";
import { FundsActions } from "./action";

type FundsState = {
  fundsList?: FundsListData[];
  addFundsListDetails?: AddFundsListResponse;
  deleteFundsListDetails?: AddFundsListResponse;
  loader: {
    fundsList: boolean;
    addFundsListDetails: boolean;
    deleteFundsListDetails: boolean;
  };
};

const initialState: FundsState = {
  fundsList: undefined,
  addFundsListDetails: undefined,
  deleteFundsListDetails: undefined,
  loader: {
    fundsList: false,
    addFundsListDetails: false,
    deleteFundsListDetails: false,
  },
};

const fundReducer = (state: FundsState = initialState, action: FundsActions): FundsState => {
  switch (action.type) {

    // funds-list
    case actionTypes.GET_FUNDS_LIST_REQUESTED:
      return {
        ...state,
        fundsList: undefined,
        loader: {
          ...state.loader,
          fundsList: true,
        },
      };
    case actionTypes.GET_FUNDS_LIST_SUCCEEDED:
      return {
        ...state,
        fundsList: action.result,
        loader: {
          ...state.loader,
          fundsList: false,
        },
      };
    case actionTypes.GET_FUNDS_LIST_FAILED:
      return {
        ...state,
        fundsList: undefined,
        loader: {
          ...state.loader,
          fundsList: false,
        },
      };
    case actionTypes.ADD_FUNDS_LIST_REQUESTED:
      return {
        ...state,
        addFundsListDetails: undefined,
        loader: {
          ...state.loader,
          addFundsListDetails: true,
        },
      };
    case actionTypes.ADD_FUNDS_LIST_SUCCEEDED:
      return {
        ...state,
        addFundsListDetails: action.result,
        loader: {
          ...state.loader,
          addFundsListDetails: false,
        },
      };
    case actionTypes.ADD_FUNDS_LIST_FAILED:
      return {
        ...state,
        addFundsListDetails: undefined,
        loader: {
          ...state.loader,
          addFundsListDetails: false,
        },
      };
      case actionTypes.DELETE_FUNDS_LIST_REQUESTED:
        return {
          ...state,
          deleteFundsListDetails: undefined,
          loader: {
            ...state.loader,
            deleteFundsListDetails: true,
          },
        };
      case actionTypes.DELETE_FUNDS_LIST_SUCCEEDED:
        return {
          ...state,
          deleteFundsListDetails: action.result,
          loader: {
            ...state.loader,
            deleteFundsListDetails: false,
          },
        };
      case actionTypes.DELETE_FUNDS_LIST_FAILED:
        return {
          ...state,
          deleteFundsListDetails: undefined,
          loader: {
            ...state.loader,
            deleteFundsListDetails: false,
          },
        };
    default:
      return state;
  }
};
const config = {
  storage,
  key: storageKeys.sales,
  blacklist: ["loader"], // topic will not be persisted
};

export default persistReducer(config, fundReducer);
// export default fundsReducer;
