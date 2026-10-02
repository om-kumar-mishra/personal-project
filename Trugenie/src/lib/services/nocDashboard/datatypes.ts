import { ResponseCodeType, stringNumber } from "../Datatype";
import { NocActionType } from "./types";

export interface daysPastNocDpnDetailsListType {
  amountRecevied: number;
  bucketing: string;
  daysDiff: number;
  financer: string;
  homebuyer: string;
  receivable: number;
  salesvalue: number;
  sqft: number;
  unitNo: string;
}

export interface daysPastNocDpnListType {
  daysPastDuedate: string;
  unitNo: number;
  list: daysPastNocDpnDetailsListType[];
  sqft: string;
}

export interface NocTowerViewListType {
  nocStatus: string;
  phase: string;
  tower: string;
  unitFloor: string;
  unitNo: string;
  wing: string;
}

export interface BuildingTowerViewFloorListType {
  unitFloor: string;
  nocUnitsStatusList: NocTowerViewListType[];
}

export interface BuildingTowerViewType {
  maxUnits: number;
  nocFloorList: BuildingTowerViewFloorListType[];
}
export interface daysPastNOCCountType {
  nocAmountPaidArea: number;
  nocAmountPaidUnits: number;
  nocDpnArea: number;
  nocDpnUnits: number;
}

export interface daysPendingNOCAnalysisTotalUnitsType {
  nocCancelled: number;
  nocCancelledArea: number;
  nocIssued: number;
  nocIssuedArea: number;
  nocNotIssued: number;
  nocNotIssuedArea: number;
  nocRejected: number;
  nocRejectedArea: number;
  unitsUnbooked: number;
  unitsUnbookedArea: number;
}

export interface nocDashboardOverviewType {
  totalBooked: number;
  totalNocIssued: number;
  totalRegistered: number;
  totalunit: number;
  unapprovedUnits: number;
}

export interface unitLocationWingType {
  unitLocationWing: string;
}

export interface unitLocationSubTypeNameType {
  unitLocationSubTypeName: string;
}

export interface projectPhaseType {
  projectPhase: string;
}

export interface projectsType {
  assetName: string;
  rEAssetId: string;
}

export interface NocREWingApiResponse {
  info: ResponseCodeType;
  data: {
    projectPhases: unitLocationSubTypeNameType[];
  };
}

export interface NocDashboardPayloadType {
  reAssetId: stringNumber;
  phase?: string;
  tower?: string;
  wing?: string;
  emailId: string;
}

export interface NocREWingPayloadType {
  reAssetId: stringNumber;
}

export interface NocDashboardAction {
  type: NocActionType;
  reAssetId: number;
  payload: NocDashboardPayloadType;
}

export interface NOCDashboardDetailsResponse {
  info: ResponseCodeType;
  data: {
    [key: string]: any;
  };
}

export interface NOCDashboardTowerViewResponse {
  info: ResponseCodeType;
  data: {
    [key: string]: any;
  };
}
