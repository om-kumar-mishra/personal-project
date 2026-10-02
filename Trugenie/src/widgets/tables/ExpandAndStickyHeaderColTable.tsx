import React, { useState } from "react";
import "./Table.css";
import { sumArrayofObjFixedTwo } from "../../utils/commonFunctions";

interface ExpandAndStickyHeaderColTableProps {
  data: any[];
  cols: {
    id: string;
    name: string;
    key: string;
  }[];
  firstId: string;
  secondId: string;
  add: string;
}

const ExpandAndStickyHeaderColTable: React.FC<ExpandAndStickyHeaderColTableProps> = ({
  data,
  cols,
  firstId,
  secondId,
  add,
}) => {
  const [firstExpandRows, setFirstExpandRows] = useState<string[]>([]);
  const [secondExpandRows, setSecondExpandRows] = useState<string[]>([]);

  const handleFirstExpand = (rowId:string) => {
    const isRowExpanded = firstExpandRows.includes(rowId);
    if (isRowExpanded) {
      setFirstExpandRows(firstExpandRows.filter((id) => id !== rowId));
    } else {
      setFirstExpandRows([...firstExpandRows, rowId]);
    }
  };

  const handleSecondExpand = (rowId:string) => {
    const isRowExpanded = secondExpandRows.includes(rowId);
    if (isRowExpanded) {
      setSecondExpandRows(secondExpandRows.filter((id) => id !== rowId));
    } else {
      setSecondExpandRows([...secondExpandRows, rowId]);
    }
  };

  return (
    <div className="table-multi-col-scroll" style={{ maxHeight: "200px" }}>
      <table className="table text-center">
        <thead className="main-color">
          <tr style={{ height: "35px" }}>
            <th
              colSpan={
                firstExpandRows.length > 0 && secondExpandRows.length > 0
                  ? 7
                  : 6
              }
            ></th>
            <th colSpan={4} className="text-center table-secondary">
              <i>TruBoard Estimation</i>
            </th>
          </tr>
          <tr>
            {cols.map(
              (v, colIndex) =>
                (colIndex !== 2 ||
                  (firstExpandRows.length > 0 &&
                    secondExpandRows.length > 0)) && (
                  <th key={v.id}>{v.name}</th>
                )
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <>
              {/* when both are not expanded */}
              {!firstExpandRows.includes(row[firstId]) && (
                <tr>
                  {cols.map((col, colIndex) => (
                    <>
                      {colIndex === 0 ||
                      colIndex === 1 ||
                      (colIndex === 2 &&
                        firstExpandRows.length > 0 &&
                        secondExpandRows.length > 0) ? (
                        <th>
                          {colIndex === 0 && (
                            <span
                              className="border border-secondary row-expand-icon"
                              onClick={() => handleFirstExpand(row[firstId])}
                            >
                              +
                            </span>
                          )}
                          {row[col.key]}
                        </th>
                      ) : (
                        colIndex !== 2 && (
                          <td>
                            <b>{`
                            ${colIndex !== 5 && colIndex !== 9 ? add : ""}
                            ${row[col.key].toFixed(2)}`}</b>
                          </td>
                        )
                      )}
                    </>
                  ))}
                </tr>
              )}
              {/* when first is expanded */}
              {firstExpandRows.includes(row[firstId]) && (
                <>
                  {row.firstChild.map((firstChildRow: { [x: string]: any; secondChild: any[]; }, firstChildIndex: number) => (
                    <>
                      {/* when second is not expanded */}
                      {!secondExpandRows.includes(firstChildRow[secondId]) && (
                        <tr>
                          {cols.map((col, colIndex) => (
                            <>
                              {colIndex === 0 ||
                              colIndex === 1 ||
                              (colIndex === 2 &&
                                secondExpandRows.length > 0) ? (
                                <th>
                                  {colIndex === 0 && firstChildIndex === 0 && (
                                    <>
                                      <span
                                        className="border border-secondary row-expand-icon"
                                        onClick={() =>
                                          handleFirstExpand(row[firstId])
                                        }
                                      >
                                        -
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
                                            firstChildRow[secondId]
                                          )
                                        }
                                      >
                                        +
                                      </span>
                                      {firstChildRow[col.key]}
                                    </>
                                  )}
                                </th>
                              ) : (
                                colIndex !== 2 && (
                                  <td>{`${
                                    colIndex !== 5 && colIndex !== 9 ? add : ""
                                  } ${row[col.key]}`}</td>
                                )
                              )}
                            </>
                          ))}
                        </tr>
                      )}

                      {/* when both are expanded */}
                      {secondExpandRows.includes(firstChildRow[secondId]) && (
                        <>
                          {firstChildRow.secondChild.map(
                            (secondChildRow, secondChildIndex) => (
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
                                                    row[firstId]
                                                  )
                                                }
                                              >
                                                -
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
                                                    firstChildRow[firstId]
                                                  )
                                                }
                                              >
                                                -
                                              </span>
                                              {firstChildRow[col.key]}
                                            </>
                                          )}
                                        {colIndex === 2 &&
                                          secondChildRow[col.key]}
                                      </th>
                                    ) : (
                                      <td>{`${
                                        colIndex !== 5 && colIndex !== 9
                                          ? add
                                          : ""
                                      } ${secondChildRow[col.key]}`}</td>
                                    )}
                                  </>
                                ))}
                              </tr>
                            )
                          )}
                          <tr>
                            <th></th>
                            <th></th>
                            <th>Total</th>
                            {cols.map(
                              (col, colIndex) =>
                                colIndex > 2 && (
                                  <td>
                                    <b>{`${
                                      colIndex !== 5 && colIndex !== 9
                                        ? add
                                        : ""
                                    } ${sumArrayofObjFixedTwo(
                                      firstChildRow.secondChild,
                                      col.key
                                    )}`}</b>
                                  </td>
                                )
                            )}
                          </tr>
                        </>
                      )}
                      <tr>
                        <th></th>
                        <th>Total</th>
                        {secondExpandRows.length > 0 && <th></th>}
                        {cols.map(
                          (col, colIndex) =>
                            colIndex > 2 && (
                              <td>
                                <b>{`${
                                  colIndex !== 5 && colIndex !== 9 ? add : ""
                                } ${sumArrayofObjFixedTwo(
                                  row.firstChild,
                                  col.key
                                )}`}</b>
                              </td>
                            )
                        )}
                      </tr>
                    </>
                  ))}
                </>
              )}
            </>
          ))}
          {/* All rows Total */}
          <tr>
            <th>Total</th>
            <th></th>
            {firstExpandRows.length > 0 && secondExpandRows.length > 0 && (
              <th></th>
            )}
            {cols.map(
              (col, colIndex) =>
                colIndex > 2 && (
                  <td>
                    <b>{`${
                      colIndex !== 5 && colIndex !== 9 ? add : ""
                    } ${sumArrayofObjFixedTwo(data, col.key)}`}</b>
                  </td>
                )
            )}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ExpandAndStickyHeaderColTable;
