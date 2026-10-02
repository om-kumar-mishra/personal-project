import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

interface PropsType {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  title: string;
  fullscreen?: boolean;
  position?: string;
  removeFooter?: boolean;
  size?: string;
  [key: string]: any;
}
const withModal = (WrappedComponent: any) => {
  return (props: PropsType) => {
    const {
      isOpen,
      setIsOpen,
      title,
      fullscreen,
      position,
      removeFooter,
      size,
      ...otherProps
    } = props;

    const toggleModal = () => {
      setIsOpen(!isOpen);
    };

    return (
      <Modal
        isOpen={isOpen}
        toggle={toggleModal}
        scrollable
        size={size ?? "lg"}
        fullscreen={fullscreen}
        className={`main-body ${position}`}
      >
        <ModalHeader toggle={toggleModal}>{title}</ModalHeader>
        <ModalBody>
          <WrappedComponent {...otherProps} />
        </ModalBody>
        {!removeFooter && (
          <ModalFooter>
            <Button color="secondary" onClick={toggleModal}>
              Close
            </Button>
          </ModalFooter>
        )}
      </Modal>
    );
  };
};
export default withModal;
