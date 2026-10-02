import { RemarksObjType } from "../../../layout/dashboardRemarks/Datatypes";
import { ResponseCodeType } from "../Datatype";

// buisness and underwritten types
export type BuisnessPlanList = {
  BusinessPlan: BusinessPlan;
  ProjectedPlan: ProjectedPlanTab;
  Underwritten: UnderwrittenTab;
  HistoricUnderwritten: HistoricUnderwrittenTab;
  HistoricBusiness: HistoricBusinessTab;
  assetname: string;
  remarks: RemarksObjType;
};
export type BuisnessPlanListReponse = {
  info: ResponseCodeType;
  data: BuisnessPlanList;
};
export type BusinessPlan = {
  Inflows: Inflows[];
  "Total Inflows": TotalInflows[];
  Outflows: Outflows[];
  "Total Outflows": TotalOutflows[];
  "Net-Operating Cash Flow": NetOperatingCashFlow[];
  Financing: Financing[];
  "Closing Cash Balance": ClosingCashBalance[];
  "Other Adjustments": TotalOutflows[];
  "Total Adjustments": TotalOutflows[];
  "Adjusted Net Operating Cashflows": TotalOutflows[];
  "Net Operating Cashflows": UNetOperatingCashFlow[];
  headers: string[];
};
export type UnderwrittenTab = {
  Inflows: UInflows[];
  "Total Inflows": UTotalInflows[];
  Outflows: UOutflows[];
  "Total Outflows": UTotalOutflows[];
  "Other Adjustments": UTotalOutflows[];
  "Total Adjustments": UTotalOutflows[];
  "Adjusted Net Operating Cashflows": UTotalOutflows[];
  "Net Operating Cashflows": UNetOperatingCashFlow[];
  Financing: UFinancing[];
  "Closing Cash Balance": UClosingCashBalance[];
  headers: string[];
};
export type ProjectedPlanTab = {
  Inflows: PInflows[];
  "Total Inflows": PTotalInflows[];
  Outflows: POutflows[];
  "Total Outflows": PTotalOutflows[];
  "Net-Operating Cash Flow"?: PNetOperatingCashFlow[];
  Financing: PFinancing[];
  "Closing Cash Balance": PClosingCashBalance[];
  "Other Adjustments": PTotalOutflows[];
  "Total Adjustments": PTotalOutflows[];
  "Adjusted Net Operating Cashflows": PTotalOutflows[];
  "Net Operating Cashflows": PNetOperatingCashFlow[];
  headers: string[];
};
export type HistoricUnderwrittenTab = {
  Inflows: HUInflows[];
  "Total Inflows": HUTotalInflows[];
  Outflows: HUOutflows[];
  "Total Outflows": HUTotalOutflows[];
  "Net-Operating Cash Flow": HUNetOperatingCashFlow[];
  Financing: HUFinancing[];
  "Closing Cash Balance": HUClosingCashBalance[];
  "Other Adjustments": HUTotalOutflows[];
  "Total Adjustments": HUTotalOutflows[];
  "Adjusted Net Operating Cashflows": HUTotalOutflows[];
  "Net Operating Cashflows": UNetOperatingCashFlow[];
  headers?: string[];
};
export type HistoricBusinessTab = {
  Inflows: HBInflows[];
  "Total Inflows": HBTotalInflows[];
  Outflows: HBOutflows[];
  "Total Outflows": HBTotalOutflows[];
  "Net-Operating Cash Flow": HBNetOperatingCashFlow[];
  Financing: HBFinancing[];
  "Closing Cash Balance": HUClosingCashBalance[];
  "Other Adjustments": HUTotalOutflows[];
  "Total Adjustments": HUTotalOutflows[];
  "Adjusted Net Operating Cashflows": HUTotalOutflows[];
  "Net Operating Cashflows": UNetOperatingCashFlow[];
  headers?: string[];
};
// buisness plan ----------------------------------------------------------------------------------------->
// inflows
export type Inflows = {
  ActualTillDate: string;
  "Dec-23": string;
  "Dec-24": string;
  Head: string;
  HeadOrder: string;
  "Jun-23": string;
  "Jun-24": string;
  "Mar-23": string;
  "Mar-24": string;
  "Mar-25": string;
  Particulars: string;
  ParticularsOrder: string;
  ProjectedTotal: string;
  "Sep-23": string;
  "Sep-24": string;
  Total: string;
};
// total inflows
export type TotalInflows = {
  ActualTillDate: string;
  "Dec-23": string;
  "Dec-24": string;
  Head: string;
  HeadOrder: string;
  "Jun-23": string;
  "Jun-24": string;
  "Mar-23": string;
  "Mar-24": string;
  "Mar-25": string;
  Particulars: string;
  ParticularsOrder: string;
  ProjectedTotal: string;
  "Sep-23": string;
  "Sep-24": string;
  Total: string;
};
// outflows
export type Outflows = {
  ActualTillDate: string;
  "Dec-23": string;
  "Dec-24": string;
  Head: string;
  HeadOrder: string;
  "Jun-23": string;
  "Jun-24": string;
  "Mar-23": string;
  "Mar-24": string;
  "Mar-25": string;
  Particulars: string;
  ParticularsOrder: string;
  ProjectedTotal: string;
  "Sep-23": string;
  "Sep-24": string;
  Total: string;
};
// total outflows
export type TotalOutflows = {
  ActualTillDate: string;
  "Dec-23": string;
  "Dec-24": string;
  Head: string;
  HeadOrder: string;
  "Jun-23": string;
  "Jun-24": string;
  "Mar-23": string;
  "Mar-24": string;
  "Mar-25": string;
  Particulars: string;
  ParticularsOrder: string;
  ProjectedTotal: string;
  "Sep-23": string;
  "Sep-24": string;
  Total: string;
};
// net operating
export type NetOperatingCashFlow = {
  ActualTillDate: string;
  "Dec-23": string;
  "Dec-24": string;
  Head: string;
  HeadOrder: string;
  "Jun-23": string;
  "Jun-24": string;
  "Mar-23": string;
  "Mar-24": string;
  "Mar-25": string;
  Particulars: string;
  ParticularsOrder: string;
  ProjectedTotal: string;
  "Sep-23": string;
  "Sep-24": string;
  Total: string;
};
// finanncing
export type Financing = {
  ActualTillDate: string;
  "Dec-23": string;
  "Dec-24": string;
  Head: string;
  HeadOrder: string;
  "Jun-23": string;
  "Jun-24": string;
  "Mar-23": string;
  "Mar-24": string;
  "Mar-25": string;
  Particulars: string;
  ParticularsOrder: string;
  ProjectedTotal: string;
  "Sep-23": string;
  "Sep-24": string;
  Total: string;
};
//Closing Cash Balance
export type ClosingCashBalance = {
  ActualTillDate: string;
  "Dec-23": string;
  "Dec-24": string;
  Head: string;
  HeadOrder: string;
  "Jun-23": string;
  "Jun-24": string;
  "Mar-23": string;
  "Mar-24": string;
  "Mar-25": string;
  Particulars: string;
  ParticularsOrder: string;
  ProjectedTotal: string;
  "Sep-23": string;
  "Sep-24": string;
  Total: string;
};
// underwritten----------------------------------------------------------------------------------------->

