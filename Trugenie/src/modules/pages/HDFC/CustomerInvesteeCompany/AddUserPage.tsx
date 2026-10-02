import { Button, Flex, Modal, Select, Space, Table, Text,TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import addLogo from "../../../../assets/logos/SVG/add_new.svg";
import { selectRMUserList, selectRMUserLoaders } from "../../../../lib/services/HDFC/Commons/selectors";
import { selectUserDetails } from "../../../../lib/services/hdfc_login/selectors";
import { successNotification } from "../../../../utils/notifications";
import { AddUserLenderRequested } from "../../../../lib/services/HDFC/Lender/actions";
import { selectLenderLoaders, selectclientList } from "../../../../lib/services/HDFC/Lender/selector";
import {selectExternalUserList}from "../../../../lib/services/HDFC/ExternalUser/selectors"
import React,{useEffect} from "react";
import { TableRow } from "../../../Components/TableRow";
import {GetEntityUserRequestAction } from "../../../../lib/services/nocSetup/action"

type FormData = {
  User: number;
  name:string;
};

const AddUserPageModal = ({ open, onClose, selectedRow }: { onClose: () => void; open: boolean; selectedRow: any }) => {
  const dispatch = useDispatch();
  const userDetails = useSelector(selectUserDetails);
  const rmUsersLoaders = useSelector(selectRMUserLoaders);
  const loaders = useSelector(selectLenderLoaders);
  const clientUserList = useSelector(selectExternalUserList);

  const form = useForm<FormData>({
    initialValues: {
      User: 0,
      name:selectedRow?.customerinvesteecompany,
    },
    validateInputOnChange: true,
  });

  const actionCallback = (success: boolean) => {
    if (success) {
      successNotification("User added successfully");
      dispatch(GetEntityUserRequestAction(selectedRow.BorrowerDetailId,2));
      onClose();
      form.reset();
    }
  };

  const options =
    clientUserList?.filter((itme)=> { return itme.Status === "Approved"}).map((entity) =>({
      value: entity?.EUserId?.toString(), // Ensure value is a string
      label: entity.Name,
    })) ?? []; // Initialize to an empty array if clientUserList is undefined or null


  const handleFormSubmit = (data: FormData) => {
    dispatch(
      AddUserLenderRequested(
        {
          entityType: '2',
          entityId: selectedRow?.BorrowerDetailId,
          userId: form.values.User,
          createdby: userDetails?.EmailId ?? "",
        },
        actionCallback
      )
    );
  };

  useEffect(() => {
    form.setValues({
      name: selectedRow?.customerinvesteecompany,
    })
  }, [selectedRow]);

  return (
    <Modal
      className="modalDropdownOverlay"
      size={"xl"}
      opened={open}
      onClose={() => {
        onClose();
        form.reset();
      }}
      title={
        <Flex gap={"xs"}>
          <img src={addLogo} className="icon-size" style={{ width: "20px", height: "20px", color: "#001d56" }} />
          <Text size={"md"} fw="bold" color={"#001d56"}>
            Add User
          </Text>
        </Flex>
      }
    >
      <form onSubmit={form.onSubmit(handleFormSubmit)}>
        <Table style={{ overflow: "visible" }}>
          <tbody style={{ overflow: "visible" }}>
          <TableRow
              title={"Borrower Name:"}
              value={
              <Text>{selectedRow?.customerinvesteecompany}</Text>
              }
            />
             <TableRow
              title={"Group Name:"}
              value={
              <Text>{selectedRow?.customergroup}</Text>
              }
            />
            <TableRow
              title={"User"}
              value={
                <Select
                searchable
                  // label="User"
                  data={options}
                  {...form.getInputProps("User")}
                />
              }
            />
          </tbody>
        </Table>
        <Space h={"50px"} />
        <Flex justify={"end"} gap={"xl"}>
          <Button color="truboard-primary.0" type="submit" loading={loaders.lenderList}>
            Submit
          </Button>
        </Flex>
      </form>
    </Modal>
  );
};

export default AddUserPageModal;
