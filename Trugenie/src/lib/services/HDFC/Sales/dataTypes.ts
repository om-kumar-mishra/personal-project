interface APIResponseInfo {
  info: {
    message: string;
    code: number;
  };
}

export type SalesPastHistory = {
  FilePath: string;
  Status: string;
  Entity: string;
  UserName: string;
  CreatedBy: string;
  ActionType: string;
  MISDate: string;
  FileName: string;
  REAssetId: number;
  SaleMISHistoryId: number;
  Type: string;
  CreateAt: string;
  EntityRole: string;
  FileContainer: string;
  currentStatus: string
};

export type PastSalesSummary = {
  unitcounts: number;
  statustype: number;
  salesstatus: string;
};

export type PendingSalesForApproval = {
  FilePath: string;
  Status: string;
  Entity: string;
  UserName: string;
  CreatedBy: string;
  ActionType: string;
  MISDate: string;
  FileName: string;
  REAssetId: number;
  SaleMISHistoryId: number;
  Type: string;
  CreateAt: string;
  EntityRole: string;
  FileContainer: string;
  currentStatus: string;
};

export type SalesPastHistoryResponse = APIResponseInfo & {
  data: SalesPastHistory[];
};

export type PastSalesSummaryDetailResponse = APIResponseInfo & {
  data: PastSalesSummary[];
};

export type PendingSalesForApprovalResponse = APIResponseInfo & {
  data: PendingSalesForApproval[];
};

export type UpdateSalesPastHistoryResponse = APIResponseInfo & {
  data: [{ result: number }];
};

export type RemoveSalesHistoryResponse = APIResponseInfo & {
  data: [{ result: number }];
};

export type CanUploadSalesTemplateDataResponse = APIResponseInfo & {
  data: [{ canupdate: number }];
};

export type TaggedRMDataResponse = APIResponseInfo & {
  data: [];
};

export type SalesSetupPendingType = APIResponseInfo & {
  data: { isSetup: number }[];
};

export type SalesSummaryResponse = APIResponseInfo & {
  data: {
    code: number;
    message: string | null;
    isValid: boolean;
    summary: {
      saleStatus: string;
      unitcounts: number;
      statustype: number;
    }[];
  };
};

export type SalesSummaryData = {
  summary: {
    saleStatus: string;
    unitcounts: number;
    statustype: number;
  }[];
  misDate: string;
  remarks: string;
  uploadedFile: File;
};

export type SummaryDetailsData = {
  headers: string[];
  tableData: (string | number | null)[][];
};

export type SummaryDetailResponse = APIResponseInfo & {
  data: SummaryDetailsData;
};

// export type SummaryDetailResponse = {
//   code: number;
//   message: string | null;
//   isValid: boolean;
//   UnitLocationSubTypeName: string | null;
//   UnitLocationWing: string;
//   UnitLocationFloor: string;
//   UnitConfiguration: string;
//   UnitLocationNumber: string;
//   UnitAreaSaleable: string;
//   AreaSaleableMeasurement: string | null;
//   CustomerName: string;
//   CustomerProfile: string;
//   BookingDate: string | null;
//   BuyerLendingBank: string;
//   RegistrationDate: string | null;
//   RegistrationStatus: string | null;
//   Scheme: string | null;
//   REUnitDetailId: string | null;
//   RESalesID: string | null;
//   salesstatus: string;
//   ProjectPhase: string;
//   DevelopmentType: string;
//   ProjectType: string;
//   ProjectSubType: string;
//   UnitLocationSeries: string;
//   Category: string;
//   UnitOwnedBy: string;
//   ApprovalStatus: string;
//   MortgageStatus: string;
//   CustomerID: string | null;
//   CustomerEmail: string | null;
//   CustomerAddress: string | null;
//   CustomerPAN: string | null;
// };
