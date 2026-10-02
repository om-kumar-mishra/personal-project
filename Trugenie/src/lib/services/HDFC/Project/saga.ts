import { call, put, select, takeEvery, takeLeading } from "redux-saga/effects";
import { handelReponseCode, handleDownloadResponseCheck, successNotification } from "../../../../modules/Components/UtilityFunctions";
import { selectAccessToken, selectUserDetails } from "../../hdfc_login/selectors";
import { GenericResponseTypes } from "../common/dataTypes";
import {
  AllProjectListRequestedAction,
  AllProjectListSucceededAction,
  CreateProjectRequestAction,
  CustomerTaggedRMUsersRequestType,
  CustomerTaggedRMUsersSucceededAction,
  CustomerTaggedRMUsersSucceededType,
  DownloadNOCProjectSummaryRequested,
  DownloadNOCProjectSummarySuccessful,
  GetAssetInvestmentRequested,
  GetUserProjectAccessDetailsRequestType,
  GetUserProjectAccessDetailsSucceededType,
  GetUserProjectAccessRequestType,
  GetUserProjectAccessSucceededType,
  ProjectAssignUserRequestType,
  ProjectAssignUserSucceededType,
  ProjectListRequestedAction,
  ProjectListSucceededAction,
  ProjectLogsRequestType,
  ProjectLogsSucceededType,
  ProjectUpdateRequestType,
  ProjectUpdateStatusRequestType,
  ProjectUpdateStatusSucceededType,
  ProjectUpdateSucceededType,
  ProjectUsersListRequestAction,
  ProjectUsersListSuccessAction,
  RemoveUserProjectAccessRequestType,
  RemoveUserProjectAccessSucceededAction,
  RemoveUserProjectAccessSucceededType,
  RoleTemplateNameListRequestType,
  RoleTemplateNameListSucceededType,
  SetProjectAction,
  UserByRoleListRequestType,
  UserByRoleListSucceededType,
  allProjectListSucceeded,
  createProjectSuccess,
  downloadNOCProjectSummarySuccessful,
  getAssetInvestmentSuccessful,
  getUserProjectAccessDetailsSucceededAction,
  getUserProjectAccessSucceededAction,
  projectAssignUserSucceededAction,
  projectListSucceeded,
  projectLogsSucceededAction,
  projectUpdateStatusSucceededAction,
  projectUpdateSucceededAction,
  projectUsersListSuccess,
  requestProjectList,
  roleTemplateNameListSucceededAction,
  selectedProject,
  userByRoleListSucceededAction,
} from "./actions";
import {
  createProjectListAPI,
  downloadNocProjectSummaryAPI,
  fetchAllProjectListAPI,
  // fetchAllProjectListAPI,
  fetchProjectListAPI,
  getAssetInvestmentListAPI,
  getCustomerTaggedRMUsers,
  getProjectLogs,
  getProjectUsersListAPI,
  getRoleTemplateName,
  getUserByRole,
  getUserInformationDetails,
  getUserProjectAccess,
  insertUserProjectAccess,
  removeUserProjectAccess,
  updateProjectStatus,
  updateREProject,
} from "./api";
import {
  AllProjectListResponse,
  AssetInvestmentResponse,
  CustomerTaggedRMUsersResponse,
  Project,
  ProjectAssignUserResponse,
  ProjectListResponse,
  ProjectLogsListResponse,
  ProjectUpdateResponse,
  ProjectUserAccessDetailsResponse,
  ProjectUserAccessListResponse,
  ProjectUserListResponse,
  RemoveUserProjectAccessResponse,
  RoleTemplateNameListResponse,
  UserByRoleListResponse,
} from "./dataTypes";
import * as actionTypes from "./types";
import { UserDetails } from "../../hdfc_login/dataTypes";
import { selectSetProject } from "./selectors";

