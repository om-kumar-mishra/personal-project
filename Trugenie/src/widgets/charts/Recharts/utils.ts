import { stringNumber } from "../../../lib/services/Datatype";
import { rsSymbol } from "./constants";

export const roundOff = (val: stringNumber) => {
  const numVal = Number(val);
  return Math.round(numVal);
};

export const numConvertK = (val: stringNumber, rs: boolean) => {
  const numVal = Number(val);
  return `${rs ? rsSymbol : ""} ${roundOff(numVal / 1000)}`;
};

export const numConvertM = (val: stringNumber) => {
  const numVal = Number(val);
  return fixedDecimal(numVal / 1000000);
};

export const fixedDecimal = (val: number) => {
  return Number(val) ? numberWithCommasAndFraction(val) : 0;
};

export const fixedDecimalTwo = (val: stringNumber) => {
  return Number(val).toFixed(2);
};

export const numberWithCommas = (number: stringNumber) => {
  const formattedNumber = new Intl.NumberFormat("en-IN").format(Number(number));
  return formattedNumber;
};

export const numberWithCommasAndFraction = (
  number: number,
  fraction = 2
) => {
  const formattedNumber = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: fraction,
    maximumFractionDigits: fraction,
  }).format(number);
  return formattedNumber;
};

export const roundOffWithCommas = (number: number) => {
  return numberWithCommas(Number(roundOff(number)));
};

export const roundToNearestMagnitude = (value: number) => {
  if (value < 100) {
    return Math.ceil(value / 10) * 10;
  } else if (value < 1000) {
    return Math.ceil(value / 100) * 100;
  } else if (value < 10000) {
    return Math.ceil(value / 1000) * 1000;
  } else if (value < 100000) {
    return Math.ceil(value / 10000) * 10000;
  } else if (value < 1000000) {
    return Math.ceil(value / 100000) * 100000;
  } else {
    return Math.ceil(value / 1000000) * 1000000;
  }
};

export const roundToNearestMinMagnitude = (value: number) => {
  if (value < 100) {
    return Math.floor(value / 10) * 10;
  } else if (value < 1000) {
    return Math.floor(value / 100) * 100;
  } else if (value < 10000) {
    return Math.floor(value / 1000) * 1000;
  } else if (value < 100000) {
    return Math.floor(value / 10000) * 10000;
  } else if (value < 1000000) {
    return Math.floor(value / 100000) * 100000;
  } else {
    return Math.floor(value / 1000000) * 1000000;
  }
};

export const minMaxValueOfArrayofObject = (
  arr: any[],
  keys: string[],
  minZero?: boolean
) => {
  if (arr && arr.length > 0) {
    const numberArray: number[] = [];
    arr.forEach((obj) => {
      keys.forEach((key) => {
        numberArray.push(obj?.[key] ? roundOff(obj[key]) : 0);
      });
    });
    if (numberArray.length > 0) {
      const minValue = !minZero
        ? roundToNearestMinMagnitude(Math.min(...numberArray))
        : 0;
      const maxValue = Math.max(...numberArray);
      const maxNear = roundToNearestMagnitude(maxValue);
      return [minValue, maxNear];
    } else return ["auto", "auto"];
  } else return ["auto", "auto"];
};

export const getPercent = (value: number, total: number) => {
  return `${numberWithCommasAndFraction(
    (value / total) * 100,
    import.meta.env.VITE_REACT_APP_PERCENTAGE_DECIMALS
  )}%`;
};

export const getPercentForInvestment = (value: number) => {
  const num = value * 100
  if (num && num % 1 !== 0 && num.toString().split('.')[1].length >= import.meta.env.VITE_REACT_APP_IRR_DECIMAL) {
   
    return num.toFixed(import.meta.env.VITE_REACT_APP_IRR_DECIMAL);
  } else {
    return num.toString();
  }
};

export const formatDealMultiple = (value: number) => {
  const num = Number(value)
  if (num && num % 1 !== 0 && num.toString().split('.')[1].length >= import.meta.env.VITE_REACT_APP_MULTIPLE_DECIMAL) {
    return num.toFixed(import.meta.env.VITE_REACT_APP_MULTIPLE_DECIMAL);
  } else {
    return num.toString();
  }
}

export const checkAllZeroes = (array: any[], key: string) => {
  const arraySet = new Set(array.map((v) => v[key]));
  const arr = Array.from(arraySet);
  return arr.length === 1 && arr[0] === roundOff(Number(arr[0]));
};

export const groupByKeys = (
  dataArr: any,
  groupByKey: string,
  idKey: string,
  valueKey: string
) => {
  const output: Record<string, Record<string, number>> = {};
  const keys = new Set();
  dataArr.forEach((item: any) => {
    if (!output[item[idKey]]) {
      output[item[idKey]] = {};
    }
    if (!output[item[idKey]][item[groupByKey]])
      output[item[idKey]][item[groupByKey]] = Number(item[valueKey]);
    else output[item[idKey]][item[groupByKey]] += Number(item[valueKey]);
    keys.add(item[groupByKey]);
  });
  const result = Object.entries(output).map(([id, key]) => ({
    [idKey]: id,
    ...key,
  }));

  const res: { result: any; keys: any[] } = {
    result,
    keys: [...keys].sort((a, b) => {
      try {
        const vala = String(a);
        const valb = String(b);
        return vala.localeCompare(valb);
      } catch (e) {
        return 0;
      }
    }),
  };
  return res;
};

export const splitIntoPhrases = (input: string, maxlength: number) => {
  const words = input.split(" ");
  const phrases: string[] = [];
  let currentPhrase = "";

  words.forEach((word) => {
    if (currentPhrase.length + word.length < maxlength) {
      if (currentPhrase !== "") {
        currentPhrase += " ";
      }
      currentPhrase += word;
    } else {
      phrases.push(currentPhrase);
      currentPhrase = word;
    }
  });

  if (currentPhrase !== "") {
    phrases.push(currentPhrase);
  }

  return phrases;
};
