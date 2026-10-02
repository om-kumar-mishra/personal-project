export type APIResponseStatus = {
    message: string;
    code: number;
}

export type LocationListDataType = {
    Createdby: string,
    CreatedAt: string,
    DeveloperLocationId: number,
    ClientId: number | null,
    DeveloperLocationName: string,
}

export type AddDeveloperLocationPayloadType = {
    zoneid: number,
    CreatedBy: string,
    locationsName: string,
    regionId: string,
}

export type DeleteLocationPayloadType = {
    LocationId: number,
    createdBy: string,
}

export type LocationList = {
    info: APIResponseStatus,
    data: LocationListDataType[]
}