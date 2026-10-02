import { Box, Button, Flex, Table, Select, Space } from "@mantine/core";
import { DatePickerInput, DatesProvider } from "@mantine/dates";
import { useForm } from "@mantine/form";
import dayjs from "dayjs";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import calendarIcon from "../../../../../assets/logos/calendar.svg";
import withModalMatine from "../../../../../hoc/withModalMatine";
import { selectSetProject } from "../../../../../lib/services/HDFC/Project/selectors";
import { getReraDetailsAction } from "../../../../../lib/services/nocSetup/action";
import { NocAccountDetailsApiData, NocProjectEntitiesApiData,GetEntityUserApiDate } from "../../../../../lib/services/nocSetup/datatype";
import { selectNocSetup, selectNocSetupLoader } from "../../../../../lib/services/nocSetup/selector";
import { selectUserDetails } from "../../../../../lib/services/hdfc_login/selectors";
import FormTableRow from "../../../../Components/FormTableRow";
import { TableRow } from "../../../../Components/TableRow";
import { DEFAULT_DATE_FORMAT } from "../../../../Components/UtilityFunctions";
import { errorNotification, successNotification } from "../../../../../utils/notifications";
import {
    GetPMCByClientRequestAction,
    GetDeveloperByClientRequestAction,
    GetDebentureByClientRequestAction,
    GetLenderByClientRequestAction
} from "../../../../../lib/services/nocSetup/action";

export type AddDataType = {
    noCentityId?: number,
    nocProjectId?: number,
    EntityRole: string,
    EntityId: number,
    EntityName: string,
    Priority: string,
    createdBy?: string,
    createdAt?: string
};

const AddNewEntity: React.FC<{
    setNewEntities?: (obj: AddDataType) => void;
    closePop?: () => void;
    entities?: NocProjectEntitiesApiData[];
}> = ({ setNewEntities, closePop,entities }) => {
    const dispatch = useDispatch();
    const project = useSelector(selectSetProject);
    const nocSetup = useSelector(selectNocSetup);
    const loaders = useSelector(selectNocSetupLoader);
    const userDetails = useSelector(selectUserDetails);
    const [entity, setEntity] = useState<any[] | undefined>(undefined);
    const [maxPriority, setMaxPriority] = useState<number | undefined>(0);


    const handleSelectChange = (value: string | null) => {
        switch (value) {
            case 'Developer':
                dispatch(GetDeveloperByClientRequestAction(userDetails?.ClientId ?? 1));
                break;
            case 'Investor':
                dispatch(GetLenderByClientRequestAction(userDetails?.ClientId ?? 1));
                break;
            case 'Debenture':
                dispatch(GetDebentureByClientRequestAction(userDetails?.ClientId ?? 1));
                break;
            case 'PMC':
                dispatch(GetPMCByClientRequestAction(userDetails?.ClientId ?? 1));
                break;
            default:
                // Default case
                break;
        }
    };

    const handleSelectValue = (value: string | null) => {
        switch (value) {
            case 'Developer':
                setEntity(nocSetup.developerByClient?.map(item => ({
                    value: String(item.BorrowerDetailId), // Convert to string if needed
                    label: item.BorrowerName,
                })));
                break;
            case 'Investor':
                setEntity(nocSetup.lenderByClient?.map(item => ({
                    value: String(item.LenderDetailId), // Convert to string if needed
                    label: item.LenderName,
                })));
                break;
            case 'Debenture':
                setEntity(nocSetup.debentureByClient?.map(item => ({
                    value: String(item.DebentureId), // Convert to string if needed
                    label: item.DebentureName,
                })));
                break;
            case 'PMC':
                setEntity(nocSetup.PMCByClient?.map(item => ({
                    value: String(item.PMCDetailId), // Convert to string if needed
                    label: item.PMCName,
                })));
                break;
            default:
                // Default case
                break;
        }
    };



    const formDataIntialValues = {
        noCentityId: 0,
        nocProjectId: project?.NocProjectId,
        EntityRole: "",
        EntityId: 0,
        EntityName: "",
        Priority: "",
        createdBy: userDetails?.EmailId,
        createdAt: ""
    };

    const dataValue = [
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
              EntityRole: value => (value !== "" ? null : "This field cannot be empty."),
              EntityName: value => (value !== "" ? null : "This field cannot be empty."),
           },
    });

    useEffect(() => {
        handleSelectChange(form?.values?.EntityRole);
    }, [form?.values?.EntityRole]);

    useEffect(() => {
        handleSelectValue(form?.values?.EntityRole);
    }, [nocSetup.developerByClient, nocSetup.debentureByClient, nocSetup.lenderByClient, nocSetup.PMCByClient]);

    useEffect(() => {
        if (entities && entities.length > 0) {
            const maxPriority = entities.length + 1
            setMaxPriority(maxPriority);
        }
        else {
            setMaxPriority(1);
        }
    }, [entities]);

    const selectRole = [{ label: "Developer", value: "Developer" }, { label: "Investor", value: "Investor" }, { label: "Debenture", value: "Debenture" }, { label: "PMC", value: "PMC" }]
    
    const addAccountFormInputs = useMemo(() => {
        return [
            {
                type: "Select",
                withAsterisk: true,
                title: "Role",
                inputProp: "EntityRole",
                options: selectRole,
            },
            {
                type: "Select",
                withAsterisk: true,
                title: "Entity",
                inputProp: "EntityName",
                options: entity ?? []//[{ label: "Entity", value: 1 }, { label: "Entity", value: 2 }]//nocSetup.accountType ?? [],
            },
        ];
    }, [dataValue]);
const isDuplicateEntity =(Data:AddDataType)=>{
    const newDataSet = entities?.filter(obj => obj?.EntityName === Data?.EntityName);
    return newDataSet && newDataSet.length > 0;
}
const isDebentureEntity = (role) => {
    const newDataSet = entities?.filter(obj => obj?.EntityRole === "Debenture" && role !== "Debenture");
    return newDataSet && newDataSet.length > 0;
  };
  
    return (
        <Box>
            <form
                onSubmit={form.onSubmit(values => {
                    
                    const role = selectRole.filter(input => input.value === values.EntityRole).map(item => item.label)[0];
                   
                        if (setNewEntities) {
                            const obj: AddDataType = {
                                EntityRole: role,//values?.entityRole,
                                EntityId: entity?.filter(item => item.value === values.EntityName).map(item => item.value)[0],//values?.EntityId,
                                noCentityId: 0,
                                EntityName: entity?.filter(item => item.value === values.EntityName).map(item => item.label)[0],
                                Priority: String(maxPriority),
                            };
                            setNewEntities(obj);
                        }
                        closePop && closePop();
                })}>
                <Table>

                    <tbody>
                        <FormTableRow formInputs={addAccountFormInputs} form={form} />
                    </tbody>
                </Table>
                <Space h={"100px"} />
                <Flex justify={"end"} my='md' >
                    <Button color='truboard-primary.0' type='submit'>
                        Submit
                    </Button>
                </Flex>
            </form>
        </Box>
    );
};

const AddNewEntityModal = withModalMatine(AddNewEntity);

export default AddNewEntityModal;
