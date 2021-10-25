import React from "react";
import { Modal } from "semantic-ui-react";

const ModalBasic = (props) => {
  const { show, setShow, title, children } = props;

  const onClose = () => {
    setShow(false);
  };
  return (
    <Modal size="mini" open={show} onClose={onClose} className="model-basic">
      {title && <Modal.Header>{title}</Modal.Header>}
      {children}
    </Modal>
  );
};

export default ModalBasic;