function* handleFetchProjectList(action: ProjectListRequestedAction): Generator<any, any, any> {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }

    const response: ProjectListResponse = yield call(fetchProjectListAPI, accessToken, action.client);
    const { isError } = handelReponseCode(action.callback, response?.info, "Failed to fetch Timeline...");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: ProjectListSucceededAction = yield call(projectListSucceeded, response);
      yield put(next);
    }
  } catch (error: any) {
    yield put({
      type: actionTypes.PROJECT_LIST_FAILED,
    });
  }
}

function* getAllProjectListSaga(action: AllProjectListRequestedAction): Generator<any, any, any> {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: AllProjectListResponse = yield call(fetchAllProjectListAPI, accessToken, action.client, action.useremail);
    const { isError } = handelReponseCode(undefined, response?.info, "Failed to fetch project  list...");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: AllProjectListSucceededAction = yield call(allProjectListSucceeded, response);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put({
      type: actionTypes.ALL_PROJECT_LIST_FAILED,
    });
  }
}

function* getCustomerTaggedRMUsersSaga(action: CustomerTaggedRMUsersRequestType): Generator<any, any, any> {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const result: CustomerTaggedRMUsersResponse = yield call(getCustomerTaggedRMUsers, accessToken, action.payload);
    const { isError } = handelReponseCode(undefined, result?.info, "Failed to fetch Rm Tagged...");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: CustomerTaggedRMUsersSucceededType = yield call(CustomerTaggedRMUsersSucceededAction, result);
      yield put(next);
    }
  } catch (e: any) {
    yield put({
      type: actionTypes.CUSTOMER_TAGGED_RM_USER_FAILED,
    });
  }
}

function* updateREProjectSaga(action: ProjectUpdateRequestType): Generator<any, any, any> {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const result: ProjectUpdateResponse = yield call(updateREProject, accessToken, action.payload);
    const { isError } = handelReponseCode(action.onSuccessCallback, result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      yield call(successNotification, result?.info?.message || "Project Updated successfully!");
      const next: ProjectUpdateSucceededType = yield call(projectUpdateSucceededAction, result);
      yield put(next);
    }
  } catch (e: any) {
    yield put({
      type: actionTypes.PROJECT_UPDATE_FAILED,
      message: e.message,
    });
  }
}

function* updateREProjectStatusSaga(action: ProjectUpdateStatusRequestType): Generator<any, any, any> {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    const userDetails: UserDetails = yield select(selectUserDetails);
    const project: Project = yield select(selectSetProject);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const result: ProjectUpdateResponse = yield call(updateProjectStatus, accessToken, action.payload);
    const { isError } = handelReponseCode(undefined, result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const projectListResponse: ProjectListResponse | null = yield call(fetchProjectListAPI, accessToken, userDetails?.ClientId);
      if (projectListResponse === null || projectListResponse?.data === null || projectListResponse?.info?.code != 100) {
        throw new Error(projectListResponse?.info?.message || "Failed to fetch Project List...");
      } else {
        const projectData = projectListResponse?.data?.find(projectRes => projectRes?.REAssetId === project?.REAssetId);
        if (projectData) {
          const setAction: SetProjectAction = yield call(selectedProject, projectData);
          yield put(setAction);
        }
        const next: ProjectUpdateStatusSucceededType = yield call(projectUpdateStatusSucceededAction, result);
        yield put(next);
        yield call(successNotification, "Project Status Updated Successfully!");
      }
    }
  } catch (e: any) {
    yield put({
      type: actionTypes.PROJECT_ENABLE_DISABLE_FAILED,
      message: e.message,
    });
  }
}

function* getProjectLogsSaga(action: ProjectLogsRequestType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: ProjectLogsListResponse = yield call(getProjectLogs, accessToken, action.userEmail, action.assetId);
    const { isError } = handelReponseCode(undefined, response?.info, "Failed to fetch Timeline...");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: ProjectLogsSucceededType = yield call(projectLogsSucceededAction, response);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put({
      type: actionTypes.PROJECT_LOGS_LIST_FAILED,
    });
  }
}

