export type APIResponseStatus = {
  message: string;
  code: number;
};

export type PendingNOCDataType = {
  BookingDate: string;
  Wing: string;
  Category: string;
  LastActionOn: string;
  SaleableArea: string;
  LastUpdate: string;
  CreatedAt: string;
  isactive: number;
  uniqueref: string;
  LastActionBy: string;
  NocBulkReqId: number;
  UnitNo: string;
  unitrequestid: string;
  Remark: string;
  TypeOfNoc: string;
  PurchaserProfile: string;
  RequestDate: string;
  WorkFlowPriority: number;
  UnitConfiguration: string;
  PurchaseConsideration: number;
  NOCIssued: number;
  NocProjectId: number;
  REUnitDetailId: number;
  projectname: string;
  AdvancePaymentReceived: number;
  CreatedBy: string;
  DeveloperRefrencenumber: string;
  CurrentStatus: string;
  UnitOwnedBy: string;
  Requesttype: string;
  PurchaserName: string;
  Decision: number;
  IsInternal: number;
  UnitFloor: string;
  SellingPrice: number;
  EscrowCreditDate: string;
  StatusDependency: string;
  UnitArea: string;
  TowerName: string;
  NOCAuthorize: string;
  NocRequestId: number;
  Financer: string;
  developerrequestdate: string;
  NewRequest: string;
  NOCStatus: string;
  status: string;
};

export type ApprovedDataType = {
  BookingDate: string;
  Wing: string;
  Category: string;
  SaleableArea: string;
  LastUpdate: string;
  CreatedAt: string;
  FileName: string;
  uniqueref: string;
  NocBulkReqId: number;
  Folder: string;
  UnitNo: string;
  unitrequestid: string;
  Remark: string;
  TypeOfNoc: string;
  dpnsubmitted: number;
  PurchaserProfile: string;
  RequestDate: string;
  BucketName: string;
  UnitConfiguration: string;
  PurchaseConsideration: number;
  NOCIssued: string;
  NocProjectId: number;
  REUnitDetailId: number;
  projectname: string;
  "Agreement Value": number;
  AdvancePaymentReceived: number;
  CreatedBy: string;
  dpn: string;
  RefNo: string;
  UnitOwnedBy: string;
  Requesttype: string;
  PurchaserName: string;
  Decision: string;
  UnitFloor: string;
  SellingPrice: number;
  EscrowCreditDate: string;
  StatusDependency: string;
  UnitArea: string;
  TowerName: string;
  NOCAuthorize: string;
  NocRequestId: number;
  Financer: string;
  bulkrequestid: string;
  NewRequest: string;
  NOCStatus: string;
  status: string;
};

export type RejectedDataType = {
  projectname: string;
  "Agreement Value": string;
  NocRequestId: string;
  NocProjectId: string;
  NOCStatus: string;
  StatusDependency: string;
  Requesttype: string;
  UnitNo: string;
  UnitFloor: string;
  Wing: string;
  SaleableArea: string;
  PurchaserName: string;
  PurchaserProfile: string;
  PurchaseConsideration: string;
  AdvancePaymentReceived: string;
  Financer: string;
  TowerName: string;
  RequestDate: string;
  BookingDate: string;
  UnitOwnedBy: string;
  Category: string;
  UnitConfiguration: string;
  UnitArea: string;
  CreatedBy: string;
  CreatedAt: string;
  SellingPrice: string;
  EscrowCreditDate: string;
  Remark: string;
  REUnitDetailId: string;
  LastUpdate: string;
  Decision: string;
  TypeOfNoc: string;
  status: string;
  NewRequest: string;
  NOCAuthorize: string;
  NOCIssued: string;
  NOCRejected: string;
  uniqueref: string;
  nocrejectedby: string;
  unitrequestid: string;
  bulkrequestid: string;
  RowNum: string;
};

