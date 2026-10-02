import {
  CalculateCashCoverResponse,
  CalculateCashCoverType,
  GetUpdateHoldStatusResponse,
  NOCProjectPrefrenceResponse,
  ReProjectExposureResponse,
  ReProjectSecurityResponse,
  UpdateAccountDelinquentResponse,
  UpdateHoldStatusResponse,
  UpdateNOCProjectCashCoverDetailsType,
  UpdateReProjectSecurityDetails,
} from "./dataTypes";
import * as PrefrenceTypes from "./types";

//#region [Update cashCover]
export type CashCoverUpdateRequestedAction = {
  type: typeof PrefrenceTypes.UPDATE_CASH_COVER_REQUESTED;
  data: UpdateNOCProjectCashCoverDetailsType;
  callback?: (success: boolean) => void;
};

export const cashCoverUpdateRequested = (data: UpdateNOCProjectCashCoverDetailsType, callback?: (success: boolean) => void): CashCoverUpdateRequestedAction => ({
  type: PrefrenceTypes.UPDATE_CASH_COVER_REQUESTED,
  data,
  callback,
});

export type CashCoverUpdateSucceededAction = {
  type: typeof PrefrenceTypes.UPDATE_CASH_COVER_SUCCESS;
  result: any;
};

export const cashCoverUpdateSucceeded = (result: any): CashCoverUpdateSucceededAction => ({
  type: PrefrenceTypes.UPDATE_CASH_COVER_SUCCESS,
  result,
});

export type cashCoverUpdateFailedAction = {
  type: typeof PrefrenceTypes.UPDATE_CASH_COVER_FAILED;
  error: unknown;
};

export const cashCoverUpdateFailed = (error: unknown): cashCoverUpdateFailedAction => ({
  type: PrefrenceTypes.UPDATE_CASH_COVER_FAILED,
  error,
});
//endregion [cashCover Update]

//#region [Update Reproject Security]
export type ReProjectSecurityUpdateRequestedAction = {
  type: typeof PrefrenceTypes.UPDATE_REPROJECT_SECURITY_REQUESTED;
  data: UpdateReProjectSecurityDetails;
  callback?: (success: boolean) => void;
};

export const reProjectSecurityUpdateRequested = (data: UpdateReProjectSecurityDetails, callback?: (success: boolean) => void): ReProjectSecurityUpdateRequestedAction => ({
  type: PrefrenceTypes.UPDATE_REPROJECT_SECURITY_REQUESTED,
  data,
  callback,
});

export type ReProjectSecurityUpdateSucceededAction = {
  type: typeof PrefrenceTypes.UPDATE_REPROJECT_SECURITY_SUCCESS;
  result: ReProjectSecurityResponse;
};

export const reProjectSecurityUpdateSucceeded = (result: ReProjectSecurityResponse): ReProjectSecurityUpdateSucceededAction => ({
  type: PrefrenceTypes.UPDATE_REPROJECT_SECURITY_SUCCESS,
  result,
});

export type ReProjectSecurityUpdateFailedAction = {
  type: typeof PrefrenceTypes.UPDATE_REPROJECT_SECURITY_FAILED;
  error: unknown;
};

export const ReprojectSecurityUpdateFailed = (error: unknown): ReProjectSecurityUpdateFailedAction => ({
  type: PrefrenceTypes.UPDATE_REPROJECT_SECURITY_FAILED,
  error,
});
//endregion [Reproject Security Update]

//#region [Calculate cashCover]
export type CashCoverCalculateRequestedAction = {
  type: typeof PrefrenceTypes.CALCULATE_CASH_COVER_REQUESTED;
  data: CalculateCashCoverType;
  callback?: (success: boolean) => void;
};

export const cashCoverCalculateRequested = (data: CalculateCashCoverType, callback?: (success: boolean) => void): CashCoverCalculateRequestedAction => ({
  type: PrefrenceTypes.CALCULATE_CASH_COVER_REQUESTED,
  data,
  callback,
});

export type CashCoverCalculateSucceededAction = {
  type: typeof PrefrenceTypes.CALCULATE_CASH_COVER_SUCCESS;
  result: CalculateCashCoverResponse;
};

export const cashCoverCalculateSucceeded = (result: CalculateCashCoverResponse): CashCoverCalculateSucceededAction => ({
  type: PrefrenceTypes.CALCULATE_CASH_COVER_SUCCESS,
  result,
});

export type cashCoverCalculateFailedAction = {
  type: typeof PrefrenceTypes.CALCULATE_CASH_COVER_FAILED;
  error: unknown;
};

export const cashCoverCalculateFailed = (error: unknown): cashCoverCalculateFailedAction => ({
  type: PrefrenceTypes.CALCULATE_CASH_COVER_FAILED,
  error,
});
//endregion [cashCover Calculate]

//#region [NOC Project Prefrence]
export type NOCProjectPrefrenceRequestedAction = {
  type: typeof PrefrenceTypes.NOC_PROJECT_PREFRENCE_REQUESTED;
  reAssetId: number;
  callback?: () => void;
};

