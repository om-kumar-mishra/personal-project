import { sideMenuType } from "./dataTypes";
import { CommonType } from "./types";

interface initialStateType {
  isFullScreen: boolean;
  numberSystem: string;
  unitNumberSystem: string;
  sideMenu?: sideMenuType;
}

export const initialState: initialStateType = {
  isFullScreen: false,
  numberSystem: "INR cr",
  unitNumberSystem: "INR Lacs",
  sideMenu: undefined,
};

interface Action {
  type: CommonType;
  isFullScreen: boolean;
  numberSystem: string;
  unitNumberSystem: string;
  sideMenu?: sideMenuType;
}

const CommonReducer = (state: initialStateType = initialState, action: Action) => {
  switch (action.type) {
    case CommonType.SET_FULLSCREEN:
      return {
        ...state,
        isFullScreen: action.isFullScreen,
      };
    case CommonType.SET_DISPLAY_NUMBER_SYSTEM:
      return {
        ...state,
        numberSystem: action.numberSystem,
        unitNumberSystem: action.unitNumberSystem,
      };
    case CommonType.SET_DISPLAY_UNIT_NUMBER_SYSTEM:
      return {
        ...state,
        unitNumberSystem: action.unitNumberSystem,
      };
    case CommonType.SET_SIDE_MENU_TYPE:
      return {
        ...state,
        sideMenu: action.sideMenu,
      };
    case CommonType.RESET_SIDE_MENU_TYPE:
      return {
        ...state,
        sideMenu: undefined,
      };
    default:
      return state;
  }
};

export default CommonReducer;
