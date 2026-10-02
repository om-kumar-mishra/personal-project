import { ResponseCodeType } from "../../Datatype";

export type DeleteProjectDocumentsPayload = {
  DocId: number;
  EmpCode: string;
  UserName: string;
  UserEmail: string;
  UserRole: string;
  CreatedBy: string;
};

export type InsertProjectDocumentsPayload = {
  REAssetId: string;
  EntityName: string;
  EmpCode: string;
  UserName: string;
  UserEmail: string;
  UserRole: string;
  Remarks?: string;
  CreatedBy: string;
  file: File | null;
  DocumentName: string;
};

export type InsertProjectDocumentsResponse = {
  info: ResponseCodeType;
};

export type ProjectDocumentHistory = {
  FilePath: string;
  DocId: number;
  Action: string;
  DocArchiveId: number;
  UserName: string;
  CreatedBy: string;
  FileName: string;
  CreatedAt: string;
  REAssetId: number;
  UserEmail: string;
  EmpCode: string;
  Remarks: string;
  FileContainer: string;
  LogId: number;
  DocumentName: string | null;
};

export type GetProjectDocumentHistoryResponse = {
  info: ResponseCodeType;
  data: ProjectDocumentHistory[];
};

export type ProjectDocument = {
  FilePath: string;
  DocId: number;
  UserName: string;
  CreatedBy: string;
  EntityName: string;
  FileName: string;
  CreatedAt: string;
  REAssetId: number;
  UserEmail: string;
  EmpCode: string;
  Remarks: string;
  UserRole: string;
  FileContainer: string;
  DocumentName: string | null;
};

export type GetProjectDocumentResponse = {
  info: ResponseCodeType;
  data: ProjectDocument[];
};

export type DeleteProjectDocumentResponse = {
  info: ResponseCodeType;
};
