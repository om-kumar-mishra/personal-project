import { RemarksObjType } from "../../../layout/dashboardRemarks/Datatypes";
import { ResponseCodeType, stringNumber } from "../Datatype";
import { SalesDashboardActionTypes } from "./types";

export interface SalesDashboardAction {
  type: SalesDashboardActionTypes;
  emailId: string;
  reAssetId: stringNumber;
  countryCode: string;
  payload: SalesDashboardDetailv2Payload;
}

export interface ProjectResponseCodeType {
  rEAssetId: stringNumber;
  assetName: string;
}

export interface SalesProjectApiResponse {
  info: ResponseCodeType;
  data: {
    projects: ProjectResponseCodeType[];
  };
}

export interface SalesREUnitsResponse {
  projectType: string;
}

export interface SalesREUnitsApiResponse {
  info: ResponseCodeType;
  data: SalesREUnitsResponse[];
}

export interface SalesRETowerResponse {
  unitLocationSubTypeName: string;
}

export interface SalesRETowerApiResponse {
  info: ResponseCodeType;
  data: {
    unitLocationSubTypeName: SalesRETowerResponse[];
  };
}

export interface SalesFiscalYearResponse {
  rEAssetId: stringNumber;
  fiscalYear: string;
}

export interface SalesFiscalYearApiResponse {
  info: ResponseCodeType;
  data: {
    fiscalYears: SalesFiscalYearResponse[];
  };
}

export interface SalesREPhaseResponse {
  projectPhase: string;
}

export interface SalesREPhaseApiResponse {
  info: ResponseCodeType;
  data: {
    projectPhases: SalesREPhaseResponse[];
  };
}
export interface SalesDashboardDetailPayload {
  email: string;
  projectName: string;
  unitType: string;
  phase: string;
  tower: string;
  fiscalYear: string;
}

export interface SalesDashboardDetailApiRequest {
  type: SalesDashboardActionTypes;
  request: SalesDashboardDetailPayload;
}

export interface SalesDashboardFiscalYearApiPayload {
  email: string;
  countryCode: string;
}
export interface SalesDashboardFiscalYearApiRequest {
  type: SalesDashboardActionTypes;
  request: SalesDashboardFiscalYearApiPayload;
}

// Graphs Datatypes
export interface salesPriceHistoricListType {
  fiscalYear: string;
  uwRate: number | null;
  realisedRate: number | null;
}

export interface salesPricePredictedListType {
  fiscalYear: string;
  underWritten: number | null;
  projectedRate: number | null;
}

export interface salesVelocityHistoricListType {
  fiscalYear: string;
  unitAreaSaleable: number | null;
  velocity: number | null;
}

export interface salesVelocityPredictedListType {
  fiscalYear: string;
  uWSaleableArea: number | null;
  projectedVelocity: number | null;
}
export interface summaryListType {
  customerProfile: string;
  rEUnitDetailId: number;
}

export interface trailing12MonthsSalesVelocityListtype {
  trailingPeriod: string;
  areaSold: number | null;
  avgSellRate: number | null;
}

export interface collectionsGraphListType {
  calendarMonth: string;
  amount: string;
  incremental: string;
}

export interface salesAnalysisSummaryListType {
  unitLocationFloor: number;
  projectSubType: string;
  unitSold: number;
  areaSold: number;
  soldValue: number;
  averageSalesPrice: number;
  unitsUnSold: number;
  areaUnSold: number;
  absorptionRate: number;
  childRows?: salesAnalysisSummaryListType[];
}

export interface floorAnalysisSummaryListType {
  unitLocationFloor: number;
  projectSubType: string;
  totalArea: number;
  areaSold: number;
  averageSalesPrice: number;
  absorptionRate: number;
}

export interface configurationAnalysisAreaListType {
  unitConfiguration: string;
  projectSubType: string;
  totalArea: number;
  areaSold: number;
  averageSalesPrice: number;
  absorptionRate: number;
  soldValue: number;
}

export interface configurationAnalysisUnitListType {
  unitConfiguration: string;
  projectSubType: string;
  areaUnSold: number;
  areaSold: number;
  averageSalesPrice: number;
  soldValue: number;
}

export interface seriesAnalysisAreaListType {
  unitLocationSeries: stringNumber;
  projectSubType: string;
  totalArea: number;
  areaSold: number;
  averageSalesPrice: number;
  absorptionRate: number;
  soldValue: number;
}

