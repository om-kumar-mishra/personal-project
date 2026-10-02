import { RemarksObjType } from "../../../layout/dashboardRemarks/Datatypes";
import { ResponseCodeType } from "../Datatype";
import { ConstructionDashboardActionType } from "./types";

export interface ConstructionSummaryPayload {
  reAssetId: number;
  misDate: string;
  projectPhase: string;
  projectType: string;
  developmentType: string;
  costHead: string;
  costSubHead: string;
  timelineHead: string;
  timelineSubHead: string;
  progressHead: string;
  progressSubHead: string;
}

export interface ConstructionDropDownPayload {
  reAssetId: number;
}
export interface ApprovalDocumentsPayload {
  reAssetId: number;
  useremail: string;
  projectPhase: string;
  developmentType: string;
  productSubType: string;
  wing: string;
  stage: string;
  approvalsType: string;
  approvalAuthority: string;
}

export interface ConstructionDashboardDetailAction {
  type: ConstructionDashboardActionType;
  payload: ConstructionSummaryPayload;
}

export interface ConstructionDashboardDropDownAction {
  type: ConstructionDashboardActionType;
  payload: ConstructionDropDownPayload;
}

export interface ConstructionApprovalDocumentsAction {
  type: ConstructionDashboardActionType;
  payload: ApprovalDocumentsPayload;
}

export interface TotalCostSummary {
  graphName: string;
  title: string;
  particular: string;
  underwritten: number;
  businnesPlan: number;
  actualAnticipated: number;
  varianceWrtUnderWrriten: number;
  varianceWrtBusinessPlan: number;
}

export interface PhysicalSummary {
  graphName: string;
  title: string;
  particular: string;
  underwritten: number;
  businnesPlan: number;
  actualAnticipated: number;
}

export interface CompletionSummary {
  graphName: string;
  title: string;
  particular: string;
  underwritten: string;
  businnesPlan: string;
  actualAnticipated: string;
  delaysMonthWrtUnderWrriten: number;
  delaysMonthWrtBusinessPlan: number;
}

export interface FinancialSummary {
  graphName: string;
  title: string;
  particular: string;
  underwrittenInrMn: number;
  underwrittenPercentage: number;
  businessPlanInrMn: number;
  businessPlanPercentage: number;
  actualAnticipatedInrMn: number;
  actualAnticipatedPercentage: number;
  varianceWrtUnderwritten: string;
  varianceWrtBusinessPlan: string;
}

export interface HistoricalCummulativeCost {
  graphName: string;
  title: string;
  projectionDate: string;
  amount: number;
  underwritten: number;
  businnesPlan: number;
  actual: number;
}

export interface ConstructionCumulativeCostScheduleList {
  title: string;
  projectionDate: string;
  projectionAmount: number;
  underwritten: number;
  businnesPlan: number;
  actual: number;
}

export interface steelListType {
  city: string;
  mm: string;
  value: string;
  date: string;
  graphName: string;
  title: string;
}
export interface labourRecordListType {
  labourTag: string;
  labourCount: string;
  projectedValue: string;
  projectionDate: string;
  graphName: string;
  title: string;
  actualValue: string;
}

export interface AluminiumListType {
  month: string;
  aluminium_INR_tonne: string;
  graphName: string;
  title: string;
}

export interface cementListType {
  qe: string;
  pozzolana_cement: string;
  ordinary_portland_cement: string;
  graphName: string;
  title: string;
}
export interface ConstructionCumulativeCostSummaryList {
  graphName: string;
  title: string;
  projectPhase: string;
  developmentType: string;
  productType: string;
  costHead: string;
  costSubHead: string;
  activityHead: string;
  activitySubHead: string;
  material: string;
  rowOrder: string;
  preInvestment: number;
  postInvestment: number;
  total: number;
  underwrittenBalanceCost: number;
  underwrittenActualAnticipatedBalanceCost: number;
  underwrittenTotalCost: number;
  underwrittenActualAnticipatedTotalCost: number;
  underwrittenvariance: number;
  businessPlanBalanceCost: number;
  businessPlanActualAnticipatedBalanceCost: number;
  businessPlanTotalCost: number;
  businessPlanActualAnticipatedTotalCost: number;
  businessPlanvariance: number;
}

