import { AppState } from "../../../common/appState";

export const selectStudentList = (state: AppState) => state.hdfc.student.StudentList;
export const selectStudentLoaders = (state: AppState) => state.hdfc.student.loaders;

