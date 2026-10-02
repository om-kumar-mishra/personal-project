import {
  SiteVisitPendingImagesTableData,
  UpdateConstructionSiteImageStatusPayload,
  UpdateConstructionSiteImageStatusResponse,
  ConstructionPastSiteVisitImagesData,
  UploadConstructionModuleSiteImagesPayload,
  UploadConstructionModuleSiteImagesResponse,
  CanAddSiteVisitImagesData,
  ViewSiteImagesData,
  UploadSiteImageUpdatePayload,
  UploadSiteImageUpdateResponse,
  SiteVisitApprovalTableData,
  SiteVisitPastUpdateTableData
} from "./dataTypes";
import * as actionTypes from "./types";


// ===================================Get Site Visit Pending Images Table================================================
//#region [PastHistory Requested]
export type GetSiteVisitPendingImagesTableRequestedType = {
  type: typeof actionTypes.GET_SITE_VISIT_PENDING_IMAGES_TABLE_REQUESTED;
  reAssetId: number;
  createdBy: string;
};

export const GetSiteVisitPendingImagesTableRequested = (reAssetId: number, createdBy: string): GetSiteVisitPendingImagesTableRequestedType => ({
  type: actionTypes.GET_SITE_VISIT_PENDING_IMAGES_TABLE_REQUESTED,
  reAssetId,
  createdBy,
});
//#endregion

//#region [PastHistory Succeeded]
export type GetSiteVisitPendingImagesTableSucceededType = {
  type: typeof actionTypes.GET_SITE_VISIT_PENDING_IMAGES_TABLE_SUCCEEDED;
  result: SiteVisitPendingImagesTableData[];
};

export const GetSiteVisitPendingImagesTableSucceeded = (result: SiteVisitPendingImagesTableData[]): GetSiteVisitPendingImagesTableSucceededType => ({
  type: actionTypes.GET_SITE_VISIT_PENDING_IMAGES_TABLE_SUCCEEDED,
  result,
});

//#endregion

//#region [PastHistory Failed]
export type GetSiteVisitPendingImagesTableFailedType = {
  type: typeof actionTypes.GET_SITE_VISIT_PENDING_IMAGES_TABLE_FAILED;
  error?: string;
};

export const GetSiteVisitPendingImagesTableFailed = (error?: string): GetSiteVisitPendingImagesTableFailedType => ({
  type: actionTypes.GET_SITE_VISIT_PENDING_IMAGES_TABLE_FAILED,
  error,
});
//#endregion

// =================================== Update Site Image Stattus ================================================
//#region [Update Requested]
export type UpdateConstructionSiteImageStatusRequestedType = {
  type: typeof actionTypes.UPDATE_CONSTRUCTION_SITE_IMAGE_STATUS_REQUESTED;
  payload: UpdateConstructionSiteImageStatusPayload;
  callback?: (success: boolean, message?: string) => void;
};

export const UpdateConstructionSiteImageStatusRequested = (
  payload: UpdateConstructionSiteImageStatusPayload,
  callback?: (success: boolean, message?: string) => void,
): UpdateConstructionSiteImageStatusRequestedType => ({
  type: actionTypes.UPDATE_CONSTRUCTION_SITE_IMAGE_STATUS_REQUESTED,
  payload,
  callback,
});
//#endregion [Update Requested]

//#region [Update Succeeded]
export type UpdateConstructionSiteImageStatusSucceededType = {
  type: typeof actionTypes.UPDATE_CONSTRUCTION_SITE_IMAGE_STATUS_SUCCEEDED;
  result: UpdateConstructionSiteImageStatusResponse;
};

export const UpdateConstructionSiteImageStatusSucceeded = (result: UpdateConstructionSiteImageStatusResponse): UpdateConstructionSiteImageStatusSucceededType => ({
  type: actionTypes.UPDATE_CONSTRUCTION_SITE_IMAGE_STATUS_SUCCEEDED,
  result,
});

//#endregion [Update Succeeded]

//#region [Update Failed]
export type UpdateConstructionSiteImageStatusFailedType = {
  type: typeof actionTypes.UPDATE_CONSTRUCTION_SITE_IMAGE_STATUS_FAILED;
  error?: string;
};

export const UpdateConstructionSiteImageStatusFailed = (error?: string): UpdateConstructionSiteImageStatusFailedType => ({
  type: actionTypes.UPDATE_CONSTRUCTION_SITE_IMAGE_STATUS_FAILED,
  error,
});
//#endregion [Update Failed]

