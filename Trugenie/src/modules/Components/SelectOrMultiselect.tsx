import React from "react";
import Select from "react-select";
import { MultiSelect, Option } from "react-multi-select-component";
import { customValueRendererMultiSelect } from "../../utils/commonFunctions";

export type dropDownsType = {
  label: string;
  name: string;
  id: string;
  value: string;
  options?: Option[];
  singleSelect?: boolean;
  date?: boolean;
  isClearable?: boolean;
};

export interface DropDownProps {
  [key: string]: any;
}

interface SelectOrMultiselectTypes {
  id: string;
  dropDowns: dropDownsType[];
  dropDownsValue: DropDownProps;
  setDropDownsValue: (obj: DropDownProps) => void;
  selectSize?: number;
}
const SelectOrMultiselect: React.FC<SelectOrMultiselectTypes> = ({
  id,
  dropDowns,
  dropDownsValue,
  setDropDownsValue,
  selectSize,
}) => {
  return (
    <>
      {dropDowns.map((v: dropDownsType) => (
        <div
          key={`${v.name}-${id}`}
          className={`col-md-${
            selectSize ?? 2
          } col-sm-6 d-flex flex-wrap justify-content-between`}
        >
          <label
            className="select-lable mb-1 mt-1"
            htmlFor={`select-${v.name}`}
          >
            {v.label}:
          </label>
          {v?.singleSelect ? (
            <Select
              options={v.options}
              className="p-0 w-100"
              value={dropDownsValue?.[v.name] ?? []}
              onChange={(e: any) => {
                setDropDownsValue({
                  ...dropDownsValue,
                  [v.name]: e,
                });
              }}
              isClearable={v?.isClearable}
            />
          ) : (
            <MultiSelect
              options={v?.options ?? []}
              className="p-0 w-100"
              value={dropDownsValue?.[v.name] ?? []}
              onChange={(e: any) => {
                setDropDownsValue({
                  ...dropDownsValue,
                  [v.name]: e,
                });
              }}
              labelledBy="Select"
              ClearSelectedIcon={true}
              valueRenderer={customValueRendererMultiSelect}
            />
          )}
        </div>
      ))}
    </>
  );
};

export default SelectOrMultiselect;
