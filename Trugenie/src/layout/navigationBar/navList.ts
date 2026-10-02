import portfolioIcon from "../../assets/nikeIcons/2- Portfolio.svg";
import updateIcon from "../../assets/nikeIcons/33 -Edit.svg";
import approveMISIcon from "../../assets/nikeIcons/45 - Approve MIS.svg";
import investmentIcon from "../../assets/nikeIcons/3- Investment.svg";
import SetupIcon from "../../assets/nikeIcons/26 - Setup.svg";
import SummaryIcon from "../../assets/nikeIcons/19 - Summary.svg";
import salesIcon from "../../assets/nikeIcons/20 - Sales.svg";
import ConstructionIcon from "../../assets/nikeIcons/23- Construction.svg";
import cashflowIcon from "../../assets/nikeIcons/24 - Cashflow.svg";
import NocIcon from "../../assets/nikeIcons/21 - NOC.svg";
import opexIcon from "../../assets/nikeIcons/25 - OPEX.svg";
import EntityIcon from "../../assets/nikeIcons/47- Entity.svg";
import UserManagementIcon from "../../assets/nikeIcons/48- Usermanagement.svg";
import { ROUTES } from "../../routeConstants";
import Permissions from "../../utils/permissions";

export enum NavType {
  MENU,
  SUBMENU,
}

export type SideNavigationMenu = {
  type: NavType.MENU;
  key: string;
  icon: string;
  label: string;
  initiallyOpened?: boolean;
  navFor: NavFor;
  links?: SideNavSubMenu[];
  link?: string;
};

export type SideNavSubMenu = {
  type?: NavType.SUBMENU;
  key: string;
  icon?: string;
  label: string;
  link: string;
};

export enum NavFor {
  ADMIN = "admin",
  PROJECT = "project",
  PORTFOLIO = "portfolio",
  INVESTMENT = "investment",
}

