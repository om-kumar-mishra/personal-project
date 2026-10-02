import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
import { storageKeys } from "../../../../utils/constants";
import { NOCManageRequestAction } from "./actions";
import {
  ApprovedDataType,
  CancelledDataType,
  GetDecisionDataResponse,
  HoldDataType,
  NOCDocumentReturnType,
  NOCPaymentDetailsResponse,
  NOCPriceHeadersResponseData,
  NOCProjectDetails,
  NOCRemarksReturnType,
  NOCRequestRemarks,
  NocDeveloperDocRef,
  NocRequestChangeHistory,
  NocRequestTimeline,
  NocSendBackUsers,
  PendingNOCDataType,
  RejectedDataType,
  SendAuthorizeNocResponse,
} from "./dataTypes";
import * as types from "./types";

type ManageRequestReducer = {
  approvedNOCList: ApprovedDataType[] | null;
  cancelledNOCList: CancelledDataType[] | null;
  pendingNOCList: PendingNOCDataType[] | null;
  rejectedNOCList: RejectedDataType[] | null;
  holdNOCList: HoldDataType[] | null;
  nocProjectDetails: any;
  nocPaymentDetails: NOCPaymentDetailsResponse[] | null;
  nocRemarksData: NOCRemarksReturnType[] | null;
  nocDocumentsData: NOCDocumentReturnType[] | null;
  decisionGetData: GetDecisionDataResponse | null;
  nocPriceHeaders: NOCPriceHeadersResponseData[] | null;
  sendBackUsers: NocSendBackUsers[] | null;
  authorizeNoc?: SendAuthorizeNocResponse;
  authorizeNocNew?: SendAuthorizeNocResponse;
  nocRequestRemarks?: NOCRequestRemarks[];
  nocRequestTimeline?: NocRequestTimeline[];
  nocRequestChangeHistory: NocRequestChangeHistory[] | null;
  nocDeveloperDocRef: NocDeveloperDocRef[] | null;
  getNOCProjectDetails?: NOCProjectDetails;
  loaders: {
    getApprovedNOCList: boolean;
    getCancelledNOCList: boolean;
    getPendingNOCList: boolean;
    getRejectedNOCList: boolean;
    getHoldNOCList: boolean;
    getNOCProjectDetails: boolean;
    downloadRejectedNOC: boolean;
    downloadCancelledNOC: boolean;
    downloadApprovedNOC: boolean;
    downloadPendingNOC: boolean;
    downloadHoldNOC: boolean;
    downloadNocSummary: boolean;
    getNocPaymentDetails: boolean;
    submitNocPayment: boolean;
    getNocRemarks: boolean;
    submitNocRemarks: boolean;
    getNocDocuments: boolean;
    getDecisionData: boolean;
    getNocPriceHeaders: boolean;
    sendBackUsers: boolean;
    nocLetter: boolean;
    authorizeNoc: boolean;
    authorizeNocNew: boolean;
    nocRequestRemarks: boolean;
    nocRequestTimeline: boolean;
    nocRequestChangeHistory: boolean;
    nocDeveloperDocRef: boolean;
  };
};

