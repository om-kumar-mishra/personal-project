import { ProjectSummaryActionType } from "./types";

export const initialState = {
  dashboardDetails: {},
  filters: {},
  loading: { filters: false, dashboardDetails: false },
};

const ProjectSummaryReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ProjectSummaryActionType.GET_PROJECT_SUMMARY_DETAIL_REQUESTED:
      return {
        ...state,
        dashboardDetails: {},
        loading: { ...state.loading, dashboardDetails: true },
      };
    case ProjectSummaryActionType.GET_PROJECT_SUMMARY_DETAIL_SUCCESS:
      return {
        ...state,
        dashboardDetails: action.result,
        loading: { ...state.loading, dashboardDetails: false },
      };
    case ProjectSummaryActionType.GET_PROJECT_SUMMARY_DETAIL_FAILED:
      return {
        ...state,
        dashboardDetails: {},
        loading: { ...state.loading, dashboardDetails: false },
      };
    case ProjectSummaryActionType.GET_PROJECT_SUMMARY_FILTER_REQUESTED:
      return {
        ...state,
        filters: {},
        loading: { ...state.loading, filters: true },
      };
    case ProjectSummaryActionType.GET_PROJECT_SUMMARY_FILTER_SUCCESS:
      return {
        ...state,
        filters: action.result,
        loading: { ...state.loading, filters: false },
      };
    case ProjectSummaryActionType.GET_PROJECT_SUMMARY_FILTER_FAILED:
      return {
        ...state,
        filters: {},
        loading: { ...state.loading, filters: false },
      };
    default:
      return state;
  }
};

export default ProjectSummaryReducer;
