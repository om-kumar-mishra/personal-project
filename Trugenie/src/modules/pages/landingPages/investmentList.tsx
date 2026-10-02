import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Select, Text, Group } from "@mantine/core";
import { NavFor } from "../../../layout/navigationBar/navList";
import NewTableWithActions from "../../../widgets/tables/MantineTable/NewTableWithActions";
import {
  selectInvestmentList,
  selectInvestmentLoaders,
  selectInvestmentFundsList,
  selectInvestmentDevloperList,
} from "../../../lib/services/HDFC/Investment/selector";
import useSearchAndPagination from "../../../hooks/useSearchAndPagination";
import { ROUTES } from "../../../routeConstants";
import {
  GetInvestmentListDataRequested,
  GetInvestmentFundsRequested,
  GetInvestmentDeveloperRequested,
  setInvestment,
} from "../../../lib/services/HDFC/Investment/actions";
import { InvestmentFundsData, InvestmentListData, InvestmentDeveloperData } from "../../../lib/services/HDFC/Investment/dataTypes";
import { setSideMenuType } from "../../../lib/services/common/action";
import { selectUserDetails } from "../../../lib/services/hdfc_login/selectors";
import { UserDetails } from "../../../lib/services/hdfc_login/dataTypes";
import { selectSwitchClient } from "../../../lib/services/HDFC/Commons/selectors";
import { GetClientData } from "../../../lib/services/HDFC/Commons/dataTypes";
import { getPresentableValue } from "../../Components/UtilityFunctions";

const InvestmentList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDetails = useSelector(selectUserDetails) as UserDetails;
  const activeClient = useSelector(selectSwitchClient) as GetClientData;
  const projectLoaders = useSelector(selectInvestmentLoaders);
  const investmentlist = useSelector(selectInvestmentList) as InvestmentListData[];
  const investmentFundsList = useSelector(selectInvestmentFundsList) as InvestmentFundsData[];
  const investmentDeveloperList = useSelector(selectInvestmentDevloperList) as InvestmentDeveloperData[];

  const [selectedFund, setSelectedFund] = useState(null);
  const [selectedDeveloper, setSelectedDeveloper] = useState(null);
  // const [currentLoadingRowAction, setCurrentLoadingRowAction] = useState<string | number | null>(null);
  const fundsList = useMemo(() => {
    return investmentFundsList && investmentFundsList.length > 0
      ? investmentFundsList.map(item => ({
        label: item.FundName,
        value: item.FundId.toString(),
      }))
      : [];
  }, [investmentFundsList]);

  const devList = useMemo(() => {
    return investmentDeveloperList && investmentDeveloperList.length > 0
      ? investmentDeveloperList.map(item => ({
        label: item.DeveloperName,
        value: item.DeveloperId?.toString(),
      }))
      : [];
  }, [investmentDeveloperList]);

  useEffect(() => {
    dispatch(setSideMenuType(NavFor.INVESTMENT));
  }, []);

  useEffect(() => {
    const ClientId = activeClient.ClientId;
    const CreatedBy = userDetails.EmailId;
    const fundid = -1;
    const developerid = -1;

    dispatch(GetInvestmentListDataRequested(ClientId, CreatedBy, fundid, developerid));
    dispatch(GetInvestmentFundsRequested(ClientId, CreatedBy));
    dispatch(GetInvestmentDeveloperRequested(ClientId, CreatedBy));
    // dispatch(fetchInvestmentList());
  }, [dispatch]);

  const handleFundChange = value => {
    const ClientId = activeClient.ClientId;
    const CreatedBy = userDetails.EmailId;
    const fundid = value;
    const developerid = selectedDeveloper ? selectedDeveloper : -1;
    setSelectedFund(value);
    dispatch(GetInvestmentListDataRequested(ClientId, CreatedBy, fundid, developerid));
    // Optionally fetch investment list based on selected fund
  };

  const handleDeveloperChange = value => {
    const ClientId = activeClient.ClientId;
    const CreatedBy = userDetails.EmailId;
    const fundid = selectedFund ? selectedFund : -1;
    const developerid = value;
    dispatch(GetInvestmentListDataRequested(ClientId, CreatedBy, fundid, developerid));
    setSelectedDeveloper(value);
    // Optionally fetch investment list based on selected developer
  };

  const { finalData } = useSearchAndPagination({
    data: investmentlist,
    columnsToSearch: [
      { accessorKey: "InvestmentName", type: "text" },
      { accessorKey: "FirstInvestmentDate", type: "text" },
      { accessorKey: "AmountCommitted", type: "text" },
    ],
    itemsPerPageData: [10, 20, 30, 40, 50],
    showItemsPerPageDropdown: true,
    useSearchOnly: true,
  });

  return (
    <Box mx='auto' mt='md' sx={{ width: "100%" }}>
      <Grid>
        <Grid.Col style={{ paddingLeft: "25px" }} span={6}>
          <Group>
            <Text>Fund</Text>
            <Select placeholder='Select fund' data={fundsList} value={selectedFund} onChange={handleFundChange} />
          </Group>
        </Grid.Col>
        <Grid.Col span={6}>
          <Group>
            <Text>Developer</Text>
            <Select
              placeholder='Select Developer'
              data={devList} //{developers.map(dev => ({ value: dev.developerId, label: dev.developerName }))}
              value={selectedDeveloper}
              onChange={handleDeveloperChange}
            />
          </Group>
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col span={9}>
          <NewTableWithActions
            loader={projectLoaders?.investmentList}
            // cardHeader={<TableHeader title="Search" SearchComponent={SearchComponent} />}
            columns={[
              // { title: "Sr. No.", accessorKey: "REAssetId" },
              { title: "Investment Name", accessorKey: "InvestmentName" },
              {
                title: "Investment Date", accessorKey: "FirstInvestmentDate",
                transform: (value: string) => <Text title={getPresentableValue(value, true) as string}>{getPresentableValue(value, true) as string}</Text>,
              },
              { title: "Investment Amount", accessorKey: "AmountCommitted" },
              {
                title: "Actions",
                accessorKey: "actions",
                actionTypes: [
                  {
                    type: "view",
                    onClick: data => {
                      dispatch(setInvestment(data));
                      navigate(ROUTES.INVESTMENTS_DASHBOARD);
                    },
                  },
                ],
              },
            ]}
            data={finalData}
          />
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export default InvestmentList;
