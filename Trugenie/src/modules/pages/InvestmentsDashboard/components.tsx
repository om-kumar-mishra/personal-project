import React from "react";
import { isObject } from "lodash";
import { centerContent, styles } from "./styles";
import { checkNegative } from "../../../utils/commonFunctions";
import SpinnerComponent from "../../Components/SpinnerComponent";
import { Card, Flex, Text, createStyles } from "@mantine/core";

export const SmallCard = ({
  title,
  value,
}: {
  title: string;
  value: string;
}) => {
  return (
    <div className="card fixed" style={styles.card}>
      <div className=" relative bg-danger text-white" style={styles.cardTitle}>
        {title}
      </div>
      <div className="card-body sales-graph-heading">{value} </div>
    </div>
  );
};

export const LargeCard = (props: any) => {
  const { title, containerStyles, rightContent } = props;
  return (
    <div
      className="px-4"
      style={{
        ...styles.largeCard,
        ...containerStyles,
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        borderRadius: "15px",
        margin: "0.7rem",
        /* padding: 0.75em; */
      }}
    >
      {title && (
        <PageTitle title={title} rightContent={rightContent} variant="h5" />
      )}
      {props.children}
    </div>
  );
};

type tableDataType = {
  [key: string]: string | number | undefined;
};

export const BorderedPlainTable = ({
  data,
  finalRow,
  additionalFinalRow,
  loader = false,
  preHeaderTitles,
  header,
  formatValueArr,
  hideIndex,
}: {
  data:
    | {
        [key: string]: string | number | tableDataType;
      }[]
    | null;
  finalRow?: {
    [key: string]: string | number | undefined;
  }[];
  additionalFinalRow?: {
    [key: string]: string | number | undefined;
  }[];
  loader?: boolean;
  preHeaderTitles?: {
    title: string;
    colspan: number;
  }[];
  header?: string[];
  formatValueArr?: ((value: any) => string | number)[];
  hideIndex?: number[];
}) => {
  return (
    <table className="rounded-corners text-center my-2">
      <thead>
        {preHeaderTitles && (
          <tr>
            {preHeaderTitles.map((title, index) => (
              <th
                key={index}
                colSpan={title.colspan}
                className={` text-white text-center p-1 ${
                  title.title.length > 0 ? "bg-black" : "bg-white"
                }`}
                style={{
                  borderTopLeftRadius: index === 0 ? "10px" : "0",
                  borderTopRightRadius:
                    index === preHeaderTitles.length - 1 ? "10px" : "0",
                }}
              >
                {title.title}
              </th>
            ))}
          </tr>
        )}
        {header && (
          <tr>
            {header.map((headerItem, index) => (
              <th
                key={index}
                className={`text-white text-center p-1 ${
                  headerItem.length > 0 ? "tab-btn-active" : "tab-btn-active"
                }`}
              >
                {headerItem}
              </th>
            ))}
          </tr>
        )}
      </thead>
      <tbody>
        {finalRow &&
          finalRow.length > 0 &&
          finalRow.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {/* This does not take key into consideration, only value matters and mapped accordingly
              If you want to show key, then you can use Object.entries and map accordingly */}
              {Object.values(row).map((value, cellIndex) => (
                <td
                  key={`row-${rowIndex}-cell-${cellIndex}`}
                  className="align-middle"
                  style={
                    cellIndex === 0
                      ? {
                          background: "lightgrey",
                        }
                      : cellIndex === Object.values(row).length - 1
                      ? {
                          background: "lightgrey",
                        }
                      : { background: "lightgrey", paddingLeft: "5px" }
                  }
                >
                  {value
                    ? formatValueArr && formatValueArr?.[cellIndex]
                      ? checkNegative(formatValueArr[cellIndex](value), value)
                      : value
                    : "-"}
                </td>
              ))}
            </tr>
          ))}
        {data && data.length > 0
          ? data.map((item, index) => (
              <tr key={index}>
                {Object.values(item).map((value, cellIndex) => {
                  //if value is sent as Object, for Example for latestValue, show as table with 2 rows
                  //This does not take key into consideration, only value matters and mapped accordingly
                  if (isObject(value)) {
                    return (
                      <td
                        key={`row-${index}-cell-${cellIndex}`}
                        className="w-50"
                      >
                        <table className="w-100 text-center">
                          <tbody
                            className={`d-flex gap-1 justify-content-center align-items-center flex-column w-100`}
                          >
                            {/* show first row as normal td, and second row as rounded td with latestValue styles */}
                            {/* This does not take key into consideration, only value matters and mapped accordingly */}
                            {/* If you want to show key, then you can use Object.entries and map accordingly */}
                            {Object.values(value).map((val, index) => {
                              if (index === 0)
                                return (
                                  <tr key={index}>
                                    <td>
                                      {val && Number(val) !== 0
                                        ? formatValueArr &&
                                          formatValueArr?.[cellIndex]
                                          ? formatValueArr[cellIndex](val)
                                          : val
                                        : "-"}
                                    </td>
                                  </tr>
                                );
                              else
                                return (
                                  <tr key={`row-${index}`}>
                                    <td
                                      key={index}
                                      className="rounded-pill"
                                      style={
                                        val
                                          ? {
                                              background: "lightpink",
                                              width: "100px",
                                            }
                                          : {}
                                      }
                                    >
                                      {/* {val ? fixedDecimal(Number(val)) : ""} */}
                                      {val && Number(val) !== 0
                                        ? formatValueArr &&
                                          formatValueArr?.[cellIndex]
                                          ? formatValueArr[cellIndex](val)
                                          : val
                                        : ""}
                                    </td>
                                  </tr>
                                );
                            })}
                          </tbody>
                        </table>
                      </td>
                    );
                  } else {
                    return (
                      <td key={`row-${index}-cell-${cellIndex}`}>
                        {value
                          ? formatValueArr && formatValueArr?.[cellIndex]
                            ? checkNegative(
                                formatValueArr[cellIndex](value),
                                value
                              )
                            : value
                          : "-"}
                      </td>
                    );
                  }
                })}
              </tr>
            ))
          : data !== null && (
              <tr>
                <td colSpan={7}>
                  <div className="d-flex justify-content-center align-items-center">
                    {loader ? (
                      <SpinnerComponent />
                    ) : (
                      <strong>No Data Found!</strong>
                    )}
                  </div>
                </td>
              </tr>
            )}

        {/* Final row for total */}
        {/* There can be multiple final rows */}
        {additionalFinalRow &&
          additionalFinalRow.length > 0 &&
          additionalFinalRow.map((row, rowIndex) => (
            <tr key={`additional-final-row-${rowIndex}`}>
              {Object.values(row).map((value, cellIndex) => (
                <td
                  key={`additional-final-row-${rowIndex}-cell-${cellIndex}`}
                  className="align-middle"
                  style={{
                    background: "lightgrey",
                    paddingLeft: cellIndex === 0 ? "0.01px" : "5px",
                    borderBottomLeftRadius: cellIndex === 0 ? "10px" : "0",
                    borderBottomRightRadius:
                      cellIndex === Object.values(row).length - 1
                        ? "10px"
                        : "0",
                  }}
                >
                  {/* {cellIndex !== 0 && value
                    ? fixedDecimal(Number(value))
                    : value} */}
                  {value
                    ? formatValueArr && formatValueArr?.[cellIndex]
                      ? checkNegative(formatValueArr[cellIndex](value), value)
                      : value
                    : "-"}
                </td>
              ))}
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export const PageTitle = ({
  title,
  rightContent,
  variant = "h4",
}: {
  title: string;
  rightContent?: React.ReactElement<HTMLElement> | null;
  variant?: keyof React.ReactHTML;
}) => {
  const Variant = variant as keyof React.ReactHTML;

  return (
    <div className={centerContent}>
      {Variant === "h4" ? (
        <h4 className="p-1 main-color dashboard-heading">{title}</h4>
      ) : (
        React.createElement(
          Variant,
          { className: "p-1  dashboard-heading table-heading" },
          title
        )
      )}
      {rightContent}
    </div>
  );
};


export const cardStyles = createStyles(theme => ({
  textBlue: {
    color: "#001d56",
    fontWeight: "bold",
  },
  textOrange: {
    color: "orange",
    fontWeight: "bold",
  },
  IconSizeOne: {
    paddingTop: "10px",
    height: "50px",
    width: "50px",
  },
  IconSizeTwo: {
    height: "60px",
    width: "70px",
  },
  selectedCard: {
    backgroundColor: "#dce5ff !important",
    cursor: "pointer",
    border: "1px solid #D3D3D3",
  },
  unSelectedCard: {
    backgroundColor: "#ffffff !important",
    border: "1px solid #D3D3D3",
    cursor: "pointer",
  },
}));


export const FilterCardsWithIcon = (props: { icon: string; title: string; count: number | string; clickHandler: () => void, selectedFilterCard: boolean }) => {
  const { icon, title, count, selectedFilterCard, clickHandler } = props;
  const { classes } = cardStyles();

  return (
    <Card
      title={""}
      h={80}
      onClick={clickHandler}
      className={selectedFilterCard ? classes.selectedCard : classes.unSelectedCard}>
      <Flex gap={20}>
        <img src={icon} className={classes.IconSizeOne} />
        <div>
          <Text title='' className={classes.textBlue}>
            {title}
          </Text>
          <Text className={classes.textOrange}>{count}</Text>
        </div>
      </Flex>
    </Card>
  );
};
