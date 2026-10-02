import { fa0, faL } from "@fortawesome/free-solid-svg-icons";
import { NOCProjectDetailsData, 
  NOCViewUserDetailType, 
  nocSetupWorkflowDataType, 
  priceHeaderSelect, 
  selectType,
  NocProjectEntitiesApiData, 
  NocProjectEntityUsersApiData,
  NocWorkflowDetailsApiData,
  GetPMCByClientApiData,
  GetDeveloperByClientApiData, 
  GetDebentureByClientApiData,
  GetLenderByClientApiData, GetEntityUserApiDate} from "./datatype";
import { NocSetupActionType } from "./types";

type initialStateType = {
  thresholdType: undefined;
  period: selectType[] | undefined;
  projectType: undefined;
  reraNo: undefined;
  projectTowers: undefined;
  priceHeaders: priceHeaderSelect[] | undefined;
  accountDetails: undefined;
  setupWorkflow: nocSetupWorkflowDataType[] | undefined;
  viewUserDetails: NOCViewUserDetailType[] | undefined;
  accountType: string[] | undefined;
  setupNocProject: string | undefined;
  projectDetails: NOCProjectDetailsData[] | undefined;
  projectEntities : NocProjectEntitiesApiData[] | undefined;
  projectEntityUsers : NocProjectEntityUsersApiData[] | undefined;
  WorkflowDetails : NocWorkflowDetailsApiData[] | undefined;
  lenderByClient:GetLenderByClientApiData[]|undefined;
  developerByClient:GetDeveloperByClientApiData[]|undefined;
  debentureByClient:GetDebentureByClientApiData[]|undefined;
  PMCByClient:GetPMCByClientApiData[] | undefined;
  entityUser:GetEntityUserApiDate[]|undefined;
  loaders: {
    thresholdType: boolean;
    period: boolean;
    projectType: boolean;
    reraNo: boolean;
    projectTowers: boolean;
    priceHeaders: boolean;
    accountDetails: boolean;
    setupWorkflow: boolean;
    viewUserDetails: boolean;
    setupNocProject: boolean;
    accountType: boolean;
    projectDetails: boolean;
    projectEntities:boolean;
    projectEntityUsers:boolean;
    WorkflowDetails:boolean;
    lenderByClient:boolean;
  developerByClient:boolean;
  debentureByClient:boolean;
  PMCByClient:boolean;
  entityUser:boolean;
  };
};

const initialState: initialStateType = {
  thresholdType: undefined,
  period: undefined,
  projectType: undefined,
  reraNo: undefined,
  projectTowers: undefined,
  priceHeaders: undefined,
  accountDetails: undefined,
  setupWorkflow: undefined,
  viewUserDetails: undefined,
  setupNocProject: undefined,
  accountType: undefined,
  projectDetails: undefined,
  projectEntities:undefined,
  projectEntityUsers:undefined,
  WorkflowDetails:undefined,
  lenderByClient:undefined,
  developerByClient:undefined,
  debentureByClient:undefined,
  PMCByClient:undefined,
  entityUser:undefined,
  loaders: {
    thresholdType: false,
    period: false,
    projectType: false,
    reraNo: false,
    projectTowers: false,
    priceHeaders: false,
    accountDetails: false,
    setupWorkflow: false,
    viewUserDetails: false,
    setupNocProject: false,
    accountType: false,
    projectDetails: false,
    projectEntities:false,
    projectEntityUsers:false,
    WorkflowDetails:false,
    lenderByClient:false,
  developerByClient:false,
  debentureByClient:false,
  PMCByClient:false,
  entityUser:false,
  },
};

