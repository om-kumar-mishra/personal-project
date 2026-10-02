import { Button, Flex, Modal, Select, Space, Table, Text, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import assignUserIcon from "../../../../../assets/logos/SVG/Assign_User.svg";
import { getTaggedRMUserListRequested } from "../../../../../lib/services/HDFC/Commons/actions";
import {
  getUserProjectAccessRequestAction,
  projectAssignUserFailedAction,
  projectAssignUserRequestAction,
  roleTemplateNameListRequestAction,
  userByRoleListFailedAction,
  userByRoleListRequestAction,
} from "../../../../../lib/services/HDFC/Project/actions";
import { AllProjectList, ProjectAsignUserPayload } from "../../../../../lib/services/HDFC/Project/dataTypes";
import {
  selectLoaders,
  selectProjectAccessUserList,
  selectProjectAssignUser,
  selectRoleTemplateNameList,
  selectUserByRoleList,
} from "../../../../../lib/services/HDFC/Project/selectors";
import { selectUserDetails } from "../../../../../lib/services/hdfc_login/selectors";
import { successNotification } from "../../../../../utils/notifications";
import { TableRow } from "../../../../Components/TableRow";
import { getPresentableValue } from "../../../../Components/UtilityFunctions";

type FormDataIntialValuesType = {
  remark: string;
  role: string;
  empName?: string;
};
type userRole = {
  Name: string,
  RoleId : number
}

const AddAssignUserModal = ({ open, onClose, state }: { onClose: () => void; open: boolean; state: AllProjectList }) => {
  const dispatch = useDispatch();
  const roleTemplateNameList = useSelector(selectRoleTemplateNameList) as userRole[];
  const userByRoleList = useSelector(selectUserByRoleList);
  const projectAssignUser = useSelector(selectProjectAssignUser);
  const userDetails = useSelector(selectUserDetails);
  const loaders = useSelector(selectLoaders);
  const projectAccessUserList = useSelector(selectProjectAccessUserList);

  const employeeList =
    userByRoleList && userByRoleList.length > 0
      ? userByRoleList
          .filter(item => !projectAccessUserList?.map(item => item.UserEmail).includes(item.EmailId))
          .map(v => {
            return {
              value: v.EmailId,
              label: v.EmpName,
              ...v,
            };
          })
      : [];

  const formDataIntialValues = {
    remark: "",
    role: "",
  };

  const form = useForm<FormDataIntialValuesType>({
    initialValues: formDataIntialValues,
    validateInputOnChange: true,
    validate: {
      remark: value => (value.trim().length !== 0 ? null : "This field cannot be empty."),
      role: value => (value !== "" ? null : "This field cannot be empty."),
      empName: value => (value !== "" ? null : "This field cannot be empty."),
    },
  });

  const employeeInfo = useMemo(() => {
    if (form.values.empName) return employeeList.find(v => v.EmailId === form.values.empName);
    else undefined;
  }, [form.values.empName]);

  useEffect(() => {
    form.values?.role && form.setFieldValue("empName", "");
  }, [userByRoleList]);

  useEffect(() => {
    dispatch(roleTemplateNameListRequestAction());
  }, []);
    const options =   roleTemplateNameList && roleTemplateNameList?.map((item: userRole)=> ({
      value: item.Name, // Convert to string if needed
      label: item.Name
  }));

  useEffect(() => {
    if (projectAssignUser?.info?.code === 100) {
      form.reset();
      dispatch(projectAssignUserFailedAction());
    }
  }, [projectAssignUser?.info?.code]);

  useEffect(() => {
    if (state?.DeveloperId && userDetails?.EmailId) {
      dispatch(getTaggedRMUserListRequested(userDetails?.EmailId ?? "", Number(state?.DeveloperId)));
    }
  }, [state?.DeveloperId]);

  useEffect(() => {
    if (form.values?.role && userDetails && state.DeveloperId) {
      dispatch(userByRoleListRequestAction(form.values.role, userDetails?.EmailId, state.DeveloperId));
    } else dispatch(userByRoleListFailedAction());
  }, [form.values?.role]);

  const handleFormSubmit = (values: FormDataIntialValuesType) => {
    const req: ProjectAsignUserPayload = {
      useremail: employeeInfo?.EmailId ?? "",
      assetId: state.REAssetId,
      userRole: values.role,
      createdBy: userDetails?.EmailId ?? "",
      userName: employeeInfo?.EmpName ?? "",
      empCode: employeeInfo?.EmpCode ?? "",
      remark: values.remark,
      accessTag: employeeInfo?.AccessTag ?? "",
      actionByUserName: userDetails?.userName ?? "",
      actionByUserRole: userDetails?.TemplateRoleName ?? "",
    };
    dispatch(
      projectAssignUserRequestAction(req, (success: boolean) => {
        if (success) {
          successNotification("User Assigned Successfully");
          onClose();
          if (userDetails?.EmailId && state.REAssetId && userDetails?.TemplateRoleName)
            dispatch(getUserProjectAccessRequestAction(userDetails?.EmailId ?? "", state.REAssetId, userDetails?.TemplateRoleName));
        }
      }),
    );
  };

  return (
    <Modal
      size={"lg"}
      opened={open}
      onClose={onClose}
      title={
        <Flex gap={"xs"}>
          <img src={assignUserIcon} className='icon-size' style={{ width: "20px", height: "20px", color: "#001d56" }} />
          <Text size={"md"} fw='bold' color={"#001d56"}>
            Assign User
          </Text>
        </Flex>
      }>
      <form onSubmit={form.onSubmit(handleFormSubmit)}>
        <Table>
          <tbody>
            <TableRow
              fullWidth
              title='Role Name'
              withAsterisk
              value={<Select searchable withAsterisk data={options ?? []} placeholder='Select Role' {...form.getInputProps("role")} />}
            />
            <TableRow
              title='Employee Name'
              withAsterisk
              value={<Select searchable withAsterisk data={employeeList} placeholder='Select Employee' {...form.getInputProps("empName")} />}
            />
            <TableRow title='Email Id' value={<Text>{getPresentableValue(employeeInfo?.EmailId)}</Text>} />
            {/* <TableRow title='Department Name' value={<Text>{employeeInfo?.EmailId}</Text>} /> */}
            <TableRow
              title='Remarks'
              value={<Textarea placeholder='Enter Remarks...' maxLength={500} withAsterisk {...form.getInputProps("remark")} />}
              withAsterisk
            />
          </tbody>
        </Table>
        <Space h={"sm"} />
        <Flex justify={"end"} gap={"xl"}>
          <Button variant='outline' className='reset-btn-onhover' pl={30} pr={30} onClick={form.reset}>
            Reset
          </Button>
          <Button type='submit' color='truboard-primary.0' pl={30} pr={30} loading={loaders.projectAssignUser}>
            Submit
          </Button>
        </Flex>
      </form>
    </Modal>
  );
};

export default AddAssignUserModal;
