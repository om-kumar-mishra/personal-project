import { AppShell, useMantineTheme } from "@mantine/core";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { UserDetails } from "../../../lib/services/hdfc_login/dataTypes";
import { selectUserDetails } from "../../../lib/services/hdfc_login/selectors";
import ErrorBoundary, { SomethingWentWrongWithoutHome } from "../../../widgets/ErrorBoundary";
import NavbarComponent from "../../navigationBar/NavbarComponent";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./modals/FooterComponent";
import { ROUTES } from "../../../routeConstants";
import { NotFoundPage } from "../../../modules/Components/NotFound";

type RoutePaths = keyof typeof ROUTES;

interface PageContainerProps {
  children: any;
  hideLayout?: boolean;
}

function PageContainer({ children, hideLayout }: PageContainerProps) {
  const theme = useMantineTheme();
  const location = useLocation();
  const userDetails = useSelector(selectUserDetails) as UserDetails;
  const [opened, setOpened] = useState<boolean>(false);

  const allRoutes: string[] = useMemo(() => {
    const routeKeys = Object.keys(ROUTES) as RoutePaths[];
    return routeKeys.map(key => ROUTES[key]);
  }, []);

  const isRouteValid = useMemo(() => {
    return allRoutes.includes(location.pathname);
  }, [allRoutes, location.pathname]);

  if (!isRouteValid) {
    return <NotFoundPage />;
  }

  const hideNavbarChk = useMemo(() => {
    const hideForPaths: (typeof ROUTES)[keyof typeof ROUTES][] = [
      ROUTES.HOMEPAGE,
      ROUTES.LANDING_PAGE,
      ROUTES.PROJECT_LIST,
      ROUTES.INVESTMENT_LIST,
      ROUTES.SWITCH_CLIENT
    ];
    return hideForPaths.includes(location.pathname as (typeof ROUTES)[keyof typeof ROUTES]);
  }, [userDetails, location.pathname]);

  return (
    <AppShell
      fixed
      padding={0}
      styles={{
        main: {
          backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
          // width: "calc(100% - 240px)",
        },
        body: {
          width: "100%",
        },
      }}
      navbarOffsetBreakpoint='sm'
      navbar={!hideNavbarChk ? <NavbarComponent opened={opened} /> : undefined}
      header={<HeaderComponent opened={opened} setOpened={setOpened} />}
      footer={<FooterComponent />}
    >
      <ErrorBoundary fallback={<SomethingWentWrongWithoutHome />}>{children}</ErrorBoundary>
    </AppShell>
  );
}

export default PageContainer;
