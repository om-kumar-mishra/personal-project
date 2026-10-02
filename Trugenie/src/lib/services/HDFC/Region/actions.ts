import { RegionListDataType } from './dataTypes';
import * as types from './types';

//----------------------------------Get Region List----------------------------------

export type GetRegionTypeRequested = {
    type: typeof types.GET_REGION_LIST_REQUESTED;
    client: number,
    createdBy: string;
};

export const getRegionListRequested = (client: number, createdBy: string): GetRegionTypeRequested => ({
    type: types.GET_REGION_LIST_REQUESTED,
    client,
    createdBy,
});

export type GetRegionTypeSucceeded = {
    type: typeof types.GET_REGION_LIST_SUCCEEDED;
    RegionList: RegionListDataType[];
};

export const getRegionListSucceeded = (RegionList: RegionListDataType[]): GetRegionTypeSucceeded => ({
    type: types.GET_REGION_LIST_SUCCEEDED,
    RegionList,
});

export type GetRegionTypeFailed = {
    type: typeof types.GET_REGION_LIST_FAILED;
    error: string;
};

export const getRegionListFailed = (error: string): GetRegionTypeFailed => ({
    type: types.GET_REGION_LIST_FAILED,
    error,
});

//----------------------------------Delete Region----------------------------------

export type DeleteRegionTypeRequested = {
    type: typeof types.DELETE_REGION_REQUESTED;
    regionId: number,
    createdBy: string;
    onSuccessCallback?: (success: boolean) => void;
};

export const deleteRegionRequested = (regionId: number, createdBy: string, onSuccessCallback?: (success: boolean) => void): DeleteRegionTypeRequested => ({
    type: types.DELETE_REGION_REQUESTED,
    regionId,
    createdBy,
    onSuccessCallback,
});

export type DeleteRegionTypeSucceeded = {
    type: typeof types.DELETE_REGION_SUCCEEDED;
};

export const deleteRegionSucceeded = (): DeleteRegionTypeSucceeded => ({
    type: types.DELETE_REGION_SUCCEEDED,
});

export type DeleteRegionTypeFailed = {
    type: typeof types.DELETE_REGION_FAILED;
    error: string;
};

export const deleteRegionFailed = (error: string): DeleteRegionTypeFailed => ({
    type: types.DELETE_REGION_FAILED,
    error,
});

//----------------------------------Add Region----------------------------------

export type AddRegionTypeRequested = {
    type: typeof types.ADD_REGION_REQUESTED;
    client: number;
    regionName: string;
    createdBy: string;
    zoneID: number;
    onSuccessCallback?: (success: boolean) => void;
};

export const addRegionRequested = (client: number, regionName: string, createdBy: string, zoneID: number, onSuccessCallback?: (success: boolean) => void): AddRegionTypeRequested => ({
    type: types.ADD_REGION_REQUESTED,
    client,
    regionName,
    createdBy,
    zoneID,
    onSuccessCallback,
});

export type AddRegionTypeSucceeded = {
    type: typeof types.ADD_REGION_SUCCEEDED;
};

export const addRegionSucceeded = (): AddRegionTypeSucceeded => ({
    type: types.ADD_REGION_SUCCEEDED,
});

export type AddRegionTypeFailed = {
    type: typeof types.ADD_REGION_FAILED;
    error: string;
};

export const addRegionFailed = (error: string): AddRegionTypeFailed => ({
    type: types.ADD_REGION_FAILED,
    error,
});

//----------------------------------RegionListActions----------------------------------

export type RegionListActions =
    GetRegionTypeRequested | GetRegionTypeSucceeded | GetRegionTypeFailed

    | DeleteRegionTypeRequested | DeleteRegionTypeSucceeded | DeleteRegionTypeFailed

    | AddRegionTypeRequested | AddRegionTypeSucceeded | AddRegionTypeFailed;