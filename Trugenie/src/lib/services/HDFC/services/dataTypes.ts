export enum ActionType {
  APPROVE = "Approve",
  REJECT = "Reject",
  WITHDRAW = "Withdraw",
  DELETE = "Delete",
}

export type FileUploadResponse = {
  info: {
    code: number;
    message: string;
  };
  data: any;
};

export type FileResponseType = {
  info: FileUploadResponse;
  data: any;
};
