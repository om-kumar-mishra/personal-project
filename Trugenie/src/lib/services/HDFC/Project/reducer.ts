import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
import { storageKeys } from "../../../../utils/constants";
import { ProjectActions } from "./actions";
import {
  AllProjectList,
  AssetInvestmentType,
  CustomerTaggedRMUsersData,
  Project,
  ProjectAssignUserResponse,
  ProjectLogs,
  ProjectUpdateResponse,
  ProjectUserAccessDetails,
  ProjectUserAccessList,
  ProjectUserType,
  RemoveUserProjectAccessResponse,
  UserByRoleData,
  RoleType,
} from "./dataTypes";
import * as actionTypes from "./types";
// const storage = storageData;

type ProjectState = {
  projectList?: Project[];
  selectedProject?: Project;
  customerTaggedRMUsers?: CustomerTaggedRMUsersData[];
  reProjectUpdate?: ProjectUpdateResponse;
  reProjectUpdateStatus?: ProjectUpdateResponse;
  allProjectList?: AllProjectList[];
  projectLogs?: ProjectLogs[];
  projectAssignUser?: ProjectAssignUserResponse;
  projectAccessUserList?: ProjectUserAccessList[];
  projectAccessUserDetails?: ProjectUserAccessDetails;
  removeUserProjectAccess?: RemoveUserProjectAccessResponse;
  roleTemplateNameList?: RoleType[];
  userByRoleList?: UserByRoleData[];
  projectUsersList: ProjectUserType[] | null;
  assetInvestmentList : AssetInvestmentType[] | null;
  selectedAssetInvestment?:AssetInvestmentType;
  loader: {
    list: boolean;
    customerTaggedRMUsers: boolean;
    reProjectUpdate: boolean;
    reProjectUpdateStatus: boolean;
    allProjectList: boolean;
    projectLogs: boolean;
    projectAssignUser: boolean;
    projectAccessUserList: boolean;
    projectAccessUserDetails: boolean;
    removeUserProjectAccess: boolean;
    roleTemplateNameList: boolean;
    userByRoleList: boolean;
    addProject: boolean;
    projectUserListLoader: boolean;
    downloadNocProjectSummary: boolean;
    assetInvestmentLoader:boolean;
  };
};

const initialState: ProjectState = {
  projectList: undefined,
  customerTaggedRMUsers: undefined,
  reProjectUpdate: undefined,
  reProjectUpdateStatus: undefined,
  allProjectList: undefined,
  projectLogs: undefined,
  projectAssignUser: undefined,
  projectAccessUserList: undefined,
  projectAccessUserDetails: undefined,
  removeUserProjectAccess: undefined,
  roleTemplateNameList: undefined,
  userByRoleList: undefined,
  projectUsersList: null,
  assetInvestmentList:null,
  loader: {
    list: false,
    customerTaggedRMUsers: false,
    reProjectUpdate: false,
    reProjectUpdateStatus: false,
    allProjectList: false,
    projectLogs: false,
    projectAssignUser: false,
    projectAccessUserList: false,
    projectAccessUserDetails: false,
    removeUserProjectAccess: false,
    roleTemplateNameList: false,
    userByRoleList: false,
    addProject: false,
    projectUserListLoader: false,
    downloadNocProjectSummary: false,
    assetInvestmentLoader:false,
  },
};

