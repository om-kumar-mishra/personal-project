import { Button, Flex, Modal, Select, Space, Table, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import addLogo from "../../../../assets/logos/SVG/add_new.svg";
import { selectRMUserList, selectRMUserLoaders } from "../../../../lib/services/HDFC/Commons/selectors";
import { selectUserDetails } from "../../../../lib/services/hdfc_login/selectors";
import { successNotification } from "../../../../utils/notifications";
import { AddUserLenderRequested } from "../../../../lib/services/HDFC/Lender/actions";
import { selectLenderLoaders, selectclientList } from "../../../../lib/services/HDFC/Lender/selector";
import React from "react";
import { TableRow } from "../../../Components/TableRow";
import {GetEntityUserRequestAction } from "../../../../lib/services/nocSetup/action"
import {selectExternalUserList}from "../../../../lib/services/HDFC/ExternalUser/selectors"

type FormData = {
  User: number;
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
    },
    validateInputOnChange: true,
  });

  const actionCallback = (success: boolean) => {
    if (success) {
      successNotification("User added successfully");
      dispatch(GetEntityUserRequestAction(selectedRow.DebentureId,1));
      onClose();
      form.reset();
    }
  };

  const options =
    clientUserList?.filter((itme)=> { return itme.Status === "Approved"}).map((entity) =>({
      value: entity?.EUserId?.toString(), // Ensure value is a string
      label: entity.Name,
    })) ?? [];// Initialize to an empty array if clientUserList is undefined or null

  console.log(options);

  const handleFormSubmit = (data: FormData) => {
    dispatch(
      AddUserLenderRequested(
        {
          entityType: '1',
          entityId: selectedRow?.DebentureId,
          userId: form.values.User,
          createdby: userDetails?.EmailId ?? "",
        },
        actionCallback
      )
    );
  };

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
              title={"Client Name:"}
              value={
              <Text>{selectedRow?.ClientName}</Text>
              }
            />
             <TableRow
              title={"Debenture Name:"}
              value={
              <Text>{selectedRow?.DebentureName}</Text>
              }
            />
            <TableRow
              title={"User"}
              value={
                <Select
                  // label="User"
                  searchable
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
