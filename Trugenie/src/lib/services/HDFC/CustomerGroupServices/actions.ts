import { CustomerGroupList } from "./dataTypes";
import * as types from "./types";

//----------------------------------Get Group List----------------------------------

export type GetCustomerGroupTypeRequested = {
  type: typeof types.GET_CUSTOMER_GROUP_LIST_REQUESTED;
  client: number;
};

export const getCustomerGroupListRequested = (client: number): GetCustomerGroupTypeRequested => ({
  type: types.GET_CUSTOMER_GROUP_LIST_REQUESTED,
  client,
});

export type GetCustomerGroupTypeSucceeded = {
  type: typeof types.GET_CUSTOMER_GROUP_LIST_SUCCEEDED;
  customerGroupList: CustomerGroupList;
};

export const getCustomerGroupListSucceeded = (customerGroupList: CustomerGroupList): GetCustomerGroupTypeSucceeded => ({
  type: types.GET_CUSTOMER_GROUP_LIST_SUCCEEDED,
  customerGroupList,
});

export type GetCustomerGroupTypeFailed = {
  type: typeof types.GET_CUSTOMER_GROUP_LIST_FAILED;
  error: string;
};

export const getCustomerGroupListFailed = (error: string): GetCustomerGroupTypeFailed => ({
  type: types.GET_CUSTOMER_GROUP_LIST_FAILED,
  error,
});

//----------------------------------Add Group----------------------------------

export type AddCustomerGroupTypeRequested = {
  type: typeof types.ADD_CUSTOMER_GROUP_REQUESTED;
  createdBy: string,
  customerName: string,
  clientId: number,
  groupHeadOffice: string,
  onSuccessCallback?: (success: boolean, message?: string) => void;
};

export const addCustomerGroupRequested = (
  createdBy: string,
  customerName: string,
  clientId: number,
  groupHeadOffice: string,

  onSuccessCallback?: (success: boolean, message?: string) => void,
): AddCustomerGroupTypeRequested => ({
  type: types.ADD_CUSTOMER_GROUP_REQUESTED,
  customerName,
  createdBy,
  clientId,
  groupHeadOffice,
  onSuccessCallback,
});

export type AddCustomerGroupTypeSucceeded = {
  type: typeof types.ADD_CUSTOMER_GROUP_SUCCEEDED;
};

export const addCustomerGroupSucceeded = (): AddCustomerGroupTypeSucceeded => ({
  type: types.ADD_CUSTOMER_GROUP_SUCCEEDED,
});

export type AddCustomerGroupTypeFailed = {
  type: typeof types.ADD_CUSTOMER_GROUP_FAILED;
};

export const addCustomerGroupFailed = (): AddCustomerGroupTypeFailed => ({
  type: types.ADD_CUSTOMER_GROUP_FAILED,
});

//----------------------------------Edit Group----------------------------------

export type EditCustomerGroupTypeRequested = {
  type: typeof types.EDIT_CUSTOMER_GROUP_REQUESTED;
  developerId: number;
  customerName: string;
  createdBy: string;
  remark: string;
  developerLocation: string;
  onSuccessCallback?: (success: boolean, message?: string) => void;
};

export const editCustomerGroupRequested = (
  developerId: number,
  customerName: string,
  createdBy: string,
  remark: string,
  developerLocation: string,
  onSuccessCallback?: (success: boolean, message?: string) => void,
): EditCustomerGroupTypeRequested => ({
  type: types.EDIT_CUSTOMER_GROUP_REQUESTED,
  developerId,
  customerName,
  createdBy,
  remark,
  developerLocation,
  onSuccessCallback,
});

export type EditCustomerGroupTypeSucceeded = {
  type: typeof types.EDIT_CUSTOMER_GROUP_SUCCEEDED;
};

export const editCustomerGroupSucceeded = (): EditCustomerGroupTypeSucceeded => ({
  type: types.EDIT_CUSTOMER_GROUP_SUCCEEDED,
});

export type EditCustomerGroupTypeFailed = {
  type: typeof types.EDIT_CUSTOMER_GROUP_FAILED;
};

export const editCustomerGroupFailed = (): EditCustomerGroupTypeFailed => ({
  type: types.EDIT_CUSTOMER_GROUP_FAILED,
});

export type CustomerGroupListActions =
  | GetCustomerGroupTypeRequested
  | GetCustomerGroupTypeSucceeded
  | GetCustomerGroupTypeFailed
  | AddCustomerGroupTypeRequested
  | AddCustomerGroupTypeSucceeded
  | AddCustomerGroupTypeFailed
  | EditCustomerGroupTypeRequested
  | EditCustomerGroupTypeSucceeded
  | EditCustomerGroupTypeFailed;
