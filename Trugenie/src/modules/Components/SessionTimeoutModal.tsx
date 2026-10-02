import { Button, Flex, Text, Title } from "@mantine/core";
import { modals } from "@mantine/modals";

export const sessionTimeoutModal = (title: string, activity?: string) => {
  return new Promise<void>(resolve => {
    modals.open({
      title: <Text fw='bold'>{title}</Text>,
      withCloseButton: false,
      children: (
        <Flex
          gap='md'
          justify='center'
          align='center'
          direction='column'
          sx={{
            zIndex: 9999,
          }}>
          <Title align='center' fz='md'>
            Your session has expired, possibly due to inactivity or another user accessing the same account. Please log in again.
            <br />
            You will be redirected to the login page in 5 seconds.
          </Title>
          <Button
            fullWidth
            onClick={() => {
              modals.closeAll();
              resolve();
              // window.location.reload();
              clearTimeout(timer);
            }}
            mt='md'>
            Close
          </Button>
        </Flex>
      ),
    });

    const timer = setTimeout(() => {
      modals.closeAll();
      resolve();
      window.location.reload();
    }, 4500);
  });
};
