import FileSaver from "file-saver";
import { HDFC_API_ENDPOINT, getData, getFileBlob, getParams, postData, postDataMultipart } from "../../../../api/commons";
import {
  SiteVisitPendingImagesTableResponse,
  UpdateConstructionSiteImageStatusPayload,
  UpdateConstructionSiteImageStatusResponse,
  ConstructionPastSiteVisitImagesResponse,
  UploadConstructionModuleSiteImagesPayload,
  UploadConstructionModuleSiteImagesResponse,
  CanAddSiteVisitImagesResponse,
  ViewSiteImagesResponse,
  UploadSiteImageUpdatePayload,
  UploadSiteImageUpdateResponse,
  SiteVisitApprovalTableResponse,
  SiteVisitPastUpdateTableResponse,
} from "./dataTypes";

//############################################# Excel Upload Setup Region  ########################################################//

//#region [Upload Site image  Table]
export const getSiteVisitPendingImagesTableAPI = async (token: string, reAssetId: number, createdBy: string): Promise<SiteVisitPendingImagesTableResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/construction/getConstructionSiteVisitPendingImages${getParams({ reAssetId, createdBy })}`;
  try {
    const res: SiteVisitPendingImagesTableResponse = await getData(url, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [Upload Site image Approve/Reject]
export const updateConstructionSiteImageStatusAPI = async (
  token: string,
  payload: UpdateConstructionSiteImageStatusPayload,
): Promise<UpdateConstructionSiteImageStatusResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/construction/updateConstructionSiteImageStatus`;
  try {
    const res = await postData(url, payload, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion


//#region [Past Update]
export const getConstructionPastSiteVisitImagesAPI = async (token: string, reAssetId: number, createdBy: string): Promise<ConstructionPastSiteVisitImagesResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/construction/getConstructionPastSiteVisitImages${getParams({ reAssetId, createdBy })}`;
  try {
    const res: ConstructionPastSiteVisitImagesResponse = await getData(url, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion


//#region [Upload project summary Template]
export const uploadConstructionModuleSiteImagesAPI = async (
  token: string,
  payload: UploadConstructionModuleSiteImagesPayload,
): Promise<UploadConstructionModuleSiteImagesResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/construction/insertConstructionModuleSiteImages`;
  try {
    const formData = new FormData();
    formData.append("reassetId", String(payload.reassetId));
    formData.append("entityName", payload.entityName);
    formData.append("role", payload.role);
    formData.append("data", JSON.stringify(payload.data));
    formData.append("files", payload.files);
    const res: UploadConstructionModuleSiteImagesResponse = await postDataMultipart(url, formData, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [Can Setup Site Visit]
export const canAddSiteVisitImagesAPI = async (token: string, reAssetId: number, createdBy: string): Promise<CanAddSiteVisitImagesResponse | null> => {
  try {
    const url = `${HDFC_API_ENDPOINT}/construction/canAddSiteVisitImages${getParams({ reAssetId, createdBy })}`;
    const res = await getData(url, token);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
};
//#endregion

//  --------------------------------------------Setup Approve---------------------------------------------------------

//#region [Can View Images]
export const canViewImagesAPI = async (token: string, reAssetId: number, type: string): Promise<ViewSiteImagesResponse | null> => {
  try {
    const url = `${HDFC_API_ENDPOINT}/construction/getConstructionSetupImages${getParams({ reAssetId, type })}`;
    const res: ViewSiteImagesResponse = await getData(url, token);
    return res;
  } catch (error) {
    console.log(`Error: ${error}`);
    return null;
  }
};
//#endregion

//#region [Site Visit Approval Table]
export const getSiteVisitApprovalTableAPI = async (token: string, reAssetId: number, createdBy: string): Promise<SiteVisitApprovalTableResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/construction/getConstructionPastSetupPendingSiteImages${getParams({ reAssetId, createdBy })}`;
  try {
    const res: SiteVisitApprovalTableResponse = await getData(url, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [Site Visit Past Update Table]
export const getSiteVisitPastUpdateTableAPI = async (token: string, reAssetId: number, createdBy: string): Promise<SiteVisitPastUpdateTableResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/construction/getConstructionPastSetupSiteImages${getParams({ reAssetId, createdBy })}`;
  try {
    const res: SiteVisitPastUpdateTableResponse = await getData(url, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

// ------------------------------------------SetUp Update----------------------------------------------------------------

//#region [Upload Site image Update]
export const UploadSiteImageUpdateAPI = async (
  token: string,
  payload: UploadSiteImageUpdatePayload,
): Promise<UploadSiteImageUpdateResponse | null> => {
  const url = `${HDFC_API_ENDPOINT}/construction/insertConstructionSiteImages`;
  try {
    const res = await postData(url, payload, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [OnUpload image popup validate]
export const OnUploadImagePopupValidateAPI = async (token: string, reAssetId: number, createdBy: string): Promise<any | null> => {
  const url = `${HDFC_API_ENDPOINT}/construction/canAddSetupSiteImages${getParams({ reAssetId, createdBy })}`;
  try {
    const res: any = await getData(url, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion

//#region [Past update table download button]
export const pastUpdateTableDownloadButtonAPI = async (token: string, siteImageHistoryId: number): Promise<any | null> => {
  const url = `${HDFC_API_ENDPOINT}/construction/getConstructionImages${getParams({ siteImageHistoryId })}`;
  try {
    const res: any = await getData(url, token);
    return res;
  } catch (error) {
    console.log(`Error calling URL : ${url}`);
    return null;
  }
};
//#endregion


