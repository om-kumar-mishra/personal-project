import { call, put, select, takeLeading } from "redux-saga/effects";
import { selectAccessToken } from "../hdfc_login/selectors";
import { ProjectSummaryActionType } from "./types";
import { ProjectSummaryDetailsResponse, ProjectSummaryFilterResponse, SummaryDashboardAction } from "./datatype";
import { getSummaryDashboardDetailsV2, getSummaryDashboardFilterApi } from "./api";
import { handelReponseCode } from "../../../modules/Components/UtilityFunctions";

function* getProjectSummaryDetails(action: SummaryDashboardAction): Generator<any, any, any> {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: ProjectSummaryDetailsResponse = yield call(getSummaryDashboardDetailsV2, action.reAssetId, action.misDate, accessToken);
    const { isError } = handelReponseCode(undefined, response?.info);
    if (isError) {
      throw new Error(response?.info?.message || "API Failed...");
    } else {
      yield put({
        type: ProjectSummaryActionType.GET_PROJECT_SUMMARY_DETAIL_SUCCESS,
        result: response,
      });
    }
  } catch (e: any) {
    yield put({
      type: ProjectSummaryActionType.GET_PROJECT_SUMMARY_DETAIL_FAILED,
      message: e.message,
    });
  }
}

function* getProjectSummaryFilterSaga(action: SummaryDashboardAction): Generator<any, any, any> {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: ProjectSummaryFilterResponse = yield call(getSummaryDashboardFilterApi, action.reAssetId, accessToken);
    const { isError } = handelReponseCode(undefined, response?.info);
    if (isError) {
      throw new Error(response?.info?.message || "API Failed...");
    } else {
      yield put({
        type: ProjectSummaryActionType.GET_PROJECT_SUMMARY_FILTER_SUCCESS,
        result: response,
      });
    }
  } catch (e: any) {
    yield put({
      type: ProjectSummaryActionType.GET_PROJECT_SUMMARY_FILTER_FAILED,
      message: e.message,
    });
  }
}

export default function* projectSummarySaga() {
  yield takeLeading(ProjectSummaryActionType.GET_PROJECT_SUMMARY_DETAIL_REQUESTED, getProjectSummaryDetails);
  yield takeLeading(ProjectSummaryActionType.GET_PROJECT_SUMMARY_FILTER_REQUESTED, getProjectSummaryFilterSaga);
}
