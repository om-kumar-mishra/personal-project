import { Text, Tooltip } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import dayjs from "dayjs";
import checkLogo from "../../assets/logos/SVG/Check.svg";
import ExclaminationIcon from "../../assets/logos/SVG/setup_pending.svg";

export const DEFAULT_DATE_FORMAT = "DD-MMM-YYYY";
export const DEFAULT_DATE_TIME_FORMAT = "DD MMM YYYY HH:mm:ss";
export const DEFAULT_TIME_FORMAT = "HH:mm:ss";
export const emailValidationRegex = /^\w+([-+.']\w+)*@(hdfcbank\.com|hdfcbank\.co\.in|in\.hdfcbank\.com|hbctxdom\.com)$/;

export const createAllowedCharRegex = (allowedChars: string[]) => {
  const sanitizedChars = allowedChars.map(char => char.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  // regex pattern
  const regexPattern = allowedChars.length > 0 ? `[^A-Za-z0-9\\s\\${sanitizedChars.join("")}]` : "[^A-Za-z0-9\\s]+";
  return new RegExp(regexPattern, "g");
};

//Shows the value in a presentable format
// export const getPresentableValue = (value: string | null | undefined | number, isDate?: boolean, allowTimeZone = false, withTime = true, onlyTime = false) => {
//   if (value === null || value === undefined) return "-";
//   if (value && isDate)
//     return withTime || onlyTime
//       ? dayjs(value)
//           .utcOffset(0)
//           .format(onlyTime ? DEFAULT_TIME_FORMAT : DEFAULT_DATE_TIME_FORMAT)
//       : dayjs(value).utcOffset(0).format(DEFAULT_DATE_FORMAT);

//   if (typeof value === "string") {
//     if (value.trim().length === 0) return "-";
//     return value;
//   }
//   return value;
// };

export const getPresentableValue = (value: string | null | undefined | number, isDate?: boolean, allowTimeZone = false, withTime = true, onlyTime = false) => {
  if (value === null || value === undefined) return "-";
  if (value && isDate) return dayjs(value).format(withTime ? DEFAULT_DATE_TIME_FORMAT : onlyTime ? DEFAULT_TIME_FORMAT : DEFAULT_DATE_FORMAT);

  if (typeof value === "string") {
    if (value.trim().length === 0) return "-";
    return value;
  }
  return value;
};

export const CustomIcon = ({
  icon,
  onClick,
  tooltipText,
  disabled,
  color,
  rowDisable,
}: {
  icon: string | undefined;
  onClick?: () => void;
  tooltipText?: string;
  disabled: boolean;
  rowDisable: boolean;
  color?: string;
}) => {
  const IconComponent = icon;
  const iconUi = (
    <span>
      <img
        style={{ width: "15px", height: "15px", cursor: disabled ? "not-allowed" : "pointer" }}
        className={`${color} ${rowDisable ? "opacity-50" : ""} ${disabled ? "opacity-50" : ""}`}
        src={IconComponent}
        onClick={onClick}
      />
    </span>
  );
  if (!IconComponent) return null;
  return (
    <>
      {tooltipText && !disabled ? (
        <Tooltip className={disabled ? "disabled-icon" : ""} label={tooltipText} offset={10}>
          {iconUi}
        </Tooltip>
      ) : (
        iconUi
      )}
    </>
  );
};

export const errorNotification = (message: string, title = "Error") => {
  showNotification({
    title: title,
    message: message,
    icon: <img src={ExclaminationIcon} style={{ width: "20px", height: "20px", color: "red" }} />,
    color: "#C73E1D",
    autoClose: 5000,
  });
};

export const successNotification = (message: string, title = "Success") => {
  showNotification({
    title: title,
    message: message,
    icon: <img src={checkLogo} className='icon-size' style={{ width: "20px", height: "20px", color: "green" }} />,
    color: "truboard-primary.0",
    autoClose: 5000,
  });
};

export const getMantineDropdownData = <T extends Record<string, any>>(
  list: Array<T> = [],
  valueKey: keyof T,
  labelKey: keyof T,
  addOption: { label: string; value: string } | null = null,
) => {
  const basicList =
    list && list.length > 0
      ? list
          .map(item => ({
            value: item[valueKey]?.toString(),
            label: item[labelKey] as string,
          }))
          .filter(item => item.value)
      : [];

  if (addOption) {
    basicList.unshift(addOption);
  }

  return basicList;
};

export const numberToCurrencyWordsFormatted = ({
  number,
}: {
  number: number | null | string;
  indianWordsFormat?: boolean;
  useComma?: boolean;
}): string | null => {
  if (number === null) return null;
  if (typeof number === "string") number = parseFloat(number);

  let str = "";
  const priceStr = typeof number === "number" ? number.toFixed(2) : number; // Ensure we always have two decimal places

  if (!isNaN(parseFloat(priceStr)) && parseFloat(priceStr) > 0) {
    // Increased length check to accommodate decimals
    const words: string[] = [];
    const [integerPart, decimalPart] = priceStr.split(".");

    // Process integer part
    if (integerPart !== "0") {
      words.push(`${price_in_words(integerPart)} Rupees`);
    }

    // Process decimal part
    if (Number(decimalPart) > 0) {
      words.push("and");
      words.push(`${price_in_words(decimalPart)} Paise`);
    }

    str = words.join(" ").trim();
  }
  return str;
};

export function price_in_words(price) {
  price = price.toString();
  const sglDigit = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"],
    dblDigit = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"],
    tensPlace = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"],
    handle_tens = function (dgt, prevDgt) {
      return 0 == dgt ? "" : " " + (1 == dgt ? dblDigit[prevDgt] : tensPlace[dgt]);
    },
    handle_utlc = function (dgt, nxtDgt, denom) {
      return (0 != dgt && 1 != nxtDgt ? " " + sglDigit[dgt] : "") + (0 != nxtDgt || dgt > 0 ? " " + denom : "");
    };

  let str = "",
    digitIdx = 0,
    digit = 0,
    nxtDigit = 0;
  const words: string[] = [];

  let extra = "";
  if (price.length > 7) {
    extra = price.substr(0, price.length - 7);
    price = price.substr(price.length - 7, price.length);
  }

  if (((price += ""), isNaN(parseInt(price)))) str = "";
  else if (parseInt(price) > 0 && price.length <= 10) {
    for (digitIdx = price.length - 1; digitIdx >= 0; digitIdx--)
      switch (((digit = price[digitIdx] - 0), (nxtDigit = digitIdx > 0 ? price[digitIdx - 1] - 0 : 0), price.length - digitIdx - 1)) {
        case 0:
          words.push(handle_utlc(digit, nxtDigit, ""));
          break;
        case 1:
          words.push(handle_tens(digit, price[digitIdx + 1]));
          break;
        case 2:
          words.push(0 != digit ? " " + sglDigit[digit] + " Hundred" + (0 != price[digitIdx + 1] && 0 != price[digitIdx + 2] ? " and" : "") : "");
          break;
        case 3:
          words.push(handle_utlc(digit, nxtDigit, "Thousand"));
          break;
        case 4:
          words.push(handle_tens(digit, price[digitIdx + 1]));
          break;
        case 5:
          words.push(handle_utlc(digit, nxtDigit, "Lakh"));
          break;
        case 6:
          words.push(handle_tens(digit, price[digitIdx + 1]));
          break;
        case 7:
          words.push(handle_utlc(digit, nxtDigit, "Crore"));
          break;
        default:
          break;
      }
    str = words.reverse().join("");
  } else str = "";
  if (extra !== "") {
    return price_in_words(extra) + " Crore" + str;
  }
  return str;
}

export const Currency = (props: { value: string | undefined | number | null; currencyCode?: "INR" | "USD" | "EUR"; forceShowDecimals?: boolean }) => {
  const { currencyCode, value, forceShowDecimals = false } = props;
  if (value === undefined || value === null) {
    return null;
  }
  return (
    <div>
      <Text>
        {(currencyCode === "INR" || currencyCode === undefined) && <span>&#8377;</span>}
        {currencyCode === "EUR" && <span>€</span>}
        {currencyCode === "USD" && <span>$</span>}
        &nbsp;
        {forceShowDecimals
          ? parseFloat(value.toString()).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
          : parseFloat(value.toString()).toLocaleString("en-IN")}
      </Text>
    </div>
  );
};

export const handelReponseCode = (
  callBack: ((success: boolean, message?: string) => void) | undefined,
  info: {
    code: number;
    message: string;
  },
  customErrorMessage?: string,
  skipErrorNotification?: boolean,
) => {
  if (!navigator?.onLine) {
    errorNotification("Check Your Internet");
  } else {
    if (info != null && info?.code === 100) {
      callBack && callBack(true, info?.message);
      // successNotification(info.message)
    } else {
      callBack && callBack(false);
      skipErrorNotification === undefined && errorNotification(info?.message ?? customErrorMessage);
    }
  }
  return {
    isError: info?.code !== 100,
  };
};

export const handleDownloadResponseCheck = (
  callBack: ((success: boolean) => void) | undefined,
  result: { fileName: string; data: Blob },
  customErrorMessage?: string,
) => {
  if (!navigator?.onLine) {
    errorNotification("Check Your Internet");
  } else {
    if (result) {
      callBack && callBack(true);
      // successNotification(info.message)
    } else {
      callBack && callBack(false);
      errorNotification(customErrorMessage ?? "");
    }
  }
  return {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    isError: (result === null && result?.info?.code !== 100) || (!navigator?.onLine && result === null),
  };
};

export function formatTimeToString(milliseconds) {
  function pad(number) {
    return (number < 10 ? "0" : "") + number;
  }
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  seconds %= 60;
  minutes %= 60;

  if (hours > 0) {
    return pad(hours) + ":" + pad(minutes) + ":" + pad(seconds) + " hours";
  } else {
    return pad(minutes) + ":" + pad(seconds) + " minutes";
  }
}
