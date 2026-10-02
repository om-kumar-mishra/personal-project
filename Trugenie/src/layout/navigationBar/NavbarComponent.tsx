import { Navbar, ScrollArea, createStyles } from "@mantine/core";
import { LinksGroup } from "./NavbarLinksGroup/NavbarLinksGroup";
import { navList } from "./navList";
import { HasPermission } from "../../utils/HasPermission";
import { useDispatch, useSelector } from "react-redux";
import { getSideMenuType } from "../../lib/services/common/selector";
import { useLocation } from "react-router-dom";
import { setSideMenuType } from "../../lib/services/common/action";

const useStyles = createStyles(theme => ({
  navbar: {
    backgroundColor: "#e4e2e2",
    paddingBottom: 0,
  },

  links: {
    marginLeft: `calc(${theme.spacing.xs} * -1)`,
    marginRight: `calc(${theme.spacing.xs} * -1)`,
  },

  linksInner: {
    paddingTop: theme.spacing.l,
    paddingBottom: theme.spacing.l,
  },
}));

function NavbarComponent(props: { opened: boolean }) {
  const { opened } = props;
  const { classes } = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();
  const sideMenufor = useSelector(getSideMenuType);
  if (!sideMenufor) {
    navList.forEach(menu => {
      if (!menu.links || menu.links.length <= 0) {
        if (location.pathname.includes(menu.link ?? "")) {
          dispatch(setSideMenuType(menu.navFor));
        }
      } else {
        const obj = menu.links.find(v => location.pathname.includes(v.link));
        if (obj) {
          dispatch(setSideMenuType(menu.navFor));
        }
      }
    });
  }
  const sideMenuList = sideMenufor ? navList.filter(v => v.navFor === sideMenufor) : navList;
  const links: JSX.Element[] = [];
  for (const item of sideMenuList) {
    const menuItemsKey = item?.links ? item?.links?.map(link => link?.key) : [item.key];
    links.push(
      <HasPermission permissions={menuItemsKey}>
        <LinksGroup key={item.key} icon={item.icon} label={item.label} links={item.links} link={item?.link} />
      </HasPermission>,
    );
  }

  return (
    <Navbar p='xs' hiddenBreakpoint='sm' width={{ sm: 250 }} hidden={!opened} className={classes.navbar}>
      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <div className={classes.linksInner}>{links}</div>
      </Navbar.Section>
    </Navbar>
  );
}

export default NavbarComponent;
