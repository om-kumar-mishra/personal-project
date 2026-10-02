import { Alert } from "reactstrap";

interface PropsType {
  visible: boolean;
  setVisible: (params: boolean) => void;
  msg?: string;
  color?: string;
}

const AlertMessage = (props: PropsType) => {
  const { visible, setVisible, msg, color } = props;
  const onDismiss = () => {
    setVisible(false);
  };

  return (
    <Alert
      className="position-fixed"
      style={{
        top: "1rem",
        right: "1rem",
        zIndex: 9999,
        height: "50px",
        width: "300px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "18px",
        fontWeight: "bold",
      }}
      color={`${msg && color ? color : "danger"}`}
      isOpen={visible}
    >
      {`${msg && color ? msg : "Session Expired"}`}
      <button
        type="button"
        className="btn-close"
        aria-label="Close"
        onClick={onDismiss}
        style={{ position: "absolute", right: 0, top: 0, fontSize: "13px" }}
      ></button>
    </Alert>
  );
};

export default AlertMessage;