export type HoldDataType = {
  projectname: string;
  NocRequestId: string;
  NocProjectId: string;
  NOCStatus: string;
  StatusDependency: string;
  Requesttype: string;
  UnitNo: string;
  UnitFloor: string;
  Wing: string;
  SaleableArea: string;
  PurchaserName: string;
  PurchaserProfile: string;
  PurchaseConsideration: string;
  AdvancePaymentReceived: string;
  Financer: string;
  TowerName: string;
  RequestDate: string;
  BookingDate: string;
  UnitOwnedBy: string;
  Category: string;
  UnitConfiguration: string;
  UnitArea: string;
  CreatedBy: string;
  CreatedAt: string;
  SellingPrice: string;
  EscrowCreditDate: string;
  Remark: string;
  REUnitDetailId: string;
  LastUpdate: string;
  NocBulkReqId: string;
  Decision: string;
  TypeOfNoc: string;
  status: string;
  uniqueref: string;
  isactive: number;
  holdbyname: string;
  HoldBackDependent: string;
  cancontinuehold: number;
  bulkrequestid: string;
  unitrequestid: string;
  WorkFlowPriority: number;
};

export type CancelledDataType = {
  projectname: string;
  "Agreement Value": string;
  NocRequestId: string;
  NocProjectId: string;
  NOCStatus: string;
  StatusDependency: string;
  Requesttype: string;
  UnitNo: string;
  UnitFloor: string;
  Wing: string;
  SaleableArea: string;
  PurchaserName: string;
  PurchaserProfile: string;
  PurchaseConsideration: string;
  AdvancePaymentReceived: string;
  Financer: string;
  TowerName: string;
  RequestDate: string;
  BookingDate: string;
  UnitOwnedBy: string;
  Category: string;
  UnitConfiguration: string;
  UnitArea: string;
  CreatedBy: string;
  CreatedAt: string;
  SellingPrice: string;
  EscrowCreditDate: string;
  Remark: string;
  REUnitDetailId: string;
  LastUpdate: string;
  NocBulkReqId: string;
  Decision: string;
  TypeOfNoc: string;
  developerrequestdate: string;
  status: string;
  NewRequest: string;
  NOCAuthorize: string;
  NOCIssued: string;
  nocreturnedon: string;
  NOCCancelled: string;
  uniqueref: string;
  nocreceivedon: string;
  unitrequestid: string;
  bulkrequestid: string;
  RowNum: string;
};

export type PendingNOCReturnType = {
  info: APIResponseStatus;
  data: PendingNOCDataType[];
};

export type ApprovedNOCReturnType = {
  info: APIResponseStatus;
  data: ApprovedDataType[];
};

export type RejectedNOCReturnType = {
  info: APIResponseStatus;
  data: RejectedDataType[];
};

export type HoldNOCReturnType = {
  info: APIResponseStatus;
  data: HoldDataType[];
};

export type CancelledNOCReturnType = {
  info: APIResponseStatus;
  data: CancelledDataType[];
};

export type GeneralisedReturnType = {
  info: APIResponseStatus;
  data: any;
};

export type NOCRemarksPayload = {
  nocRequestId: number;
  users: string;
  remark: string;
  documentContainer: string | null;
  filepath: string | null;
  fileName: string;
  createdBy: string;
  file: File | null;
};

export type NOCPaymentDetailsResponse = {
  Date: string;
  Particulars: string;
  VchType: string;
  VchNo: string;
  amount: string;
  Status: string;
  AccountNumber: string;
  Bank: string;
  Remarks: string;
  ReferenceNo: string;
  Reason: string;
};

export type NOCPaymentDetailsReturnType = {
  info: APIResponseStatus;
  data: NOCPaymentDetailsResponse[];
};

export type NOCRemarksReturnType = {
  Unit: string;
  Users: string;
  EntityRole: string;
  EntityName: string;
  Remark: string;
  DocumentContainer: string;
  Filepath: string;
  FileName: string;
  CreatedAt: string;
  CreatedBy: string;
};

export type NOCRemarksListReturnType = {
  info: APIResponseStatus;
  data: NOCRemarksReturnType[];
};

