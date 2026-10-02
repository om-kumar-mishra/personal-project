import { ResponseCodeType } from "../../../Datatype";

export type SiteVisitPendingImagesTableData = {
  Role: string;
  Status: string;
  Type: string;
  ActionType: string;
  Createdby: string;
  EntityName: string;
  MISDate: string;
  CreatedAt: string;
  SiteImageHistoryId: number;
  REAssetId: number;
  Remark: string;
};

export type SiteVisitPendingImagesTableResponse = {
  info: ResponseCodeType;
  data: SiteVisitPendingImagesTableData[];
};


export type UpdateConstructionSiteImageStatusPayload = {
  siteImageHistoryId: number;
  status: string;
  createdBy: string;
};

export type UpdateConstructionSiteImageStatusData = {
  result: number;
};

export type UpdateConstructionSiteImageStatusResponse = {
  info: ResponseCodeType;
  data: UpdateConstructionSiteImageStatusData[];
};

export type ConstructionPastSiteVisitImagesData = {
  Role: string;
  Status: string;
  Type: string;
  ActionType: string;
  Createdby: string;
  EntityName: string;
  MISDate: string;
  CreatedAt: string;
  SiteImageHistoryId: number;
  REAssetId: number;
  Remark: string;
};

export type ConstructionPastSiteVisitImagesResponse = {
  info: ResponseCodeType;
  data: ConstructionPastSiteVisitImagesData[];
};

export type UploadImageType = {
  Type: string;
  FileContainer: string;
  FilePath: string;
  FileName: string;
  Remark: string;
}

export type UploadConstructionModuleSiteImagesPayload = {
  reassetId: number;
  entityName: string;
  role: string;
  CreatedBy: string;
  data: object;
  files: string | Blob;
};

export type UploadConstructionModuleSiteImagesResponse = {
  info: ResponseCodeType;
};


export type CanAddSiteVisitImagesData = {
  canupdate: number;
};

export type CanAddSiteVisitImagesResponse = {
  info: ResponseCodeType;
  data: CanAddSiteVisitImagesData[];
};


// Setup

export type ViewSiteImagesData = {
  FilePath: string;
  Type: string;
  SiteImageId: number;
  CreatedBy: string;
  MISDate: string;
  FileName: string;
  CreatedAt: string;
  SiteImageHistoryId: number;
  REAssetId: number;
  FileContainer: string;
  Remark: string;
};

export type ViewSiteImagesResponse = {
  info: ResponseCodeType;
  data: ViewSiteImagesData[];
};

export type UploadSiteImageUpdatePayload = {
  reassetId: number;
  entityName: string;
  role: string;
  CreatedBy: string;
  data: object;
  files: File;
};


export type UploadSiteImageUpdateResponse = {
  info: ResponseCodeType;
};

export type SiteVisitApprovalTableData = {
  Role: string;
  Status: string;
  Type: string;
  ActionType: string;
  Createdby: string;
  EntityName: string;
  MISDate: string;
  CreatedAt: string;
  SiteImageHistoryId: number;
  REAssetId: number;
  Remark: string;
};

export type SiteVisitApprovalTableResponse = {
  info: ResponseCodeType;
  data: SiteVisitApprovalTableData[];
};

export type SiteVisitPastUpdateTableData = {
  Role: string;
  Status: string;
  Type: string;
  ActionType: string;
  Createdby: string;
  EntityName: string;
  MISDate: string;
  CreatedAt: string;
  SiteImageHistoryId: number;
  REAssetId: number;
  Remark: string;
};

export type SiteVisitPastUpdateTableResponse = {
  info: ResponseCodeType;
  data: SiteVisitPastUpdateTableData[];
};



