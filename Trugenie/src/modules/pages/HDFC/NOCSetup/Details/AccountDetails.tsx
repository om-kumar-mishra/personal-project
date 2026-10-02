import { Box, Button, Flex, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NocAccountDetailsApiData } from "../../../../../lib/services/nocSetup/datatype";
import { selectNocSetupLoader } from "../../../../../lib/services/nocSetup/selector";
import NewTableWithActions from "../../../../../widgets/tables/MantineTable/NewTableWithActions";
import AddNewAccountModal from "./AddNewAccountModal";

const AccountDetails: React.FC<{
  review?: boolean;
  accountDetails: NocAccountDetailsApiData[] | undefined;
  setAccountDetails: (obj: NocAccountDetailsApiData[]) => void;
}> = ({ review, accountDetails, setAccountDetails }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const nocSetupLoader = useSelector(selectNocSetupLoader);
  const [newAccountDetails, setNewAccountDetails] = useState<NocAccountDetailsApiData>();

  useEffect(() => {
    if (newAccountDetails && accountDetails) {
      setAccountDetails([...accountDetails, newAccountDetails]);
      setNewAccountDetails(undefined);
    }
  }, [newAccountDetails]);

  const handleDeleteAccount = (data: NocAccountDetailsApiData) => {
    if (accountDetails?.length) {
      const newDataSet = accountDetails?.filter(obj => obj?.AccountNumber !== data?.AccountNumber && obj?.BankName !== data?.BankName);
      setAccountDetails(newDataSet);
    }
  };

  return (
    <Box my='xl'>
      <Title className='ps-4' order={5}>
        Account Details
      </Title>
      <NewTableWithActions
        loader={nocSetupLoader.accountDetails}
        columns={[
          {
            title: "Product Sub Type",
            accessorKey: "Towers",
          },
          { title: "Account Type", accessorKey: "Accounttype" },
          { title: "Account Number", accessorKey: "AccountNumber" },
          { title: "Bank Name", accessorKey: "BankName" },
          { title: "Branch Address", accessorKey: "BrnachAddress" },
          {
            title: "Bank Account Applicable",
            accessorKey: "Startdate",
            transform: (value, row) => {
              return (
                <>
                  <Text>{`From: ${value ?? "-"}`}</Text>
                  <Text>{`To: ${row.Enddate ?? "-"}`}</Text>
                </>
              );
            },
          },
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
        data={accountDetails ?? []}
      />
      {!review && (
        <>
          <Flex direction={{ base: "column", sm: "row" }} gap={{ base: "sm", sm: "lg" }} justify={{ sm: "end" }}>
            <Button mr={10} color='truboard-primary.0' onClick={open}>
              + New
            </Button>
          </Flex>
          <AddNewAccountModal
            opened={opened}
            close={close}
            closePop={close}
            title='Add Account'
            accountDetails={accountDetails}
            setNewAccountDetails={setNewAccountDetails}
          />
        </>
      )}
    </Box>
  );
};

export default AccountDetails;
