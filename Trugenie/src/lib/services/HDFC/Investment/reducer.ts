import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
import { storageKeys } from "../../../../utils/constants";
import * as actionTypes from "./types";
import { InvestmentActions } from "./actions";
import {
  CheckInvestmentDetailsExistData,
  DeleteInvestmentDetailsResponse,
  InvestmentPendingData,
  InvestmentPastHistoryData,
  IsInvestmentSetupData,
  UpdateInvestmentStatusResponse,
  UploadInvestmentTemplateResponse,
  InvestmentListData,
  InvestmentFundsData,
  InvestmentDeveloperData,
  CanSetupInvestmentData,
  UploadInvestmentSetupTemplateResponse,
} from "./dataTypes";

type InvestmentState = {
  investmentHistoryList?: InvestmentPastHistoryData[];
  isInvestmentSetup?: IsInvestmentSetupData;
  uploadInvestment?: UploadInvestmentTemplateResponse;
  checkInvestmentDetailExist?: CheckInvestmentDetailsExistData;
  updateInvestmentStatus?: UpdateInvestmentStatusResponse;
  deleteInvestmentDetails?: DeleteInvestmentDetailsResponse;
  investmentPendingList?: InvestmentPendingData[];
  investmentList?: InvestmentListData[];
  selectedInvestment?: InvestmentListData;
  investmentFunds?: InvestmentFundsData[] | null;
  InvestmentDeveloper?: InvestmentDeveloperData[] | null;
  canSetupInvestment?: CanSetupInvestmentData;
  uploadInvestmentSetup?: UploadInvestmentSetupTemplateResponse;
  loader: {
    investmentHistoryList: boolean;
    isInvestmentSetup: boolean;
    downloadInvestmentTemplate: boolean;
    uploadInvestment: boolean;
    checkInvestmentDetailExist: boolean;
    updateInvestmentStatus: boolean;
    deleteInvestmentDetails: boolean;
    investmentPendingList: boolean;
    investmentList: boolean;
    investmentFunds: boolean;
    InvestmentDeveloper: boolean;
    canSetupInvestment: boolean;
    uploadInvestmentSetup: boolean;
  };
};

const initialState: InvestmentState = {
  investmentHistoryList: undefined,
  isInvestmentSetup: undefined,
  uploadInvestment: undefined,
  checkInvestmentDetailExist: undefined,
  updateInvestmentStatus: undefined,
  deleteInvestmentDetails: undefined,
  investmentPendingList: undefined,
  investmentList: undefined,
  investmentFunds: undefined,
  InvestmentDeveloper: undefined,
  canSetupInvestment: undefined,
  uploadInvestmentSetup: undefined,
  selectedInvestment: undefined,
  loader: {
    investmentHistoryList: false,
    isInvestmentSetup: false,
    downloadInvestmentTemplate: false,
    uploadInvestment: false,
    checkInvestmentDetailExist: false,
    updateInvestmentStatus: false,
    deleteInvestmentDetails: false,
    investmentPendingList: false,
    investmentList: false,
    investmentFunds: false,
    InvestmentDeveloper: false,
    canSetupInvestment: false,
    uploadInvestmentSetup: false,
  },
};

