import {
  SalesDashboardDetailv2Response,
  SalesProjectApiResponse,
  SalesREUnitsApiResponse,
} from "./dataTypes";
import { SalesDashboardActionTypes as ActionTypes } from "./types";

type initialStateType = {
  dashboardDetailsv2: SalesDashboardDetailv2Response | undefined;
  projectNames: SalesProjectApiResponse | {};
  unitType: SalesREUnitsApiResponse | {};
  phase: any;
  tower: any;
  fiscal: any;
  salesMisHistory: any;
  reProjectType: any;
  reProjectSubType: any;
  reUnitLaunchStatus: any;
  reUnitSecurityStatus: any;
  reUnitApprovalStatus: any;
  reTowerV2: any;
  reWingV2: any;
  reUnitOwnedBy: any;
  dashboardDetails: any;
  loading: boolean;
  tokenExpire: boolean;
}

export const initialState: initialStateType = {
  projectNames: {},
  unitType: {},
  phase: {},
  tower: {},
  fiscal: {},
  salesMisHistory: {},
  reProjectType: {},
  reProjectSubType: {},
  reUnitLaunchStatus: {},
  reUnitSecurityStatus: {},
  reUnitApprovalStatus: {},
  reTowerV2: {},
  reWingV2: {},
  reUnitOwnedBy: {},
  dashboardDetails: {},
  dashboardDetailsv2: undefined,
  loading: false,
  tokenExpire: false,
};

interface Action {
  type: ActionTypes;
  result: any;
  payload: any;
}

