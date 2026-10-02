import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
import { storageKeys } from "../../../../utils/constants";
import * as actionTypes from "./types";
import { SummaryActions } from "./actions";
import {
  CanSetupProjectSummaryData,
  CheckProjectSummaryDetailsExistData,
  DeleteProjectSummaryDetailsResponse,
  IsSummarySetupData,
  SummaryPastHistoryData,
  SummaryPendingData,
  UpdateProjectSummaryStatusResponse,
  UploadProjectSummaryTemplateResponse,
  UploadProjectSummaryTemplateSetupResponse,
} from "./dataTypes";

type SummaryState = {
  summaryHistoryList?: SummaryPastHistoryData[];
  summaryPendingList?: SummaryPendingData[];
  isSummarySetup?: IsSummarySetupData;
  deleteProjectSummaryDetails?: DeleteProjectSummaryDetailsResponse;
  updateProjectSummaryStatus?: UpdateProjectSummaryStatusResponse;
  canSetupProjectSummary?: CanSetupProjectSummaryData;
  checkProjectSummaryDetailExist?: CheckProjectSummaryDetailsExistData;
  uploadProjectSummary?: UploadProjectSummaryTemplateResponse;
  uploadProjectSummarySetup?: UploadProjectSummaryTemplateSetupResponse;
  loader: {
    summaryHistoryList: boolean;
    summaryPendingList: boolean;
    isSummarySetup: boolean;
    deleteProjectSummaryDetails: boolean;
    updateProjectSummaryStatus: boolean;
    downloadSummaryTemplate: boolean;
    canSetupProjectSummary: boolean;
    checkProjectSummaryDetailExist: boolean;
    uploadProjectSummarySetup: boolean;
    uploadProjectSummary: boolean;
  };
};

const initialState: SummaryState = {
  summaryHistoryList: undefined,
  summaryPendingList: undefined,
  isSummarySetup: undefined,
  deleteProjectSummaryDetails: undefined,
  updateProjectSummaryStatus: undefined,
  canSetupProjectSummary: undefined,
  checkProjectSummaryDetailExist: undefined,
  uploadProjectSummary: undefined,
  uploadProjectSummarySetup: undefined,
  loader: {
    summaryHistoryList: false,
    summaryPendingList: false,
    isSummarySetup: false,
    deleteProjectSummaryDetails: false,
    updateProjectSummaryStatus: false,
    downloadSummaryTemplate: false,
    canSetupProjectSummary: false,
    checkProjectSummaryDetailExist: false,
    uploadProjectSummary: false,
    uploadProjectSummarySetup: false,
  },
};

