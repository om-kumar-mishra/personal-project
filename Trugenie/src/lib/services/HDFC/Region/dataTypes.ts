export type APIResponseStatus = {
    message: string;
    code: number;
}
export type RegionListDataType = {
    ZoneName: string | null,
    Createdby: string,
    ZoneID: number | null,
    CreatedAt: string,
    LocationId: number,
    ClientId: number | null,
    RegionsId: number,
    RegionsName: string,
}

// export type AddRegionPayloadType = {
//     zoneid: number,
//     CreatedBy: string,
//     regionName: string,
// }

export type DeleteRegionPayloadType = {
    regionId: number,
    createdBy: string,
}

export type RegionList = {
    info: APIResponseStatus,
    data: RegionListDataType[]
}