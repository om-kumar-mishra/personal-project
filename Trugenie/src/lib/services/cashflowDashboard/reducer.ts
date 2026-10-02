import { CashflowDataActions } from "./action";
import { BuisnessPlanList, MisdatesFilters } from "./dataTypes";
import * as types from "./types";
type CashflowState = {
  buisnesPlanList: BuisnessPlanList | null;
  misdatesList: MisdatesFilters | null;
  loaders: {
    buisnesPlanListLoader: boolean;
    misdatesList: boolean;
  };
};
const initialState: CashflowState = {
  buisnesPlanList: null,
  misdatesList: null,
  loaders: {
    buisnesPlanListLoader: false,
    misdatesList: false,
  },
};

const CashflowReducer = (state: CashflowState = initialState, action: CashflowDataActions): CashflowState => {
  switch (action.type) {
    // business and underewritem
    case types.GET_BUISNESS_PLAN_LIST_REQUEST:
      return {
        ...state,
        buisnesPlanList: null,
        loaders: {
          ...state.loaders,
          buisnesPlanListLoader: true,
        },
      };
    case types.GET_BUISNESS_PLAN_LIST_SUCCESS:
      return {
        ...state,
        buisnesPlanList: action.payload,
        loaders: {
          ...state.loaders,
          buisnesPlanListLoader: false,
        },
      };

    case types.GET_BUISNESS_PLAN_LIST_FAILURE:
      return {
        ...state,
        buisnesPlanList: null,
        loaders: {
          ...state.loaders,
          buisnesPlanListLoader: false,
        },
      };

    // misdates filters
    case types.GET_MISDATE_CASHFLOW_LIST_REQUEST:
      return {
        ...state,
        misdatesList: null,
        loaders: {
          ...state.loaders,
          misdatesList: true,
        },
      };
    case types.GET_MISDATE_CASHFLOW_LIST_SUCCESS:
      return {
        ...state,
        misdatesList: action.result,
        loaders: {
          ...state.loaders,
          misdatesList: false,
        },
      };
    case types.GET_MISDATE_CASHFLOW_LIST_FAILURE:
      return {
        ...state,
        misdatesList: null,
        loaders: {
          ...state.loaders,
          misdatesList: false,
        },
      };
    default:
      return state;
  }
};

export default CashflowReducer;
