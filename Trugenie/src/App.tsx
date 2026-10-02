import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import Permissions from "../src/utils/permissions";
import "./assets/Styles/CustomTooltip.css";
import "./assets/Styles/DashBoard.css";
import "./assets/Styles/Mapcolor.css";
import "./assets/Styles/ReCharts.css";
import { hdfcTheme } from "./assets/hdfcTheme";
import "./assets/style.css";
import useBreadcrumbLoaders from "./hooks/useBreadcrumbHelpers";
import PageContainer from "./layout/appShell/AppShell/PageContainer";
import { setDisplayNumberSystem } from "./lib/services/common/action";
import { UserRoles } from "./lib/services/hdfc_login/dataTypes";
import { selectAccessToken, selectUserDetails, selectUserPermissions } from "./lib/services/hdfc_login/selectors";
import BreadCrumbs from "./modules/Components/BreadCrumbs";
import { NotFoundPage } from "./modules/Components/NotFound";
import CashflowDashboard from "./modules/pages/DashboardContainer/CashflowDashboard";
import ConstructionDashboard from "./modules/pages/DashboardContainer/ConstructionDashboard";
import NOCDashboard from "./modules/pages/DashboardContainer/NOCDashboard";
import ProjectSummary from "./modules/pages/DashboardContainer/ProjectSummary";
import SalesDashboard from "./modules/pages/DashboardContainer/SalesDashboard";
// import MonitoringPage from "./modules/pages/DashboardContainer/TycoonMonitoring";
import CustomerGroupPage from "./modules/pages/HDFC/CustomerGroupPage";
import Student from "./modules/pages/HDFC/Student";
import CustomerInvesteeCompany from "./modules/pages/HDFC/CustomerInvesteeCompany";
import ExternalNOC from "./modules/pages/HDFC/External NOC";
import EntityLocation from "./modules/pages/HDFC/Location";
// import DocsTimeline from "./modules/pages/HDFC/ManageDocs/Update/DocsTimeline";
// import ManageDocsUpdate from "./modules/pages/HDFC/ManageDocs/Update/ManageDocsUpdate";
// import MonitoringSheetUpdate from "./modules/pages/HDFC/MonitoringSheet/MonitoringSheetUpdate";
import ManageRequestList from "./modules/pages/HDFC/NOC/ManageRequest";
import AuthorizationRequestPage from "./modules/pages/HDFC/NOC/ManageRequest/AuthorizationRequestPage";
import NOCTransactionReportPage from "./modules/pages/HDFC/NOC/TransactionReports";
import NOCSetupUpdate from "./modules/pages/HDFC/NOCSetup/NOCSetupUpdate";
import NOCPreferences from "./modules/pages/HDFC/Preference/preferance";
import AddProject from "./modules/pages/HDFC/Project/addProject";
import AssignUserInProject from "./modules/pages/HDFC/Project/assignUser";
import EditProject from "./modules/pages/HDFC/Project/editProject";
import EnableDisableProject from "./modules/pages/HDFC/Project/enableDisableProject";
import ProjectPage from "./modules/pages/HDFC/Project/project";
import TimelineProject from "./modules/pages/HDFC/Project/timelineProject";
import ViewProject from "./modules/pages/HDFC/Project/viewProject";
import ProjectSetupApprove from "./modules/pages/Setup/Approve/Project/ProjectSetupApprove";
import ProjectSetupUpdate from "./modules/pages/Setup/Update/Project/ProjectSetupUpdate";
import ProjectsList from "./modules/pages/HDFC/ProjectsList";
import LandingPage from "./modules/pages/landingPages/landingPage";
import EntityRegion from "./modules/pages/HDFC/Region";
import ReportPage from "./modules/pages/HDFC/Reports";
import TransactionReportPage from "./modules/pages/HDFC/Reports/TransactionReports";
import UpdateMaster from "./modules/pages/HDFC/UpdateMaster";
import UpdateExternalUser from "./modules/pages/HDFC/UserManagement/ExternalUsers";
import AddExternalUser from "./modules/pages/HDFC/UserManagement/ExternalUsers/AddExternalUser";
import ApproveExternalUser from "./modules/pages/HDFC/UserManagement/ExternalUsers/Approve";
import ApproveSpecificExternalUser from "./modules/pages/HDFC/UserManagement/ExternalUsers/Approve/ApproveSpecificExternalUser";
import ViewExternalUser, { ViewExternalUserTotalView } from "./modules/pages/HDFC/UserManagement/ExternalUsers/ViewExternalUser";
import UpdateInternalUser from "./modules/pages/HDFC/UserManagement/InternalUsers";
import AddInternalUser from "./modules/pages/HDFC/UserManagement/InternalUsers/AddInternalUser";
import ApproveInternalUser from "./modules/pages/HDFC/UserManagement/InternalUsers/Approve";
import ApproveSpecificInternalUser from "./modules/pages/HDFC/UserManagement/InternalUsers/Approve/ApproveSpecificInternalUser";
import ApprovedDetailPage from "./modules/pages/HDFC/UserManagement/InternalUsers/View/ApprovedDetailPage";
import ViewInternalUser from "./modules/pages/HDFC/UserManagement/InternalUsers/View/ViewInternalUser";
import ViewPendingOrRejectedInternalUser from "./modules/pages/HDFC/UserManagement/InternalUsers/View/ViewInternalUserWithOldValues";
import EntityZone from "./modules/pages/HDFC/Zone";
import InvestmentsPerformance from "./modules/pages/InvestmentsDashboard";
import { ROUTES } from "./routeConstants";
import { HasPermission, ProtectedRoute } from "./utils/HasPermission";
import LoginPage from "./widgets/login";
import IdleTimerComponent from "./layout/appShell/IdleTimerComponent";
import ConstructionUpdate from "./modules/pages/HDFC/Construction/ConstructionUpdate";
import ConstructionApprove from "./modules/pages/HDFC/Construction/ConstructionApprove";
import CashflowUpdate from "./modules/pages/Cashflow/Update/CashflowUpdate";
import CashflowApprove from "./modules/pages/Cashflow/Approve/CashflowApprove";
import SummaryUpdate from "./modules/pages/Summary/Update/SummaryUpdate";
import SummaryApprove from "./modules/pages/Summary/Approve/SummaryApprove";
import PortfolioUpdate from "./modules/pages/HDFC/Portfolio/Update/PortfolioUpdate";
import PortfolioApprove from "./modules/pages/HDFC/Portfolio/Approve/PortfolioApprove";
import InvestmentUpdate from "./modules/pages/Investment/Update/InvestmentUpdate";
import InvestmentApprove from "./modules/pages/Investment/Approve/InvestmentApprove";
import ClientPage from "./modules/pages/HDFC/Client";
import LenderPage from "./modules/pages/HDFC/Lender";
import DebentureTrusteePage from "./modules/pages/HDFC/Debenture Trustee";
import PMCPage from "./modules/pages/HDFC/PMC";
import FundPage from "./modules/pages/HDFC/Fund";
import InvestmentPage from "./modules/pages/HDFC/Entity-Investment";
import ConstructionUpdateSetup from "./modules/pages/Setup/Update/Construction/ConstructionUpdateSetup";
import OpexUpdateSetup from "./modules/pages/Setup/Update/Opex/OpexUpdateSetup";
import SalesUpdate from "./modules/pages/Sales/Update/SalesUpdate";
import SalesApprove from "./modules/pages/Sales/Approve/SalesApprove";
import SummaryApproveSetup from "./modules/pages/Setup/Approve/Summary/SummaryApproveSetup";
import CashflowApproveSetup from "./modules/pages/Setup/Approve/Cashflow/CashflowApproveSetup";
import OpexApproveSetup from "./modules/pages/Setup/Approve/Opex/OpexApproveSetup";
import PortfolioView from "./modules/pages/Portfolio/Dashboard";
import InvestmentList from "./modules/pages/landingPages//investmentList";
import SwitchClient from "./layout/appShell/SwitchClient";
import SetupUpdate from "./modules/pages/Setup/Update/SetupUpdate";
import SetupApprove from "./modules/pages/Setup/Approve/SetupApprove";
import CashflowUpdateSetup from "./modules/pages/Setup/Update/Cashflow/CashflowUpdateSetup";
import ConstructionApproveSetup from "./modules/pages/Setup/Approve/Construction/ConstructionApproveSetup";
import SummaryUpdateSetup from "./modules/pages/Setup/Update/Summary/SummaryUpdateSetup";
import InvestmentUpdateSetup from "./modules/pages/Setup/Update/Investment/InvestmentUpdateSetup";
import InvestmentApproveSetup from "./modules/pages/Setup/Approve/Investment/InvestmentApproveSetup";
import GroupHeadOffice from "./modules/pages/HDFC/DeveloperLocation"

