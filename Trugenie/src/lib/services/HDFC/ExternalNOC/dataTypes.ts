interface APIResponseInfo {
  info: {
    message: string;
    code: number;
  };
}

export type NOCFormData = {
  date_of_request: Date | null;
  unit_no: string;
  type_of_noc: string;
  date_of_booking: Date | null;
  noc_issue_date: Date | null;
  product_sub_type: string;
  floor: string;
  wing: string;
  area: string | number;
  approval_status: string;
  security_status: string;
  purchaser_name: string;
  purchaser_profile: string;
  payment_received_against_sale_value: string | number;
  payment_received_against_PTC: string | number;
  price_achieved_as_per_sales_MIS: number;
  price_achieved_as_per_parameter: number;
  contractual_msp: number;
  financer: string;
  remarks: string;
};

export type SalesUnitForNOC = {
  BookingDate: string | null;
  Category: string;
  UnitLocationWing: string;
  UnitOfMeasurement: string;
  AreaConsideredMeasurement: string;
  CLPDue: string | null;
  CarpetAreaMeasurement: string;
  ProjectName: string;
  MISDate: string | null;
  CreatedAt: string;
  DevelopmentType: string;
  uniqueref: string;
  UnitLocationSubTypeName: string /* tower */;
  LaunchStatus: string;
  UnitCarpetArea: number;
  ApprovalStatus: string;
  ReceivedTillDate: string | null;
  ProjectSubType: string;
  MortgageStatus: string;
  SaleStage: string;
  UnitConfiguration: string;
  AgreementStatus: string | null;
  CustomerName: string;
  UnitRERACarpetArea: number;
  RESalesID: number;
  REUnitDetailId: number;
  RERACarpetAreaMeasurement: string;
  UnitPlotArea: number;
  AreaSaleableMeasurement: string;
  CreatedBy: string;
  UnitLocationFloor: number;
  RegistrationStatus: string;
  UnitOwnedBy: string;
  REAssetId: number;
  CustomerProfile: string;
  LaunchedArea: number;
  RowNum: number;
  UnitLocationSeries: string;
  UnitFacing: string;
  ProjectPhase: string;
  AreaConsidered: number;
  BuyerLendingBank: string;
  UnitLocationNumber: string;
  ProjectType: string;
  UnitAreaSaleable: number;
  UniqueKey: string;
  ProjectId: string;
  contractualmsp: number;
  nocstatusflag: number;

  // properties not coming in response
  isIssued: number;
  issuedate: string;
  NocRequestId: number;
};

export type NOCPriceHeader = {
  NOCProjectPriceHeaderID: number;
  HeaderValue: string;
  amount: number;
  CreatedBy: string;
  ValueType: string;
  CreatedAt: string;
  NocProjectId: number;
  REPriceHeaderId: number;
  ismsp: number;
  rank: number;
};

export type NOCAccounts = {
  BankName: string;
  NocAccountDetailId: number;
  BrnachAddress: string;
  NocProjectId: number;
  AccountNumber: number;
  tower: string;
};

export type PaymentTransaction = {
  // Credit: number;
  // Date: string;
  // Debit: number;
  // Particulars: string;
  // Reason: string;
  // ReferenceNo: string;
  // Status: string;
  // TransactionDescription: string;
  // "Vch No.": string;
  // "Vch Type": string;
  credit: number;
  date: string;
  debit: number;
  particulars: string;
  reason: string;
  referenceNo: string;
  status: string;
  transactionDescription: string;
  vchNo_: string;
  vchType: string;
  remarks: string;
};

export type PaymentVerificationResponse = {
  AccountNumber: number | null;
  BankName: string | null;
  accountNumber: number | null;
  bankName: string | null;
  info: {
    message: string;
    code: number;
  };
  transaction: PaymentTransaction[];
};

export type NOCTypeResponse = APIResponseInfo & {
  data: string[];
};

export type SalesUnitForNOCResponse = APIResponseInfo & {
  data: SalesUnitForNOC[];
};

export type SalesUnitPriceHeaderResponse = APIResponseInfo & {
  data: string[];
};

export type NOCPriceHeaderResponse = APIResponseInfo & {
  data: NOCPriceHeader[];
};

export type NOCAccountsResponse = APIResponseInfo & {
  data: NOCAccounts[];
};

interface CreatePaymentDetails {
  Bank: string | null;
  AccountNumber: number | null;
  Date: string;
  ReferenceNo: string;
  TransactionDescription: string;
  Credit: number;
  Debit: number;
  Status: string;
  Reason: string;
  Particulars: string;
  "Vch Type": string;
  "Vch No.": string;
  remark: string;
}

export type CreateDocumentDetails = {
  FileName: string;
  BucketName: string;
  Folder: string;
  DocumentType: string;
  UploadType: string;
};

export type CreateExternalNOCData = {
  typeOfNoc: string;
  unitNo: string;
  unitFloor: string;
  wing: string;
  saleableArea: string;
  purchaserName: string;
  purchaserProfile: string;
  purchaseConsideration: string;
  advancePaymentReceived: string;
  financer: string;
  towerName: string;
  requestDate: string;
  bookingDate: string;
  unitOwnedBy: string;
  category: string;
  unitConfiguration: string;
  unitArea: string;
  sellingPrice: string;
  createdby: string;
  reUnitDetailId: string;
  refno: string;
  remark: string;
  nocProjectId: string;
  paymentDetails: CreatePaymentDetails[];
  documentDetails: CreateDocumentDetails[];
  priceHeaderDetails: { Amount: number; NOCProjectPriceHeaderID: number }[];
  nocFile: File;
  emailAttachmentFile: File;
  statementFile: File;
  ledgerFile: File;
  bucketName: string;
  folder: string;
  issueDate: string;
  paymentReceivedAgainstSaleValue: string;
  paymentReceivedAgainstPTC: string;
};

export type CreateExternalNOCResponse = APIResponseInfo & {
  data: { result: number }[];
};

export type BankDataType = {
  BankName: string;
  Files: string[];
};

export type BankDetailsType = {
  UnitId: number;
  Bank: BankDataType[];
};

export type LenderDetails = {
  UnitId: number;
  Files: string[];
};

export type PaymentData = {
  index: number;
  bank: string | null;
  accountNumber: number | null;
  date: string;
  referenceNo: string;
  transDescription: string;
  amount: number;
  status: string;
  reason: string;
  remarks: string;
};
