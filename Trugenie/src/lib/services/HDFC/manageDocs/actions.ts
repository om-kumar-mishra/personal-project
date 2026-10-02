import { ResponseCodeType } from "../../Datatype";
import { DeleteProjectDocumentsPayload, InsertProjectDocumentsPayload, ProjectDocument, ProjectDocumentHistory } from "./dataType";
import * as types from "./types";

//---------------------------------- Insert Project Document----------------------------------

export type InsertProjectDocumentRequested = {
  type: typeof types.INSERT_PROJECT_DOCUMENTS_REQUESTED;
  payload: InsertProjectDocumentsPayload;
};

export const insertProjectDocumentRequested = (payload: InsertProjectDocumentsPayload): InsertProjectDocumentRequested => ({
  type: types.INSERT_PROJECT_DOCUMENTS_REQUESTED,
  payload,
});

export type InsertProjectDocumentSucceeded = {
  type: typeof types.INSERT_PROJECT_DOCUMENTS_SUCCEEDED;
  data: ResponseCodeType;
};

export const insertProjectDocumentSucceeded = (data: ResponseCodeType): InsertProjectDocumentSucceeded => ({
  type: types.INSERT_PROJECT_DOCUMENTS_SUCCEEDED,
  data,
});

export type InsertProjectDocumentFailed = {
  type: typeof types.INSERT_PROJECT_DOCUMENTS_FAILED;
  error?: string;
};

export const insertProjectDocumentFailed = (error?: string): InsertProjectDocumentFailed => ({
  type: types.INSERT_PROJECT_DOCUMENTS_FAILED,
  error,
});

//---------------------------------- Get Project Document History ----------------------------------

export type GetProjectDocumentHistoryRequested = {
  type: typeof types.GET_PROJECT_DOCUMENTS_HISTORY_REQUESTED;
  REAssetId: number;
};

export const getProjectDocumentHistoryRequested = (REAssetId: number): GetProjectDocumentHistoryRequested => ({
  type: types.GET_PROJECT_DOCUMENTS_HISTORY_REQUESTED,
  REAssetId,
});

export type GetProjectDocumentHistorySucceeded = {
  type: typeof types.GET_PROJECT_DOCUMENTS_HISTORY_SUCCEEDED;
  data: ProjectDocumentHistory[];
};

export const getProjectDocumentHistorySucceeded = (data: ProjectDocumentHistory[]): GetProjectDocumentHistorySucceeded => ({
  type: types.GET_PROJECT_DOCUMENTS_HISTORY_SUCCEEDED,
  data,
});

export type GetProjectDocumentHistoryFailed = {
  type: typeof types.GET_PROJECT_DOCUMENTS_HISTORY_FAILED;
  error: string;
};

export const getProjectDocumentHistoryFailed = (error: string): GetProjectDocumentHistoryFailed => ({
  type: types.GET_PROJECT_DOCUMENTS_HISTORY_FAILED,
  error,
});

//---------------------------------- Get Project Document ----------------------------------

export type GetProjectDocumentRequested = {
  type: typeof types.GET_PROJECT_DOCUMENTS_REQUESTED;
  REAssetId: number;
};

export const getProjectDocumentRequested = (REAssetId: number): GetProjectDocumentRequested => ({
  type: types.GET_PROJECT_DOCUMENTS_REQUESTED,
  REAssetId,
});

export type GetProjectDocumentSucceeded = {
  type: typeof types.GET_PROJECT_DOCUMENTS_SUCCEEDED;
  data: ProjectDocument[];
};

export const getProjectDocumentSucceeded = (data: ProjectDocument[]): GetProjectDocumentSucceeded => ({
  type: types.GET_PROJECT_DOCUMENTS_SUCCEEDED,
  data,
});

export type GetProjectDocumentFailed = {
  type: typeof types.GET_PROJECT_DOCUMENTS_FAILED;
  error: string;
};

export const getProjectDocumentFailed = (error: string): GetProjectDocumentFailed => ({
  type: types.GET_PROJECT_DOCUMENTS_FAILED,
  error,
});

//---------------------------------- delete Project Document ----------------------------------

export type DeleteProjectDocumentRequested = {
  type: typeof types.DELETE_PROJECT_DOCUMENTS_REQUESTED;
  payload: DeleteProjectDocumentsPayload;
};

export const deleteProjectDocumentRequested = (payload: DeleteProjectDocumentsPayload): DeleteProjectDocumentRequested => ({
  type: types.DELETE_PROJECT_DOCUMENTS_REQUESTED,
  payload,
});

export type DeleteProjectDocumentSucceeded = {
  type: typeof types.DELETE_PROJECT_DOCUMENTS_SUCCEEDED;
  data: ResponseCodeType;
};

export const deleteProjectDocumentSucceeded = (data: ResponseCodeType): DeleteProjectDocumentSucceeded => ({
  type: types.DELETE_PROJECT_DOCUMENTS_SUCCEEDED,
  data,
});

export type DeleteProjectDocumentFailed = {
  type: typeof types.DELETE_PROJECT_DOCUMENTS_FAILED;
  error?: string;
};

export const deleteProjectDocumentFailed = (error?: string): DeleteProjectDocumentFailed => ({
  type: types.DELETE_PROJECT_DOCUMENTS_FAILED,
  error,
});

export type ManageDocsActions =
  // insert project documents
  | InsertProjectDocumentRequested
  | InsertProjectDocumentSucceeded
  | InsertProjectDocumentFailed
  // get project document hostory
  | GetProjectDocumentHistoryRequested
  | GetProjectDocumentHistorySucceeded
  | GetProjectDocumentHistoryFailed
  // get project document
  | GetProjectDocumentRequested
  | GetProjectDocumentSucceeded
  | GetProjectDocumentFailed
  // delete project document
  | DeleteProjectDocumentRequested
  | DeleteProjectDocumentSucceeded
  | DeleteProjectDocumentFailed;
