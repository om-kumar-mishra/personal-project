interface APIResponseInfo {
    info: {
        message: string;
        code: number;
    };
}

export type SalesMonitoringPastHistory = {
    Status: string;
    FilePath: string;
    Entity: string | null,
    UserName: string;
    ActionType: string;
    Createdby: string;
    MISDate: string;
    FileName: string;
    CreatedAt: string;
    REAssetId: number;
    SaleMISDate: string;
    Remark: string;
    Role: string;
    ClientId: number;
    FileContainer: string;
    MonitoringHistoryId: number;
}

export type SalesMISDate = {
    CreatedBy: string;
    IsArchive: number;
    MISDate: string;
    CreatedAt: string;
}

export type SalesPerformance = {
    date: string;
    collections: number;
    salevalue: number;
    netsold: number;
    areasold: number;
    SellingRateAchieved: number;
}

export type TotalCost = {
    NetSurplus: number | null;
    AmountReceived: number;
    AmountDemanded: number;
    projectcost: number | null;
    Balancetobereceived: number;
    LoanOutStanding: number | null;
    BalanceCost: number | null;
    Salesproceedunsoldunits: number | null;
    Misdate: string;
    Totalreceivables: number | null;
    costincurred: number | null;
    SoldValue: number;
    CashFlowCover: number | null;
    Balancetobedemanded: number;
}

export type MoitoringSheetDetailsDataType = {
    constructionCost: any[]; 
    constructionCostArchive: any[]; 
    inventoryStatus: any[]; 
    salesPerformance: SalesPerformance[];
    totalCostCurrent: TotalCost[];
    totalCostPrevious: TotalCost[];
    unitConfiguration: any[];
}

export type SalesMonitoringPastHistoryResponse = APIResponseInfo & {
    data: SalesMonitoringPastHistory[];
};

export type RemoveSalesMonitoringHistoryResponse = APIResponseInfo & {
    data: [{ result: number }];
};

export type SalesMisDatesResponse = APIResponseInfo & {
    data: SalesMISDate[];
}

export type MoitoringSheetDetailsList = APIResponseInfo & {
    data: MoitoringSheetDetailsDataType[]
}



