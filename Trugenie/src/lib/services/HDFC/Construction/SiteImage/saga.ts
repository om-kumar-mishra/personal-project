import { call, put, select, takeLeading } from "redux-saga/effects";
import * as actionTypes from "./types";
import { selectAccessToken } from "../../../hdfc_login/selectors";
import {
  SiteVisitPendingImagesTableResponse,
  UpdateConstructionSiteImageStatusResponse,
  ConstructionPastSiteVisitImagesResponse,
  UploadConstructionModuleSiteImagesResponse,
  CanAddSiteVisitImagesResponse,
  ViewSiteImagesResponse,
  SiteVisitApprovalTableResponse,
  SiteVisitPastUpdateTableResponse,
} from "./dataTypes";
import { handelReponseCode, handleDownloadResponseCheck } from "../../../../../modules/Components/UtilityFunctions";
import {
  GetSiteVisitPendingImagesTableRequestedType,
  GetSiteVisitPendingImagesTableSucceeded,
  GetSiteVisitPendingImagesTableSucceededType,
  GetSiteVisitPendingImagesTableFailed,
  UpdateConstructionSiteImageStatusRequestedType,
  UpdateConstructionSiteImageStatusSucceededType,
  UpdateConstructionSiteImageStatusFailed,
  UpdateConstructionSiteImageStatusSucceeded,
  GetConstructionPastSiteVisitImagesFailed,
  GetConstructionPastSiteVisitImagesRequestedType,
  GetConstructionPastSiteVisitImagesSucceeded,
  GetConstructionPastSiteVisitImagesSucceededType,
  UploadConstructionModuleSiteImagesRequestedType,
  UploadConstructionModuleSiteImagesSucceededType,
  UploadConstructionModuleSiteImagesSucceeded,
  UploadConstructionModuleSiteImagesFailed,
  CanAddSiteVisitImagesRequestedType,
  CanAddSiteVisitImagesFailed,
  CanAddSiteVisitImagesSucceeded,
  CanAddSiteVisitImagesSucceededType,
  CanViewImagesFailed,
  CanViewImagesRequestedType,
  CanViewImagesSucceeded,
  CanViewImagesSucceededType,
  SiteVisitApprovalTableFailed,
  SiteVisitApprovalTableRequestedType,
  SiteVisitApprovalTableSucceeded,
  SiteVisitApprovalTableSucceededType,
  SiteVisitPastUpdateTableFailed,
  SiteVisitPastUpdateTableRequestedType,
  SiteVisitPastUpdateTableSucceeded,
  SiteVisitPastUpdateTableSucceededType,
  UploadSiteImageUpdateFailed,
  UploadSiteImageUpdateRequestedType,
  UploadSiteImageUpdateSucceeded,
  UploadSiteImageUpdateSucceededType,
  OnUploadImagePopupValidateFailed,
  OnUploadImagePopupValidateRequestedType,
  OnUploadImagePopupValidateSucceeded,
  OnUploadImagePopupValidateSucceededType,
  PastUpdateTableDownloadButtonFailed,
  PastUpdateTableDownloadButtonRequestedType,
  PastUpdateTableDownloadButtonSucceeded,
  PastUpdateTableDownloadButtonSucceededType
} from "./actions";
import { successNotification } from "../../../../../utils/notifications";
import {
  getSiteVisitPendingImagesTableAPI,
  updateConstructionSiteImageStatusAPI,
  getConstructionPastSiteVisitImagesAPI,
  uploadConstructionModuleSiteImagesAPI,
  canAddSiteVisitImagesAPI,
  canViewImagesAPI,
  getSiteVisitApprovalTableAPI,
  getSiteVisitPastUpdateTableAPI,
  UploadSiteImageUpdateAPI,
  OnUploadImagePopupValidateAPI,
  pastUpdateTableDownloadButtonAPI
} from "./api";
// import { GetSummaryPastHistoryListSucceeded. } from "../../Summary/actions";


function* handleFetchSiteVisitPendingImagesTable(action: GetSiteVisitPendingImagesTableRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: SiteVisitPendingImagesTableResponse = yield call(getSiteVisitPendingImagesTableAPI, accessToken, action.reAssetId, action.createdBy);
    const { isError } = handelReponseCode(undefined, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: GetSiteVisitPendingImagesTableSucceededType = yield call(GetSiteVisitPendingImagesTableSucceeded, response.data);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(GetSiteVisitPendingImagesTableFailed());
  }
}

function* handleUpdateConstructionSiteImageStatus(action: UpdateConstructionSiteImageStatusRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: UpdateConstructionSiteImageStatusResponse = yield call(updateConstructionSiteImageStatusAPI, accessToken, action.payload);
    const { isError } = handelReponseCode(action.callback, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: UpdateConstructionSiteImageStatusSucceededType = yield call(UpdateConstructionSiteImageStatusSucceeded, response);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(UpdateConstructionSiteImageStatusFailed());
  }
}

function* handleFetchConstructionPastSiteVisitImages(action: GetConstructionPastSiteVisitImagesRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: ConstructionPastSiteVisitImagesResponse = yield call(getConstructionPastSiteVisitImagesAPI, accessToken, action.reAssetId, action.createdBy);
    const { isError } = handelReponseCode(action.callback, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: GetConstructionPastSiteVisitImagesSucceededType = yield call(GetConstructionPastSiteVisitImagesSucceeded, response.data);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(GetConstructionPastSiteVisitImagesFailed());
  }
}