export interface seriesAnalysisUnitListType {
  unitLocationSeries: stringNumber;
  projectSubType: string;
  totalUnits: number;
  soldUnits: number;
  unitsUnSold: number;
  averageSalesPrice: number;
  soldValue: number;
  areaSold: number;
}

export interface towerWiseAnalysisListType {
  projectSubType: string;
  totalArea: number;
  areaSold: number;
  averageSalesPrice: number;
  absorptionRate: number;
}

export interface seriesAnalysisUnit2ListType {
  unitConfiguration: string;
  projectSubType: string;
  soldUnits: number;
  totalUnits: number;
  unitsUnSold: number;
  fill?: string;
}
export interface competitionAnalysisListType {
  [key: string]: string;
}
export interface dpdListType {
  bucket: string;
  overDue: number | null;
}

export interface SalesDashboardDetailResponse {
  info: ResponseCodeType;
  data: {
    dpdList: dpdListType[];
    salesPriceHistoricList: salesPriceHistoricListType[];
    salesPricePredictedList: salesPricePredictedListType[];
    salesVelocityHistoricList: salesVelocityHistoricListType[];
    salesVelocityPredictedList: salesVelocityPredictedListType[];
    summaryList: summaryListType[];
    trailing12MonthsSalesVelocityList: trailing12MonthsSalesVelocityListtype[];
    collectionsGraphList: collectionsGraphListType[];
    salesAnalysisSummaryList: salesAnalysisSummaryListType[];
    floorAnalysisSummaryList: floorAnalysisSummaryListType[];
    configurationAnalysisAreaList: configurationAnalysisAreaListType[];
    configurationAnalysisUnitList: configurationAnalysisUnitListType[];
    seriesAnalysisAreaList: seriesAnalysisAreaListType[];
    seriesAnalysisUnitList: seriesAnalysisUnitListType[];
    towerWiseAnalysisList: towerWiseAnalysisListType[];
    seriesAnalysisUnit2List: seriesAnalysisUnit2ListType[];
    competitionAnalysisList: competitionAnalysisListType[];
  };
}

export interface SalesDashboardDetailv2Payload {
  // "email": "shubham.sharma@truboardpartner.com",
  // "countryCode": "ALL",
  // "projectName": "ALL",
  // "unitType": "ALL",
  // "tower": "ALL",
  // "fiscalYear": "ALL",
  reAssetId: stringNumber;
  misDate?: string;
  phase?: string;
  projectType?: string;
  projectSubType?: string;
  unitLocationSubTypeName?: string;
  unitLocationWing?: string;
  unitOwnedBy?: string;
  launchStatus?: string;
  securityStatus?: string;
  approvalStatus?: string;
  startDate?: string;
  endDate?: string;
  statusType?: number;
  wing?: string;
}

export interface areaSummaryType {
  wingList: areaSummaryType[] | null;
  towerList: areaSummaryType[] | null;
  graphName: string;
  launchedArea: number;
  soldPercentage: number;
  rate: number;
  title: string;
  phase: string;
  tower: string;
  wing: string;
  saleableArea: number;
  soldArea: number;
  unsoldArea: number;
}

export interface areaSummaryTotalType {
  soldPercentage: number;
  soldArea: number;
  launchedArea: number;
  unsoldArea: number;
  rate: number;
  saleableArea: number;
}
export interface areaSummaryOtherType {
  graphName: string;
  title: string;
  saleValue: number;
  demand: number;
  collection: number;
  totalOverdue: number;
  balanceReceivable: number;
  collectionPercentage: number;
}

export interface areaSummaryParentType {
  areaSummary: areaSummaryType[];
  other: areaSummaryOtherType[];
  total: areaSummaryTotalType;
}

export interface valueSummaryType {
  graphName: string;
  title: string;
  phase: string;
  tower: string;
  wing: string;
  saleValue: number;
  demand: number;
  collections: number;
  totalOverdue: number;
  balanceReceivable: number;
  collectionPercentage: number;
  demandPercentage: number;
  wingList: valueSummaryType[] | null;
  towerList: valueSummaryType[] | null;
}

