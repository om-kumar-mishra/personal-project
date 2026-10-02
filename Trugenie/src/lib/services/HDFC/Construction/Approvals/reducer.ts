import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
import { storageKeys } from "../../../../../utils/constants";
import * as actionTypes from "./types";
import { ApprovalActions } from "./actions";
import {
  ApprovalDropDownData,
  ApprovalPastHistoryData,
  PendingConstructionApprovalDocumentsData,
  UpdateApprovalStatusResponse,
  UploadConstructionApprovalDocumentsResponse,
} from "./dataTypes";


type ApprovalState = {
  approvalPastHistoryList: ApprovalPastHistoryData[];
  updateApprovalStatus?: UpdateApprovalStatusResponse;
  PendingConstructionApprovalDocuments: PendingConstructionApprovalDocumentsData[];
  uploadConstructionApprovalDocuments?: UploadConstructionApprovalDocumentsResponse;
  approvalDropdown: ApprovalDropDownData[];
  loader: {
    approvalPastHistoryList: boolean;
    updateApprovalStatus: boolean;
    PendingConstructionApprovalDocuments: boolean;
    uploadConstructionApprovalDocuments: boolean;
    approvalDropdown: boolean;
  };
};

const initialState: ApprovalState = {
  approvalPastHistoryList: [],
  updateApprovalStatus: undefined,
  PendingConstructionApprovalDocuments: [],
  uploadConstructionApprovalDocuments: undefined,
  approvalDropdown: [],
  loader: {
    approvalPastHistoryList: false,
    updateApprovalStatus: false,
    PendingConstructionApprovalDocuments: false,
    uploadConstructionApprovalDocuments: false,
    approvalDropdown: false,
  },
};

const approvalReducer = (state: ApprovalState = initialState, action: ApprovalActions): ApprovalState => {
  switch (action.type) {
    // Approval-past-history
    case actionTypes.GET_CONTRUCTION_APPROVAL_PAST_HISTORY_REQUESTED:
      return {
        ...state,
        approvalPastHistoryList: [],
        loader: {
          ...state.loader,
          approvalPastHistoryList: true,
        },
      };
    case actionTypes.GET_CONTRUCTION_APPROVAL_PAST_HISTORY_SUCCEEDED:
      return {
        ...state,
        approvalPastHistoryList: action.result,
        loader: {
          ...state.loader,
          approvalPastHistoryList: false,
        },
      };
    case actionTypes.GET_CONTRUCTION_APPROVAL_PAST_HISTORY_FAILED:
      return {
        ...state,
        approvalPastHistoryList: [],
        loader: {
          ...state.loader,
          approvalPastHistoryList: true,
        },
      };
    case actionTypes.UPDATE_APPROVAl_STATUS_REQUESTED:
      return {
        ...state,
        updateApprovalStatus: undefined,
        loader: {
          ...state.loader,
          updateApprovalStatus: true,
        },
      };
    case actionTypes.UPDATE_APPROVAl_STATUS_SUCCEEDED:
      return {
        ...state,
        updateApprovalStatus: action.result,
        loader: {
          ...state.loader,
          updateApprovalStatus: false,
        },
      };
    case actionTypes.UPDATE_APPROVAl_STATUS_FAILED:
      return {
        ...state,
        updateApprovalStatus: undefined,
        loader: {
          ...state.loader,
          updateApprovalStatus: false,
        },
      };
    case actionTypes.GET_PENDING_APPROVAL_DOCUMENTS_REQUESTED:
      return {
        ...state,
        PendingConstructionApprovalDocuments: [],
        loader: {
          ...state.loader,
          PendingConstructionApprovalDocuments: true,
        },
      };
    case actionTypes.GET_PENDING_APPROVAL_DOCUMENTS_SUCCEEDED:
      return {
        ...state,
        PendingConstructionApprovalDocuments: action.result,
        loader: {
          ...state.loader,
          PendingConstructionApprovalDocuments: false,
        },
      };
    case actionTypes.GET_PENDING_APPROVAL_DOCUMENTS_FAILED:
      return {
        ...state,
        PendingConstructionApprovalDocuments: [],
        loader: {
          ...state.loader,
          PendingConstructionApprovalDocuments: true,
        },
      };

    case actionTypes.INSERT_CONSTRUCTION_APPROVAL_DOCUMENTS_REQUESTED:
      return {
        ...state,
        uploadConstructionApprovalDocuments: undefined,
        loader: {
          ...state.loader,
          uploadConstructionApprovalDocuments: true,
        },
      };
    case actionTypes.INSERT_CONSTRUCTION_APPROVAL_DOCUMENTS_SUCCEEDED:
      return {
        ...state,
        uploadConstructionApprovalDocuments: action.result,
        loader: {
          ...state.loader,
          uploadConstructionApprovalDocuments: false,
        },
      };
    case actionTypes.INSERT_CONSTRUCTION_APPROVAL_DOCUMENTS_FAILED:
      return {
        ...state,
        uploadConstructionApprovalDocuments: undefined,
        loader: {
          ...state.loader,
          uploadConstructionApprovalDocuments: false,
        },
      };

      case actionTypes.GET_APPROVAL_DROPDOWN_REQUESTED:
        return {
          ...state,
          approvalDropdown: [],
          loader: {
            ...state.loader,
            approvalDropdown: true,
          },
        };
      case actionTypes.GET_APPROVAL_DROPDOWN_SUCCEEDED:
        return {
          ...state,
          approvalDropdown: action.result,
          loader: {
            ...state.loader,
            approvalDropdown: false,
          },
        };
      case actionTypes.GET_APPROVAL_DROPDOWN_FAILED:
        return {
          ...state,
          approvalDropdown: [],
          loader: {
            ...state.loader,
            approvalDropdown: true,
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

export default persistReducer(config, approvalReducer);
// export default summaryReducer;
