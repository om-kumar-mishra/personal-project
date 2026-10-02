import { ResponseCodeType } from "../../Datatype";

export type PMCListData = {
    ClientName: string;
    CreatedBy: string;
    PMCDetailId: number;
    CreatedAt: string;
    CIN: string;
    PMCName: string;
};

export type PMCListResponse = {
    info: ResponseCodeType;
    data: PMCListData[];
};


export type AddPMCListPayload = {
    pmcname: string;
    cin: string;
    clientid: number;
    createdby: string;
};

export type AddPMCListResponse = {
    info: ResponseCodeType;
};