export const nocProjectPrefrenceRequested = (reAssetId: number, callback?: () => void): NOCProjectPrefrenceRequestedAction => ({
  type: PrefrenceTypes.NOC_PROJECT_PREFRENCE_REQUESTED,
  reAssetId,
  callback,
});

export type NOCProjectPrefrenceSucceededAction = {
  type: typeof PrefrenceTypes.NOC_PROJECT_PREFRENCE_SUCCESS;
  result: NOCProjectPrefrenceResponse;
};

export const nocProjectPrefrenceSucceeded = (result: NOCProjectPrefrenceResponse): NOCProjectPrefrenceSucceededAction => ({
  type: PrefrenceTypes.NOC_PROJECT_PREFRENCE_SUCCESS,
  result,
});

export type NOCProjectPrefrenceFailedAction = {
  type: typeof PrefrenceTypes.NOC_PROJECT_PREFRENCE_FAILED;
  error: unknown;
};

export const NOCProjectPrefrenceFailed = (error: unknown): NOCProjectPrefrenceFailedAction => ({
  type: PrefrenceTypes.NOC_PROJECT_PREFRENCE_FAILED,
  error,
});
//endregion [NOC Project Prefrence]

//#region [ReProject Exposure]
export type ReProjectExposureRequestedAction = {
  type: typeof PrefrenceTypes.REPROJECT_EXPOSURE_REQUESTED;
  reAssetId: number;
  callback?: () => void;
};

export const reProjectExposureRequested = (reAssetId: number, callback?: () => void): ReProjectExposureRequestedAction => ({
  type: PrefrenceTypes.REPROJECT_EXPOSURE_REQUESTED,
  reAssetId,
  callback,
});

export type ReProjectExposureSucceededAction = {
  type: typeof PrefrenceTypes.REPROJECT_EXPOSURE_SUCCESS;
  result: ReProjectExposureResponse;
};

export const reProjectExposureSucceeded = (result: ReProjectExposureResponse): ReProjectExposureSucceededAction => ({
  type: PrefrenceTypes.REPROJECT_EXPOSURE_SUCCESS,
  result,
});

export type ReProjectExposureFailedAction = {
  type: typeof PrefrenceTypes.REPROJECT_EXPOSURE_FAILED;
  error: unknown;
};

export const reProjectExposureFailed = (error: unknown): ReProjectExposureFailedAction => ({
  type: PrefrenceTypes.REPROJECT_EXPOSURE_FAILED,
  error,
});
//endregion [ReProject Exposure]

//#region [ReProject Security]
export type ReProjectSecurityRequestedAction = {
  type: typeof PrefrenceTypes.REPROJECT_SECURITY_REQUESTED;
  reAssetId: number;
  callback?: () => void;
};

export const reProjectSecurityRequested = (reAssetId: number, callback?: () => void): ReProjectSecurityRequestedAction => ({
  type: PrefrenceTypes.REPROJECT_SECURITY_REQUESTED,
  reAssetId,
  callback,
});

export type ReProjectSecuritySucceededAction = {
  type: typeof PrefrenceTypes.REPROJECT_SECURITY_SUCCESS;
  result: ReProjectSecurityResponse;
};

export const reProjectSecuritySucceeded = (result: ReProjectSecurityResponse): ReProjectSecuritySucceededAction => ({
  type: PrefrenceTypes.REPROJECT_SECURITY_SUCCESS,
  result,
});

export type ReProjectSecurityFailedAction = {
  type: typeof PrefrenceTypes.REPROJECT_SECURITY_FAILED;
  error: unknown;
};

export const reProjectSecurityFailed = (error: unknown): ReProjectSecurityFailedAction => ({
  type: PrefrenceTypes.REPROJECT_SECURITY_FAILED,
  error,
});
//endregion [ReProject security]

//#region [Update AccountDelinquent]
export type AccountDelinquentUpdateRequestedAction = {
  type: typeof PrefrenceTypes.UPDATE_ACCOUNT_DELINQUENT_REQUESTED;
  reAssetId: number;
  value: string;
  misdate: string;
  callback?: (success: boolean) => void;
};

export const accountDelinquentUpdateRequested = (reAssetId: number, value: string, misdate: string, callback?: (success: boolean) => void): AccountDelinquentUpdateRequestedAction => ({
  type: PrefrenceTypes.UPDATE_ACCOUNT_DELINQUENT_REQUESTED,
  reAssetId,
  value,
  misdate,
  callback,
});

export type AccountDelinquentUpdateSucceededAction = {
  type: typeof PrefrenceTypes.UPDATE_ACCOUNT_DELINQUENT_SUCCESS;
  result: UpdateAccountDelinquentResponse;
};

export const accountDelinquentUpdateSucceeded = (result: UpdateAccountDelinquentResponse): AccountDelinquentUpdateSucceededAction => ({
  type: PrefrenceTypes.UPDATE_ACCOUNT_DELINQUENT_SUCCESS,
  result,
});

export type AccountDelinquentUpdateFailedAction = {
  type: typeof PrefrenceTypes.UPDATE_ACCOUNT_DELINQUENT_FAILED;
  error: unknown;
};

