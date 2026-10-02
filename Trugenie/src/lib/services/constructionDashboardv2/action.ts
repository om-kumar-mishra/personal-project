import {
  ApprovalDocumentsPayload,
  ConstructionSummaryPayload,
} from "./dataType";
import { ConstructionDashboardActionType as type } from "./types";

export const getConstructionSummaryAction = (
  payload: ConstructionSummaryPayload
) => ({
  type: type.GET_CONSTRUCTION_SUMMARY_REQUESTED,
  payload,
});

export const getConstructionDropDownAction = (reAssetId: number) => ({
  type: type.GET_CONSTRUCTION_DROPDOWN_REQUESTED,
  payload: { reAssetId },
});

export const getApprovalDocuments = (payload: ApprovalDocumentsPayload) => ({
  type: type.GET_CONSTRUCTION_APPROVALDOCUMENTS_REQUESTED,
  payload,
});

export const resetApprovalDocuments = () => ({
  type: type.GET_CONSTRUCTION_APPROVALDOCUMENTS_FAILED,
});