function* handleUploadconstructionModuleSiteImages(action: UploadConstructionModuleSiteImagesRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: UploadConstructionModuleSiteImagesResponse = yield call(uploadConstructionModuleSiteImagesAPI, accessToken, action.payload);
    const { isError } = handelReponseCode(action.callback, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: UploadConstructionModuleSiteImagesSucceededType = yield call(UploadConstructionModuleSiteImagesSucceeded, response);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(UploadConstructionModuleSiteImagesFailed());
  }
}

function* handleCanAddSiteVisitImages(action: CanAddSiteVisitImagesRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: CanAddSiteVisitImagesResponse = yield call(canAddSiteVisitImagesAPI, accessToken, action.reAssetId, action.createdBy);
    const { isError } = handelReponseCode(action.callback, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: CanAddSiteVisitImagesSucceededType = yield call(CanAddSiteVisitImagesSucceeded, response?.data?.[0]);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(CanAddSiteVisitImagesFailed());
  }
}

// Setup


function* handleCanViewImages(action: CanViewImagesRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: ViewSiteImagesResponse = yield call(canViewImagesAPI, accessToken, action.reAssetId, action.type);
    const { isError } = handelReponseCode(undefined, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: CanViewImagesSucceededType = yield call(CanViewImagesSucceeded, response.data);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(CanViewImagesFailed());
  }
}

function* handleSiteVisitApprovalTable(action: SiteVisitApprovalTableRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: SiteVisitApprovalTableResponse = yield call(getSiteVisitApprovalTableAPI, accessToken, action.reAssetId, action.createdBy);
    const { isError } = handelReponseCode(undefined, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: SiteVisitApprovalTableSucceededType = yield call(SiteVisitApprovalTableSucceeded, response.data);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(SiteVisitApprovalTableFailed());
  }
}

function* handleSiteVisitPastUpdateTable(action: SiteVisitPastUpdateTableRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: SiteVisitPastUpdateTableResponse = yield call(getSiteVisitPastUpdateTableAPI, accessToken, action.reAssetId, action.createdBy);
    const { isError } = handelReponseCode(undefined, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: SiteVisitPastUpdateTableSucceededType = yield call(SiteVisitPastUpdateTableSucceeded, response.data);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(SiteVisitPastUpdateTableFailed());
  }
}

function* handleUploadSiteImageUpdate(action: UploadSiteImageUpdateRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response = yield call(UploadSiteImageUpdateAPI, accessToken, action.payload);
    const { isError } = handelReponseCode(undefined, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: UploadSiteImageUpdateSucceededType = yield call(UploadSiteImageUpdateSucceeded, response.data);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(UploadSiteImageUpdateFailed());
  }
}

function* handleOnUploadImagePopupValidate(action: OnUploadImagePopupValidateRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response = yield call(OnUploadImagePopupValidateAPI, accessToken, action.reAssetId, action.createdBy);
    const { isError } = handelReponseCode(undefined, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: OnUploadImagePopupValidateSucceededType = yield call(OnUploadImagePopupValidateSucceeded, response.data);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(OnUploadImagePopupValidateFailed());
  }
}

function* handlePastUpdateTableDownloadButton(action: PastUpdateTableDownloadButtonRequestedType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response = yield call(pastUpdateTableDownloadButtonAPI, accessToken, action.siteImageHistoryId);
    const { isError } = handelReponseCode(undefined, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: PastUpdateTableDownloadButtonSucceededType = yield call(PastUpdateTableDownloadButtonSucceeded, response.data);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(PastUpdateTableDownloadButtonFailed());
  }
}

function* siteImageSaga() {
  yield takeLeading(actionTypes.GET_SITE_VISIT_PENDING_IMAGES_TABLE_REQUESTED, handleFetchSiteVisitPendingImagesTable);
  yield takeLeading(actionTypes.UPDATE_CONSTRUCTION_SITE_IMAGE_STATUS_REQUESTED, handleUpdateConstructionSiteImageStatus);
  yield takeLeading(actionTypes.GET_CONSTRUCTION_PAST_SITE_VISIT_IMAGES_REQUESTED, handleFetchConstructionPastSiteVisitImages);
  yield takeLeading(actionTypes.INSERT_CONSTRUCTION_MODULE_SITE_IMAGES_REQUESTED, handleUploadconstructionModuleSiteImages);
  yield takeLeading(actionTypes.CAN_ADD_SITE_VISIT_IMAGES_REQUESTED, handleCanAddSiteVisitImages);

  //Set-up
  yield takeLeading(actionTypes.CAN_VIEW_SITE_IMAGES_REQUESTED, handleCanViewImages);
  yield takeLeading(actionTypes.SITE_VISIT_APPROVAL_TABLE_REQUESTED, handleSiteVisitApprovalTable);
  yield takeLeading(actionTypes.SITE_VISIT_PAST_UPDATE_TABLE_REQUESTED, handleSiteVisitPastUpdateTable);
  yield takeLeading(actionTypes.UPLOAD_SITE_IMAGE_UPDATE_REQUESTED, handleUploadSiteImageUpdate);
  yield takeLeading(actionTypes.ONUPLOAD_IMAGE_POPUP_VALIDATE_REQUESTED, handleOnUploadImagePopupValidate);
  yield takeLeading(actionTypes.PAST_UPDATE_TABLE_DOWNLOAD_BUTTON_REQUESTED, handlePastUpdateTableDownloadButton);
}

export default siteImageSaga;
