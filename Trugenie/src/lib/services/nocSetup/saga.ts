import { call, put, select, takeLeading } from "redux-saga/effects";
import { handelReponseCode } from "../../../modules/Components/UtilityFunctions";
import { errorNotification, successNotification } from "../../../utils/notifications";
import { selectAccessToken } from "../hdfc_login/selectors";
import {
  NOCAccountTypeFailedAction,
  NOCAccountTypeSuccessAction,
  NOCProjectDetailsFailedAction,
  NOCProjectDetailsSuccessAction,
  NocAccountTypeFailedType,
  NocAccountTypeRequestType,
  NocAccountTypeSuccessType,
  NocProjectDetailsFailedType,
  NocProjectDetailsRequestType,
  NocProjectDetailsSuccessType,
  NocSetupPeriodRequestType,
  NocSetupProjectFailedType,
  NocSetupProjectSuccessType,
  NocSetupProjectTypeRequestType,
  NocSetupThresholdRequestType,
  NocSetupWorkFlowRequestType,
  setupNocProjectAction,
  setupNocProjectFailedAction,
  NocProjectEntitiesRequestType,
  NocProjectEntitiesSuccessType,
  NOCProjectEntitiesSuccessAction,
  NocProjectEntitiesFailedType,
  NOCProjectEntitiesFailedAction,
  NocProjectEntityUsersRequestType,
  NocProjectEntityUsersSuccessType,
  NOCProjectEntityUsersSuccessAction,
  NocProjectEntityUsersFailedType,
  NOCProjectEntityUsersFailedAction,
  NocWorkflowDetailsRequestType,
  NocWorkflowDetailsSuccessType,
  NOCWorkflowDetailsSuccessAction,
  NocWorkflowDetailsFailedType,
  NOCWorkflowDetailsFailedAction,
  
  GetDebentureByClientRequestType,
  GetDebentureByClientSuccessType,
  GetDebentureByClientSuccessAction,
  GetDebentureByClientFailedType,
  GetDebentureByClientFailedAction,
  GetLenderByClientRequestType,
  GetLenderByClientSuccessType,
  GetLenderByClientSuccessAction,
  GetLenderByClientFailedType,
  GetLenderByClientFailedAction,
  
  GetDeveloperByClientRequestType,
  GetDeveloperByClientSuccessType,
  GetDeveloperByClientSuccessAction,
  GetDeveloperByClientFailedType,
  GetDeveloperByClientFailedAction,
  
  GetPMCByClientRequestType,
  GetPMCByClientSuccessType,
  GetPMCByClientSuccessAction,
  GetPMCByClientFailedType,
  GetPMCByClientFailedAction,
  GetEntityUserRequestType,
  GetEntityUserSuccessType,
  GetEntityUserSuccessAction,
  GetEntityUserFailedType,
  GetEntityUserFailedAction,
  NocSetupUpdateSuccessAction,
  NocSetupUpdateSuccessType,
  NocSetupUpdateFailedAction,
  NocSetupUpdateFailedType,
  NocSetupUpdateRequestAction,
  NocSetupUpdateRequestType,
} from "./action";
import * as Api from "./api";
import {
  NOCSetupAccountTypeApiResponse,
  NOCSetupProjectDetailsApiResponse,
  NOCSetupWorkFlowApiResponse,
  NOCViewUserDetailApiResponse,
  NocAccountDetailsApiResponse,
  NocPeriodApiResponse,
  NocPriceHeadersApiResponse,
  NocProjectTowerApiResponse,
  NocReraNumberApiResponse,
  NocSetupPriceHeadersAction,
  NocSetupProjectAction,
  NocSetupProjectApiResponse,
  NocSetupProjectTypeAction,
  NocSetupReraAction,
  NocSetupViewUserDetailAction,
  NocThresholdTypeApiResponse,
  NocProjectEntitiesApiResponse,
  NocProjectEntityUsersApiResponse,
  NocWorkflowDetailsApiResponse,
  GetDebentureByClientApiResponse,
  GetLenderByClientApiResponse,
  GetPMCByClientApiResponse,
  GetDeveloperByClientApiResponse,
  GetEntityUserApiResponse,
  UploadSetupNOCResponse,
} from "./datatype";
import { NocSetupActionType } from "./types";

