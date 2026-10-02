import * as types from "./types";

// Download-row-data
//#region [Request Action]
export type DownloadRowDataRequestAction = {
  type: typeof types.DOWNLOAD_ROW_DATA_REQUESTED;
  containerName: string;
  filePath: string;
  fileName: string;
  callBack?: (success: boolean) => void;
};

export const downloadRowDataRequest = (
  containerName: string,
  filePath: string,
  fileName: string,
  callBack?: (success: boolean) => void,
): DownloadRowDataRequestAction => ({
  type: types.DOWNLOAD_ROW_DATA_REQUESTED,
  containerName,
  filePath,
  fileName,
  callBack,
});
//#endregion

//#region [Request Success]
export type DownloadRowDataSucceededAction = {
  type: typeof types.DOWNLOAD_ROW_DATA_SUCCEEDED;
};

export const downloadRowDataSucceeded = (): DownloadRowDataSucceededAction => ({
  type: types.DOWNLOAD_ROW_DATA_SUCCEEDED,
});
//#endregion

//#region [Request Failed]
export type DownloadRowDataFailedAction = {
  type: typeof types.DOWNLOAD_ROW_DATA_FAILED;
};

export const downloadRowDataFailed = (): DownloadRowDataFailedAction => ({
  type: types.DOWNLOAD_ROW_DATA_FAILED,
});
//#endregion

export type DownloadRowDataActions = DownloadRowDataRequestAction | DownloadRowDataSucceededAction | DownloadRowDataFailedAction;
