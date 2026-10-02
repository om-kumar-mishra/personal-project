import { AppState } from "../../../common/appState";

//#region [Auth]
export const fundsPastUpdateList = (state:AppState)=>state.hdfc.fundsReducer.fundsPastUpdateList;
export const selectFundsLoaders = (state: AppState) => state.hdfc.fundsReducer.loader;
export const fundsPendingList = (state:AppState)=>state.hdfc.fundsReducer.fundsPendingList;
export const selectCheckFundsDetailExist = (state: AppState) => state.hdfc.fundsReducer.checkFundsDetailExist;
// export const selectDeleteFundsPastHistory =(state:AppState)=>state.hdfc.fundsReducer.;
//#region

