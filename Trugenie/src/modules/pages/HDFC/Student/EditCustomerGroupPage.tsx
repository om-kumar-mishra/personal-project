import { Button, Flex, Modal, Space, Table, Text, TextInput, Textarea,Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import editIcon from "../../../../assets/logos/SVG/Edit.svg";
import { selectSwitchClient } from "../../../../lib/services/HDFC/Commons/selectors";
import { editStudentRequested, getStudentListRequested } from "../../../../lib/services/HDFC/Student/actions";
import { StudentListDataType } from "../../../../lib/services/HDFC/CustomerGroupServices/dataTypes";
import { selectStudentLoaders } from "../../../../lib/services/HDFC/Student/selectors";
import { selectUserDetails } from "../../../../lib/services/hdfc_login/selectors";
import { TableRow } from "../../../Components/TableRow";
import { successNotification } from "../../../Components/UtilityFunctions";
import { GetClientData } from "../../../../lib/services/HDFC/Commons/dataTypes";
import {selectDevLocationList} from "../../../../lib/services/HDFC/DeveloperLocation/selectors"
import {LocationListDataType} from "../../../../lib/services/HDFC/DeveloperLocation/dataTypes"

type FormData = {
  id:number;
  name: string;
  description:string;
};

const EditCustomerGroupPageModal = ({
  open,
  onClose,
  studentData,
}: {
 
  open: boolean;
  onClose: () => void;
  studentData: StudentListDataType | null;
  isEdit?: boolean;
 
}) => {
  const dispatch = useDispatch();
  const userDetails = useSelector(selectUserDetails);
  const loaders = useSelector(selectStudentLoaders);
  const activeClient = useSelector(selectSwitchClient) as GetClientData;
  const developerList = useSelector(selectDevLocationList);

  const form = useForm<FormData>({
    initialValues: {
      id:0 ,
      name: "",
      description:"",
    },
    validateInputOnChange: true,
    validate: {
      name: value => {
        if (value.trim() === "") {
          return "name cannot be empty.";
        } else if (!/[a-zA-Z0-9!@#$%^&*()_+=[\]{};':"|,.<>/? ]{1,100}$/.test(value)) {
          return "name must start with alphanumeric characters and can contain special characters, with a maximum length of 100 characters.";
        } else {
          return null;
        }
      },
      description: value =>
        value.trim() == "" || value == null || value.trim().length == 0
          ? "This field cannot be empty."
          : value && value.trim().length > 500
          ? "Invalid Input! Input can not be more than 500 characters."
          : null,
    },

  });

  useEffect(() => {
    form.setValues({
      id: studentData?.id,
      name:studentData?.name,
      description:studentData?.description,
    });
  }, [studentData]);

  const actionCallback = (success: boolean, message?: string) => {
    if (success) {
      successNotification(message ?? "Student Updated Successfully");
      dispatch(getStudentListRequested());
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
      editStudentRequested(Number(studentData?.id), form.values.name,  form.values.description, actionCallback),
    );
  };

  const handelReset = () => {
    form.setValues({
      name: studentData?.name,
      description:studentData?.desciption
    });
  };
  console.log("studentData====",form.values)
  console.log("options=====",studentData);

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
            <TableRow withAsterisk title={"Name"} value={<TextInput {...form.getInputProps("name")} placeholder='Edit Student Name' />} />
          
            <TableRow withAsterisk title={"Description"} value={<Textarea placeholder='Enter description' radius={"sm"}  {...form.getInputProps("description")} />} />
          </tbody>
        </Table>
        <Space h={"sm"} />
        <Flex justify={"end"} gap={"xl"}>
          <Button className='reset-btn-onhover' variant='outline' onClick={handelReset}>
            Reset
          </Button>
          <Button color='truboard-primary.0' type='submit' loading={loaders.editStudent}>
            Submit
          </Button>
        </Flex>
      </form>
    </Modal>
  );
};

export default EditCustomerGroupPageModal;
