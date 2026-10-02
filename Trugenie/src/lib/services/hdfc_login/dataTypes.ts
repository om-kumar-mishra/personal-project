export enum UserRoles {
  VENDOR = "VENDOR",
  RM = "RM",
  CREDIT = "CREDIT",
  CAD_MAKER = "CAD MAKER",
  CAD_CHECKER = "CAD CHECKER",
  ADMIN_MAKER = "ADMIN MAKER",
  ADMIN_CHECKER = "ADMIN CHECKER",
  UAM_MAKER = "UAM MAKER",
  UAM_CHECKER = "UAM CHECKER",
  UAM_REVIEWER = "UAM REVIEWER",
  AUDIT = "AUDIT",
  REGULATORY = "REGULATORY",
  ROLE1 = "ROLE 1",
  ADMIN = "admin",
}
interface ResponseInfo {
  code: number;
  message: string;
}

export type UserDetails = {
  EmailId: string;
  UserId: number;
  ClientId: number;
  lastlogin: string;
  entity: string;
  TemplateRoleName: UserRoles;
  HdfcUserId: string;
  EmpCode: string;
  EmpName: string;
  Result: number;
  userName: string;
  ClientName: string;
};

export type LoginResponse = {
  info: ResponseInfo;
  data: {
    userDetails: UserDetails;
    token: string;
    expiryDuration: number;
    expiryDate: string;
  };
};

export type PermissionResponse = {
  info: ResponseInfo;
  data: { Permission: string[] };
};

export interface AppVersionResponseType {
  info: ResponseInfo;
  data: { version: string; key: string };
}

export interface RefreshTokenResponse {
  message: string;
}
