import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import { Box, Burger, Button, Flex, Grid, Header, MediaQuery, Menu, Text, createStyles } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useMantineTheme } from "@mantine/styles";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../../../assets/img/TruBoardPartners_Logo_Colour.svg";
import profileIcon from "../../../assets/nikeIcons/1-profile.svg";
import viewIcon from "../../../assets/logos/SVG/view.svg";
import { logout } from "../../../lib/services/hdfc_login/actions";
import { selectActiveMenu, selectUserDetails } from "../../../lib/services/hdfc_login/selectors";
import { selectUpdateHoldStatus } from "../../../lib/services/prefrences/selectors";
import { selectAccessToken } from "../../../lib/services/reports/selectors";
import { getPresentableValue } from "../../../modules/Components/UtilityFunctions";
import { ROUTES } from "../../../routeConstants";
import ProjectOnHoldModal from "./modals/ProjectOnHoldModal";
import ProfileModal from "./modals/profileModal";
import { setSideMenuType } from "../../../lib/services/common/action";
import { selectSwitchClient } from "../../../lib/services/HDFC/Commons/selectors";

const useStyles = createStyles(() => {
  return {
    iconColor: {
      ":hover": {
        color: "white",
        filter: "invert(100)",
      },
    },
  };
});

function HeaderComponent(props: { pageTitle?: string; opened: boolean; setOpened: (value: boolean) => void }) {
  const dispatch = useDispatch();
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { opened, setOpened } = props;
  const { classes } = useStyles();
  const list: string[] = [ROUTES.NOC_PREFERENCES, ROUTES.NOC_DASHBOARD, ROUTES.NOC_MANAGE_REQUEST, ROUTES.EXTERNAL_NOC, ROUTES.PROJECT_SETUP_UPDATE];
  const [profileModalState, { open: openProfileModal, close: closeProfileModal }] = useDisclosure(false);
  const [projectModalState, { open: openProjectModal, close: closeProjectModal }] = useDisclosure(false);

  //#region [selector]
  const token = useSelector(selectAccessToken);
  const userDetails = useSelector(selectUserDetails);
  // const expiryDuration = useSelector(selectExpiryDuration);
  // const logoutTimer = useSelector(selectLogoutTimer);
  const activeMenu = useSelector(selectActiveMenu);
  // const activeSubMenu = useSelector(selectActiveSubMenu);
  const holdProjectStatus = useSelector(selectUpdateHoldStatus);
  const activeClient = useSelector(selectSwitchClient);
  //#endregion

  const onLogout = () => {
    dispatch(logout(token));
    setTimeout(() => {
      window.location.reload();
    }, 0);
  };

  return (
    <Header height={{ base: 70 }} p='xs'>
      <Grid m={0}>
        <Grid.Col span={6} p='0'>
          <Flex>
            <MediaQuery largerThan='sm' styles={{ display: "none" }}>
              <Burger opened={opened} onClick={() => setOpened(!opened)} size='sm' color={theme.colors.gray[6]} mr='xl' />
            </MediaQuery>
            <img
              width={200}
              src={Logo}
              alt='Logo'
              height={90}
              onClick={() => {
                navigate(ROUTES.HOMEPAGE);
                dispatch(setSideMenuType(undefined));
              }}
              style={{ marginTop: "-20px", cursor: "pointer" }}
            />
          </Flex>
        </Grid.Col>
        <Grid.Col span={3}>
          {holdProjectStatus?.data?.[0].onHold === 1 ? (
            location.pathname === ROUTES.NOC_MANAGE_REQUEST || (activeMenu && list.includes(activeMenu)) ? (
              <Flex gap={10} align={"center"}>
                <Box bg={"orange"} style={{ textAlign: "center", paddingLeft: "10px", paddingRight: "10px", color: "gray", fontWeight: "bold" }}>
                  Project is On Hold
                </Box>
                <img src={viewIcon} style={{ height: "15px", width: "15px", cursor: "pointer" }} onClick={openProjectModal} />
              </Flex>
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </Grid.Col>
        <Grid.Col span={3} style={{ textAlign: "right" }} p='0'>
          <Flex direction={"row"} justify={"flex-end"} gap={"sm"} align={"center"}>
            <Flex direction={"column"}>
              <Text fw={"700"} style={{ fontSize: "12px" }}>
                {userDetails && userDetails?.userName}
              </Text>
              <Flex direction={"column"}>
                <Text size={"xs"}>
                  <span style={{ fontWeight: "bold" }}>Last Login: </span>&nbsp;{getPresentableValue(userDetails?.lastlogin, true)}
                </Text>
                <Text size={"xs"}>
                  <span style={{ fontWeight: "bold" }}>Active Client: </span>
                  <span>{activeClient?.ClientName}</span>
                </Text>
              </Flex>
            </Flex>

            <Menu position='bottom-end' withArrow>
              <Menu.Target>
                <Button variant='subtle' px='0' style={{ color: "#001d56" }}>
                  <img src={profileIcon} style={{ width: "30px", height: "30px" }} className={classes.iconColor} />
                </Button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item onClick={openProfileModal}>User Profile</Menu.Item>
                <Menu.Item onClick={() => navigate(ROUTES.SWITCH_CLIENT)}>Switch Client</Menu.Item>
                <Menu.Item onClick={onLogout}>Logout</Menu.Item>
              </Menu.Dropdown>
            </Menu>

            {/* <Button onClick={onLogout} size="xs">
              Logout
            </Button> */}
          </Flex>
        </Grid.Col>
      </Grid>
      <ProfileModal open={profileModalState} onClose={closeProfileModal} userDetails={userDetails} />
      <ProjectOnHoldModal open={projectModalState} onClose={closeProjectModal} holdProjectData={holdProjectStatus} />
    </Header>
  );
}

export default HeaderComponent;