const summaryReducer = (state: SummaryState = initialState, action: SummaryActions): SummaryState => {
  switch (action.type) {
    // sales-past-history
    case actionTypes.GET_SUMMARY_PAST_HISTORY_REQUESTED:
      return {
        ...state,
        summaryHistoryList: undefined,
        loader: {
          ...state.loader,
          summaryHistoryList: true,
        },
      };
    case actionTypes.GET_SUMMARY_PAST_HISTORY_SUCCEEDED:
      return {
        ...state,
        summaryHistoryList: action.result,
        loader: {
          ...state.loader,
          summaryHistoryList: false,
        },
      };
    // pending-history
    case actionTypes.GET_SUMMARY_PENDING_UPDATE_REQUESTED:
      return {
        ...state,
        summaryPendingList: undefined,
        loader: {
          ...state.loader,
          summaryPendingList: true,
        },
      };
    case actionTypes.GET_SUMMARY_PENDING_UPDATE_SUCCEEDED:
      return {
        ...state,
        summaryPendingList: action.result,
        loader: {
          ...state.loader,
          summaryPendingList: false,
        },
      };
    case actionTypes.GET_SUMMARY_PENDING_UPDATE_FAILED:
      return {
        ...state,
        summaryPendingList: undefined,
        loader: {
          ...state.loader,
          summaryPendingList: false,
        },
      };
    case actionTypes.IS_SUMMARY_SETUP_REQUESTED:
      return {
        ...state,
        isSummarySetup: undefined,
        loader: {
          ...state.loader,
          isSummarySetup: true,
        },
      };
    case actionTypes.IS_SUMMARY_SETUP_SUCCEEDED:
      return {
        ...state,
        isSummarySetup: action.result,
        loader: {
          ...state.loader,
          isSummarySetup: false,
        },
      };
    case actionTypes.IS_SUMMARY_SETUP_FAILED:
      return {
        ...state,
        isSummarySetup: undefined,
        loader: {
          ...state.loader,
          isSummarySetup: false,
        },
      };
    case actionTypes.DELETE_PROJECT_SUMMARY_DETAILS_REQUESTED:
      return {
        ...state,
        deleteProjectSummaryDetails: undefined,
        loader: {
          ...state.loader,
          deleteProjectSummaryDetails: true,
        },
      };
    case actionTypes.DELETE_PROJECT_SUMMARY_DETAILS_SUCCEEDED:
      return {
        ...state,
        deleteProjectSummaryDetails: action.result,
        loader: {
          ...state.loader,
          deleteProjectSummaryDetails: false,
        },
      };
    case actionTypes.DELETE_PROJECT_SUMMARY_DETAILS_FAILED:
      return {
        ...state,
        deleteProjectSummaryDetails: undefined,
        loader: {
          ...state.loader,
          deleteProjectSummaryDetails: false,
        },
      };
    case actionTypes.UPDATE_PROJECT_SUMMARY_STATUS_REQUESTED:
      return {
        ...state,
        updateProjectSummaryStatus: undefined,
        loader: {
          ...state.loader,
          updateProjectSummaryStatus: true,
        },
      };
    case actionTypes.UPDATE_PROJECT_SUMMARY_STATUS_SUCCEEDED:
      return {
        ...state,
        updateProjectSummaryStatus: action.result,
        loader: {
          ...state.loader,
          updateProjectSummaryStatus: false,
        },
      };
    case actionTypes.UPDATE_PROJECT_SUMMARY_STATUS_FAILED:
      return {
        ...state,
        updateProjectSummaryStatus: undefined,
        loader: {
          ...state.loader,
          updateProjectSummaryStatus: false,
        },
      };
    case actionTypes.DOWNLOAD_PROJECT_SUMMARY_TEMPLATE_REQUESTED:
      return {
        ...state,
        loader: {
          ...state.loader,
          downloadSummaryTemplate: true,
        },
      };
    case actionTypes.DOWNLOAD_PROJECT_SUMMARY_TEMPLATE_SUCCEEDED:
      return {
        ...state,
        loader: {
          ...state.loader,
          downloadSummaryTemplate: false,
        },
      };
    case actionTypes.DOWNLOAD_PROJECT_SUMMARY_TEMPLATE_FAILED:
      return {
        ...state,
        loader: {
          ...state.loader,
          downloadSummaryTemplate: false,
        },
      };
    case actionTypes.CAN_SETUP_PROJECT_SUMMARY_REQUESTED:
      return {
        ...state,
        canSetupProjectSummary: undefined,
        loader: {
          ...state.loader,
          canSetupProjectSummary: true,
        },
      };
    case actionTypes.CAN_SETUP_PROJECT_SUMMARY_SUCCEEDED:
      return {
        ...state,
        canSetupProjectSummary: action.result,
        loader: {
          ...state.loader,
          canSetupProjectSummary: false,
        },
      };
    case actionTypes.CAN_SETUP_PROJECT_SUMMARY_FAILED:
      return {
        ...state,
        canSetupProjectSummary: undefined,
        loader: {
          ...state.loader,
          canSetupProjectSummary: false,
        },
      };
    case actionTypes.CHECK_PROJECT_SUMMARY_DETAILS_EXIST_REQUESTED:
      return {
        ...state,
        checkProjectSummaryDetailExist: undefined,
        loader: {
          ...state.loader,
          checkProjectSummaryDetailExist: true,
        },
      };
    case actionTypes.CHECK_PROJECT_SUMMARY_DETAILS_EXIST_SUCCEEDED:
      return {
        ...state,
        checkProjectSummaryDetailExist: action.result,
        loader: {
          ...state.loader,
          checkProjectSummaryDetailExist: false,
        },
      };
    case actionTypes.CHECK_PROJECT_SUMMARY_DETAILS_EXIST_FAILED:
      return {
        ...state,
        checkProjectSummaryDetailExist: undefined,
        loader: {
          ...state.loader,
          checkProjectSummaryDetailExist: false,
        },
      };
    case actionTypes.UPLOAD_PROJECT_SUMMARY_TEMPLATE_REQUESTED:
      return {
        ...state,
        uploadProjectSummary: undefined,
        loader: {
          ...state.loader,
          uploadProjectSummary: true,
        },
      };
    case actionTypes.UPLOAD_PROJECT_SUMMARY_TEMPLATE_SUCCEEDED:
      return {
        ...state,
        uploadProjectSummary: action.result,
        loader: {
          ...state.loader,
          uploadProjectSummary: false,
        },
      };
    case actionTypes.UPLOAD_PROJECT_SUMMARY_TEMPLATE_FAILED:
      return {
        ...state,
        uploadProjectSummary: undefined,
        loader: {
          ...state.loader,
          uploadProjectSummary: false,
        },
      };

    case actionTypes.UPLOAD_PROJECT_SUMMARY_SETUP_REQUESTED:
      return {
        ...state,
        uploadProjectSummarySetup: undefined,
        loader: {
          ...state.loader,
          uploadProjectSummarySetup: true,
        },
      };
    case actionTypes.UPLOAD_PROJECT_SUMMARY_SETUP_SUCCEEDED:
      return {
        ...state,
        uploadProjectSummarySetup: action.result,
        loader: {
          ...state.loader,
          uploadProjectSummarySetup: false,
        },
      };
    case actionTypes.UPLOAD_PROJECT_SUMMARY_SETUP_FAILED:
      return {
        ...state,
        uploadProjectSummarySetup: undefined,
        loader: {
          ...state.loader,
          uploadProjectSummarySetup: false,
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

export default persistReducer(config, summaryReducer);
// export default summaryReducer;