function* getProjectAssignUserSaga(action: ProjectAssignUserRequestType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: ProjectAssignUserResponse = yield call(insertUserProjectAccess, accessToken, action.payload);
    const { isError } = handelReponseCode(action.onSuccessCallback, response?.info, "Failed to fetch assign user...");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: ProjectAssignUserSucceededType = yield call(projectAssignUserSucceededAction, response);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put({
      type: actionTypes.PROJECT_ASSIGN_USER_FAILED,
    });
  }
}

function* getUserProjectAccessSaga(action: GetUserProjectAccessRequestType): Generator<any, any, any> {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: ProjectUserAccessListResponse = yield call(getUserProjectAccess, accessToken, action.userEmail, action.assetId, action.userRole);
    const { isError } = handelReponseCode(undefined, response?.info, "Failed to fetch project access user...");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: GetUserProjectAccessSucceededType = yield call(getUserProjectAccessSucceededAction, response);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put({
      type: actionTypes.PROJECT_ACCESS_USER_LIST_FAILED,
    });
  }
}

function* getUserProjectAccessDetailsSaga(action: GetUserProjectAccessDetailsRequestType): Generator<any, any, any> {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: ProjectUserAccessDetailsResponse = yield call(
      getUserInformationDetails,
      accessToken,
      action.userEmail,
      action.empCode,
      action.userRole,
      action.reassetId,
    );
    const { isError } = handelReponseCode(undefined, response?.info, "Failed to fetch access user...");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: GetUserProjectAccessDetailsSucceededType = yield call(getUserProjectAccessDetailsSucceededAction, response);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put({
      type: actionTypes.PROJECT_ACCESS_USER_DETAILS_FAILED,
    });
  }
}

function* removeUserProjectAccessSaga(action: RemoveUserProjectAccessRequestType): Generator<any, any, any> {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }

    const response: RemoveUserProjectAccessResponse = yield call(removeUserProjectAccess, accessToken, action.payload);
    const { isError } = handelReponseCode(undefined, response?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      yield call(successNotification, "Remove User Successfully!");
      const next: RemoveUserProjectAccessSucceededType = yield call(RemoveUserProjectAccessSucceededAction, response);
      yield put(next);
    }
  } catch (error: any) {
    yield put({
      type: actionTypes.REMOVE_PROJECT_USER_ACCESS_FAILED,
    });
  }
}

function* getRoleTemplateNameSaga(action: RoleTemplateNameListRequestType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: RoleTemplateNameListResponse = yield call(getRoleTemplateName, accessToken);
    const { isError } = handelReponseCode(undefined, response?.info, "Failed to fetch Role Template...");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: RoleTemplateNameListSucceededType = yield call(roleTemplateNameListSucceededAction, response);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put({
      type: actionTypes.ROLE_TEMPLATE_NAME_LIST_FAILED,
    });
  }
}

function* getUserByRoleSaga(action: UserByRoleListRequestType) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: UserByRoleListResponse = yield call(getUserByRole, accessToken, action.roleType, action.createdBy, action.developerId);
    const { isError } = handelReponseCode(undefined, response?.info, "Failed to fetch Roles...");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: UserByRoleListSucceededType = yield call(userByRoleListSucceededAction, response);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put({
      type: actionTypes.USER_BY_ROLE_LIST_FAILED,
    });
  }
}

function* handlecreateProject(action: CreateProjectRequestAction): Generator<any, any, any> {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: GenericResponseTypes = yield call(createProjectListAPI, accessToken, action.payload);
    const { isError } = handelReponseCode(action.onSuccessCallback, response.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      yield put(createProjectSuccess(response));
    }
  } catch (error: any) {
    yield put({
      type: actionTypes.CREATE_PROJECT_FAILURE,
    });
  }
}

