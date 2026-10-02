import React from "react";
import {
  checkNegative,
  checkZeroValue,
  getNegativeClass,
} from "../../utils/commonFunctions";

interface tableColsType {
  formatValue?: (val: any) => any;
  key: string;
  name: string;
  borderDivider?: boolean;
  commaAdded?: boolean;
  color?: (row: any) => string;
}

interface TableWithRedHeaderProps {
  data: any[];
  cols: tableColsType[];
  colorRow?: (row: any) => string;
}

const RedHeaderWithSubHeader: React.FC<TableWithRedHeaderProps> = ({
  data,
  cols,
  colorRow,
}) => {
  return (
    <div className="simple-table-scroll sales-table-border">
      <table className="table">
        <thead className="main-color">
          <tr className="text-center">
            {cols.map((col, colIndex) => (
              <th
                className="align-middle"
                key={`table-col-${col.key}-${colIndex}`}
              >
                {col.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              {cols.map((col, colIndex) => (
                <td
                  key={`cell-${rowIndex}-${colIndex}`}
                  className={`${colorRow && colorRow(row)} ${
                    col.color && col.color(row)
                  } ${colIndex === 0 ? "" : "text-center"} ${
                    row[col.key] ? getNegativeClass(row[col.key]) : ""
                  }`}
                >
                  {
                    // row?.[cols[1].key] === "Actual" && colIndex === 0
                    //   ? ""
                    //   :
                    col?.formatValue && row?.[col.key]
                      ? checkNegative(
                          col.formatValue(row?.[col.key]),
                          row?.[col.key]
                        )
                      : checkZeroValue(row?.[col.key])
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RedHeaderWithSubHeader;