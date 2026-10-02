import React, { useState } from "react";
import {
  IndexSignatureStringType,
  stringNumber,
} from "../../lib/services/Datatype";
import { numberWithCommas, roundOff } from "../charts/Recharts/utils";

interface PropsDatatype {
  data: any[];
  id: stringNumber;
  columns: IndexSignatureStringType[];
}
const ExpandableTable = (props: PropsDatatype) => {
  const { data, id, columns } = props;
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const handleExpand = (rowId: number) => {
    const isRowExpanded = expandedRows.includes(rowId);

    if (isRowExpanded) {
      setExpandedRows(expandedRows.filter((id) => id !== rowId));
    } else {
      setExpandedRows([...expandedRows, rowId]);
    }
  };

  return (
    <div className="table-responsive p-2">
      <table className="table table-cell-hover">
        <thead>
          <tr>
            {columns.map((v: IndexSignatureStringType) => (
              <th className="text-center active table-head-border" key={v.id}>
                {v.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row: any, i: number) => (
            <>
              <tr key={`${row[id]}-${i}`}>
                {columns.map((col: any, colIndex: number) => (
                  <>
                    <td
                      key={`${col.key}-${colIndex}`}
                      className={`text-center table-cell-border ${
                        col.key === "absorptionRate" && row[col.key] < 50
                          ? "table-bg-danger"
                          : ""
                      }`}
                    >
                      {colIndex === 0 && (
                        <span
                          className="border border-secondary"
                          style={{
                            padding: "0 5px",
                            marginRight: "4px",
                            cursor: "pointer",
                          }}
                          onClick={() => handleExpand(row[id])}
                        >
                          {expandedRows.includes(row[id]) ? "-" : "+"}
                        </span>
                      )}
                      {(!expandedRows.includes(row[id]) || colIndex === 0) && (
                        <>
                          {col.key !== "unitLocationFloor"
                            ? `${col?.prefix ?? ""} ${
                                col.key === "absorptionRate"
                                  ? `${
                                      row[col.key] ? roundOff(row[col.key]) : 0
                                    }`
                                  : numberWithCommas(roundOff(row[col.key]))
                              }${col?.suffix ?? ""}`
                            : row[col.key]}
                        </>
                      )}
                    </td>
                  </>
                ))}
              </tr>
              {expandedRows.includes(row[id]) && (
                <>
                  {row.childRows.map((childRow: any) => (
                    <tr key={childRow[id]}>
                      {columns.map((ChildCol: any) => (
                        <>
                          <td
                            className={`text-center table-cell-border ${
                              ChildCol.key === "absorptionRate" &&
                              childRow[ChildCol.key] < 50
                                ? "table-bg-danger"
                                : ""
                            }`}
                          >
                            {`${ChildCol?.prefix ?? ""} ${
                              ChildCol.key === "averageSalesPrice" ||
                              ChildCol.key === "absorptionRate"
                                ? `${roundOff(childRow[ChildCol.key])}`
                                : numberWithCommas(
                                    roundOff(childRow[ChildCol.key])
                                  )
                            }${ChildCol?.suffix ?? ""}`}
                          </td>
                        </>
                      ))}
                    </tr>
                  ))}
                </>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpandableTable;
