interface ResponseInfo {
  code: number;
  message: string;
}

//#region [Population Report]
export type PopulationReportData = {
  UserId: number;
  HdfcUserId: string;
  EmpName: string;
  EmpCode: string;
  BranchCode: string;
  BranchName: string;
  DepartmentCode: string;
  DepartmentName: string;
  TemplateRoleName: string;
  CheckerName: string;
  Status: string;
  CreationDateTime: string;
  LastLoginDateTime: string;
  MakerDateTime: string;
  CheckerDateTime: string;
  DisabledDateTime: string;
  ProfileEndDate: string;
  LastModifiedMakerId: string;
  LastModifiedMakerName: string;
  LastModifiedCheckerId: string;
  LastModifiedCheckerName: string;
  LastModifiedCheckerSource: string;
  LastModifiedMakerSource: string;
};

export type PopulationReportResponse = {
  info: ResponseInfo;
  data: PopulationReportData;
};
//#region [Population Report]

//#region [Admin Report]
export type AdminReportData = {
  UserId: number;
  HdfcUserId: string;
  ProfileName: string;
  UserName: string;
  Activity: string;
  LastModifiedMakerId: string;
  LastModifiedCheckerId: string;
  MakerIdAndName: string;
  MakerDateTime: string;
  CheckerDateTime: string;
  CheckerIdAndName: string;
  OldEmpName: string;
  EmpName: string;
  oldTemplateRoleName: string;
  TemplateRoleName: string;
  BranchName: string;
  oldBranchName: string;
  BranchCode: string;
  oldBranchCode: string;
};

export type AdminReportResponse = {
  info: ResponseInfo;
  data: AdminReportData;
};
//#endregion [Admin Report]

//#region [Login Report]
export type LoginReportData = {
  HdfcUserId: string;
  EmpCode: string;
  EmpName: string;
  LoginDate: string;
  LoginTime: string;
  LogoutTime: string;
  ApplicationName: string;
  IPAddress: string;
  HostDetails: string;
  UserId: number;
};

export type LoginReportResponse = {
  info: ResponseInfo;
  data: LoginReportData;
};
//#endregion [Login Report]

//#region [Role-Rights Report]
export type RoleRightReportData = {
  "Profile Status": string;
  RightsAssignedRole: string;
  ProfileDescription: string;
  ProfileName: string;
  RightsAssignedtoRole: string;
  ProfileAssignedDepartment: string;
  AccessType: string;
  RightsDescription: string;
};

export type RoleRightReportResponse = {
  info: ResponseInfo;
  data: RoleRightReportData;
};
//#endregion [Role-Rights Report]

//#region [Application Master]
export type ApplicationMasterData = {
  Value: number;
  Name: string;
};

export type ApplicationMasterResponse = {
  info: ResponseInfo;
  data: ApplicationMasterData[];
};
//#endregion [Application Master]

//#region [All NOC Report]
export type AllNOCReportData = {
  AssetName: string;
  ProjectId: string;
  ApprovedBy: string;
  CurrentStatus: string;
  InitiatedBy: string;
  InitiatedOn: string;
  BorrowerName: string;
  DeveloperName: string;
  LastActionBy: string;
  LastActionOn: string;
  LeadRM: string;
  LocationName: string | null;
  NocProjectId: number;
  NocRequestId: number;
  OverallTat: number;
  REAssetId: number;
  RM2: string;
  RM3: string;
  RegionsName: string | null;
  SentBackCount: number;
  SentBackReason: string | null;
  StatusAsOn: string | null;
  UnitDetail: string;
  ZoneName: string | null;
};

export type AllNOCReportResponse = {
  info: ResponseInfo;
  data: AllNOCReportData;
};
//#endregion [All NOC Report]

//#region [All NOC Report]
export type IssuedNOCReportData = {
  AssetName: string;
  ProjectId: string;
  BorrowerName: string;
  DeveloperName: string;
  ApprovedBy: string;
  ApprovedOn: string;
  CurrentStatus: string;
  InitiatedBy: string;
  InitiatedOn: string;
  NocRequestId: number;
  OverAllTat: number;
  UnitNo: string;
};

export type IssuedNOCReportResponse = {
  info: ResponseInfo;
  data: IssuedNOCReportData;
};
//#endregion [All NOC Report]