function* getThresholdTypeSaga(action: NocSetupThresholdRequestType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const result: NocThresholdTypeApiResponse = yield call(Api.getThresholdType, accessToken);
    const { isError } = handelReponseCode(undefined, result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      yield put({
        type: NocSetupActionType.GET_THRESHOLD_TYPE_SUCCESS,
        result: "data" in result ? result.data : result,
      });
    }
  } catch (e: any) {
    yield put({
      type: NocSetupActionType.GET_THRESHOLD_TYPE_FAILED,
      message: e.message,
    });
  }
}

function* getPeriodSaga(action: NocSetupPeriodRequestType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const result: NocPeriodApiResponse = yield call(Api.getPeriod, accessToken);
    const { isError } = handelReponseCode(undefined, result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      yield put({
        type: NocSetupActionType.GET_PERIOD_SUCCESS,
        result:
          "data" in result
            ? result.data.map(v => ({
                value: v.dataValue,
                label: v.displayLabel,
              }))
            : result,
      });
    }
  } catch (e: any) {
    yield put({
      type: NocSetupActionType.GET_PERIOD_FAILED,
      message: e.message,
    });
  }
}

function* getProjectTypeSaga(action: NocSetupProjectTypeRequestType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const result: NocThresholdTypeApiResponse = yield call(Api.getProjectType, accessToken);

    const { isError } = handelReponseCode(undefined, result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      yield put({
        type: NocSetupActionType.GET_PROJECT_TYPE_SUCCESS,
        result: "data" in result ? result.data : result,
      });
    }
  } catch (e: any) {
    yield put({
      type: NocSetupActionType.GET_PROJECT_TYPE_FAILED,
      message: e.message,
    });
  }
}

function* getReraDetailsSaga(action: NocSetupReraAction) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const result: NocReraNumberApiResponse = yield call(Api.getReraDetails, accessToken, action.reAssetId, action.towers);
    const { isError } = handelReponseCode(undefined, result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      yield put({
        type: NocSetupActionType.GET_RERA_NO_SUCCESS,
        result: "data" in result ? (result.data.length > 0 ? result.data[0].rerano : "") : result,
      });
    }
  } catch (e: any) {
    yield put({
      type: NocSetupActionType.GET_RERA_NO_FAILED,
      message: e.message,
    });
  }
}

function* getProjectTowerSaga(action: NocSetupProjectTypeAction) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const result: NocProjectTowerApiResponse = yield call(Api.getREProjectTowers, accessToken, action.reassetId);
    const { isError } = handelReponseCode(undefined, result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      yield put({
        type: NocSetupActionType.GET_PROJECT_TOWERS_SUCCESS,
        result:
          "data" in result
            ? result.data.map(v => ({
                value: v.UnitLocationSubTypeName,
                label: v.UnitLocationSubTypeName,
              }))
            : result,
      });
    }
  } catch (e: any) {
    yield put({
      type: NocSetupActionType.GET_PROJECT_TOWERS_FAILED,
      message: e.message,
    });
  }
}

function* getProjectPriceHeadersSaga(action: NocSetupPriceHeadersAction) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const result: NocPriceHeadersApiResponse = yield call(Api.getProjectPriceHeaders, accessToken, action.nocProjectId, action.reassetId);
    const { isError } = handelReponseCode(undefined, result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      yield put({
        type: NocSetupActionType.GET_PROJECT_PRICE_HEADERS_SUCCESS,
        result:
          "data" in result
            ? result.data.map(v => ({
                value: v.REPriceHeaderId,
                label: v.HeaderValue,
                isselected: v.isSelected,
              }))
            : result,
      });
    }
  } catch (e: any) {
    yield put({
      type: NocSetupActionType.GET_PROJECT_PRICE_HEADERS_FAILED,
      message: e.message,
    });
  }
}

