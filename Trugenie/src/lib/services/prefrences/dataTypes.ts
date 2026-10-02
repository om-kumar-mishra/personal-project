export interface INFO {
  code: number;
  message: string;
}
export interface UpdateNOCProjectCashCoverDetailsType {
  reAssetId?: number;
  stipulatedCashCover: number;
  projectedBalancecost: number;
  totalExposureTill: number;
  misDate: string;
  createdBy: string;
  asOnDate: string | Date;
}

export type reExposureType = {
  exposure: string;
  valuationAmount: number;
};

export type reSecuritiesType = {
  securityType: string;
  valuationAmount: number;
};
export interface UpdateReProjectSecurityDetails {
  reAssetId: number;
  reExposureType: reExposureType[];
  reSecuritiesType: reSecuritiesType[];
  misDate: string;
  createdBy: string;
  stipulatedSecurityCover: number;
  asOnDate: string;
}

export interface CalculateCashCoverType {
  reAssetId: number;
  stipulatedCashCover: number;
  balanceCostProject: number;
  totalExposure: number;
  misDate: string | Date;
  update: number;
  userEmail: string;
}
export interface CashCoverDetailType {
  asOnDate?: string;
  createdBy?: string;
  SoldArea: number | null;
  UnsoldreceivablesonMSP: number | null;
  Balancecostproject: number;
  cashcovervalue: number | null;
  MISDate: string;
  Totalexposure: number;
  TotalReceivedtilldate: number | null;
  SalesSoldInventory: number | null;
  UnsoldArea: number | null;
  NetReceivablescover: number | null;
  ProjectedBalancecost: number;
  Msp: number;
  Balancereceivablessoldunits: number | null;
  TotalArea: number | null;
  NetReceivablesproject: number | null;
  StipulatedCashCover: number;
  cashcovermet: 1;
  TotalExposureTill: number;
  Totalbalancereceivables: number | null;
  Grossreceivablescover: number | null;
}

export interface ReProjectExposure {
  CreatedBy: string;
  MISDate: string;
  CreatedAt: string;
  ExposureId: 66;
  Exposure: string;
  REAssetId: number;
  ValuationAmount: number;
}

export interface ReProjectExposure {
  CreatedBy: string;
  MISDate: string;
  CreatedAt: string;
  ExposureId: 66;
  Exposure: string;
  REAssetId: number;
  ValuationAmount: number;
}

export interface NOCProjectPrefrence {
  "Is account delinquent?": number;
  StipulatedSecurityCover: number;
  "Is Security cover met?": number;
  "Is cash cover met?": number;
  ProjectedBalancecost: number;
  TotalExposureTill: number;
}
export interface ReProjectSecurity {
  SecurityType: string;
  CreatedBy: string;
  MISDate: string;
  CreatedAt: string;
  SecurityId: number;
  REAssetId: number;
  ValuationAmount: number;
}

export interface UpdateAccountDelinquent {
  result: number;
}

export interface UpdateHoldStatus {
  ReAssetId: number;
  onHold: number;
  StateOndate: string;
  Remarks: string;
  createdBy: string;
}

export interface CalculateCashCoverResponse {
  data: CashCoverDetailType[];
  info: INFO;
}
export interface ReProjectExposureResponse {
  data: ReProjectExposure[];
  info: INFO;
}

export interface GetUpdateHoldStatusResponse {
  data: GetUpdateHoldStatus[];
  info: INFO;
}
export interface GetUpdateHoldStatus {
  onHold: null | number;
  Remarks: null | string;
  HoldDate: null | string;
  entityname: null | string;
  userrole: null | string;
  AssetName: null | string;
  username: null | string;
}
export interface NOCProjectPrefrenceResponse {
  data: NOCProjectPrefrence[];
  info: INFO;
}
export interface ReProjectSecurityResponse {
  data: ReProjectSecurity[];
  info: INFO;
}

export interface UpdateAccountDelinquentResponse {
  data: UpdateAccountDelinquent[];
  info: INFO;
}
export interface UpdateHoldStatusResponse {
  data: UpdateHoldStatus[];
  info: INFO;
}
export interface UpdateReProjectSecurityResponse {
  info: INFO;
  data: [{ result: string }];
}
