import { AppState } from "../../../common/appState";

export const selectCustomerGroupList = (state: AppState) => state.hdfc.customerGroup.customerGroupList;
export const selectCustomerGroupLoaders = (state: AppState) => state.hdfc.customerGroup.loaders;