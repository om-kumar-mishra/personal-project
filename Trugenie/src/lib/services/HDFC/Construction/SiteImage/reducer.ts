import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
import { storageKeys } from "../../../../../utils/constants";
import * as actionTypes from "./types";
import { SiteImageActions } from "./actions";
import {
  SiteVisitPendingImagesTableData,
  UpdateConstructionSiteImageStatusResponse,
  ConstructionPastSiteVisitImagesData,
  UploadConstructionModuleSiteImagesResponse,
  CanAddSiteVisitImagesData,
  ViewSiteImagesData,
  SiteVisitApprovalTableData,
  SiteVisitPastUpdateTableData

} from "./dataTypes";

type SiteImageState = {
  siteVisitPendingImagesTable: SiteVisitPendingImagesTableData[];
  updateConstructionSiteImageStatus?: UpdateConstructionSiteImageStatusResponse;
  constructionPastSiteVisitImages: ConstructionPastSiteVisitImagesData[];
  constructionModuleSiteImages?: UploadConstructionModuleSiteImagesResponse;
  canAddSiteVisitImages?: CanAddSiteVisitImagesData;
  canViewImages?: ViewSiteImagesData[];
  siteVisitApprovalTable?: SiteVisitApprovalTableData[];
  siteVisitPastUpdateTable?: SiteVisitPastUpdateTableData[];
  uploadSiteImageUpdate?: any;
  onUploadImagePopupValidate?: any;
  pastUpdateTableDownloadButton?: any;
  loader: {
    siteVisitPendingImagesTable: boolean;
    updateConstructionSiteImageStatus: boolean;
    constructionPastSiteVisitImages: boolean;
    constructionModuleSiteImages: boolean;
    canAddSiteVisitImages: boolean,
    canViewImages: boolean,
    siteVisitApprovalTable: boolean,
    siteVisitPastUpdateTable: boolean,
    uploadSiteImageUpdate: boolean,
    onUploadImagePopupValidate: boolean,
    pastUpdateTableDownloadButton: boolean,
  };
};

const initialState: SiteImageState = {
  siteVisitPendingImagesTable: [],
  updateConstructionSiteImageStatus: undefined,
  constructionPastSiteVisitImages: [],
  constructionModuleSiteImages: undefined,
  canAddSiteVisitImages: undefined,
  canViewImages: [],
  siteVisitApprovalTable: [],
  siteVisitPastUpdateTable: [],
  uploadSiteImageUpdate: undefined,
  onUploadImagePopupValidate: undefined,
  pastUpdateTableDownloadButton: undefined,
  loader: {
    siteVisitPendingImagesTable: false,
    updateConstructionSiteImageStatus: false,
    constructionPastSiteVisitImages: false,
    constructionModuleSiteImages: false,
    canAddSiteVisitImages: false,
    canViewImages: false,
    siteVisitApprovalTable: false,
    siteVisitPastUpdateTable: false,
    uploadSiteImageUpdate: false,
    onUploadImagePopupValidate: false,
    pastUpdateTableDownloadButton: false,
  },
};

