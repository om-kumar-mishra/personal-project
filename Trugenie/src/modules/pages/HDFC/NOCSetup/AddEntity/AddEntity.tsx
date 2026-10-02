

import { Box, Button, Flex, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NocAccountDetailsApiData, NocProjectEntitiesApiData, NocProjectEntityUsersApiData } from "../../../../../lib/services/nocSetup/datatype";
import { selectNocSetupLoader } from "../../../../../lib/services/nocSetup/selector";
import NewTableWithActions from "../../../../../widgets/tables/MantineTable/NewTableWithActions";
import AddEntityModal from "./AddEntityModal"
import { errorNotification } from "../../../../Components/UtilityFunctions";
const EntityDetails: React.FC<{
  review?: boolean;
  entities: NocProjectEntitiesApiData[] | undefined;
  setEntities: (obj: NocProjectEntitiesApiData[]) => void;
  user: NocProjectEntityUsersApiData[] | undefined;
  setUsers: (obj: NocProjectEntityUsersApiData[]) => void;
}> = ({ review, entities, setEntities,user, setUsers }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const nocSetupLoader = useSelector(selectNocSetupLoader);
  const [newEntities, setNewEntities] = useState<NocProjectEntitiesApiData>();
  const [errorMsg, setErrorMsg] = useState<string>("");
  const isDebentureEntity = (role) => {
    if(role !== 'Lender' && role !== 'Investor'){
    const newDataSet = entities?.filter(obj => obj?.EntityRole === role);
    return newDataSet && newDataSet.length > 0;
    }
  };

  useEffect(() => {
    if (newEntities && entities) {
      const duplicate = entities?.filter(obj => obj?.EntityName === newEntities?.EntityName);
      const isDevDebExist = isDebentureEntity(newEntities?.EntityRole)
      // entities?.filter(obj => {return obj?.EntityName === newEntities?.EntityName && (newEntities?.EntityRole ==="Invester" || newEntities?.EntityRole ==="Lender")});
      if(duplicate && duplicate?.length>0){
        errorNotification("Duplicate entity, you have already selected " + newEntities.EntityName + " entity");
      }else if(isDevDebExist){
        errorNotification("Developer/PMC/Debenture entity can be add once");
      }else {
        setEntities([...entities, newEntities]);
        setNewEntities(undefined);
      }
    }
  }, [newEntities]);

  const handleDeleteAccount = (data: NocProjectEntitiesApiData) => {
    if (entities?.length) {
      const newDataSet = entities?.filter(obj => obj?.EntityName !== data?.EntityName && obj?.EntityRole !== data?.EntityRole);
      const newUserSet = user?.filter(obj => obj?.parentname !== data?.EntityName && obj?.EntityRole !==data?.EntityRole);
      setEntities(newDataSet);
      newUserSet && setUsers(newUserSet);
    }
  };
  return (
    <Box my='xl'>
      <Title className='ps-4' order={5}>
      Entities
      </Title>
      <NewTableWithActions
        // loader={nocSetupLoader.accountDetails}
        columns={[
          {
            title: "Entity Name",
            accessorKey: "EntityName",
          },
          { title: "Role", accessorKey: "EntityRole" },
          
          {
            title: "Action",
            accessorKey: "actions",
            actionTypes: [
              {
                type: "delete",
                onClick: rowData => handleDeleteAccount(rowData),
              },
            ],
          },
        ]}
        data={entities ?? []}
      />
      {!review && (
        <>
          <Flex direction={{ base: "column", sm: "row" }} gap={{ base: "sm", sm: "lg" }} justify={{ sm: "end" }}>
            <Button mr={10} color='truboard-primary.0' onClick={open}>
              + New
            </Button>
          </Flex>
          <AddEntityModal  
            opened={opened}
            close={close}
            closePop={close}
            title='Add Entity'
            entities={entities}
            setNewEntities={setNewEntities}//setNewAccountDetails}
          />
        </>
      )}
    </Box>
  );
};

export default EntityDetails;


