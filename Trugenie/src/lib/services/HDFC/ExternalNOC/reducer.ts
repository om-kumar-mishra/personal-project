import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
import { storageKeys } from "../../../../utils/constants";
import { ExternalNOCActions } from "./actions";
import { NOCAccounts, NOCPriceHeader, PaymentVerificationResponse, SalesUnitForNOC } from "./dataTypes";
import * as actionTypes from "./types";
// const storage = storageData;

type ExternalNOCState = {
  nocTypeList?: string[];
  salesUnitForNOCList?: SalesUnitForNOC[];
  nocPriceHeaderList?: NOCPriceHeader[];
  nocAccountsList?: NOCAccounts[];
  paymentList?: PaymentVerificationResponse;
  loader: {
    nocTypeList: boolean;
    salesUnitForNOCList: boolean;
    nocPriceHeaderList: boolean;
    nocAccountsList: boolean;
    paymentVerfication: boolean;
    createNOC: boolean;
  };
};

const initialState: ExternalNOCState = {
  nocTypeList: undefined,
  salesUnitForNOCList: undefined,
  nocPriceHeaderList: undefined,
  nocAccountsList: undefined,
  loader: {
    nocTypeList: false,
    salesUnitForNOCList: false,
    nocPriceHeaderList: false,
    nocAccountsList: false,
    paymentVerfication: false,
    createNOC: false,
  },
};

const externalNOCReducer = (state: ExternalNOCState = initialState, action: ExternalNOCActions): ExternalNOCState => {
  switch (action.type) {
    // noc-type
    case actionTypes.GET_NOC_TYPES_REQUESTED:
      return {
        ...state,
        nocTypeList: undefined,
        loader: {
          ...state.loader,
          nocTypeList: true,
        },
      };

    case actionTypes.GET_NOC_TYPES_SUCCEEDED:
      return {
        ...state,
        nocTypeList: action.result.data,
        loader: {
          ...state.loader,
          nocTypeList: false,
        },
      };

    case actionTypes.GET_NOC_TYPES_RESET:
      return {
        ...state,
        nocTypeList: undefined,
        loader: {
          ...state.loader,
          nocTypeList: false,
        },
      };

    case actionTypes.GET_NOC_TYPES_FAILED:
      return {
        ...state,
        loader: {
          ...state.loader,
          nocTypeList: false,
        },
      };

    // sales-unit-for-noc
    case actionTypes.GET_SALES_UNIT_FOR_NOC_REQUESTED:
      return {
        ...state,
        salesUnitForNOCList: undefined,
        loader: {
          ...state.loader,
          salesUnitForNOCList: true,
        },
      };

    case actionTypes.GET_SALES_UNIT_FOR_NOC_SUCCEEDED:
      return {
        ...state,
        salesUnitForNOCList: action.result.data,
        loader: {
          ...state.loader,
          salesUnitForNOCList: false,
        },
      };

    case actionTypes.GET_SALES_UNIT_FOR_NOC_RESET:
      return {
        ...state,
        salesUnitForNOCList: undefined,
        loader: {
          ...state.loader,
          salesUnitForNOCList: false,
        },
      };

    case actionTypes.GET_SALES_UNIT_FOR_NOC_FAILED:
      return {
        ...state,
        loader: {
          ...state.loader,
          salesUnitForNOCList: false,
        },
      };

    // noc-price-header
    case actionTypes.GET_NOC_PRICE_HEADER_REQUESTED:
      return {
        ...state,
        nocPriceHeaderList: undefined,
        loader: {
          ...state.loader,
          nocPriceHeaderList: true,
        },
      };

    case actionTypes.GET_NOC_PRICE_HEADER_SUCCEEDED:
      return {
        ...state,
        nocPriceHeaderList: action.result.data,
        loader: {
          ...state.loader,
          nocPriceHeaderList: false,
        },
      };

    case actionTypes.GET_NOC_PRICE_HEADER_RESET:
      return {
        ...state,
        nocPriceHeaderList: undefined,
        loader: {
          ...state.loader,
          nocPriceHeaderList: false,
        },
      };

    case actionTypes.GET_NOC_PRICE_HEADER_FAILED:
      return {
        ...state,
        loader: {
          ...state.loader,
          nocPriceHeaderList: false,
        },
      };

    // noc-accounts
    case actionTypes.GET_NOC_ACCOUNTS_REQUESTED:
      return {
        ...state,
        loader: {
          ...state.loader,
          nocAccountsList: true,
        },
      };

    case actionTypes.GET_NOC_ACCOUNTS_SUCCEEDED:
      return {
        ...state,
        nocAccountsList: action.result.data,
        loader: {
          ...state.loader,
          nocAccountsList: false,
        },
      };

    case actionTypes.GET_NOC_ACCOUNTS_RESET:
      return {
        ...state,
        nocAccountsList: undefined,
        loader: {
          ...state.loader,
          nocAccountsList: false,
        },
      };

    case actionTypes.GET_NOC_ACCOUNTS_FAILED:
      return {
        ...state,
        loader: {
          ...state.loader,
          nocAccountsList: false,
        },
      };

    // payment-verification
    case actionTypes.PAYMENT_VERIFICATION_SUCCEEDED:
      return {
        ...state,
        paymentList: action.result,
        loader: {
          ...state.loader,
          paymentVerfication: false,
        },
      };

    case actionTypes.PAYMENT_VERIFICATION_RESET:
      return {
        ...state,
        paymentList: undefined,
        loader: {
          ...state.loader,
          paymentVerfication: false,
        },
      };

    // create-external-noc
    case actionTypes.ADD_EXTERNAL_NOC_REQUESTED:
      return {
        ...state,
        loader: {
          ...state.loader,
          createNOC: true,
        },
      };

    case actionTypes.ADD_EXTERNAL_NOC_SUCCEEDED:
      return {
        ...state,
        loader: {
          ...state.loader,
          createNOC: false,
        },
      };

    case actionTypes.ADD_EXTERNAL_NOC_FAILED:
      return {
        ...state,
        loader: {
          ...state.loader,
          createNOC: false,
        },
      };

    case actionTypes.PAYMENT_VERIFICATION_REQUESTED:
      return {
        ...state,
        loader: {
          ...state.loader,
          paymentVerfication: true,
        },
      };

    case actionTypes.PAYMENT_VERIFICATION_FAILED:
      return {
        ...state,
        loader: {
          ...state.loader,
          paymentVerfication: false,
        },
      };

    default:
      return state;
  }
};
const config = {
  storage,
  key: storageKeys.externalNoc,
  blacklist: ["loader"], // topic will not be persisted
};

export default persistReducer(config, externalNOCReducer);
