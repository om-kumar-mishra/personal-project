import { Flex, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import addLogo from "../../../../assets/logos/SVG/add_new.svg";
import useSearchAndPagination from "../../../../hooks/useSearchAndPagination";
import { getStudentListRequested,deleteStudentRequest } from "../../../../lib/services/HDFC/Student/actions";
import { StudentListDataType } from "../../../../lib/services/HDFC/Student/dataTypes";
import { selectStudentList, selectStudentLoaders } from "../../../../lib/services/HDFC/Student/selectors";
import NewTableWithActions, { TableHeader } from "../../../../widgets/tables/MantineTable/NewTableWithActions";
import CommonAddButton from "../../../Components/Buttons";
import AddCustomerGroupPage from "./AddCustomerGroupPage";
import EditCustomerGroupPageModal from "./EditCustomerGroupPage";
import ViewCustomerGroupPageModal from "./ViewCustomerGroupPage";
import { selectSwitchClient } from "../../../../lib/services/HDFC/Commons/selectors";
import { GetClientData } from "../../../../lib/services/HDFC/Commons/dataTypes";
import { successNotification } from "../../../Components/UtilityFunctions";
import { getPresentableValue } from "../../../Components/UtilityFunctions";
import { openConfirmModal } from "@mantine/modals";

function StudentPage() {
  const dispatch = useDispatch();
  const student = useSelector(selectStudentList);
  const loaders = useSelector(selectStudentLoaders);
  const activeClient = useSelector(selectSwitchClient) as GetClientData;

  const [ModalState, { open: openModal, close: closeModal }] = useDisclosure(false);
  // const [DeleteModalState, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);

  const [AddModalState, { open: openAddModal, close: closeAddModal }] = useDisclosure(false);
  const [ViewModalState, { open: openViewModal, close: closeViewModal }] = useDisclosure(false);

  const [data, setData] = useState<StudentListDataType | null>(null);
  const [modifiedStudent, setModifiedStudent] = useState<number | null>(null);
  


  useEffect(() => {
  
    dispatch(getStudentListRequested());
  
  }, []);

  const { finalData, SearchComponent, PaginationComponent } = useSearchAndPagination({
    data: student ?? [],
    columnsToSearch: [
      { accessorKey: "id", type: "text" },
      { accessorKey: "name", type: "text" },
      { accessorKey: "description", type: "text" },
    ],
    itemsPerPageData: [10, 20, 30, 40, 50],
    showItemsPerPageDropdown: true,
    showPaginationWithSearch: false,
  });

  const actionCallback = (success: boolean) => {
    setModifiedStudent(null);
    if (success) {
      successNotification("Student deleted successfully");
      dispatch(getStudentListRequested());

    }
  };

 
  const handleDeleteStudent = (row: StudentListDataType) => {
    setModifiedStudent(row.id);
    dispatch(deleteStudentRequest(row.id,  actionCallback));
  }

  

  const openDeleteModal = (data: StudentListDataType) => {
    openConfirmModal({
      title: "Are you sure you want to delete this Student?",
      centered: true,
      color: "blue",
      labels: { confirm: "Delete", cancel: "Cancel" },
      onConfirm: () => {
        handleDeleteStudent(data)
      },
      confirmProps: {
        color: "truboard-primary.0"
      }
    });
  };

  return (
    <>
      <Flex justify={"flex-end"} align={"center"} m={"md"}>
        <CommonAddButton
          handleClick={openAddModal}
          leftIcon={<img src={addLogo} style={{ width: "20px", height: "20px", filter: "invert(1)" }} />}
          title='Add'
        />
      </Flex>
      <NewTableWithActions
        loader={loaders?.addStudentGroup}
        cardHeader={<TableHeader title='Student' SearchComponent={SearchComponent} PaginationComponent={PaginationComponent} />}
        columns={[
          {
            title: "ID",
            accessorKey: "id",
          },
          {
            title: "Name",
            accessorKey: "name",
          },
          {
            title: "Description",
            accessorKey: "description",
          },
         
          {
            title: "Action",
            accessorKey: "actions",
            actionTypes: [
              {
                type: "view",
                onClick: rowData => {
                  setData(rowData);
                  openViewModal();
                },
              },
              {
                type: "edit",
                onClick: rowData => {
                  setData(rowData);
                  openModal();
                },
              },
              {
                type: "delete",
                onClick: rowData => {
                  setData(rowData);
                  openDeleteModal(rowData);
                },
                loading(row) {
                  return loaders.deleteStudent && modifiedStudent === row.id;
                },
              },
  
            ],
          },
        ]}
      
       
        data={finalData}
      />
     
      <EditCustomerGroupPageModal
        open={ModalState}
        onClose={() => {
          closeModal();
          setData(null);
        }}
        studentData={data}
      />
      <AddCustomerGroupPage open={AddModalState} onClose={closeAddModal} />
      {/* <ViewCustomerGroupPageModal
        open={ViewModalState}
        onClose={() => {
          closeViewModal();
          setData(null);
        }}
        customerGroupData={data}
      /> */}
    </>
  );
}

export default StudentPage;
