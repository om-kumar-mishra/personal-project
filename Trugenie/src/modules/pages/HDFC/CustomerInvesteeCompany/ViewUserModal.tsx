import { Button, Flex, Loader, Modal, Select, Space, Table, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import addLogo from "../../../../assets/logos/SVG/add_new.svg";
import { selectRMUserList, selectRMUserLoaders } from "../../../../lib/services/HDFC/Commons/selectors";
import { selectUserDetails } from "../../../../lib/services/hdfc_login/selectors";
import { successNotification } from "../../../../utils/notifications";
import { TableRow } from "../../../Components/TableRow";
import { AddLenderListRequested, GetLenderListRequested, removeUserLenderRequested } from "../../../../lib/services/HDFC/Lender/actions";
import { selectLenderLoaders } from "../../../../lib/services/HDFC/Lender/selector";
import CommonAddButton from "../../../Components/Buttons";
import NewTableWithActions, { TableHeader } from "../../../../widgets/tables/MantineTable/NewTableWithActions";
import useSearchAndPagination from "../../../../hooks/useSearchAndPagination";
import { selectNocSetup, selectNocSetupLoader } from "../../../../lib/services/nocSetup/selector";
import AddUserPageModal from './AddUserPage'
import { useDisclosure } from "@mantine/hooks";
import {GetEntityUserRequestAction } from "../../../../lib/services/nocSetup/action"
type FormData = {
  EmpName: string;
  EmailId: number;
  CreatedBy: string;
  EUId:number;
  CreatedAt:string
};

const ViewUserPageModal = ({ open, onClose, selectedRow}: { onClose: () => void; open: boolean, selectedRow}) => {
  const dispatch = useDispatch();
  const userDetails = useSelector(selectUserDetails);
  const rmUsersList = useSelector(selectRMUserList);
  const rmUsersLoaders = useSelector(selectRMUserLoaders);
  // const loaders = useSelector(selectLenderLoaders);
  const selectEntity = useSelector(selectNocSetup);
  const loader = useSelector(selectNocSetupLoader);
  // const [selectedRow, setSelectRow] = useState<LenderListData | null>(null);
  

  const [AddUserModalState, { open: openAddUserModal, close: closeAddUserModal }] = useDisclosure(false);

  const { finalData, SearchComponent, PaginationComponent } = useSearchAndPagination({
    data: selectEntity.entityUser ?? [],
    columnsToSearch: [
      { accessorKey: "EmpName", type: "text" },
      { accessorKey: "EmailId", type: "text" },
      { accessorKey: "EUId", type: "text" },
      { accessorKey: "CreatedBy", type: "text" },
      { accessorKey: "CreatedAt", type: "text" },
    ],
    itemsPerPageData: [10, 20, 30, 40, 50],
    showItemsPerPageDropdown: true,
    showPaginationWithSearch: false,
  });
  const rmUsersListData =
    rmUsersList && rmUsersList.length > 0
      ? rmUsersList.map(item => ({
        label: item.EmpCode + " " + item.EmpName,
        value: item.UserId.toString(),
      }))
      : [];

  const form = useForm<FormData>({
    initialValues: {
      EmpName: "",
      EmailId: 0,
      CreatedBy: "",
      EUId:0,
      CreatedAt:""
    },
    validateInputOnChange: true,
    validate: {
      // customer_group: value => {
      //   if (value.trim() === "") {
      //     return "Group cannot be empty.";
      //   } else if (!/[a-zA-Z0-9!@#$%^&*()_+=[\]{};':"|,.<>/? ]{1,100}$/.test(value)) {
      //     return "Group must start with alphanumeric characters and can contain special characters, with a maximum length of 100 characters.";
      //   } else {
      //     return null;
      //   }
      // },
      // lead_rm: value => (value == "" || value == null ? "This field cannot be empty." : null),
      // rm_2: value => (value == "" || value == null ? "This field cannot be empty." : null),
    },
  });

  const actionCallback = (success: boolean) => {
    if (success) {
      successNotification("User removed successfully");
      dispatch(GetEntityUserRequestAction(selectedRow.BorrowerDetailId, 2));
      onClose();
      form.reset();
    }
  };

  const handleFormSubmit = (data: FormData) => {
    dispatch(
      removeUserLenderRequested(data.EUId, actionCallback),
    );
  };

  return (
    <Modal
      className='modalDropdownOverlay'
      size={"100%"}
      opened={open}
      onClose={() => {
        onClose();
        form.reset();
      }}
      title={
        <Flex gap={"xs"}>
          <img src={addLogo} className='icon-size' style={{ width: "20px", height: "20px", color: "#001d56" }} />
          <Text size={"md"} fw='bold' color={"#001d56"}>
            View User
          </Text>
        </Flex>
      }>
    <Flex justify={"flex-end"} align={"center"} m={"md"}>
        <CommonAddButton
          handleClick={openAddUserModal}
          leftIcon={<img src={addLogo} style={{ width: "20px", height: "20px", filter: "invert(1)" }} />}
          title='Add User'
        />
      </Flex>
      <NewTableWithActions
        loader={loader?.entityUser}
        // cardHeader={<TableHeader title='Lender' SearchComponent={SearchComponent} PaginationComponent={PaginationComponent} />}
        columns={[
          {
            title: "USER NAME",
            accessorKey: "EmpName",
          },
          { title: "Email", accessorKey: "EmailId" },
          {
            title: "Actions",
            accessorKey: "actions",
            actionTypes: [
              
              {
                type: "delete",
                onClick: (rowData) => {
                  handleFormSubmit(rowData)
                },
              },
            ],
          },
        ]}
        data={finalData}
      />
      <AddUserPageModal selectedRow={selectedRow} open={AddUserModalState} onClose={closeAddUserModal} />
    </Modal>
  );
};

export default ViewUserPageModal;