// ===================================Get Past Update================================================
//#region [PastHistory Requested]
export type GetConstructionPastSiteVisitImagesRequestedType = {
  type: typeof actionTypes.GET_CONSTRUCTION_PAST_SITE_VISIT_IMAGES_REQUESTED;
  reAssetId: number;
  createdBy: string;
  callback?: (success:boolean) => void
};

export const GetConstructionPastSiteVisitImagesRequested = (reAssetId: number, createdBy: string, callback?: (success:boolean) => void): GetConstructionPastSiteVisitImagesRequestedType => ({
  type: actionTypes.GET_CONSTRUCTION_PAST_SITE_VISIT_IMAGES_REQUESTED,
  reAssetId,
  createdBy,
  callback,
});
//#endregion

//#region [PastHistory Succeeded]
export type GetConstructionPastSiteVisitImagesSucceededType = {
  type: typeof actionTypes.GET_CONSTRUCTION_PAST_SITE_VISIT_IMAGES_SUCCEEDED;
  result: ConstructionPastSiteVisitImagesData[];
};

export const GetConstructionPastSiteVisitImagesSucceeded = (result: ConstructionPastSiteVisitImagesData[]): GetConstructionPastSiteVisitImagesSucceededType => ({
  type: actionTypes.GET_CONSTRUCTION_PAST_SITE_VISIT_IMAGES_SUCCEEDED,
  result,
});

//#endregion

//#region [PastHistory Failed]
export type GetConstructionPastSiteVisitImagesFailedType = {
  type: typeof actionTypes.GET_CONSTRUCTION_PAST_SITE_VISIT_IMAGES_FAILED;
  error?: string;
};

export const GetConstructionPastSiteVisitImagesFailed = (error?: string): GetConstructionPastSiteVisitImagesFailedType => ({
  type: actionTypes.GET_CONSTRUCTION_PAST_SITE_VISIT_IMAGES_FAILED,
  error,
});
//#endregion

// =================================== Upload Construction Module SiteImages ================================================
//#region [Upload setup Requested]
export type UploadConstructionModuleSiteImagesRequestedType = {
  type: typeof actionTypes.INSERT_CONSTRUCTION_MODULE_SITE_IMAGES_REQUESTED;
  payload: UploadConstructionModuleSiteImagesPayload;
  callback?: (success: boolean, message?: string) => void;
};

export const UploadConstructionModuleSiteImagesRequested = (
  payload: UploadConstructionModuleSiteImagesPayload,
  callback?: (success: boolean, message?: string) => void,
): UploadConstructionModuleSiteImagesRequestedType => ({
  type: actionTypes.INSERT_CONSTRUCTION_MODULE_SITE_IMAGES_REQUESTED,
  payload,
  callback,
});
//#endregion [Upload setup Requested]

//#region [Upload setup Succeeded]
export type UploadConstructionModuleSiteImagesSucceededType = {
  type: typeof actionTypes.INSERT_CONSTRUCTION_MODULE_SITE_IMAGES_SUCCEEDED;
  result: UploadConstructionModuleSiteImagesResponse;
};

export const UploadConstructionModuleSiteImagesSucceeded = (
  result: UploadConstructionModuleSiteImagesResponse,
): UploadConstructionModuleSiteImagesSucceededType => ({
  type: actionTypes.INSERT_CONSTRUCTION_MODULE_SITE_IMAGES_SUCCEEDED,
  result,
});

//#endregion [Upload setup Succeeded]

// //#region [Upload setup Failed]
export type UploadConstructionModuleSiteImagesFailedType = {
  type: typeof actionTypes.INSERT_CONSTRUCTION_MODULE_SITE_IMAGES_FAILED;
  error?: string;
};

export const UploadConstructionModuleSiteImagesFailed = (error?: string): UploadConstructionModuleSiteImagesFailedType => ({
  type: actionTypes.INSERT_CONSTRUCTION_MODULE_SITE_IMAGES_FAILED,
  error,
});
//#endregion [Upload setup Failed]

// =================================== Can Add SiteVisit Images ================================================
//#region [Can Setup Requested]
export type CanAddSiteVisitImagesRequestedType = {
  type: typeof actionTypes.CAN_ADD_SITE_VISIT_IMAGES_REQUESTED;
  reAssetId: number;
  createdBy: string,
  callback?: (success: boolean, message?: string) => void;
};

