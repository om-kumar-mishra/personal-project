import {
  BuisnessPlanList,
  
  MisdatesFilters,
} from "./dataTypes";
import * as types from "./types";
export type GetBuisnessPlanListRequestAction = {
  type: typeof types.GET_BUISNESS_PLAN_LIST_REQUEST;
  reassetid: number;
  misDate: string;
};
export const fetchBuisnessPlanListRequest = (
  reassetid: number,
  misDate: string
): GetBuisnessPlanListRequestAction => ({
  type: types.GET_BUISNESS_PLAN_LIST_REQUEST,
  reassetid,
  misDate,
});

export type GetBuisnessPlanListSuccessAction = {
  type: typeof types.GET_BUISNESS_PLAN_LIST_SUCCESS;
  payload: BuisnessPlanList;
};
export const fetchBuisnessPlanListSuccess = (
  payload: BuisnessPlanList
): GetBuisnessPlanListSuccessAction => ({
  type: types.GET_BUISNESS_PLAN_LIST_SUCCESS,
  payload,
});

export type GetBuisnessPlanListFailureAction = {
  type: typeof types.GET_BUISNESS_PLAN_LIST_FAILURE;
};
export const fetchBuisnessPlanListFailed =
  (): GetBuisnessPlanListFailureAction => ({
    type: types.GET_BUISNESS_PLAN_LIST_FAILURE,
  });

// misdates select box filters
export type GetMisdatesFiltersRequestAction = {
  type: typeof types.GET_MISDATE_CASHFLOW_LIST_REQUEST;
  reassetid: number;
};
export const fetchMisdatesFiltersRequested = (
  reassetid: number
): GetMisdatesFiltersRequestAction => ({
  type: types.GET_MISDATE_CASHFLOW_LIST_REQUEST,
  reassetid,
});
// Get MIS DATES filters Succeded
export type GetMisdatesFiltersSucceeded = {
  type: typeof types.GET_MISDATE_CASHFLOW_LIST_SUCCESS;
  result: MisdatesFilters;
};
export const fetchMisdatesFiltersSucceeded = (
  result: MisdatesFilters
): GetMisdatesFiltersSucceeded => ({
  type: types.GET_MISDATE_CASHFLOW_LIST_SUCCESS,
  result,
});
// Get MIS DATES filters failed
export type GetMisdatesFiltersFailed = {
  type: typeof types.GET_MISDATE_CASHFLOW_LIST_FAILURE;
  error?: unknown;
};
export const GetMisdatesFailed = (
  error?: unknown
): GetMisdatesFiltersFailed => ({
  type: types.GET_MISDATE_CASHFLOW_LIST_FAILURE,
  error,
});
//#endregion

export type CashflowDataActions =
  // buisness plan and underwritten
  | GetBuisnessPlanListRequestAction
  | GetBuisnessPlanListSuccessAction
  | GetBuisnessPlanListFailureAction


  // misdates filters
  | GetMisdatesFiltersRequestAction
  | GetMisdatesFiltersSucceeded
  | GetMisdatesFiltersFailed;