const investmentReducer = (state: InvestmentState = initialState, action: InvestmentActions): InvestmentState => {
  switch (action.type) {
    // sales-past-history
    case actionTypes.GET_INVESTMENT_PAST_HISTORY_REQUESTED:
      return {
        ...state,
        investmentHistoryList: undefined,
        loader: {
          ...state.loader,
          investmentHistoryList: true,
        },
      };
    case actionTypes.GET_INVESTMENT_PAST_HISTORY_SUCCEEDED:
      return {
        ...state,
        investmentHistoryList: action.result,
        loader: {
          ...state.loader,
          investmentHistoryList: false,
        },
      };
    case actionTypes.IS_INVESTMENT_SETUP_REQUESTED:
      return {
        ...state,
        isInvestmentSetup: undefined,
        loader: {
          ...state.loader,
          isInvestmentSetup: true,
        },
      };
    case actionTypes.IS_INVESTMENT_SETUP_SUCCEEDED:
      return {
        ...state,
        isInvestmentSetup: action.result,
        loader: {
          ...state.loader,
          isInvestmentSetup: false,
        },
      };
    case actionTypes.IS_INVESTMENT_SETUP_FAILED:
      return {
        ...state,
        isInvestmentSetup: undefined,
        loader: {
          ...state.loader,
          isInvestmentSetup: false,
        },
      };

    case actionTypes.DOWNLOAD_INVESTMENT_TEMPLATE_REQUESTED:
      return {
        ...state,
        loader: {
          ...state.loader,
          downloadInvestmentTemplate: true,
        },
      };
    case actionTypes.DOWNLOAD_INVESTMENT_TEMPLATE_SUCCEEDED:
      return {
        ...state,
        loader: {
          ...state.loader,
          downloadInvestmentTemplate: false,
        },
      };
    case actionTypes.DOWNLOAD_INVESTMENT_TEMPLATE_FAILED:
      return {
        ...state,
        loader: {
          ...state.loader,
          downloadInvestmentTemplate: false,
        },
      };

    case actionTypes.UPLOAD_INVESTMENT_TEMPLATE_REQUESTED:
      return {
        ...state,
        uploadInvestment: undefined,
        loader: {
          ...state.loader,
          uploadInvestment: true,
        },
      };
    case actionTypes.UPLOAD_INVESTMENT_TEMPLATE_SUCCEEDED:
      return {
        ...state,
        uploadInvestment: action.result,
        loader: {
          ...state.loader,
          uploadInvestment: false,
        },
      };
    case actionTypes.UPLOAD_INVESTMENT_TEMPLATE_FAILED:
      return {
        ...state,
        uploadInvestment: undefined,
        loader: {
          ...state.loader,
          uploadInvestment: false,
        },
      };

    case actionTypes.CHECK_INVESTMENT_DETAILS_EXIST_REQUESTED:
      return {
        ...state,
        checkInvestmentDetailExist: undefined,
        loader: {
          ...state.loader,
          checkInvestmentDetailExist: true,
        },
      };
    case actionTypes.CHECK_INVESTMENT_DETAILS_EXIST_SUCCEEDED:
      return {
        ...state,
        checkInvestmentDetailExist: action.result,
        loader: {
          ...state.loader,
          checkInvestmentDetailExist: false,
        },
      };
    case actionTypes.CHECK_INVESTMENT_DETAILS_EXIST_FAILED:
      return {
        ...state,
        checkInvestmentDetailExist: undefined,
        loader: {
          ...state.loader,
          checkInvestmentDetailExist: false,
        },
      };

    case actionTypes.UPDATE_INVESTMENT_STATUS_REQUESTED:
      return {
        ...state,
        updateInvestmentStatus: undefined,
        loader: {
          ...state.loader,
          updateInvestmentStatus: true,
        },
      };
    case actionTypes.UPDATE_INVESTMENT_STATUS_SUCCEEDED:
      return {
        ...state,
        updateInvestmentStatus: action.result,
        loader: {
          ...state.loader,
          updateInvestmentStatus: false,
        },
      };
    case actionTypes.UPDATE_INVESTMENT_STATUS_FAILED:
      return {
        ...state,
        updateInvestmentStatus: undefined,
        loader: {
          ...state.loader,
          updateInvestmentStatus: false,
        },
      };

    case actionTypes.DELETE_INVESTMENT_DETAILS_REQUESTED:
      return {
        ...state,
        deleteInvestmentDetails: undefined,
        loader: {
          ...state.loader,
          deleteInvestmentDetails: true,
        },
      };
    case actionTypes.DELETE_INVESTMENT_DETAILS_SUCCEEDED:
      return {
        ...state,
        deleteInvestmentDetails: action.result,
        loader: {
          ...state.loader,
          deleteInvestmentDetails: false,
        },
      };
    case actionTypes.DELETE_INVESTMENT_DETAILS_FAILED:
      return {
        ...state,
        deleteInvestmentDetails: undefined,
        loader: {
          ...state.loader,
          deleteInvestmentDetails: false,
        },
      };
    // pending-history
    case actionTypes.GET_INVESTMENT_PENDING_UPDATE_REQUESTED:
      return {
        ...state,
        investmentPendingList: undefined,
        loader: {
          ...state.loader,
          investmentPendingList: true,
        },
      };
    case actionTypes.GET_INVESTMENT_PENDING_UPDATE_SUCCEEDED:
      return {
        ...state,
        investmentPendingList: action.result,
        loader: {
          ...state.loader,
          investmentPendingList: false,
        },
      };
    case actionTypes.GET_INVESTMENT_PENDING_UPDATE_FAILED:
      return {
        ...state,
        investmentPendingList: undefined,
        loader: {
          ...state.loader,
          investmentPendingList: false,
        },
      };

    // investment list
    case actionTypes.GET_INVESTMENT_LIST_REQUESTED:
      return {
        ...state,
        investmentList: undefined,
        loader: {
          ...state.loader,
          investmentList: true,
        },
      };
    case actionTypes.GET_INVESTMENT_LIST_SUCCEEDED:
      return {
        ...state,
        investmentList: action.result,
        loader: {
          ...state.loader,
          investmentList: false,
        },
      };
    case actionTypes.GET_INVESTMENT_LIST_FAILED:
      return {
        ...state,
        investmentList: undefined,
        loader: {
          ...state.loader,
          investmentList: false,
        },
      };

    // investment Funds
    case actionTypes.GET_INVESTMENT_FUNDS_REQUESTED:
      return {
        ...state,
        investmentFunds: undefined,
        loader: {
          ...state.loader,
          investmentFunds: true,
        },
      };
    case actionTypes.GET_INVESTMENT_FUNDS_SUCCEEDED:
      return {
        ...state,
        investmentFunds: action.result,
        loader: {
          ...state.loader,
          investmentFunds: false,
        },
      };
    case actionTypes.GET_INVESTMENT_FUNDS_FAILED:
      return {
        ...state,
        investmentFunds: undefined,
        loader: {
          ...state.loader,
          investmentFunds: false,
        },
      };

    // investment dev
    case actionTypes.GET_INVESTMENT_DEVELOPER_REQUESTED:
      return {
        ...state,
        InvestmentDeveloper: undefined,
        loader: {
          ...state.loader,
          InvestmentDeveloper: true,
        },
      };
    case actionTypes.GET_INVESTMENT_DEVELOPER_SUCCEEDED:
      return {
        ...state,
        InvestmentDeveloper: action.result,
        loader: {
          ...state.loader,
          investmentFunds: false,
        },
      };
    case actionTypes.GET_INVESTMENT_DEVELOPER_FAILED:
      return {
        ...state,
        InvestmentDeveloper: undefined,
        loader: {
          ...state.loader,
          InvestmentDeveloper: false,
        },
      };
    case actionTypes.CAN_SETUP_INVESTMENT_REQUESTED:
      return {
        ...state,
        canSetupInvestment: undefined,
        loader: {
          ...state.loader,
          canSetupInvestment: true,
        },
      };
    case actionTypes.CAN_SETUP_INVESTMENT_SUCCEEDED:
      return {
        ...state,
        canSetupInvestment: action.result,
        loader: {
          ...state.loader,
          canSetupInvestment: false,
        },
      };
    case actionTypes.CAN_SETUP_INVESTMENT_FAILED:
      return {
        ...state,
        canSetupInvestment: undefined,
        loader: {
          ...state.loader,
          canSetupInvestment: false,
        },
      };

    case actionTypes.UPLOAD_INVESTMENT_SETUP_TEMPLATE_REQUESTED:
      return {
        ...state,
        uploadInvestmentSetup: undefined,
        loader: {
          ...state.loader,
          uploadInvestmentSetup: true,
        },
      };
    case actionTypes.UPLOAD_INVESTMENT_SETUP_TEMPLATE_SUCCEEDED:
      return {
        ...state,
        uploadInvestmentSetup: action.result,
        loader: {
          ...state.loader,
          uploadInvestmentSetup: false,
        },
      };
    case actionTypes.UPLOAD_INVESTMENT_SETUP_TEMPLATE_FAILED:
      return {
        ...state,
        uploadInvestmentSetup: undefined,
        loader: {
          ...state.loader,
          uploadInvestmentSetup: false,
        },
      };
    case actionTypes.RESET_INVESTMENT:
      return {
        ...state,
        selectedInvestment: undefined,
      };
    case actionTypes.SET_INVESTMENT:
      return {
        ...state,
        selectedInvestment: action.result,
      };
    default:
      return state;
  }
};
const config = {
  storage,
  key: storageKeys.investment,
  blacklist: ["loader"], // topic will not be persisted
};

export default persistReducer(config, investmentReducer);
// export default investmentReducer;
