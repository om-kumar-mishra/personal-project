import { ResponseCodeType } from "../../Datatype";

export type ClientListDataType = {
  AccountManager: string | null;
  AccountManagerId: string | null;
  Cin: string;
  ClientId: number;
  ClientName: string;
  CreatedAt: string;
  CreatedBy: string;
  PanCard: string | null;
  PlanExpiry: string | null;
  ShortName: string;
  TotalAssets: number | null;
  TotalCompanies: number | null;
  TotalContracts: number | null;
  TotalRatings: number | null;
  TotalUser: number | null;
  website: string | null;
};

export type ClientListResponse = {
  info: ResponseCodeType;
  data: ClientListDataType[];
};

export type AddClientPayload = {
  clientName: string;
  clientShortName: string;
  cin: string;
  website?: string;
  createdby: string;
};

export type AddClientResponse = {
  info: ResponseCodeType;
  data?: null;
};
