import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
import { storageKeys } from "../../../../utils/constants";
import { ProjectSetupListActions } from "./action";
import { CanCreateSetupDataType, CanProjectSetupUpdateDataType, ProjectSalesApprovalsListDataType, ProjectSalesListDataType } from "./dataTypes";
import * as types from "./types";

type ProjectSetupState = {
  projectSalesList: ProjectSalesListDataType[];
  projectSalesApprovalsList: ProjectSalesApprovalsListDataType[];
  canSetupProjectUpdate: CanProjectSetupUpdateDataType | null;
  canCreateSetup: CanCreateSetupDataType[];
  loaders: {
    projectSalesListLoader: boolean;
    projectSalesApprovalsListLoader: boolean;
    downloadProjectTemplateLoader: boolean;
    uploadDcoumentLoader: boolean;
    withdrawnConfirmLoader: boolean;
    downloadProjectRowLoader: boolean;
    canSetupUpdateLoader: boolean;
  };
};
const initialState: ProjectSetupState = {
  projectSalesList: [],
  projectSalesApprovalsList: [],
  canSetupProjectUpdate: null,
  canCreateSetup: [],
  loaders: {
    projectSalesListLoader: false,
    projectSalesApprovalsListLoader: false,
    downloadProjectTemplateLoader: false,
    uploadDcoumentLoader: false,
    withdrawnConfirmLoader: false,
    downloadProjectRowLoader: false,
    canSetupUpdateLoader: false,
  },
};

const projectSetupReducer = (state: ProjectSetupState = initialState, action: ProjectSetupListActions): ProjectSetupState => {
  switch (action.type) {
    case types.GET_PROJECT_SALES_LIST_REQUESTED:
      return {
        ...state,
        projectSalesList: [],
        loaders: {
          ...state.loaders,
          projectSalesListLoader: true,
        },
      };
    case types.GET_PROJECT_SALES_LIST_SUCCEEDED:
      return {
        ...state,
        projectSalesList: action.result.data,
        loaders: {
          ...state.loaders,
          projectSalesListLoader: false,
        },
      };
    case types.GET_PROJECT_SALES_LIST_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          projectSalesListLoader: false,
        },
      };
    case types.GET_PROJECT_SALES_APPROVALS_LIST_REQUESTED:
      return {
        ...state,
        projectSalesApprovalsList: [],
        loaders: {
          ...state.loaders,
          projectSalesApprovalsListLoader: true,
        },
      };
    case types.GET_PROJECT_SALES_APPROVALS_LIST_SUCCEEDED:
      return {
        ...state,
        projectSalesApprovalsList: action.projectSalesApprovalsList,
        loaders: {
          ...state.loaders,
          projectSalesApprovalsListLoader: false,
        },
      };
    case types.GET_PROJECT_SALES_APPROVALS_LIST_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          projectSalesApprovalsListLoader: false,
        },
      };
    case types.CAN_SETUP_UPDATE_SUCCEEDED:
      return {
        ...state,
        canSetupProjectUpdate: action.canProjectSetupUpdate[0],
      };
    case types.CAN_CREATE_PROJECT_SETUP_REQUESTED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          canSetupUpdateLoader: true,
        },
      };
    case types.CAN_CREATE_PROJECT_SETUP_SUCCEEDED:
      return {
        ...state,
        canCreateSetup: action.canCreateSetup,
        loaders: {
          ...state.loaders,
          canSetupUpdateLoader: false,
        },
      };

    case types.CAN_CREATE_PROJECT_SETUP_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          canSetupUpdateLoader: false,
        },
      };
    // download template
    case types.DOWNLOAD_PROJECT_SETUP_REQUESTED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          downloadProjectTemplateLoader: true,
        },
      };
    case types.DOWNLOAD_PROJECT_SETUP_SUCCEEDED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          downloadProjectTemplateLoader: false,
        },
      };
    case types.DOWNLOAD_PROJECT_SETUP_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          downloadProjectTemplateLoader: false,
        },
      };
    // upload  template loader
    case types.UPLOAD_PROJECT_SETUP_REQUESTED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          uploadDcoumentLoader: true,
        },
      };
    case types.UPLOAD_PROJECT_SETUP_SUCCEEDED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          uploadDcoumentLoader: false,
        },
      };
    case types.UPLOAD_PROJECT_SETUP_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          uploadDcoumentLoader: false,
        },
      };
    // withdrawan confirm loader
    case types.STATUS_CHANGE_PROJECT_SALES_LIST_REQUESTED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          withdrawnConfirmLoader: true,
        },
      };
    case types.STATUS_CHANGE_PROJECT_SALES_LIST_SUCCEEDED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          withdrawnConfirmLoader: false,
        },
      };
    case types.STATUS_CHANGE_PROJECT_SALES_LIST_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          withdrawnConfirmLoader: false,
        },
      };
    case types.DOWNLOAD_PROJECT_SETUP_ROW_REQUESTED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          downloadProjectRowLoader: true,
        },
      };
    case types.DOWNLOAD_PROJECT_SETUP_ROW_SUCCEEDED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          downloadProjectRowLoader: false,
        },
      };
    case types.DOWNLOAD_PROJECT_SETUP_ROW_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          downloadProjectRowLoader: false,
        },
      };

    default:
      return state;
  }
};
const config = {
  storage,
  key: storageKeys.projectSetup,
  blacklist: ["loaders"], // topic will not be persisted
};

export default persistReducer(config, projectSetupReducer);
