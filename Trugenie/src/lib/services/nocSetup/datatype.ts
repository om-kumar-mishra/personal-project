import { ResponseCodeType } from"../Datatype";
import { NocSetupActionType } from"./types";

export type priceHeaderSelect = { value: number; label: string; isselected: boolean | number };

export type selectType = { value: number; label: string };

export type ApiRequestSuccess = {
  type: NocSetupActionType;
  result: string[];
};

export interface NocSetupAction {
  type: NocSetupActionType;
}

export interface NocSetupReraAction {
  type: NocSetupActionType;
  reAssetId: number;
  towers: string;
}

export interface NocThresholdTypeApiResponse {
  info: ResponseCodeType;
  data: string[];
}

export interface NocReraNumberApiResponse {
  info: ResponseCodeType;
  data: {
    rerano: string;
  }[];
}

export interface NocPeriodApiResponse {
  info: ResponseCodeType;
  data: { dataValue: string; displayLabel: string }[];
}

export interface NocSetupProjectTypeAction {
  type: NocSetupActionType;
  reassetId: number;
}

export interface NocProjectTowerApiResponse {
  info: ResponseCodeType;
  data: {
    UnitLocationSubTypeName: string;
  }[];
}

export interface NocSetupPriceHeadersAction {
  type: NocSetupActionType;
  nocProjectId: number;
  reassetId: number;
}

export interface NocPriceHeadersApiResponse {
  info: ResponseCodeType;
  data: {
    HeaderValue: string;
    isSelected: number;
    REPriceHeaderId: number;
  }[];
}

export interface NocSetupAccountDetailsAction {
  type: NocSetupActionType;
  nocProjectId: number;
}

export type NocAccountDetailsApiData = {
  NocProjectId?: number;
  NocAccountDetailId?: number;
  CreatedBy?: string;
  CreatedAt?: string;
  BankName: string;
  Towers: string;
  RERANumber: string;
  BrnachAddress?: string;
  Enddate?: string | Date;
  Startdate?: string | Date;
  Accounttype: string;
  AccountNumber: number;
};

export interface NocAccountDetailsApiResponse {
  info: ResponseCodeType;
  data: NocAccountDetailsApiData[];
}

export type nocSetupWorkflowDataType = {
  Role: string;
  TypeOfStep: string;
  Step: number;
};

export interface NOCSetupWorkFlowApiResponse {
  info: ResponseCodeType;
  data: nocSetupWorkflowDataType[];
}

export interface NocSetupViewUserDetailAction {
  type: NocSetupActionType;
  reassetId: number;
  roleName: string;
}

export type NOCViewUserDetailType = {
  developerCustomerGroup: string;
  developerCustomerInvestee: string;
  empName: string;
  emailId: string;
  departmentName: string;
  supervisorName: string;
};

export interface NOCViewUserDetailApiResponse {
  info: ResponseCodeType;
  data: NOCViewUserDetailType[];
}

export type NocSetupProjectPayload = {
  nocProjectId: number;
  minimumSPTolerance?: number;
  advancedPayment?: number;
  advancedPaymentTolerance?: number;
  thresholdDate?: string;
  thresholdType?: string;
  avgPriceCalc?: string;
  userEmail: string;
  flowType: number;
  period?: number | string;
  enablePrefence: number;
  accountDetails: {
    Accounttype: string;
    AccountNumber: number;
    BankName: string;
    BrnachAddress?: string;
    Towers: string;
    StartDate?: string;
    EndDate?: string;
    RERANumber: string;
  }[];
  nocPriceHeaders?: {
    REPriceHeaderId: number;
    HeaderValue: string;
  }[];
};

export interface NocSetupProjectAction {
  type: NocSetupActionType;
  payload: NocSetupProjectPayload;
  callBack?: (success: boolean) => void;
}

export interface NocSetupProjectApiResponse {
  info: ResponseCodeType;
}

export interface NOCSetupAccountTypeApiResponse {
  info: ResponseCodeType;
  data: string[];
}

export type NOCProjectDetailsData = {
  AvgPriceCalculatePeriod: 3;
  CreatedAt: string | null;
  REAssetName: string;
  Thresholdtype: string;
  ProjectLocation: string | null;
  LastModified: string;
  ClientName: string;
  MinAdvancePaymentTolerance: number;
  Iscompleted: boolean;
  ClientId: number;
  DeveloperId: number;
  MinAdvancePayment: number;
  DeveloperName: string;
  TotalUnits: string | null;
  NocProjectId: number;
  MinSellPrice: number;
  Status: string | null;
  CreatedBy: string;
  totoalunitcount: number;
  ThresholdDate: string;
  REAssetId: number;
  ISEnableprefence: number;
  BorrowerDetailId: number;
  MinSellPriceTolerance: number;
  FlowType: number;
  BorrowerName: string;
  AvgPriceCalculateOn: string;
};

export interface NOCSetupProjectDetailsApiResponse {
  info: ResponseCodeType;
  data: NOCProjectDetailsData[];
}


export type NocProjectEntitiesApiData = {
  EntityId: number;
  CreatedBy?: string;
  EntityName: string;
  EntityRole: string;
  Priority: string;
  CreatedAt?: string;
  NoCEntityId?: number;
  NocProjectId?:number;
  LastUpdateDate?: string;
  Address?:string;
  EmailId?:string;
  Signature:string;
  ParentID : number;
  ParentName:string;
  Designation:string;
};

