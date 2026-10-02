import dayjs from "dayjs";
import { Option } from "react-multi-select-component";
import { IndexSignatureAnyType, IndexSignatureNumberType, stringNumber } from "../lib/services/Datatype";
import { numberWithCommasAndFraction, roundOff } from "../widgets/charts/Recharts/utils";
import { DEFAULT_ALL } from "./constants";

export const convertDateFormat = (dateTimeString: string) => {
  const dateOnly = dateTimeString.split(" ")[0];
  const [year, month, day] = dateOnly.split("-");
  return `${day}-${month}-${year}`;
};
export const getFileExtrension = (filename: any) => {
  //typescrpitchanges
  if (filename) {
    return filename.split(".").pop().toLowerCase();
  }
  return "";
};

export const toTitleCase = (str: string) => {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};
export const parseHTMLString = (htmlString: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const matches = htmlString.match(urlRegex);

  if (!matches) {
    return htmlString; // No URLs found, return the original string
  }

  const uniqueMatches = [...new Set(matches)]; // Remove duplicate URLs
  let parsedString = htmlString;

  uniqueMatches.forEach(url => {
    const anchorTag = '<a href="' + url + '">' + url + "</a>";
    parsedString = parsedString.replace(url, anchorTag);
  });

  return parsedString;
};

export const convertCamelToNormal = (text: string) => {
  const result = text.replace(/([A-Z])/g, " $1");
  const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  return finalResult;
};

export const convertIntoSelectArray = (input: any, labelKey: string, valueKey: string, extraKey?: string, date?: boolean) => {
  return input.map((item: any, index: number) => {
    const label = date && item[labelKey] ? convertDateFormatYY(String(item[labelKey])) : item[labelKey];
    const value = item[valueKey];
    const extra = extraKey ? item[extraKey] : null;
    const id = extra ? `${value}-${extra}-${index}` : `${value}-${index}`;
    return { id, label, value, extra };
  });
};

export const convertSelectedArrayToString = (arr: any, key = "value") => {
  const newarr = Array.isArray(arr) ? arr.map(v => v[key]) : [];
  return newarr.length > 0 ? newarr.join(",") : "";
};

export const sumArrayofObj = (arr: any, key: string, formatValue?: (val: number) => string | number) => {
  const totalValue = arr.reduce((total: number, object: any) => {
    return total + Number(object[key]);
  }, 0);
  return formatValue ? formatValue(totalValue) : Math.round(totalValue).toLocaleString();
};

export const sumArrayofObjFixedTwo = (arr: any, key: string) => {
  return arr
    .reduce((total: number, object: any) => {
      return total + Number(object[key]);
    }, 0)
    .toFixed(2);
};

export const getCurrentDateDDMMYYYY = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm: any = today.getMonth() + 1; // Months start at 0!
  let dd: any = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedToday = dd + "/" + mm + "/" + yyyy;
  return formattedToday;
};

export const getCurrentDateProjectSummaryFormat = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const dd: any = today.getDate();
  const formattedToday = `${dd}${getDaySuffix(dd)} ${monthNames[today.getMonth()]}, ${yyyy}`;
  return formattedToday;
};

export const formatDateWithSuffix = (date?: Date) => {
  const today = date ?? new Date();
  const yyyy = today.getFullYear();
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const dd: any = today.getDate();
  const formattedToday = `${dd}${getDaySuffix(dd)} ${monthNames[today.getMonth()]}, ${yyyy}`;
  return formattedToday;
};

