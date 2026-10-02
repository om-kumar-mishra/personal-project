import { call, put, select, takeLatest, takeLeading } from "redux-saga/effects";
import { handelReponseCode } from "../../../../modules/Components/UtilityFunctions";
import { selectAccessToken } from "../../hdfc_login/selectors";
import { resetFilteredInvesteeList } from "../CustomerInvesteeCompany/actions";
import { GenericResponseTypes } from "../common/dataTypes";
import {
  AddStudentRequested,
   AddStudentSucceeded,
  EditStudentRequested,
  EditStudentSucceeded,
   DeleteStudentRequest,
  DeleteStudentSucceeded,
  DeleteStudentFailed,
  deleteStudentSucceeded,

  GetStudentRequested,
  StudentTypeSucceeded,
  addStudentSucceeded,
  editStudentSucceeded,
  getStudentListSucceeded,
} from "./actions";
import {deleteStudentAPI, addStudentAPI, editStudentAPI, getStudentListAPI } from "./api";
import { StudentList } from "./dataTypes";
import * as ActionTypes from "./types";

function* handleGetStudent(action: GetStudentRequested) {
  // const accessToken = yield select(selectAccessToken);
  // if (accessToken === undefined) {
  //   throw new TypeError("Access Token Required for API Call.");
  // }
  try {
    const result: StudentList = yield call(getStudentListAPI);
    //  const next: GetCustomerGroupTypeSucceeded = yield call(resetFilteredInvesteeList);
    // yield put(next);
    
    const { isError } = handelReponseCode(undefined, result?.info, "Failed to fetch Student list...");
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: StudentTypeSucceeded = yield call(getStudentListSucceeded, result);
      yield put(next);
    }
  } catch (error: any) {
    yield put({
      type: ActionTypes.GET_STUDENT_LIST_FAILED,
    });
  }
}

function* handleAddStudent(action: AddStudentRequested) {
  // const accessToken = yield select(selectAccessToken);
  // if (accessToken === undefined) {
  //   throw new TypeError("Access Token Required for API Call.");
  // }
  try {
    const result: GenericResponseTypes = yield call(addStudentAPI,"", action.id, action.name, action.description);
    const { isError } = handelReponseCode(action.onSuccessCallback, result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: AddStudentSucceeded = yield call(addStudentSucceeded);
      yield put(next);
    }
  } catch (e: any) {
    yield put({
      type: ActionTypes.ADD_STUDENT_FAILED,
    });
  }
}

function* handleEditStudent(action: EditStudentRequested) {
  //  const accessToken = yield select(selectAccessToken);
   const accessToken = "";

  // if (accessToken === undefined) {
  //   throw new TypeError("Access Token Required for API Call.");
  // }
  try {
    const result: GenericResponseTypes = yield call(
      editStudentAPI,
      accessToken,
      action.id,
      action.name,
      action.description,
    );
    const { isError } = handelReponseCode(action?.onSuccessCallback, result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: EditStudentSucceeded = yield call(editStudentSucceeded);
      yield put(next);
    }
  } catch (e: any) {
    yield put({
      type: ActionTypes.EDIT_STUDENT_FAILED,
      message: e.message,
    });
  }
}

function* handleDeleteStudent(action: EditStudentRequested) {
  //  const accessToken = yield select(selectAccessToken);
   const accessToken = "";

  // if (accessToken === undefined) {
  //   throw new TypeError("Access Token Required for API Call.");
  // }
  try {
    const result: GenericResponseTypes = yield call(
      deleteStudentAPI,
      accessToken,
      action.id,
    );
    const { isError } = handelReponseCode(action?.onSuccessCallback, result?.info);
    if (isError) {
      throw new Error("API Call Failed.");
    } else {
      const next: DeleteStudentSucceeded = yield call(deleteStudentSucceeded);
      yield put(next);
    }
  } catch (e: any) {
    yield put({
      type: ActionTypes.DELETE_STUDENT_FAILED,
      message: e.message,
    });
  }
}

function* StudentSaga() {
  yield takeLeading(ActionTypes.GET_STUDENT_LIST_REQUESTED, handleGetStudent);
  yield takeLeading(ActionTypes.ADD_STUDENT_REQUESTED, handleAddStudent);
  yield takeLeading(ActionTypes.EDIT_STUDENT_REQUESTED, handleEditStudent);
  yield takeLeading(ActionTypes.DELETE_STUDENT_REQUESTED, handleDeleteStudent);

}

export default StudentSaga;
