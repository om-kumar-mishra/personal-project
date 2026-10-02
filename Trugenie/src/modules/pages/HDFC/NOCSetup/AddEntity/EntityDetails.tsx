import React from "react";
import Summary from "../Review/Summary";
import ManageWorkflowReview from "../Review/ManageWorkflowReview";
import AccountDetails from "../Details/AccountDetails";
import ThresholdDetails, { ThreshholdDataType } from "../Details/ThresholdDetails";
import { NocAccountDetailsApiData, NocProjectEntitiesApiData, NocProjectEntityUsersApiData } from "../../../../../lib/services/nocSetup/datatype";
import AddEnitity from './AddEntity'
import AddUsers from './AdduUsers'
import { useSelector } from "react-redux";
import { selectSetProject } from "../../../../../lib/services/HDFC/Project/selectors";
import { Text } from "@mantine/core";

interface EntityDetailsProps {
  review?: boolean;
  entities: NocProjectEntitiesApiData[] | undefined;
  setEntities: (obj: NocProjectEntitiesApiData[]) => void;
  user: NocProjectEntityUsersApiData[] | undefined;
  setUsers: (obj: NocProjectEntityUsersApiData[]) => void;
}

const EntityDetails: React.FC<React.PropsWithChildren<EntityDetailsProps>> = ({ review, entities, setEntities, user, setUsers, children }) => {
  const projectData = useSelector(selectSetProject);

  return (
    <>
      <Text ml={10} fw={500} size='ld'>
        {`Project: ${projectData?.AssetName}`}
      </Text>
      <AddEnitity entities={entities} setEntities={setEntities} user={user} setUsers={setUsers}  />
      <AddUsers entities={entities} setEntities={setEntities} user={user} setUsers={setUsers} />
      {children}
    </>
  );
};

export default EntityDetails;
