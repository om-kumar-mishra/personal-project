import React, { ReactElement, useMemo } from "react";
import { MultiDataTableDataType } from "../../../../../widgets/tables/Datatypes";
import { checkNegative, checkZeroValue, getNegativeClass, sumArrayofObj } from "../../../../../utils/commonFunctions";

interface PropsType {
  tableData: MultiDataTableDataType;
  height?: string;
  headerColorClass?: string;
  showTotal?: boolean;
  showSubTotal?: boolean;
  customTableStyle?: React.CSSProperties;
  tableClasses?: string;
  upperHeader?: () => ReactElement<any, any>;
  lastRowTotal?: boolean;
  showTotalAbove?: boolean;
}

const style = {
  subTotal: {
    fontWeight: "700",
    backgroundColor: "#EBEBEB",
  },
  total: {
    fontWeight: "700",
    backgroundColor: "#CECECE",
  },
};

const SummaryMultiFeatureTable: React.FC<PropsType> = ({
  tableData,
  height,
  headerColorClass,
  tableClasses,
  upperHeader,
  showTotal,
  showSubTotal,
  lastRowTotal,
  showTotalAbove,
}) => {
  const { columns, data, id } = tableData;
  const subTotalRow = (subTotalData: any) => {
    return (
      <tr>
        {columns.map((col, colIndex) => (
          <>
            {!col?.totalColSpan ||
            (col?.totalColSpan && colIndex > col.totalColSpan) ? (
              <>
                {col.calTotal && (
                  <td
                    className={`${
                      col.formatValue
                        ? getNegativeClass(sumArrayofObj(subTotalData, col.key))
                        : ""
                    }`}
                    style={style.subTotal}
                  >
                    {checkNegative(
                      sumArrayofObj(subTotalData, col.key, col.formatValue)
                    )}
                  </td>
                )}
              </>
            ) : (
              <td style={style.subTotal} colSpan={col?.totalColSpan}>
                Sub Total
              </td>
            )}
          </>
        ))}
      </tr>
    );
  };
  const totalRow = useMemo(() => {
    const totalData: any[] = ([] as any[]).concat(...data);
    return (
      <tr>
        {columns.map((col, colIndex) => (
          <>
            {!col?.totalColSpan ||
            (col?.totalColSpan && colIndex > col.totalColSpan) ? (
              <>
                {col.calTotal && (
                  <td
                    className={`${
                      col.formatValue
                        ? getNegativeClass(sumArrayofObj(totalData, col.key))
                        : ""
                    }`}
                    style={style.total}
                  >
                    {checkNegative(
                      sumArrayofObj(totalData, col.key, col.formatValue)
                    )}
                  </td>
                )}
              </>
            ) : (
              <td style={style.total} colSpan={col?.totalColSpan}>
                Total
              </td>
            )}
          </>
        ))}
      </tr>
    );
  }, [data, columns]);

  return (
    <div
      className="p-1 scrollbar-width-thin"
      style={{ height: height ?? "250px", overflowY: "scroll" }}
    >
      <table
        id={id}
        className={`${tableClasses ?? "table table-bordered text-center"}`}
      >
        <thead>
          {upperHeader && upperHeader()}
          <tr>
            {columns.map((v) => (
              <th
                key={v.id}
                className={`${!v?.style ? headerColorClass ?? "active" : ""}`}
                id={`${id}-${v.key}-header`}
                scope="col"
                style={v?.style}
              >
                {v.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{showTotalAbove && totalRow}</tbody>
        {data &&
          data.map((mainRow: any, mainRowIndex: number) => (
            <tbody key={`${mainRowIndex}-${id}`}>
              {mainRow.map((row: any, rowIndex: number) => (
                <tr key={`${id}-${rowIndex}`}>
                  {columns.map(
                    (col, colIndex) =>
                      (!col?.rowSpan ||
                        (col.rowSpan && rowIndex === 0) ||
                        (lastRowTotal && rowIndex === mainRow.length - 1)) && (
                        <td
                          className={`${
                            col.rowSpanAlign === "top" ? "" : "align-middle"
                          } ${
                            col.formatValue && row[col.key]
                              ? getNegativeClass(row[col.key])
                              : ""
                          }`}
                          style={
                            lastRowTotal && rowIndex === mainRow.length - 1
                              ? style.subTotal
                              : {}
                          }
                          key={`${id}-${rowIndex}-${colIndex}`}
                          rowSpan={
                            col?.rowSpan
                              ? showSubTotal
                                ? mainRow.length
                                : lastRowTotal
                                ? mainRow.length - 1
                                : mainRow.length
                              : 1
                          }
                        >
                          {col?.formatValue && row?.[col.key]
                            ? checkNegative(col.formatValue(row[col.key], row[col.key]))
                            : col?.icon
                            ? row?.[col.key]
                            : checkZeroValue(row?.[col.key])}
                        </td>
                      )
                  )}
                </tr>
              ))}
              {showSubTotal && subTotalRow(mainRow)}
            </tbody>
          ))}
        <tbody>{showTotal && !showTotalAbove && totalRow}</tbody>
      </table>
    </div>
  );
};
export default SummaryMultiFeatureTable;
