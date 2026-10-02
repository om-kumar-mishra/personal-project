import { LocationListDataType } from './dataTypes';
import * as types from './types';

//----------------------------------Get Location List----------------------------------

export type GetLocationTypeRequested = {
    type: typeof types.GET_LOCATION_LIST_REQUESTED;
    client: number;
    createdBy: string;
};

export const getLocationListRequested = (client: number, createdBy: string): GetLocationTypeRequested => ({
    type: types.GET_LOCATION_LIST_REQUESTED,
    client,
    createdBy,
});

export type GetLocationTypeSucceeded = {
    type: typeof types.GET_LOCATION_LIST_SUCCEEDED;
    locationList: LocationListDataType[];
};

export const getLocationListSucceeded = (locationList: LocationListDataType[]): GetLocationTypeSucceeded => ({
    type: types.GET_LOCATION_LIST_SUCCEEDED,
    locationList,
});

export type GetLocationTypeFailed = {
    type: typeof types.GET_LOCATION_LIST_FAILED;
    error: string;
};

export const getLocationListFailed = (error: string): GetLocationTypeFailed => ({
    type: types.GET_LOCATION_LIST_FAILED,
    error,
});

//----------------------------------Delete Location----------------------------------

export type DeleteLocationTypeRequested = {
    type: typeof types.DELETE_LOCATION_REQUESTED;
    LocationId: number,
    createdBy: string;
    onSuccessCallback?: (success: boolean) => void;
};

export const deleteLocationRequested = (LocationId: number, createdBy: string, onSuccessCallback?: (success: boolean) => void): DeleteLocationTypeRequested => ({
    type: types.DELETE_LOCATION_REQUESTED,
    LocationId,
    createdBy,
    onSuccessCallback,
});

export type DeleteLocationTypeSucceeded = {
    type: typeof types.DELETE_LOCATION_SUCCEEDED;
};

export const deleteLocationSucceeded = (): DeleteLocationTypeSucceeded => ({
    type: types.DELETE_LOCATION_SUCCEEDED,
});

export type DeleteLocationTypeFailed = {
    type: typeof types.DELETE_LOCATION_FAILED;
    error: string;
};

export const deleteLocationFailed = (error: string): DeleteLocationTypeFailed => ({
    type: types.DELETE_LOCATION_FAILED,
    error,
});

//----------------------------------Add Location----------------------------------

export type AddLocationTypeRequested = {
    type: typeof types.ADD_LOCATION_REQUESTED;
    clientId: number,
    zoneid: number,
    CreatedBy: string,
    locationsName: string,
    regionId: number,
    onSuccessCallback?: (success: boolean) => void;
};

export const addLocationRequested = (clientId: number,zoneid: number, CreatedBy: string, locationsName: string, regionId: number, onSuccessCallback?: (success: boolean) => void): AddLocationTypeRequested => ({
    type: types.ADD_LOCATION_REQUESTED,
    clientId,
    zoneid,
    CreatedBy,
    locationsName,
    regionId,
    onSuccessCallback,
});

export type AddLocationTypeSucceeded = {
    type: typeof types.ADD_LOCATION_SUCCEEDED;
};

export const addLocationSucceeded = (): AddLocationTypeSucceeded => ({
    type: types.ADD_LOCATION_SUCCEEDED,
});

export type AddLocationTypeFailed = {
    type: typeof types.ADD_LOCATION_FAILED;
    error: string;
};

export const addLocationFailed = (error: string): AddLocationTypeFailed => ({
    type: types.ADD_LOCATION_FAILED,
    error,
});

//----------------------------------LocationListActions----------------------------------


export type LocationListActions =
    GetLocationTypeRequested | GetLocationTypeSucceeded | GetLocationTypeFailed

    | DeleteLocationTypeRequested | DeleteLocationTypeSucceeded | DeleteLocationTypeFailed

    | AddLocationTypeRequested | AddLocationTypeSucceeded | AddLocationTypeFailed;
