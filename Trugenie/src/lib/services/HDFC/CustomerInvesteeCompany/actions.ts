import { CustomerInvesteeListDataType, FilteredInvesteeGroup } from "./dataTypes";
import * as types from "./types";

//----------------------------------Get Customer Investee List----------------------------------

export type GetCustomerInvesteeTypeRequested = {
  type: typeof types.GET_CUSTOMER_INVESTEE_LIST_REQUESTED;
  client: number;
  useremail: string;
};

export const getCustomerInvesteeListRequested = (client: number, useremail: string): GetCustomerInvesteeTypeRequested => ({
  type: types.GET_CUSTOMER_INVESTEE_LIST_REQUESTED,
  client,
  useremail,
});

export type GetCustomerInvesteeTypeSucceeded = {
  type: typeof types.GET_CUSTOMER_INVESTEE_LIST_SUCCEEDED;
  customerInvesteeList: CustomerInvesteeListDataType[];
};

export const getCustomerInvesteeListSucceeded = (customerInvesteeList: CustomerInvesteeListDataType[]): GetCustomerInvesteeTypeSucceeded => ({
  type: types.GET_CUSTOMER_INVESTEE_LIST_SUCCEEDED,
  customerInvesteeList,
});

export type GetCustomerInvesteeTypeFailed = {
  type: typeof types.GET_CUSTOMER_INVESTEE_LIST_FAILED;
  error: string;
};

export const getCustomerInvesteeListFailed = (error: string): GetCustomerInvesteeTypeFailed => ({
  type: types.GET_CUSTOMER_INVESTEE_LIST_FAILED,
  error,
});
//----------------------------------Add Customer Investee----------------------------------

export type AddCustomerInvesteeTypeRequested = {
  type: typeof types.ADD_CUSTOMER_INVESTEE_REQUESTED;
  emailId: string;
  borrowername: string;
  cin: string;
  clientId: number;
  DeveloperID: number;
  createdby: string;
  gst: string;
  pan: string;
  address: string;
  onSuccessCallback?: (success: boolean) => void;
};

export const addCustomerInvesteeRequested = (
  emailId: string,
  borrowername: string,
  cin: string,
  clientId: number,
  DeveloperID: number,
  createdby: string,
  gst: string,
  pan: string,
  address: string,
  onSuccessCallback?: (success: boolean) => void,
): AddCustomerInvesteeTypeRequested => ({
  type: types.ADD_CUSTOMER_INVESTEE_REQUESTED,
  emailId,
  borrowername,
  cin,
  clientId,
  DeveloperID,
  createdby,
  gst,
  pan,
  address,
  onSuccessCallback,
});

export type AddCustomerInvesteeTypeSucceeded = {
  type: typeof types.ADD_CUSTOMER_INVESTEE_SUCCEEDED;
};

export const addCustomerInvesteeSucceeded = (): AddCustomerInvesteeTypeSucceeded => ({
  type: types.ADD_CUSTOMER_INVESTEE_SUCCEEDED,
});

export type AddCustomerInvesteeTypeFailed = {
  type: typeof types.ADD_CUSTOMER_INVESTEE_FAILED;
};

export const addCustomerInvesteeFailed = (): AddCustomerInvesteeTypeFailed => ({
  type: types.ADD_CUSTOMER_INVESTEE_FAILED,
});

//----------------------------------Edit Customer Investee----------------------------------

export type EditCustomerInvesteeTypeRequested = {
  type: typeof types.EDIT_CUSTOMER_INVESTEE_REQUESTED;
  borrowerDetailId: number;
  borrowerName: string;
  cin: string;
  createdby: string;
  gst: string;
  pan: string;
  address: string;
  remark: string;
  onSuccessCallback?: (success: boolean, message?: string) => void;
};

export const editCustomerInvesteeRequested = (
  borrowerDetailId: number,
  borrowerName: string,
  cin: string,
  createdby: string,
  gst: string,
  pan: string,
  address: string,
  remark: string,
  onSuccessCallback?: (success: boolean, message?: string) => void,
): EditCustomerInvesteeTypeRequested => ({
  type: types.EDIT_CUSTOMER_INVESTEE_REQUESTED,
  borrowerDetailId,
  borrowerName,
  cin,
  createdby,
  gst,
  pan,
  address,
  remark,
  onSuccessCallback,
});

export type EditCustomerInvesteeTypeSucceeded = {
  type: typeof types.EDIT_CUSTOMER_INVESTEE_SUCCEEDED;
};