const initialState: ManageRequestReducer = {
  approvedNOCList: null,
  cancelledNOCList: null,
  pendingNOCList: null,
  rejectedNOCList: null,
  holdNOCList: null,
  nocProjectDetails: null,
  nocPaymentDetails: null,
  nocRemarksData: null,
  nocDocumentsData: null,
  decisionGetData: null,
  nocPriceHeaders: null,
  sendBackUsers: null,
  authorizeNoc: undefined,
  authorizeNocNew: undefined,
  nocRequestRemarks: undefined,
  nocRequestTimeline: undefined,
  getNOCProjectDetails: undefined,
  nocRequestChangeHistory: null,
  nocDeveloperDocRef: null,
  loaders: {
    getApprovedNOCList: false,
    getCancelledNOCList: false,
    getPendingNOCList: false,
    getRejectedNOCList: false,
    getHoldNOCList: false,
    getNOCProjectDetails: false,
    downloadRejectedNOC: false,
    downloadCancelledNOC: false,
    downloadApprovedNOC: false,
    downloadPendingNOC: false,
    downloadHoldNOC: false,
    downloadNocSummary: false,
    getNocPaymentDetails: false,
    submitNocPayment: false,
    getNocRemarks: false,
    submitNocRemarks: false,
    getNocDocuments: false,
    getDecisionData: false,
    getNocPriceHeaders: false,
    sendBackUsers: false,
    nocLetter: false,
    authorizeNoc: false,
    authorizeNocNew: false,
    nocRequestRemarks: false,
    nocRequestTimeline: false,
    nocRequestChangeHistory: false,
    nocDeveloperDocRef: false,
  },
};

