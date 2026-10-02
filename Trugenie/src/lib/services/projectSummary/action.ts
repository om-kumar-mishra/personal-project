import { ProjectSummaryActionType } from "./types";

export const getProjectSummaryDetails = (
  reAssetId: string,
  misDate: string
) => ({
  type: ProjectSummaryActionType.GET_PROJECT_SUMMARY_DETAIL_REQUESTED,
  reAssetId,
  misDate,
});

export const getProjectSummaryFilterAction = (reAssetId: string) => ({
  type: ProjectSummaryActionType.GET_PROJECT_SUMMARY_FILTER_REQUESTED,
  reAssetId,
});
