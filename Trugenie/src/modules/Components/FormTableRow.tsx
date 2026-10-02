import { MultiSelect, NumberInput, Select, SelectItem, Switch, Text, TextInput, Checkbox } from "@mantine/core";
import { DatePickerInput, DatesProvider } from "@mantine/dates";
import { UseFormReturnType } from "@mantine/form";
import calendarIcon from "../../assets/logos/SVG/calendar.svg";
import React from "react";
import { DATE_FORMAT } from "../../utils/constants";
import { TableRow } from "./TableRow";
import { getPresentableValue } from "./UtilityFunctions";

export type formInputsType = {
  type: string;
  withAsterisk: boolean;
  title: string;
  placeholder?: string;
  inputProp: string;
  disabled?: boolean;
  min?: number;
  max?: number;
  maxLength?: number;
  minDate?: Date;
  maxDate?: Date;
  hide?: boolean;
  options?: (string | SelectItem | any)[];
  readOnly?: boolean;
  checked?:boolean;
};

const FormTableRow: React.FC<{
  formInputs: formInputsType[];
  form: UseFormReturnType<any>;
  review?: boolean;
}> = ({ formInputs, form, review = false }) => {
  return (
    <>
      {formInputs.map(
        (input: formInputsType) =>
          !input.hide && (
            <TableRow
              key={`${input.inputProp}form`}
              withAsterisk={input.withAsterisk}
              title={input.title}
              value={
                !review ? (
                  input.type === "TextInput" ? (
                    <TextInput
                      readOnly={input.readOnly ?? false}
                      placeholder={!review ? input?.placeholder ?? input.title : ""}
                      withAsterisk={input.withAsterisk}
                      disabled={input.disabled}
                      maxLength={input?.maxLength}
                      {...form.getInputProps(input.inputProp)}
                    />
                  ) : input.type === "NumberInput" ? (
                    <NumberInput
                      placeholder={!review ? input?.placeholder ?? input.title : ""}
                      withAsterisk={input.withAsterisk}
                      min={input?.min}
                      hideControls
                      max={input?.max}
                      disabled={input.disabled}
                      maxLength={input?.maxLength}
                      mt='sm'
                      {...form.getInputProps(input.inputProp)}
                    />
                  ) : input.type === "Select" ? (
                    <Select
                      searchable
                      placeholder={!review ? input?.placeholder ?? input.title : ""}
                      data={input.options ?? []}
                      disabled={input.disabled}
                      {...form.getInputProps(input.inputProp)}
                    />
                  ) : input.type === "DatePickerInput" ? (
                    <DatesProvider settings={{ firstDayOfWeek: 0, weekendDays: [0] }}>
                      <DatePickerInput
                        disabled={input.disabled}
                        minDate={input?.minDate}
                        maxDate={input?.maxDate}
                        valueFormat={DATE_FORMAT}
                        icon={<img src={calendarIcon} style={{ width: "20px", height: "20px", fill: "white" }} color='white' />}
                        {...form.getInputProps(input.inputProp)}
                      />
                    </DatesProvider>
                  ) : input.type === "MultiSelect" ? (
                    <MultiSelect
                      searchable
                      placeholder={!review ? input?.placeholder ?? input.title : ""}
                      disabled={input.disabled}
                      data={input?.options ?? []}
                      {...form.getInputProps(input.inputProp)}
                    />
                  ) : input.type === "Checkbox" ? (
                    <Checkbox {...form.getInputProps(input.inputProp)} />
                  ) : (
                    <Switch size='md' disabled={input.disabled} checked={form.values?.[input.inputProp]} {...form.getInputProps(input.inputProp)} />
                  )
                ) : input.type === "DatePickerInput" ? (
                  form?.values?.[input.inputProp] ? (
                    getPresentableValue(form?.values?.[input.inputProp], true, false, false)
                  ) : null
                ) : input.type === "Switch" ? (
                  form?.values?.[input.inputProp] ? (
                    <Text color='green'>Yes</Text>
                  ) : (
                    <Text>No</Text>
                  )
                ) : input.type === "MultiSelect" ? (
                  input.options
                    ?.filter((item: SelectItem) => form?.values?.[input.inputProp].includes(item.value))
                    .map(item => item.label)
                    .join(", ")
                ) : (
                  form?.values?.[input.inputProp]
                )
              }
            />
          ),
      )}
    </>
  );
};

export default FormTableRow;
