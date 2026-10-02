import {
  createStyles,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: "80px",
    paddingBottom: "80px",
  },

  label: {
    textAlign: "center",
    fontWeight: 900,
    fontSize: "220px",
    lineHeight: 1,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[4]
        : theme.colors.gray[2],

    [theme.fn.smallerThan("sm")]: {
      fontSize: "120px",
    },
  },

  title: {
    // fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: "center",
    fontWeight: 900,
    fontSize: "38px",

    [theme.fn.smallerThan("sm")]: {
      fontSize: "32px",
    },
  },

  description: {
    maxWidth: "500px",
    margin: "auto",
    marginTop: theme.spacing.xl,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
  },
}));

export function NotFoundPage() {
  const { classes } = useStyles();
  const navigate = useNavigate();

  return (
    <Container className={classes.root}>
      <div className={classes.label}>404</div>
      <Title className={classes.title}>You have found a secret place.</Title>
      <Text
        color="dimmed"
        size="lg"
        align="center"
        className={classes.description}
      >
        Unfortunately, this is only a 404 page. You may have mistyped the
        address, or the page has been moved to another URL.
      </Text>
      <Group position="center">
        <Button
          variant="subtle"
          size="md"
          onClick={() => navigate("/", { replace: true })}
        >
          Take me back to home page
        </Button>
      </Group>
    </Container>
  );
}