const manageRequestReducer = (state: ManageRequestReducer = initialState, action: NOCManageRequestAction): ManageRequestReducer => {
  switch (action.type) {
    case types.GET_NOC_APPROVED_REQUESTED:
      return {
        ...state,
        approvedNOCList: null,
        loaders: {
          ...state.loaders,
          getApprovedNOCList: true,
        },
      };

    case types.GET_NOC_APPROVED_SUCCESSFUL:
      return {
        ...state,
        approvedNOCList: action.data,
        loaders: {
          ...state.loaders,
          getApprovedNOCList: false,
        },
      };

    case types.GET_NOC_APPROVED_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          getApprovedNOCList: false,
        },
      };
    // download noc approved loader
    case types.DOWNLOAD_APPROVED_NOC_REQUESTED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          downloadApprovedNOC: true,
        },
      };

    case types.DOWNLOAD_APPROVED_NOC_SUCCESSFUL:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          downloadApprovedNOC: false,
        },
      };

    case types.DOWNLOAD_APPROVED_NOC_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          downloadApprovedNOC: false,
        },
      };

    case types.GET_NOC_CANCELLED_REQUESTED:
      return {
        ...state,
        cancelledNOCList: null,
        loaders: {
          ...state.loaders,
          getCancelledNOCList: true,
        },
      };

    case types.GET_NOC_CANCELLED_SUCCESSFUL:
      return {
        ...state,
        cancelledNOCList: action.data,
        loaders: {
          ...state.loaders,
          getCancelledNOCList: false,
        },
      };

    case types.GET_NOC_CANCELLED_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          getCancelledNOCList: false,
        },
      };
    // Download cancel noc loader
    case types.DOWNLOAD_CANCELLED_NOC_REQUESTED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          downloadCancelledNOC: true,
        },
      };
    case types.DOWNLOAD_CANCELLED_NOC_SUCCESSFUL:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          downloadCancelledNOC: false,
        },
      };

    case types.DOWNLOAD_CANCELLED_NOC_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          downloadCancelledNOC: false,
        },
      };
    case types.GET_NOC_PENDING_REQUESTED:
      return {
        ...state,
        pendingNOCList: null,
        loaders: {
          ...state.loaders,
          getPendingNOCList: true,
        },
      };

    case types.GET_NOC_PENDING_SUCCESSFUL:
      return {
        ...state,
        pendingNOCList: action.data,
        loaders: {
          ...state.loaders,
          getPendingNOCList: false,
        },
      };

    case types.GET_NOC_PENDING_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          getPendingNOCList: false,
        },
      };
    // Downaload pending loader
    case types.DOWNLOAD_PENDING_NOC_REQUESTED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          downloadPendingNOC: true,
        },
      };

    case types.DOWNLOAD_PENDING_NOC_SUCCESSFUL:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          downloadPendingNOC: false,
        },
      };

    case types.DOWNLOAD_PENDING_NOC_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          downloadPendingNOC: false,
        },
      };
    case types.GET_HOLD_NOC_REQUESTED:
      return {
        ...state,
        holdNOCList: null,
        loaders: {
          ...state.loaders,
          getHoldNOCList: true,
        },
      };

    case types.GET_HOLD_NOC_SUCCESSFUL:
      return {
        ...state,
        holdNOCList: action.data,
        loaders: {
          ...state.loaders,
          getHoldNOCList: false,
        },
      };

    case types.GET_HOLD_NOC_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          getHoldNOCList: false,
        },
      };
    // download send for back loader
    case types.DOWNLOAD_HOLD_NOC_REQUESTED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          downloadHoldNOC: true,
        },
      };
    case types.DOWNLOAD_HOLD_NOC_SUCCESSFUL:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          downloadHoldNOC: false,
        },
      };

    case types.DOWNLOAD_HOLD_NOC_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          downloadHoldNOC: false,
        },
      };
    case types.GET_NOC_REJECT_REQUESTED:
      return {
        ...state,
        rejectedNOCList: null,
        loaders: {
          ...state.loaders,
          getRejectedNOCList: true,
        },
      };

    case types.GET_NOC_REJECT_SUCCESSFUL:
      return {
        ...state,
        rejectedNOCList: action.data,
        loaders: {
          ...state.loaders,
          getRejectedNOCList: false,
        },
      };

    case types.GET_NOC_REJECT_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          getRejectedNOCList: false,
        },
      };
    // download reject loader
    case types.DOWNLOAD_REJECTED_NOC_REQUESTED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          getRejectedNOCList: true,
        },
      };
    case types.DOWNLOAD_REJECTED_NOC_SUCCESSFUL:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          getRejectedNOCList: false,
        },
      };

    case types.DOWNLOAD_REJECTED_NOC_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          getRejectedNOCList: false,
        },
      };
    case types.GET_NOC_PAYMENT_DETAILS_REQUESTED:
      return {
        ...state,
        nocPaymentDetails: null,
        loaders: {
          ...state.loaders,
          getNocPaymentDetails: true,
        },
      };

    case types.GET_NOC_PAYMENT_DETAILS_SUCCESSFUL:
      return {
        ...state,
        nocPaymentDetails: action.data,
        loaders: {
          ...state.loaders,
          getNocPaymentDetails: false,
        },
      };

    case types.GET_NOC_PAYMENT_DETAILS_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          getNocPaymentDetails: false,
        },
      };

    case types.SUBMIT_NOC_PAYMENT_REQUESTED:
      return {
        ...state,
        nocPaymentDetails: null,
        loaders: {
          ...state.loaders,
          submitNocPayment: true,
        },
      };

    case types.SUBMIT_NOC_PAYMENT_SUCCESSFUL:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          submitNocPayment: false,
        },
      };

    case types.SUBMIT_NOC_PAYMENT_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          submitNocPayment: false,
        },
      };

    case types.GET_NOC_REMARKS_REQUESTED:
      return {
        ...state,
        nocRemarksData: null,
        loaders: {
          ...state.loaders,
          getNocRemarks: true,
        },
      };

    case types.GET_NOC_REMARKS_SUCCESSFUL:
      return {
        ...state,
        nocRemarksData: action.data,
        loaders: {
          ...state.loaders,
          getNocRemarks: false,
        },
      };

    case types.GET_NOC_REMARKS_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          getNocRemarks: false,
        },
      };

    case types.SUBMIT_NOC_REMARKS_REQUESTED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          submitNocRemarks: true,
        },
      };

    case types.SUBMIT_NOC_REMARKS_SUCCESSFUL:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          submitNocRemarks: false,
        },
      };

    case types.SUBMIT_NOC_REMARKS_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          submitNocRemarks: false,
        },
      };

    case types.GET_NOC_REQUEST_PROJECT_DETAILS_REQUESTED:
      return {
        ...state,
        getNOCProjectDetails: undefined,
        loaders: {
          ...state.loaders,
          getNOCProjectDetails: true,
        },
      };
    case types.GET_NOC_REQUEST_PROJECT_DETAILS_SUCCESSFUL:
      return {
        ...state,
        getNOCProjectDetails: action.data?.[0],
        loaders: {
          ...state.loaders,
          getNOCProjectDetails: false,
        },
      };
    case types.GET_NOC_REQUEST_PROJECT_DETAILS_FAILED:
      return {
        ...state,
        getNOCProjectDetails: undefined,
        loaders: {
          ...state.loaders,
          getNOCProjectDetails: false,
        },
      };
    case types.GET_NOC_DOCUMENTS_REQUESTED:
      return {
        ...state,
        nocDocumentsData: null,
        loaders: {
          ...state.loaders,
          getNocDocuments: true,
        },
      };

    case types.GET_NOC_DOCUMENTS_SUCCESSFUL:
      return {
        ...state,
        nocDocumentsData: action.data,
        loaders: {
          ...state.loaders,
          getNocDocuments: false,
        },
      };

    case types.GET_NOC_DOCUMENTS_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          getNocDocuments: false,
        },
      };

    case types.GET_NOC_DECISION_DATA_REQUESTED:
      return {
        ...state,
        decisionGetData: null,
        loaders: {
          ...state.loaders,
          getDecisionData: true,
        },
      };

    case types.GET_NOC_DECISION_DATA_SUCCESSFUL:
      return {
        ...state,
        decisionGetData: action.data.length > 0 ? action.data[0] : null,
        loaders: {
          ...state.loaders,
          getDecisionData: false,
        },
      };

    case types.GET_NOC_DECISION_DATA_FAILED:
      return {
        ...state,
        decisionGetData: null,
        loaders: {
          ...state.loaders,
          getDecisionData: false,
        },
      };

    case types.GET_NOC_PRICE_HEADERS_REQUESTED:
      return {
        ...state,
        nocPriceHeaders: null,
        loaders: {
          ...state.loaders,
          getNocPriceHeaders: true,
        },
      };

    case types.GET_NOC_PRICE_HEADERS_SUCCESSFUL:
      return {
        ...state,
        nocPriceHeaders: action.data,
        loaders: {
          ...state.loaders,
          getNocPriceHeaders: false,
        },
      };

    case types.GET_NOC_PRICE_HEADERS_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          getNocPriceHeaders: false,
        },
      };
    case types.GET_SEND_BACK_USERS_REQUESTED:
      return {
        ...state,
        sendBackUsers: null,
        loaders: {
          ...state.loaders,
          sendBackUsers: true,
        },
      };

    case types.GET_SEND_BACK_USERS_SUCCESSFUL:
      return {
        ...state,
        sendBackUsers: action.data,
        loaders: {
          ...state.loaders,
          sendBackUsers: false,
        },
      };

    case types.GET_SEND_BACK_USERS_FAILED:
      return {
        ...state,
        sendBackUsers: null,
        loaders: {
          ...state.loaders,
          sendBackUsers: false,
        },
      };

    case types.GET_NOC_LETTER_REQUESTED:
      return {
        ...state,

        loaders: {
          ...state.loaders,
          nocLetter: true,
        },
      };

    case types.GET_NOC_LETTER_SUCCESSFUL:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          nocLetter: false,
        },
      };

    case types.GET_NOC_LETTER_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          nocLetter: false,
        },
      };

    case types.SEND_AUTHORIZE_NOC_REQUESTED:
      return {
        ...state,
        authorizeNoc: undefined,
        loaders: {
          ...state.loaders,
          authorizeNoc: true,
        },
      };

    case types.SEND_AUTHORIZE_NOC_SUCCESSFUL:
      return {
        ...state,
        authorizeNoc: action.data,
        loaders: {
          ...state.loaders,
          authorizeNoc: false,
        },
      };

    case types.SEND_AUTHORIZE_NOC_FAILED:
      return {
        ...state,
        authorizeNoc: undefined,
        loaders: {
          ...state.loaders,
          authorizeNoc: false,
        },
      };
    //noc authorize
    case types.SEND_AUTHORIZE_NOC_REQUESTED_NEW:
      return {
        ...state,
        authorizeNocNew: undefined,
        loaders: {
          ...state.loaders,
          authorizeNocNew: true,
        },
      };

    case types.SEND_AUTHORIZE_NOC_SUCCESSFUL_NEW:
      return {
        ...state,
        authorizeNocNew: action.data,
        loaders: {
          ...state.loaders,
          authorizeNocNew: false,
        },
      };

    case types.SEND_AUTHORIZE_NOC_FAILED_NEW:
      return {
        ...state,
        authorizeNocNew: undefined,
        loaders: {
          ...state.loaders,
          authorizeNocNew: false,
        },
      };
    case types.GET_NOC_REQUEST_REMARKS_REQUESTED:
      return {
        ...state,
        nocRequestRemarks: undefined,
        loaders: {
          ...state.loaders,
          nocRequestRemarks: true,
        },
      };

    case types.GET_NOC_REQUEST_REMARKS_SUCCESSFUL:
      return {
        ...state,
        nocRequestRemarks: action.data,
        loaders: {
          ...state.loaders,
          nocRequestRemarks: false,
        },
      };

    case types.GET_NOC_REQUEST_REMARKS_FAILED:
      return {
        ...state,
        nocRequestRemarks: undefined,
        loaders: {
          ...state.loaders,
          nocRequestRemarks: false,
        },
      };
    case types.GET_NOC_REQUEST_TIMELINE_REQUESTED:
      return {
        ...state,
        nocRequestTimeline: undefined,
        loaders: {
          ...state.loaders,
          nocRequestTimeline: true,
        },
      };

    case types.GET_NOC_REQUEST_TIMELINE_SUCCESSFUL:
      return {
        ...state,
        nocRequestTimeline: action.data,
        loaders: {
          ...state.loaders,
          nocRequestTimeline: false,
        },
      };

    case types.GET_NOC_REQUEST_TIMELINE_FAILED:
      return {
        ...state,
        nocRequestTimeline: undefined,
        loaders: {
          ...state.loaders,
          nocRequestTimeline: false,
        },
      };
    case types.GET_NOC_REQUEST_CHANGE_HISTORY_REQUESTED:
      return {
        ...state,
        nocRequestChangeHistory: null,
        loaders: {
          ...state.loaders,
          nocRequestChangeHistory: true,
        },
      };

    case types.GET_NOC_REQUEST_CHANGE_HISTORY_SUCCESSFUL:
      return {
        ...state,
        nocRequestChangeHistory: action.data,
        loaders: {
          ...state.loaders,
          nocRequestChangeHistory: false,
        },
      };

    case types.GET_NOC_REQUEST_CHANGE_HISTORY_FAILED:
      return {
        ...state,
        nocRequestChangeHistory: null,
        loaders: {
          ...state.loaders,
          nocRequestChangeHistory: false,
        },
      };
    case types.GET_NOC_DEVELOPER_DOC_REF_REQUESTED:
      return {
        ...state,
        nocDeveloperDocRef: null,
        loaders: {
          ...state.loaders,
          nocDeveloperDocRef: true,
        },
      };

    case types.GET_NOC_DEVELOPER_DOC_REF_SUCCESSFUL:
      return {
        ...state,
        nocDeveloperDocRef: action.data,
        loaders: {
          ...state.loaders,
          nocDeveloperDocRef: false,
        },
      };

    case types.GET_NOC_DEVELOPER_DOC_REF_FAILED:
      return {
        ...state,
        nocDeveloperDocRef: null,
        loaders: {
          ...state.loaders,
          nocDeveloperDocRef: false,
        },
      };

    default:
      return state;
  }
};
const config = {
  storage,
  key: storageKeys.manageRequest,
  blacklist: ["loaders"], // topic will not be persisted
};

export default persistReducer(config, manageRequestReducer);
