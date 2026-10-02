import { mime_types } from "./commonFunctions";

export const remarkValidation = (val?: string | null) => {
  return val && val.trim().length > 0 && val.length < 4096 ? null : "Invalid Input! Input can not be more than 4096 characters.";
};

export const uploadFileValidation = (value?: File | null) => {
  if (value) {
    const isAllowedType = [mime_types.xls, mime_types.xlsx].join(", ").includes(value?.type);
    const isAllowedSize = Number(value.size / 1000000) < 5 ? true : false;
    if (!isAllowedType) {
      return "Please upload .xls or .xlsx file";
    } else if (!isAllowedSize) {
      return "Invalid file size. File cannot be more than 5mb";
    } else {
      return null;
    }
  } else {
    return "Please upload a File ";
  }
};

export const manadateFieldValidation = (val?: Date | string | number | null) => {
  return !val ? "This field cannot be empty." : null;
};
