import { ZonesList } from './dataTypes';
import * as types from './types';

//----------------------------------Get Zones  List----------------------------------

export type GetZonesTypeRequested = {
    type: typeof types.GET_ZONES_LIST_REQUESTED;
    client: number,
    createdby: string;
};

export const getZonesListRequested = (client: number, createdby: string): GetZonesTypeRequested => ({
    type: types.GET_ZONES_LIST_REQUESTED,
    client,
    createdby,
});

export type GetZonesTypeSucceeded = {
    type: typeof types.GET_ZONES_LIST_SUCCEEDED;
    zonesList: ZonesList;
};

export const getZonesListSucceeded = (zonesList: ZonesList): GetZonesTypeSucceeded => ({
    type: types.GET_ZONES_LIST_SUCCEEDED,
    zonesList,
});

export type GetZonesTypeFailed = {
    type: typeof types.GET_ZONES_LIST_FAILED;
    error: string;
};

export const getZonesListFailed = (error: string): GetZonesTypeFailed => ({
    type: types.GET_ZONES_LIST_FAILED,
    error,
});

//----------------------------------Delete Zones----------------------------------

export type DeleteZoneTypeRequested = {
    type: typeof types.DELETE_ZONE_REQUESTED;
    zoneId: number,
    createdBy: string;
    onSuccessCallback?: (success: boolean) => void;
};

export const deleteZoneRequested = (zoneId: number, createdBy: string, onSuccessCallback?: (success: boolean) => void): DeleteZoneTypeRequested => ({
    type: types.DELETE_ZONE_REQUESTED,
    zoneId,
    createdBy,
    onSuccessCallback,
});

export type DeleteZoneTypeSucceeded = {
    type: typeof types.DELETE_ZONE_SUCCEEDED;
};

export const deleteZoneSucceeded = (): DeleteZoneTypeSucceeded => ({
    type: types.DELETE_ZONE_SUCCEEDED,
});

export type DeleteZoneTypeFailed = {
    type: typeof types.DELETE_ZONE_FAILED;
    error: string;
};

export const deleteZoneFailed = (error: string): DeleteZoneTypeFailed => ({
    type: types.DELETE_ZONE_FAILED,
    error,
});

//----------------------------------Add Zones----------------------------------

export type AddZoneTypeRequested = {
    type: typeof types.ADD_ZONE_REQUESTED;
    client: number;
    zonename: string;
    createdBy: string;
    onSuccessCallback?: (success: boolean) => void;
};

export const addZoneRequested = (client: number,zonename: string, createdBy: string, onSuccessCallback?: (success: boolean) => void): AddZoneTypeRequested => ({
    type: types.ADD_ZONE_REQUESTED,
    client,
    zonename,
    createdBy,
    onSuccessCallback,
});

export type AddZoneTypeSucceeded = {
    type: typeof types.ADD_ZONE_SUCCEEDED;
};

export const addZoneSucceeded = (): AddZoneTypeSucceeded => ({
    type: types.ADD_ZONE_SUCCEEDED,
});

export type AddZoneTypeFailed = {
    type: typeof types.ADD_ZONE_FAILED;
    error: string;
};

export const addZoneFailed = (error: string): AddZoneTypeFailed => ({
    type: types.ADD_ZONE_FAILED,
    error,
});

//----------------------------------Update Zones----------------------------------

export type UpdateZoneTypeRequested = {
    type: typeof types.UPDATE_ZONE_REQUESTED;
    zoneId: number;
    zonename: string;
    createdBy: string;
    onSuccessCallback?: (success: boolean) => void;
};

export const updateZoneRequested = (zoneId: number, zonename: string, createdBy: string, onSuccessCallback?: (success: boolean) => void): UpdateZoneTypeRequested => ({
    type: types.UPDATE_ZONE_REQUESTED,
    zoneId,
    zonename,
    createdBy,
    onSuccessCallback,
});

export type UpdateZoneTypeSucceeded = {
    type: typeof types.UPDATE_ZONE_SUCCEEDED;
};

export const updateZoneSucceeded = (): UpdateZoneTypeSucceeded => ({
    type: types.UPDATE_ZONE_SUCCEEDED,
});

export type UpdateZoneTypeFailed = {
    type: typeof types.UPDATE_ZONE_FAILED;
    error: string;
};

export const updateZoneFailed = (error: string): UpdateZoneTypeFailed => ({
    type: types.UPDATE_ZONE_FAILED,
    error,
});

//----------------------------------ZonesListActions----------------------------------


export type ZonesListActions =
    GetZonesTypeRequested | GetZonesTypeSucceeded | GetZonesTypeFailed

    | DeleteZoneTypeRequested | DeleteZoneTypeSucceeded | DeleteZoneTypeFailed

    | AddZoneTypeRequested | AddZoneTypeSucceeded | AddZoneTypeFailed

    | UpdateZoneTypeRequested | UpdateZoneTypeSucceeded | UpdateZoneTypeFailed;