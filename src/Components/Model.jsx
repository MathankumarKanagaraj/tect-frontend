import React from "react";
import { Modal, Button } from "react-bootstrap";

const JsModal = ({
  show,
  onHide,
  title,
  children,
  footer = true,
  onSave,
  saveLabel = "Save",
  closeLabel = "Close",
  size = "md",
  backdrop = "static",
}) => {
  return (
    <Modal show={show} onHide={onHide} size={size} backdrop={backdrop} centered>
      <Modal.Header >
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{children}</Modal.Body>

      {footer && (
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={onHide}>
            {closeLabel}
          </Button>
          {onSave && (
            <Button variant="danger" onClick={onSave}>
              {saveLabel}
            </Button>
          )}
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default JsModal;