const SalesDashboardReducer = (
  state: initialStateType = initialState,
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.GET_SALES_PROJECT_NAME_REQUESTED:
      return {
        ...state,
        projectNames: {},
        loading: true,
        tokenExpire: false,
      };
    case ActionTypes.GET_SALES_PROJECT_NAME_SUCCESS:
      return {
        ...state,
        projectNames: action.result,
        loading: false,
        tokenExpire:
          action.result?.status &&
          (action.result?.status === 401 || action.result?.status === 403),
      };
    case ActionTypes.GET_SALES_PROJECT_NAME_FAILED:
      return {
        ...state,
        projectNames: {},
        loading: false,
        tokenExpire:
          action.result?.status &&
          (action.result?.status === 401 || action.result?.status === 403),
      };
    case ActionTypes.GET_UNIT_TYPE_REQUESTED:
      return {
        ...state,
        unitType: {},
        loading: true,
        tokenExpire: false,
      };
    case ActionTypes.GET_UNIT_TYPE_SUCCESS:
      return {
        ...state,
        unitType: action.result,
        loading: false,
        tokenExpire:
          action.result?.status &&
          (action.result?.status === 401 || action.result?.status === 403),
      };
    case ActionTypes.GET_UNIT_TYPE_FAILED:
      return {
        ...state,
        unitType: {},
        loading: false,
        tokenExpire:
          action.result?.status &&
          (action.result?.status === 401 || action.result?.status === 403),
      };
    case ActionTypes.GET_PHASE_REQUESTED:
      return {
        ...state,
        phase: {},
        loading: true,
        tokenExpire: false,
      };
    case ActionTypes.GET_PHASE_SUCCESS:
      return {
        ...state,
        phase: action.result,
        loading: false,
        tokenExpire:
          action.result?.status &&
          (action.result?.status === 401 || action.result?.status === 403),
      };
    case ActionTypes.GET_PHASE_FAILED:
      return {
        ...state,
        phase: {},
        loading: false,
        tokenExpire:
          action.result?.status &&
          (action.result?.status === 401 || action.result?.status === 403),
      };
    case ActionTypes.GET_TOWER_REQUESTED:
      return {
        ...state,
        tower: {},
        loading: true,
        tokenExpire: false,
      };
    case ActionTypes.GET_TOWER_SUCCESS:
      return {
        ...state,
        tower: action.result,
        loading: false,
        tokenExpire:
          action.result?.status &&
          (action.result?.status === 401 || action.result?.status === 403),
      };
    case ActionTypes.GET_TOWER_FAILED:
      return {
        ...state,
        tower: {},
        loading: false,
        tokenExpire:
          action.result?.status &&
          (action.result?.status === 401 || action.result?.status === 403),
      };
    case ActionTypes.GET_FISCAL_YEAR_REQUESTED:
      return {
        ...state,
        fiscal: {},
        loading: true,
        tokenExpire: false,
      };
    case ActionTypes.GET_FISCAL_YEAR_SUCCESS:
      return {
        ...state,
        fiscal: action.result,
        loading: false,
        tokenExpire:
          action.result?.status &&
          (action.result?.status === 401 || action.result?.status === 403),
      };
    case ActionTypes.GET_FISCAL_YEAR_FAILED:
      return {
        ...state,
        fiscal: {},
        loading: false,
        tokenExpire:
          action.result?.status &&
          (action.result?.status === 401 || action.result?.status === 403),
      };
    case ActionTypes.GET_SALES_DASHBOARD_DETAILS_REQUESTED:
      return {
        ...state,
        dashboardDetails: {},
        loading: true,
        tokenExpire: false,
      };
    case ActionTypes.GET_SALES_DASHBOARD_DETAILS_SUCCESS:
      return {
        ...state,
        dashboardDetails: action.result,
        loading: false,
        tokenExpire:
          action.result?.status &&
          (action.result?.status === 401 || action.result?.status === 403),
      };
    case ActionTypes.GET_SALES_DASHBOARD_DETAILS_FAILED:
      return {
        ...state,
        dashboardDetails: {},
        loading: false,
        tokenExpire:
          action.result?.status &&
          (action.result?.status === 401 || action.result?.status === 403),
      };
    case ActionTypes.GET_SALES_DASHBOARD_DETAILS_V2_REQUESTED:
      return {
        ...state,
        dashboardDetailsv2: {},
        loading: true,
        tokenExpire: false,
      };
    case ActionTypes.GET_SALES_DASHBOARD_DETAILS_V2_SUCCESS:
      return {
        ...state,
        dashboardDetailsv2: action.result,
        loading: false,
        tokenExpire:
          action.result?.status &&
          (action.result?.status === 401 || action.result?.status === 403),
      };
    case ActionTypes.GET_SALES_DASHBOARD_DETAILS_V2_FAILED:
      return {
        ...state,
        dashboardDetailsv2: {},
        loading: false,
        tokenExpire:
          action.result?.status &&
          (action.result?.status === 401 || action.result?.status === 403),
      };

    case ActionTypes.REFRESH_SALES_DASHBOARD:
      return {
        ...initialState,
        projectNames: state.projectNames,
        fiscal: state.fiscal,
      };
    case ActionTypes.GET_SALES_MIS_HISTORY_REQUESTED:
      return {
        ...state,
        salesMisHistory: {},
        loading: true,
        tokenExpire: false,
      };
    case ActionTypes.GET_SALES_MIS_HISTORY_SUCCESS:
      return {
        ...state,
        salesMisHistory: action.result,
        // loading: false,
        tokenExpire:
          action.result?.status &&
          (action.result?.status === 401 || action.result?.status === 403),
      };
    case ActionTypes.GET_SALES_MIS_HISTORY_FAILED:
      return {
        ...state,
        salesMisHistory: {},
        loading: false,
        tokenExpire:
          action.result?.status &&
          (action.result?.status === 401 || action.result?.status === 403),
      };
    case ActionTypes.GET_RE_PROJECT_TYPE_REQUESTED:
      return {
        ...state,
        reProjectType: {},
        loading: true,
        tokenExpire: false,
      };
    case ActionTypes.GET_RE_PROJECT_TYPE_SUCCESS:
      return {
        ...state,
        reProjectType: action.result,
        loading: false,
        tokenExpire:
          action.result?.status &&
          (action.result?.status === 401 || action.result?.status === 403),
      };
    case ActionTypes.GET_RE_PROJECT_TYPE_FAILED:
      return {
        ...state,
        reProjectType: {},
        loading: false,
        tokenExpire:
          action.result?.status &&
          (action.result?.status === 401 || action.result?.status === 403),
      };
    case ActionTypes.GET_RE_PROJECT_SUB_TYPE_REQUESTED:
      return {
        ...state,
        reProjectSubType: {},
        loading: true,
        tokenExpire: false,
      };
    case ActionTypes.GET_RE_PROJECT_SUB_TYPE_SUCCESS:
      return {
        ...state,
        reProjectSubType: action.result,
        // loading: false,
        tokenExpire:
          action.result?.status &&
          (action.result?.status === 401 || action.result?.status === 403),
      };
    case ActionTypes.GET_RE_PROJECT_SUB_TYPE_FAILED:
      return {
        ...state,
        reProjectSubType: {},
        loading: false,
        tokenExpire:
          action.result?.status &&
          (action.result?.status === 401 || action.result?.status === 403),
      };
    case ActionTypes.GET_RE_UNIT_LAUNCH_STATUS_REQUESTED:
      return {
        ...state,
        reUnitLaunchStatus: {},
        loading: true,
        tokenExpire: false,
      };
    case ActionTypes.GET_RE_UNIT_LAUNCH_STATUS_SUCCESS:
      return {
        ...state,
        reUnitLaunchStatus: action.result,
        loading: false,
        tokenExpire:
          action.result?.status &&
          (action.result?.status === 401 || action.result?.status === 403),
      };
    case ActionTypes.GET_RE_UNIT_LAUNCH_STATUS_FAILED:
      return {
        ...state,
        reUnitLaunchStatus: {},
        loading: false,
        tokenExpire:
          action.result?.status &&
          (action.result?.status === 401 || action.result?.status === 403),
      };
    case ActionTypes.GET_RE_UNIT_SECURITY_STATUS_REQUESTED:
      return {
        ...state,
        reUnitSecurityStatus: {},
        loading: true,
        tokenExpire: false,
      };
    case ActionTypes.GET_RE_UNIT_SECURITY_STATUS_SUCCESS:
      return {
        ...state,
        reUnitSecurityStatus: action.result,
        loading: false,
        tokenExpire:
          action.result?.status &&
          (action.result?.status === 401 || action.result?.status === 403),
      };
    case ActionTypes.GET_RE_UNIT_SECURITY_STATUS_FAILED:
      return {
        ...state,
        reUnitSecurityStatus: {},
        loading: false,
        tokenExpire:
          action.result?.status &&
          (action.result?.status === 401 || action.result?.status === 403),
      };
    case ActionTypes.GET_RE_UNIT_APPROVAL_STATUS_REQUESTED:
      return {
        ...state,
        reUnitApprovalStatus: {},
        loading: true,
        tokenExpire: false,
      };
    case ActionTypes.GET_RE_UNIT_APPROVAL_STATUS_SUCCESS:
      return {
        ...state,
        reUnitApprovalStatus: action.result,
        loading: false,
        tokenExpire:
          action.result?.status &&
          (action.result?.status === 401 || action.result?.status === 403),
      };
    case ActionTypes.GET_RE_UNIT_APPROVAL_STATUS_FAILED:
      return {
        ...state,
        reUnitApprovalStatus: {},
        loading: false,
        tokenExpire:
          action.result?.status &&
          (action.result?.status === 401 || action.result?.status === 403),
      };
    case ActionTypes.GET_RE_TOWER_V2_REQUESTED:
      return {
        ...state,
        reTowerV2: {},
        loading: true,
        tokenExpire: false,
      };
    case ActionTypes.GET_RE_TOWER_V2_SUCCESS:
      return {
        ...state,
        reTowerV2: action.result,
        // loading: false,
        tokenExpire:
          action.result?.status &&
          (action.result?.status === 401 || action.result?.status === 403),
      };
    case ActionTypes.GET_RE_TOWER_V2_FAILED:
      return {
        ...state,
        reTowerV2: {},
        loading: false,
        tokenExpire:
          action.result?.status &&
          (action.result?.status === 401 || action.result?.status === 403),
      };
    case ActionTypes.GET_RE_WING_V2_REQUESTED:
      return {
        ...state,
        reWingV2: {},
        loading: true,
        tokenExpire: false,
      };
    case ActionTypes.GET_RE_WING_V2_SUCCESS:
      return {
        ...state,
        reWingV2: action.result,
        // loading: false,
        tokenExpire:
          action.result?.status &&
          (action.result?.status === 401 || action.result?.status === 403),
      };
    case ActionTypes.GET_RE_WING_V2_FAILED:
      return {
        ...state,
        reWingV2: {},
        loading: false,
        tokenExpire:
          action.result?.status &&
          (action.result?.status === 401 || action.result?.status === 403),
      };
    case ActionTypes.GET_RE_UNIT_OWNED_BY_REQUESTED:
      return {
        ...state,
        reUnitOwnedBy: {},
        loading: true,
        tokenExpire: false,
      };
    case ActionTypes.GET_RE_UNIT_OWNED_BY_SUCCESS:
      return {
        ...state,
        reUnitOwnedBy: action.result,
        // loading: false,
        tokenExpire:
          action.result?.status &&
          (action.result?.status === 401 || action.result?.status === 403),
      };
    case ActionTypes.GET_RE_UNIT_OWNED_BY_FAILED:
      return {
        ...state,
        reUnitOwnedBy: {},
        loading: false,
        tokenExpire:
          action.result?.status &&
          (action.result?.status === 401 || action.result?.status === 403),
      };
    default:
      return state;
  }
};
export default SalesDashboardReducer;
