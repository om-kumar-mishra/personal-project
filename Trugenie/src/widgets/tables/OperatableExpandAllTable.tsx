import React, { useState, useEffect, useMemo } from "react";
import "./Table.css";
import { tableColsType } from "../../lib/services/Datatype";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import {
  checkNegative,
  checkZeroValue,
  getNegativeClass,
} from "../../utils/commonFunctions";

interface OperatableExpandTableTypes {
  data: any[];
  cols: tableColsType[];
  firstId: string;
  secondId: string;
  thirdId: string;
  setData: (row: any[]) => void;
  setGraphKey: (key: string) => void;
  firstChildKey: string;
  secondChildKey: string;
  totalRow?: any;
  otherRow?: any[];
}

const OperatableExpandAllTable: React.FC<OperatableExpandTableTypes> =
  React.memo(
    ({
      data,
      cols,
      firstId,
      secondId,
      thirdId,
      setData,
      setGraphKey,
      firstChildKey = "firstChild",
      secondChildKey = "secondChild",
      totalRow,
      otherRow,
    }) => {
      const [firstExpandRows, setFirstExpandRows] = useState<string[]>([]);
      const [secondExpandRows, setSecondExpandRows] = useState<string[]>([]);
      const [firstIds, setFirstIds] = useState<string[]>([]);
      const [firstIdsData, setFirstIdsData] = useState<any[]>([]);
      const [secondIds, setSecondIds] = useState<string[]>([]);
      const [secondIdsData, setSecondIdsData] = useState<any[]>([]);
      const oddRowColor = "#D5D5D5";
      const evenRowColor = "#FBE2E0";

      useEffect(() => {
        const first: string[] = [];
        const firstData: any[] = [];
        const second: string[] = [];
        const secondData: any[] = [];
        data.forEach((row: any, rowIndex: number) => {
          first.push(`${row[firstId]}-${rowIndex}`);
          row[firstChildKey].forEach(
            (firstChild: any, firstChildIndex: number) => {
              firstData.push(firstChild);
              second.push(`${row[secondId]}-${rowIndex}-${firstChildIndex}`);
              firstChild[secondChildKey].forEach((secondChild: any) => {
                secondData.push(secondChild);
              });
            }
          );
        });
        setFirstIds(first);
        setFirstIdsData(firstData);
        setSecondIds(second);
        setSecondIdsData(secondData);
        setFirstExpandRows([]);
        setSecondExpandRows([]);
        setGraphKey(firstId);
      }, [data]);

      const handleFirstExpand = () => {
        const isRowExpanded = firstExpandRows.length > 0;
        if (isRowExpanded) {
          setFirstExpandRows([]);
          setSecondExpandRows([]);
          setData(data);
          setGraphKey(firstId);
        } else {
          setFirstExpandRows(firstIds);
          setData(firstIdsData);
          setGraphKey(secondId);
        }
      };

      const handleSecondExpand = () => {
        const isRowExpanded = secondExpandRows.length > 0;
        if (isRowExpanded) {
          setSecondExpandRows([]);
          setData(firstIdsData);
          setGraphKey(secondId);
        } else {
          setSecondExpandRows(secondIds);
          setData(secondIdsData);
          setGraphKey(thirdId);
        }
      };

      const otherRows = useMemo(() => {
        return (
          otherRow &&
          otherRow.map((other: any, index: number) => (
            <tr key={`${index}-other-tr`}>
              {cols.map((col, colIndex) => (
                <>
                  {colIndex === 0 ? (
                    <th
                      style={{
                        backgroundColor: `${
                          index % 2 === 0 ? oddRowColor : evenRowColor
                        }`,
                      }}
                    >
                      {other?.title}
                    </th>
                  ) : (colIndex === 1 && firstExpandRows.length === 0) ||
                    (colIndex === 2 && secondExpandRows.length === 0) ? (
                    ""
                  ) : (colIndex === 1 && firstExpandRows.length > 0) ||
                    (colIndex === 2 && secondExpandRows.length > 0) ? (
                    <th
                      style={{
                        backgroundColor: `${
                          index % 2 === 0 ? oddRowColor : evenRowColor
                        }`,
                      }}
                    ></th>
                  ) : (
                    <th
                      className={`text-center ${
                        col?.formatValue && other?.[col.key]
                          ? getNegativeClass(other[col.key])
                          : ""
                      }`}
                      style={{
                        backgroundColor: `${
                          index % 2 === 0 ? oddRowColor : evenRowColor
                        }`,
                      }}
                    >
                      {col?.formatValue && other?.[col.key]
                        ? checkNegative(
                            col.formatValue(other[col.key]),
                            other[col.key]
                          )
                        : checkZeroValue(other[col.key])}
                    </th>
                  )}
                </>
              ))}
            </tr>
          ))
        );
      }, [otherRow, cols]);

      const totalRowTR = useMemo(() => {
        return (
          <tr>
            {totalRow &&
              cols.map((col, colIndex) => (
                <>
                  {colIndex === 0 ? (
                    <th>Total</th>
                  ) : (colIndex === 1 && firstExpandRows.length === 0) ||
                    (colIndex === 2 && secondExpandRows.length === 0) ? (
                    ""
                  ) : (colIndex === 1 && firstExpandRows.length > 0) ||
                    (colIndex === 2 && secondExpandRows.length > 0) ? (
                    <th></th>
                  ) : (
                    <th
                      className={`text-center ${
                        col?.formatValue && totalRow[col.key]
                          ? getNegativeClass(totalRow[col.key])
                          : ""
                      }`}
                    >
                      {col?.formatValue && totalRow[col.key]
                        ? checkNegative(
                            col.formatValue(totalRow[col.key]),
                            totalRow[col.key]
                          )
                        : checkZeroValue(totalRow[col.key])}
                    </th>
                  )}
                </>
              ))}
          </tr>
        );
      }, [totalRow, cols]);

      return (
        <div className="simple-table-scroll sales-table-border">
          <table className="table">
            <thead className="main-color">
              <tr className="text-center">
                {cols.map(
                  (v: tableColsType, colIndex: number) =>
                    ((colIndex !== 1 && colIndex !== 2) ||
                      (colIndex === 1 && firstExpandRows.length > 0) ||
                      (colIndex === 2 &&
                        firstExpandRows.length > 0 &&
                        secondExpandRows.length > 0)) && (
                      <th className="active-red" key={`table-col-${v.key}-${colIndex}`}>{v.name}</th>
                    )
                )}
              </tr>
            </thead>
            <tbody>
              {otherRows}
              {totalRowTR}
              {data.map((row: any, rowIndex: number) => (
                <>
                  {/* when both are not expanded */}
                  {firstExpandRows.length === 0 && (
                    <tr key={`${rowIndex}-table-${firstChildKey}`}>
                      {cols.map((col, colIndex) => (
                        <>
                          {((colIndex !== 1 && colIndex !== 2) ||
                            (colIndex === 1 && firstExpandRows.length > 0) ||
                            (colIndex === 2 &&
                              firstExpandRows.length > 0 &&
                              secondExpandRows.length > 0)) && (
                            <td
                              key={`${rowIndex}-table-${colIndex}`}
                              className={`${
                                colIndex === 0 ? "" : "text-center"
                              } ${
                                col?.formatValue && row[col.key]
                                  ? getNegativeClass(row[col.key])
                                  : ""
                              }`}
                            >
                              {/* {colIndex === 0 && (
                            <span
                              className="border border-secondary row-expand-icon"
                              onClick={() => handleFirstExpand()}
                            >
                              <FontAwesomeIcon icon={faCaretDown} />
                            </span>
                          )} */}
                              {col?.formatValue && row[col.key]
                                ? checkNegative(
                                    col.formatValue(row[col.key]),
                                    row[col.key]
                                  )
                                : checkZeroValue(row[col.key])}
                            </td>
                          )}
                        </>
                      ))}
                    </tr>
                  )}
                  {/* when first is expanded */}
                  {firstExpandRows.length > 0 && (
                    <>
                      {row[firstChildKey].map(
                        (firstChildRow: any, firstChildIndex: number) => (
                          <>
                            {/* when second is not expanded */}
                            {secondExpandRows.length === 0 && (
                              <tr
                                key={`${firstChildIndex}-table1-${firstChildKey}`}
                              >
                                {cols.map((col, colIndex) => (
                                  <>
                                    {colIndex === 0 ||
                                    colIndex === 1 ||
                                    (colIndex === 2 &&
                                      secondExpandRows.length > 0) ? (
                                      <th
                                        key={`${rowIndex}-table1-${colIndex}`}
                                      >
                                        {colIndex === 0 &&
                                          firstChildIndex === 0 && (
                                            <>
                                              <span
                                                className="border border-secondary row-expand-icon"
                                                onClick={() =>
                                                  handleFirstExpand()
                                                }
                                              >
                                                <FontAwesomeIcon
                                                  icon={faCaretUp}
                                                />
                                              </span>
                                              {row[col.key]}
                                            </>
                                          )}
                                        {colIndex === 1 && (
                                          <>
                                            <span
                                              className="border border-secondary row-expand-icon"
                                              onClick={() =>
                                                handleSecondExpand()
                                              }
                                            >
                                              <FontAwesomeIcon
                                                icon={faCaretDown}
                                              />
                                            </span>
                                            {firstChildRow[col.key]}
                                          </>
                                        )}
                                      </th>
                                    ) : (
                                      colIndex > 2 && (
                                        <td
                                          className={`text-center ${
                                            col?.formatValue && row[col.key]
                                              ? getNegativeClass(row[col.key])
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
                                      )
                                    )}
                                  </>
                                ))}
                              </tr>
                            )}

                            {/* when both are expanded */}
                            {secondExpandRows.length > 0 && (
                              <>
                                {firstChildRow[secondChildKey].map(
                                  (
                                    secondChildRow: any,
                                    secondChildIndex: number
                                  ) => (
                                    <tr>
                                      {cols.map((col, colIndex) => (
                                        <>
                                          {colIndex === 0 ||
                                          colIndex === 1 ||
                                          colIndex === 2 ? (
                                            <th
                                              key={`${rowIndex}-table2-${colIndex}`}
                                            >
                                              {colIndex === 0 &&
                                                secondChildIndex === 0 && (
                                                  <>
                                                    <span
                                                      className="border border-secondary row-expand-icon"
                                                      onClick={() =>
                                                        handleFirstExpand()
                                                      }
                                                    >
                                                      <FontAwesomeIcon
                                                        icon={faCaretUp}
                                                      />
                                                    </span>
                                                    {row[col.key]}
                                                  </>
                                                )}
                                              {colIndex === 1 &&
                                                secondChildIndex === 0 && (
                                                  <>
                                                    <span
                                                      className="border border-secondary row-expand-icon"
                                                      onClick={() =>
                                                        handleSecondExpand()
                                                      }
                                                    >
                                                      <FontAwesomeIcon
                                                        icon={faCaretUp}
                                                      />
                                                    </span>
                                                    {firstChildRow[col.key]}
                                                  </>
                                                )}
                                              {colIndex === 2 &&
                                                secondChildRow[col.key]}
                                            </th>
                                          ) : (
                                            <td
                                              className={`text-center ${
                                                col?.formatValue &&
                                                secondChildRow[col.key]
                                                  ? getNegativeClass(
                                                      secondChildRow[col.key]
                                                    )
                                                  : ""
                                              }`}
                                            >
                                              {col?.formatValue &&
                                              secondChildRow[col.key]
                                                ? checkNegative(
                                                    col?.formatValue(
                                                      secondChildRow[col.key]
                                                    ),
                                                    secondChildRow[col.key]
                                                  )
                                                : checkZeroValue(
                                                    secondChildRow[col.key]
                                                  )}
                                            </td>
                                          )}
                                        </>
                                      ))}
                                    </tr>
                                  )
                                )}
                              </>
                            )}
                          </>
                        )
                      )}
                    </>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  );

export default OperatableExpandAllTable;
