import { Box, Button, Flex, Table, Select, MultiSelect, Checkbox } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSetProject } from "../../../../../lib/services/HDFC/Project/selectors";
import { NocProjectEntityUsersApiData, NocWorkflowDetailsApiData } from "../../../../../lib/services/nocSetup/datatype";
import { selectNocSetup, selectNocSetupLoader } from "../../../../../lib/services/nocSetup/selector";
import { selectUserDetails } from "../../../../../lib/services/hdfc_login/selectors";
import FormTableRow from "../../../../Components/FormTableRow";
import withModalMatine from "../../../../../hoc/withModalMatine";

export type workflowtype = {
  EmailId?: string;
  Designation?: string;
  ParentEntityId?: number;
  CreatedBy?: string;
  parentame?: string;
  EntityRole: string;
  EntityName?: string;
  Priority?: number;
  CreatedAt?: string;
  EntityId?: number;
  LastModified?: string;
  EntityAddress?: string;
  SignatoryName?: string;
  NocProjectId?: number;
  User: string;
  isBypass: number;
  typeofstep?: string;
};

export type workflowtypeType = {
  Id: number;
  Priority: string;
  EntityName: string;
  EntityId: number;
  UserName: string;
  EmailId: string;
  isBypass: number;
  SignatoryName: number;
  EntityRole: string;
  StepType: string;
};

interface Option {
  value: string;
  label: string;
}

const AddNewWorkflow: React.FC<{
  closePop?: () => void;
  selectedRow?: workflowtype[];
  setSelectedRow?: (obj: workflowtype) => void;
  workflowDetails?: NocWorkflowDetailsApiData[] | undefined;
  setWorkflowDetails?: (obj: NocWorkflowDetailsApiData[]) => void;
  entityUser?: NocProjectEntityUsersApiData[] | undefined;
  setNewWorkflow?: (obj: workflowtypeType) => void;
}> = ({
  closePop,
  selectedRow,
  setSelectedRow,
  entityUser,
  workflowDetails,
  setWorkflowDetails,
  setNewWorkflow,
}) => {
  const dispatch = useDispatch();
  const project = useSelector(selectSetProject);
  const nocSetup = useSelector(selectNocSetup);
  const loaders = useSelector(selectNocSetupLoader);
  const userDetails = useSelector(selectUserDetails);
  const [maxPriority, setMaxPriority] = useState<number | undefined>(0);
  const [selectedEntity, setSelectedEntity] = useState<{ value: string; label: string }[]>([]);
  const [isDevRole, setIsDevRole] = useState<string>("");

  const options = entityUser?.map(entity => ({
    value: entity?.EntityId?.toString(),
    label: entity.parentname,
  })) ?? [];

  const getUniqueOptions = (options: Option[]): Option[] => {
    const seenLabels = new Set<string>();
    return options.filter(option => {
      if (seenLabels.has(option.label)) {
        return false;
      } else {
        seenLabels.add(option.label);
        return true;
      }
    });
  };

  const uniqueOptions = options && getUniqueOptions(options);

  const formDataIntialValues = {
    EmailId: "",
    Designation: "",
    ParentEntityId: 0,
    CreatedBy: userDetails?.EmailId || "",
    parentame: "",
    EntityRole: "",
    EntityName: "",
    Priority: 1,
    CreatedAt: "",
    EntityId: 0,
    LastModified: "",
    EntityAddress: "",
    SignatoryName: "",
    NocProjectId: 0,
    User: "",
    isBypass: 0,
    StepType: "",
  };

  const form = useForm<workflowtype>({
    initialValues: formDataIntialValues,
    validateInputOnChange: true,
    validate: {
      Priority: value => (value !== 0 ? null : "This field cannot be empty."),
      EntityName: value => (value !== "" ? null : "This field cannot be empty."),
      typeofstep: value => (value !== "" ? null : "This field cannot be empty."),
      User: value => (value !== "" ? null : "This field cannot be empty."),
    }
  });

  useEffect(() => {
    const maxVal = workflowDetails?.length ? workflowDetails.length + 1 : 1;
    setMaxPriority(maxVal);
    form.setValues({ Priority: maxVal });
  }, [workflowDetails]);

  useEffect(() => {
 const searchTerm = form.values.EntityName ? findLabel(form.values.EntityName) : "";
  if (searchTerm) {
    const filteredEntities = entityUser?.filter(entity =>
      entity.parentname === searchTerm
    ).map(entity => ({
      value: entity.EntityName?.toString(),
      label: entity.EmailId,
      EntityRole: entityUser?.find(user =>
        user.EmailId === entity.EmailId && (user.EntityRole === "Developer" || user.EntityRole === "Debenture")
      )?.EntityRole || ""
    })) ?? [];
    setSelectedEntity(filteredEntities);
    setIsDevRole(filteredEntities[0]?.EntityRole);
    if(filteredEntities[0]?.EntityRole ==="Developer"){
      form.setValues({
        typeofstep:"NA"
      })
    }
  }
  }, [form.values.EntityName, entityUser]);

  const getUserEmail = () => {
    return selectedEntity.map(entity => entity.label).join(", ");
  };

  const addWorkflowFormInputs = useMemo(() => {
    return [
      {
        type: "NumberInput",
        withAsterisk: true,
        title: "Hirerchary/ Priority",
        inputProp: "Priority",
        min: 0,
        maxLength: 14,
        disabled: true,
      },
      {
        type: "Select",
        withAsterisk: true,
        title: "Entity",
        inputProp: "EntityName",
        options: uniqueOptions,
      },
      {
        type: "Select",
        withAsterisk: true,
        title: "Type Of Steps",
        inputProp: "typeofstep",
        disabled: isDevRole === "Developer"? true:false,
        options: [
          { label: "Recommender", value: "Recommender" },
          { label: "Approver", value: "Approver" },
        ],
      },
      {
        type: "MultiSelect",
        withAsterisk: true,
        title: "User",
        inputProp: "User",
        options: selectedEntity,
      },
      {
        type: "Checkbox",
        withAsterisk: false,
        title: "By Pass",
        inputProp: "isBypass",
        checked: true,
      },
    ];
  }, [workflowDetails, selectedEntity, options, isDevRole]);

  const findLabel = (value: string): string => {
    const option = options?.find(opt => opt.value === value);
    return option ? option.label : "";
  };

  const findRoleByName = (value: string): string => {
    const option = entityUser?.find(opt => Number(opt.EntityId) === Number(value));
    return option ? option.EntityRole : "";
  };

  return (
    <Box>
      <form
        onSubmit={form.onSubmit(values => {
          if (setNewWorkflow) {
            
            const obj: workflowtypeType = {
              Id: new Date().getTime(),
              Priority: String(maxPriority),
              EntityName: findLabel(form.values.EntityName!) || "",
              EntityId: Number(form.values.EntityName),
              UserName: getUserEmail(),
              EmailId: getUserEmail(),
              isBypass: values.isBypass ? 1 : 0,
              SignatoryName: 1,
              EntityRole: findRoleByName(form.values.EntityName!),
              StepType: form.values.typeofstep ?? "NA",
            };
            setNewWorkflow(obj);
          }
          closePop && closePop();
        })}
      >
        <Table>
          <tbody>
            <FormTableRow formInputs={addWorkflowFormInputs} form={form} />
          </tbody>
        </Table>
        <Flex justify={"end"} my="md">
          <Button color="truboard-primary.0" type="submit">
            Submit
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

const AddNewWorkflowModal = withModalMatine(AddNewWorkflow);

export default AddNewWorkflowModal;
