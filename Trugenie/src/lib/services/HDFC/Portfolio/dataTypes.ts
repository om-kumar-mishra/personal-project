import { ResponseCodeType } from "../../Datatype";

interface APIResponseInfo {
  info: {
    message: string;
    code: number;
  };
}

export type FundsPastUpdate ={
  Role:string ;
  Status: string;
  FilePath: string;
  Entity: string;
  UpdatedBy:string;
  UploadDate: string;
  ActionType: string;
  MISDate: string;
  FileName: string;
  ClientId: number;
  FundMISHistoryId: number;
  FileContainer: string
}

export type FundsPendingList={
  Role:string ;
  Status: string;
  FilePath: string;
  Entity: string;
  UpdatedBy:string;
  UploadDate: string;
  ActionType: string;
  MISDate: string;
  FileName: string;
  ClientId: number;
  FundMISHistoryId: number;
  FileContainer: string
}
export type InsertFundsUpdateRequested={
  clientId: number,
  mISDate: string,
  entity: string,
  entityRole: string,
  remarks: string,
  uploaded_file: File
}

export type GetFundsPastUpdateResponse = {
  data: FundsPastUpdate[];
  info:ResponseCodeType;
};

export type GetFundsPendingResponse = APIResponseInfo & {
  data: FundsPendingList[];
};

export type RemoveFundsHistoryResponse = APIResponseInfo & {
  data: [{ result: number }];
  info:ResponseCodeType;
};

export type checkFundsDetailExist = {
  canupdate: number;
};

export type CheckFundsDetailsExistResponse = {
  info: ResponseCodeType;
  data: checkFundsDetailExist[];
};

export type UpdateFundsStatusPayload = {
  clientId:number;
  fundMISHistoryId: number;
  status: string;
};

export type UpdateFundsStatusResponse = {
  info: ResponseCodeType;
};