export const CanAddSiteVisitImagesRequested = (
  reAssetId: number,
  createdBy: string,
  callback?: (success: boolean, message?: string) => void,
): CanAddSiteVisitImagesRequestedType => ({
  type: actionTypes.CAN_ADD_SITE_VISIT_IMAGES_REQUESTED,
  reAssetId,
  createdBy,
  callback,
});
//#endregion [Requested]

//#region [Can Setup Succeeded]
export type CanAddSiteVisitImagesSucceededType = {
  type: typeof actionTypes.CAN_ADD_SITE_VISIT_IMAGES_SUCCEEDED;
  result: CanAddSiteVisitImagesData;
};

export const CanAddSiteVisitImagesSucceeded = (result: CanAddSiteVisitImagesData): CanAddSiteVisitImagesSucceededType => ({
  type: actionTypes.CAN_ADD_SITE_VISIT_IMAGES_SUCCEEDED,
  result,
});

//#endregion [Succeeded]

//#region [Can Setup Failed]
export type CanAddSiteVisitImagesFailedType = {
  type: typeof actionTypes.CAN_ADD_SITE_VISIT_IMAGES_FAILED;
  error?: string;
};

export const CanAddSiteVisitImagesFailed = (error?: string): CanAddSiteVisitImagesFailedType => ({
  type: actionTypes.CAN_ADD_SITE_VISIT_IMAGES_FAILED,
  error,
});
//#endregion [Can Setup Failed]

//-------------------------------------Setup Approve--------------------------------------------

// ===================================Can View Images================================================
//#region [Can View Images Requested]
export type CanViewImagesRequestedType = {
  type: typeof actionTypes.CAN_VIEW_SITE_IMAGES_REQUESTED;
  reAssetId: number;
  Type: string;
};

export const CanViewImagesRequested = (reAssetId: number, Type: string): CanViewImagesRequestedType => ({
  type: actionTypes.CAN_VIEW_SITE_IMAGES_REQUESTED,
  reAssetId,
  Type,
});
//#endregion

//#region [CanViewImages Succeeded]
export type CanViewImagesSucceededType = {
  type: typeof actionTypes.CAN_VIEW_SITE_IMAGES_SUCCEEDED;
  result: ViewSiteImagesData[];
};

export const CanViewImagesSucceeded = (result: ViewSiteImagesData[]): CanViewImagesSucceededType => ({
  type: actionTypes.CAN_VIEW_SITE_IMAGES_SUCCEEDED,
  result,
});

//#endregion

//#region [CanViewImages Failed]
export type CanViewImagesFailedType = {
  type: typeof actionTypes.CAN_VIEW_SITE_IMAGES_FAILED;
  error?: string;
};

export const CanViewImagesFailed = (error?: string): CanViewImagesFailedType => ({
  type: actionTypes.CAN_VIEW_SITE_IMAGES_FAILED,
  error,
});
//#endregion

//-----------------------------------------Site Visit Approval Table----------------------------------------------------------

//#region [Site Visit Approval Table Requested]
export type SiteVisitApprovalTableRequestedType = {
  type: typeof actionTypes.SITE_VISIT_APPROVAL_TABLE_REQUESTED;
  reAssetId: number;
  createdBy: string;
};

export const SiteVisitApprovalTableRequested = (reAssetId: number, createdBy: string): SiteVisitApprovalTableRequestedType => ({
  type: actionTypes.SITE_VISIT_APPROVAL_TABLE_REQUESTED,
  reAssetId,
  createdBy,
});
//#endregion

//#region [SiteVisitApprovalTable Succeeded]
export type SiteVisitApprovalTableSucceededType = {
  type: typeof actionTypes.SITE_VISIT_APPROVAL_TABLE_SUCCEEDED;
  result: SiteVisitApprovalTableData[];
};

export const SiteVisitApprovalTableSucceeded = (result: SiteVisitApprovalTableData[]): SiteVisitApprovalTableSucceededType => ({
  type: actionTypes.SITE_VISIT_APPROVAL_TABLE_SUCCEEDED,
  result,
});

//#endregion

//#region [SiteVisitApprovalTable Failed]
export type SiteVisitApprovalTableFailedType = {
  type: typeof actionTypes.SITE_VISIT_APPROVAL_TABLE_FAILED;
  error?: string;
};

export const SiteVisitApprovalTableFailed = (error?: string): SiteVisitApprovalTableFailedType => ({
  type: actionTypes.SITE_VISIT_APPROVAL_TABLE_FAILED,
  error,
});
//#endregion

//-----------------------------------------Site Visit Past Update Table----------------------------------------------------------

