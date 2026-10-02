import { call, put, select, takeLeading } from "redux-saga/effects";
import * as Api from "../../api/index";
import { SalesDashboardActionTypes as ActionTypes } from "./types";
import {
  SalesDashboardAction,
  SalesDashboardDetailApiRequest,
  SalesDashboardDetailResponse,
  SalesDashboardDetailv2Response,
  SalesDashboardFiscalYearApiRequest,
  SalesFiscalYearApiResponse,
  SalesMisHistoryApiResponse,
  SalesProjectApiResponse,
  SalesREPhaseApiResponse,
  SalesREProjectSubTypeApiResponse,
  SalesREProjectTypeApiResponse,
  SalesRETowerApiResponse,
  SalesRETowerV2ApiResponse,
  SalesREUnitOwnedByApiResponse,
  SalesREUnitStatusApiResponse,
  SalesREUnitsApiResponse,
  SalesREWingV2ApiResponse,
} from "./dataTypes";
import { convertIntoSelectArray } from "../../../utils/commonFunctions";
import { selectAccessToken } from "../hdfc_login/selectors";
import { handelReponseCode } from "../../../modules/Components/UtilityFunctions";

function* getProjectNames(action: SalesDashboardAction) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const result: SalesProjectApiResponse = yield call(Api.getSalesDashboardProjectNames, accessToken, action.emailId);
    const { isError } = handelReponseCode(undefined, result?.info);
    if (isError) {
      throw new Error(result?.info?.message || "API Failed...");
    } else {
      yield put({
        type: ActionTypes.GET_SALES_PROJECT_NAME_SUCCESS,
        result: result,
      });
    }
  } catch (e: any) {
    yield put({
      type: ActionTypes.GET_SALES_PROJECT_NAME_FAILED,
      message: e.message,
    });
  }
}

function* getUnitTypes(action: SalesDashboardAction) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const result: SalesREUnitsApiResponse = yield call(Api.getSalesDashboardUnitTypes, accessToken, action.reAssetId);
    const { isError } = handelReponseCode(undefined, result?.info);
    if (isError) {
      throw new Error(result?.info?.message || "API Failed...");
    } else {
      yield put({
        type: ActionTypes.GET_UNIT_TYPE_SUCCESS,
        result: result,
      });
    }
  } catch (e: any) {
    yield put({
      type: ActionTypes.GET_UNIT_TYPE_FAILED,
      message: e.message,
    });
  }
}

function* getPhase(action: SalesDashboardAction) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const result: SalesREPhaseApiResponse = yield call(Api.getSalesDashboardPhase, accessToken, action.reAssetId);
    const { isError } = handelReponseCode(undefined, result?.info);
    if (isError) {
      throw new Error(result?.info?.message || "API Failed...");
    } else {
      yield put({
        type: ActionTypes.GET_PHASE_SUCCESS,
        result: result,
      });
    }
  } catch (e: any) {
    yield put({
      type: ActionTypes.GET_PHASE_FAILED,
      message: e.message,
    });
  }
}

function* getTower(action: SalesDashboardAction) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const result: SalesRETowerApiResponse = yield call(Api.getSalesDashboardTower, accessToken, action.reAssetId);
    const { isError } = handelReponseCode(undefined, result?.info);
    if (isError) {
      throw new Error(result?.info?.message || "API Failed...");
    } else {
      yield put({
        type: ActionTypes.GET_TOWER_SUCCESS,
        result: result,
      });
    }
  } catch (e: any) {
    yield put({
      type: ActionTypes.GET_TOWER_FAILED,
      message: e.message,
    });
  }
}

function* getFiscalYear(action: SalesDashboardFiscalYearApiRequest) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const result: SalesFiscalYearApiResponse = yield call(Api.getSalesDashboardFiscalYear, accessToken, action);
    const { isError } = handelReponseCode(undefined, result?.info);
    if (isError) {
      throw new Error(result?.info?.message || "API Failed...");
    } else {
      yield put({
        type: ActionTypes.GET_FISCAL_YEAR_SUCCESS,
        result: result,
      });
    }
  } catch (e: any) {
    yield put({
      type: ActionTypes.GET_FISCAL_YEAR_FAILED,
      message: e.message,
    });
  }
}

function* getSalesDashboardDetails(action: SalesDashboardDetailApiRequest) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const result: SalesDashboardDetailResponse = yield call(Api.getSalesDashboardDetails, accessToken, action);
    const { isError } = handelReponseCode(undefined, result?.info);
    if (isError) {
      throw new Error(result?.info?.message || "API Failed...");
    } else {
      yield put({
        type: ActionTypes.GET_SALES_DASHBOARD_DETAILS_SUCCESS,
        result: result,
      });
    }
  } catch (e: any) {
    yield put({
      type: ActionTypes.GET_SALES_DASHBOARD_DETAILS_FAILED,
      message: e.message,
    });
  }
}