const getDaySuffix = (day: number) => {
  if (day >= 11 && day <= 13) {
    return "th";
  }
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

export const arrSort = (arr: any) => {
  arr.sort((a: any, b: any) => a - b);
  return arr;
};

export const checkAllZeros = (arr: number[]) => {
  const filterArr = arr.filter(v => v <= 0);
  return filterArr.length === arr.length ? [] : arr;
};

export const convertDateFormatMMM = (dateTimeString: any) => {
  const parsedDate = dayjs(dateTimeString);
  if (!parsedDate.isValid()) return "";
  const formattedDate = parsedDate.format("DD-MMM-YYYY");
  return formattedDate;
};

export const convertDateFormatYY = (dateTimeString: string) => {
  const parsedDate = dayjs(dateTimeString);
  if (!parsedDate.isValid()) return "";
  const formattedDate = parsedDate.format(import.meta.env.VITE_REACT_APP_DATE_FORMAT);
  return formattedDate;
};

export const convertDateFormatMMMYY = (dateTimeString: string) => {
  const parsedDate = dayjs(dateTimeString);
  if (!parsedDate.isValid()) return "";
  const formattedDate = parsedDate.format("MMM-YY");
  return formattedDate;
};

export const customValueRendererMultiSelect = (selected: Option[], _options: Option[]) => {
  const len = selected.length;
  if (len === _options.length) return DEFAULT_ALL;
  else if (len) {
    const sel = selected.map(({ label }) => label + ", ");
    sel[len - 1] = sel[len - 1].replace(",", "");
    return sel;
  } else return "Select...";
};

export const ObjectGroupBy = (
  graphData: IndexSignatureAnyType[],
  intialObj: IndexSignatureAnyType,
  groupByKey: string,
  formulaKey?: {
    [key: string]: (obj: IndexSignatureNumberType) => number;
  },
) => {
  const keys = Object.keys(intialObj);
  const formulaKeys = formulaKey ? Object.keys(formulaKey) : [];
  const groupedData =
    graphData && graphData.length > 0
      ? graphData.reduce((result: IndexSignatureAnyType, obj: IndexSignatureAnyType) => {
          const objKey = obj[groupByKey].toString().trim();
          const key = objKey + "GroupBy";
          if (!result?.[key]) {
            result[key] = {
              ...obj,
              ...intialObj,
            };
          }
          keys.forEach(k => {
            result[key][k] += obj[k];
          });
          return result;
        }, {})
      : {};
  const groupValues = Object.values(groupedData);
  if (formulaKey && formulaKeys.length > 0) {
    groupValues.forEach(v =>
      formulaKeys.forEach(k => {
        v[k] = formulaKey[k](v);
      }),
    );
  }
  return groupValues;
};

export const calcAbsorptionRate = (areaSold: number, areaUnSold: number, totalArea?: number) => {
  if (areaUnSold) return roundOff((areaSold / (areaSold + areaUnSold)) * 100);
  else if (totalArea) return roundOff((areaSold / totalArea) * 100);
  else 0;
};

export const calcAvgSalePrice = (soldValue: number, areaSold: number) => {
  return roundOff(soldValue / areaSold);
};

export const getCurrentDate = () => {
  const today: Date = new Date();
  const yyyy: number = today.getFullYear();
  let mm: number | string = today.getMonth() + 1; // Months start at 0!
  let dd: number | string = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedToday = `${dd}/${mm}/${yyyy}`;
  return formattedToday;
};

export const getMonthName = (monthNumber: number) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  if (monthNumber >= 1 && monthNumber <= 12) {
    const monthName = months[monthNumber - 1];
    return monthName;
  } else {
    return "NA";
  }
};

export const sumAllValuesofObjExceptFirstKey = (myObject: { [obj: string]: number }) => {
  const { [Object.keys(myObject)[0]]: _, ...rest } = myObject;
  return Math.round(
    Object.values(rest).reduce((total: number, val: number) => {
      return total + val;
    }, 0),
  ).toLocaleString();
};

export const getMonthsBetweenDates = (
  startDateString: string,
  endDateString: string,
  frequency = "monthly", // Options: 'monthly', 'quarterly', 'half-yearly', 'yearly'
) => {
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);

  const result: string[] = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const monthYearString = currentDate
      .toLocaleString("en-US", { month: "short", year: "2-digit" })
      .split(" ")
      .map((part, index) => (index === 0 ? part.charAt(0).toUpperCase() + part.slice(1) : part))
      .join(" ");
    result.push(monthYearString);

    // Move to the next month based on frequency
    if (frequency === "quarterly") {
      currentDate.setMonth(currentDate.getMonth() + 3);
    } else if (frequency === "half-yearly") {
      currentDate.setMonth(currentDate.getMonth() + 6);
    } else if (frequency === "yearly") {
      currentDate.setFullYear(currentDate.getFullYear() + 1);
    } else {
      currentDate.setMonth(currentDate.getMonth() + 1); // Default to monthly
    }

    currentDate.setDate(1);
  }

  return result;
};

