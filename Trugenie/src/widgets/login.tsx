import { Affix, Anchor, Button, Container, Flex, Paper, PasswordInput, Text, TextInput, Title, useMantineTheme } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HDFC_Logo from "../../src/assets/img/TruBoardPartners_Logo_Colour.svg";
import { HDFC_API_ENDPOINT } from "../lib/api/commons";
import { getAppVersionRequested, loginFailed, requestLogin } from "../lib/services/hdfc_login/actions";
import { selectAppVersion, selectLoaders, selectPublicKey } from "../lib/services/hdfc_login/selectors";
import { errorNotification } from "../utils/notifications";
// import JSEncrypt from "jsencrypt";

interface LoginForm {
  username: string;
  password: string;
}

function LoginPage() {
  const dispatch = useDispatch();
  const theme = useMantineTheme();
  const loginLoader = useSelector(selectLoaders);
  const appVersion = useSelector(selectAppVersion);
  const publicKey = useSelector(selectPublicKey);

  useEffect(() => {
    dispatch(getAppVersionRequested());
    dispatch(loginFailed());
  }, []);

  const form = useForm<LoginForm>({
    initialValues: {
      username: "",
      password: "",
    },

    validate: {
      username: username => (username.length === 0 ? "Username is required to login" : null),
      password: password => (password.length === 0 ? "Password is required to login" : null),
    },
  });

  const actionCallback = (success: boolean, message?: string) => {
    if (!success) {
      errorNotification(message || "Invalid UserID or Password");
    }
  };

  const onSubmit = (result: LoginForm) => {
    // const encrypt = new JSEncrypt();
    // publicKey && encrypt.setPublicKey(publicKey);
    // const encrypted = encrypt.encrypt(result.password);
    // encrypted && 
    dispatch(requestLogin(result.username, result.password, actionCallback));
  };

  return (
    <>
      <Flex bg='#EFEFEF' h='150px' direction='column'>
        <div>
          <img width='380px' src={HDFC_Logo} style={{ objectFit: "contain", padding: "20px 20px 10px" }} />
        </div>
        <div style={{ paddingLeft: "20px" }}>
          <Text style={{ color: "#001d56" }}>Welcome to TruGenie:</Text>
          
        </div>
      </Flex>

      <Container size={420} my={40}>
        <Title ta='center' style={{ fontSize: "25px", color: "#142554" }}>
          Login
        </Title>
        <Paper p={30} mt={20} radius='md'>
          <form onSubmit={form.onSubmit(onSubmit)}>
            <TextInput label='' placeholder='Enter ADID' required {...form.getInputProps("username")} />
            <PasswordInput label='' placeholder='Enter Password' required mt='md' {...form.getInputProps("password")} />
            <Button type='submit' fullWidth mt='xl' color='truboard-primary.0' loading={loginLoader.login}>
              Login
            </Button>
          </form>
          
          {/* <Text style={{ textAlign: "center" }}>
            <Anchor
              size='sm'
              color='#142554'
              href={`${HDFC_API_ENDPOINT}/fileManager/downloadUserManual`}
              target='_blank'
              style={{ fontWeight: "bold" }}>
              User Manual
            </Anchor>
          </Text>
          <Text c='dimmed' size='sm' ta='center' mt={5}>
            First Time User?{" "}
            <Anchor size='sm' color='#142554' href='https://isac-hdfcbankltd.msappproxy.net/Workflow' target='_blank' style={{ fontWeight: "bold" }}>
              Create a request in ISAC
            </Anchor>
          </Text> */}
        </Paper>
      </Container>
      {appVersion && (
        <Affix position={{ bottom: 20, right: 20 }}>
          <Text size='sm'>{`Version No. ${appVersion}`}</Text>
        </Affix>
      )}
    </>
  );
}

export default LoginPage;
