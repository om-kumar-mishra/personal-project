/* eslint-disable react/display-name */
import { ComponentType } from "react";
import { Modal } from "@mantine/core";

interface PropsType {
  opened: boolean;
  close: () => void;
  size?: string;
  title?: string;
  onClose?: () => void;
  [key: string]: any;
}

const withModalMatine = (WrappedComponent: ComponentType) => {
  return (props: PropsType) => {
    const { opened, close, size, title, onClose, ...otherProps } = props;

    return (
      <Modal
        size={size ?? "xl"}
        opened={opened}
        onClose={() => {
          onClose && onClose();
          close();
        }}
        title={title ?? "Modal"}
        centered
      >
        <WrappedComponent {...otherProps} />
      </Modal>
    );
  };
};
export default withModalMatine;
