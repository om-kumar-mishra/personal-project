import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
import { storageKeys } from "../../../../../utils/constants";
import * as actionTypes from "./types";
import { ExcelUploadActions } from "./actions";
import {
  UpdateConstructionUpdateStatusResponse,
  ExcelUploadPastHistoryData,
  ConstructionPendingData,
  UploadConstructionSetupResponse,
  CanSetupConstructionData,
  UpdateConstructionSetupStatusResponse,
  UploadConstructionUpdateTemplateResponse,
  IsConstructionSetupData,
  CanUpdateConstructionData,
  DeleteConstructionUploadResponse

} from "./dataTypes";

type ExcelUploadState = {
  excelUploadHistoryList: ExcelUploadPastHistoryData[];
  constructionPendingData: ConstructionPendingData[];
  canSetupConstructionData?: CanSetupConstructionData;
  UploadConstructionSetup?: UploadConstructionSetupResponse;
  updateConstructionSetupStatus?: UpdateConstructionSetupStatusResponse;
  uploadConstructionTemplate?: UploadConstructionUpdateTemplateResponse;
  CanUpdateConstructionData?: CanUpdateConstructionData;
  UpdateConstructionUpdateStatus?: UpdateConstructionUpdateStatusResponse;
  isConstructionSetup?: IsConstructionSetupData;
  DeleteConstructionUpload?: DeleteConstructionUploadResponse;
  loader: {
    excelUploadHistoryList: boolean;
    constructionPendingData: boolean;
    UploadConstructionSetup: boolean;
    canSetupConstructionData: boolean;
    updateConstructionSetupStatus: boolean;
    downloadConstructionTemplate: boolean;
    withdrawnConfirmLoader: boolean;
    uploadConstructionTemplate: boolean;
    isConstructionSetup: boolean;
    CanUpdateConstruction: boolean;
    DeleteConstructionUpload: boolean;
    UpdateConstructionUpdateStatus: boolean;
    downloadConstructionUploadTemplate: boolean;
    downloadExcelUploadRowLoader: boolean;
  };
};

const initialState: ExcelUploadState = {
  excelUploadHistoryList: [],
  constructionPendingData: [],
  canSetupConstructionData: undefined,
  UploadConstructionSetup: undefined,
  updateConstructionSetupStatus: undefined,
  uploadConstructionTemplate: undefined,
  isConstructionSetup: undefined,
  CanUpdateConstructionData: undefined,
  DeleteConstructionUpload: undefined,
  UpdateConstructionUpdateStatus: undefined,
  loader: {
    excelUploadHistoryList: false,
    constructionPendingData: false,
    UploadConstructionSetup: false,
    canSetupConstructionData: false,
    updateConstructionSetupStatus: false,
    downloadConstructionTemplate: false,
    withdrawnConfirmLoader: false,
    uploadConstructionTemplate: false,
    isConstructionSetup: false,
    CanUpdateConstruction: false,
    DeleteConstructionUpload: false,
    UpdateConstructionUpdateStatus: false,
    downloadConstructionUploadTemplate: false,
    downloadExcelUploadRowLoader: false,
  },
};

