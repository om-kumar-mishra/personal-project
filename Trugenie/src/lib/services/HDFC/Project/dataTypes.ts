import { ResponseCodeType } from "../../Datatype";

interface ResponseInfo {
  code: number;
  message: string;
}

export type Project = {
  AssetName: string;
  BorrowerDetailId: number;
  BorrowerName: string;
  CreatedAt: string;
  CreatedBy: string;
  DeveloperCIN: number;
  DeveloperId: number;
  DeveloperName: string;
  HoldBy: string | null;
  HoldDate: string | null;
  NocProjectId: number;
  REAssetId: number;
  Remarks: string | null;
  approved: number;
  onHold: number | null;
  pending: number;
  status: string;
  Address: string;
  totalunits: number;
  isenabled: number;
};

export type ProjectListResponse = {
  info: ResponseInfo;
  data: Project[];
};

export type AllProjectList = {
  ZoneID: number;
  Address: string;
  IsActive: number;
  ProjectId: string;
  LocationId: number;
  REAssetId: number;
  RegionsName: string;
  BorrowerDetailId: number;
  zonename: string;
  AssetName: string;
  LocationName: string;
  lastediton: string;
  lasteditby: string | null;
  RegionsId: number;
  DeveloperId: number;
  LeadRM: string;
  DeveloperName: string;
  BorrowerName: string;
  status: string;
  pendingnoc: number;
};

export type AllProjectListResponse = {
  info: ResponseCodeType;
  data: AllProjectList[];
};

export type CustomerTaggedRMUsersData = {
  EmailId: string;
  UserId: number;
  AccessTag: string;
  TemplateRoleName: string;
  HdfcUserId: string;
  EmpCode: string;
  EmpName: string;
};

export type CustomerTaggedRMUsersResponse = {
  info: ResponseCodeType;
  data: CustomerTaggedRMUsersData[];
};

export type CustomerTaggedRMUsersPayload = {
  developerId: number;
  createdby: string;
};

export type updateREProjectPayload = {
  REAssetId: number;
  assetname: string;
  BorrowerDetailId: number;
  BorrowerName: string;
  DeveloperId: number;
  DeveloperName: string;
  createdby: string;
  RegionsId: number;
  LocationId: number;
  zoneid: number;
  address: string;
  projectid: string;
  Remark: string;
  username: string;
  actionbyusername: string;
  actionbyuserrole: string;
};

export type ProjectUpdateResponse = {
  info: ResponseCodeType;
  data: { result: number };
};

export type ProjectUpdateStatusPayload = {
  reAssetId: number;
  isActive: number;
  createdby: string;
  username: string;
  remark: string;
  actionByUsername: string;
  actionByUserrole: string;
};

export type ProjectLogs = {
  CreateAt: string;
  LogMessage: string | null;
  actionby: string | null;
  CreatebyUserRole: string | null;
  Remark: string | null;
  username: string | null;
};

export type ProjectLogsListResponse = {
  info: ResponseCodeType;
  data: ProjectLogs[];
};

export type ProjectAsignUserPayload = {
  useremail: string;
  assetId: number;
  userRole: string;
  createdBy: string;
  userName: string;
  empCode: string;
  remark: string;
  accessTag: string;
  actionByUserName: string;
  actionByUserRole: string;
};

export type ProjectAssignUserResponse = {
  info: ResponseCodeType;
};

export type ProjectUserAccessList = {
  UserName: string;
  AccessId: number;
  UserRole: string;
  canremoveaccess: number;
  UserEmail: string;
  EMPCode: string;
};

export type ProjectUserAccessListResponse = {
  info: ResponseCodeType;
  data: ProjectUserAccessList[];
};

export type ProjectUserAccessDetails = {
  Status: string;
  DepartmentCode: string;
  SupervisorCode: string;
  Email: string;
  CreatedBy: string;
  CreatedAt: string;
  SupervisorName: string;
  CompanyType: string;
  HdfcUserId: string;
  userId: number;
  UserStatus: string;
  InvesteeName: string;
  Name: string;
  RoleName: string;
  DepartmentName: string;
  BranchName: string;
  DeveloperName: string;
  BranchCode: string;
  EmpCode: string;
  ActionedUser: string;
  Remark: string;
};

export type ProjectUserAccessDetailsResponse = {
  info: ResponseCodeType;
  data: { userInfo: ProjectUserAccessDetails };
};

export type RemoveUserProjectAccessPayload = {
  userEmail: string;
  accessId: number;
  userRole: string;
  remark: string;
  actionByUserName: string;
  actionByUserRole: string;
};

export type RemoveUserProjectAccessResponse = {
  info: ResponseCodeType;
  data: { result: number };
};

export type RoleTemplateNameListResponse = {
  info: ResponseCodeType;
  data: RoleType[];
};

export type UserByRoleData = {
  AccessTag: string | null;
  EmailId: string;
  EmpCode: string;
  EmpName: string;
};

export type UserByRoleListResponse = {
  info: ResponseCodeType;
  data: UserByRoleData[];
};

export type CreateProjectPayloadType = {
  assetName: string;
  borrowerDetailId: number;
  borrowerName: string;
  developerId: number;
  developerName: string;
  createdBy: string;
  regionsId: number;
  locationId: number;
  zoneId: number;
  address: string;
  projectId: string;
  userName: string;
  userRole: string;
  clientId:number;
  clientName:string;
};

export type ProjectUserType = {
  EmailId: string;
  canreturn: number;
  UserId: number;
  AccessTag: null;
  TemplateRoleName: string;
  HdfcUserId: string;
  EmpCode: string;
  EmpName: string;
};

export type ProjectUserListResponse = {
  info: ResponseCodeType;
  data: {
    body: ProjectUserType[];
    headers: unknown;
    statusCode: string;
    statusCodeValue: number;
  };
};

export type AssetInvestmentType = {
clientId:number,
clientName:string
createdby:string,
createdAt:string,
status:string,
type:string,
id:number,
name:string,
reassetId:number,
assetName:string,
developerName:string,
developerCin:number,
borrowerDetailId:number,
remarks:string,
onHold:number,
holdDate:string,
holdBy:string,
developerId:number,
borrowerName:string,
regionsId:number,
locationId:number,
nocProjectId:number,
opid:number,
constructionProjectId:number,
investmentId:number,
fundId:number,
investmentName:string,
investmentType:string,
firstInvestmentDate:string,
amountCommitt:string
};

export type AssetInvestmentResponse = {
  info: ResponseCodeType;
  data:AssetInvestmentType[];
};

export type RoleType = {
  Name: string,
  RoleId : number
}