//#region [Site Visit Past Update Table Requested]
export type SiteVisitPastUpdateTableRequestedType = {
  type: typeof actionTypes.SITE_VISIT_PAST_UPDATE_TABLE_REQUESTED;
  reAssetId: number;
  createdBy: string;
};

export const SiteVisitPastUpdateTableRequested = (reAssetId: number, createdBy: string): SiteVisitPastUpdateTableRequestedType => ({
  type: actionTypes.SITE_VISIT_PAST_UPDATE_TABLE_REQUESTED,
  reAssetId,
  createdBy,
});
//#endregion

//#region [Site Visit Past Update Table Succeeded]
export type SiteVisitPastUpdateTableSucceededType = {
  type: typeof actionTypes.SITE_VISIT_PAST_UPDATE_TABLE_SUCCEEDED;
  result: SiteVisitPastUpdateTableData[];
};

export const SiteVisitPastUpdateTableSucceeded = (result: SiteVisitPastUpdateTableData[]): SiteVisitPastUpdateTableSucceededType => ({
  type: actionTypes.SITE_VISIT_PAST_UPDATE_TABLE_SUCCEEDED,
  result,
});

//#endregion

//#region [Site Visit Past Update Table Failed]
export type SiteVisitPastUpdateTableFailedType = {
  type: typeof actionTypes.SITE_VISIT_PAST_UPDATE_TABLE_FAILED;
  error?: string;
};

export const SiteVisitPastUpdateTableFailed = (error?: string): SiteVisitPastUpdateTableFailedType => ({
  type: actionTypes.SITE_VISIT_PAST_UPDATE_TABLE_FAILED,
  error,
});
//#endregion

// =================================== Upload Site image Update ================================================
//#region [Upload Site image Update Requested]
export type UploadSiteImageUpdateRequestedType = {
  type: typeof actionTypes.UPLOAD_SITE_IMAGE_UPDATE_REQUESTED;
  payload: UploadSiteImageUpdatePayload;
  callback?: (success: boolean, message?: string) => void;
};

export const UploadSiteImageUpdateRequested = (
  payload: UploadSiteImageUpdatePayload,
  callback?: (success: boolean, message?: string) => void,
): UploadSiteImageUpdateRequestedType => ({
  type: actionTypes.UPLOAD_SITE_IMAGE_UPDATE_REQUESTED,
  payload,
  callback,
});
//#endregion [Upload Site image Update Requested]

//#region [Upload Site image Update Succeeded]
export type UploadSiteImageUpdateSucceededType = {
  type: typeof actionTypes.UPLOAD_SITE_IMAGE_UPDATE_SUCCEEDED;
  result: UploadSiteImageUpdateResponse;
};

export const UploadSiteImageUpdateSucceeded = (
  result: UploadSiteImageUpdateResponse,
): UploadSiteImageUpdateSucceededType => ({
  type: actionTypes.UPLOAD_SITE_IMAGE_UPDATE_SUCCEEDED,
  result,
});

//#endregion [Upload Site image Update Succeeded]

// //#region [Upload Site image Update Failed]
export type UploadSiteImageUpdateFailedType = {
  type: typeof actionTypes.UPLOAD_SITE_IMAGE_UPDATE_FAILED;
  error?: string;
};

export const UploadSiteImageUpdateFailed = (error?: string): UploadSiteImageUpdateFailedType => ({
  type: actionTypes.UPLOAD_SITE_IMAGE_UPDATE_FAILED,
  error,
});
//#endregion [Upload Site image Update Failed]



//-----------------------------------------OnUpload image popup validate----------------------------------------------------------

//#region [OnUpload image popup validate Requested]
export type OnUploadImagePopupValidateRequestedType = {
  type: typeof actionTypes.ONUPLOAD_IMAGE_POPUP_VALIDATE_REQUESTED;
  reAssetId: number;
  createdBy: string;
};

export const OnUploadImagePopupValidateRequested = (reAssetId: number, createdBy: string): OnUploadImagePopupValidateRequestedType => ({
  type: actionTypes.ONUPLOAD_IMAGE_POPUP_VALIDATE_REQUESTED,
  reAssetId,
  createdBy,
});
//#endregion

//#region [OnUpload image popup validate Succeeded]
export type OnUploadImagePopupValidateSucceededType = {
  type: typeof actionTypes.ONUPLOAD_IMAGE_POPUP_VALIDATE_SUCCEEDED;
  result: any[];
};