function App() {
  const token = useSelector(selectAccessToken);
  const userDetail = useSelector(selectUserDetails);
  const permissionsArray = useSelector(selectUserPermissions);
  const isLoggedIn: boolean = token !== undefined;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setDisplayNumberSystem("INR cr", "INR Lacs"));
    // dispatch(setDisplayUnitNumberSystem("INR Lacs"));
  }, []);

  const { pathLoaders, showProjectNameForPaths } = useBreadcrumbLoaders();

  return (
    <MantineProvider theme={hdfcTheme}>
      <Notifications limit={1} />
      <PageContainer hideLayout={!isLoggedIn}>
        <ModalsProvider>
          {!isLoggedIn ? (
            <BreadCrumbs
              hidelist={[ROUTES.HOMEPAGE, ROUTES.PROJECT_LIST, ROUTES.INVESTMENT_LIST, ROUTES.LANDING_PAGE, ROUTES.SWITCH_CLIENT]}
              loadingPaths={pathLoaders}
              showProjectNameForPaths={showProjectNameForPaths}
            />
          ) : null}
          {!isLoggedIn || !userDetail?.TemplateRoleName || !permissionsArray ? (
            <Routes>
              <Route path={ROUTES.HOMEPAGE} element={<LoginPage />} />
              <Route path='*' element={<Navigate to={ROUTES.HOMEPAGE} replace />} />
            </Routes>
          ) : (
            <IdleTimerComponent>
              <Routes>
                {/* DEFAULT */}
                <Route
                  path={ROUTES.HOMEPAGE}
                  element={
                    <>
                      <ProtectedRoute
                        rolesAllowed={[UserRoles.ROLE1, UserRoles.RM]}
                        rolePermissions={[]}
                        userDetails={userDetail}
                        permissionsArray={permissionsArray}>
                        <Navigate to={ROUTES.LANDING_PAGE} replace />
                      </ProtectedRoute>

                      <ProtectedRoute
                        rolesAllowed={[UserRoles.ADMIN_MAKER, UserRoles.ADMIN, UserRoles.ADMIN_CHECKER]}
                        rolePermissions={[Permissions.CAN_VIEW_DEV_CUST_GRP]}
                        userDetails={userDetail}
                        permissionsArray={permissionsArray}>
                        <Navigate to={ROUTES.CUSTOMER_GROUP_PAGE} replace />
                      </ProtectedRoute>
                    </>
                  }
                />

                <Route
                  path={ROUTES.LANDING_PAGE}
                  element={
                    // <ProtectedRoute rolesAllowed={[UserRoles.ROLE1, UserRoles.RM]} rolePermissions={[]} userDetails={userDetail} permissionsArray={permissionsArray}>
                    <LandingPage />
                    // </ProtectedRoute>
                  }
                />

                <Route
                  path={ROUTES.SWITCH_CLIENT}
                  element={
                    // <HasPermission permissions={[Permissions.CAN_VIEW_DEV_CUST_INVESTEE]} fallback={<NotFoundPage />}>
                    <SwitchClient />
                    // </HasPermission>
                  }
                />

                {/* Project list*/}
                <Route
                  path={ROUTES.PROJECT_LIST}
                  element={
                    // <ProtectedRoute rolesAllowed={[UserRoles.ROLE1]} rolePermissions={[]} userDetails={userDetail} permissionsArray={permissionsArray}>
                    <ProjectsList />
                    // </ProtectedRoute>
                  }
                />

                {/* investment list */}
                <Route
                  path={ROUTES.INVESTMENT_LIST}
                  element={
                    // <HasPermission permissions={[Permissions.Can_View_Investment_Dashboard]} fallback={<NotFoundPage />}>
                    <InvestmentList />
                    // </HasPermission>
                  }
                />
                {/*================================= Entity Start=====================================*/}
                <>
                  <Route
                    path={ROUTES.CUSTOMER_GROUP_PAGE}
                    element={
                      <HasPermission permissions={[Permissions.CAN_VIEW_DEV_CUST_GRP]} fallback={<NotFoundPage />}>
                        <CustomerGroupPage />
                      </HasPermission>
                    }
                  />
                   <Route
                    path={ROUTES.STUDENT_PAGE}
                    element={
                      // <HasPermission permissions={[Permissions.CAN_VIEW_DEV_CUST_GRP]} fallback={<NotFoundPage />}>
                        <Student />
                      // </HasPermission>
                    }
                  />

                  {/* Customer-Investee */}
                  <Route
                    path={ROUTES.CUSTOMER_INVESTEE_COMPANY}
                    element={
                      <HasPermission permissions={[Permissions.CAN_VIEW_DEV_CUST_INVESTEE]} fallback={<NotFoundPage />}>
                        <CustomerInvesteeCompany />
                      </HasPermission>
                    }
                  />

                  <Route
                    path={ROUTES.PROJECT_PAGE}
                    element={
                      <HasPermission permissions={[Permissions.CAN_VIEW_PROJECT]} fallback={<NotFoundPage />}>
                        <ProjectPage />
                      </HasPermission>
                    }
                  />
                  <Route
                    path={ROUTES.VIEW_PROJECT_PAGE}
                    element={
                      <HasPermission permissions={[Permissions.CAN_VIEW_PROJECT]} fallback={<NotFoundPage />}>
                        <ViewProject />
                      </HasPermission>
                    }
                  />

                  <Route
                    path={ROUTES.ENABLE_DISABLE_PROJECT_PAGE}
                    element={
                      <HasPermission permissions={[Permissions.CAN_VIEW_PROJECT]} fallback={<NotFoundPage />}>
                        <EnableDisableProject />
                      </HasPermission>
                    }
                  />
                  <Route
                    path={ROUTES.ASSIGN_USER_PROJECT_PAGE}
                    element={
                      <HasPermission permissions={[Permissions.CAN_VIEW_PROJECT]} fallback={<NotFoundPage />}>
                        <AssignUserInProject />
                      </HasPermission>
                    }
                  />
                  <Route
                    path={ROUTES.TIMELINE_PROJECT_PAGE}
                    element={
                      <HasPermission permissions={[Permissions.CAN_VIEW_PROJECT]} fallback={<NotFoundPage />}>
                        <TimelineProject />
                      </HasPermission>
                    }
                  />

                  <Route
                    path={ROUTES.EDIT_PROJECT_PAGE}
                    element={
                      <HasPermission permissions={[Permissions.CAN_VIEW_PROJECT]} fallback={<NotFoundPage />}>
                        <EditProject />
                      </HasPermission>
                    }
                  />
                  <Route
                    path={ROUTES.ADD_PROJECT_PAGE}
                    element={
                      <HasPermission permissions={[Permissions.CAN_VIEW_PROJECT]} fallback={<NotFoundPage />}>
                        <AddProject />
                      </HasPermission>
                    }
                  />
                  {/* Master */}
                  <Route
                    path={ROUTES.ZONE}
                    element={
                      <HasPermission permissions={[Permissions.CAN_VIEW_ENTITY_MASTER]} fallback={<NotFoundPage />}>
                        <EntityZone />
                      </HasPermission>
                    }
                  />
                  <Route
                    path={ROUTES.REGION}
                    element={
                      <HasPermission permissions={[Permissions.CAN_VIEW_ENTITY_MASTER]} fallback={<NotFoundPage />}>
                        <EntityRegion />
                      </HasPermission>
                    }
                  />
                  <Route
                    path={ROUTES.LOCATION}
                    element={
                      <HasPermission permissions={[Permissions.CAN_VIEW_ENTITY_MASTER]} fallback={<NotFoundPage />}>
                        <EntityLocation />
                      </HasPermission>
                    }
                  />

                  <Route
                    path={ROUTES.CLIENT}
                    element={
                      <HasPermission permissions={[Permissions.CAN_VIEW_DEV_CUST_GRP]} fallback={<NotFoundPage />}>
                        <ClientPage />
                      </HasPermission>
                    }
                  />
                  <Route
                    path={ROUTES.LENDER}
                    element={
                      <HasPermission permissions={[Permissions.CAN_VIEW_DEV_CUST_GRP]} fallback={<NotFoundPage />}>
                        <LenderPage />
                      </HasPermission>
                    }
                  />
                  <Route
                    path={ROUTES.DEBENTURE_TRUSTEE}
                    element={
                      <HasPermission permissions={[Permissions.CAN_VIEW_DEV_CUST_GRP]} fallback={<NotFoundPage />}>
                        <DebentureTrusteePage />
                      </HasPermission>
                    }
                  />
                  <Route
                    path={ROUTES.PMC}
                    element={
                      <HasPermission permissions={[Permissions.CAN_VIEW_DEV_CUST_GRP]} fallback={<NotFoundPage />}>
                        <PMCPage />
                      </HasPermission>
                    }
                  />
                  <Route
                    path={ROUTES.FUND}
                    element={
                      <HasPermission permissions={[Permissions.CAN_VIEW_DEV_CUST_GRP]} fallback={<NotFoundPage />}>
                        <FundPage />
                      </HasPermission>
                    }
                  />
                  <Route
                    path={ROUTES.INVESTMENT}
                    element={
                      <HasPermission permissions={[Permissions.CAN_VIEW_DEV_CUST_GRP]} fallback={<NotFoundPage />}>
                        <InvestmentPage />
                      </HasPermission>
                    }
                  />
                </>
                {/*================================= Entity End=====================================*/}

                {/*================================= USER MANAGEMENT End=====================================*/}
                <>
                  {/* InternaUser */}
                  <Route
                    path={ROUTES.ADD_USER}
                    element={
                      <HasPermission permissions={[Permissions.CAN_UPDATE_INTERNAL_USER]} fallback={<NotFoundPage />}>
                        <AddInternalUser />
                      </HasPermission>
                    }
                  />
                  <Route
                    path={ROUTES.UPDATE_USER}
                    element={
                      <HasPermission permissions={[Permissions.CAN_UPDATE_INTERNAL_USER]} fallback={<NotFoundPage />}>
                        <UpdateInternalUser />
                      </HasPermission>
                    }
                  />
                  <Route
                    path={ROUTES.APPROVE_USER}
                    element={
                      <HasPermission permissions={[Permissions.CAN_APPROVE_INTERNAL_USER]} fallback={<NotFoundPage />}>
                        <ApproveInternalUser />
                      </HasPermission>
                    }
                  />
                  <Route
                    path={ROUTES.VIEW_USER}
                    element={
                      <HasPermission permissions={[Permissions.CAN_APPROVE_INTERNAL_USER, Permissions.CAN_UPDATE_INTERNAL_USER]} fallback={<NotFoundPage />}>
                        <ViewInternalUser />
                      </HasPermission>
                    }
                  />
                  <Route
                    path={ROUTES.VIEW_INTERNAL_USER_FOR_PENDING_AND_REJECTED}
                    element={
                      <HasPermission permissions={[Permissions.CAN_APPROVE_INTERNAL_USER, Permissions.CAN_UPDATE_INTERNAL_USER]} fallback={<NotFoundPage />}>
                        <ViewPendingOrRejectedInternalUser />
                      </HasPermission>
                    }
                  />
                  <Route
                    path={ROUTES.VIEW_INTERNAL_USER_FOR_APPROVE_REJECTED}
                    element={
                      <HasPermission permissions={[Permissions.CAN_APPROVE_INTERNAL_USER, Permissions.CAN_UPDATE_INTERNAL_USER]} fallback={<NotFoundPage />}>
                        <ViewPendingOrRejectedInternalUser />
                      </HasPermission>
                    }
                  />
                  <Route
                    path={ROUTES.VIEW_INTERNAL_USER_FOR_REJECTED}
                    element={
                      <HasPermission permissions={[Permissions.CAN_APPROVE_INTERNAL_USER, Permissions.CAN_UPDATE_INTERNAL_USER]} fallback={<NotFoundPage />}>
                        <ViewPendingOrRejectedInternalUser />
                      </HasPermission>
                    }
                  />
                  <Route
                    path={ROUTES.APPROVE_SPECIFIC_INTERNAL_USER}
                    element={
                      <HasPermission permissions={[Permissions.CAN_APPROVE_INTERNAL_USER]} fallback={<NotFoundPage />}>
                        <ApproveSpecificInternalUser />
                      </HasPermission>
                    }
                  />
                  <Route
                    path={ROUTES.INTERNAL_USER_APPROVED_DETAILS}
                    element={
                      <HasPermission permissions={[Permissions.CAN_APPROVE_INTERNAL_USER]} fallback={<NotFoundPage />}>
                        <ApprovedDetailPage />
                      </HasPermission>
                    }
                  />
                  {/* ExternalUser */}
                  <Route
                    path={ROUTES.ADD_EXTERNAL_USER}
                    element={
                      <HasPermission permissions={[Permissions.CAN_UPDATE_EXTERNAL_USERS]} fallback={<NotFoundPage />}>
                        <AddExternalUser />
                      </HasPermission>
                    }
                  />
                  <Route
                    path={ROUTES.UPDATE_EXTERNAL_USER}
                    element={
                      <HasPermission permissions={[Permissions.CAN_UPDATE_EXTERNAL_USERS]} fallback={<NotFoundPage />}>
                        <UpdateExternalUser />
                      </HasPermission>
                    }
                  />
                  <Route
                    path={ROUTES.VIEW_EXTERNAL_USER_PENDING_FOR_APPROVAL}
                    element={
                      <HasPermission permissions={[Permissions.CAN_APPROVE_EXTERNAL_USERS, Permissions.CAN_UPDATE_EXTERNAL_USERS]} fallback={<NotFoundPage />}>
                        <ViewExternalUser />
                      </HasPermission>
                    }
                  />
                  <Route
                    path={ROUTES.VIEW_EXTERNAL_USER_REJECTED_USER}
                    element={
                      <HasPermission permissions={[Permissions.CAN_APPROVE_EXTERNAL_USERS, Permissions.CAN_UPDATE_EXTERNAL_USERS]} fallback={<NotFoundPage />}>
                        <ViewExternalUser />
                      </HasPermission>
                    }
                  />
                  <Route
                    path={ROUTES.VIEW_EXTERNAL_TOTAL_USER}
                    element={
                      <HasPermission permissions={[Permissions.CAN_APPROVE_EXTERNAL_USERS]} fallback={<NotFoundPage />}>
                        <ViewExternalUserTotalView />
                      </HasPermission>
                    }
                  />
                  <Route
                    path={ROUTES.APPROVE_EXTERNAL_USER}
                    element={
                      <HasPermission permissions={[Permissions.CAN_APPROVE_EXTERNAL_USERS]} fallback={<NotFoundPage />}>
                        <ApproveExternalUser />
                      </HasPermission>
                    }
                  />
                  <Route
                    path={ROUTES.APPROVE_SPECIFIC_EXTERNAL_USER}
                    element={
                      <HasPermission permissions={[Permissions.CAN_APPROVE_EXTERNAL_USERS]} fallback={<NotFoundPage />}>
                        <ApproveSpecificExternalUser />
                      </HasPermission>
                    }
                  />

                  <Route
                    path={ROUTES.REPORTS}
                    element={
                      <HasPermission permissions={[Permissions.CAN_VIEW_UAM_REPORTS]} fallback={<NotFoundPage />}>
                        <ReportPage />
                      </HasPermission>
                    }
                  />
                  <Route
                    path={ROUTES.TRANSACTION_REPORTS}
                    element={
                      <HasPermission permissions={[Permissions.CAN_VIEW_TRANSACTION_REPORTS]} fallback={<NotFoundPage />}>
                        <TransactionReportPage />
                      </HasPermission>
                    }
                  />

                  {/* Update-Master */}
                  <Route
                    path={ROUTES.UPDATE_MASTER}
                    element={
                      <HasPermission permissions={[Permissions.CAN_UPDATE_USER_MASTER]} fallback={<NotFoundPage />}>
                        <UpdateMaster />
                      </HasPermission>
                    }
                  />
                </>

                {/*================================= USER MANAGEMENT End=====================================*/}

                {/*================================= Portfolio Start=====================================*/}
                <>
                  <Route
                    path={ROUTES.PORTFOLIO_VIEW_DASHBOARD}
                    element={
                      <HasPermission permissions={[Permissions.Can_View_Portfolio_Dashboard]} fallback={<NotFoundPage />}>
                        <PortfolioView />
                      </HasPermission>
                    }
                  />

                  <Route
                    path={ROUTES.PORTFOLIO_UPDATE}
                    element={
                      <HasPermission permissions={[Permissions.Can_Update_Portfolio]} fallback={<NotFoundPage />}>
                        <PortfolioUpdate />
                      </HasPermission>
                    }
                  />
                  <Route
                    path={ROUTES.PORTFOLIO_APPROVE}
                    element={
                      <HasPermission permissions={[Permissions.Can_Approve_Portfolio]} fallback={<NotFoundPage />}>
                        <PortfolioApprove />
                      </HasPermission>
                    }
                  />
                </>
                {/* ==========================================Portfolio End================================*/}

                {/* ==========================================Investment Start================================*/}
                <>
                  <Route
                    path={ROUTES.INVESTMENTS_DASHBOARD}
                    element={
                      <HasPermission permissions={[Permissions.Can_View_Investment_Dashboard]} fallback={<NotFoundPage />}>
                        <InvestmentsPerformance />
                      </HasPermission>
                    }
                  />

                  <Route
                    path={ROUTES.INVESTMENT_UPDATE}
                    element={
                      <HasPermission permissions={[Permissions.Can_View_Investment_Update]} fallback={<NotFoundPage />}>
                        <InvestmentUpdate />
                      </HasPermission>
                    }
                  />
                  <Route
                    path={ROUTES.INVESTMENT_APPROVE}
                    element={
                      <HasPermission permissions={[Permissions.Can_View_Investment_Approve]} fallback={<NotFoundPage />}>
                        <InvestmentApprove />
                      </HasPermission>
                    }
                  />

                  {/* INVESTMENT-SETUP */}
                  <Route
                    path={ROUTES.INVESTMENT_SETUP_UPDATE}
                    element={
                      <HasPermission permissions={[Permissions.Can_Update_Setup_Investment]} fallback={<NotFoundPage />}>
                        <InvestmentUpdateSetup />
                      </HasPermission>
                    }
                  />
                  <Route
                    path={ROUTES.INVESTMENT_SETUP_APPROVE}
                    element={
                      <HasPermission permissions={[Permissions.Can_Approve_Setup_Investment]} fallback={<NotFoundPage />}>
                        <InvestmentApproveSetup />
                      </HasPermission>
                    }
                  />
                </>
                {/* ==========================================Investment End================================*/}

                {/* Summary */}
                <Route
                  path={ROUTES.PROJECTSUMMARY}
                  element={
                    <HasPermission permissions={[Permissions.Can_View_Summary_Dashboard]} fallback={<NotFoundPage />}>
                      <ProjectSummary />
                    </HasPermission>
                  }
                />
                <Route
                  path={ROUTES.SUMMARY_UPDATE}
                  element={
                    <HasPermission permissions={[Permissions.Can_Update_Summary]} fallback={<NotFoundPage />}>
                      <SummaryUpdate />
                    </HasPermission>
                  }
                />

                <Route
                  path={ROUTES.SUMMARY_APPROVE}
                  element={
                    <HasPermission permissions={[Permissions.Can_Approve_Summary]} fallback={<NotFoundPage />}>
                      <SummaryApprove />
                    </HasPermission>
                  }
                />

                {/* SALES */}
                <Route
                  path={ROUTES.SALES_DASHBOARD_V2}
                  element={
                    <HasPermission permissions={[Permissions.CAN_VIEW_SALES]} fallback={<NotFoundPage />}>
                      <SalesDashboard />
                    </HasPermission>
                  }
                />
                <Route
                  path={ROUTES.SALES_UPDATE}
                  element={
                    <HasPermission permissions={[Permissions.CAN_UPDATE_SALES]} fallback={<NotFoundPage />}>
                      <SalesUpdate />
                    </HasPermission>
                  }
                />
                <Route
                  path={ROUTES.SALES_APPROVE}
                  element={
                    <HasPermission permissions={[Permissions.CAN_APPROVE_SALES]} fallback={<NotFoundPage />}>
                      <SalesApprove />
                    </HasPermission>
                  }
                />

                {/* CONSTRUCTION */}
                <Route
                  path={ROUTES.CONSTRUCTION_DASHBOARD_V2}
                  element={
                    <HasPermission permissions={[Permissions.Can_View_Construction_Dashboard]} fallback={<NotFoundPage />}>
                      <ConstructionDashboard />
                    </HasPermission>
                  }
                />

                <Route
                  path={ROUTES.CONSTRUCTION_UPDATE}
                  element={
                    <HasPermission permissions={[Permissions.Can_Update_Construction]} fallback={<NotFoundPage />}>
                      <ConstructionUpdate />
                    </HasPermission>
                  }
                />

                <Route
                  path={ROUTES.CONSTRUCTION_APPROVE}
                  element={
                    <HasPermission permissions={[Permissions.Can_Approve_Construction]} fallback={<NotFoundPage />}>
                      <ConstructionApprove />
                    </HasPermission>
                  }
                />

                {/* Cash Flow */}
                <Route
                  path={ROUTES.CASHFLOW_DASHBOARD}
                  element={
                    <HasPermission permissions={[Permissions.Can_View_Cashflow_Dashboard]} fallback={<NotFoundPage />}>
                      <CashflowDashboard />
                    </HasPermission>
                  }
                />
                <Route
                  path={ROUTES.CASHFLOW_UPDATE}
                  element={
                    <HasPermission permissions={[Permissions.Can_Update_Cashflow]} fallback={<NotFoundPage />}>
                      <CashflowUpdate />
                    </HasPermission>
                  }
                />
                <Route
                  path={ROUTES.CASHFLOW_APPROVE}
                  element={
                    <HasPermission permissions={[Permissions.Can_Approve_Cashflow]} fallback={<NotFoundPage />}>
                      <CashflowApprove />
                    </HasPermission>
                  }
                />

                {/* NOC */}
                <Route
                  path={ROUTES.NOC_DASHBOARD}
                  element={
                    <HasPermission permissions={[Permissions.CAN_VIEW_NOC_DASHBOARD]} fallback={<NotFoundPage />}>
                      <NOCDashboard />
                    </HasPermission>
                  }
                />
                <Route
                  path={ROUTES.NOC_MANAGE_REQUEST}
                  element={
                    <HasPermission permissions={[Permissions.CAN_VIEW_MANAGE_REQUEST]} fallback={<NotFoundPage />}>
                      <ManageRequestList />
                    </HasPermission>
                  }
                />
                <Route
                  path={ROUTES.NOC_TRANSACTION_REPORTS}
                  element={
                    <HasPermission permissions={[Permissions.CAN_VIEW_NOC_TRANSACTION_REPORTS]} fallback={<NotFoundPage />}>
                      <NOCTransactionReportPage />
                    </HasPermission>
                  }
                />
                <Route
                  path={ROUTES.AUTHORIZATION_REQUEST_PAGE}
                  element={
                    <HasPermission permissions={[Permissions.CAN_VIEW_MANAGE_REQUEST]} fallback={<NotFoundPage />}>
                      <AuthorizationRequestPage />
                    </HasPermission>
                  }
                />
                <Route
                  path={ROUTES.AUTHORIZATION_CANCEL_REQUEST_PAGE}
                  element={
                    <HasPermission permissions={[Permissions.CAN_VIEW_MANAGE_REQUEST]} fallback={<NotFoundPage />}>
                      <AuthorizationRequestPage />
                    </HasPermission>
                  }
                />
                <Route
                  path={ROUTES.AUTHORIZATION_ISSUE_REQUEST_PAGE}
                  element={
                    <HasPermission permissions={[Permissions.CAN_VIEW_MANAGE_REQUEST]} fallback={<NotFoundPage />}>
                      <AuthorizationRequestPage />
                    </HasPermission>
                  }
                />
                <Route
                  path={ROUTES.AUTHORIZATION_VIEW_REQUEST_PAGE}
                  element={
                    <HasPermission permissions={[Permissions.CAN_VIEW_MANAGE_REQUEST]} fallback={<NotFoundPage />}>
                      <AuthorizationRequestPage />
                    </HasPermission>
                  }
                />
                <Route
                  path={ROUTES.NOC_PREFERENCES}
                  element={
                    <HasPermission permissions={[Permissions.CAN_VIEW_PREFERENCES]} fallback={<NotFoundPage />}>
                      <NOCPreferences />
                    </HasPermission>
                  }
                />
                <Route
                  path={ROUTES.EXTERNAL_NOC}
                  element={
                    <HasPermission permissions={[Permissions.CAN_VIEW_EXTERNAL_NOC]} fallback={<NotFoundPage />}>
                      <ExternalNOC />
                    </HasPermission>
                  }
                />

                {/* MONITORING */}
                {/* <Route
                  path={ROUTES.MONITORING_PAGE}
                  element={
                    <HasPermission permissions={[Permissions.CAN_VIEW_MONITORINGSHEET]} fallback={<NotFoundPage />}>
                      <MonitoringPage />
                    </HasPermission>
                  }
                />
                <Route
                  path={ROUTES.UPDATE_MONITORING_SHEET}
                  element={
                    <HasPermission permissions={[Permissions.CAN_UPDATE_MONITORINGSHEET]} fallback={<NotFoundPage />}>
                      <MonitoringSheetUpdate />
                    </HasPermission>
                  }
                /> */}

                {/* MANAGE DOCS */}
                {/* <Route
                  path={ROUTES.MANAGE_DOCS_UPDATE}
                  element={
                    <HasPermission permissions={[Permissions.CAN_UPDATE_DOC]} fallback={<NotFoundPage />}>
                      <ManageDocsUpdate />
                    </HasPermission>
                  }
                />
                <Route
                  path={ROUTES.MANAGE_DOCS_TIMELINE}
                  element={
                    <HasPermission permissions={[Permissions.CAN_UPDATE_DOC]} fallback={<NotFoundPage />}>
                      <DocsTimeline />
                    </HasPermission>
                  }
                /> */}

                {/* SETUP */}
                <Route
                  path={ROUTES.SETUP_UPDATE}
                  element={
                    <HasPermission permissions={[Permissions.CAN_UPDATE_SETUP]} fallback={<NotFoundPage />}>
                      <SetupUpdate />
                    </HasPermission>
                  }
                />
                <Route
                  path={ROUTES.SETUP_APPROVE}
                  element={
                    <HasPermission permissions={[Permissions.CAN_APPROVE_SETUP]} fallback={<NotFoundPage />}>
                      <SetupApprove />
                    </HasPermission>
                  }
                />
                <Route
                  path={ROUTES.PROJECT_SETUP_UPDATE}
                  element={
                    <HasPermission permissions={[Permissions.CAN_UPDATE_SETUP]} fallback={<NotFoundPage />}>
                      <ProjectSetupUpdate />
                    </HasPermission>
                  }
                />
                <Route
                  path={ROUTES.PROJECT_APPROVE_SETUP}
                  element={
                    <HasPermission permissions={[Permissions.CAN_APPROVE_SETUP]} fallback={<NotFoundPage />}>
                      <ProjectSetupApprove />
                    </HasPermission>
                  }
                />

                <Route
                  path={ROUTES.NOC_SETUP_UPDATE}
                  element={
                    <HasPermission permissions={[Permissions.CAN_UPDATE_SETUP]} fallback={<NotFoundPage />}>
                      <NOCSetupUpdate />
                    </HasPermission>
                  }
                />

                <Route
                  path={ROUTES.CONSTRUCTION_SETUP_UPDATE}
                  element={
                    <HasPermission permissions={[Permissions.CAN_UPDATE_SETUP]} fallback={<NotFoundPage />}>
                      <ConstructionUpdateSetup />
                    </HasPermission>
                  }
                />
                <Route
                  path={ROUTES.OPEX_SETUP_UPDATE}
                  element={
                    <HasPermission permissions={[Permissions.CAN_UPDATE_SETUP]} fallback={<NotFoundPage />}>
                      <OpexUpdateSetup />
                    </HasPermission>
                  }
                />
                <Route
                  path={ROUTES.CASHFLOW_SETUP_UPDATE}
                  element={
                    <HasPermission permissions={[Permissions.CAN_UPDATE_SETUP]} fallback={<NotFoundPage />}>
                      <CashflowUpdateSetup />
                    </HasPermission>
                  }
                />
                <Route
                  path={ROUTES.SUMMARY_SETUP_UPDATE}
                  element={
                    <HasPermission permissions={[Permissions.CAN_UPDATE_SETUP]} fallback={<NotFoundPage />}>
                      <SummaryUpdateSetup />
                    </HasPermission>
                  }
                />

                <Route
                  path={ROUTES.CONSTRUCTION_SETUP_APPROVE}
                  element={
                    <HasPermission permissions={[Permissions.CAN_APPROVE_SETUP]} fallback={<NotFoundPage />}>
                      <ConstructionApproveSetup />
                    </HasPermission>
                  }
                />
                <Route
                  path={ROUTES.OPEX_SETUP_APPROVE}
                  element={
                    <HasPermission permissions={[Permissions.CAN_APPROVE_SETUP]} fallback={<NotFoundPage />}>
                      <OpexApproveSetup />
                    </HasPermission>
                  }
                />
                <Route
                  path={ROUTES.CASHFLOW_SETUP_APPROVE}
                  element={
                    <HasPermission permissions={[Permissions.CAN_APPROVE_SETUP]} fallback={<NotFoundPage />}>
                      <CashflowApproveSetup />
                    </HasPermission>
                  }
                />
                <Route
                  path={ROUTES.SUMMARY_SETUP_APPROVE}
                  element={
                    <HasPermission permissions={[Permissions.CAN_APPROVE_SETUP]} fallback={<NotFoundPage />}>
                      <SummaryApproveSetup />
                    </HasPermission>
                  }
                />
                <Route
                    path={ROUTES.HEAD_OFFICE}
                    element={
                      <HasPermission permissions={[Permissions.CAN_VIEW_ENTITY_MASTER]} fallback={<NotFoundPage />}>
                        <GroupHeadOffice />
                      </HasPermission>
                    }
                  />
              </Routes>
            </IdleTimerComponent>
          )}
        </ModalsProvider>
      </PageContainer>
    </MantineProvider>
  );
}

export default App;