export const navList: SideNavigationMenu[] = [
  {
    type: NavType.MENU,
    key: Permissions.CAN_VIEW_ENTITY_MASTER,
    icon: EntityIcon,
    label: "Entity",
    initiallyOpened: false,
    navFor: NavFor.ADMIN,
    links: [
      {
        key: Permissions.CAN_VIEW_DEV_CUST_GRP,
        label: "Client",
        link: ROUTES.CLIENT,
      },
      {
        key: Permissions.CAN_VIEW_DEV_CUST_GRP,
        label: "Group",
        link: ROUTES.CUSTOMER_GROUP_PAGE,
      },
      {
        key: Permissions.CAN_VIEW_DEV_CUST_GRP,
        label: "Student",
        link: ROUTES.STUDENT_PAGE,
      },
      {
        key: Permissions.CAN_VIEW_DEV_CUST_INVESTEE,
        label: "Borrower",
        link: ROUTES.CUSTOMER_INVESTEE_COMPANY,
      },
      {
        key: Permissions.CAN_VIEW_PROJECT,
        label: "Project",
        link: ROUTES.PROJECT_PAGE,
      },
      {
        key: Permissions.CAN_VIEW_ENTITY_MASTER,
        label: "Zone",
        link: ROUTES.ZONE,
      },
      {
        key: Permissions.CAN_VIEW_ENTITY_MASTER,
        label: "Region",
        link: ROUTES.REGION,
      },
      {
        key: Permissions.CAN_VIEW_ENTITY_MASTER,
        label: "Location",
        link: ROUTES.LOCATION,
      },
      {
        key: Permissions.CAN_VIEW_ENTITY_MASTER,
        label: "Group Head-Office",
        link: ROUTES.HEAD_OFFICE,
      },
      {
        key: Permissions.CAN_VIEW_DEV_CUST_GRP,
        label: "Lender",
        link: ROUTES.LENDER,
      },
      {
        key: Permissions.CAN_VIEW_DEV_CUST_GRP,
        label: "Debenture Trustee",
        link: ROUTES.DEBENTURE_TRUSTEE,
      },
      {
        key: Permissions.CAN_VIEW_DEV_CUST_GRP,
        label: "PMC",
        link: ROUTES.PMC,
      },
      {
        key: Permissions.CAN_VIEW_DEV_CUST_GRP,
        label: "Fund",
        link: ROUTES.FUND,
      },
      {
        key: Permissions.CAN_VIEW_DEV_CUST_GRP,
        label: "Investment",
        link: ROUTES.INVESTMENT,
      },
    ],
  },
  {
    type: NavType.MENU,
    key: Permissions.CAN_APPROVE_EXTERNAL_USERS, // need to check
    icon: UserManagementIcon,
    label: "User Management",
    initiallyOpened: false,
    navFor: NavFor.ADMIN,
    links: [
      {
        key: Permissions.CAN_UPDATE_INTERNAL_USER,
        label: "Internal User Update",
        link: ROUTES.UPDATE_USER,
      },
      {
        key: Permissions.CAN_APPROVE_INTERNAL_USER,
        label: "Internal User Approve",
        link: ROUTES.APPROVE_USER,
      },
      {
        key: Permissions.CAN_UPDATE_EXTERNAL_USERS,
        label: "External User Update",
        link: ROUTES.UPDATE_EXTERNAL_USER,
      },
      {
        key: Permissions.CAN_APPROVE_EXTERNAL_USERS,
        label: "External User Approve",
        link: ROUTES.APPROVE_EXTERNAL_USER,
      },
      {
        key: Permissions.CAN_UPDATE_USER_MASTER,
        label: "Master Update",
        link: ROUTES.UPDATE_MASTER,
      },
    ],
  },
  {
    type: NavType.MENU,
    key: Permissions.Can_View_Summary_Dashboard, // need to check
    icon: SummaryIcon,
    label: "Summary",
    initiallyOpened: false,
    navFor: NavFor.PROJECT,
    links: [
      {
        type: NavType.SUBMENU,
        key: Permissions.Can_View_Summary_Dashboard,
        label: "Dashboard",
        link: ROUTES.PROJECTSUMMARY,
      },
      {
        type: NavType.SUBMENU,
        key: Permissions.Can_Update_Summary,
        label: "Update",
        link: ROUTES.SUMMARY_UPDATE,
      },
      {
        type: NavType.SUBMENU,
        key: Permissions.Can_Approve_Summary,
        label: "Approve",
        link: ROUTES.SUMMARY_APPROVE,
      },
    ],
  },
  {
    type: NavType.MENU,
    key: Permissions.CAN_VIEW_SALES, // need to check
    icon: salesIcon,
    label: "Sales",
    initiallyOpened: false,
    navFor: NavFor.PROJECT,
    links: [
      {
        type: NavType.SUBMENU,
        key: Permissions.CAN_VIEW_SALES, // need to check
        label: "Dashboard",
        link: ROUTES.SALES_DASHBOARD_V2,
      },
      {
        type: NavType.SUBMENU,
        key: Permissions.CAN_UPDATE_SALES,
        label: "Update",
        link: ROUTES.SALES_UPDATE,
      },
      {
        type: NavType.SUBMENU,
        key: Permissions.CAN_APPROVE_SALES,
        label: "Approve",
        link: ROUTES.SALES_APPROVE,
      },
    ],
  },
  {
    type: NavType.MENU,
    key: Permissions.Can_View_Construction_Dashboard,
    icon: ConstructionIcon,
    label: "Construction",
    initiallyOpened: false,
    navFor: NavFor.PROJECT,
    links: [
      {
        type: NavType.SUBMENU,
        key: Permissions.Can_View_Construction_Dashboard,
        label: "Dashboard",
        link: ROUTES.CONSTRUCTION_DASHBOARD_V2,
      },
      {
        type: NavType.SUBMENU,
        key: Permissions.Can_Update_Construction,
        label: "Update",
        link: ROUTES.CONSTRUCTION_UPDATE,
      },
      {
        type: NavType.SUBMENU,
        key: Permissions.Can_Approve_Construction,
        label: "Approve",
        link: ROUTES.CONSTRUCTION_APPROVE,
      },
    ],
  },
  {
    type: NavType.MENU,
    key: Permissions.Can_View_Cashflow_Dashboard,
    icon: cashflowIcon,
    label: "Cashflow",
    initiallyOpened: false,
    navFor: NavFor.PROJECT,
    links: [
      {
        type: NavType.SUBMENU,
        key: Permissions.Can_View_Cashflow_Dashboard,
        label: "Dashboard",
        link: ROUTES.CASHFLOW_DASHBOARD,
      },
      {
        type: NavType.SUBMENU,
        key: Permissions.Can_Update_Cashflow,
        label: "Update",
        link: ROUTES.CASHFLOW_UPDATE,
      },
      {
        type: NavType.SUBMENU,
        key: Permissions.Can_Approve_Cashflow,
        label: "Approve",
        link: ROUTES.CASHFLOW_APPROVE,
      },
    ],
  },
  {
    type: NavType.MENU,
    key: Permissions.CAN_VIEW_NOC_DASHBOARD,
    icon: NocIcon,
    label: "NOC",
    initiallyOpened: false,
    navFor: NavFor.PROJECT,
    links: [
      {
        type: NavType.SUBMENU,
        key: Permissions.CAN_VIEW_NOC_DASHBOARD,
        label: "Dashboard",
        link: ROUTES.NOC_DASHBOARD,
      },
      {
        type: NavType.SUBMENU,
        key: Permissions.CAN_VIEW_MANAGE_REQUEST,
        label: "Manage Request",
        link: ROUTES.NOC_MANAGE_REQUEST,
      },
      {
        type: NavType.SUBMENU,
        key: Permissions.CAN_VIEW_PREFERENCES,
        label: "Preferences",
        link: ROUTES.NOC_PREFERENCES,
      },
      {
        type: NavType.SUBMENU,
        key: Permissions.CAN_VIEW_EXTERNAL_NOC,
        label: "External NOC Request",
        link: ROUTES.EXTERNAL_NOC,
      },
    ],
  },
  {
    type: NavType.MENU,
    key: Permissions.Can_View_Opex_Dashboard,
    icon: opexIcon,
    label: "Opex",
    initiallyOpened: false,
    navFor: NavFor.PROJECT,
    links: [
      {
        type: NavType.SUBMENU,
        key: Permissions.Can_View_Opex_Dashboard,
        label: "Dashboard",
        link: ROUTES.OPEX_DASHBOARD,
      },
      {
        type: NavType.SUBMENU,
        key: Permissions.Can_Opex_Manage_Request,
        label: "Manage Request",
        link: ROUTES.OPEX_MANAGE_REQUEST,
      },
      {
        type: NavType.SUBMENU,
        key: Permissions.Can_Approve_Opex,
        label: "Approve",
        link: ROUTES.OPEX_APPROVE,
      },
    ],
  },
  {
    type: NavType.MENU,
    key: Permissions.CAN_UPDATE_SETUP,
    icon: SetupIcon,
    label: "Setup",
    initiallyOpened: false,
    navFor: NavFor.PROJECT,
    links: [
      {
        type: NavType.SUBMENU,
        key: Permissions.CAN_UPDATE_SETUP,
        label: "Update",
        link: ROUTES.SETUP_UPDATE,
      },
      {
        type: NavType.SUBMENU,
        key: Permissions.CAN_APPROVE_SETUP,
        label: "Approve",
        link: ROUTES.SETUP_APPROVE,
      },
    ],
  },
  {
    type: NavType.MENU,
    key: Permissions.Can_View_Portfolio_Dashboard,
    icon: portfolioIcon,
    label: "Portfolio",
    initiallyOpened: false,
    navFor: NavFor.PORTFOLIO,
    link: ROUTES.PORTFOLIO_VIEW_DASHBOARD,
  },
  {
    type: NavType.MENU,
    key: Permissions.Can_Update_Portfolio,
    icon: updateIcon,
    label: "Update",
    initiallyOpened: false,
    navFor: NavFor.PORTFOLIO,
    link: ROUTES.PORTFOLIO_UPDATE,
  },
  {
    type: NavType.MENU,
    key: Permissions.Can_Approve_Portfolio,
    icon: approveMISIcon,
    label: "Approve",
    initiallyOpened: false,
    navFor: NavFor.PORTFOLIO,
    link: ROUTES.PORTFOLIO_APPROVE,
  },
  {
    type: NavType.MENU,
    key: Permissions.Can_View_Investment_Dashboard,
    icon: investmentIcon,
    label: "Investment",
    initiallyOpened: false,
    navFor: NavFor.INVESTMENT,
    link: ROUTES.INVESTMENTS_DASHBOARD,
  },
  {
    type: NavType.MENU,
    key: Permissions.Can_View_Investment_Update,
    icon: updateIcon,
    label: "Update",
    initiallyOpened: false,
    navFor: NavFor.INVESTMENT,
    link: ROUTES.INVESTMENT_UPDATE,
  },
  {
    type: NavType.MENU,
    key: Permissions.Can_View_Investment_Approve,
    icon: approveMISIcon,
    label: "Approve",
    initiallyOpened: false,
    navFor: NavFor.INVESTMENT,
    link: ROUTES.INVESTMENT_APPROVE,
  },
  {
    type: NavType.MENU,
    key: Permissions.Can_Update_Setup_Investment,
    icon: SetupIcon,
    label: "Setup",
    initiallyOpened: false,
    navFor: NavFor.INVESTMENT,
    links: [
      {
        type: NavType.SUBMENU,
        key: Permissions.Can_Update_Setup_Investment,
        label: "Update",
        link: ROUTES.INVESTMENT_SETUP_UPDATE,
      },
      {
        type: NavType.SUBMENU,
        key: Permissions.Can_Approve_Setup_Investment,
        label: "Approve",
        link: ROUTES.INVESTMENT_SETUP_APPROVE,
      },
    ],
  },
];
