import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
import { storageKeys } from "../../../../utils/constants";
import * as actionTypes from "./types";
import { LenderActions } from "./actions";
import {
  AddLenderListResponse,
  LenderListData,
  AddUserLenderResponse,
  getClientUserResponse,
  GetClientAllUserData,
  RemoveUserLenderResponse
} from "./dataTypes";

type LenderState = {
  lenderList?: LenderListData[];
  addLenderListDetails?: AddLenderListResponse;
  addUserLenderDetails?: AddUserLenderResponse;
  clientAllUserList?: GetClientAllUserData[];
  removeUserLenderDetails?: RemoveUserLenderResponse;
  loader: {
    lenderList: boolean;
    addLenderListDetails: boolean;
    addUserLenderDetails:boolean;
    clientAllUserList:boolean;
    removeUserLenderDetails:boolean;
    
  };
};

const initialState: LenderState = {
    lenderList: undefined,
    addLenderListDetails: undefined,
    addUserLenderDetails:undefined,
    clientAllUserList:undefined,
    removeUserLenderDetails:undefined,
  loader: {
    lenderList: false,
    addLenderListDetails: false,
    addUserLenderDetails:false,
    clientAllUserList:false,
    removeUserLenderDetails:false,
  },
};

const lenderReducer = (state: LenderState = initialState, action: LenderActions): LenderState => {
  switch (action.type) {

    // lender-list
    case actionTypes.GET_LENDER_LIST_REQUESTED:
      return {
        ...state,
        lenderList: undefined,
        loader: {
          ...state.loader,
          lenderList: true,
        },
      };
    case actionTypes.GET_LENDER_LIST_SUCCEEDED:
      return {
        ...state,
        lenderList: action.result,
        loader: {
          ...state.loader,
          lenderList: false,
        },
      };
    // case actionTypes.GET_LENDER_LIST_FAILED:
    //   return {
    //     ...state,
    //     lenderList: undefined,
    //     loader: {
    //       ...state.loader,
    //       lenderList: false,
    //     },
    //   };
      case actionTypes.ADD_LENDER_LIST_REQUESTED:
        return {
          ...state,
          addLenderListDetails: undefined,
          loader: {
            ...state.loader,
            addLenderListDetails: true,
          },
        };
      case actionTypes.ADD_LENDER_LIST_SUCCEEDED:
        return {
          ...state,
          addLenderListDetails: action.result,
          loader: {
            ...state.loader,
            addLenderListDetails: false,
          },
        };
      case actionTypes.ADD_LENDER_LIST_FAILED:
        return {
          ...state,
          addLenderListDetails: undefined,
          loader: {
            ...state.loader,
            addLenderListDetails: false,
          },
        };


        
      case actionTypes.ADD_LENDER_USER_REQUESTED:
        return {
          ...state,
          addUserLenderDetails: undefined,
          loader: {
            ...state.loader,
            addUserLenderDetails: true,
          },
        };
      case actionTypes.ADD_LENDER_USER_SUCCEEDED:
        return {
          ...state,
          addUserLenderDetails: action.result,
          loader: {
            ...state.loader,
            addUserLenderDetails: false,
          },
        };
      case actionTypes.ADD_LENDER_USER_FAILED:
        return {
          ...state,
          addUserLenderDetails: undefined,
          loader: {
            ...state.loader,
            addUserLenderDetails: false,
          },
        };

        
      case actionTypes.GET_CLIENT_ALL_USER_REQUESTED:
        return {
          ...state,
          clientAllUserList: undefined,
          loader: {
            ...state.loader,
            clientAllUserList: true,
          },
        };
      case actionTypes.GET_CLIENT_ALL_USER_SUCCEEDED:
        return {
          ...state,
          clientAllUserList: action.result.data,
          loader: {
            ...state.loader,
            clientAllUserList: false,
          },
        };
      case actionTypes.GET_CLIENT_ALL_USER_FAILED:
        return {
          ...state,
          clientAllUserList: undefined,
          loader: {
            ...state.loader,
            clientAllUserList: false,
          },
        };


        
      case actionTypes.REMOVE_LENDER_USER_REQUESTED:
        return {
          ...state,
          removeUserLenderDetails: undefined,
          loader: {
            ...state.loader,
            removeUserLenderDetails: true,
          },
        };
      case actionTypes.REMOVE_LENDER_USER_SUCCEEDED:
        return {
          ...state,
          removeUserLenderDetails: action.result,
          loader: {
            ...state.loader,
            removeUserLenderDetails: false,
          },
        };
      case actionTypes.REMOVE_LENDER_USER_FAILED:
        return {
          ...state,
          removeUserLenderDetails: undefined,
          loader: {
            ...state.loader,
            removeUserLenderDetails: false,
          },
        };

        
    default:
      return state;
  }
};
const config = {
  storage,
  key: storageKeys.lender,
  blacklist: ["loader"], // topic will not be persisted
};

export default persistReducer(config, lenderReducer);
// export default lenderReducer;
