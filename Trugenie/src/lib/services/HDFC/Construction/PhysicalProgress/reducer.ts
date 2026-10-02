import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
import { storageKeys } from "../../../../../utils/constants";
import * as actionTypes from "./types";
import { PhysicalProgressActions } from "./actions";
import { PhysicalProgressPastHistoryData, UpdatePhysicalProgressStatusResponse, UploadPhysicalProgressSetupTemplateResponse } from "./dataTypes";


type PhysicalProgressState = {
  physicalProgressPastHistoryList: PhysicalProgressPastHistoryData[];
  physicalProgressPendingHistoryList: PhysicalProgressPastHistoryData[];
  updatePhysicalProgressStatus?: UpdatePhysicalProgressStatusResponse;
  uploadPhysicalProgressSetup?: UploadPhysicalProgressSetupTemplateResponse;
  loader: {
    physicalProgressPastHistoryList: boolean;
    physicalProgressPendingHistoryList: boolean;
    downloadPhysicalProgressUploadTemplate: boolean;
    updatePhysicalProgressStatus: boolean;
    uploadPhysicalProgressSetup: boolean;
    downloadPhysicalProgressRowLoader: boolean;
  };
};

const initialState: PhysicalProgressState = {
  physicalProgressPastHistoryList: [],
  physicalProgressPendingHistoryList: [],
  updatePhysicalProgressStatus: undefined,
  uploadPhysicalProgressSetup: undefined,

  loader: {
    physicalProgressPastHistoryList: false,
    physicalProgressPendingHistoryList: false,
    downloadPhysicalProgressUploadTemplate: false,
    updatePhysicalProgressStatus: false,
    uploadPhysicalProgressSetup: false,
    downloadPhysicalProgressRowLoader: false,
  },
};

const physicalProgressReducer = (state: PhysicalProgressState = initialState, action: PhysicalProgressActions): PhysicalProgressState => {
  switch (action.type) {
    // physicalprogress-past-history
    case actionTypes.GET_CONTRUCTION_PHYSICAL_PROGRESS_PAST_HISTORY_REQUESTED:
      return {
        ...state,
        physicalProgressPastHistoryList: [],
        loader: {
          ...state.loader,
          physicalProgressPastHistoryList: true,
        },
      };
    case actionTypes.GET_CONTRUCTION_PHYSICAL_PROGRESS_PAST_HISTORY_SUCCEEDED:
      return {
        ...state,
        physicalProgressPastHistoryList: action.result,
        loader: {
          ...state.loader,
          physicalProgressPastHistoryList: false,
        },
      };
    case actionTypes.GET_CONTRUCTION_PHYSICAL_PROGRESS_PAST_HISTORY_FAILED:
      return {
        ...state,
        physicalProgressPastHistoryList: [],
        loader: {
          ...state.loader,
          physicalProgressPastHistoryList: true,
        },
      };
          // physicalprogress-pending-history
    case actionTypes.GET_CONTRUCTION_PHYSICAL_PROGRESS_PENDING_HISTORY_REQUESTED:
      return {
        ...state,
        physicalProgressPendingHistoryList: [],
        loader: {
          ...state.loader,
          physicalProgressPendingHistoryList: true,
        },
      };
    case actionTypes.GET_CONTRUCTION_PHYSICAL_PROGRESS_PENDING_HISTORY_SUCCEEDED:
      return {
        ...state,
        physicalProgressPendingHistoryList: action.result,
        loader: {
          ...state.loader,
          physicalProgressPendingHistoryList: false,
        },
      };
    case actionTypes.GET_CONTRUCTION_PHYSICAL_PROGRESS_PENDING_HISTORY_FAILED:
      return {
        ...state,
        physicalProgressPendingHistoryList: [],
        loader: {
          ...state.loader,
          physicalProgressPendingHistoryList: true,
        },
      };
    // download-physicalprogress-template
    case actionTypes.DOWNLOAD_PHYSICAL_PROGRESS_TEMPLATE_REQUESTED:
      return {
        ...state,
        loader: {
          ...state.loader,
          downloadPhysicalProgressUploadTemplate: true,
        },
      };
    case actionTypes.DOWNLOAD_PHYSICAL_PROGRESS_TEMPLATE_SUCCEEDED:
      return {
        ...state,
        loader: {
          ...state.loader,
          downloadPhysicalProgressUploadTemplate: false,
        },
      };
    case actionTypes.DOWNLOAD_PHYSICAL_PROGRESS_TEMPLATE_FAILED:
      return {
        ...state,
        loader: {
          ...state.loader,
          downloadPhysicalProgressUploadTemplate: false,
        },
      };
    case actionTypes.UPDATE_PHYSICAL_PROGRESS_STATUS_REQUESTED:
      return {
        ...state,
        updatePhysicalProgressStatus: undefined,
        loader: {
          ...state.loader,
          updatePhysicalProgressStatus: true,
        },
      };
    case actionTypes.UPDATE_PHYSICAL_PROGRESS_STATUS_SUCCEEDED:
      return {
        ...state,
        updatePhysicalProgressStatus: action.result,
        loader: {
          ...state.loader,
          updatePhysicalProgressStatus: false,
        },
      };
    case actionTypes.UPDATE_PHYSICAL_PROGRESS_STATUS_FAILED:
      return {
        ...state,
        updatePhysicalProgressStatus: undefined,
        loader: {
          ...state.loader,
          updatePhysicalProgressStatus: false,
        },
      };
    case actionTypes.INSERT_PHYSICAL_PROGRESS_SETUP_TEMPLATE_REQUESTED:
      return {
        ...state,
        uploadPhysicalProgressSetup: undefined,
        loader: {
          ...state.loader,
          uploadPhysicalProgressSetup: true,
        },
      };
    case actionTypes.INSERT_PHYSICAL_PROGRESS_SETUP_TEMPLATE_SUCCEEDED:
      return {
        ...state,
        uploadPhysicalProgressSetup: action.result,
        loader: {
          ...state.loader,
          uploadPhysicalProgressSetup: false,
        },
      };
    case actionTypes.INSERT_PHYSICAL_PROGRESS_SETUP_TEMPLATE_FAILED:
      return {
        ...state,
        uploadPhysicalProgressSetup: undefined,
        loader: {
          ...state.loader,
          uploadPhysicalProgressSetup: false,
        },
      };



    case actionTypes.DOWNLOAD_PHYSICAL_PROGRESS_SETUP_ROW_REQUESTED:
      return {
        ...state,
        loader: {
          ...state.loader,
          downloadPhysicalProgressRowLoader: true,
        },
      };
    case actionTypes.DOWNLOAD_PHYSICAL_PROGRESS_SETUP_ROW_SUCCEEDED:
      return {
        ...state,
        loader: {
          ...state.loader,
          downloadPhysicalProgressRowLoader: false,
        },
      };
    case actionTypes.DOWNLOAD_PHYSICAL_PROGRESS_SETUP_ROW_FAILED:
      return {
        ...state,
        loader: {
          ...state.loader,
          downloadPhysicalProgressRowLoader: false,
        },
      };

    default:
      return state;
  }
};
const config = {
  storage,
  key: storageKeys.summary,
  blacklist: ["loader"], // topic will not be persisted
};

export default persistReducer(config, physicalProgressReducer);
// export default summaryReducer;
