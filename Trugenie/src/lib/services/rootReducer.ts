import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { storageKeys } from "../../utils/constants";
import storage from "../common/storage";
import ManageDocsUpdateReducer from "./HDFC/manageDocs/reducer";
import { hdfcReducer } from "./HDFC/services/reducer";
import CashflowReducer from "./cashflowDashboard/reducer";
import CommonReducer from "./common/reducer";
import ConstructionDashboardReducer from "./constructionDashboardv2/reducer";
import DashboardRemarkReducer from "./dashboardRemarks/reducer";
import authReducer from "./hdfc_login/reducer";
import { LOGOUT_REQUESTED } from "./hdfc_login/types";
import investmentDataReducer from "./investmentView/reducer";
import LoginReducer from "./login/reducer";
import NOCDashboardReducer from "./nocDashboard/reducer";
import NOCSetupReducer from "./nocSetup/reducer";
import portfolioSummaryReducer from "./portfolioView/reducer";
import NOCPreferenceReducer from "./prefrences/reducer";
import ProjectSummaryReducer from "./projectSummary/reducer";
import reportReducer from "./reports/reducer";
import SalesDashboardReducer from "./salesDashboard/reducer";

const globalConfig = {
  storage,
};

const config = {
  ...globalConfig,
  key: storageKeys.root,
  whitelist: ["hdfcAuth", "hdfc"], // topic will be persisted
};

const appReducer = combineReducers({
  hdfcAuth: authReducer,
  login: LoginReducer,
  salesDashboard: SalesDashboardReducer,
  nocDashboardReducer: NOCDashboardReducer,
  commonReducer: CommonReducer,
  projectSummaryReducer: ProjectSummaryReducer,
  investmentData: investmentDataReducer,
  portfolioSummaryView: portfolioSummaryReducer,
  cashflowData: CashflowReducer,
  constructionDashboard: ConstructionDashboardReducer,
  dashboardRemark: DashboardRemarkReducer,
  nocSetup: NOCSetupReducer,
  hdfc: hdfcReducer,
  nocPrefrence: NOCPreferenceReducer,
  report: reportReducer,
  manageDocsUpdate: ManageDocsUpdateReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === LOGOUT_REQUESTED) {
    state = undefined;
    /**
     * To not reset a reducer:
      const { topic } = state;
      state = { topic };
     */
    Object.values(storageKeys).forEach(async key => await storage.removeItem("persist:" + key));
  }
  return appReducer(state, action);
};

export default persistReducer(config, rootReducer);