export const editCustomerInvesteeSucceeded = (): EditCustomerInvesteeTypeSucceeded => ({
  type: types.EDIT_CUSTOMER_INVESTEE_SUCCEEDED,
});

export type EditCustomerInvesteeTypeFailed = {
  type: typeof types.EDIT_CUSTOMER_INVESTEE_FAILED;
};

export const editCustomerInvesteeFailed = (): EditCustomerInvesteeTypeFailed => ({
  type: types.EDIT_CUSTOMER_INVESTEE_FAILED,
});

//----------------------------------View Customer Investee----------------------------------

export type ViewCustomerInvesteeTypeRequested = {
  type: typeof types.VIEW_CUSTOMER_INVESTEE_REQUESTED;
  developerId: number;
  createdby: string;
  onSuccessCallback?: (success: boolean) => void;
};

export const viewCustomerInvesteeRequested = (
  developerId: number,
  createdby: string,
  onSuccessCallback?: (success: boolean) => void,
): ViewCustomerInvesteeTypeRequested => ({
  type: types.VIEW_CUSTOMER_INVESTEE_REQUESTED,
  developerId,
  createdby,
  onSuccessCallback,
});

export type ViewCustomerInvesteeTypeSucceeded = {
  type: typeof types.VIEW_CUSTOMER_INVESTEE_SUCCEEDED;
};

export const viewCustomerInvesteeSucceeded = (): ViewCustomerInvesteeTypeSucceeded => ({
  type: types.VIEW_CUSTOMER_INVESTEE_SUCCEEDED,
});

export type ViewCustomerInvesteeTypeFailed = {
  type: typeof types.VIEW_CUSTOMER_INVESTEE_FAILED;
};

export const viewCustomerInvesteeFailed = (): ViewCustomerInvesteeTypeFailed => ({
  type: types.VIEW_CUSTOMER_INVESTEE_FAILED,
});

//-----------------------------------------Filter Customer Investee----------------------------------

export type GetFilteredInvesteeListTypeRequested = {
  type: typeof types.GET_FILTERED_INVESTEE_LIST_REQUESTED;
  DeveloperId: number;
  createdby: string;
};

export const getFilteredInvesteeListRequested = (DeveloperId: number, createdby: string): GetFilteredInvesteeListTypeRequested => ({
  type: types.GET_FILTERED_INVESTEE_LIST_REQUESTED,
  DeveloperId,
  createdby,
});

export type GetFilteredInvesteeListTypeSucceeded = {
  type: typeof types.GET_FILTERED_INVESTEE_LIST_SUCCEEDED;
  customerInvesteeList: FilteredInvesteeGroup[];
};

export const getFilteredInvesteeListSucceeded = (customerInvesteeList: FilteredInvesteeGroup[]): GetFilteredInvesteeListTypeSucceeded => ({
  type: types.GET_FILTERED_INVESTEE_LIST_SUCCEEDED,
  customerInvesteeList,
});

export type GetFilteredInvesteeListTypeFailed = {
  type: typeof types.GET_FILTERED_INVESTEE_LIST_FAILED;
  error: string;
};

export const getFilteredInvesteeListFailed = (error: string): GetFilteredInvesteeListTypeFailed => ({
  type: types.GET_FILTERED_INVESTEE_LIST_FAILED,
  error,
});

export type ResetFilteredInvesteeListType = {
  type: typeof types.RESET_FILTERED_INVESTEE_LIST;
};

export const resetFilteredInvesteeList = (): ResetFilteredInvesteeListType => ({
  type: types.RESET_FILTERED_INVESTEE_LIST,
});

export type CustomerInvesteeListActions =
  | GetCustomerInvesteeTypeRequested
  | GetCustomerInvesteeTypeSucceeded
  | GetCustomerInvesteeTypeFailed
  | AddCustomerInvesteeTypeRequested
  | AddCustomerInvesteeTypeSucceeded
  | AddCustomerInvesteeTypeFailed
  | EditCustomerInvesteeTypeRequested
  | EditCustomerInvesteeTypeSucceeded
  | EditCustomerInvesteeTypeFailed
  | ViewCustomerInvesteeTypeRequested
  | ViewCustomerInvesteeTypeSucceeded
  | ViewCustomerInvesteeTypeFailed
  | GetFilteredInvesteeListTypeRequested
  | GetFilteredInvesteeListTypeSucceeded
  | GetFilteredInvesteeListTypeFailed
  | ResetFilteredInvesteeListType;
