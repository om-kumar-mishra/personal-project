export type APIResponseStatus = {
  message: string;
  code: number;
};
export type ProjectSalesListDataType = {
  FilePath: string;
  Status: string;
  Entity: string;
  UserName: string;
  CreatedBy: string;
  ActionType: string;
  MISDate: null;
  FileName: string;
  REAssetId: number;
  SaleMISHistoryId: number;
  Type: string;
  CreateAt: string;
  EntityRole: string;
  FileContainer: string;
};
export type UploadProjectSetupType = {
  reAssetId: string;
  misDate: string;
  file?: File | null;
  entity: string;
  entityRole: string;
  userName: string;
  fileContainer: string;
  filePath: string;
  fileName: string;
  userEmail: string;
  remarks: string;
};
export type ProjectSalesApprovalsListDataType = {
  FilePath: string;
  Status: string;
  Entity: string;
  UserName: string;
  CreatedBy: string;
  ActionType: string;
  MISDate: null;
  FileName: string;
  REAssetId: number;
  SaleMISHistoryId: number;
  Type: string;
  CreateAt: string;
  EntityRole: string;
  FileContainer: string;
};
export type StatusChangeProjectDataType = {
  reAssetId: number;
  salesMISHistoryId: number;
  status: string;
  userEmail: string;
  remarks?: string;
};
export type CanProjectSetupUpdateDataType = {
  canupdate: number;
};
export type CanCreateSetupDataType = {
  Iscompleted: number;
  Id: number;
  title: string;
};
export type ProjectSetupList = {
  info: APIResponseStatus;
  data: UploadProjectSetupType;
};
export type GetProjectSalesResponse = {
  info: APIResponseStatus;
  data: ProjectSalesListDataType[];
};

export type ProjectSalesApprovalsListResponse = {
  info: APIResponseStatus;
  data: ProjectSalesApprovalsListDataType[];
};

export type CanProjectSetupUpdateDataTypeResponse = {
  info: APIResponseStatus;
  data: CanProjectSetupUpdateDataType[];
};

export type CanCreateSetupDataTypeResponse = {
  info: APIResponseStatus;
  data: CanCreateSetupDataType[];
};
