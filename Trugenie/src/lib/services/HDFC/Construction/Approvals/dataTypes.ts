import { ResponseCodeType } from "../../../Datatype";

export type ApprovalPastHistoryData = {
  documentHistoryId: number;
  reassetId: number;
  misdate: string,
  entityName: string,
  role: string,
  status: string,
  actionType: string,
  createdby: string,
  createdAt: string,
};

export type ApprovalPastHistoryResponse = {
  info: ResponseCodeType;
  data: ApprovalPastHistoryData[];
};

export type UpdateApprovalStatus = {
  result: number;
}

export type UpdateApprovalStatusPayload = {
  documentHistoryId: number,
  status: string,
  createdBy: string,
};

export type UpdateApprovalStatusResponse = {
  info: ResponseCodeType;
  data: UpdateApprovalStatus[];
};

export type PendingConstructionApprovalDocumentsData = {
  Role: string
  Status: string
  ActionType: string
  Createdby: string
  EntityName: string
  MISDate: string
  CreatedAt: string
  DocumentHistoryId: number;
  REAssetId: number;
};

export type PendingConstructionApprovalDocumentsResponse = {
  info: ResponseCodeType;
  data: PendingConstructionApprovalDocumentsData[];
};

export type UploadConstructionApprovalDocumentsPayload = {
  files: File,
  // files: File,
  reassetId: number;
  CreatedBy: string;
  entityName: string;
  role: string;
  data: object;
  MISDate: string;
};

export type UploadConstructionApprovalDocumentsResponse = {
  info: ResponseCodeType;
};

export type ApprovalDropDownData = {
  Wing: string;
  ExpiryDate: string;
  ProjectName: string;
  ProductSubType: string;
  PlannedApplicationDate: string;
  ApprovalId: number;
  DevelopmentType: string;
  ProductType: string;
  PlannedReceiptDate: string;
  ApprovalsType: string;
  ApprovalAuthority: string;
  ProjectPhase: string;
  Stage: string;
}

export type ApprovalDropDownResponse = {
  info: ResponseCodeType;
  data: ApprovalDropDownData[];
};



















