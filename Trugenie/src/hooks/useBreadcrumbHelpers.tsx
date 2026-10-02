import { useSelector } from "react-redux";
import { selectRMUserLoaders } from "../lib/services/HDFC/Commons/selectors";
import { selectExternalUserLoaders } from "../lib/services/HDFC/ExternalUser/selectors";
import { selectManageRequestLoaders } from "../lib/services/HDFC/NOCManageRequest/selectors";
import { selectLoaders } from "../lib/services/HDFC/Project/selectors";
import { selectProjectLoaders } from "../lib/services/HDFC/ProjectSetupUpdate/selectors";
import { selectZoneLoaders } from "../lib/services/HDFC/Zone/selectors";
import { selectNocSetupLoader } from "../lib/services/nocSetup/selector";
import { selectPrefrenceLoader } from "../lib/services/prefrences/selectors";
import { selectMasterApplicationLoading } from "../lib/services/reports/selectors";
import { LoadingPaths } from "../modules/Components/BreadCrumbs";
import { ROUTES, ROUTESTYPE } from "../routeConstants";

const useBreadcrumbLoaders = () => {
  const projectLoaders = useSelector(selectLoaders);
  const externalUserLoaders = useSelector(selectExternalUserLoaders);
  const getMasterLoading = useSelector(selectMasterApplicationLoading);
  const manageRequestLoaders = useSelector(selectManageRequestLoaders);
  const RmtaggedLoader = useSelector(selectRMUserLoaders);
  const nocSetupLoader = useSelector(selectNocSetupLoader);
  const projectSetupLoaders = useSelector(selectProjectLoaders);
  const preferenceLoaders = useSelector(selectPrefrenceLoader);
  const zoneLoaders = useSelector(selectZoneLoaders);

  const pathLoaders: LoadingPaths[] = [
    {
      path: ROUTES.AUTHORIZATION_ISSUE_REQUEST_PAGE,
      loading: [
        manageRequestLoaders.getDecisionData,
        manageRequestLoaders.nocDeveloperDocRef,
        manageRequestLoaders.nocRequestRemarks,
        manageRequestLoaders.getNocPriceHeaders,
        manageRequestLoaders.nocRequestChangeHistory,
        manageRequestLoaders.getNocPaymentDetails,
      ],
    },
    {
      path: ROUTES.AUTHORIZATION_VIEW_REQUEST_PAGE,
      loading: [
        manageRequestLoaders.getDecisionData,
        manageRequestLoaders.nocDeveloperDocRef,
        manageRequestLoaders.nocRequestRemarks,
        manageRequestLoaders.getNocPriceHeaders,
        manageRequestLoaders.nocRequestChangeHistory,
        manageRequestLoaders.getNocPaymentDetails,
      ],
    },
    { path: ROUTES.UPDATE_MASTER, loading: [getMasterLoading] },
    { path: ROUTES.APPROVE_SPECIFIC_EXTERNAL_USER, loading: [externalUserLoaders.getPendingExternalUserDetails] },
    { path: ROUTES.VIEW_EXTERNAL_USER_REJECTED_USER, loading: [externalUserLoaders.getPendingExternalUserDetails] },
    { path: ROUTES.VIEW_EXTERNAL_USER_PENDING_FOR_APPROVAL, loading: [externalUserLoaders.getPendingExternalUserDetails] },
    { path: ROUTES.TIMELINE_PROJECT_PAGE, loading: [projectLoaders.projectLogs] },
    {
      path: ROUTES.VIEW_PROJECT_PAGE,
      loading: [RmtaggedLoader?.getTaggedRMUserList],
    },
    {
      path: ROUTES.EDIT_PROJECT_PAGE,
      loading: [RmtaggedLoader?.getTaggedRMUserList, zoneLoaders.zonesList],
    },
    {
      path: ROUTES.ASSIGN_USER_PROJECT_PAGE,
      loading: [projectLoaders?.customerTaggedRMUsers],
    },
    { path: ROUTES.PROJECT_SETUP_UPDATE, loading: [projectSetupLoaders.canSetupUpdateLoader] },
    { path: ROUTES.NOC_PREFERENCES, loading: [preferenceLoaders.nocProjectPrefrence] },
    {
      path: ROUTES.NOC_SETUP_UPDATE,
      loading: [
        // nocSetupLoader?.setupWorkflow,
        nocSetupLoader?.thresholdType,
        nocSetupLoader.period,
        nocSetupLoader.priceHeaders,
        nocSetupLoader.projectTowers,
        nocSetupLoader.projectTowers,
        nocSetupLoader.projectType,
        nocSetupLoader.reraNo,
        nocSetupLoader.setupNocProject,
        nocSetupLoader.thresholdType,
        nocSetupLoader.projectDetails,
      ],
    },
  ];

  

  const showProjectNameForPaths: ROUTESTYPE[] = [
    ROUTES.SALES_UPDATE,
    ROUTES.SALES_APPROVE,
    ROUTES.CONSTRUCTION_UPDATE,
    ROUTES.CONSTRUCTION_APPROVE,
    ROUTES.CASHFLOW_UPDATE,
    ROUTES.CASHFLOW_APPROVE,
    ROUTES.SUMMARY_UPDATE,
    ROUTES.SUMMARY_APPROVE,
    ROUTES.UPDATE_MONITORING_SHEET,
    ROUTES.MANAGE_DOCS_UPDATE,
    ROUTES.SETUP_UPDATE,
    ROUTES.SETUP_APPROVE,
    ROUTES.PROJECT_SETUP_UPDATE,
    ROUTES.PROJECT_APPROVE_SETUP,
    ROUTES.CONSTRUCTION_SETUP_UPDATE,
    ROUTES.CONSTRUCTION_SETUP_APPROVE,
    ROUTES.CASHFLOW_SETUP_UPDATE,
    ROUTES.CASHFLOW_SETUP_APPROVE,
    ROUTES.SUMMARY_SETUP_UPDATE,
    ROUTES.SUMMARY_SETUP_APPROVE,
  ];

  return { pathLoaders, showProjectNameForPaths };
};

export default useBreadcrumbLoaders;