const excelUploadeReducer = (state: ExcelUploadState = initialState, action: ExcelUploadActions): ExcelUploadState => {
  switch (action.type) {
    // sales-past-history
    case actionTypes.GET_CONTRUCTION_EXCEL_UPLOAD_PAST_HISTORY_REQUESTED:
      return {
        ...state,
        excelUploadHistoryList: [],
        loader: {
          ...state.loader,
          excelUploadHistoryList: true,
        },
      };
    case actionTypes.GET_CONTRUCTION_EXCEL_UPLOAD_PAST_HISTORY_SUCCEEDED:
      return {
        ...state,
        excelUploadHistoryList: action.result,
        loader: {
          ...state.loader,
          excelUploadHistoryList: false,
        },
      };
    // pending-history
    case actionTypes.GET_CONTRUCTION_PENDING_MIS_REQUESTED:
      return {
        ...state,
        constructionPendingData: [],
        loader: {
          ...state.loader,
          constructionPendingData: true,
        },
      };
    case actionTypes.GET_CONTRUCTION_PENDING_MIS_SUCCEEDED:
      return {
        ...state,
        constructionPendingData: action.result,
        loader: {
          ...state.loader,
          constructionPendingData: false,
        },
      };
    case actionTypes.GET_CONTRUCTION_PENDING_MIS_FAILED:
      return {
        ...state,
        constructionPendingData: [],
        loader: {
          ...state.loader,
          constructionPendingData: false,
        },
      };

    case actionTypes.INSERT_CONSTRUCTION_SETUP_TEMPLATE_REQUESTED:
      return {
        ...state,
        UploadConstructionSetup: undefined,
        loader: {
          ...state.loader,
          UploadConstructionSetup: true,
        },
      };
    case actionTypes.INSERT_CONSTRUCTION_SETUP_TEMPLATE_SUCCEEDED:
      return {
        ...state,
        UploadConstructionSetup: action.result,
        loader: {
          ...state.loader,
          UploadConstructionSetup: false,
        },
      };
    case actionTypes.INSERT_CONSTRUCTION_SETUP_TEMPLATE_FAILED:
      return {
        ...state,
        UploadConstructionSetup: undefined,
        loader: {
          ...state.loader,
          UploadConstructionSetup: false,
        },
      };

    case actionTypes.CAN_SETUP_CONSTRUCTION_REQUESTED:
      return {
        ...state,
        canSetupConstructionData: undefined,
        loader: {
          ...state.loader,
          canSetupConstructionData: true,
        },
      };
    case actionTypes.CAN_SETUP_CONSTRUCTION_SUCCEEDED:
      return {
        ...state,
        canSetupConstructionData: action.result,
        loader: {
          ...state.loader,
          canSetupConstructionData: false,
        },
      };
    case actionTypes.CAN_SETUP_CONSTRUCTION_FAILED:
      return {
        ...state,
        canSetupConstructionData: undefined,
        loader: {
          ...state.loader,
          canSetupConstructionData: false,
        },
      };

    case actionTypes.UPDATE_CONSTRUCTION_SETUP_STATUS_REQUESTED:
      return {
        ...state,
        updateConstructionSetupStatus: undefined,
        loader: {
          ...state.loader,
          updateConstructionSetupStatus: true,
        },
      };
    case actionTypes.UPDATE_CONSTRUCTION_SETUP_STATUS_SUCCEEDED:
      return {
        ...state,
        updateConstructionSetupStatus: action.result,
        loader: {
          ...state.loader,
          updateConstructionSetupStatus: false,
        },
      };
    case actionTypes.UPDATE_CONSTRUCTION_SETUP_STATUS_FAILED:
      return {
        ...state,
        updateConstructionSetupStatus: undefined,
        loader: {
          ...state.loader,
          updateConstructionSetupStatus: false,
        },
      };

    case actionTypes.DOWNLOAD_CONSTRUCTION_SETUP_TEMPLATE_REQUESTED:
      return {
        ...state,
        loader: {
          ...state.loader,
          downloadConstructionTemplate: true,
        },
      };
    case actionTypes.DOWNLOAD_CONSTRUCTION_SETUP_TEMPLATE_SUCCEEDED:
      return {
        ...state,
        loader: {
          ...state.loader,
          downloadConstructionTemplate: false,
        },
      };
    case actionTypes.DOWNLOAD_CONSTRUCTION_SETUP_TEMPLATE_FAILED:
      return {
        ...state,
        loader: {
          ...state.loader,
          downloadConstructionTemplate: false,
        },
      };

    case actionTypes.UPLOAD_CONSTRUCTIO_UPDATE_TEMPLATE_REQUESTED:
      return {
        ...state,
        uploadConstructionTemplate: undefined,
        loader: {
          ...state.loader,
          uploadConstructionTemplate: true,
        },
      };
    case actionTypes.UPLOAD_CONSTRUCTIO_UPDATE_TEMPLATE_SUCCEEDED:
      return {
        ...state,
        uploadConstructionTemplate: action.result,
        loader: {
          ...state.loader,
          uploadConstructionTemplate: false,
        },
      };
    case actionTypes.UPLOAD_CONSTRUCTIO_UPDATE_TEMPLATE_FAILED:
      return {
        ...state,
        uploadConstructionTemplate: undefined,
        loader: {
          ...state.loader,
          uploadConstructionTemplate: false,
        },
      };

    case actionTypes.IS_CONSTRUCTION_SETUP_REQUESTED:
      return {
        ...state,
        isConstructionSetup: undefined,
        loader: {
          ...state.loader,
          isConstructionSetup: true,
        },
      };
    case actionTypes.IS_CONSTRUCTION_SETUP_SUCCEEDED:
      return {
        ...state,
        isConstructionSetup: action.result,
        loader: {
          ...state.loader,
          isConstructionSetup: false,
        },
      };
    case actionTypes.IS_CONSTRUCTION_SETUP_FAILED:
      return {
        ...state,
        isConstructionSetup: undefined,
        loader: {
          ...state.loader,
          isConstructionSetup: false,
        },
      };

    case actionTypes.CAN_UPDATE_CONSTRUCTION_REQUESTED:
      return {
        ...state,
        CanUpdateConstructionData: undefined,
        loader: {
          ...state.loader,
          CanUpdateConstruction: true,
        },
      };
    case actionTypes.CAN_UPDATE_CONSTRUCTION_SUCCEEDED:
      return {
        ...state,
        CanUpdateConstructionData: action.result,
        loader: {
          ...state.loader,
          CanUpdateConstruction: false,
        },
      };
    case actionTypes.CAN_UPDATE_CONSTRUCTION_FAILED:
      return {
        ...state,
        CanUpdateConstructionData: undefined,
        loader: {
          ...state.loader,
          CanUpdateConstruction: false,
        },
      };

    case actionTypes.UPDATE_CONSTRUCTION_STATUS_REQUESTED:
      return {
        ...state,
        UpdateConstructionUpdateStatus: undefined,
        loader: {
          ...state.loader,
          UpdateConstructionUpdateStatus: true,
        },
      };
    case actionTypes.UPDATE_CONSTRUCTION_STATUS_SUCCEEDED:
      return {
        ...state,
        UpdateConstructionUpdateStatus: action.result,
        loader: {
          ...state.loader,
          UpdateConstructionUpdateStatus: false,
        },
      };
    case actionTypes.UPDATE_CONSTRUCTION_STATUS_FAILED:
      return {
        ...state,
        UpdateConstructionUpdateStatus: undefined,
        loader: {
          ...state.loader,
          UpdateConstructionUpdateStatus: false,
        },
      };
    case actionTypes.DELETE_CONSTRUCTION_UPDATE_DETAILS_REQUESTED:
      return {
        ...state,
        DeleteConstructionUpload: undefined,
        loader: {
          ...state.loader,
          DeleteConstructionUpload: true,
        },
      };
    case actionTypes.DELETE_CONSTRUCTION_UPDATE_DETAILS_SUCCEEDED:
      return {
        ...state,
        DeleteConstructionUpload: action.result,
        loader: {
          ...state.loader,
          DeleteConstructionUpload: false,
        },
      };
    case actionTypes.DELETE_CONSTRUCTION_UPDATE_DETAILS_FAILED:
      return {
        ...state,
        DeleteConstructionUpload: undefined,
        loader: {
          ...state.loader,
          DeleteConstructionUpload: false,
        },
      };

    case actionTypes.DOWNLOAD_CONSTRUCTION_TEMPLATE_REQUESTED:
      return {
        ...state,
        loader: {
          ...state.loader,
          downloadConstructionUploadTemplate: true,
        },
      };
    case actionTypes.DOWNLOAD_CONSTRUCTION_TEMPLATE_SUCCEEDED:
      return {
        ...state,
        loader: {
          ...state.loader,
          downloadConstructionUploadTemplate: false,
        },
      };
    case actionTypes.DOWNLOAD_CONSTRUCTION_TEMPLATE_FAILED:
      return {
        ...state,
        loader: {
          ...state.loader,
          downloadConstructionUploadTemplate: false,
        },
      };
    case actionTypes.DOWNLOAD_EXCEL_UPLOAD_SETUP_ROW_REQUESTED:
      return {
        ...state,
        loader: {
          ...state.loader,
          downloadExcelUploadRowLoader: true,
        },
      };
    case actionTypes.DOWNLOAD_EXCEL_UPLOAD_SETUP_ROW_SUCCEEDED:
      return {
        ...state,
        loader: {
          ...state.loader,
          downloadExcelUploadRowLoader: false,
        },
      };
    case actionTypes.DOWNLOAD_EXCEL_UPLOAD_SETUP_ROW_FAILED:
      return {
        ...state,
        loader: {
          ...state.loader,
          downloadExcelUploadRowLoader: false,
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

export default persistReducer(config, excelUploadeReducer);
// export default summaryReducer;
