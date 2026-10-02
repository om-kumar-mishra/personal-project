import { Box, Button, Flex, Table } from "@mantine/core";
import { DatePickerInput, DatesProvider } from "@mantine/dates";
import { useForm } from "@mantine/form";
import dayjs from "dayjs";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import calendarIcon from "../../../../../assets/logos/calendar.svg";
import withModalMatine from "../../../../../hoc/withModalMatine";
import { selectSetProject } from "../../../../../lib/services/HDFC/Project/selectors";
import { getReraDetailsAction } from "../../../../../lib/services/nocSetup/action";
import { NocAccountDetailsApiData } from "../../../../../lib/services/nocSetup/datatype";
import { selectNocSetup, selectNocSetupLoader } from "../../../../../lib/services/nocSetup/selector";
import FormTableRow from "../../../../Components/FormTableRow";
import { TableRow } from "../../../../Components/TableRow";
import { DEFAULT_DATE_FORMAT } from "../../../../Components/UtilityFunctions";

export type AddAccountDataType = {
  Accounttype: string;
  AccountNumber?: number;
  BankName: string;
  BrnachAddress?: string;
  Towers: string;
  RERANumber: string;
  Startdate?: Date;
  Enddate?: Date;
};

const AddNewAccount: React.FC<{
  setNewAccountDetails?: (obj: NocAccountDetailsApiData) => void;
  closePop?: () => void;
  accountDetails?: NocAccountDetailsApiData[];
}> = ({ setNewAccountDetails, closePop }) => {
  const dispatch = useDispatch();
  const project = useSelector(selectSetProject);
  const nocSetup = useSelector(selectNocSetup);
  const loaders = useSelector(selectNocSetupLoader);

  const formDataIntialValues = {
    Accounttype: "",
    AccountNumber: 0,
    BankName: "",
    Towers: "",
    BrnachAddress: "",
    RERANumber: nocSetup.reraNo,
  };

  const form = useForm<NocAccountDetailsApiData>({
    initialValues: formDataIntialValues,
    validateInputOnChange: true,
    validate: {
      Accounttype: value => (value !== "" ? null : "This field cannot be empty."),
      AccountNumber: value =>
        value
          ? //  accountDetails && accountDetails.length > 0 && accountDetails.find(v => v.AccountNumber === value && v.BankName === form.values.BankName)
            //   ? "Account already added"
            //   :
            String(value).length > 14
            ? "Number can contain 14 or less digits"
            : null
          : "This field cannot be empty.",
      BankName: value =>
        !value || value.trim() === ""
          ? "This field cannot be empty."
          : !/^[\w\d. ]{1,50}$/.test(value)
          ? "Input must be alphanumeric and be limited to 50 characters."
          : null,
      // BrnachAddress: value =>
      //   value != null && !/^[\w\d\s\S]{1,500}$/.test(value)
      //     ? "Address must be alphanumeric, allow special characters, and be limited to 500 characters."
      //     : null,
      Towers: value => (value !== "" && value ? null : "This field cannot be empty."),
      RERANumber: value => (value && !/^[\w\d]{1,100}$/.test(value) ? "Special Characters not allowed." : null),
    },
  });

  useEffect(() => {
    form.setValues({
      RERANumber: nocSetup.reraNo,
    });
  }, [nocSetup.reraNo]);

  useEffect(() => {
    if (nocSetup?.reraNo && form?.values?.Towers) form.setValues({ RERANumber: nocSetup.reraNo });
  }, [form?.values?.Towers]);

  const checkTowers = form?.values?.Towers && Array.isArray(form?.values?.Towers) ? form?.values?.Towers.join(",") : "";

  useEffect(() => {
    form?.values?.Towers &&
      project?.REAssetId &&
      dispatch(getReraDetailsAction(project.REAssetId, form?.values?.Towers && Array.isArray(form?.values?.Towers) ? form?.values?.Towers.join(",") : ""));
  }, [checkTowers]);

  const addAccountFormInputs = useMemo(() => {
    return [
      {
        type: "Select",
        withAsterisk: true,
        title: "Account Type",
        inputProp: "Accounttype",
        options: nocSetup.accountType ?? [],
      },
      {
        type: "NumberInput",
        withAsterisk: true,
        title: "Account Number",
        inputProp: "AccountNumber",
        min: 0,
        maxLength: 14,
      },
      {
        type: "TextInput",
        withAsterisk: true,
        title: "Bank Name",
        inputProp: "BankName",
        maxLength: 50,
      },
      {
        type: "TextInput",
        withAsterisk: false,
        title: "Address",
        inputProp: "BrnachAddress",
        maxLength: 500,
      },
      {
        type: "MultiSelect",
        withAsterisk: true,
        title: "Product Sub Type",
        inputProp: "Towers",
        options: nocSetup.projectTowers ?? [],
      },
      {
        type: "TextInput",
        withAsterisk: false,
        title: "RERA No.",
        inputProp: "RERANumber",
        loading: loaders.reraNo,
        readOnly: nocSetup.reraNo,
        maxLength: 100,
      },
    ];
  }, [nocSetup.projectTowers]);

  return (
    <Box>
      <form
        onSubmit={form.onSubmit(values => {
          if (setNewAccountDetails) {
            const obj: NocAccountDetailsApiData = {
              AccountNumber: values?.AccountNumber,
              Startdate: values?.Startdate ? dayjs(values.Startdate).format("DD-MMM-YY") : undefined,
              Enddate: values.Enddate ? dayjs(values.Enddate).format("DD-MMM-YY") : undefined,
              BankName: values?.BankName,
              Towers: values?.Towers && Array.isArray(values?.Towers) ? values?.Towers.join(",") : "",
              RERANumber: values?.RERANumber,
              Accounttype: values?.Accounttype,
              BrnachAddress: values?.BrnachAddress,
            };
            setNewAccountDetails(obj);
          }
          closePop && closePop();
        })}>
        <Table>
          <tbody>
            <FormTableRow formInputs={addAccountFormInputs} form={form} />
            <TableRow
              title='Bank Account Applicable'
              value={
                <Flex gap='md' align='center' direction='row'>
                  From:
                  <Box w={150}>
                    <DatesProvider settings={{ firstDayOfWeek: 0, weekendDays: [0] }}>
                      <DatePickerInput
                        valueFormat={import.meta.env.VITE_REACT_APP_DATE_FORMAT ?? DEFAULT_DATE_FORMAT}
                        icon={<img src={calendarIcon} style={{ width: "20px", height: "20px", fill: "white" }} color='white' />}
                        maxDate={form?.values?.Enddate ? new Date(form.values.Enddate) : new Date()}
                        {...form.getInputProps("Startdate")}
                      />
                    </DatesProvider>
                  </Box>
                  To:
                  <Box w={150}>
                    <DatesProvider settings={{ firstDayOfWeek: 0, weekendDays: [0] }}>
                      <DatePickerInput
                        valueFormat={import.meta.env.VITE_REACT_APP_DATE_FORMAT ?? DEFAULT_DATE_FORMAT}
                        icon={<img src={calendarIcon} style={{ width: "20px", height: "20px", fill: "white" }} color='white' />}
                        minDate={form?.values?.Startdate ? new Date(form.values.Startdate) : undefined}
                        {...form.getInputProps("Enddate")}
                      />
                    </DatesProvider>
                  </Box>
                </Flex>
              }
            />
          </tbody>
        </Table>
        <Flex justify={"end"} my='md'>
          <Button color='truboard-primary.0' type='submit'>
            Submit
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

const AddNewAccountModal = withModalMatine(AddNewAccount);

export default AddNewAccountModal;
