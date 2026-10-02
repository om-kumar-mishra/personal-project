import { Breadcrumbs, Flex, Loader } from "@mantine/core";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import breadcrumbTriangle from "../../assets/logos/SVG/breadcrumb_triangle.svg";
import LeftArrowIcon from "../../assets/logos/SVG/left_arrow.svg";
import { navList } from "../../layout/navigationBar/navList";
import { selectSetProject } from "../../lib/services/HDFC/Project/selectors";
import { ROUTES, ROUTESTYPE } from "../../routeConstants";
import { TBBorderedButton } from "./Buttons";

export type LoadingPaths = {
  path: ROUTESTYPE;
  loading: boolean[]
}

const BreadCrumbs = ({ hidelist, loadingPaths, showProjectNameForPaths }: { hidelist?: string[], loadingPaths: LoadingPaths[], showProjectNameForPaths: ROUTESTYPE[] }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const selectedProject = useSelector(selectSetProject);

  function capitalizeFirstLetter(string: string) {
    return string
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  const findAccessiblePathForUser = (pathname: string, index: number) => {
    //If the path is a valid route, return the path
    const isValidRoute = Object.values(ROUTES).includes(
      pathname
        .split("/")
        .slice(0, index + 1)
        .join("/") as any,
    );
    if (isValidRoute) {
      return pathname
        .split("/")
        .slice(0, index + 1)
        .join("/");
    } else {
      //If the path is not a valid route, return the first accessible path
      const pathObjectFromNavList = navList.find(
        item =>
          item.key.toLowerCase() ===
          pathname
            .split("/")
            .slice(0, index + 1)
            .join("/")
            .replace("/", "")
            .toLowerCase(),
      );
      if (!pathObjectFromNavList) return "/";

      if (pathObjectFromNavList?.links?.length === 0) 
        return "/";
      
      return pathObjectFromNavList?.links?.[0].link ?? "/";
    }
  };

  const dynamicItems = pathname
    .split("/")
    .map((item, index) => {
      if (index === 0)
        return {
          name: "Home",
          href: "/",
        };
      return {
        name: capitalizeFirstLetter(item.replaceAll("-", " ")),
        href: findAccessiblePathForUser(pathname, index),
      };
    })
    .filter(item => Boolean(item.name))
    .map((item, index) => (
      <Link to={item.href} key={index}>
        {item.name}
      </Link>
    ));

  return (
    <>
      {hidelist?.includes(pathname) ? null : (
        <Flex align={"center"} justify={"space-between"}>
          <Flex align={"center"} gap={"xs"} m={"md"}>
            <img src={LeftArrowIcon} style={{ width: "20px", height: "20px", color: "#001d56", cursor: "pointer" }} onClick={() => navigate(-1)} />
            <Flex gap={0}>
              <Breadcrumbs separator=''>{dynamicItems}</Breadcrumbs>
              <img src={breadcrumbTriangle} width={"20px"} height={"40px"} style={{
                margin: "0",
                padding: "0",
                position: "relative",
                left: "-0.7px",
              }} />
            </Flex>
            {/* Loaders */}
            {loadingPaths.map((path, index) => {
              if (path.path === pathname) {
                if (path.loading.includes(true)) {
                  return <Loader key={index} size={30} color={"#001d56"} ml={"xl"} />;
                }
              }
            })}


          </Flex>
          {/* Show project name */}
          {showProjectNameForPaths.includes(pathname as any) && (
            <TBBorderedButton title={selectedProject?.AssetName ?? ""} />
          )}
        </Flex>
      )}
    </>
  );
};

export default BreadCrumbs;
