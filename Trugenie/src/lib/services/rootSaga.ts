import { all, fork } from "redux-saga/effects";
import hdfcSaga from "./HDFC/services/saga";
import CashflowDetailsSaga from "./cashflowDashboard/saga";
import constructionDashboardSaga from "./constructionDashboardv2/saga";
import dashboardRemarkSaga from "./dashboardRemarks/saga";
import hdfcAuthSaga from "./hdfc_login/saga";
import NOCPrefrencesSaga from "./prefrences/saga";
import InvestmentDetailsSaga from "./investmentView/saga";
import loginSaga from "./login/saga";
import nocDashboardSaga from "./nocDashboard/saga";
import portfolioSummaryinSaga from "./portfolioView/saga";
import projectSummarySaga from "./projectSummary/saga";
import nocSetupSaga from "./nocSetup/saga";
import reportSaga from "./reports/saga";
import salesDashboardSaga from "./salesDashboard/saga";
import manageDocsUpdateSaga from "./HDFC/manageDocs/saga";
import summarySaga from "./HDFC/Summary/saga";
import cashflowSaga from "./HDFC/Cashflow/saga";

export default function* rootSaga() {
  yield all([
    fork(hdfcAuthSaga),
    fork(loginSaga),
    fork(salesDashboardSaga),
    fork(nocDashboardSaga),
    fork(projectSummarySaga),
    fork(InvestmentDetailsSaga),
    fork(portfolioSummaryinSaga),
    fork(CashflowDetailsSaga),
    fork(constructionDashboardSaga),
    fork(dashboardRemarkSaga),
    fork(hdfcSaga),
    fork(NOCPrefrencesSaga),
    fork(reportSaga),
    fork(nocSetupSaga),
    fork(manageDocsUpdateSaga),
    fork(summarySaga),
    fork(cashflowSaga),
  ]);
}

