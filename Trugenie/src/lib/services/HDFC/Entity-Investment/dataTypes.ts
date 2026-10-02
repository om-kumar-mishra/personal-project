import { ResponseCodeType } from "../../Datatype";

export type InvestmentListData = {
    ClientName: string;
    projectlist: string;
    Createdby: string;
    InvestmentName: string;
    FundName: string;
    CreatedAt: string;
    ClientId: number;
    InvestmentId: number;
};

export type InvestmentListResponse = {
    info: ResponseCodeType;
    data: InvestmentListData[];
};

export type AddInvestmentListPayload = {
    clientId: number;
    clientName: string;
    fundId: number;
    investmentType: string;
    investmentName: string;
    createdBy: string;
    projectIds: string;
};

export type AddInvestmentListResponse = {
    info: ResponseCodeType;
};

export type DeleteInvestmentListPayload = {
    investmentId: number;
    clientId: number;
    createdBy: string;
};

export type DeleteInvestmentListResponse = {
    info: ResponseCodeType;
};
