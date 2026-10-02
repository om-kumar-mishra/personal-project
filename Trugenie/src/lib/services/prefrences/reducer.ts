import PrefrencesActions from "./actions";
import { CalculateCashCoverResponse, GetUpdateHoldStatusResponse, NOCProjectPrefrenceResponse, ReProjectExposureResponse, ReProjectSecurityResponse } from "./dataTypes";
import * as Types from "./types";

type PrefrenceState = {
  cashCoverDetail?: CalculateCashCoverResponse;
  reProjectExposure?: ReProjectExposureResponse;
  reProjectSecurity?: ReProjectSecurityResponse;
  nocProjectPrefrence?: NOCProjectPrefrenceResponse;
  getUpdateHoldStatus?: GetUpdateHoldStatusResponse;
  loaders: {
    nocProjectPrefrence: boolean;
    reProjectExposure: boolean;
    reProjectSecurity: boolean;
    updateCashCover: boolean;
    updateReProjectSecurity: boolean;
    updateAccountDelinquent: boolean;
    calculateCashCover: boolean;
    getUpdateHoldStatusLoader: boolean;
  };
};
const initialState: PrefrenceState = {
  //   cashCoverDetail: [],
  loaders: {
    nocProjectPrefrence: false,
    getUpdateHoldStatusLoader: false,
    reProjectExposure: false,
    reProjectSecurity: false,
    updateCashCover: false,
    updateReProjectSecurity: false,
    updateAccountDelinquent: false,
    calculateCashCover: false,
  },
};

const NOCPreferenceReducer = (state: PrefrenceState = initialState, action: PrefrencesActions): PrefrenceState => {
  switch (action.type) {
    //#region [NOC Project Prefrence]
    case Types.NOC_PROJECT_PREFRENCE_REQUESTED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          nocProjectPrefrence: true,
        },
      };
    case Types.NOC_PROJECT_PREFRENCE_SUCCESS:
      return {
        ...state,
        nocProjectPrefrence: action.result,
        loaders: {
          ...state.loaders,
          nocProjectPrefrence: false,
        },
      };
    case Types.NOC_PROJECT_PREFRENCE_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          reProjectExposure: true,
        },
      };

    //#region [Re Project Exposure]
    case Types.REPROJECT_EXPOSURE_REQUESTED:
      return {
        ...state,
        // reProjectExposure: undefined,
        loaders: {
          ...state.loaders,
          reProjectExposure: true,
        },
      };
    case Types.REPROJECT_EXPOSURE_SUCCESS:
      return {
        ...state,
        reProjectExposure: action.result,
        loaders: {
          ...state.loaders,
          reProjectExposure: false,
        },
      };
    case Types.REPROJECT_EXPOSURE_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          reProjectExposure: false,
        },
      };

    //#region [Re Project Security]
    case Types.REPROJECT_SECURITY_REQUESTED:
      return {
        ...state,
        reProjectSecurity: undefined,
        loaders: {
          ...state.loaders,
          reProjectSecurity: true,
        },
      };
    case Types.REPROJECT_SECURITY_SUCCESS:
      return {
        ...state,
        reProjectSecurity: action.result,
        loaders: {
          ...state.loaders,
          reProjectSecurity: false,
        },
      };
    case Types.REPROJECT_SECURITY_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          reProjectSecurity: false,
        },
      };

    //#region [update cash cover]
    case Types.UPDATE_CASH_COVER_REQUESTED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          updateCashCover: true,
        },
      };
    case Types.UPDATE_CASH_COVER_SUCCESS:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          updateCashCover: false,
        },
      };
    case Types.UPDATE_CASH_COVER_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          updateCashCover: false,
        },
      };

    //#region [update ReProject Security]
    case Types.UPDATE_REPROJECT_SECURITY_REQUESTED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          updateReProjectSecurity: true,
        },
      };
    case Types.UPDATE_REPROJECT_SECURITY_SUCCESS:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          updateReProjectSecurity: false,
        },
      };
    case Types.UPDATE_REPROJECT_SECURITY_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          updateReProjectSecurity: false,
        },
      };

    //#region [update account delinquent]
    case Types.UPDATE_ACCOUNT_DELINQUENT_REQUESTED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          updateAccountDelinquent: true,
        },
      };
    case Types.UPDATE_ACCOUNT_DELINQUENT_SUCCESS:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          updateAccountDelinquent: false,
        },
      };
    case Types.UPDATE_ACCOUNT_DELINQUENT_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          updateAccountDelinquent: false,
        },
      };

    //#region [calculate cash cover]
    case Types.CALCULATE_CASH_COVER_REQUESTED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          calculateCashCover: true,
        },
      };
    case Types.CALCULATE_CASH_COVER_SUCCESS:
      return {
        ...state,
        cashCoverDetail: action.result,
        loaders: {
          ...state.loaders,
          calculateCashCover: false,
        },
      };
    case Types.CALCULATE_CASH_COVER_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          calculateCashCover: false,
        },
      };
    case Types.GET_UPDATE_HOLD_STATUS_REQUESTED:
      return {
        ...state,
        getUpdateHoldStatus: undefined,
        loaders: {
          ...state.loaders,
          getUpdateHoldStatusLoader: true,
        },
      };
    case Types.GET_UPDATE_HOLD_STATUS_SUCCESS:
      return {
        ...state,
        getUpdateHoldStatus: action.result,
        loaders: {
          ...state.loaders,
          getUpdateHoldStatusLoader: false,
        },
      };
    case Types.GET_UPDATE_HOLD_STATUS_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          getUpdateHoldStatusLoader: false,
        },
      };

    default:
      return state;
  }
};

export default NOCPreferenceReducer;
