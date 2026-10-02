import { LocationListDataType } from './dataTypes';
import * as types from './types';

//----------------------------------Get Location List----------------------------------

export type GetDeveloperLocationTypeRequested = {
    type: typeof types.GET_DEVELOPER_LOCATION_LIST_REQUESTED;
    client: number;
    createdBy: string;
};

export const GetDeveloperLocationListRequested = (client: number, createdBy: string): GetDeveloperLocationTypeRequested => ({
    type: types.GET_DEVELOPER_LOCATION_LIST_REQUESTED,
    client,
    createdBy,
});

export type GetDeveloperLocationTypeSucceeded = {
    type: typeof types.GET_DEVELOPER_LOCATION_LIST_SUCCEEDED;
    devloperLocationList: LocationListDataType[];
};

export const GetDeveloperLocationListSucceeded = (devloperLocationList: LocationListDataType[]): GetDeveloperLocationTypeSucceeded => ({
    type: types.GET_DEVELOPER_LOCATION_LIST_SUCCEEDED,
    devloperLocationList,
});

export type GetDeveloperLocationTypeFailed = {
    type: typeof types.GET_DEVELOPER_LOCATION_LIST_FAILED;
    error: string;
};

export const GetDeveloperLocationListFailed = (error: string): GetDeveloperLocationTypeFailed => ({
    type: types.GET_DEVELOPER_LOCATION_LIST_FAILED,
    error,
});

//----------------------------------Delete Location----------------------------------

export type DeleteDeveloperLocationTypeRequested = {
    type: typeof types.DELETE_DEVELOPER_LOCATION_REQUESTED;
    LocationId: number,
    createdBy: string;
    clientId:number
    onSuccessCallback?: (success: boolean) => void;
};

export const deleteDeveloperLocationRequested = (LocationId: number, createdBy: string, clientId:number, onSuccessCallback?: (success: boolean) => void): DeleteDeveloperLocationTypeRequested => ({
    type: types.DELETE_DEVELOPER_LOCATION_REQUESTED,
    LocationId,
    createdBy,
    clientId,
    onSuccessCallback,
});

export type DeleteDeveloperLocationTypeSucceeded = {
    type: typeof types.DELETE_DEVELOPER_LOCATION_SUCCEEDED;
};

export const deleteDeveloperLocationSucceeded = (): DeleteDeveloperLocationTypeSucceeded => ({
    type: types.DELETE_DEVELOPER_LOCATION_SUCCEEDED,
});

export type DeleteDeveloperLocationTypeFailed = {
    type: typeof types.DELETE_DEVELOPER_LOCATION_FAILED;
    error: string;
};

export const deleteDeveloperLocationFailed = (error: string): DeleteDeveloperLocationTypeFailed => ({
    type: types.DELETE_DEVELOPER_LOCATION_FAILED,
    error,
});

//----------------------------------Add Developer Location----------------------------------

export type AddDeveloperLocationTypeRequested = {
    type: typeof types.ADD_DEVELOPER_LOCATION_REQUESTED;
    clientId: number,
    CreatedBy: string,
    locationsName: string,
    onSuccessCallback?: (success: boolean) => void;
};

export const AddDeveloperLocationRequested = (clientId: number, CreatedBy: string, locationsName: string,  onSuccessCallback?: (success: boolean) => void): AddDeveloperLocationTypeRequested => ({
    type: types.ADD_DEVELOPER_LOCATION_REQUESTED,
    clientId,
    CreatedBy,
    locationsName,
    onSuccessCallback,
});

export type AddDeveloperLocationTypeSucceeded = {
    type: typeof types.ADD_DEVELOPER_LOCATION_SUCCEEDED;
};

export const AddDeveloperLocationSucceeded = (): AddDeveloperLocationTypeSucceeded => ({
    type: types.ADD_DEVELOPER_LOCATION_SUCCEEDED,
});

export type AddDeveloperLocationTypeFailed = {
    type: typeof types.ADD_DEVELOPER_LOCATION_FAILED;
    error: string;
};

export const AddDeveloperLocationFailed = (error: string): AddDeveloperLocationTypeFailed => ({
    type: types.ADD_DEVELOPER_LOCATION_FAILED,
    error,
});

//----------------------------------LocationListActions----------------------------------


export type DevloperLocationListActions =
    GetDeveloperLocationTypeRequested | GetDeveloperLocationTypeSucceeded | GetDeveloperLocationTypeFailed

    | DeleteDeveloperLocationTypeRequested | DeleteDeveloperLocationTypeSucceeded | DeleteDeveloperLocationTypeFailed

    | AddDeveloperLocationTypeRequested | AddDeveloperLocationTypeSucceeded | AddDeveloperLocationTypeFailed;
