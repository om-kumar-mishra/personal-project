import { AppState } from "../../../common/appState";

export const selectDocumentDownloadLoaders = (state: AppState) => state.hdfc.commonMonitoringReducer.loader;