export interface NocProjectEntitiesApiResponse {
  info: ResponseCodeType;
  data: NocProjectEntitiesApiData[];
}


export type NocProjectEntityUsersApiData = {
  EmailId  :string,
  Designation  :string,
  ParentEntityId  :number,
  CreatedBy  :string | undefined,
  parentname  :string,
  EntityRole  :string,
  EntityName  :string,
  Priority  :number,
  CreatedAt  :string,
  EntityId  :number,
  LastModified  :string,
  EntityAddress  :string,
  SignatoryName  :string,
  NocProjectId  :number

};

export interface NocProjectEntityUsersApiResponse {
  info: ResponseCodeType;
  data: NocProjectEntityUsersApiData[];
}

export type NocWorkflowDetailsApiData = {
  // EmailId  :string,
  // Designation  :string,
  // ParentEntityId  :number,
  // CreatedBy  :string,
  // parentname  :string,
  // EntityRole  :string,
  // EntityName  :string,
  // Priority  :string,
  // CreatedAt  :string,
  // EntityId  :number,
  // LastModified  :string,
  // EntityAddress  :string,
  // SignatoryName  :string,
  // NocProjectId  :number
  EntityId:number,
  EmailId:string,
  EntityRole:string,
  EntityName:string,
  Priority:number,
  StepType:string,
  isBypass:number,
  Signature:number,
  EntityAddress:string,
  SignatoryName:string,
  NocEntityDetailId:number
  Id?: number,

};

export interface NocWorkflowDetailsApiResponse {
  info: ResponseCodeType;
  data: NocWorkflowDetailsApiData[];
}

//Get Lender
export type GetLenderByClientApiData = {
  EmailId  :string,
  Designation  :string,
  ParentEntityId  :number,
  CreatedBy  :string,
  parentname  :string,
  EntityRole  :string,
  EntityName  :string,
  Priority  :string,
  CreatedAt  :string,
  EntityId  :number,
  LastModified  :string,
  EntityAddress  :string,
  SignatoryName  :string,
  NocProjectId  :number

};

export interface GetLenderByClientApiResponse {
  info: ResponseCodeType;
  data: GetLenderByClientApiData[];
}

//Get Debenture
export type GetDebentureByClientApiData = {
  EmailId  :string,
  Designation  :string,
  ParentEntityId  :number,
  CreatedBy  :string,
  parentname  :string,
  EntityRole  :string,
  EntityName  :string,
  Priority  :string,
  CreatedAt  :string,
  EntityId  :number,
  LastModified  :string,
  EntityAddress  :string,
  SignatoryName  :string,
  NocProjectId  :number

};

export interface GetDebentureByClientApiResponse {
  info: ResponseCodeType;
  data: GetDebentureByClientApiData[];
}


//Get Developer
export type GetDeveloperByClientApiData = {
  EmailId  :string,
  Designation  :string,
  ParentEntityId  :number,
  CreatedBy  :string,
  parentname  :string,
  EntityRole  :string,
  EntityName  :string,
  Priority  :string,
  CreatedAt  :string,
  EntityId  :number,
  LastModified  :string,
  EntityAddress  :string,
  SignatoryName  :string,
  NocProjectId  :number

};

export interface GetDeveloperByClientApiResponse {
  info: ResponseCodeType;
  data: GetDeveloperByClientApiData[];
}


//Get PMC
export type GetPMCByClientApiData = {
  EmailId  :string,
  Designation  :string,
  ParentEntityId  :number,
  CreatedBy  :string,
  parentname  :string,
  EntityRole  :string,
  EntityName  :string,
  Priority  :string,
  CreatedAt  :string,
  EntityId  :number,
  LastModified  :string,
  EntityAddress  :string,
  SignatoryName  :string,
  NocProjectId  :number

};

export interface GetPMCByClientApiResponse {
  info: ResponseCodeType;
  data: GetPMCByClientApiData[];
}


//Get PMC
export type GetEntityUserApiDate = {
  SupervisorCode:string,
  MakerEmpName:string,
  CreatedAt:string,
  HdfcUserId:string,
  EUId:number,
  UserStatus:string,
  EmpName:string
  ModifiedAt:string,
  UserSource:string,
  TemplateRoleName:string,
  ClientId:number,
  BranchName:string,
  IsacTicketNumber:null,
  CheckerEmpCode:string,
  DepartmentCode:string,
  EmailId:string,
  SupervisorName:string,
  CompanyType:string,
  EmpCode:string,
  EntityId:number,
  EntityType:number,
  UserId:number,
  MakerEmpCode:string,
  DepartmentName:string,
  CheckerEmpName:string,
  BranchCode:string,
  Designation:string
};


export interface GetEntityUserApiResponse {
  info: ResponseCodeType;
  data: GetEntityUserApiDate[];
};

export type UploadSetupNocPayload = { 
nocProjectId: number;
minimumSPTolerance?: number;
advancedPayment?: number;
advancedPaymentTolerance?: number;
thresholdDate?: string;
thresholdType?: string;
avgPriceCalc?: string;
// userEmail?: string;
FlowType: number;
period?: number | string;
enableprefence: number;
file:Blob
};


export interface UploadSetupNOCResponse {
  info: ResponseCodeType;
}