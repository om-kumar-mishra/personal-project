import {
  EXPORT_ADMIN_REPORT_ERROR,
  EXPORT_ADMIN_REPORT_REQUEST,
  EXPORT_ADMIN_REPORT_SUCCESS,
  EXPORT_ALL_NOC_REPORT_FAILURE,
  EXPORT_ALL_NOC_REPORT_REQUEST,
  EXPORT_ALL_NOC_REPORT_SUCCESS,
  EXPORT_LOGIN_REPORT_ERROR,
  EXPORT_LOGIN_REPORT_REQUEST,
  EXPORT_LOGIN_REPORT_SUCCESS,
  EXPORT_NOC_ISSUED_REPORT_FAILURE,
  EXPORT_NOC_ISSUED_REPORT_REQUEST,
  EXPORT_NOC_ISSUED_REPORT_SUCCESS,
  EXPORT_POPULATION_REPORT_ERROR,
  EXPORT_POPULATION_REPORT_REQUEST,
  EXPORT_POPULATION_REPORT_SUCCESS,
  EXPORT_ROLERIGHT_REPORT_ERROR,
  EXPORT_ROLERIGHT_REPORT_REQUEST,
  EXPORT_ROLERIGHT_REPORT_SUCCESS,
  GET_ADMIN_REPORT_FAILURE,
  GET_ADMIN_REPORT_REQUEST,
  GET_ADMIN_REPORT_SUCCESS,
  GET_ALL_NOC_REPORT_FAILURE,
  GET_ALL_NOC_REPORT_REQUEST,
  GET_ALL_NOC_REPORT_SUCCESS,
  GET_APPLICATION_MASTER_FAILED,
  GET_APPLICATION_MASTER_REQUESTED,
  GET_APPLICATION_MASTER_SUCCESS,
  GET_LOGIN_REPORT_FAILURE,
  GET_LOGIN_REPORT_REQUEST,
  GET_LOGIN_REPORT_SUCCESS,
  GET_NOC_ISSUED_REPORT_FAILURE,
  GET_NOC_ISSUED_REPORT_REQUEST,
  GET_NOC_ISSUED_REPORT_SUCCESS,
  GET_POPULATION_REPORT_FAILURE,
  GET_POPULATION_REPORT_REQUEST,
  GET_POPULATION_REPORT_SUCCESS,
  GET_ROLERIGHT_REPORT_FAILURE,
  GET_ROLERIGHT_REPORT_REQUEST,
  GET_ROLERIGHT_REPORT_SUCCESS,
  UPDATE_APPLICATION_MASTER_FAILED,
  UPDATE_APPLICATION_MASTER_REQUESTED,
  UPDATE_APPLICATION_MASTER_SUCCESS,
} from "./types";

// initial state
const initialState = {
  data: null,
  loading: false,
  error: null,
  applicationMaster: null,
  issuedNOCReport: null,
  allNOCReport: null,
  loaders: {
    updateMaster: false,
    getApplicationMaster: false,
    issuedNOCReport: false,
    allNOCReport: false,
    populationReportExport: false,
    adminReportExport: false,
    roleRightExport: false,
    loginLogoutExport: false,
    nocIssueExport: false,
    allNocReportExport: false,
  },
};

