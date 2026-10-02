import { AppState } from "../../common/appState";

export const getBuisnessPlanList = (state: AppState) =>
  state.cashflowData.buisnesPlanList;

export const getMisdatesFiltersList = (state: AppState) =>
  state.cashflowData.misdatesList;

  export const getLoaders = (state: AppState) =>
  state.cashflowData.loaders;
