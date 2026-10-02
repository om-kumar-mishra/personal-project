import React, { ReactElement, useMemo } from "react";
import { stringNumber, tableColsType } from "../../lib/services/Datatype";
import {
  checkNegative,
  checkZeroValue,
  getNegativeClass,
} from "../../utils/commonFunctions";

interface TableWithRedHeaderProps {
  data: any[];
  cols: tableColsType[];
  handleButtonClick?: (isUnderwritten: boolean) => void;
  showTotalRow?: boolean;
  showTotalRowAbove?: boolean;
  height?: string;
  upperHeader?: () => ReactElement<any, any>;
  shiftLastRowToFirst?: boolean;
  headerColorClass?: string;
}

const TableWithRedHeader: React.FC<TableWithRedHeaderProps> = ({
  data,
  cols,
  height,
  headerColorClass,
  showTotalRow = true,
  showTotalRowAbove = false,
  upperHeader,
  shiftLastRowToFirst = false,
}) => {
  const rearrangedData = useMemo(() => {
    if (shiftLastRowToFirst && data.length > 1) {
      const lastRow = data[data.length - 1];
      return [lastRow, ...data.slice(0, data.length - 1)];
    }
    return data;
  }, [data, shiftLastRowToFirst]);

  const totals: { [key: string]: number } = {};
  rearrangedData.forEach((row) => {
    cols.forEach((col) => {
      if (typeof row[col.key] === "number") {
        totals[col.key] = (totals[col.key] || 0) + row[col.key];
      }
    });
  });

  const totalRow = useMemo(() => {
    return (
      <tr>
        <td className="grey-bold-background align-middle text-center">Total</td>
        {cols.slice(1).map((col, colIndex) => (
          <td
            key={`total-cell-${colIndex}`}
            className={`grey-bold-background text-center ${totals[col.key] ? getNegativeClass(totals[col.key]) : ""
              } ${col?.formatClass ? col?.formatClass(totals) : ""}`}
          >
            {col?.formatValue && totals[col.key]
              ? checkNegative(col.formatValue(totals[col.key]), totals[col.key])
              : checkZeroValue(totals[col.key])}
          </td>
        ))}
      </tr>
    );
  }, [totals, cols]);

  return (
    <div
      className="simple-table-scroll scrollbar-width-thin"
      style={{ height }}
    >
      <table className="table">
        <thead className="main-color">
          {upperHeader && upperHeader()}
          <tr className="text-center align-middle">
            {cols.map((col, colIndex) => (
              <th
                className={`${headerColorClass ?? "active-red"}`}
                key={`table-col-${col.key}-${colIndex}`}>{col.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {showTotalRowAbove && totalRow}
          {rearrangedData.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              {cols.map((col, colIndex) => (
                <td
                  key={`cell-${rowIndex}-${colIndex}`}
                  className={`${"text-center"} ${row[col.key] ? getNegativeClass(row[col.key]) : ""
                    } ${col?.formatClass ? col?.formatClass(row) : ""} ${shiftLastRowToFirst && rowIndex === 0
                      ? "grey-bold-background"
                      : ""
                    }`}
                >
                  {col?.formatValue && row[col.key]
                    ? checkNegative(
                      col?.formatValue(row[col.key]),
                      row[col.key]
                    )
                    : checkZeroValue(row[col.key])}
                </td>
              ))}
            </tr>
          ))}

          {showTotalRow && !showTotalRowAbove && totalRow}
        </tbody>
      </table>
    </div>
  );
};

export default TableWithRedHeader;
