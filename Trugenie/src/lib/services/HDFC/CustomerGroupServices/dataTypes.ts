export type APIResponseStatus = {
  message: string;
  code: number;
};

export type CustomerGroupListDataType = {
  id:number,
  name:string,
  desciption:string
};

export type CustomerGroupList = {
  info: APIResponseStatus;
  data: CustomerGroupListDataType[];
};
