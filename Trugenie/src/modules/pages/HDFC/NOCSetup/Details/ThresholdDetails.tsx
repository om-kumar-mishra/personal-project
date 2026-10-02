import { Box, Card, Table, Text, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Dayjs } from "dayjs";
import React, { useCallback, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../../../lib/common/appState";
import { priceHeaderSelect } from "../../../../../lib/services/nocSetup/datatype";
import { selectNocSetupLoader } from "../../../../../lib/services/nocSetup/selector";
import { isValidPercentage } from "../../../../../utils/commonFunctions";
import FormTableRow from "../../../../Components/FormTableRow";
import { useStyles } from "../../../../Components/TableRow";

export type ThreshholdDataType = {
  minimumSPTolerance?: string;
  advancedPayment?: string;
  advancedPaymentTolerance?: string;
  thresholdDate?: Dayjs | Date | null;
  thresholdType?: string;
  nocPriceHeaders?: number[];
  avgPriceCalc?: string;
  period?: string | number;
  enablePrefence?: boolean;
  periodInput?: string;
};

const ThresholdDetails: React.FC<{
  review?: boolean;
  thresholdDetails?: ThreshholdDataType;
  setThresholdDetails: (obj: ThreshholdDataType) => void;
  setThresHoldError?: (b: boolean) => void;
}> = ({ review, thresholdDetails, setThresholdDetails, setThresHoldError }) => {
  const { classes } = useStyles();
  const nocSetup = useSelector((state: AppState) => state.nocSetup);
  const nocSetupLoader = useSelector(selectNocSetupLoader);

  const formDataIntialValues = useMemo(() => {
    return {
      minimumSPTolerance: thresholdDetails?.minimumSPTolerance ?? "",
      advancedPayment: thresholdDetails?.advancedPayment ?? "",
      advancedPaymentTolerance: thresholdDetails?.advancedPaymentTolerance ?? "",
      thresholdDate: thresholdDetails?.thresholdDate ?? undefined,
      thresholdType: thresholdDetails?.thresholdType ?? "",
      nocPriceHeaders: thresholdDetails?.nocPriceHeaders ?? [],
      avgPriceCalc: thresholdDetails?.avgPriceCalc ?? "",
      period: thresholdDetails?.period ?? undefined,
      enablePrefence: thresholdDetails?.enablePrefence ?? false,
      periodInput: thresholdDetails?.periodInput ?? "",
    };
  }, [thresholdDetails]);

  const form = useForm<ThreshholdDataType>({
    initialValues: formDataIntialValues,
    validateInputOnChange: true,
    validate: {
      minimumSPTolerance: value => (value && isValidPercentage(value) ? null : "Value can be beetween 0 to 100 and upto 2 decimals."),
      advancedPayment: value => (value && isValidPercentage(value) ? null : "Value can be beetween 0 to 100 and upto 2 decimals."),
      advancedPaymentTolerance: value => (value && isValidPercentage(value) ? null : "Value can be beetween 0 to 100 and upto 2 decimals."),
      periodInput: value => ((!value && form.values.period !== -1) || (value && Number(value)) ? null : "Value can be number only."),
    },
  });

  useEffect(() => {
    setThresholdDetails(form.values);
  }, [form.values]);

  const errorSets = useCallback(() => {
    if (setThresHoldError && form.errors) {
      if (form.values.period == -1 && !form.values.periodInput)
        form.setErrors((error: any) => ({ ...error, periodInput: "This field cannot be empty or less than 1." }));
      setThresHoldError(Object.keys(form.errors).length > 0);
    }
  }, [form.errors]);

  useEffect(() => {
    errorSets();
  }, [form.errors]);

  useEffect(() => {
    if (nocSetup.priceHeaders && nocSetup.priceHeaders.length > 0 && !form.values.priceHeaders) {
      form.setFieldValue(
        "priceHeaders",
        nocSetup.priceHeaders.filter((v: priceHeaderSelect) => v.isselected === 1),
      );
    }
  }, [nocSetup.priceHeaders]);

  const threshholdFormInputs = useMemo(() => {
    return [
      {
        type: "TextInput",
        withAsterisk: false,
        title: "MSP Margin of Tolerance (%)",
        inputProp: "minimumSPTolerance",
        disabled: review ?? false,
      },
      {
        type: "TextInput",
        withAsterisk: false,
        title: "Minimum Advance Payment (%)",
        inputProp: "advancedPayment",
        disabled: review ?? false,
      },
      {
        type: "TextInput",
        withAsterisk: false,
        title: "Advance Payment Margin of Tolerance(%)",
        inputProp: "advancedPaymentTolerance",
        disabled: review ?? false,
      },
      {
        type: "DatePickerInput",
        withAsterisk: false,
        title: "Threshold Date",
        inputProp: "thresholdDate",
        disabled: review ?? false,
        maxDate: new Date(),
      },
      {
        type: "Select",
        withAsterisk: false,
        title: "Threshold Type",
        inputProp: "thresholdType",
        options: nocSetup.thresholdType ?? [],
        disabled: review ?? false,
      },
    ];
  }, [nocSetup.thresholdType, review]);

  const mspBasedOnFormInputs = useMemo(() => {
    return [
      {
        type: "MultiSelect",
        withAsterisk: false,
        title: "Price Headers",
        inputProp: "nocPriceHeaders",
        options: nocSetup.priceHeaders ?? [],
        disabled: review ?? false,
      },
      {
        type: "Select",
        withAsterisk: false,
        title: "Average Price Calculated for",
        inputProp: "avgPriceCalc",
        options: nocSetup.projectType ?? [],
        disabled: review ?? false,
      },
      {
        type: "Select",
        withAsterisk: false,
        title: "Period (in Months) ",
        inputProp: "period",
        options: nocSetup.period ?? [],
        disabled: review ?? false,
        hide: review && !["1", "3", "6", "12"].includes(form.values.period),
      },
      {
        type: "NumberInput",
        withAsterisk: !review,
        title: "Period (in Months) ",
        inputProp: "periodInput",
        min: 0,
        max: 999,
        disabled: review ?? false,
        hide: review && ["1", "3", "6", "12"].includes(form.values.period),
      },
      {
        type: "Switch",
        withAsterisk: false,
        title: "Enable Preferences",
        inputProp: "enablePrefence",
        disabled: review ?? false,
      },
    ];
  }, [nocSetup.projectType, nocSetup.period, review, nocSetup.priceHeaders]);

  return (
    <>
      <Box my='xl'>
        <Title className='ps-4' order={4}>
          Threshold Details
        </Title>
        <Card shadow='sm' radius='md' padding='md' m={"md"} withBorder>
          <form>
            <Table>
              <tbody>
                <FormTableRow formInputs={threshholdFormInputs} form={form} review={review} />
                <tr className={classes.row}>
                  <th className={classes.header}>
                    <Text c='gray' fw={500} size='sm'>
                      MSP based on
                    </Text>
                  </th>
                  <th className={classes.header}></th>
                </tr>
                <FormTableRow
                  formInputs={form.values.period == -1 ? mspBasedOnFormInputs : mspBasedOnFormInputs.filter(v => v.inputProp !== "periodInput")}
                  form={form}
                  review={review}
                />
              </tbody>
            </Table>
          </form>
        </Card>
      </Box>
    </>
  );
};

export default ThresholdDetails;