const projectReducer = (state: ProjectState = initialState, action: ProjectActions): ProjectState => {
  switch (action.type) {
    // login
    case actionTypes.PROJECT_LIST_REQUESTED:
      return {
        ...state,
        projectList: undefined,
        loader: {
          ...state.loader,
          list: true,
        },
      };

    case actionTypes.PROJECT_LIST_SUCCEEDED:
      return {
        ...state,
        projectList: action.result.data,
        loader: {
          ...state.loader,
          list: false,
        },
      };

    case actionTypes.PROJECT_LIST_FAILED:
      return {
        ...state,
        loader: {
          ...state.loader,
          list: false,
        },
      };

    case actionTypes.SET_SELECTED_PROJECT:
      return {
        ...state,
        selectedProject: action.data,
        loader: {
          ...state.loader,
        },
      };

    case actionTypes.PROJECT_LIST_RESET:
      return {
        ...state,
        projectList: initialState.projectList,
        selectedProject: initialState.selectedProject,
        loader: {
          ...state.loader,
        },
      };

    case actionTypes.CUSTOMER_TAGGED_RM_USER_REQUESTED:
      return {
        ...state,
        customerTaggedRMUsers: undefined,
        loader: {
          ...state.loader,
          customerTaggedRMUsers: true,
        },
      };

    case actionTypes.CUSTOMER_TAGGED_RM_USER_SUCCEEDED:
      return {
        ...state,
        customerTaggedRMUsers: action.result.data,
        loader: {
          ...state.loader,
          customerTaggedRMUsers: false,
        },
      };

    case actionTypes.CUSTOMER_TAGGED_RM_USER_FAILED:
      return {
        ...state,
        customerTaggedRMUsers: undefined,
        loader: {
          ...state.loader,
          customerTaggedRMUsers: false,
        },
      };

    case actionTypes.PROJECT_UPDATE_REQUESTED:
      return {
        ...state,
        reProjectUpdate: undefined,
        loader: {
          ...state.loader,
          reProjectUpdate: true,
        },
      };

    case actionTypes.PROJECT_UPDATE_SUCCEEDED:
      return {
        ...state,
        reProjectUpdate: action.result,
        loader: {
          ...state.loader,
          reProjectUpdate: false,
        },
      };

    case actionTypes.PROJECT_UPDATE_FAILED:
      return {
        ...state,
        reProjectUpdate: undefined,
        loader: {
          ...state.loader,
          reProjectUpdate: false,
        },
      };
    case actionTypes.PROJECT_ENABLE_DISABLE_REQUESTED:
      return {
        ...state,
        reProjectUpdateStatus: undefined,
        loader: {
          ...state.loader,
          reProjectUpdateStatus: true,
        },
      };

    case actionTypes.PROJECT_ENABLE_DISABLE_SUCCEEDED:
      return {
        ...state,
        reProjectUpdateStatus: action.result,
        loader: {
          ...state.loader,
          reProjectUpdateStatus: false,
        },
      };

    case actionTypes.PROJECT_ENABLE_DISABLE_FAILED:
      return {
        ...state,
        reProjectUpdateStatus: undefined,
        loader: {
          ...state.loader,
          reProjectUpdateStatus: false,
        },
      };
    case actionTypes.ALL_PROJECT_LIST_REQUESTED:
      return {
        ...state,
        allProjectList: undefined,
        loader: {
          ...state.loader,
          allProjectList: true,
        },
      };

    case actionTypes.ALL_PROJECT_LIST_SUCCEEDED:
      return {
        ...state,
        allProjectList: action.result.data,
        loader: {
          ...state.loader,
          allProjectList: false,
        },
      };

    case actionTypes.ALL_PROJECT_LIST_FAILED:
      return {
        ...state,
        allProjectList: undefined,
        loader: {
          ...state.loader,
          allProjectList: false,
        },
      };

    case actionTypes.PROJECT_LOGS_LIST_REQUESTED:
      return {
        ...state,
        projectLogs: undefined,
        loader: {
          ...state.loader,
          projectLogs: true,
        },
      };

    case actionTypes.PROJECT_LOGS_LIST_SUCCEEDED:
      return {
        ...state,
        projectLogs: action.result.data,
        loader: {
          ...state.loader,
          projectLogs: false,
        },
      };

    case actionTypes.PROJECT_LOGS_LIST_FAILED:
      return {
        ...state,
        projectLogs: undefined,
        loader: {
          ...state.loader,
          projectLogs: false,
        },
      };

    case actionTypes.PROJECT_ASSIGN_USER_REQUESTED:
      return {
        ...state,
        projectAssignUser: undefined,
        loader: {
          ...state.loader,
          projectAssignUser: true,
        },
      };

    case actionTypes.PROJECT_ASSIGN_USER_SUCCEEDED:
      return {
        ...state,
        projectAssignUser: action.result,
        loader: {
          ...state.loader,
          projectAssignUser: false,
        },
      };

    case actionTypes.PROJECT_ASSIGN_USER_FAILED:
      return {
        ...state,
        projectAssignUser: undefined,
        loader: {
          ...state.loader,
          projectAssignUser: false,
        },
      };
    case actionTypes.PROJECT_ACCESS_USER_LIST_REQUESTED:
      return {
        ...state,
        projectAccessUserList: undefined,
        loader: {
          ...state.loader,
          projectAccessUserList: true,
        },
      };

    case actionTypes.PROJECT_ACCESS_USER_LIST_SUCCEEDED:
      return {
        ...state,
        projectAccessUserList: action.result?.data ?? [],
        loader: {
          ...state.loader,
          projectAccessUserList: false,
        },
      };

    case actionTypes.PROJECT_ACCESS_USER_LIST_FAILED:
      return {
        ...state,
        projectAccessUserList: undefined,
        loader: {
          ...state.loader,
          projectAccessUserList: false,
        },
      };
    case actionTypes.PROJECT_ACCESS_USER_DETAILS_REQUESTED:
      return {
        ...state,
        projectAccessUserDetails: undefined,
        loader: {
          ...state.loader,
          projectAccessUserDetails: true,
        },
      };

    case actionTypes.PROJECT_ACCESS_USER_DETAILS_SUCCEEDED:
      return {
        ...state,
        projectAccessUserDetails: action.result?.data.userInfo ?? [],
        loader: {
          ...state.loader,
          projectAccessUserDetails: false,
        },
      };

    case actionTypes.PROJECT_ACCESS_USER_DETAILS_FAILED:
      return {
        ...state,
        projectAccessUserDetails: undefined,
        loader: {
          ...state.loader,
          projectAccessUserDetails: false,
        },
      };
    case actionTypes.REMOVE_PROJECT_USER_ACCESS_REQUESTED:
      return {
        ...state,
        removeUserProjectAccess: undefined,
        loader: {
          ...state.loader,
          removeUserProjectAccess: true,
        },
      };

    case actionTypes.REMOVE_PROJECT_USER_ACCESS_SUCCEEDED:
      return {
        ...state,
        removeUserProjectAccess: action.result,
        loader: {
          ...state.loader,
          removeUserProjectAccess: false,
        },
      };

    case actionTypes.REMOVE_PROJECT_USER_ACCESS_FAILED:
      return {
        ...state,
        removeUserProjectAccess: undefined,
        loader: {
          ...state.loader,
          removeUserProjectAccess: false,
        },
      };
    case actionTypes.ROLE_TEMPLATE_NAME_LIST_REQUESTED:
      return {
        ...state,
        roleTemplateNameList: undefined,
        loader: {
          ...state.loader,
          roleTemplateNameList: true,
        },
      };

    case actionTypes.ROLE_TEMPLATE_NAME_LIST_SUCCEEDED:
      return {
        ...state,
        roleTemplateNameList: action.result.data,
        loader: {
          ...state.loader,
          roleTemplateNameList: false,
        },
      };

    case actionTypes.ROLE_TEMPLATE_NAME_LIST_FAILED:
      return {
        ...state,
        roleTemplateNameList: undefined,
        loader: {
          ...state.loader,
          roleTemplateNameList: false,
        },
      };
    case actionTypes.USER_BY_ROLE_LIST_REQUESTED:
      return {
        ...state,
        userByRoleList: undefined,
        loader: {
          ...state.loader,
          userByRoleList: true,
        },
      };

    case actionTypes.USER_BY_ROLE_LIST_SUCCEEDED:
      return {
        ...state,
        userByRoleList: action.result.data,
        loader: {
          ...state.loader,
          userByRoleList: false,
        },
      };

    case actionTypes.USER_BY_ROLE_LIST_FAILED:
      return {
        ...state,
        userByRoleList: undefined,
        loader: {
          ...state.loader,
          userByRoleList: false,
        },
      };

    case actionTypes.CREATE_PROJECT_REQUEST:
      return {
        ...state,
        loader: {
          ...state.loader,
          addProject: true,
        },
      };

    case actionTypes.CREATE_PROJECT_SUCCESS:
      return {
        ...state,
        loader: {
          ...state.loader,
          addProject: false,
        },
      };

    case actionTypes.CREATE_PROJECT_FAILURE:
      return {
        ...state,
        loader: {
          ...state.loader,
          addProject: false,
        },
      };

    case actionTypes.GET_USERS_FOR_PROJECT_REQUESTED:
      return {
        ...state,
        projectUsersList: null,
        loader: {
          ...state.loader,
          projectUserListLoader: true,
        },
      };

    case actionTypes.GET_USERS_FOR_PROJECT_SUCCEEDED:
      return {
        ...state,
        projectUsersList: action.data,
        loader: {
          ...state.loader,
          projectUserListLoader: false,
        },
      };

    case actionTypes.GET_USERS_FOR_PROJECT_FAILED:
      return {
        ...state,
        loader: {
          ...state.loader,
          projectUserListLoader: false,
        },
      };

    case actionTypes.DOWNLOAD_NOC_PROJECT_SUMMARY_REQUESTED:
      return {
        ...state,
        loader: {
          ...state.loader,
          downloadNocProjectSummary: true,
        },
      };

    case actionTypes.DOWNLOAD_NOC_PROJECT_SUMMARY_SUCCESSFUL:
      return {
        ...state,
        loader: {
          ...state.loader,
          downloadNocProjectSummary: false,
        },
      };

    case actionTypes.DOWNLOAD_NOC_PROJECT_SUMMARY_FAILED:
      return {
        ...state,
        loader: {
          ...state.loader,
          downloadNocProjectSummary: false,
        },
      };

      case actionTypes.GET_ASSET_INVESTMENT_LIST_REQUESTED:
        return {
          ...state,
          loader: {
            ...state.loader,
            assetInvestmentLoader: true,
          },
        };
  
      case actionTypes.GET_ASSET_INVESTMENT_LIST_SUCCESSFUL:
        return {
          ...state,
          assetInvestmentList :action.data,
          loader: {
            ...state.loader,
            assetInvestmentLoader: false,
          },
        };
  
      case actionTypes.GET_ASSET_INVESTMENT_LIST_FAILED:
        return {
          ...state,
          loader: {
            ...state.loader,
            assetInvestmentLoader: false,
          },
        };

      case actionTypes.SET_SELECTED_ASSET_INVESTMENT:
      return {
        ...state,
        selectedAssetInvestment: action.data,
        loader: {
          ...state.loader,
        },
      };

    case actionTypes.ASSET_INVESTMENT_LIST_RESET:
      return {
        ...state,
        assetInvestmentList: initialState.assetInvestmentList,
        selectedAssetInvestment: initialState.selectedAssetInvestment,
        loader: {
          ...state.loader,
        },
      };

    default:
      return state;
  }
};
const config = {
  storage,
  key: storageKeys.project,
  blacklist: ["loader"], // topic will not be persisted
};

export default persistReducer(config, projectReducer);
