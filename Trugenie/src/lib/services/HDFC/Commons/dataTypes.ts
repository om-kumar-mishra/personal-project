export type APIResponseStatus = {
  message: string;
  code: number;
};

export type GetRmUsersDataType = {
  AccessTag: any;
  SupervisorCode: string;
  DepartmentCode: string;
  EmailId: string;
  MakerEmpName: string;
  CreatedAt: string;
  SupervisorName: string;
  HdfcUserId: string;
  CompanyType: string;
  EmpCode: string;
  UserStatus: string;
  EmpName: string;
  ModifiedAt: string;
  UserSource: string;
  UserId: number;
  MakerEmpCode: string;
  TemplateRoleName: string;
  DepartmentName: string;
  BranchName: string;
  IsacTicketNumber: number;
  CheckerEmpName: string;
  BranchCode: string;
  CheckerEmpCode: string;
};

export type RmUsersList = {
  info: APIResponseStatus;
  data: GetRmUsersDataType[];
};

export type ValidateExcelPayload = {
  module: string;
  file?: File | null;
  type: string;
  clientId: number;
  investmentId: number;
  reassetId: number;
};

export type ValidateExcelResponseData = {
  "No. of Errors": string;
  "No. of warnings": string;
  Errors: string;
  Warnings: string;
};

export type ValidateExcelResponse = {
  info: APIResponseStatus;
  data: ValidateExcelResponseData;
};

export type GetClientData = {
  ClientId: number;
  ClientName: string;
};


export type GetClientDataResponse = {
  info: APIResponseStatus;
  data: GetClientData[];
};