function* getAccountDetailsSaga(action: NocSetupPriceHeadersAction) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const result: NocAccountDetailsApiResponse = yield call(Api.getAccountDetails, accessToken, action.nocProjectId);
    const { isError } = handelReponseCode(undefined, result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      yield put({
        type: NocSetupActionType.GET_ACCOUNT_DETAILS_SUCCESS,
        result: "data" in result ? result.data : result,
      });
    }
  } catch (e: any) {
    yield put({
      type: NocSetupActionType.GET_ACCOUNT_DETAILS_FAILED,
      message: e.message,
    });
  }
}

function* getNOCSetupWorkFlowSaga(action: NocSetupWorkFlowRequestType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const result: NOCSetupWorkFlowApiResponse = yield call(Api.getNOCSetupWorkFlow, accessToken);

    const { isError } = handelReponseCode(undefined, result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      yield put({
        type: NocSetupActionType.GET_SETUP_WORKFLOW_SUCCESS,
        result: "data" in result ? result.data : result,
      });
    }
  } catch (e: any) {
    yield put({
      type: NocSetupActionType.GET_SETUP_WORKFLOW_FAILED,
      message: e.message,
    });
  }
}

function* getViewUserDetailsSaga(action: NocSetupViewUserDetailAction) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const result: NOCViewUserDetailApiResponse = yield call(Api.getViewUserDetails, accessToken, action.reassetId, action.roleName);

    const { isError } = handelReponseCode(undefined, result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      yield put({
        type: NocSetupActionType.GET_VIEW_USER_DETAILS_SUCCESS,
        result: "data" in result ? result.data : result,
      });
    }
  } catch (e: any) {
    yield put({
      type: NocSetupActionType.GET_VIEW_USER_DETAILS_FAILED,
      message: e.message,
    });
  }
}

function* setupNOCProjectSaga(action: NocSetupProjectAction) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const result: NocSetupProjectApiResponse = yield call(Api.setupNocProject, accessToken, action.payload);
    const { isError } = handelReponseCode(action?.callBack, result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      yield call(successNotification, "NOC Setup done Successfully");
      const next: NocSetupProjectSuccessType = yield call(setupNocProjectAction, "info" in result ? result?.info : { code: 200, message: "Success" });
      yield put(next);
    }
  } catch (e: any) {
    yield call(errorNotification, "Something Went Wrong!");
    const next: NocSetupProjectFailedType = yield call(setupNocProjectFailedAction, "info" in e ? e.info : { code: 500, message: "Something Went Wrong!" });
    yield put(next);
  }
}

function* getNOCAccountTypeSaga(action: NocAccountTypeRequestType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const result: NOCSetupAccountTypeApiResponse = yield call(Api.getAccountType, accessToken);

    const { isError } = handelReponseCode(undefined, result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: NocAccountTypeSuccessType = yield call(NOCAccountTypeSuccessAction, result);
      yield put(next);
    }
  } catch (e: unknown) {
    const next: NocAccountTypeFailedType = yield call(NOCAccountTypeFailedAction);
    yield put(next);
  }
}

function* getNOCProjectDetailsSaga(action: NocProjectDetailsRequestType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const result: NOCSetupProjectDetailsApiResponse = yield call(Api.getProjectDetails, accessToken, action.NocProjectId);
    const { isError } = handelReponseCode(undefined, result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: NocProjectDetailsSuccessType = yield call(NOCProjectDetailsSuccessAction, result);
      yield put(next);
    }
  } catch (e: unknown) {
    console.log("e: ", e);
    const next: NocProjectDetailsFailedType = yield call(NOCProjectDetailsFailedAction);
    yield put(next);
  }
}

function* getNOCProjectEntitiesSaga(action: NocProjectEntitiesRequestType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const result: NocProjectEntitiesApiResponse = yield call(Api.getNocProjectEntities, accessToken, action.NocProjectId,action.email);
    const { isError } = handelReponseCode(undefined, result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: NocProjectEntitiesSuccessType = yield call(NOCProjectEntitiesSuccessAction, result);
      yield put(next);
    }
  } catch (e: unknown) {
    console.log("e: ", e);
    const next: NocProjectEntitiesFailedType = yield call(NOCProjectEntitiesFailedAction);
    yield put(next);
  }
}

