import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
import { storageKeys } from "../../../../utils/constants";
import { RMUserActions } from "./actions";
import { GetClientData, GetRmUsersDataType, ValidateExcelResponse } from "./dataTypes";
import * as types from "./types";

type RMUserState = {
  rmUserList: GetRmUsersDataType[] | null;
  taggedRmUserList: GetRmUsersDataType[] | null;
  validateExcel?: ValidateExcelResponse;
  getSwitchClientList?: GetClientData[];
  switchClient?: GetClientData;
  loaders: {
    getRMUserList: boolean;
    getTaggedRMUserList: boolean;
    getReset: boolean;
    validateExcel: boolean;
    downloadErrorFile: boolean;
    getSwitchClientList: boolean;
  };
};

const initialState: RMUserState = {
  rmUserList: null,
  taggedRmUserList: null,
  validateExcel: undefined,
  getSwitchClientList: undefined,
  switchClient: undefined,
  loaders: {
    getRMUserList: false,
    getTaggedRMUserList: false,
    getReset: false,
    validateExcel: false,
    downloadErrorFile: false,
    getSwitchClientList: false,
  },
};

const hdfcCommonsReducer = (state: RMUserState = initialState, action: RMUserActions): RMUserState => {
  switch (action.type) {
    case types.GET_RM_USERS_REQUESTED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          getRMUserList: true,
        },
      };

    case types.GET_RM_USERS_SUCCEEDED:
      return {
        ...state,
        rmUserList: action.payload,
        loaders: {
          ...state.loaders,
          getRMUserList: false,
        },
      };

    case types.GET_RM_USERS_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          getRMUserList: false,
        },
      };

    case types.GET_TAGGED_RM_USERS_REQUESTED:
      return {
        ...state,
        taggedRmUserList: null,
        loaders: {
          ...state.loaders,
          getTaggedRMUserList: true,
        },
      };

    case types.GET_TAGGED_RM_USERS_SUCCEEDED:
      return {
        ...state,
        taggedRmUserList: action.payload,
        loaders: {
          ...state.loaders,
          getTaggedRMUserList: false,
        },
      };

    case types.GET_TAGGED_RM_USERS_FAILED:
      return {
        ...state,
        taggedRmUserList: null,
        loaders: {
          ...state.loaders,
          getTaggedRMUserList: false,
        },
      };

    case types.RESET_TAGGED_RM_USERS:
      return {
        ...state,
        taggedRmUserList: null,
      };

    case types.RESET_TAGGED_RM_USER_LIST:
      return {
        ...state,
        taggedRmUserList: null,
        loaders: {
          ...state.loaders,
        },
      };

    case types.VALIDATE_EXCEL_REQUESTED:
      return {
        ...state,
        validateExcel: undefined,
        loaders: {
          ...state.loaders,
          validateExcel: true,
        },
      };

    case types.VALIDATE_EXCEL_SUCCEEDED:
      return {
        ...state,
        validateExcel: action.result,
        loaders: {
          ...state.loaders,
          validateExcel: false,
        },
      };

    case types.VALIDATE_EXCEL_FAILED:
      return {
        ...state,
        validateExcel: undefined,
        loaders: {
          ...state.loaders,
          validateExcel: false,
        },
      };

    case types.DOWNLOAD_EXCEL_ERROR_FILE_REQUESTED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          downloadErrorFile: true,
        },
      };

    case types.DOWNLOAD_EXCEL_ERROR_FILE_SUCCEEDED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          downloadErrorFile: false,
        },
      };

    case types.DOWNLOAD_EXCEL_ERROR_FILE_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          downloadErrorFile: false,
        },
      };

    case types.GET_SWITCH_CLIENT_LIST_REQUESTED:
      return {
        ...state,
        getSwitchClientList: undefined,
        loaders: {
          ...state.loaders,
          getSwitchClientList: true,
        },
      };

    case types.GET_SWITCH_CLIENT_LIST_SUCCEEDED:
      return {
        ...state,
        getSwitchClientList: action.result,
        loaders: {
          ...state.loaders,
          getSwitchClientList: false,
        },
      };

    case types.GET_SWITCH_CLIENT_LIST_FAILED:
      return {
        ...state,
        getSwitchClientList: undefined,
        loaders: {
          ...state.loaders,
          getSwitchClientList: false,
        },
      };
    case types.SWITCH_CLIENT:
      return {
        ...state,
        switchClient: action.result,
      };

    default:
      return state;
  }
};
const config = {
  storage,
  key: storageKeys.common,
  blacklist: ["loaders"], // topic will not be persisted
};

export default persistReducer(config, hdfcCommonsReducer);
