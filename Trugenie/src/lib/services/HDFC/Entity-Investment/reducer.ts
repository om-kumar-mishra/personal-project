import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
import { storageKeys } from "../../../../utils/constants";
import * as actionTypes from "./types";
import { InvestmentActions } from "./action";
import { AddInvestmentListResponse, InvestmentListData } from "./dataTypes";

type InvestmentState = {
  investmentList?: InvestmentListData[];
  addInvestmentListDetails?: AddInvestmentListResponse;
  deleteInvestmentListDetails?: AddInvestmentListResponse;
  loader: {
    investmentList: boolean;
    addInvestmentListDetails: boolean;
    deleteInvestmentListDetails: boolean;
  };
};

const initialState: InvestmentState = {
  investmentList: undefined,
  addInvestmentListDetails: undefined,
  deleteInvestmentListDetails: undefined,
  loader: {
    investmentList: false,
    addInvestmentListDetails: false,
    deleteInvestmentListDetails: false,
  },
};

const entityInvestmentReducer = (state: InvestmentState = initialState, action: InvestmentActions): InvestmentState => {
  switch (action.type) {

    // investment-list
    case actionTypes.GET_ENTITY_INVESTMENT_LIST_REQUESTED:
      return {
        ...state,
        investmentList: undefined,
        loader: {
          ...state.loader,
          investmentList: true,
        },
      };
    case actionTypes.GET_ENTITY_INVESTMENT_LIST_SUCCEEDED:
      return {
        ...state,
        investmentList: action.result,
        loader: {
          ...state.loader,
          investmentList: false,
        },
      };
    case actionTypes.GET_ENTITY_INVESTMENT_LIST_FAILED:
      return {
        ...state,
        investmentList: undefined,
        loader: {
          ...state.loader,
          investmentList: false,
        },
      };
    case actionTypes.ADD_ENTITY_INVESTMENT_LIST_REQUESTED:
      return {
        ...state,
        addInvestmentListDetails: undefined,
        loader: {
          ...state.loader,
          addInvestmentListDetails: true,
        },
      };
    case actionTypes.ADD_ENTITY_INVESTMENT_LIST_SUCCEEDED:
      return {
        ...state,
        addInvestmentListDetails: action.result,
        loader: {
          ...state.loader,
          addInvestmentListDetails: false,
        },
      };
    case actionTypes.ADD_ENTITY_INVESTMENT_LIST_FAILED:
      return {
        ...state,
        addInvestmentListDetails: undefined,
        loader: {
          ...state.loader,
          addInvestmentListDetails: false,
        },
      };
      case actionTypes.DELETE_ENTITY_INVESTMENT_LIST_REQUESTED:
        return {
          ...state,
          deleteInvestmentListDetails: undefined,
          loader: {
            ...state.loader,
            deleteInvestmentListDetails: true,
          },
        };
      case actionTypes.DELETE_ENTITY_INVESTMENT_LIST_SUCCEEDED:
        return {
          ...state,
          deleteInvestmentListDetails: action.result,
          loader: {
            ...state.loader,
            deleteInvestmentListDetails: false,
          },
        };
      case actionTypes.DELETE_ENTITY_INVESTMENT_LIST_FAILED:
        return {
          ...state,
          deleteInvestmentListDetails: undefined,
          loader: {
            ...state.loader,
            deleteInvestmentListDetails: false,
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

export default persistReducer(config, entityInvestmentReducer);
// export default entityInvestmentReducer;
