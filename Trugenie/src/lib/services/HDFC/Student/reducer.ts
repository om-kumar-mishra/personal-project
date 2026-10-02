import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
import { storageKeys } from "../../../../utils/constants";
import { StudentListActions } from "./actions";
import { StudentListDataType } from "./dataTypes";
import * as types from "./types";

type StudentState = {
  StudentList: StudentListDataType[] | null;
  loaders: {
  StudentList: boolean;
    addStudentGroup: boolean;
    editStudent: boolean;
    deleteStudent:boolean;
  };
};

const initialState: StudentState = {
  StudentList: null,
  loaders: {
    StudentList: false,
    addStudentGroup: false,
    editStudent: false,
    deleteStudent:false,
  },
};

const studentReducer = (state: StudentState = initialState, action: StudentListActions): StudentState => {
  switch (action.type) {
    case types.GET_STUDENT_LIST_REQUESTED:
      return {
        ...state,
        StudentList: null,
        loaders: {
          ...state.loaders,
          StudentList: true,
        },
      };
    case types.GET_STUDENT_LIST_SUCCEEDED:
      return {
        ...state,
        StudentList: action.studentList.data,
        loaders: {
          ...state.loaders,
          StudentList: false,
        },
      };
    case types.GET_STUDENT_LIST_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          StudentList: false,
        },
      };

    case types.ADD_STUDENT_REQUESTED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          addStudentGroup: true,
        },
      };

    case types.ADD_STUDENT_SUCCEEDED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          addStudentGroup: false,
        },
      };

    case types.ADD_STUDENT_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          addStudentGroup: false,
        },
      };

    case types.EDIT_STUDENT_REQUESTED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          editStudent: true,
        },
      };

    case types.EDIT_STUDENT_SUCCEEDED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          editStudent: false,
        },
      };

    case types.EDIT_STUDENT_FAILED:
      return {
        ...state,
        loaders: {
          ...state.loaders,
          editStudent: false,
        },
      };

      case types.DELETE_STUDENT_REQUESTED:
        return {
          ...state,
          loaders: {
            ...state.loaders,
            deleteStudent: true,
          },
        };
      case types.DELETE_STUDENT_SUCCEEDED:
          return {
            ...state,
            loaders: {
              ...state.loaders,
              deleteStudent: false,
            },
          };
        case types.DELETE_STUDENT_FAILED:
            return {
              ...state,
              loaders: {
                ...state.loaders,
                deleteStudent: false,
              },
            };
  

    default:
      return state;
  }
};
const config = {
  storage,
  key: storageKeys.student,
  blacklist: ["loaders"], // topic will not be persisted
};

export default persistReducer(config, studentReducer);
