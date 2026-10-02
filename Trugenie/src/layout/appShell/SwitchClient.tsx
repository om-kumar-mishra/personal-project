import React, { useEffect } from "react";
import { Box, Flex, Text } from "@mantine/core";
import NewTableWithActions from "../../widgets/tables/MantineTable/NewTableWithActions";
import useSearchAndPagination from "../../hooks/useSearchAndPagination";
import { useDispatch, useSelector } from "react-redux";
import { selectUserDetails } from "../../lib/services/hdfc_login/selectors";
import { getSwitchClientRequested, switchClient } from "../../lib/services/HDFC/Commons/actions";
import { selectGetSwitchClientList, selectSwitchClient } from "../../lib/services/HDFC/Commons/selectors";
import { GetClientData } from "../../lib/services/HDFC/Commons/dataTypes";

const SwitchClient = () => {
  const dispatch = useDispatch();
  const userDetail = useSelector(selectUserDetails);
  const clientList = useSelector(selectGetSwitchClientList) as GetClientData[];
  const activeClient = useSelector(selectSwitchClient) as GetClientData;

  useEffect(() => {
    userDetail && dispatch(getSwitchClientRequested(userDetail?.UserId));
  }, [userDetail]);

  const { finalData, SearchComponent } = useSearchAndPagination({
    data: clientList,
    columnsToSearch: [
      { accessorKey: "ClientId", type: "number" },
      { accessorKey: "ClientName", type: "text" },
    ],
    itemsPerPageData: [10, 20, 30, 40, 50],
    showItemsPerPageDropdown: true,
    useSearchOnly: true,
  });

  return (
    <Box mx={"md"}>
      <Flex justify={"flex-start"} m={"md"} gap={"md"}>
        <Text size='xl' weight={700} color='#001d56'>
          Client List
        </Text>
        {SearchComponent}
      </Flex>

      <NewTableWithActions
        loader={false}
        columns={[
          { title: "Client Id", accessorKey: "ClientId" },
          { title: "Client Id", accessorKey: "ClientName" },
          {
            title: "Actions",
            accessorKey: "actions",
            actionTypes: [{ type: "approve", onClick: data => dispatch(switchClient(data)), disabled: data => data.ClientId === activeClient.ClientId }],
          },
        ]}
        data={finalData}
      />
    </Box>
  );
};

export default SwitchClient;
