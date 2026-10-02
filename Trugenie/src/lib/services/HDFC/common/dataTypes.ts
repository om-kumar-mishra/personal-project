
export type ProjectSalesListDataType = {
  FilePath: string,
  Status: string,
  Entity: string,
  UserName: string,
  CreatedBy: string,
  ActionType: string,
  MISDate: null,
  FileName: string,
  REAssetId: number,
  SaleMISHistoryId: number,
  Type: string,
  CreateAt: string,
  EntityRole: string,
  FileContainer: string

}
export type UploadProjectSetupType = {
  reAssetId: string,
  misDate: string,
  file: File | undefined,
  entity: string,
  entityRole: string,
  userName: string,
  fileContainer: string,
  filePath: string,
  fileName: string,
  userEmail: string,
  remarks: string
};
export type ProjectSalesApprovalsListDataType = {
  FilePath: string,
  Status: string,
  Entity: string,
  UserName: string,
  CreatedBy: string,
  ActionType: string,
  MISDate: null,
  FileName: string,
  REAssetId: number,
  SaleMISHistoryId: number,
  Type: string,
  CreateAt: string,
  EntityRole: string,
  FileContainer: string
}
export type StatusChangeProjectDataType = {
  reAssetId: number,
  salesMISHistoryId: number,
  status: string,
  userEmail: string
}

export type GenericResponseTypes = {
  info: {
    code: number,
    message: string
  },
  data: any
}