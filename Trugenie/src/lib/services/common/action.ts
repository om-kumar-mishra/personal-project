import { sideMenuType } from "./dataTypes";
import { CommonType as Type } from "./types";

export const setFullScreen = (isFullScreen: boolean) => ({
  type: Type.SET_FULLSCREEN,
  isFullScreen,
});

export const setDisplayNumberSystem = (numberSystem: string, unitNumberSystem: string) => ({
  type: Type.SET_DISPLAY_NUMBER_SYSTEM,
  numberSystem,
  unitNumberSystem,
});

export const setDisplayUnitNumberSystem = (unitNumberSystem: string) => ({
  type: Type.SET_DISPLAY_NUMBER_SYSTEM,
  unitNumberSystem,
});

export const setSideMenuType = (sideMenu: sideMenuType) => ({
  type: Type.SET_SIDE_MENU_TYPE,
  sideMenu,
});

export const resetSideMenuType = () => ({
  type: Type.SET_SIDE_MENU_TYPE,
});
