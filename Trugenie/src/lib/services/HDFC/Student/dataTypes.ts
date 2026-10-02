export type APIResponseStatus = {
  message: string;
  code: number;
};

export type StudentListDataType = {
  id: number,
  name:string,
  description:string
};

export type StudentList = {
  info: APIResponseStatus;
  data: StudentListDataType[];
};
