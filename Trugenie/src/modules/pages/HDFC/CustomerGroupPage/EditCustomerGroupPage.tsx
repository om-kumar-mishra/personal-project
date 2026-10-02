import { Button, Flex, Modal, Space, Table, Text, TextInput, Textarea,Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import editIcon from "../../../../assets/logos/SVG/Edit.svg";
import { selectSwitchClient } from "../../../../lib/services/HDFC/Commons/selectors";
import { editCustomerGroupRequested, getCustomerGroupListRequested } from "../../../../lib/services/HDFC/CustomerGroupServices/actions";
import { CustomerGroupListDataType } from "../../../../lib/services/HDFC/CustomerGroupServices/dataTypes";
import { selectCustomerGroupLoaders } from "../../../../lib/services/HDFC/CustomerGroupServices/selectors";
import { selectUserDetails } from "../../../../lib/services/hdfc_login/selectors";
import { TableRow } from "../../../Components/TableRow";
import { successNotification } from "../../../Components/UtilityFunctions";
import { GetClientData } from "../../../../lib/services/HDFC/Commons/dataTypes";
import {selectDevLocationList} from "../../../../lib/services/HDFC/DeveloperLocation/selectors"
import {LocationListDataType} from "../../../../lib/services/HDFC/DeveloperLocation/dataTypes"

type FormData = {
  remark: string;
  customerGroup: string;
  location:string;
};

const EditCustomerGroupPageModal = ({
  open,
  onClose,
  customerGroupData,
}: {
  customerGroupData: CustomerGroupListDataType | null;
  open: boolean;
  onClose: () => void;
  isEdit?: boolean;
}) => {
  const dispatch = useDispatch();
  const userDetails = useSelector(selectUserDetails);
  const loaders = useSelector(selectCustomerGroupLoaders);
  const activeClient = useSelector(selectSwitchClient) as GetClientData;
  const developerList = useSelector(selectDevLocationList);

  const form = useForm<FormData>({
    initialValues: {
      remark: "",
      customerGroup: "",
      location:"",
    },
    validateInputOnChange: true,
    validate: {
      customerGroup: value => {
        if (value.trim() === "") {
          return "Group cannot be empty.";
        } else if (!/[a-zA-Z0-9!@#$%^&*()_+=[\]{};':"|,.<>/? ]{1,100}$/.test(value)) {
          return "Group must start with alphanumeric characters and can contain special characters, with a maximum length of 100 characters.";
        } else {
          return null;
        }
      },
      remark: value =>
        value.trim() == "" || value == null || value.trim().length == 0
          ? "This field cannot be empty."
          : value && value.trim().length > 500
          ? "Invalid Input! Input can not be more than 500 characters."
          : null,
    },
  });

  useEffect(() => {
    form.setValues({
      customerGroup: customerGroupData?.DeveloperName,
      location:customerGroupData?.DeveloperLocation,
      remark: "",
    });
  }, [customerGroupData]);

  const actionCallback = (success: boolean, message?: string) => {
    if (success) {
      successNotification(message ?? "Group Updated Successfully");
      dispatch(getCustomerGroupListRequested(activeClient.ClientId));
      onClose();
      form.reset();
    }
  };
  const  options = developerList && developerList?.map((item: LocationListDataType) => ({
    value: item.DeveloperLocationName,
    label: item.DeveloperLocationName,
  }))
  const handleFormSubmit = (data: FormData) => {
    dispatch(
      editCustomerGroupRequested(Number(customerGroupData?.DeveloperId), form.values.customerGroup, userDetails?.EmailId || "", data.remark,data.location, actionCallback),
    );
  };

  const handelReset = () => {
    form.setValues({
      customerGroup: customerGroupData?.DeveloperName,
      location:customerGroupData?.DeveloperLocation,
      remark: "",
    });
  };
  console.log("options=====",options && options.find((option) => option.label === form.values.location)?.value);

  return (
    <Modal
      className='modalDropdownOverlay'
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
            Edit Group
          </Text>
        </Flex>
      }>
      <form onSubmit={form.onSubmit(handleFormSubmit)}>
        <Table>
          <tbody>
            <TableRow withAsterisk title={"Group"} value={<TextInput {...form.getInputProps("customerGroup")} placeholder='Edit Group Name' />} />
            <TableRow
              withAsterisk
              title={"Group head office"}
              value={
                <Select
                placeholder="Select head office"
                data={options?? []}
                {...form.getInputProps("location")}
                value={options && options.find((option) => option.label === form.values.location)?.value || ""}
              />
            }
            />
            <TableRow withAsterisk title={"Remarks"} value={<Textarea placeholder='Enter Remarks' radius={"sm"} {...form.getInputProps("remark")} />} />
          </tbody>
        </Table>
        <Space h={"sm"} />
        <Flex justify={"end"} gap={"xl"}>
          <Button className='reset-btn-onhover' variant='outline' onClick={handelReset}>
            Reset
          </Button>
          <Button color='truboard-primary.0' type='submit' loading={loaders.editCustomerGroup}>
            Submit
          </Button>
        </Flex>
      </form>
    </Modal>
  );
};

export default EditCustomerGroupPageModal;
