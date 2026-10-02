import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
import { storageKeys } from "../../../../utils/constants";
import { SalesMonitoringActions } from "./action";
import { MoitoringSheetDetailsDataType, SalesMISDate, SalesMonitoringPastHistory } from "./dataTypes";
import * as actionTypes from "./types";
// const storage = storageData;

type SalesMonitoringState = {
  salesMonitoringHistoryList?: SalesMonitoringPastHistory[];
  misDate?: SalesMISDate[];
  MoitoringSheetDetailsList?: MoitoringSheetDetailsDataType[] | null;
  loader: {
    salesMonitoringHistoryList: boolean;
    misDate: boolean;
    MoitoringSheetDetailsList: boolean;
    downloadMonitoringSheetTempalte: boolean;
    uploadMonitoringTemplate: boolean;
    downloadRowData: boolean;
    deleteRowData: boolean;
  };
};

const initialState: SalesMonitoringState = {
  salesMonitoringHistoryList: undefined,
  misDate: undefined,
  MoitoringSheetDetailsList: undefined,
  loader: {
    salesMonitoringHistoryList: false,
    misDate: false,
    MoitoringSheetDetailsList: false,
    downloadMonitoringSheetTempalte: false,
    uploadMonitoringTemplate: false,
    downloadRowData: false,
    deleteRowData: false,
  },
};

const salesMonitoringReducer = (state: SalesMonitoringState = initialState, action: SalesMonitoringActions): SalesMonitoringState => {
  switch (action.type) {
    // salesMonitoring-past-history
    case actionTypes.GET_SALES_MONITORING_PAST_HISTORY_REQUESTED:
      return {
        ...state,
        salesMonitoringHistoryList: undefined,
        loader: {
          ...state.loader,
          salesMonitoringHistoryList: true,
        },
      };

    case actionTypes.GET_SALES_MONITORING_PAST_HISTORY_SUCCEEDED:
      return {
        ...state,
        salesMonitoringHistoryList: action.result.data,
        loader: {
          ...state.loader,
          salesMonitoringHistoryList: false,
        },
      };

    case actionTypes.GET_SALES_MONITORING_PAST_HISTORY_FAILED:
      return {
        ...state,
        loader: {
          ...state.loader,
          salesMonitoringHistoryList: false,
        },
      };

    case actionTypes.SALES_MIS_DATE_REQUESTED:
      return {
        ...state,
        loader: {
          ...state.loader,
          misDate: true,
        },
      };

    case actionTypes.SALES_MIS_DATE_SUCCEEDED:
      return {
        ...state,
        misDate: action.result.data,
        loader: {
          ...state.loader,
          misDate: false,
        },
      };

    case actionTypes.SALES_MIS_DATE_FAILED:
      return {
        ...state,
        loader: {
          ...state.loader,
          misDate: false,
        },
      };

    case actionTypes.GET_MONITORING_SHEET_REQUESTED:
      return {
        ...state,
        MoitoringSheetDetailsList: undefined,
        loader: {
          ...state.loader,
          MoitoringSheetDetailsList: true,
        },
      };
    case actionTypes.GET_MONITORING_SHEET_SUCCEEDED:
      return {
        ...state,
        MoitoringSheetDetailsList: action.MoitoringSheetDetailsList.data,
        loader: {
          ...state.loader,
          MoitoringSheetDetailsList: false,
        },
      };
    case actionTypes.GET_MONITORING_SHEET_FAILED:
      return {
        ...state,
        loader: {
          ...state.loader,
          MoitoringSheetDetailsList: false,
        },
      };
    // download monitoring sheet
    case actionTypes.DOWNLOAD_SALES_MONITORING_TEMPLATE_DATA_REQUESTED:
      return {
        ...state,
        loader: {
          ...state.loader,
          downloadMonitoringSheetTempalte: true,
        },
      };

    case actionTypes.DOWNLOAD_SALES_MONITORING_TEMPLATE_DATA_SUCCEEDED:
      return {
        ...state,
        loader: {
          ...state.loader,
          downloadMonitoringSheetTempalte: false,
        },
      };

    case actionTypes.DOWNLOAD_SALES_MONITORING_TEMPLATE_DATA_FAILED:
      return {
        ...state,
        loader: {
          ...state.loader,
          downloadMonitoringSheetTempalte: false,
        },
      };
    case actionTypes.UPLOAD_SALES_MONITORING_TEMPLATE_DATA_REQUESTED:
      return {
        ...state,
        loader: {
          ...state.loader,
          uploadMonitoringTemplate: true,
        },
      };

    case actionTypes.UPLOAD_SALES_MONITORING_TEMPLATE_DATA_SUCCEEDED:
      return {
        ...state,
        loader: {
          ...state.loader,
          uploadMonitoringTemplate: false,
        },
      };

    case actionTypes.UPLOAD_SALES_MONITORING_TEMPLATE_DATA_FAILED:
      return {
        ...state,
        loader: {
          ...state.loader,
          uploadMonitoringTemplate: false,
        },
      };
    case actionTypes.DELETE_SALES_MONITORING_HISTORY_REQUESTED:
      return {
        ...state,
        loader: {
          ...state.loader,
          deleteRowData: true,
        },
      };

    case actionTypes.DELETE_SALES_MONITORING_HISTORY_SUCCEEDED:
      return {
        ...state,
        loader: {
          ...state.loader,
          deleteRowData: false,
        },
      };

    case actionTypes.DELETE_SALES_MONITORING_HISTORY_FAILED:
      return {
        ...state,
        loader: {
          ...state.loader,
          deleteRowData: false,
        },
      };
    default:
      return state;
  }
};
const config = {
  storage,
  key: storageKeys.salesMonitoring,
  blacklist: ["loader"], // topic will not be persisted
};

export default persistReducer(config, salesMonitoringReducer);
