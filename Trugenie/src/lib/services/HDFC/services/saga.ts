import { AllEffect, ForkEffect, all, fork } from "redux-saga/effects";
import hdfcCommonsSaga from "../Commons/saga";
import customerGroupSaga from "../CustomerGroupServices/saga";
import studentSaga from "../Student/saga";
import customerInvesteeSaga from "../CustomerInvesteeCompany/saga";
import externalNOCSaga from "../ExternalNOC/saga";
import externalUserSaga from "../ExternalUser/saga";
import internalUserSaga from "../InternalUser/saga";
import locationSaga from "../Location/saga";
import salesMonitoringSaga from "../MonitoringSheet/saga";
import manageRequestSaga from "../NOCManageRequest/saga";
import projectSaga from "../Project/saga";
import ProjectSetupSaga from "../ProjectSetupUpdate/saga";
import RegionSaga from "../Region/saga";
import salesSaga from "../Sales/saga";
import zonesSaga from "../Zone/saga";
import downLoadRowDataSaga from "../common/saga";
import FundsSaga from '../Portfolio/saga';
import excelSaga from "../Construction/ExcelUpload/saga";
import lenderSaga from "../Lender/saga";
import debentureSaga from "../Debenture Trustee/saga";
import pmcSaga from "../PMC/saga";
import investmentSaga from "../Investment/saga";
import fundsSaga from "../Funds/saga";
import entityInvestmentSaga from "../Entity-Investment/saga";
import physicalProgressSaga from "../Construction/PhysicalProgress/saga";
import siteImageSaga from "../Construction/SiteImage/saga";
import approvalSaga from "../Construction/Approvals/saga";
import clientSaga from "../Client/saga";
import DeveloperlocationSaga from "../DeveloperLocation/saga"
export default function* hdfcSaga(): Generator<AllEffect<ForkEffect<void>>, void, unknown> {
  yield all([
    fork(downLoadRowDataSaga),
    fork(externalNOCSaga),
    fork(customerGroupSaga),
    fork(zonesSaga),
    fork(salesSaga),
    fork(salesMonitoringSaga),
    fork(internalUserSaga),
    fork(externalUserSaga),
    fork(projectSaga),
    // fork(customerInvesteeSaga),
    fork(hdfcCommonsSaga),
    fork(manageRequestSaga),
    fork(RegionSaga),
    fork(locationSaga),
    fork(ProjectSetupSaga),
    fork(customerInvesteeSaga),
    fork(FundsSaga),
    fork(excelSaga),
    fork(lenderSaga),
    fork(debentureSaga),
    fork(pmcSaga),
    fork(investmentSaga),
    fork(fundsSaga),
    fork(entityInvestmentSaga),
    fork(physicalProgressSaga),
    fork(siteImageSaga),
    fork(approvalSaga),
    fork(clientSaga),
    fork(DeveloperlocationSaga),
    fork(studentSaga)
  ]);
}