export interface ConstructionSummaryType {
  totalCost: TotalCostSummary[];
  physical: PhysicalSummary[];
  completion: CompletionSummary[];
  financial: FinancialSummary[];
}

export interface ConstructionCumulativeCostType {
  // historical: HistoricalCummulativeCost[];
  costScheduleList: ConstructionCumulativeCostScheduleList[];
  // cumulativeCostSummaryGroupList: ConstructionCumulativeCostSummaryList[];
  ccsummaryProductTypeGroupList: ConstructionCumulativeCostSummaryList[][];
}

export interface ConstructionActivitySummaryListType {
  projectPhase: string;
  developmentType: string;
  productType: string;
  timelineHead: string;
  timelineSubHead: number;
  timelineOrder: number;
  activityHead: string;
  activitySubHead: string;
  progressUnderwritten: number;
  progressBusinessPlan: number;
  progressActual: number;
  underwrittenStartDate: string;
  underwrittenEndDate: string;
  businessPlanStartDate: string;
  businessPlanEndDate: string;
  actualStartDate: string;
  actualEndDate: string;
  delaywithrespecttoUnderwritten: number;
  delaywithrespecttoBusinessPlan: number;
}

export interface gantChartDataType {
  productType: string;
  timeLineHead: string;
  stages: {
    name: string;
    underWritten: {
      startDate: string;
      endDate: string;
    };
    businessPlan: {
      startDate: string;
      endDate: string;
    };
    actual: {
      startDate: string;
      endDate: string;
    };
    projected: {
      startDate: string;
      endDate: string;
    };
  }[];
}

export interface ConstructionActivityCostType {
  // constructionActivitySummaryGroupList: ConstructionActivitySummaryListType[];
  casummaryProductTypeGroupList: ConstructionActivitySummaryListType[][];
  gantChart: gantChartDataType[][];
}

export interface PhysicalProgressParticularsType {
  particulars: string;
  noOfTowers: number;
  graphName: string;
  title: string;
}

export interface constructioApprovalDocumentsListType {
  status: string;
  fileName: string;
  filePath: string;
  fileContainer: string;
  misDate: string;
}

export interface PhysicalProgressDetailsList {
  name: string;
  activityList: string[];
  activityDetailsFloorWiseList: {
    floor: string;
    activityValues: (number | null)[];
  }[];
}

export interface PhysicalProgressType {
  title: string;
  physicalProgressParticulars: PhysicalProgressParticularsType[];
  physicalProgressDetails: PhysicalProgressDetailsList[];
}

export interface ExistingApprovalListType {
  projectPhase: string;
  developmentType: string;
  productType: string;
  productSubType: string;
  wing: string;
  configurationApprovalName: string;
  approvalAuthority: string;
  remark: string;
  expiryDate: string;
  stage: string;
}

export interface PendingApprovalListType {
  projectPhase: string;
  developmentType: string;
  productType: string;
  productSubType: string;
  wing: string;
  configurationApprovalName: string;
  approvalAuthority: string;
  remark: string;
  plannedApplicationDate: string;
  stage: string;
}

export interface ApprovalsType {
  existingApprovalList: ExistingApprovalListType[];
  pendingApprovalList: PendingApprovalListType[];
}

export interface ConstructionSummaryResultData {
  cumulativeCost: ConstructionCumulativeCostType;
  constructionActivity: ConstructionActivityCostType;
  physicalProgress: PhysicalProgressType[];
  siteVisit: any;
  approvals: any;
  additionalInsights: any;
  summary: ConstructionSummaryType;
  assetname: string;
  remarks: RemarksObjType;
}

export interface ConstructionSummaryResult {
  info: ResponseCodeType;
  data: ConstructionSummaryResultData;
}

export interface ConstructionDropdownResultData {
  misDate: string[];
  phase: string[];
  projectType: string[];
  projectSubType: string[];
  unitLocationSubtypeName: string[];
  unitLocationWing: string[];
}

export interface ConstructionDropdownResult {
  info: ResponseCodeType;
  data: ConstructionDropdownResultData;
}

export interface ApprovalDocumentsResult {
  info: ResponseCodeType;
  data: {
    constructioApprovalDocumentsList: constructioApprovalDocumentsListType[];
  };
}
