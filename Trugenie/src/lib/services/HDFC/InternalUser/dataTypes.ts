export type APIResponseStatus = {
    message: string;
    code: number;
};

export type GetInternalUserDataType = {
    SupervisorCode: string;
    DepartmentCode: string;
    EmailId: string;
    MakerEmpName: string;
    CreatedAt: string;
    Title: string;
    Activity: string;
    SupervisorName: string;
    ReqId: -1;
    HdfcUserId: string;
    CompanyType: string;
    EmpCode: string;
    EmpName: string;
    UserSource: string;
    UserId: 5;
    MakerEmpCode: string;
    TemplateRoleName: string;
    DepartmentName: string;
    BranchName: string;
    CheckerEmpName: string;
    BranchCode: string;
    CheckerEmpCode: string;
    MakersRemarks: string;
    CheckerApprovedDate: string;
    MakerRole: string;
    CheckerRole: string;
    CheckerRemarks: string;
    MakersRequestDate: string;
};

export type AddInternalUserPayloadType = {
    Activity: string;
    userId: number;
    HdfcUserId?: string;
    EmpCode: string;
    EmpName: string;
    EmailID: string;
    BranchCode: string;
    BranchName: string;
    SupervisorName: string;
    SupervisorCode: string;
    DepartmentCode: string;
    DepartmentName: string;
    CompanyType: string;
    TemplateRoleName: string;
    UserSource?: string;
    MakerEmpCode?: string;
    makerEmpName?: string;
    Remarks: string;
};

export type InternalUserList = {
    info: APIResponseStatus;
    data: GetInternalUserDataType[];
};

export type ApproveRejectInternalUserpPayload = {
    ReqId: number;
    Activity: string;
    UserId: number;
    UserSource: string;
    CheckerRoleName: string;
    CheckerEmpCode: string;
    CheckerEmpName: string;
    Remarks: string;
};
