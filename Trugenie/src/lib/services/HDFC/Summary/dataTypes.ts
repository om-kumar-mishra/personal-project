import { ResponseCodeType } from "../../Datatype";

export type SummaryPastHistoryData = {
  Role: string;
  Status: string;
  FilePath: string;
  SetupSummaryHistoryId: number;
  Entity: string | null;
  UpdatedBy: string;
  UploadDate: string;
  ActionType: string;
  MISDate: string;
  FileName: string;
  REAssetId: number;
  FileContainer: string;
};

export type SummaryPastHistoryResponse = {
  info: ResponseCodeType;
  data: SummaryPastHistoryData[];
};

export type SummaryPendingData = {
  Role: string;
  Status: string;
  FilePath: string;
  SetupSummaryHistoryId: number;
  Entity: string | null;
  UpdatedBy: string;
  UploadDate: string;
  ActionType: string;
  MISDate: string;
  FileName: string;
  REAssetId: number;
  FileContainer: string;
};

export type SummaryPendingResponse = {
  info: ResponseCodeType;
  data: SummaryPendingData[];
}

export type IsSummarySetupData = {
  isSetup: number;
};

export type IsSummarySetupResponse = {
  info: ResponseCodeType;
  data: IsSummarySetupData[];
};

export type DeleteProjectSummaryDetailsPayload = {
  ClientId: number;
  ProjectSummaryHistoryId: number;
};

export type DeleteProjectSummaryDetailsResponse = {
  info: ResponseCodeType;
};

export type UpdateProjectSummaryStatusPayload = {
  status: string;
  ProjectSummaryHistoryId: number;
  CreatedBy: string;
};

export type UpdateProjectSummaryStatusResponse = {
  info: ResponseCodeType;
};

export type CanSetupProjectSummaryData = {
  canupdate: number;
};

export type CanSetupProjectSummaryResponse = {
  info: ResponseCodeType;
  data: CanSetupProjectSummaryData[];
};

export type CheckProjectSummaryDetailsExistData = {
  canupdate: number;
};

export type CheckProjectSummaryDetailsExistResponse = {
  info: ResponseCodeType;
  data: CheckProjectSummaryDetailsExistData[];
};

export type UploadProjectSummaryTemplatePayload = {
  reAssetId: number;
  clientName: string;
  projectName: string;
  entityName: string;
  misDate: string;
  remark: string;
  file: File;
};

export type UploadProjectSummaryTemplateResponse = {
  info: ResponseCodeType;
};

export type UploadProjectSummaryTemplateSetupPayload = {
  reAssetId: number;
  clientName: string;
  projectName: string;
  entityName: string;
  misDate: string;
  remark: string;
  file: File;
};

export type UploadProjectSummaryTemplateSetupResponse = {
  info: ResponseCodeType;
};

