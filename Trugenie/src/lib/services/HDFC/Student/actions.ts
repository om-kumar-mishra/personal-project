import { StudentList } from "./dataTypes";
import * as types from "./types";

//----------------------------------Get Group List----------------------------------

export type GetStudentRequested = {
  type: typeof types.GET_STUDENT_LIST_REQUESTED;
  // client: number;
};

export const getStudentListRequested = (): GetStudentRequested => ({
  type: types.GET_STUDENT_LIST_REQUESTED,
  // client,
});

export type StudentTypeSucceeded = {
  type: typeof types.GET_STUDENT_LIST_SUCCEEDED;
  studentList: StudentList;
};

export const getStudentListSucceeded = (studentList: StudentList): StudentTypeSucceeded => ({
  type: types.GET_STUDENT_LIST_SUCCEEDED,
  studentList,
});

export type StudentFailed = {
  type: typeof types.GET_STUDENT_LIST_FAILED;
  error: string;
};

export const getCustomerGroupListFailed = (error: string): StudentFailed => ({
  type: types.GET_STUDENT_LIST_FAILED,
  error,
});

//----------------------------------Add Group----------------------------------

export type AddStudentRequested = {
  type: typeof types.ADD_STUDENT_REQUESTED;
  id:number,
  name:string,
  description:string,
  onSuccessCallback?: (success: boolean, message?: string) => void;
};

export const addStudentRequested = (
  id:number,
  name:string,
  description:string,

  onSuccessCallback?: (success: boolean, message?: string) => void,
): AddStudentRequested => ({
  type: types.ADD_STUDENT_REQUESTED,
  id,
  name,
  description,
  onSuccessCallback,
});

export type AddStudentSucceeded = {
  type: typeof types.ADD_STUDENT_SUCCEEDED;
};

export const addStudentSucceeded = (): AddStudentSucceeded => ({
  type: types.ADD_STUDENT_SUCCEEDED,
});

export type AddStudentFailed = {
  type: typeof types.ADD_STUDENT_FAILED;
};

export const addStudentFailed = (): AddStudentFailed => ({
  type: types.ADD_STUDENT_FAILED,
});

//----------------------------------Edit Group----------------------------------

export type EditStudentRequested = {
  type: typeof types.EDIT_STUDENT_REQUESTED;
  id:number,
  name:string,
  description:string,
  onSuccessCallback?: (success: boolean, message?: string) => void;
};

export const editStudentRequested = (
  id:number,
  name:string,
  description:string,
  onSuccessCallback?: (success: boolean, message?: string) => void,
): EditStudentRequested => ({
  type: types.EDIT_STUDENT_REQUESTED,
  id,
  name,
  description,
  onSuccessCallback,
});

export type EditStudentSucceeded = {
  type: typeof types.EDIT_STUDENT_SUCCEEDED;
};

export const editStudentSucceeded = (): EditStudentSucceeded => ({
  type: types.EDIT_STUDENT_SUCCEEDED,
});

export type EditStudentFailed = {
  type: typeof types.EDIT_STUDENT_FAILED;
};

export const editCustomerGroupFailed = (): EditStudentFailed => ({
  type: types.EDIT_STUDENT_FAILED,
});

//----------------------------------Delete Student----------------------------------
export type DeleteStudentRequest = {
  type:typeof  types.DELETE_STUDENT_REQUESTED;
  id:number;
  onSuccessCallback?: (success: boolean, message?: string) => void,

};

export const deleteStudentRequest=(
  id:number,
  onSuccessCallback?: (success: boolean, message?: string) => void,
): DeleteStudentRequest => ({
  type:  types.DELETE_STUDENT_REQUESTED,
  id:id,
  onSuccessCallback,
});

export type DeleteStudentSucceeded={
  type: typeof types.DELETE_STUDENT_SUCCEEDED;
}

export const deleteStudentSucceeded=():DeleteStudentSucceeded=>({
  type:  types.DELETE_STUDENT_SUCCEEDED
})

export type DeleteStudentFailed={
  type: typeof types.DELETE_STUDENT_FAILED;
}

export const deleteStudentFailed=():DeleteStudentFailed=>({
  type:  types.DELETE_STUDENT_FAILED
})
export type StudentListActions =
  | GetStudentRequested
  | StudentTypeSucceeded
  | StudentFailed
  | AddStudentRequested
  | AddStudentSucceeded
  | AddStudentFailed
  | EditStudentRequested
  | EditStudentSucceeded
  | EditStudentFailed
  | DeleteStudentRequest
  |DeleteStudentSucceeded
  |DeleteStudentFailed;