export const accountDelinquentUpdateFailed = (error: unknown): AccountDelinquentUpdateFailedAction => ({
  type: PrefrenceTypes.UPDATE_ACCOUNT_DELINQUENT_FAILED,
  error,
});
//endregion [AccountDelinquent Update]


//#region [Update HoldStatus]
export type UpdateHoldStatusRequestedAction = {
  type: typeof PrefrenceTypes.UPDATE_HOLD_STATUS_REQUESTED;
  ReAssetId: number,
  onHold: number,
  StateOndate: string,
  Remarks: string,
  createdBy: string,
  callback?: (success: boolean) => void;
};

export const updateHoldStatusRequested = (ReAssetId: number,
  onHold: number,
  StateOndate: string,
  Remarks: string,
  createdBy: string, callback?: (success: boolean) => void): UpdateHoldStatusRequestedAction => ({
    type: PrefrenceTypes.UPDATE_HOLD_STATUS_REQUESTED,
    ReAssetId, onHold, StateOndate, Remarks, createdBy,
    callback,
  });

export type UpdateHoldStatusSucceededAction = {
  type: typeof PrefrenceTypes.UPDATE_HOLD_STATUS_SUCCESS;
  result: UpdateHoldStatusResponse;
};

export const updateHoldStatusSucceeded = (result: UpdateHoldStatusResponse): UpdateHoldStatusSucceededAction => ({
  type: PrefrenceTypes.UPDATE_HOLD_STATUS_SUCCESS,
  result,
});

export type UpdateHoldStatusFailedAction = {
  type: typeof PrefrenceTypes.UPDATE_HOLD_STATUS_FAILED;
  error: unknown;
};

export const updateHoldStatusFailed = (error: unknown): UpdateHoldStatusFailedAction => ({
  type: PrefrenceTypes.UPDATE_HOLD_STATUS_FAILED,
  error,
});
//endregion [AccountDelinquent Update]

//#region [update hold status get Data]
export type GetUpdateHoldStatusRequestedAction = {
  type: typeof PrefrenceTypes.GET_UPDATE_HOLD_STATUS_REQUESTED;
  reAssetId: number;
  callback?: () => void;
};

export const getUpdateHoldStatusRequested = (reAssetId: number, callback?: () => void): GetUpdateHoldStatusRequestedAction => ({
  type: PrefrenceTypes.GET_UPDATE_HOLD_STATUS_REQUESTED,
  reAssetId,
  callback,
});

export type GetUpdateHoldStatusSucceededAction = {
  type: typeof PrefrenceTypes.GET_UPDATE_HOLD_STATUS_SUCCESS;
  result: GetUpdateHoldStatusResponse;
};

export const getUpdateHoldStatusSucceeded = (result: GetUpdateHoldStatusResponse): GetUpdateHoldStatusSucceededAction => ({
  type: PrefrenceTypes.GET_UPDATE_HOLD_STATUS_SUCCESS,
  result,
});

export type GetUpdateHoldStatusFailedAction = {
  type: typeof PrefrenceTypes.GET_UPDATE_HOLD_STATUS_FAILED;
  error: unknown;
};

export const getUpdateHoldStatusFailed = (error: unknown): GetUpdateHoldStatusFailedAction => ({
  type: PrefrenceTypes.GET_UPDATE_HOLD_STATUS_FAILED,
  error,
});
//endregion [update hold status get Data]
type PrefrencesActions =
  //#region [cash cover]
  | CashCoverUpdateRequestedAction
  | CashCoverUpdateSucceededAction
  | cashCoverUpdateFailedAction

  //#region [update reproject security]
  | ReProjectSecurityUpdateRequestedAction
  | ReProjectSecurityUpdateSucceededAction
  | ReProjectSecurityUpdateFailedAction

  //#region [cash cover calculate]
  | CashCoverCalculateRequestedAction
  | CashCoverCalculateSucceededAction
  | cashCoverCalculateFailedAction

  //#region [NOC Project Prefrence ]
  | NOCProjectPrefrenceRequestedAction
  | NOCProjectPrefrenceSucceededAction
  | NOCProjectPrefrenceFailedAction

  //#region [reproject exposure ]
  | ReProjectExposureRequestedAction
  | ReProjectExposureSucceededAction
  | ReProjectExposureFailedAction

  //#region [reproject security ]
  | ReProjectSecurityRequestedAction
  | ReProjectSecuritySucceededAction
  | ReProjectSecurityFailedAction

  //#region [update account delinquent]
  | AccountDelinquentUpdateRequestedAction
  | AccountDelinquentUpdateSucceededAction
  | AccountDelinquentUpdateFailedAction

  //#region [update Hold status]
  | UpdateHoldStatusRequestedAction
  | UpdateHoldStatusSucceededAction
  | UpdateHoldStatusFailedAction
  //#region [Get update Hold status]
  | GetUpdateHoldStatusRequestedAction
  | GetUpdateHoldStatusSucceededAction
  | GetUpdateHoldStatusFailedAction
  ;

export default PrefrencesActions;
