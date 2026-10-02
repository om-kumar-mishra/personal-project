import { RemarksObjType } from "../../../layout/dashboardRemarks/Datatypes";

export type PortfolioSummaryList = {
  fundWiseSummaryList: fundWiseSummaryList[];
  investmentWiseSummaryList: investmentWiseSummaryList[];
  url: string;
  remarks: RemarksObjType;
};
export type fundWiseSummaryList = {
  amountCommited: string;
  amountInvested: string;
  amountReturned: string;
  currency: string;
  currentIRR: string;
  currentMultiple: string;
  fund: string;
  fundCommitment: string;
  fundWiseSummaryId: string;
  outstanding: string;
};
export type investmentWiseSummaryList = {
  amountCommited: string;
  cashCover: string;
  currentIRR: string;
  currentMultiple: string;
  developer: string;
  distribution: string;
  exitTimeline: string;
  fcf: string;
  firstInvestmentDate: string;
  fund: string;
  goingForwardDues: string;
  interestOverdue: string;
  investeeCompany: string;
  investmentId: string;
  investmentNature: string;
  ltv: string;
  nav: string;
  npv: string;
  principalOverdue: string;
  region: string;
  remarks: string;
  underWrittenIRR: string;
  underWrittenMultiple: string;
  amountInvested: string;
};
export type InvestementPerformanceFilters = {
  misdates: string[];
  regions: IRegions[];
  developers: Developers[];
  funds: IFunds[];
  exitTimeline: IExitTimeline[];
};

export type IRegions = {
  regionId: string;
  regionName: string;
};

export type IDevelopers = {
  developerId: string;
  developerName: string;
};
export type IFunds = {
  fundid: string;
  fundname: string;
};

export type IExitTimeline = {
  fieldName: string;
  value: string;
};

export type SalesPerformanceFilters = {
  period: Period[];
  regions: Regions[];
  developers: Developers[];
  exitTimeline: string;
  funds: Funds[];
  location: Location[];
};
export type Period = {
  startdate: string;
  enddate: string;
};
export type Regions = {
  regionId: string;
  regionName: string;
};

export type Developers = {
  developerId: string;
  developerName: string;
};

export type Funds = {
  fundid: string;
  fundname: string;
};

export type Location = {
  locationName: string;
  locationId: string;
};

export interface ResidentialSalesPerformance {
  type: string;
  developer: string;
  project: string;
  region: string;
  dataAsOf: string;
  launchDate: string;
  unitsLaunched: string;
  netSoldUnits: string;
  areaLaunched: string;
  areaSold: string;
  netSaleValue: string;
  collections: string;
  averageRatePSF: string;
  averageSaleValuePerUnit: string;
  reassetId: string;
}

export type SalesPerformanceList = {
  remarks?: RemarksObjType;
  saleperformance: [
    {
      type: string;
      unitLaunched: string;
      netUnitSold: string;
      areaLaunched: string;
      areaSold: string;
      netSaleValue: string;
      collections: string;
      averageRate: string;
      averageSaleValue: string;
    }
  ];
  residentialSales: ResidentialSalesPerformance[];
  url: string;
};
