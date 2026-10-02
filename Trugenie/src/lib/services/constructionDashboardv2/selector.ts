import { useSelector } from "react-redux";
import { AppState } from "../../common/appState";

export const constructionV2 = useSelector(
  (state: AppState) => state.constructionDashboard
);

export const cumulativeCostConstructionV2 = useSelector(
  (state: AppState) =>
    state.constructionDashboard?.constructionSummary?.data?.cumulativeCost
);

export const constructionActivityConstructionV2 = useSelector(
  (state: AppState) =>
    state.constructionDashboard?.constructionSummary?.data?.constructionActivity
);

export const physicalProgressConstructionV2 = useSelector(
  (state: AppState) =>
    state.constructionDashboard?.constructionSummary?.data?.physicalProgress
);

export const siteVisitConstructionV2 = useSelector(
  (state: AppState) =>
    state.constructionDashboard?.constructionSummary?.data?.siteVisit
);

export const approvalsConstructionV2 = useSelector(
  (state: AppState) =>
    state.constructionDashboard?.constructionSummary?.data?.approvals
);

export const additionalInsightsConstructionV2 = useSelector(
  (state: AppState) =>
    state.constructionDashboard?.constructionSummary?.data?.additionalInsights
);

export const summaryConstructionV2 = useSelector(
  (state: AppState) =>
    state.constructionDashboard?.constructionSummary?.data?.summary
);

export const misDateDropDownConstructionV2 = useSelector(
  (state: AppState) =>
    state.constructionDashboard?.constructionDropdown?.data?.misDate
);

export const phaseDropDownConstructionV2 = useSelector(
  (state: AppState) =>
    state.constructionDashboard?.constructionDropdown?.data?.phase
);

export const projectTypeDropDownConstructionV2 = useSelector(
  (state: AppState) =>
    state.constructionDashboard?.constructionDropdown?.data?.projectType
);

export const projectSubTypeDropDownConstructionV2 = useSelector(
  (state: AppState) =>
    state.constructionDashboard?.constructionDropdown?.data?.projectSubType
);

export const unitLocationSubtypeNameDropDownConstructionV2 = useSelector(
  (state: AppState) =>
    state.constructionDashboard?.constructionDropdown?.data
      ?.unitLocationSubtypeName
);

export const unitLocationWingDropDownConstructionV2 = useSelector(
  (state: AppState) =>
    state.constructionDashboard?.constructionDropdown?.data?.unitLocationWing
);
