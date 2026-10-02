import { ResponseCodeType } from "../../Datatype";

export type InvestmentPastHistoryData = {
  Role: string;
  Status: string;
  FilePath: string;
  Entity: string;
  UpdatedBy: string;
  UploadDate: string;
  ActionType: string;
  MISDate: string;
  FileName: string;
  InvestmentHistoryId: number;
  InvestmentId: number;
  FileContainer: string;
};

export type InvestmentPastHistoryResponse = {
  info: ResponseCodeType;
  data: InvestmentPastHistoryData[];
};

export type UploadInvestmentTemplateResponse = {
  info: ResponseCodeType;
};

export type UploadInvestmentTemplatePayload = {
  investmentId: number;
  clientName: string;
  entityName: string;
  misDate: string;
  remark: string;
  file: File;
};

export type InvestmentPendingData = {
  Role: string;
  Status: string;
  FilePath: string;
  Entity: string;
  UpdatedBy: string;
  UploadDate: string;
  ActionType: string;
  MISDate: string;
  FileName: string;
  InvestmentHistoryId: number;
  InvestmentId: number;
  FileContainer: string;
};

export type InvestmentPendingResponse = {
  info: ResponseCodeType;
  data: InvestmentPendingData[];
};

export type IsInvestmentSetupData = {
  isSetup: number;
};

export type IsInvestmentSetupResponse = {
  info: ResponseCodeType;
  data: IsInvestmentSetupData[];
};

export type DeleteInvestmentDetailsPayload = {
  clientId: number;
  investmentHistoryId: number;
};

export type DeleteInvestmentDetailsResponse = {
  info: ResponseCodeType;
};

export type UpdateInvestmentStatusPayload = {
  status: string;
  investmentHistoryId: number;
  createdBy: string;
};

export type UpdateInvestmentStatusResponse = {
  info: ResponseCodeType;
};

export type CanSetupProjectInvestmentData = {
  canupdate: number;
};

export type CanSetupProjectSummaryResponse = {
  info: ResponseCodeType;
  data: CanSetupProjectInvestmentData[];
};

export type CheckInvestmentDetailsExistData = {
  canupdate: number;
};

export type CheckInvestmentDetailsExistResponse = {
  info: ResponseCodeType;
  data: CheckInvestmentDetailsExistData[];
};

export type InvestmentListData = {
  InvestmentType: string;
  Status: string;
  ClientName: string;
  Createdby: string;
  InvestmentName: string;
  AmountCommitted: null;
  FundId: number;
  CreatedAt: string;
  FirstInvestmentDate: string | null;
  ClientId: number;
  InvestmentId: number;
};

export type InvestmentListResponse = {
  info: ResponseCodeType;
  data: InvestmentListData[];
};
export type InvestmentFundsData = {
  FundName: string;
  FundId: number;
};

export type InvestmentFundsResponse = {
  info: ResponseCodeType;
  data: InvestmentFundsData[];
};

export type InvestmentDeveloperData = {
  DeveloperName: string;
  DeveloperId: number;
};

export type InvestmentDeveloperResponse = {
  info: ResponseCodeType;
  data: InvestmentDeveloperData[];
};

export type CanSetupInvestmentData = {
  canupdate: number;
};

export type CanSetupInvestmentResponse = {
  info: ResponseCodeType;
  data: CanSetupInvestmentData[];
};

export type UploadInvestmentSetupTemplateResponse = {
  info: ResponseCodeType;
};

export type UploadInvestmentSetupTemplatePayload = {
  investmentId: number;
  clientName: string;
  entityName: string;
  misDate: string;
  remark: string;
  file: File;
};
