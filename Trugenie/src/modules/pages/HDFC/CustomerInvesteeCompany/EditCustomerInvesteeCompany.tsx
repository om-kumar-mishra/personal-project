import { Button, Flex, Modal, Table, Text, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import editIcon from "../../../../assets/logos/SVG/Edit.svg";
import { getTaggedRMUserListRequested } from "../../../../lib/services/HDFC/Commons/actions";
import { editCustomerInvesteeRequested, getCustomerInvesteeListRequested } from "../../../../lib/services/HDFC/CustomerInvesteeCompany/actions";
import { CustomerInvesteeListDataType } from "../../../../lib/services/HDFC/CustomerInvesteeCompany/dataTypes";
import { selectCustomerInvesteeLoaders } from "../../../../lib/services/HDFC/CustomerInvesteeCompany/selectors";
import { selectUserDetails } from "../../../../lib/services/hdfc_login/selectors";
import { successNotification } from "../../../../utils/notifications";
import { TableRow } from "../../../Components/TableRow";
import { getPresentableValue } from "../../../Components/UtilityFunctions";
import { selectSwitchClient } from "../../../../lib/services/HDFC/Commons/selectors";
import { GetClientData } from "../../../../lib/services/HDFC/Commons/dataTypes";
type FormData = {
  investee_company: string;
  identity_number: string;
  cin: number;
  pan: string;
  gst: string;
  address: string;
  remarks: string;
};

const EditCustomerInvesteeCompanyModal = ({
  open,
  onClose,
  customerInvesteeData,
}: {
  customerInvesteeData: CustomerInvesteeListDataType | null;
  open: boolean;
  onClose: () => void;
}) => {
  const dispatch = useDispatch();
  const userDetails = useSelector(selectUserDetails);
  const loaders = useSelector(selectCustomerInvesteeLoaders);
  const activeClient = useSelector(selectSwitchClient) as GetClientData;

  const form = useForm<FormData>({
    initialValues: {
      investee_company: customerInvesteeData?.["investee_company"] || "",
      identity_number: customerInvesteeData?.["identity_number"] || "",
      cin: customerInvesteeData?.["cin"] || "",
      pan: customerInvesteeData?.["pan"] || "",
      gst: customerInvesteeData?.["gst"] || "",
      address: customerInvesteeData?.["address"] || "",
      remarks: "",
    },
    validate: {
      investee_company: value => {
        if (value.trim() === "") {
          return "This field cannot be empty.";
        } else if (!/^[\w\d\s\S]{1,100}$/.test(value)) {
          return "Borrower must be alphanumeric, allow special characters, and be limited to 100 characters.";
        } else {
          return null;
        }
      },
      // pan: value => {
      //   if (value.trim() === "") {
      //     return "This field cannot be empty.";
      //   } else if (!/^[A-Z]{5}\d{4}[A-Z]$/.test(value)) {
      //     return "Invalid PAN format. It should be ten characters long, with the first five characters being uppercase alphabets, followed by four numbers, and ending with an uppercase alphabet.";
      //   } else {
      //     return null;
      //   }
      // },
      gst: value => {
        if (value.trim() === "") {
          return "This field cannot be empty.";
        } else if (!/^\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/.test(value)) {
          return "Invalid GST format. It should be 15 characters long, with specific character requirements.";
        } else {
          return null;
        }
      },
      address: value => {
        if (value.trim() === "") {
          return "This field cannot be empty.";
        } else {
          return null;
        }
      },
      remarks: value => {
        if (value.trim() === "") {
          return "This field cannot be empty.";
        } else if (!/^[\w\d\s\S]{1,500}$/.test(value)) {
          return "Remarks must be alphanumeric, allow special characters, and be limited to 500 characters.";
        } else {
          return null;
        }
      },
    },
  });

  useEffect(() => {
    form.setValues({
      investee_company: customerInvesteeData?.["customerinvesteecompany"] || "",
      identity_number: customerInvesteeData?.["CIN"] || "",
      pan: customerInvesteeData?.["PAN"] || "",
      gst: customerInvesteeData?.["GST"] || "",
      address: customerInvesteeData?.["Address"] || "",
      remarks: "",
    });
  }, [customerInvesteeData]);

  useEffect(() => {
    if (customerInvesteeData?.DeveloperID && userDetails?.EmailId) {
      dispatch(getTaggedRMUserListRequested(userDetails?.EmailId ?? "", customerInvesteeData?.DeveloperID));
    }
  }, [customerInvesteeData?.DeveloperID]);

  const actionCallback = (success: boolean) => {
    if (success) {
      successNotification("Borrower Updated Successfully!");
      dispatch(getCustomerInvesteeListRequested(activeClient.ClientId, userDetails?.EmailId ?? ""));
      onClose();
      form.reset();
    }
  };

  const handleFormSubmit = (data: FormData) => {
    dispatch(
      editCustomerInvesteeRequested(
        customerInvesteeData?.BorrowerDetailId as number,
        data.investee_company,
        data.identity_number,
        userDetails?.EmailId as any,
        data.gst,
        data.pan,
        data.address,
        data?.remarks ?? "",
        actionCallback,
      ),
    );
  };
  const handelReset = () => {
    form.setValues({
      investee_company: customerInvesteeData?.["customerinvesteecompany"] || "",
      identity_number: customerInvesteeData?.["CIN"] || "",
      pan: customerInvesteeData?.["PAN"] || "",
      gst: customerInvesteeData?.["GST"] || "",
      address: customerInvesteeData?.["Address"] || "",
      remarks: "",
    });
  };
  return (
    <Modal
      size={"lg"}
      opened={open}
      onClose={() => {
        onClose();
        form.reset();
      }}
      title={
        <Flex gap={"xs"}>
          <img src={editIcon} style={{ width: "20px", height: "20px", color: "#001d56" }} />
          <Text size={"md"} fw='bold' color={"#001d56"}>
            Edit Borrower
          </Text>
        </Flex>
      }>
      <form onSubmit={form.onSubmit(handleFormSubmit)} onReset={form.reset}>
        <Table>
          <tbody>
            <TableRow title={"Group"} value={customerInvesteeData?.customergroup || ""} />
            <TableRow
              title={"Borrower"}
              withAsterisk
              value={<TextInput maxLength={100} placeholder='Edit Borrower Name' {...form.getInputProps("investee_company")} />}
            />
            <TableRow
              title={"Identity Number (CIN/LLPIN etc)"}
              value={<TextInput placeholder='Edit unique Identity Number' maxLength={50} {...form.getInputProps("identity_number")} />}
            />
            {/* <TableRow withAsterisk title={"PAN"} value={<TextInput maxLength={10} placeholder='Edit PAN of the Company' {...form.getInputProps("pan")} />} /> */}
            <TableRow withAsterisk title={"GST"} value={<TextInput maxLength={15} placeholder='Edit GST of the Company' {...form.getInputProps("gst")} />} />
            <TableRow
              withAsterisk
              title={"Address"}
              value={<TextInput maxLength={500} placeholder='Edit Address of the Company' {...form.getInputProps("address")} />}
            />
            <TableRow
              title='Last Edited By/On:'
              value={
                <>
                  <Text>{customerInvesteeData?.lastEditBy ?? customerInvesteeData?.CreatedBy}</Text>
                  <Text>{getPresentableValue(customerInvesteeData?.lastediton ?? customerInvesteeData?.CreatedAt, true, false) as string}</Text>
                </>
              }
            />
            <TableRow title={"Remarks"} withAsterisk value={<Textarea maxLength={500} placeholder='Enter Remarks' {...form.getInputProps("remarks")} />} />
          </tbody>
        </Table>
        <Flex justify={"end"} gap={"xl"}>
          <Button className='reset-btn-onhover' variant='outline' onClick={handelReset}>
            Reset
          </Button>
          <Button color='truboard-primary.0' type='submit' loading={loaders.editCustomerInvestee}>
            Submit
          </Button>
        </Flex>
      </form>
    </Modal>
  );
};

export default EditCustomerInvesteeCompanyModal;
