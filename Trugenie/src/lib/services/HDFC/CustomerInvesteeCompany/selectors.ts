import { AppState } from "../../../common/appState";

export const selectCustomerInvesteeList = (state: AppState) => state.hdfc.customerInvestee.customerInvesteeList;
export const selectCustomerInvesteeLoaders = (state: AppState) => state.hdfc.customerInvestee.loaders;
export const selectFilteredCustomerInvesteeList = (state: AppState) => state.hdfc.customerInvestee.filteredCustomerInvesteeList;