export type NOCDocumentReturnType = {
  BucketName: string;
  CreatedAt: string;
  CreatedBy: string;
  DocumentType: string;
  EntityName: string;
  EntityRole: string;
  FileName: string;
  Folder: string;
  NocDocumentId: number;
  NocEntityDetailId: number;
  NocProjectId: number;
  NocRequestId: number;
  RefNo: string;
  Remark: null;
  Status: string;
  UploadType: string;
  UserEmail: string;
  UserName: number;
};

export type NOCDocumentListReturnType = {
  info: APIResponseStatus;
  data: NOCDocumentReturnType[];
};

export type GetDecisionDataResponse = {
  BookingDate: string;
  Wing: string;
  LastUpdate: string;
  CreatedAt: string;
  ApprovalStatus: string;
  Remark: string;
  orgReceivedTillDate: string;
  MinAdvancePaymentTolerance: number;
  MortgageStatus: string;
  SaleStage: string;
  orgSaleableArea: string;
  MinAdvancePayment: number;
  TotalExposureTill: number;
  orgCustomerName: string;
  DeveloperName: string;
  orgBuyerLendingBank: string;
  RESalesID: string;
  REUnitDetailId: number;
  PaymentStatus: string;
  isdeviation: string;
  StipulatedSecurityCover: string;
  PriceAchievedAsPerMSPParameter: number;
  AdvancePaymentReceived: number;
  CreatedBy: string;
  ProductSubType: string;
  ProductType: string;
  orgUnitAreaSaleable: string;
  orgPurchaseConsideration: number;
  ProjectedBalancecost: number;
  Requesttype: string;
  RowNum: number;
  PurchaserName: string;
  IsInternal: number;
  UnitFloor: string;
  SellingPrice: number;
  nocreturnedon: string;
  cashcover: string;
  SellingPriceThreshold: number;
  StatusDependency: string;
  UnitArea: string;
  AdvancePaymentReceivedpercentage: number;
  Financer: string;
  HoldBy: string;
  UnitAreaSaleable: string;
  Category: string;
  SaleableArea: string;
  msprequiredforcashcover: number;
  ProjectName: string;
  StepType: string;
  PaymentReceivedAgainstSaleValue: number;
  REAssetName: string;
  UnitLocationSubTypeName: string;
  securitycover: number;
  bankName: string;
  NocBulkReqId: number;
  HoldBackUser: string;
  UnitCarpetArea: number;
  UnitNo: string;
  ProjectLocation: string;
  TypeOfNoc: string;
  PurchaserProfile: string;
  orgCustomerProfile: string;
  RequestDate: string;
  UnitConfiguration: string;
  debenturename: string;
  PurchaseConsideration: number;
  AvaragePriceAchieved: number;
  NocProjectId: number;
  MinSellPrice: number;
  lenderentityname: string;
  IsTotalPaymentRecevied: string;
  AdvancedPaymentThreshold: number;
  UnitOwnedBy: string;
  MSP: number;
  Decision: string;
  AccountNumber: string;
  EscrowCreditDate: string;
  HoldBackDependent: string;
  MinSellPriceTolerance: 1;
  ProjectPhase: string;
  entityrole: string;
  StipulatedCashCover: number;
  TowerName: string;
  NocRequestId: number;
  PaymentReceivedAgainstPTC: number;
  NOCStatus: string;
  nocreceivedon: string;
  CanReject: number;
  CanSendBack: number;
  NextPriority: number;
  spvariance: number;
  orgTotalSaleValue: number;
  orgTotalPtcValue: number;
  securityCovertAsOnDate: string;
  cashCovertAsOnDate: string;
  DevelopmentType: string;
  ISEnableprefence: number;
  showdownload: number;
};

export type GetDecisionDataReturnType = {
  info: APIResponseStatus;
  data: GetDecisionDataResponse[];
};

export type GetDocumentsData = {
  Status: string;
  CreatedBy: string;
  UserName: string;
  EntityName: string;
  RefNo: string;
  FileName: string;
  CreatedAt: string;
  DocumentType: string;
  NocEntityDetailId: number;
  Folder: string;
  UserEmail: string;
  UploadType: string;
  Remark: string;
  BucketName: string;
  EntityRole: string;
  NocRequestId: number;
  NocDocumentId: number;
  NocProjectId: number;
};

