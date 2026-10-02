import { showNotification } from "@mantine/notifications";
import checkIcon from "../assets/logos/SVG/Check.svg";
import ExclamationIcon from "../assets/logos/SVG/setup_pending.svg";

export const errorNotification = (message: string, title = "Error") => {
  showNotification({
    title: title,
    message: message,
    icon: <img src={ExclamationIcon} style={{ width: "20px", height: "20px" }} />,
    color: "red",
    autoClose: 5000,
  });
};

export const successNotification = (message: string, title = "Success") => {
  showNotification({
    title: title,
    message: message,
    icon: <img src={checkIcon} style={{ width: "20px", height: "20px" }} />,
    color: "truboard-primary.0",
    autoClose: 5000,
  });
};
