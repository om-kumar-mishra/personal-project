import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
import { storageKeys } from "../../../../utils/constants";
import { CustomerGroupListActions } from "./actions";
import { CustomerGroupListDataType } from "./dataTypes";
import * as types from "./types";

type CustomerGroupState = {
  customerGroupList: CustomerGroupListDataType[] | null;
  loaders: {
    customerGroupList: boolean;
    addCustomerGroup: boolean;
    editCustomerGroup: boolean;
  };
};

const initialState: CustomerGroupState = {
  customerGroupList: null,
  loaders: {
    customerGroupList: false,
    addCustomerGroup: false,
    editCustomerGroup: false,
  },
};

const customerGroupReducer = (state: CustomerGroupState = initialState, action: CustomerGroupListActions): CustomerGroupState => {
  switch (action.type) {
    case types.GET_CUSTOMER_GROUP_LIST_REQUESTED:
      return {
        ...state,
        customerGroupList: null,
        loaders: {
          ...state.loaders,
          customerGroupList: true,
        },
      };
    case types.GET_CUSTOMER_GROUP_LIST_SUCCEEDED:
      return {
        ...state,
        customerGroupList: action.customerGroupList.data,
        loaders: {
          ...state.loaders,
          customerGroupList: false,
        },
      };
    case types.GET_CUSTOMER_GROUP_LIST_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          customerGroupList: false,
        },
      };

    case types.ADD_CUSTOMER_GROUP_REQUESTED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          addCustomerGroup: true,
        },
      };

    case types.ADD_CUSTOMER_GROUP_SUCCEEDED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          addCustomerGroup: false,
        },
      };

    case types.ADD_CUSTOMER_GROUP_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          addCustomerGroup: false,
        },
      };

    case types.EDIT_CUSTOMER_GROUP_REQUESTED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          editCustomerGroup: true,
        },
      };

    case types.EDIT_CUSTOMER_GROUP_SUCCEEDED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          editCustomerGroup: false,
        },
      };

    case types.EDIT_CUSTOMER_GROUP_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          editCustomerGroup: false,
        },
      };

    default:
      return state;
  }
};
const config = {
  storage,
  key: storageKeys.customerGroup,
  blacklist: ["loaders"], // topic will not be persisted
};

export default persistReducer(config, customerGroupReducer);
