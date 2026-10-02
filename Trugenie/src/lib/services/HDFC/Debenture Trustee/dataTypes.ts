import { ResponseCodeType } from "../../Datatype";

export type DebentureListData = {
    DebentureId: number;
    ClientName: string;
    CreatedBy: string;
    DebentureName: string;
    CreatedAt: string;
    CIN: string;
};

export type DebentureListResponse = {
    info: ResponseCodeType;
    data: DebentureListData[];
};


export type AddDebentureListPayload = {
    debenturename: string;
    cin: string;
    clientId: number;
    clientName: string;
};

export type AddDebentureListResponse = {
    info: ResponseCodeType;
};