function* handleDownloadNocProjectSummary(action: DownloadNOCProjectSummaryRequested) {
  const accessToken = yield select(selectAccessToken);
  if (accessToken === undefined) {
    throw new TypeError("Access Token Required for API Call.");
  }

  try {
    const result = yield call(downloadNocProjectSummaryAPI, accessToken, action.projectId, action.REAssetId, action.projectName);
    const { isError } = handleDownloadResponseCheck(action.onSuccessCallback, result, "Download Failed...");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: DownloadNOCProjectSummarySuccessful = yield call(downloadNOCProjectSummarySuccessful, result.data);
      yield put(next);
    }
  } catch (e: any) {
    yield put({
      type: actionTypes.DOWNLOAD_NOC_PROJECT_SUMMARY_FAILED,
      message: "",
    });
  }
}

function* handleGetProjectUsersList(action: ProjectUsersListRequestAction) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }

    const response: ProjectUserListResponse = yield call(getProjectUsersListAPI, accessToken, action.developerId, action.createdBy);
    const { isError } = handelReponseCode(undefined, response.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: ProjectUsersListSuccessAction = yield call(projectUsersListSuccess, response.data.body);
      yield put(next);
    }
  } catch (error: any) {
    yield put({
      type: actionTypes.GET_USERS_FOR_PROJECT_FAILED,
    });
  }
}