export interface valueSummaryTotalType {
  saleValue: number;
  demand: number;
  collections: number;
  totalOverdue: number;
  balanceReceivable: number;
  collectionPercentage: number;
  demandPercentage: number;
}

export interface valueSummaryOtherType {
  graphName: string;
  title: string;
  saleValue: number;
  demand: number;
  collection: number;
  totalOverdue: number;
  balanceReceivable: number;
  collectionPercentage: number;
}

export interface valueSummaryParentType {
  valueSummary: valueSummaryType[];
  other: valueSummaryOtherType[];
  total: valueSummaryTotalType;
}

export interface unitSummaryType {
  graphName: string;
  title: string;
  phase: string;
  tower: string;
  wing: string;
  totalUnits: number;
  launchedUnits: number;
  soldUnits: number;
  unSoldUnits: number;
  averageSaleValuePerUnit: number;
  wingList: unitSummaryType[] | null;
  towerList: unitSummaryType[] | null;
}

export interface unitSummaryTotalType {
  launchedUnits: number;
  soldUnits: number;
  unSoldUnits: number;
  averageSalevaluePerUnits: number;
  unLaunched: number;
}

export interface unitSummaryOtherType {
  graphName: string;
  title: string;
  totalUnits: number;
  launchedUnits: number;
  soldUnits: number;
  unSoldUnits: number;
  averageSalevaluePerUnits: number;
  unLaunched: number;
}

export interface unitSummaryParentType {
  unitSummary: unitSummaryType[];
  other: unitSummaryOtherType[];
  total: unitSummaryTotalType;
}

export interface trailing12MonthsPerformancesType {
  monthDate: string;
  projectionMonth: number;
  projectionYear: number;
  area: number;
  salesValue: number;
  rate: number;
  row_num: number;
  graphName: string;
  trailingPeriod?: string;
}

export interface trailingMonthCardsType {
  title: string;
  velocity: number;
  rate: number;
}

export interface pricehistoricFutureType {
  monthEnd: string;
  projectionYear: number;
  projectionMonth: number;
  salesValue: number;
  salesValueUnderWritten: number | null;
  salesValueBusinessPlan: number | null;
  rateUnderWritten: number | null;
  rateBusinessPlan: number | null;
  rate: number | null;
}

export interface velocityhistoricFutureType {
  monthEnd: string;
  projectionYear: number;
  projectionMonth: number;
  areaSold: number | null;
  areaUnderWritten: number | null;
  areaBusinessPlan: number | null;
  rate: number | null;
}

export interface pricevelocityResponseType {
  pricehistoric: pricehistoricFutureType[];
  pricefuture: pricehistoricFutureType[];
  velcoityhisoric: velocityhistoricFutureType[];
  velcoityFuture: velocityhistoricFutureType[];
}

export interface demandAndCollectionDataType {
  graphName: string;
  title: string;
  misDate: string;
  actualDemand: number;
  collectionAgainstSaleValue: number;
  underWrittenCollection: number;
  collectionEfficiency: number;
  liabilityAgainstPassThorughCharges: number | null;
  collectionAgainstPassThroughCharges: number | null;
}

export interface fundingType {
  graphName: string;
  title: string;
  schema: string;
  area: number;
  areaPercentage: number;
  units: number;
  unitPercentage: number;
}

export interface SlowMovingInventorySummaryType {
  graph: string;
  title: string;
  particulars: string;
  particularsValue: number;
}

export interface SlowMovingInventoryDetailsType {
  graph: string;
  title: string;
  unit: string;
  soldUnits: number;
  unSoldUnits: number;
  unSoldArea: number;
  averageSalePrice: number;
  absorptionRate: number;
  saleValue: number;
  totalUnits: number;
  soldArea: number;
}

export interface slowMovingInventoryType {
  slowMovingInventorySummary: SlowMovingInventorySummaryType[];
  slowMovingInventoryDetails: SlowMovingInventoryDetailsType[][];
}

export interface DemandAndCollectionsAnalysisResponseType {
  graph: string;
  title: string;
  finalOverdueBucket: string;
  unitCount: number;
  overdueBucketPercenrage: number;
}

export interface PhysicalVsActualDemandResponseType {
  graph: string;
  title: string;
  projectPhase: string;
  demandAsperPhysicalProgress: number;
  actualDemandAsPerMis: number;
  demandShortfall: number;
}