//underwritten inflows
export type UInflows = {
  ActualTillDate: string;
  "Dec-23": string;
  "Dec-24": string;
  Head: string;
  HeadOrder: string;
  "Jun-23": string;
  "Jun-24": string;
  "Mar-23": string;
  "Mar-24": string;
  "Mar-25": string;
  Particulars: string;
  ParticularsOrder: string;
  ProjectedTotal: string;
  "Sep-23": string;
  "Sep-24": string;
  Total: string;
};
//underwritten total inflows
export type UTotalInflows = {
  ActualTillDate: string;
  "Dec-23": string;
  "Dec-24": string;
  Head: string;
  HeadOrder: string;
  "Jun-23": string;
  "Jun-24": string;
  "Mar-23": string;
  "Mar-24": string;
  "Mar-25": string;
  Particulars: string;
  ParticularsOrder: string;
  ProjectedTotal: string;
  "Sep-23": string;
  "Sep-24": string;
  Total: string;
};
//underwritten outflows
export type UOutflows = {
  ActualTillDate: string;
  "Dec-23": string;
  "Dec-24": string;
  Head: string;
  HeadOrder: string;
  "Jun-23": string;
  "Jun-24": string;
  "Mar-23": string;
  "Mar-24": string;
  "Mar-25": string;
  Particulars: string;
  ParticularsOrder: string;
  ProjectedTotal: string;
  "Sep-23": string;
  "Sep-24": string;
  Total: string;
};
//underwritten total outflows
export type UTotalOutflows = {
  ActualTillDate: string;
  "Dec-23": string;
  "Dec-24": string;
  Head: string;
  HeadOrder: string;
  "Jun-23": string;
  "Jun-24": string;
  "Mar-23": string;
  "Mar-24": string;
  "Mar-25": string;
  Particulars: string;
  ParticularsOrder: string;
  ProjectedTotal: string;
  "Sep-23": string;
  "Sep-24": string;
  Total: string;
};
//underwritten net operating
export type UNetOperatingCashFlow = {
  ActualTillDate: string;
  "Dec-23": string;
  "Dec-24": string;
  Head: string;
  HeadOrder: string;
  "Jun-23": string;
  "Jun-24": string;
  "Mar-23": string;
  "Mar-24": string;
  "Mar-25": string;
  Particulars: string;
  ParticularsOrder: string;
  ProjectedTotal: string;
  "Sep-23": string;
  "Sep-24": string;
  Total: string;
};
//underwritten finanncing
export type UFinancing = {
  ActualTillDate: string;
  "Dec-23": string;
  "Dec-24": string;
  Head: string;
  HeadOrder: string;
  "Jun-23": string;
  "Jun-24": string;
  "Mar-23": string;
  "Mar-24": string;
  "Mar-25": string;
  Particulars: string;
  ParticularsOrder: string;
  ProjectedTotal: string;
  "Sep-23": string;
  "Sep-24": string;
  Total: string;
};
//underwritten Closing Cash Balance
export type UClosingCashBalance = {
  ActualTillDate: string;
  "Dec-23": string;
  "Dec-24": string;
  Head: string;
  HeadOrder: string;
  "Jun-23": string;
  "Jun-24": string;
  "Mar-23": string;
  "Mar-24": string;
  "Mar-25": string;
  Particulars: string;
  ParticularsOrder: string;
  ProjectedTotal: string;
  "Sep-23": string;
  "Sep-24": string;
  Total: string;
};

