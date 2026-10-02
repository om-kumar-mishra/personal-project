import {
  BankDetailsType,
  CreateExternalNOCData,
  CreateExternalNOCResponse,
  LenderDetails,
  NOCAccountsResponse,
  NOCPriceHeaderResponse,
  NOCTypeResponse,
  PaymentVerificationResponse,
  SalesUnitForNOCResponse,
  SalesUnitPriceHeaderResponse,
} from "./dataTypes";
import * as actionTypes from "./types";

// NOC-Types
//#region [Requested Action]
export type GetNOCTypeRequested = {
  type: typeof actionTypes.GET_NOC_TYPES_REQUESTED;
  callback?: (success: boolean, message?: string) => void;
};

export const getNOCTypeListRequested = (callback?: (success: boolean, message?: string) => void): GetNOCTypeRequested => ({
  type: actionTypes.GET_NOC_TYPES_REQUESTED,
  callback,
});
//#endregion

//#region [Succeeded Action]
export type GetNOCTypeSucceeded = {
  type: typeof actionTypes.GET_NOC_TYPES_SUCCEEDED;
  result: NOCTypeResponse;
};

export const getNOCTypeListSucceeded = (result: NOCTypeResponse): GetNOCTypeSucceeded => ({
  type: actionTypes.GET_NOC_TYPES_SUCCEEDED,
  result,
});

//#endregion

//#region [Failed Action]
export type GetNOCTypeFailed = {
  type: typeof actionTypes.GET_NOC_TYPES_FAILED;
  error?: string;
};

export const getNOCTypeListFailed = (error?: string): GetNOCTypeFailed => ({
  type: actionTypes.GET_NOC_TYPES_FAILED,
  error,
});
//#endregion

//#region [Reset Action]
export type GetNOCTypeReset = {
  type: typeof actionTypes.GET_NOC_TYPES_RESET;
};

export const getNOCTypeListReset = (): GetNOCTypeReset => ({
  type: actionTypes.GET_NOC_TYPES_RESET,
});
//#endregion

// Sales-unit-for-NOC
//#region [Requested Action]
export type GetSalesUnitForNOCRequested = {
  type: typeof actionTypes.GET_SALES_UNIT_FOR_NOC_REQUESTED;
  reAssetId: number;
  nocType: string;
  callback?: (success: boolean, message?: string) => void;
};

export const getSalesUnitForNOCRequested = (
  reAssetId: number,
  nocType: string,
  callback?: (success: boolean, message?: string) => void,
): GetSalesUnitForNOCRequested => ({
  type: actionTypes.GET_SALES_UNIT_FOR_NOC_REQUESTED,
  reAssetId,
  nocType,
  callback,
});
//#endregion

//#region [Succeeded Action]
export type GetSalesUnitForNOCSucceeded = {
  type: typeof actionTypes.GET_SALES_UNIT_FOR_NOC_SUCCEEDED;
  result: SalesUnitForNOCResponse;
};

export const getSalesUnitForNOCSucceeded = (result: SalesUnitForNOCResponse): GetSalesUnitForNOCSucceeded => ({
  type: actionTypes.GET_SALES_UNIT_FOR_NOC_SUCCEEDED,
  result,
});

//#endregion

//#region [Failed Action]
export type GetSalesUnitForNOCFailed = {
  type: typeof actionTypes.GET_SALES_UNIT_FOR_NOC_FAILED;
  error?: string;
};

export const getSalesUnitForNOCFailed = (error?: string): GetSalesUnitForNOCFailed => ({
  type: actionTypes.GET_SALES_UNIT_FOR_NOC_FAILED,
  error,
});
//#endregion

//#region [Reset Action]
export type GetSalesUnitForNOCReset = {
  type: typeof actionTypes.GET_SALES_UNIT_FOR_NOC_RESET;
};

export const getSalesUnitForNOCReset = (): GetSalesUnitForNOCReset => ({
  type: actionTypes.GET_SALES_UNIT_FOR_NOC_RESET,
});
//#endregion

// Sales-unit-price-header
//#region [Requested Action]
export type GetSalesUnitPriceHeaderRequested = {
  type: typeof actionTypes.GET_SALES_UNIT_PRICE_HEADER_REQUESTED;
  salesId: number;
  callback?: (success: boolean, message?: string) => void;
};

export const getSalesUnitPriceHeaderRequested = (
  salesId: number,
  callback?: (success: boolean, message?: string) => void,
): GetSalesUnitPriceHeaderRequested => ({
  type: actionTypes.GET_SALES_UNIT_PRICE_HEADER_REQUESTED,
  salesId,
  callback,
});
//#endregion

