import { ResponseCodeType } from "../../Datatype";
import { ManageDocsActions } from "./actions";
import { ProjectDocument, ProjectDocumentHistory } from "./dataType";
import * as types from "./types";

type ManageDocsState = {
  insertProjectDocument?: ResponseCodeType;
  deleteProjectDocument?: ResponseCodeType;
  getProjectDocumentHistory?: ProjectDocumentHistory[];
  getProjectDocument?: ProjectDocument[];
  loaders: {
    insertProjectDocument: boolean;
    getProjectDocumentHistory: boolean;
    getProjectDocument: boolean;
    deleteProjectDocument: boolean;
  };
};

const initialState: ManageDocsState = {
  insertProjectDocument: undefined,
  getProjectDocumentHistory: undefined,
  getProjectDocument: undefined,
  deleteProjectDocument: undefined,
  loaders: {
    insertProjectDocument: false,
    getProjectDocumentHistory: false,
    getProjectDocument: false,
    deleteProjectDocument: false,
  },
};

const ManageDocsUpdateReducer = (state: ManageDocsState = initialState, action: ManageDocsActions): ManageDocsState => {
  switch (action.type) {
    case types.INSERT_PROJECT_DOCUMENTS_REQUESTED:
      return {
        ...state,
        insertProjectDocument: undefined,
        loaders: {
          ...state.loaders,
          insertProjectDocument: true,
        },
      };
    case types.INSERT_PROJECT_DOCUMENTS_SUCCEEDED:
      return {
        ...state,
        insertProjectDocument: action.data,
        loaders: {
          ...state.loaders,
          insertProjectDocument: false,
        },
      };
    case types.INSERT_PROJECT_DOCUMENTS_FAILED:
      return {
        ...state,
        insertProjectDocument: undefined,
        loaders: {
          ...state.loaders,
          insertProjectDocument: false,
        },
      };
    case types.GET_PROJECT_DOCUMENTS_HISTORY_REQUESTED:
      return {
        ...state,
        getProjectDocumentHistory: undefined,
        loaders: {
          ...state.loaders,
          getProjectDocumentHistory: true,
        },
      };
    case types.GET_PROJECT_DOCUMENTS_HISTORY_SUCCEEDED:
      return {
        ...state,
        getProjectDocumentHistory: action.data,
        loaders: {
          ...state.loaders,
          getProjectDocumentHistory: false,
        },
      };
    case types.GET_PROJECT_DOCUMENTS_HISTORY_FAILED:
      return {
        ...state,
        getProjectDocumentHistory: undefined,
        loaders: {
          ...state.loaders,
          getProjectDocumentHistory: false,
        },
      };
    case types.GET_PROJECT_DOCUMENTS_REQUESTED:
      return {
        ...state,
        getProjectDocument: undefined,
        loaders: {
          ...state.loaders,
          getProjectDocument: true,
        },
      };
    case types.GET_PROJECT_DOCUMENTS_SUCCEEDED:
      return {
        ...state,
        getProjectDocument: action.data,
        loaders: {
          ...state.loaders,
          getProjectDocument: false,
        },
      };
    case types.GET_PROJECT_DOCUMENTS_FAILED:
      return {
        ...state,
        getProjectDocument: undefined,
        loaders: {
          ...state.loaders,
          getProjectDocument: false,
        },
      };
    case types.DELETE_PROJECT_DOCUMENTS_REQUESTED:
      return {
        ...state,
        deleteProjectDocument: undefined,
        loaders: {
          ...state.loaders,
          deleteProjectDocument: true,
        },
      };
    case types.DELETE_PROJECT_DOCUMENTS_SUCCEEDED:
      return {
        ...state,
        deleteProjectDocument: action.data,
        loaders: {
          ...state.loaders,
          deleteProjectDocument: false,
        },
      };
    case types.DELETE_PROJECT_DOCUMENTS_FAILED:
      return {
        ...state,
        deleteProjectDocument: undefined,
        loaders: {
          ...state.loaders,
          deleteProjectDocument: false,
        },
      };
    default:
      return state;
  }
};

export default ManageDocsUpdateReducer;
