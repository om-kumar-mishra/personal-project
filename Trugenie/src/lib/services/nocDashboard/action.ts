import { NocDashboardPayloadType, NocREWingPayloadType } from "./datatypes";
import { NocActionType } from "./types";

export const getREWing = (reAssetId: number | string) => ({
  type: NocActionType.GET_WING_REQUESTED,
  reAssetId,
});

export const getNocDashboardDetails = (payload: NocDashboardPayloadType) => ({
  type: NocActionType.GET_NOC_DASHBOARD_DETAIL_REQUESTED,
  payload,
});

export const refereshNocDashboardDetails = () => ({
  type: NocActionType.GET_NOC_DASHBOARD_DETAIL_FAILED,
});

export const refreshREWing = () => ({
  type: NocActionType.GET_WING_FAILED,
});

export const getNOCDashboardTowerView = (payload: any) => ({
  type: NocActionType.GET_NOC_DASHBOARD_TOWER_REQUESTED,
  payload,
});

export const refereshNocTowerDetails = () => ({
  type: NocActionType.GET_NOC_DASHBOARD_TOWER_FAILED,
});
