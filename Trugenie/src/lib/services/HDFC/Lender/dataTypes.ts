import { ResponseCodeType } from "../../Datatype";

export type LenderListData = {
    ClientName: string;
    CreatedBy: string;
    LenderName: string;
    CreatedAt: string;
    CIN: string;
    LenderDetailId:number;
};

export type LenderListResponse = {
    info: ResponseCodeType;
    data: LenderListData[];
};


export type AddLenderListPayload = {
    lendername: string;
    cin: number;
    clientid: number;
    createdby: string;
};

export type AddLenderListResponse = {
    info: ResponseCodeType;
};

export type AddUserLenderPayload = {
    entityType: string;
    entityId: number;
    userId: number;
    createdby: string;
};

export type AddUserLenderResponse = {
    info: ResponseCodeType;
};

export type GetClientAllUserData = {
    DepartmentName: string;
    EmailId: string;
    UserId: number;
    TemplateRoleName:string;
    Designation:string;
    EmpName:string;
};

export type getClientUserResponse = {
    info: ResponseCodeType;
    data: GetClientAllUserData[];
};


export type RemoveUserLenderResponse = {
    info: ResponseCodeType;
};


