export interface ResponseCodeType {
  code: number;
  message: string;
}

export type stringNumber = string | number;
export type pieHorizontalType = "center" | "left" | "right" | undefined;
export type stringNull = string | null;

export type stringUndefined = string | undefined;

export interface IndexSignatureStringType {
  [key: string]: string;
}

export interface IndexSignatureNumberType {
  [key: string]: number;
}

export interface TokenExpireResponse {
  body: any;
  bodyUsed: boolean;
  headers: any;
  ok: boolean;
  redirected: boolean;
  status: number;
  statusText: string;
  type: string;
  url: string;
}

export interface IndexSignatureAnyType {
  [key: string]: any;
}

export interface tableColsType {
  name: string;
  key: string;
  type?: string;
  border?: boolean;
  showAboveHeader?: boolean;
  formatValue?: (value: any) => stringNumber;
  formatClass?: (row: any) => string;
}
