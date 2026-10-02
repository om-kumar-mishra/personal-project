/* eslint-disable react/prop-types */
import React from 'react';
import { checkNegative, getNegativeClass } from "../../../../utils/commonFunctions";
import SpinnerComponent from "../../../Components/SpinnerComponent";

export type ColumnType<T> = {
  title: string;
  accessorKey: keyof T | "actions";
  head?: string;
  formatValue?: (value: any) => any;
  type?: "float" | "number";
  divider?: boolean;
};

export type TableRowType<T> = Record<keyof T | "actions", any>;

type TableProps<T> = {
  columns: ColumnType<T>[];
  data: TableRowType<T>[];
  loader?: boolean;
  containerStyles?: React.CSSProperties;
  emptyIndicator?: string;
};

const CashflowTable = <T extends Record<string, any>>(props: TableProps<T>) => {
  const {
    columns,
    data = [],
    loader,
    containerStyles,
    emptyIndicator = "-",
  } = props;

  const getCellData = (props: {
    row: TableRowType<T>;
    column: ColumnType<T>;
    cellIndex: number;
  }) => {
    const { row, column, cellIndex } = props;
    // let cellData = null;
    const cellData = row?.[column.accessorKey]
      ? isNaN(Number(row?.[column.accessorKey]))
        ? row?.[column.accessorKey]
        : column?.formatValue &&
          checkNegative(column?.formatValue(Number(row?.[column.accessorKey])), row?.[column.accessorKey])
      : emptyIndicator;
    return cellData;
  };

  const getCellStyle = (row: TableRowType<T>, cellIndex: number) => {
    return {
      backgroundColor:
        row.isHeading && cellIndex === 0
          ? "#e8ebf0"
          : row.isTotal
          ? "#fce4e2"
          : "",
      fontWeight: row.isHeading || row.isTotal ? "700" : "",
    };
  };

  return (
    <table className="table" style={containerStyles}>
      <thead>
        <tr>
          {columns?.map((header, index) => {
            return (
              <th
                className={`active-red ${
                  index === 0 ? "text-center" : "text-end"
                }`}
                key={index}
              >
                {header.title}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {data && data.length > 0 ? (
          data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns?.map((column, cellIndex) => {
                return (
                  <td
                    key={`row-${rowIndex}-cell-${cellIndex}`}
                    className={`${cellIndex === 0 ? "" : "text-end"} ${
                      column?.formatValue && row?.[column.accessorKey]
                        ? getNegativeClass(row?.[column.accessorKey])
                        : ""
                    }`}
                    style={getCellStyle(row, cellIndex)}
                  >
                    {getCellData({ row, column, cellIndex })}
                  </td>
                );
              })}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length ?? 2}>
              {loader ? <SpinnerComponent /> : ""}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default CashflowTable;
