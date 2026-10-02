import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
import { storageKeys } from "../../../../utils/constants";
import { FundsActions } from "./actions";
import { checkFundsDetailExist, FundsPastUpdate, FundsPendingList } from "./dataTypes";
import * as actionTypes from "./types";
// const storage = storageData;

type FundsState = {
  // fundsPastUpdate?:FundsPastUpdate[];

  fundsPastUpdateList?: FundsPastUpdate[];
  fundsPendingList?: FundsPendingList[];
  checkFundsDetailExist?: checkFundsDetailExist;
  // DeleteFundsPastHistory?:DeleteFundsPastHistory;

  loader: {
    fundsPastUpdateList: boolean;
    checkFundsDetailExist: boolean;
    fundsPendingList: boolean;
    uploadFundsTemplate: boolean;
    deleteFundsPastHistory: boolean;
    downloadFundTemplate: boolean;
  };
};

const initialState: FundsState = {
  fundsPastUpdateList: undefined,
  fundsPendingList: undefined,
  checkFundsDetailExist: undefined,
  loader: {
    fundsPastUpdateList: false,
    fundsPendingList: false,
    uploadFundsTemplate: false,
    checkFundsDetailExist: false,
    deleteFundsPastHistory: false,
    downloadFundTemplate: false,
  },
};

const fundsReducer = (state: FundsState = initialState, action: FundsActions): FundsState => {
  switch (action.type) {
    // funds-past-history
    case actionTypes.GET_FUNDS_PAST_UPDATE_REQUESTED:
      return {
        ...state,
        fundsPastUpdateList: undefined,
        loader: {
          ...state.loader,
          fundsPastUpdateList: true,
        },
      };
    case actionTypes.GET_FUNDS_PAST_UPDATE_SUCCEEDED:
      return {
        ...state,
        fundsPastUpdateList: action.result.data,
        loader: {
          ...state.loader,
          fundsPastUpdateList: false,
        },
      };
    case actionTypes.GET_FUNDS_PAST_UPDATE_FAILED:
      return {
        ...state,
        loader: {
          ...state.loader,
          fundsPastUpdateList: false,
        },
      };

    // upload-sales-template
    case actionTypes.INSERT_FUNDS_UPDATE_REQUESTED:
      return {
        ...state,
        loader: {
          ...state.loader,
          uploadFundsTemplate: true,
        },
      };
    case actionTypes.INSERT_FUNDS_UPDATE_SUCCEEDED:
      return {
        ...state,
        loader: {
          ...state.loader,
          uploadFundsTemplate: false,
        },
      };
    case actionTypes.INSERT_FUNDS_UPDATE_FAILED:
      return {
        ...state,
        loader: {
          ...state.loader,
          uploadFundsTemplate: false,
        },
      };

    //funds pendig
    case actionTypes.GET_PENDING_FUNDS_UPDATE_REQUESTED:
      return {
        ...state,
        fundsPendingList: undefined,
        loader: {
          ...state.loader,
          fundsPendingList: true,
        },
      };
    case actionTypes.GET_PENDING_FUNDS_UPDATE_SUCCEEDED:
      return {
        ...state,
        fundsPendingList: action.result.data,
        loader: {
          ...state.loader,
          fundsPendingList: false,
        },
      };
    case actionTypes.GET_PENDING_FUNDS_UPDATE_FAILED:
      return {
        ...state,
        loader: {
          ...state.loader,
          fundsPendingList: false,
        },
      };

    case actionTypes.CHECK_FUNDS_DETAILS_EXIST_REQUESTED:
      return {
        ...state,
        checkFundsDetailExist: undefined,
        loader: {
          ...state.loader,
          checkFundsDetailExist: true,
        },
      };
    case actionTypes.CHECK_FUNDS_DETAILS_EXIST_SUCCEEDED:
      return {
        ...state,
        checkFundsDetailExist: action.result,
        loader: {
          ...state.loader,
          checkFundsDetailExist: false,
        },
      };
    case actionTypes.CHECK_FUNDS_DETAILS_EXIST_FAILED:
      return {
        ...state,
        checkFundsDetailExist: undefined,
        loader: {
          ...state.loader,
          checkFundsDetailExist: false,
        },
      };

    case actionTypes.DELETE_FUNDS_REQUESTED:
      return {
        ...state,
        loader: {
          ...state.loader,
          deleteFundsPastHistory: true,
        },
      };

    case actionTypes.DELETE_FUNDS_SUCCEEDED:
      return {
        ...state,
        loader: {
          ...state.loader,
          deleteFundsPastHistory: false,
        },
      };

    case actionTypes.DELETE_FUNDS_FAILED:
      return {
        ...state,
        loader: {
          ...state.loader,
          deleteFundsPastHistory: false,
        },
      };
    case actionTypes.DOWNLOAD_FUNDS_TEMPLATE_REQUESTED:
      return {
        ...state,
        loader: {
          ...state.loader,
          downloadFundTemplate: true,
        },
      };
    case actionTypes.DOWNLOAD_FUNDS_TEMPLATE_SUCCEEDED:
      return {
        ...state,
        loader: {
          ...state.loader,
          downloadFundTemplate: false,
        },
      };
    case actionTypes.DOWNLOAD_FUNDS_TEMPLATE_FAILED:
      return {
        ...state,
        loader: {
          ...state.loader,
          downloadFundTemplate: false,
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

export default persistReducer(config, fundsReducer);
