import * as actionTypes from "./types";
import { CashflowActions } from "./action";
import {
  CashflowPastHistoryData,
  DeleteCashflowDetailsResponse,
  IsCashflowSetupData,
  CashflowPendingData,
  UpdateCashflowStatusResponse,
  UploadCashflowTemplateResponse,
  CanSetupCashflowData,
  UploadCashflowSetupTemplateResponse,
  CheckCashflowDetailsExistData,
  CashflowSetupPendingData,
  CashflowSetupPastUpdatesData,
} from "./dataTypes";

type CashflowState = {
  cashflowHistoryList?: CashflowPastHistoryData[];
  isCashflowSetup?: IsCashflowSetupData;
  deleteCashflowDetails?: DeleteCashflowDetailsResponse;
  updateCashflowStatus?: UpdateCashflowStatusResponse;
  uploadCashflowSetupSummary?: UploadCashflowTemplateResponse;
  cashflowPendingList?: CashflowPendingData[];
  canSetupCashflow?: CanSetupCashflowData;
  uploadCashflowUnderwrittenSetup?: UploadCashflowSetupTemplateResponse;
  uploadCashflowBusinessPlanSetup?: UploadCashflowSetupTemplateResponse;
  checkCashflowDetailExist?: CheckCashflowDetailsExistData;
  cashflowSetupPendingList?: CashflowSetupPendingData[];
  cashflowSetupPastUpdate?: CashflowSetupPastUpdatesData[];
  loader: {
    cashflowHistoryList: boolean;
    isCashflowSetup: boolean;
    deleteCashflowDetails: boolean;
    updateCashflowStatus: boolean;
    downloadCashflowTemplate: boolean;
    uploadCashflowSetupSummary: boolean;
    cashflowPendingList: boolean;
    canSetupCashflow: boolean;
    uploadCashflowUnderwrittenSetup: boolean;
    uploadCashflowBusinessPlanSetup: boolean;
    checkCashflowDetailExist: boolean;
    cashflowSetupPendingList: boolean;
    cashflowSetupPastUpdate: boolean;
  };
};

const initialState: CashflowState = {
  cashflowHistoryList: undefined,
  isCashflowSetup: undefined,
  deleteCashflowDetails: undefined,
  updateCashflowStatus: undefined,
  uploadCashflowSetupSummary: undefined,
  cashflowPendingList: undefined,
  canSetupCashflow: undefined,
  uploadCashflowUnderwrittenSetup: undefined,
  uploadCashflowBusinessPlanSetup: undefined,
  checkCashflowDetailExist: undefined,
  cashflowSetupPastUpdate: undefined,
  loader: {
    cashflowHistoryList: false,
    isCashflowSetup: false,
    deleteCashflowDetails: false,
    updateCashflowStatus: false,
    downloadCashflowTemplate: false,
    uploadCashflowSetupSummary: false,
    cashflowPendingList: false,
    canSetupCashflow: false,
    uploadCashflowUnderwrittenSetup: false,
    uploadCashflowBusinessPlanSetup: false,
    checkCashflowDetailExist: false,
    cashflowSetupPendingList: false,
    cashflowSetupPastUpdate: false,
  },
};