function* getSalesDashboardDetailsv2(action: SalesDashboardDetailApiRequest) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const result: SalesDashboardDetailv2Response = yield call(Api.getSalesDashboardDetailsv2, accessToken, action);
    const { isError } = handelReponseCode(undefined, result?.info);
    if (isError) {
      throw new Error(result?.info?.message || "API Failed...");
    } else {
      yield put({
        type: ActionTypes.GET_SALES_DASHBOARD_DETAILS_V2_SUCCESS,
        result: result,
      });
    }
  } catch (e: any) {
    yield put({
      type: ActionTypes.GET_SALES_DASHBOARD_DETAILS_V2_FAILED,
      message: e.message,
    });
  }
}

function* getSalesMisHistory(action: SalesDashboardAction) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const result: SalesMisHistoryApiResponse = yield call(Api.getSalesMisHistory, accessToken, action.reAssetId);
    const { isError } = handelReponseCode(undefined, result?.info);
    if (isError) {
      throw new Error(result?.info?.message || "API Failed...");
    } else {
      yield put({
        type: ActionTypes.GET_SALES_MIS_HISTORY_SUCCESS,
        result: "data" in result ? convertIntoSelectArray(result.data, "misDate", "misDate", "", true) : result,
      });
    }
  } catch (e: any) {
    yield put({
      type: ActionTypes.GET_SALES_MIS_HISTORY_FAILED,
      message: e.message,
    });
  }
}

function* getREProjectType(action: SalesDashboardAction) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const result: SalesREProjectTypeApiResponse = yield call(Api.getREProjectType, accessToken, action.reAssetId);
    const { isError } = handelReponseCode(undefined, result?.info);
    if (isError) {
      throw new Error(result?.info?.message || "API Failed...");
    } else {
      yield put({
        type: ActionTypes.GET_RE_PROJECT_TYPE_SUCCESS,
        result: "data" in result ? convertIntoSelectArray(result.data, "projectType", "projectType") : result,
      });
    }
  } catch (e: any) {
    yield put({
      type: ActionTypes.GET_RE_PROJECT_TYPE_FAILED,
      message: e.message,
    });
  }
}

function* getREProjectSubType(action: SalesDashboardAction) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const result: SalesREProjectSubTypeApiResponse = yield call(Api.getREProjectSubType, accessToken, action.payload);
    const { isError } = handelReponseCode(undefined, result?.info);
    if (isError) {
      throw new Error(result?.info?.message || "API Failed...");
    } else {
      yield put({
        type: ActionTypes.GET_RE_PROJECT_SUB_TYPE_SUCCESS,
        result: "data" in result ? convertIntoSelectArray(result.data, "projectSubType", "projectSubType") : result,
      });
    }
  } catch (e: any) {
    yield put({
      type: ActionTypes.GET_RE_PROJECT_SUB_TYPE_FAILED,
      message: e.message,
    });
  }
}

function* getREUnitLaunchStatus(action: SalesDashboardAction) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const result: SalesREUnitStatusApiResponse = yield call(Api.getREUnitStatus, accessToken, action.payload);
    const { isError } = handelReponseCode(undefined, result?.info);
    if (isError) {
      throw new Error(result?.info?.message || "API Failed...");
    } else {
      yield put({
        type: ActionTypes.GET_RE_UNIT_LAUNCH_STATUS_SUCCESS,
        result: "data" in result ? convertIntoSelectArray(result.data, "launchStatus", "launchStatus") : result,
      });
    }
  } catch (e: any) {
    yield put({
      type: ActionTypes.GET_RE_UNIT_LAUNCH_STATUS_FAILED,
      message: e.message,
    });
  }
}

function* getREUnitSecurityStatus(action: SalesDashboardAction) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const result: SalesREUnitStatusApiResponse = yield call(Api.getREUnitStatus, accessToken, action.payload);
    const { isError } = handelReponseCode(undefined, result?.info);
    if (isError) {
      throw new Error(result?.info?.message || "API Failed...");
    } else {
      yield put({
        type: ActionTypes.GET_RE_UNIT_SECURITY_STATUS_SUCCESS,
        result: "data" in result ? convertIntoSelectArray(result.data, "securitystatus", "securitystatus") : result,
      });
    }
  } catch (e: any) {
    yield put({
      type: ActionTypes.GET_RE_UNIT_SECURITY_STATUS_FAILED,
      message: e.message,
    });
  }
}

