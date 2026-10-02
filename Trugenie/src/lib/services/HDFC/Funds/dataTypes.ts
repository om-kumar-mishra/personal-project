import { ResponseCodeType } from "../../Datatype";

export type FundsListData = {
    ClientName: string;
    Createdby: string;
    FundName: string;
    FundId: number;
    CreatedAt: string;
    ClientId: number;
};

export type FundsListResponse = {
    info: ResponseCodeType;
    data: FundsListData[];
};

export type AddFundsListPayload = {
    clientName: string;
    fundName: string;
    clientid: number;
    createdBy: string;
};

export type AddFundsListResponse = {
    info: ResponseCodeType;
};

export type DeleteFundsListPayload = {
    fundId: number;
    clientId: number;
    createdBy: string;
};

export type DeleteFundsListResponse = {
    info: ResponseCodeType;
};
