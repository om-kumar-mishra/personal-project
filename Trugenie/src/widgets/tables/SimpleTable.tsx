import React, { ReactElement, useMemo } from "react";
import "./Table.css";
import { TableDataType } from "./Datatypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { checkNegative, checkZeroValue, getNegativeClass, sumArrayofObj } from "../../utils/commonFunctions";

interface PropsType {
  tableData: TableDataType;
  height?: string;
  headerColorClass?: string;
  showTotal?: boolean;
  showTotalAbove?: boolean;
  customTableStyle?: React.CSSProperties;
  tableClasses?: string;
  minHeight?: string;
  otherRows?: () => ReactElement<any, any>;
  hideHeader?: boolean;
  addExtraData?: {
    index: number;
    valKey: string;
    format?: (val: any) => string;
  }[];
}

const SimpleTable: React.FC<PropsType> = ({
  tableData,
  height,
  minHeight,
  headerColorClass,
  showTotal,
  showTotalAbove,
  customTableStyle,
  tableClasses,
  otherRows,
  hideHeader = false,
  addExtraData,
}) => {
  const { columns, data, id } = tableData;
  const totalRow = useMemo(() => {
    return (
      <tr>
        <th>Total</th>
        {columns.map(
          (col, colIndex) =>
            colIndex !== 0 && (
              <>
                {col.calTotal ? (
                  <th className={`${col.formatValue ? getNegativeClass(sumArrayofObj(data, col.key)) : ""}`}>
                    {checkNegative(sumArrayofObj(data, col.key, col?.formatValue), sumArrayofObj(data, col.key))}
                  </th>
                ) : (
                  <td></td>
                )}
              </>
            ),
        )}
      </tr>
    );
  }, [data, columns]);

  return (
    <div className='simple-table-scroll scrollbar-width-thin' style={{ maxHeight: height ?? "250px", minHeight: minHeight ?? "auto" }}>
      <table id={id} style={customTableStyle} className={`${tableClasses ?? "table table-bordered text-center"}`}>
        {!hideHeader && (
          <thead>
            <tr>
              {columns.map(v => (
                <th
                  key={v.name}
                  className={`${headerColorClass ?? "active"}`}
                  id={`${id}-${v.key}-header`}
                  scope='col'
                  style={v.key === "remark" ? { width: "30%" } : { width: "10%" }}>
                  {v.name}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {showTotalAbove && totalRow}
          {data.map((row, rowIndex) => (
            <tr key={`simple-${id}-${rowIndex}`}>
              {columns.map((col, colIndex) => (
                <td
                  key={`simple-${id}-${rowIndex}-${colIndex}`}
                  style={{ fontWeight: row?.isBold ? "700" : "" }}
                  className={`${col?.getTextColor && row?.[col.key] ? col.getTextColor(row[col.key]) : ""} ${
                    col.formatValue && row[col.key] ? getNegativeClass(row[col.key]) : ""
                  } ${col?.className ?? ""} ${col.string ? "text-start" : ""}`}>
                  {col?.formatValue && row?.[col.key]
                    ? checkNegative(col.formatValue(row[col.key], row), row[col.key])
                    : col?.icon || col?.notCheckZero
                    ? row?.[col.key]
                    : checkZeroValue(row?.[col.key])}
                  {addExtraData && addExtraData[0] && addExtraData[0].index === colIndex && row?.[addExtraData[0].valKey] && (
                    <>
                      <br />
                      <span
                        style={{
                          background: "lightpink",
                          width: "100px",
                          padding: "0 5px",
                          borderRadius: "5px",
                        }}>
                        {addExtraData[0].format ? addExtraData[0].format(row?.[addExtraData[0].valKey]) : row?.[addExtraData[0].valKey]}
                      </span>
                    </>
                  )}

                  {col?.icon && (
                    <FontAwesomeIcon
                      className={`copy-text-icon ${col.icon?.className}`}
                      color={col.icon?.color ?? "#000"}
                      size={col.icon?.size ?? "lg"}
                      icon={col.icon.icon}
                      onClick={() => (col?.icon?.onClick ? col.icon.onClick(row) : null)}
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
          {showTotal && totalRow}
          {otherRows && otherRows()}
        </tbody>
      </table>
    </div>
  );
};

export default SimpleTable;
