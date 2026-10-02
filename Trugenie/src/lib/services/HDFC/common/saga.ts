import { call, put, select, takeLeading } from "redux-saga/effects";
import { errorNotification, successNotification } from "../../../../utils/notifications";
import { selectAccessToken } from "../../hdfc_login/selectors";
import { DownloadRowDataRequestAction, DownloadRowDataSucceededAction, downloadRowDataFailed, downloadRowDataSucceeded } from "./action";
import { downloadRowDataAPI } from "./api";
import { } from "./dataTypes";
import * as actionTypes from "./types";

// Download row-data
function* handleDownloadRowData(action: DownloadRowDataRequestAction) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response = yield call(downloadRowDataAPI, accessToken, action.containerName, action.filePath, action.fileName);
    if (response === null) {
      throw new Error("File Not Found");
    } else {
      action.callBack && action.callBack(true);
      yield call(successNotification, "Download Succeeded...");
      const next: DownloadRowDataSucceededAction = yield call(downloadRowDataSucceeded);
      yield put(next);
    }
  } catch (e: any) {
    action.callBack && action.callBack(false);
    yield call(errorNotification, e.message ?? "Download Failed...");
    yield put(downloadRowDataFailed);
  }
}

function* downLoadRowDataSaga() {
  yield takeLeading(actionTypes.DOWNLOAD_ROW_DATA_REQUESTED, handleDownloadRowData);
}

export default downLoadRowDataSaga;
