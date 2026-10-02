import { combineReducers } from "@reduxjs/toolkit";
import hdfcCommonsReducer from "../Commons/reducer";
import customerGroupReducer from "../CustomerGroupServices/reducer";
import studentReducer from "../Student/reducer";

import customerInvesteeReducer from "../CustomerInvesteeCompany/reducer";
import externalUserReducer from "../ExternalUser/reducer";
import internalUserReducer from "../InternalUser/reducer";
import locationReducer from "../Location/reducer";
import manageRequestReducer from "../NOCManageRequest/reducer";
import projectReducer from "../Project/reducer";
import projectSetupReducer from "../ProjectSetupUpdate/reducer";
import RegionReducer from "../Region/reducer";
import salesReducer from "../Sales/reducer";
import summaryReducer from "../Summary/reducer";
import zonesReducer from "../Zone/reducer";
import externalNOCReducer from "../ExternalNOC/reducer";
import salesMonitoringReducer from "../MonitoringSheet/reducer";
import commonMonitoringReducer from "../common/reducer";
import fundsReducer from '../Portfolio/reducer'
import contructionUploadExcel from '../Construction/ExcelUpload/reducer'
import lenderReducer from "../Lender/reducer";
import debentureReducer from "../Debenture Trustee/reducer";
import pmcReducer from "../PMC/reducer";
import investmentReducer from "../Investment/reducer";
import fundReducer from "../Funds/reducer";
import entityInvestmentReducer from "../Entity-Investment/reducer";
import cashflowReducer from "../Cashflow/reducer";
import physicalProgressReducer from "../Construction/PhysicalProgress/reducer";
import siteImageReducer from "../Construction/SiteImage/reducer";
import approvalReducer from "../Construction/Approvals/reducer";
import clientReducer from "../Client/reducer";
import DevlocationReducer from "../DeveloperLocation/reducer"

export const hdfcReducer = combineReducers({
  salesMonitoring: salesMonitoringReducer,
  customerGroup: customerGroupReducer,
  project: projectReducer,
  sales: salesReducer,
  externalNOC: externalNOCReducer,
  customerInvestee: customerInvesteeReducer,
  zones: zonesReducer,
  region: RegionReducer,
  location: locationReducer,
  internalUser: internalUserReducer,
  externalUser: externalUserReducer,
  projectSetup: projectSetupReducer,
  commons: hdfcCommonsReducer,
  manageRequest: manageRequestReducer,
  commonMonitoringReducer: commonMonitoringReducer,
  summary: summaryReducer,
  excelConstructionReducer: contructionUploadExcel,
  physicalProgress: physicalProgressReducer,
  siteImage: siteImageReducer,
  approval: approvalReducer,
  fundsReducer: fundsReducer,
  cashflow: cashflowReducer,
  lender: lenderReducer,
  debenture: debentureReducer,
  pmc: pmcReducer,
  investment: investmentReducer,
  funds: fundReducer,
  entityInvestment: entityInvestmentReducer,
  client: clientReducer,
  developerLocation:DevlocationReducer,
  student:studentReducer
});
export default hdfcReducer;
