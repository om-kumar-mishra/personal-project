import React, { ReactElement, useMemo } from "react";
import { TableDataType } from "../../../../../widgets/tables/Datatypes";
import { sumArrayofObj } from "../../../../../utils/commonFunctions";
import { numberWithCommasAndFraction } from "../../../../../widgets/charts/Recharts/utils";

interface PropsType {
  tableData: TableDataType;
  height?: string;
  headerColorClass?: string;
  showTotal?: boolean;
  customTableStyle?: React.CSSProperties;
  tableClasses?: string;
  otherRowsBottom?: () => ReactElement<any, any>;
  getCellColor?: (val: string | number | undefined) => string | undefined;
  activityValueKey: string;
}

const PhysicalProgressDetailTable: React.FC<PropsType> = ({
  tableData,
  height,
  showTotal,
  customTableStyle,
  headerColorClass,
  tableClasses,
  otherRowsBottom,
  getCellColor,
  activityValueKey,
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
                  <td>
                    <b>{sumArrayofObj(data, col.key)}</b>
                  </td>
                ) : (
                  <td></td>
                )}
              </>
            )
        )}
      </tr>
    );
  }, [data, columns]);

  return (
    <div
      className="p-1 simple-table-scroll scrollbar-width-thin"
      style={{ maxHeight: height ?? "250px", overflowX: "auto" }}
    >
      <table
        id={id}
        style={{ ...customTableStyle }}
        className={`${tableClasses ?? "table table-bordered text-center"}`}
      >
        <thead>
          <tr>
            {columns.map((v) => (
              <th
                key={v.id}
                className={`align-middle ${
                  !v?.style ? headerColorClass ?? "active" : ""
                }`}
                id={`${id}-${v.key}-header`}
                scope="col"
                style={v?.style}
              >
                {v.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={`${id}-${rowIndex}`}>
              <td key={`${id}-0-0`} style={columns[0]?.bodycellStyle}>
                {row[columns[0].key]}
              </td>
              {row?.[activityValueKey] &&
                row[activityValueKey].map((value: any, valIndex: number) => (
                  <td
                    key={`other-${id}-${rowIndex}-${valIndex}`}
                    className={getCellColor ? getCellColor(value) : ""}
                  >
                    {value !== ""
                      ? `${numberWithCommasAndFraction(
                          value * 100,
                          import.meta.env.VITE_REACT_APP_PHYSICAL_PROGRESS_PERCENTAGE_DECIMALS
                        )}%`
                      : ""}
                  </td>
                ))}
            </tr>
          ))}
          {showTotal && totalRow}
          {otherRowsBottom && otherRowsBottom()}
        </tbody>
      </table>
    </div>
  );
};
export default PhysicalProgressDetailTable;