function* getNOCProjectEntityUsersSaga(action: NocProjectEntityUsersRequestType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const result: NocProjectEntityUsersApiResponse = yield call(Api.getNocProjectEntityUsers, accessToken, action.NocProjectId,action.email);
    const { isError } = handelReponseCode(undefined, result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: NocProjectEntityUsersSuccessType = yield call(NOCProjectEntityUsersSuccessAction, result);
      yield put(next);
    }
  } catch (e: unknown) {
    console.log("e: ", e);
    const next: NocProjectEntityUsersFailedType = yield call(NOCProjectEntityUsersFailedAction);
    yield put(next);
  }
}

function* getNOCWorkflowDetailsSaga(action: NocWorkflowDetailsRequestType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const result: NocWorkflowDetailsApiResponse = yield call(Api.getNocWorkflowDetails, accessToken, action.NocProjectId);
    const { isError } = handelReponseCode(undefined, result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: NocWorkflowDetailsSuccessType = yield call(NOCWorkflowDetailsSuccessAction, result);
      yield put(next);
    }
  } catch (e: unknown) {
    console.log("e: ", e);
    const next: NocWorkflowDetailsFailedType = yield call(NOCWorkflowDetailsFailedAction);
    yield put(next);
  }
}

function* getDebentureByClientSaga(action: GetDebentureByClientRequestType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const result: GetDebentureByClientApiResponse = yield call(Api.getDebentureByClient, accessToken, action.NocProjectId);
    const { isError } = handelReponseCode(undefined, result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: GetDebentureByClientSuccessType = yield call(GetDebentureByClientSuccessAction, result);
      yield put(next);
    }
  } catch (e: unknown) {
    console.log("e: ", e);
    const next: GetDebentureByClientFailedType = yield call(GetDebentureByClientFailedAction);
    yield put(next);
  }
}

function* getLenderByClientSaga(action: GetLenderByClientRequestType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const result: GetLenderByClientApiResponse = yield call(Api.getLenderByClient, accessToken, action.NocProjectId);
    const { isError } = handelReponseCode(undefined, result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: GetLenderByClientSuccessType = yield call(GetLenderByClientSuccessAction, result);
      yield put(next);
    }
  } catch (e: unknown) {
    console.log("e: ", e);
    const next: GetLenderByClientFailedType = yield call(GetLenderByClientFailedAction);
    yield put(next);
  }
}

function* getDeveloperByClientSaga(action: GetDeveloperByClientRequestType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const result: GetDeveloperByClientApiResponse = yield call(Api.getDeveloperByClient, accessToken, action.NocProjectId);
    const { isError } = handelReponseCode(undefined, result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: GetDeveloperByClientSuccessType = yield call(GetDeveloperByClientSuccessAction, result);
      yield put(next);
    }
  } catch (e: unknown) {
    console.log("e: ", e);
    const next: GetDeveloperByClientFailedType = yield call(GetDeveloperByClientFailedAction);
    yield put(next);
  }
}


function* getPMCByClientSaga(action: GetPMCByClientRequestType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const result: GetPMCByClientApiResponse = yield call(Api.getPMCByClient, accessToken, action.NocProjectId);
    const { isError } = handelReponseCode(undefined, result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: GetPMCByClientSuccessType = yield call(GetPMCByClientSuccessAction, result);
      yield put(next);
    }
  } catch (e: unknown) {
    console.log("e: ", e);
    const next: GetPMCByClientFailedType = yield call(GetPMCByClientFailedAction);
    yield put(next);
  }
}


function* getEntityUserSaga(action: GetEntityUserRequestType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const result: GetEntityUserApiResponse = yield call(Api.getEntityUser, accessToken, action.entityId,action.entityType);
    const { isError } = handelReponseCode(undefined, result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: GetEntityUserSuccessType = yield call(GetEntityUserSuccessAction, result);
      yield put(next);
    }
  } catch (e: unknown) {
    console.log("e: ", e);
    const next: GetEntityUserFailedType = yield call(GetEntityUserFailedAction);
    yield put(next);
  }
}