const cashflowReducer = (state: CashflowState = initialState, action: CashflowActions): CashflowState => {
  switch (action.type) {
    // sales-past-history
    case actionTypes.GET_CASHFLOW_PAST_HISTORY_REQUESTED:
      return {
        ...state,
        cashflowHistoryList: undefined,
        loader: {
          ...state.loader,
          cashflowHistoryList: true,
        },
      };
    case actionTypes.GET_CASHFLOW_PAST_HISTORY_SUCCEEDED:
      return {
        ...state,
        cashflowHistoryList: action.result,
        loader: {
          ...state.loader,
          cashflowHistoryList: false,
        },
      };
    case actionTypes.GET_CASHFLOW_PAST_HISTORY_FAILED:
      return {
        ...state,
        cashflowHistoryList: undefined,
        loader: {
          ...state.loader,
          cashflowHistoryList: false,
        },
      };
    case actionTypes.IS_CASHFLOW_SETUP_REQUESTED:
      return {
        ...state,
        isCashflowSetup: undefined,
        loader: {
          ...state.loader,
          isCashflowSetup: true,
        },
      };
    case actionTypes.IS_CASHFLOW_SETUP_SUCCEEDED:
      return {
        ...state,
        isCashflowSetup: action.result,
        loader: {
          ...state.loader,
          isCashflowSetup: false,
        },
      };
    case actionTypes.IS_CASHFLOW_SETUP_FAILED:
      return {
        ...state,
        isCashflowSetup: undefined,
        loader: {
          ...state.loader,
          isCashflowSetup: false,
        },
      };
    case actionTypes.DELETE_CASHFLOW_DETAILS_REQUESTED:
      return {
        ...state,
        deleteCashflowDetails: undefined,
        loader: {
          ...state.loader,
          deleteCashflowDetails: true,
        },
      };
    case actionTypes.DELETE_CASHFLOW_DETAILS_SUCCEEDED:
      return {
        ...state,
        deleteCashflowDetails: action.result,
        loader: {
          ...state.loader,
          deleteCashflowDetails: false,
        },
      };
    case actionTypes.DELETE_CASHFLOW_DETAILS_FAILED:
      return {
        ...state,
        deleteCashflowDetails: undefined,
        loader: {
          ...state.loader,
          deleteCashflowDetails: false,
        },
      };
    case actionTypes.UPDATE_CASHFLOW_STATUS_REQUESTED:
      return {
        ...state,
        updateCashflowStatus: undefined,
        loader: {
          ...state.loader,
          updateCashflowStatus: true,
        },
      };
    case actionTypes.UPDATE_CASHFLOW_STATUS_SUCCEEDED:
      return {
        ...state,
        updateCashflowStatus: action.result,
        loader: {
          ...state.loader,
          updateCashflowStatus: false,
        },
      };
    case actionTypes.UPDATE_CASHFLOW_STATUS_FAILED:
      return {
        ...state,
        updateCashflowStatus: undefined,
        loader: {
          ...state.loader,
          updateCashflowStatus: false,
        },
      };
    case actionTypes.DOWNLOAD_CASHFLOW_TEMPLATE_REQUESTED:
      return {
        ...state,
        loader: {
          ...state.loader,
          downloadCashflowTemplate: true,
        },
      };
    case actionTypes.DOWNLOAD_CASHFLOW_TEMPLATE_SUCCEEDED:
      return {
        ...state,
        loader: {
          ...state.loader,
          downloadCashflowTemplate: false,
        },
      };
    case actionTypes.DOWNLOAD_CASHFLOW_TEMPLATE_FAILED:
      return {
        ...state,
        loader: {
          ...state.loader,
          downloadCashflowTemplate: false,
        },
      };
    case actionTypes.UPLOAD_CASHFLOW_ACTUAL_PLAN_TEMPLATE_REQUESTED:
      return {
        ...state,
        uploadCashflowSetupSummary: undefined,
        loader: {
          ...state.loader,
          uploadCashflowSetupSummary: true,
        },
      };
    case actionTypes.UPLOAD_CASHFLOW_ACTUAL_PLAN_TEMPLATE_SUCCEEDED:
      return {
        ...state,
        uploadCashflowSetupSummary: action.result,
        loader: {
          ...state.loader,
          uploadCashflowSetupSummary: false,
        },
      };
    case actionTypes.UPLOAD_CASHFLOW_ACTUAL_PLAN_TEMPLATE_FAILED:
      return {
        ...state,
        uploadCashflowSetupSummary: undefined,
        loader: {
          ...state.loader,
          uploadCashflowSetupSummary: false,
        },
      };
    case actionTypes.UPLOAD_CASHFLOW_PROJECTED_PLAN_TEMPLATE_REQUESTED:
      return {
        ...state,
        uploadCashflowSetupSummary: undefined,
        loader: {
          ...state.loader,
          uploadCashflowSetupSummary: true,
        },
      };
    case actionTypes.UPLOAD_CASHFLOW_PROJECTED_PLAN_TEMPLATE_SUCCEEDED:
      return {
        ...state,
        uploadCashflowSetupSummary: action.result,
        loader: {
          ...state.loader,
          uploadCashflowSetupSummary: false,
        },
      };
    case actionTypes.UPLOAD_CASHFLOW_PROJECTED_PLAN_TEMPLATE_FAILED:
      return {
        ...state,
        uploadCashflowSetupSummary: undefined,
        loader: {
          ...state.loader,
          uploadCashflowSetupSummary: false,
        },
      };
    // pending-history
    case actionTypes.GET_CASHFLOW_PENDING_UPDATE_REQUESTED:
      return {
        ...state,
        cashflowPendingList: undefined,
        loader: {
          ...state.loader,
          cashflowPendingList: true,
        },
      };
    case actionTypes.GET_CASHFLOW_PENDING_UPDATE_SUCCEEDED:
      return {
        ...state,
        cashflowPendingList: action.result,
        loader: {
          ...state.loader,
          cashflowPendingList: false,
        },
      };
    case actionTypes.GET_CASHFLOW_PENDING_UPDATE_FAILED:
      return {
        ...state,
        cashflowPendingList: undefined,
        loader: {
          ...state.loader,
          cashflowPendingList: false,
        },
      };

    case actionTypes.CAN_SETUP_CASHFLOW_REQUESTED:
      return {
        ...state,
        canSetupCashflow: undefined,
        loader: {
          ...state.loader,
          canSetupCashflow: true,
        },
      };
    case actionTypes.CAN_SETUP_CASHFLOW_SUCCEEDED:
      return {
        ...state,
        canSetupCashflow: action.result,
        loader: {
          ...state.loader,
          canSetupCashflow: false,
        },
      };
    case actionTypes.CAN_SETUP_CASHFLOW_FAILED:
      return {
        ...state,
        canSetupCashflow: undefined,
        loader: {
          ...state.loader,
          canSetupCashflow: false,
        },
      };
    case actionTypes.UPLOAD_CASHFLOW_UNDERWRITTEN_SETUP_REQUESTED:
      return {
        ...state,
        uploadCashflowUnderwrittenSetup: undefined,
        loader: {
          ...state.loader,
          uploadCashflowUnderwrittenSetup: true,
        },
      };
    case actionTypes.UPLOAD_CASHFLOW_UNDERWRITTEN_SETUP_SUCCEEDED:
      return {
        ...state,
        uploadCashflowUnderwrittenSetup: action.result,
        loader: {
          ...state.loader,
          uploadCashflowUnderwrittenSetup: false,
        },
      };
    case actionTypes.UPLOAD_CASHFLOW_UNDERWRITTEN_SETUP_FAILED:
      return {
        ...state,
        uploadCashflowUnderwrittenSetup: undefined,
        loader: {
          ...state.loader,
          uploadCashflowUnderwrittenSetup: false,
        },
      };
    case actionTypes.UPLOAD_CASHFLOW_BUSINESS_PLAN_SETUP_REQUESTED:
      return {
        ...state,
        uploadCashflowBusinessPlanSetup: undefined,
        loader: {
          ...state.loader,
          uploadCashflowBusinessPlanSetup: true,
        },
      };
    case actionTypes.UPLOAD_CASHFLOW_BUSINESS_PLAN_SETUP_SUCCEEDED:
      return {
        ...state,
        uploadCashflowBusinessPlanSetup: action.result,
        loader: {
          ...state.loader,
          uploadCashflowBusinessPlanSetup: false,
        },
      };
    case actionTypes.UPLOAD_CASHFLOW_BUSINESS_PLAN_SETUP_FAILED:
      return {
        ...state,
        uploadCashflowBusinessPlanSetup: undefined,
        loader: {
          ...state.loader,
          uploadCashflowBusinessPlanSetup: false,
        },
      };
    case actionTypes.CHECK_CASHFLOW_DETAILS_EXIST_REQUESTED:
      return {
        ...state,
        checkCashflowDetailExist: undefined,
        loader: {
          ...state.loader,
          checkCashflowDetailExist: true,
        },
      };
    case actionTypes.CHECK_CASHFLOW_DETAILS_EXIST_SUCCEEDED:
      return {
        ...state,
        checkCashflowDetailExist: action.result,
        loader: {
          ...state.loader,
          checkCashflowDetailExist: false,
        },
      };
    case actionTypes.CHECK_CASHFLOW_DETAILS_EXIST_FAILED:
      return {
        ...state,
        checkCashflowDetailExist: undefined,
        loader: {
          ...state.loader,
          checkCashflowDetailExist: false,
        },
      };
    case actionTypes.GET_CASHFLOW_SETUP_PENDING_LIST_REQUESTED:
      return {
        ...state,
        cashflowSetupPendingList: undefined,
        loader: {
          ...state.loader,
          cashflowSetupPendingList: true,
        },
      };
    case actionTypes.GET_CASHFLOW_SETUP_PENDING_LIST_SUCCEEDED:
      return {
        ...state,
        cashflowSetupPendingList: action.result,
        loader: {
          ...state.loader,
          cashflowSetupPendingList: false,
        },
      };
    case actionTypes.GET_CASHFLOW_SETUP_PENDING_LIST_FAILED:
      return {
        ...state,
        cashflowSetupPendingList: undefined,
        loader: {
          ...state.loader,
          cashflowSetupPendingList: false,
        },
      };
      case actionTypes.GET_CASHFLOW_SETUP_PAST_UPDATE_REQUESTED:
      return {
        ...state,
        cashflowSetupPastUpdate: undefined,
        loader: {
          ...state.loader,
          cashflowSetupPastUpdate: true,
        },
      };
    case actionTypes.GET_CASHFLOW_SETUP_PAST_UPDATE_SUCCEEDED:
      return {
        ...state,
        cashflowSetupPastUpdate: action.result,
        loader: {
          ...state.loader,
          cashflowSetupPastUpdate: false,
        },
      };
    case actionTypes.GET_CASHFLOW_SETUP_PAST_UPDATE_FAILED:
      return {
        ...state,
        cashflowSetupPastUpdate: undefined,
        loader: {
          ...state.loader,
          cashflowSetupPastUpdate: false,
        },
      };
    default:
      return state;
  }
};

export default cashflowReducer;
