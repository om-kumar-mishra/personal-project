// src/components/ProjectSearch.js
import React, { useEffect, useState } from "react";
import { Container, Grid, Group, Button, useMantineTheme, Select } from "@mantine/core";
import portfolioIcon from "../../../assets/nikeIcons/2- Portfolio.svg";
import investmentIcon from "../../../assets/nikeIcons/3- Investment.svg";
import projectIcon from "../../../assets/nikeIcons/4-Project.svg";
import searchIcon from "../../../assets/nikeIcons/37- search.svg";
import { useDispatch, useSelector } from "react-redux";
import { getAssetInvestmentRequest, selectedProject } from "../../../lib/services/HDFC/Project/actions";
import { selectAssetInvestmentList } from "../../../lib/services/HDFC/Project/selectors";
import { ROUTES } from "../../../routeConstants";
import { getUpdateHoldStatusRequested } from "../../../lib/services/prefrences/actions";
import { useNavigate } from "react-router-dom";
import { setSideMenuType } from "../../../lib/services/common/action";
import { NavFor } from "../../../layout/navigationBar/navList";
import { getSideMenuType } from "../../../lib/services/common/selector";
import { defaultIconSize } from "../../../assets/constants";
import { selectUserDetails } from "../../../lib/services/hdfc_login/selectors";

interface AssetInvestmentType {
  clientId: number;
  clientName: string;
  createdby: string;
  createdAt: string;
  status: string;
  type: string;
  id: number;
  name: string;
  reassetId: number;
  assetName: string;
  developerName: string;
  developerCin: number;
  borrowerDetailId: number;
  remarks: string;
  onHold: number;
  holdDate: string;
  holdBy: string;
  developerId: number;
  borrowerName: string;
  regionsId: number;
  locationId: number;
  nocProjectId: number;
  opid: number;
  constructionProjectId: number;
  investmentId: number;
  fundId: number;
  investmentName: string;
  investmentType: string;
  firstInvestmentDate: string;
  amountCommitt: string;
  // Add other relevant fields here
}

const LandingPage = () => {
  const dispatch = useDispatch();
  const assets = useSelector(selectAssetInvestmentList) as AssetInvestmentType[];
  const userDetails =useSelector(selectUserDetails);
  const sideMenyType = useSelector(getSideMenuType);
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAssets, setFilteredAssets] = useState<AssetInvestmentType[]>([]);
  const theme = useMantineTheme();

  const assetListSelect = assets && assets.length > 0 ? assets.map(item => ({ value: item.id.toString(), label: item.investmentName })) : [];

  useEffect(() => {
    dispatch(setSideMenuType(undefined));
  }, []);

  useEffect(() => {
    if (sideMenyType === NavFor.PORTFOLIO) {
      navigate(ROUTES.PORTFOLIO_VIEW_DASHBOARD);
    } else if (sideMenyType === NavFor.INVESTMENT) {
      navigate(ROUTES.INVESTMENT_LIST);
    } else if (sideMenyType === NavFor.PROJECT) {
      navigate(ROUTES.PROJECT_LIST);
    }
  }, [sideMenyType]);

  useEffect(() => {
    const clientId = userDetails?.ClientId ? userDetails?.ClientId: 1;
    const createdBy = userDetails?.EmailId? userDetails?.EmailId: '';//"ajinath.pawar@truboardpartners.com";
    dispatch(getAssetInvestmentRequest(clientId, createdBy));
  }, [dispatch]);

  useEffect(() => {
    if (assets && assets.length > 0) {
      const datset = assets.filter(asset => {
        if (asset.type == "InvestmentHome") {
          asset.investmentName.toLowerCase().includes(searchQuery.toLowerCase()); //||
        } else if (asset.type == "ReSummaryDashboard") {
          asset.name.toLowerCase().includes(searchQuery.toLowerCase()); //||
        }
      });
      setFilteredAssets(datset);
    }
  }, [searchQuery, assets]);

  const handleSearchChange = value => {
    setSearchQuery(value);
    const selectedAsset = assets.find(asset => asset.id.toString() === value);
    if (selectedAsset) {
      dispatch(getUpdateHoldStatusRequested(selectedAsset?.reassetId));
      dispatch(
        selectedProject({
          AssetName: selectedAsset.assetName,
          BorrowerDetailId: selectedAsset.borrowerDetailId,
          BorrowerName: selectedAsset.borrowerName,
          CreatedAt: selectedAsset.createdby,
          CreatedBy: selectedAsset.createdAt,
          DeveloperCIN: selectedAsset?.developerCin,
          DeveloperId: selectedAsset.developerId,
          DeveloperName: selectedAsset.developerName,
          HoldBy: selectedAsset.holdBy,
          HoldDate: selectedAsset.holdDate,
          NocProjectId: selectedAsset.nocProjectId,
          REAssetId: selectedAsset.reassetId,
          Remarks: selectedAsset.remarks,
          approved: 0,
          onHold: selectedAsset.onHold,
          pending: 0,
          status: selectedAsset.status,
          Address: "",
          totalunits: 0,
          isenabled: 0,
        }),
      );
      if (selectedAsset.type === "ReSummaryDashboard") {
        const path = ROUTES.NOC_MANAGE_REQUEST;
        // const setupPath = ROUTES.PROJECT_SETUP_UPDATE;
        navigate(path, { state: { reAssetId: selectedAsset.reassetId } });
      } else if (selectedAsset.type == "InvestmentHome") {
        const path = ROUTES.INVESTMENTS_DASHBOARD;
        // const setupPath = ROUTES.PROJECT_SETUP_UPDATE;
        navigate(path, { state: { reAssetId: selectedAsset.reassetId } });
      }
    }
  };
  return (
    <Container>
      <Grid justify='center' align='center' style={{ marginTop: "140px" }}>
        <Grid.Col span={7}>
          <Select
            searchable
            data={assetListSelect}
            placeholder='Search'
            withAsterisk
            onChange={handleSearchChange}
            rightSection={<img src={searchIcon} style={defaultIconSize} />}
          />
        </Grid.Col>
      </Grid>

      <Grid justify='center' align='center' style={{ marginTop: "10px" }}>
        <Grid.Col span={8}>
          <Group position='center' spacing='xl'>
            <Button
              variant='subtle'
              className='landing-page-btn'
              style={{
                color: theme.colors["truboard-primary"][0],
              }}
              component='a'
              onClick={() => {
                dispatch(setSideMenuType(NavFor.PORTFOLIO));
              }}
              leftIcon={<img src={portfolioIcon} style={defaultIconSize} />}>
              Portfolio
            </Button>
            <Button
              variant='subtle'
              className='landing-page-btn'
              style={{
                color: theme.colors["truboard-primary"][0],
              }}
              component='a'
              onClick={() => {
                dispatch(setSideMenuType(NavFor.INVESTMENT));
              }}
              leftIcon={<img src={investmentIcon} style={defaultIconSize} />}>
              Investments
            </Button>
            <Button
              variant='subtle'
              className='landing-page-btn'
              style={{
                color: theme.colors["truboard-primary"][0],
              }}
              component='a'
              onClick={() => {
                dispatch(setSideMenuType(NavFor.PROJECT));
              }}
              leftIcon={<img src={projectIcon} style={{ height: "16px", width: "16px" }} />}>
              Projects
            </Button>
          </Group>
        </Grid.Col>
      </Grid>
      {/* </form> */}
    </Container>
  );
};

export default LandingPage;