function* updateSetupNOCSaga(action: NocSetupUpdateRequestType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const result: UploadSetupNOCResponse = yield call(Api.updateSetupNOC, accessToken, action.payload);
    const { isError } = handelReponseCode(action?.callBack, result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      // yield call(successNotification, "NOC Setup done Successfully");
      const next: NocSetupUpdateSuccessType = yield call(NocSetupUpdateSuccessAction, result);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put(NocSetupUpdateFailedAction());
  }
  
  // catch (e: any) {
  //   yield call(errorNotification, "Something Went Wrong!");
  //   const next: NocSetupUpdateFailedType = yield call(NocSetupUpdateFailedAction, "info" in e ? e.info : { code: 500, message: "Something Went Wrong!" });
  //   yield put(next);
  // }
}

export default function* nocSetupSaga() {
  yield takeLeading(NocSetupActionType.GET_THRESHOLD_TYPE_REQUESTED, getThresholdTypeSaga);
  yield takeLeading(NocSetupActionType.GET_PERIOD_REQUESTED, getPeriodSaga);
  yield takeLeading(NocSetupActionType.GET_PROJECT_TYPE_REQUESTED, getProjectTypeSaga);
  yield takeLeading(NocSetupActionType.GET_RERA_NO_REQUESTED, getReraDetailsSaga);
  yield takeLeading(NocSetupActionType.GET_PROJECT_TOWERS_REQUESTED, getProjectTowerSaga);
  yield takeLeading(NocSetupActionType.GET_PROJECT_PRICE_HEADERS_REQUESTED, getProjectPriceHeadersSaga);
  yield takeLeading(NocSetupActionType.GET_ACCOUNT_DETAILS_REQUESTED, getAccountDetailsSaga);
  yield takeLeading(NocSetupActionType.GET_SETUP_WORKFLOW_REQUESTED, getNOCSetupWorkFlowSaga);
  yield takeLeading(NocSetupActionType.GET_VIEW_USER_DETAILS_REQUESTED, getViewUserDetailsSaga);
  yield takeLeading(NocSetupActionType.SETUP_NOC_PROJECT_REQUESTED, setupNOCProjectSaga);
  yield takeLeading(NocSetupActionType.GET_ACCOUNT_TYPE_REQUESTED, getNOCAccountTypeSaga);
  yield takeLeading(NocSetupActionType.GET_NOC_PROJECT_DETAILS_REQUESTED, getNOCProjectDetailsSaga);
  yield takeLeading(NocSetupActionType.GET_NOC_PROJECT_ENTITIES_REQUESTED, getNOCProjectEntitiesSaga);
  yield takeLeading(NocSetupActionType.GET_NOC_PROJECT_ENTITY_USERS_REQUESTED, getNOCProjectEntityUsersSaga);
  yield takeLeading(NocSetupActionType.GET_NOC_WORKFLOW_DETAILS_REQUESTED, getNOCWorkflowDetailsSaga);
  yield takeLeading(NocSetupActionType.GET_NOC_DEVELOPER_BY_CLIENT_REQUESTED, getDeveloperByClientSaga);
  yield takeLeading(NocSetupActionType.GET_NOC_DEBENTURE_BY_CLIENT_REQUESTED, getDebentureByClientSaga);
  yield takeLeading(NocSetupActionType.GET_NOC_LENDER_BY_CLIENT_REQUESTED, getLenderByClientSaga);
  yield takeLeading(NocSetupActionType.GET_NOC_PMC_BY_CLIENT_REQUESTED, getPMCByClientSaga);
  yield takeLeading(NocSetupActionType.GET_ENTITY_USER_REQUESTED, getEntityUserSaga);
  yield takeLeading(NocSetupActionType.NOC_SETUP_UPDATE_REQUESTED, updateSetupNOCSaga);
}
