import { ResponseCodeType } from "../../../Datatype";

export type PhysicalProgressPastHistoryData = {
  Role: string;
  Status: string;
  FilePath: string;
  ConstructionMISHistoryId: number;
  EntityName: string | null;
  CreatedBy: string;
  UploadDate: string;
  ActionType: string;
  MISDate: string;
  FileName: string;
  REAssetId: number;
  FileContainer: string;
  Type: string,
  CreatedAt:string
};

export type PhysicalProgressPastHistoryResponse = {
  info: ResponseCodeType;
  data: PhysicalProgressPastHistoryData[];
};

export type UpdatePhysicalProgressStatusPayload = {
  physicalMISHistoryId: number;
  status: string;
  crreatedBy: string;
};

export type UpdatePhysicalProgressStatusResponse = {
  info: ResponseCodeType;
};

export type UploadPhysicalProgressSetupTemplatePayload = {
  reassetId: number;
  entityName: string;
  role:string;
  fileContainer: string;
  filePath:string;
  projectType:string;
  developmentType: string;
  phase: string;
  file: File;
};

export type UploadPhysicalProgressSetupTemplateResponse = {
  info: ResponseCodeType;
};

export type PhysicalProgressPendingHistoryData = {
  Role: string;
  Status: string;
  FilePath: string;
  ConstructionMISHistoryId: number;
  EntityName: string | null;
  CreatedBy: string;
  UploadDate: string;
  ActionType: string;
  MISDate: string;
  FileName: string;
  REAssetId: number;
  FileContainer: string;
  Type: string,
  CreatedAt:string
};

export type PhysicalProgressPendingHistoryResponse = {
  info: ResponseCodeType;
  data: PhysicalProgressPendingHistoryData[];
};

