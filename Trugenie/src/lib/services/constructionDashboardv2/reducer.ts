import {
  ConstructionDropdownResult,
  ConstructionSummaryResult,
  ApprovalDocumentsResult
} from "./dataType";
import { ConstructionDashboardActionType as Types } from "./types";

interface initialStateType {
  constructionLoading: {
    constructionSummary: boolean;
    constructionDropdown: boolean;
    approvalDocuments : boolean;

  };
  constructionSummary: ConstructionSummaryResult | undefined;
  constructionDropdown: ConstructionDropdownResult | undefined;
  approvalDocuments: ApprovalDocumentsResult | undefined;
}

export const initialState: initialStateType = {
  constructionLoading: {
    constructionSummary: false,
    constructionDropdown: false,
    approvalDocuments: false,
  },
  constructionSummary: undefined,
  constructionDropdown: undefined,
  approvalDocuments: undefined,
};

interface Action {
  type: Types;
  result: any;
}

const ConstructionDashboardReducer = (
  state: initialStateType = initialState,
  action: Action
) => {
  switch (action.type) {
    case Types.GET_CONSTRUCTION_SUMMARY_REQUESTED:
      return {
        ...state,
        constructionSummary: undefined,
        constructionLoading: {
          ...state.constructionLoading,
          constructionSummary: true,
        },
      };
    case Types.GET_CONSTRUCTION_SUMMARY_SUCCESS:
      return {
        ...state,
        constructionSummary: action.result,
        constructionLoading: {
          ...state.constructionLoading,
          constructionSummary: false,
        },
      };
    case Types.GET_CONSTRUCTION_SUMMARY_FAILED:
      return {
        ...state,
        constructionSummary: undefined,
        constructionLoading: {
          ...state.constructionLoading,
          constructionSummary: false,
        },
      };
    case Types.GET_CONSTRUCTION_DROPDOWN_REQUESTED:
      return {
        ...state,
        constructionDropdown: undefined,
        constructionLoading: {
          ...state.constructionLoading,
          constructionDropdown: true,
        },
      };
    case Types.GET_CONSTRUCTION_DROPDOWN_SUCCESS:
      return {
        ...state,
        constructionDropdown: action.result,
        constructionLoading: {
          ...state.constructionLoading,
          constructionDropdown: false,
        },
      };
    case Types.GET_CONSTRUCTION_DROPDOWN_FAILED:
      return {
        ...state,
        constructionDropdown: undefined,
        constructionLoading: {
          ...state.constructionLoading,
          constructionDropdown: false,
        },
      };
      case Types.GET_CONSTRUCTION_APPROVALDOCUMENTS_REQUESTED:
      return {
        ...state,
        approvalDocuments: undefined,
        constructionLoading: {
          ...state.constructionLoading,
          approvalDocuments: true,
        },
      };
    case Types.GET_CONSTRUCTION_APPROVALDOCUMENTS_SUCCESS:
      return {
        ...state,
        approvalDocuments: action.result,
        constructionLoading: {
          ...state.constructionLoading,
          approvalDocuments: false,
        },
      };
    case Types.GET_CONSTRUCTION_APPROVALDOCUMENTS_FAILED:
      return {
        ...state,
        approvalDocuments: undefined,
        constructionLoading: {
          ...state.constructionLoading,
          approvalDocuments: false,
        },
      };
    default:
      return state;
  }
};

export default ConstructionDashboardReducer;