export type GetDocumentsReturnType = {
  info: APIResponseStatus;
  data: GetDocumentsData[];
};

export type NOCPriceHeadersResponseData = {
  CreatedAt: string;
  CreatedBy: string;
  HeaderValue: string;
  NOCProjectPriceHeaderID: number;
  NocProjectId: number;
  REPriceHeaderId: number;
  ValueType: string;
  amount: number;
};

export type NOCPriceHeadersReturnType = {
  info: APIResponseStatus;
  data: NOCPriceHeadersResponseData[];
};

export type NocSendBackUsers = {
  EntityId: number;
  EmailId: string;
  EntityRole: string;
  EntityName: string;
  Priority: number;
  StepType: string;
  isBypass: number;
  Signature: number;
  EntityAddress: string | null;
  SignatoryName: string;
  NocEntityDetailId: number;
};

export type NocSendBackUsersResponse = {
  info: APIResponseStatus;
  data: NocSendBackUsers[];
};

export type nocAuthororizeRequest = {
  projectid?: string;
  requestid?: string;
  status?: string;
  filename?: string;
  bucketname?: string;
  foldername?: string;
  unitno?: string;
  towerName?: string;
  wing?: string;
  isDeviation?: string;
  remark?: string;
  holdbackuser?: string;
  stepType?: string;
  nocType?: string;
  createBy?: string;
  file?: File;
  sellPriceConsidrationNeeded?: string;
  sellPriceConsidrationNeededRemarks?: string;
  advPaymentConsidrationNeneded?: string;
  advPaymentConsidrationNenededRemarks?: string;
};

export type SendAuthorizeNocResponse = {
  info: APIResponseStatus;
};

export type NOCRequestRemarksPayload = {
  projectId: number;
  NocRequestId: number;
};
export type NOCRequestRemarks = {
  date: string;
  desicion: string | null;
  EntityName: string;
  EntityRole: string;
  NocRequestId: number;
  user: string;
  unitrequestid: string;
  Remark: string;
};

export type GetNOCRequestRemarksResponse = {
  info: APIResponseStatus;
  data: NOCRequestRemarks[];
};

export type NOCRequestTimelinePayload = {
  nocRequestId: number;
};

export type NocRequestTimeline = {
  NocAction: string;
  CreatedBy: string;
  CreatedAt: string;
  UserName: string;
  UserRole: string;
  AccessTag: null;
  EMPCode: string;
};

export type GetNocRequestTimelineResponse = {
  info: APIResponseStatus;
  data: NocRequestTimeline[];
};

export type NocRequestChangeHistory = {
  color: string;
  title: string;
  oldValue: string;
  newValue: string;
};

export type GetNocRequestChangeHistoryResponse = {
  info: APIResponseStatus;
  data: NocRequestChangeHistory[];
};

export type NocDeveloperDocRefPayload = {
  nocRequestId: number;
};
export type NocDeveloperDocRef = { RefNo: string };

export type GetNocDeveloperDocRefResponse = {
  info: APIResponseStatus;
  data: NocDeveloperDocRef[];
};

export type NOCProjectDetails = {
  ClientId: number;
  ClientName: string;
  CreatedBy: string;
  Date: string;
  DeveloperId: number;
  DeveloperName: string;
  ISEnableprefence: number;
  MinAdvancePayment: number;
  MinAdvancePaymentTolerance: number;
  MinSellPrice: number;
  MinSellPriceTolerance: number;
  NocProjectId: number;
  ProjectLocation: string | null;
  REAssetId: number;
  REAssetName: string;
  TotalUnits: number;
  booked: number;
  cancelrequest: number;
  newrequest: number;
  nocissued: number;
  registered: number;
};

export type NOCProjectDetailsResponseType = {
  info: APIResponseStatus;
  data: NOCProjectDetails[];
};
