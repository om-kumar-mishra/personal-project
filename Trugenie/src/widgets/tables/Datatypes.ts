import { IconProp, SizeProp } from "@fortawesome/fontawesome-svg-core";

export interface TableColumnDataType {
  id?: string;
  name: string;
  key: string;
  calTotal?: boolean;
  style?: React.CSSProperties;
  bodycellStyle?: React.CSSProperties;
  rowSpan?: boolean;
  preText?: string;
  postText?: string;
  rowSpanAlign?: string;
  totalColSpan?: number;
  icon?: {
    icon: IconProp;
    color?: string;
    size?: SizeProp;
    onClick?: (row: any) => void;
    className?: string;
  };
  isMonth?: boolean;
  className?: string;
  getTextColor?: (value: any) => string;
  formatValue?: (value: any, row?:any) => any;
  notCheckZero?: boolean;
  string?: boolean;
}

export interface TableDataType {
  id: string;
  columns: TableColumnDataType[];
  data: any[];
}

export interface MultiDataTableDataType {
  id: string;
  columns: TableColumnDataType[];
  data: any;
}