// projected plan--------------------------------------------------------------------------------->
//projected plan inflows
export type PInflows = {
  ActualTillDate: string;
  "Dec-23": string;
  "Dec-24": string;
  Head: string;
  HeadOrder: string;
  "Jun-23": string;
  "Jun-24": string;
  "Mar-23": string;
  "Mar-24": string;
  "Mar-25": string;
  Particulars: string;
  ParticularsOrder: string;
  ProjectedTotal: string;
  "Sep-23": string;
  "Sep-24": string;
  Total: string;
};
//projected plan total inflows
export type PTotalInflows = {
  ActualTillDate: string;
  "Dec-23": string;
  "Dec-24": string;
  Head: string;
  HeadOrder: string;
  "Jun-23": string;
  "Jun-24": string;
  "Mar-23": string;
  "Mar-24": string;
  "Mar-25": string;
  Particulars: string;
  ParticularsOrder: string;
  ProjectedTotal: string;
  "Sep-23": string;
  "Sep-24": string;
  Total: string;
};
//projected plan outflows
export type POutflows = {
  ActualTillDate: string;
  "Dec-23": string;
  "Dec-24": string;
  Head: string;
  HeadOrder: string;
  "Jun-23": string;
  "Jun-24": string;
  "Mar-23": string;
  "Mar-24": string;
  "Mar-25": string;
  Particulars: string;
  ParticularsOrder: string;
  ProjectedTotal: string;
  "Sep-23": string;
  "Sep-24": string;
  Total: string;
};
//projected plan total outflows
export type PTotalOutflows = {
  ActualTillDate: string;
  "Dec-23": string;
  "Dec-24": string;
  Head: string;
  HeadOrder: string;
  "Jun-23": string;
  "Jun-24": string;
  "Mar-23": string;
  "Mar-24": string;
  "Mar-25": string;
  Particulars: string;
  ParticularsOrder: string;
  ProjectedTotal: string;
  "Sep-23": string;
  "Sep-24": string;
  Total: string;
};
//projected plan net operating
export type PNetOperatingCashFlow = {
  ActualTillDate: string;
  "Dec-23": string;
  "Dec-24": string;
  Head: string;
  HeadOrder: string;
  "Jun-23": string;
  "Jun-24": string;
  "Mar-23": string;
  "Mar-24": string;
  "Mar-25": string;
  Particulars: string;
  ParticularsOrder: string;
  ProjectedTotal: string;
  "Sep-23": string;
  "Sep-24": string;
  Total: string;
};
//projected plan finanncing
export type PFinancing = {
  ActualTillDate: string;
  "Dec-23": string;
  "Dec-24": string;
  Head: string;
  HeadOrder: string;
  "Jun-23": string;
  "Jun-24": string;
  "Mar-23": string;
  "Mar-24": string;
  "Mar-25": string;
  Particulars: string;
  ParticularsOrder: string;
  ProjectedTotal: string;
  "Sep-23": string;
  "Sep-24": string;
  Total: string;
};
//projected plan Closing Cash Balance
export type PClosingCashBalance = {
  ActualTillDate: string;
  "Dec-23": string;
  "Dec-24": string;
  Head: string;
  HeadOrder: string;
  "Jun-23": string;
  "Jun-24": string;
  "Mar-23": string;
  "Mar-24": string;
  "Mar-25": string;
  Particulars: string;
  ParticularsOrder: string;
  ProjectedTotal: string;
  "Sep-23": string;
  "Sep-24": string;
  Total: string;
};
export type MisdatesFilters = {
  misDates: string[];
};

