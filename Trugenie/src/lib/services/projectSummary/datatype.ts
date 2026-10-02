import { ResponseCodeType } from "../Datatype";
import { ProjectSummaryActionType } from "./types";

export interface SummaryDashboardAction {
  misDate?: string;
  type: ProjectSummaryActionType;
  reAssetId: string;
}

export interface summarySectionsType {
  project: string;
  developerGroup: string;
  location: string;
  description: string;
  instrument: string;
  investmentFund: string;
  borrowerEntity: string;
}

export interface projectSummarySectionsType {
  approvalsInPlace: string;
  avgTicketSite: number;
  businessPlanCompletionDate: string;
  businessPlanLaunchDate: string;
  constructionStart: string;
  customerAgreement: string;
  expectedCompletion: string;
  launch: string;
  phase: string;
  product: string;
  reraCompletion: string;
  underwrittenCompletionDate: string;
  underwrittenLaunchDate: string;
  units: number;
}

export interface constructionSectionTablesType {
  costhead: string;
  costIncurred: number;
  balanceCostBusinessPlan: number;
  balanceCostProjected: number;
  totalCostBusinessPlan: number;
  totalCostActual: number;
  variance: number;
}

export interface constructionSectionDivsType {
  type: string;
  actual: string;
  planned: string;
}

export interface salesSummaryType {
  collectionsTillDate: number;
  launchedArea: number;
  particulars: string;
  percentageAreaSold: number;
  percentageCollected: number;
  phases: string;
  rateAchievedSoldArea: number;
  rateExpectedUnsoldArea: number;
  soldArea: number;
  soldReceivables: number;
  soldValue: number;
  totalArea: number;
  totalReceivables: number;
  unsoldArea: number;
  unsoldReceivables: number;
}

export interface ProjectSummaryFilterResponse {
  info: ResponseCodeType;
  data: { dates: string };
}

export interface ProjectSummaryDetailsResponse {
  info: ResponseCodeType;
  data: any;
}
