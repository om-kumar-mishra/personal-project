
import { InvestmentDataResponseType, InvestmentSummaryAsOnResponseType } from "./dataTypes";
import * as types from "./types";

//--------------------------------------Fetch Investment Data Start----------------------------------------

export type InvestmentDataRequestAction = {
  type: typeof types.INVESTMENT_DATA_REQUEST;
  // clientID: string;
  emailID: string;
  investmentID: string;
  summaryAsOn: string;
};
export const investmentDataRequest = (
  // clientID: string,
  emailID: string,
  investmentID: string,
  summaryAsOn: string
): InvestmentDataRequestAction => ({
  type: types.INVESTMENT_DATA_REQUEST,
  // clientID,
  emailID,
  investmentID,
  summaryAsOn,
});

export type InvestmentDataSuccessAction = {
  type: typeof types.INVESTMENT_DATA_SUCCESS;
  payload: InvestmentDataResponseType;
};
export const investmentDataSuccess = (
  payload: InvestmentDataResponseType
): InvestmentDataSuccessAction => ({
  type: types.INVESTMENT_DATA_SUCCESS,
  payload,
});

export type InvestmentDataFailureAction = {
  type: typeof types.INVESTMENT_DATA_FAILURE;
};
export const investmentDataFailed = (): InvestmentDataFailureAction => ({
  type: types.INVESTMENT_DATA_FAILURE,
});

//--------------------------------------Fetch Investment Data End----------------------------------------

//--------------------------------------Fetch Investment Data Summary As On Start----------------------------------------

export type InvestmentDataSummaryAsOnRequestAction = {
  type: typeof types.INVESTMENT_DATA_SUMMARY_AS_ON_REQUESTED;
  investmentId: number;
};

export const investmentDataSummaryAsOnRequest = (
  investmentId: number
): InvestmentDataSummaryAsOnRequestAction => ({
  type: types.INVESTMENT_DATA_SUMMARY_AS_ON_REQUESTED,
  investmentId,
});

export type InvestmentDataSummaryAsOnSuccessAction = {
  type: typeof types.INVESTMENT_DATA_SUMMARY_AS_ON_SUCCESS;
  payload: InvestmentSummaryAsOnResponseType;
};

export const investmentDataSummaryAsOnSuccess = (
  payload: InvestmentSummaryAsOnResponseType
): InvestmentDataSummaryAsOnSuccessAction => ({
  type: types.INVESTMENT_DATA_SUMMARY_AS_ON_SUCCESS,
  payload,
});

export type InvestmentDataSummaryAsOnFailureAction = {
  type: typeof types.INVESTMENT_DATA_SUMMARY_AS_ON_FAILURE;
};

export const investmentDataSummaryAsOnFailed =
  (): InvestmentDataSummaryAsOnFailureAction => ({
    type: types.INVESTMENT_DATA_SUMMARY_AS_ON_FAILURE,
  });

//--------------------------------------Fetch Investment Data Summary As On End----------------------------------------

export type InvestmnentDataActions =
  | InvestmentDataRequestAction
  | InvestmentDataSuccessAction
  | InvestmentDataFailureAction

  //Investment summary as on
  | InvestmentDataSummaryAsOnRequestAction
  | InvestmentDataSummaryAsOnSuccessAction
  | InvestmentDataSummaryAsOnFailureAction;
