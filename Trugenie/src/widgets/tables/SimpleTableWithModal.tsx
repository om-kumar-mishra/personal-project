import withModal from "../../hoc/withModal";
import { TableDataType } from "./Datatypes";
import SimpleTable from "./SimpleTable";

interface PropsType {
  tableData: TableDataType;
  height?: string;
  headerColorClass?: string;
  showTotal?: boolean;
  showTotalAbove?: boolean;
  customTableStyle?: React.CSSProperties;
  tableClasses?: string;
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  title: string;
  fullscreen?: boolean;
  position?: string;
  removeFooter?: boolean;
  size?: string;
  [key: string]: any;
}

const CustomSimpleTable: React.FC<PropsType> = (props) => {
  const {
    tableData,
    height,
    headerColorClass,
    showTotal,
    showTotalAbove,
    customTableStyle,
    tableClasses,
  } = props;
  return (
    <SimpleTable
      tableData={tableData}
      height={height}
      showTotal={showTotal}
      showTotalAbove={showTotalAbove}
      customTableStyle={customTableStyle}
      tableClasses={tableClasses}
      headerColorClass={headerColorClass}
    />
  );
};

export const SimpleTableWithModal = withModal(CustomSimpleTable);