export const OnUploadImagePopupValidateSucceeded = (result: any[]): OnUploadImagePopupValidateSucceededType => ({
  type: actionTypes.ONUPLOAD_IMAGE_POPUP_VALIDATE_SUCCEEDED,
  result,
});

//#endregion

//#region [OnUpload image popup validate Failed]
export type OnUploadImagePopupValidateFailedType = {
  type: typeof actionTypes.ONUPLOAD_IMAGE_POPUP_VALIDATE_FAILED;
  error?: string;
};

export const OnUploadImagePopupValidateFailed = (error?: string): OnUploadImagePopupValidateFailedType => ({
  type: actionTypes.ONUPLOAD_IMAGE_POPUP_VALIDATE_FAILED,
  error,
});
//#endregion

//------------------------------------ Past update table download button--------------------------

//#region [Past update table download button Requested]
export type PastUpdateTableDownloadButtonRequestedType = {
  type: typeof actionTypes.PAST_UPDATE_TABLE_DOWNLOAD_BUTTON_REQUESTED;
  siteImageHistoryId: number;
};

export const PastUpdateTableDownloadButtonRequested = (siteImageHistoryId: number): PastUpdateTableDownloadButtonRequestedType => ({
  type: actionTypes.PAST_UPDATE_TABLE_DOWNLOAD_BUTTON_REQUESTED,
  siteImageHistoryId,
});
//#endregion

//#region [Past update table download button Succeeded]
export type PastUpdateTableDownloadButtonSucceededType = {
  type: typeof actionTypes.PAST_UPDATE_TABLE_DOWNLOAD_BUTTON_SUCCEEDED;
  result: any[];
};

export const PastUpdateTableDownloadButtonSucceeded = (result: any[]): PastUpdateTableDownloadButtonSucceededType => ({
  type: actionTypes.PAST_UPDATE_TABLE_DOWNLOAD_BUTTON_SUCCEEDED,
  result,
});

//#endregion

//#region [Past update table download button Failed]
export type PastUpdateTableDownloadButtonFailedType = {
  type: typeof actionTypes.PAST_UPDATE_TABLE_DOWNLOAD_BUTTON_FAILED;
  error?: string;
};

export const PastUpdateTableDownloadButtonFailed = (error?: string): PastUpdateTableDownloadButtonFailedType => ({
  type: actionTypes.PAST_UPDATE_TABLE_DOWNLOAD_BUTTON_FAILED,
  error,
});
//#endregion

export type SiteImageActions =
  // SiteVisit Pending Images Table
  | GetSiteVisitPendingImagesTableRequestedType
  | GetSiteVisitPendingImagesTableSucceededType
  | GetSiteVisitPendingImagesTableFailedType

  // update Site Image status
  | UpdateConstructionSiteImageStatusRequestedType
  | UpdateConstructionSiteImageStatusSucceededType
  | UpdateConstructionSiteImageStatusFailedType

  // Construction Past Site Visit Images
  | GetConstructionPastSiteVisitImagesRequestedType
  | GetConstructionPastSiteVisitImagesSucceededType
  | GetConstructionPastSiteVisitImagesFailedType

  // upload Construction Module SiteImages
  | UploadConstructionModuleSiteImagesRequestedType
  | UploadConstructionModuleSiteImagesSucceededType
  | UploadConstructionModuleSiteImagesFailedType

  // can Update
  | CanAddSiteVisitImagesRequestedType
  | CanAddSiteVisitImagesSucceededType
  | CanAddSiteVisitImagesFailedType

  // Can View Images
  | CanViewImagesRequestedType
  | CanViewImagesSucceededType
  | CanViewImagesFailedType

  //Site Visit Approval Table
  | SiteVisitApprovalTableRequestedType
  | SiteVisitApprovalTableSucceededType
  | SiteVisitApprovalTableFailedType

  //Site Visit Past Update Table
  | SiteVisitPastUpdateTableRequestedType
  | SiteVisitPastUpdateTableSucceededType
  | SiteVisitPastUpdateTableFailedType

  // Upload Site image Update 
  | UploadSiteImageUpdateRequestedType
  | UploadSiteImageUpdateSucceededType
  | UploadSiteImageUpdateFailedType

  // OnUpload Image Popup Validate 
  | OnUploadImagePopupValidateRequestedType
  | OnUploadImagePopupValidateSucceededType
  | OnUploadImagePopupValidateFailedType

  // Past update table download button
  | PastUpdateTableDownloadButtonRequestedType
  | PastUpdateTableDownloadButtonSucceededType
  | PastUpdateTableDownloadButtonFailedType;