const reportReducer = (state = initialState, action: any) => {
  switch (action.type) {
    //#region [get population-rights]
    case GET_POPULATION_REPORT_REQUEST:
      return {
        ...state,
        data: null,
        loading: true,
        error: null,
      };
    case GET_POPULATION_REPORT_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case GET_POPULATION_REPORT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    //#endregion

    //#region [get admin-rights]
    case GET_ADMIN_REPORT_REQUEST:
      return {
        ...state,
        data: null,
        loading: true,
        error: null,
      };
    case GET_ADMIN_REPORT_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case GET_ADMIN_REPORT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    //#endregion

    //#region [get login report]
    case GET_LOGIN_REPORT_REQUEST:
      return {
        ...state,
        data: null,
        loading: true,
        error: null,
      };
    case GET_LOGIN_REPORT_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case GET_LOGIN_REPORT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    //#endregion

    //#region [get role-rights]
    case GET_ROLERIGHT_REPORT_REQUEST:
      return {
        ...state,
        data: null,
        loading: true,
        error: null,
      };
    case GET_ROLERIGHT_REPORT_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case GET_ROLERIGHT_REPORT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    //#endregion

    //#region [get master application]
    case GET_APPLICATION_MASTER_REQUESTED:
      return {
        ...state,
        data: null,
        loaders: {
          ...state.loaders,
          getApplicationMaster: true,
        },
        error: null,
      };
    case GET_APPLICATION_MASTER_SUCCESS:
      return {
        ...state,
        applicationMaster: action.result,
        loaders: {
          ...state.loaders,
          getApplicationMaster: false,
        },
        error: null,
      };
    case GET_APPLICATION_MASTER_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          getApplicationMaster: false,
        },
        error: action.error,
      };
    //#endregion

    //#region [master application update]
    case UPDATE_APPLICATION_MASTER_REQUESTED:
      return {
        ...state,
        data: null,
        loading: true,
        error: null,
        loaders: {
          ...state.loaders,
          updateMaster: true,
        }
      };
    case UPDATE_APPLICATION_MASTER_SUCCESS:
      return {
        ...state,
        data: action.result,
        loading: false,
        error: null,
        loaders: {
          ...state.loaders,
          updateMaster: false,
        }
      };
    case UPDATE_APPLICATION_MASTER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
        loaders: {
          ...state.loaders,
          updateMaster: false,
        }
      };
    //#endregion

    //#region [get issued-noc]
    case GET_NOC_ISSUED_REPORT_REQUEST:
      return {
        ...state,
        issuedNOCReport: null,
        loaders: {
          ...state.loaders,
          issuedNOCReport: true,
        },
        error: null,
      };
    case GET_NOC_ISSUED_REPORT_SUCCESS:
      return {
        ...state,
        issuedNOCReport: action.result.data,
        loaders: {
          ...state.loaders,
          issuedNOCReport: false,
        },
      };
    case GET_NOC_ISSUED_REPORT_FAILURE:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          issuedNOCReport: false,
        },
      };
    //#endregion

    //#region [get all-noc]
    case GET_ALL_NOC_REPORT_REQUEST:
      return {
        ...state,
        allNOCReport: null,
        loaders: {
          ...state.loaders,
          allNOCReport: true,
        },
        error: null,
      };
    case GET_ALL_NOC_REPORT_SUCCESS:
      return {
        ...state,
        allNOCReport: action.result.data,
        loaders: {
          ...state.loaders,
          allNOCReport: false,
        },
      };
    case GET_ALL_NOC_REPORT_FAILURE:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          allNOCReport: false,
        },
      };
    //#endregion
    // population report loader
    case EXPORT_POPULATION_REPORT_REQUEST:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          populationReportExport: true,
        },
      };
    case EXPORT_POPULATION_REPORT_SUCCESS:
      return {
        ...state,

        loaders: {
          ...state.loaders,
          populationReportExport: false,
        },
      };
    case EXPORT_POPULATION_REPORT_ERROR:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          populationReportExport: false,
        },
      };
    // admin report loader
    case EXPORT_ADMIN_REPORT_REQUEST:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          adminReportExport: true,
        },
      };
    case EXPORT_ADMIN_REPORT_SUCCESS:
      return {
        ...state,

        loaders: {
          ...state.loaders,
          adminReportExport: false,
        },
      };
    case EXPORT_ADMIN_REPORT_ERROR:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          adminReportExport: false,
        },
      };
    // roles report loader
    case EXPORT_ROLERIGHT_REPORT_REQUEST:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          roleRightExport: true,
        },
      };
    case EXPORT_ROLERIGHT_REPORT_SUCCESS:
      return {
        ...state,

        loaders: {
          ...state.loaders,
          roleRightExport: false,
        },
      };
    case EXPORT_ROLERIGHT_REPORT_ERROR:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          roleRightExport: false,
        },
      };
    //#endregion

    case EXPORT_LOGIN_REPORT_REQUEST:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          loginLogoutExport: true,
        },
      };
    case EXPORT_LOGIN_REPORT_SUCCESS:
      return {
        ...state,

        loaders: {
          ...state.loaders,
          loginLogoutExport: false,
        },
      };
    case EXPORT_LOGIN_REPORT_ERROR:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          loginLogoutExport: false,
        },
      };
    case EXPORT_NOC_ISSUED_REPORT_REQUEST:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          nocIssueExport: true,
        },
      };
    case EXPORT_NOC_ISSUED_REPORT_SUCCESS:
      return {
        ...state,

        loaders: {
          ...state.loaders,
          nocIssueExport: false,
        },
      };
    case EXPORT_NOC_ISSUED_REPORT_FAILURE:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          nocIssueExport: false,
        },
      };
    case EXPORT_ALL_NOC_REPORT_REQUEST:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          allNocReportExport: true,
        },
      };
    case EXPORT_ALL_NOC_REPORT_SUCCESS:
      return {
        ...state,

        loaders: {
          ...state.loaders,
          allNocReportExport: false,
        },
      };
    case EXPORT_ALL_NOC_REPORT_FAILURE:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          allNocReportExport: false,
        },
      };
    default:
      return state;
  }
};

export default reportReducer;