//#region [Succeeded Action]
export type GetSalesUnitPriceHeaderSucceeded = {
  type: typeof actionTypes.GET_SALES_UNIT_PRICE_HEADER_SUCCEEDED;
  result: SalesUnitPriceHeaderResponse;
};

export const getSalesUnitPriceHeaderSucceeded = (result: SalesUnitPriceHeaderResponse): GetSalesUnitPriceHeaderSucceeded => ({
  type: actionTypes.GET_SALES_UNIT_PRICE_HEADER_SUCCEEDED,
  result,
});

//#endregion

//#region [Failed Action]
export type GetSalesUnitPriceHeaderFailed = {
  type: typeof actionTypes.GET_SALES_UNIT_PRICE_HEADER_FAILED;
  error?: string;
};

export const getSalesUnitPriceHeaderFailed = (error?: string): GetSalesUnitPriceHeaderFailed => ({
  type: actionTypes.GET_SALES_UNIT_PRICE_HEADER_FAILED,
  error,
});
//#endregion

// NOC-price-header
//#region [Requested Action]
export type GetNOCPriceHeaderRequested = {
  type: typeof actionTypes.GET_NOC_PRICE_HEADER_REQUESTED;
  nocProjectId: number;
  salesId: number;
  nocrequestid: number;
  callback?: (success: boolean, message?: string) => void;
};

export const getNOCPriceHeaderRequested = (
  nocProjectId: number,
  salesId: number,
  nocrequestid,
  callback?: (success: boolean, message?: string) => void,
): GetNOCPriceHeaderRequested => ({
  type: actionTypes.GET_NOC_PRICE_HEADER_REQUESTED,
  nocProjectId,
  salesId,
  nocrequestid,
  callback,
});
//#endregion

//#region [Succeeded Action]
export type GetNOCPriceHeaderSucceeded = {
  type: typeof actionTypes.GET_NOC_PRICE_HEADER_SUCCEEDED;
  result: NOCPriceHeaderResponse;
};

export const getNOCPriceHeaderSucceeded = (result: NOCPriceHeaderResponse): GetNOCPriceHeaderSucceeded => ({
  type: actionTypes.GET_NOC_PRICE_HEADER_SUCCEEDED,
  result,
});

//#endregion

//#region [Failed Action]
export type GetNOCPriceHeaderFailed = {
  type: typeof actionTypes.GET_NOC_PRICE_HEADER_FAILED;
  error?: string;
};

export const getNOCPriceHeaderFailed = (error?: string): GetNOCPriceHeaderFailed => ({
  type: actionTypes.GET_NOC_PRICE_HEADER_FAILED,
  error,
});
//#endregion

//#region [Reset Action]
export type GetNOCPriceHeaderReset = {
  type: typeof actionTypes.GET_NOC_PRICE_HEADER_RESET;
};

export const getNOCPriceHeaderReset = (): GetNOCPriceHeaderReset => ({
  type: actionTypes.GET_NOC_PRICE_HEADER_RESET,
});
//#endregion

// NOC-accounts
//#region [Requested Action]
export type GetNOCAccountRequested = {
  type: typeof actionTypes.GET_NOC_ACCOUNTS_REQUESTED;
  nocProjectId: number;
  createdBy: string;
  tower: string;
  callback?: (success: boolean, message?: string) => void;
};

export const getNOCAccountRequested = (
  nocProjectId: number,
  createdBy: string,
  tower: string,
  callback?: (success: boolean, message?: string) => void,
): GetNOCAccountRequested => ({
  type: actionTypes.GET_NOC_ACCOUNTS_REQUESTED,
  nocProjectId,
  createdBy,
  tower,
  callback,
});
//#endregion

//#region [Succeeded Action]
export type GetNOCAccountSucceeded = {
  type: typeof actionTypes.GET_NOC_ACCOUNTS_SUCCEEDED;
  result: NOCAccountsResponse;
};

export const getNOCAccountSucceeded = (result: NOCAccountsResponse): GetNOCAccountSucceeded => ({
  type: actionTypes.GET_NOC_ACCOUNTS_SUCCEEDED,
  result,
});

//#endregion

//#region [Failed Action]
export type GetNOCAccountFailed = {
  type: typeof actionTypes.GET_NOC_ACCOUNTS_FAILED;
  error?: string;
};

export const getNOCAccountFailed = (error?: string): GetNOCAccountFailed => ({
  type: actionTypes.GET_NOC_ACCOUNTS_FAILED,
  error,
});
//#endregion

//#region [Failed Action]
export type GetNOCAccountReset = {
  type: typeof actionTypes.GET_NOC_ACCOUNTS_RESET;
};

export const getNOCAccountReset = (): GetNOCAccountReset => ({
  type: actionTypes.GET_NOC_ACCOUNTS_RESET,
});
//#endregion

