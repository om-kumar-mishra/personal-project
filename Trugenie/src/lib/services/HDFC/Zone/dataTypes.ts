export type APIResponseStatus = {
    message: string;
    code: number;
}

export type ZonesListDataType = {
    ZoneName: string,
    CreatedBy: string,
    ZoneID: number,
    CreatedAt: string
}

export type AddZonePayloadType = {
    zonename: string,
    createdBy: string
}

export type ZonesList = {
    info: APIResponseStatus,
    data: ZonesListDataType[]
}