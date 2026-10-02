export type APIResponseStatus = {
  message: string;
  code: number;
};

export type GetExternalUserDataType = {
  Status: string;
  UniqueCode: string;
  Email: string;
  CreatedBy: string;
  IsActive: number;
  CreatedAt: string;
  Activity: string;
  InvesteeName: string;
  Name: string;
  RoleName: string;
  EUserId: number;
  InvesteeId: number;
  DeveloperID: number;
  DeveloperName: string;
  CheckerEmpName: string;
  CheckerApprovedDate: string
};

export type AddExternalUserPayloadType = {
  name: string;
  email: string;
  createdBy: string;
  createbyusername: string;
  developerID: number;
  developerName: string;
  investeeId: number;
  investeeName: string;
  remark: string;
  clientId :number
};

export type ExternalUserList = APIResponseStatus & {
  info: APIResponseStatus;
  data: GetExternalUserDataType[];
};

export type ApproveRejectExternalUserpPayload = {
  EUserId: number;
  status: string;
  createdby: string;
  createbyusername: string;
  remark: string;
  Activity: string;
};

export type PendingExternalUserpayload = {
  Activity: string;
  status: string;
  uniqecode: string;
};

export type PendingExternalUserResponse = {
  info: APIResponseStatus;
  data: PendingExternalResp;
};

export type PendingExternalResp = {
  olderName: string;
  olderEmail: string;
  olderDeveloperName: string;
  newStatus: string;
  newDeveloperName: string;
  initiatedremark: string;
  rejectedby: string;
  approverremark: string;
  newName: string;
  olderStatus: string;
  initiatedon: string;
  olderInvesteeName: string;
  newEmail: string;
  rejectedon: string;
  newInvesteeName: string;
  initiatedby: string;
};

export type EditExternalUserPayloadType = {
  EuserID: number;
  Name: string;
  Email: string;
  createdBy: string;
  createbyusername: string;
  DeveloperID: number;
  DeveloperName: string;
  InvesteeId: number | undefined;
  InvesteeName: string;
  remark: string;
  UniqueCode: string;
};

export type EnableDisableExternalUserPayload = {
  EUserId: number;
  enable: number;
  createdby: string;
  createbyusername: string;
  Remark: string;
};
