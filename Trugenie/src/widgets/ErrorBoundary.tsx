/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Flex, Text } from "@mantine/core";
import React, { ErrorInfo, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routeConstants";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export const SomethingWentWrong = () => {
  const navigate = useNavigate();
  return (
    <Flex direction='column' align='center' gap={"md"} justify='center' h='100%'>
      <Text size={20} fw={600} display='block'>
        Something went wrong or page is under development, please try again later.
      </Text>
      <Button onClick={() => navigate(ROUTES.PROJECT_LIST)}
        sx={theme => ({
          backgroundColor: theme.colors["truboard-primary"][0] ?? "#001D56",
        })}
      >Take me back to Home Page</Button>
    </Flex>
  );
};

export const SomethingWentWrongWithoutHome = () => {
  return (
    <Flex direction='column' align='center' gap={"md"} justify='center' h='100%'>
      <Text size={20} fw={600} display='block'>
        Something went wrong or page is under development, please try again later.
      </Text>
    </Flex>
  );
};

class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback ? (
        this.props.fallback
      ) : (
        <SomethingWentWrong />
      );
    }

    return <>{this.props.children}</>;
  }
}

export default ErrorBoundary;
