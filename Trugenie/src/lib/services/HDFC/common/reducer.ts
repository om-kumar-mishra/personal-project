import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
import { storageKeys } from "../../../../utils/constants";
import { DownloadRowDataActions } from "./action";
import * as actionTypes from "./types";
type MonitoringState = {
  loader: {
    downloadRowData: boolean;
  };
};

const initialState: MonitoringState = {
  loader: {
    downloadRowData: false,
  },
};
const commonMonitoringReducer = (state: MonitoringState = initialState, action: DownloadRowDataActions): MonitoringState => {
  switch (action.type) {
    case actionTypes.DOWNLOAD_ROW_DATA_REQUESTED:
      return {
        ...state,
        loader: {
          ...state.loader,
          downloadRowData: true,
        },
      };

    case actionTypes.DOWNLOAD_ROW_DATA_SUCCEEDED:
      return {
        ...state,
        loader: {
          ...state.loader,
          downloadRowData: false,
        },
      };

    case actionTypes.DOWNLOAD_ROW_DATA_FAILED:
      return {
        ...state,
        loader: {
          ...state.loader,
          downloadRowData: false,
        },
      };
    default:
      return state;
  }
};
const config = {
  storage,
  key: storageKeys.commonMonitoring,
  blacklist: ["loader"], // topic will not be persisted
};

export default persistReducer(config, commonMonitoringReducer);