// Payment-verification
//#region [Requested Action]
export type PaymentVerificationRequested = {
  type: typeof actionTypes.PAYMENT_VERIFICATION_REQUESTED;
  bankDetails: BankDetailsType[];
  lenderDetails: LenderDetails[];
  ledgerType: string;
  ledger: File;
  bankStatement: File[];
  callback?: (success: boolean, message?: string) => void;
};

export const paymentVerificationRequested = (
  bankDetails: BankDetailsType[],
  lenderDetails: LenderDetails[],
  ledgerType: string,
  ledger: File,
  bankStatement: File[],
  callback?: (success: boolean, message?: string) => void,
): PaymentVerificationRequested => ({
  type: actionTypes.PAYMENT_VERIFICATION_REQUESTED,
  bankDetails,
  lenderDetails,
  ledgerType,
  ledger,
  bankStatement,
  callback,
});
//#endregion

//#region [Succeeded Action]
export type PaymentVerificationSucceeded = {
  type: typeof actionTypes.PAYMENT_VERIFICATION_SUCCEEDED;
  result: PaymentVerificationResponse;
};

export const paymentVerificationSucceeded = (result: PaymentVerificationResponse): PaymentVerificationSucceeded => ({
  type: actionTypes.PAYMENT_VERIFICATION_SUCCEEDED,
  result,
});

//#endregion

//#region [Failed Action]
export type PaymentVerificationFailed = {
  type: typeof actionTypes.PAYMENT_VERIFICATION_FAILED;
  error?: string;
};

export const paymentVerificationFailed = (error?: string): PaymentVerificationFailed => ({
  type: actionTypes.PAYMENT_VERIFICATION_FAILED,
  error,
});
//#endregion

//#region [Reset Action]
export type PaymentVerificationReset = {
  type: typeof actionTypes.PAYMENT_VERIFICATION_RESET;
};

export const paymentVerificationReset = (): PaymentVerificationReset => ({
  type: actionTypes.PAYMENT_VERIFICATION_RESET,
});
//#endregion

// Add-external-NOC
//#region [Requested Action]
export type AddExternalNOCRequested = {
  type: typeof actionTypes.ADD_EXTERNAL_NOC_REQUESTED;
  formData: CreateExternalNOCData;
  callback?: (success: boolean, message?: string) => void;
};

export const createExternalNOCRequested = (
  formData: CreateExternalNOCData,
  callback?: (success: boolean, message?: string) => void,
): AddExternalNOCRequested => ({
  type: actionTypes.ADD_EXTERNAL_NOC_REQUESTED,
  formData,
  callback,
});
//#endregion

//#region [Succeeded Action]
export type AddExternalNOCSucceeded = {
  type: typeof actionTypes.ADD_EXTERNAL_NOC_SUCCEEDED;
  result: CreateExternalNOCResponse;
};

export const createExternalNOCSucceeded = (result: CreateExternalNOCResponse): AddExternalNOCSucceeded => ({
  type: actionTypes.ADD_EXTERNAL_NOC_SUCCEEDED,
  result,
});

//#endregion

//#region [Failed Action]
export type AddExternalNOCFailed = {
  type: typeof actionTypes.ADD_EXTERNAL_NOC_FAILED;
  error?: string;
};

export const createExternalNOCFailed = (error?: string): AddExternalNOCFailed => ({
  type: actionTypes.ADD_EXTERNAL_NOC_FAILED,
  error,
});
//#endregion

export const EXTERNAL_NOC_NON_SERIALIZABLE = [];

export type ExternalNOCActions =
  // noc-type
  | GetNOCTypeRequested
  | GetNOCTypeSucceeded
  | GetNOCTypeFailed
  | GetNOCTypeReset

  // sales-unit-for-noc
  | GetSalesUnitForNOCRequested
  | GetSalesUnitForNOCSucceeded
  | GetSalesUnitForNOCFailed
  | GetSalesUnitForNOCReset

  // sales-unit-price-header
  | GetSalesUnitPriceHeaderRequested
  | GetSalesUnitPriceHeaderSucceeded
  | GetSalesUnitPriceHeaderFailed

  // noc-price-header
  | GetNOCPriceHeaderRequested
  | GetNOCPriceHeaderSucceeded
  | GetNOCPriceHeaderFailed
  | GetNOCPriceHeaderReset

  // noc-accounts
  | GetNOCAccountRequested
  | GetNOCAccountSucceeded
  | GetNOCAccountFailed
  | GetNOCAccountReset

  // payment-verification
  | PaymentVerificationRequested
  | PaymentVerificationSucceeded
  | PaymentVerificationFailed
  | PaymentVerificationReset

  // External-NOC
  | AddExternalNOCRequested
  | AddExternalNOCSucceeded
  | AddExternalNOCFailed;
