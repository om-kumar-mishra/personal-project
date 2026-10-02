import { RemarksObjType } from "../../../layout/dashboardRemarks/Datatypes";

export interface ProjectSummaryDetailsListType {
  project: string;
  location: string;
  landArea: string;
  launchStatus: string;
  totalSaleableArea: string;
  totalAreaSold: string;
  soldPercentage: string;
  completionPercentage: string;
  soldReceivables: string;
  unSoldReceivables: string;
  expenses: string;
  fcf: string;
  projectSummaryDetailsId: string;
  reassetId: number;
  npv: string;
  cashBalance: string;
}

export interface LegalRepaymentScheduleSummaryListType {
  fieldName: string;
  underwrittenPrincipal: number;
  underwrittenInterest: number;
  underwrittenTotal: number;
  actualPrincipal: number;
  actualInterest: number;
  actualTotal: number;
}

export type financialMetricsListType = {
  financialMetricsName: string;
  current: number;
  underwritten: number;
  format: number;
};

export type investmentTermsListType = {
  particular: string;
  fields: string;
  latestFigure: string;
  format: number;
};

export type InvestmentDataResponseType = {
  url: string;
  remarks: RemarksObjType;
  investmentSummaryList: {
    titleName: string;
    titleValue: string;
  }[];
  equityInvestmentSummary: {
    financialMetricsList: financialMetricsListType[];
    investmentTermsList: investmentTermsListType[];
    investmentTermsSecondList: {
      field: any;
      particular: string;
      fields: string;
      latestFigure: string;
    }[];
    projectSummaryDetailsList: ProjectSummaryDetailsListType[];
    distributionSummaryList: {
      particularName: string;
      particularValue: string;
    }[];
  };
  disbursement: {
    showlabel: string;
    disbursementDate: string;
    disbursementAmount: string;
    amountUtilised: string;
    usage: string;
    utilizationDate: string;
    attachments: string;
    fileContainer: string;
    filePath: string;
    fileName: string;
  }[];
  legalRepaymentSchedule: {
    legalRepaymentScheduleSummaryList: LegalRepaymentScheduleSummaryListType[];
    futureQuarterlyDistributionsList: {
      misDate: string;
      underwrittenPrincipal: number;
      underwrittenInterest: number;
      actualPrincipal: number;
      actualInterest: number;
    }[];
  };
};

export type InvestmentSummaryAsOnResponseType = {
  misdates: string[];
  investmentType: string;
};
