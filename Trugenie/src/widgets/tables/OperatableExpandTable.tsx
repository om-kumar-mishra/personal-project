import React, { useState } from "react";
import "./Table.css";
import {
  IndexSignatureStringType,
  stringUndefined,
} from "../../lib/services/Datatype";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

interface OperatableExpandTableTypes {
  data: any;
  cols: IndexSignatureStringType[];
  firstId: string;
  secondId: string;
  thirdId: string;
  setData: (row: any[]) => void;
  setGraphKey: (key: string) => void;
}

const OperatableExpandTable: React.FC<OperatableExpandTableTypes> = ({
  data,
  cols,
  firstId,
  secondId,
  thirdId,
  setData,
  setGraphKey,
}) => {
  const [firstExpandRows, setFirstExpandRows] =
    useState<stringUndefined>(undefined);
  const [secondExpandRows, setSecondExpandRows] =
    useState<stringUndefined>(undefined);

  const handleFirstExpand = (row: any, rowIndex: number) => {
    const rowIdstr = `${row[firstId]}-${rowIndex}`;
    const isRowExpanded = firstExpandRows === rowIdstr;
    if (isRowExpanded) {
      setFirstExpandRows(undefined);
      setSecondExpandRows(undefined);
      setData(data);
      setGraphKey(firstId);
    } else {
      setFirstExpandRows(rowIdstr);
      setData(row.firstChild);
      setGraphKey(secondId);
    }
  };

  const handleSecondExpand = (
    row: any,
    rowIndex: number,
    firstChildIndex: number,
    firstChild: any
  ) => {
    const rowIdstr = `${row[secondId]}-${rowIndex}-${firstChildIndex}`;
    const isRowExpanded = secondExpandRows === rowIdstr;
    if (isRowExpanded) {
      setSecondExpandRows(undefined);
      setData(firstChild);
      setGraphKey(secondId);
    } else {
      setSecondExpandRows(rowIdstr);
      setData(row.secondChild);
      setGraphKey(thirdId);
    }
  };

  return (
    <div className="simple-table-scroll">
      <table className="table text-center">
        <thead className="main-color">
          <tr>
            {cols.map(
              (v: IndexSignatureStringType, colIndex: number) =>
                ((colIndex !== 1 && colIndex !== 2) ||
                  (colIndex === 1 && firstExpandRows) ||
                  (colIndex === 2 && firstExpandRows && secondExpandRows)) && (
                  <th key={v.id}>{v.name}</th>
                )
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row: any, rowIndex: number) => (
            <>
              {/* when both are not expanded */}
              {firstExpandRows !== `${row[firstId]}-${rowIndex}` && (
                <tr>
                  {cols.map((col, colIndex) => (
                    <>
                      {((colIndex !== 1 && colIndex !== 2) ||
                        (colIndex === 1 && firstExpandRows) ||
                        (colIndex === 2 &&
                          firstExpandRows &&
                          secondExpandRows)) && (
                        <th>
                          {colIndex === 0 && (
                            <span
                              className="border border-secondary row-expand-icon"
                              onClick={() => handleFirstExpand(row, rowIndex)}
                            >
                              <FontAwesomeIcon icon={faCaretDown} />
                            </span>
                          )}
                          {row[col.key]}
                        </th>
                      )}
                    </>
                  ))}
                </tr>
              )}
              {/* when first is expanded */}
              {firstExpandRows === `${row[firstId]}-${rowIndex}` && (
                <>
                  {row.firstChild.map(
                    (firstChildRow: any, firstChildIndex: number) => (
                      <>
                        {/* when second is not expanded */}
                        {secondExpandRows !==
                          `${firstChildRow[secondId]}-${rowIndex}-${firstChildIndex}` && (
                          <tr>
                            {cols.map((col, colIndex) => (
                              <>
                                {colIndex === 0 ||
                                colIndex === 1 ||
                                (colIndex === 2 && secondExpandRows) ? (
                                  <th>
                                    {colIndex === 0 &&
                                      firstChildIndex === 0 && (
                                        <>
                                          <span
                                            className="border border-secondary row-expand-icon"
                                            onClick={() =>
                                              handleFirstExpand(row, rowIndex)
                                            }
                                          >
                                            <FontAwesomeIcon icon={faCaretUp} />
                                          </span>
                                          {row[col.key]}
                                        </>
                                      )}
                                    {colIndex === 1 && (
                                      <>
                                        <span
                                          className="border border-secondary row-expand-icon"
                                          onClick={() =>
                                            handleSecondExpand(
                                              firstChildRow,
                                              rowIndex,
                                              firstChildIndex,
                                              row.firstChild
                                            )
                                          }
                                        >
                                          <FontAwesomeIcon icon={faCaretDown} />
                                        </span>
                                        {firstChildRow[col.key]}
                                      </>
                                    )}
                                  </th>
                                ) : (
                                  colIndex > 2 && <td>{row[col.key]}</td>
                                )}
                              </>
                            ))}
                          </tr>
                        )}

                        {/* when both are expanded */}
                        {secondExpandRows ===
                          `${firstChildRow[secondId]}-${rowIndex}-${firstChildIndex}` && (
                          <>
                            {firstChildRow.secondChild.map(
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
                                        <th>
                                          {colIndex === 0 &&
                                            secondChildIndex === 0 && (
                                              <>
                                                <span
                                                  className="border border-secondary row-expand-icon"
                                                  onClick={() =>
                                                    handleFirstExpand(
                                                      row,
                                                      rowIndex
                                                    )
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
                                                    handleSecondExpand(
                                                      firstChildRow,
                                                      rowIndex,
                                                      firstChildIndex,
                                                      row.firstChild
                                                    )
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
                                        <td>{secondChildRow[col.key]}</td>
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
};

export default OperatableExpandTable;
