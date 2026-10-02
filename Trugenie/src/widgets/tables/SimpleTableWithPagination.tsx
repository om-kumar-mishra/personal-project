import { faClipboard, faHistory } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { convertDateFormatMMM } from "../../utils/commonFunctions";
import usePagination from "../../hooks/usePagination";
import Pagination from "../../modules/Components/Pagination";
import { TableDataType } from "./Datatypes";

interface TableRow {
  [key: string]: string | number | boolean | null | undefined;
}

interface SimpleTableProps {
  tableData: TableDataType;
  height?: string;
  headerColorClass?: string;
  viewHistoryRowId?: string | number | null;
  viewHistoryCheckKey?: any;
  setViewHistoryRow?: (row: TableRow) => void;
  showTotal?: boolean;
}

const SimpleTableWithPagination: React.FC<SimpleTableProps> = ({
  tableData,
  height,
  headerColorClass,
  viewHistoryRowId,
  viewHistoryCheckKey,
  setViewHistoryRow,
}) => {
  const { columns, data, id } = tableData;
  const {
    currentPageData,
    currentPage,
    totalPages,
    nextPage,
    previousPage,
    setCurrentPage,
  } = usePagination(data ?? [], 10);

  useEffect(() => {
    setCurrentPage(0);
  }, [data]);

  return (
    <div className="p-1" style={{ height: height ?? "250px" }}>
      <table id={id} className="table table-bordered table-striped text-center">
        <thead>
          <tr>
            {columns.map((v: any) => (
              <th
                key={`${id}-${v.key}-header`}
                className={`${headerColorClass ?? "active"}`}
                id={`${id}-${v.key}-header`}
                scope="col"
              >
                {v.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentPageData &&
            currentPageData.map((row: any, rowIndex: number) => (
              <tr key={`simple-${id}-${rowIndex}`}>
                {columns.map((col: any, colIndex: number) => (
                  <td
                    key={`simple-${id}-${rowIndex}-${colIndex}`}
                    className={`${
                      viewHistoryRowId &&
                      viewHistoryRowId === row[viewHistoryCheckKey]
                        ? "selected-table-row-color"
                        : ""
                    } ${col?.viewHistory ? "icon-col" : ""}`}
                    style={{ maxWidth: "25em" }}
                  >
                    {col?.type !== "date"
                      ? `${row[col.key] ?? ""}${
                          col.name.includes("%") && !row[col.key].includes("%")
                            ? "%"
                            : ""
                        }`
                      : `${
                          row[col.key] ? convertDateFormatMMM(row[col.key]) : ""
                        }`}
                    {col?.viewHistory && setViewHistoryRow && (
                      <FontAwesomeIcon
                        className="cursor-pointer"
                        color="#4a4443"
                        size="sm"
                        icon={faHistory}
                        onClick={() => setViewHistoryRow(row)}
                      />
                    )}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
      <Pagination
        previousPage={previousPage}
        currentPage={currentPage}
        totalPages={totalPages}
        nextPage={nextPage}
        totalData={data ? data.length : 0}
      />
    </div>
  );
};

export default SimpleTableWithPagination;