function* getAssetInvestmentSaga(action: GetAssetInvestmentRequested) {
  try {
    const accessToken: string | undefined = yield select(selectAccessToken);
    if (accessToken === undefined) {
      throw new TypeError("Access Token required for API call.");
    }
    const response: AssetInvestmentResponse = yield call(getAssetInvestmentListAPI, accessToken, action.ClientId, action.useremail);
    const { isError } = handelReponseCode(action.onSuccessCallback, response?.info, "Failed to fetch assign user...");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: GetAssetInvestmentRequested = yield call(getAssetInvestmentSuccessful, assets);
      yield put(next);
    }
  } catch (error: unknown) {
    yield put({
      type: actionTypes.GET_ASSET_INVESTMENT_LIST_FAILED,
    });
  }
}
const assets = [
  {
    "clientId": 1,
    "clientName": "Demo Client",
    "createdby": "ajinath.pawar@truboardpartners.com",
    "createdAt": "2024-05-15T11:20:00.987",
    "status": "Draft",
    "type": "InvestmentHome",
    "id": 34,
    "name": "test  investment 1505",
    "reassetId": null,
    "assetName": null,
    "developerName": null,
    "developerCin": null,
    "borrowerDetailId": null,
    "remarks": null,
    "onHold": null,
    "holdDate": null,
    "holdBy": null,
    "developerId": null,
    "borrowerName": null,
    "regionsId": null,
    "locationId": null,
    "nocProjectId": null,
    "opid": null,
    "constructionProjectId": null,
    "investmentId": 34,
    "fundId": 28,
    "investmentName": "test  investment",
    "investmentType": "Debt",
    "firstInvestmentDate": null,
    "amountCommitt": null
  }, {
    "clientId": 1,
    "clientName": "Demo Client",
    "createdby": "ajinath.pawar@truboardpartners.com",
    "createdAt": "2024-05-15T11:20:00.987",
    "status": "Draft",
    "type": "InvestmentHome",
    "id": 35,
    "name": "test Asset",
    "reassetId": null,
    "assetName": null,
    "developerName": null,
    "developerCin": null,
    "borrowerDetailId": null,
    "remarks": null,
    "onHold": null,
    "holdDate": null,
    "holdBy": null,
    "developerId": null,
    "borrowerName": null,
    "regionsId": null,
    "locationId": null,
    "nocProjectId": null,
    "opid": null,
    "constructionProjectId": null,
    "investmentId": 34,
    "fundId": 28,
    "investmentName": "test  investment 1",
    "investmentType": "Debt",
    "firstInvestmentDate": null,
    "amountCommitt": null
  }, {
    "clientId": 1,
    "clientName": "Demo Client",
    "createdby": "ajinath.pawar@truboardpartners.com",
    "createdAt": "2024-05-15T11:20:00.987",
    "status": "Draft",
    "type": "ReSummaryDashboard",
    "id": 36,
    "name": "testAsset",
    "reassetId": null,
    "assetName": null,
    "developerName": null,
    "developerCin": null,
    "borrowerDetailId": null,
    "remarks": null,
    "onHold": null,
    "holdDate": null,
    "holdBy": null,
    "developerId": null,
    "borrowerName": null,
    "regionsId": null,
    "locationId": null,
    "nocProjectId": null,
    "opid": null,
    "constructionProjectId": null,
    "investmentId": 34,
    "fundId": 28,
    "investmentName": "testAsset",
    "investmentType": "Debt",
    "firstInvestmentDate": null,
    "amountCommitt": null
  }, {
    "clientId": 1,
    "clientName": "Demo Client",
    "createdby": "ajinath.pawar@truboardpartners.com",
    "createdAt": "2024-05-15T11:20:00.987",
    "status": "Draft",
    "type": "InvestmentHome",
    "id": 37,
    "name": "investment 1",
    "reassetId": null,
    "assetName": null,
    "developerName": null,
    "developerCin": null,
    "borrowerDetailId": null,
    "remarks": null,
    "onHold": null,
    "holdDate": null,
    "holdBy": null,
    "developerId": null,
    "borrowerName": null,
    "regionsId": null,
    "locationId": null,
    "nocProjectId": null,
    "opid": null,
    "constructionProjectId": null,
    "investmentId": 34,
    "fundId": 28,
    "investmentName": "test  investment 3",
    "investmentType": "Debt",
    "firstInvestmentDate": null,
    "amountCommitt": null
  }
]
function* projectSaga() {
  yield takeLeading(actionTypes.PROJECT_LIST_REQUESTED, handleFetchProjectList);
  yield takeLeading(actionTypes.ALL_PROJECT_LIST_REQUESTED, getAllProjectListSaga);
  yield takeLeading(actionTypes.CUSTOMER_TAGGED_RM_USER_REQUESTED, getCustomerTaggedRMUsersSaga);
  yield takeLeading(actionTypes.PROJECT_UPDATE_REQUESTED, updateREProjectSaga);
  yield takeLeading(actionTypes.PROJECT_ENABLE_DISABLE_REQUESTED, updateREProjectStatusSaga);
  yield takeLeading(actionTypes.PROJECT_LOGS_LIST_REQUESTED, getProjectLogsSaga);
  yield takeLeading(actionTypes.PROJECT_ASSIGN_USER_REQUESTED, getProjectAssignUserSaga);
  yield takeLeading(actionTypes.PROJECT_ACCESS_USER_LIST_REQUESTED, getUserProjectAccessSaga);
  yield takeLeading(actionTypes.PROJECT_ACCESS_USER_DETAILS_REQUESTED, getUserProjectAccessDetailsSaga);
  yield takeLeading(actionTypes.REMOVE_PROJECT_USER_ACCESS_REQUESTED, removeUserProjectAccessSaga);
  yield takeLeading(actionTypes.ROLE_TEMPLATE_NAME_LIST_REQUESTED, getRoleTemplateNameSaga);
  yield takeLeading(actionTypes.USER_BY_ROLE_LIST_REQUESTED, getUserByRoleSaga);
  yield takeEvery(actionTypes.CREATE_PROJECT_REQUEST, handlecreateProject);
  yield takeLeading(actionTypes.DOWNLOAD_NOC_PROJECT_SUMMARY_REQUESTED, handleDownloadNocProjectSummary);
  yield takeLeading(actionTypes.GET_USERS_FOR_PROJECT_REQUESTED, handleGetProjectUsersList);
  yield takeLeading(actionTypes.GET_ASSET_INVESTMENT_LIST_REQUESTED, getAssetInvestmentSaga);
}

export default projectSaga;
