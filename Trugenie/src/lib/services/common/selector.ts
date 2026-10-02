import { AppState } from "../../common/appState";

export const getNumberSystem = (state: AppState) => state.commonReducer.numberSystem;

export const getUnitNumberSystem = (state: AppState) => state.commonReducer.unitNumberSystem;

export const getSideMenuType = (state: AppState) => state.commonReducer.sideMenu;