const siteImageReducer = (state: SiteImageState = initialState, action: SiteImageActions): SiteImageState => {
  switch (action.type) {
    // sales-past-history
    case actionTypes.GET_SITE_VISIT_PENDING_IMAGES_TABLE_REQUESTED:
      return {
        ...state,
        siteVisitPendingImagesTable: [],
        loader: {
          ...state.loader,
          siteVisitPendingImagesTable: true,
        },
      };
    case actionTypes.GET_SITE_VISIT_PENDING_IMAGES_TABLE_SUCCEEDED:
      return {
        ...state,
        siteVisitPendingImagesTable: action.result,
        loader: {
          ...state.loader,
          siteVisitPendingImagesTable: false,
        },
      };
    case actionTypes.UPDATE_CONSTRUCTION_SITE_IMAGE_STATUS_REQUESTED:
      return {
        ...state,
        updateConstructionSiteImageStatus: undefined,
        loader: {
          ...state.loader,
          updateConstructionSiteImageStatus: true,
        },
      };
    case actionTypes.UPDATE_CONSTRUCTION_SITE_IMAGE_STATUS_SUCCEEDED:
      return {
        ...state,
        updateConstructionSiteImageStatus: action.result,
        loader: {
          ...state.loader,
          updateConstructionSiteImageStatus: false,
        },
      };
    case actionTypes.UPDATE_CONSTRUCTION_SITE_IMAGE_STATUS_FAILED:
      return {
        ...state,
        updateConstructionSiteImageStatus: undefined,
        loader: {
          ...state.loader,
          updateConstructionSiteImageStatus: false,
        },
      };
    case actionTypes.GET_CONSTRUCTION_PAST_SITE_VISIT_IMAGES_REQUESTED:
      return {
        ...state,
        constructionPastSiteVisitImages: [],
        loader: {
          ...state.loader,
          constructionPastSiteVisitImages: true,
        },
      };
    case actionTypes.GET_CONSTRUCTION_PAST_SITE_VISIT_IMAGES_SUCCEEDED:
      return {
        ...state,
        constructionPastSiteVisitImages: action.result,
        loader: {
          ...state.loader,
          constructionPastSiteVisitImages: false,
        },
      };
    case actionTypes.GET_CONSTRUCTION_PAST_SITE_VISIT_IMAGES_FAILED:
      return {
        ...state,
        constructionPastSiteVisitImages: [],
        loader: {
          ...state.loader,
          constructionPastSiteVisitImages: false,
        },
      };
    case actionTypes.INSERT_CONSTRUCTION_MODULE_SITE_IMAGES_REQUESTED:
      return {
        ...state,
        constructionModuleSiteImages: undefined,
        loader: {
          ...state.loader,
          constructionModuleSiteImages: true,
        },
      };
    case actionTypes.INSERT_CONSTRUCTION_MODULE_SITE_IMAGES_SUCCEEDED:
      return {
        ...state,
        constructionModuleSiteImages: action.result,
        loader: {
          ...state.loader,
          constructionModuleSiteImages: false,
        },
      };
    case actionTypes.INSERT_CONSTRUCTION_MODULE_SITE_IMAGES_FAILED:
      return {
        ...state,
        constructionModuleSiteImages: undefined,
        loader: {
          ...state.loader,
          constructionModuleSiteImages: false,
        },
      };
    case actionTypes.CAN_ADD_SITE_VISIT_IMAGES_REQUESTED:
      return {
        ...state,
        canAddSiteVisitImages: undefined,
        loader: {
          ...state.loader,
          canAddSiteVisitImages: true,
        },
      };
    case actionTypes.CAN_ADD_SITE_VISIT_IMAGES_SUCCEEDED:
      return {
        ...state,
        canAddSiteVisitImages: action.result,
        loader: {
          ...state.loader,
          canAddSiteVisitImages: false,
        },
      };
    case actionTypes.CAN_ADD_SITE_VISIT_IMAGES_FAILED:
      return {
        ...state,
        canAddSiteVisitImages: undefined,
        loader: {
          ...state.loader,
          canAddSiteVisitImages: false,
        },
      };

    // can View Site Images
    case actionTypes.CAN_VIEW_SITE_IMAGES_REQUESTED:
      return {
        ...state,
        canViewImages: [],
        loader: {
          ...state.loader,
          canViewImages: true,
        },
      };
    case actionTypes.CAN_VIEW_SITE_IMAGES_SUCCEEDED:
      return {
        ...state,
        canViewImages: action.result,
        loader: {
          ...state.loader,
          canViewImages: false,
        },
      };
    case actionTypes.CAN_VIEW_SITE_IMAGES_FAILED:
      return {
        ...state,
        canViewImages: [],
        loader: {
          ...state.loader,
          canViewImages: false,
        },
      };
    // site Visit Approval Table
    case actionTypes.SITE_VISIT_APPROVAL_TABLE_REQUESTED:
      return {
        ...state,
        siteVisitApprovalTable: [],
        loader: {
          ...state.loader,
          siteVisitApprovalTable: true,
        },
      };
    case actionTypes.SITE_VISIT_APPROVAL_TABLE_SUCCEEDED:
      return {
        ...state,
        siteVisitApprovalTable: action.result,
        loader: {
          ...state.loader,
          siteVisitApprovalTable: false,
        },
      };
    case actionTypes.SITE_VISIT_APPROVAL_TABLE_FAILED:
      return {
        ...state,
        siteVisitApprovalTable: [],
        loader: {
          ...state.loader,
          siteVisitApprovalTable: false,
        },
      };
    // site Visit Past Update Table
    case actionTypes.SITE_VISIT_PAST_UPDATE_TABLE_REQUESTED:
      return {
        ...state,
        siteVisitPastUpdateTable: [],
        loader: {
          ...state.loader,
          siteVisitPastUpdateTable: true,
        },
      };
    case actionTypes.SITE_VISIT_PAST_UPDATE_TABLE_SUCCEEDED:
      return {
        ...state,
        siteVisitPastUpdateTable: action.result,
        loader: {
          ...state.loader,
          siteVisitPastUpdateTable: false,
        },
      };
    case actionTypes.SITE_VISIT_PAST_UPDATE_TABLE_FAILED:
      return {
        ...state,
        siteVisitPastUpdateTable: [],
        loader: {
          ...state.loader,
          siteVisitPastUpdateTable: false,
        },
      };

    // upload Site Image Update
    case actionTypes.UPLOAD_SITE_IMAGE_UPDATE_REQUESTED:
      return {
        ...state,
        uploadSiteImageUpdate: undefined,
        loader: {
          ...state.loader,
          uploadSiteImageUpdate: true,
        },
      };
    case actionTypes.UPLOAD_SITE_IMAGE_UPDATE_SUCCEEDED:
      return {
        ...state,
        uploadSiteImageUpdate: action.result,
        loader: {
          ...state.loader,
          uploadSiteImageUpdate: false,
        },
      };
    case actionTypes.UPLOAD_SITE_IMAGE_UPDATE_FAILED:
      return {
        ...state,
        uploadSiteImageUpdate: undefined,
        loader: {
          ...state.loader,
          uploadSiteImageUpdate: false,
        },
      };

    // on Upload Image Popup Validate
    case actionTypes.ONUPLOAD_IMAGE_POPUP_VALIDATE_REQUESTED:
      return {
        ...state,
        onUploadImagePopupValidate: undefined,
        loader: {
          ...state.loader,
          onUploadImagePopupValidate: true,
        },
      };
    case actionTypes.ONUPLOAD_IMAGE_POPUP_VALIDATE_SUCCEEDED:
      return {
        ...state,
        onUploadImagePopupValidate: action.result,
        loader: {
          ...state.loader,
          onUploadImagePopupValidate: false,
        },
      };
    case actionTypes.ONUPLOAD_IMAGE_POPUP_VALIDATE_FAILED:
      return {
        ...state,
        onUploadImagePopupValidate: undefined,
        loader: {
          ...state.loader,
          onUploadImagePopupValidate: false,
        },
      };

    // can View Site Images
    case actionTypes.PAST_UPDATE_TABLE_DOWNLOAD_BUTTON_REQUESTED:
      return {
        ...state,
        pastUpdateTableDownloadButton: undefined,
        loader: {
          ...state.loader,
          pastUpdateTableDownloadButton: true,
        },
      };
    case actionTypes.PAST_UPDATE_TABLE_DOWNLOAD_BUTTON_SUCCEEDED:
      return {
        ...state,
        pastUpdateTableDownloadButton: action.result,
        loader: {
          ...state.loader,
          pastUpdateTableDownloadButton: false,
        },
      };
    case actionTypes.PAST_UPDATE_TABLE_DOWNLOAD_BUTTON_FAILED:
      return {
        ...state,
        pastUpdateTableDownloadButton: undefined,
        loader: {
          ...state.loader,
          pastUpdateTableDownloadButton: false,
        },
      };

    default:
      return state;
  }
};
const config = {
  storage,
  key: storageKeys.summary,
  blacklist: ["loader"], // topic will not be persisted
};

export default persistReducer(config, siteImageReducer);
// export default summaryReducer;
