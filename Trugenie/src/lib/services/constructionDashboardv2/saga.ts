import { call, put, select, takeLeading } from "redux-saga/effects";
import { ConstructionDashboardActionType as ActionTypes } from "./types";
import * as Api from "./api";
import {
  ConstructionDashboardDetailAction,
  ConstructionDashboardDropDownAction,
  ConstructionApprovalDocumentsAction,
  ConstructionDropdownResult,
  ConstructionSummaryResult,
  ApprovalDocumentsResult,
} from "./dataType";
import { LoginActionType } from "../login/types";
import { selectAccessToken } from "../hdfc_login/selectors";
import { handelReponseCode } from "../../../modules/Components/UtilityFunctions";

function* getConstructionSummarySaga(action: ConstructionDashboardDetailAction) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const result: ConstructionSummaryResult = yield call(Api.getConstructionSummaryApi, accessToken, action.payload);
    const { isError } = handelReponseCode(undefined, result?.info);
    if (isError) {
      throw new Error(result?.info?.message || "API Failed...");
    } else {
      yield put({
        type: ActionTypes.GET_CONSTRUCTION_SUMMARY_SUCCESS,
        result: result,
      });
    }
  } catch (e: any) {
    yield put({
      type: ActionTypes.GET_CONSTRUCTION_SUMMARY_FAILED,
      message: e.message,
    });
  }
}

function* getConstructionDropdownSaga(action: ConstructionDashboardDropDownAction) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const result: ConstructionDropdownResult = yield call(Api.getConstructionDashboardDropDownDetails, accessToken, action.payload);
    const { isError } = handelReponseCode(undefined, result?.info);
    if (isError) {
      throw new Error(result?.info?.message || "API Failed...");
    } else {
      yield put({
        type: ActionTypes.GET_CONSTRUCTION_DROPDOWN_SUCCESS,
        result: result,
      });
    }
  } catch (e: any) {
    yield put({
      type: ActionTypes.GET_CONSTRUCTION_DROPDOWN_FAILED,
      message: e.message,
    });
  }
}

function* getConstructionApprovalDocuments(action: ConstructionApprovalDocumentsAction) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const result: ApprovalDocumentsResult = yield call(Api.getConstructionApprovalDocuments, accessToken, action.payload);
    const { isError } = handelReponseCode(undefined, result?.info);
    if (isError) {
      throw new Error(result?.info?.message || "API Failed...");
    } else {
      yield put({
        type: ActionTypes.GET_CONSTRUCTION_APPROVALDOCUMENTS_SUCCESS,
        result: result,
      });
    }
  } catch (e: any) {
    yield put({
      type: ActionTypes.GET_CONSTRUCTION_APPROVALDOCUMENTS_FAILED,
      message: e.message,
    });
  }
}

export default function* constructionDashboardSaga() {
  yield takeLeading(ActionTypes.GET_CONSTRUCTION_SUMMARY_REQUESTED, getConstructionSummarySaga);
  yield takeLeading(ActionTypes.GET_CONSTRUCTION_DROPDOWN_REQUESTED, getConstructionDropdownSaga);
  yield takeLeading(ActionTypes.GET_CONSTRUCTION_APPROVALDOCUMENTS_REQUESTED, getConstructionApprovalDocuments);
}
