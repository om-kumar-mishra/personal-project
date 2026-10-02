import { NocActionType } from "./types";

export const initialState = {
  wings: {},
  dashboardDetails: {},
  towerView: [],
  loading: false,
  tokenExpire: false,
};

const NOCDashboardReducer = (state = initialState, action:any) => {
  switch (action.type) {
    case NocActionType.GET_WING_REQUESTED:
      return {
        ...state,
        wings: {},
        loading: true,
        tokenExpire: false,
      };
    case NocActionType.GET_WING_SUCCESS:
      return {
        ...state,
        wings: action.result,
        loading: false,
        tokenExpire:
          action.result?.status &&
          (action.result?.status === 401 || action.result?.status === 403),
      };
    case NocActionType.GET_WING_FAILED:
      return {
        ...state,
        wings: {},
        loading: false,
        tokenExpire:
          action.result?.status &&
          (action.result?.status === 401 || action.result?.status === 403),
      };
    case NocActionType.GET_NOC_DASHBOARD_DETAIL_REQUESTED:
      return {
        ...state,
        dashboardDetails: {},
        loading: true,
        tokenExpire: false,
      };
    case NocActionType.GET_NOC_DASHBOARD_DETAIL_SUCCESS:
      return {
        ...state,
        dashboardDetails: action.result,
        loading: false,
        tokenExpire:
          action.result?.status &&
          (action.result?.status === 401 || action.result?.status === 403),
      };
    case NocActionType.GET_NOC_DASHBOARD_DETAIL_FAILED:
      return {
        ...state,
        dashboardDetails: {},
        loading: false,
        tokenExpire:
          action.result?.status &&
          (action.result?.status === 401 || action.result?.status === 403),
      };
    case NocActionType.GET_NOC_DASHBOARD_TOWER_REQUESTED:
      return {
        ...state,
        towerView: {},
        loading: true,
        tokenExpire: false,
      };
    case NocActionType.GET_NOC_DASHBOARD_TOWER_SUCCESS:
      return {
        ...state,
        towerView: action.result,
        loading: false,
        tokenExpire:
          action.result?.status &&
          (action.result?.status === 401 || action.result?.status === 403),
      };
    case NocActionType.GET_NOC_DASHBOARD_TOWER_FAILED:
      return {
        ...state,
        towerView: {},
        loading: false,
        tokenExpire:
          action.result?.status &&
          (action.result?.status === 401 || action.result?.status === 403),
      };
    default:
      return state;
  }
};

export default NOCDashboardReducer;
