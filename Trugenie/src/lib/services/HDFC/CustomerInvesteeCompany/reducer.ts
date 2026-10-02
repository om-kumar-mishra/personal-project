import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
import { storageKeys } from "../../../../utils/constants";
import { CustomerInvesteeListActions } from "./actions";
import { CustomerInvesteeListDataType, FilteredInvesteeGroup } from "./dataTypes";
import * as types from "./types";

type CustomerInvesteeState = {
  customerInvesteeList: CustomerInvesteeListDataType[] | null;
  filteredCustomerInvesteeList: FilteredInvesteeGroup[] | null;
  loaders: {
    customerInvesteeList: boolean;
    addCustomerInvestee: boolean;
    editCustomerInvestee: boolean;
    viewCustomerInvestee: boolean;
    filteredCustomerInvesteeList: boolean;
  };
};

const initialState: CustomerInvesteeState = {
  customerInvesteeList: null,
  filteredCustomerInvesteeList: null,
  loaders: {
    customerInvesteeList: false,
    addCustomerInvestee: false,
    editCustomerInvestee: false,
    viewCustomerInvestee: false,
    filteredCustomerInvesteeList: false,
  },
};

const customerInvesteeReducer = (state: CustomerInvesteeState = initialState, action: CustomerInvesteeListActions): CustomerInvesteeState => {
  switch (action.type) {
    case types.GET_CUSTOMER_INVESTEE_LIST_REQUESTED:
      return {
        ...state,
        customerInvesteeList: null,
        loaders: {
          ...state.loaders,
          customerInvesteeList: true,
        },
      };
    case types.GET_CUSTOMER_INVESTEE_LIST_SUCCEEDED:
      return {
        ...state,
        customerInvesteeList: action.customerInvesteeList,
        loaders: {
          ...state.loaders,
          customerInvesteeList: false,
        },
      };
    case types.GET_CUSTOMER_INVESTEE_LIST_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          customerInvesteeList: false,
        },
      };

    case types.ADD_CUSTOMER_INVESTEE_REQUESTED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          addCustomerInvestee: true,
        },
      };

    case types.ADD_CUSTOMER_INVESTEE_SUCCEEDED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          addCustomerInvestee: false,
        },
      };

    case types.ADD_CUSTOMER_INVESTEE_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          addCustomerInvestee: false,
        },
      };

    case types.EDIT_CUSTOMER_INVESTEE_REQUESTED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          editCustomerInvestee: true,
        },
      };

    case types.EDIT_CUSTOMER_INVESTEE_SUCCEEDED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          editCustomerInvestee: false,
        },
      };

    case types.EDIT_CUSTOMER_INVESTEE_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          editCustomerInvestee: false,
        },
      };

    case types.VIEW_CUSTOMER_INVESTEE_REQUESTED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          viewCustomerInvestee: true,
        },
      };

    case types.VIEW_CUSTOMER_INVESTEE_SUCCEEDED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          viewCustomerInvestee: false,
        },
      };

    case types.VIEW_CUSTOMER_INVESTEE_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          viewCustomerInvestee: false,
        },
      };

    case types.GET_FILTERED_INVESTEE_LIST_REQUESTED:
      return {
        ...state,
        filteredCustomerInvesteeList: null,
        loaders: {
          ...state.loaders,
          filteredCustomerInvesteeList: true,
        },
      };

    case types.GET_FILTERED_INVESTEE_LIST_SUCCEEDED:
      return {
        ...state,
        filteredCustomerInvesteeList: action.customerInvesteeList,
        loaders: {
          ...state.loaders,
          filteredCustomerInvesteeList: false,
        },
      };

    case types.GET_FILTERED_INVESTEE_LIST_FAILED:
      return {
        ...state,
        filteredCustomerInvesteeList: null,
        loaders: {
          ...state.loaders,
          filteredCustomerInvesteeList: false,
        },
      };

    case types.RESET_FILTERED_INVESTEE_LIST:
      return {
        ...state,
        filteredCustomerInvesteeList: null,
      };

    default:
      return state;
  }
};
const config = {
  storage,
  key: storageKeys.customerInvestee,
  blacklist: ["loaders"], // topic will not be persisted
};

export default persistReducer(config, customerInvesteeReducer);