function* getREUnitApprovalStatus(action: SalesDashboardAction) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const result: SalesREUnitStatusApiResponse = yield call(Api.getREUnitStatus, accessToken, action.payload);
    const { isError } = handelReponseCode(undefined, result?.info);
    if (isError) {
      throw new Error(result?.info?.message || "API Failed...");
    } else {
      yield put({
        type: ActionTypes.GET_RE_UNIT_APPROVAL_STATUS_SUCCESS,
        result: "data" in result ? convertIntoSelectArray(result.data, "approvalStatus", "approvalStatus") : result,
      });
    }
  } catch (e: any) {
    yield put({
      type: ActionTypes.GET_RE_UNIT_APPROVAL_STATUS_FAILED,
      message: e.message,
    });
  }
}

function* getRETowerV2(action: SalesDashboardAction) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const result: SalesRETowerV2ApiResponse = yield call(Api.getRETowerV2, accessToken, action.payload);
    const { isError } = handelReponseCode(undefined, result?.info);
    if (isError) {
      throw new Error(result?.info?.message || "API Failed...");
    } else {
      yield put({
        type: ActionTypes.GET_RE_TOWER_V2_SUCCESS,
        result: "data" in result ? convertIntoSelectArray(result.data, "unitLocationSubTypeName", "unitLocationSubTypeName") : result,
      });
    }
  } catch (e: any) {
    yield put({
      type: ActionTypes.GET_RE_TOWER_V2_FAILED,
      message: e.message,
    });
  }
}

function* getREWingV2(action: SalesDashboardAction) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const result: SalesREWingV2ApiResponse = yield call(Api.getREWingV2, accessToken, action.payload);
    const { isError } = handelReponseCode(undefined, result?.info);
    if (isError) {
      throw new Error(result?.info?.message || "API Failed...");
    } else {
      yield put({
        type: ActionTypes.GET_RE_WING_V2_SUCCESS,
        result: "data" in result ? convertIntoSelectArray(result.data, "unitLocationWing", "unitLocationWing") : result,
      });
    }
  } catch (e: any) {
    yield put({
      type: ActionTypes.GET_RE_WING_V2_FAILED,
      message: e.message,
    });
  }
}

function* getREUnitOwnedBy(action: SalesDashboardAction) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const result: SalesREUnitOwnedByApiResponse = yield call(Api.getREUnitOwnedBy, accessToken, action.payload);
    const { isError } = handelReponseCode(undefined, result?.info);
    if (isError) {
      throw new Error(result?.info?.message || "API Failed...");
    } else {
      yield put({
        type: ActionTypes.GET_RE_UNIT_OWNED_BY_SUCCESS,
        result: "data" in result ? convertIntoSelectArray(result.data, "unitOwnedBy", "unitOwnedBy") : result,
      });
    }
  } catch (e: any) {
    yield put({
      type: ActionTypes.GET_RE_UNIT_OWNED_BY_FAILED,
      message: e.message,
    });
  }
}
export default function* salesDashboardSaga() {
  yield takeLeading(ActionTypes.GET_SALES_PROJECT_NAME_REQUESTED, getProjectNames);
  yield takeLeading(ActionTypes.GET_UNIT_TYPE_REQUESTED, getUnitTypes);
  yield takeLeading(ActionTypes.GET_PHASE_REQUESTED, getPhase);
  yield takeLeading(ActionTypes.GET_TOWER_REQUESTED, getTower);
  yield takeLeading(ActionTypes.GET_FISCAL_YEAR_REQUESTED, getFiscalYear);
  yield takeLeading(ActionTypes.GET_SALES_DASHBOARD_DETAILS_REQUESTED, getSalesDashboardDetails);
  yield takeLeading(ActionTypes.GET_SALES_DASHBOARD_DETAILS_V2_REQUESTED, getSalesDashboardDetailsv2);
  yield takeLeading(ActionTypes.GET_SALES_MIS_HISTORY_REQUESTED, getSalesMisHistory);
  yield takeLeading(ActionTypes.GET_RE_PROJECT_TYPE_REQUESTED, getREProjectType);
  yield takeLeading(ActionTypes.GET_RE_PROJECT_SUB_TYPE_REQUESTED, getREProjectSubType);
  yield takeLeading(ActionTypes.GET_RE_UNIT_LAUNCH_STATUS_REQUESTED, getREUnitLaunchStatus);
  yield takeLeading(ActionTypes.GET_RE_UNIT_SECURITY_STATUS_REQUESTED, getREUnitSecurityStatus);
  yield takeLeading(ActionTypes.GET_RE_UNIT_APPROVAL_STATUS_REQUESTED, getREUnitApprovalStatus);
  yield takeLeading(ActionTypes.GET_RE_TOWER_V2_REQUESTED, getRETowerV2);
  yield takeLeading(ActionTypes.GET_RE_WING_V2_REQUESTED, getREWingV2);
  yield takeLeading(ActionTypes.GET_RE_UNIT_OWNED_BY_REQUESTED, getREUnitOwnedBy);
}