export type CashflowFilterReponse = {
  info: ResponseCodeType;
  data: MisdatesFilters;
};

// historical cashflow------------------------------------------------------------------------------>
// historical underwritten inflows
export type HUInflows = {
  ActualTillDate: string;
  "Dec-23": string;
  "Dec-24": string;
  Head: string;
  HeadOrder: string;
  "Jun-23": string;
  "Jun-24": string;
  "Mar-23": string;
  "Mar-24": string;
  "Mar-25": string;
  Particulars: string;
  ParticularsOrder: string;
  ProjectedTotal: string;
  "Sep-23": string;
  "Sep-24": string;
  Total: string;
};
// historical underwritten total inflows
export type HUTotalInflows = {
  ActualTillDate: string;
  "Dec-23": string;
  "Dec-24": string;
  Head: string;
  HeadOrder: string;
  "Jun-23": string;
  "Jun-24": string;
  "Mar-23": string;
  "Mar-24": string;
  "Mar-25": string;
  Particulars: string;
  ParticularsOrder: string;
  ProjectedTotal: string;
  "Sep-23": string;
  "Sep-24": string;
  Total: string;
};
//historical underwritten outflows
export type HUOutflows = {
  ActualTillDate: string;
  "Dec-23": string;
  "Dec-24": string;
  Head: string;
  HeadOrder: string;
  "Jun-23": string;
  "Jun-24": string;
  "Mar-23": string;
  "Mar-24": string;
  "Mar-25": string;
  Particulars: string;
  ParticularsOrder: string;
  ProjectedTotal: string;
  "Sep-23": string;
  "Sep-24": string;
  Total: string;
};
//historical underwritten total outflows
export type HUTotalOutflows = {
  ActualTillDate: string;
  "Dec-23": string;
  "Dec-24": string;
  Head: string;
  HeadOrder: string;
  "Jun-23": string;
  "Jun-24": string;
  "Mar-23": string;
  "Mar-24": string;
  "Mar-25": string;
  Particulars: string;
  ParticularsOrder: string;
  ProjectedTotal: string;
  "Sep-23": string;
  "Sep-24": string;
  Total: string;
};
//historical underwritten net operating
export type HUNetOperatingCashFlow = {
  ActualTillDate: string;
  "Dec-23": string;
  "Dec-24": string;
  Head: string;
  HeadOrder: string;
  "Jun-23": string;
  "Jun-24": string;
  "Mar-23": string;
  "Mar-24": string;
  "Mar-25": string;
  Particulars: string;
  ParticularsOrder: string;
  ProjectedTotal: string;
  "Sep-23": string;
  "Sep-24": string;
  Total: string;
};
//historical underwritten finanncing
export type HUFinancing = {
  ActualTillDate: string;
  "Dec-23": string;
  "Dec-24": string;
  Head: string;
  HeadOrder: string;
  "Jun-23": string;
  "Jun-24": string;
  "Mar-23": string;
  "Mar-24": string;
  "Mar-25": string;
  Particulars: string;
  ParticularsOrder: string;
  ProjectedTotal: string;
  "Sep-23": string;
  "Sep-24": string;
  Total: string;
};
// historical underwritten Closing Cash Balance
export type HUClosingCashBalance = {
  ActualTillDate: string;
  "Dec-23": string;
  "Dec-24": string;
  Head: string;
  HeadOrder: string;
  "Jun-23": string;
  "Jun-24": string;
  "Mar-23": string;
  "Mar-24": string;
  "Mar-25": string;
  Particulars: string;
  ParticularsOrder: string;
  ProjectedTotal: string;
  "Sep-23": string;
  "Sep-24": string;
  Total: string;
};
// historical Buisness plan inflows
export type HBInflows = {
  ActualTillDate: string;
  "Dec-23": string;
  "Dec-24": string;
  Head: string;
  HeadOrder: string;
  "Jun-23": string;
  "Jun-24": string;
  "Mar-23": string;
  "Mar-24": string;
  "Mar-25": string;
  Particulars: string;
  ParticularsOrder: string;
  ProjectedTotal: string;
  "Sep-23": string;
  "Sep-24": string;
  Total: string;
};
// historical Buisness plan total inflows
export type HBTotalInflows = {
  ActualTillDate: string;
  "Dec-23": string;
  "Dec-24": string;
  Head: string;
  HeadOrder: string;
  "Jun-23": string;
  "Jun-24": string;
  "Mar-23": string;
  "Mar-24": string;
  "Mar-25": string;
  Particulars: string;
  ParticularsOrder: string;
  ProjectedTotal: string;
  "Sep-23": string;
  "Sep-24": string;
  Total: string;
};
//historical Buisness plan outflows
export type HBOutflows = {
  ActualTillDate: string;
  "Dec-23": string;
  "Dec-24": string;
  Head: string;
  HeadOrder: string;
  "Jun-23": string;
  "Jun-24": string;
  "Mar-23": string;
  "Mar-24": string;
  "Mar-25": string;
  Particulars: string;
  ParticularsOrder: string;
  ProjectedTotal: string;
  "Sep-23": string;
  "Sep-24": string;
  Total: string;
};
//historical Buisness plan total outflows
export type HBTotalOutflows = {
  ActualTillDate: string;
  "Dec-23": string;
  "Dec-24": string;
  Head: string;
  HeadOrder: string;
  "Jun-23": string;
  "Jun-24": string;
  "Mar-23": string;
  "Mar-24": string;
  "Mar-25": string;
  Particulars: string;
  ParticularsOrder: string;
  ProjectedTotal: string;
  "Sep-23": string;
  "Sep-24": string;
  Total: string;
};
//historical Buisness plan net operating
export type HBNetOperatingCashFlow = {
  ActualTillDate: string;
  "Dec-23": string;
  "Dec-24": string;
  Head: string;
  HeadOrder: string;
  "Jun-23": string;
  "Jun-24": string;
  "Mar-23": string;
  "Mar-24": string;
  "Mar-25": string;
  Particulars: string;
  ParticularsOrder: string;
  ProjectedTotal: string;
  "Sep-23": string;
  "Sep-24": string;
  Total: string;
};
//historical Buisness plan finanncing
export type HBFinancing = {
  ActualTillDate: string;
  "Dec-23": string;
  "Dec-24": string;
  Head: string;
  HeadOrder: string;
  "Jun-23": string;
  "Jun-24": string;
  "Mar-23": string;
  "Mar-24": string;
  "Mar-25": string;
  Particulars: string;
  ParticularsOrder: string;
  ProjectedTotal: string;
  "Sep-23": string;
  "Sep-24": string;
  Total: string;
};
// historical Buisness plan Closing Cash Balance
export type HBClosingCashBalance = {
  ActualTillDate: string;
  "Dec-23": string;
  "Dec-24": string;
  Head: string;
  HeadOrder: string;
  "Jun-23": string;
  "Jun-24": string;
  "Mar-23": string;
  "Mar-24": string;
  "Mar-25": string;
  Particulars: string;
  ParticularsOrder: string;
  ProjectedTotal: string;
  "Sep-23": string;
  "Sep-24": string;
  Total: string;
};