export const convertIntoSelectArrayWithoutKey = (input: any, date?: boolean) => {
  if (input)
    return input.map((v: string, i: number) => ({
      id: `${v}-${i}`,
      label: date && v ? convertDateFormatYY(v) : v,
      value: v,
    }));
  else return [];
};

export const isMonthKey = (key: string) => {
  return key.match(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-\d{2}/);
};

export const checkNegative = (val: stringNumber, checkVal?: stringNumber) => {
  const num = Number(String(checkVal ?? val).replace(",", ""));
  const isNegativeZero = Object.is(num, -0);
  if ((!isNaN(num) && num) || isNegativeZero) {
    return Math.sign(num) === -1 || isNegativeZero
      ? `(${String(val).replace("-", "")})`
      : val;
  } else {
    return num === 0 ? "-" : val;
  }
};

export const getNegativeClass = (val: stringNumber) => {
  const num = Number(String(val).replace(",", ""));
  return Number(num) && Math.sign(Number(num)) === -1 ? "text-danger" : "";
};

export const checkNegativeNumber = (val: stringNumber) => {
  const num = Number(String(val).replace(",", ""));
  return Number(num) && Math.sign(Number(num)) === -1;
};

export const checkZeroValue = (val: stringNumber) => {
  return val === 0 || val === "0" ? "-" : val;
};

// export const sortByKey = (array: any[], key: string) => {
//   return array.sort((a, b) => {
//     let x = a[key];
//     let y = b[key];
//     return x < y ? -1 : x > y ? 1 : 0;
//   });
// };

export const sortByKeyAZ = (array: any[], key: string) => {
  return array.sort((a, b) => a[key].localeCompare(b[key]));
};

export const sortByKeyZA = (array: any[], key: string) => {
  return array.sort((a, b) => b[key].localeCompare(a[key]));
};

export const revertCommaSeperatedNumber = (value: string) => {
  return Number(String(value).replace(/[^0-9.-]/g, ""));
};

export const openInNewTab = (url: string) => {
  const newWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (newWindow) newWindow.opener = null;
};

export const mime_types = {
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  pdf: "application/pdf",
  ppt: "application/vnd.ms-powerpoint",
  pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  xls: "application/vnd.ms-excel",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  svg: "image/svg+xml",
  png: "image/png",
  jpeg: "image/jpeg",
  jpg: "image/jpg",
  autocad: ".dwg",
  csv: "text/csv",
  zip: "application/x-zip-compressed",
};

export const isValidPercentage = (input: string) => {
  // Regular expression to match a percentage with exactly two decimal places
  const num = Number(input);
  const regex = /^\d+(\.\d{1,2})?$/;
  if (num && num > 0 && num <= 100 && regex.test(input)) {
    return true;
  } else {
    return false;
  }
};

export const getEnumKeyByEnumValue = (myEnum: any, enumValue: string | number | boolean) => Object.keys(myEnum)[Object.values(myEnum).indexOf(enumValue)];

export const handleMultiFormatValue = (value: any, format: number) => {
  switch (format) {
    case 1:
      return value;
    case 2:
      return Number(value) ? `${numberWithCommasAndFraction(Number(value) * 100, import.meta.env.VITE_REACT_APP_PERCENTAGE_DECIMALS)}%` : value;
    case 3:
      return Number(value) ? `${numberWithCommasAndFraction(Number(value), import.meta.env.VITE_REACT_APP_MULTIPLE_DECIMAL)}x` : value;
    case 4:
      return convertDateFormatYY(String(value));
    case 5:
      return numberWithCommasAndFraction(Number(value), import.meta.env.VITE_REACT_APP_INR_DECIMALS);
    default:
      return value;
  }
};
