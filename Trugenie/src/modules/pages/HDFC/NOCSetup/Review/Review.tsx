import React from "react";
import Summary from "./Summary";
import ManageWorkflowReview from "./ManageWorkflowReview";
import AccountDetails from "../Details/AccountDetails";
import ThresholdDetails, { ThreshholdDataType } from "../Details/ThresholdDetails";
import { NocAccountDetailsApiData,NocProjectEntitiesApiData,NocProjectEntityUsersApiData, NocWorkflowDetailsApiData } from "../../../../../lib/services/nocSetup/datatype";
import EntityDetails from "../AddEntity/EntityDetails";
import ManageWorkFlow from "../ManageWorkflow/ManageWorkFlow"

const Review: React.FC<{
  entities: NocProjectEntitiesApiData[] | undefined;
  setEntities: (obj: NocProjectEntitiesApiData[]) => void;
  user:NocProjectEntityUsersApiData[] | undefined;
  setUsers: (obj: NocProjectEntityUsersApiData[]) => void;
  workflowDetails: NocWorkflowDetailsApiData[] | undefined;
setWorkflowDetails: (obj: NocWorkflowDetailsApiData[]) => void;
  accountDetails: NocAccountDetailsApiData[] | undefined;
  setAccountDetails: (obj: NocAccountDetailsApiData[]) => void;
  thresholdDetails?: ThreshholdDataType;
  setThresholdDetails: (obj: ThreshholdDataType) => void;
}> = ({ entities,setEntities , user, setUsers,workflowDetails, setWorkflowDetails, accountDetails, setAccountDetails, thresholdDetails, setThresholdDetails }) => {
  return (
    <>
      <Summary />
      <EntityDetails review entities={entities}
            setEntities={setEntities}
            user={user}
            setUsers={setUsers}></EntityDetails>
      <ManageWorkFlow
        review
        workflowDetails={workflowDetails}
        setWorkflowDetails={setWorkflowDetails}
        entityUser={user}
      />
      <AccountDetails review accountDetails={accountDetails} setAccountDetails={setAccountDetails} />
      <ThresholdDetails review thresholdDetails={thresholdDetails} setThresholdDetails={setThresholdDetails} />
    </>
  );
};

export default Review;
