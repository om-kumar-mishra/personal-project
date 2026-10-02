import { faArrowDownAZ, faArrowUpAZ, faEye, faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { checkNegative, checkZeroValue, handleMultiFormatValue, revertCommaSeperatedNumber, sortByKeyAZ, sortByKeyZA } from "../../../utils/commonFunctions";
import SpinnerComponent from "../../Components/SpinnerComponent";

type Column<T> = {
  title: string;
  accessorKey: keyof T | "actions";
  type?: "float" | "round";
  subValueAccessorKey?: keyof T;
  onClick?: (row: any) => void;
  pointer?: any;
  dateFormat?: boolean;
  postSuffix?: string;
  sort?: boolean;
  formatValue?: (value: any, row?: any) => string;
};

type TableProps<T> = {
  columns: Column<T>[];
  preHeaderTitles?: {
    title: string;
    colspan: number;
  }[];
  data: Array<T>;
  finalRow?: ({
    [key in keyof T]?: T[key];
  } & {
    actions?: string;
  })[];
  loader?: boolean;

  containerStyles?: React.CSSProperties;
};

type ViewableProps<T> = {
  isRowViewEnabled?: true;
  handleView?: (row: T) => void;
} & ({ isRowViewEnabled: true; handleView: (row: T) => void } | { isRowViewEnabled?: false });

//If hasAttatchment is true, handleAttatchment should be passed, else Typescript will throw error
type AttatchmentProps<T> = {
  hasAttatchment?: true;
  handleAttatchment?: (row: T) => void;
} & ({ hasAttatchment: true; handleAttatchment: (row: T) => void } | { hasAttatchment?: false });

type CombinedProps<T> = TableProps<T> &
  ViewableProps<T> &
  AttatchmentProps<T> & {
    minHeight?: number | string;
    height?: number | string;
    mergeGrossNetValue?: boolean;
  };

const CommonTableWithActions = <T extends Record<string, any>>(props: CombinedProps<T>) => {
  const {
    columns,
    data = [],
    loader,
    isRowViewEnabled = false,
    handleView,
    hasAttatchment = false,
    handleAttatchment,
    containerStyles,
    finalRow,
    preHeaderTitles,
    minHeight,
    height,
    mergeGrossNetValue = false,
  } = props;

  const [sortedBy, setSortedBy] = useState("");
  const [sortedData, setSortedData] = useState(data);

  useEffect(() => {
    setSortedData(data);
  }, [data]);

  const handleSort = (key: string) => {
    if (sortedBy === key) {
      const sorted = sortByKeyZA(data, key);
      setSortedData(sorted);
      setSortedBy("");
    } else {
      const sorted = sortByKeyAZ(data, key);
      setSortedData(sorted);
      setSortedBy(key);
    }
  };

  return (
    <div
      className='scrollbar-width-thin'
      style={{
        maxHeight: height ?? "250px",
        minHeight: minHeight ?? "auto",
        overflowY: "scroll",
      }}>
      <table className='table' style={containerStyles}>
        <thead>
          {preHeaderTitles && (
            <tr>
              {preHeaderTitles.map((title, index) => (
                <th key={index} colSpan={title.colspan} className={`text-white text-center p-1 ${title.title.length > 0 ? "bg-black" : "bg-white"}`}>
                  {title.title}
                </th>
              ))}
            </tr>
          )}
          <tr>
            {columns?.map((header, index) => (
              <th className={`active-red main-body align-middle ${index === 0 ? "" : "text-center"}`} key={index}>
                {header.title}
                {header.sort && (
                  <FontAwesomeIcon
                    className='sort-icon'
                    // color="#000"
                    size='lg'
                    icon={sortedBy === header.accessorKey ? faArrowUpAZ : faArrowDownAZ}
                    onClick={() => {
                      handleSort(header.accessorKey.toString());
                    }}
                  />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data && sortedData.length > 0 ? (
            sortedData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns?.map((column, cellIndex) => {
                  if (column.accessorKey === "disbursementDate" && !row[column.accessorKey]) {
                    return <td key={cellIndex} className='align-middle text-truncate'></td>;
                  }
                  if (column.accessorKey === "actions")
                    return (
                      <td className='align-middle text-center' key={cellIndex}>
                        {isRowViewEnabled && handleView && (
                          <FontAwesomeIcon
                            id='investmentWiseSummaryListIcon'
                            className='eventHandle'
                            icon={faEye}
                            onClick={() => handleView(row)}
                            style={{ cursor: "pointer" }}
                            width={15}
                          />
                        )}
                        {hasAttatchment && handleAttatchment && (
                          <FontAwesomeIcon
                            icon={faFile}
                            style={{
                              display: !row.fileContainer || !row.filePath || !row.fileName ? "none" : "",
                            }}
                            onClick={() => handleAttatchment(row)}
                          />
                        )}
                      </td>
                    );

                  if (column.accessorKey === "fieldName" && row[column.accessorKey] === "OverDue") {
                    return (
                      <td key={cellIndex} className='align-middle text-truncate'>
                        {row[column.accessorKey]}
                      </td>
                    );
                  }

                  if (
                    row["fieldName"] === "OverDue" &&
                    ["underwrittenPrincipal", "underwrittenInterest", "underwrittenTotal"].includes(column.accessorKey as string)
                  ) {
                    return <td key={cellIndex} style={{ background: "white" }} className={`text-center`}></td>;
                  }

                  // concat investment summary table row data on the basis of gross and net Finanacial Metrics
                  if (
                    mergeGrossNetValue &&
                    row?.financialMetricsName &&
                    (String(row?.financialMetricsName).replace("Gross", "Net") === String(sortedData[rowIndex - 1]?.financialMetricsName) ||
                      String(row?.financialMetricsName).replace("Gross", "Net") === String(sortedData[rowIndex + 1]?.financialMetricsName))
                  ) {
                    return (
                      <td key='' className={cellIndex === 0 ? "" : "text-center"}>
                        {row?.[column.accessorKey] && cellIndex === 0
                          ? String(row[column.accessorKey]).replace("Gross", "Gross / Net")
                          : row?.[column.accessorKey] && (cellIndex === 1 || cellIndex === 2)
                          ? `${handleMultiFormatValue(row?.[column.accessorKey], row?.format)} / ${handleMultiFormatValue(
                              sortedData[
                                String(row?.financialMetricsName).replace("Gross", "Net") === String(sortedData[rowIndex - 1]?.financialMetricsName)
                                  ? rowIndex - 1
                                  : rowIndex + 1
                              ]?.[column.accessorKey],
                              row?.format,
                            )}`
                          : ""}
                      </td>
                    );
                  }
                  // hide investment summary table row data on the basis of gross and net Finanacial Metrics
                  if (
                    mergeGrossNetValue &&
                    row?.financialMetricsName &&
                    (String(row?.financialMetricsName).replace("Net", "Gross") === String(sortedData[rowIndex - 1]?.financialMetricsName) ||
                      String(row?.financialMetricsName).replace("Net", "Gross") === String(sortedData[rowIndex + 1]?.financialMetricsName))
                  ) {
                    return null;
                  }
                  return (
                    <td
                      key={`row-${rowIndex}-cell-${cellIndex}`}
                      className={`align-middle text-truncate ${cellIndex === 0 ? "" : "text-center"} ${
                        column.type === "round" || column.type === "float" ? "text-center" : ""
                      }`}
                      title={row?.[column.accessorKey] ?? "-"}
                      onClick={() => (column?.onClick ? column.onClick(row) : {})}
                      style={column.onClick ? { cursor: "pointer" } : {}}>
                      {row[column.accessorKey] === 0 || row[column.accessorKey] === null
                        ? "-"
                        : row[column.accessorKey] && column.formatValue
                        ? checkNegative(column.formatValue(row[column.accessorKey], row), row[column.accessorKey])
                        : row[column.accessorKey]}
                      {column?.postSuffix && row?.[column.accessorKey] ? column.postSuffix : ""}
                    </td>
                  );
                })}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length ?? 2}>{loader ? <SpinnerComponent /> : ""}</td>
            </tr>
          )}
          {finalRow &&
            finalRow.length > 0 &&
            finalRow.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {Object.values(row).map((value, cellIndex) => (
                  <td
                    key={`row-${rowIndex}-cell-${cellIndex}`}
                    style={{ background: "lightgrey" }}
                    className={`${revertCommaSeperatedNumber(String(value)) || Number(value) === 0 ? "text-center" : "text-center"}`}>
                    {value ? checkZeroValue(value) : ""}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommonTableWithActions;
