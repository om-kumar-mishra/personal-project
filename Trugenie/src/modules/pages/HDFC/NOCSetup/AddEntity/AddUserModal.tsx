import { Box, Button, Flex, Table, Space } from "@mantine/core";
import { DatePickerInput, DatesProvider } from "@mantine/dates";
import { useForm } from "@mantine/form";
import dayjs from "dayjs";
import React, { useEffect, useMemo,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import calendarIcon from "../../../../../assets/logos/calendar.svg";
import withModalMatine from "../../../../../hoc/withModalMatine";
import { selectSetProject } from "../../../../../lib/services/HDFC/Project/selectors";
import { getReraDetailsAction, GetEntityUserRequestAction } from "../../../../../lib/services/nocSetup/action";
import { NocAccountDetailsApiData,NocProjectEntityUsersApiData,NocProjectEntitiesApiData, GetEntityUserApiDate } from "../../../../../lib/services/nocSetup/datatype";
import { selectNocSetup, selectNocSetupLoader } from "../../../../../lib/services/nocSetup/selector";
import { selectUserDetails } from "../../../../../lib/services/hdfc_login/selectors";
import FormTableRow from "../../../../Components/FormTableRow";
import { TableRow } from "../../../../Components/TableRow";
import { DEFAULT_DATE_FORMAT, errorNotification } from "../../../../Components/UtilityFunctions";


export type AddDataType = {
  EmailId?: string ,
  Designation?: string ,
  ParentEntityId?: number ,
  CreatedBy?: string ,
  parentname?: string ,
  EntityRole?: string ,
  EntityName?: string ,
  Priority?: string ,
  CreatedAt?: string ,
  EntityId?: number ,
  LastModified?: string ,
  EntityAddress?: string ,
  SignatoryName?: string ,
  NocProjectId?: number ,
  Address?:string
};

const AddNewUsers: React.FC<{
  entities?:  NocProjectEntitiesApiData[];
  setNewUsaers?: (obj: AddDataType) => void;
  closePop?: () => void;
  user?: NocProjectEntityUsersApiData[];
}> = ({ entities, user,setNewUsaers, closePop }) => {
  const dispatch = useDispatch();
  const project = useSelector(selectSetProject);
  const nocSetup = useSelector(selectNocSetup);
  const loaders = useSelector(selectNocSetupLoader);
  const userDetails = useSelector(selectUserDetails);
  const [selectedEntity, setSelectedEntity] = useState<any[] | undefined>(undefined)
  const [selectedEntityRow, setSelectedEntityRow] = useState<any[] | undefined>(undefined)
  const [selectedUser, setSelectedUser] = useState<GetEntityUserApiDate[] | undefined>(undefined)
  const [maxPriority, setMaxPriority] = useState<number | undefined>(0);

  const formDataIntialValues = {
    EmailId:"",
    Designation:  "",
    ParentEntityId: 0,
    CreatedBy:  "",
    parentname:  "",
    EntityRole:  "",
    EntityName:  "",
    Priority:  "",
    CreatedAt:  "",
    EntityId: 0,
    LastModified:  "",
    EntityAddress:  "",
    SignatoryName:  "",
    NocProjectId: 0,
  };

  const dataValue =  [
    {
        noCentityId: 5526,
        nocProjectId: 102,
        entityRole: "Investor",
        entityId: 1,
        entityName: "HDFC",
        priority: 1,
        createdBy: "raju.kanojiya@truboardpartners.com",
        createdAt: "2024-02-26T14:00:18.193"
    },
    {
        noCentityId: 5527,
        nocProjectId: 102,
        entityRole: "Developer",
        entityId: 2,
        entityName: "Borrower A",
        priority: 2,
        createdBy: "raju.kanojiya@truboardpartners.com",
        createdAt: "2024-02-26T14:00:18.193"
    }
];

  const form = useForm<AddDataType>({
    initialValues: formDataIntialValues,
    validateInputOnChange: true,
    validate: {
      EntityRole : value => (value !== "" ? null : "This field cannot be empty."),
      EntityName : value => (value !== "" ? null : "This field cannot be empty."),
      parentname: value => (value !== "" ? null : "This field cannot be empty."),
      EmailId : value => (value !== "" ? null : "This field cannot be empty."),
      SignatoryName: value => (value !== "" ? null : "This field cannot be empty."),
      // Designation: value => (value !== "" ? null : "This field cannot be empty."),
      EntityAddress: value => (value !== "" ? null : "This field cannot be empty."),
   
    },
  });

  useEffect(() => {
    const entity = entities
      ?.filter(item => item.EntityRole === form.values.EntityRole)
      .map(item => ({ label: item.EntityName, value: item.EntityId })) ?? [];

    const entityRow = entities
      ?.filter(item => item.EntityRole === form.values.EntityRole)
    setSelectedEntity(entity);                                     // for multiselector 

    setSelectedEntityRow(entityRow);   
     form.setValues({
      parentname:"",
      EntityName:"",
      SignatoryName:  "",
      EmailId: "",
      Designation:"",
      Address: "",
    });
  }, [form?.values?.EntityRole]);


const option =    nocSetup.entityUser && nocSetup.entityUser?.map((item: GetEntityUserApiDate)=> ({
      value: item.EUId.toString(), // Convert to string if needed
      label: item.EmpName
  }));
  useEffect(() => {
    let selectedRole = 0;
    if (form?.values?.EntityRole === 'Developer') {
        selectedRole = 2;
    } else if (form?.values?.EntityRole === 'Investor' || form?.values?.EntityRole === 'Lender') {
        selectedRole = 3;
    } else if (form?.values?.EntityRole === 'PMC') {
        selectedRole = 5;
    } else {
        selectedRole = 1;
    }
    if(selectedRole && selectedRole > 0){
      dispatch(GetEntityUserRequestAction(Number(form?.values?.parentname),selectedRole));
    }
  }, [form?.values?.parentname]);


  useEffect(() => {
    let value =form.values.EntityName
    let selectUser = nocSetup.entityUser && nocSetup.entityUser?.filter((item:GetEntityUserApiDate) => Number(value) ===item.EUId)[0]
    nocSetup.entityUser && form.setValues({
      SignatoryName: selectUser?.EmpName ??"",
      EmailId: selectUser?.EmailId??"",
      Designation: selectUser?.Designation ? selectUser.Designation:"",
      Address: "",//form.values.Address,
    });
  }, [form.values.EntityName]);

  useEffect(() => {
    if (user && user.length > 0) {
      const maxPriority = user.length + 1
      setMaxPriority(maxPriority);
    } else {
      setMaxPriority(1);
    }
  }, [user]);
  
  const isEmailValid = (email: string): boolean => {
    return user && user?.some(entity => entity.EmailId === email)? false : true;
  };


const selectRole = [{ label: "Developer", value: "Developer" }, { label: "Investor", value: "Investor" }, { label: "Debenture", value: "Debenture" }, { label: "PMC", value: "PMC" }]
  const addAccountFormInputs = useMemo(() => {
    return [
        {
            type: "Select",
            withAsterisk: true,
            title: "Role",
            inputProp: "EntityRole",
            options: selectRole??[],
          },
          {
            type: "Select",
            withAsterisk: true,
            title: "Entity",
            inputProp: "parentname",
            options: selectedEntity??[],
          },
          {
            type: "Select",
            withAsterisk: true,
            title: "User",
            inputProp: "EntityName",
            options:option ?? [],
          },
          {
            type: "TextInput",
            withAsterisk: true,
            title: "Authorized Signatory",
            inputProp: "SignatoryName",
            length:100
          },
          {
            type: "TextInput",
            withAsterisk: true,
            title: "Email",
            inputProp: "EmailId",
            length:50
          },
          {
            type: "TextInput",
            withAsterisk: false,
            title: "Designation",
            inputProp: "Designation",
            length:50
          },
          {
            type: "TextInput",
            withAsterisk: false,
            title: "Address",
            inputProp: "EntityAddress",
            length:100
          },
    ];
  }, [dataValue]);

  return (
    <Box>
      <form
        onSubmit={form.onSubmit(values => {
          let isValidEmail = false;
          isValidEmail = values?.EmailId && isEmailValid(values?.EmailId)?true:false;
          if (isValidEmail) {
            if (setNewUsaers) {

              const obj: AddDataType = {
                EntityRole: selectRole.filter(input => values?.EntityRole === input?.label).map(item => item.label)[0],//values?.EntityRole,
                EntityId: option?.filter(input => values?.EntityName === input?.value).map(item => item.value)[0],
                EntityName: option?.filter(input => values?.EntityName === input?.value).map(item => item.label)[0],//values?.EntityName,
                Priority: String(maxPriority),
                EntityAddress: values?.EntityAddress,
                EmailId: values?.EmailId,
                SignatoryName: values?.SignatoryName,
                ParentEntityId: selectedEntity?.filter(input => values?.EntityName).map(item => item.value)[0],
                parentname: selectedEntity?.filter(input => values?.EntityName).map(item => item.label)[0],//values?.EntityName,//values?.parentname,
                Designation: values.Designation,
                Address: values.EntityAddress ?? "",
              };
              setNewUsaers(obj);
            }
            closePop && closePop();

          } else {
              errorNotification("Email Id already Present.")
          }
        })}>
        <Table>
          <tbody>
            <FormTableRow formInputs={addAccountFormInputs} form={form} />
          </tbody>
        </Table>
        <Space h={"100px"} />
        <Flex justify={"end"} my='md'>
          <Button color='truboard-primary.0' type='submit'>
            Submit
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

const AddNewUserModal = withModalMatine(AddNewUsers);

export default AddNewUserModal;
