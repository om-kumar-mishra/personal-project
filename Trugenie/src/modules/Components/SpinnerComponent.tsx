import { Loader } from "@mantine/core";

const SpinnerComponent = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgb(145 143 143 / 50%)",
        zIndex: 9999,
      }}
    >
      <Loader size='md' />
    </div>
  );
};
export default SpinnerComponent;
