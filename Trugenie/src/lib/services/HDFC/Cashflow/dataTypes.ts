import { ResponseCodeType } from "../../Datatype";

export type CashflowPastHistoryData = {
  Status: string;
  FilePath: string;
  Entity: string;
  UploadDate: string;
  ActionType: string;
  MISDate: string;
  FileName: string;
  REAssetId: number;
  ProjectionType: string;
  Role: string;
  UpdatedBy: string;
  FileContainer: string;
  MisHistoryId: number;
};

export type CashflowPastHistoryResponse = {
  info: ResponseCodeType;
  data: CashflowPastHistoryData[];
};

export type CashflowPendingData = {
  Status: string;
  FilePath: string;
  Entity: string;
  UploadDate: string;
  ActionType: string;
  MISDate: string;
  FileName: string;
  REAssetId: number;
  ProjectionType: string;
  Role: string;
  UpdatedBy: string;
  FileContainer: string;
  MisHistoryId: number;
};

export type CashflowPendingResponse = {
  info: ResponseCodeType;
  data: CashflowPendingData[];
};

export type IsCashflowSetupData = {
  iscashflowsetup: number;
};

export type IsCashflowSetupResponse = {
  info: ResponseCodeType;
  data: IsCashflowSetupData[];
};

export type DeleteCashflowDetailsPayload = {
  cashflowHistoryId: number;
  type: string;
  createdBy: string;
};

export type DeleteCashflowDetails = {
  result: number;
};

export type DeleteCashflowDetailsResponse = {
  info: ResponseCodeType;
  data: DeleteCashflowDetails[];
};

export type UpdateCashflowStatusPayload = {
  cashflowHistoryId: number;
  status: string;
  type: string;
};

export type UpdateCashflowStatusResponse = {
  info: ResponseCodeType;
};

export type UploadCashflowTemplatePayload = {
  reAssetId: number;
  clientName: string;
  projectName: string;
  entityName: string;
  misDate: string;
  remark: string;
  file: File;
};

export type UploadCashflowTemplateResponse = {
  info: ResponseCodeType;
};

export type CanSetupCashflowData = {
  canupdate: number;
};

export type CanSetupCashflowResponse = {
  info: ResponseCodeType;
  data: CanSetupCashflowData[];
};

export type UploadCashflowSetupTemplatePayload = {
  reAssetId: number;
  clientName: string;
  projectName: string;
  entityName: string;
  misDate: string;
  remark: string;
  file: File;
};

export type UploadCashflowSetupTemplateResponse = {
  info: ResponseCodeType;
};

export type CheckCashflowDetailsExistData = {
  canupdate: number;
};

export type CheckCashflowDetailsExistResponse = {
  info: ResponseCodeType;
  data: CheckCashflowDetailsExistData[];
};

export type CashflowSetupPendingData = {
  Status: string;
  FilePath: string;
  Entity: string;
  UploadDate: string;
  ActionType: string;
  MISDate: string;
  FileName: string;
  REAssetId: number;
  ProjectionType: string;
  Role: string;
  UpdatedBy: string;
  FileContainer: string;
  MisHistoryId: number;
};

export type CashflowSetupPendingListResponse = {
  info: ResponseCodeType;
  data: CashflowSetupPendingData[];
};

export type CashflowSetupPastUpdatesData = {
  Status: string;
  FilePath: string;
  Entity: string;
  UploadDate: string;
  ActionType: string;
  MISDate: string;
  FileName: string;
  REAssetId: number;
  ProjectionType: string;
  Role: string;
  UpdatedBy: string;
  FileContainer: string;
  MisHistoryId: number;
};

export type CashflowSetupPastUpdatesResponse = {
  info: ResponseCodeType;
  data: CashflowSetupPastUpdatesData[];
};
