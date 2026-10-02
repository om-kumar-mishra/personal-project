import { Button, Flex, Loader, Modal, Select, Space, Table, Text, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import editIcon from "../../../../assets/logos/SVG/Edit.svg";
import { selectRMUserList, selectRMUserLoaders, selectSwitchClient } from "../../../../lib/services/HDFC/Commons/selectors";
import { editCustomerGroupRequested, getCustomerGroupListRequested } from "../../../../lib/services/HDFC/CustomerGroupServices/actions";
import { CustomerGroupListDataType } from "../../../../lib/services/HDFC/CustomerGroupServices/dataTypes";
import { selectCustomerGroupLoaders } from "../../../../lib/services/HDFC/CustomerGroupServices/selectors";
import { selectUserDetails } from "../../../../lib/services/hdfc_login/selectors";
import { TableRow } from "../../../Components/TableRow";
import { successNotification } from "../../../Components/UtilityFunctions";
import { GetClientData } from "../../../../lib/services/HDFC/Commons/dataTypes";

type FormData = {
  lead_rm: string;
  rm_2: string;
  rm_3: string;
  remark: string;
  customerGroup: string;
};

const EditClientPageModal = ({
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
  const rmUsersList = useSelector(selectRMUserList);
  const rmUsersLoaders = useSelector(selectRMUserLoaders);
  const loaders = useSelector(selectCustomerGroupLoaders);
  const activeClient = useSelector(selectSwitchClient) as GetClientData;

  const rmUsersListData =
    rmUsersList && rmUsersList.length > 0
      ? rmUsersList.map(item => ({
          label: item.EmpCode + " " + item.EmpName,
          value: item.UserId.toString(),
        }))
      : [];

  const form = useForm<FormData>({
    initialValues: {
      lead_rm: customerGroupData?.["Lead RM"] || "",
      rm_2: customerGroupData?.["RM 2"] || "",
      rm_3: customerGroupData?.["RM 3"] || "",
      remark: "",
      customerGroup: "",
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
      lead_rm: value => (value == "" || value == null ? "This field cannot be empty." : null),
      rm_2: value => (value == "" || value == null ? "This field cannot be empty." : null),
      remark: value =>
        value.trim() == "" || value == null || value.trim().length == 0
          ? "This field cannot be empty."
          : value && value.trim().length > 500
          ? "Invalid Input! Input can not be more than 500 characters."
          : null,
    },
  });

  useEffect(() => {
    const userIdLeadRm = rmUsersList?.find(user => user?.EmpCode + " " + user.EmpName == customerGroupData?.["Lead RM"])?.UserId;
    const userIdRm2 = rmUsersList?.find(user => user?.EmpCode + " " + user.EmpName == customerGroupData?.["RM 2"])?.UserId;
    const userIdRm3 = rmUsersList?.find(user => user?.EmpCode + " " + user.EmpName == customerGroupData?.["RM 3"])?.UserId;
    form.setValues({
      customerGroup: customerGroupData?.DeveloperName,
      lead_rm: (userIdLeadRm?.toString() as string) || "",
      rm_2: userIdRm2?.toString() || "",
      rm_3: userIdRm3?.toString() || "",
      remark: "",
    });
  }, [customerGroupData]);

  const actionCallback = (success: boolean) => {
    if (success) {
      successNotification("Group Updated Successfully");
      dispatch(getCustomerGroupListRequested(activeClient.ClientId));
      onClose();
      form.reset();
    }
  };
  const handleFormSubmit = (data: FormData) => {
    dispatch(
      editCustomerGroupRequested(
        Number(customerGroupData?.DeveloperId),
        form.values.customerGroup,
        userDetails?.EmailId || "",
        data.remark,
        "",
        actionCallback,
      ),
    );
  };

  const handelReset = () => {
    const userIdLeadRm = rmUsersList?.find(user => user?.EmpCode + " " + user.EmpName == customerGroupData?.["Lead RM"])?.UserId;
    const userIdRm2 = rmUsersList?.find(user => user?.EmpCode + " " + user.EmpName == customerGroupData?.["RM 2"])?.UserId;
    const userIdRm3 = rmUsersList?.find(user => user?.EmpCode + " " + user.EmpName == customerGroupData?.["RM 3"])?.UserId;
    form.setValues({
      customerGroup: customerGroupData?.DeveloperName,
      lead_rm: (userIdLeadRm?.toString() as string) || "",
      rm_2: userIdRm2?.toString() || "",
      rm_3: userIdRm3?.toString() || "",
      remark: "",
    });
  };

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
            Edit Client
          </Text>
        </Flex>
      }>
      <form onSubmit={form.onSubmit(handleFormSubmit)}>
        <Table>
          <tbody>
            <TableRow withAsterisk title={"Group"} value={<TextInput {...form.getInputProps("customerGroup")} placeholder='Edit Group Name' />} />
            <TableRow
              withAsterisk
              title={"Lead RM"}
              value={
                <Select
                  searchable
                  required
                  clearable
                  placeholder='Select Lead RM'
                  dropdownPosition='bottom'
                  nothingFound={rmUsersLoaders.getRMUserList ? <Loader /> : "No data found"}
                  data={rmUsersListData.filter(item => item.value !== form.values.rm_2 && item.value !== form.values.rm_3)}
                  {...form.getInputProps("lead_rm")}
                />
              }
            />
            <TableRow
              withAsterisk
              title={"RM 2"}
              value={
                <Select
                  required
                  clearable
                  placeholder='Select RM 2'
                  nothingFound={rmUsersLoaders.getRMUserList ? <Loader /> : "No data found"}
                  data={rmUsersListData.filter(item => item.value !== form.values.lead_rm && item.value !== form.values.rm_3)}
                  {...form.getInputProps("rm_2")}
                />
              }
            />
            <TableRow
              title={"RM 3"}
              value={
                <Select
                  clearable
                  placeholder='Select RM 3'
                  nothingFound={rmUsersLoaders.getRMUserList ? <Loader /> : "No data found"}
                  data={rmUsersListData.filter(item => item.value !== form.values.rm_2 && item.value !== form.values.lead_rm)}
                  {...form.getInputProps("rm_3")}
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

export default EditClientPageModal;
