import { useState } from "react";
import { useSelector } from "react-redux";
import { Group, Box, Collapse, ThemeIcon, UnstyledButton, createStyles, rem } from "@mantine/core";
import { Link } from "react-router-dom";
import { HasPermission } from "../../../utils/HasPermission";
import { selectActiveMenu } from "../../../lib/services/hdfc_login/selectors";
import arrowLeft from "../../../assets/logos/left_arrow.svg";
import rightLeft from "../../../assets/logos/right_arrow.svg";
const useStyles = createStyles(theme => {
  const variantColor = theme.fn.variant({ variant: "filled", color: theme.primaryColor }).background;
  return {
    control: {
      fontWeight: 700,
      display: "block",
      width: "100%",
      padding: `${theme.spacing.xs} ${theme.spacing.md}`,
      color: "#001d56",
      fontSize: theme.fontSizes.sm,
      borderRadius: 0,

      "&:hover": {
        backgroundColor: "#001d5633",
        color: "#001d56",
      },
    },

    icon: {
      backgroundColor: "transparent",
      color: "#001d56",
      borderRadius: 0,
    },

    link: {
      fontWeight: 500,
      display: "block",
      textDecoration: "none",
      padding: `${theme.spacing.xs} ${theme.spacing.md}`,
      paddingLeft: rem(31),
      marginLeft: rem(30),
      fontSize: theme.fontSizes.sm,
      color: "#001d56",
      borderLeft: `${rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]}`,

      "&:hover": {
        backgroundColor: "#001d5633",
        color: "#001d56",
      },
    },
    linkActive: {
      "&, &:hover": {
        backgroundColor: theme.fn.lighten(variantColor || "#001D56", 0.15),
      },
    },

    chevron: {
      transition: "transform 200ms ease",
    },
    singlelink: {
      fontWeight: 500,
      display: "block",
      textDecoration: "none",
      padding: `${theme.spacing.xs} ${theme.spacing.md}`,
      paddingLeft: rem(31),
      marginLeft: rem(30),
      fontSize: theme.fontSizes.sm,
      color: "#001d56",
      // borderLeft: `${rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]}`,
    },
  };
});

interface LinksGroupProps {
  key: string;
  icon: string;
  label: string;
  initiallyOpened?: boolean;
  link?: string;
  links?: { key: string; label: string; link: string }[];
}
export function LinksGroup({ icon: Icon, label, initiallyOpened, link, links }: LinksGroupProps) {
  const { classes, theme } = useStyles();
  const hasLinks = Array.isArray(links);
  const activeMenu = useSelector(selectActiveMenu);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const ChevronIcon = theme.dir === "ltr" ? rightLeft : arrowLeft;

  const subMenus: JSX.Element[] = [];
  if (links?.length) {
    for (const menu of links) {
      subMenus.push(
        <HasPermission key={menu.key + menu.label + menu.link} permissions={[menu.key]}>
          <Link className={`${classes.link} ${activeMenu === menu.link ? classes.linkActive : {}}`} to={menu.link} key={menu.key + menu.label}>
            {menu.label}
          </Link>
        </HasPermission>,
      );
    }
  }
  return (
    <>
      <UnstyledButton onClick={() => setOpened(o => !o)} className={classes.control} key={label}>
        <Group position='apart' spacing={0}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ThemeIcon variant='light' size={30} className={classes.icon}>
              <img src={Icon} style={{ width: "18px", height: "18px", }} />
            </ThemeIcon>
            {link ? (
              <Box ml='md'>
                <Link className={`${classes.singlelink} p-0 m-0`} key={link} to={link}>
                  {label}
                </Link>
              </Box>
            ) : (
              <Box ml='md'>{label}</Box>
            )}
          </Box>
          {hasLinks && (
            <img src={ChevronIcon} style={{ transform: opened ? `rotate(${theme.dir === "rtl" ? -90 : 90}deg)` : "none", width: "10px", height: "10px" }} />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{subMenus}</Collapse> : null}
    </>
  );
}
