import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
import { storageKeys } from "../../../../utils/constants";
import { SalesActions } from "./actions";
import { PastSalesSummary, PendingSalesForApproval, SalesPastHistory, SalesSummaryData, SummaryDetailsData } from "./dataTypes";
import * as actionTypes from "./types";
// const storage = storageData;

type SalesState = {
  salesHistoryList?: SalesPastHistory[];
  pastSalesSummary?: PastSalesSummary[];
  pendingForApprovalSalesList?: PendingSalesForApproval[];
  salesSummary?: SalesSummaryData;
  salesSummaryDetail?: SummaryDetailsData;
  salesSetupPendingData: { isSetup: number } | null;
  loader: {
    salesHistoryList: boolean;
    pastSalesSummary: boolean;
    pendingForApprovalList: boolean;
    uploadDocument: boolean;
    canUpdateSalesHistory: boolean;
    updateSalesPastHistory: boolean;
    downloadSalesTemplate: boolean;
    salesSummary: boolean;
    salesSummaryDetail: boolean;
    deleteSalesHistory: boolean;
  };
};

const initialState: SalesState = {
  salesHistoryList: undefined,
  pastSalesSummary: undefined,
  pendingForApprovalSalesList: undefined,
  salesSetupPendingData: null,
  loader: {
    salesHistoryList: false,
    pastSalesSummary: false,
    pendingForApprovalList: false,
    uploadDocument: false,
    canUpdateSalesHistory: false,
    updateSalesPastHistory: false,
    downloadSalesTemplate: false,
    salesSummary: false,
    salesSummaryDetail: false,
    deleteSalesHistory: false,
  },
};

