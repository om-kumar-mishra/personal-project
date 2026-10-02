

import { Box, Button, Flex, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NocProjectEntityUsersApiData,NocProjectEntitiesApiData } from "../../../../../lib/services/nocSetup/datatype";
import { selectNocSetupLoader } from "../../../../../lib/services/nocSetup/selector";
import NewTableWithActions from "../../../../../widgets/tables/MantineTable/NewTableWithActions";
import AddUserModal from "./AddUserModal"
import { errorNotification } from "../../../../Components/UtilityFunctions";
const AddUsers: React.FC<{
  review?: boolean;
  entities: NocProjectEntitiesApiData[] | undefined;
  setEntities: (obj: NocProjectEntitiesApiData[]) => void;
  user: NocProjectEntityUsersApiData[] | undefined;
  setUsers: (obj: NocProjectEntityUsersApiData[]) => void;
}> = ({ review, entities, setEntities, user, setUsers }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const nocSetupLoader = useSelector(selectNocSetupLoader);
  const [newUser, setNewUsers] = useState<NocProjectEntityUsersApiData>();

  // console.log("entities",entities);
  const hasMatchingEntity = (users, newUser) => {
    return users?.some(obj => obj?.EntityName === newUser?.EntityName && Number(newUser?.EntityId) === Number(obj?.EntityId));
};
  useEffect(() => {

    if (newUser && user) {
      const duplicate = hasMatchingEntity(user, newUser);

      if(user.length === 0 && newUser?.EntityRole !== 'Developer'){
        errorNotification("First entity must be developer");
      }else if(duplicate){
        errorNotification("You have already selected " + newUser?.EntityName + " as entity user in a list");
      }else{
        setUsers([...user, newUser]);
        setNewUsers(undefined);
      }
    }
  }, [newUser]);

  const handleDeleteAccount = (data: NocProjectEntityUsersApiData) => {
    if (user?.length) {
      const newDataSet = user?.filter(obj => obj?.EntityName !== data?.EntityName && Number(obj?.EntityId) !== Number(data?.EntityId));
      setUsers(newDataSet);
    }
  };

  const dataValue = [
    {
      nocProjectId: 102,
      entityId: 282,
      EntityRole: "Investor",
      entityName: "Raju Kanojiya",
      entityAddress: "noida",
      emailId: "raju.kanojiya@truboardpartners.com",
      signatoryName: "Raju Kanojiya",
      priority: 0,
      createdBy: "raju.kanojiya@truboardpartners.com",
      createdAt: "2024-02-26T14:00:18.193",
      lastModified: null,
      parentEntityId: 1,
      parentname: "HDFC",
      designation: "d"
    },
    {
      nocProjectId: 102,
      entityId: 41,
      EntityRole: "Developer",
      entityName: "RE Developer",
      entityAddress: "delhi",
      emailId: "developer@truboardpartners.com",
      signatoryName: "RE Developer",
      priority: 1,
      createdBy: "raju.kanojiya@truboardpartners.com",
      createdAt: "2024-02-26T14:00:18.193",
      lastModified: null,
      parentEntityId: 2,
      parentname: "Borrower A",
      designation: "manager"
    }
];

  return (
    <Box my='xl'>
      <Title className='ps-4' order={5}>
      Users
      </Title>
      <NewTableWithActions
        loader={nocSetupLoader.accountDetails}
        columns={[
          {
            title: "Entity Role",
            accessorKey: "EntityRole",
          },
          { title: "Authorize Signatury", accessorKey: "SignatoryName" },
          { title: "Designation", accessorKey: "Designation" },
          { title: "Email Id", accessorKey: "EmailId" },
          { title: "Entity Address", accessorKey: "EntityAddress" },
          { title: "Entity Name", accessorKey: "EntityName" },
      
          {
            title: "Action",
            accessorKey: "actions",
            actionTypes: [
              {
                type: "delete",
                onClick: rowData => handleDeleteAccount(rowData)
              },
            ],
          },
        ]}
        data={user ?? []}
      />
      {!review && (
        <>
          <Flex direction={{ base: "column", sm: "row" }} gap={{ base: "sm", sm: "lg" }} justify={{ sm: "end" }}>
            <Button mr={10} color='truboard-primary.0' onClick={open}>
              + New
            </Button>
          </Flex>
          <AddUserModal
            opened={opened}
            close={close}
            closePop={close}
            title='Add Entity users'
            entities={entities}
            user={user}
            setNewUsaers={setNewUsers}
          />
        </>
      )}
    </Box>
  );
};

export default AddUsers;


