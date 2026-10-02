import { Button, Flex, Loader, Modal, Space, Table, Text, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RemoveUserProjectAccessFailedAction, RemoveUserProjectAccessRequestAction, getUserProjectAccessRequestAction } from "../../../../../lib/services/HDFC/Project/actions";
import { ProjectUserAccessList } from "../../../../../lib/services/HDFC/Project/dataTypes";
import { selectLoaders, selectProjectAccessUserDetails, selectRemoveUserProjectAccess } from "../../../../../lib/services/HDFC/Project/selectors";
import { selectUserDetails } from "../../../../../lib/services/hdfc_login/selectors";
import { TableRow } from "../../../../Components/TableRow";

type FormDataIntialValuesType = {
  remark: string;
};

const RemoveAccessUserModal = ({ open, onClose, data, state }: { onClose: () => void; open: boolean; data?: ProjectUserAccessList, state?: any }) => {
  const dispatch = useDispatch();
  const userDetails = useSelector(selectUserDetails);
  const projectAccessUserDetails = useSelector(selectProjectAccessUserDetails);
  const removeUserProjectAccess = useSelector(selectRemoveUserProjectAccess);
  const projectLoaders = useSelector(selectLoaders);
  const formDataIntialValues = {
    remark: "",
  };

  useEffect(() => {
    if (removeUserProjectAccess) {
      if (userDetails && state) {
        state?.DeveloperId && dispatch(getUserProjectAccessRequestAction(userDetails?.EmailId, state.REAssetId, userDetails?.TemplateRoleName));
      }
      dispatch(RemoveUserProjectAccessFailedAction());
      form.reset();
      onClose();
    }
  }, [removeUserProjectAccess]);

  const form = useForm<FormDataIntialValuesType>({
    initialValues: formDataIntialValues,
    validateInputOnChange: true,
    validate: {
      remark: value => (value !== "" ? null : "This field cannot be empty."),
    },
  });

  return (
    <Modal
      size={"lg"}
      opened={open}
      onClose={() => {
        onClose();
      }}
      title={
        <Flex gap={"xs"}>
          {projectLoaders.projectAccessUserDetails ? <Loader size={"xs"} /> : null}
          <Text size={"md"} fw='bold' color={"#001d56"}>
            Remove Access
          </Text>
        </Flex>
      }>
      <form
        onSubmit={form.onSubmit(values => {
          if (userDetails && data) {
            const obj = {
              userEmail: data.UserEmail,
              accessId: data.AccessId,
              userRole: data.UserRole,
              remark: values.remark,
              actionByUserName: userDetails.userName,
              actionByUserRole: userDetails.TemplateRoleName,
            };
            dispatch(RemoveUserProjectAccessRequestAction(obj));
          }
        })}>
        <Table>
          <tbody>
            <TableRow fullWidth title='Company Type' value={<Text>{projectAccessUserDetails?.CompanyType}</Text>} />
            <TableRow title='Role Name' value={<Text>{projectAccessUserDetails?.RoleName}</Text>} />
            <TableRow title='Employee Code' value={<Text>{projectAccessUserDetails?.EmpCode}</Text>} />
            <TableRow title='Employee Name' value={<Text>{projectAccessUserDetails?.Name}</Text>} />
            <TableRow title='Email Id' value={<Text>{projectAccessUserDetails?.Email}</Text>} />
            <TableRow title='Department Name' value={<Text>{projectAccessUserDetails?.DepartmentName}</Text>} />
            <TableRow title='Status' value={<Text>{projectAccessUserDetails?.UserStatus}</Text>} />
            <TableRow title='Remark' value={<Textarea maxLength={500} placeholder='Remark...' withAsterisk {...form.getInputProps("remark")} />} withAsterisk />
          </tbody>
        </Table>
        <Space h={"sm"} />
        <Flex justify={"end"}>
          <Button color='red' type='submit' loading={projectLoaders.removeUserProjectAccess}>
            Remove Access
          </Button>
        </Flex>
      </form>
    </Modal>
  );
};

export default RemoveAccessUserModal;
