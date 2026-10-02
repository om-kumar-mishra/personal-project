import { ResponseCodeType } from "../../../Datatype";

export type ExcelUploadPastHistoryData = {
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

export type ExcelUploadPastHistoryResponse = {
  info: ResponseCodeType;
  data: ExcelUploadPastHistoryData[];
};

export type ConstructionPendingData = {
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

export type ConstructionPendingResponse = {
  info: ResponseCodeType;
  data: ConstructionPendingData[];
}

export type UploadConstructionSetupResponse = {
  info: ResponseCodeType;
};

export type UploadConstructionSetupTemplatePayload = {
  reassetId: number;
  entityName: string;
  role: string;
  fileContainer: string;
  filePath:string;
  file: File;
};

export type UploadConstructionSetupTemplateResponse = {
  info: ResponseCodeType;
};

export type CanSetupConstructionData = {
  canupdate: number;
};

export type CanSetupConstructionResponse = {
  info: ResponseCodeType;
  data: CanSetupConstructionData[];
};

export type UpdateConstructionSetupStatusPayload = {
  status: string;
  constructionMISHistoryId: number;
  createdby: string;
};

export type UpdateConstructionSetupStatusResponse = {
  info: ResponseCodeType;
};

export type UploadConstructionUpdateTemplatePayload = {
  reassetId: number;
  entityName: string;
  // clientName: string;
  role: string;
  status: string;
  fileContainer: string;
  filePath:string;
  misDate:string;
  file: File;
};

export type UploadConstructionUpdateTemplateResponse = {
  info: ResponseCodeType;
};
export type IsConstructionSetupData = {
  isSetup: number;
};

export type IsConstructionSetupResponse = {
  info: ResponseCodeType;
  data: IsConstructionSetupData[];
};

export type CanUpdateConstructionData = {
  canupdate: number;
};

export type CanUpdateConstructionResponse = {
  info: ResponseCodeType;
  data: CanUpdateConstructionData[];
};
export type UpdateConstructionUpdateStatusPayload = {
  status: string;
  constructionMISHistoryId: number;
  createdby: string;
};
export type UpdateConstructionUpdateStatusResponse = {
  info: ResponseCodeType;
};

export type DeleteConstructionUploadPayload = {
  constructionMISHistoryId: number;
  createdBy: string;
};

export type DeleteConstructionUploadResponse = {
  info: ResponseCodeType;
};