export interface QualityOfBalanceRecivablesTableResponseType {
  graph: string;
  title: string;
  daysForWhichAmountDemandedIsOverdue: string;
  saleValue: number;
  demanded: number;
  collected: number;
  collectionEfficency: number;
  overdue: number;
  totalBalanceReceivable: number;
}

export interface AdditionalInsightsResponseType {
  graph: string;
  title: string;
  buyerLendingBank?: string;
  registrationStatus?: string;
  customerProfile?: string;
  areaSale: number;
  unitWise: number;
}

export interface MicroMarketCompletionAnalysisType {
  currentPrice: string;
  developer: string;
  latitude: number;
  launchDate: string;
  launchedDateArea: number;
  longitude: number;
  project: string;
  sold: number;
}
export interface ComparisonHistoricalPerformanceType {
  areaSold: number;
  graphName: string;
  monthEnd: string;
  projectionMonth: number;
  projectionYear: number;
  projectphase: string;
  rate: number;
  salesValue: number;
  title: string;
}

export interface SalesDashboardDetailv2Response {
  info: ResponseCodeType;
  data: {
    assetname: string;
    remarks: RemarksObjType;
    summary: {
      areaSummary: areaSummaryParentType[];
      valueSummary: valueSummaryParentType[];
      unitSummary: unitSummaryParentType[];
    };
    priceAndVelocityDetails: {
      pricevelocityResponse: pricevelocityResponseType;
      trailing12MonthsPerformancesList: trailing12MonthsPerformancesType[];
      cards: trailingMonthCardsType[];
      comparisonHistoricalPerformance: ComparisonHistoricalPerformanceType[];
    };
    demandAndCollectionData: {
      demandAndCollection: demandAndCollectionDataType[];
      demandAndCollectionsAnalysis: DemandAndCollectionsAnalysisResponseType[];
      physicalVsActualDemand: PhysicalVsActualDemandResponseType[];
      qualityOfBalanceRecivablesTable: QualityOfBalanceRecivablesTableResponseType[];
      postFunding: fundingType[];
      preFunding: fundingType[];
    };
    slowMovingInventory: slowMovingInventoryType;
    microMarket: {
      completionAnalysisList: MicroMarketCompletionAnalysisType[];
      locationAnalysis: any;
    };
    additionalInsights: {
      homeLoanAnalysis: AdditionalInsightsResponseType[];
      registrationStatusAnalysis: AdditionalInsightsResponseType[];
      customerProfileAnalysis: AdditionalInsightsResponseType[];
    };
  };
}

export interface SalesMisHistoryResponseCodeType {
  createdBy: string;
  misDate: string;
  createdAt: string;
  isArchive: number;
}

export interface SalesMisHistoryApiResponse {
  info: ResponseCodeType;
  data: SalesMisHistoryResponseCodeType[];
}

export interface SalesREProjectTypeResponseCodeType {
  projectType: string;
}

export interface SalesREProjectTypeApiResponse {
  info: ResponseCodeType;
  data: SalesREProjectTypeResponseCodeType[];
}

export interface SalesREProjectSubTypeResponseCodeType {
  unitLocationSubTypeName: string;
}

export interface SalesREProjectSubTypeApiResponse {
  info: ResponseCodeType;
  data: SalesREProjectSubTypeResponseCodeType[];
}

export interface SalesREUnitStatusResponseCodeType {
  securitystatus: string;
  launchStatus: string;
  approvalStatus: string;
}

export interface SalesREUnitStatusApiResponse {
  info: ResponseCodeType;
  data: SalesREUnitStatusResponseCodeType[];
}
export interface SalesRETowerV2ResponseCodeType {
  unitLocationSubTypeName: string;
}

export interface SalesRETowerV2ApiResponse {
  info: ResponseCodeType;
  data: SalesRETowerV2ResponseCodeType[];
}

export interface SalesREWingV2ResponseCodeType {
  unitLocationWing: string;
}

export interface SalesREWingV2ApiResponse {
  info: ResponseCodeType;
  data: SalesREWingV2ResponseCodeType[];
}

export interface SalesREUnitOwnedByResponseCodeType {
  unitOwnedBy: string;
}

export interface SalesREUnitOwnedByApiResponse {
  info: ResponseCodeType;
  data: SalesREUnitOwnedByResponseCodeType[];
}
