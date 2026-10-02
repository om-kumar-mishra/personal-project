export enum modules {
  Sale = "Sale",
  Construction = "Construction",
  Project_Summary = "Project Summary",
  Cashflow = "Cashflow",
  Portfolio = "Portfolio",
  Investment = "Investment",
}

// sales Enums
export enum salesDashboardName {
  Sales = "Sales",
}

export enum salesChartNames {
  Summary = "Summary",
  Price = "Price",
  Velocity = "Velocity",
  Comparison_of_Historical_Performance = "Comparison of Historical Performance",
  L12_Months_Performace = "L12 Months Performace",
  Trailling_Performance = "Trailling Performance",
  Demand_Collection = "Demand & Collection",
  Slow_Moving_Inventory = "Slow Moving Inventory",
  Slow_Moving_Inventory_Details = "Slow Moving Inventory Details",
  Competion_Analysis = "Competion Analysis",
  Location_Analysis = "Location Analysis",
  Aditional_Insights = "Aditional Insights",
}

// construction enums

export enum constructionDashboardName {
  Construction = "Construction",
}

export enum constrcutionChartNames {
  Summary = "Summary",
  Cost_Schedule = "Cost Schedule",
  Cumulative_Cost_Summary = "Cumulative Cost Summary",
  Construction_Activity = "Construction Activity",
  Physical_Progress = "Physical Progress",
  Layout_and_Photographs = "Layout and Photographs",
  Labour_Record = "Labour Record",
  Approvals = "Approvals",
  RERA_Details = "RERA Details",
  Input_Cost_Industury_Price_Movement = "Input Cost - Industury Price Movement",
}

// Cashflow enums

export enum cashflowDashboardName {
  Cashflow = "Cashflow",
}

export enum cashflowChartNames {
  Underwritten = "Underwritten",
  Business_Plan = "Business Plan",
  Historical_Cashflow = "Historical Cashflow",
  Projected_Cashflow = "Projected Cashflow",
}

//Project Summary enums

export enum projectSummaryDashboardName {
  Project_Summary = "Project Summary",
}

export enum projectSummaryChartNames {
  // Project_Summary_Underwritten = "Project Summary Underwritten",
  // Project_Summary_Business_Plan = "Project Summary Business Plan",
  Project_Summary = "Project Summary",
}

// portfolio enums

export enum portfolioDashboardName {
  Investment_Performance = "Investment Performance",
  Sales_Performance = "Sales Performance",
}

export enum portfolioChartNames {
  Investment_Performance = "Investment Performance",
  Sales_Performance = "Sales Performance",
}

// Investment enums

export enum investmentDashboardName {
  Investment = "Investment",
}
export enum investmentChartNames {
  Investment_Performance = "Investment Performance",
}

export type DashboardName =
  | salesDashboardName
  | constructionDashboardName
  | projectSummaryDashboardName
  | cashflowDashboardName
  | portfolioDashboardName
  | investmentDashboardName;

export type ChartNames =
  | salesChartNames
  | constrcutionChartNames
  | projectSummaryChartNames
  | cashflowChartNames
  | investmentChartNames
  | portfolioChartNames
  | investmentChartNames;