const salesReducer = (state: SalesState = initialState, action: SalesActions): SalesState => {
  switch (action.type) {
    // sales-past-history
    case actionTypes.GET_SALES_PAST_HISTORY_REQUESTED:
      return {
        ...state,
        salesHistoryList: undefined,
        loader: {
          ...state.loader,
          salesHistoryList: true,
        },
      };
    case actionTypes.GET_SALES_PAST_HISTORY_SUCCEEDED:
      return {
        ...state,
        salesHistoryList: action.result.data,
        loader: {
          ...state.loader,
          salesHistoryList: false,
        },
      };
    case actionTypes.GET_SALES_PAST_HISTORY_FAILED:
      return {
        ...state,
        loader: {
          ...state.loader,
          salesHistoryList: false,
        },
      };

    // past-sales-summary
    case actionTypes.GET_PAST_SALES_SUMMARY_DETAIL_REQUESTED:
      return {
        ...state,
        pastSalesSummary: undefined,
        loader: {
          ...state.loader,
          pastSalesSummary: true,
        },
      };
    case actionTypes.GET_PAST_SALES_SUMMARY_DETAIL_SUCCEEDED:
      return {
        ...state,
        pastSalesSummary: action.result.data,
        loader: {
          ...state.loader,
          pastSalesSummary: false,
        },
      };

    // sales-pending-for-approval
    case actionTypes.GET_PENDING_SALES_FOR_APPROVAL_REQUESTED:
      return {
        ...state,
        pendingForApprovalSalesList: undefined,
        loader: {
          ...state.loader,
          pendingForApprovalList: true,
        },
      };
    case actionTypes.GET_PENDING_SALES_FOR_APPROVAL_SUCCEEDED:
      return {
        ...state,
        pendingForApprovalSalesList: action.result.data,
        loader: {
          ...state.loader,
          pendingForApprovalList: false,
        },
      };
    case actionTypes.GET_PENDING_SALES_FOR_APPROVAL_FAILED:
      return {
        ...state,
        loader: {
          ...state.loader,
          pendingForApprovalList: false,
        },
      };

    // upload-sales-template
    case actionTypes.UPLOAD_SALES_TEMPLATE_DATA_REQUESTED:
      return {
        ...state,
        loader: {
          ...state.loader,
          uploadDocument: true,
        },
      };
    case actionTypes.UPLOAD_SALES_TEMPLATE_DATA_SUCCEEDED:
      return {
        ...state,
        loader: {
          ...state.loader,
          uploadDocument: false,
        },
      };
    case actionTypes.UPLOAD_SALES_TEMPLATE_DATA_FAILED:
      return {
        ...state,
        loader: {
          ...state.loader,
          uploadDocument: false,
        },
      };

    // is-sales-setup-pending
    case actionTypes.IS_SALES_SETUP_PENDING_REQUESTED:
      return {
        ...state,
        loader: {
          ...state.loader,
          canUpdateSalesHistory: true,
        },
      };
    case actionTypes.IS_SALES_SETUP_PENDING_SUCCEEDED:
      return {
        ...state,
        salesSetupPendingData: action.payload,
        loader: {
          ...state.loader,
          canUpdateSalesHistory: false,
        },
      };
    case actionTypes.IS_SALES_SETUP_PENDING_FAILED:
      return {
        ...state,
        loader: {
          ...state.loader,
          canUpdateSalesHistory: false,
        },
      };

    // update-sales-part-history
    case actionTypes.UPDATE_SALES_PAST_HISTORY_REQUESTED:
      return {
        ...state,
        loader: {
          ...state.loader,
          updateSalesPastHistory: true,
        },
      };
    case actionTypes.UPDATE_SALES_PAST_HISTORY_SUCCEEDED:
      return {
        ...state,
        loader: {
          ...state.loader,
          updateSalesPastHistory: false,
        },
      };
    case actionTypes.UPDATE_SALES_PAST_HISTORY_FAILED:
      return {
        ...state,
        loader: {
          ...state.loader,
          updateSalesPastHistory: false,
        },
      };
    // download sales template
    case actionTypes.DOWNLOAD_SALES_TEMPLATE_DATA_REQUESTED:
      return {
        ...state,
        loader: {
          ...state.loader,
          downloadSalesTemplate: true,
        },
      };

    case actionTypes.DOWNLOAD_SALES_TEMPLATE_DATA_SUCCEEDED:
      return {
        ...state,
        loader: {
          ...state.loader,
          downloadSalesTemplate: false,
        },
      };

    case actionTypes.DOWNLOAD_SALES_TEMPLATE_DATA_FAILED:
      return {
        ...state,
        loader: {
          ...state.loader,
          downloadSalesTemplate: false,
        },
      };

    // sales-summary
    case actionTypes.GET_SALES_SUMMARY_REQUESTED:
      return {
        ...state,
        salesSummary: undefined,
        loader: {
          ...state.loader,
          salesSummary: true,
        },
      };
    case actionTypes.GET_SALES_SUMMARY_SUCCEEDED:
      return {
        ...state,
        salesSummary: {
          summary: action.result.data.summary,
          misDate: action.misDate,
          remarks: action.remarks,
          uploadedFile: { ...action.uploaded_file },
        },
        loader: {
          ...state.loader,
          salesSummary: false,
        },
      };
    case actionTypes.GET_SALES_SUMMARY_FAILED:
      return {
        ...state,
        loader: {
          ...state.loader,
          salesSummary: false,
        },
      };
    case actionTypes.GET_SALES_SUMMARY_RESET:
      return {
        ...state,
        salesSummary: undefined,
        loader: {
          ...state.loader,
          salesSummary: false,
        },
      };

    // sales-summary-detail
    case actionTypes.GET_SALES_SUMMARY_DETAIL_REQUESTED:
      return {
        ...state,
        salesSummaryDetail: undefined,
        loader: {
          ...state.loader,
          salesSummaryDetail: true,
        },
      };
    case actionTypes.GET_SALES_SUMMARY_DETAIL_SUCCEEDED:
      return {
        ...state,
        salesSummaryDetail: action.result.data,
        loader: {
          ...state.loader,
          salesSummaryDetail: false,
        },
      };
    case actionTypes.GET_SALES_SUMMARY_DETAIL_FAILED:
      return {
        ...state,
        loader: {
          ...state.loader,
          salesSummaryDetail: false,
        },
      };
    case actionTypes.GET_SALES_SUMMARY_DETAIL_RESET:
      return {
        ...state,
        salesSummaryDetail: undefined,
        loader: {
          ...state.loader,
          salesSummaryDetail: false,
        },
      };

    case actionTypes.DELETE_SALES_HISTORY_REQUESTED:
      return {
        ...state,
        loader: {
          ...state.loader,
          deleteSalesHistory: true,
        },
      };

    case actionTypes.DELETE_SALES_HISTORY_SUCCEEDED:
      return {
        ...state,
        loader: {
          ...state.loader,
          deleteSalesHistory: false,
        },
      };

    case actionTypes.DELETE_SALES_HISTORY_FAILED:
      return {
        ...state,
        loader: {
          ...state.loader,
          deleteSalesHistory: false,
        },
      };

    default:
      return state;
  }
};
const config = {
  storage,
  key: storageKeys.sales,
  blacklist: ["loader"], // topic will not be persisted
};

export default persistReducer(config, salesReducer);
