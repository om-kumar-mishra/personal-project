import {
  GetDashboardRemarkResponse,
  InsertDashboardRemarkResponse,
} from "./dataType";
import { DashboardRemarkActionType as Types } from "./types";

interface initialStateType {
  loading: {
    insertDashboardRemark: boolean;
    getDashboardRemark: boolean;
  };
  insertDashboardRemark: InsertDashboardRemarkResponse | undefined;
  getDashboardRemark: GetDashboardRemarkResponse | undefined;
}

export const initialState: initialStateType = {
  loading: {
    insertDashboardRemark: false,
    getDashboardRemark: false,
  },
  insertDashboardRemark: undefined,
  getDashboardRemark: undefined,
};

interface Action {
  type: Types;
  result: any;
}

const DashboardRemarkReducer = (
  state: initialStateType = initialState,
  action: Action
) => {
  switch (action.type) {
    case Types.INSERT_DASHBOARD_REMARK_REQUESTED:
      return {
        ...state,
        insertDashboardRemark: undefined,
        loading: {
          ...state.loading,
          insertDashboardRemark: true,
        },
      };
    case Types.INSERT_DASHBOARD_REMARK_SUCCESS:
      return {
        ...state,
        insertDashboardRemark: action.result,
        loading: {
          ...state.loading,
          insertDashboardRemark: false,
        },
      };
    case Types.INSERT_DASHBOARD_REMARK_FAILED:
      return {
        ...state,
        insertDashboardRemark: action.result,
        loading: {
          ...state.loading,
          insertDashboardRemark: false,
        },
      };
    case Types.GET_DASHBOARD_REMARK_REQUESTED:
      return {
        ...state,
        getDashboardRemark: undefined,
        loading: {
          ...state.loading,
          getDashboardRemark: true,
        },
      };
    case Types.GET_DASHBOARD_REMARK_SUCCESS:
      return {
        ...state,
        getDashboardRemark: action.result,
        loading: {
          ...state.loading,
          getDashboardRemark: false,
        },
      };
    case Types.GET_DASHBOARD_REMARK_FAILED:
      return {
        ...state,
        getDashboardRemark: action.result,
        loading: {
          ...state.loading,
          getDashboardRemark: false,
        },
      };
    default:
      return state;
  }
};

export default DashboardRemarkReducer;
