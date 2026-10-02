export type APIResponseStatus = {
    message: string;
    code: number;
}

export type LocationListDataType = {
    ZoneName: string | null,
    Createdby: string,
    ZoneID: number | null,
    CreatedAt: string,
    LocationId: number,
    ClientId: number | null,
    RegionsId: number | null,
    RegionsName: string | null,
    LocationName: string,
}

export type AddLocationPayloadType = {
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