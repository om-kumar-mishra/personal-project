export const ROUTES = {
  DASHBOARD: "/dashboard",
  SALES_DASHBOARD: "/salesdashboard",
  NOC_DASHBOARD: "/noc-dashboard",
  CONSTRUCTION_DASHBOARD: "/constructiondashboard",

  CONSTRUCTION_DASHBOARD_V2: "/construction-dashboard",
  PROJECTSUMMARY: "/project-summary-dashboard",

  CASHFLOW_DASHBOARD: "/cashflow-dashboard",
  MONITORING_PAGE: "/monitoring-Dashboard",

  LOGIN_PAGE: "/login",
  // Project start
  PROJECT_PAGE: "/project",
  ADD_PROJECT_PAGE: "/project/add-project",
  VIEW_PROJECT_PAGE: "/project/view-project",
  EDIT_PROJECT_PAGE: "/project/edit-project",
  ENABLE_DISABLE_PROJECT_PAGE: "/project/enable-disable",
  ASSIGN_USER_PROJECT_PAGE: "/project/update-user-access",
  TIMELINE_PROJECT_PAGE: "/project/timeline",
  // Project End
  HOMEPAGE: "/",
  //--------------------------------------Entity --------------------------------------
  // CUSTOMER_GROUP_PAGE: "/customer-group",
  CUSTOMER_GROUP_PAGE: "/group",
  STUDENT_PAGE: "/student",
  // CUSTOMER_INVESTEE_COMPANY: "/customer-investee-company",
  CUSTOMER_INVESTEE_COMPANY: "/borrower",
  ZONE: "/zone",
  LOCATION: "/location",
  REGION: "/region",
  REPORTS: "/report",
  TRANSACTION_REPORTS: "/transaction-report",
  NOC_TRANSACTION_REPORTS: "/noc-transaction-report",
  CLIENT: "/client",
  LENDER: "/lender",
  VIEWLENDER: "/lender",
  DEBENTURE_TRUSTEE: "/debenture-trustee",
  PMC: "/p-m-c",
  FUND: "/fund",
  INVESTMENT: "/investment",
  DEVELOPER: "/developer",
  HEAD_OFFICE: "/group-head-office",
  //------------------------------------ User Management --------------------------------
  UPDATE_USER: "/update-internal-user",
  ADD_USER: "/update-internal-user/add",
  APPROVE_USER: "/approve-internal-user",
  VIEW_USER: "/update-internal-user/view",
  APPROVE_SPECIFIC_INTERNAL_USER: "/approve-internal-user/approve-users",
  INTERNAL_USER_APPROVED_DETAILS: "/approve-internal-user/view-approved-user",
  VIEW_INTERNAL_USER_FOR_PENDING_AND_REJECTED: "/update-internal-user/view-pending-for-approval",
  VIEW_INTERNAL_USER_FOR_APPROVE_REJECTED: "/approve-internal-user/view-rejected-users",
  VIEW_INTERNAL_USER_FOR_REJECTED: "/update-internal-user/view-rejected-users",
  UPDATE_EXTERNAL_USER: "/update-external-user",
  ADD_EXTERNAL_USER: "/update-external-user/add",
  APPROVE_EXTERNAL_USER: "/approve-external-user",
  VIEW_EXTERNAL_USER_PENDING_FOR_APPROVAL: "/external-user/view-pending-for-approval",
  VIEW_EXTERNAL_USER_REJECTED_USER: "/approve-external-user/view-rejected-user",
  VIEW_EXTERNAL_TOTAL_USER: "/approve-external-user/approved-user",
  APPROVE_SPECIFIC_EXTERNAL_USER: "/approve-external-user/approve-user",

  //------------------------------------ User Management End --------------------------------

  UPDATE_MASTER: "/update-master",

  UPDATE_MONITORING_SHEET: "/monitoring-update",

  //------------------------------------ Manage Docs --------------------------------
  MANAGE_DOCS_UPDATE: "/manage-docs/update",
  MANAGE_DOCS_TIMELINE: "/manage-docs/timeline",

  //-------------------------------------Project ----------------------------------

  //#region [NOC]
  NOC_MANAGE_REQUEST: "/noc-dashboard/manage-request",
  NOC_PREFERENCES: "/Preferences",
  EXTERNAL_NOC: "/external-NOC",
  AUTHORIZATION_REQUEST_PAGE: "/noc-dashboard/manage-request/request-for-authorization",
  AUTHORIZATION_CANCEL_REQUEST_PAGE: "/noc-dashboard/manage-request/cancel-request",
  AUTHORIZATION_ISSUE_REQUEST_PAGE: "/noc-dashboard/manage-request/issue-request",
  AUTHORIZATION_VIEW_REQUEST_PAGE: "/noc-dashboard/manage-request/view-request",
  //#endregion

  CONSTRUCTION_UPDATE: "/construction-dashboard/update",
  CONSTRUCTION_APPROVE: "/construction-dashboard/approve",

  CASHFLOW_UPDATE: "/cashflow-dashboard/update",
  CASHFLOW_APPROVE: "/cashflow-dashboard/approve",

  SUMMARY_UPDATE: "/project-summary-dashboard/update",
  SUMMARY_APPROVE: "/project-summary-dashboard/approve",

  OPEX_DASHBOARD: "/opex/dashboard",
  OPEX_MANAGE_REQUEST: "/opex/manage-request",
  OPEX_APPROVE: "/opex/approve",

  SALES_DASHBOARD_V2: "/sales-dashboard",
  SALES_UPDATE: "/sales-dashboard/update",
  SALES_APPROVE: "/sales-dashboard/approve",

  //#region [project setup update]
  SETUP_UPDATE: "/setup-update",
  PROJECT_SETUP_UPDATE: "/setup-update/project",
  NOC_SETUP_UPDATE: "/setup-update/NOC",
  CONSTRUCTION_SETUP_UPDATE: "/setup-update/construction",
  OPEX_SETUP_UPDATE: "/setup-update/opex",
  CASHFLOW_SETUP_UPDATE: "/setup-update/cashflow",
  SUMMARY_SETUP_UPDATE: "/setup-update/summary",
  //#endregion

  //#region [project setup approve]
  SETUP_APPROVE: "/setup-approve",
  PROJECT_APPROVE_SETUP: "/setup-approve/project",
  CONSTRUCTION_SETUP_APPROVE: "/setup-approve/construction",
  OPEX_SETUP_APPROVE: "/setup-approve/opex",
  CASHFLOW_SETUP_APPROVE: "/setup-approve/cashflow",
  SUMMARY_SETUP_APPROVE: "/setup-approve/summary",
  //#endregion

  //-------------------------------------Portfolio ----------------------------------
  //#region [portfolio]
  PORTFOLIO_VIEW_DASHBOARD: "/portfolio-dashboard",
  PORTFOLIO_UPDATE: "/portfolio-dashboard/update",
  PORTFOLIO_APPROVE: "/portfolio-dashboard/approve",
  //#endregion

  //-------------------------------------Investment ----------------------------------
  //#region [investment]
  INVESTMENTS_DASHBOARD: "/investment-dashboard",
  INVESTMENT_UPDATE: "/investment-dashboard/update",
  INVESTMENT_SETUP_UPDATE: "/investment-dashboard/setup-update",
  INVESTMENT_APPROVE: "/investment-dashboard/approve",
  INVESTMENT_SETUP_APPROVE: "/investment-dashboard/setup-approve",
  INVESTMENT_LIST: "/Investment-list",
  //#endregion

  //-------------------------------------Common ----------------------------------
  //#region [common]
  LANDING_PAGE: "/landing-page",
  SWITCH_CLIENT: "/switch-client",
  PROJECT_LIST: "/projectlist",
  //#endregion
} as const;

export type ROUTESTYPE = (typeof ROUTES)[keyof typeof ROUTES];
