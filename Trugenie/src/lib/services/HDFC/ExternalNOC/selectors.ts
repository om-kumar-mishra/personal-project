import { AppState } from "../../../common/appState";

//#region [Auth]
export const selectNOCTypeList = (state: AppState) => state.hdfc.externalNOC.nocTypeList;
export const selectNOCSalesUnitList = (state: AppState) => state.hdfc.externalNOC.salesUnitForNOCList;
export const selectNOCPriceHeaderList = (state: AppState) => state.hdfc.externalNOC.nocPriceHeaderList;
export const selectNOCAccountsList = (state: AppState) => state.hdfc.externalNOC.nocAccountsList;
export const selectPaymentTransactionList = (state: AppState) => state.hdfc.externalNOC.paymentList;
export const selectExternalNOCLoaders = (state: AppState) => state.hdfc.externalNOC.loader;
//#region
