export type APIResponseStatus = {
  message: string;
  code: number;
};
export type CustomerInvesteeListDataType = {
  Address: string | null;
  CIN: string | null;
  GST: string;
  LeadRM: string | null;
  DeveloperID: number;
  PAN: string;
  BorrowerDetailId: number;
  CreatedBy: string;
  CreatedAt: string;
  lastediton: string | null;
  lastEditBy: string | null;
  customergroup: string;
  customerinvesteecompany: string;
};

export type FilteredInvesteeGroup = {
  Address: string;
  BorrowerDetailId: number;
  BorrowerName: string;
  GST: string;
  PAN: string;
};

export type CustomerInvesteeAddDataType = {
  borrowername: string;
  cin: string;
  clientId: number;
  developerId: number;
  clientName: string;
  gst: string;
  pan: string;
  address: string;
};

export type CustomerInvesteeList = {
  info: APIResponseStatus;
  data: CustomerInvesteeListDataType[];
};

export type FilteredInvesteeList = {
  info: APIResponseStatus;
  data: FilteredInvesteeGroup[];
};
