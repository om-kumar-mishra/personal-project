import { createStyles, Flex, Grid, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import LeftArrowIcon from "../../assets/logos/SVG/left_arrow.svg";

const useStyles = createStyles((theme) => {
  return {
    container: {
      backgroundColor: theme.colors["truboard-primary"][0],
      padding: theme.spacing.sm,
      color: theme.white,
      height: "48px",
      display: "flex",
      alignItems: "center",
      position: "fixed",
      zIndex: 2,
    },
  };
});

function SubHeader(props: {
  title?: string;
  back?: boolean;
  sideButtons?: JSX.Element;
  isDataLaoding?: boolean;
  width: string | number;
}) {
  const { classes } = useStyles();
  const navigate = useNavigate();

  return (
    <div className={classes.container} style={{ width: props.width }}>
      <Grid style={{ flex: 1 }}>
        <Grid.Col span={12}>
          <Flex
            align="center"
            style={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Flex align="center">
              {props.back && (
                // <IconArrowNarrowLeft size={24} onClick={() => navigate(-1)} />
                <img src={LeftArrowIcon} style={{ width: "24px", height: "24px", filter: "invert(1)" }} onClick={() => navigate(-1)} />
              )}
              <Title order={4} ml={5} mr={10} style={{ fontWeight: "bold" }}>
                {props.title ? props.title : ""}
              </Title>
            </Flex>
            {props.sideButtons}
          </Flex>
        </Grid.Col>
      </Grid>
    </div>
  );
}

export default SubHeader;
