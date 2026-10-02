import { call, put, select, takeLeading } from "redux-saga/effects";
import { errorNotification, handelReponseCode, successNotification } from "../../../../modules/Components/UtilityFunctions";
import { selectAccessToken } from "../../hdfc_login/selectors";
import {
  DeleteProjectDocumentRequested,
  GetProjectDocumentHistoryRequested,
  GetProjectDocumentRequested,
  InsertProjectDocumentRequested,
  deleteProjectDocumentSucceeded,
  getProjectDocumentHistorySucceeded,
  getProjectDocumentSucceeded,
  insertProjectDocumentSucceeded,
} from "./actions";
import { deleteProjectDocuments, getProjectDocuments, getProjectDocumentsHistory, insertProjectDocuments } from "./api";
import { DeleteProjectDocumentResponse, GetProjectDocumentHistoryResponse, GetProjectDocumentResponse, InsertProjectDocumentsResponse } from "./dataType";
import * as ActionTypes from "./types";

const defaultError = { code: 102, message: "Something went wrong!" };

function* handleInsertProjectDocuments(action: InsertProjectDocumentRequested) {
  const accessToken = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const result: InsertProjectDocumentsResponse = yield call(insertProjectDocuments, accessToken, action.payload);
    const { isError } = handelReponseCode(undefined, result === null ? defaultError : result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      yield put(insertProjectDocumentSucceeded(result?.info));
      yield call(successNotification, result?.info.message ?? "Insert Project Document SuceessFully");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield call(errorNotification, error?.message ?? "API Failed..");
    }
    yield put({
      type: ActionTypes.INSERT_PROJECT_DOCUMENTS_FAILED,
      error: ""
    });
  }
}

function* handleGetProjectDocumentsHistory(action: GetProjectDocumentHistoryRequested) {
  const accessToken = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const result: GetProjectDocumentHistoryResponse = yield call(getProjectDocumentsHistory, accessToken, action.REAssetId);
    const { isError } = handelReponseCode(undefined, result === null ? defaultError : result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      yield put(getProjectDocumentHistorySucceeded(result.data));
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield call(errorNotification, error?.message ?? "API Failed..");
    }
    yield put({
      type: ActionTypes.GET_PROJECT_DOCUMENTS_HISTORY_FAILED,
      error: ""
    });
  }
}

function* handleGetProjectDocuments(action: GetProjectDocumentRequested) {
  const accessToken = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const result: GetProjectDocumentResponse = yield call(getProjectDocuments, accessToken, action.REAssetId);
    const { isError } = handelReponseCode(undefined, result === null ? defaultError : result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      yield put(getProjectDocumentSucceeded(result.data));
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield call(errorNotification, error?.message ?? "API Failed..");
    }
    yield put({
      type: ActionTypes.GET_PROJECT_DOCUMENTS_FAILED,
      error: ""
    });
  }
}

function* handleDeleteProjectDocuments(action: DeleteProjectDocumentRequested) {
  const accessToken = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }
  try {
    const result: DeleteProjectDocumentResponse = yield call(deleteProjectDocuments, accessToken, action.payload);
    const { isError } = handelReponseCode(undefined, result === null ? defaultError : result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      yield put(deleteProjectDocumentSucceeded(result?.info));
      yield call(successNotification, result?.info.message ?? "Deleted SuceessFully");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield call(errorNotification, error?.message ?? "API Failed..");
    }
    yield put({
      type: ActionTypes.DELETE_PROJECT_DOCUMENTS_FAILED,
      error: ""
    });
  }
}

function* manageDocsUpdateSaga() {
  yield takeLeading(ActionTypes.INSERT_PROJECT_DOCUMENTS_REQUESTED, handleInsertProjectDocuments);
  yield takeLeading(ActionTypes.GET_PROJECT_DOCUMENTS_HISTORY_REQUESTED, handleGetProjectDocumentsHistory);
  yield takeLeading(ActionTypes.GET_PROJECT_DOCUMENTS_REQUESTED, handleGetProjectDocuments);
  yield takeLeading(ActionTypes.DELETE_PROJECT_DOCUMENTS_REQUESTED, handleDeleteProjectDocuments);
}

export default manageDocsUpdateSaga;