const NOCSetupReducer = (state: initialStateType = initialState, action: { type: NocSetupActionType; result: any }) => {
  switch (action.type) {
    case NocSetupActionType.GET_THRESHOLD_TYPE_REQUESTED:
      return {
        ...state,
        thresholdType: undefined,
        loaders: {
          ...state.loaders,
          thresholdType: true,
        },
      };
    case NocSetupActionType.GET_THRESHOLD_TYPE_SUCCESS:
      return {
        ...state,
        thresholdType: action.result,
        loaders: {
          ...state.loaders,
          thresholdType: false,
        },
      };
    case NocSetupActionType.GET_THRESHOLD_TYPE_FAILED:
      return {
        ...state,
        thresholdType: undefined,
        loaders: {
          ...state.loaders,
          thresholdType: false,
        },
      };
    case NocSetupActionType.GET_PERIOD_REQUESTED:
      return {
        ...state,
        period: undefined,
        loaders: {
          ...state.loaders,
          period: true,
        },
      };
    case NocSetupActionType.GET_PERIOD_SUCCESS:
      return {
        ...state,
        period: action.result,
        loaders: {
          ...state.loaders,
          period: false,
        },
      };
    case NocSetupActionType.GET_PERIOD_FAILED:
      return {
        ...state,
        period: undefined,
        loaders: {
          ...state.loaders,
          period: false,
        },
      };
    case NocSetupActionType.GET_PROJECT_TYPE_REQUESTED:
      return {
        ...state,
        projectType: undefined,
        loaders: {
          ...state.loaders,
          projectType: true,
        },
      };
    case NocSetupActionType.GET_PROJECT_TYPE_SUCCESS:
      return {
        ...state,
        projectType: action.result,
        loaders: {
          ...state.loaders,
          projectType: false,
        },
      };
    case NocSetupActionType.GET_PROJECT_TYPE_FAILED:
      return {
        ...state,
        projectType: undefined,
        loaders: {
          ...state.loaders,
          projectType: false,
        },
      };
    case NocSetupActionType.GET_RERA_NO_REQUESTED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          reraNo: true,
        },
      };
    case NocSetupActionType.GET_RERA_NO_SUCCESS:
      return {
        ...state,
        reraNo: action.result,
        loaders: {
          ...state.loaders,
          reraNo: false,
        },
      };
    case NocSetupActionType.GET_RERA_NO_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          reraNo: false,
        },
      };
    case NocSetupActionType.GET_PROJECT_TOWERS_REQUESTED:
      return {
        ...state,
        projectTowers: undefined,
        loaders: {
          ...state.loaders,
          projectTowers: true,
        },
      };
    case NocSetupActionType.GET_PROJECT_TOWERS_SUCCESS:
      return {
        ...state,
        projectTowers: action.result,
        loaders: {
          ...state.loaders,
          projectTowers: false,
        },
      };
    case NocSetupActionType.GET_PROJECT_TOWERS_FAILED:
      return {
        ...state,
        projectTowers: undefined,
        loaders: {
          ...state.loaders,
          projectTowers: false,
        },
      };
    case NocSetupActionType.GET_PROJECT_PRICE_HEADERS_REQUESTED:
      return {
        ...state,
        priceHeaders: undefined,
        loaders: {
          ...state.loaders,
          priceHeaders: true,
        },
      };
    case NocSetupActionType.GET_PROJECT_PRICE_HEADERS_SUCCESS:
      return {
        ...state,
        priceHeaders: action.result,
        loaders: {
          ...state.loaders,
          priceHeaders: false,
        },
      };
    case NocSetupActionType.GET_PROJECT_PRICE_HEADERS_FAILED:
      return {
        ...state,
        priceHeaders: undefined,
        loaders: {
          ...state.loaders,
          priceHeaders: false,
        },
      };
    case NocSetupActionType.GET_ACCOUNT_DETAILS_REQUESTED:
      return {
        ...state,
        accountDetails: undefined,
        loaders: {
          ...state.loaders,
          accountDetails: true,
        },
      };
    case NocSetupActionType.GET_ACCOUNT_DETAILS_SUCCESS:
      return {
        ...state,
        accountDetails: action.result,
        loaders: {
          ...state.loaders,
          accountDetails: false,
        },
      };
    case NocSetupActionType.GET_ACCOUNT_DETAILS_FAILED:
      return {
        ...state,
        accountDetails: undefined,
        loaders: {
          ...state.loaders,
          accountDetails: false,
        },
      };
    case NocSetupActionType.GET_SETUP_WORKFLOW_REQUESTED:
      return {
        ...state,
        setupWorkflow: undefined,
        loaders: {
          ...state.loaders,
          setupWorkflow: true,
        },
      };
    case NocSetupActionType.GET_SETUP_WORKFLOW_SUCCESS:
      return {
        ...state,
        setupWorkflow: action.result,
        loaders: {
          ...state.loaders,
          setupWorkflow: false,
        },
      };
    case NocSetupActionType.GET_SETUP_WORKFLOW_FAILED:
      return {
        ...state,
        setupWorkflow: undefined,
        loaders: {
          ...state.loaders,
          setupWorkflow: false,
        },
      };
    case NocSetupActionType.GET_VIEW_USER_DETAILS_REQUESTED:
      return {
        ...state,
        viewUserDetails: undefined,
        loaders: {
          ...state.loaders,
          viewUserDetails: true,
        },
      };
    case NocSetupActionType.GET_VIEW_USER_DETAILS_SUCCESS:
      return {
        ...state,
        viewUserDetails: action.result,
        loaders: {
          ...state.loaders,
          viewUserDetails: false,
        },
      };
    case NocSetupActionType.GET_VIEW_USER_DETAILS_FAILED:
      return {
        ...state,
        viewUserDetails: undefined,
        loaders: {
          ...state.loaders,
          viewUserDetails: false,
        },
      };
    case NocSetupActionType.SETUP_NOC_PROJECT_REQUESTED:
      return {
        ...state,
        setupNocProject: undefined,
        loaders: {
          ...state.loaders,
          setupNocProject: true,
        },
      };
    case NocSetupActionType.SETUP_NOC_PROJECT_SUCCESS:
      return {
        ...state,
        setupNocProject: action.result,
        loaders: {
          ...state.loaders,
          setupNocProject: false,
        },
      };
    case NocSetupActionType.SETUP_NOC_PROJECT_FAILED:
      return {
        ...state,
        setupNocProject: action.result ?? undefined,
        loaders: {
          ...state.loaders,
          setupNocProject: false,
        },
      };
    case NocSetupActionType.GET_ACCOUNT_TYPE_REQUESTED:
      return {
        ...state,
        accountType: undefined,
        loaders: {
          ...state.loaders,
          accountType: true,
        },
      };
    case NocSetupActionType.GET_ACCOUNT_TYPE_SUCCESS:
      return {
        ...state,
        accountType: action.result?.data ?? [],
        loaders: {
          ...state.loaders,
          accountType: false,
        },
      };
    case NocSetupActionType.GET_ACCOUNT_TYPE_FAILED:
      return {
        ...state,
        accountType: undefined,
        loaders: {
          ...state.loaders,
          accountType: false,
        },
      };
    case NocSetupActionType.GET_NOC_PROJECT_DETAILS_REQUESTED:
      return {
        ...state,
        projectDetails: undefined,
        loaders: {
          ...state.loaders,
          projectDetails: true,
        },
      };
    case NocSetupActionType.GET_NOC_PROJECT_DETAILS_SUCCESS:
      return {
        ...state,
        projectDetails: action.result?.data ?? {},
        loaders: {
          ...state.loaders,
          projectDetails: false,
        },
      };
    case NocSetupActionType.GET_NOC_PROJECT_DETAILS_FAILED:
      return {
        ...state,
        projectDetails: undefined,
        loaders: {
          ...state.loaders,
          projectDetails: false,
        },
      };

      
    case NocSetupActionType.GET_NOC_PROJECT_ENTITIES_REQUESTED:
      return {
        ...state,
        projectEntities: undefined,
        loaders: {
          ...state.loaders,
          projectEntities: true,
        },
      };
    case NocSetupActionType.GET_NOC_PROJECT_ENTITIES_SUCCESS:
      return {
        ...state,
        projectEntities: action.result?.data ?? [],
        loaders: {
          ...state.loaders,
          projectEntities: false,
        },
      };
    case NocSetupActionType.GET_NOC_PROJECT_ENTITIES_FAILED:
      return {
        ...state,
        projectEntities: undefined,
        loaders: {
          ...state.loaders,
          projectEntities: false,
        },
      };
      


    case NocSetupActionType.GET_NOC_PROJECT_ENTITY_USERS_REQUESTED:
      return {
        ...state,
        projectEntityUsers: undefined,
        loaders: {
          ...state.loaders,
          projectEntityUsers: true,
        },
      };
    case NocSetupActionType.GET_NOC_PROJECT_ENTITY_USERS_SUCCESS:
      return {
        ...state,
        projectEntityUsers: action.result?.data ?? [],
        loaders: {
          ...state.loaders,
          projectEntityUsers: false,
        },
      };
    case NocSetupActionType.GET_NOC_PROJECT_ENTITY_USERS_FAILED:
      return {
        ...state,
        projectEntityUsers: undefined,
        loaders: {
          ...state.loaders,
          projectEntityUsers: false,
        },
      };

      
    case NocSetupActionType.GET_NOC_WORKFLOW_DETAILS_REQUESTED:
      return {
        ...state,
        WorkflowDetails: undefined,
        loaders: {
          ...state.loaders,
          WorkflowDetails: true,
        },
      };
    case NocSetupActionType.GET_NOC_WORKFLOW_DETAILS_SUCCESS:
      return {
        ...state,
        WorkflowDetails: action.result?.data ?? {},
        loaders: {
          ...state.loaders,
          WorkflowDetails: false,
        },
      };
    case NocSetupActionType.GET_NOC_WORKFLOW_DETAILS_FAILED:
      return {
        ...state,
        WorkflowDetails: undefined,
        loaders: {
          ...state.loaders,
          WorkflowDetails: false,
        },
      };
      
    case NocSetupActionType.GET_NOC_LENDER_BY_CLIENT_REQUESTED:
      return {
        ...state,
        lenderByClient: undefined,
        loaders: {
          ...state.loaders,
          lenderByClient: true,
        },
      };
    case NocSetupActionType.GET_NOC_LENDER_BY_CLIENT_SUCCESS:
      return {
        ...state,
        lenderByClient: action.result.data,
        loaders: {
          ...state.loaders,
          lenderByClient: false,
        },
      };
    case NocSetupActionType.GET_NOC_LENDER_BY_CLIENT_FAILED:
      return {
        ...state,
        lenderByClient: undefined,
        loaders: {
          ...state.loaders,
          lenderByClient: false,
        },
      };

      
    case NocSetupActionType.GET_NOC_DEBENTURE_BY_CLIENT_REQUESTED:
      return {
        ...state,
        debentureByClient: undefined,
        loaders: {
          ...state.loaders,
          debentureByClient: true,
        },
      };
    case NocSetupActionType.GET_NOC_DEBENTURE_BY_CLIENT_SUCCESS:
      return {
        ...state,
        debentureByClient: action.result.data,
        loaders: {
          ...state.loaders,
          debentureByClient: false,
        },
      };
    case NocSetupActionType.GET_NOC_DEBENTURE_BY_CLIENT_FAILED:
      return {
        ...state,
        debentureByClient: undefined,
        loaders: {
          ...state.loaders,
          debentureByClient: false,
        },
      };

           
    case NocSetupActionType.GET_NOC_DEVELOPER_BY_CLIENT_REQUESTED:
      return {
        ...state,
        developerByClient: undefined,
        loaders: {
          ...state.loaders,
          developerByClient: true,
        },
      };
    case NocSetupActionType.GET_NOC_DEVELOPER_BY_CLIENT_SUCCESS:
      return {
        ...state,
        developerByClient: action.result.data,
        loaders: {
          ...state.loaders,
          developerByClient: false,
        },
      };
    case NocSetupActionType.GET_NOC_DEVELOPER_BY_CLIENT_FAILED:
      return {
        ...state,
        developerByClient: undefined,
        loaders: {
          ...state.loaders,
          developerByClient: false,
        },
      };

             
    case NocSetupActionType.GET_NOC_PMC_BY_CLIENT_REQUESTED:
      return {
        ...state,
        PMCByClient: undefined,
        loaders: {
          ...state.loaders,
          PMCByClient: true,
        },
      };
    case NocSetupActionType.GET_NOC_PMC_BY_CLIENT_SUCCESS:
      return {
        ...state,
        PMCByClient: action.result.data,
        loaders: {
          ...state.loaders,
          PMCByClient: false,
        },
      };
    case NocSetupActionType.GET_NOC_PMC_BY_CLIENT_FAILED:
      return {
        ...state,
        PMCByClient: undefined,
        loaders: {
          ...state.loaders,
          PMCByClient: false,
        },
      };

    case NocSetupActionType.GET_ENTITY_USER_REQUESTED:
      return {
        ...state,
        entityUser: undefined,
        loaders: {
          ...state.loaders,
          entityUser: true,
        },
      };
    case NocSetupActionType.GET_ENTITY_USER_SUCCESS:
      return {
        ...state,
        entityUser: action.result.data,
        loaders: {
          ...state.loaders,
          entityUser: false,
        },
      };
    case NocSetupActionType.GET_ENTITY_USER_FAILED:
      return {
        ...state,
        entityUser: undefined,
        loaders: {
          ...state.loaders,
          entityUser: false,
        },
      };

      case NocSetupActionType.NOC_SETUP_UPDATE_REQUESTED:
      return {
        ...state,
        setupNocProject: undefined,
        loaders: {
          ...state.loaders,
          setupNocProject: true,
        },
      };
    case NocSetupActionType.NOC_SETUP_UPDATE_SUCCESS:
      return {
        ...state,
        setupNocProject: action.result,
        loaders: {
          ...state.loaders,
          setupNocProject: false,
        },
      };
    case NocSetupActionType.NOC_SETUP_UPDATE_FAILED:
      return {
        ...state,
        setupNocProject: action.result ?? undefined,
        loaders: {
          ...state.loaders,
          setupNocProject: false,
        },
      };
    default:
      return state;
  }
};

export default NOCSetupReducer;
