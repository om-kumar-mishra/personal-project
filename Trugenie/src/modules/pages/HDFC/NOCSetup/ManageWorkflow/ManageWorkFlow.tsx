import { Title } from "@mantine/core";
import { Box, Button, Flex, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState, } from "../../../../../lib/common/appState";
import { selectSetProject } from "../../../../../lib/services/HDFC/Project/selectors";
import { getViewUserDetailsAction, resetViewUserDetailsAction } from "../../../../../lib/services/nocSetup/action";
import NewTableWithActions from "../../../../../widgets/tables/MantineTable/NewTableWithActions";
import ViewUserwithModal from "./ViewUserwithModal";
import AddWorkflowModal from './AddWorkFlow';
import {errorNotification} from "../../../../Components/UtilityFunctions"
import {NocWorkflowDetailsApiData,NocProjectEntityUsersApiData } from "../../../../../lib/services/nocSetup/datatype";
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
}
const ManageWorkFlow: React.FC< {
  review?:boolean
workflowDetails: NocWorkflowDetailsApiData[] | undefined;
setWorkflowDetails: (obj: NocWorkflowDetailsApiData[]) => void
entityUser?:NocProjectEntityUsersApiData[]|undefined;

}> = (
 { review, workflowDetails, setWorkflowDetails,entityUser}
) => {
  const dispatch = useDispatch();
  const project = useSelector(selectSetProject);
  const nocSetup = useSelector((state: AppState) => state.nocSetup);
  const loader = useSelector((state: AppState) => state.nocSetup?.loaders);
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedRow, setSelectedRow] = useState<workflowtype | undefined>(undefined);
  const [newWorkFlow, setNewWorkflow] = useState<NocWorkflowDetailsApiData>();

  useEffect(() => {
    const isDebenture = workflowDetails?.some(obj => obj?.EntityRole === "Debenture");
    const duplicate = workflowDetails?.some(obj => obj?.EmailId === newWorkFlow?.EmailId);
    if (newWorkFlow && workflowDetails) {
      if(workflowDetails.length === 0 && newWorkFlow?.EntityRole !== 'Developer'){
        errorNotification("Please add Developer first");
      }else if( workflowDetails.length !== 0 && newWorkFlow.EntityRole !== "Debenture" && isDebenture){
        errorNotification("You cannot add any Developer/PMC/Investor after Debenture");
      }else if(duplicate){
        errorNotification("User Email already added.");
      }else{
      setWorkflowDetails([...workflowDetails, newWorkFlow]);
      setNewWorkflow(undefined);
    }
    }
  }, [newWorkFlow]);


  const handleDeleteAccount = (data: workflowtype) => {
    if (workflowDetails?.length !=0) {
      const newDataSet = 
      workflowDetails?.filter(
        obj => obj?.EntityName !== data?.EntityName 
        && obj.EmailId !==data.EmailId 
        && Number(obj.Priority) !==Number(data.Priority) );
        newDataSet && setWorkflowDetails(newDataSet);
    }
  };
  return (
    <>
      <Title className="ps-4" order={5}>
        Manage Workflow
      </Title>
      <NewTableWithActions
        loader={loader?.WorkflowDetails}
        columns={[
          {
            title: "Step",
            accessorKey: "Priority",
          },
          { title: "Entity", accessorKey: "EntityName" },
          { title: "Type of step", accessorKey: "StepType" },
          { title: "User", accessorKey: "EmailId" },
          { title: "By pass", accessorKey: "isBypass" },
          {
            title: "Actions",
            accessorKey: "actions",
            actionTypes: [
              {
                type: "edit",
                onClick: (rowData) => {
                  if (project?.REAssetId) {
                    open();
                    setSelectedRow(rowData);
                  }
                },
              },
              {
                type: "delete",
                onClick: (rowData) => {
                  
                  handleDeleteAccount(rowData)

                },
              },
            ],
          },
        ]}
        data={workflowDetails ?? []}
      />
      {!review && (
        <>
          <Flex direction={{ base: "column", sm: "row" }} gap={{ base: "sm", sm: "lg" }} justify={{ sm: "end" }}>
            <Button mr={10} color='truboard-primary.0' onClick={open}>
              + New
            </Button>
          </Flex>
          <AddWorkflowModal
            selectedRow={selectedRow}
            entityUser ={entityUser}
            workflowDetails ={workflowDetails}
            setWorkflowDetails ={setWorkflowDetails}
            setNewWorkflow={setNewWorkflow}
            opened={opened}
            close={close}
            closePop={close}
            title="Add Entity priority"
          />
        </>
      )}

    </>
  );
};

export default ManageWorkFlow;
